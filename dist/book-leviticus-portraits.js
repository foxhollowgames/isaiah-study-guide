const bookArt = {"moses": {"title": "File:Rembrandt - Moses Smashing the Tablets of the Law - WGA19132.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg/500px-Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_Moses_Smashing_the_Tablets_of_the_Law_-_WGA19132.jpg", "credit": "Rembrandt", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "", "src": "assets/portraits/exodus/moses.jpg", "note": "Historical art illustrates the person or story. It does not establish actual appearance."}, "aaron": {"title": "File:Tissot Drawing 122 Aaron (Exodus 4 16) for Brunoff 116 Aaron.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Tissot_Drawing_122_Aaron_%28Exodus_4_16%29_for_Brunoff_116_Aaron.jpg/500px-Tissot_Drawing_122_Aaron_%28Exodus_4_16%29_for_Brunoff_116_Aaron.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tissot_Drawing_122_Aaron_(Exodus_4_16)_for_Brunoff_116_Aaron.jpg", "credit": "James Tissot", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Pen and ink sketch by James Tissot for his painted illustrations of the Old Testament; one of 200 worked up by other artists after his death and published as chromolithographs by Maurice Brunoff in 1904 (photo: Phillip Medhurst)", "src": "assets/portraits/exodus/aaron.jpg", "note": "Historical art illustrates the person or story. It does not establish actual appearance."}, "nadab": {"title": "File:The Sin of Nadab and Abihu (detail).jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/The_Sin_of_Nadab_and_Abihu_%28detail%29.jpg/500px-The_Sin_of_Nadab_and_Abihu_%28detail%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:The_Sin_of_Nadab_and_Abihu_(detail).jpg", "credit": "the Providence Lithograph Company", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "The Sin of Nadab and Abihu, as in Leviticus 10, illustration from a Bible card published 1907 by the Providence Lithograph Company", "src": "assets/portraits/exodus/nadab.jpg", "note": "Later artwork illustrating the death described in Leviticus 10. It does not establish actual appearance."}, "abihu": {"title": "File:Scheits Death of Nadab and Abihu.jpg", "url": "https://upload.wikimedia.org/wikipedia/commons/2/24/Scheits_Death_of_Nadab_and_Abihu.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Scheits_Death_of_Nadab_and_Abihu.jpg", "credit": "Matthias Scheits (circa 1630- circa 1700)", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Death of Nadab and Abihu, by Matthias Scheits (circa 1630-circa 1700)", "src": "assets/portraits/exodus/abihu.jpg", "note": "Later artwork illustrating the death described in Leviticus 10. It does not establish actual appearance."}, "eleazar": {"title": "File:Tissot Drawing 177 Moses blesses Joshua before the high priest (Numbers 27 22) for Brunoff 165 Moïse sacre Josué et Eléazar.jpg", "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Tissot_Drawing_177_Moses_blesses_Joshua_before_the_high_priest_%28Numbers_27_22%29_for_Brunoff_165_Mo%C3%AFse_sacre_Josu%C3%A9_et_El%C3%A9azar.jpg/500px-Tissot_Drawing_177_Moses_blesses_Joshua_before_the_high_priest_%28Numbers_27_22%29_for_Brunoff_165_Mo%C3%AFse_sacre_Josu%C3%A9_et_El%C3%A9azar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail", "sourceUrl": "https://commons.wikimedia.org/wiki/File:Tissot_Drawing_177_Moses_blesses_Joshua_before_the_high_priest_(Numbers_27_22)_for_Brunoff_165_Mo%C3%AFse_sacre_Josu%C3%A9_et_El%C3%A9azar.jpg", "credit": "James Tissot", "license": "Public domain", "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/", "description": "Pen and ink sketch by James Tissot for his painted illustrations of the Old Testament; one of 200 worked up by other artists after his death and published as chromolithographs by Maurice Brunoff in 1904 (photo: Phillip Medhurst)", "src": "assets/portraits/exodus/eleazar.jpg", "note": "This artwork depicts the later Numbers account of Joshua’s appointment. It does not depict an Exodus event."}, "ithamar": {"src": "assets/portraits/exodus/ithamar.png", "credit": "AI-generated illustration", "license": "Generated artwork", "licenseUrl": "", "sourceUrl": "", "generated": true, "description": "Imaginative artistic depiction of Ithamar.", "note": "An artistic interpretation, not a known likeness."}, "shelomith": {"src": "assets/portraits/leviticus/shelomith.png", "generated": true, "credit": "AI-generated illustration", "description": "Imaginative artistic depiction of Shelomith.", "note": "An artistic interpretation. The text does not describe her appearance."}};
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
export const people = {"moses": {"name": "Moses", "role": "Prophet who leads Israel from Egypt", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 1–27"], "importance": "He conveys the laws and appoints the priests. His work joins worship with the community’s conduct.", "connections": "Son of Amram and Jochebed. Brother of Aaron and Miriam. Husband of Zipporah.", "verseScope": {}, "linkNames": [], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]}, "aaron": {"name": "Aaron", "role": "Moses's brother and appointed priest", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 8–10; 16; 21–22"], "importance": "He begins priestly service and performs the annual rite. His response to his sons’ deaths reveals personal grief.", "connections": "Son of Amram and Jochebed. Father of Nadab, Abihu, Eleazar, and Ithamar.", "verseScope": {}, "linkNames": [], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 21, 22]}, "nadab": {"name": "Nadab", "role": "Son of Aaron who approaches Sinai", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 8–10"], "importance": "Moses prepares him to serve as a priest. He later dies after offering fire God had not asked for.", "connections": "Son of Aaron. Brother of Abihu, Eleazar, and Ithamar.", "verseScope": {}, "linkNames": [], "chapterIds": [8, 9, 10]}, "abihu": {"name": "Abihu", "role": "Son of Aaron and appointed priest", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 8–10"], "importance": "He serves with his father and brothers. His death becomes the setting for further priestly instructions.", "connections": "Son of Aaron. Brother of Nadab, Eleazar, and Ithamar.", "verseScope": {}, "linkNames": [], "chapterIds": [8, 9, 10]}, "eleazar": {"name": "Eleazar", "role": "Son of Aaron and appointed priest", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 10:6–20"], "importance": "He remains among Aaron’s surviving sons. Moses addresses him about mourning and the sacred offerings.", "connections": "Brother of Nadab, Abihu, and Ithamar.", "verseScope": {}, "linkNames": [], "chapterIds": [8, 9, 10]}, "ithamar": {"name": "Ithamar", "role": "Son of Aaron who oversees sanctuary accounts", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 10:6–20"], "importance": "He remains with Eleazar after his brothers’ deaths. The instructions place mourning beside continuing service.", "connections": "Brother of Nadab, Abihu, and Eleazar.", "verseScope": {}, "linkNames": [], "chapterIds": [8, 9, 10]}, "shelomith": {"name": "Shelomith", "role": "Named mother in the judgment account", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": ["Sinai / traditional region"], "passages": ["Leviticus 24:10–23"], "importance": "The account gives her name and tribe while telling about the judgment on her son.", "connections": "Daughter of Dibri, from Dan. Her son has an Egyptian father.", "verseScope": {}, "linkNames": [], "chapterIds": [24]}};

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

const featurePeople = {"leviticus-1": ["moses", "aaron"], "leviticus-2": ["moses", "aaron"], "leviticus-3": ["moses", "aaron"], "leviticus-4": ["moses", "aaron"], "leviticus-5": ["moses", "aaron"], "leviticus-6": ["moses", "aaron"], "leviticus-7": ["moses", "aaron"], "leviticus-8": ["moses", "aaron", "nadab", "abihu", "eleazar", "ithamar"], "leviticus-9": ["moses", "aaron", "nadab", "abihu", "eleazar", "ithamar"], "leviticus-10": ["moses", "aaron", "nadab", "abihu", "eleazar", "ithamar"], "leviticus-11": ["moses", "aaron"], "leviticus-12": ["moses"], "leviticus-13": ["moses", "aaron"], "leviticus-14": ["moses", "aaron"], "leviticus-15": ["moses", "aaron"], "leviticus-16": ["moses", "aaron"], "leviticus-17": ["moses", "aaron"], "leviticus-18": ["moses"], "leviticus-19": ["moses"], "leviticus-20": ["moses"], "leviticus-21": ["moses", "aaron"], "leviticus-22": ["moses", "aaron"], "leviticus-23": ["moses"], "leviticus-24": ["moses", "shelomith"], "leviticus-25": ["moses"], "leviticus-26": ["moses"], "leviticus-27": ["moses"]};

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
