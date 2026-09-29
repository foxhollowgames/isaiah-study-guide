# Meridian data contract

## Full-book extension

`chapterMaps` contains exactly one entry for each chapter. Entries have `chapter`, `focusPlaceIds`, `placeIds`, `routes`, `maxZoom`, `note`, and `sourceIds`. Focus places control the camera. Other referenced places remain visible without widening the focus. Route references contain `id`, inclusive zero-based `from` and `to` indices, and a scripture `reference`.

`textRoutes` contains schematic chapter connections without assigned historical dates. They have `id`, `title`, `points`, `chapter`, `verse`, `summary`, `uncertainty`, and `sourceIds`. An optional `direction:false` suppresses directional arrows when the text does not establish the travel order. Historical `campaigns` keep their date ranges. The map displays chapter routes independently of the timeline date, with their uncertainty visible in context cards.

The current guide contains Isaiah 1–66, with 1,292 verses. Every verse belongs to exactly one passage note. The original chapters 36–39 retain their detailed passage divisions. Added chapters each have one chapter-level note. There are six guides and 50 selected word studies.

Passage `year` can be `null` when no event year is assigned. The map then keeps its independent reference date and labels that distinction. Historical map events retain the range 780–539 BCE. This range does not cover every proposed composition period. Source chapter URLs use two digits, such as `ISA01.htm`.

The chapter selector supports all 66 chapters on desktop and mobile. Previous and Next stop at the book boundaries. Word associations remain selected rather than comprehensive. New Hebrew-only notes use an empty `greek` field.

The original pilot specification below documents the starting design. The full-book extension above supersedes its chapter, passage-date, guide-count, and word-count limits.

The owner supplies `dist/data/content.json`, `dist/data/scripture.json`, `dist/data/land.geojson`, `dist/data/lakes.geojson`, `dist/vendor/leaflet.js`, `dist/vendor/leaflet.css`, and `dist/assets/reading-landscape.png`. Use native ES modules and Leaflet's global L. No package dependencies required to run; owner supplies local server. App files owned by interface agent: `dist/index.html`, `dist/styles.css`, `dist/app.js`, optional `dist/map.js` and `dist/state.js`.

`scripture.json` is `{ "translation":"World English Bible", "copyright":"Public domain", "source":"https://ebible.org/engwebp/ISA36.htm", "chapters": { "36":[{"verse":1,"text":"..."}], "37":[], "38":[], "39":[] } }`.

`content.json` is `{sources,passages,events,places,campaigns,regions,words,guides,periods}`. All arrays. Below are item schemas; all prose is plain text, never HTML. Render missing info honestly. Use source IDs to build links/cards. A source is `{id,title,author,year,type,url,summary,limitations,license}`. A passage is `{id,chapter,start,end,title,summary,year,dateLabel,uncertainty,placeIds,sourceIds,lds:{text,sourceIds}}`. BCE years are NEGATIVE integers, from -780 to -539; dateLabel is display text. A period is `{id,label,start,end,description}`. An event is `{id,year,dateLabel,title,summary,uncertainty,sourceIds,placeIds,chapter,verse}`. A place is `{id,name,lat,lng,summary,sourceIds,chapter,verse}`. A campaign is `{id,title,start,end,dateLabel,points:[[lat,lng]],summary,detail,uncertainty,sourceIds,chapter,verse}`. A region is `{id,name,start,end,points:[[lat,lng]],color,summary,uncertainty,sourceIds}`. A word is `{id,label,matches:["Lachish"],chapter,verses:[2],hebrew,transliteration,greek,greekNote,meaning,grammar,discussion,sourceIds,related:[{label,url,note}]}`; `chapter` may be null for all pilot chapters, `verses` empty means any verse in eligible chapter. Entries are curated English selection associations, not a complete aligned Hebrew edition. Empty Hebrew/Greek means not verified; never synthesize. A guide is `{id,title,description,steps:[{title,text,chapter,verse,year,placeId,sourceIds}]}`.

UX: user specifically approved dark Meridian map-first desktop interface with real geographic map occupying ~70% and scripture right. Campaign hover context card stays within map; click/tap pins, hover can be entered; full context/source actions. Sidebar word selection REPLACES scripture; Back restores scroll and keyboard focus. No 'Select a word to explore' footer. Read view has illustrated landscape and generous scripture. Historical/LDS separate from Read/Map. Global timeline supports scrub, event chips and exact labels Pre-Isaiah / Isaiah / Post-Isaiah. Store selected chapter, verse, view, perspective, date, layers and map viewport locally. Guided tours 3 items. Source library. All four chapters available. Only words with curated study notes are clickable; words without notes remain plain text. No inventing missing facts. Real latitude/longitude Leaflet map uses local land/lakes GeoJSON as base; no modern borders or external tile dependence. Mark routes schematic and territory influence approximate. Overlay date intervals control visible campaigns/regions. Places persist; context dates cannot silently shift when hovering. On narrow displays responsive Read/Map + collapsible sidebar.

Optional source fields: `group` groups related library entries; `reviewed` describes what was checked; `citedSourceIds` links a video's cited works; `timestamps` is an array of `{seconds,label}` for video sections. All cited IDs must exist. Timestamp seconds must be nonnegative integers. The `mcclellan` group contains the selected scholar videos and their cited publications. Scholarly interpretation remains available in both perspectives and is not classified as Church teaching.

The `conference-year` source group appears in LDS mode. Its sources include `conference` and `scriptureReferences: [{label,url,contextUrl,location,kind}]`. A scripture link opens the cited passage; the context link opens its location in the talk. `kind` distinguishes explicit Isaiah citations from named references through another scripture. The audit records the review dates and search limits.

## Narrative geography extension

Each chapter map also has `narrative`, `limits`, `contextPlaceIds`, `contextRoutes`, and `impacts`. Overview framing includes the context places, affected places, and both route sets. Detail framing retains the original local route sections. Where there is no original route, detail retains the narrative paths.

Narrative routes have `kind` (`military`, `flight`, `exile`, `restoration`, or `diplomacy`), `evidence`, and optional `placeIds` and `endVerse`. Kind controls the legend, color, and dash pattern. Evidence distinguishes narrated events, warnings, visions, and regional connections. Non-directional relationships set `direction:false`.

An impact has `placeId`, `reference`, and `description`. Impacts show distress or destruction without inventing military routes. `narrativeRegions` stores approximate geographic areas from the cached atlas. These areas are not dated political borders. They have IDs separate from historical influence layers.

The chapter narrative generator is `scripts/narrative-geography.mjs`. It runs during normal geography generation. Dated campaign overlays require the optional Dated context control. Undated chapters do not inherit unrelated historical influence overlays by default.
