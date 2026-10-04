import { readFileSync } from 'node:fs';

const excerpts = JSON.parse(readFileSync(new URL('./study-source-excerpts.json', import.meta.url), 'utf8'));

// Original close-reading notes. Quotations come from the cached public-domain WEB.
// Each selection has a specific chapter and verse; none is a generic book-wide quote.
const readings = `
1|17|The commands turn worship into duties toward people who lack protection. Read them with the rejection of empty sacrifices in verses 11–15.
2|4|Tools for war become tools for growing food. Peace follows the nations learning and accepting God's judgment in verses 2–4.
3|15|The accusation concerns what leaders do to the poor. It makes the chapter's loss of leadership a question of justice, not only political weakness.
4|6|Shelter completes the images of cloud and fire in verse 5. The promise concerns the survivors in Zion after cleansing.
5|7|The poem identifies its own vineyard as Israel and Judah. Its failed harvest means oppression and distress where God expected justice.
6|8|Isaiah volunteers after the cleansing of his lips. The difficult commission in verses 9–13 prevents this response from becoming a simple success story.
7|9|The warning addresses Ahaz during the threat from Aram and Israel. The sign that follows belongs within this immediate appeal for trust.
8|12|The warning challenges fear shared by the surrounding community. Verses 13–14 redirect attention to the LORD rather than the threat itself.
9|7|Justice and righteousness define the promised rule. The royal titles in verse 6 belong with this description of what the ruler will do.
10|15|The tool cannot claim the skill of the person who uses it. This image exposes Assyria's pride without excusing the empire's violence.
11|4|The ruler's judgment protects poor and humble people. Read the peaceful animals in verses 6–9 as part of this wider vision of a just world.
12|3|Water gives the song a concrete image of received life and joy. Thanksgiving then becomes a public invitation to tell others what God has done.
13|11|The attack on Babylon belongs within a wider judgment on arrogance and evil. The cosmic images amplify the scale of that judgment.
14|4|The text introduces the poem as a taunt against Babylon's king. Keep this stated target in view when reading the fallen morning star in verse 12.
15|5|The speaker grieves for Moab while describing its flight. The named roads and towns express human suffering; they do not establish a complete refugee itinerary.
16|4|The appeal asks for protection from a destroyer. Read it with the call for a just throne in verse 5 and the lament over Moab's pride.
17|7|Loss changes where people look for security. Verse 8 contrasts the Maker with altars and objects made by human hands.
18|7|The chapter ends with a gift brought to Zion from a distant people. The earlier messengers and the final gift belong to different scenes in the poem.
19|25|The blessing applies language of belonging to Egypt and Assyria as well as Israel. This ending changes the direction of a chapter that began with Egypt's distress.
20|5|The sign exposes the weakness of the powers in which people placed their hope. Isaiah's action in verses 2–4 represents captivity, not a travel account.
21|14|Food and water answer the needs of people fleeing violence. The scene about Arabia follows the separate announcements concerning Babylon and Dumah.
22|11|The criticism concerns failure to look to God while preparing defenses. The verse names waterworks but does not identify every surviving structure in Jerusalem.
23|9|Tyre's loss becomes a judgment on pride in wealth and status. Its trading connections explain why the lament reaches beyond one city.
24|5|The vision links a damaged world with broken obligations. Its wide scope crosses social ranks rather than describing one local campaign.
25|8|The promise reaches death, grief, and public shame. Read it beside the feast for all peoples in verse 6.
26|19|Hope for the dead follows images of failed childbirth and national distress. The song holds this hope beside the command to wait through judgment.
27|6|Fruitfulness reverses the failed vineyard in chapter 5. The chapter also describes judgment and a gathering to worship in Jerusalem.
28|16|A secure foundation answers the rulers' false security in verses 14–15. Compare this promise with the warning about failed understanding earlier in the chapter.
29|13|Words of worship do not guarantee a willing heart. This accusation belongs with the images of sealed writing and failed understanding.
30|15|The offer of rest stands against the rush to obtain Egyptian help. The verse ends by recording refusal, so the promise also exposes a failed choice.
31|3|The contrast names the limits of human military power. The chapter challenges reliance on Egypt without treating horses or planning as divine protection.
32|17|Peace follows righteousness. Read the quiet homes in verse 18 with the preceding promise that the spirit will bring justice to the land.
33|22|Judgment, law, and kingship are joined in the LORD. This confession answers the chapter's broken agreements, danger, and longing for security.
34|8|The poem names Zion's cause within its judgment on Edom. Its devastated landscape is poetic judgment imagery, not a dated map of one invasion.
35|10|The road ends with redeemed people returning to Zion in joy. The wilderness, healing, and safe passage belong to the same restoration vision.
36|6|The Assyrian speaker uses a broken reed to attack trust in Egypt. This is part of his argument to Jerusalem, not the narrator's neutral description.
37|20|Hezekiah asks for rescue so that other kingdoms will recognize the LORD. Compare this purpose with the self-praise in Assyrian royal records.
38|16|The speaker connects recovery with renewed life before God. The surrounding song moves through fear, distress, gratitude, and a duty to tell the next generation.
39|6|The warning turns attention from displayed wealth to its future removal. The chapter's placement does not by itself establish when the visit occurred.
40|28|The Creator does not share human exhaustion. Verses 29–31 connect that claim with strength for people who feel overlooked and weary.
41|10|The assurance addresses the servant people named as Israel and Jacob in verses 8–9. Later personal applications should retain this collective setting.
42|3|The servant brings justice without destroying what is already weak. The manner of the mission matters alongside the question of the servant's identity.
43|1|Naming expresses belonging after the judgment at the end of chapter 42. The assurances about water and fire continue this promise of presence.
44|28|The text names Cyrus and connects his work with Jerusalem and the temple. A separate Persian royal object can illuminate his policies without proving every claim in this prophecy.
45|1|Cyrus receives a role in God's purpose even though verses 4–5 say he does not know the LORD. Political power is placed within a larger claim about God's rule.
46|4|God carries the people across their lives. This reverses the opening picture of people and animals carrying idols that cannot save their carriers.
47|10|Babylon's confidence depends on the belief that no one can hold it accountable. The poem removes that security along with the city's royal status.
48|20|The command to leave Babylon leads into an announcement of redemption. Verse 21 uses water in the wilderness to connect departure with divine provision.
49|15|A mother's care answers Zion's complaint of being forgotten in verse 14. The engraved palms in verse 16 extend the assurance of remembrance.
50|4|The servant listens before speaking to weary people. The following verses connect this listening with obedience and suffering.
51|3|Restoration changes waste ground into a garden. The chapter asks its listeners to remember earlier acts of God while waiting for comfort.
52|7|The messenger announces peace, salvation, and God's reign. Verses 8–12 turn this announcement into celebration and a call to leave in purity.
53|4|The speakers revise their judgment of the servant. What they first understood as punishment becomes suffering borne for others.
54|10|The covenant of peace is pictured as more secure than mountains. Read this assurance as an answer to the earlier images of abandonment and shame.
55|1|Food and drink are offered to people without money. Verses 2–3 explain the invitation through listening, life, and an enduring covenant.
56|7|The promise includes the foreigners and eunuchs addressed in verses 3–6. Worship and belonging are connected with covenant faithfulness rather than ancestry alone.
57|15|The high and holy God also dwells with humble, contrite people. The promise of renewal follows the chapter's criticism of false worship.
58|7|The chosen fast includes food, shelter, clothing, and care for kin. These duties explain why fasting alongside oppression fails in the earlier verses.
59|16|The failure of justice and the absence of an intercessor lead to divine action. The armor in verse 17 develops this image of rescue and judgment.
60|3|Zion's light draws nations and rulers. The vision concerns the restoration of a humiliated city, not a reconstructed route for a historical procession.
61|1|The speaker's anointing serves poor, wounded, and captive people. The following verses join release with comfort and the rebuilding of ruined communities.
62|4|New names replace abandonment and desolation. The marriage image describes a restored relationship between the land, its people, and God.
63|9|The prayer recalls mercy and rescue before confessing rebellion and absence. Remembered care gives the speakers grounds to ask for help again.
64|8|The clay image expresses dependence on the maker. The prayer still names guilt and ruined holy places; trust does not erase that distress.
65|17|New creation answers the former troubles named in verse 16. The following vision describes joy, homes, fruitful work, and peace.
66|2|God values humility and responsiveness to his word. This claim qualifies confidence in a temple that human hands can build.
`.trim().split('\n').map(line => {
  const [chapter, verse, context] = line.split('|');
  return {chapter:Number(chapter), verse:Number(verse), context};
});

export function addChapterEnrichment(content, scripture) {
  for (const source of content.sources) if (excerpts[source.id]) {
    source.excerpt = excerpts[source.id];
    source.license = 'Linked source with original study guide notes and a short attributed quotation. Other text and media are linked, not reproduced.';
    source.reviewed = `${source.reviewed || ''} ${excerpts[source.id].checked}`.trim();
  }
  const coverage = {
    'cfm2026-38': Array.from({length:12}, (_, i) => i + 1),
    'cfm2026-39': [13,14,22,24,25,26,27,28,29,30,35],
    'cfm2026-40': Array.from({length:10}, (_, i) => i + 40),
    'cfm2026-41': Array.from({length:8}, (_, i) => i + 50),
    'cfm2026-42': Array.from({length:9}, (_, i) => i + 58)
  };
  const studyTexts = {
    met701: 'Assyrian writings and wall pictures tell about Judah’s losses. The Bible tells how Jerusalem lived. Each source has a different goal. We still do not know why Assyria left.',
    rinap: 'The Assyrian writing tells about attacks on Judah’s walled towns. It praises the king. Part of the writing is gone. Its numbers may not be exact.',
    anderson: 'Joel E. Anderson and Pieter M. Venter argue that Isaiah 36–39 forms a coherent account and may have been written before the parallel account in Kings. They connect its purpose with debate after Sennacherib’s invasion. These are scholarly arguments, not settled dates or proof of every reported event.',
    'prism-luckenbill': 'The Chicago Prism says Assyria took 46 walled cities. It also names people and gifts that were taken. It says Hezekiah was trapped in Jerusalem. It does not say that Assyria took the city. The king’s totals may not be exact.',
    'prism-jerusalem': 'The Jerusalem Prism is another copy of the king’s story. The Israel Museum compares it with Isaiah 36–37. The clay writing does not clearly say that Assyria attacked Jerusalem’s walls.',
    'opening-isaiah': 'Madsen and Hopkin compare Isaiah across five text traditions. Their columns help readers notice differences in wording and interpretation. This is a scholarly LDS study aid, not an official statement of Church doctrine.',
    'opening-isaiah-sample': 'The public harmony sample places Isaiah texts in parallel columns with explanatory notes. It covers Isaiah 1–6 and ends at 7:1. A blank cell does not by itself show that a manuscript lacks a passage.'
  };
  for (const source of content.sources) {
    if (coverage[source.id]) source.chapterCoverage = coverage[source.id];
    if (studyTexts[source.id]) source.studyText = studyTexts[source.id];
    if (source.group === 'conference-year') {
      const name = source.author.split(' ').at(-1);
      source.studyText = source.summary.replace(/^(Uses|Cites|Quotes|Applies|Names|Links)/, verb => `${name} ${verb.toLowerCase()}`);
    }
    if (source.id.startsWith('cfm2026-')) {
      const range = source.title.match(/— (.*?):/)?.[1] || 'these chapters';
      source.studyText = `The Come, Follow Me lesson for ${range}. ${source.summary}`;
    }
  }
  content.chapterStudies = readings.map(reading => {
    const verse = scripture.chapters[reading.chapter]?.find(v => v.verse === reading.verse);
    if (!verse) throw new Error(`Missing study quotation: ${reading.chapter}:${reading.verse}`);
    const sourceId = reading.chapter === 36 ? 'web' : `web${reading.chapter}`;
    return {...reading, text:verse.text, sourceId, attribution:'World English Bible · Public domain',
      url:`https://ebible.org/engwebp/ISA${String(reading.chapter).padStart(2,'0')}.htm#V${reading.verse}`};
  });
  // These chapters name Cyrus. Do not attach the cylinder to every restoration vision.
  for (const chapter of [44,45]) {
    const passage = content.passages.find(p => p.chapter === chapter);
    passage.sourceIds = [...new Set([...passage.sourceIds, 'cyrus'])];
  }
  // Manuscript evidence is relevant to this chapter's discussion of the servant text.
  const servant = content.passages.find(p => p.chapter === 53);
  servant.sourceIds = [...new Set([...servant.sourceIds, 'dm-scroll'])];
  // Retain the explicit Isaiah reference through Luke rather than losing it in chapter matching.
  const mission = content.passages.find(p => p.chapter === 61);
  mission.lds.sourceIds = [...new Set([...mission.lds.sourceIds, 'gc-2025-10-55renlund'])];

  // Keep study-method resources distinct from commentary on a particular chapter.
  for (const passage of content.passages) {
    passage.lds.text = passage.lds.text
      .replace(/ Read the linked Come, Follow Me lesson for the Church study perspective\./g, '')
      .replace(/ The linked conference talks cite this chapter\. See each source summary for its use of the passage\./g, '');
  }

  // Audit every source, including references which need no image or prose quotation.
  const expandIds = ids => {
    const expanded = new Set(ids);
    for (const id of expanded) {
      const source = content.sources.find(s => s.id === id);
      for (const cited of source?.citedSourceIds || []) expanded.add(cited);
    }
    return expanded;
  };
  content.studySourceReview = content.sources.map(source => {
    const chapters = [...new Set(content.passages.filter(p => expandIds([
      ...p.sourceIds, ...(p.lds?.sourceIds || []), ...(p.studyNotes || []).flatMap(n => n.sourceIds || [])
    ]).has(source.id)).map(p => p.chapter))];
    const referenceOnly = /^(web\d*|geo|earth|strong|oshb|lxx\d+)$/.test(source.id);
    return {sourceId:source.id, chapters, image:!!source.image, quotation:!!source.excerpt,
      treatment:referenceOnly ? (/^web/.test(source.id) ? 'Exact passage quotations; chapter notes explain the selected text.' : 'Map attribution or original language terms; no decorative image or generic quotation.')
        : 'Relevant source insights appear in the main study text. Available images and verified excerpts appear beside them.',
      quotationCheck:source.excerpt?.checked || 'No new direct quotation selected. Existing source notes remain paraphrases.',
      accessLimits:source.limitations || ''};
  });
}
