// Check loose reader sentences: node scripts/lint-copy.mjs <text-file>. One text per line.
// Reports sentences over 15 words and terms that the prose checks reject.
import { readFileSync } from 'node:fs';
const banned = /The guide does not|not independently verified|determines the sense|depends on the passage|according to context|\b(?:schematic|corridor|itinerary|geopolitical|chronolog\w*|reconstruct\w*|contextual anchor|coherent account)\b/i;
let errors = 0;
readFileSync(process.argv[2], 'utf8').split(/\r?\n/).filter(Boolean).forEach((text, i) => {
  const m = text.match(banned); if (m) { console.log(`line ${i + 1}: banned term "${m[0]}"`); errors++; }
  for (const s of text.split(/(?<=[.!?][”’"')\]]?)\s+/)) {
    const n = (s.match(/[A-Za-zÀ-ÿ0-9’'-]+/g) || []).length;
    if (n > 15) { console.log(`line ${i + 1}: ${n} words: ${s}`); errors++; }
  }
});
console.log(`${errors} problems`); process.exit(errors ? 1 : 0);
