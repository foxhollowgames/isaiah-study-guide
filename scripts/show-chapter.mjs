// Print chapters for review before rewriting: node scripts/show-chapter.mjs <book-id> <first> <last>
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const base = fileURLToPath(new URL('../', import.meta.url)).split('\\').join('/');
const [slug, a, z, brief] = process.argv.slice(2);
// Optional fourth argument: shorten each verse to that many characters. The selected verse stays whole.
const cut = (v, keep) => !brief || keep || v.text.length <= +brief ? v.text : v.text.slice(0, +brief) + '…';
const b = JSON.parse(readFileSync(`${base}dist/data/books/${slug}.json`, 'utf8'));
const rows = JSON.parse(readFileSync(`${base}scripts/book-context-complete/${slug}.json`, 'utf8'));
for (let ch = +a; ch <= Math.min(+z, b.chapterCount); ch++) {
  const c = b.chapters[ch - 1], r = rows.find(x => x[0] === ch);
  console.log(`\n=== ${slug} ${ch} "${c.title}" sel v${r[1]} "${r[2]}"${r.length > 4 ? ' objects:' + r.slice(4) : ''}`);
  console.log(`LDS[${c.lds.sourceIds.join(',')}]: ${c.lds.text}`);
  console.log(b.scripture[String(ch)].map(v => v.verse + ' ' + cut(v, v.verse === r[1])).join('\n'));
}
