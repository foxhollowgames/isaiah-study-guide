// Check one added book's reference overlay: node scripts/lint-reference-copy.mjs <book-id>
// Reads scripts/book-copy-reference/<id>.json. Reports invalid keys, long sentences, banned terms, and coverage.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const base = fileURLToPath(new URL('../', import.meta.url)).split('\\').join('/');
const slug = process.argv[2], path = `${base}scripts/book-copy-reference/${slug}.json`;
if (!existsSync(path)) { console.log(`${slug}: no overlay file`); process.exit(1); }
const b = JSON.parse(readFileSync(`${base}dist/data/books/${slug}.json`, 'utf8'));
const edits = JSON.parse(readFileSync(path, 'utf8'));
const keys = { people: ['role', 'relations', 'meaning'], places: ['summary', 'limits'], sources: ['summary', 'limits'], chapters: ['mapNote', 'routeEvidence'] };
const banned = /Original study reflection|not independently verified|The guide does not|portrait does not|not a modern|determines the sense|depends on the passage|according to context|\b(?:chronolog\w*|theolog\w*|narrat\w*|genealog\w*|dynast\w*|administrati\w*|imperial|communal|contested|kinship|allocation|allegiance|proclamation|recrui\w*|precedes|commission|schematic|corridor|itinerary|geopolitical|reconstruct\w*)\b/i;
let errors = 0;
const fail = message => { console.log(message); errors++; };
for (const [key, text] of Object.entries(edits)) {
  const [group, id, field, extra] = key.split('.');
  if (extra !== undefined || !keys[group]?.includes(field)) { fail(`${key}: unknown key`); continue; }
  const found = group === 'chapters' ? id === '*' || b.chapters.some(c => String(c.chapter) === id) : b[group].some(x => x.id === id);
  if (!found) fail(`${key}: no such record`);
  if (typeof text !== 'string' || !text.trim()) { fail(`${key}: empty`); continue; }
  if (/\s{2,}|^\s|\s$/.test(text)) fail(`${key}: spacing`);
  const label = group === 'people' && field === 'role';
  if (label ? /[.!?]$/.test(text) : !/[.!?…”')\]]$/.test(text)) fail(`${key}: ${label ? 'a role is a label with no end punctuation' : 'no end punctuation'}`);
  const m = text.match(banned); if (m) fail(`${key}: banned term "${m[0]}"`);
  for (const s of text.split(/(?<=[.!?][”’"')\]]?)\s+/)) {
    const n = (s.match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length;
    if (n > 15) fail(`${key}: ${n} words: ${s}`);
  }
}
const total = b.people.length * 3 + b.places.length * 2 + b.sources.length * 2;
const done = Object.keys(edits).filter(k => !k.startsWith('chapters.')).length;
console.log(`${slug}: ${Object.keys(edits).length} overlay entries; ${done} of ${total} profile, place, and source fields changed; ${errors} problems`);
process.exit(errors ? 1 : 0);
