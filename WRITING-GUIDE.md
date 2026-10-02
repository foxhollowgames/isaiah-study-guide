# Meridian writing guide

Use plain English based on ASD-STE100 principles for app labels, instructions, messages, and original study notes. Aim for a third-grade reading level when the facts allow it. This is a project writing guide, not a claim of full STE100 compliance.

## Write for the reader

- Give one instruction per sentence. Name the control the reader must select.
- Use short sentences. Aim for at most 12 words in instructions and 15 words in explanations.
- Use words that most third-grade readers know. Explain needed Bible, history, map, Hebrew, and Greek terms.
- Do not remove a needed fact only to lower the reading level.
- Rewrite the idea. Do not use a list of automatic word swaps.
- Put one main idea in each sentence. Most sentences should have 5–12 words.
- Prefer a person or thing as the subject. Follow it with a clear action.
- Break a long explanation into several short sentences.
- Keep source titles, names, quotations, Hebrew, and Greek exact. Do not count these items as reader copy.
- Use active voice when it makes the actor clear.
- Use the same term for the same item. Match control names exactly.
- Prefer concrete words. Explain necessary historical, religious, Hebrew, and Greek terms in context.
- Replace abstract metaphors such as “contextual anchor” with a direct explanation: “The map uses 703 BCE to show the setting.”
- State what the app knows and what remains uncertain. Simplification must not increase a claim’s certainty.
- Distinguish the biblical account, historical evidence, Church teaching, and Meridian study questions. Keep each claim attached to its sources.
- An empty state must describe what is missing. Do not say information is loading unless loading is actually in progress.

## Preserve source text

Preserve scripture quotations, source titles, proper names, Hebrew and Greek text, and attribution. Simplify Meridian’s surrounding explanations. Do not present a paraphrase as a quotation.

Use “dictionary form” to explain the base form of a word. Explain that a word’s form and meaning can change in a passage. Do not imply that every English word has an exact Hebrew or Greek match.

## Maintain and check

Interface copy lives in `dist/index.html` and `dist/app.js`. Study content comes from `scripts/create-content.mjs`, `scripts/full-isaiah.mjs`, `scripts/come-follow-me.mjs`, and `scripts/prepare-words.py`. Update the source files, then rebuild `dist/data/content.json`. Run the content generator before the word-study generator, because the content generator starts with an empty word list.

Run `npm run check` and `node --check dist/app.js`. Check changed messages in both Map and Read views where applicable. These checks validate app data and behavior; they do not establish STE100 compliance.

Before claiming full compliance, review vocabulary, approved meanings, parts of speech, technical terms, and all applicable writing rules against the official standard. Short sentences alone are insufficient.

Reference: [ASD-STE100 official description](https://www.asd-ste100.org/about_STE.html).

## Show source content in place

Put evidence and its limits in the main explanation for each study item. Use a compact link list for sources in map cards, word notes, and guides. Do not repeat source summaries or source-detail buttons in these lists. Do not add date or context labels to the start of a paragraph when the card already shows that information. Keep images needed for guide questions beside those questions. Preserve image credits and license links. Source details and the source library retain full source metadata. Store shared image metadata in scripts/source-previews.mjs.


Add relevant object images and verified short quotations beside the main explanation. Include image credits and quotation attribution, edition, page or section, and a direct source link. Explain what the evidence supports and what it does not establish. Distinguish the photographed object from other copies or editions. Keep the final source list compact.
