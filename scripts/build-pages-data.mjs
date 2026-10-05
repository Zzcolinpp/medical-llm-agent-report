import { mkdir, writeFile } from 'node:fs/promises';
import library from '../src/generated/card-library.json' with { type: 'json' };

// Publish the report snapshot only. Personal edits remain in the Sites database.
const papers=library.papers.map(p=>({
 ...p,
 sources:p.sources.map(({excerpt,...source})=>source),
 revision:0,
 updatedAt:''
}));
await mkdir('dist/data',{recursive:true});
await writeFile('dist/data/card-library.json',JSON.stringify({...library,papers}));
await writeFile('dist/.nojekyll','');
console.log(`GitHub Pages: ${papers.length} cards, ${library.batches.length} report backups.`);
