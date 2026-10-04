import library from '../src/generated/card-library.json' with { type: 'json' };

const byId = new Map(library.papers.map(p => [p.id, p]));
/** @param {unknown} data */
export const json = (data, status = 200) => Response.json(data, { status, headers: {'Cache-Control':'private, no-store'} });
/** @param {{sources:Array<{excerpt?:string,summary?:string,[key:string]:unknown}>,[key:string]:unknown}} p */
const listRecord = p => ({ ...p, sources:p.sources.map(({excerpt,summary,...s})=>s) });
const readStatuses = ['未读','阅读中','已读'];
const editableStrings = ['titleZh','titleEn','journal','date','doi','pmid','summary','articleType','notes'];

/** @param {any} body */
function validateEdit(body) {
  if(!body || typeof body !== 'object' || !Number.isInteger(body.revision) || body.revision < 0 || !body.fields || typeof body.fields !== 'object') return '提交内容格式不正确。';
  const f=body.fields;
  const allowed=[...editableStrings,'topics','categories','tags','readingStatus','customFields'];
  if(Object.keys(f).some(k=>!allowed.includes(k)))return '包含未支持的字段。';
  for(const key of editableStrings)if(typeof f[key]!=='string' || f[key].length>(['summary','notes'].includes(key)?100000:2000))return `${key} 的内容格式或长度不正确。`;
  if(!f.titleZh.trim()&&!f.titleEn.trim())return '请至少保留一个标题。';
  if(f.date){
    const parts=f.date.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
    if(!parts || Number(parts[2])<1 || Number(parts[2])>12 || (parts[3]&&(Number(parts[3])<1 || Number(parts[3])>new Date(Date.UTC(Number(parts[1]),Number(parts[2]),0)).getUTCDate())))return '日期请使用有效的 YYYY-MM-DD 或 YYYY-MM，缺失时留空。';
  }
  if(f.doi&&!/^10\.\d{4,9}\/\S+$/i.test(f.doi))return 'DOI 格式不正确。';
  if(f.pmid&&!/^\d+$/.test(f.pmid))return 'PMID 应为数字。';
  if(!readStatuses.includes(f.readingStatus))return '阅读状态不正确。';
  for(const key of ['topics','categories','tags'])if(!Array.isArray(f[key]) || f[key].length>60 || f[key].some(/** @param {any} v */ v=>typeof v!=='string'||v.length>300))return '专题或标签格式不正确。';
  if(!f.topics.length || f.topics.some(/** @param {string} v */ v=>!library.topics.some(t=>t.id===v)))return '请至少选择一个现有医学主题。';
  if(!f.customFields || typeof f.customFields!=='object' || Array.isArray(f.customFields) || Object.keys(f.customFields).length>50 || Object.entries(f.customFields).some(([k,v])=>!k.trim()||k.length>100||typeof v!=='string'||v.length>20000))return '自定义字段格式不正确。';
  return '';
}
/** @param {Request} request
 * @param {{DB:any}} env */
export async function handleApi(request, env) {
  const url=new URL(request.url), path=url.pathname;
  if(!path.startsWith('/api/'))return null;
  try {
    if(path==='/api/library' && request.method==='GET') {
      /** @type {Array<{card_id:string,payload:string,revision:number,updated_at:string}>} */
      const results=(await env.DB.prepare('SELECT card_id, payload, revision, updated_at FROM card_edits').all()).results;
      const edits=new Map(results.map(e=>[e.card_id,e]));
      const papers=library.papers.map(p=>{const e=edits.get(p.id);return listRecord({...p,...(e?JSON.parse(e.payload):{}),revision:e?.revision??0,updatedAt:e?.updated_at??''});});
      return json({papers,topics:library.topics,batches:library.batches,stats:library.stats});
    }
    const match=path.match(/^\/api\/cards\/([a-z0-9-]+)$/);
    if(!match || !byId.has(match[1]))return json({error:'未找到这张文献卡片。'},404);
    const id=match[1],paper=byId.get(id);
    if(request.method==='GET') {
      const e=await env.DB.prepare('SELECT payload, revision, updated_at FROM card_edits WHERE card_id = ?').bind(id).first();
      return json({...paper,...(e?JSON.parse(e.payload):{}),revision:e?.revision??0,updatedAt:e?.updated_at??'',original:paper});
    }
    if(request.method!=='PUT')return json({error:'不支持此操作。'},405);
    if(!request.headers.get('oai-authenticated-user-id'))return json({error:'请登录后再保存。'},401);
    if(request.headers.get('origin')!==url.origin || request.headers.get('sec-fetch-site')==='cross-site')return json({error:'请在本站内保存卡片。'},403);
    if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'请提交正确的内容格式。'},415);
    const raw=await request.text();
    if(raw.length>300000)return json({error:'内容过长，请缩短后保存。'},413);
    let body;try{body=JSON.parse(raw);}catch{return json({error:'提交内容无法读取。'},400);}
    const error=validateEdit(body);if(error)return json({error},400);
    const fields=body.fields;
    const doi=fields.doi.trim().toLowerCase(),pmid=fields.pmid.trim();
    const other=library.papers.find(p=>p.id!==id && ((doi&&p.doi?.toLowerCase()===doi)||(pmid&&p.pmid===pmid)));
    const savedOther=(doi||pmid)?await env.DB.prepare("SELECT card_id FROM card_edits WHERE card_id != ? AND ((? != '' AND lower(json_extract(payload, '$.doi')) = ?) OR (? != '' AND json_extract(payload, '$.pmid') = ?)) LIMIT 1").bind(id,doi,doi,pmid,pmid).first():null;
    if(other||savedOther)return json({error:'该 DOI 或 PMID 已属于另一张卡片，请先核对原始记录。'},409);
    fields.doi=doi;fields.pmid=pmid;
    fields.topics=[...new Set(fields.topics)];fields.categories=[...new Set(fields.categories.map(/** @param {string} s */ s=>s.trim()).filter(Boolean))];fields.tags=[...new Set(fields.tags.map(/** @param {string} s */ s=>s.trim()).filter(Boolean))];
    const now=new Date().toISOString();
    // Compare the saved revision atomically so simultaneous edits cannot overwrite each other.
    const result=body.revision===0
      ? await env.DB.prepare('INSERT INTO card_edits (card_id, payload, revision, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(card_id) DO NOTHING').bind(id,JSON.stringify(fields),now).run()
      : await env.DB.prepare('UPDATE card_edits SET payload = ?, revision = revision + 1, updated_at = ? WHERE card_id = ? AND revision = ?').bind(JSON.stringify(fields),now,id,body.revision).run();
    const changed=result.meta.changes;
    if(!changed)return json({error:'卡片已在其他页面更新。请重新打开后合并修改；当前输入仍保留。'},409);
    return json({...paper,...fields,revision:body.revision+1,updatedAt:now});
  } catch(error) {
    console.error('Card storage failed:',error instanceof Error?error.message:'Unknown storage error');
    return json({error:'文献库暂时无法读取或保存。请稍后重试，当前输入会保留。'},503);
  }
}
