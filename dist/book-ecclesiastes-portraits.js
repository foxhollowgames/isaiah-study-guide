const bookArt = {"david": {"src": "assets/portraits/ruth/david.png", "generated": true, "title": "David · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence."}, "preacher-ecclesiastes": {"src": "assets/portraits/ecclesiastes/preacher-ecclesiastes.png", "generated": true, "title": "The Preacher · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "closing-writer-ecclesiastes": {"src": "assets/portraits/ecclesiastes/closing-writer-ecclesiastes.png", "generated": true, "title": "The closing writer · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "solitary-worker-ecclesiastes": {"src": "assets/portraits/ecclesiastes/solitary-worker-ecclesiastes.png", "generated": true, "title": "The solitary worker · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "young-king-ecclesiastes": {"src": "assets/portraits/ecclesiastes/young-king-ecclesiastes.png", "generated": true, "title": "The wise youth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "old-king-ecclesiastes": {"src": "assets/portraits/ecclesiastes/old-king-ecclesiastes.png", "generated": true, "title": "The old king · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "poor-rescuer-ecclesiastes": {"src": "assets/portraits/ecclesiastes/poor-rescuer-ecclesiastes.png", "generated": true, "title": "The poor rescuer · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "attacking-king-ecclesiastes": {"src": "assets/portraits/ecclesiastes/attacking-king-ecclesiastes.png", "generated": true, "title": "The attacking king · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "beloved-wife-ecclesiastes": {"src": "assets/portraits/ecclesiastes/beloved-wife-ecclesiastes.png", "generated": true, "title": "The beloved wife · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}};
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
export const people = {"preacher-ecclesiastes": {"name": "The Preacher", "role": "Main speaker who examines work, pleasure, and death", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 1:1, 12; 2; 3; 12:8–10"], "importance": "His questions test whether effort, wealth, and wisdom can secure lasting gain.", "connections": "The opening presents him as David’s son and a king in Jerusalem.", "verseScope": {}, "linkNames": ["Preacher"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}, "david": {"name": "David", "role": "Father named in the opening description", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 1:1"], "importance": "The family description gives the speaker a royal setting.", "connections": "The title identifies the Preacher as his son. It does not name Solomon.", "verseScope": {}, "linkNames": [], "chapterIds": [1], "word": {"language": "hebrew", "strongId": "H1732", "key": "David", "checkedVerses": 1, "example": [1, 1], "hebrew": "דָּוִד", "transliteration": "Dâvid", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "closing-writer-ecclesiastes": {"name": "The closing writer", "role": "Voice that describes the Preacher’s teaching", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 12:9–14"], "importance": "His advice closes the book with responsibility for actions.", "connections": "He praises the Preacher’s careful words and urges obedience to God.", "verseScope": {}, "linkNames": ["closing writer"], "chapterIds": [12]}, "solitary-worker-ecclesiastes": {"name": "The solitary worker", "role": "Worker with no son or brother", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 4:8"], "importance": "His question shows how gathering wealth can replace enjoyment and companionship.", "connections": "He keeps working and seeking wealth without asking whom the work serves.", "verseScope": {"4": [8]}, "linkNames": ["solitary worker", "one who is alone"], "chapterIds": [4]}, "young-king-ecclesiastes": {"name": "The wise youth", "role": "Poor young man in the example of changing rulers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 4:13–16"], "importance": "His success still cannot secure the praise of later generations.", "connections": "The account describes him leaving prison and gaining rule.", "verseScope": {"4": [13]}, "linkNames": ["wise youth"], "chapterIds": [4]}, "old-king-ecclesiastes": {"name": "The old king", "role": "Ruler who refuses further advice", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 4:13"], "importance": "Refusing to listen makes his age and rank poor guides to wisdom.", "connections": "The Preacher compares him unfavorably with a poor, wise youth.", "verseScope": {"4": [13]}, "linkNames": ["old and foolish king"], "chapterIds": [4]}, "poor-rescuer-ecclesiastes": {"name": "The poor rescuer", "role": "Wise man who saves a small city", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 9:14–16"], "importance": "Poverty can cause people to ignore advice that already helped them.", "connections": "The people forget him after his wisdom delivers their city.", "verseScope": {"9": [15]}, "linkNames": ["poor wise man"], "chapterIds": [9]}, "attacking-king-ecclesiastes": {"name": "The attacking king", "role": "Ruler who surrounds a small city", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 9:14–15"], "importance": "The example compares armed strength with advice from a person of little status.", "connections": "He builds defenses for his attack, but a poor man’s wisdom saves the city.", "verseScope": {"9": [14]}, "linkNames": ["great king"], "chapterIds": [9]}, "beloved-wife-ecclesiastes": {"name": "The beloved wife", "role": "Partner in the Preacher’s advice about enjoying life", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Ecclesiastes 9:9"], "importance": "Shared life appears among gifts that people can enjoy during their short lives.", "connections": "He urges a listener to live joyfully with the wife he loves.", "verseScope": {"9": [9]}, "linkNames": ["wife"], "chapterIds": [9]}};

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

const featurePeople = {"ecclesiastes-1": ["preacher-ecclesiastes", "david"], "ecclesiastes-2": ["preacher-ecclesiastes"], "ecclesiastes-3": ["preacher-ecclesiastes"], "ecclesiastes-4": ["preacher-ecclesiastes", "solitary-worker-ecclesiastes", "young-king-ecclesiastes", "old-king-ecclesiastes"], "ecclesiastes-5": ["preacher-ecclesiastes"], "ecclesiastes-6": ["preacher-ecclesiastes"], "ecclesiastes-7": ["preacher-ecclesiastes"], "ecclesiastes-8": ["preacher-ecclesiastes"], "ecclesiastes-9": ["preacher-ecclesiastes", "poor-rescuer-ecclesiastes", "attacking-king-ecclesiastes", "beloved-wife-ecclesiastes"], "ecclesiastes-10": ["preacher-ecclesiastes"], "ecclesiastes-11": ["preacher-ecclesiastes"], "ecclesiastes-12": ["preacher-ecclesiastes", "closing-writer-ecclesiastes"]};

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
