import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';
import type { Root, Heading } from 'mdast';
import { buildReport, type Paper } from '../src/lib/report-parser';
import { buildMedicalAgentReport } from '../src/lib/medical-agent-report-parser';
import { buildSurgeryReport } from '../src/lib/surgery-report-parser';
import { buildSourceReport } from '../src/lib/source-report-parser';

const topics = [
  { id:'lung-cancer', label:'肺癌预防与诊疗', group:'疾病与诊疗', description:'预防与风险因素、早筛、围手术期治疗及全阶段诊疗的文献集合。' },
  { id:'vlm', label:'医学视觉与基础模型', group:'数字医学与 AI', description:'医学影像、多模态与视觉语言模型、基础模型及扩散生成。' },
  { id:'surgery', label:'手术与围手术期 AI', group:'数字医学与 AI', description:'手术视频、导航与机器人，以及围手术期流程和风险研究。' },
  { id:'medical-agent', label:'医疗 LLM / Agent', group:'数字医学与 AI', description:'临床决策、医学智能体、患者沟通和真实工作流中的语言模型。' }
];
const read = (p:string) => readFileSync(p,'utf8');
const definitions = [
  {file:'src/content/vlm-report.md',href:'/vlm/report/',topic:'vlm',kind:'annual',title:'医学视觉与基础模型年度追踪',parser:buildReport},
  {file:'src/content/surgery-report.md',href:'/surgery/report/',topic:'surgery',kind:'annual',title:'手术与围手术期 AI 年度追踪',parser:buildSurgeryReport},
  {file:'src/content/medical-agent-report.md',href:'/medical-agent/report/',topic:'medical-agent',kind:'annual',title:'医疗 LLM / Agent 年度追踪',parser:buildMedicalAgentReport},
  {file:'src/content/report.md',href:'/report/',topic:'medical-agent',kind:'selection',title:'npj Digital Medicine 单刊摘选',parser:buildReport},
  {file:'src/content/supplemental/lung-cancer.md',href:'/reports/lung-cancer/',topic:'lung-cancer',kind:'annual',title:'肺癌预防、早筛与全阶段诊疗追踪',parser:buildSourceReport},
  {file:'src/content/supplemental/prospective-llm-agent.md',href:'/reports/prospective-llm-agent/',topic:'medical-agent',kind:'selection',title:'LLM / Agent 前瞻性研究摘选',parser:buildSourceReport},
  {file:'src/content/supplemental/medical-agent-increment.md',href:'/reports/medical-agent-increment/',topic:'medical-agent',kind:'monthly',title:'医疗 LLM / Agent 独立增量追踪',parser:buildSourceReport},
  ...['vlm','surgery','medical-agent'].flatMap(topic=> readdirSync(`src/content/monthly/${topic}`).filter(n=>n.endsWith('.md')).map(name=>({file:`src/content/monthly/${topic}/${name}`,href:`/monthly/${name.slice(0,-3)}/${topic}/`,topic,kind:'monthly',title:`${topics.find(t=>t.id===topic)!.label} · ${name.slice(0,-3)}`,parser:(s:string)=>buildSourceReport(s,true)})))
];
const digest = (s:string) => createHash('sha256').update(s).digest('hex').slice(0,24);
const normalizeTitle = (s:string) => s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu,'');
function urls(node:any):string[] { return [...(node.type==='link'?[node.url]:[]),...(node.children??[]).flatMap(urls)]; }
function ids(text:string, links:string[]) {
  const doi = links.find(u=>/doi.org\//i.test(u))?.split(/doi.org\//i)[1]?.replace(/[。；;,]$/,'').toLowerCase()
    ?? text.match(/\b10\.\d{4,9}\/[^\s\]）;；。]+/)?.[0]?.toLowerCase();
  const pmid = links.find(u=>/pubmed.ncbi.nlm.nih.gov\/\d+/.test(u))?.match(/\/([0-9]+)\/?$/)?.[1] ?? text.match(/PMID\s*[:：]?\s*(\d+)/i)?.[1];
  return {doi:doi??'',pmid:pmid??''};
}
function extraRecords(markdown:string, topic:string, file:string):Partial<Paper>[] {
  const root=unified().use(remarkParse).use(remarkGfm).parse(markdown.replace(/^---\n[\s\S]*?\n---\n/,'')) as Root;
  let section='',category='';const out:Partial<Paper>[]=[];
  root.children.forEach((node,i)=>{
    if(node.type!=='heading')return;
    const title=toString(node);
    if(node.depth===2)section=title;
    if(node.depth===3)category=title;
    const lung=topic==='lung-cancer' && node.depth===4 && /^PMID\d+[｜]/.test(title);
    const prospective=file.includes('prospective') && node.depth===3 && /^(?:\d+|[ABS]\d+)\./.test(title);
    const increment=file.includes('increment') && node.depth===3 && /^\d+\./.test(title) && !/检索|附录/.test(section);
    if(!lung&&!prospective&&!increment)return;
    let end=i+1;while(end<root.children.length && !(root.children[end].type==='heading' && (root.children[end] as Heading).depth<=node.depth))end++;
    const body=root.children.slice(i+1,end);const text=body.map(n=>toString(n)).join('\n\n');const links=body.flatMap(urls);const identifiers=ids(title+'\n'+text,links);
    if(!identifiers.doi&&!identifiers.pmid)throw new Error(`Missing identifier: ${file} ${title}`);
    const englishNode=body.find(n=>n.type==='paragraph' && ['emphasis','strong'].includes(n.children[0]?.type??''));
    const english=englishNode?toString(englishNode):'';
    const metadata=body.find(n=>n.type==='paragraph' && /20\d{2}-\d{2}-\d{2}/.test(toString(n)));
    const meta=metadata?toString(metadata):'';
    const journal=prospective ? (/姊妹刊/.test(section)?(text.match(/npj Digital Surgery|npj Digital Public Health/)?.[0]??''):'npj Digital Medicine') : meta.match(/^([^；·\n]+)[；·]/)?.[1]?.trim()??'';
    const date=meta.match(/20\d{2}-\d{2}-\d{2}/)?.[0]??'';
    const cleanTitle=title.replace(/^PMID\d+[｜]\s*|^(?:B?\d+)\.\s*/,'');
    const summary=body.filter(n=>n!==englishNode && n!==metadata).map(n=>toString(n)).filter(s=>s&&!s.startsWith('作者：')&&!s.startsWith('PubMed')&&!s.startsWith('<a id=')).join('\n\n');
    const pending=/待核验|pending|类型未充分核实|未明确/.test(section+' '+text) || /^B\d+\./.test(title);
    out.push({...identifiers,titleZh:cleanTitle,titleEn:english,journal,date,summary,category:lung?category:section,scope:/边缘|边界/.test(section)?'edge':'core',articleType:pending?'待核验':/更正/.test(section)?'更正记录':'',slug:lung?title.match(/^PMID\d+/)![0]:'',sourceUrl:links.find(u=>/^https?:/.test(u))??''});
  });
  let tableSection='',tableCategory='';
  for(const node of root.children){
    if(node.type==='heading'){
      if(node.depth===2)tableSection=toString(node);
      if(node.depth===3)tableCategory=toString(node);
    }
    if(node.type==='table' && !/排除|检索策略|覆盖核对/.test(tableSection)){
      const headers=node.children[0].children.map(n=>toString(n));
      const titleColumn=headers.findIndex(h=>/题名|标题/.test(h));
      if(titleColumn<0)continue;
      for(const row of node.children.slice(1)){
        const cells=row.children.map(n=>toString(n)),identifier=ids(cells.join(' '),urls(row));
        if(!identifier.doi&&!identifier.pmid)continue;
        const column=(pattern:RegExp)=>cells[headers.findIndex(h=>pattern.test(h))]??'';
        const pending=/待核验|未核实|待确认|pending/.test(tableSection+' '+tableCategory+' '+cells.join(' '));
        const title=cells[titleColumn];
        if(!title)throw new Error('Empty bibliography table title');
        out.push({...identifier,titleZh:/[\u4e00-\u9fff]/.test(title)?title:'',titleEn:/[\u4e00-\u9fff]/.test(title)?'':title,journal:column(/期刊/),date:column(/日期|发表/).match(/20\d{2}-\d{2}-\d{2}/)?.[0]??'',summary:column(/摘要|说明|证据/),category:tableCategory||tableSection,articleType:pending?'待核验':column(/类型/),scope:/边缘|外围/.test(tableSection)?'edge':'core'});
      }
    }
    if(node.type==='list' && /8\.2|待核验|不能正式归期/.test(tableCategory)){
      for(const item of node.children){
        const text=toString(item),identifier=ids(text,urls(item));if(!identifier.doi&&!identifier.pmid)continue;
        const paragraph=item.children[0];
        const english=paragraph?.type==='paragraph' && paragraph.children[0]?.type==='strong'?toString(paragraph.children[0]):'';
        if(!english)continue;
        out.push({...identifier,titleZh:'',titleEn:english,journal:text.match(/（([^；]+)；/)?.[1]??'',date:text.match(/20\d{2}-\d{2}-\d{2}/)?.[0]??'',summary:text,category:tableCategory,articleType:'待核验',scope:'core'});
      }
    }
  }
  // The lung report also supplies individually discussed preprint versions.
  if(topic==='lung-cancer') for(const node of root.children){
    if(node.type!=='paragraph' || !/^PRE-/.test(toString(node)))continue;
    const text=toString(node),identifier=ids(text,urls(node));
    if(!identifier.doi)throw new Error('Missing lung preprint DOI');
    const title=text.split('｜')[1]?.split('。')[0]??'';
    out.push({...identifier,pmid:'',titleZh:'',titleEn:title,journal:text.match(/medRxiv|bioRxiv/)?.[0]??'',date:text.match(/20\d{2}-\d{2}-\d{2}/)?.[0]??'',summary:text,category:'前沿附录（预印本）',scope:'core',articleType:'预印本'});
  }
  return out;
}

type Source = {batch:string; title:string;href:string;topic:string;category:string;summary:string;scope:string;verification:string;excerpt:string};
type Card = {id:string;titleZh:string;titleEn:string;journal:string;date:string;doi:string;pmid:string;summary:string;articleType:string;topics:string[];categories:string[];sources:Source[];aliases:string[];verification:string;tags:string[];notes:string;readingStatus:string;customFields:Record<string,string>};
const previous=existsSync('src/generated/card-library.json')?JSON.parse(read('src/generated/card-library.json')).papers as Card[]:[];
const oldAliases=new Map<string,string>();previous.forEach(p=>p.aliases.forEach(a=>oldAliases.set(a,p.id)));
const cards=new Map<string,Card>(), aliasMap=new Map<string,string>();
const batches:any[]=[];let sourceRecords=0;
for(const definition of definitions){
 const markdown=read(definition.file), report=definition.parser(markdown);
 const batch={id:definition.href.replace(/^\//,'').replace(/\/$/,'').replaceAll('/','-'),kind:definition.kind,title:definition.title,window:report.meta.trackingWindow,date:report.meta.retrievalDate,href:definition.href,file:definition.file};
 batches.push(batch);
 const parsed=report.papers;
 const extras=extraRecords(markdown,definition.topic,definition.file);
 const records=[...parsed];
 const present=new Set(parsed.flatMap(p=>[p.doi?'doi:'+p.doi.toLowerCase():'',p.pmid?'pmid:'+p.pmid:'']).filter(Boolean));
 for(const extra of extras){
   const keys=[extra.doi?'doi:'+extra.doi.toLowerCase():'',extra.pmid?'pmid:'+extra.pmid:''].filter(Boolean);
   if(keys.some(k=>present.has(k)))continue;
   records.push(extra as Paper);keys.forEach(k=>present.add(k));
 }
 for(const record of records){
  const p=Object.assign({titleZh:'',titleEn:'',journal:'',date:'',doi:'',pmid:'',summary:'',category:'未分类',scope:'core',articleType:'',slug:''},record);
  if(!p.titleZh&&!p.titleEn)throw new Error('Missing paper title');
  const aliases=[...(p.doi?['doi:'+p.doi.trim().toLowerCase()]:[]),...(p.pmid?['pmid:'+p.pmid]:[])];
  if(!aliases.length)aliases.push('title:'+normalizeTitle(p.titleEn||p.titleZh)+'|'+p.date);
  const existingIds=[...new Set(aliases.map(a=>aliasMap.get(a)).filter(Boolean))] as string[];
  let id=existingIds[0] ?? aliases.map(a=>oldAliases.get(a)).find(Boolean) ?? 'paper-'+digest(aliases[0]);
  for(const mergeId of existingIds.slice(1)){
   const merge=cards.get(mergeId)!,keep=cards.get(id)!;keep.sources.push(...merge.sources);keep.topics=[...new Set([...keep.topics,...merge.topics])];keep.categories=[...new Set([...keep.categories,...merge.categories])];keep.aliases.push(...merge.aliases);merge.aliases.forEach(a=>aliasMap.set(a,id));cards.delete(mergeId);
  }
  const verification=/待核验|pending|未充分核实/.test(p.articleType+' '+p.category)?'待核验':'来源已收录';
  const category=p.category.replace(/^[一二三四五六七八九十]+[、.．]\s*/,'').replace(/\s*[（(]\d+\s*篇[）)]/g,'').trim();
  const source:Source={batch:batch.id,title:batch.title,href:definition.href+(p.slug&&report.html.includes(`id="${p.slug}"`)?'#'+p.slug:''),topic:definition.topic,category,summary:p.summary??'',scope:p.scope??'core',verification,excerpt:JSON.stringify(record)};
  const existing=cards.get(id);
  if(existing){
   if(!existing.sources.some(s=>s.batch===source.batch&&s.category===category&&s.summary===source.summary))existing.sources.push(source);
   existing.topics=[...new Set([...existing.topics,definition.topic])];existing.categories=[...new Set([...existing.categories,category])];
   for(const field of ['titleZh','titleEn','journal','date','doi','pmid','summary','articleType'] as const)if(!existing[field]&&p[field])existing[field]=p[field]!;
   existing.aliases=[...new Set([...existing.aliases,...aliases])];
   if(verification==='待核验')existing.verification='含待核验来源';
  }else cards.set(id,{id,titleZh:p.titleZh,titleEn:p.titleEn,journal:p.journal,date:p.date,doi:p.doi??'',pmid:p.pmid??'',summary:p.summary??'',articleType:p.articleType,topics:[definition.topic],categories:[category],sources:[source],aliases,verification,tags:[],notes:'',readingStatus:'未读',customFields:{}});
  aliases.forEach(a=>aliasMap.set(a,id));sourceRecords++;
 }
}
const papers=[...cards.values()].sort((a,b)=>b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
const output={topics,batches,papers,stats:{sourceRecords,uniquePapers:papers.length,reports:batches.length,pending:papers.filter(p=>p.verification!=='来源已收录').length}};
writeFileSync('src/generated/card-library.json',JSON.stringify(output));
console.log(JSON.stringify({stats:output.stats,batches:batches.map(b=>({title:b.title,records:papers.filter(p=>p.sources.some(s=>s.batch===b.id)).length}))},null,2));
