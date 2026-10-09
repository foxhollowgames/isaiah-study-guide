const bookArt = {"jehoiachin": {"src": "assets/portraits/2-kings/jehoiachin.png", "generated": true, "title": "Jehoiachin · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "nebuchadnezzar": {"src": "assets/portraits/nebuchadnezzar-v2.png", "generated": true, "title": "nebuchadnezzar · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Reused for the same person depicted in Isaiah. Appearance and setting remain artistic interpretations."}, "ezekiel": {"src": "assets/portraits/ezekiel/ezekiel.png", "generated": true, "title": "Ezekiel · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance and setting are not verified historical evidence."}, "ezekiel-wife": {"src": "assets/portraits/ezekiel/ezekiel-wife.png", "generated": true, "title": "Ezekiel’s unnamed wife · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance and setting are not verified historical evidence."}};
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
export const people = {"ezekiel": {"name": "Ezekiel", "role": "Priest and prophet among the captives", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ezekiel 1–48"], "importance": "His visions and public actions explain judgment and a future with God among the people.", "connections": "He is Buzi’s son and speaks to the exiles.", "verseScope": {}, "linkNames": [], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48], "word": {"language": "hebrew", "strongId": "H3168", "key": "Ezekiel", "checkedVerses": 2, "example": [1, 3], "hebrew": "יְחֶזְקֵאל", "transliteration": "Yᵉchezqêʼl", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "ezekiel-wife": {"name": "Ezekiel’s wife", "role": "Unnamed wife whose death becomes part of a public sign", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ezekiel 24:15–24"], "importance": "Her death brings the prophet’s warning into his household. The text gives no name or personal response.", "connections": "Ezekiel calls her the desire of his eyes.", "verseScope": {}, "linkNames": [], "chapterIds": [24]}, "jehoiachin": {"name": "Jehoiachin", "role": "Captive king whose exile supplies the opening date", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ezekiel 1:2"], "importance": "His captivity locates Ezekiel’s calling within the experience of displaced people.", "connections": "He is Jehoiakim’s son. His mother and officials share the deportation.", "verseScope": {}, "linkNames": ["Jehoiachin", "Jeconiah", "Coniah"], "chapterIds": [1], "word": {"language": "hebrew", "strongId": "H3112", "key": "Jehoiachin", "checkedVerses": 1, "example": [1, 2], "hebrew": "יוֹיָכִין", "transliteration": "Yôwyâkîyn", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "nebuchadnezzar": {"name": "Nebuchadnezzar", "role": "Babylonian king named in speeches about Tyre and Egypt", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ezekiel 26:7; 29:18–20"], "importance": "The speeches connect his military effort with a promised reward in Egypt.", "connections": "He rules over Judah, orders Jeremiah’s protection, and takes captives.", "verseScope": {}, "linkNames": ["Nebuchadnezzar"], "chapterIds": [26, 29], "word": {"language": "hebrew", "strongId": "H5019", "key": "Nebuchadnezzar", "checkedVerses": 4, "example": [26, 7], "hebrew": "נְבוּכַדְנֶאצַּר", "transliteration": "Nᵉbûwkadneʼtstsar", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}};

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

const featurePeople = {"ezekiel-1": ["ezekiel", "jehoiachin"], "ezekiel-2": ["ezekiel"], "ezekiel-3": ["ezekiel"], "ezekiel-4": ["ezekiel"], "ezekiel-5": ["ezekiel"], "ezekiel-6": ["ezekiel"], "ezekiel-7": ["ezekiel"], "ezekiel-8": ["ezekiel"], "ezekiel-9": ["ezekiel"], "ezekiel-10": ["ezekiel"], "ezekiel-11": ["ezekiel"], "ezekiel-12": ["ezekiel"], "ezekiel-13": ["ezekiel"], "ezekiel-14": ["ezekiel"], "ezekiel-15": ["ezekiel"], "ezekiel-16": ["ezekiel"], "ezekiel-17": ["ezekiel"], "ezekiel-18": ["ezekiel"], "ezekiel-19": ["ezekiel"], "ezekiel-20": ["ezekiel"], "ezekiel-21": ["ezekiel"], "ezekiel-22": ["ezekiel"], "ezekiel-23": ["ezekiel"], "ezekiel-24": ["ezekiel", "ezekiel-wife"], "ezekiel-25": ["ezekiel"], "ezekiel-26": ["ezekiel", "nebuchadnezzar"], "ezekiel-27": ["ezekiel"], "ezekiel-28": ["ezekiel"], "ezekiel-29": ["ezekiel", "nebuchadnezzar"], "ezekiel-30": ["ezekiel"], "ezekiel-31": ["ezekiel"], "ezekiel-32": ["ezekiel"], "ezekiel-33": ["ezekiel"], "ezekiel-34": ["ezekiel"], "ezekiel-35": ["ezekiel"], "ezekiel-36": ["ezekiel"], "ezekiel-37": ["ezekiel"], "ezekiel-38": ["ezekiel"], "ezekiel-39": ["ezekiel"], "ezekiel-40": ["ezekiel"], "ezekiel-41": ["ezekiel"], "ezekiel-42": ["ezekiel"], "ezekiel-43": ["ezekiel"], "ezekiel-44": ["ezekiel"], "ezekiel-45": ["ezekiel"], "ezekiel-46": ["ezekiel"], "ezekiel-47": ["ezekiel"], "ezekiel-48": ["ezekiel"]};

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
