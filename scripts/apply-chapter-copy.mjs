// Apply `chapter|verse|title|summary|lds|note` lines to one added book's persistent sources.
// Usage: node scripts/apply-chapter-copy.mjs <book-id> <batch-file>. An empty title keeps the current heading. An LDS field of "=" keeps the current LDS text.
// Writes scripts/book-context-complete/<id>.json and scripts/book-copy-chapters/<id>.json. Nothing is written if a line fails.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('./', import.meta.url)).split('\\').join('/');
const [slug, file] = process.argv.slice(2);
const batch = readFileSync(file, 'utf8').trim().split(/\r?\n/).filter(Boolean);
const ctxPath = `${root}book-context-complete/${slug}.json`, copyPath = `${root}book-copy-chapters/${slug}.json`;
const rows = JSON.parse(readFileSync(ctxPath, 'utf8'));
const copy = existsSync(copyPath) ? JSON.parse(readFileSync(copyPath, 'utf8')) : {};
const book = JSON.parse(readFileSync(`${root}../dist/data/books/${slug}.json`, 'utf8'));
const banned = /Original study reflection|not independently verified|The guide does not|portrait does not|not a modern|\b(?:chronolog\w*|theolog\w*|narrat\w*|genealog\w*|dynast\w*|administrati\w*|imperial|communal|contested|kinship|allocation|allegiance|proclamation|recrui\w*|precedes|commission)\b/i;
let errors = 0;
const lint = (label, text, min, max) => {
  const a = text.split(/(?<=[.!?])(?:[”"’']\s+|\s+)/), b = text.split(/(?<=[.!?][”’"')]?)\s+/);
  if (b.length > max || b.length < min) { console.log(`${label}: ${b.length} sentences (${min}-${max})`); errors++; }
  for (const s of a) { const n = (s.match(/[\w’'-]+/g) || []).length; if (n > 15) { console.log(`${label}: ${n} words: ${s}`); errors++; } }
  for (const s of b) { const n = s.split(/\s+/).length; if (n > 15) { console.log(`${label}: ${n} spaced words: ${s}`); errors++; } }
  const m = text.match(banned); if (m) { console.log(`${label}: banned term "${m[0]}"`); errors++; }
  if (/\s{2,}/.test(text) || !/[.!?…”')\]]$/.test(text)) { console.log(`${label}: spacing or end punctuation`); errors++; }
};
for (const line of batch) {
  const parts = line.split('|').map(p => p.trim());
  if (parts.length !== 6) { console.log('bad field count: ' + line.slice(0, 50)); errors++; continue; }
  const [ch, verse, title, summary, lds, note] = parts;
  const row = rows.find(r => r[0] === Number(ch));
  if (!row) { console.log('no row ' + ch); errors++; continue; }
  lint(`${ch} summary`, summary, 3, 8); lint(`${ch} note`, note, 4, 7);
  // An LDS field of "=" keeps the current text. That text must already end with a question.
  if (lds === '=') {
    const cur = book.chapters[ch - 1].lds.text, kept = cur.replace(/\s*Study question\.\s*/g, ' ').trim();
    if (!/\?$/.test(kept)) { console.log(`${ch} lds: current text has no question`); errors++; }
    else if (kept !== cur) { lint(`${ch} lds`, kept, 1, 5); copy[`chapters.${ch}.lds`] = kept; }
  }
  else { lint(`${ch} lds`, lds, 1, 4); copy[`chapters.${ch}.lds`] = lds; }
  row[1] = Number(verse); if (title) row[2] = title; row[3] = note;
  copy[`chapters.${ch}.summary`] = summary;
}
if (errors) { console.log(`${errors} problems; nothing written`); process.exit(1); }
writeFileSync(ctxPath, JSON.stringify(rows, null, 1) + '\n'); writeFileSync(copyPath, JSON.stringify(copy, null, 1) + '\n');
console.log(`${slug}: applied ${batch.length} chapters`);
