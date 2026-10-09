const bookArt = {"peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "sarah": {"title": "File:BOWYER BIBLE GENESIS 150. Abimelech restores Sarah. Genesis cap 20 v 16. Sperling.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/BOWYER_BIBLE_GENESIS_150._Abimelech_restores_Sarah._Genesis_cap_20_v_16._Sperling.jpg/500px-BOWYER_BIBLE_GENESIS_150._Abimelech_restores_Sarah._Genesis_cap_20_v_16._Sperling.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:BOWYER_BIBLE_GENESIS_150._Abimelech_restores_Sarah._Genesis_cap_20_v_16._Sperling.jpg", "credit": "Phidev74", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "description": "BOWYER BIBLE PRINTS ILLUSTRATING THE BOOK OF GENESIS IN THE BIBLE. Robert Bowyer (1758-1834) spent a fortune on his own copy of the Macklin Bible which he expanded to 45 volumes after acquiring and inserting over 6200 different prints of Biblical events. He had a custom designed bookcase built just to house his collection; The Bowyer Bible is now housed in Bolton Museums and Archives. The expansion of the Macklin Bible through careful \"grangerisation\" indicates a practice of enhancing existing texts with additional illustrative material popular among collectors and scholars in the 18th century. Given that Bowyer wished to promulgate the Word of God through these images, the project represented a great act of faith on his part in view of the absence of any method in his time that would allow this to be done. Had it not been for the internet, the set of volumes locked in their case would have remained a curiosity attracting only the passing attention of antiquarians. Phillip Medhurst's current project of opening them up and getting them into social media is a scattering of the seed of God's word which Bowyer would have rejoiced to see. For a complete presentation of these prints see  https://archive.org/details/bowyer-bible", "src": "assets/portraits/genesis/sarah.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "abraham": {"title": "File:Rembrandt Abraham Serving the Three Angels.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Rembrandt_Abraham_Serving_the_Three_Angels.jpg/500px-Rembrandt_Abraham_Serving_the_Three_Angels.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_Abraham_Serving_the_Three_Angels.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Abraham and the Three Angels", "src": "assets/portraits/genesis/abraham.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "noah": {"title": "File:'Noah's Offering', oil on canvas painting attributed to Francesco Castiglione, El Paso Museum of Art.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/%27Noah%27s_Offering%27%2C_oil_on_canvas_painting_attributed_to_Francesco_Castiglione%2C_El_Paso_Museum_of_Art.jpg/500px-%27Noah%27s_Offering%27%2C_oil_on_canvas_painting_attributed_to_Francesco_Castiglione%2C_El_Paso_Museum_of_Art.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:%27Noah%27s_Offering%27,_oil_on_canvas_painting_attributed_to_Francesco_Castiglione,_El_Paso_Museum_of_Art.jpg", "credit": "Attributed to Francesco Castiglione", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Noah's Offering", "src": "assets/portraits/genesis/noah.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "silas": {"src": "assets/portraits/acts/silas.png", "generated": true, "title": "Silas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}};
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
export const people = {"peter": {"name": "Peter", "role": "Apostle of Jesus Christ and fellow elder", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Peter 1, 2, 3, 4, 5"], "importance": "Peter greets believers living as foreigners in the Dispersion. He tells the elders to shepherd the flock willingly. They must not lord it over those in their care. He calls himself a witness of the sufferings of Christ. He sends greetings from Babylon and from Mark, his son.", "connections": "He writes to believers in Pontus, Galatia, Cappadocia, Asia, and Bithynia. He sends the letter through Silvanus.", "verseScope": {}, "linkNames": ["Peter"], "chapterIds": [1, 2, 3, 4, 5], "word": {"language": "greek", "strongId": "G4074", "key": "Peter", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Πέτρος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Pétros"}}, "jesus": {"name": "Jesus Christ", "role": "Christ who suffered, rose, and is at God’s right hand", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Peter 1, 2, 3, 4, 5"], "importance": "Peter says God raised Jesus Christ from the dead. Christ suffered for us and left an example. When he was cursed, he did not curse back. He trusted the one who judges righteously. Peter says believers will receive a crown when the chief Shepherd is revealed.", "connections": "Peter calls him the chief cornerstone and the chief Shepherd. He is also the Shepherd and Overseer of your souls.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4, 5], "word": {"language": "greek", "strongId": "G5547", "key": "Christ", "checkedVerses": 19, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Χριστός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Christós", "languageNote": "This is the dictionary form of the name “Christ.”"}}, "sarah": {"name": "Sarah", "role": "Holy woman who called Abraham lord", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Peter 3"], "importance": "Peter tells wives to be gentle and quiet. He says holy women of the past did so. He says Sarah obeyed Abraham and called him lord. Wives are her children if they do well. They must not be put in fear by any terror.", "connections": "Peter names her obeying her husband Abraham. He calls his readers her children if they do well.", "verseScope": {}, "linkNames": ["Sarah"], "chapterIds": [3], "word": {"language": "greek", "strongId": "G4564", "key": "Sarah", "checkedVerses": 1, "example": [3, 6], "hebrew": "", "transliteration": "", "greek": "Σάῤῥα", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Sárrha"}}, "abraham": {"name": "Abraham", "role": "Husband whom Sarah called lord", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Peter 3"], "importance": "Peter names Abraham only as the one Sarah obeyed. He tells no story about him. The next verse tells husbands to honor their wives as joint heirs.", "connections": "Peter says Sarah obeyed him and called him lord.", "verseScope": {}, "linkNames": ["Abraham"], "chapterIds": [3], "word": {"language": "greek", "strongId": "G11", "key": "Abraham", "checkedVerses": 1, "example": [3, 6], "hebrew": "", "transliteration": "", "greek": "Ἀβραάμ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Abraám"}}, "noah": {"name": "Noah", "role": "Man in whose days the ship was built", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Peter 3"], "importance": "Peter says some spirits in prison were disobedient in the days of Noah. God waited patiently while the ship was built. Eight souls were saved through water. Peter calls this a symbol of baptism.", "connections": "Peter names his days, when God waited patiently. Eight souls were saved through water.", "verseScope": {}, "linkNames": ["Noah"], "chapterIds": [3], "word": {"language": "greek", "strongId": "G3575", "key": "Noah", "checkedVerses": 1, "example": [3, 20], "hebrew": "", "transliteration": "", "greek": "Νῶε", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Nōe"}}, "silas": {"name": "Silvanus", "role": "Faithful brother who helped write the letter", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Peter 5"], "importance": "Peter says he wrote this brief letter through Silvanus. The letter says nothing more about what Silvanus did. Peter says the letter shows the true grace of God.", "connections": "Peter calls him our faithful brother, as he considers him.", "verseScope": {}, "linkNames": ["Silvanus"], "chapterIds": [5], "word": {"language": "greek", "strongId": "G4610", "key": "Silvanus", "checkedVerses": 1, "example": [5, 12], "hebrew": "", "transliteration": "", "greek": "Σιλουανός", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Silouanós"}}};

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

const featurePeople = {"1-peter-1": ["peter", "jesus"], "1-peter-2": ["peter", "jesus"], "1-peter-3": ["peter", "jesus", "sarah", "abraham", "noah"], "1-peter-4": ["peter", "jesus"], "1-peter-5": ["peter", "jesus", "silas"]};

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
