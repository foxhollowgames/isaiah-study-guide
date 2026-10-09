const bookArt = {"paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "barnabas": {"src": "assets/portraits/acts/barnabas.png", "generated": true, "title": "Barnabas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "priscilla": {"src": "assets/portraits/acts/priscilla.png", "generated": true, "title": "Priscilla · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "aquila": {"src": "assets/portraits/acts/aquila.png", "generated": true, "title": "Aquila · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "timothy": {"src": "assets/portraits/romans/timothy.png", "generated": true, "title": "Timothy · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "moses": {"title": "File:Rembrandt - Moses Smashing the Tablets of the Law - WGA19132.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg/500px-Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "", "src": "assets/portraits/exodus/moses.jpg", "note": "Historical art illustrates the person or story. It does not establish actual appearance."}, "apollos": {"src": "assets/portraits/1-corinthians/apollos.png", "generated": true, "title": "Apollos · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "chloe": {"src": "assets/portraits/1-corinthians/chloe.png", "generated": true, "title": "Chloe · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}};
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
export const people = {"paul": {"name": "Paul", "role": "Letter speaker who challenges division and explains his own restraint", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 1–16"], "importance": "His refusal of material rights supplies an example for the use of freedom.", "connections": "Timothy represents his teaching. Apollos follows a different visiting plan.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "word": {"language": "greek", "strongId": "G3972", "key": "Paul", "checkedVerses": 7, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Παῦλος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Paûlos"}}, "jesus": {"name": "Jesus Christ", "role": "The crucified and risen Lord at the center of Paul’s argument", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 1–16"], "importance": "His death and rising challenge the group’s measures of strength, ownership, and lasting hope.", "connections": "Paul connects the shared meal and the believers’ future with him.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "word": {"language": "greek", "strongId": "G5547", "key": "Christ", "checkedVerses": 59, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Χριστός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Christós", "languageNote": "This is the dictionary form of the name “Christ.”"}}, "peter": {"name": "Cephas, also called Peter", "role": "Apostle named in the dispute over teachers and among resurrection witnesses", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 1; 3; 9; 15"], "importance": "His name appears in competing party claims that Paul refuses to accept.", "connections": "Paul mentions his travel with a believing wife.", "verseScope": {}, "linkNames": ["Cephas"], "chapterIds": [1, 3, 9, 15], "word": {"language": "greek", "strongId": "G2786", "key": "Cephas", "checkedVerses": 4, "example": [1, 12], "hebrew": "", "transliteration": "", "greek": "Κηφᾶς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Kēphâs"}}, "barnabas": {"name": "Barnabas", "role": "Worker named with Paul in the question about material support", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 9:6"], "importance": "His example makes the argument about support concern another worker as well as Paul.", "connections": "Paul asks whether only they must continue working for their own needs.", "verseScope": {}, "linkNames": ["Barnabas"], "chapterIds": [9], "word": {"language": "greek", "strongId": "G921", "key": "Barnabas", "checkedVerses": 1, "example": [9, 6], "hebrew": "", "transliteration": "", "greek": "Βαρνάβας", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Barnábas"}}, "timothy": {"name": "Timothy", "role": "Trusted worker whom Paul sends to remind the group of his teaching", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 4:17; 16:10–11"], "importance": "His welcome tests whether the group honors service rather than personal rank.", "connections": "Paul asks the believers to receive him without fear or contempt.", "verseScope": {}, "linkNames": ["Timothy"], "chapterIds": [4, 16], "word": {"language": "greek", "strongId": "G5095", "key": "Timothy", "checkedVerses": 2, "example": [4, 17], "hebrew": "", "transliteration": "", "greek": "Τιμόθεος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Timótheos"}}, "priscilla": {"name": "Priscilla", "role": "Worker who sends greetings from a shared household", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 16:19"], "importance": "Her household greeting connects Corinth with another gathering of believers.", "connections": "Aquila greets the believers with her. A church meets in their house.", "verseScope": {}, "linkNames": ["Priscilla"], "chapterIds": [16], "word": {"language": "greek", "strongId": "G4252", "key": "Priscilla", "checkedVerses": 1, "example": [16, 19], "hebrew": "", "transliteration": "", "greek": "Πρίσκιλλα", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Prískilla"}}, "aquila": {"name": "Aquila", "role": "Worker whose household gathering sends a greeting", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 16:19"], "importance": "His greeting makes the letter’s wider relationships visible at its close.", "connections": "He and Priscilla greet the believers warmly in the Lord.", "verseScope": {}, "linkNames": ["Aquila"], "chapterIds": [16], "word": {"language": "greek", "strongId": "G207", "key": "Aquila", "checkedVerses": 1, "example": [16, 19], "hebrew": "", "transliteration": "", "greek": "Ἀκύλας", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Akýlas"}}, "moses": {"name": "Moses", "role": "Remembered leader named in Paul’s law and wilderness examples", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 9:9; 10:2"], "importance": "His recalled people show that shared gifts do not remove responsibility for later conduct.", "connections": "Paul recalls the people’s shared passage through the sea and cloud.", "verseScope": {}, "linkNames": ["Moses"], "chapterIds": [9, 10], "word": {"language": "greek", "strongId": "G3475", "key": "Moses", "checkedVerses": 2, "example": [9, 9], "hebrew": "", "transliteration": "", "greek": "Μωσεύς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Mōseús"}}, "apollos": {"name": "Apollos", "role": "Teacher whom some believers use as a competing party name", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 1; 3; 4; 16"], "importance": "His different visiting plan shows that shared service does not require identical decisions.", "connections": "Paul describes his watering work and later urges him to visit.", "verseScope": {}, "linkNames": ["Apollos"], "chapterIds": [1, 3, 4, 16], "word": {"language": "greek", "strongId": "G625", "key": "Apollos", "checkedVerses": 7, "example": [1, 12], "hebrew": "", "transliteration": "", "greek": "Ἀπολλῶς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Apollōs"}}, "chloe": {"name": "Chloe", "role": "Named person whose household supplies the report of divisions", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["1 Corinthians 1:11"], "importance": "Her named connection gives the complaint a stated source rather than an unnamed rumor.", "connections": "Paul identifies her household when explaining what he has heard.", "verseScope": {}, "linkNames": ["Chloe"], "chapterIds": [1], "word": {"language": "greek", "strongId": "G5514", "key": "Chloe", "checkedVerses": 1, "example": [1, 11], "hebrew": "", "transliteration": "", "greek": "Χλόη", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Chlóē"}}};

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

const featurePeople = {"1-corinthians-1": ["paul", "jesus", "peter", "apollos", "chloe"], "1-corinthians-2": ["paul", "jesus"], "1-corinthians-3": ["paul", "jesus", "peter", "apollos"], "1-corinthians-4": ["paul", "jesus", "timothy", "apollos"], "1-corinthians-5": ["paul", "jesus"], "1-corinthians-6": ["paul", "jesus"], "1-corinthians-7": ["paul", "jesus"], "1-corinthians-8": ["paul", "jesus"], "1-corinthians-9": ["paul", "jesus", "peter", "barnabas", "moses"], "1-corinthians-10": ["paul", "jesus", "moses"], "1-corinthians-11": ["paul", "jesus"], "1-corinthians-12": ["paul", "jesus"], "1-corinthians-13": ["paul", "jesus"], "1-corinthians-14": ["paul", "jesus"], "1-corinthians-15": ["paul", "jesus", "peter"], "1-corinthians-16": ["paul", "jesus", "timothy", "priscilla", "aquila", "apollos"]};

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
