# Project instructions

Read `WRITING-GUIDE.md` before changing reader text.
Read `BIBLE-SOURCE-POLICY.md` before adding research claims or evidence.
Read `DATA-CONTRACT.md` before changing generated data or its renderer.

## Content standard

Use Isaiah's existing reading and evidence presentation as the reference.
Every ready chapter needs an original contextual explanation and a meaningful exact Scripture selection.
Explain why the passage works as it does.
Use surrounding passages to explain speakers, customs, power, consequences, and literary choices.
Do not substitute a plot recap, short moral, or repeated paragraph for context.
Short sentences must preserve facts, connected reasoning, and uncertainty.
Keep biblical statements, original close readings, scholarship, material evidence, and Church teaching distinct.
Show relevant evidence beside the explanation.
Use artifact photographs only when their actual identity and limits support the selected passage.
Keep licensed image credits and source links.
Keep the shared artwork note in the footer.
Do not place AI illustration disclaimers beneath portraits.

## Maintain and release

Edit persistent source files before rebuilding generated files.
Added-book context lives in `scripts/book-context-complete/*.json`.
Run `python scripts/build-native-books.py` after changing those records.
Run `npm run check` and `npm run check:bible` before publication.
Check representative chapters, guides, source dialogs, and photographs in both reading perspectives.
Do not claim source review, full coverage, or publication without supporting checks.
The current production site uses GitHub Pages from `dist` on `main`.
Publish through that existing workflow when the user authorizes publication.
Do not change hosting providers or the public address without a user request.

## Communication

Use active voice and plain English based on ASD-STE100 principles.
Keep descriptive sentences within 25 words and instructional sentences within 20 words.
Read the installed `i-have-adhd` skill when available.
Start updates with the result, status, or next action.
Do not claim verified STE100 compliance without a full applicable rules and dictionary review.
