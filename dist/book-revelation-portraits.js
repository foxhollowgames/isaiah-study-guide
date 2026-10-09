const bookArt = {"john-vision": {"src": "assets/portraits/revelation/john-vision.png", "generated": true, "title": "John · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected biblical profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "balaam": {"title": "File:Hermann tom Ring - Balaam (^) - 4649 - Bavarian State Painting Collections.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Hermann_tom_Ring_-_Balaam_%28%5E%29_-_4649_-_Bavarian_State_Painting_Collections.jpg/500px-Hermann_tom_Ring_-_Balaam_%28%5E%29_-_4649_-_Bavarian_State_Painting_Collections.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hermann_tom_Ring_-_Balaam_(%5E)_-_4649_-_Bavarian_State_Painting_Collections.jpg", "credit": "Hermann tom Ring", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "", "src": "assets/portraits/numbers/balaam.jpg", "note": "Later story-based artwork. It does not establish actual appearance. Group scenes do not identify a known individual likeness."}, "balak": {"src": "assets/portraits/numbers/balak.png", "generated": true, "credit": "AI-generated illustration", "license": "Generated artwork", "description": "Imaginative portrait based on the person’s narrative role.", "note": "The biblical account does not establish this person’s actual appearance."}, "david": {"src": "assets/portraits/ruth/david.png", "generated": true, "title": "David · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence."}, "moses": {"title": "File:Rembrandt - Moses Smashing the Tablets of the Law - WGA19132.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg/500px-Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "", "src": "assets/portraits/exodus/moses.jpg", "note": "Historical art illustrates the person or story. It does not establish actual appearance."}};
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
export const people = {"john-vision": {"name": "John", "role": "Named visionary who addresses seven assemblies and records what he hears and sees", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Revelation 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22"], "importance": "His received visions become a written appeal for hearing, keeping, and faithful endurance.", "connections": "He calls himself their brother and partner in oppression, kingdom, and endurance.", "verseScope": {}, "linkNames": ["John"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}, "jesus": {"name": "Jesus Christ", "role": "Living witness and Lamb whose death and victory ground rescue and judgment", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Revelation 1, 2, 3, 5, 6, 7, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22"], "importance": "His victory tests claims to power while offering life to those who follow him.", "connections": "The visions connect his authority with redeemed people, testimony, and shared worship.", "verseScope": {"13": [8]}, "linkNames": ["Jesus", "Christ", "Lamb"], "chapterIds": [1, 2, 3, 5, 6, 7, 11, 12, 13, 14, 15, 17, 19, 20, 21, 22]}, "balaam": {"name": "Balaam", "role": "Recalled teacher whose error supplies a comparison within the Pergamum message", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Revelation 2"], "importance": "His recalled teaching makes tolerated conduct a concern despite the assembly's earlier endurance.", "connections": "The message connects him with Balak and the stumbling of Israel.", "verseScope": {}, "linkNames": ["Balaam"], "chapterIds": [2]}, "balak": {"name": "Balak", "role": "Ruler recalled within the warning about Balaam's teaching", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Revelation 2"], "importance": "His mention gives the warning a recalled comparison rather than a reconstructed local incident.", "connections": "The speaker names him as the person Balaam taught to place a stumbling block.", "verseScope": {}, "linkNames": ["Balak"], "chapterIds": [2]}, "david": {"name": "David", "role": "Recalled king whose name appears in images of authority and promised descent", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Revelation 3, 5, 22"], "importance": "These images concern received authority and promise rather than a new episode in his life.", "connections": "The key, root, and offspring references connect his name with the victorious speaker.", "verseScope": {}, "linkNames": ["David"], "chapterIds": [3, 5, 22]}, "moses": {"name": "Moses", "role": "Servant of God named in the victors' song", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Revelation 15"], "importance": "His recalled name connects praise of just rule with rescue.", "connections": "His song is joined with the song of the Lamb beside the glassy sea.", "verseScope": {}, "linkNames": ["Moses"], "chapterIds": [15]}};

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

const featurePeople = {"revelation-1": ["john-vision", "jesus"], "revelation-2": ["john-vision", "jesus", "balaam", "balak"], "revelation-3": ["john-vision", "jesus", "david"], "revelation-4": ["john-vision"], "revelation-5": ["john-vision", "jesus", "david"], "revelation-6": ["john-vision", "jesus"], "revelation-7": ["john-vision", "jesus"], "revelation-8": ["john-vision"], "revelation-9": ["john-vision"], "revelation-10": ["john-vision"], "revelation-11": ["john-vision", "jesus"], "revelation-12": ["john-vision", "jesus"], "revelation-13": ["john-vision", "jesus"], "revelation-14": ["john-vision", "jesus"], "revelation-15": ["john-vision", "jesus", "moses"], "revelation-16": ["john-vision"], "revelation-17": ["john-vision", "jesus"], "revelation-18": ["john-vision"], "revelation-19": ["john-vision", "jesus"], "revelation-20": ["john-vision", "jesus"], "revelation-21": ["john-vision", "jesus"], "revelation-22": ["john-vision", "jesus", "david"]};

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
  const back = options.backLabel ? `<button class="back-button person-profile-back" data-action="person-profile-back">← ${escapeHtml(options.backLabel)}</button>` : '';
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
