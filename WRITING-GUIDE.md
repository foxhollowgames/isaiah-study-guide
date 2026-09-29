# Meridian writing guide

Use plain English based on ASD-STE100 principles for app labels, instructions, messages, and original study notes. This is a project writing guide, not a declaration of full STE100 compliance.

## Write for the reader

- Give one instruction per sentence. Name the control the reader must select.
- Use short sentences. Aim for at most 20 words in instructions and 25 words in explanations.
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

Show available source images, relevant scripture, and short source summaries in the study panel. Add a clear link to the full image, chapter, or source. Do not tell readers to open another page before they can see the material for a study question. Label summaries as summaries. Preserve image credits and license links. Store shared image metadata in scripts/source-previews.mjs so guides, source lists, and the library use the same preview.

