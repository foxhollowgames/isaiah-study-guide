const bookArt = {"solomon": {"src": "assets/portraits/1-kings/solomon.png", "generated": true, "title": "Solomon · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "david": {"src": "assets/portraits/ruth/david.png", "generated": true, "title": "David · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence."}, "woman-song": {"src": "assets/portraits/song-of-solomon/woman-song.png", "generated": true, "title": "The woman · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "lover-song": {"src": "assets/portraits/song-of-solomon/lover-song.png", "generated": true, "title": "The lover · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "women-song": {"src": "assets/portraits/song-of-solomon/women-song.png", "generated": true, "title": "The women of Jerusalem · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "brothers-song": {"src": "assets/portraits/song-of-solomon/brothers-song.png", "generated": true, "title": "The brothers · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "watchmen-song": {"src": "assets/portraits/song-of-solomon/watchmen-song.png", "generated": true, "title": "The watchmen · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "solomon-guards-song": {"src": "assets/portraits/song-of-solomon/solomon-guards-song.png", "generated": true, "title": "Solomon’s guards · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "solomon-mother-song": {"src": "assets/portraits/song-of-solomon/solomon-mother-song.png", "generated": true, "title": "Solomon’s mother · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "woman-mother-song": {"src": "assets/portraits/song-of-solomon/woman-mother-song.png", "generated": true, "title": "The woman’s mother · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "pharaoh-song": {"src": "assets/portraits/song-of-solomon/pharaoh-song.png", "generated": true, "title": "Pharaoh · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}};
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
export const people = {"woman-song": {"name": "The woman", "role": "Woman who speaks about her desire and her work", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 1:5–7; 3:1–5; 5:2–16; 6:13; 7:10–13; 8"], "importance": "She asks for meetings and describes harm during her search. Her words give her wishes a direct voice.", "connections": "She seeks her lover and speaks to the women of Jerusalem.", "verseScope": {}, "linkNames": ["woman", "Shulammite"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8]}, "lover-song": {"name": "The lover", "role": "Man who invites and praises the woman", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 1:13–16; 2:8–14; 4; 5:10–16; 7"], "importance": "His praise uses the surrounding world to express his desire.", "connections": "She calls him her beloved and her friend.", "verseScope": {"1": [13, 14, 16], "2": [3, 8, 9, 10, 16, 17], "3": [1, 2, 3, 4], "4": [16], "5": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], "6": [1, 2, 3], "7": [9, 10, 11, 13], "8": [5, 14]}, "linkNames": ["lover", "my beloved", "your beloved", "her beloved"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8]}, "women-song": {"name": "The women of Jerusalem", "role": "Women who hear and answer the lovers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 1:5; 2:7; 3:5, 10–11; 5:8–9, 16; 6:1; 8:4"], "importance": "Their questions lead the woman to explain why she wants him.", "connections": "They ask about the lover and offer to help find him.", "verseScope": {}, "linkNames": ["women of Jerusalem", "daughters of Jerusalem", "daughters of Zion"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8]}, "brothers-song": {"name": "The brothers", "role": "Family members who discuss work and their sister’s future", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 1:6; 8:8–10"], "importance": "Their decisions show family control. The woman later gives her own answer.", "connections": "The woman describes angry brothers. Later brothers discuss a young sister.", "verseScope": {"1": [6]}, "linkNames": ["brothers", "mother’s sons"], "chapterIds": [1, 8]}, "watchmen-song": {"name": "The watchmen", "role": "Men who patrol the city and its walls", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 3:3; 5:7"], "importance": "The later search includes their violence against her. Their public role does not make her safe.", "connections": "The woman meets watchmen during two night searches.", "verseScope": {"3": [3], "5": [7]}, "linkNames": ["watchmen", "keepers of the walls"], "chapterIds": [3, 5]}, "solomon-guards-song": {"name": "Solomon’s guards", "role": "Sixty armed men around Solomon’s carriage", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 3:7–8"], "importance": "The royal procession has protection unavailable to the woman during her later search.", "connections": "They carry swords because of danger at night.", "verseScope": {"3": [7]}, "linkNames": ["Solomon’s guards", "Sixty mighty men"], "chapterIds": [3]}, "solomon-mother-song": {"name": "Solomon’s mother", "role": "Mother who crowns Solomon in the wedding scene", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 3:11"], "importance": "Her crown joins family honor with the king’s public celebration.", "connections": "The poem names her relationship but does not give her name.", "verseScope": {"3": [11]}, "linkNames": ["Solomon’s mother", "his mother"], "chapterIds": [3]}, "woman-mother-song": {"name": "The woman’s mother", "role": "Mother whose house appears in the woman’s words", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 3:4; 6:9; 8:1–2"], "importance": "The home connects her desire with the family that raised her.", "connections": "The woman brings her lover toward her mother’s house.", "verseScope": {"3": [4], "8": [1, 2]}, "linkNames": ["woman’s mother", "my mother"], "chapterIds": [3, 6, 8]}, "pharaoh-song": {"name": "Pharaoh", "role": "Unnamed Egyptian ruler mentioned in a comparison", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 1:9"], "importance": "The image gives his praise the force of a royal horse. Pharaoh does not act in this poem.", "connections": "The lover compares the woman with a horse among Pharaoh’s chariots.", "verseScope": {"1": [9]}, "linkNames": ["Pharaoh"], "chapterIds": [1]}, "solomon": {"name": "Solomon", "role": "King named in the title and royal scenes", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 1:1, 5; 3:7–11; 8:11–12"], "importance": "His wealth provides comparisons with the lovers’ desire. The book does not clearly identify him as the lover.", "connections": "His carriage, mother, and vineyard appear in the poems.", "verseScope": {}, "linkNames": ["Solomon"], "chapterIds": [1, 3, 8]}, "david": {"name": "David", "role": "King named in the lover’s tower comparison", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Song of Solomon 4:4"], "importance": "Shields and a tower give the praise an image of strength.", "connections": "The lover compares the woman’s neck with David’s tower.", "verseScope": {"4": [4]}, "linkNames": ["David"], "chapterIds": [4]}};

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

const featurePeople = {"song-of-solomon-1": ["woman-song", "lover-song", "women-song", "brothers-song", "pharaoh-song", "solomon"], "song-of-solomon-2": ["woman-song", "lover-song", "women-song"], "song-of-solomon-3": ["woman-song", "lover-song", "women-song", "watchmen-song", "solomon-guards-song", "solomon-mother-song", "woman-mother-song", "solomon"], "song-of-solomon-4": ["woman-song", "lover-song", "women-song", "david"], "song-of-solomon-5": ["woman-song", "lover-song", "women-song", "watchmen-song"], "song-of-solomon-6": ["woman-song", "lover-song", "women-song", "woman-mother-song"], "song-of-solomon-7": ["woman-song", "lover-song", "women-song"], "song-of-solomon-8": ["woman-song", "lover-song", "women-song", "brothers-song", "woman-mother-song", "solomon"]};

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
