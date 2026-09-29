import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const app = await readFile(new URL('../dist/app.js',import.meta.url),'utf8');
const verses = [1,5,7].map(verse=>({verse}));
const elements = verses.map(({verse})=>({id:`side-verse-${verse}`,selected:verse===1,
  classList:{toggle(name,value){elements.find(e=>e.classList===this).selected=value;}},
  scrollIntoView(options){this.scrolled=options;}}));
const calls=[];
const context=vm.createContext({
  state:{chapter:15,verse:1,sidebar:'scripture'}, scripture:{chapters:{15:verses,39:[{verse:6}]}},
  data:{campaigns:[]},
  $$:()=>elements,$:selector=>elements.find(el=>`#${el.id}`===selector),
  matchMedia:()=>({matches:true}),renderTop(){},persist(){calls.push('saved');},
  renderScripture(){calls.push('scripture');},
  selectChapter(chapter,verse){context.state.chapter=chapter;context.state.verse=verse;calls.push('chapter');}
});
for (const [start,end] of [['function scrollVerse(','function isPassageDate('],['function focusPathVerse(','function openFeature(']]) {
  vm.runInContext(app.slice(app.indexOf(start),app.indexOf(end,app.indexOf(start))),context);
}
context.focusPathVerse({chapterRoute:true,chapter:15,verse:5});
assert.equal(context.state.verse,5);
assert.deepEqual(elements.filter(e=>e.selected).map(e=>e.id),['side-verse-5']);
assert.equal(elements[1].scrolled.block,'center');
assert.equal(elements[1].scrolled.behavior,'auto');
context.state.sidebar='word';
context.focusPathVerse({chapterRoute:true,chapter:15,verse:7});
assert.equal(context.state.sidebar,'scripture');
assert(calls.includes('scripture'));
assert.deepEqual(elements.filter(e=>e.selected).map(e=>e.id),['side-verse-7']);
context.focusPathVerse({chapter:15,verse:1});
assert.equal(context.state.verse,7,'A place or event must not trigger path navigation');
context.focusPathVerse({chapterRoute:true,chapter:15,verse:99});
assert.equal(context.state.verse,7,'Invalid references must not erase the selection');
context.focusPathVerse({chapterRoute:true,chapter:39,verse:6});
assert.equal(context.state.chapter,39);
assert.equal(context.state.verse,6);
assert(calls.includes('chapter'));
assert(app.includes('if (pinned) focusPathVerse(f);'),'Hover previews must not move the reading position');
console.log('Path verse focus passed: scrolling, persistent selection, word-view recovery, cross-chapter references, invalid-reference guard.');
