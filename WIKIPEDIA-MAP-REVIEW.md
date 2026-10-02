# Wikipedia and map review

Reviewed on 29 September 2026. This update adds 24 Wikipedia articles, three licensed images, and one archaeological research source. The app uses short paraphrases. It keeps images and explanations in the main text and uses compact source lists.

## Map changes

| Feature | Change | Evidence and limit |
| --- | --- | --- |
| Coastal campaign | Sidon, Tyre, Joppa, and Ashkelon replace the earlier coastal line and unnamed waypoint. | The annals name affected towns. This is a geographic connection, not a march sequence. No direction arrows are shown. The line does not claim that the island city of Tyre fell. |
| Philistine campaign | Timnah at Tel Batash connects with Ekron. | Luckenbill, printed pp. 31–32, names Eltekeh and Timnah before the action at Ekron. This does not establish the road. No direction arrows are shown. |
| Judah campaign | Azekah and Lachish form a separate local connection. | The fragmentary Azekah inscription and the evidence at Lachish support discussion of separate attacks. Their order is not established here. No direction arrows are shown. |
| Eltekeh | No precise pin added. | The Wikipedia entry redirects to Ge’alya. The proposed identification with Tel Shalaf is disputed. The modern settlement's coordinates must not become a claimed battle location. |
| Lachish to Jerusalem | Removed the unnamed intermediate bend. | Isaiah 36:2 gives the origin and destination of the representative's mission. This is not Sennacherib's personal route. |
| Babylon embassy and exile | Removed unreported intermediate bends. | The endpoints show the relationship between the cities. The straight links are not travel roads across the desert. Exile involved more than one deportation. |
| Libnah | Added an explicit uncertain-site label and article context. | Retained the existing representative location. The article does not settle the site identification. |
| Other chapters | Retained literary and visionary paths and their limits. | No new army routes were inferred from poetic descriptions, named countries, or general article maps. |

The overview includes the coastal and Philistine connections. Local chapter framing remains centered on Judah and Jerusalem. New campaign vertices all resolve to named place records. The new coordinates are representative site positions from the reviewed articles, not surveyed ancient roads.

## Evidence reviewed

- [Sennacherib](https://en.wikipedia.org/wiki/Sennacherib) and [his campaign in the Levant](https://en.wikipedia.org/wiki/Sennacherib%27s_campaign_in_the_Levant): starting points for people, campaign sites, and bibliography. Some sections have source-quality notices. They were not treated as proof of exact roads.
- [The Annals of Sennacherib](https://isac-assets.s3.amazonaws.com/isac-publications/oip2.pdf): checked printed pp. 31–34, PDF pp. 45–48. This is a royal account, not an independent record of every claim.
- [Constructing the Assyrian Siege Ramp at Lachish](https://doi.org/10.1111/ojoa.12231): publisher abstract and metadata checked. The full article was not reviewed. The paper concerns local siege works, not the regional march route.
- Site and subject articles cover Lachish, Azekah, Ekron, Timnah, Jaffa, Sidon, Tyre, Libnah, Hezekiah, Siloam, Nineveh, Merodach-baladan, exile, Cyrus, Isaiah, Moab, Edom, the Syro-Ephraimite War, and Taharqa.

Each article record stores the reviewed revision and links to that fixed version in source details. Article notes are adapted and shortened under CC BY-SA 4.0. The public review script writes its working cache to the system temporary directory. Full article text is not shipped with the app.

## Image credits

| Image | Credit and license | Identification |
| --- | --- | --- |
| [Sennacherib relief](https://commons.wikimedia.org/wiki/File:Sanherib-tr-4271.jpg) | Timo Roller, CC BY 3.0 | Photograph of a cast in Landshut. The original rock relief is near Cudi Dağı. |
| [Lachish ramp](https://commons.wikimedia.org/wiki/File:LachishRamp053011.jpg) | Wilson44691, CC BY-SA 3.0 | Site photograph, not an ancient illustration. |
| [Siloam inscription](https://commons.wikimedia.org/wiki/File:Siloam_Inscription_2.jpg) | Wikikati, public domain | Photograph of a replica. The caption explicitly distinguishes it from the original. |

Authors, licenses, descriptions, and download links were checked through the Commons image metadata. Each displayed image links to its Commons file page and full image. Local copies support reliable loading. Existing artifact images and checked quotations remain available.

## Maintenance

Curated notes and route rules are in `scripts/wikipedia-enrichment.mjs`. Fixed review metadata is in `scripts/wikipedia-review.json`. Image credits are in `scripts/wikipedia-images.json`. The chapter geography generator applies these changes, so rebuilding does not restore the earlier route geometry.

Rebuild with `node scripts/create-content.mjs`, then `python scripts/prepare-words.py`. Refresh the coverage report with `node scripts/report-study-enrichment.mjs`. Validate with `npm run check` and `node --check dist/app.js`.

Checks cover all 66 chapters and both reading modes, stable geography rebuilds, named campaign vertices, source references, image files and credits, replica labels, and the absence of a precise Eltekeh pin. Browser checks cover the Judah path, inline ramp image, source lists, and Wikipedia revision and license links.
