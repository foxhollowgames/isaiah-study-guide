// Portrait variety, batch 2: directory covers for books that shared an image. Run to write batch2-generation.json.
// The style asks for calm, low-texture painting and a close crop, because cover cards are small.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const style = 'Square 1:1 illustration for a Bible study guide. Head and shoulders, with the face large in the upper half of the frame. Calm, simplified painting with broad soft shapes and smooth gradients. Low detail in cloth and background. Plain, softly blurred background. Gentle contrast. No gritty texture, no fine noise, no sharp micro-detail. One person only. First-century eastern Mediterranean clothing. No text, letters, frame, halo, or modern items. This is an interpretive illustration, not a known likeness.';
const rows = [
  ['1-timothy/cover', 'Timothy as a teacher', 'Man about thirty-five, soft oval face, light brown wavy hair, short beard. Looking down at an open scroll in his hands. Sage green cloak. Pale warm stone wall behind. Soft morning light.'],
  ['2-timothy/cover', 'Lois, grandmother of Timothy', 'Elderly woman, kind lined face, brown skin, white hair under a dusty rose head covering, slight smile, three-quarter view. Soft blue-grey background. Gentle window light.'],
  ['titus/cover', 'Titus on Crete', 'Greek man in his forties, clean-shaven, strong jaw, short greying hair, in profile facing left. Sea-blue cloak. Pale sky above a soft sea horizon. Bright even light.'],
  ['2-peter/cover', 'Simon Peter in old age', 'Old man, broad weathered face, white curly hair and beard, looking up to the right. Charcoal mantle. Deep warm amber background with a single lamp glow.'],
  ['1-john/cover', 'The elder of the letters of John', 'Man in his seventies, thin gentle face, bald crown, short white beard, eyes closed with a slight smile, facing front. Cream robe. Soft gold background.'],
  ['2-john/cover', 'The chosen lady of 2 John', 'Woman in her forties, round warm face, olive skin, dark hair under an olive-green head covering, looking back over her shoulder. Terracotta dress. Plain cream wall. Soft daylight.']
];
const assets = rows.map(([name, person, detail]) => ({ name, person, path: `dist/assets/portraits/${name}.png`, detail, prompt: `Create one image. Interpretive portrait of ${person}. ${detail} ${style}` }));
const here = p => fileURLToPath(new URL(p, import.meta.url));
writeFileSync(here('./batch2-generation.json'), JSON.stringify({ tool: 'ChatGPT built-in image generation', assets }, null, 1) + '\n');
writeFileSync(here('./batch2-queue.json'), JSON.stringify(assets.map(a => [a.name.replace('/', '--'), a.prompt])));
console.log(`wrote ${assets.length} prompts`);
