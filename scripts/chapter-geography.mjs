import { readFile } from 'node:fs/promises';
import { addNarrativeGeography } from './narrative-geography.mjs';
import { refineWikipediaGeography, addWikipediaEnrichment } from './wikipedia-enrichment.mjs';
import { applyMapDescriptions } from './map-descriptions.mjs';

// Reviewed chapter emphasis. Secondary references do not force a continent-wide view.
const focusRows = `
1 jerusalem
2 jerusalem
3 jerusalem
4 jerusalem
5 jerusalem
6 jerusalem
7 jerusalem samaria damascus
8 jerusalem samaria damascus
9 galilee samaria
10 aiath michmash geba nob jerusalem
11 jerusalem moab edom assyria egypt
12 jerusalem
13 babylon media
14 babylon philistia jerusalem
15 dibon heshbon elealeh nebo moab zoar
16 heshbon sibmah kir-hareseth jerusalem
17 damascus samaria aroer
18 cush jerusalem
19 egypt memphis zoan
20 ashdod egypt cush
21 babylon elam media dedan tema
22 jerusalem
23 tyre sidon cyprus
24 jerusalem
25 jerusalem moab
26 jerusalem
27 jerusalem euphrates egypt
28 samaria jerusalem
29 jerusalem
30 jerusalem zoan hanes
31 jerusalem egypt
32 jerusalem
33 jerusalem
34 edom bozrah
35 sharon mount-carmel jerusalem
36 lachish jerusalem
37 jerusalem lachish libnah
38 jerusalem
39 babylon jerusalem
40 jerusalem
41 jerusalem
42 kedar sela
43 babylon jerusalem egypt cush
44 jerusalem
45 babylon jerusalem
46 babylon
47 babylon
48 babylon jerusalem
49 jerusalem
50 jerusalem
51 jerusalem
52 jerusalem
53 jerusalem
54 jerusalem
55 jerusalem
56 jerusalem
57 jerusalem
58 jerusalem
59 jerusalem
60 jerusalem midian sheba kedar lebanon
61 jerusalem
62 jerusalem
63 edom bozrah
64 jerusalem
65 jerusalem sharon valley-of-achor
66 jerusalem
`;

export async function addChapterGeography(data, scripture) {
  const kml = await readFile(new URL('./isaiah-geography.kml', import.meta.url), 'utf8');
  data.places = data.places.filter(p => !p.chapterLocation);
  const geoSource = data.sources.find(s => s.id === 'geo');
  if (geoSource) geoSource.license = 'OpenBible.info geographic dataset: Creative Commons Attribution. Some data © OpenStreetMap contributors under their open license. Representative locations selected from the Isaiah KML; alternatives may exist.';
  const candidates = new Map();
  data.narrativeRegions = [];
  for (const [placemark] of kml.matchAll(/<Placemark>[\s\S]*?<\/Placemark>/g)) {
    const label = placemark.match(/<name>(.*?)<\/name>/)?.[1];
    const areaName = label?.replace(/ \d+| \([^)]*\)/g, '');
    if (['Moab','Edom','Philistia','Galilee','Assyria','Cush','Elam','Midian','Lebanon'].includes(areaName) && !data.narrativeRegions.some(r=>r.name===areaName)) {
      const ring = placemark.match(/<outerBoundaryIs>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>/)?.[1];
      if (ring) {
        const points = ring.trim().split(/\s+/).map(pair=>{const [lng,lat]=pair.split(',').map(Number);return [lat,lng];});
        data.narrativeRegions.push({id:`geographic:${areaName.toLowerCase()}`,placeId:areaName.toLowerCase(),name:areaName,points,
          narrativeRegion:true,summary:`Geographic setting of ${areaName}, based on the OpenBible atlas.`,sourceIds:['geo']});
      }
    }
    const coordinate = placemark.match(/<Point>\s*<coordinates>(.*?)<\/coordinates>/)?.[1];
    if (!label || !coordinate) continue;
    const name = label.split(' / ')[0].replace(/ \d+| \([^)]*\)/g, '');
    const [lng, lat] = coordinate.split(',').map(Number);
    if (!candidates.has(name)) candidates.set(name, { name, lat, lng, identification: label });
  }
  const aliases = { 'beer-elim':['Beer Elim'], 'eglath-shelishiyah':['Eglath Shelishiyah'], sela:['Selah'], cush:['Ethiopia'], media:['Medes'], 'kir-hareseth':['Kir Hareseth','Kir Heres'], jerusalem: ['Jerusalem','Zion','Ariel'], harran: ['Haran'], 'calneh': ['Calno'], 'negeb': ['South'], 'mount-carmel': ['Carmel'], 'mount-seir': ['Seir'] };
  // Exclude unidentified sites, duplicate synonyms, and names used chiefly as people.
  const names = 'Aiath,Anathoth,Ar,Arnon,Aroer,Ashdod,Assyria,Bashan,Beer-elim,Bozrah,Calneh,Cush,Cyprus,Dedan,Dibon,Edom,Egypt,Elam,Elealeh,Euphrates,Galilee,Geba,Gibeah,Hanes,Heshbon,Horonaim,Jahaz,Jazer,Kedar,Kir-hareseth,Lebanon,Luhith,Medeba,Media,Memphis,Michmash,Midian,Migron,Moab,Mount Carmel,Mount Seir,Nebo,Negeb,Nile,Nimrim,Nob,Pathros,Philistia,Ramah,Rezeph,Sela,Sharon,Sheba,Sibmah,Sidon,Syene,Tema,Topheth,Tyre,Valley of Achor,Zoan,Zoar'.split(',');
  for (const name of [...names,'Brook of the Willows','Eglaim','Eglath-shelishiyah','Javan','Lud','Tubal']) {
    const id = name.toLowerCase().replaceAll(' ', '-');
    if (data.places.some(p => p.id === id)) continue;
    const candidate = candidates.get(name);
    if (!candidate) throw Error(`Missing geographic source: ${name}`);
    const terms = [name, ...(aliases[id] || []), ...(id === 'dedan' ? ['Dedanites'] : []), ...(id === 'cyprus' ? ['Kittim'] : [])];
    const references = Object.entries(scripture.chapters).flatMap(([chapter, verses]) => verses.filter(v => terms.some(term => new RegExp(`\\b${term}\\b`, 'i').test(v.text))).map(v => ({chapter:Number(chapter), verse:v.verse})));
    if (!references.length) continue;
    const first = references[0];
    data.places.push({ id, name, lat:candidate.lat, lng:candidate.lng,
      summary:`Geographic reference for Isaiah ${first.chapter}:${first.verse}. ${candidate.identification}.`,
      ...first, sourceIds:['geo', `web${first.chapter === 36 ? '' : first.chapter}`], aliases:terms, chapterLocation:true });
  }
  data.textRoutes = [];
  const route = (id, title, placeIds, chapter, verse, summary) => {
    const points = placeIds.map(id => { const p = data.places.find(p => p.id === id); if (!p) throw Error(id); return [p.lat,p.lng]; });
    data.textRoutes.push({id,title,points,chapter,verse,summary,sourceIds:['geo',`web${chapter === 36 ? '' : chapter}`],
      uncertainty:'Schematic connection of named places. The exact road and some site identifications are uncertain.', textRoute:true});
  };
  route('northern-approach','The approach toward Zion',['aiath','migron','michmash','geba','nob'],10,28,'Isaiah 10:28–32 pictures an advance toward Zion. Ramah, Gibeah, and other nearby towns react to the advance.');
  route('lachish-libnah','From Lachish to Libnah',['lachish','libnah'],37,8,'The speaker returns and finds the Assyrian king at Libnah after leaving Lachish.');
  route('egypt-envoys','Envoys seeking Egypt',['jerusalem','zoan','hanes'],30,4,'Isaiah 30:1–6 describes an appeal to Egypt, naming Zoan and Hanes.');
  data.textRoutes.find(r => r.id === 'egypt-envoys').direction = false;
  route('return-babylon','Leaving Babylon',['babylon','jerusalem'],48,20,'Isaiah 48:20 calls for departure from Babylon. Jerusalem provides the wider restoration context.');
  const routeRefs = {
    10:[{id:'northern-approach',from:0,to:4,reference:'Isaiah 10:28–32'}],
    30:[{id:'egypt-envoys',from:0,to:2,reference:'Isaiah 30:1–6'}],
    36:[{id:'west-campaign',from:4,to:5,reference:'Isaiah 36:1 · regional campaign context',title:'The campaign near Lachish'}, {id:'lachish-mission',from:0,to:2,reference:'Isaiah 36:2'}],
    37:[{id:'lachish-libnah',from:0,to:1,reference:'Isaiah 37:8'}],
    39:[{id:'babylon-envoys-route',from:0,to:4,reference:'Isaiah 39:1–2'}],
    48:[{id:'return-babylon',from:0,to:1,reference:'Isaiah 48:20–21'}]
  };
  data.chapterMaps = focusRows.trim().split('\n').map(row => {
    const [number,...focusPlaceIds] = row.split(' '), chapter = Number(number);
    for (const id of focusPlaceIds) if (!data.places.some(p => p.id === id)) throw Error(`Isaiah ${chapter}: missing ${id}`);
    const text = scripture.chapters[chapter].map(v => v.text).join(' ');
    const mentioned = data.places.filter(p => [p.name.split(' · ')[0], ...(p.aliases || []), ...(aliases[p.id] || [])].some(term => new RegExp(`\\b${term}\\b`,'i').test(text))).map(p => p.id);
    const contextual = [32,40,41,50,53,54,55,57,61].includes(chapter);
    return {chapter,focusPlaceIds,placeIds:[...new Set([...focusPlaceIds,...mentioned])],routes:routeRefs[chapter] || [],
      maxZoom: 10,
      note: contextual ? 'Jerusalem provides the wider literary setting. This chapter does not identify a precise event location.' : [24,66].includes(chapter) ? 'Jerusalem is the local focus. The vision also extends to distant nations and the wider earth.' : 'Highlighted places show the chapter focus. Other named places remain available on the map.',
      sourceIds:[`web${chapter === 36 ? '' : chapter}`,'geo']};
  });
  addNarrativeGeography(data);
  refineWikipediaGeography(data);
  addWikipediaEnrichment(data);
  applyMapDescriptions(data);
}
