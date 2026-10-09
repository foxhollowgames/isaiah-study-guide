// Print one added book's reference notes for review: node scripts/show-reference.mjs <book-id> [people|places|sources|map]
// Lines use the overlay key, then the current text. Unsaved overlay edits are not shown until the book is rebuilt.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const base = fileURLToPath(new URL('../', import.meta.url)).split('\\').join('/');
const [slug, only] = process.argv.slice(2);
const b = JSON.parse(readFileSync(`${base}dist/data/books/${slug}.json`, 'utf8'));
const show = part => !only || only === part;
if (show('people')) for (const p of b.people) {
  console.log(`\n# ${p.name} · ${p.passages}`);
  for (const key of ['role', 'relations', 'meaning']) console.log(`people.${p.id}.${key} = ${p[key]}`);
}
if (show('places')) for (const p of b.places) {
  const chapters = b.chapters.filter(c => c.places.includes(p.id)).map(c => c.chapter).join(',');
  console.log(`\n# ${p.name} · chapters ${chapters || 'none'}`);
  for (const key of ['summary', 'limits']) console.log(`places.${p.id}.${key} = ${p[key]}`);
}
if (show('sources')) for (const s of b.sources) {
  console.log(`\n# ${s.title} · ${s.author || ''} · ${s.category || s.type || ''}`);
  for (const key of ['summary', 'limits']) console.log(`sources.${s.id}.${key} = ${s[key]}`);
}
if (show('map')) for (const key of ['mapNote', 'routeEvidence']) {
  const groups = new Map();
  for (const c of b.chapters) if (c[key]) groups.set(c[key], [...(groups.get(c[key]) || []), c.chapter]);
  for (const [text, chapters] of groups) console.log(`\n# ${key} · chapters ${chapters.join(',')}\n${text}`);
}
