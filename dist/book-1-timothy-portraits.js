const bookArt = {"paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "timothy": {"src": "assets/portraits/romans/timothy.png", "generated": true, "title": "Timothy · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "adam": {"title": "File:Michelangelo, Creation of Adam 06.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/13/Michelangelo%2C_Creation_of_Adam_06.jpg/500px-Michelangelo%2C_Creation_of_Adam_06.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Michelangelo,_Creation_of_Adam_06.jpg", "credit": "Michelangelo", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "", "src": "assets/portraits/genesis/adam.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "eve": {"title": "File:Adam and Eve by Lucas Cranach (I).jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4c/Adam_and_Eve_by_Lucas_Cranach_%28I%29.jpg/500px-Adam_and_Eve_by_Lucas_Cranach_%28I%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Adam_and_Eve_by_Lucas_Cranach_(I).jpg", "credit": "Lucas Cranach the Elder", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "In the foreground: Prohibition of God to Adam and Eve, in the middle ground: Creation of Adam, the Fall, Discovery of the Fall, the Expulsion from Paradise", "src": "assets/portraits/genesis/eve.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}};
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
export const people = {"paul": {"name": "Paul", "role": "Writer who left Timothy at Ephesus to correct teachers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 1–6"], "importance": "Paul says he urged Timothy to stay at Ephesus. He calls himself a past blasphemer and persecutor who received mercy. He gives rules for prayer, overseers, widows, and the rich. He hopes to come to Timothy soon.", "connections": "He calls Timothy his true child in faith. He names Hymenaeus and Alexander as men he handed over.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1, 2, 3, 4, 5, 6], "word": {"language": "greek", "strongId": "G3972", "key": "Paul", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Παῦλος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Paûlos"}}, "timothy": {"name": "Timothy", "role": "Paul’s true child, told to stay at Ephesus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 1–6"], "importance": "Paul tells Timothy to stay at Ephesus. He is to stop certain men from teaching a different doctrine. Paul tells him not to let anyone despise his youth. He is to read, exhort, and teach. He is to guard what was entrusted to him.", "connections": "Paul calls him his true child in faith and his child Timothy.", "verseScope": {}, "linkNames": ["Timothy"], "chapterIds": [1, 2, 3, 4, 5, 6], "word": {"language": "greek", "strongId": "G5095", "key": "Timothy", "checkedVerses": 3, "example": [1, 2], "hebrew": "", "transliteration": "", "greek": "Τιμόθεος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Timótheos"}}, "jesus": {"name": "Jesus Christ", "role": "Lord and one mediator between God and men", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 1–6"], "importance": "Paul says Christ Jesus came to save sinners, and Paul is chief of them. Paul says Jesus gave himself as a ransom for all. Paul charges Timothy to keep the commandment until Jesus appears.", "connections": "Paul calls him our hope and the man Christ Jesus. He says Jesus testified before Pontius Pilate.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4, 5, 6], "word": {"language": "greek", "strongId": "G5547", "key": "Christ", "checkedVerses": 15, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Χριστός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Christós", "languageNote": "This is the dictionary form of the name “Christ.”"}}, "adam": {"name": "Adam", "role": "First man formed, named in a reason for teaching rules", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 2:13–14"], "importance": "In chapter 2 Paul says he does not permit a woman to teach. He adds that she may not have authority over a man. As his reason, Paul says Adam was formed first. Paul also says Adam was not deceived. Paul does not name a local dispute.", "connections": "Paul names him just before Eve. He says Adam was formed first.", "verseScope": {}, "linkNames": ["Adam"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G76", "key": "Adam", "checkedVerses": 2, "example": [2, 13], "hebrew": "", "transliteration": "", "greek": "Ἀδάμ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Adám"}}, "eve": {"name": "Eve", "role": "First woman, named in a reason for teaching rules", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 2:13–14"], "importance": "In chapter 2 Paul gives a reason for his rule about women teaching. He says Adam was formed first, then Eve. He says the woman was deceived and fell into disobedience. Paul does not name a local incident.", "connections": "Paul names her just after Adam. He says she was formed after him and was deceived.", "verseScope": {}, "linkNames": ["Eve"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G2096", "key": "Eve", "checkedVerses": 1, "example": [2, 13], "hebrew": "", "transliteration": "", "greek": "Εὖα", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Eûa"}}};

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

const featurePeople = {"1-timothy-1": ["paul", "timothy", "jesus"], "1-timothy-2": ["paul", "timothy", "jesus", "adam", "eve"], "1-timothy-3": ["paul", "timothy", "jesus"], "1-timothy-4": ["paul", "timothy", "jesus"], "1-timothy-5": ["paul", "timothy", "jesus"], "1-timothy-6": ["paul", "timothy", "jesus"]};

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
