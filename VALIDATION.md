# Pilot validation — September 20, 2026

The delivered pilot contains Isaiah 36–39 (90 WEB verses), 27 selected word studies, 24 source records, eight passage settings, and three guided explorations.

## Automated checks

- `npm run check`: local data integrity, citation URL syntax, cross-references, verse numbering, word occurrences, coordinates, and required assets.
- `node --check dist/app.js`: JavaScript syntax.
- `scripts/prepare-words.py`: checks the stated Hebrew headword against the local OSHB text for every eligible verse containing the English selection. This caught and removed an incorrect association of Isaiah 37:31 with the noun used in 37:4 and 37:32. This check establishes presence in the verse, not an exhaustive token alignment or expert review.

## Browser checks

Checked the local app at desktop size and a 390 × 844 phone viewport:

- Chapter and passage controls, independent reading/map layouts, Historical/LDS switching.
- Timeline keyboard scrubbing to 539 BCE retains the selected chapter; Return to passage restores its contextual date.
- Campaign cards can be pinned, expanded, closed, and opened by keyboard; related passages update the reader.
- Word studies replace scripture in the map sidebar; Back restores the selected word and scroll position, including a word deep in a chapter.
- Mobile reading word studies appear in a visible bottom panel.
- Guided exploration advances the passage and map location.
- Historical source library contains 20 records; the LDS layer includes four additional Church sources.
- Terrain and illustration assets load locally; no browser console errors were observed in the checked flows.

Pointer-hover previews are implemented with a short delay and a wider route hit area. Browser checks exercised the corresponding focus and pinned-card paths; a separate physical mouse-hover test was not recorded.

## Come, Follow Me source update · September 27, 2026

Read and checked the five official 2026 Isaiah lesson pages (38–42). Added five Church source records with original summaries, chapter coverage, links, and limitations, plus related reflections on five pilot passages. These lessons do not directly cover Isaiah 36–39; the added passage connections are explicitly attributed to Meridian.

`npm run check` passes with 90 verses, 29 sources, 8 passages, and 27 curated word studies. Syntax checks pass for the source module and content generator. A focused check confirms five additions, classification as LDS sources under the existing library filter, preservation of the word studies, and no duplicate changes when the update is applied again. No browser interaction was rerun for this content-only update; the earlier browser counts above describe the original pilot.

## Boundaries

This is a focused pilot, not a complete Isaiah commentary. Political overlays and routes are schematic; terrain is a modern elevation reference. Chapter 39 uses an explicitly uncertain contextual anchor. The app identifies uncurated words rather than inventing language alignments. Citation integrity checks do not guarantee continued availability of external websites. Research summaries and interpretive notes have not undergone independent specialist review.
# Map readability update

- Routes use faction colors and screen-sized arrowheads following the stored point order. The legend lists factions present in the enabled layers at the selected date.
- Place labels prioritize the active passage, nearby historical events (within six years), then other places in the chapter while following its date. Secondary labels become eligible at zoom 7 and require progressively less clearance as the map zooms in.
- Label placement reserves space for city dots, other names, and map controls, and updates after chapter/date changes, zooming, panning, resizing, and opening or closing the layer and feature panels.
- Browser verified warm terrain, route arrows, secondary labels, and Libnah gaining priority in Isaiah 37; no browser errors reported. Local syntax and content checks pass.

## Language revision · September 27, 2026

Simplified interface messages, passage summaries, historical notes, guide steps, source explanations, word studies, and related Come, Follow Me questions. Updated the content generators and rebuilt the published content. Added `WRITING-GUIDE.md` for future edits. Scripture text, source titles, and Hebrew and Greek forms were not edited.

The content check passes with 90 verses, 29 sources, eight passages, and 27 word studies. JavaScript syntax checks pass for the app and content modules. The word-study generator passes its Hebrew checks.

Browser checks confirmed the revised Remnant study in Map and Read views, the message for a word without a study note, the return to passage notes, and the revised LDS study question. This was a focused copy verification, not a repeat of the full browser test suite.

The revision applies plain-English principles from ASD-STE100. It does not establish full compliance with the standard’s dictionary and writing rules.



## Full Isaiah expansion — September 27, 2026

- Cached publisher HTML for all 66 chapters. The parser checks each chapter against its expected verse count and sequential numbering: 1,292 verses total.
- Content checks pass for 122 sources, 70 passage notes, 50 word studies, six guides, citation IDs, places, and local assets. Every verse has exactly one passage note.
- All 50 selected Hebrew studies pass lemma checks against the local Open Scriptures Hebrew Bible. The 23 new entries do not claim Greek equivalents.
- Map transition checks and JavaScript syntax checks pass.
- Browser checks confirm chapters 1, 35, 36, 39, 40, and 66 render the expected verse counts. Chapter 1 disables Previous. Chapter 66 disables Next. Dated chapters retain their labels. Undated chapters show a separate map reference date.
- The new Worship and justice guide opens at Isaiah 1:17 with the verse and LDS reflection. Chapter selection and the Comfort word study work at a 390-pixel viewport without horizontal page overflow.
- Research remains selected. New chapter summaries explain the biblical text, not a completed independent historical review. The existing map timeline remains 780–539 BCE.

## Chapter map focus — September 28, 2026 UTC

- All 66 chapters have validated focus locations and source references. The map contains 74 places.
- Route checks cover the northern approach, Egypt connections, the southern western-campaign section, Lachish–Jerusalem, Lachish–Libnah, the embassy, and departure from Babylon.
- Automated checks pass for route indices, camera coordinates, rebuild stability, interrupted transitions, and reduced motion. All earlier content checks pass.
- Browser navigation passed for all 66 chapters. Desktop and 390-pixel phone views showed the chapter 36 route endpoints. No browser errors were reported.
- The camera reserves space for map controls. The focus button restores the chapter view after manual movement. Paths obey the layer toggle.
- Geographic choices remain editorial. Representative locations and schematic connections do not establish exact ancient roads or resolve disputed site identifications.

## Wider narrative maps — September 28, 2026 UTC

- The overview is now the default. A separate Local detail control preserves close route-section views.
- All 66 chapters have narrative notes. The data contains 81 places, nine approximate geographic areas, and 39 narrative path records across 19 chapters with mapped movements.
- Isaiah 15 has eight distress markers and four flight connections. The text’s unnamed attacker remains unnamed. Branches do not claim distinct refugee groups or confirmed starting towns.
- Tests cover movement kinds, scripture references, geographic areas, Moab’s missing military itinerary, the full chapter 36 campaign, local detail, future exile, visionary connections, and suppression of unrelated inherited campaigns.
- All automated checks pass. Browser checks passed for all 66 narratives and default overview selection. The Moab route list opened its reference and uncertainty card. Overview and detail controls worked in the 390-pixel phone layout. No application browser errors were reported.
