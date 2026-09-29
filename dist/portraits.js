// Portraits are interpretive illustrations, associated with a story rather than
// presented as a complete succession of rulers for every timeline year.
const people = {
  isaiah: ['Isaiah', 'Prophet in Judah · Isaiah 36–39'],
  hezekiah: ['Hezekiah', 'King of Judah · Isaiah 36–39'],
  sennacherib: ['Sennacherib', 'King of Assyria · Isaiah 36–37'],
  'merodach-baladan': ['Merodach-baladan', 'King of Babylon · Isaiah 39 embassy'],
  nebuchadnezzar: ['Nebuchadnezzar II', 'King of Babylon · exile context'],
  cyrus: ['Cyrus', 'King of Persia · 539 BCE conquest']
};

const featurePeople = {
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
  return `<div class="portrait-group" aria-label="People in this story">${known.map(id => {
    const [name, role] = people[id];
    const linkedRole = role.replace(/Isaiah (\d+)(?:–\d+)?/g, (reference, chapter) =>
      `<a class="scripture-reference" href="https://www.churchofjesuschrist.org/study/scriptures/ot/isa/${chapter}?lang=eng" target="_blank" rel="noopener">${reference}</a>`);
    return `<figure class="person-portrait"><img src="assets/portraits/${id}-v2.png" width="88" height="88" alt="Portrait of ${name}"><figcaption><strong>${name}</strong><span>${linkedRole}</span></figcaption></figure>`;
  }).join('')}</div>`;
}

export function featurePortraits(feature) {
  const ids = featurePeople[feature.id] || featurePeople[feature.faction] || [];
  return portraitsHtml(ids);
}

export function wordPortraits(label = '') {
  const id = label.toLowerCase().replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
  const aliases = { judah: ['hezekiah', 'isaiah'], assyria: ['sennacherib'], babylon: ['merodach-baladan'] };
  return portraitsHtml(people[id] ? [id] : aliases[id] || []);
}
