const bookArt = {"jesus": {"src": "assets/portraits/matthew/jesus.png", "generated": true, "title": "Jesus of Nazareth · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-mother": {"src": "assets/portraits/matthew/mary-mother.png", "generated": true, "title": "Mary, mother of Jesus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "john-baptizer": {"src": "assets/portraits/matthew/john-baptizer.png", "generated": true, "title": "John the Baptizer · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "peter": {"src": "assets/portraits/matthew/peter.png", "generated": true, "title": "Simon Peter · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "mary-magdalene": {"src": "assets/portraits/matthew/mary-magdalene.png", "generated": true, "title": "Mary Magdalene · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for the selected first-century Gospel profile."}, "nicodemus": {"src": "assets/portraits/john/nicodemus.png", "generated": true, "title": "Nicodemus · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for this selected first-century Gospel profile."}, "thomas": {"src": "assets/portraits/john/thomas.png", "generated": true, "title": "Thomas · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for this selected first-century Gospel profile."}, "martha": {"src": "assets/portraits/john/martha.png", "generated": true, "title": "Martha of Bethany · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for this selected first-century Gospel profile."}, "mary-bethany": {"src": "assets/portraits/john/mary-bethany.png", "generated": true, "title": "Mary of Bethany · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for this selected first-century Gospel profile."}, "lazarus": {"src": "assets/portraits/john/lazarus.png", "generated": true, "title": "Lazarus of Bethany · interpretive portrait", "credit": "AI-generated illustration", "license": "Generated artwork", "note": "Interpretive appearance for this selected first-century Gospel profile."}};
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
export const people = {"jesus": {"name": "Jesus of Nazareth", "role": "Person presented as the Word made flesh and the Son of God", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 1–21"], "importance": "Signs and words lead toward his death, resurrection, and the task of testimony.", "connections": "His mother and brothers appear in the account. The beloved disciple receives care for his mother.", "verseScope": {}, "linkNames": ["Jesus"], "chapterIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]}, "mary-mother": {"name": "Mary, mother of Jesus", "role": "Mother present at the wedding and cross", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 2:1–12; 19:25–27"], "importance": "Her request at the wedding and presence at the cross connect need with continued care.", "connections": "The account does not give her personal name. Jesus joins her care with the beloved disciple.", "verseScope": {"19": [25, 26, 27]}, "linkNames": [], "chapterIds": [2, 19]}, "john-baptizer": {"name": "John the Baptizer", "role": "Witness who directs his own followers toward Jesus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 1; 3:23–30; 4:1; 5:33–36; 10:40–41"], "importance": "He refuses the Christ title and describes joy when Jesus increases.", "connections": "His disciples question the growth of Jesus’ following.", "verseScope": {"1": [6, 15, 19, 26, 28, 32, 35, 40], "3": [23, 24, 25, 26, 27], "4": [1], "5": [33, 36], "10": [40, 41]}, "linkNames": ["John"], "chapterIds": [1, 3, 4, 5, 10]}, "peter": {"name": "Simon Peter", "role": "Disciple who confesses, resists washing, denies, and receives a renewed task", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 1; 6; 13; 18; 20–21"], "importance": "Three questions about love connect his renewed following with feeding the flock.", "connections": "Andrew is his brother. John names his father as Jonah.", "verseScope": {"1": [40, 42, 44], "6": [8, 68], "13": [6, 8, 9, 24, 36, 37], "18": [10, 11, 15, 16, 17, 18, 25, 26, 27], "20": [2, 3, 4, 6], "21": [2, 3, 7, 11, 15, 17, 20, 21]}, "linkNames": ["Peter", "Simon Peter"], "chapterIds": [1, 6, 13, 18, 20, 21]}, "mary-magdalene": {"name": "Mary Magdalene", "role": "Witness at the cross who reports seeing the risen Jesus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 19:25; 20:1–18"], "importance": "Hearing her name changes her mistaken recognition and leads to her testimony.", "connections": "John distinguishes her from Jesus’ mother, Mary of Clopas, and Mary of Bethany.", "verseScope": {"19": [25], "20": [1, 11, 16, 18]}, "linkNames": ["Mary Magdalene"], "chapterIds": [19, 20]}, "nicodemus": {"name": "Nicodemus", "role": "Teacher and council member who visits Jesus at night", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 3; 7:50–52; 19:39"], "importance": "His appearances move from questions toward a hearing request and public burial care.", "connections": "He later requests a lawful hearing and brings spices for burial.", "verseScope": {}, "linkNames": ["Nicodemus"], "chapterIds": [3, 7, 19]}, "thomas": {"name": "Thomas", "role": "Disciple who asks questions and later confesses Jesus as Lord and God", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 11:16; 14:5; 20:24–29; 21:2"], "importance": "His absence from one appearance makes another encounter address the problem of unseen testimony.", "connections": "John also calls him Didymus. He joins the later fishing group.", "verseScope": {}, "linkNames": ["Thomas", "Didymus"], "chapterIds": [11, 14, 20, 21]}, "martha": {"name": "Martha of Bethany", "role": "Woman who confesses Jesus as the Christ before Lazarus leaves the tomb", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 11; 12:2"], "importance": "Her confession remains beside grief and a practical objection about the body after four days.", "connections": "Mary is her sister, and Lazarus is her brother.", "verseScope": {}, "linkNames": ["Martha"], "chapterIds": [11, 12]}, "mary-bethany": {"name": "Mary of Bethany", "role": "Woman who mourns her brother and later anoints Jesus", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 11–12"], "importance": "Her tears and costly gift place grief and preparation for burial beside restored life.", "connections": "Martha is her sister, and Lazarus is her brother. She is not Mary Magdalene.", "verseScope": {"11": [1, 2, 19, 20, 28, 31, 32, 45], "12": [3]}, "linkNames": ["Mary"], "chapterIds": [11, 12]}, "lazarus": {"name": "Lazarus of Bethany", "role": "Man whom Jesus calls from the tomb", "life": "Birth and death years are not securely known.", "dateNote": "Historical life dates remain uncertain.", "locations": [], "passages": ["John 11–12"], "importance": "His restored life brings both belief and another plan for killing. He is not Luke’s story character.", "connections": "Martha and Mary are his sisters. He later shares the meal at Bethany.", "verseScope": {}, "linkNames": ["Lazarus"], "chapterIds": [11, 12]}};

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

const featurePeople = {"john-1": ["jesus", "john-baptizer", "peter"], "john-2": ["jesus", "mary-mother"], "john-3": ["jesus", "john-baptizer", "nicodemus"], "john-4": ["jesus", "john-baptizer"], "john-5": ["jesus", "john-baptizer"], "john-6": ["jesus", "peter"], "john-7": ["jesus", "nicodemus"], "john-8": ["jesus"], "john-9": ["jesus"], "john-10": ["jesus", "john-baptizer"], "john-11": ["jesus", "thomas", "martha", "mary-bethany", "lazarus"], "john-12": ["jesus", "martha", "mary-bethany", "lazarus"], "john-13": ["jesus", "peter"], "john-14": ["jesus", "thomas"], "john-15": ["jesus"], "john-16": ["jesus"], "john-17": ["jesus"], "john-18": ["jesus", "peter"], "john-19": ["jesus", "mary-mother", "mary-magdalene", "nicodemus"], "john-20": ["jesus", "peter", "mary-magdalene", "thomas"], "john-21": ["jesus", "peter", "thomas"]};

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
