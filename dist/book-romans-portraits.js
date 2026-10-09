const bookArt = {"paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "priscilla": {"src": "assets/portraits/acts/priscilla.png", "generated": true, "title": "Priscilla · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "aquila": {"src": "assets/portraits/acts/aquila.png", "generated": true, "title": "Aquila · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "abraham": {"title": "File:Rembrandt Abraham Serving the Three Angels.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Rembrandt_Abraham_Serving_the_Three_Angels.jpg/500px-Rembrandt_Abraham_Serving_the_Three_Angels.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_Abraham_Serving_the_Three_Angels.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Abraham and the Three Angels", "src": "assets/portraits/genesis/abraham.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "sarah": {"title": "File:BOWYER BIBLE GENESIS 150. Abimelech restores Sarah. Genesis cap 20 v 16. Sperling.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/BOWYER_BIBLE_GENESIS_150._Abimelech_restores_Sarah._Genesis_cap_20_v_16._Sperling.jpg/500px-BOWYER_BIBLE_GENESIS_150._Abimelech_restores_Sarah._Genesis_cap_20_v_16._Sperling.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:BOWYER_BIBLE_GENESIS_150._Abimelech_restores_Sarah._Genesis_cap_20_v_16._Sperling.jpg", "credit": "Phidev74", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "description": "BOWYER BIBLE PRINTS ILLUSTRATING THE BOOK OF GENESIS IN THE BIBLE. Robert Bowyer (1758-1834) spent a fortune on his own copy of the Macklin Bible which he expanded to 45 volumes after acquiring and inserting over 6200 different prints of Biblical events. He had a custom designed bookcase built just to house his collection; The Bowyer Bible is now housed in Bolton Museums and Archives. The expansion of the Macklin Bible through careful \"grangerisation\" indicates a practice of enhancing existing texts with additional illustrative material popular among collectors and scholars in the 18th century. Given that Bowyer wished to promulgate the Word of God through these images, the project represented a great act of faith on his part in view of the absence of any method in his time that would allow this to be done. Had it not been for the internet, the set of volumes locked in their case would have remained a curiosity attracting only the passing attention of antiquarians. Phillip Medhurst's current project of opening them up and getting them into social media is a scattering of the seed of God's word which Bowyer would have rejoiced to see. For a complete presentation of these prints see  https://archive.org/details/bowyer-bible", "src": "assets/portraits/genesis/sarah.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "david": {"src": "assets/portraits/ruth/david.png", "generated": true, "title": "David · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence."}, "phoebe": {"src": "assets/portraits/romans/phoebe.png", "generated": true, "title": "Phoebe · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "tertius": {"src": "assets/portraits/romans/tertius.png", "generated": true, "title": "Tertius · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "timothy": {"src": "assets/portraits/romans/timothy.png", "generated": true, "title": "Timothy · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}};
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
export const people = {"paul": {"name": "Paul", "role": "Letter speaker who hopes to visit the Roman believers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 1–16"], "importance": "He seeks encouragement from the believers as well as sharing his teaching.", "connections": "His companions send greetings. Tertius names his own writing role.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "word": {"language": "greek", "strongId": "G3972", "key": "Paul", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Παῦλος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Paûlos"}}, "jesus": {"name": "Jesus Christ", "role": "The one through whom Paul describes God’s gift and welcome", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 1–16"], "importance": "His welcome supplies the pattern for receiving others across disputed practices.", "connections": "Paul connects his death and resurrection with the believers’ changed life.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "word": {"language": "greek", "strongId": "G5547", "key": "Christ", "checkedVerses": 68, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Χριστός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Christós", "languageNote": "This is the dictionary form of the name “Christ.”"}}, "abraham": {"name": "Abraham", "role": "Ancestor whose trust comes before circumcision", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 4; 9; 11"], "importance": "The order of promise and sign connects him with believers from different peoples.", "connections": "Sarah shares the promised birth despite their old age.", "verseScope": {}, "linkNames": ["Abraham"], "chapterIds": [4, 9, 11], "word": {"language": "greek", "strongId": "G11", "key": "Abraham", "checkedVerses": 9, "example": [4, 1], "hebrew": "", "transliteration": "", "greek": "Ἀβραάμ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Abraám"}}, "sarah": {"name": "Sarah", "role": "Abraham’s wife whose condition makes the promised birth seem impossible", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 4:19; 9:9"], "importance": "Her remembered condition makes the promise depend on God’s power rather than visible strength.", "connections": "Paul connects her body with Abraham’s old age and God’s promise.", "verseScope": {}, "linkNames": ["Sarah"], "chapterIds": [4, 9], "word": {"language": "greek", "strongId": "G4564", "key": "Sarah", "checkedVerses": 2, "example": [4, 19], "hebrew": "", "transliteration": "", "greek": "Σάῤῥα", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Sárrha"}}, "david": {"name": "David", "role": "Remembered king whose words Paul cites in his argument", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 1:3; 4:6–8; 11:9–10"], "importance": "His cited words join earlier Scripture with the letter’s questions about mercy and failure.", "connections": "Paul names Jesus as David’s descendant and cites David’s words about forgiveness.", "verseScope": {}, "linkNames": ["David"], "chapterIds": [1, 4, 11], "word": {"language": "greek", "strongId": "G1138", "key": "David", "checkedVerses": 3, "example": [1, 3], "hebrew": "", "transliteration": "", "greek": "Δαβίδ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Dabíd"}}, "priscilla": {"name": "Prisca, also called Priscilla", "role": "Worker whom Paul greets with Aquila", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 16:3–5"], "importance": "Their household and risk show the personal help behind Paul’s wider teaching task.", "connections": "Paul says they risked their lives for him. A church meets in their house.", "verseScope": {}, "linkNames": ["Prisca"], "chapterIds": [16], "word": {"language": "greek", "strongId": "G4251", "key": "Prisca", "checkedVerses": 1, "example": [16, 3], "hebrew": "", "transliteration": "", "greek": "Πρίσκα", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Príska"}}, "aquila": {"name": "Aquila", "role": "Worker whom Paul greets with Prisca", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 16:3–5"], "importance": "His shared work connects a household with the needs of a wider group of believers.", "connections": "A church meets in their house. Paul and Gentile churches thank them.", "verseScope": {}, "linkNames": ["Aquila"], "chapterIds": [16], "word": {"language": "greek", "strongId": "G207", "key": "Aquila", "checkedVerses": 1, "example": [16, 3], "hebrew": "", "transliteration": "", "greek": "Ἀκύλας", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Akýlas"}}, "phoebe": {"name": "Phoebe", "role": "Servant or deacon of the church in Cenchreae", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 16:1–2"], "importance": "Her previous help to many people supports Paul’s request for practical welcome.", "connections": "Paul asks the Roman believers to welcome her and help with her needs.", "verseScope": {}, "linkNames": ["Phoebe"], "chapterIds": [16]}, "tertius": {"name": "Tertius", "role": "Writer who adds his own greeting within Paul’s letter", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 16:22"], "importance": "His named writing role makes another person’s contribution visible within the letter.", "connections": "He greets the Roman believers alongside Paul’s other companions.", "verseScope": {}, "linkNames": ["Tertius"], "chapterIds": [16], "word": {"language": "greek", "strongId": "G5060", "key": "Tertius", "checkedVerses": 1, "example": [16, 22], "hebrew": "", "transliteration": "", "greek": "Τέρτιος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Tértios"}}, "timothy": {"name": "Timothy", "role": "Worker who sends greetings with Paul’s companions", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Romans 16:21"], "importance": "His greeting connects the letter’s readers with workers beyond Paul alone.", "connections": "Lucius, Jason, and Sosipater also send greetings in the same verse.", "verseScope": {}, "linkNames": ["Timothy"], "chapterIds": [16], "word": {"language": "greek", "strongId": "G5095", "key": "Timothy", "checkedVerses": 1, "example": [16, 21], "hebrew": "", "transliteration": "", "greek": "Τιμόθεος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Timótheos"}}};

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

const featurePeople = {"romans-1": ["paul", "jesus", "david"], "romans-2": ["jesus"], "romans-3": ["jesus"], "romans-4": ["jesus", "abraham", "sarah", "david"], "romans-5": ["jesus"], "romans-6": ["jesus"], "romans-7": ["jesus"], "romans-8": ["jesus"], "romans-9": ["jesus", "abraham", "sarah"], "romans-10": ["jesus"], "romans-11": ["jesus", "abraham", "david"], "romans-12": ["jesus"], "romans-13": ["jesus"], "romans-14": ["jesus"], "romans-15": ["paul", "jesus"], "romans-16": ["paul", "jesus", "priscilla", "aquila", "phoebe", "tertius", "timothy"]};

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
