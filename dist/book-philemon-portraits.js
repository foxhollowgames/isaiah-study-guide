const bookArt = {"paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "timothy": {"src": "assets/portraits/romans/timothy.png", "generated": true, "title": "Timothy · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "philemon": {"src": "assets/portraits/philemon/philemon.png", "generated": true, "title": "Philemon · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "onesimus": {"src": "assets/portraits/colossians/onesimus.png", "generated": true, "title": "Onesimus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "epaphras": {"src": "assets/portraits/colossians/epaphras.png", "generated": true, "title": "Epaphras · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}};
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
export const people = {"paul": {"name": "Paul", "role": "Prisoner who writes to Philemon about Onesimus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Philemon 1"], "importance": "Paul writes from chains and calls himself aged. He chooses to appeal and not to command. He asks Philemon to receive Onesimus as he would receive Paul. He offers to repay anything Onesimus owes, and he signs this with his own hand.", "connections": "He names Timothy beside himself and asks Philemon to receive Onesimus as a partner.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G3972", "key": "Paul", "checkedVerses": 3, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Παῦλος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Paûlos"}}, "timothy": {"name": "Timothy", "role": "Brother named with Paul in the greeting", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Philemon 1"], "importance": "Paul names Timothy as a brother in the first line. Timothy sends the greeting with Paul. The letter says nothing else about him.", "connections": "Paul calls him a brother before addressing the household assembly.", "verseScope": {}, "linkNames": ["Timothy"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G5095", "key": "Timothy", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Τιμόθεος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Timótheos"}}, "jesus": {"name": "Jesus Christ", "role": "Lord named in the greetings, the thanks, and the blessing", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Philemon 1"], "importance": "Paul gives thanks for Philemon’s faith toward the Lord Jesus. He asks that Onesimus be a beloved brother in the Lord. The letter ends with the grace of the Lord Jesus Christ.", "connections": "Paul calls himself a prisoner of Christ Jesus. He ends with grace from the Lord Jesus Christ.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G2424", "key": "Jesus", "checkedVerses": 7, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Ἰησοῦς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iēsoûs", "languageNote": "This is the dictionary form of the name “Jesus.”"}}, "philemon": {"name": "Philemon", "role": "Beloved fellow worker asked to receive Onesimus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Philemon 1:1–22"], "importance": "Paul thanks Philemon for his love and for refreshing the saints. Then Paul asks him to receive Onesimus as a beloved brother. Paul wants Philemon to act by free will. Paul also asks him to prepare a guest room.", "connections": "Paul praises his love and asks him to receive Onesimus as Paul himself.", "verseScope": {}, "linkNames": ["Philemon"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G5371", "key": "Philemon", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Φιλήμων", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Philḗmōn"}}, "onesimus": {"name": "Onesimus", "role": "Paul’s child, sent back to Philemon", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Philemon 1:10–21"], "importance": "Paul became his father in chains. Paul calls him once useless and now useful. Paul sends him back to Philemon and asks Philemon to receive him as a brother. The letter does not say how Philemon answered.", "connections": "Paul calls him his child and own heart, and offers to carry any debt.", "verseScope": {}, "linkNames": ["Onesimus"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G3682", "key": "Onesimus", "checkedVerses": 1, "example": [1, 10], "hebrew": "", "transliteration": "", "greek": "Ὀνήσιμος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Onḗsimos"}}, "epaphras": {"name": "Epaphras", "role": "Fellow prisoner who sends greetings", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Philemon 1:23"], "importance": "Paul calls Epaphras his fellow prisoner in Christ Jesus. Epaphras sends greetings to Philemon. The letter says nothing else about him.", "connections": "Paul names him before Mark, Aristarchus, Demas, and Luke.", "verseScope": {}, "linkNames": ["Epaphras"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G1889", "key": "Epaphras", "checkedVerses": 1, "example": [1, 23], "hebrew": "", "transliteration": "", "greek": "Ἐπαφρᾶς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Epaphrâs"}}};

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

const featurePeople = {"philemon-1": ["paul", "timothy", "jesus", "philemon", "onesimus", "epaphras"]};

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
