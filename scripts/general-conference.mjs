import { readFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync(new URL('./conference-isaiah-audit.json', import.meta.url), 'utf8'));
const summaries = {
  '2025-10-14barcellos': 'Uses Isaiah 29:13 alongside Matthew 15:8 to distinguish sincere devotion from outward religious behavior. Barcellos asks listeners to examine their motives and give their hearts to God.',
  '2025-10-17johnson': 'Applies Isaiah 11:1’s image of Jesse’s stem to Jesus Christ. Johnson uses this image to encourage a strong connection with the Savior and reconciliation with God.',
  '2025-10-23jaggi': 'Links Isaiah 6:8 with willingness to answer God’s call. Uses Isaiah 28:10, 13 for gradual understanding of the Atonement. Applies Isaiah 51:17, 22’s cup imagery to Christ’s suffering, alongside 3 Nephi 11:11. These references support teaching about covenants, worship, and strength through suffering.',
  '2025-10-26cziesla': 'Cites Isaiah 9:6 for the title Prince of Peace and Isaiah 49:13 for divine comfort. Cziesla encourages simple, daily discipleship centered on Jesus Christ and His example.',
  '2025-10-35andersen': 'Uses Isaiah 61:3’s promise of beauty from ashes to offer hope to people wounded by others’ sins. Andersen teaches that Christ can heal and strengthen them. He explicitly does not specify when pain, grief, or unwanted memories will end.',
  '2025-10-41holland': 'Applies Isaiah 53:2 to Jesus Christ’s humble appearance. Holland connects this with the broader theme that God can work through ordinary or unexpected people and means. He relates that theme to his testimony of the Book of Mormon.',
  '2025-10-45christofferson': 'Uses Isaiah 45:22 to invite people to seek salvation and strength from God. A quotation from Russell M. Nelson includes Isaiah 1:16–18 in a call to repentance and forgiveness. Christofferson applies these teachings to faith amid personal and public challenges.',
  '2025-10-46spannaus': 'Uses Isaiah 52:1’s garments of Zion and cites Isaiah 28:16 alongside Psalm 125:1. Spannaus applies these images to confidence in Christ’s kingdom. She encourages testimony, repentance, and attention to living prophets.',
  '2025-10-51bednar': 'Cites Isaiah 11:2–3 with Job and Proverbs while distinguishing reverence for God from anxious fear. Bednar teaches that faith, repentance, and covenant keeping can bring confidence about the Final Judgment.',
  '2025-10-52cuvelier': 'Cites Isaiah 28:10 alongside Doctrine and Covenants 98:12 to describe discipleship as gradual growth. Concludes with Isaiah 43:1’s assurance of being called by name and belonging to the Redeemer. Cuvelier encourages listeners to make their identity as Christ’s disciples their priority.',
  '2025-10-55renlund': 'Names Isaiah in note 20 while quoting Luke 4:18 about Christ’s mission to heal and bring freedom. Renlund connects that mission with taking Christ’s name and serving vulnerable or wounded people. This is an Isaiah reference through Luke, not a numbered Isaiah citation.',
  '2026-04-13kearon': 'Cites Isaiah 55:8–11 with Proverbs while discussing trust when Church callings change. Kearon encourages faith during assignments that challenge expectations, require adjustment, or attract little attention.',
  '2026-04-14yee': 'Cites Isaiah 41:10 to assure listeners that the Lord accompanies them in ministering. Yee teaches that He knows the people they serve and can help them meet individual needs.',
  '2026-04-15gilbert': 'Cites Isaiah 58:12 in applying the name Repairer to Jesus Christ. Gilbert presents Christ’s invitation to return and describes Him as the Redeemer who helps people come home.',
  '2026-04-210soares': 'Cites Isaiah 55:1, 3, 6, 12 among invitations to receive spiritual nourishment from Christ. Soares connects these verses with the image of Jesus as the True Vine and with lasting spiritual growth.',
  '2026-04-26wunderli': 'Cites Isaiah 41:10 in his concluding assurance that Jesus Christ gives strength and relief. Wunderli encourages listeners to continue walking with Christ during difficult experiences.',
  '2026-04-29matswagothata': 'Quotes Isaiah 40:31 in note 16 to support renewed strength through waiting upon the Lord. Matswagothata connects this promise with trusting Christ during trials and hoping for a better future.',
  '2026-04-44rowe': 'Quotes Isaiah 41:10 and 43:1, 3 in note 17 as assurances against fear. Rowe applies their promises of strength, redemption, and personal care to following Christ as guide and healer.',
  '2026-04-45rasband': 'Uses Isaiah 41:10’s supporting hand and Isaiah 49:16’s engraved palms to describe Christ’s continuing care. Note 10 also cites Isaiah 45:23 alongside the promise that every knee will bow. Rasband places these references within his Easter witness of Christ’s Resurrection.',
  '2026-04-53hall': 'Uses Isaiah 9:6 for names of Christ, including Prince of Peace and Counselor. Cites Isaiah 49:16 when describing the Redeemer’s mercy and Isaiah 33:22 when calling Him the Lawgiver. Hall connects these names with repentance, forgiveness, and covenant discipleship.',
  '2026-04-54porter': 'Cites Isaiah 53:4–5 in teaching children about Christ’s suffering for sins and life’s challenges. Porter connects His Atonement and Resurrection with hope and willingness to serve. The verified Isaiah citation is 53:4–5, rather than an assumed citation based on the talk’s title.',
  '2026-04-55andersen': 'Applies Isaiah 40:28–29, 31 to strength and patience within an eternal marriage. Andersen adapts the wording to address a couple waiting upon the Lord together. The published quotation marks these additions with brackets.',
};

export function addGeneralConference(content) {
  for (const talk of audit.matches) {
    const summary = summaries[talk.key];
    if (!summary) throw new Error(`Missing conference summary: ${talk.key}`);
    const record = {
      id: `gc-${talk.key}`, title: talk.title, author: talk.author,
      year: talk.conference, type: 'LDS general conference talk', url: talk.url,
      group: 'conference-year', conference: talk.conference, summary,
      scriptureReferences: talk.references,
      reviewed: 'Official English text, Isaiah references, and the associated paragraphs checked on September 27, 2026.',
      limitations: 'This talk uses Isaiah for religious teaching. Its verified references are outside Isaiah 36–39. Related pilot study questions are Meridian reflections, not claims that the speaker discussed those chapters.',
      license: 'Linked Church resource; original Meridian summary. Talk text and media are not reproduced.',
    };
    const index = content.sources.findIndex(s => s.id === record.id);
    if (index < 0) content.sources.push(record);
    else content.sources[index] = record;
  }
  const connections = [
    ['war-of-words', 'gc-2026-04-44rowe', 'Rowe uses Isaiah 41:10 and 43:1, 3 to discuss trust when fear arises. Meridian study question: How does this counsel relate to the threats in Isaiah 36?'],
    ['illness-sign', 'gc-2025-10-35andersen', 'Andersen uses Isaiah 61:3 to offer hope after suffering, without setting a time for healing. Meridian study question: How does this help distinguish hope in Christ from a promise of immediate recovery?'],
    ['song-recovery', 'gc-2026-04-29matswagothata', 'Matswagothata uses Isaiah 40:31 to discuss renewed strength during trials. Meridian study question: How does this compare with Hezekiah’s gratitude for restored life?'],
  ];
  for (const [id, sourceId, reflection] of connections) {
    const passage = content.passages.find(p => p.id === id);
    if (!passage?.lds) throw new Error(`Missing LDS passage: ${id}`);
    const note = `Related general conference study: ${reflection}`;
    if (!passage.lds.text.includes(note)) passage.lds.text += ` ${note}`;
    passage.lds.sourceIds = [...new Set([...passage.lds.sourceIds, sourceId])];
  }
}
