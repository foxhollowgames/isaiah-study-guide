// Portraits illustrate people in each story. They do not establish actual appearance.
let portraitMode = 'generated';
let licensedImages = {};
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

export function setPortraitMode(mode, images) {
  portraitMode = mode === 'non-generated' ? mode : 'generated';
  if (images) licensedImages = images;
  // Replace only portrait groups so open panels keep their content and position.
  document.querySelectorAll('.portrait-group[data-people]').forEach(group => {
    group.outerHTML = portraitsHtml(group.dataset.people.split(','), {interactive:group.dataset.profileLinks !== 'false'});
  });
}

// Compressed WebP copies sit beside local master images. See scripts/optimize-images.py.
export const webpCopy = (src = '', size = '') => /^assets\/.+\.(png|jpe?g)$/i.test(src) ? src.replace(/\.(png|jpe?g)$/i, `${size}.webp`) : '';
export function webpSourceHtml(src, size) {
  const copy = webpCopy(src, size);
  return copy ? `<source type="image/webp" srcset="${escapeHtml(copy)}">` : '';
}
// Portraits fade in once. Later renders of a loaded portrait show it at once.
const shownPortraits = new Set();
function portraitImageHtml(src, alt) {
  if (!src) return '';
  return `<picture>${webpSourceHtml(src, '-192')}<img src="${escapeHtml(src)}" width="88" height="88" alt="${alt}" loading="lazy" decoding="async"${shownPortraits.has(src) ? ' class="loaded"' : ''}></picture>`;
}
document.addEventListener('load', event => {
  if (event.target.matches?.('.portrait-art img')) {
    shownPortraits.add(event.target.getAttribute('src'));
    event.target.classList.add('loaded');
  }
}, true);

// Image errors do not bubble. Capture them for images added to any panel.
document.addEventListener('error', event => {
  // A missing WebP copy falls back to the master image.
  const copies = event.target.matches?.('picture > img') ? event.target.parentElement.querySelectorAll('source') : [];
  if (copies.length) { copies.forEach(copy => copy.remove()); return; }
  if (event.target.matches?.('.portrait-art img')) {
    const art = event.target.closest('.portrait-art');
    event.target.closest('picture').remove();
    art.querySelector('.portrait-initial').removeAttribute('aria-hidden');
  }
}, true);
export const people = {
  rezin: {
    name: 'Rezin', role: 'Last king of Aram-Damascus', life: 'Birth year unknown–about 732 BCE',
    dateNote: 'His death is tied to the Assyrian capture of Damascus. His birth year is not known.',
    locations: ['Damascus', 'Aram', 'Jerusalem'], passages: ['Isaiah 7:1–9', 'Isaiah 8:4–7', 'Isaiah 9:11'],
    importance: 'Rezin joins Pekah in a war against Judah. Their attack creates the crisis in which Isaiah gives Ahaz the sign of Immanuel.',
    connections: 'Ally of Pekah. Enemy of Ahaz. Defeated during the expansion of the Assyrian Empire.'
  },
  ahaz: {
    name: 'Ahaz', role: 'King of Judah', life: 'About 760–715 BCE',
    dateNote: 'The estimate uses the biblical age at accession and the usual reconstruction of his reign. Chronologies differ by a few years.',
    locations: ['Jerusalem', 'Judah', 'Damascus'], passages: ['Isaiah 7:1–17', 'Isaiah 8:5–8', 'Isaiah 14:28'],
    importance: 'Ahaz faces invasion by Aram and Israel. Isaiah tells him to trust God, but Ahaz seeks Assyrian help. His choice brings Judah under stronger Assyrian control.',
    connections: 'Son of Jotham. Father of Hezekiah. Opponent of Rezin and Pekah. Member of the royal house of David.'
  },
  pekah: {
    name: 'Pekah', role: 'King of Israel', life: 'Birth year unknown–about 732 BCE',
    dateNote: 'His death near 732 BCE is well placed in the regional chronology. The length and dates of his rule remain disputed.',
    locations: ['Samaria', 'Israel', 'Jerusalem'], passages: ['Isaiah 7:1–9', 'Isaiah 8:4–7'],
    importance: 'Pekah joins Rezin against Judah. This Syro-Ephraimite crisis forms the setting for Isaiah’s counsel to Ahaz and for the Immanuel prophecy.',
    connections: 'Ally of Rezin. Enemy of Ahaz. Son of Remaliah.'
  },
  remaliah: {
    name: 'Remaliah', role: 'Father of King Pekah', life: 'Years of birth and death unknown; lived in the eighth century BCE',
    dateNote: 'Isaiah identifies Pekah as the son of Remaliah but gives no dates or other biographical details for Remaliah.',
    locations: ['Israel', 'Samaria'], passages: ['Isaiah 7:1–9', 'Isaiah 8:6'],
    importance: 'Isaiah repeatedly uses Remaliah’s name to identify Pekah during the war against Judah. The text does not present Remaliah as a participant in that war.',
    connections: 'Father of Pekah.'
  },
  uzziah: {
    name: 'Uzziah', role: 'King of Judah, also called Azariah', life: 'About 810–740 BCE',
    dateNote: 'The estimate uses the biblical age and length of reign. Proposed regnal chronologies differ because they include periods of shared rule.',
    locations: ['Jerusalem', 'Judah'], passages: ['Isaiah 1:1', 'Isaiah 6:1', 'Isaiah 7:1'],
    importance: 'Isaiah dates his call vision to the year of Uzziah’s death. That transition closes a long reign and introduces a period of political danger.',
    connections: 'Father of Jotham. Grandfather of Ahaz. Great-grandfather of Hezekiah.'
  },
  jotham: {
    name: 'Jotham', role: 'King of Judah', life: 'About 775–732 BCE',
    dateNote: 'The estimate uses the biblical age at accession. Shared rule with Uzziah and Ahaz makes exact dates uncertain.',
    locations: ['Jerusalem', 'Judah'], passages: ['Isaiah 1:1', 'Isaiah 7:1'],
    importance: 'Jotham’s reign belongs to the opening historical frame of Isaiah. The pressures that dominate the time of Ahaz grew during his later years.',
    connections: 'Son of Uzziah. Father of Ahaz. Grandfather of Hezekiah.'
  },
  david: {
    name: 'David', role: 'King of Israel and founder of Judah’s royal dynasty', life: 'About 1040–970 BCE',
    dateNote: 'These are traditional historical estimates. The sources do not give dates in the modern calendar.',
    locations: ['Bethlehem', 'Jerusalem', 'Judah', 'Israel'], passages: ['Isaiah 7:2, 13', 'Isaiah 9:7', 'Isaiah 11:1', 'Isaiah 22:22'],
    importance: 'David lived centuries before Isaiah, but his royal house shapes the book’s promises and warnings. Isaiah links future just rule with David’s family line.',
    connections: 'Ancestor of Ahaz and Hezekiah. His father was Jesse. Jerusalem became his capital.'
  },
  jesse: {
    name: 'Jesse', role: 'Father of David', life: 'Years of birth and death unknown; lived about the eleventh century BCE',
    dateNote: 'The biblical accounts place Jesse one generation before David. They do not give calendar dates for his life.',
    locations: ['Bethlehem', 'Judah'], passages: ['Isaiah 11:1', 'Isaiah 11:10'],
    importance: 'Isaiah uses a shoot from Jesse’s family line as an image of a future ruler. The image recalls David’s origins and renews hope for his royal house.',
    connections: 'Father of David. Ancestor of Ahaz and Hezekiah.'
  },
  amoz: {
    name: 'Amoz', role: 'Father of Isaiah', life: 'Years of birth and death unknown; lived in the eighth century BCE',
    dateNote: 'The book identifies Isaiah as the son of Amoz but gives no other certain biographical details. Amoz is not the prophet Amos.',
    locations: ['Judah', 'Possibly Jerusalem'], passages: ['Isaiah 1:1', 'Isaiah 2:1', 'Isaiah 13:1', 'Isaiah 20:2', 'Isaiah 37:2, 21', 'Isaiah 38:1', 'Isaiah 39:3'],
    importance: 'Amoz identifies Isaiah’s family line throughout the book. Claims that he belonged to Judah’s royal family are later traditions, not facts stated in Isaiah.',
    connections: 'Father of Isaiah.'
  },
  'shear-jashub': {
    name: 'Shear-jashub', role: 'Son of Isaiah whose name means “a remnant will return”', life: 'Years unknown; active about 735 BCE',
    dateNote: 'Isaiah 7 places him with his father during the reign of Ahaz. The text gives no birth or death year.',
    locations: ['Jerusalem', 'Upper Pool and Fuller’s Field'], passages: ['Isaiah 7:3'],
    importance: 'God tells Isaiah to take Shear-jashub when he meets Ahaz. His symbolic name introduces the book’s remnant theme during a national crisis.',
    connections: 'Son of Isaiah. Brother of Maher-shalal-hash-baz. Present when Isaiah meets Ahaz.'
  },
  'maher-shalal-hash-baz': {
    name: 'Maher-shalal-hash-baz', role: 'Son of Isaiah with a prophetic symbolic name', life: 'Born about 734 BCE; death year unknown',
    dateNote: 'The birth estimate follows the setting of the Syro-Ephraimite crisis. Isaiah gives no later biography or death date.',
    locations: ['Judah', 'Probably Jerusalem'], passages: ['Isaiah 8:1–4', 'Isaiah 8:18'],
    importance: 'His name means that spoil and prey will come quickly. Isaiah connects the child’s early years with the approaching Assyrian defeat of Damascus and Samaria.',
    connections: 'Son of Isaiah. Brother of Shear-jashub. His birth sign concerns Rezin and Pekah.'
  },
  isaiah: {
    name: 'Isaiah', role: 'Prophet and counselor in Judah', life: 'About 760 BCE–after 701 BCE',
    dateNote: 'His exact birth and death years are unknown. Isaiah 1:1 places his work during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah.',
    locations: ['Jerusalem', 'Judah', 'Upper Pool and Fuller’s Field'], passages: ['Isaiah 1:1', 'Isaiah 2:1', 'Isaiah 6:1–13', 'Isaiah 7:3–17', 'Isaiah 8:1–4', 'Isaiah 13:1', 'Isaiah 20:2–4', 'Isaiah 37:2–39:8'],
    importance: 'Isaiah is the central prophetic voice of the book. He warns Judah about injustice and misplaced trust. He also gives hope through the themes of a remnant, a faithful king, restoration, and God’s rule over the nations.',
    connections: 'Son of Amoz. Counselor to Ahaz and Hezekiah. Father of Shear-jashub and Maher-shalal-hash-baz. The book records his words, signs, and visions.'
  },
  hezekiah: {
    name: 'Hezekiah', role: 'King of Judah', life: 'About 741–687 BCE',
    dateNote: 'The estimate follows a common chronology. Proposed dates vary because the biblical regnal data can include shared rule.',
    locations: ['Jerusalem', 'Judah', 'Siloam tunnel and pool'], passages: ['Isaiah 1:1', 'Isaiah 36:1–39:8'],
    importance: 'Hezekiah is the king at the center of the Assyrian crisis of 701 BCE. He seeks Isaiah’s counsel, prays during the siege, recovers from illness, and later receives Babylonian envoys.',
    connections: 'Son of Ahaz. Adversary of Sennacherib. Advised by Isaiah. Host to the envoys of Merodach-baladan.'
  },
  sennacherib: {
    name: 'Sennacherib', role: 'King of Assyria', life: 'About 745–681 BCE',
    dateNote: 'His death in 681 BCE is secure. His birth year is an estimate.',
    locations: ['Nineveh', 'Assyria', 'Lachish', 'Judah'], passages: ['Isaiah 36:1', 'Isaiah 37:8–38', 'Isaiah 39:1'],
    importance: 'Sennacherib invades Judah in 701 BCE and takes many fortified towns. Jerusalem survives. Isaiah 36–37 presents the crisis as a test of trust in God rather than imperial power.',
    connections: 'Enemy of Hezekiah. King served by the Rabshakeh. Son of Sargon II. Father of Esarhaddon.'
  },
  'sargon-ii': {
    name: 'Sargon II', role: 'King of Assyria', life: 'About 765–705 BCE',
    dateNote: 'Assyrian records securely place his reign from 722 to 705 BCE. His birth year is approximate.',
    locations: ['Assyria', 'Dur-Sharrukin', 'Nineveh', 'Ashdod'], passages: ['Isaiah 20:1'],
    importance: 'Isaiah dates the sign concerning Egypt and Cush to Sargon’s campaign against Ashdod. This is the only place where the Bible names Sargon II.',
    connections: 'Father and predecessor of Sennacherib. Assyrian ruler during part of Isaiah’s ministry.'
  },
  esarhaddon: {
    name: 'Esarhaddon', role: 'King of Assyria after Sennacherib', life: 'About 713–669 BCE',
    dateNote: 'Assyrian records place his reign from 681 to 669 BCE. His birth year is approximate.',
    locations: ['Nineveh', 'Assyria', 'Babylon', 'Egypt'], passages: ['Isaiah 37:38'],
    importance: 'Isaiah names Esarhaddon as Sennacherib’s successor after the king’s assassination. His accession closes the long historical span within Isaiah 37.',
    connections: 'Son and successor of Sennacherib.'
  },
  rabshakeh: {
    name: 'The Rabshakeh', linkNames: ['Rabshakeh'], role: 'Senior Assyrian official and royal spokesman', life: 'Years of birth and death unknown; active in 701 BCE',
    dateNote: 'Rabshakeh is a title, not a personal name. The text does not identify this official’s name or lifespan.',
    locations: ['Lachish', 'Jerusalem', 'Libnah', 'Assyria'], passages: ['Isaiah 36:2–22', 'Isaiah 37:4–9'],
    importance: 'The Rabshakeh delivers Sennacherib’s challenge at Jerusalem. His speech attacks trust in Egypt, Hezekiah, and the Lord. It sets up the central question of Isaiah 36–37: whom will Judah trust?',
    connections: 'Representative of Sennacherib. Speaks with Eliakim, Shebna, and Joah before Jerusalem’s people.'
  },
  eliakim: {
    name: 'Eliakim', role: 'Administrator of Hezekiah’s royal household', life: 'Years of birth and death unknown; active in the late eighth century BCE',
    dateNote: 'Isaiah places Eliakim in office during Hezekiah’s reign. No exact lifespan is known.',
    locations: ['Jerusalem', 'Judah'], passages: ['Isaiah 22:20–25', 'Isaiah 36:3, 11, 22', 'Isaiah 37:2'],
    importance: 'Eliakim receives authority over the royal household and later represents Hezekiah during the Assyrian confrontation. He helps carry the crisis report to Isaiah.',
    connections: 'Colleague of Shebna and Joah. Servant of Hezekiah.'
  },
  shebna: {
    name: 'Shebna', role: 'Royal official and scribe in Judah', life: 'Years of birth and death unknown; active in the late eighth century BCE',
    dateNote: 'The text records his offices during Hezekiah’s time but does not give his lifespan.',
    locations: ['Jerusalem', 'Judah'], passages: ['Isaiah 22:15–19', 'Isaiah 36:3, 11, 22', 'Isaiah 37:2'],
    importance: 'Isaiah rebukes Shebna’s pride in chapter 22. Later, Shebna serves as a scribe in the delegation that hears the Assyrian demand.',
    connections: 'Colleague of Eliakim and Joah. Official under Hezekiah.'
  },
  joah: {
    name: 'Joah', role: 'Royal recorder under Hezekiah', life: 'Years of birth and death unknown; active in 701 BCE',
    dateNote: 'Isaiah identifies his office and father but gives no lifespan.',
    locations: ['Jerusalem', 'Judah'], passages: ['Isaiah 36:3, 11, 22'],
    importance: 'Joah joins Eliakim and Shebna in the delegation that hears the Rabshakeh. He helps report the Assyrian message to Hezekiah.',
    connections: 'Colleague of Eliakim and Shebna. Servant of Hezekiah.'
  },
  'merodach-baladan': {
    name: 'Merodach-baladan', role: 'Babylonian king, also called Marduk-apla-iddina II', life: 'Birth year unknown–about 694 BCE',
    dateNote: 'His final years are not fully clear. Historical reconstructions usually place his death around 694 BCE.',
    locations: ['Babylon', 'Babylonia', 'Elam'], passages: ['Isaiah 39:1–8'],
    importance: 'He sends envoys to Hezekiah. Their visit looks friendly, but Isaiah uses it to point toward a later Babylonian removal of Judah’s wealth and royal descendants.',
    connections: 'Rival of Assyria. Sender of the embassy to Hezekiah. Contemporary of Sennacherib.'
  },
  nebuchadnezzar: {
    name: 'Nebuchadnezzar II', linkNames: ['Nebuchadnezzar'], role: 'King of the Neo-Babylonian Empire', life: 'About 642–562 BCE',
    dateNote: 'The birth year is approximate. Babylonian records place his reign from 605 to 562 BCE.',
    locations: ['Babylon', 'Jerusalem', 'Judah', 'Carchemish'], passages: ['Historical horizon of Isaiah 39 and 40–55'],
    importance: 'Nebuchadnezzar lived after Isaiah’s eighth-century setting. His armies captured Jerusalem and destroyed the city in 586 BCE. These events form the exile setting anticipated in Isaiah 39 and addressed by later parts of the book.',
    connections: 'Son of Nabopolassar. Babylonian conqueror of Judah. Predecessor in the empire later conquered by Cyrus.'
  },
  nabopolassar: {
    name: 'Nabopolassar', role: 'Founder of the Neo-Babylonian Empire', life: 'Birth year unknown–605 BCE',
    dateNote: 'Babylonian records place his reign from 626 to 605 BCE. His birth year is unknown.',
    locations: ['Babylon', 'Babylonia', 'Nineveh'], passages: ['Historical background for Isaiah 39:6–7'],
    importance: 'Nabopolassar helped end Assyrian rule and established the Babylonian dynasty that later conquered Judah. He lived after Isaiah’s eighth-century setting.',
    connections: 'Father and predecessor of Nebuchadnezzar II.'
  },
  cyrus: {
    name: 'Cyrus II', linkNames: ['Cyrus'], role: 'Founder of the Persian Empire', life: 'About 600–530 BCE',
    dateNote: 'Ancient sources do not give a certain birth year. His death is usually dated to 530 BCE.',
    locations: ['Persia', 'Anshan', 'Babylon', 'Pasargadae'], passages: ['Isaiah 44:28', 'Isaiah 45:1–13'],
    importance: 'Isaiah names Cyrus as the ruler who will defeat Babylon and permit restoration. The book calls him God’s anointed, although he is a foreign king.',
    connections: 'Conqueror of Babylon in 539 BCE. Ruler associated with the return of displaced peoples and the rebuilding of temples.'
  }
};

function linkedPeopleHtml(text, currentId) {
  const terms = [];
  for (const [id, person] of Object.entries(people)) {
    if (id === currentId) continue;
    for (const label of [person.name, ...(person.linkNames || [])]) terms.push({id, label});
  }
  terms.sort((a, b) => b.label.length - a.label.length);
  const byLabel = new Map(terms.map(item => [item.label, item.id]));
  const escapedTerms = terms.map(item => item.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!escapedTerms.length) return escapeHtml(text);
  const pattern = new RegExp(escapedTerms.join('|'), 'g');
  let html = '', cursor = 0;
  for (const match of text.matchAll(pattern)) {
    html += escapeHtml(text.slice(cursor, match.index));
    const id = byLabel.get(match[0]);
    html += `<button type="button" class="person-inline-link" data-person-id="${id}" aria-label="Open profile for ${escapeHtml(people[id].name)}">${escapeHtml(match[0])}</button>`;
    cursor = match.index + match[0].length;
  }
  return html + escapeHtml(text.slice(cursor));
}

const featurePeople = {
  'aram-against-judah': ['rezin', 'ahaz'],
  'israel-against-judah': ['pekah', 'ahaz'],
  judah: ['hezekiah', 'isaiah'], jerusalem: ['hezekiah', 'isaiah'],
  assyria: ['sennacherib'], nineveh: ['sennacherib'],
  lachish: ['sennacherib'], 'lachish-mission': ['sennacherib'],
  'west-campaign': ['sennacherib'], 'sargon-death': ['sennacherib'],
  western701: ['sennacherib', 'hezekiah'], 'lachish-art': ['sennacherib'],
  death681: ['sennacherib'], babylon703: ['merodach-baladan', 'sennacherib'],
  'babylon-envoys-route': ['merodach-baladan', 'hezekiah'],
  babylon: ['merodach-baladan', 'nebuchadnezzar'],
  'babylonia-early': ['merodach-baladan'],
  babylonia: ['nebuchadnezzar'], 'exile-horizon': ['nebuchadnezzar'],
  carchemish605: ['nebuchadnezzar'], jerusalem597: ['nebuchadnezzar'],
  jerusalem586: ['nebuchadnezzar'], persian: ['cyrus'], cyrus539: ['cyrus'], susa: ['cyrus']
};

export function portraitsHtml(ids = [], options = {}) {
  const known = [...new Set(ids)].filter(id => people[id]);
  if (!known.length) return '';
  return `<div class="portrait-group" data-people="${known.join(',')}" data-profile-links="${options.interactive === false ? 'false' : 'true'}" aria-label="People in this story">${known.map(id => {
    const {name, role} = people[id];
    const linkedRole = role.replace(/Isaiah (\d+)(?:–\d+)?/g, (reference, chapter) =>
      `<a class="scripture-reference" href="https://www.churchofjesuschrist.org/study/scriptures/ot/isa/${chapter}?lang=eng" target="_blank" rel="noopener">${reference}</a>`);
    const licensedImage = portraitMode === 'non-generated' ? licensedImages[id] : null;
    const image = licensedImage || { src: `assets/portraits/${id}-v2.png` };
    const hue = [...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) % 360;
    const credit = image?.sourceUrl ? `<small class="portrait-credit"><a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(image.credit)}</a> · <a href="${escapeHtml(image.licenseUrl)}" target="_blank" rel="noopener">${escapeHtml(image.license)}</a> · Cropped</small>` : '';
    const imageKind = licensedImage ? 'Historical depiction' : 'Generated illustration';
    const art = `<span class="portrait-art" style="--portrait-hue:${hue}"><span class="portrait-initial" role="img" aria-label="${name}: portrait failed to load" aria-hidden="true">${name[0]}</span>${portraitImageHtml(image.src, `${imageKind} of ${name}`)}</span>`;
    if (options.interactive === false) {
      return `<figure class="person-portrait">${art}<figcaption><strong>${escapeHtml(name)}</strong><span>${linkedRole}</span>${credit}</figcaption></figure>`;
    }
    const profileControl = `<button type="button" class="portrait-profile-button" data-person-id="${id}" aria-label="Open profile for ${escapeHtml(name)}">${art}<span class="portrait-copy"><strong class="portrait-name">${escapeHtml(name)}</strong><span class="portrait-role">${escapeHtml(role)}</span></span></button>`;
    return `<figure class="person-portrait portrait-profile-link">${profileControl}${credit}</figure>`;
  }).join('')}</div>`;
}

export function personProfileHtml(id, options = {}) {
  const person = people[id];
  if (!person) return '';
  const linkHtml = options.linkHtml || (text => linkedPeopleHtml(text, id));
  const back = options.backLabel ? `<button class="back-button person-profile-back" data-action="person-profile-back" aria-label="${escapeHtml(options.backLabel)}">Back</button>` : '';
  return `<section class="person-profile" data-person-profile="${id}">${back}<h2>${escapeHtml(person.name)}</h2>${portraitsHtml([id], {interactive:false})}<dl class="person-facts"><div><dt>Estimated lifespan</dt><dd>${escapeHtml(person.life)}</dd></div><div><dt>Known for</dt><dd>${linkHtml(person.role)}</dd></div><div><dt>Key locations</dt><dd>${person.locations.map(linkHtml).join(' · ')}</dd></div></dl><p class="profile-date-note"><strong>Date note.</strong> ${linkHtml(person.dateNote)}</p><div class="word-section"><h3>Why this person matters</h3><p>${linkHtml(person.importance)}</p></div><div class="word-section"><h3>Story connections</h3><p>${linkHtml(person.connections)}</p></div><div class="word-section"><h3>Relevant passages</h3><ul class="profile-passages">${person.passages.map(passage => `<li>${escapeHtml(passage)}</li>`).join('')}</ul></div><p class="profile-portrait-note">Portraits are illustrations or later historical depictions. They do not show the person’s known appearance.</p></section>`;
}

export function personIdForLabel(label = '') {
  const normalized = label.toLowerCase().replace(/[‐‑–—]/g, '-').replace(/^the\s+/, '').trim();
  const aliases = {
    'amos':'amoz', 'nebuchadnezzar ii':'nebuchadnezzar', 'cyrus ii':'cyrus',
    'shear jashub':'shear-jashub', 'maher shalal hash baz':'maher-shalal-hash-baz'
  };
  return people[normalized] ? normalized : aliases[normalized] || null;
}

export function featurePortraits(feature) {
  const ids = featurePeople[feature.id] || featurePeople[feature.faction] || [];
  return portraitsHtml(ids);
}

export function wordPortraits(label = '') {
  const id = personIdForLabel(label) || label.toLowerCase().replace(/[‐‑–—]/g, '-').replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
  const aliases = { judah: ['hezekiah', 'isaiah'], assyria: ['sennacherib'], babylon: ['merodach-baladan'] };
  return portraitsHtml(people[id] ? [id] : aliases[id] || [], {interactive:false});
}
