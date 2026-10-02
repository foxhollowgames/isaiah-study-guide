// Source-checked against the five official 2026 lesson pages on 2026-09-27.
// These lessons omit Isaiah 36–39; passage connections are Meridian reflections.
const lessons = [
  {
    lesson: 38,
    title: 'God Is My Salvation',
    range: 'Isaiah 1–12',
    dates: 'September 14–20',
    summary: 'Encourages reading Isaiah with attention to symbols, Jesus Christ, and multiple prophetic fulfillments. Connects repentance with hope (Isaiah 1), temple worship and gathering (2; 11–12), prophetic calling (6), and trust in the promised Savior (7–9).',
  },
  {
    lesson: 39,
    title: 'A Marvellous Work and a Wonder',
    range: 'Isaiah 13–14; 22; 24–30; 35',
    dates: 'September 21–27',
    summary: 'Uses Babylon as an image of pride and sin (Isaiah 13–14). Finds the Messiah’s mission in 22:22–23; 25:6–8; 26:19; and 28:16. Connects Isaiah 29 with the Restoration and reads 30:18–26 and 35 as invitations to trust the Lord’s power to heal and renew.',
  },
  {
    lesson: 40,
    title: 'Comfort Ye My People',
    range: 'Isaiah 40–49',
    dates: 'September 28–October 4',
    summary: 'Reads these chapters as comfort for future Babylonian captives and for readers facing discouragement. Highlights divine strength (Isaiah 40:29–31), help amid fear (41:10–13), and God’s remembrance of His people (49:13–16). Explores servant language in relation to Christ, Israel, and Cyrus, and God’s power over earthly rulers.',
  },
  {
    lesson: 41,
    title: 'He Hath Borne Our Griefs, and Carried Our Sorrows',
    range: 'Isaiah 50–57',
    dates: 'October 5–11',
    summary: 'Reads Isaiah 53 through Jesus Christ’s suffering for sins and sorrows. Finds hope for returning to Him in 54:4–10 and 57:15–19, and an invitation extending beyond one nation in chapters 55–56. Encourages readers to connect Israel’s difficulties and Isaiah’s prophecies with their own need for divine help.',
  },
  {
    lesson: 42,
    title: 'The Redeemer Shall Come to Zion',
    range: 'Isaiah 58–66',
    dates: 'October 12–18',
    summary: 'Connects fasting with care for people in need (Isaiah 58:3–12) and Sabbath worship with joy (58:13–14). Links the healing mission in 61:1–3 with Jesus’s declaration in Luke 4:16–21. Studies gathering through images of light (60; 62) and looks toward Christ’s millennial reign (65:17–25; 66).',
  },
];

const connections = [
  ['war-of-words', 38, 'The lesson on Isaiah 7–9 emphasizes trust in the Lord during political pressure. Meridian study question: How does Ahaz’s challenge compare with the appeals for trust in Isaiah 36?'],
  ['letter-prayer', 40, 'The lesson on Isaiah 40–49 emphasizes God’s strength over worldly powers. Meridian study question: How does that theme compare with Hezekiah’s prayer to the Creator in Isaiah 37:16–20?'],
  ['illness-sign', 41, 'The lesson on Isaiah 53 emphasizes Christ’s bearing of human grief. Meridian study question: How does hope in the Savior relate to Hezekiah’s distress? His recovery does not promise healing for everyone.'],
  ['song-recovery', 42, 'The lesson connects Isaiah 61:1–3 with the Savior’s healing mission. Meridian study question: How does its change from mourning to joy compare with Hezekiah’s song after recovery?'],
  ['babylon-envoys', 39, 'The lesson on Isaiah 13–14 treats Babylon as a symbol of pride. Meridian study question: How does that theme relate to Hezekiah’s display of wealth in Isaiah 39? Also consider the visitors as people in their historical setting.'],
];

export function addComeFollowMe(content) {
  for (const lesson of lessons) {
    const source = {
      id: `cfm2026-${lesson.lesson}`,
      title: `Come, Follow Me 2026 — ${lesson.range}: “${lesson.title}”`,
      author: 'The Church of Jesus Christ of Latter-day Saints',
      year: `${lesson.dates}, 2026`,
      type: 'LDS Come, Follow Me manual',
      url: `https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/${lesson.lesson}?lang=eng`,
      summary: lesson.summary,
      limitations: `This lesson covers ${lesson.range}. It does not cover Isaiah 36–39. Meridian made the linked questions. The lesson teaches faith. It is not proof from history.`,
      license: 'Linked reading; original Meridian paraphrase. Church lesson text and images are not reproduced.',
    };
    const index = content.sources.findIndex(item => item.id === source.id);
    if (index === -1) content.sources.push(source);
    else content.sources[index] = source;
  }
  for (const [passageId, lesson, reflection] of connections) {
    const passage = content.passages.find(item => item.id === passageId);
    if (!passage?.lds) throw new Error(`Missing LDS passage: ${passageId}`);
    const note = `Related Come, Follow Me lesson (2026): ${reflection}`;
    if (!passage.lds.text.includes(note)) passage.lds.text += ` ${note}`;
    passage.lds.sourceIds = [...new Set([...passage.lds.sourceIds, `cfm2026-${lesson}`])];
  }
  return content;
}
