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
const app=await readFile(new URL('book.js',root),'utf8'),index=await readFile(new URL('index.html',root),'utf8');
assert(index.includes('href="books.html"'));
assert(app.includes("$('#reading').hidden=state.view==='map'"));
assert(app.includes("$('#narrativeTimeline').hidden=state.view!=='map'"));
console.log(`Bible checks passed: ${directory.length} books, ${data.chapters.length} chapters, ${total} verses, ${data.people.length} portraits, ${data.sources.length} sources.`);
