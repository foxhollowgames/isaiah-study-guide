const bookArt = {"jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-mother": {"src": "assets/portraits/matthew/mary-mother.png", "generated": true, "title": "Mary, mother of Jesus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "john-baptizer": {"src": "assets/portraits/matthew/john-baptizer.png", "generated": true, "title": "John the Baptizer · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-magdalene": {"src": "assets/portraits/matthew/mary-magdalene.png", "generated": true, "title": "Mary Magdalene · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}};
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
export const people = {"jesus": {"name": "Jesus of Nazareth", "role": "Teacher presented as the Christ and Son of God", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 1–16"], "importance": "John baptizes him in the Jordan. He teaches, heals, and casts out demons in Galilee. He tells his disciples three times that he will be killed and rise. He is crucified, and a young man at the tomb says he has risen.", "connections": "Mary is his mother. Mark names four brothers and mentions his sisters.", "verseScope": {}, "linkNames": ["Jesus"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "word": {"language": "greek", "strongId": "G2424", "key": "Jesus", "checkedVerses": 88, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Ἰησοῦς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iēsoûs", "languageNote": "This is the dictionary form of the name “Jesus.”"}}, "mary-mother": {"name": "Mary, mother of Jesus", "role": "Mother named in the hometown discussion", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 3:31–35; 6:3"], "importance": "She comes with Jesus’ brothers and stands outside, calling for him. Jesus says that whoever does God’s will is his family. People in his own country later call him the son of Mary.", "connections": "Jesus is her son. People name James, Joses, Judah, and Simon as his brothers.", "verseScope": {"6": [3]}, "linkNames": ["Mary"], "chapterIds": [3, 6], "word": {"language": "greek", "strongId": "G3137", "key": "Mary", "checkedVerses": 5, "example": [6, 3], "hebrew": "", "transliteration": "", "greek": "Μαρία", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "María"}}, "john-baptizer": {"name": "John the Baptizer", "role": "Preacher who baptizes Jesus and dies under Herod’s order", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 1; 2:18; 6:14–29; 8:28; 11:30–32"], "importance": "He baptizes in the wilderness and says a mightier one comes after him. He baptizes Jesus in the Jordan. He tells Herod that his marriage is not lawful. Herod has him beheaded to keep an oath made at a supper.", "connections": "King Herod puts him in prison for the sake of Herodias. His disciples bury his body.", "verseScope": {"1": [4, 6, 9, 14], "2": [18], "6": [14, 16, 17, 18, 20, 24, 25, 27, 29], "8": [28], "11": [30, 32]}, "linkNames": ["John the Baptizer"], "chapterIds": [1, 2, 6, 8, 11], "word": {"language": "greek", "strongId": "G2491", "key": "John", "checkedVerses": 25, "example": [1, 4], "hebrew": "", "transliteration": "", "greek": "Ἰωάννης", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iōánnēs", "languageNote": "This is the dictionary form of the name “John.”"}}, "peter": {"name": "Simon Peter", "role": "Fisherman who follows Jesus and later denies knowing him", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 1; 3; 5; 8–11; 13–14; 16:7"], "importance": "Simon leaves his nets, and Jesus names him Peter. He calls Jesus the Christ, then rebukes him for speaking of death. He says he will not deny Jesus, then denies him three times and weeps. The young man at the tomb sends word to “his disciples and Peter.”", "connections": "Andrew is his brother. Jesus heals his wife’s mother of a fever.", "verseScope": {"1": [], "3": [16], "5": [37], "8": [29, 32, 33], "9": [2, 5], "10": [28], "11": [21], "13": [3], "14": [29, 33, 37, 54, 66, 67, 70, 72], "16": [7]}, "linkNames": ["Peter", "Simon Peter"], "chapterIds": [1, 3, 5, 8, 9, 10, 11, 13, 14, 16], "word": {"language": "greek", "strongId": "G4074", "key": "Peter", "checkedVerses": 19, "example": [3, 16], "hebrew": "", "transliteration": "", "greek": "Πέτρος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Pétros", "languageNote": "This is the dictionary form of the name “Peter.”"}}, "mary-magdalene": {"name": "Mary Magdalene", "role": "Witness of the cross, burial, and opened tomb", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 15:40–47; 16:1–11"], "importance": "She watches the cross from afar and sees where Jesus is laid. She brings spices to the tomb and hears that he has risen. The women flee and say nothing, for they are afraid. Jesus then appears to her first, but the others do not believe her.", "connections": "She goes with Salome and with Mary the mother of James and Joses. Jesus had cast seven demons out of her.", "verseScope": {"15": [40, 47], "16": [1, 9]}, "linkNames": ["Mary Magdalene"], "chapterIds": [15, 16], "word": {"language": "greek", "strongId": "G3137", "key": "Mary", "checkedVerses": 5, "example": [6, 3], "hebrew": "", "transliteration": "", "greek": "Μαρία", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "María", "languageNote": "This is the dictionary form of the name “Mary.”"}}};

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

const featurePeople = {"mark-1": ["jesus", "john-baptizer", "peter"], "mark-2": ["jesus", "john-baptizer"], "mark-3": ["jesus", "mary-mother", "peter"], "mark-4": ["jesus"], "mark-5": ["jesus", "peter"], "mark-6": ["jesus", "mary-mother", "john-baptizer"], "mark-7": ["jesus"], "mark-8": ["jesus", "john-baptizer", "peter"], "mark-9": ["jesus", "peter"], "mark-10": ["jesus", "peter"], "mark-11": ["jesus", "john-baptizer", "peter"], "mark-12": ["jesus"], "mark-13": ["jesus", "peter"], "mark-14": ["jesus", "peter"], "mark-15": ["jesus", "mary-magdalene"], "mark-16": ["jesus", "peter", "mary-magdalene"]};

export function portraitsHtml(ids = [], options = {}) {
  const known = [...new Set(ids)].filter(id => people[id]);
  if (!known.length) return '';
  return `<div class="portrait-group" data-people="${known.join(',')}" data-profile-links="${options.interactive === false ? 'false' : 'true'}" aria-label="People in this story">${known.map(id => {
    const {name, role} = people[id];
    const linkedRole = role.replace(/Isaiah (\d+)(?:–\d+)?/g, (reference, chapter) =>
      `<a class="scripture-reference" href="https://www.churchofjesuschrist.org/study/scriptures/ot/isa/${chapter}?lang=eng" target="_blank" rel="noopener">${reference}</a>`);
    const licensedImage = bookArt[id] && (portraitMode !== 'non-generated' || !bookArt[id].generated) ? bookArt[id] : null;
    const image = licensedImage || { src: '', generated:true };
    const hue = [...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) % 360;
    const credit = image?.sourceUrl ? `<small class="portrait-credit"><a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(image.credit)}</a> · <a href="${escapeHtml(image.licenseUrl)}" target="_blank" rel="noopener">${escapeHtml(image.license)}</a> · Cropped</small>` : '';
    const imageKind = image.generated ? 'Generated illustration' : 'Historical depiction';
    const art = `<span class="portrait-art" style="--portrait-hue:${hue}"><span class="portrait-initial" role="img" aria-label="${name}: ${image.src ? 'portrait failed to load' : 'no portrait available'}" aria-hidden="${!!image.src}">${name[0]}</span>${portraitImageHtml(image.src, `${imageKind} of ${name}`)}</span>`;
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
  const back = options.backLabel ? `<button class="back-button person-profile-back" data-action="person-profile-back" aria-label="${escapeHtml(options.backLabel)}">← Back</button>` : '';
  return `<section class="person-profile" data-person-profile="${id}">${back}<h2>${escapeHtml(person.name)}</h2>${portraitsHtml([id], {interactive:false})}<dl class="person-facts">${person.locations.length ? `<div><dt>Key locations</dt><dd>${person.locations.map(linkHtml).join(' · ')}</dd></div>` : ""}</dl><div class="word-section"><h3>Why this person matters</h3><p>${linkHtml(person.importance)}</p></div><div class="word-section"><h3>Story connections</h3><p>${linkHtml(person.connections)}</p></div><div class="word-section"><h3>Relevant passages</h3><ul class="profile-passages">${person.passages.map(passage => `<li>${escapeHtml(passage)}</li>`).join('')}</ul></div></section>`;
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
