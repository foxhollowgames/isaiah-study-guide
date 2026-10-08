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

// Image errors do not bubble. Capture them for portraits added to any panel.
document.addEventListener('error', event => {
  if (event.target.matches?.('.portrait-art img')) {
    const art = event.target.parentElement;
    event.target.remove();
    art.querySelector('.portrait-initial').removeAttribute('aria-hidden');
  }
}, true);
export const people = {"paul": {"name": "Paul", "role": "Named letter speaker who gives Timothy instructions for teaching and care", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 1–6"], "importance": "His remembered violence makes mercy central to the authority claimed for his teaching.", "connections": "He recalls received mercy and calls Timothy his true child in faith.", "verseScope": {}, "linkNames": ["Paul"], "chapterIds": [1, 2, 3, 4, 5, 6]}, "timothy": {"name": "Timothy", "role": "Addressed worker charged with teaching, public reading, and care for others", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 1–6"], "importance": "His task joins received instruction with patient judgment and visible personal conduct.", "connections": "Paul asks him to stay at Ephesus and make his conduct an example.", "verseScope": {}, "linkNames": ["Timothy"], "chapterIds": [1, 2, 3, 4, 5, 6]}, "jesus": {"name": "Jesus Christ", "role": "Mediator and Lord whose mercy supplies the letter's foundation for faith", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 1–6"], "importance": "His work grounds the call to prayer for everyone and continued faithful conduct.", "connections": "The speaker connects received patience, salvation, and a faithful confession with him.", "verseScope": {}, "linkNames": ["Jesus", "Christ"], "chapterIds": [1, 2, 3, 4, 5, 6]}, "adam": {"name": "Adam", "role": "First formed person named in the letter's argument about teaching", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 2:13–14"], "importance": "The appeal uses the creation account rather than explaining a specific local dispute.", "connections": "His formation is compared with Eve's within the stated reason for unequal roles.", "verseScope": {}, "linkNames": ["Adam"], "chapterIds": [2]}, "eve": {"name": "Eve", "role": "Woman named in the letter's appeal to formation and deception", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["First Timothy 2:13–14"], "importance": "Her named place makes the letter's argument visible without establishing an invented local incident.", "connections": "The speaker compares her with Adam in the stated reason for unequal roles.", "verseScope": {}, "linkNames": ["Eve"], "chapterIds": [2]}};

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
    const art = `<span class="portrait-art" style="--portrait-hue:${hue}"><span class="portrait-initial" role="img" aria-label="${name}: ${image.src ? 'portrait failed to load' : 'no portrait available'}" aria-hidden="${!!image.src}">${name[0]}</span>${image.src ? `<img src="${escapeHtml(image.src)}" width="88" height="88" alt="${imageKind} of ${name}">` : ""}</span>`;
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
