import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { handleApi } from '../worker/api.js';
const port=4322;
mkdirSync('.sites-local',{recursive:true});
const sqlite=new DatabaseSync('.sites-local/cards.sqlite');
// Local preview applies the same generated, schema-only migrations as production.
sqlite.exec('CREATE TABLE IF NOT EXISTS local_migrations (name TEXT PRIMARY KEY)');
for(const name of readdirSync('drizzle').filter(n=>n.endsWith('.sql')).sort()){
 if(sqlite.prepare('SELECT name FROM local_migrations WHERE name = ?').get(name))continue;
 sqlite.exec(readFileSync(join('drizzle',name),'utf8'));sqlite.prepare('INSERT INTO local_migrations (name) VALUES (?)').run(name);
}
/** @param {string} sql */
const prepared=(sql)=>({
 /** @param {...import('node:sqlite').SQLInputValue} values */
 bind(...values){return statement(sql,values);},
 ...statement(sql,[])
});
export const DB={prepare:prepared};

/** @param {string} sql @param {import('node:sqlite').SQLInputValue[]} values */
function statement(sql,values){return {async first(){return sqlite.prepare(sql).get(...values)??null;},async all(){return {results:sqlite.prepare(sql).all(...values)};},async run(){const r=sqlite.prepare(sql).run(...values);return {meta:{changes:Number(r.changes)}};}};}
/** @type {Record<string,string>} */
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json'};
createServer(async(req,res)=>{
 try {
 const chunks=[];for await(const chunk of req)chunks.push(chunk);
 const headers=new Headers();for(const [key,value]of Object.entries(req.headers))if(value)headers.set(key,Array.isArray(value)?value.join(','):value);
 // Only this loopback development server supplies a local preview identity.
 headers.set('oai-authenticated-user-id','local-preview');
 const url=`http://127.0.0.1:${port}${req.url}`;
 const request=new Request(url,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method||'GET')?{body:Buffer.concat(chunks)}:{})});
 let response=await handleApi(request,{DB});
 if(!response){const pathname=decodeURIComponent(new URL(url).pathname);const path=join('dist',pathname.endsWith('/')?pathname+'index.html':pathname);if(!path.startsWith('dist/'))throw new Error('Invalid file path');if(existsSync(path)){const ext=path.slice(path.lastIndexOf('.'));response=new Response(readFileSync(path),{headers:{'Content-Type':mime[ext]||'application/octet-stream'}});}else response=new Response('Not found',{status:404});}
 res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch(error){console.error(error instanceof Error?error.message:'Local server failed');res.writeHead(500);res.end('Local preview failed');}
}).listen(port,'127.0.0.1',()=>console.log(`Local http://127.0.0.1:${port}/`));
