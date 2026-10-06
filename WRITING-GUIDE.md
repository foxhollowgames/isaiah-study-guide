# Isaiah Study Guide writing guide

Use plain English based on ASD-STE100 principles for app labels, instructions, messages, and original study notes. Use familiar words for a general reader. Explain necessary terms without reducing the passage's depth. This is a project writing guide, not a claim of full STE100 compliance.

## Write for the reader

- Give one instruction per sentence. Name the control the reader must select.
- Use short sentences. Aim for at most 12 words in instructions and 15 words in explanations.
- Use words that most third-grade readers know. Explain needed Bible, history, map, Hebrew, and Greek terms.
- Do not remove a needed fact only to lower the reading level.
- Rewrite the idea. Do not use a list of automatic word swaps.
- Put one main idea in each sentence. Prefer 5–12 words when that length preserves the complete idea.
- Prefer a person or thing as the subject. Follow it with a clear action.
- Break a long explanation into several short sentences.
- Keep source titles, names, quotations, Hebrew, and Greek exact. Do not count these items as reader copy.
- Use active voice when it makes the actor clear.
- Use the same term for the same item. Match control names exactly.
- Prefer concrete words. Explain necessary historical, religious, Hebrew, and Greek terms in context.
- Replace abstract metaphors such as “contextual anchor” with a direct explanation: “The map uses 703 BCE to show the setting.”
- State what the app knows and what remains uncertain. Simplification must not increase a claim’s certainty.
- Distinguish the biblical account, historical evidence, Church teaching, and original study questions. Keep each claim attached to its sources.
- An empty state must describe what is missing. Do not say information is loading unless loading is actually in progress.
- Explain the passage before describing the work done to build the guide.
- Remove sentences that repeat the title, nearby text, or another note.
- Keep general source-review limits in Source details. Show a limit in the reading only when it changes that passage's meaning.
- Do not repeat atlas descriptions, publication records, or general source summaries under every chapter.
- Use a specific study question. Do not add a repeated “Original study reflection” label.
- Describe what people do and why it matters. Keep image instructions and research-process notes out of their profiles.

## Preserve source text

Preserve scripture quotations, source titles, proper names, Hebrew and Greek text, and attribution. Simplify the study guide’s surrounding explanations. Do not present a paraphrase as a quotation.

Use “dictionary form” to explain the base form of a word. Explain that a word’s form and meaning can change in a passage. Do not imply that every English word has an exact Hebrew or Greek match.

## Maintain and check

For each Bible book, summaries describe what happens. Meaning notes explain why specific actions matter. Do not repeat the summary.

Tie each study question to the selected chapter. Name the person, action, promise, or conflict. Keep Church lesson attribution beside its actual teaching. Add a separate, passage-specific question. Do not attribute an original question to the lesson.

Identify the speaker when describing a disputed claim. Keep uncertainty that changes the passage's meaning. Put general review limits in Source details.

Save book edits in source files or rebuild overlays before rebuilding reader data. Preserve scripture, source links, people links, map data, and publication status. Run `npm run check:bible` and the relevant book checks. Read the changed passages after rebuilding. Run `npm run check` and `node --check dist/app.js` when shared reader files change.

Use Isaiah's existing information layout when adding books. Fix shared book builders rather than editing generated reader files alone.

Do not place an AI illustration label or appearance disclaimer beneath each portrait. Keep the shared artwork note in the footer. Keep descriptive image alt text, original art metadata, and licensed artwork credits with their license links.

Show only map controls supported by the book's data. State when a chapter has no mapped places. Keep specific location limits in Map context. Do not present chapter order as a historical date.

Use each book's publisher code and chapter filename format for scripture quotations. A shared whole-book scripture source must remain available in every chapter.

Display structured source-review records as readable dates and scope notes. Do not show object placeholders such as `[object Object]`. Run `npm run check:bible` after rebuilding to check these presentation rules across all available books.

Interface copy lives in `dist/index.html` and `dist/app.js`. Study content comes from `scripts/create-content.mjs`, `scripts/full-isaiah.mjs`, `scripts/come-follow-me.mjs`, and `scripts/prepare-words.py`. Update the source files, then rebuild `dist/data/content.json`. Run the content generator before the word-study generator, because the content generator starts with an empty word list.

Run `npm run check` and `node --check dist/app.js`. Check changed messages in both Map and Read views where applicable. These checks validate app data and behavior; they do not establish STE100 compliance.

Before claiming full compliance, review vocabulary, approved meanings, parts of speech, technical terms, and all applicable writing rules against the official standard. Short sentences alone are insufficient.

Reference: [ASD-STE100 official description](https://www.asd-ste100.org/about_STE.html).

## Show source content in place

Simple language must preserve depth. Short sentences do not require short explanations. Build connected paragraphs that explain causes, customs, power, or literary choices. A plot summary alone is not a study note. Avoid ending every paragraph with a general lesson about trust, care, or leadership.

Use Isaiah as the reference for evidence within the reading. Choose an exact verse that supports the explanation. Explain how that verse connects with the surrounding passage or the book's larger concerns. For poetry, attend to speakers, images, form, and changes in voice. For law, explain the practical situation and whose interests the rule protects.

Use artifact photographs where they clarify a specific passage. Identify the object, date, location, collection, and image rights. Explain the relevant practice beside the photograph. State when an object is only a regional or period comparison. Do not imply that an Egyptian harp belonged to David or that a Babylonian tablet records Jeremiah's purchase. Do not add unrelated objects merely to fill a page.

Keep original close readings distinct from museum descriptions and attributed scholarship. A museum link supports facts about its object. It does not make the museum the author of our biblical interpretation. Keep Church readings in their existing section.

Every ready chapter requires an original contextual explanation and one meaningful exact Scripture selection. Read the selected passage and its surroundings before writing. Use three to six connected sentences when the explanation needs them. Longer explanations can use separate paragraphs on separate topics. Choose the verse for its role in the argument. Do not choose the first verse or midpoint automatically.

Added-book context lives in `scripts/book-context-complete/<book-id>.json`. Each row contains the chapter, selected verse, heading, explanation, and optional artifact source IDs. The builder rejects missing or duplicate chapters. `scripts/book_context.py` adds source and image metadata. Museum image identity and rights live in `scripts/study-objects.json`. The shared builder carries the explanations into chapter introductions, event details, and short curated guides.

The chapter meaning field uses the contextual explanation. Keep the opening plot summary brief. Do not append an earlier generic moral to the new explanation. Guides select a small route through the book. Complete chapter coverage belongs in the chapter reader, not an oversized guided tour.

An original close reading can use the local World English Bible as its primary text. This does not verify dates, authorship, archaeology, or scholarly consensus. Additional claims need their own reviewed sources. Record the distinction in the review metadata. Do not label original interpretation as a museum's or scholar's conclusion.

Separate image scope from a source's general chapter associations. Added-book `imageChapters` names the chapters that actually need the photograph. A broadly useful source must not spread one photograph through unrelated passages. Keep an image's explanation and specific limits beside it.

Before release, require one contextual note and selected verse per ready chapter. Check exact quotations, unique coverage, source IDs, image assets, rights, and both perspectives. Review notes for speaker attribution, unsupported claims, repeated morals, and confusion between people with the same name. Read representative difficult passages in the app. Automated sentence checks do not replace editorial review.

Put evidence and its limits in the main explanation for each study item. Use a compact link list for sources in map cards, word notes, and guides. Do not repeat source summaries or source-detail buttons in these lists. Do not add date or context labels to the start of a paragraph when the card already shows that information. Keep images needed for guide questions beside those questions. Preserve image credits and license links. Source details and the source library retain full source metadata. Store Isaiah's shared image metadata in `scripts/source-previews.mjs`. Store added-book museum records in `scripts/study-objects.json`.

Maintain short added-book guide routes in `GUIDE_CHAPTERS` within `scripts/book_context.py`. Choose passages that expose the book's larger concerns. The complete JSON chapter files remain the only source for their contextual prose. Refresh the release version in the shared builder and native book loader when publishing reader changes.


Add relevant object images and verified short quotations beside the main explanation. Include image credits and quotation attribution, edition, page or section, and a direct source link. Explain what the evidence supports and what it does not establish. Distinguish the photographed object from other copies or editions. Keep the final source list compact.
