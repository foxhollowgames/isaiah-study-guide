const bookArt = {"daniel": {"src": "assets/portraits/daniel/daniel.png", "generated": true, "title": "Daniel · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance and setting. Scripture gives no verified portrait."}, "shadrach": {"src": "assets/portraits/daniel/shadrach.png", "generated": true, "title": "Hananiah · Shadrach · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance and setting. Scripture gives no verified portrait."}, "meshach": {"src": "assets/portraits/daniel/meshach.png", "generated": true, "title": "Mishael · Meshach · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance and setting. Scripture gives no verified portrait."}, "abednego": {"src": "assets/portraits/daniel/abednego.png", "generated": true, "title": "Azariah · Abednego · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance and setting. Scripture gives no verified portrait."}, "nebuchadnezzar": {"src": "assets/portraits/nebuchadnezzar-v2.png", "generated": true, "title": "nebuchadnezzar · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Reused for the same person depicted in Isaiah. Appearance and setting remain artistic interpretations."}};
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

// Image errors do not bubble. Capture them for portraits added to any panel.
document.addEventListener('error', event => {
  if (event.target.matches?.('.portrait-art img')) {
    const art = event.target.parentElement;
    event.target.remove();
    art.querySelector('.portrait-initial').removeAttribute('aria-hidden');
  }
}, true);
export const people = {"daniel": {"name": "Daniel", "role": "Judean captive, court servant, and witness to visions", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Babylon"], "passages": ["Daniel 1–12"], "importance": "He credits God with understanding and continues prayer when officials threaten his life.", "connections": "His court name is Belteshazzar. He prays with three Judean companions.", "verseScope": {}, "linkNames": ["Belteshazzar"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}, "shadrach": {"name": "Hananiah · Shadrach", "role": "Judean captive who refuses the golden image", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Babylon"], "passages": ["Daniel 1–3"], "importance": "His refusal remains firm even without a promise of rescue.", "connections": "He serves beside Daniel, Mishael, and Azariah.", "verseScope": {}, "linkNames": ["Hananiah", "Shadrach"], "chapterIds": [1, 2, 3]}, "meshach": {"name": "Mishael · Meshach", "role": "Judean captive who refuses the golden image", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Babylon"], "passages": ["Daniel 1–3"], "importance": "He joins his companions in prayer and refuses forced worship.", "connections": "He serves beside Daniel, Hananiah, and Azariah.", "verseScope": {}, "linkNames": ["Mishael", "Meshach"], "chapterIds": [1, 2, 3]}, "abednego": {"name": "Azariah · Abednego", "role": "Judean captive who refuses the golden image", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Babylon"], "passages": ["Daniel 1–3"], "importance": "His rescue follows a refusal that did not depend on survival.", "connections": "He serves beside Daniel, Hananiah, and Mishael.", "verseScope": {}, "linkNames": ["Azariah", "Abednego"], "chapterIds": [1, 2, 3]}, "nebuchadnezzar": {"name": "Nebuchadnezzar", "role": "Babylonian king in the opening court stories", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Babylon"], "passages": ["Daniel 1–4"], "importance": "His power threatens others, but dreams and humiliation reveal its limits.", "connections": "His officials bring Daniel and his companions into royal service.", "verseScope": {}, "linkNames": ["Nebuchadnezzar"], "chapterIds": [1, 2, 3, 4]}};

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

const featurePeople = {"daniel-1": ["daniel", "shadrach", "meshach", "abednego", "nebuchadnezzar"], "daniel-2": ["daniel", "shadrach", "meshach", "abednego", "nebuchadnezzar"], "daniel-3": ["daniel", "shadrach", "meshach", "abednego", "nebuchadnezzar"], "daniel-4": ["daniel", "nebuchadnezzar"], "daniel-5": ["daniel"], "daniel-6": ["daniel"], "daniel-7": ["daniel"], "daniel-8": ["daniel"], "daniel-9": ["daniel"], "daniel-10": ["daniel"], "daniel-11": ["daniel"], "daniel-12": ["daniel"]};

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
    const art = `<span class="portrait-art" style="--portrait-hue:${hue}"><span class="portrait-initial" role="img" aria-label="${name}: ${image.src ? 'portrait failed to load' : 'no portrait available'}" aria-hidden="${!!image.src}">${name[0]}</span>${image.src ? `<img src="${escapeHtml(image.src)}" width="88" height="88" alt="${imageKind} of ${name}">` : ""}</span>`;
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
