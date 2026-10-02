import { readFile, writeFile } from 'node:fs/promises';

// Natural Earth 1:10m rivers, public domain. Keep the map's regional extent.
// Source: https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/
const source = JSON.parse(await readFile(process.argv[2], 'utf8'));
const inside = ([x, y]) => x >= 20 && x <= 57 && y >= 8 && y <= 45;
const features = source.features.flatMap(feature => {
  if (/canal/i.test(feature.properties.name_en || feature.properties.name || '')) return [];
  const lines = feature.geometry.type === 'LineString' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  const parts = [];
  for (const line of lines) {
    let part = [];
    for (let i = 1; i < line.length; i++) {
      if (inside(line[i - 1]) || inside(line[i])) {
        if (!part.length) part.push(line[i - 1]);
        part.push(line[i]);
      } else if (part.length) { parts.push(part); part = []; }
    }
    if (part.length) parts.push(part);
  }
  if (!parts.length) return [];
  return [{ type: 'Feature', properties: { name: feature.properties.name_en || feature.properties.name, rank: feature.properties.scalerank },
    geometry: { type: 'MultiLineString', coordinates: parts } }];
});
await writeFile(new URL('../dist/data/rivers.geojson', import.meta.url), JSON.stringify({ type: 'FeatureCollection', features }));
console.log(`Saved ${features.length} river features.`);
