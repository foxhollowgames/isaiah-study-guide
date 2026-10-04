import { readFileSync } from 'node:fs';

const reviews = JSON.parse(readFileSync(new URL('./wikipedia-review.json', import.meta.url)));
const images = JSON.parse(readFileSync(new URL('./wikipedia-images.json', import.meta.url)));
// Short paraphrases. Chapter lists indicate useful background, not verse commentary.
const articles = [
  ['sennacherib','Sennacherib',[36,37],[], 'Sennacherib was the king of Assyria. His writings and wall pictures say he won the war. Isaiah 36–37 tells about Jerusalem and Hezekiah. The sources tell different parts of the story.', ['prism-luckenbill']],
  ['levant',"Sennacherib's campaign in the Levant",[36],[], 'The war in 701 BCE hurt many cities and towns. Some gave up. Some fought. Some were attacked at their walls. A list of places does not show one full army path. It also does not prove that the king went to each place.', ['prism-luckenbill']],
  ['lachish-siege','Siege of Lachish',[36],[], 'Old writings, wall pictures, and ruins tell us about Lachish. The army built a ramp beside the city wall. The ramp helped soldiers reach the wall.', ['lachish-ramp-study']],
  ['lachish','Lachish',[],['lachish'], 'Lachish was an important city in Judah. The Assyrian army destroyed it. Old walls and pictures help us study the attack. They do not tell us what happened at Jerusalem.'],
  ['azekah','Azekah',[],['azekah'], 'Azekah stands above the Elah Valley. It is relevant to the Assyrian attack on Judah’s fortified towns. Its position helps explain the lowland setting.'],
  ['azekah-inscription','Azekah Inscription',[],['azekah'], 'The damaged Azekah writing describes an Assyrian attack on two cities. One is Azekah. The other city’s name is lost. Experts often link it with Sennacherib’s campaign. Its damaged text cannot give a complete route through Judah.'],
  ['ekron','Ekron',[],['ekron'], 'Ekron was a Philistine city, identified with Tel Miqne. The annals connect its revolt with Padi, its king, whom Hezekiah held in Jerusalem. They describe action at Ekron after Eltekeh and Timnah.', ['prism-luckenbill']],
  ['timnah','Timnah',[],['timnah'], 'The Timnah relevant here is Tel Batash in the Sorek Valley. It is distinct from other places with the same name, including the southern copper region. The annals name its capture before the action at Ekron.', ['prism-luckenbill']],
  ['eltekeh','Eltekeh',[],[], 'The annals place a battle against Egyptian and Kushite forces near Eltekeh. Tel Shalaf is one possible site. Wikipedia redirects Eltekeh to nearby Ge’alya, a modern town. That town’s location does not prove where the ancient battle happened. The map therefore shows no exact battle point.', ['prism-luckenbill']],
  ['jaffa','Jaffa',[],['jaffa'], 'Jaffa is the coastal place called Joppa in the annals. Its inclusion replaces an unnamed bend in the earlier map.'],
  ['sidon','Sidon',[23],['sidon'], 'Sidon was a Phoenician coastal center. Sennacherib’s account describes changes in its rule and tribute. Those claims concern political control. They do not prove an attack on the city. They also do not prove that the king visited it.'],
  ['tyre','Tyre, Lebanon',[23],['tyre'], 'Ancient Tyre included an offshore island city and a mainland settlement. A single modern map pin cannot distinguish all ancient locations called Tyre. The campaign context must not imply that Sennacherib captured the island city.'],
  ['libnah','Libnah',[37],['libnah'], 'Isaiah 37:8 places the Assyrian king at Libnah after Lachish. The site’s identification and the relation between the written accounts remain debated.'],
  ['hezekiah','Hezekiah',[36,38],[], 'Hezekiah was king of Judah when Assyria attacked. The Bible, royal writings, and old ruins tell parts of his story. Experts do not agree on every date.'],
  ['siloam','Siloam inscription',[22],[], 'The Siloam inscription describes workers meeting as they cut a water tunnel. It provides material context for Jerusalem’s water works. It does not name Hezekiah or date the work to the 701 BCE invasion. The image below shows a replica; the original is in Istanbul.'],
  ['nineveh','Nineveh',[37],['nineveh'], 'Nineveh stood beside the Tigris near modern Mosul. Sennacherib developed it as his royal capital. Isaiah 37:37–38 returns the story there after the crisis at Jerusalem.'],
  ['merodach','Marduk-apla-iddina II',[39],[], 'Marduk-apla-iddina II is called Merodach-baladan in Isaiah 39. He was a Babylonian ruler who fought Assyrian rule. This conflict helps explain the visit to Hezekiah. The chapter does not give a travel route or settle the visit’s exact year.'],
  ['exile','Babylonian captivity',[39,47,48],['babylon'], 'The Babylonian exile involved several forced moves, not one journey. It followed the Assyrian crisis by more than a century. The line between Jerusalem and Babylon shows the later setting of exile. It does not show one group’s exact route.'],
  ['cyrus','Cyrus the Great',[44,45],[], 'Cyrus founded the Persian Empire and took Babylon in 539 BCE. Isaiah 44–45 names him in the promise of Jerusalem’s return. The Cyrus Cylinder helps us study Persian royal policy. It does not name the people of Judah who returned.', ['cyrus']],
  ['isaiah','Book of Isaiah',[1,40,56],[], 'Isaiah moves from the setting of Assyrian power to exile and restoration. Many scholars study these sections as writings shaped in different periods. Questions of authorship and composition remain separate from the geography of each passage.'],
  ['moab','Moab',[15,16],['moab'], 'Moab lay east of the Dead Sea. Its inscriptions and archaeology give a wider setting for the towns in Isaiah 15–16. They do not identify an attacking army or establish exact refugee roads in these poems.'],
  ['edom','Edom',[21,34,63],['edom'], 'Edom lay south and southeast of the Dead Sea. Its towns and political history help explain Isaiah’s references to Edom and Bozrah. The poems do not define a fixed border or a recorded army route.'],
  ['syro-ephraimite','Syro-Ephraimite War',[7,8],[], 'The alliance of Aram-Damascus and Israel threatened Judah under Ahaz. Assyria entered the conflict and changed the balance of power. This war supplies the setting of Isaiah 7–8. It is not Sennacherib’s later invasion.'],
  ['taharqa','Taharqa',[37],[], 'Isaiah 37:9 names Tirhakah, usually identified with Taharqa of Kush and Egypt. His reign began after 701 BCE. This raises a question about the account’s title or order of events. It does not support an exact route for the relief army.']
];
const addIds = (item, ids) => { if (item) item.sourceIds = [...new Set([...(item.sourceIds || []), ...ids])]; };

export function addWikipediaEnrichment(data) {
  const study = {id:'lachish-ramp-study',title:'Constructing the Assyrian Siege Ramp at Lachish',author:'Yosef Garfinkel, Jon W. Carroll, Michael Pytlik, and Madeleine Mumcuoglu',year:2021,license:'Copyright retained by the authors and publisher; linked summary only.',limitations:'We read the short summary and the facts about the paper. We did not read the full paper. The study is about the ramp at Lachish. It does not show the army’s full path.',type:'Archaeological research',url:'https://doi.org/10.1111/ojoa.12231',summary:'The team studied old words, wall pictures, ruins, and photos from the air. This helped them learn how the ramp was built. The study is about the attack on Lachish. It does not show the army’s full path.',reviewed:'2026-09-29: We checked the short summary and the facts about the paper. We did not read the full paper.'};
  data.sources = data.sources.filter(s => !s.id.startsWith('wiki-') && s.id !== study.id);
  data.sources.push(study);
  for (const [key,title,chapters,places,summary,citedSourceIds=[]] of articles) {
    const review = reviews.find(r => r.title === title);
    if (!review?.revisionId) throw Error(`Missing Wikipedia review: ${title}`);
    const id = `wiki-${key}`;
    data.sources.push({id,title:`${title} · Wikipedia`,author:'Wikipedia contributors',type:'Encyclopedia background',url:review.url,
      summary,studyText:summary,citedSourceIds,revisionId:review.revisionId,
      revisionUrl:`https://en.wikipedia.org/w/index.php?oldid=${review.revisionId}`,
      license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',
      reviewed:'2026-09-29: article reviewed for relevant background, site identification, and cited evidence. Notes are short paraphrases.',
      limitations:'Anyone can edit this source. Use it as a place to start. Each picture has its own use rules.',
      ...(images[id] ? {image:images[id],previewText:summary} : {})});
    for (const passage of data.passages.filter(p => chapters.includes(p.chapter))) addIds(passage,[id]);
    for (const placeId of places) addIds(data.places.find(p => p.id === placeId),[id]);
    for (const chapter of chapters) addIds(data.chapterMaps.find(f => f.chapter === chapter),[id]);
  }
  addIds(data.places.find(p=>p.id==='lachish'),['wiki-lachish-siege']);
  for (const event of data.events) {
    if (['western701','lachish-art'].includes(event.id)) addIds(event,['wiki-sennacherib','wiki-lachish-siege']);
    if (['jerusalem597','jerusalem586'].includes(event.id)) addIds(event,['wiki-exile']);
    if (event.id==='cyrus539') addIds(event,['wiki-cyrus']);
  }
}

// Applied after the chapter geography is built, including during rebuild checks.
export function refineWikipediaGeography(data) {
  const place = id => data.places.find(p=>p.id===id);
  for (const [id,name,lat,lng,summary] of [
    ['jaffa','Joppa / Jaffa',32.05222,34.75306,'The annals name Joppa among the captured coastal towns.'],
    ['timnah','Timnah · Tel Batash',31.785,34.91111,'The Philistine town in the Sorek Valley, identified with Tel Batash.'],
    ['azekah','Azekah',31.70028,34.93583,'A fortified town above the Elah Valley, named in a fragmentary Assyrian inscription.']
  ]) {
    if (!place(id)) data.places.push({id,name,lat,lng,summary,chapter:36,verse:1,chapterLocation:true,sourceIds:[`wiki-${id}`],uncertainty:'Representative site coordinates, not the position of an ancient road.'});
  }
  const points = ids => ids.map(id=>[place(id).lat,place(id).lng]);
  const common = {start:-702,end:-700,dateLabel:'701 BCE',faction:'assyria',kind:'military',chapter:36,verse:1,direction:false,evidence:'Named sites · travel order not established',geometryBasis:'Named-site connections',uncertainty:'Lines connect sites affected by the campaign. They do not trace roads or establish travel order.'};
  const segments = [
    {id:'west-campaign',title:'The campaign along the coast',placeIds:['sidon','tyre','jaffa','ashkelon'],summary:'The Assyrian account describes the surrender of Phoenician centers. It also describes attacks on southern coastal towns.',detail:'Joppa is a named place in the annals. The line replaces an earlier unnamed point. Ancient Tyre had island and mainland settlements. The line does not claim that Assyria captured the island city. The map order is not a confirmed march order.',sourceIds:['wiki-levant','wiki-sidon','wiki-tyre','wiki-jaffa','prism-luckenbill']},
    {id:'philistine-campaign',title:'Timnah and Ekron',placeIds:['timnah','ekron'],summary:'The annals name the capture of Eltekeh and Timnah. They then describe action at Ekron.',detail:'The map connects the known sites of Timnah and Ekron. Experts do not agree about Eltekeh’s location. The explanation includes the battle, but the map has no exact point. The order in a royal account does not show the road.',sourceIds:['wiki-timnah','wiki-ekron','wiki-eltekeh','prism-luckenbill']},
    {id:'judah-campaign',title:'Fortified towns of Judah',placeIds:['azekah','lachish'],summary:'Azekah and Lachish help place attacks on Judah’s walled towns. Both cities were in the lowlands.',detail:'The Azekah writing and the evidence at Lachish describe separate attacks. They do not show which attack came first. This line shows the regional setting of Isaiah 36:1. It does not show a confirmed march between the attacks.',sourceIds:['wiki-azekah-inscription','wiki-lachish-siege','met701']}
  ];
  for (const segment of segments) {
    const item = {...common,...segment,points:points(segment.placeIds)};
    const index = data.campaigns.findIndex(c=>c.id===item.id);
    if (index<0) data.campaigns.push(item); else data.campaigns[index]=item;
  }
  for (const [id,ids,sourceIds] of [
    ['lachish-mission',['lachish','jerusalem'],['wiki-lachish-siege']],
    ['babylon-envoys-route',['babylon','jerusalem'],['wiki-merodach']],
    ['exile-horizon',['jerusalem','babylon'],['wiki-exile']]
  ]) {
    const route = data.campaigns.find(c=>c.id===id);
    route.placeIds=ids; route.points=points(ids); route.geometryBasis='Endpoint connection; road unknown'; addIds(route,sourceIds);
    if (id==='babylon-envoys-route') route.detail='The line links the embassy’s origin and destination. Isaiah 39 does not name intermediate stops or establish the visit’s exact year.';
  }
  const focus = data.chapterMaps.find(f=>f.chapter===36);
  focus.routes=[{id:'judah-campaign',from:0,to:1,reference:'Isaiah 36:1'},{id:'lachish-mission',from:0,to:1,reference:'Isaiah 36:2'}];
  focus.contextRoutes=segments.filter(s=>s.id!=='judah-campaign').map(s=>({id:s.id,from:0,to:s.placeIds.length-1,reference:'Isaiah 36:1'}));
  focus.contextPlaceIds=[...new Set([...focus.contextPlaceIds,'jaffa','timnah','azekah'])];
  focus.placeIds=[...new Set([...focus.placeIds,...focus.contextPlaceIds])];
  focus.limits='Named sites improve the regional picture. Coastal and inland connections do not establish roads or travel order. Eltekeh has no precise pin because its identification is disputed. The Lachish–Jerusalem line concerns the Assyrian representative, not the king’s personal route.';
  for (const f of data.chapterMaps) for (const ref of [...f.routes,...f.contextRoutes]) {
    const c=data.campaigns.find(c=>c.id===ref.id);
    if (c) ref.to=Math.min(ref.to,c.points.length-1);
  }
  for (const route of data.textRoutes) {
    if (route.id==='lachish-libnah') {addIds(route,['wiki-libnah']);route.uncertainty='The passage supplies the sequence. Libnah’s identification and the exact road remain uncertain.';}
    if (route.id==='return-nineveh') addIds(route,['wiki-nineveh']);
    if (route.id==='return-babylon') addIds(route,['wiki-exile']);
  }
  const libnah=place('libnah');
  libnah.name='Libnah';
  libnah.uncertainty='This is a representative location. Competing site identifications exist; the coordinate does not settle them.';
}
