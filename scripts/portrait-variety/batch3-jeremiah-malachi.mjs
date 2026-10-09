// Portrait variety, batch 3: Jeremiah through Malachi, plus four directory covers. Run to write batch3-generation.json and batch3-queue.json.
// Calm, low-texture style with a close crop. Each row sets its own face, pose, color, and light.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const calm = 'Calm, simplified painting with broad soft shapes and smooth gradients. Low detail in cloth and background. Plain, softly blurred background. Gentle contrast. No gritty texture, no fine noise, no sharp micro-detail. Ancient Near Eastern clothing of the sixth century BC. No text, letters, frame, halo, or modern items. This is an interpretive illustration, not a known likeness.';
const one = `Square 1:1 illustration for a Bible study guide. Head and shoulders, with the face large in the upper half of the frame. One person only. ${calm}`;
const group = `Square 1:1 illustration for a Bible study guide. Faces large and clear in the upper half of the frame. ${calm}`;
const rows = [
  ['jeremiah/cover', 'Jeremiah the prophet', 'Man in his forties, long tired face, dark hair with first grey, short beard, eyes lowered in grief. Undyed linen robe. Soft dusk-violet background.'],
  ['jeremiah/baruch', 'Baruch the scribe', 'Man in his thirties, narrow careful face, ink-stained fingers holding a reed pen near his chin, three-quarter view. Pale sand tunic. Warm cream background.'],
  ['jeremiah/ebedmelech', 'Ebedmelech the Ethiopian palace servant', 'Man in his forties, dark brown skin, broad kind face, close-cropped hair, holding a coil of rope and old cloths. White palace tunic. Soft teal background.'],
  ['jeremiah/pashhur-immer', 'Pashhur son of Immer, a temple officer', 'Heavy-set man in his fifties, stern square face, grey beard, priestly white turban, chin raised. White robe with a blue sash. Cool stone-grey background.'],
  ['jeremiah/pashhur-malchijah', 'Pashhur son of Malchijah, a court official', 'Lean man in his thirties, sharp face, trimmed black beard, sideways glance. Dark red court robe. Muted olive background.'],
  ['jeremiah/hananiah-azzur', 'Hananiah son of Azzur, a prophet', 'Confident man in his forties, round face, wide smile, thick dark beard, one hand lifting a broken wooden yoke bar. Bright yellow mantle. Light sky-blue background.'],
  ['jeremiah/hilkiah-father', 'Hilkiah, a priest of Anathoth', 'Old man in his seventies, gentle long face, white beard, small white priestly cap, in profile facing right. Cream robe. Soft green hillside blur.'],
  ['jeremiah/uriah-shemaiah', 'Uriah son of Shemaiah, a prophet', 'Young man in his late twenties, thin anxious face, short beard, looking back over his shoulder. Dusty brown travel cloak with a hood. Pale desert-rose background.'],
  ['jeremiah/micah-prophet', 'Micah the Morashtite', 'Countryman in his fifties, sun-browned oval face, grey-streaked curly hair, steady gaze, shepherd’s staff at his shoulder. Earth-green cloak. Wheat-gold background.'],
  ['jeremiah/elnathan-achbor', 'Elnathan son of Achbor, a royal official', 'Man in his fifties, smooth guarded face, neat grey beard, hands folded at his chest. Deep blue robe with a gold neck band. Plain ivory background.'],
  ['jeremiah/elasah-shaphan', 'Elasah son of Shaphan, a royal messenger', 'Man in his thirties, open oval face, short brown beard, holding a sealed letter roll. Rust travel cloak. Hazy pale-blue road background.'],
  ['jeremiah/gemariah-hilkiah', 'Gemariah son of Hilkiah, a royal messenger', 'Man in his forties, long face, high forehead, thin beard, eyes on the distance, in profile facing left. Slate-grey cloak. Warm peach dawn background.'],
  ['jeremiah/ahab-kolaiah', 'Ahab son of Kolaiah, a prophet in Babylon', 'Man in his forties, fleshy face, oiled curled beard, half smile, one hand raised as if speaking. Purple-brown fringed robe. Glazed blue brick blur behind.'],
  ['jeremiah/zedekiah-maaseiah', 'Zedekiah son of Maaseiah, a prophet in Babylon', 'Man in his thirties, gaunt face, intense eyes, shaved upper lip with a chin beard, frontal. Orange-red mantle. Dark teal background.'],
  ['jeremiah/shemaiah-nehelamite', 'Shemaiah the Nehelamite', 'Man in his fifties, pinched face, thin grey beard, frowning down at a letter he is writing. Mustard robe. Soft lavender-grey background.'],
  ['jeremiah/hanamel', 'Hanamel, cousin of Jeremiah', 'Farmer in his forties, round weathered face, short beard, hopeful look, holding a small clay jar. Faded green tunic. Pale straw-yellow field blur.'],
  ['jeremiah/jaazaniah-rechabite', 'Jaazaniah the Rechabite', 'Tent-dwelling man in his fifties, lean lined face, long dark hair tied back, long beard, gently pushing away a wine cup with one hand. Striped goat-hair cloak. Soft tan background.'],
  ['jeremiah/gemariah-shaphan', 'Gemariah son of Shaphan, an official', 'Man in his forties, calm square face, short black beard, listening with head tilted. Light blue robe. Warm stone-colored room blur.'],
  ['jeremiah/micaiah-gemariah', 'Micaiah son of Gemariah', 'Young man about twenty, smooth face, wide worried eyes, short curly hair, no beard, turning to hurry away. Cream tunic. Soft coral background.'],
  ['jeremiah/elishama-scribe', 'Elishama the royal scribe', 'Man in his sixties, full face, bald head, white beard, holding a closed scroll against his chest. Dark green robe. Plain warm-grey background.'],
  ['jeremiah/delaiah-shemaiah', 'Delaiah son of Shemaiah, an official', 'Man in his forties, earnest oval face, brown beard, one open hand raised in appeal. Wine-red robe. Soft amber firelight background.'],
  ['jeremiah/zedekiah-hananiah', 'Zedekiah son of Hananiah, an official', 'Man in his thirties, long narrow face, close beard, arms crossed, thoughtful. Indigo robe. Pale grey-green background.'],
  ['jeremiah/jehudi', 'Jehudi, a court messenger', 'Slim man in his twenties, alert face, short black hair, small beard, reading aloud from an open scroll. Plain white tunic with a red belt. Warm brazier-orange glow behind.'],
  ['jeremiah/jehucal-shelemiah', 'Jehucal son of Shelemiah, an official', 'Man in his forties, broad face, heavy brows, dark beard, wary sideways look. Brown robe with a yellow shoulder cloth. Dusty blue background.'],
  ['jeremiah/irijah', 'Irijah, a gate guard', 'Soldier in his thirties, hard square face, stubble, leather cap, gripping a spear shaft beside his face. Leather vest over a grey tunic. Sunlit pale stone gate blur.'],
  ['jeremiah/jonathan-scribe', 'Jonathan the scribe', 'Man in his fifties, thin closed face, grey hair, short beard, a ring of keys in his hand. Dull blue robe. Dim brown interior blur.'],
  ['jeremiah/malchijah-royal', 'Malchijah, the king’s son', 'Young prince in his twenties, proud smooth face, short oiled beard, gold circlet, chin raised. Crimson robe. Soft gold background.'],
  ['jeremiah/jonathan-kareah', 'Jonathan son of Kareah, a field commander', 'Soldier in his thirties, tanned oval face, short beard, a scar on one cheek, bronze helmet under his arm. Olive-green cloak. Hazy hill-country background.'],
  ['jeremiah/baalis', 'Baalis, king of the Ammonites', 'King in his fifties, heavy-lidded face, braided grey-black beard, tall cloth crown, cold half smile. Dark green and gold robe. Deep maroon background.'],
  ['jeremiah/jezaniah-hoshaiah', 'Jezaniah son of Hoshaiah', 'Man in his forties, worn round face, untidy beard, hands pressed together in a request. Torn grey-brown cloak. Pale overcast background.'],
  ['jeremiah/azariah-hoshaiah', 'Azariah son of Hoshaiah', 'Man in his forties, angry long face, black beard, pointing a finger forward. Dark rust cloak. Stormy grey-blue background.'],
  ['jeremiah/hophra', 'Pharaoh Hophra of Egypt', 'Egyptian king in his forties, clean-shaven oval face, kohl-lined eyes, blue-and-gold striped royal headcloth, in profile facing right. White linen with a broad collar. Warm sand background.'],
  ['jeremiah/seraiah-neriah', 'Seraiah son of Neriah, a court officer', 'Man in his forties, composed face, short beard, holding a scroll tied to a stone above river water. Blue-grey travel cloak. Soft river-green background.'],
  ['jeremiah/rechabites', 'The Rechabites, a family', 'A father, a mother, and a teenage son standing close together, weathered faces, simple striped cloaks, wine cups left untouched on a low table before them. Soft tan background.', group],
  ['jeremiah/arrest-officers', 'Three royal officers sent to arrest Jeremiah and Baruch', 'Three men of different ages and builds in dark cloaks, searching with a small lamp, looking in different directions. Deep blue night background.', group],
  ['jeremiah/hostile-officials', 'Shephatiah and Gedaliah, two officials who oppose Jeremiah', 'Two court officials side by side, one tall and thin with a grey beard, one short and stout with a black beard, both frowning. Red and brown robes. Plain ochre background.', group],
  ['jeremiah/babylonian-officers', 'Babylonian officers at the gate of Jerusalem', 'Three Babylonian officers seated in a row, long curled beards, tall rounded caps, fringed robes in blue, red, and green. Pale broken stone wall behind.', group],
  ['jeremiah/women-queen', 'Judean women in Egypt', 'Three women of different ages, head coverings in rose, saffron, and green, one holding a small plate of cakes, all facing the viewer firmly. Soft Nile-reed green background.', group],
  ['lamentations/grieving-speaker', 'The grieving man of Lamentations', 'Man in his fifties, hollow face, grey stubble, ash on his hair, eyes closed, head bowed onto one hand. Rough sackcloth. Smoke-grey background with a faint warm glow.'],
  ['ezekiel/ezekiel', 'Ezekiel, priest and prophet', 'Man about thirty, strong angular face, shaved head, short black beard, wide eyes lifted upward. White linen priest’s tunic. Soft storm-gold and blue sky background.'],
  ['ezekiel/ezekiel-wife', 'The wife of Ezekiel', 'Woman about thirty, gentle oval face, olive skin, dark hair under a pale blue covering, soft sad smile, three-quarter view. Cream dress. Warm rose evening background.'],
  ['daniel/daniel', 'Daniel in Babylon', 'Young man about twenty, clear oval face, light brown skin, short dark hair, no beard, calm direct gaze. Simple cream tunic with a blue Babylonian shoulder sash. Glazed turquoise tile blur.'],
  ['daniel/shadrach', 'Hananiah, called Shadrach', 'Young man about twenty, square face, thick eyebrows, short curly hair, light beard, arms folded. Sand tunic with a red sash. Warm orange background.'],
  ['daniel/meshach', 'Mishael, called Meshach', 'Young man about twenty, long thin face, straight black hair to the jaw, no beard, slight smile. Pale green tunic. Soft yellow background.'],
  ['daniel/abednego', 'Azariah, called Abednego', 'Young man about twenty, round face, dark brown skin, very short hair, no beard, looking upward. White tunic with a purple sash. Deep ember-red background.'],
  ['hosea/hosea', 'Hosea the prophet', 'Man in his thirties, soft sorrowful face, wavy brown hair, short beard, holding a small child’s sandal. Faded blue cloak. Pale vineyard-green background.'],
  ['hosea/gomer', 'Gomer', 'Woman in her late twenties, heart-shaped face, olive skin, dark hair with a red ribbon and earrings, looking away to one side. Rose-red dress. Warm tan background.'],
  ['joel/joel', 'Joel the prophet', 'Man in his sixties, lean face, long white beard, one hand shading his eyes as he looks at the sky. Grey cloak. Dry yellow-brown field blur under a pale sky.'],
  ['amos/amos', 'Amos the herdsman', 'Herdsman in his forties, sunburnt broad face, short rough beard, a lamb across his shoulders. Sheepskin vest over a brown tunic. Bright dry hill background.'],
  ['amos/amaziah', 'Amaziah, priest of Bethel', 'Priest in his fifties, plump smooth face, oiled beard, tall white head wrap, pointing away with one arm. White robe with gold trim. Pale marble blur.'],
  ['obadiah/obadiah', 'Obadiah the prophet', 'Man in his fifties, dark brown skin, strong long face, grey beard, looking up toward red cliffs. Dark blue cloak. Soft red sandstone background.'],
  ['jonah/cover', 'Jonah son of Amittai', 'Man in his forties, sullen round face, wet dark hair, short beard, sitting with arms around his knees under a leafy vine. Faded yellow tunic. Bright hot sky background.'],
  ['nahum/nahum', 'Nahum the Elkoshite', 'Man in his sixties, hawk-like face, white hair, long beard, eyes narrowed toward the distance, in profile facing left. Dark red cloak. Smoky blue-grey background.'],
  ['habakkuk/habakkuk', 'Habakkuk the prophet', 'Man in his forties, questioning face, raised brows, dark beard, leaning on a stone watchtower wall, looking up. Brown cloak. Cool night-blue sky with one soft star.'],
  ['zephaniah/zephaniah-prophet', 'Zephaniah son of Cushi', 'Man in his thirties, dark brown skin, fine narrow face, short beard, calm steady gaze, frontal. Deep green robe with a gold edge. Pale gold background.'],
  ['haggai/cover', 'Haggai the prophet', 'Old man in his seventies, weathered square face, white beard, one hand resting on a cut building stone. Earth-brown cloak. Clear morning-blue sky background.'],
  ['zechariah/cover', 'Zechariah son of Berechiah', 'Young man in his twenties, bright oval face, short dark beard, looking upward by the light of a small golden lampstand. Cream robe. Deep indigo night background.'],
  ['malachi/malachi', 'Malachi the messenger', 'Man in his fifties, grave long face, grey-black beard, holding out an open hand, three-quarter view. Plain white linen robe. Soft sunrise-gold background.']
];
const assets = rows.map(([name, person, detail, style = one]) => ({ name, person, path: `dist/assets/portraits/${name}.png`, detail, prompt: `Create one image. Interpretive portrait of ${person}. ${detail} ${style}` }));
const here = p => fileURLToPath(new URL(p, import.meta.url));
writeFileSync(here('./batch3-generation.json'), JSON.stringify({ tool: 'ChatGPT built-in image generation', assets }, null, 1) + '\n');
writeFileSync(here('./batch3-queue.json'), JSON.stringify(assets.map(a => [a.name.replace('/', '--'), a.prompt])));
console.log(`wrote ${assets.length} prompts`);
