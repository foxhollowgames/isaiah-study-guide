// Show source images and verified excerpts beside the explanations they support.
const images = {
  "prism-taylor": {
    "src": "assets/taylor-prism.jpg",
    "fullUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Taylor_Prism-3.jpg",
    "alt": "Two views of the Taylor Prism with columns of cuneiform writing on clay.",
    "caption": "Taylor Prism · two views of the same object, British Museum",
    "credit": "Photographs and montage by David Castor",
    "creditUrl": "https://commons.wikimedia.org/wiki/User:Dcastor",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Taylor_Prism-3.jpg",
    "license": "Public domain · creator’s release",
    "licenseUrl": "https://commons.wikimedia.org/wiki/File:Taylor_Prism-3.jpg#Licensing",
    "width": 2670,
    "height": 2208,
    "linkLabel": "View full-size prism"
  },
  "lachish": {
    "src": "assets/lachish-relief.jpg",
    "fullUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c9/Lachish_Relief%2C_British_Museum_7.jpg",
    "alt": "Lachish relief showing Sennacherib seated on his throne with attendants.",
    "caption": "Sennacherib on his throne · Lachish relief, British Museum",
    "credit": "Photograph by Mike Peel",
    "creditUrl": "https://www.mikepeel.net",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Lachish_Relief,_British_Museum_7.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/",
    "width": 2592,
    "height": 3888,
    "linkLabel": "View full-size relief"
  },
  "cyrus": {
    "src": "assets/cyrus-cylinder.jpg",
    "fullUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Cyrus_Cylinder_BM_ME90920.jpg",
    "alt": "The clay Cyrus Cylinder covered with cuneiform writing.",
    "caption": "Cyrus Cylinder · British Museum",
    "width": 3300,
    "height": 1650,
    "linkLabel": "View full-size image",
    "credit": "Photograph by Marie-Lan Nguyen / Wikimedia Commons",
    "creditUrl": "https://commons.wikimedia.org/wiki/User:Jastrow",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cyrus_Cylinder_BM_ME90920.jpg",
    "license": "CC BY 2.5",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.5/"
  }
};
export function addSourcePreviews(content) {
  for (const source of content.sources) if (images[source.id]) source.image = images[source.id];
  const annals = content.sources.find(source => source.id === 'prism-luckenbill');
  if (annals) annals.excerpt = {
    text: 'Himself, like a caged bird I shut up in Jerusalem his royal city.',
    attribution: 'Sennacherib’s royal account · translated by Daniel David Luckenbill (1924)',
    location: 'Chicago Prism, column III, lines 27–28 · printed page 33',
    url: 'https://isac-assets.s3.amazonaws.com/isac-publications/oip2.pdf#page=47',
    context: 'The king describes Hezekiah confined in Jerusalem. This royal claim does not report the city’s capture. The translation is from the Chicago Prism; the photograph shows the separate Taylor Prism.',
    checked: '2026-09-29: wording checked against the university PDF, printed page 33.'
  };
  const previewNotes = {
    'prism-taylor': 'This clay prism tells King Sennacherib’s story. Its words use wedge-shaped marks. The prism was made in 691 BCE. That was ten years after the war.',
    lachish: 'The wall picture shows King Sennacherib on his throne. He gets goods taken from Lachish. The picture tells the story from Assyria’s side.',
    cyrus: 'The cylinder records Cyrus’s support for restoring worship. It does not name Judah’s returning exiles.'
  };
  for (const source of content.sources) if (previewNotes[source.id]) source.previewText = previewNotes[source.id];
  // Add the objects used to explain the campaign, not every source about Assyria.
  for (const item of [...content.campaigns, ...content.events, ...content.places]) {
    if (item.sourceIds?.includes('rinap')) item.sourceIds = [...new Set([...item.sourceIds, 'prism-taylor', 'prism-luckenbill'])];
    if (item.id === 'west-campaign') item.sourceIds = [...new Set([...item.sourceIds, 'lachish'])];
  }
  for (const guide of content.guides) for (const step of guide.steps) {
    delete step.image;
    if (guide.id === 'crisis' && step.verse === 11) step.wordIds = ['aramaic', 'judean'];
  }
}
