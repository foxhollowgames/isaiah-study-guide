const $=s=>document.querySelector(s),esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const loadingControls=[...document.querySelectorAll('button,input,select')];loadingControls.forEach(control=>control.disabled=true);
const bookId=new URLSearchParams(location.search).get('book')||'genesis';
let data,art={},map,overlay,base,selectedPlace=null,sourceFilter='all';
const defaults={chapter:1,verse:1,view:'read',perspective:'historical',historicalArtOnly:false,layers:{places:true,routes:true,events:true,people:true,meanings:true}};
let saved={};try{saved=JSON.parse(localStorage.getItem(`bible-${bookId}-state`))||{};}catch{}
const state={...defaults,...saved,layers:{...defaults.layers,...saved.layers}};
const hash=new URLSearchParams(location.hash.slice(1));
if(hash.has('chapter'))state.chapter=Number(hash.get('chapter'));
if(hash.has('verse'))state.verse=Number(hash.get('verse'));
if(['read','map'].includes(hash.get('view')))state.view=hash.get('view');
if(['historical','lds'].includes(hash.get('mode')))state.perspective=hash.get('mode');
function persist(){try{localStorage.setItem(`bible-${bookId}-state`,JSON.stringify(state));}catch{}history.replaceState(null,'',`${location.pathname}?book=${encodeURIComponent(bookId)}#${new URLSearchParams({chapter:state.chapter,verse:state.verse,view:state.view,mode:state.perspective})}`);}
function source(id){return data.sources.find(s=>s.id===id);}
function visibleSource(s){return s&&(s.perspective!=='lds'||state.perspective==='lds');}
function refs(ids){return `<div class="source-links">${[...new Set(ids)].filter(id=>visibleSource(source(id))).map(id=>`<button data-source="${esc(id)}">${esc(source(id).title)}</button>`).join('')}</div>`;}
function portrait(id){const image=art[id];return state.historicalArtOnly&&image?.generated?null:image;}
function person(id){return data.people.find(p=>p.id===id);}
function personTiles(ids){return `<div class="people-grid">${ids.map(id=>{const p=person(id);if(!p)return '';const image=portrait(id);return `<button class="person-tile" data-person="${esc(id)}">${image?`<img src="${esc(image.src)}" alt="Artwork illustrating ${esc(p.name)}" loading="lazy">`:`<span class="initial" aria-hidden="true">${esc(p.name[0])}</span>`}<strong>${esc(p.name)}</strong><small>${esc(p.role)}</small></button>`;}).join('')}</div>`;}
function linkedText(text){
  const names=[];for(const p of data.people){for(const name of p.name.split(' / '))if(name.length>=3)names.push({name,id:p.id});}
  names.sort((a,b)=>b.name.length-a.name.length);
  const pattern=new RegExp(`\\b(${names.map(p=>p.name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')})\\b`,'g');
  let last=0,out='';for(const match of text.matchAll(pattern)){const p=names.find(p=>p.name===match[0]);out+=esc(text.slice(last,match.index))+`<button class="inline-person" data-person="${esc(p.id)}">${esc(match[0])}</button>`;last=match.index+match[0].length;}return out+esc(text.slice(last));
}
function current(){return data.chapters[state.chapter-1];}
function studyHtml(c,{verses=false}={}){
  return `<p class="eyebrow">${esc(data.name)} ${c.chapter}</p><h1>${esc(c.title)}</h1><p class="chapter-summary">${linkedText(c.summary)}</p>${state.layers.events?`<section class="study-block"><h2>Events</h2><p>${esc(c.dateLabel)}</p><p>${esc(c.summary)}</p></section>`:''}${state.layers.meanings?`<section class="study-block"><h2>Meanings</h2><p>${esc(c.meaning)}</p><p class="muted">Original study note · read with the chapter.</p></section>`:''}${historicalHtml(c)}${state.perspective==='lds'?`<section class="study-block lds"><span class="eyebrow">LDS READING</span><p>${esc(c.lds.text)}</p>${refs(c.lds.sourceIds)}</section>`:''}${state.layers.people?`<section class="study-block"><h2>People</h2>${personTiles(c.people)}</section>`:''}${state.layers.places&&c.places.length?`<section class="study-block"><h2>Places</h2>${c.places.map(id=>`<button class="place-button" data-place="${id}">${esc(data.places.find(p=>p.id===id)?.name||id)}</button>`).join('')}</section>`:''}<section class="study-block"><h2>Chapter sources</h2>${refs(c.sourceIds)}<a href="https://ebible.org/engwebp/GEN${String(c.chapter).padStart(2,'0')}.htm" target="_blank" rel="noopener">Read the publisher's chapter ↗</a></section>${verses?`<section class="study-block verse-text"><h2>${esc(data.name)} ${c.chapter}</h2>${data.scripture[c.chapter].map(v=>`<p id="verse-${v.verse}"><a class="verse-number" href="#verse-${v.verse}" data-verse="${v.verse}" aria-label="Verse ${v.verse}">${v.verse}</a>${linkedText(v.text)}</p>`).join('')}</section>`:''}`;
}
function historicalHtml(c){
  const note=c.chapter<=4?'Genesis presents two creation accounts with different structures. Yale\'s lecture studies their ancient setting.':c.chapter<=11?'These chapters connect early families, flood, and nations. Yale\'s lecture examines how their accounts were formed.':c.chapter<=36?'These family stories connect promises with conflict and migration. Yale\'s lecture explains why their historical dating remains disputed.':'Joseph\'s story places a Hebrew household in Egypt. Egyptian museum evidence supplies context without identifying his Pharaoh.';
  return `<section class="study-block"><span class="eyebrow">HISTORICAL STUDY</span><p>${esc(note)}</p><p class="muted">${esc(c.mapNote)}</p>${refs(c.sourceIds.filter(id=>id!=='web'))}</section>`;
}
function openDialog(html){$('#dialogContent').innerHTML=html;if(!$('#studyDialog').open)$('#studyDialog').showModal();}
function sourceDialog(id){const s=source(id);if(!visibleSource(s))return;const url=id==='web'?`https://ebible.org/engwebp/GEN${String(state.chapter).padStart(2,'0')}.htm`:s.url;openDialog(`<p class="eyebrow">${esc(s.category)}</p><h2>${esc(s.title)}</h2><p>${esc(s.summary)}</p><p class="muted">${esc(s.limits)}</p><a href="${esc(url)}" target="_blank" rel="noopener">Open source ↗</a>`);}
function profile(id){const p=person(id);if(!p)return;const image=portrait(id);const related=data.chapters.filter(c=>c.people.includes(id));openDialog(`<p class="eyebrow">PERSON</p><h2>${esc(p.name)}</h2>${image?`<img class="profile-portrait" src="${esc(image.src)}" alt="${esc(image.description||'Historical artwork illustrating '+p.name)}"><p class="art-credit">${esc(image.credit)}${image.generated?'':` · <a href="${esc(image.sourceUrl)}" target="_blank" rel="noopener">Artwork source</a> · <a href="${esc(image.licenseUrl)}" target="_blank" rel="noopener">${esc(image.license)}</a>`}</p><p class="portrait-note">${esc(image.note)}</p>`:'<p class="portrait-note">No reviewed free portrait is available for this person.</p>'}<dl class="person-facts"><div><dt>Role</dt><dd>${esc(p.role)}</dd></div><div><dt>Family and connections</dt><dd>${esc(p.relations)}</dd></div><div><dt>Life dates</dt><dd>${esc(p.life)}</dd></div><div><dt>Key locations</dt><dd>${esc((p.placeIds||[]).map(id=>data.places.find(place=>place.id===id)?.name).filter(Boolean).join(', ')||'No verified location is supplied.')}</dd></div><div><dt>Passages</dt><dd>${esc(p.passages)}</dd></div><div><dt>Importance</dt><dd>${esc(p.meaning)}</dd></div></dl><h3>Related chapters</h3><div class="source-links">${related.map(c=>`<button data-chapter="${c.chapter}">${c.chapter} · ${esc(c.title)}</button>`).join('')}</div>${refs(p.sourceIds)}<p class="portrait-note">Artwork does not establish actual appearance.</p>`);}
function library(){const categories=[...new Set(data.sources.filter(visibleSource).map(s=>s.category))];if(sourceFilter!=='all'&&!categories.includes(sourceFilter))sourceFilter='all';openDialog(`<p class="eyebrow">SOURCE LIBRARY</p><h2>${esc(data.name)} sources</h2><p>${state.perspective==='lds'?'Historical and LDS sources':'Historical sources'}</p><div class="source-filters">${['all',...categories].map(cat=>`<button data-source-filter="${esc(cat)}" aria-pressed="${sourceFilter===cat}">${esc(cat==='all'?'All sources':cat)}</button>`).join('')}</div>${data.sources.filter(visibleSource).filter(s=>sourceFilter==='all'||s.category===sourceFilter).map(s=>`<article class="library-item"><p class="eyebrow">${esc(s.category)}</p><h3>${esc(s.title)}</h3><p>${esc(s.summary)}</p><p class="muted">${esc(s.limits)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener">Open source ↗</a></article>`).join('')}`);}
function placeSelection(id){const p=data.places.find(p=>p.id===id);if(!p)return;selectedPlace=id;$('#mapSelection').hidden=false;$('#mapSelection').innerHTML=`<button class="selection-close" data-close-selection aria-label="Close place details">×</button><p class="eyebrow">PLACE · ${esc(data.name)} ${state.chapter}</p><h2>${esc(p.name)}</h2><p>${esc(p.summary)}</p><p class="muted">${esc(p.limits)}</p>${refs(p.sourceIds)}`;map.panTo([p.lat,p.lng],{animate:false});}
function chapterSelection(){selectedPlace=null;$('#mapSelection').hidden=false;$('#mapSelection').innerHTML=`<button class="selection-close" data-close-selection aria-label="Close chapter details">×</button>${studyHtml(current())}`;}
function drawMap(){
  overlay.clearLayers();const c=current(),places=c.places.map(id=>data.places.find(p=>p.id===id)).filter(Boolean);
  if(state.layers.places)for(const p of places){const marker=L.marker([p.lat,p.lng],{icon:L.divIcon({className:'',html:'<div class="chapter-marker"></div>',iconSize:[13,13]}),keyboard:true,title:p.name}).addTo(overlay);marker.bindTooltip(p.name,{direction:'top',permanent:true,className:'place-label'});marker.on('click',()=>placeSelection(p.id));}
  if(state.layers.routes&&c.route.length){const points=c.route.map(id=>data.places.find(p=>p.id===id)).map(p=>[p.lat,p.lng]);const route=L.polyline(points,{color:'#cbb2f0',weight:3,dashArray:'7 6',opacity:.9}).addTo(overlay);route.on('click',()=>{chapterSelection();});route.bindTooltip('Approximate chapter journey');}
  $('#mapNote').textContent=places.length?'Places from this chapter. Select a marker for its source and location limits.':c.mapNote;
  $('#chapterDetailsButton').textContent=`${data.name} ${c.chapter} details`;
  if(places.length)map.fitBounds(L.latLngBounds(places.map(p=>[p.lat,p.lng])),{padding:[50,50],maxZoom:places.length===1?7:8,animate:false});else map.setView([32,39],4,{animate:false});
}
function render(){
  const c=current();$('#historicalArtOnly').checked=!!state.historicalArtOnly;$('#chapterSelect').value=state.chapter;$('#chapterRange').value=state.chapter;$('#previous').disabled=state.chapter===1;$('#next').disabled=state.chapter===data.chapterCount;
  $('#readingContent').innerHTML=studyHtml(c,{verses:true});$('#reading').hidden=state.view==='map';$('#workspace').classList.toggle('map-mode',state.view==='map');$('#narrativeTimeline').hidden=state.view!=='map';
  for(const b of document.querySelectorAll('[data-view]'))b.setAttribute('aria-pressed',b.dataset.view===state.view);
  for(const b of document.querySelectorAll('[data-perspective]'))b.setAttribute('aria-pressed',b.dataset.perspective===state.perspective);
  for(const input of document.querySelectorAll('[data-layer]'))input.checked=state.layers[input.dataset.layer];
  $('#timelineLabel').textContent=`${data.name} ${state.chapter} · ${c.title}`;
  const from=Math.max(1,state.chapter-2),to=Math.min(data.chapterCount,state.chapter+2);$('#eventChips').innerHTML=data.chapters.filter(c=>c.chapter>=from&&c.chapter<=to).map(c=>`<button data-chapter="${c.chapter}" aria-current="${c.chapter===state.chapter}">${c.chapter} · ${esc(c.title)}</button>`).join('');
  $('#mapSelection').hidden=true;selectedPlace=null;persist();requestAnimationFrame(()=>{map.invalidateSize();drawMap();});
}
function setChapter(n){n=Number(n);if(!Number.isInteger(n)||n<1||n>data.chapterCount)return;state.chapter=n;state.verse=1;$('#studyDialog').close();render();$('#reading').scrollTop=0;}
document.addEventListener('click',e=>{
  const target=e.target.closest('button,a');if(!target)return;
  if(target.dataset.person)profile(target.dataset.person);
  else if(target.dataset.source)sourceDialog(target.dataset.source);
  else if(target.dataset.place)placeSelection(target.dataset.place);
  else if(target.dataset.chapter)setChapter(target.dataset.chapter);
  else if(target.dataset.view){state.view=target.dataset.view;render();}
  else if(target.dataset.perspective){state.perspective=target.dataset.perspective;render();if($('#studyDialog').open)library();}
  else if(target.dataset.sourceFilter){sourceFilter=target.dataset.sourceFilter;library();}
  else if(target.hasAttribute('data-close-selection'))$('#mapSelection').hidden=true;
  else if(target.dataset.verse){e.preventDefault();state.verse=Number(target.dataset.verse);persist();$('#verse-'+state.verse)?.scrollIntoView({block:'center'});}
});
$('#closeDialog').addEventListener('click',()=>$('#studyDialog').close());
$('#settingsButton').addEventListener('click',()=>{const panel=$('#studySettings');panel.hidden=!panel.hidden;$('#settingsButton').setAttribute('aria-expanded',!panel.hidden);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#studySettings').hidden=true;$('#settingsButton').setAttribute('aria-expanded','false');$('#mapSelection').hidden=true;}});
document.addEventListener('click',e=>{if(!e.target.closest('#studySettings,#settingsButton')){$('#studySettings').hidden=true;$('#settingsButton').setAttribute('aria-expanded','false');}});
$('#historicalArtOnly').addEventListener('change',e=>{state.historicalArtOnly=e.target.checked;render();});
$('#libraryButton').addEventListener('click',library);$('#chapterDetailsButton').addEventListener('click',chapterSelection);
$('#layersButton').addEventListener('click',()=>{const panel=$('#layerControls');panel.hidden=!panel.hidden;$('#layersButton').setAttribute('aria-expanded',!panel.hidden);});
$('#chapterSelect').addEventListener('change',e=>setChapter(e.target.value));$('#previous').addEventListener('click',()=>setChapter(state.chapter-1));$('#next').addEventListener('click',()=>setChapter(state.chapter+1));$('#chapterRange').addEventListener('input',e=>setChapter(e.target.value));
for(const input of document.querySelectorAll('[data-layer]'))input.addEventListener('change',()=>{const scroll=$('#reading').scrollTop;state.layers[input.dataset.layer]=input.checked;render();$('#reading').scrollTop=scroll;});
try{
  const directoryResponse=await fetch('data/books/directory.json');if(!directoryResponse.ok)throw new Error('directory');const directory=await directoryResponse.json();const book=directory.find(b=>b.id===bookId);
  if(bookId==='isaiah'){location.replace('./'+location.hash);}
  else if(!book||book.status!=='ready'){
    document.title=(book?.name||'Book')+' · Bible Study Guides';$('#bookTitle').textContent=book?.name||'Book not found';$('#workspace').outerHTML=`<main class="no-location"><p class="eyebrow">${book?'PLANNED BOOK':'BOOK NOT FOUND'}</p><h1>${esc(book?.name||'Book not found')}</h1><p>${book?'This study guide has not been built yet. Books are added one at a time.':'Choose a book from the directory.'}</p><p><a href="books.html">Open the Bible directory</a></p><p><a href="./">Study Isaiah</a> · <a href="book.html?book=genesis">Study Genesis</a></p></main>`;document.querySelectorAll('[data-view],#settingsButton').forEach(b=>b.disabled=true);
  }else{
    const response=await fetch(`data/books/${bookId}.json`);if(!response.ok)throw new Error('content');data=await response.json();
    try{const r=await fetch(`data/books/${bookId}-art.json`);if(r.ok)art=await r.json();}catch{}
    state.verse=Number.isInteger(state.verse)&&state.verse>0?state.verse:1;state.chapter=Number.isInteger(state.chapter)?Math.min(data.chapterCount,Math.max(1,state.chapter)):1;if(!['read','map'].includes(state.view))state.view='read';if(!['historical','lds'].includes(state.perspective))state.perspective='historical';
    document.title=`${data.name} Study Guide`;$('#bookTitle').textContent=data.name;$('#chapterRange').max=data.chapterCount;
    $('#chapterSelect').innerHTML=data.chapters.map(c=>`<option value="${c.chapter}">${c.chapter}</option>`).join('');
    map=L.map('bookMap',{zoomControl:false,attributionControl:false,minZoom:2,maxZoom:14});for(const [name,z] of [['base',200],['relief',220],['detail',230],['water',240]]){map.createPane(name);map.getPane(name).style.zIndex=z;map.getPane(name).style.pointerEvents='none';}L.control.zoom({position:'bottomright'}).addTo(map);overlay=L.layerGroup().addTo(map);
    const geo=await fetch('data/land.geojson');if(!geo.ok)throw new Error('geography');base=L.geoJSON(await geo.json(),{pane:'base',style:{color:'#7a916c',weight:1,fillColor:'#83966f',fillOpacity:1},interactive:false}).addTo(map);base.bringToBack();
    const geography=await Promise.allSettled(['data/relief.json','data/lakes-detail.geojson','data/rivers.geojson'].map(p=>fetch(p).then(r=>{if(!r.ok)throw new Error(p);return r.json();})));
    if(geography[0].status==='fulfilled'){const relief=geography[0].value;L.imageOverlay('assets/relief.png',relief.bounds,{pane:'relief',interactive:false}).addTo(map);for(const detail of [relief.detail,...(relief.closeDetail||[])].filter(Boolean))L.tileLayer(detail.url,{pane:'detail',bounds:detail.bounds,minZoom:detail.minZoom,maxNativeZoom:detail.maxNativeZoom,maxZoom:14,noWrap:true,errorTileUrl:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}).addTo(map);}
    for(const result of geography.slice(1))if(result.status==='fulfilled')L.geoJSON(result.value,{pane:'water',interactive:false,style:{color:'#4b9fbd',weight:1.5,fillColor:'#155c80',fillOpacity:1}}).addTo(map);
    loadingControls.forEach(control=>control.disabled=false);render();if(state.verse>1)requestAnimationFrame(()=>$('#verse-'+state.verse)?.scrollIntoView({block:'center'}));
  }
}catch(error){$('#readingContent').textContent='The guide could not load. Reload this page. The Bible directory has links to ready guides.';console.error(error);}
