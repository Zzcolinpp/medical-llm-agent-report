import type seed from '../generated/card-library.json';
type Card = Omit<typeof seed.papers[number],'customFields'> & {customFields:Record<string,string>} & { revision:number; updatedAt:string };
type Library = Omit<typeof seed,'papers'> & {papers:Card[]};
type Detail = Card & { original:typeof seed.papers[number] };
const root=document.querySelector<HTMLElement>('[data-workbench]');
if(root) {
 const el=<T extends HTMLElement>(s:string)=>root.querySelector<T>(s)!;
 const esc=(v:unknown)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
 const base=document.body.dataset.base||'/';
 const status=el<HTMLElement>('.workspace-status'), retry=el<HTMLButtonElement>('.retry-library');
 const query=el<HTMLInputElement>('[name=q]'), topic=el<HTMLSelectElement>('[name=topic]'), batch=el<HTMLSelectElement>('[name=batch]');
 const reading=el<HTMLSelectElement>('[name=reading]'), verification=el<HTMLSelectElement>('[name=verification]'), year=el<HTMLSelectElement>('[name=year]'), sort=el<HTMLSelectElement>('[name=sort]');
 const params=new URLSearchParams(location.search);
 const kindMap:Record<string,string>={年度报告:'annual',月度报告:'monthly',专题报告:'selection'};
 const kind=root.dataset.kind||(kindMap[params.get('kind')||'']??params.get('kind'))||'';
 let data:Library, page=1, distribution='category', chartSelection='', selectedCard:Detail|undefined;
 const pageSize=el<HTMLSelectElement>('[name=page-size]');
 const resultsHeading=el<HTMLElement>('[data-results-heading]');
 const indexDetails=el<HTMLDetailsElement>('.reader-index');
 const narrowView=matchMedia('(max-width: 800px)');
 indexDetails.open=!narrowView.matches;
 narrowView.addEventListener('change',event=>{indexDetails.open=!event.matches;});
 const dialog=el<HTMLDialogElement>('dialog');
 query.value=params.get('q')||'';topic.value=root.dataset.topic||params.get('topic')||'';
 if(root.dataset.topic)topic.disabled=true;
 const resultList=el<HTMLElement>('[data-paper-list]');
 const option=(value:string,label:string)=>`<option value="${esc(value)}">${esc(label)}</option>`;
 async function request<T>(url:string,options?:RequestInit):Promise<T>{
  const response=await fetch(base+url,options);
  const body=await response.json();if(!response.ok)throw new Error(body.error||'无法读取文献库。');return body;
 }
 async function load(){
  status.textContent='正在读取文献库…';retry.hidden=true;
  try {
   data=await request<Library>('api/library');
   const scope=data.papers.filter(p=>inScope(p)&&(!root!.dataset.topic||p.topics.includes(root!.dataset.topic)));
   status.textContent=`${scope.length.toLocaleString('zh-CN')} 篇文献 · ${new Set(scope.flatMap(p=>p.sources.filter(s=>data.batches.some(b=>b.id===s.batch&&(!kind||b.kind===kind))).map(s=>s.batch))).size} 份报告来源 · 笔记与修订同步保存`;
   const scopedBatches=data.batches.filter(b=>(!kind||b.kind===kind)&&(!root!.dataset.period||b.id.startsWith('monthly-'+root!.dataset.period+'-'))&&(!root!.dataset.topic||data.papers.some(p=>p.topics.includes(root!.dataset.topic!)&&p.sources.some(s=>s.batch===b.id))));
   batch.innerHTML=option('','全部批次')+scopedBatches.map(b=>option(b.id,b.title)).join('');batch.value=params.get('batch')||params.get('report')?.replace(/^\/|\/$/g,'').replaceAll('/','-')||'';
   year.innerHTML=option('','全部年份')+[...new Set(data.papers.map(p=>p.date.slice(0,4)).filter(Boolean))].sort().reverse().map(y=>option(y,y)).join('');
   root!.querySelectorAll<HTMLSelectElement>('.card-filters select, [name=page-size]').forEach(control=>control.disabled=false);
   topic.disabled=!!root!.dataset.topic;
   root!.querySelectorAll<HTMLButtonElement>('[data-distribution], [data-index-all], .card-search button').forEach(button=>button.disabled=false);
   restoreLocation();renderBatches();render();
   if(params.get('card'))await openCard(params.get('card')!);
  }catch(error){status.textContent=error instanceof Error?error.message:'无法读取文献库。';retry.hidden=false;resultList.innerHTML='';}
 }
 function inScope(p:Card){return p.sources.some(s=>data.batches.some(b=>b.id===s.batch&&(!kind||b.kind===kind)&&(!root!.dataset.period||b.id.startsWith('monthly-'+root!.dataset.period+'-'))));}
 function renderBatches(){
  const target=root!.querySelector('[data-batches]');if(!target)return;
  target.innerHTML=data.batches.filter(b=>(!kind||b.kind===kind)&&(!root!.dataset.period||b.id.startsWith('monthly-'+root!.dataset.period+'-'))&&data.papers.some(p=>p.sources.some(s=>s.batch===b.id))).sort((a,b)=>b.date.localeCompare(a.date)||b.window.localeCompare(a.window)).map(b=>{
   const papers=data.papers.filter(p=>p.sources.some(s=>s.batch===b.id));
   return `<article class="batch-card"><header><h3>${esc(b.title)}</h3><a href="${esc(base+b.href.slice(1))}">查看原始报告</a></header><p>${esc(b.window)} · 检索截止 ${esc(b.date)}</p><div class="batch-topics">${data.topics.filter(t=>papers.some(p=>p.topics.includes(t.id))).map(t=>`<button type="button" data-batch-topic="${esc(t.id)}" data-batch-id="${esc(b.id)}">${esc(t.label)} · ${papers.filter(p=>p.topics.includes(t.id)).length} 篇</button>`).join('')}</div></article>`;
  }).join('');
 }
 function filtered(){
  const q=query.value.trim().toLowerCase();
  return data.papers.filter(p=>inScope(p)&&(!topic.value||p.topics.includes(topic.value))&&(!batch.value||p.sources.some(s=>s.batch===batch.value))&&(!reading.value||p.readingStatus===reading.value)&&(!verification.value||(verification.value==='included'?p.verification==='来源已收录':p.verification!=='来源已收录'))&&(!year.value||p.date.startsWith(year.value))&&(!q||[p.titleZh,p.titleEn,p.doi,p.pmid,p.summary,p.journal,p.notes,...p.categories,...p.tags,...Object.keys(p.customFields),...Object.values(p.customFields)].join(' ').toLowerCase().includes(q)));
 }
 function distributionValues(p:Card){return distribution==='journal'?[p.journal||'期刊未注明']:p.categories.length?p.categories:['未分类'];}
 function drawChart(papers:Card[]){
  const counts=new Map<string,number>();papers.forEach(p=>[...new Set(distributionValues(p))].forEach(v=>counts.set(v,(counts.get(v)||0)+1)));
  const rows=[...counts].sort((a,b)=>distribution==='category'?(Number(!/^LC\d+/.test(a[0]))-Number(!/^LC\d+/.test(b[0]))||a[0].localeCompare(b[0],'zh-CN',{numeric:true})):b[1]-a[1]||a[0].localeCompare(b[0]));
  const max=Math.max(1,...rows.map(row=>row[1]));
  el<HTMLElement>('[data-chart]').innerHTML=rows.map(([label,count])=>`<button type="button" class="reader-index-item" data-chart-value="${esc(label)}" aria-pressed="${label===chartSelection}" aria-label="${esc(label)}：${count} 篇"><span class="index-item-label">${esc(label)}</span><strong>${count}</strong><span class="index-item-track" aria-hidden="true"><i style="width:${count/max*100}%"></i></span></button>`).join('')||'<p>当前范围没有可用索引。</p>';
  el<HTMLElement>('[data-index-total]').textContent=String(papers.length);
  el<HTMLElement>('[data-index-caption]').textContent=distribution==='journal'?'按期刊':'按专题';
  el<HTMLElement>('.reader-index-note').textContent=distribution==='journal'?'按期刊名称汇总，未注明期刊的记录单独列出。':'同一篇文献可归入多个专题，各专题篇数不宜直接相加。';
  el<HTMLElement>('[data-index-all]').setAttribute('aria-pressed',String(!chartSelection));
  root!.querySelectorAll<HTMLElement>('[data-distribution]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.distribution===distribution)));
  el<HTMLButtonElement>('[data-chart-reset]').hidden=!chartSelection;
 }
 function cardHtml(p:Card,index:number){
  const sources=[...new Map(p.sources.map(source=>[source.batch,source])).values()];
  return `<article class="literature-card" id="${p.id}" aria-labelledby="title-${p.id}">
   <header class="paper-row-header"><div class="literature-card__meta"><span class="paper-number">${String(index+1).padStart(2,'0')}</span><span>${esc(p.journal||'期刊未注明')}</span><span>${esc(p.date||'日期未注明')}</span>${p.articleType?`<span>${esc(p.articleType)}</span>`:''}</div><button type="button" class="paper-edit" data-card-edit="${p.id}">编辑卡片</button></header>
   <h3 id="title-${p.id}">${esc(p.titleZh||p.titleEn)}</h3>
   ${p.titleZh&&p.titleEn?`<p class="literature-card__english">${esc(p.titleEn)}</p>`:''}
   <div class="paper-identifiers">${p.doi?`<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noreferrer">DOI：${esc(p.doi)}</a>`:''}${p.pmid?`<a href="https://pubmed.ncbi.nlm.nih.gov/${esc(p.pmid)}/" target="_blank" rel="noreferrer">PMID：${esc(p.pmid)}</a>`:''}</div>
   <div class="literature-card__tags">${p.topics.map(id=>`<span class="card-tag">${esc(data.topics.find(t=>t.id===id)?.label||id)}</span>`).join('')}${p.categories.map(c=>`<span class="card-tag">${esc(c)}</span>`).join('')}${p.tags.map(tag=>`<span class="card-tag card-tag--personal">${esc(tag)}</span>`).join('')}<span class="card-tag ${p.verification==='来源已收录'?'':'card-tag--pending'}">${esc(p.verification)}</span><span class="card-tag card-tag--read">${esc(p.readingStatus)}</span></div>
   <section class="paper-content-section"><h4>摘要与证据说明</h4><p class="literature-card__summary">${esc(p.summary||'原报告仅提供题录，尚无摘要说明。')}</p></section>
   ${p.notes?`<section class="paper-notes"><h4>我的笔记</h4><p class="detail-note">${esc(p.notes)}</p></section>`:''}
   ${Object.keys(p.customFields).length?`<section class="paper-custom"><h4>补充信息</h4><dl>${Object.entries(p.customFields).map(([key,value])=>`<div><dt>${esc(key)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl></section>`:''}
   <footer class="paper-sources"><h4>报告来源 · ${sources.length} 份</h4><ul>${sources.map(source=>`<li><a href="${esc(base+source.href.slice(1))}" target="_blank" rel="noreferrer">${esc(source.title)}</a><span>${esc(data.batches.find(b=>b.id===source.batch)?.window||'')}</span></li>`).join('')}</ul><div class="paper-row-actions"><button type="button" data-card-link="${p.id}">复制卡片链接</button><button type="button" data-open="${p.id}">对照原始记录</button>${p.updatedAt?`<span>最近编辑：${esc(new Date(p.updatedAt).toLocaleString('zh-CN'))}</span>`:''}</div></footer>
  </article>`;
 }
 function updateTopicCounts(){
  root!.querySelectorAll<HTMLAnchorElement>('[data-home-topics] a').forEach(a=>{
   const id=a.getAttribute('href')!.split('/').filter(Boolean).at(-1)!;
   const count=data.papers.filter(p=>p.topics.includes(id)).length;
   a.querySelector('strong')!.textContent=`${count.toLocaleString('zh-CN')} 篇`;
   const bar=a.querySelector<HTMLElement>('i')!;bar.style.width=count/data.papers.length*100+'%';
  });
 }
 function restoreLocation(){
  const search=new URLSearchParams(location.search);
  query.value=search.get('q')||'';topic.value=root!.dataset.topic||search.get('topic')||'';
  batch.value=search.get('batch')||search.get('report')?.replace(/^\/|\/$/g,'').replaceAll('/','-')||'';
  reading.value=search.get('reading')||'';verification.value=search.get('verification')||'';year.value=search.get('year')||'';sort.value=search.get('sort')||'date';
  distribution=search.get('index')==='journal'?'journal':'category';chartSelection=search.get('group')||'';
  const requestedSize=search.get('size')||'10';pageSize.value=['10','20','50'].includes(requestedSize)?requestedSize:'10';
  const requestedPage=Number(search.get('page'));page=Number.isSafeInteger(requestedPage)&&requestedPage>0?requestedPage:1;
 }
 function saveLocation(push=false){
  const url=new URL(location.href);
  const state:Record<string,string>={q:query.value.trim(),topic:root!.dataset.topic?'':topic.value,batch:batch.value,reading:reading.value,verification:verification.value,year:year.value,sort:sort.value==='date'?'':sort.value,index:distribution==='journal'?'journal':'',group:chartSelection,page:page===1?'':String(page),size:pageSize.value==='10'?'':pageSize.value};
  Object.entries(state).forEach(([key,value])=>value?url.searchParams.set(key,value):url.searchParams.delete(key));
  url.searchParams.delete('report');
  if(url.href!==location.href)history[push?'pushState':'replaceState'](null,'',url);
 }
 function focusResults(){
  const narrowView=matchMedia('(max-width: 800px)');
 indexDetails.open=!narrowView.matches;
 narrowView.addEventListener('change',event=>{indexDetails.open=!event.matches;});
  resultsHeading.focus({preventScroll:true});resultsHeading.scrollIntoView({block:'start',behavior:'instant'});
 }
 function render(){
  const initial=filtered();drawChart(initial);
  const papers=initial.filter(p=>!chartSelection||distributionValues(p).includes(chartSelection));
  papers.sort((a,b)=>sort.value==='title'?(a.titleZh||a.titleEn).localeCompare(b.titleZh||b.titleEn,'zh-CN'):sort.value==='updated'?b.updatedAt.localeCompare(a.updatedAt)||b.date.localeCompare(a.date):b.date.localeCompare(a.date)||a.id.localeCompare(b.id));
  const size=Number(pageSize.value),pages=Math.max(1,Math.ceil(papers.length/size));page=Math.max(1,Math.min(page,pages));
  const start=(page-1)*size,end=Math.min(page*size,papers.length);
  resultList.innerHTML=papers.slice(start,end).map((p,index)=>cardHtml(p,start+index)).join('')||'<p class="empty-cards">没有符合条件的文献。可选择左侧“全部文献”，或调整检索词和筛选条件。</p>';
  el<HTMLElement>('[data-selection-title]').textContent=chartSelection||'全部文献';
  el<HTMLElement>('[data-result-count]').textContent=`共 ${papers.length.toLocaleString('zh-CN')} 篇 · 第 ${page} / ${pages} 页 · 当前显示 ${papers.length?start+1:0}–${end} 篇`;
  const filters=[query.value.trim()?`检索：${query.value.trim()}`:'',topic.value?topic.selectedOptions[0]?.textContent:'',batch.value?batch.selectedOptions[0]?.textContent:'',reading.value,verification.value?verification.selectedOptions[0]?.textContent:'',year.value?year.value+' 年':''].filter(Boolean);
  el<HTMLElement>('[data-filter-context]').textContent=filters.join(' · ');
  const numbered=[...new Set([1,...Array.from({length:5},(_,i)=>page+i-2).filter(n=>n>=1&&n<=pages),pages])].sort((a,b)=>a-b);
  const buttons=numbered.map((n,i)=>`${i&&n-numbered[i-1]>1?'<span aria-hidden="true">…</span>':''}<button type="button" data-goto="${n}" aria-label="第 ${n} 页" ${n===page?'aria-current="page"':''}>${n}</button>`).join('');
  root!.querySelectorAll<HTMLElement>('[data-page-buttons]').forEach(e=>e.innerHTML=buttons);
  root!.querySelectorAll<HTMLElement>('[data-page]').forEach(e=>e.textContent=`${page} / ${pages}`);
  root!.querySelectorAll<HTMLButtonElement>('[data-prev]').forEach(b=>b.disabled=page<=1);
  root!.querySelectorAll<HTMLButtonElement>('[data-next]').forEach(b=>b.disabled=page>=pages);
  updateTopicCounts();
 }
 function showDetail(p:Detail){
  el<HTMLElement>('[data-detail]').innerHTML=`<div class="card-detail-body"><h2 id="detail-title">${esc(p.titleZh||p.titleEn)}</h2><p class="detail-english">${esc(p.titleEn)}</p><div class="detail-metadata"><span>${esc(p.journal||'期刊未注明')}</span><span>${esc(p.date||'日期未注明')}</span><span>${esc(p.readingStatus)}</span><span>${esc(p.verification)}</span>${p.doi?`<a href="https://doi.org/${esc(p.doi)}" target="_blank" rel="noreferrer">DOI ${esc(p.doi)}</a>`:''}${p.pmid?`<a href="https://pubmed.ncbi.nlm.nih.gov/${esc(p.pmid)}/" target="_blank" rel="noreferrer">PMID ${esc(p.pmid)}</a>`:''}</div><div class="detail-actions"><button type="button" data-edit>编辑卡片</button><button type="button" data-link>复制卡片链接</button></div><div class="literature-card__tags">${p.categories.map(c=>`<span class="card-tag">${esc(c)}</span>`).join('')}${p.tags.map(t=>`<span class="card-tag">${esc(t)}</span>`).join('')}</div><h3 class="detail-section-title">摘要与证据说明</h3><p class="detail-summary">${esc(p.summary||'原报告未提供摘要说明。')}</p><h3 class="detail-section-title">我的笔记</h3><p class="detail-note">${esc(p.notes||'尚未添加笔记。')}</p>${Object.keys(p.customFields).length?`<h3 class="detail-section-title">补充信息</h3>${Object.entries(p.customFields).map(([k,v])=>`<h4>${esc(k)}</h4><p class="detail-note">${esc(v)}</p>`).join('')}`:''}<h3 class="detail-section-title">原始来源 · ${new Set(p.sources.map(s=>s.batch)).size} 份报告</h3>${p.sources.map(s=>`<details class="source-record"><summary>${esc(s.title)} · ${esc(s.category)} · ${esc(s.verification)}</summary><p>${esc(s.summary||'原来源仅提供题录。')}</p><a href="${esc(base+s.href.slice(1))}">阅读报告备份</a></details>`).join('')}<details class="source-record"><summary>查看导入时的基础信息</summary><p>中文标题：${esc(p.original.titleZh)}\n英文标题：${esc(p.original.titleEn)}\n期刊：${esc(p.original.journal)}\n日期：${esc(p.original.date)}\nDOI：${esc(p.original.doi)}\nPMID：${esc(p.original.pmid)}</p></details>${p.updatedAt?`<p class="workspace-status">最近保存：${esc(new Date(p.updatedAt).toLocaleString('zh-CN'))}</p>`:''}</div>`;
 }
 async function openCard(id:string,editing=false){
  dialog.showModal();el<HTMLElement>('[data-detail]').innerHTML='<div class="card-detail-body"><h2 id="detail-title">正在读取卡片…</h2></div>';
  try{selectedCard=await request<Detail>('api/cards/'+id);if(editing)editCard();else showDetail(selectedCard);}catch(e){el<HTMLElement>('[data-detail]').innerHTML=`<div class="card-detail-body"><h2 id="detail-title">无法读取卡片</h2><p>${esc(e instanceof Error?e.message:'请重试。')}</p></div>`;}
 }
 function customRow(key='',value=''){return `<div class="custom-field-row"><input aria-label="自定义字段名称" placeholder="字段名称" value="${esc(key)}" /><input aria-label="自定义字段内容" placeholder="补充信息" value="${esc(value)}" /><button type="button" data-remove-custom>移除</button></div>`;}
 function editCard(){
  const p=selectedCard!;
  const field=(key:string,label:string,multiline=false)=>`<label class="${multiline?'full-width':''}">${label}${multiline?`<textarea name="${key}">${esc(p[key as keyof Detail])}</textarea>`:`<input name="${key}" value="${esc(p[key as keyof Detail])}" />`}</label>`;
  el<HTMLElement>('[data-detail]').innerHTML=`<div class="card-detail-body"><h2 id="detail-title">编辑文献卡片</h2><p class="workspace-status">修改会同步到所有关联板块，原始报告记录独立保留。</p><form class="card-edit-form">${field('titleZh','中文标题')}${field('titleEn','英文标题')}${field('journal','期刊')}${field('date','发表日期（YYYY-MM-DD 或 YYYY-MM）')}${field('doi','DOI')}${field('pmid','PMID')}${field('articleType','文章类型')}<label>阅读状态<select name="readingStatus">${['未读','阅读中','已读'].map(v=>`<option ${v===p.readingStatus?'selected':''}>${v}</option>`).join('')}</select></label><fieldset class="edit-topics"><legend>医学主题（可多选）</legend>${data.topics.map(t=>`<label><input type="checkbox" name="topics" value="${t.id}" ${p.topics.includes(t.id)?'checked':''}/>${esc(t.label)}</label>`).join('')}</fieldset><label class="full-width">细分专题（每行一个）<textarea name="categories">${esc(p.categories.join('\n'))}</textarea></label><label class="full-width">标签（逗号分隔）<input name="tags" value="${esc(p.tags.join('，'))}" /></label>${field('summary','摘要与证据说明',true)}${field('notes','我的笔记',true)}<section class="full-width"><h3 class="detail-section-title">自定义字段</h3><div data-custom-fields>${Object.entries(p.customFields).map(([k,v])=>customRow(k,v)).join('')}</div><button class="add-custom-field" type="button" data-add-custom>添加字段</button></section><p class="edit-message" role="alert"></p><div class="edit-save"><button type="submit">保存修改</button><button type="button" data-cancel-edit>取消编辑</button></div></form></div>`;
 }
 async function save(form:HTMLFormElement){
  const error=form.querySelector<HTMLElement>('.edit-message')!;error.textContent='';
  const fields:Record<string,unknown>={};new FormData(form).forEach((value,key)=>{if(key!=='topics')fields[key]=String(value);});
  fields.topics=new FormData(form).getAll('topics').map(String);
  fields.categories=String(fields.categories).split('\n').map(s=>s.trim()).filter(Boolean);
  fields.tags=String(fields.tags).split(/[,，]/).map(s=>s.trim()).filter(Boolean);
  const custom:Record<string,string>=Object.create(null);let duplicate=false;
  form.querySelectorAll('.custom-field-row').forEach(row=>{const inputs=row.querySelectorAll('input');const key=inputs[0].value.trim();if(key){if(Object.hasOwn(custom,key))duplicate=true;custom[key]=inputs[1].value;}else if(inputs[1].value.trim()){duplicate=true;}});
  if(duplicate){error.textContent='自定义字段名称不能为空或重复。';return;}fields.customFields=custom;
  const button=form.querySelector<HTMLButtonElement>('[type=submit]')!;button.disabled=true;button.textContent='正在保存…';
  try{
   const saved=await request<Card>('api/cards/'+selectedCard!.id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({revision:selectedCard!.revision,fields})});
   selectedCard={...selectedCard!,...saved};data.papers[data.papers.findIndex(p=>p.id===saved.id)]={...data.papers.find(p=>p.id===saved.id)!,...saved};showDetail(selectedCard);renderBatches();render();status.textContent='卡片已保存，所有关联板块使用同一份修订与笔记。';
  }catch(e){error.textContent=e instanceof Error?e.message:'保存失败，请重试。';button.disabled=false;button.textContent='保存修改';}
 }
 root.addEventListener('click',async event=>{
  const button=(event.target as HTMLElement).closest<HTMLElement>('button');if(!button)return;
  if(button.dataset.cardEdit)await openCard(button.dataset.cardEdit,true);
  else if(button.dataset.open)await openCard(button.dataset.open);
  else if(button.hasAttribute('data-close')){if(!dialog.querySelector('.card-edit-form')||confirm('关闭会放弃当前未保存的修改，是否继续？'))dialog.close();}
  else if(button.hasAttribute('data-edit'))editCard();
  else if(button.hasAttribute('data-cancel-edit'))showDetail(selectedCard!);
  else if(button.hasAttribute('data-add-custom'))el<HTMLElement>('[data-custom-fields]').insertAdjacentHTML('beforeend',customRow());
  else if(button.hasAttribute('data-remove-custom'))button.closest('.custom-field-row')!.remove();
  else if(button.dataset.distribution){distribution=button.dataset.distribution;chartSelection='';page=1;render();saveLocation(true);}
  else if(button.dataset.chartValue){chartSelection=button.dataset.chartValue;page=1;render();saveLocation(true);focusResults();}
  else if(button.hasAttribute('data-chart-reset')||button.hasAttribute('data-index-all')){chartSelection='';page=1;render();saveLocation(true);focusResults();}
  else if(button.hasAttribute('data-prev')||button.hasAttribute('data-next')||button.dataset.goto){page=button.dataset.goto?Number(button.dataset.goto):page+(button.hasAttribute('data-prev')?-1:1);render();saveLocation(true);focusResults();}
  else if(button.dataset.batchTopic){topic.value=button.dataset.batchTopic;batch.value=button.dataset.batchId!;chartSelection='';page=1;render();saveLocation(true);focusResults();}
  else if(button.hasAttribute('data-link')||button.dataset.cardLink){try{await navigator.clipboard.writeText(location.origin+base+'library/?card='+(button.dataset.cardLink||selectedCard!.id));button.textContent='已复制';}catch{button.textContent='复制失败，请重试';}}

 });
 root.addEventListener('submit',event=>{event.preventDefault();clearTimeout(searchTimer);const form=event.target as HTMLFormElement;if(form.classList.contains('card-edit-form'))void save(form);else {if(['home','topics'].includes(root!.dataset.mode||'')){location.href=base+'library/?q='+encodeURIComponent(query.value);}else if(data){page=1;chartSelection='';render();saveLocation(true);focusResults();}}});
 [topic,batch,reading,verification,year,sort,pageSize].forEach(control=>control.addEventListener('change',()=>{page=1;if(control!==pageSize&&control!==sort)chartSelection='';render();saveLocation(true);focusResults();}));
 let searchTimer:ReturnType<typeof setTimeout>;query.addEventListener('input',()=>{clearTimeout(searchTimer);if(['home','topics'].includes(root!.dataset.mode||''))return;searchTimer=setTimeout(()=>{if(!data)return;page=1;chartSelection='';render();saveLocation();},180);});
 window.addEventListener('popstate',()=>{if(!data)return;restoreLocation();render();focusResults();});
 retry.addEventListener('click',()=>void load());
 dialog.addEventListener('cancel',event=>{if(dialog.querySelector('.card-edit-form')&&!confirm('关闭会放弃当前未保存的修改，是否继续？'))event.preventDefault();});
 void load();
}
