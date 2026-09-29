// Reviewed 2026-09-27. Video summaries use YouTube's English auto-captions.
// Publisher and university records verify bibliography. Access limits stay visible.
const license = 'Linked resource; original Meridian summary. Video, transcript, and publication text are not reproduced.';
const group = 'mcclellan';
const sources = [
  {
    id: 'dm-isaiah53', title: 'My claim about Isaiah 53 is “demonstrably false”?',
    author: 'Dan McClellan', year: 'September 2, 2026', type: 'Scholar video',
    url: 'https://www.youtube.com/watch?v=kfaeHPSkMHY',
    summary: 'McClellan reads the servant as Israel and its suffering as exile. He distinguishes a messianic reading from a reading about a suffering, dying Messiah. He argues that Targum Jonathan does not establish that second reading before Christianity. He cites studies of the Targum’s formation and its victorious Messiah. Page’s cited conclusion leaves earlier developments possible, while questioning claims of a fully developed expectation.',
    limitations: 'Broader Isaiah study: Isaiah 49 and 52:13–53:12, outside the pilot chapters. This is McClellan’s historical argument, not Church teaching. The servant’s identity and the history of interpretation remain debated. Lack of surviving evidence does not establish that an interpretation never existed.',
    reviewed: 'English auto-captions reviewed. Publication titles checked against publisher or university records.',
    citedSourceIds: ['dm-chilton','dm-page','dm-suffering-servant','dm-tooman'],
    timestamps: [{seconds:100,label:'1:40 · Scope of the claim'},{seconds:211,label:'3:31 · Chilton'},{seconds:293,label:'4:53 · Page and uncertainty'},{seconds:467,label:'7:47 · The Suffering Servant'},{seconds:557,label:'9:17 · Tooman and the Targum'}],
  },
  {
    id: 'dm-deutero', title: 'What is Deutero-Isaiah?',
    author: 'Dan McClellan', year: 'October 10, 2024', type: 'Scholar video',
    url: 'https://www.youtube.com/watch?v=wd34rzWRjCM',
    summary: 'Deutero-Isaiah means Second Isaiah, the scholarly name for Isaiah 40–55. McClellan explains the case for composition centuries after the eighth-century prophet. He contrasts the warning of exile in Isaiah 39 with the exile already assumed in chapter 40. He also points to changes in style and vocabulary. He notes that chapters 1–39 contain later editing too.',
    limitations: 'Direct connection: Isaiah 39’s transition to chapter 40. This short account presents a scholarly position, not a full review of authorship evidence. A change in chapter number alone does not prove a change of author. No named secondary publication was identified in the reviewed transcript.',
    reviewed: 'English auto-captions and video date reviewed.',
    timestamps: [{seconds:33,label:'0:33 · Isaiah 39 to 40'},{seconds:136,label:'2:16 · Authorship conclusion'}],
  },
  {
    id: 'dm-scroll', title: 'Does the Great Isaiah Scroll prove the Bible hasn’t changed?',
    author: 'Dan McClellan', year: 'May 3, 2024', type: 'Scholar video',
    url: 'https://www.youtube.com/watch?v=HL9N-pF5pcU',
    summary: 'McClellan compares Isaiah 53 in the Great Isaiah Scroll with the traditional Hebrew text represented by the Leningrad Codex. He uses The Biblical Qumran Scrolls to show differences between manuscripts. Many differences concern spelling, while others affect wording or meaning. His example includes “light” in Isaiah 53:11. He distinguishes strong preservation from an entirely unchanged text.',
    limitations: 'Broader Isaiah study: manuscript transmission, illustrated with Isaiah 53. The video’s numerical counts were not independently recalculated. Its examples do not establish a rate of change for the whole Bible. A manuscript’s copying date is not the date of the work’s original composition.',
    reviewed: 'English auto-captions reviewed. The cited edition’s identity and scope were checked with its publisher.',
    citedSourceIds: ['dm-ulrich'],
    timestamps: [{seconds:63,label:'1:03 · Edition and variant readings'},{seconds:270,label:'4:30 · Isaiah 53:11'},{seconds:336,label:'5:36 · Preservation and its limits'}],
  },
  {
    id: 'dm-line', title: 'What’s going on with “line upon line” in Isaiah 28:10?',
    author: 'Dan McClellan', year: 'May 23, 2024', type: 'Scholar video',
    url: 'https://www.youtube.com/watch?v=bLDWQ6vW1qA',
    summary: 'McClellan interprets Isaiah 28:10’s repeated sounds as an imitation of speech that listeners cannot understand. He relates the phrase to verses 11–13 and their warning of failed understanding. He argues that the ancient Greek translation does not resolve the difficult Hebrew wording. This reading differs from using the familiar English phrase as a rule for gradual learning.',
    limitations: 'Broader Isaiah study: Isaiah 28:9–13, outside the pilot chapters. This is one historical interpretation of difficult language. Later devotional uses answer a different question. No named secondary publication was identified in the reviewed transcript.',
    reviewed: 'English auto-captions and video date reviewed. No Hebrew transcription was copied from the auto-captions.',
    timestamps: [{seconds:18,label:'0:18 · Translation question'},{seconds:60,label:'1:00 · Context in Isaiah 28'}],
  },
  {
    id: 'dm-chilton', title: 'The Glory of Israel: The Theology and Provenience of the Isaiah Targum',
    author: 'Bruce D. Chilton', year: '1982 original; linked publisher edition dated 1983', type: 'Scholarly book',
    url: 'https://www.bloomsbury.com/uk/glory-of-israel-9780567460929/',
    summary: 'Studies how the Isaiah Targum developed across the first through fourth centuries CE. A Targum is an Aramaic translation that also interprets the text. McClellan cites Chilton at 3:31 when discussing stages of interpretation around 70–135 CE. The useful distinction is between a text’s surviving form and earlier traditions within it.',
    limitations: 'Publisher description and the excerpt read in the video were reviewed, not the complete book. The proposed dates describe layers of interpretation. They do not date every sentence. The linked edition’s date differs from the 1982 original cited in the video.',
    reviewed: 'Publisher record checked. Video excerpt supplies the specific dating discussion.',
  },
  {
    id: 'dm-page', title: 'The Suffering Servant between the Testaments',
    author: 'S. H. T. Page', year: '1985 · New Testament Studies 31(4), 481–497', type: 'Scholarly article',
    url: 'https://www.cambridge.org/core/journals/new-testament-studies/article/abs/suffering-servant-between-the-testaments/EA79EE87245D6E4AF34470865632660B',
    summary: 'Examines whether a messianic interpretation of the suffering servant existed before Christianity. In the conclusion read at 5:10–6:55, Page rejects claims of uniform interpretation. He also rejects ruling out earlier possibilities. He considers a developed expectation of a Messiah who atones through suffering unlikely, while allowing preparatory ideas. This qualification matters when assessing McClellan’s stronger opening wording.',
    limitations: 'Cambridge’s record, extract, and references were accessible. The conclusion was reviewed through McClellan’s reading, not a complete independent reading of the article. This 1985 study does not represent every subsequent argument.',
    reviewed: 'Bibliography checked with Cambridge. Conclusion summary is explicitly indirect, through the cited video.',
  },
  {
    id: 'dm-suffering-servant', title: 'The Suffering Servant: Isaiah 53 in Jewish and Christian Sources',
    author: 'Bernd Janowski and Peter Stuhlmacher, editors', year: '2004', type: 'Scholarly essay collection',
    url: 'https://www.eerdmans.com/9780802808455/the-suffering-servant/',
    summary: 'Collects studies of Isaiah 53 in Jewish and Christian interpretation. McClellan introduces this volume at 7:47. His selected passage discusses the Targum’s victorious Messiah and cautions against assuming that its changes were directed against Christianity. The collection provides a route to broader study of the passage’s interpretation.',
    limitations: 'Publisher description and the excerpt read in the video were reviewed. The complete collection was not read. The chapter author and page for the displayed excerpt were not independently verified. The selected excerpt must not be treated as the conclusion of every contributor.',
    reviewed: 'Title, editors, and publication year checked with Eerdmans. Excerpt summary is indirect, through the video.',
  },
  {
    id: 'dm-tooman', title: 'The Servant-Messiah and the Messiah’s Servants in Targum Jonathan Isaiah',
    author: 'William A. Tooman', year: '2021 · in Isaiah’s Servants in Early Judaism and Christianity', type: 'Scholarly chapter · free manuscript',
    url: 'https://research-repository.st-andrews.ac.uk/bitstream/10023/28155/1/Servant_and_Servants_in_TJ_Isaiah_WUNT_.pdf',
    summary: 'Tooman compares the traditional Hebrew text with the Isaiah Targum. The Targum presents a victorious Messiah who protects those who suffer. Its servants are the righteous who obey Torah, God’s instruction. They can include outsiders who join the covenant. This changes how the servant and the community relate. McClellan cites the chapter at 9:17.',
    limitations: 'The university repository provides an accessible manuscript. Its pagination can differ from the published chapter. The argument concerns this Targum’s interpretation, not every Jewish reading of Isaiah. The university dates publication to 2021, despite the video’s approximate recollection of its age.',
    reviewed: 'Repository manuscript and University of St Andrews publication record reviewed.',
  },
  {
    id: 'dm-ulrich', title: 'The Biblical Qumran Scrolls: Transcriptions and Textual Variants',
    author: 'Eugene Ulrich, editor', year: '2010', type: 'Scholarly manuscript edition',
    url: 'https://www.degruyterbrill.com/document/isbn/9789004181830/html',
    summary: 'Presents transcriptions of biblical manuscripts from Qumran and records differences between texts. McClellan introduces it at 1:07 in his Great Isaiah Scroll video. A critical apparatus is the set of notes that identifies these differences. It helps readers check which manuscript supports a reading instead of relying on a general claim of accuracy.',
    limitations: 'Publisher description and McClellan’s explanation were reviewed, not the complete edition. The local guide does not reproduce its transcriptions or apparatus. The video’s letter counts remain attributed to McClellan.',
    reviewed: 'Bibliography and scope checked with the publisher. Passage-level discussion comes from the video.',
  },
];

export function addMcClellan(content) {
  for (const source of sources) {
    const record = {...source, group, license};
    const index = content.sources.findIndex(s => s.id === record.id);
    if (index < 0) content.sources.push(record);
    else content.sources[index] = record;
  }
  const passage = content.passages.find(p => p.chapter === 39 && p.start <= 6 && p.end >= 6);
  if (!passage) throw new Error('Missing Isaiah 39:6 passage');
  const note = ' McClellan’s authorship overview contrasts this warning of exile with the exile already assumed in Isaiah 40. He presents this shift as evidence for later composition of Isaiah 40–55, often called Second Isaiah.';
  if (!passage.summary.includes(note.trim())) passage.summary += note;
  passage.sourceIds = [...new Set([...passage.sourceIds, 'dm-deutero'])];
  const step = content.guides.find(g => g.id === 'horizon')?.steps.find(s => s.title === 'Jerusalem’s later destruction');
  if (!step) throw new Error('Missing Babylon guide step');
  const study = ' Related authorship study: McClellan compares Isaiah 39’s warning with chapter 40’s perspective after exile. His video explains the term Second Isaiah.';
  if (!step.text.includes(study.trim())) step.text += study;
  step.sourceIds = [...new Set([...step.sourceIds, 'dm-deutero'])];
  return content;
}
