const bookArt = {"james-letter": {"src": "assets/portraits/james/james-letter.png", "generated": true, "title": "James · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected biblical profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "abraham": {"title": "File:Rembrandt Abraham Serving the Three Angels.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Rembrandt_Abraham_Serving_the_Three_Angels.jpg/500px-Rembrandt_Abraham_Serving_the_Three_Angels.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_Abraham_Serving_the_Three_Angels.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Abraham and the Three Angels", "src": "assets/portraits/genesis/abraham.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "isaac": {"title": "File:Rembrandt Isaac and Rebecca.jpg", "url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Rembrandt_Isaac_and_Rebecca.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_Isaac_and_Rebecca.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Isaac and Rebeccah spied upon by Abimelech", "src": "assets/portraits/genesis/isaac.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "rahab": {"title": "File:Foster Bible Pictures 0084-1 Rahab Helping the Two Israelite Spies.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Foster_Bible_Pictures_0084-1_Rahab_Helping_the_Two_Israelite_Spies.jpg/500px-Foster_Bible_Pictures_0084-1_Rahab_Helping_the_Two_Israelite_Spies.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Foster_Bible_Pictures_0084-1_Rahab_Helping_the_Two_Israelite_Spies.jpg", "credit": "Frederick Richard Pickersgill, illustrator of the 1897 Bible Pictures and What They Teach Us by Charles Foster", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Rahab Helping the Two Israelite Spies.  Caption: \"These two men are running up to the roof of the house to hide. The woman is helping them. Her name is Rahab. The men are Israelites. They have come to the city to spy ; to see how many people live there, and how rich they are. The city is named Jericho. Soldiers will look for the men to kill them.\"  Illustration from the 1897 Bible Pictures and What They Teach Us: Containing 400 Illustrations from the Old and New Testaments: With brief descriptions by Charles Foster", "src": "assets/portraits/joshua/rahab.jpg", "note": "Later historical art illustrates the person or account. It does not establish actual appearance."}, "job": {"src": "assets/portraits/job/job.png", "generated": true, "title": "Job · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "elijah": {"src": "assets/portraits/1-kings/elijah.png", "generated": true, "title": "Elijah · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}};
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
export const people = {"james-letter": {"name": "James", "role": "Servant of God and the Lord Jesus Christ", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 1, 2, 3, 4, 5"], "importance": "James greets the twelve tribes in the Dispersion. He tells them to ask God for wisdom and to be doers of the word. He warns against favoring the rich and against careless speech. He tells the sick to call for the elders.", "connections": "He writes to the twelve tribes in the Dispersion. He calls them brothers.", "verseScope": {}, "linkNames": ["James"], "chapterIds": [1, 2, 3, 4, 5], "word": {"language": "greek", "strongId": "G2385", "key": "James", "checkedVerses": 1, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Ἰάκωβος", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iákōbos"}}, "jesus": {"name": "Jesus Christ", "role": "Lord Jesus Christ, our glorious Lord", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 1, 2"], "importance": "James names him in the greeting. James says not to hold the faith of our glorious Lord with partiality (chapter 2). A man in fine clothing gets a good seat. A poor man is told to stand. James calls that partiality.", "connections": "James calls himself a servant of God and of the Lord Jesus Christ.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2], "word": {"language": "greek", "strongId": "G2424", "key": "Jesus", "checkedVerses": 2, "example": [1, 1], "hebrew": "", "transliteration": "", "greek": "Ἰησοῦς", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iēsoûs", "languageNote": "This is the dictionary form of the name “Jesus.”"}}, "abraham": {"name": "Abraham", "role": "Our father, called the friend of God", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 2"], "importance": "James says Abraham offered up his son Isaac on the altar. Faith worked with his works. James quotes Scripture that Abraham believed God, and it was counted as righteousness. Abraham was called the friend of God.", "connections": "James calls him our father. He ties his faith to his offering of Isaac.", "verseScope": {}, "linkNames": ["Abraham"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G11", "key": "Abraham", "checkedVerses": 2, "example": [2, 21], "hebrew": "", "transliteration": "", "greek": "Ἀβραάμ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Abraám"}}, "isaac": {"name": "Isaac", "role": "Abraham’s son, offered on the altar", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 2"], "importance": "James names Isaac once. Abraham offered him up on the altar. James uses this act to show faith working with works.", "connections": "James calls him Abraham’s son.", "verseScope": {}, "linkNames": ["Isaac"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G2464", "key": "Isaac", "checkedVerses": 1, "example": [2, 21], "hebrew": "", "transliteration": "", "greek": "Ἰσαάκ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Isaák"}}, "rahab": {"name": "Rahab", "role": "Woman called a prostitute, who received the messengers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 2"], "importance": "James calls her Rahab the prostitute. She received the messengers and sent them out another way. James says she was justified by works, as Abraham was.", "connections": "James places her after Abraham as a second example.", "verseScope": {}, "linkNames": ["Rahab"], "chapterIds": [2], "word": {"language": "greek", "strongId": "G4460", "key": "Rahab", "checkedVerses": 1, "example": [2, 25], "hebrew": "", "transliteration": "", "greek": "Ῥαάβ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Rhaáb"}}, "job": {"name": "Job", "role": "Man known for perseverance", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 5"], "importance": "James tells the readers to be patient until the coming of the Lord. He calls those who endured blessed. He names Job’s perseverance. He says the Lord is full of compassion and mercy.", "connections": "James says his readers have heard of his perseverance. They have seen the Lord in the outcome.", "verseScope": {}, "linkNames": ["Job"], "chapterIds": [5], "word": {"language": "greek", "strongId": "G2492", "key": "Job", "checkedVerses": 1, "example": [5, 11], "hebrew": "", "transliteration": "", "greek": "Ἰώβ", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Iṓb"}}, "elijah": {"name": "Elijah", "role": "Prophet whose prayer stopped and brought rain", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 5"], "importance": "James says Elijah prayed earnestly that it might not rain. It did not rain for three years and six months. He prayed again, and the sky gave rain. James uses him to show that a righteous person’s prayer is powerful.", "connections": "James says he was a man with a nature like ours.", "verseScope": {}, "linkNames": ["Elijah"], "chapterIds": [5], "word": {"language": "greek", "strongId": "G2243", "key": "Elijah", "checkedVerses": 1, "example": [5, 17], "hebrew": "", "transliteration": "", "greek": "Ἡλίας", "greekNote": "", "sourceIds": ["strong-greek", "byz"], "greekTransliteration": "Hēlías"}}};

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

const featurePeople = {"james-1": ["james-letter", "jesus"], "james-2": ["james-letter", "jesus", "abraham", "isaac", "rahab"], "james-3": ["james-letter"], "james-4": ["james-letter"], "james-5": ["james-letter", "job", "elijah"]};

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
