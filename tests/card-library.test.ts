import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { DatabaseSync, type SQLInputValue } from 'node:sqlite';
import library from '../src/generated/card-library.json';
import { handleApi } from '../worker/api.js';

function database() {
 const sqlite=new DatabaseSync(':memory:');
 sqlite.exec(readFileSync('drizzle/0000_steady_husk.sql','utf8'));
 const statement=(sql:string,values:SQLInputValue[]=[])=>({bind(...args:SQLInputValue[]){return statement(sql,args);},async first(){return sqlite.prepare(sql).get(...values)??null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const result=sqlite.prepare(sql).run(...values);return {meta:{changes:Number(result.changes)}};}});
 return {sqlite,env:{DB:{prepare:statement}}};
}
const paper=library.papers.find(p=>p.sources.length>1)!;
const fields=()=>Object.fromEntries(['titleZh','titleEn','journal','date','doi','pmid','summary','articleType','notes','topics','categories','tags','readingStatus','customFields'].map(k=>[k,paper[k as keyof typeof paper]]));
const put=(body:unknown,headers:Record<string,string>={})=>new Request('https://preview.test/api/cards/'+paper.id,{method:'PUT',headers:{origin:'https://preview.test','content-type':'application/json','oai-authenticated-user-id':'test-owner',...headers},body:JSON.stringify(body)});

test('inventory preserves source memberships and unifies identifiers',()=>{
 assert.equal(library.batches.length,13);
 const identifiers=new Set<string>();
 const batchIds=new Set(library.batches.map(b=>b.id));
 for(const p of library.papers){assert.ok(p.sources.length);assert.ok(p.titleZh||p.titleEn);for(const alias of p.aliases){assert.ok(!identifiers.has(alias),'duplicate '+alias);identifiers.add(alias);}for(const source of p.sources)assert.ok(batchIds.has(source.batch));}
 assert.equal(library.papers.filter(p=>p.topics.includes('lung-cancer')).length,45);
 assert.ok(library.papers.some(p=>p.sources.some(s=>s.batch==='medical-agent-report')&&p.sources.some(s=>s.batch.startsWith('monthly-'))));
});
test('saved revisions retain immutable source records across reads and views',async()=>{
 const {env,sqlite}=database();const edited={...fields(),notes:'持久笔记',tags:['证据复核'],readingStatus:'已读',customFields:{研究设计:'随机对照试验'}};
 const response=await handleApi(put({revision:0,fields:edited}),env);assert.equal(response!.status,200);
 const detail=await (await handleApi(new Request('https://preview.test/api/cards/'+paper.id),env))!.json();
 assert.equal(detail.revision,1);assert.equal(detail.notes,'持久笔记');assert.deepEqual(detail.original,paper);assert.deepEqual(detail.sources,paper.sources);
 const all=await (await handleApi(new Request('https://preview.test/api/library'),env))!.json();assert.equal(all.papers.find((p:{id:string})=>p.id===paper.id).notes,'持久笔记');
 assert.equal((await handleApi(put({revision:0,fields:edited}),env))!.status,409);
 assert.equal((await handleApi(put({revision:1,fields:{...edited,notes:'修订笔记'}}),env))!.status,200);
 assert.equal(sqlite.prepare('SELECT revision FROM card_edits WHERE card_id = ?').get(paper.id)!.revision,2);sqlite.close();
});
test('invalid changes and unauthenticated or foreign-origin writes are rejected',async()=>{
 const {env,sqlite}=database();
 for(const [key,value]of [['date','2026-02-30'],['doi','bad-doi'],['pmid','not-numeric'],['topics',[]],['titleZh','']] as const){if(key==='titleZh')continue;assert.equal((await handleApi(put({revision:0,fields:{...fields(),[key]:value}}),env))!.status,400);}
 assert.equal((await handleApi(put({revision:0,fields:fields()},{'oai-authenticated-user-id':''}),env))!.status,401);
 assert.equal((await handleApi(put({revision:0,fields:fields()},{origin:'https://another.test'}),env))!.status,403);
 const other=library.papers.find(p=>p.id!==paper.id&&p.doi)!;assert.equal((await handleApi(put({revision:0,fields:{...fields(),doi:other.doi}}),env))!.status,409);
 assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM card_edits').get()!.n,0);sqlite.close();
});


test('lung-cancer index uses declared topics instead of a preceding suggestion heading',()=>{
 const lung=library.papers.filter(p=>p.topics.includes('lung-cancer'));
 assert.ok(lung.every(p=>p.categories.every(c=>!c.startsWith('建议'))));
 const caspase=lung.find(p=>p.pmid==='42600019')!;
 assert.ok(caspase.categories.some(c=>c.startsWith('LC03｜')));
 assert.equal(caspase.journal,'Science Advances');
 const masai=lung.find(p=>p.pmid==='41620232')!;
 assert.ok(masai.categories.includes('跨癌种预防与借鉴'));
 assert.equal(masai.journal,'The Lancet');
 assert.notEqual(masai.verification,'来源已收录');
});
