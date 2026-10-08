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

// Image errors do not bubble. Capture them for portraits added to any panel.
document.addEventListener('error', event => {
  if (event.target.matches?.('.portrait-art img')) {
    const art = event.target.parentElement;
    event.target.remove();
    art.querySelector('.portrait-initial').removeAttribute('aria-hidden');
  }
}, true);
export const people = {"jesus": {"name": "Jesus of Nazareth", "role": "Teacher presented as the Christ and Son of God", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 1–16"], "importance": "His works and suffering test how followers understand his identity.", "connections": "Mary is his mother. Mark also names brothers and mentions sisters.", "verseScope": {}, "linkNames": ["Jesus"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}, "mary-mother": {"name": "Mary, mother of Jesus", "role": "Mother named in the hometown discussion", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 3:31–35; 6:3"], "importance": "The family scenes place familiar relationships beside doing God’s will.", "connections": "Mark names her in the question about Jesus and his family.", "verseScope": {"6": [3]}, "linkNames": ["Mary"], "chapterIds": [3, 6]}, "john-baptizer": {"name": "John the Baptizer", "role": "Preacher who baptizes Jesus and dies under Herod’s order", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 1; 2:18; 6:14–29; 8:28; 11:30–32"], "importance": "His death places rulers’ promises beside the cost borne by another person.", "connections": "His disciples bury his body after the ruler’s feast.", "verseScope": {"1": [4, 6, 9, 14], "2": [18], "6": [14, 16, 17, 18, 20, 24, 25, 27, 29], "8": [28], "11": [30, 32]}, "linkNames": ["John the Baptizer"], "chapterIds": [1, 2, 6, 8, 11]}, "peter": {"name": "Simon Peter", "role": "Fisherman who follows Jesus and later denies knowing him", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 1; 3; 5; 8–11; 13–14; 16:7"], "importance": "His confession, resistance, and denial remain beside the message that explicitly includes him.", "connections": "Andrew is his brother. Mark also mentions his wife’s mother.", "verseScope": {"1": [], "3": [16], "5": [37], "8": [29, 32, 33], "9": [2, 5], "10": [28], "11": [21], "13": [3], "14": [29, 33, 37, 54, 66, 67, 70, 72], "16": [7]}, "linkNames": ["Peter", "Simon Peter"], "chapterIds": [1, 3, 5, 8, 9, 10, 11, 13, 14, 16]}, "mary-magdalene": {"name": "Mary Magdalene", "role": "Witness of the cross, burial, and opened tomb", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Mark 15:40–47; 16:1–11"], "importance": "Her witness connects the burial setting with the message of resurrection.", "connections": "Mark distinguishes her from Mary the mother of James and Joses.", "verseScope": {"15": [40, 47], "16": [1, 9]}, "linkNames": ["Mary Magdalene"], "chapterIds": [15, 16]}};

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
