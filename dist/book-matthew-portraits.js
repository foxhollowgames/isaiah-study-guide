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
export const people = {"jesus": {"name": "Jesus of Nazareth", "role": "Teacher presented as the Christ and Son of God", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Matthew 1–28"], "importance": "His teaching, healing, death, and resurrection shape the meaning of following him.", "connections": "Mary is his mother. Joseph names him after receiving an angel’s instruction.", "verseScope": {}, "linkNames": ["Jesus"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]}, "mary-mother": {"name": "Mary, mother of Jesus", "role": "Mother named in the birth and hometown accounts", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Matthew 1–2; 12:46; 13:55"], "importance": "The birth account names her as the person from whom Jesus is born.", "connections": "Joseph is her husband. Matthew names several brothers and also mentions sisters of Jesus.", "verseScope": {"1": [16, 18, 20], "2": [11], "12": [46, 47, 48, 49], "13": [55]}, "linkNames": ["Mary"], "chapterIds": [1, 2, 12, 13]}, "joseph-mary": {"name": "Joseph, Mary’s husband", "role": "Man who names Jesus and protects the child", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Matthew 1–2"], "importance": "His decisions connect the birth account with protection from Herod’s violent plan.", "connections": "Matthew names Jacob as his father. He acts on warnings given in dreams.", "verseScope": {"1": [16, 18, 19, 20, 24], "2": [13, 14, 19, 21]}, "linkNames": ["Joseph"], "chapterIds": [1, 2]}, "john-baptizer": {"name": "John the Baptizer", "role": "Preacher who baptizes Jesus and later dies in prison", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Matthew 3; 4:12; 9:14; 11; 14"], "importance": "His call for changed conduct prepares the kingdom message. His death exposes the ruler’s use of power.", "connections": "His disciples bring questions to Jesus. Herod imprisons him after he challenges the ruler’s marriage.", "verseScope": {"3": [1, 4, 13, 14], "4": [12], "9": [14], "11": [2, 4, 7, 11, 12, 13, 18], "14": [2, 3, 4, 8, 10], "17": [1, 13], "21": [25, 26, 32], "10": []}, "linkNames": ["John the Baptizer"], "chapterIds": [3, 4, 9, 11, 14, 17, 21]}, "peter": {"name": "Simon Peter", "role": "Fisherman who follows Jesus and speaks for the disciples", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Matthew 4:18–20; 8:14; 14:28–31; 16; 17; 18:21; 26"], "importance": "His confession, protest, fear, and denial show understanding that remains incomplete under pressure.", "connections": "Andrew is his brother. Matthew also mentions his wife’s mother.", "verseScope": {"4": [18], "8": [14], "10": [2], "14": [28, 29], "15": [15], "16": [16, 18, 22, 23], "17": [1, 4, 24, 26], "18": [21], "19": [27], "26": [33, 35, 37, 40, 58, 69, 73, 75]}, "linkNames": ["Peter", "Simon Peter"], "chapterIds": [4, 8, 10, 14, 15, 16, 17, 18, 19, 26]}, "mary-magdalene": {"name": "Mary Magdalene", "role": "Witness at the cross, burial, and opened tomb", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Matthew 27:56–61; 28:1–10"], "importance": "She remains near the burial and helps carry the resurrection message to the disciples.", "connections": "Matthew distinguishes her from Jesus’ mother and from the other Mary.", "verseScope": {"27": [56, 61], "28": [1]}, "linkNames": ["Mary Magdalene"], "chapterIds": [27, 28]}};

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

const featurePeople = {"matthew-1": ["jesus", "mary-mother", "joseph-mary"], "matthew-2": ["jesus", "mary-mother", "joseph-mary"], "matthew-3": ["jesus", "john-baptizer"], "matthew-4": ["jesus", "john-baptizer", "peter"], "matthew-5": ["jesus"], "matthew-6": ["jesus"], "matthew-7": ["jesus"], "matthew-8": ["jesus", "peter"], "matthew-9": ["jesus", "john-baptizer"], "matthew-10": ["jesus", "peter"], "matthew-11": ["jesus", "john-baptizer"], "matthew-12": ["jesus", "mary-mother"], "matthew-13": ["jesus", "mary-mother"], "matthew-14": ["jesus", "john-baptizer", "peter"], "matthew-15": ["jesus", "peter"], "matthew-16": ["jesus", "peter"], "matthew-17": ["jesus", "john-baptizer", "peter"], "matthew-18": ["jesus", "peter"], "matthew-19": ["jesus", "peter"], "matthew-20": ["jesus"], "matthew-21": ["jesus", "john-baptizer"], "matthew-22": ["jesus"], "matthew-23": ["jesus"], "matthew-24": ["jesus"], "matthew-25": ["jesus"], "matthew-26": ["jesus", "peter"], "matthew-27": ["jesus", "mary-magdalene"], "matthew-28": ["jesus", "mary-magdalene"]};

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
