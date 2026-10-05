import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const directory=JSON.parse(readFileSync('dist/data/books/directory.json','utf8'));
let fields=0;
for(const book of directory.filter(b=>b.status==='ready'&&b.id!=='isaiah')){
  const data=JSON.parse(readFileSync(`dist/data/books/${book.id}.json`,'utf8'));
  const copy=data.chapters.flatMap(c=>[c.summary,c.meaning,c.lds.text]);
  copy.push(...data.people.flatMap(p=>[p.role,p.relations,p.meaning]),...data.places.map(p=>p.summary));
  for(const text of copy){
    assert(!/Original study reflection|not independently verified|The guide does not|portrait does not|not a modern/i.test(text),`${book.id}: repeated process note`);
    for(const sentence of text.split(/(?<=[.!?])\s+/)){
      assert((sentence.match(/[\w’'-]+/g)||[]).length<=15,`${book.id}: long sentence: ${sentence}`);
    }
  }
  fields+=copy.length;
  const app=readFileSync(`dist/book-${book.id}-app.js`,'utf8');
  assert(app.includes('function chapterDateHtml() { return \'\'; }'));
  assert(app.includes('function sourceInsightsHtml(ids = [], chapter = state.chapter) { return sourceMediaHtml(ids, {chapter}); }'));
  assert(app.includes('function librarySourceHtml('),'source details remain available');
  const profiles=readFileSync(`dist/book-${book.id}-portraits.js`,'utf8');
  assert(!profiles.includes('<dt>Estimated lifespan</dt>'));
  assert(!profiles.includes('<p class="profile-date-note">'));
  assert(!profiles.includes('<p class="profile-portrait-note">'));
}
console.log(`Book copy passed: ${fields} reader fields, short sentences, source details, and profile notes.`);
