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
export const people = {"james-letter": {"name": "James", "role": "Named letter speaker who addresses the twelve tribes in their scattering", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 1, 2, 3, 4, 5"], "importance": "His instruction tests received faith through speech, fair treatment, and practical care.", "connections": "He calls himself a servant of God and of the Lord Jesus Christ.", "verseScope": {}, "linkNames": ["James"], "chapterIds": [1, 2, 3, 4, 5]}, "jesus": {"name": "Jesus Christ", "role": "Lord named in the greeting and the warning against favoring wealthy visitors", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 1, 2"], "importance": "His named place grounds the challenge to unequal treatment within the assembly.", "connections": "The hearers' faith in him must not accompany preference based on clothing or wealth.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2]}, "abraham": {"name": "Abraham", "role": "Father whose offering of Isaac supplies an example of faith working through action", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 2"], "importance": "His example connects professed trust with conduct that completes its expression.", "connections": "The speaker joins his trust, action, and description as God's friend.", "verseScope": {}, "linkNames": ["Abraham"], "chapterIds": [2]}, "isaac": {"name": "Isaac", "role": "Son named in the example of Abraham's offering", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 2"], "importance": "His brief mention makes the example concern a costly act rather than words alone.", "connections": "His place appears within the argument that Abraham's faith worked through action.", "verseScope": {}, "linkNames": ["Isaac"], "chapterIds": [2]}, "rahab": {"name": "Rahab", "role": "Woman whose reception and sending of the messengers supplies an example of active faith", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 2"], "importance": "Her different circumstances widen the argument about faith expressed through action.", "connections": "The speaker places her example beside Abraham's offering.", "verseScope": {}, "linkNames": ["Rahab"], "chapterIds": [2]}, "job": {"name": "Job", "role": "Enduring sufferer recalled beside the Lord's compassion and mercy", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 5"], "importance": "His example supports patience without making present suffering evidence of abandonment.", "connections": "The speaker asks the hearers to remember his endurance and its outcome.", "verseScope": {}, "linkNames": ["Job"], "chapterIds": [5]}, "elijah": {"name": "Elijah", "role": "Prophet whose prayer and received rain supply an example of effective prayer", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["James 5"], "importance": "His example connects shared human limits with the call to pray for one another.", "connections": "The speaker stresses that his nature was like that of the hearers.", "verseScope": {}, "linkNames": ["Elijah"], "chapterIds": [5]}};

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
