// Portraits illustrate people in each story. They do not establish actual appearance.
let portraitMode = 'generated';
let licensedImages = {};
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));

export function setPortraitMode(mode, images) {
  portraitMode = mode === 'non-generated' ? mode : 'generated';
  if (images) licensedImages = images;
  // Replace only portrait groups so open panels keep their content and position.
  document.querySelectorAll('.portrait-group[data-people]').forEach(group => {
    group.outerHTML = portraitsHtml(group.dataset.people.split(','));
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
const people = {
  rezin: ['Rezin', 'King of Aram-Damascus · Isaiah 7–9'],
  ahaz: ['Ahaz', 'King of Judah · Isaiah 7'],
  pekah: ['Pekah', 'King of Israel · Isaiah 7'],
  uzziah: ['Uzziah', 'King of Judah · Isaiah 1; Isaiah 6'],
  jotham: ['Jotham', 'King of Judah · Isaiah 1; Isaiah 7'],
  david: ['David', 'King whose royal house is named · Isaiah 7'],
  isaiah: ['Isaiah', 'Prophet in Judah · Isaiah 36–39'],
  hezekiah: ['Hezekiah', 'King of Judah · Isaiah 36–39'],
  sennacherib: ['Sennacherib', 'King of Assyria · Isaiah 36–37'],
  'merodach-baladan': ['Merodach-baladan', 'King of Babylon · Isaiah 39 embassy'],
  nebuchadnezzar: ['Nebuchadnezzar II', 'King of Babylon · exile context'],
  cyrus: ['Cyrus', 'King of Persia · 539 BCE conquest']
};

const featurePeople = {
  'aram-against-judah': ['rezin', 'ahaz'],
  'israel-against-judah': ['pekah', 'ahaz'],
  judah: ['hezekiah', 'isaiah'], jerusalem: ['hezekiah', 'isaiah'],
  assyria: ['sennacherib'], nineveh: ['sennacherib'],
  lachish: ['sennacherib'], 'lachish-mission': ['sennacherib'],
  'west-campaign': ['sennacherib'], 'sargon-death': ['sennacherib'],
  western701: ['sennacherib', 'hezekiah'], 'lachish-art': ['sennacherib'],
  death681: ['sennacherib'], babylon703: ['merodach-baladan', 'sennacherib'],
  'babylon-envoys-route': ['merodach-baladan', 'hezekiah'],
  babylon: ['merodach-baladan', 'nebuchadnezzar'],
  'babylonia-early': ['merodach-baladan'],
  babylonia: ['nebuchadnezzar'], 'exile-horizon': ['nebuchadnezzar'],
  carchemish605: ['nebuchadnezzar'], jerusalem597: ['nebuchadnezzar'],
  jerusalem586: ['nebuchadnezzar'], persian: ['cyrus'], cyrus539: ['cyrus'], susa: ['cyrus']
};

export function portraitsHtml(ids = []) {
  const known = [...new Set(ids)].filter(id => people[id]);
  if (!known.length) return '';
  return `<div class="portrait-group" data-people="${known.join(',')}" aria-label="People in this story">${known.map(id => {
    const [name, role] = people[id];
    const linkedRole = role.replace(/Isaiah (\d+)(?:–\d+)?/g, (reference, chapter) =>
      `<a class="scripture-reference" href="https://www.churchofjesuschrist.org/study/scriptures/ot/isa/${chapter}?lang=eng" target="_blank" rel="noopener">${reference}</a>`);
    const image = portraitMode === 'non-generated' ? licensedImages[id] : { src: `assets/portraits/${id}-v2.png` };
    const hue = [...id].reduce((sum, c) => sum + c.charCodeAt(0), 0) % 360;
    const credit = image?.sourceUrl ? `<small class="portrait-credit"><a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener">${escapeHtml(image.credit)}</a> · <a href="${escapeHtml(image.licenseUrl)}" target="_blank" rel="noopener">${escapeHtml(image.license)}</a> · Cropped</small>` : '';
    return `<figure class="person-portrait"><div class="portrait-art" style="--portrait-hue:${hue}"><span class="portrait-initial" role="img" aria-label="${name}: no portrait available" ${image ? 'aria-hidden="true"' : ''}>${name[0]}</span>${image ? `<img src="${escapeHtml(image.src)}" width="88" height="88" alt="${portraitMode === 'non-generated' ? 'Historical depiction' : 'Generated illustration'} of ${name}">` : ''}</div><figcaption><strong>${name}</strong><span>${linkedRole}</span>${credit}</figcaption></figure>`;
  }).join('')}</div>`;
}

export function featurePortraits(feature) {
  const ids = featurePeople[feature.id] || featurePeople[feature.faction] || [];
  return portraitsHtml(ids);
}

export function wordPortraits(label = '') {
  const id = label.toLowerCase().replace(/[‐‑–—]/g, '-').replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
  const aliases = { judah: ['hezekiah', 'isaiah'], assyria: ['sennacherib'], babylon: ['merodach-baladan'] };
  return portraitsHtml(people[id] ? [id] : aliases[id] || []);
}
