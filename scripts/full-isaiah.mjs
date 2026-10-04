// Original reading notes. These summarize the cited chapter, not an independent historical reconstruction.
// Fields: chapter | title | reading summary | devotional question | map reference places.
const notes = `
1|Worship and justice|The opening vision addresses Judah and Jerusalem. Sacrifices cannot replace justice for vulnerable people. The chapter joins a call to repentance with a promise to restore the city.|How can worship lead to care for people who lack protection?|jerusalem
2|Nations learn peace|The nations come to the LORD's mountain to learn his ways. The vision of peace gives way to a warning against pride, wealth, and idols. Human power cannot provide lasting security.|What would learning the Lord's ways change about how you treat others?|jerusalem
3|Leadership and responsibility|Judah loses stable leadership. The LORD brings a case against leaders who exploit the poor. The chapter's images of lost luxury end with Jerusalem mourning its losses.|How should people with authority answer for the treatment of the poor?|jerusalem
4|Cleansing and shelter|Verse 1 continues the distress described in chapter 3. The remaining verses picture a purified Jerusalem under divine protection. Cloud, fire, and shelter describe the LORD's presence with the survivors.|How do cleansing and protection work together in this promise?|jerusalem
5|The vineyard and its fruit|A vineyard song becomes an accusation against Israel and Judah. God looks for justice but finds bloodshed. Warnings against exploitation and moral confusion lead to an image of an approaching army.|What actions would count as good fruit in your community?|jerusalem
6|Isaiah's call|Isaiah sees the Lord in the year of King Uzziah's death. A burning coal cleanses his lips before he accepts a difficult commission. The account ends with devastation and the image of a holy seed.|How does Isaiah's awareness of his weakness affect his response to the call?|jerusalem
7|Ahaz faces a threat|Aram and Israel threaten Judah, and Isaiah tells Ahaz not to fear. The sign of Immanuel concerns this crisis, while Christian readings also connect it with Jesus. Assyria becomes a danger to Judah itself.|How does fear affect Ahaz's willingness to trust the Lord?|jerusalem,damascus,samaria
8|Signs and competing voices|Isaiah's child's name announces plunder approaching Damascus and Samaria. Assyria appears as a flood reaching Judah. The prophet contrasts trust in the LORD with fear and consultation of the dead.|Which voices do people consult when they feel afraid?|jerusalem,damascus,samaria
9|Light and a just ruler|Light breaks into a land of distress. A promised child bears royal titles and establishes justice. The chapter then turns to judgment against pride, corrupt leadership, and conflict within Israel.|How does the promised ruler's justice shape a faithful reading of hope?|samaria,jerusalem
10|Assyria and the remnant|The chapter condemns unjust decrees before addressing Assyria as an instrument that becomes proud. A remnant returns to the mighty God. An approaching army threatens Zion, but the final image cuts down lofty trees.|How can success lead people to forget their responsibility to others?|jerusalem,samaria
11|A ruler from Jesse's line|A shoot from Jesse's stump receives the LORD's spirit and judges with justice. Peace reaches even the animal world. The chapter pictures scattered people gathering and divisions within Israel ending.|What does this vision teach about justice for the poor?|jerusalem
12|Songs of salvation|Two short songs respond to deliverance with trust and thanksgiving. Images of water, singing, and public witness describe the people's response. Zion celebrates the presence of the Holy One of Israel.|What would it mean to share gratitude without hiding earlier fear?|jerusalem
13|Judgment on Babylon|The oracle announces the day of the LORD through images of war and cosmic disorder. It names the Medes in the attack on Babylon. The ruined city becomes a warning about imperial pride.|How does the fall of a powerful city challenge confidence in worldly security?|babylon
14|A fallen king|Israel's relief from oppression leads into a taunt against Babylon's king. The fallen morning star belongs to this poem about royal pride. Oracles against Assyria and Philistia follow the taunt.|How does the poem expose the cost of a ruler's ambition?|babylon,jerusalem
15|Mourning for Moab|Moab's towns face destruction and flight. The poem describes public grief, failed harvests, and refugees carrying their possessions. Its lament gives attention to the suffering of Judah's neighbor.|What does attention to a neighboring people's grief ask of the reader?|
16|Refuge and Moab's pride|Moab seeks protection, and a just throne in David's tent appears in the appeal. Pride and ruined vineyards dominate the lament. The closing notice gives a three-year limit for Moab's loss of glory.|How does this chapter place pride beside the need for refuge?|jerusalem
17|Damascus and Israel|Damascus and Ephraim face loss, though a small remnant remains. The poem contrasts looking to the Maker with reliance on human-made altars. The noise of threatening nations ends in sudden defeat.|What changes when people look to their Maker rather than their own works?|damascus,samaria
18|Messengers from Cush|The oracle addresses a land associated with Cush and describes swift messengers. The LORD watches quietly before cutting back growth. The closing scene brings a gift to Mount Zion.|What does the contrast between urgent messengers and divine waiting invite you to consider?|jerusalem
19|Egypt, Assyria, and Israel|Egypt faces conflict, failed counsel, and economic distress. The ending imagines Egyptians turning to the LORD. A shared blessing joins Egypt, Assyria, and Israel in worship.|How does the shared blessing challenge hostility toward other peoples?|memphis,jerusalem
20|A sign against reliance on Egypt|The chapter names Sargon's capture of Ashdod. Isaiah's exposed and barefoot appearance serves as a sign of captivity for Egypt and Cush. Those who trusted these powers face disappointment.|What makes a source of security appear stronger than it is?|
21|Watchmen and warnings|A watchman announces Babylon's fall. Brief oracles then address Dumah and Arabia. Waiting, flight, and aid for refugees connect the chapter's scenes.|How do watchfulness and care for fugitives belong together?|babylon
22|Jerusalem under scrutiny|Jerusalem prepares defenses but fails to look to the one who made them possible. Celebration replaces repentance. A second oracle removes Shebna and gives Eliakim authority, pictured by a key and a peg.|How can practical preparation coexist with trust and accountability?|jerusalem
23|Tyre and the sea trade|The lament follows the disruption of Tyre's trading network. Sidon and distant ports share the shock. The ending pictures renewed trade whose proceeds serve those who dwell before the LORD.|What responsibilities come with wealth gained through trade?|tyre,sidon
24|The earth brought low|A vision of widespread judgment crosses social ranks. Broken obligations accompany ruined celebration and a desolate city. The final scene places the LORD's reign on Mount Zion above earthly powers.|How do broken commitments harm a whole community?|jerusalem
25|A feast and the end of death|Praise for deliverance leads to a feast for all peoples on the mountain. God removes the covering over the nations and swallows up death. The chapter ends by bringing down Moab's pride.|What does a feast for all peoples suggest about the reach of divine mercy?|jerusalem
26|Trust while waiting|A song in Judah contrasts the secure city with a proud city brought low. The speakers long for justice and describe their failed efforts through childbirth imagery. Hope for the dead accompanies a call to wait through judgment.|How does this song hold trust and distress together?|jerusalem
27|A vineyard restored|The LORD defeats Leviathan, a creature in the poem's imagery. A new vineyard song describes protection and fruitfulness. Judgment, purification, and a trumpet gathering the scattered lead toward worship in Jerusalem.|How does the protected vineyard differ from the vineyard in chapter 5?|jerusalem
28|A foundation and false security|Ephraim's proud crown falls, and drunken leaders in Judah also face rebuke. Jerusalem's rulers claim security through a covenant with death. A sure foundation and a farmer's varied methods offer different images of divine action.|What distinguishes a reliable foundation from an agreement based on false confidence?|samaria,jerusalem
29|Jerusalem and hidden counsel|Ariel, associated here with Jerusalem, faces siege and unexpected deliverance. A sealed book and empty worship expose failures of understanding. The ending promises hearing, sight, and justice for people who suffer.|How can words of worship become separated from the heart?|jerusalem
30|An alliance and an invitation|Judah seeks help from Egypt without listening to the LORD. The chapter contrasts restless escape with quiet trust. Promises of mercy, guidance, and healing lead into judgment on Assyria.|What makes quiet trust difficult when urgent action seems necessary?|jerusalem,memphis
31|Horses cannot save|The oracle rejects dependence on Egypt's horses and chariots. Human strength cannot replace the LORD's protection of Jerusalem. Assyria's fall follows a call to return from idolatry.|How can resources become objects of trust beyond their real value?|jerusalem,memphis
32|Justice and peace|A righteous king and just rulers introduce a vision of clear judgment. A warning to complacent women precedes images of ruined fields. The outpouring of the spirit brings justice, peace, and secure homes.|How does the chapter connect peace with justice rather than comfort alone?|jerusalem
33|Help in a time of danger|A destroyer faces destruction as the people ask the LORD for strength. Broken agreements and empty roads show the crisis. The final vision presents Zion with a righteous king, security, and forgiveness.|Which actions does the chapter associate with living near divine holiness?|jerusalem
34|Judgment pictured through Edom|Judgment on the nations focuses on Edom. Images of sacrifice, fire, and abandoned land describe its ruin. Animals inhabit places that once belonged to human power.|What do the images of abandoned cities communicate about the limits of power?|
35|A road home|The wilderness blossoms as weak hands and fearful hearts receive encouragement. Healing and abundant water transform the scene. A holy highway brings the redeemed to Zion with lasting joy.|How do physical restoration and return to God support each other in this vision?|jerusalem
40|Comfort and renewed strength|A voice prepares a way for the LORD and announces comfort to Jerusalem. The chapter contrasts fading human life with God's enduring word. The Creator's power answers the complaint that the people's way is hidden.|How does the promise of renewed strength speak to people who feel forgotten?|jerusalem
41|Do not fear|The nations face a challenge concerning events stirred up from the east. Israel, named as God's servant, receives help and reassurance. A dispute with idols asks who can explain what is coming.|How does being called God's servant change the way Israel can face fear?|jerusalem
42|A servant who brings justice|The LORD's servant brings justice without crushing the weak. A new song announces divine action across lands and seas. The chapter then confronts the blindness and deafness of the people called to serve.|How can a gentle manner serve a firm commitment to justice?|
43|Called by name|God promises to be with Israel through water and fire. The people serve as witnesses to the LORD's saving power. A new way through the wilderness stands beside a rebuke for sin and a promise of forgiveness.|What does remembrance of earlier rescue contribute to hope for something new?|babylon,jerusalem
44|The Creator and the idol maker|The LORD promises water and spirit to Jacob's descendants. A satire describes people using the same wood for fuel and a god. The ending names Cyrus in connection with rebuilding Jerusalem and the temple.|How does the idol-making account expose dependence on what people create?|jerusalem,babylon
45|Cyrus and the LORD's purpose|Cyrus is addressed as the LORD's anointed, though he does not know the LORD. The chapter presents the Creator as directing events beyond Israel. It closes with an invitation for the ends of the earth to turn and be saved.|What does the use of Cyrus suggest about whom God can work through?|babylon,jerusalem
46|The God who carries|Babylon's gods become burdens carried by animals. The LORD instead promises to carry the people from birth to old age. The chapter calls them to remember divine purpose and coming deliverance.|How does the contrast between carrying an idol and being carried change the image of trust?|babylon
47|Babylon brought down|Babylon appears as a queen losing her throne and status. Cruelty and self-confidence meet sudden loss. Sorcery and astrology cannot protect her from the announced judgment.|How can confidence in special knowledge prevent honest recognition of wrongdoing?|babylon
48|Leaving Babylon|The LORD confronts Israel's stubbornness and explains earlier announcements. The speaker calls the people to listen to divine instruction. A command to leave Babylon recalls provision during the wilderness journey.|What stands between hearing instruction and allowing it to change conduct?|babylon,jerusalem
49|A servant and remembered Zion|A servant called from the womb receives a mission reaching beyond Israel. Zion fears abandonment, but God answers with images of a mother's care and engraved hands. The return of children expands the city's hope.|How does the chapter answer Zion's fear that God has forgotten her?|jerusalem
50|A listening servant|Questions about divorce and debt introduce a challenge to the people's account of their separation from God. A taught and listening servant endures abuse while trusting divine help. The closing appeal contrasts trust in darkness with self-made light.|How does listening prepare the servant to sustain someone who is weary?|
51|Remember and awaken|The people seeking righteousness are told to remember Abraham and Sarah. Images of creation and the exodus support renewed hope. Jerusalem's cup of suffering will pass to her tormentors.|How can remembering earlier generations strengthen a community under pressure?|jerusalem
52|Good news for Zion|Zion is told to awake and leave captivity behind. A messenger announces peace and God's reign as watchmen celebrate return. The final verses introduce an exalted servant whose appearance has shocked many.|How does the announcement of peace prepare the reader for the servant passage that follows?|jerusalem
53|The suffering servant|The speakers reconsider a rejected figure whose suffering they had misunderstood. The servant bears the wrongdoing of others and faces death. The poem moves from rejection and burial toward vindication and a share with the great.|In a Christian reading, how does this passage deepen reflection on Jesus Christ's suffering?|
54|A covenant of peace|A barren woman and a deserted wife become images of Zion's restoration. The LORD promises compassion and a covenant of peace. The city receives a beautiful rebuilding, taught children, and protection against accusation.|How do the family images express belonging after rejection?|jerusalem
55|An invitation without price|The thirsty receive an invitation to food and drink without payment. A lasting covenant extends the call beyond Israel. God's effective word and a joyful departure close the chapter.|What would it mean to seek what truly nourishes without treating grace as a purchase?|
56|A house of prayer for all peoples|Justice and Sabbath observance introduce promises for foreigners and eunuchs who keep the covenant. God's house welcomes peoples who feared exclusion. The closing passage condemns negligent watchmen and self-serving shepherds.|How does the promise of belonging challenge assumptions about who can draw near to God?|jerusalem
57|False worship and healing|The death of the righteous contrasts with corrupt worship and misplaced reliance. The high and holy God also dwells with the contrite. A promise of healing and peace ends with a warning to the wicked.|What does God's nearness to the contrite teach about repentance?|
58|The fast God chooses|The people ask why God has not noticed their fasting. The answer exposes oppression beneath their religious practice. Feeding the hungry, sheltering the homeless, and honoring the Sabbath accompany promises of restoration.|What concrete act of care can give substance to your worship?|jerusalem
59|Justice lost and a redeemer promised|The chapter traces separation from God to violence, deceit, and injustice. A communal confession describes truth stumbling in public life. The LORD intervenes as a warrior and promises a redeemer to Zion.|How can a community acknowledge shared wrongdoing without avoiding personal responsibility?|jerusalem
60|Zion receives light|Light rises over Zion while darkness covers the earth. Nations and returning children bring wealth to the city. The vision ends with peace, righteousness, and the LORD as everlasting light.|How can the image of received light guide service to other people?|jerusalem
61|Good news and restored lives|An anointed speaker announces good news, release, and comfort for mourners. Ruined places will be rebuilt, and shame gives way to a lasting covenant. The closing voice rejoices in salvation and righteousness.|In a Christian reading, how does Jesus's mission connect proclamation with care for people in distress?|jerusalem
62|A new name for Zion|The speaker refuses silence until Zion's vindication becomes visible. Marriage imagery replaces names of abandonment. Watchmen call on the LORD as a road is prepared for the people's return.|How do new names change the way the restored community understands itself?|jerusalem
63|Judgment and remembered mercy|A warrior comes from Edom with stained garments after judgment. The chapter then recalls the LORD's compassion and past rescue. A communal prayer asks why God's presence now seems distant.|How can prayer name painful questions while remembering earlier mercy?|
64|A prayer for God's return|The prayer asks God to come down as in earlier acts of power. The people confess impurity and appeal to God as Father and potter. The ruined sanctuary becomes a reason to plead for renewed attention.|What does the image of clay in a potter's hands add to confession?|jerusalem
65|Judgment and new creation|The LORD answers a rebellious people while distinguishing servants who will receive blessing. New heavens and a new earth introduce a joyful Jerusalem. Secure homes, fruitful work, and peace replace former distress.|Which parts of ordinary life does the promised renewal restore?|jerusalem
66|Humility, comfort, and all nations|The LORD values humility above claims based on a temple alone. Zion's sudden birth and maternal comfort accompany judgment. The book ends with gathered nations, continuing worship, and a severe picture of rebellion's outcome.|How do comfort and accountability shape the book's final invitation?|jerusalem
`.trim().split('\n').map(line => {
  const [chapter,title,summary,question,places] = line.split('|');
  return { chapter:Number(chapter),title,summary,question,placeIds:places ? places.split(',') : [] };
});

// Reader copy. Each note keeps the main idea but uses short, direct sentences.
const simpleNotes = `
1|Judah has turned away from God. God asks the people to stop doing wrong. He tells them to help people in need. God also gives them hope.|How can worship help you care for others?
2|People from many lands come to learn from God. They turn swords into farm tools. God warns them not to trust pride, wealth, or idols.|How can God’s ways change how you treat people?
3|Judah loses its good leaders. Some leaders hurt poor people. God calls them to answer for what they did.|How should leaders care for poor people?
4|God makes Jerusalem clean. He stays with the people who are left. A cloud, fire, and shelter show his care.|How does God clean and guard his people?
5|God’s people are like a vineyard. God wants good fruit, such as fair and kind acts. He finds harm instead.|What good fruit can you grow in your town?
6|Isaiah sees the Lord. God makes Isaiah clean. Isaiah then agrees to do a hard job for God.|How does God help Isaiah answer his call?
7|Two kings plan to attack Judah. Isaiah tells King Ahaz not to fear. God gives a sign called Immanuel.|What does fear do to Ahaz’s trust?
8|Assyria is coming like a flood. Isaiah tells the people to fear God, not their foes. He warns them about false guides.|Who do you listen to when you feel afraid?
9|A great light shines on people in pain. A child will rule with peace and justice. The chapter also warns proud leaders.|What kind of hope does a just ruler bring?
10|Assyria harms many lands and grows proud. God says its power will end. A small group of God’s people will return.|How can success make a person proud?
11|A new ruler comes from Jesse’s family. God’s Spirit rests on him. He rules with justice and brings peace.|How does this ruler care for poor people?
12|The people thank God for saving them. They trust him and are not afraid. They tell others what God has done.|How can you share your thanks to God?
13|God warns proud Babylon. A great attack will bring the city down. Its fall shows that human power does not last.|Why does human power fail?
14|Israel sings about the fall of Babylon’s king. His pride brought him down. The chapter also warns Assyria and Philistia.|What does pride do to a ruler?
15|Towns in Moab fall. People cry and run away. Isaiah feels grief for them.|How should we act when other people hurt?
16|Moab asks for a safe place. The chapter calls for a fair ruler. It also warns Moab about pride.|Why do proud people still need help?
17|Damascus and Israel lose their power. A few people live. They learn to look to God, not things they made.|What changes when people look to God?
18|Fast messengers cross the land. God waits and watches. At the end, people bring a gift to Zion.|What can you learn when God seems to wait?
19|Egypt faces fear, fights, and hunger. Later, Egypt turns to God. Egypt, Assyria, and Israel share God’s gift.|How can God bring old foes together?
20|Isaiah acts out a warning. Egypt and Cush will be taken away. People learn that these nations cannot save them.|What may look safe but fail later?
21|A guard watches for news. He says that Babylon has fallen. The chapter also tells people to help those who flee war.|How can you watch and also help?
22|Jerusalem gets ready for war but forgets God. The people feast when they should turn back. God also gives Eliakim a key and a new job.|How can you plan and still trust God?
23|Tyre grows rich through sea trade. Then its trade fails. The chapter asks how wealth should be used.|How should people use wealth?
24|The whole earth feels God’s judgment. Joy ends because people break faith with God. God will rule from Zion.|How do broken promises hurt a town?
25|God makes a feast for all people. He ends death, tears, and shame. He also brings proud Moab down.|Who is welcome at God’s feast?
26|Judah sings about trust. The people still feel pain and wait for justice. They also hope that the dead will live.|How can hope and pain exist together?
27|God guards his vineyard. It grows fruit again. God gathers his people back to worship him.|How is this vineyard unlike the one in chapter 5?
28|Proud leaders trust lies. God offers a firm stone as a safe base. A farmer shows that God works in more than one way.|What makes a base safe and strong?
29|Jerusalem faces danger. The people honor God with words, but not with their hearts. God promises that they will see and hear again.|How can words of worship become empty?
30|Judah runs to Egypt for help. God asks the people to rest and trust him. They refuse, but God still offers mercy.|Why can quiet trust feel hard?
31|Egypt’s horses cannot save Judah. Human strength cannot take God’s place. God asks his people to return.|What good things can become false gods?
32|A good king rules with justice. God’s Spirit changes the land. Justice brings peace and safe homes.|Why does true peace need justice?
33|The people ask God for help. Roads are empty, and peace deals are broken. God promises safety, justice, and pardon.|How can people live close to a holy God?
34|God judges Edom and other nations. The poem shows fire and empty land. These pictures show that proud power ends.|What do the empty cities teach about power?
35|The dry land blooms. Weak people grow strong. A safe road brings God’s people home with joy.|How do healing and coming home fit together?
40|God speaks comfort to Jerusalem. People grow tired, but God does not. He gives new strength to those who trust him.|How does God help people who feel forgotten?
41|God tells Israel not to fear. He calls Israel his servant. He will hold and help his people.|How does God’s help change fear?
42|God’s servant brings justice with care. He does not crush weak people. God also tells his people to see and hear.|How can a gentle person still be strong?
43|God calls Israel by name. He stays with his people through water and fire. He makes a new path in the desert.|How does an old rescue give new hope?
44|People make an idol from the same wood they burn. The idol cannot save them. God names Cyrus as a ruler who will help Jerusalem.|Why can things we make not save us?
45|God gives Cyrus a job, though Cyrus does not know him. God rules over all lands. He asks all people to turn to him.|Who can God use to do his work?
46|People must carry Babylon’s gods. God says he will carry his people all their lives. He alone can save.|What does it mean for God to carry you?
47|Babylon is like a queen who loses her throne. Her pride and magic cannot save her. God holds her to account.|How can pride hide our wrong acts?
48|God asks Israel to listen. He tells the people to leave Babylon. He will care for them on the way.|What can keep you from listening to God?
49|God’s servant has a task for all nations. Zion thinks God forgot her. God says his care is stronger than a mother’s care.|How does God answer Zion’s fear?
50|God’s servant listens before he speaks. He helps tired people and trusts God through pain. Others trust their own light.|How does listening help you serve?
51|God tells the people to remember Abraham and Sarah. Old acts of rescue give them hope. Jerusalem’s pain will end.|How can old stories give new hope?
52|A messenger brings good news to Zion. He tells of peace, rescue, and God’s rule. The people are called to leave and be clean.|Why is this news good?
53|People first reject God’s servant. Then they see his pain in a new way. He suffers for others and is honored in the end.|How does this chapter help you think about Jesus?
54|Zion feels like a wife left alone. God promises love and peace. He will build the city again and guard its people.|How do these family pictures show love?
55|God offers free food and drink to thirsty people. He asks them to listen and live. His word will do its work.|What good gifts can we not buy?
56|God welcomes people who once felt left out. His house is for all people who keep his covenant. He also warns bad leaders.|Who is welcome in God’s house?
57|The people worship false gods. Yet God stays near humble people who are sorry. He offers healing and peace.|Why does God come near humble people?
58|The people fast but still hurt others. God asks them to feed, house, and clothe people in need. Such care brings light.|How can care for others make worship real?
59|Lies and violence push people away from God. The people admit their shared sin. God comes to save and judge.|How can a group admit that it did wrong?
60|God’s light rises over Zion. Nations and lost children come to the city. God gives it peace and lasting light.|How can God’s light help you serve?
61|God’s chosen servant brings good news. He helps poor, hurt, and trapped people. Ruined places will be built again.|How does Jesus bring good news and care?
62|Zion gets a new name. It is no longer left alone. Watchmen pray as a road is made ready for the people.|How can a new name give hope?
63|A warrior comes after judgment. Then the people recall God’s past love and help. They ask him to return.|How can prayer hold pain and hope?
64|The people ask God to come down. They admit their sin. They call God their Father and the maker who shapes clay.|What does the clay picture teach about God?
65|God judges those who fight him. He blesses his servants. He promises a new world with joy, homes, good work, and peace.|What parts of life will God make new?
66|God values humble people who listen to him. He comforts Zion and judges evil. The book ends with all nations coming to worship.|How do comfort and judgment fit together?
`.trim().split('\n').map(line => {
  const [chapter, summary, question] = line.split('|');
  return [Number(chapter), {summary, question}];
});
const simpleNoteByChapter = new Map(simpleNotes);
for (const note of notes) Object.assign(note, simpleNoteByChapter.get(note.chapter));

export function addFullIsaiah(content, scripture) {
  const web = content.sources.find(s => s.id === 'web');
  web.title = 'Isaiah — World English Bible';
  web.summary = 'The complete book of Isaiah in the public-domain World English Bible. Chapter notes distinguish the biblical account from historical evidence.';
  web.url = 'https://ebible.org/engwebp/ISA01.htm';
  for (const note of notes) {
    const c = note.chapter, sourceId = `web${c}`;
    content.sources.push({id:sourceId,title:`Isaiah ${c} — World English Bible`,author:'World English Bible project',year:'2026 retrieval',type:'Biblical text',url:`https://ebible.org/engwebp/ISA${String(c).padStart(2,'0')}.htm`,summary:note.summary,limitations:'This source gives the Bible text. The notes and questions are original study material. The notes are study help, not proof from history.',license:'Public domain'});
    const lesson = c <= 12 ? 38 : c <= 35 ? 39 : c <= 49 ? 40 : c <= 57 ? 41 : 42;
    const direct = !(c >= 15 && c <= 21 || c === 23 || c >= 31 && c <= 34);
    const lds = {
      text:`${note.question} ${direct ? 'Read the linked Come, Follow Me lesson for the Church study perspective.' : 'The linked Come, Follow Me lesson covers nearby chapters. This question comes from the study guide. The lesson does not teach this chapter.'}`,
      sourceIds:[sourceId,`cfm2026-${lesson}`]
    };
    content.passages.push({id:`isaiah-${c}`,chapter:c,start:1,end:scripture.chapters[c].length,title:note.title,summary:note.summary,year:null,dateLabel:'Literary context · no assigned event year',uncertainty:'',placeIds:note.placeIds,sourceIds:[sourceId],lds});
  }
  // Link existing conference evidence directly to the chapters it cites.
  for (const passage of content.passages) {
    const matching = content.sources.filter(s => s.group === 'conference-year' && s.scriptureReferences?.some(ref => {
      const match = ref.label.match(/Isaiah\s+(\d+)(?=\D|$)/i);
      return match && Number(match[1]) === passage.chapter;
    }));
    if (matching.length) {
      passage.lds.sourceIds = [...new Set([...passage.lds.sourceIds, ...matching.map(s => s.id)])];
      passage.lds.text += ' The linked conference talks cite this chapter. See each source summary for its use of the passage.';
    }
  }
  content.passages.sort((a,b) => a.chapter-b.chapter || a.start-b.start);
  for (const [chapter, sourceId] of [[28,'dm-line'],[53,'dm-isaiah53']]) {
    content.passages.find(p => p.chapter === chapter).sourceIds.push(sourceId);
  }
  content.editorial.status = 'Complete reading text with original chapter notes. Historical research and language notes remain selected, not exhaustive.';
  content.editorial.periodNote = 'The timeline covers selected events from 780–539 BCE. It does not date every passage. It also does not show every proposed date for when parts of Isaiah were written.';
  content.guides.push(
    {id:'justice',title:'Worship and justice',description:'Trace care for vulnerable people across Isaiah.',steps:[
      {title:'Learn to do good',text:'Read Isaiah 1:10–20. Compare the criticism of worship with the command to defend vulnerable people.',chapter:1,verse:17,placeId:'jerusalem',sourceIds:['web1']},
      {title:'The vineyard',text:'Read Isaiah 5:1–7. Identify the fruit the vineyard owner expected and what he received.',chapter:5,verse:7,placeId:'jerusalem',sourceIds:['web5']},
      {title:'The chosen fast',text:'Read Isaiah 58:3–12. Name the actions that make worship visible in daily life.',chapter:58,verse:6,placeId:'jerusalem',sourceIds:['web58']}
    ]},
    {id:'comfort',title:'Comfort and return',description:'Follow images of strength, remembrance, and renewed belonging.',steps:[
      {title:'Strength for the weary',text:'Read Isaiah 40:27–31. Notice how the reply addresses the complaint that God does not see the people.',chapter:40,verse:31,placeId:'jerusalem',sourceIds:['web40']},
      {title:'Zion remembered',text:'Read Isaiah 49:14–18. Compare Zion’s complaint with the images in God’s answer.',chapter:49,verse:15,placeId:'jerusalem',sourceIds:['web49']},
      {title:'A covenant of peace',text:'Read Isaiah 54:7–17. Consider how the promise answers abandonment and fear.',chapter:54,verse:10,placeId:'jerusalem',sourceIds:['web54']}
    ]},
    {id:'servant',title:'Read the servant passages',description:'Compare the servant’s work, suffering, and vindication.',steps:[
      {title:'Justice without crushing',text:'Read Isaiah 42:1–9. Describe the servant’s task and manner. Keep questions of identity separate from these observations.',chapter:42,verse:1,sourceIds:['web42']},
      {title:'A wider mission',text:'Read Isaiah 49:1–6. Notice how the passage names Israel and also describes restoring Israel.',chapter:49,verse:6,sourceIds:['web49']},
      {title:'Suffering and vindication',text:'Read Isaiah 52:13 through 53:12. Track the speakers and how their view of the servant changes. Compare Christian interpretation in LDS mode.',chapter:53,verse:4,sourceIds:['web52','web53']}
    ]}
  );
}
