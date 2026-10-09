const bookArt = {"zechariah-prophet": {"src": "assets/portraits/ezra/zechariah-prophet.png", "generated": true, "title": "Zechariah, the prophet associated with Iddo · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "zerubbabel": {"src": "assets/portraits/1-chronicles/zerubbabel.png", "generated": true, "title": "Zerubbabel · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "jeshua-priest": {"src": "assets/portraits/ezra/jeshua-priest.png", "generated": true, "title": "Jeshua, son of Jozadak · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "darius-ezra": {"src": "assets/portraits/ezra/darius-ezra.png", "generated": true, "title": "Darius, the Persian king · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}};
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
export const people = {"zechariah-prophet": {"name": "Zechariah, son of Berechiah", "role": "Prophet named in the opening and dated messages", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Jerusalem"], "passages": ["Zechariah 1:1, 7; 7:1, 8"], "importance": "His questions make the visions’ explanations part of the account rather than assumed knowledge.", "connections": "The opening names Berechiah as his father and Iddo as his grandfather.", "verseScope": {}, "linkNames": ["Zechariah"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8], "word": {"language": "hebrew", "strongId": "H2148", "key": "Zechariah", "checkedVerses": 4, "example": [1, 1], "hebrew": "זְכַרְיָה", "transliteration": "Zᵉkaryâh", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "zerubbabel": {"name": "Zerubbabel", "role": "Governor addressed in the promise to finish the house", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Jerusalem"], "passages": ["Zechariah 4:6–10"], "importance": "The same hands must lay the foundation and finish the work despite small beginnings.", "connections": "He is the governor also addressed by Haggai during the rebuilding.", "verseScope": {}, "linkNames": ["Zerubbabel"], "chapterIds": [4], "word": {"language": "hebrew", "strongId": "H2216", "key": "Zerubbabel", "checkedVerses": 4, "example": [4, 6], "hebrew": "זְרֻבָּבֶל", "transliteration": "Zᵉrubbâbel", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "jeshua-priest": {"name": "Joshua, son of Jehozadak", "role": "High priest restored in one vision and crowned in another", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Jerusalem"], "passages": ["Zechariah 3; 6:11"], "importance": "Changed clothing shows removed wrongdoing, while his future service still requires obedience.", "connections": "He is Jehozadak’s son, the high priest also addressed in Haggai.", "verseScope": {}, "linkNames": ["Joshua"], "chapterIds": [3, 6], "word": {"language": "hebrew", "strongId": "H3091", "key": "Joshua", "checkedVerses": 6, "example": [3, 1], "hebrew": "יְהוֹשׁוּעַ", "transliteration": "Yᵉhôwshûwaʻ", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "darius-ezra": {"name": "Darius, the Persian king", "role": "Persian king whose regnal years date the opening messages", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Zechariah 1:1, 7; 7:1"], "importance": "His second and fourth regnal years supply time references without dating the later visions.", "connections": "He is the Persian king also named in Haggai and Ezra.", "verseScope": {}, "linkNames": ["Darius"], "chapterIds": [1, 7], "word": {"language": "hebrew", "strongId": "H1867", "key": "Darius", "checkedVerses": 3, "example": [1, 1], "hebrew": "דָּֽרְיָוֵשׁ", "transliteration": "Dârᵉyâvêsh", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}};

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

const featurePeople = {"zechariah-1": ["zechariah-prophet", "darius-ezra"], "zechariah-2": ["zechariah-prophet"], "zechariah-3": ["zechariah-prophet", "jeshua-priest"], "zechariah-4": ["zechariah-prophet", "zerubbabel"], "zechariah-5": ["zechariah-prophet"], "zechariah-6": ["zechariah-prophet", "jeshua-priest"], "zechariah-7": ["zechariah-prophet", "darius-ezra"], "zechariah-8": ["zechariah-prophet"], "zechariah-9": [], "zechariah-10": [], "zechariah-11": [], "zechariah-12": [], "zechariah-13": [], "zechariah-14": []};

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
