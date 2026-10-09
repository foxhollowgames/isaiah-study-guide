// Check the map layers that scripts/book_maps.py adds to every added book.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const read = async path => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const config = await read('./book-map-context.json');
const directory = await read('../dist/data/books/directory.json');
const builtIn = new Set(['judah','philistia','egypt','cush','assyria','babylonia','persian']);
const words = text => (text.match(/[\w’'-]+/g) || []).length;
const short = (text, label) => {
  for (const sentence of text.split(/(?<=[.!?])(?:[”"’']\s+|\s+)/)) assert(words(sentence) <= 15, `${label}: long sentence: ${sentence}`);
};
const coordinate = ([lat, lng], label) => assert(Number.isFinite(lat) && Number.isFinite(lng) && lat >= 8 && lat <= 48 && lng >= 1 && lng <= 57, `${label}: point outside the map`);

// Authored notes: two short sentences at most for a nation, and a real limit for each shape.
for (const [id, region] of Object.entries(config.regions)) {
  for (const key of ['name','faction','pattern','summary','uncertainty']) assert(region[key], `Region ${id} needs ${key}`);
  assert(builtIn.has(region.faction) || config.factions[region.faction], `Region ${id} has no color for ${region.faction}`);
  assert(region.points || region.isaiahRegion || region.atlas, `Region ${id} needs a shape`);
  new RegExp(region.pattern, 'i');
  short(region.summary, `Region ${id}`); short(region.uncertainty, `Region ${id}`);
  assert(!/shaded area|the map shows/i.test(region.summary), `Region ${id} must describe the land, not the drawing`);
}
for (const [era, notes] of Object.entries(config.eras)) for (const [id, text] of Object.entries(notes)) {
  assert(config.regions[id], `Era ${era} names unknown region ${id}`); short(text, `Era ${era} ${id}`);
}
for (const road of config.roads) for (const key of ['summary','detail','uncertainty']) short(road[key], `Road ${road.id}`);
const reviewed = new Set(config.wikipedia.map(row => row[0]));
assert.equal(reviewed.size, config.wikipedia.length, 'Each encyclopedia article is listed once');
for (const [id, article, revision, summary] of config.wikipedia) { assert(/^\d+$/.test(revision), `${id} needs a reviewed revision`); assert(article && summary); short(summary, id); }

let books = 0, regions = 0, roads = 0, areas = 0;
for (const entry of directory) {
  if (entry.status !== 'ready' || entry.id === 'isaiah') continue;
  const data = await read(`../dist/data/books/${entry.id}-native-content.json`);
  const scripture = await read(`../dist/data/books/${entry.id}-native-scripture.json`);
  const app = await readFile(new URL(`../dist/book-${entry.id}-app.js`, import.meta.url), 'utf8');
  const sources = new Map(data.sources.map(source => [source.id, source]));
  assert.equal(sources.size, data.sources.length, `${entry.id}: duplicate source id`);
  const chapters = new Set(data.chapterMaps.map(item => item.chapter));
  const cfg = config.books[entry.id] || {};
  const label = `${entry.id}`;
  assert(app.includes('region.chapterCoverage.includes(state.chapter)'), `${label}: nations must follow the open chapter`);
  assert.equal(new Set(data.regions.map(r => r.id)).size, data.regions.length, `${label}: duplicate region id`);
  assert.equal(!!data.regions.length, !!cfg.nations, `${label}: nations must match the map file`);
  assert.equal(!!data.ancientRoads.length, !!cfg.roads, `${label}: roads must match the map file`);
  for (const region of data.regions) {
    assert(region.name && region.summary && region.detail && region.uncertainty && region.color && region.pattern, `${label}: region ${region.id} is missing text`);
    assert(region.summary !== region.detail, `${label}: region ${region.id} repeats its summary`);
    assert(region.points.length >= 3, `${label}: region ${region.id} needs a shape`); region.points.forEach(p => coordinate(p, `${label} ${region.id}`));
    assert(region.chapterCoverage.length && region.chapterCoverage.every(n => chapters.has(n)), `${label}: region ${region.id} has a chapter outside the book`);
    assert(builtIn.has(region.faction) || data.factions?.[region.faction], `${label}: region ${region.id} has no legend entry`);
    for (const id of region.sourceIds) assert(sources.has(id), `${label}: region ${region.id} cites missing source ${id}`);
    short(region.detail, `${label} ${region.id}`);
    // A note that names this book and a chapter must point inside the book.
    for (const [, n] of region.detail.matchAll(new RegExp(`${entry.name.replace(/^(\d) /, '(?:$1|First|Second) ')} (\\d+)`, 'g'))) assert(scripture.chapters[n], `${label}: region ${region.id} cites missing chapter ${n}`);
    regions++;
  }
  // Two notes for one land must not show in the same chapter.
  for (const chapter of chapters) {
    const shown = data.regions.filter(r => r.chapterCoverage.includes(chapter)).map(r => r.baseId);
    assert.equal(new Set(shown).size, shown.length, `${label} ${chapter}: one land has two notes`);
  }
  assert.equal(new Set(data.ancientRoads.map(r => r.id)).size, data.ancientRoads.length, `${label}: duplicate road id`);
  for (const road of data.ancientRoads) {
    assert(['strong','probable'].includes(road.confidence), `${label}: road ${road.id} needs a confidence level`);
    assert(road.title && road.summary && road.detail && road.uncertainty, `${label}: road ${road.id} is missing text`);
    assert(!/Isaiah|eighth-century|701 BCE/.test(road.summary + road.detail + road.uncertainty), `${label}: road ${road.id} keeps Isaiah-only wording`);
    assert(road.points.length >= 2); road.points.forEach(p => coordinate(p, `${label} ${road.id}`));
    for (const id of road.sourceIds) assert(sources.has(id), `${label}: road ${road.id} cites missing source ${id}`);
    roads++;
  }
  const places = new Map(data.places.map(place => [place.id, place]));
  for (const area of data.narrativeRegions) {
    assert(area.narrativeRegion && places.has(area.placeId) && area.summary && area.points.length >= 4, `${label}: area ${area.id} is incomplete`);
    assert(data.chapterMaps.some(item => item.placeIds.includes(area.placeId)), `${label}: area ${area.id} never shows`);
    assert(sources.has('geo'), `${label}: atlas source is missing`);
    areas++;
  }
  for (const id of reviewed) if (sources.has(id)) assert(sources.get(id).revisionUrl.endsWith(sources.get(id).revisionId), `${label}: ${id} must link to the reviewed revision`);
  if (data.regions.length || data.ancientRoads.length || data.narrativeRegions.length) books++;
}
for (const id of Object.keys(config.books)) assert(directory.some(entry => entry.id === id && entry.status === 'ready'), `Map file names unknown book ${id}`);
console.log(`Book maps passed: ${books} books, ${regions} nation notes, ${roads} road records, ${areas} atlas areas.`);
