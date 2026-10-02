# Meridian — Isaiah Study Guide

Meridian is a local, map-first study guide for all 66 chapters of Isaiah. It connects the World English Bible text with chapter summaries, selected historical settings, geography, language notes, and an optional faithful Latter-day Saint reading layer.

The public site is [isaiah.josephnewelldesign.com](https://isaiah.josephnewelldesign.com/). GitHub Pages publishes the contents of `dist` after each push to `main`.

## Run locally

Node.js is required (already available on the build computer). No dependency installation is needed. Double-click **Start Meridian.cmd**, or run this from the project folder:

```text
npm start
```

Open [Meridian](http://127.0.0.1:4173). Keep the server window open while studying. Run `npm run check` to validate the local reading text, citation URL syntax and IDs, reference integrity, map coordinates, and curated word associations. This check does not verify external website availability or adjudicate scholarly claims.

## Study scope

Open the hamburger menu in the upper right to select **Historical** or **LDS**. The menu also has **Use non-generated portraits**. This option uses local copies of public domain or freely licensed art for all 12 people. Each portrait has source and license links. If an image is missing or cannot load, a color tile shows the first letter of the person's name. Both settings are saved in this browser.

Portrait credits and license records are in `dist/data/portrait-images.json`. The images are in `dist/assets/portraits/commons/`. To download these images again, run `python scripts/fetch-portrait-images.py`. Historical art does not establish actual appearance.

The guide includes all 1,292 verses of Isaiah, 70 passage notes, 1,310 word-study records, and six guided studies. Use the chapter selector above the reading text to reach any chapter. Previous and Next stop at chapters 1 and 66.

The original detailed studies of Isaiah 36–39 remain intact. Each added chapter has an original summary, a Meridian devotional question, and source links. The five Come, Follow Me lessons connect to their chapters. Chapters omitted from those lessons link to nearby material with an explicit label. Existing conference sources also connect to the chapters they cite.

Word studies cover all 66 chapters. They include 54 passage notes and 1,256 general dictionary records, with 1,974 verse associations for the dictionary records. The catalog in `scripts/word-catalog.json` supplies common words and names. Each new link requires the complete English token and the Hebrew dictionary number in the same verse. These are verse-level associations, not a complete word-by-word alignment. Existing passage notes take priority. Greek forms are supplied only for checked passages, including five entries in Isaiah 7. Hebrew and English verse-number differences in chapters 9 and 64 are handled during generation. Only words with entries can be selected.

The map retains its selected historical events from 780–539 BCE. Added chapter notes have no assigned event year. The timeline labels its displayed date as a separate map reference. The guide does not assign future visions to historical dates or claim full historical research for every chapter.

Chapter selection shows the full geographic story. **Focus Isaiah** restores this view after you move or zoom the map. Blue markers identify local focus places. Red rings mark destruction or distress. Path colors distinguish military movement, flight, captivity, diplomacy, and return. The Paths control hides connecting lines. Paths stay within the current chapter. For undated passages, enable Nations and Areas to show historical influence areas for the selected timeline year.

All 66 chapters have explicit focus entries and narrative notes. The map has 81 location markers, nine approximate geographic areas, and 39 narrative path records across 19 chapters with mapped movements. Chapters without specified origins or destinations explain that limit. Visionary connections are labeled as visions, not historical roads. Wide-ranging chapters still use selected representative places.

Geography is maintained in `scripts/chapter-geography.mjs`. Coordinates come from the cached [OpenBible Isaiah dataset](https://www.openbible.info/geo/preview/isa), downloaded September 28, 2026 UTC. The cache retains source attribution. New markers use representative locations and identify uncertainty. Selecting the first listed candidate does not establish that identification as certain. Chapter references are checked against the local World English Bible text. The normal content rebuild includes these additions.

The wider story includes coalition attacks, the northern approach to Zion, Moab’s flight scenes, refuge and tribute, captivity warnings, gathering visions, coastal flight, and the Babylon visit and exile warning. Isaiah 36 shows the wider coastal campaign and its local mission. Isaiah 37 adds the return to Nineveh. Every movement opens a passage reference and its evidence limits.

For Isaiah 15, red rings mark eight places of destruction or distress. Four orange branches connect a representative Moab origin with Zoar, Luhith, Horonaim, and the Brook of the Willows. These branches summarize separate textual references. They do not claim separate refugee groups, a sequence of stops, or starting towns. The attacker and military approach are unnamed, so the map does not invent a military warpath.

To rebuild, run `node scripts/fetch-scripture.mjs` once to obtain missing publisher pages. Then run `python scripts/prepare-scripture.py`, `node scripts/create-content.mjs`, and `python scripts/prepare-words.py` in that order. The cached pages support later offline rebuilds. Chapter notes and new guides are maintained in `scripts/full-isaiah.mjs`.

Historical mode presents the shared historical evidence and its limits. LDS mode retains that material and adds separately labeled Church resources and faithful interpretation. The historical map uses approximate places, influence areas, and schematic routes where the evidence does not justify exact boundaries or reconstructed movements.

The LDS source library includes all five 2026 Come, Follow Me lessons for Isaiah, with linked summaries. These lessons cover Isaiah 1–35 (selected chapters) and 40–66. Connections to Isaiah 36–39 remain labeled as related Meridian study reflections. Source additions are maintained in `scripts/come-follow-me.mjs`.

## App wording

The LDS source library also includes 22 talks from October 2025 and April 2026 general conference. The review covers September 27, 2025–September 27, 2026. All 72 official conference article pages were scanned for explicit Isaiah citations and named mentions in the text and notes. The 34 citation locations include one reference through Luke 4:18. Unnamed allusions were not systematically identified. Entries link to scripture and the relevant talk reference. The citations fall outside Isaiah 36–39; three pilot connections are labeled Meridian study questions. Maintain summaries in `scripts/general-conference.mjs` and citation metadata in `scripts/conference-isaiah-audit.json`.

The source library includes four selected Dan McClellan Isaiah videos and five works cited in them. Video entries include timestamp links and cited resource summaries. The authorship video also appears in Isaiah 39's passage context and the Babylon guide. Other videos cover Isaiah 28, Isaiah 53, and manuscript transmission. Source-check notes distinguish reviewed transcripts, accessible scholarship, publisher descriptions, and excerpts reported through a video. Maintain these additions in `scripts/mcclellan.mjs`. This is a selected collection, not a complete channel index.

Follow [the writing guide](WRITING-GUIDE.md) when changing interface text or original study notes. It applies plain-English principles from ASD-STE100 while preserving quotations and source titles. The app has not undergone a full STE100 vocabulary and rule review.

## Local data and reuse

The map allows zoom levels up to 14. The Levant study area includes offline terrain through native zoom 12. Areas around Jerusalem, Lachish, and Samaria include native zoom 14. Between these areas, level-12 terrain stays visible at closer zooms. Pixel spacing is finer, but source elevation accuracy varies by location. Detailed modern coastlines and lakes use Natural Earth 1:10m geometry. Outside the Levant detail area, the regional overview remains in use.

To rebuild the terrain, run `node scripts/fetch-detail.mjs` and `python scripts/render-detail.py` with NumPy and Pillow installed. Then run `node scripts/fetch-close-terrain.mjs` and `python scripts/render-close-terrain.py` to build levels 11 through 14. Coverage is defined in `scripts/terrain-regions.json`. Downloads are needed only when rebuilding, not while studying. The close terrain renderer resumes from existing output tiles. Use `python scripts/render-close-terrain.py --force` to render existing tiles again after a color or shading change. River and shoreline geometry remains at Natural Earth 1:10m scale; closer zoom does not add smaller streams or ancient streets.

Core reading, map data, imagery, Leaflet, and the app itself are stored locally, so ordinary study does not need an account or network connection. Source links open external readings when available.

- The World English Bible text is public domain; its local source and reuse note are in `dist/data/scripture.json` and the `web` source record.
- Land and lake base layers use Natural Earth geographic data, recorded as public domain in the `earth` source record.
- The local terrain image is a modern elevation reference. Its provider attribution and interpretive limitation are recorded in `dist/data/relief.json`.
- `dist/vendor/leaflet-LICENSE.txt` contains the bundled Leaflet license.
- The reading landscape was generated for this project with OpenAI image generation. It is an interpretive illustration, not archaeological evidence or a documentary reconstruction of a particular site.
- The six tooltip portraits are interpretive illustrations generated with OpenAI image generation. They use distinct poses, expressions, backgrounds, and viewing angles for recognition. Names and story labels distinguish Isaiah, Hezekiah, Sennacherib, Merodach-baladan, Nebuchadnezzar II, and Cyrus; they do not represent a complete succession of rulers at every timeline date. Assets and prompts are stored in `dist/assets/portraits/`.

Every linked research source has its own attribution, reuse note, and limitations in `dist/data/content.json`. Public access to a source does not by itself grant redistribution rights.

## Prism and harmony sources

The source library includes seven public resources checked on September 29, 2026. Sennacherib’s Prism has museum records, a free scholarly edition, and a local public-domain photograph by David Castor. These resources connect to Isaiah 36–37 and the **Two accounts, one crisis** guide. The records distinguish the Taylor, Chicago, and Jerusalem prisms. Object dates differ from the 701 BCE campaign date.

In LDS mode, **Opening Isaiah: A Harmony** includes the publisher record, a public sample, and interviews with Ann N. Madsen and Shon D. Hopkin. The 23-page sample covers Isaiah 1–6 and 7:1. The general book resources remain in the source library. Selected interview insights appear in LDS mode for Isaiah 1, 2, 6, and 30. Each note separates the author’s insight from a Meridian application. Short quotations appear with attribution. The Isaiah 2 comparison cites both scripture editions; it is an application of Hopkin’s method, not his own example. The full book remains a purchase resource. No book pages, modern translation columns, or proprietary maps are copied into Meridian. Maintain these additions in `scripts/prism-and-harmony.mjs` and the image credit in `scripts/source-previews.mjs`.

Chapter footnotes now open a **Source details** dialog inside the app. It includes the source summary, available local images, attribution, review notes, and limits. Full-source links remain available. Closing the dialog returns to the reader or guide. Numbers remain consistent within each chapter. World English Bible credits remain in the footer and source library, without inline footnotes. Source footnotes also appear at the start of each passage. The reading panel shows LDS notes in LDS mode.

In LDS mode, each chapter includes both harmony interviews as general reading help. This label distinguishes study methods from commentary on that chapter. Isaiah 36 includes a note with the Lachish relief and prism sources. Isaiah 37 includes an account-comparison note. These notes are original Meridian summaries; interview transcripts and copyrighted book pages are not copied.


Chapter openings use one introduction. It combines the chapter summary and relevant evidence. Movement controls remain in an expandable list within that section. LDS mode adds reflection and reading help inside the same section. General map cautions appear in the footer; source-specific limits remain in source dialogs. Isaiah 36–39 have consolidated introductions in `passageContextHtml()` in `dist/app.js`.


Every chapter now includes a selected World English Bible passage and an original close-reading note. Main summaries also show relevant source insights, available object photographs, and short verified quotations. Historical and LDS material retain separate labels. The Cyrus Cylinder appears with Isaiah 44–45, which name Cyrus. It is not evidence for every restoration vision. Chapter 53 includes the existing manuscript discussion and its cited scholarship.

Maintain chapter selections and source scope in `scripts/chapter-enrichment.mjs`. Maintain the 18 added source quotations in `scripts/study-source-excerpts.json`; the earlier Luckenbill quotation remains in `scripts/source-previews.mjs`. All quotations include attribution and a source location. The chapter checks cover all 66 chapters in both modes. See [the coverage report](STUDY-ENRICHMENT.md) for the chapter and source inventory. The inventory does not claim a complete new review of every linked work.
