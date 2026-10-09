const bookArt = {"paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "barnabas": {"src": "assets/portraits/acts/barnabas.png", "generated": true, "title": "Barnabas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "titus": {"src": "assets/portraits/2-corinthians/titus.png", "generated": true, "title": "Titus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century letter profile."}, "abraham": {"title": "File:Rembrandt Abraham Serving the Three Angels.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Rembrandt_Abraham_Serving_the_Three_Angels.jpg/500px-Rembrandt_Abraham_Serving_the_Three_Angels.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_Abraham_Serving_the_Three_Angels.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Abraham and the Three Angels", "src": "assets/portraits/genesis/abraham.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "hagar": {"title": "File:Hagar (from Mothers of the Bible), by Henry Ossawa Tanner.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Hagar_%28from_Mothers_of_the_Bible%29%2C_by_Henry_Ossawa_Tanner.jpg/500px-Hagar_%28from_Mothers_of_the_Bible%29%2C_by_Henry_Ossawa_Tanner.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hagar_(from_Mothers_of_the_Bible),_by_Henry_Ossawa_Tanner.jpg", "credit": "Henry Ossawa Tanner", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Hagar (from Mothers of the Bible), by Henry Ossawa Tanner. Published October 1902 in the Ladies' Home Journal, page 13.\nAnd Abraham rose up early in the morning, and took bread, and a bottle of water, and gave it unto Hagar. . . .and sent her away; and she departed and wandered in the wilderness of Beer-sheba--GENESIS XXI, 14.\n\nTanner painted the scene in which Hagar is banished.", "src": "assets/portraits/genesis/hagar.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}, "isaac": {"title": "File:Rembrandt Isaac and Rebecca.jpg", "url": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Rembrandt_Isaac_and_Rebecca.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_Isaac_and_Rebecca.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Isaac and Rebeccah spied upon by Abimelech", "src": "assets/portraits/genesis/isaac.jpg", "note": "Historical art illustrates the story. It does not establish actual appearance."}};
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
export const people = {"paul": {"name": "Paul", "role": "Letter speaker defending his message and the believers’ freedom", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 1–6"], "importance": "His recalled life and arguments serve the present question about Gentile belonging.", "connections": "Peter and Barnabas appear within his remembered dispute. Titus joins the earlier Jerusalem visit.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1, 2, 3, 4, 5, 6]}, "jesus": {"name": "Jesus Christ", "role": "The crucified and risen Lord through whom Paul describes received belonging", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 1–6"], "importance": "His gift supplies the basis for freedom expressed through love and shared service.", "connections": "Paul connects faith, baptism, and promised inheritance with him.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4, 5, 6]}, "peter": {"name": "Peter, also called Cephas", "role": "Apostle whom Paul visits and later challenges over divided meals", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 1:18; 2:7–14"], "importance": "His changed table practice shows a conflict between shared recognition and conduct under pressure.", "connections": "Paul describes his withdrawal from Gentiles after other people arrive.", "verseScope": {}, "linkNames": ["Peter", "Cephas"], "chapterIds": [1, 2]}, "barnabas": {"name": "Barnabas", "role": "Companion who receives shared recognition but later joins the meal division", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 2:1, 9, 13"], "importance": "His participation shows that pressure can affect even an accepted worker beside Paul.", "connections": "He travels with Paul and Titus to Jerusalem.", "verseScope": {}, "linkNames": ["Barnabas"], "chapterIds": [2]}, "titus": {"name": "Titus", "role": "Greek companion whom Paul says was not forced to receive circumcision", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 2:1–3"], "importance": "His presence turns the question about Gentile belonging into a decision concerning a particular person.", "connections": "He joins Paul and Barnabas at the remembered Jerusalem visit.", "verseScope": {}, "linkNames": ["Titus"], "chapterIds": [2]}, "abraham": {"name": "Abraham", "role": "Ancestor whose promise supplies the basis for Paul’s argument", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 3; 4"], "importance": "The promise’s earlier place prevents the later law from canceling its inheritance.", "connections": "His two sons and their mothers later become part of Paul’s symbolic comparison.", "verseScope": {}, "linkNames": ["Abraham"], "chapterIds": [3, 4]}, "hagar": {"name": "Hagar", "role": "Mother whom Paul uses as a figure for bondage in his comparison", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 4:24–25"], "importance": "Her role here belongs to Paul’s argument rather than her own spoken account.", "connections": "Paul places her son beside the free woman’s son.", "verseScope": {}, "linkNames": ["Hagar"], "chapterIds": [4]}, "isaac": {"name": "Isaac", "role": "Promised son with whom Paul compares the believers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Galatians 4:28"], "importance": "His recalled birth connects the earlier promise with the hearers’ claimed inheritance.", "connections": "Paul calls the believers children of promise like him.", "verseScope": {}, "linkNames": ["Isaac"], "chapterIds": [4]}};

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

const featurePeople = {"galatians-1": ["paul", "jesus", "peter"], "galatians-2": ["paul", "jesus", "peter", "barnabas", "titus"], "galatians-3": ["paul", "jesus", "abraham"], "galatians-4": ["paul", "jesus", "abraham", "hagar", "isaac"], "galatians-5": ["paul", "jesus"], "galatians-6": ["paul", "jesus"]};

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
