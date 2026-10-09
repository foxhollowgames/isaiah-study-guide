const bookArt = {"solomon": {"src": "assets/portraits/1-kings/solomon.png", "generated": true, "title": "Solomon · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "david": {"src": "assets/portraits/ruth/david.png", "generated": true, "title": "David · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence."}, "hezekiah": {"src": "assets/portraits/hezekiah-v2.png", "generated": true, "title": "hezekiah · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Reused for the same person depicted in Isaiah. Appearance and setting remain artistic interpretations."}, "parents-proverbs": {"src": "assets/portraits/proverbs/parents-proverbs.png", "generated": true, "title": "The teaching parents · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "wisdom-proverbs": {"src": "assets/portraits/proverbs/wisdom-proverbs.png", "generated": true, "title": "Woman Wisdom · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "folly-proverbs": {"src": "assets/portraits/proverbs/folly-proverbs.png", "generated": true, "title": "Woman Folly · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "unfaithful-woman-proverbs": {"src": "assets/portraits/proverbs/unfaithful-woman-proverbs.png", "generated": true, "title": "The woman in the adultery warnings · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "young-learner-proverbs": {"src": "assets/portraits/proverbs/young-learner-proverbs.png", "generated": true, "title": "The young man in chapter 7 · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "agur": {"src": "assets/portraits/proverbs/agur.png", "generated": true, "title": "Agur · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "agur-named-men": {"src": "assets/portraits/proverbs/agur-named-men.png", "generated": true, "title": "Jakeh, Ithiel, and Ucal · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "lemuel": {"src": "assets/portraits/proverbs/lemuel.png", "generated": true, "title": "Lemuel · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "lemuel-mother": {"src": "assets/portraits/proverbs/lemuel-mother.png", "generated": true, "title": "Lemuel’s mother · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}, "capable-woman-proverbs": {"src": "assets/portraits/proverbs/capable-woman-proverbs.png", "generated": true, "title": "The capable woman · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Artistic interpretation. Appearance, age, and setting are not verified historical evidence."}};
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
export const people = {"solomon": {"name": "Solomon", "role": "King named in three collection headings", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 1:1; 10:1; 25:1"], "importance": "His name connects the collections with remembered royal wisdom.", "connections": "The opening identifies him as David’s son and Israel’s king.", "verseScope": {}, "linkNames": [], "chapterIds": [1, 10, 25], "word": {"language": "hebrew", "strongId": "H8010", "key": "Solomon", "checkedVerses": 3, "example": [1, 1], "hebrew": "שְׁלֹמֹה", "transliteration": "Shᵉlômôh", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "david": {"name": "David", "role": "Father named beside Solomon", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 1:1"], "importance": "The family name connects the opening with Israel’s earlier king.", "connections": "The opening uses his name to identify Solomon’s family.", "verseScope": {}, "linkNames": [], "chapterIds": [1], "word": {"language": "hebrew", "strongId": "H1732", "key": "David", "checkedVerses": 1, "example": [1, 1], "hebrew": "דָּוִד", "transliteration": "Dâvid", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "hezekiah": {"name": "Hezekiah", "role": "King whose men copy sayings", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 25:1"], "importance": "Their work shows sayings being collected after Solomon’s time.", "connections": "Chapter 25 names his men as copying sayings associated with Solomon.", "verseScope": {}, "linkNames": [], "chapterIds": [25], "word": {"language": "hebrew", "strongId": "H2396", "key": "Hezekiah", "checkedVerses": 1, "example": [25, 1], "hebrew": "חִזְקִיָּה", "transliteration": "Chizqîyâh", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "parents-proverbs": {"name": "The teaching parents", "role": "Father and mother who guide a learner", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 1:8–9; 4:1–4; 6:20–23"], "importance": "Their teaching prepares him to resist pressure from others.", "connections": "The teacher urges a son to hear both parents.", "verseScope": {"1": [8], "4": [3], "6": [20]}, "linkNames": ["your father", "your mother", "my father"], "chapterIds": [1, 4, 6]}, "wisdom-proverbs": {"name": "Woman Wisdom", "role": "Wisdom pictured as a woman who speaks", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 1:20–33; 8:1–36; 9:1–6"], "importance": "Her voice lets the poems show wisdom teaching, warning, and welcoming.", "connections": "She calls publicly, praises fair conduct, and invites learners to her table.", "verseScope": {"1": [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], "8": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], "9": [1, 2, 3, 4, 5, 6]}, "linkNames": ["Wisdom", "wisdom"], "chapterIds": [1, 8, 9]}, "folly-proverbs": {"name": "Woman Folly", "role": "Foolishness pictured as a woman who invites guests", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 9:13–18"], "importance": "Her welcome imitates Wisdom’s invitation while leading guests toward death.", "connections": "She offers stolen food. Her guests do not understand the danger.", "verseScope": {"9": [13]}, "linkNames": ["foolish woman"], "chapterIds": [9]}, "unfaithful-woman-proverbs": {"name": "The woman in the adultery warnings", "role": "Married woman who seeks another partner", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 2:16–19; 5:3–14; 6:24–35; 7:10–23"], "importance": "The teacher contrasts her promises with harm to people and marriages.", "connections": "In chapter 7, she tells a young man her husband is away.", "verseScope": {"2": [16], "5": [3], "6": [24, 26, 32], "7": [10]}, "linkNames": ["immoral woman", "adulteress", "evil woman", "woman"], "chapterIds": [2, 5, 6, 7]}, "young-learner-proverbs": {"name": "The young man in chapter 7", "role": "Learner who follows a tempting invitation", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 7:7–23"], "importance": "He notices the invitation without understanding where his choice leads.", "connections": "The teacher observes him walking toward the woman’s house.", "verseScope": {"7": [7]}, "linkNames": ["young man"], "chapterIds": [7]}, "agur": {"name": "Agur", "role": "Speaker who admits limited understanding", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 30:1–9"], "importance": "His request addresses dangers he sees in both hunger and wealth.", "connections": "The heading calls him Jakeh’s son. He asks God for enough food.", "verseScope": {}, "linkNames": [], "chapterIds": [30], "word": {"language": "hebrew", "strongId": "H94", "key": "Agur", "checkedVerses": 1, "example": [30, 1], "hebrew": "אָגוּר", "transliteration": "ʼÂgûwr", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "agur-named-men": {"name": "Jakeh, Ithiel, and Ucal", "role": "Names in the introduction to Agur’s words", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 30:1"], "importance": "These names introduce the speech. The verse gives no further account of their actions.", "connections": "WEB names Jakeh as Agur’s father and mentions Ithiel and Ucal.", "verseScope": {"30": [1]}, "linkNames": ["Jakeh", "Ithiel", "Ucal"], "chapterIds": [30], "word": {"language": "hebrew", "strongId": "H3348", "key": "Jakeh", "checkedVerses": 1, "example": [30, 1], "hebrew": "יָקֶה", "transliteration": "Yâqeh", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "lemuel": {"name": "Lemuel", "role": "King who recalls his mother’s teaching", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 31:1–9"], "importance": "Her advice connects his private habits with his public duties.", "connections": "His mother urges him to protect poor people and judge fairly.", "verseScope": {}, "linkNames": [], "chapterIds": [31], "word": {"language": "hebrew", "strongId": "H3927", "key": "Lemuel", "checkedVerses": 2, "example": [31, 1], "hebrew": "לְמוּאֵל", "transliteration": "Lᵉmûwʼêl", "greek": "", "greekNote": "", "sourceIds": ["strong", "oshb"]}}, "lemuel-mother": {"name": "Lemuel’s mother", "role": "Teacher who advises her royal son", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 31:1–9"], "importance": "She tells him to speak for people who cannot defend themselves.", "connections": "She warns against drink that makes rulers forget people’s rights.", "verseScope": {"31": [1]}, "linkNames": ["mother"], "chapterIds": [31]}, "capable-woman-proverbs": {"name": "The capable woman", "role": "Woman praised for work, care, and wise speech", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Proverbs 31:10–31"], "importance": "Her family praises work that supports the household and benefits neighbors.", "connections": "She manages trade, buys a field, plants a vineyard, and helps poor people.", "verseScope": {"31": [10]}, "linkNames": ["worthy woman"], "chapterIds": [31]}};

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

const featurePeople = {"proverbs-1": ["solomon", "david", "parents-proverbs", "wisdom-proverbs"], "proverbs-2": ["unfaithful-woman-proverbs"], "proverbs-3": [], "proverbs-4": ["parents-proverbs"], "proverbs-5": ["unfaithful-woman-proverbs"], "proverbs-6": ["parents-proverbs", "unfaithful-woman-proverbs"], "proverbs-7": ["unfaithful-woman-proverbs", "young-learner-proverbs"], "proverbs-8": ["wisdom-proverbs"], "proverbs-9": ["wisdom-proverbs", "folly-proverbs"], "proverbs-10": ["solomon"], "proverbs-11": [], "proverbs-12": [], "proverbs-13": [], "proverbs-14": [], "proverbs-15": [], "proverbs-16": [], "proverbs-17": [], "proverbs-18": [], "proverbs-19": [], "proverbs-20": [], "proverbs-21": [], "proverbs-22": [], "proverbs-23": [], "proverbs-24": [], "proverbs-25": ["solomon", "hezekiah"], "proverbs-26": [], "proverbs-27": [], "proverbs-28": [], "proverbs-29": [], "proverbs-30": ["agur", "agur-named-men"], "proverbs-31": ["lemuel", "lemuel-mother", "capable-woman-proverbs"]};

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
