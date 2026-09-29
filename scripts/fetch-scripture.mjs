import { access, writeFile } from 'node:fs/promises';

// Keep publisher HTML locally so the reading text can be rebuilt offline.
let next = 1;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next <= 66) {
    const chapter = next++;
    const path = new URL(`isaiah${chapter}-source.html`, import.meta.url);
    try { await access(path); continue; } catch {}
    const url = `https://ebible.org/engwebp/ISA${String(chapter).padStart(2, '0')}.htm`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url}: ${response.status}`);
    const html = await response.text();
    if (!html.includes('id="V1"')) throw new Error(`No verse text: ${url}`);
    await writeFile(path, html);
    console.log(`Saved Isaiah ${chapter}`);
  }
}));
