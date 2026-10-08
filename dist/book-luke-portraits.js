const bookArt = {"jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-mother": {"src": "assets/portraits/matthew/mary-mother.png", "generated": true, "title": "Mary, mother of Jesus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "joseph-mary": {"src": "assets/portraits/matthew/joseph-mary.png", "generated": true, "title": "Joseph, Mary’s husband · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "john-baptizer": {"src": "assets/portraits/matthew/john-baptizer.png", "generated": true, "title": "John the Baptizer · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-magdalene": {"src": "assets/portraits/matthew/mary-magdalene.png", "generated": true, "title": "Mary Magdalene · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}};
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
export const people = {"jesus": {"name": "Jesus of Nazareth", "role": "Teacher presented as the Savior and Christ", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Luke 1–24"], "importance": "His welcome, teaching, suffering, and resurrection connect mercy with changed conduct.", "connections": "Mary is his mother. Joseph appears in the childhood accounts and the family list.", "verseScope": {}, "linkNames": ["Jesus"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]}, "mary-mother": {"name": "Mary, mother of Jesus", "role": "Mother who receives Gabriel’s message and keeps difficult sayings", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Luke 1–2; 8:19–21"], "importance": "Her song connects personal blessing with hungry people filled and powerful people brought down.", "connections": "Elizabeth is her relative. Joseph travels with her in the childhood account.", "verseScope": {"1": [27, 30, 34, 38, 39, 41, 46, 56], "2": [5, 16, 19, 34], "8": []}, "linkNames": ["Mary"], "chapterIds": [1, 2, 8]}, "joseph-mary": {"name": "Joseph, Mary’s husband", "role": "Mary’s husband in the childhood account", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Luke 1:27; 2; 3:23; 4:22"], "importance": "His travel places the childhood account between Nazareth, Bethlehem, and Jerusalem.", "connections": "Luke describes his Davidic descent and names Heli in Jesus’ family list.", "verseScope": {"1": [27], "2": [4, 16, 33, 43], "3": [23], "4": [22]}, "linkNames": ["Joseph"], "chapterIds": [1, 2, 3, 4]}, "john-baptizer": {"name": "John the Baptizer", "role": "Son of Elizabeth and Zacharias who prepares people for Jesus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Luke 1; 3; 5:33; 7:18–35; 9:7–19; 11:1; 16:16; 20:4–6"], "importance": "His instructions demand shared resources and an end to extortion rather than ancestry alone.", "connections": "Gabriel announces his birth. Herod later imprisons him.", "verseScope": {"1": [13, 60, 63], "3": [2, 15, 16, 20], "5": [33], "7": [18, 19, 20, 22, 24, 28, 29, 33], "9": [7, 9, 19], "11": [1], "16": [16], "20": [4, 6]}, "linkNames": ["John the Baptizer", "John"], "chapterIds": [1, 3, 5, 7, 9, 11, 16, 20]}, "peter": {"name": "Simon Peter", "role": "Fisherman who follows Jesus and later denies him", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Luke 4–6; 8–9; 12:41; 18:28; 22; 24:12"], "importance": "His failures remain beside Jesus’ prayer and the task to strengthen others after returning.", "connections": "Andrew is his brother. Luke also mentions his wife’s mother.", "verseScope": {"4": [], "5": [8], "6": [14], "8": [45, 51], "9": [20, 28, 32, 33], "12": [41], "18": [28], "22": [8, 34, 54, 55, 58, 60, 61], "24": [12]}, "linkNames": ["Peter", "Simon Peter"], "chapterIds": [4, 5, 6, 8, 9, 12, 18, 22, 24]}, "mary-magdalene": {"name": "Mary Magdalene", "role": "Supporter and witness who carries the tomb report", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Luke 8:2; 24:10"], "importance": "Her named support and testimony connect the traveling group with the resurrection report.", "connections": "Luke distinguishes her from Mary, Martha’s sister, and Mary the mother of James.", "verseScope": {"8": [2], "24": [10]}, "linkNames": ["Mary Magdalene", "Mary"], "chapterIds": [8, 24]}};

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

const featurePeople = {"luke-1": ["jesus", "mary-mother", "joseph-mary", "john-baptizer"], "luke-2": ["jesus", "mary-mother", "joseph-mary"], "luke-3": ["jesus", "joseph-mary", "john-baptizer"], "luke-4": ["jesus", "joseph-mary", "peter"], "luke-5": ["jesus", "john-baptizer", "peter"], "luke-6": ["jesus", "peter"], "luke-7": ["jesus", "john-baptizer"], "luke-8": ["jesus", "mary-mother", "peter", "mary-magdalene"], "luke-9": ["jesus", "john-baptizer", "peter"], "luke-10": ["jesus"], "luke-11": ["jesus", "john-baptizer"], "luke-12": ["jesus", "peter"], "luke-13": ["jesus"], "luke-14": ["jesus"], "luke-15": ["jesus"], "luke-16": ["jesus", "john-baptizer"], "luke-17": ["jesus"], "luke-18": ["jesus", "peter"], "luke-19": ["jesus"], "luke-20": ["jesus", "john-baptizer"], "luke-21": ["jesus"], "luke-22": ["jesus", "peter"], "luke-23": ["jesus"], "luke-24": ["jesus", "peter", "mary-magdalene"]};

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
