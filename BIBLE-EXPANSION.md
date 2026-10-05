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
- Other 62 books: directory entries and clear planned pages. They have no study content yet.

## Next book

Numbers is next in canonical order. Complete and verify one book before starting another.
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
Run `python scripts/fetch-bible-art.py --download` to fetch the selected historical art.
Run `python scripts/finish-bible-art.py` after historical art downloads to preserve the generated Zilpah record.
Run `node scripts/check-bible.mjs` and `npm run check` before publishing.
Use the repository's existing GitHub Pages workflow. This project does not use Sites hosting.
