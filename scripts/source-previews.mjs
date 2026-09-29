// Shared previews follow sources wherever they appear in the study interface.
const images = {
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
  for (const guide of content.guides) for (const step of guide.steps) {
    delete step.image;
    if (guide.id === 'crisis' && step.verse === 11) step.wordIds = ['aramaic', 'judean'];
  }
}
