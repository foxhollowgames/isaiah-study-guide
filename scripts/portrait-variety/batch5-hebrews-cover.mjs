// Portrait variety, batch 5: a directory cover for Hebrews. Run to write batch5-generation.json and batch5-queue.json.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const style = 'Square 1:1 illustration for a Bible study guide. Head and shoulders, with the face large in the upper half of the frame. One person only. Calm, simplified painting with broad soft shapes and smooth gradients. Low detail in cloth and background. Plain, softly blurred background. Gentle contrast. No gritty texture, no fine noise, no sharp micro-detail. Ancient Near Eastern clothing. No text, letters, frame, halo, or modern items. This is an interpretive illustration, not a known likeness.';
const rows = [['hebrews/cover', 'Melchizedek, king of Salem and priest', 'Man in his sixties, serene oval face, olive-brown skin, long silver beard, a simple gold band over a white head cloth, holding out a small loaf of bread. White robe with a deep purple mantle. Soft sunrise-gold hills behind.']];
const assets = rows.map(([name, person, detail]) => ({ name, person, path: `dist/assets/portraits/${name}.png`, detail, prompt: `Create one image. Interpretive portrait of ${person}. ${detail} ${style}` }));
const here = p => fileURLToPath(new URL(p, import.meta.url));
writeFileSync(here('./batch5-generation.json'), JSON.stringify({ tool: 'ChatGPT built-in image generation', assets }, null, 1) + '\n');
writeFileSync(here('./batch5-queue.json'), JSON.stringify(assets.map(a => [a.name.replace('/', '--'), a.prompt])));
console.log(`wrote ${assets.length} prompts`);
