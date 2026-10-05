import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
const root=new URL('../dist/',import.meta.url);
const read=async p=>JSON.parse(await readFile(new URL(p,root),'utf8'));
const directory=await read('data/books/directory.json'),data=await read('data/books/genesis.json'),art=await read('data/books/genesis-art.json');
const counts=[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26];
assert.equal(directory.length,66);assert.equal(new Set(directory.map(b=>b.id)).size,66);
assert.equal(directory.filter(b=>b.testament==='Old Testament').length,39);
assert.equal(directory.filter(b=>b.testament==='New Testament').length,27);
assert.equal(directory.find(b=>b.id==='isaiah').url,'./','Keep the original Isaiah route');
assert.equal(data.chapters.length,50);assert.equal(Object.keys(data.scripture).length,50);
const sourceIds=new Set(data.sources.map(s=>s.id)),peopleIds=new Set(data.people.map(p=>p.id)),placeIds=new Set(data.places.map(p=>p.id));
assert.equal(sourceIds.size,data.sources.length);assert.equal(peopleIds.size,data.people.length);assert.equal(placeIds.size,data.places.length);
let total=0;
for(const c of data.chapters){
  assert.equal(c.chapter,total===0?1:data.chapters.indexOf(c)+1);
  const verses=data.scripture[c.chapter];assert.equal(verses.length,counts[c.chapter-1],`Verse count in chapter ${c.chapter}`);
  for(let i=0;i<verses.length;i++){assert.equal(verses[i].verse,i+1);assert(verses[i].text.length>0);assert(!/Genesis\s*<|\bundefined\b|\ufffd/.test(verses[i].text),`Publisher navigation or corrupt text: chapter ${c.chapter}`);}
  total+=verses.length;
  assert(c.summary&&c.meaning&&c.lds.text&&c.mapNote);
  for(const id of [...c.sourceIds,...c.lds.sourceIds])assert(sourceIds.has(id),`Missing source ${id}`);
  for(const id of c.people)assert(peopleIds.has(id));
  for(const id of [...c.places,...c.route])assert(placeIds.has(id));
  assert(c.sourceIds.every(id=>data.sources.find(s=>s.id===id).perspective==='historical'));
  assert(c.lds.sourceIds.every(id=>data.sources.find(s=>s.id===id).perspective==='lds'));
  assert(!('year' in c),'Do not assign unsupported event years');
}
assert.equal(total,1533);
for(const p of data.people){assert(p.role&&p.relations&&p.life&&p.meaning&&p.passages);assert(art[p.id],`Missing portrait for ${p.id}`);await access(new URL(art[p.id].src,root));if(!art[p.id].generated){assert(art[p.id].sourceUrl.startsWith('https://commons.wikimedia.org/'));assert(art[p.id].license&&art[p.id].credit);assert(!/\.pdf\b/i.test(art[p.id].title),`A document is not a portrait: ${p.id}`);}}
for(const p of data.places){assert(Number.isFinite(p.lat)&&Math.abs(p.lat)<=90);assert(Number.isFinite(p.lng)&&Math.abs(p.lng)<=180);assert(p.limits);}
for(const s of data.sources){assert.equal(new URL(s.url).protocol,'https:');assert(s.summary&&s.limits);}
const app=await readFile(new URL('book-genesis-app.js',root),'utf8'),index=await readFile(new URL('index.html',root),'utf8');
assert(index.includes('href="books.html"'));
assert(app.includes("$('#scriptureSidebar').hidden = mapMode"));
assert(app.includes("$('.timeline').hidden = !mapMode"));
const shell=await readFile(new URL('book.html',root),'utf8');
assert(shell.includes('styles.css?'));assert(!shell.includes('bible.css'));
for(const id of ['sidebarContent','chapterPickerMenu','map','contextCard','tourDrawer','timelineRange','settingsPanel','sourceDialog'])assert(shell.includes(id)||app.includes(id));
assert(!shell.includes('readingContent'),'Do not restore the separate book renderer');
console.log(`Bible checks passed: ${directory.length} books, ${data.chapters.length} chapters, ${total} verses, ${data.people.length} portraits, ${data.sources.length} sources.`);
const exodusCounts=[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38];
const leviticusCounts=[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34];
for(const book of directory.filter(b=>b.status==='ready'&&!['genesis','isaiah'].includes(b.id))){
  const content=await read(`data/books/${book.id}.json`),images=await read(`data/books/${book.id}-art.json`);
  assert.equal(content.chapters.length,content.chapterCount);assert.equal(Object.keys(content.scripture).length,content.chapterCount);
  const sources=new Map(content.sources.map(s=>[s.id,s])),people=new Set(content.people.map(p=>p.id)),places=new Set(content.places.map(p=>p.id));let verses=0;
  for(const c of content.chapters){
    assert.equal(c.chapter,content.chapters.indexOf(c)+1);const text=content.scripture[c.chapter];
    if(book.id==='exodus')assert.equal(text.length,exodusCounts[c.chapter-1]);
    if(book.id==='leviticus')assert.equal(text.length,leviticusCounts[c.chapter-1]);
    text.forEach((v,i)=>{assert.equal(v.verse,i+1);assert(v.text&&!/\ufffd|\bundefined\b|\b(?:Exodus|Genesis)\s*</.test(v.text));});verses+=text.length;
    assert(c.summary&&c.meaning&&c.lds?.text&&c.historicalNote);
    for(const id of c.sourceIds)assert.equal(sources.get(id)?.perspective,'historical');
    for(const id of c.lds.sourceIds)assert.equal(sources.get(id)?.perspective,'lds');
    c.people.forEach(id=>assert(people.has(id)));[...c.places,...c.route].forEach(id=>assert(places.has(id)));
  }
  for(const p of content.people){assert(p.role&&p.relations&&p.meaning&&p.passages);assert(images[p.id],`Missing ${book.id} portrait ${p.id}`);await access(new URL(images[p.id].src,root));if(!images[p.id].generated)assert(images[p.id].credit&&images[p.id].license&&images[p.id].sourceUrl.startsWith('https://commons.wikimedia.org/'));}
  for(const p of content.places){assert(p.limits);assert(Number.isFinite(p.lat)&&Number.isFinite(p.lng));p.sourceIds.forEach(id=>assert(sources.has(id)));}
  if(book.id==='exodus')assert.equal(verses,1213);
  if(book.id==='leviticus')assert.equal(verses,859);
  console.log(`${content.name} checks passed: ${content.chapterCount} chapters, ${verses} verses, ${people.size} portraits.`);
}
