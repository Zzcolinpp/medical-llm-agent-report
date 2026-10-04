import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync, rmSync } from 'node:fs';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
// A self-contained Worker preserves the existing Astro document routes and serves
// their compressed output, alongside the persistent card API.
/** @type {Record<string,string>} */
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
/** @type {Record<string,[string,string]>} */
const assets={};
/** @param {string} dir */
function collect(dir){for(const name of readdirSync(dir)){if(['server','.openai','drizzle'].includes(name))continue;const p=join(dir,name);if(name==='.DS_Store'){rmSync(p);continue;}if(statSync(p).isDirectory())collect(p);else {const path='/'+p.slice('dist/'.length);assets[path]=[types[extname(p)]||'application/octet-stream',gzipSync(readFileSync(p)).toString('base64')];}}}
collect('dist');
const api=readFileSync('worker/api.js','utf8').replace(/^import library[^\n]+\n/,'const library = '+readFileSync('src/generated/card-library.json','utf8')+';\n').replace(/export /g,'');
const entry=`${api}\nconst assets=${JSON.stringify(assets)};\n${readFileSync('worker/index.js','utf8').replace('export function','function')}`+'\nexport default createWorker(assets,handleApi);\n';
mkdirSync('dist/server',{recursive:true});writeFileSync('dist/server/index.js',entry);
mkdirSync('dist/.openai',{recursive:true});cpSync('.openai/hosting.json','dist/.openai/hosting.json');
rmSync('dist/.openai/drizzle',{recursive:true,force:true});cpSync('drizzle','dist/.openai/drizzle',{recursive:true});
console.log(JSON.stringify({assetFiles:Object.keys(assets).length,workerBytes:Buffer.byteLength(entry),compressedWorkerBytes:gzipSync(entry).length}));
