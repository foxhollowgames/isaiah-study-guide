import { readFile, writeFile } from 'node:fs/promises';

const content = JSON.parse(await readFile(new URL('../dist/data/content.json', import.meta.url), 'utf8'));
const clean = value => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const source = id => content.sources.find(s => s.id === id);
const chapters = content.chapterStudies.map(study => {
  const passages = content.passages.filter(p => p.chapter === study.chapter);
  const ids = [...new Set(passages.flatMap(p => [...p.sourceIds, ...p.lds.sourceIds]))];
  const images = ids.filter(id => source(id)?.image).map(id => source(id).title);
  const quotes = ids.filter(id => {
    const excerpt = source(id)?.excerpt;
    return excerpt && (!excerpt.chapters || excerpt.chapters.includes(study.chapter));
  }).map(id => source(id).title);
  return `| ${study.chapter} | Isaiah ${study.chapter}:${study.verse} | ${clean(images.join('; ') || 'No directly relevant local object image selected')} | ${clean(quotes.join('; ') || 'Exact scripture quotation and source paraphrases')} |`;
});
const sources = content.studySourceReview.map(item => {
  const record = source(item.sourceId);
  return `| ${clean(record.title)} | ${item.chapters.join(', ') || 'Map, word, or library resource'} | ${item.image ? 'Image; ' : ''}${item.quotation ? 'Verified short quotation' : 'Paraphrase or reference'} |`;
});
const report = `# Study enrichment coverage

All 66 chapters have an exact World English Bible quotation and an original explanation. These appear in Historical and LDS mode. Relevant source insights appear in the main text. Sources keep their attribution and full-reading links.

The chapter enrichment pass added 18 verified short quotations from linked works. The earlier Luckenbill quotation remains. There are now ${content.sources.filter(s=>s.image).length} sources with licensed images. The Wikipedia review added article background, artifact and site images, and revised map connections. See WIKIPEDIA-MAP-REVIEW.md for its scope and limits. A chapter without an appropriate image uses its selected passage and explanation. General reading-method advice is labeled separately.

The source inventory covers all ${content.sources.length} source records, including cited works, map data, and language references. It records how each source is used. It is not a claim that every complete external work was read again. Full books, blocked pages, video transcripts, and existing source checks retain their stated limits. Only exact quotations checked against the source text are presented as new direct quotations.

## Chapter coverage

Every row includes an original close-reading note. The table lists chapter-specific quotations from other works; general reading-method quotations are excluded from that column. LDS quotations appear only in LDS mode.

| Chapter | Selected passage | Object image | Other selected quotations |
| --- | --- | --- | --- |
${chapters.join('\n')}

## Source inventory

Chapter associations include works cited within another source. Some associations are related reading rather than direct commentary. The interface labels lessons that omit the current chapter and filters conference material to its actual chapter references.

| Source | Chapter associations | Treatment |
| --- | --- | --- |
${sources.join('\n')}

## Maintenance and checks

Maintain chapter selections in \`scripts/chapter-enrichment.mjs\`. Maintain checked source quotations in \`scripts/study-source-excerpts.json\`. Shared object metadata and the Luckenbill quotation remain in \`scripts/source-previews.mjs\`.

Rebuild with \`node scripts/create-content.mjs\` and \`python scripts/prepare-words.py\`. Refresh this report with \`node scripts/report-study-enrichment.mjs\`. Run \`npm run check\` and \`node --check dist/app.js\`.

Automated checks cover all 66 chapters in both modes, exact passage text, source completeness, attribution, chapter scope, image scope, and whole-word place matches. Browser checks cover an object image in chapter 45, LDS quotations in chapter 41, and a source-details dialog.
`;
await writeFile(new URL('../STUDY-ENRICHMENT.md', import.meta.url), report);
console.log(`Wrote coverage for ${content.chapterStudies.length} chapters and ${content.sources.length} sources.`);
