const bookArt = {"jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-mother": {"src": "assets/portraits/matthew/mary-mother.png", "generated": true, "title": "Mary, mother of Jesus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "thomas": {"src": "assets/portraits/john/thomas.png", "generated": true, "title": "Thomas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for this selected first-century Gospel profile."}, "paul": {"src": "assets/portraits/acts/paul.png", "generated": true, "title": "Paul, also called Saul · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "barnabas": {"src": "assets/portraits/acts/barnabas.png", "generated": true, "title": "Barnabas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "stephen": {"src": "assets/portraits/acts/stephen.png", "generated": true, "title": "Stephen · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "philip-evangelist": {"src": "assets/portraits/acts/philip-evangelist.png", "generated": true, "title": "Philip the evangelist · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "lydia": {"src": "assets/portraits/acts/lydia.png", "generated": true, "title": "Lydia · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "priscilla": {"src": "assets/portraits/acts/priscilla.png", "generated": true, "title": "Priscilla · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "aquila": {"src": "assets/portraits/acts/aquila.png", "generated": true, "title": "Aquila · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "cornelius": {"src": "assets/portraits/acts/cornelius.png", "generated": true, "title": "Cornelius · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "tabitha": {"src": "assets/portraits/acts/tabitha.png", "generated": true, "title": "Tabitha also called Dorcas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}, "silas": {"src": "assets/portraits/acts/silas.png", "generated": true, "title": "Silas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for a selected first-century Acts profile."}};
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
export const people = {"jesus": {"name": "Jesus of Nazareth", "role": "Risen teacher who directs witnesses before his departure", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 1–28"], "importance": "His name connects witness, healing, disputed hearings, and the message carried to Rome.", "connections": "The apostles testify about him. Saul’s encounter changes his task.", "verseScope": {"13": [33]}, "linkNames": ["Jesus"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]}, "mary-mother": {"name": "Mary, mother of Jesus", "role": "Mother of Jesus who joins the opening prayer group", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 1:14"], "importance": "Her presence connects the waiting group with Jesus’ earlier family story.", "connections": "She prays with the apostles, other women, and Jesus’ brothers.", "verseScope": {"1": [14]}, "linkNames": ["Mary"], "chapterIds": [1]}, "peter": {"name": "Simon Peter", "role": "Apostle who speaks publicly and enters Cornelius’ household", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 1–12; 15"], "importance": "His remembered experience helps the Jerusalem meeting consider the shared gift of the Spirit.", "connections": "John accompanies his early witness. Other believers question his meal with Gentiles.", "verseScope": {}, "linkNames": ["Peter", "Simon Peter"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15]}, "thomas": {"name": "Thomas", "role": "Apostle listed among the group waiting in Jerusalem", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 1:13"], "importance": "His place in the opening group connects Acts with the earlier resurrection witnesses.", "connections": "He shares the upper room with the other named apostles.", "verseScope": {}, "linkNames": ["Thomas"], "chapterIds": [1]}, "paul": {"name": "Paul, also called Saul", "role": "Former persecutor who becomes a traveling witness", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 7–28"], "importance": "His hearings and captivity carry witness into settings his earlier plans did not control.", "connections": "Barnabas supports his welcome. Silas and Timothy later travel with him.", "verseScope": {"13": [1, 2, 7, 9, 13, 16, 43, 45, 46, 50]}, "linkNames": ["Paul", "Saul"], "chapterIds": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]}, "barnabas": {"name": "Barnabas", "role": "Cypriot Levite who gives money and supports other believers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 4; 9; 11–15"], "importance": "His encouragement connects shared material care with trust in a former opponent.", "connections": "He introduces Saul and later travels with him. Mark joins their service.", "verseScope": {}, "linkNames": ["Barnabas", "Joses"], "chapterIds": [4, 9, 11, 12, 13, 14, 15]}, "stephen": {"name": "Stephen", "role": "One of seven selected men who speaks before the council", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 6–8; 11:19; 22:20"], "importance": "His speech follows rejected helpers before his own refusal to answer violence with revenge.", "connections": "Other believers bury him after his death. Saul watches the stoning.", "verseScope": {}, "linkNames": ["Stephen"], "chapterIds": [6, 7, 8, 11, 22]}, "philip-evangelist": {"name": "Philip the evangelist", "role": "One of the seven who teaches in Samaria and explains Isaiah", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 6; 8; 21"], "importance": "His explanation begins with another reader’s question and leads toward Jesus and baptism.", "connections": "He has four daughters who prophesy. His house later welcomes Paul’s group.", "verseScope": {}, "linkNames": ["Philip"], "chapterIds": [6, 8, 21]}, "lydia": {"name": "Lydia", "role": "Seller of purple who welcomes the visiting teachers", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 16:14–15, 40"], "importance": "Her invitation provides a household setting for the growing group after the riverside meeting.", "connections": "Her household receives baptism. Believers later gather at her house.", "verseScope": {}, "linkNames": ["Lydia"], "chapterIds": [16]}, "priscilla": {"name": "Priscilla", "role": "Teacher and craft worker who helps Apollos learn more accurately", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 18"], "importance": "Her shared explanation turns Apollos’ incomplete preparation toward useful teaching among other believers.", "connections": "Aquila is her husband. They work and travel with Paul.", "verseScope": {}, "linkNames": ["Priscilla"], "chapterIds": [18]}, "aquila": {"name": "Aquila", "role": "Jewish craft worker from Pontus who shares Paul’s trade", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 18"], "importance": "Work, housing, and private instruction connect his household with the wider teaching task.", "connections": "Priscilla is his wife. They teach Apollos together.", "verseScope": {}, "linkNames": ["Aquila"], "chapterIds": [18]}, "cornelius": {"name": "Cornelius", "role": "Roman officer whose household receives Peter and the Spirit", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 10"], "importance": "His earlier prayers and generosity stand beside the surprising gift witnessed by Peter’s companions.", "connections": "He gathers relatives and close friends. Servants bring Peter from Joppa.", "verseScope": {}, "linkNames": ["Cornelius"], "chapterIds": [10]}, "tabitha": {"name": "Tabitha, also called Dorcas", "role": "Disciple remembered for good works and clothing made for others", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 9:36–42"], "importance": "The mourners’ displayed garments make her care visible before Peter presents her alive.", "connections": "Widows show Peter the garments she made before her death.", "verseScope": {}, "linkNames": ["Tabitha", "Dorcas"], "chapterIds": [9]}, "silas": {"name": "Silas", "role": "Jerusalem messenger who later travels and suffers with Paul", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["Acts 15–18"], "importance": "Spoken encouragement supports the letter before prison tests his continued witness with Paul.", "connections": "Judas carries the meeting’s letter with him. Timothy joins the later journey.", "verseScope": {}, "linkNames": ["Silas"], "chapterIds": [15, 16, 17, 18]}};

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

const featurePeople = {"acts-1": ["jesus", "peter", "mary-mother", "thomas"], "acts-2": ["jesus", "peter"], "acts-3": ["jesus", "peter"], "acts-4": ["jesus", "peter", "barnabas"], "acts-5": ["jesus", "peter"], "acts-6": ["jesus", "peter", "stephen", "philip-evangelist"], "acts-7": ["jesus", "peter", "paul", "stephen"], "acts-8": ["jesus", "peter", "paul", "stephen", "philip-evangelist"], "acts-9": ["jesus", "peter", "paul", "barnabas", "tabitha"], "acts-10": ["jesus", "peter", "paul", "cornelius"], "acts-11": ["jesus", "peter", "paul", "barnabas", "stephen"], "acts-12": ["jesus", "peter", "paul", "barnabas"], "acts-13": ["jesus", "paul", "barnabas"], "acts-14": ["jesus", "paul", "barnabas"], "acts-15": ["jesus", "peter", "paul", "barnabas", "silas"], "acts-16": ["jesus", "paul", "lydia", "silas"], "acts-17": ["jesus", "paul", "silas"], "acts-18": ["jesus", "paul", "priscilla", "aquila", "silas"], "acts-19": ["jesus", "paul"], "acts-20": ["jesus", "paul"], "acts-21": ["jesus", "paul", "philip-evangelist"], "acts-22": ["jesus", "paul", "stephen"], "acts-23": ["jesus", "paul"], "acts-24": ["jesus", "paul"], "acts-25": ["jesus", "paul"], "acts-26": ["jesus", "paul"], "acts-27": ["jesus", "paul"], "acts-28": ["jesus", "paul"]};

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
