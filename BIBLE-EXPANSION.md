# Bible guide expansion

The original Isaiah address remains `/`. The directory is `/books.html`.
Book pages use `/book.html?book=<slug>`.

## Current batch

- Isaiah: existing guide, unchanged reading and map behavior.
- Genesis: all 50 chapters and 1,533 World English Bible verses.
- Genesis: 50 original chapter studies, 39 selected person profiles, and 28 place records.
- Genesis: historical and LDS sources use separate source categories and perspective controls.
- Exodus: all 40 chapters, 1,213 verses, 40 chapter studies, and 20 person profiles with portraits.
- Leviticus: all 27 chapters, 859 verses, 27 chapter studies, and seven person profiles with portraits.
- Numbers: all 36 chapters, 1,288 verses, 36 chapter studies, and 25 person profiles with portraits.
- Deuteronomy: all 34 chapters, 959 verses, 34 chapter studies, and 29 selected person or ancestral profiles with portraits.
- Joshua: all 24 chapters, 658 verses, 24 chapter studies, and 46 selected person or ancestral profiles with portraits.
- Judges: all 21 chapters, 618 verses, 21 chapter studies, and 62 selected profiles with portraits.
- Ruth: all four chapters, 85 verses, four chapter studies, and 22 named or unnamed profiles with portraits.
- 1 Samuel: all 31 chapters, 810 verses, 31 chapter studies, and 56 selected profiles with portraits.
- 2 Samuel: all 24 chapters, 695 verses, 24 chapter studies, and 75 selected profiles with portraits.
- Other 55 books: directory entries and clear planned pages. They have no study content yet.

## Next book

1 Kings is next in canonical order. Complete and verify one book before starting another.
Do not label a book ready until its reading text, chapter studies, sources, portraits, and maps pass review.
Use the existing Isaiah guide as the detail standard. Genesis currently has selected major people and chapter-level events.
Future enrichment can add finer passage divisions, additional people, language notes, and more specific citations.

## Usage constraint

The user permits at most 25 additional percentage points of weekly account usage for this work.
The initial account reading was 44% on October 4, 2026, America/Denver.
The initial stop threshold is 69%, with a safety margin for validation and publishing.
Account usage is shared with other chats. Read current usage before each new book and during long work.
Do not start large image batches near the limit. Do not infer remaining budget from an unchanged usage reading.
Do not assume this document authorizes another 25% in the same weekly window.
Further weeks can continue the backlog, but no recurring schedule has been created.

## Sources and maps

Follow `BIBLE-SOURCE-POLICY.md` for every source category.
The native build applies `scripts/bible_source_enrichment.py` after each book rebuild.
Genesis through Joshua include reviewed 2026 Come, Follow Me lessons, Wikipedia revisions, and McClellan notes. Numbers uses his original commentary on Numbers 22.
The transcript is machine-generated and lightly edited. Audio was not checked. These limits appear in source details.
Selected scholarly publication records support further study. Publisher descriptions do not count as full-text review.

Publisher HTML stays in `scripts/<book><N>-source.html` for reproducible verse extraction.
Original study notes describe the text. Academic interpretation and museum context remain distinct from Church teaching.
Genesis does not supply verified historical event years. Its timeline uses narrative chapter order.
Do not map Eden or Babel's tower as verified coordinates.
Uncertain place markers give a region or a proposed location, with the limitation in the place card.
Routes connect named places and do not claim an excavated road or precise travel path.

## Portraits

Historical artwork metadata and license links live in `dist/data/books/genesis-art.json`.
Each person has a separate descriptor and an art record.
Art choices vary artists, media, subjects, poses, colors, scenes, and composition.
Zilpah uses the built-in image generation tool because no suitable reviewed free artwork was found.
Her prompt requested a seated three-quarter portrait, an indigo head covering, ochre clothing, a tent, woven cloth, and distant hills.
The generated asset is `dist/assets/portraits/genesis/zilpah.png`.
The portrait credits clearly identify generated art and later story-based illustrations.
No illustration establishes a person's actual appearance.

Exodus artwork records live in `dist/data/books/exodus-art.json`.
Six generated illustrations cover Shiphrah, Puah, Amram, Oholiab, Ithamar, and Jethro.
Their prompts vary age, framing, pose, expression, clothing, light, background, and color.
The other Exodus profiles use reviewed historical art, including Joseph's existing Genesis portrait.
Leviticus reuses six reviewed Exodus portraits and adds a generated Shelomith illustration.
Her prompt uses watercolor and ink, a green shawl, an open desert camp, and morning light.

## Rebuild and checks

All ready book guides use Isaiah's HTML shell, stylesheet, chapter picker, modal controls, and navigation.
Run `python scripts/build-native-books.py` after editing book data or the Isaiah interface.
This creates book-specific adaptations from `app.js` and `portraits.js`.
Do not restore the separate book renderer or its Events and Meanings sections.
Original meanings belong in the chapter introduction. Sources use Isaiah's inline footnotes and source details.
Books without secure event years use chapter order in the existing timeline controls.

Run `python scripts/build-bible.py` to rebuild the directory and Genesis text.
Run `python scripts/build-exodus.py` to rebuild Exodus.
Run `python scripts/build-leviticus.py` to rebuild Leviticus.
Run `python scripts/build-numbers.py` to rebuild Numbers.
Run `python scripts/build-deuteronomy.py` to rebuild Deuteronomy.
Run `python scripts/finish-deuteronomy-art.py` to restore Deuteronomy art records.
Run `python scripts/finish-numbers-art.py` to restore Numbers art records.
Run `python scripts/fetch-bible-art.py --download` to fetch the selected historical art.
Run `python scripts/finish-bible-art.py` after historical art downloads to preserve the generated Zilpah record.
Run `node scripts/check-bible.mjs` and `npm run check` before publishing.
Use the repository's existing GitHub Pages workflow. This project does not use Sites hosting.

Numbers reuses six Exodus portraits, adds eight reviewed historical illustrations, and adds eleven generated portraits.
Generated portraits vary pose, framing, expression, lighting, colors, and backgrounds.
The five inheritance claimants each have a distinct portrait and profile.
Noah and Milcah use separate identifiers from people with those names in Genesis.
Caleb’s historical illustration depicts the later Joshua 14 episode, as stated in its art record.

Deuteronomy reuses 23 portraits and adds six reviewed public-domain Zurbarán paintings of tribal ancestors.
Profiles explain that ancestral tribal names do not place those ancestors at Moses’s assembly.
Its map distinguishes retrospective locations and planned ceremonies from the present Moab setting.
Current Church teaching accompanies the older manual’s race-related statements in chapter 32.
Moses’s departure retains the biblical death account and separately presents the LDS interpretation of translation.

Joshua uses the native Isaiah controls and chapter-order timeline.
Its historical sources include Yale lecture 12, Hazor excavation context, and a 2023 peer-reviewed Hazor study abstract.
Fire deposits are not attributed to Joshua without evidence. Uncertain places and roads retain explicit limits.
Joshua portraits reuse 33 established assets and add four historical illustrations and nine generated interpretations.
The generated prompt set and saved asset paths are in scripts/joshua-generated-portraits.json.
Build Joshua with scripts/build-joshua.py, scripts/finish-joshua-art.py, and scripts/build-native-books.py, in that order.

Judges uses Yale lecture 13, SBL publisher context, a NET textual note, and reviewed McClellan commentary on Judges 5.
Current Come, Follow Me coverage remains separate from the 1980 Institute manuals.
The guide preserves differing readings of Jephthah’s vow and the Moses/Manasseh textual variation.
Judges reuses 24 portraits, adds 21 historical art assets, shares two scene illustrations, and adds 15 generated portraits.
The prompts and saved asset paths are in scripts/judges-generated-portraits.json.
Build Judges with scripts/build-judges.py, scripts/finish-judges-art.py, and scripts/build-native-books.py, in that order.

Ruth uses Yale Bible Study, Schipper’s verified publisher record, McClellan’s original Ruth 2 notes, and official Church lessons.
The guide states source access limits and corrects Yale’s closing genealogy error against Ruth 4:18–22.
Ruth reuses four Genesis portraits and adds five historical illustrations and 13 generated portraits.
The generated prompts and saved paths are in scripts/ruth-generated-portraits.json.
Build Ruth with scripts/build-ruth.py, scripts/finish-ruth-art.py, and scripts/build-native-books.py, in that order.

1 Samuel uses reviewed Yale lectures, NET textual notes, McClellan’s original translation argument, and Wikipedia revision metadata.
Come, Follow Me and the 1980 Institute manuals remain separate from historical interpretation.
The guide distinguishes the Endor narrative from the older manual’s denial of Samuel’s appearance.
Same-name profiles distinguish three Abinadabs, two Ahinoams, and two Ahimelechs.
Its 56 portrait records include six reused assets, ten historical illustrations, and 40 generated interpretations.
Prompts and original saved paths are in scripts/1-samuel-generated-portraits.json.
Generated assets use the built-in image generation tool and remain labeled as interpretive art.
Build with scripts/build-1-samuel.py, scripts/finish-samuel-art.py, and scripts/build-native-books.py, in that order.

2 Samuel source records include original McClellan posts, reviewed Yale study text, official Church manuals, and 2026 Come, Follow Me sections. Publisher-only records state that the full book was not read. The reviewed Wikipedia revision and license are preserved.

2 Samuel includes 58 new built-in generated portraits and 17 reused same-person portraits. Prompts and original paths are preserved in `scripts/2-samuel-generated-portraits.json`. Profile links distinguish names within the same chapter by verse.
