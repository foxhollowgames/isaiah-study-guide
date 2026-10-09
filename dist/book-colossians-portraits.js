const bookArt = {"paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "timothy": {"src": "assets/portraits/romans/timothy.png", "generated": true, "title": "Timothy · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "tychicus": {"src": "assets/portraits/ephesians/tychicus.png", "generated": true, "title": "Tychicus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "epaphras": {"src": "assets/portraits/colossians/epaphras.png", "generated": true, "title": "Epaphras · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "onesimus": {"src": "assets/portraits/colossians/onesimus.png", "generated": true, "title": "Onesimus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}};
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
export const people = {"paul": {"name": "Paul", "role": "Writer in chains who prays for the Colossians", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Colossians 1:1, 23–29; 2:1; 4:3, 18"], "importance": "Paul gives thanks for the Colossians’ faith and love. He says he labors and suffers for them. He asks them to pray for him. He asks them to read this letter to the Laodiceans. He signs with his own hand and asks them to remember his chains.", "connections": "He writes with Timothy. He sends Tychicus and Onesimus to tell the readers his news.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1, 2, 4], "word": {"language": "greek", "strongId": "G3972", "key": "Paul", "checkedVerses": 3, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Παῦλος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Paûlos"}}, "jesus": {"name": "Jesus Christ", "role": "Lord, image of God, and head of the assembly", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Colossians 1–4"], "importance": "Paul says all things were created by Jesus and through him. Paul says he is above thrones and powers. Paul says he reconciled the readers through his death. Paul then tells them to walk in him and to live as his people.", "connections": "Paul calls him the Son and the head of the body, the assembly. Paul says all things were created by him.", "verseScope": {"4": [3, 12]}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4], "word": {"language": "greek", "strongId": "G5547", "key": "Christ", "checkedVerses": 24, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Χριστός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Christós", "languageNote": "This is the dictionary form of the name “Christ.”"}}, "timothy": {"name": "Timothy", "role": "Brother named with Paul in the greeting", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Colossians 1:1"], "importance": "Paul names Timothy as our brother in the first line. The letter says nothing else about him.", "connections": "The letter names him beside Paul, before it greets the Colossians.", "verseScope": {}, "linkNames": ["Timothy"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G5095", "key": "Timothy", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Τιμόθεος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Timótheos"}}, "tychicus": {"name": "Tychicus", "role": "Messenger Paul sends to tell his news", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Colossians 4:7–9"], "importance": "Paul says Tychicus will make all his affairs known to the Colossians. Paul sends him to learn their circumstances. He is also to comfort their hearts. Onesimus goes with him.", "connections": "Paul calls him a beloved brother, faithful servant, and fellow bondservant. He goes with Onesimus.", "verseScope": {}, "linkNames": ["Tychicus"], "chapterIds": [4], "word": {"language": "greek", "strongId": "G5190", "key": "Tychicus", "checkedVerses": 1, "example": [4, 7], "hebrew": "", "transliteration": "", "greek": "Τυχικός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Tychikós"}}, "epaphras": {"name": "Epaphras", "role": "Colossian who taught them and prays for them", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Colossians 1:7–8; 4:12–13"], "importance": "Paul says the Colossians learned the Good News from Epaphras. He told Paul about their love. Paul says Epaphras always strives for them in prayer. He has great zeal for them and for Laodicea and Hierapolis.", "connections": "Paul says Epaphras is one of them. He cares for those in Colossae, Laodicea, and Hierapolis.", "verseScope": {}, "linkNames": ["Epaphras"], "chapterIds": [1, 4], "word": {"language": "greek", "strongId": "G1889", "key": "Epaphras", "checkedVerses": 2, "example": [1, 7], "hebrew": "", "transliteration": "", "greek": "Ἐπαφρᾶς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Epaphrâs"}}, "onesimus": {"name": "Onesimus", "role": "Faithful brother sent with Tychicus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Colossians 4:9"], "importance": "Paul calls Onesimus the faithful and beloved brother. He sends Onesimus with Tychicus. Together they will tell the Colossians everything that is going on.", "connections": "Paul says he is one of you, the Colossians. He goes with Tychicus.", "verseScope": {}, "linkNames": ["Onesimus"], "chapterIds": [4], "word": {"language": "greek", "strongId": "G3682", "key": "Onesimus", "checkedVerses": 1, "example": [4, 9], "hebrew": "", "transliteration": "", "greek": "Ὀνήσιμος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Onḗsimos"}}};

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

const featurePeople = {"colossians-1": ["paul", "jesus", "timothy", "epaphras"], "colossians-2": ["paul", "jesus"], "colossians-3": ["jesus"], "colossians-4": ["paul", "jesus", "tychicus", "epaphras", "onesimus"]};

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
  const back = options.backLabel ? `<button class="back-button person-profile-back" data-action="person-profile-back" aria-label="${escapeHtml(options.backLabel)}">Back</button>` : '';
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
