const bookArt = {"peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "noah": {"title": "File:'Noah's Offering', oil on canvas painting attributed to Francesco Castiglione, El Paso Museum of Art.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/%27Noah%27s_Offering%27%2C_oil_on_canvas_painting_attributed_to_Francesco_Castiglione%2C_El_Paso_Museum_of_Art.jpg/500px-%27Noah%27s_Offering%27%2C_oil_on_canvas_painting_attributed_to_Francesco_Castiglione%2C_El_Paso_Museum_of_Art.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:%27Noah%27s_Offering%27,_oil_on_canvas_painting_attributed_to_Francesco_Castiglione,_El_Paso_Museum_of_Art.jpg", "credit": "Attributed to Francesco Castiglione", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Noah's Offering", "src": "assets/portraits/genesis/noah.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "lot": {"title": "File:The angel leads Lot, his wife, and his daughters out of Sodom, and Abraham intercedes with the Lord for the righteous of this city, from the Olomouc Bible, Part I, folio 8r (Bible olomoucká, I. díl, I. 1417, s. 8r) cropped.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/The_angel_leads_Lot%2C_his_wife%2C_and_his_daughters_out_of_Sodom%2C_and_Abraham_intercedes_with_the_Lord_for_the_righteous_of_this_city%2C_from_the_Olomouc_Bible%2C_Part_I%2C_folio_8r_%28Bible_olomouck%C3%A1%2C_I._d%C3%ADl%2C_I._1417%2C_s._8r%29_cropped.jpg/500px-thumbnail.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:The_angel_leads_Lot,_his_wife,_and_his_daughters_out_of_Sodom,_and_Abraham_intercedes_with_the_Lord_for_the_righteous_of_this_city,_from_the_Olomouc_Bible,_Part_I,_folio_8r_(Bible_olomouck%C3%A1,_I._d%C3%ADl,_I._1417,_s._8r)_cropped.jpg", "credit": "unknown artist, Olomouc, Moravia, circa 1417 A.D.", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "The angel leads Lot, his wife, and his daughters out of Sodom, and Abraham intercedes with the Lord for the righteous of this city, from the Olomouc Bible, Part I, folio 148v (Bible olomoucká, I. díl, I. 1417, s. 148v)", "src": "assets/portraits/genesis/lot.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "balaam": {"title": "File:Hermann tom Ring - Balaam (^) - 4649 - Bavarian State Painting Collections.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Hermann_tom_Ring_-_Balaam_%28%5E%29_-_4649_-_Bavarian_State_Painting_Collections.jpg/500px-Hermann_tom_Ring_-_Balaam_%28%5E%29_-_4649_-_Bavarian_State_Painting_Collections.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hermann_tom_Ring_-_Balaam_(%5E)_-_4649_-_Bavarian_State_Painting_Collections.jpg", "credit": "Hermann tom Ring", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "", "src": "assets/portraits/numbers/balaam.jpg", "note": "Later story-based artwork. It does not establish actual appearance. Group scenes do not identify a known individual likeness."}, "paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}};
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
export const people = {"peter": {"name": "Peter", "role": "Simon Peter, servant and apostle of Jesus Christ", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Second Peter 1, 2, 3"], "importance": "He says he will keep reminding the readers, because his death is near. He says he and others heard the voice from heaven on the holy mountain. He warns of false teachers and mockers. He ends by telling the readers to grow in grace and knowledge.", "connections": "He writes to believers who share his precious faith. He calls Paul our beloved brother.", "verseScope": {}, "linkNames": ["Peter"], "chapterIds": [1, 2, 3], "word": {"language": "greek", "strongId": "G4074", "key": "Peter", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Πέτρος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Pétros"}}, "jesus": {"name": "Jesus Christ", "role": "Lord and Savior, whose coming is promised", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Second Peter 1, 2, 3"], "importance": "Peter says God’s power gives all things for life and godliness through knowing him. On the holy mountain, Peter heard the Father’s voice honor him. Mockers ask where the promise of his coming is. Peter tells the readers to be patient. They should keep growing in grace and knowledge of him.", "connections": "Peter says the voice from the Majestic Glory called him “my beloved Son.”", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3], "word": {"language": "greek", "strongId": "G2424", "key": "Jesus", "checkedVerses": 8, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Ἰησοῦς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iēsoûs", "languageNote": "This is the dictionary form of the name “Jesus.”"}}, "noah": {"name": "Noah", "role": "Preacher of righteousness, kept safe in the flood", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Second Peter 2"], "importance": "Peter says God did not spare the ancient world. He kept Noah with seven others when the flood came. Noah is one of Peter’s proofs that the Lord knows how to deliver the godly.", "connections": "God kept him with seven others when the flood came.", "verseScope": {}, "linkNames": ["Noah"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G3575", "key": "Noah", "checkedVerses": 1, "example": [2, 5], "hebrew": "", "transliteration": "", "greek": "Νῶε", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Nōe"}}, "lot": {"name": "Lot", "role": "Righteous man rescued from Sodom", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Second Peter 2"], "importance": "Peter says Lot lived among the wicked. Their lawless deeds tormented him day by day. God delivered him. Sodom and Gomorrah were turned to ashes. Peter says the Lord knows how to deliver the godly.", "connections": "Peter names him with the destruction of Sodom and Gomorrah.", "verseScope": {}, "linkNames": ["Lot"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G3091", "key": "Lot", "checkedVerses": 1, "example": [2, 7], "hebrew": "", "transliteration": "", "greek": "Λώτ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Lṓt"}}, "balaam": {"name": "Balaam", "role": "Son of Beor, a prophet who loved wages", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Second Peter 2"], "importance": "Peter says Balaam loved the wages of wrongdoing. He was rebuked for his disobedience. A speechless donkey spoke with a man’s voice and stopped his madness. Peter says the false teachers left the right way as he did.", "connections": "He is called the son of Beor. Peter says the false teachers followed his way.", "verseScope": {}, "linkNames": ["Balaam"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G903", "key": "Balaam", "checkedVerses": 1, "example": [2, 15], "hebrew": "", "transliteration": "", "greek": "Βαλαάμ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Balaám"}}, "paul": {"name": "Paul", "role": "Our beloved brother, who wrote letters", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Second Peter 3"], "importance": "Peter says Paul wrote to the readers about the Lord’s patience. Peter says some things in Paul’s letters are hard to understand. The ignorant and unsettled twist them, as they twist the other Scriptures.", "connections": "Peter calls him our beloved brother. Peter says Paul wrote to these readers.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [3], "word": {"language": "greek", "strongId": "G3972", "key": "Paul", "checkedVerses": 1, "example": [3, 15], "hebrew": "", "transliteration": "", "greek": "Παῦλος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Paûlos"}}};

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

const featurePeople = {"2-peter-1": ["peter", "jesus"], "2-peter-2": ["peter", "jesus", "noah", "lot", "balaam"], "2-peter-3": ["peter", "jesus", "paul"]};

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
