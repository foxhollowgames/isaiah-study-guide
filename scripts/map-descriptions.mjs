const summaries = {
  jerusalem: 'Jerusalem was Judah’s capital and the home of its royal court and temple. Its ridge-top position made it defensible but not isolated.',
  lachish: 'Lachish was a major fortified city southwest of Jerusalem. It guarded roads through Judah’s western lowlands.',
  nineveh: 'Nineveh became Sennacherib’s royal capital on the Tigris. Its palaces displayed Assyrian wealth, building, and military victories.',
  babylon: 'Babylon was a major city on the Euphrates and a center of southern Mesopotamian power. Its kings often competed with Assyria before Babylon became an empire.',
  samaria: 'Samaria was the capital of the northern kingdom of Israel. Assyria captured it and deported part of its population.',
  hamath: 'Hamath was an important kingdom and city on the Orontes in western Syria. It stood on routes between inland Syria and the Mediterranean coast.',
  arpad: 'Arpad was a north Syrian city-state near Aleppo. Assyria fought repeated campaigns there before making it part of the empire.',
  harran: 'Harran was a trading and religious center on routes across northern Mesopotamia. Its position linked Assyria, Syria, and Anatolia.',
  gozan: 'Gozan is usually linked with Guzana at Tell Halaf. It became an Assyrian provincial center in northern Mesopotamia.',
  libnah: 'Libnah was a fortified town in Judah’s western lowlands. Its exact site remains uncertain.',
  tyre: 'Tyre was a wealthy Phoenician port with an island center. Its merchants connected the Levant with Mediterranean trade.',
  sidon: 'Sidon was a major Phoenician port north of Tyre. Its ships and workshops formed part of a wide Mediterranean trade network.',
  ashkelon: 'Ashkelon was a fortified Philistine port on the southern coast. Trade routes and armies passed through its region.',
  ekron: 'Ekron was a large Philistine city with strong olive-oil production. Its rulers balanced local interests against Assyrian demands.',
  memphis: 'Memphis was a major city near the head of the Nile Delta. It was a political and religious center of Egypt.',
  damascus: 'Damascus was the capital of Aram-Damascus and an important inland trade center. It controlled routes through southern Syria.',
  carchemish: 'Carchemish was a fortified city at a major Euphrates crossing. Armies and trade routes moved through this strategic point.',
  susa: 'Susa was an ancient city east of Babylon and later a Persian royal center. It linked Mesopotamia with the Iranian plateau.',
  aiath: 'Aiath was a town north of Jerusalem. Its exact identification remains debated.',
  anathoth: 'Anathoth was a small town a few miles northeast of Jerusalem. It belonged to the territory of Benjamin.',
  ar: 'Ar was an important settlement in Moab. Its exact site is uncertain.',
  arnon: 'The Arnon is the deep gorge now called Wadi Mujib. It cut across Moab and formed a major natural boundary.',
  aroer: 'Aroer was a settlement east of the Jordan. More than one ancient place used this name.',
  ashdod: 'Ashdod was a fortified Philistine city near the Mediterranean coast. It controlled rich farmland and access to coastal trade.',
  assyria: 'Assyria was an empire centered in northern Mesopotamia. Its armies, governors, tribute system, and deportations reshaped the Levant.',
  bashan: 'Bashan was a fertile upland east of the Sea of Galilee. It was known for forests, pasture, and strong cattle.',
  'beer-elim': 'Beer-elim was a Moabite location known from the biblical text. Its exact site is uncertain.',
  bozrah: 'Bozrah was a chief city of Edom in the highlands southeast of Judah. It stood near routes through the Arabah and Transjordan.',
  calneh: 'Calneh was a north Syrian city associated with the region of Arpad. Its exact identification is debated.',
  cush: 'Cush was the kingdom south of Egypt, centered in Nubia. Cushite rulers also governed Egypt during part of Isaiah’s lifetime.',
  cyprus: 'Cyprus was a large Mediterranean island with ports, copper resources, and wide trade links. Biblical Kittim often points toward Cyprus and the western sea.',
  dedan: 'Dedan was an oasis and caravan center in northwestern Arabia. Traders carried incense and other goods through this region.',
  dibon: 'Dibon was a prominent Moabite city east of the Dead Sea. It stood near the King’s Highway and controlled nearby farmland.',
  edom: 'Edom occupied the highlands south and southeast of the Dead Sea. Its territory controlled routes between Judah, Arabia, and the Red Sea.',
  egypt: 'Egypt was an old kingdom centered on the Nile. Its wealth and armies made it a possible ally and a rival great power.',
  elam: 'Elam was a kingdom east of Babylonia in southwestern Iran. It sometimes allied with Babylon against Assyria.',
  elealeh: 'Elealeh was a Moabite town on the plateau east of the Dead Sea. It lay close to Heshbon.',
  euphrates: 'The Euphrates was the great river running from Anatolia through Syria and Mesopotamia. Major cities and imperial routes followed its valley.',
  galilee: 'Galilee was the northern region around the Sea of Galilee. It lay near international roads and was exposed to invasion from the north.',
  geba: 'Geba was a Benjaminite town north of Jerusalem. It stood near a pass through the central hill country.',
  gibeah: 'Gibeah was a Benjaminite hill town just north of Jerusalem. Its elevated position overlooked approaches to the capital.',
  hanes: 'Hanes was an Egyptian center, probably in the Nile Valley. Its exact role and identification in this period remain uncertain.',
  heshbon: 'Heshbon was a major town on the plateau east of the Jordan. It sat near roads linking Ammon, Moab, and the north.',
  horonaim: 'Horonaim was a Moabite town, probably near a descent toward the Dead Sea. Its exact location remains uncertain.',
  jahaz: 'Jahaz was a settlement on the Moabite plateau. Its precise site remains debated.',
  jazer: 'Jazer was a town east of the Jordan near productive fields and vineyards. Its exact site is uncertain.',
  kedar: 'Kedar was a confederation of Arabian pastoral and trading groups. Its people moved across routes east and south of the Levant.',
  'kir-hareseth': 'Kir-hareseth was a major fortified center in Moab, often linked with modern Kerak. It stood above routes south of the Arnon.',
  lebanon: 'Lebanon was the mountain region north of Israel, famous for cedar forests. Its timber and passes had economic and strategic value.',
  luhith: 'Luhith was a Moabite site associated with an uphill road. Its precise location is uncertain.',
  medeba: 'Medeba was a town on the Moabite plateau east of the Dead Sea. Its surrounding plain supported farming and travel.',
  media: 'Media was a kingdom on the Iranian plateau east of Assyria. Median forces later helped Babylon defeat the Assyrian Empire.',
  michmash: 'Michmash was a hill town north of Jerusalem near a narrow pass. The pass made it important for travel and defense.',
  midian: 'Midian was a broad region south and east of the Gulf of Aqaba. The name also described groups of people. Its routes connected Arabia with the Levant.',
  migron: 'Migron was a site north of Jerusalem near Michmash. Its precise identification is uncertain.',
  moab: 'Moab occupied the plateau east of the Dead Sea. Its towns, farms, and roads lay between Judah, Ammon, Edom, and Arabia.',
  'mount-carmel': 'Mount Carmel is a wooded ridge reaching the Mediterranean coast. It overlooks the coastal plain and the Jezreel Valley.',
  'mount-seir': 'Mount Seir was the rugged highland associated with Edom. Its ridges controlled routes through the southern Transjordan.',
  nebo: 'Nebo was a Moabite town east of the Dead Sea. It was also a center for worship. Its exact ancient site is usually placed near Mount Nebo.',
  negeb: 'The Negeb was Judah’s dry southern region. Roads through it linked the hill country with Egypt, Edom, and Arabia.',
  nile: 'The Nile sustained Egypt’s farms, cities, and transport. Control of its water and harvests supported Egyptian power.',
  nimrim: 'Nimrim was a place with much water in Moab. It is often linked with a stream south of the Dead Sea. Its exact identification is uncertain.',
  nob: 'Nob was a settlement close to Jerusalem, probably on a northern approach. Its exact location remains uncertain.',
  pathros: 'Pathros means Upper Egypt, the Nile Valley south of the Delta. It was one of Egypt’s main historic regions.',
  philistia: 'Philistia was the coastal plain ruled by cities such as Ashdod, Ashkelon, and Ekron. Its ports and roads made it valuable to larger empires.',
  ramah: 'Ramah was a Benjaminite town north of Jerusalem. It stood along an important ridge route.',
  rezeph: 'Rezeph was a fortified city on routes across the Syrian desert. It later became an Assyrian provincial center.',
  sela: 'Sela means rock and probably points to a stronghold in the Edomite highlands. Its exact identification is debated.',
  sharon: 'Sharon was the fertile coastal plain west of the central hills. Its fields and north-south road gave it economic value.',
  sheba: 'Sheba was a wealthy south Arabian kingdom linked with incense and caravan trade. Its merchants connected Arabia with the Levant.',
  sibmah: 'Sibmah was a Moabite town known for vineyards. Its exact location near Heshbon is uncertain.',
  tema: 'Tema was a major oasis in northern Arabia. It served caravans moving between Arabia, Mesopotamia, and the Levant.',
  'valley-of-achor': 'The Valley of Achor lay near the approaches to Jericho. Its exact extent is uncertain.',
  zoan: 'Zoan, or Tanis, was an important city in the eastern Nile Delta. It was close to routes between Egypt and the Levant.',
  zoar: 'Zoar was a town near the southern end of the Dead Sea. Its exact site is debated.',
  'brook-of-the-willows': 'The Brook of the Willows was a stream or wadi on Moab’s border. It is often linked with Wadi al-Hasa.',
  eglaim: 'Eglaim was a Moabite location known from the biblical text. Its exact site is uncertain.',
  'eglath-shelishiyah': 'Eglath-shelishiyah was a place near the southern Dead Sea. Its exact identification is uncertain.',
  javan: 'Javan is the biblical name for Ionia and, more broadly, Greek lands across the sea. It represents the western Mediterranean world.',
  lud: 'Lud probably points to Lydia in western Anatolia. It represents a distant people beyond the eastern Mediterranean.',
  tubal: 'Tubal was a people and kingdom in Anatolia. Assyrian records place it north of Syria in the mountain lands.',
  jaffa: 'Joppa, now Jaffa, was a port on the central coast. It connected inland towns with Mediterranean shipping.',
  timnah: 'Timnah was a Philistine-border town in the Sorek Valley. Its farmland and road position made it a contested place.',
  azekah: 'Azekah was a fortified town above the Elah Valley. It guarded routes from the coastal plain into Judah’s hills.'
};

const relevanceGroups = [
  [['aiath','anathoth','geba','gibeah','michmash','migron','nob','ramah'], 'Isaiah uses this chain of towns to picture an army moving toward Jerusalem. The names make the Assyrian threat feel closer at each step.'],
  [['ar','arnon','beer-elim','dibon','elealeh','heshbon','horonaim','jahaz','jazer','kir-hareseth','luhith','medeba','moab','nebo','nimrim','sela','sibmah','zoar','brook-of-the-willows','eglaim','eglath-shelishiyah'], 'Isaiah’s poems about Moab move through towns, fields, and escape routes. Together they show war and displacement spreading across a whole region.'],
  [['tyre','sidon','cyprus','jaffa'], 'Isaiah uses Phoenician trade to make a clear point. Wealth and wide influence cannot keep a city safe. These ports also show Judah in a larger trade world.'],
  [['ashkelon','ashdod','ekron','philistia','timnah'], 'Philistine cities stood between Judah and Egypt on the main coastal road. Their revolts and alliances drew Assyria toward Judah’s border.'],
  [['egypt','memphis','nile','pathros','zoan','hanes','cush'], 'Egypt and Cush offered an alternative to Assyrian power. Isaiah repeatedly asks whether Judah should trust that alliance or trust God.'],
  [['dedan','kedar','tema','sheba','midian'], 'Arabian routes carried goods, news, and refugees across the desert. Isaiah uses these peoples to widen the story beyond Judah and the great empires.'],
  [['edom','bozrah','mount-seir','sela'], 'Edom was Judah’s neighbor and frequent rival. Isaiah uses its land to speak about regional judgment and the reversal of power.'],
  [['javan','lud','tubal'], 'These distant peoples widen Isaiah’s horizon beyond Judah and its immediate enemies. They help frame the book’s final vision as international in scope.']
];

const details = {
  jerusalem: 'Jerusalem is the political and spiritual center of Isaiah’s world. Assyrian pressure, royal policy, temple worship, judgment, and hope all meet here.',
  lachish: 'Assyria’s capture of Lachish exposed Jerusalem to direct attack. Its fall shows how much of Judah was lost even though the capital survived.',
  nineveh: 'Nineveh represents the imperial power that threatened Judah. It also preserves Assyrian art and inscriptions that can be compared with Isaiah’s account.',
  babylon: 'In Isaiah, Babylon first appears as a rival under Assyrian rule. It later becomes the power linked with Judah’s exile. It then becomes the place where a promised return begins.',
  samaria: 'Samaria’s fall showed Judah what Assyrian conquest could do to a neighboring kingdom. Isaiah treats that disaster as both a warning and part of the region’s political upheaval.',
  hamath: 'Assyria’s defeat of Hamath made it a warning to other western kingdoms. Isaiah uses such fallen cities to expose the empire’s argument that resistance is useless.',
  arpad: 'Arpad’s long resistance ended in Assyrian conquest. Its defeat became part of Assyria’s political message to cities such as Jerusalem.',
  harran: 'Harran shows the reach of Assyrian control far beyond Judah. Isaiah includes conquered northern cities in the empire’s attempt to intimidate Jerusalem.',
  gozan: 'Gozan became part of the Assyrian system of provinces and deportation. Its name helps Isaiah’s readers feel the scale of Assyria’s earlier conquests.',
  libnah: 'Libnah matters because the Assyrian campaign did not stop at Lachish. Its uncertain location also warns against drawing a precise military route from the text.',
  damascus: 'Damascus joined Israel against Judah before it fell to Assyria. Its rise and defeat show how small kingdoms formed coalitions under imperial pressure.',
  carchemish: 'Babylon later won a battle at Carchemish. This victory moved control of Syria and the Levant away from Egypt. That change helps explain the Babylonian future in Isaiah.',
  susa: 'Susa belongs to the Persian horizon that follows Babylon. Persia’s rise provides the political setting for Isaiah’s promises connected with Cyrus.',
  assyria: 'Assyria is the main political power in much of Isaiah 1–39. The book presents Assyria as a human empire. It also shows God using Assyria and judging its violence and pride.',
  bashan: 'Bashan’s famous strength and fertility make it a useful image of human grandeur. Isaiah places such grandeur under God’s judgment.',
  aroer: 'Aroer helps locate the borderlands east of Israel. Isaiah uses abandoned towns there to show the reach of regional collapse.',
  calneh: 'Calneh belongs to the list of cities Assyria claimed to have overcome. The comparison turns geography into imperial propaganda aimed at Jerusalem.',
  galilee: 'Galilee was among the first Israelite regions to suffer Assyrian conquest. Isaiah turns this exposed borderland into a setting for renewed hope.',
  lebanon: 'Isaiah uses Lebanon’s cedars as images of wealth, height, and royal power. Their fall represents the humbling of proud rulers and empires.',
  media: 'The Medes helped end Assyrian rule and later became part of the Persian imperial world. Their appearance marks how quickly the balance of power could change.',
  'mount-carmel': 'Carmel’s fertility made its withering a strong image of national disaster. Its recovery could also signal renewed life.',
  negeb: 'The Negeb was a route for messengers, gifts, and armies moving toward Egypt. Isaiah uses it when criticizing Judah’s search for Egyptian protection.',
  euphrates: 'The Euphrates often marks the direction from which Mesopotamian empires reached Syria and Judah. Isaiah uses its floodwaters as an image of Assyria’s overwhelming advance.',
  rezeph: 'Rezeph was another city taken by Assyria. Its fate supports Assyria’s proud claim. Assyria says that no local god or king could resist its power.',
  sharon: 'Sharon links the coast with Judah’s hill country. Isaiah uses its fertile landscape to measure both devastation and restoration.',
  'valley-of-achor': 'Isaiah turns this remembered place of trouble into pasture for a restored people. The geography supports the movement from judgment to hope.'
};

const regionProfiles = {
  'babylonia-early': {
    summary: 'Babylonia occupied the river plain of southern Mesopotamia, with Babylon as its leading city. Its rulers controlled rich farmland, temples, and trade routes but often faced Assyrian intervention.',
    detail: 'Babylon mattered to Isaiah before it became the next great empire. Merodach-baladan challenged Assyria and contacted Hezekiah. Babylon could seem like a possible ally. It also warned of Judah’s future.'
  },
  judah: {
    summary: 'Judah was a small hill kingdom centered on Jerusalem. Its farms, walled towns, and roads supported the capital. They connected it with the coast, Jordan Valley, and south.',
    detail: 'Judah stood between larger powers and had to choose between revolt, tribute, and foreign alliances. Isaiah addresses those choices while warning that political plans cannot replace faithful leadership.'
  },
  philistia: {
    summary: 'Philistia had several city-states on the southern coast. They included Ashdod, Ashkelon, Ekron, Gaza, and Gath. The cities could work together, compete, or answer to a larger empire.',
    detail: 'Philistia matters because its cities stood on a major coastal route. The route joined Egypt with the Levant. Its rulers appear in warnings, revolts, alliances, and the campaign against Judah.'
  },
  'egypt-region': {
    summary: 'Egypt controlled the Nile valley and delta. Egypt had divided rulers, armies, horses, and wealth. Judah saw it as a strong but unsafe ally.',
    detail: 'Isaiah presents Egypt as a major nation in God’s wider plans. He also warns Judah not to put its trust in Egypt. Chapters 30–31 challenge Judah’s trust in Egyptian horses and military help.'
  },
  'cush-region': {
    summary: 'Cush was a kingdom south of Egypt in Nubia. Kushite kings also ruled Egypt as its Twenty-fifth Dynasty during part of Isaiah’s historical setting.',
    detail: 'Cush appears in Isaiah as a distant nation. Its messengers travel north. It also joins the conflict between Egypt and Assyria. Isaiah 37 names Tirhakah, usually identified with the Kushite ruler Taharqa.'
  },
  assyria: {
    summary: 'The Neo-Assyrian Empire expanded from northern Mesopotamia to the Mediterranean and Egypt. It ruled through armies, governors, tribute, local client kings, and forced population movement.',
    detail: 'Assyria caused the main political crisis in much of Isaiah 1–39. Assyria destroyed Israel and caused great harm in Judah. Jerusalem then had to decide where to place its trust.'
  },
  babylonia: {
    summary: 'The Neo-Babylonian Empire replaced Assyria as the main power in Mesopotamia and the Levant. Under Nebuchadnezzar II, Babylon conquered Jerusalem and deported many Judeans.',
    detail: 'Babylon is central to Isaiah’s words about exile and return. Babylon is the power that carries Judah away. It is also the empire that the exiles must later leave.'
  },
  persian: {
    summary: 'Cyrus and the Persian Empire took Babylon in 539 BCE. Persia then joined Babylon’s lands to a much larger kingdom. Persian kings often governed through existing local leaders and offices.',
    detail: 'Persia matters because Cyrus’s rise changed the future of displaced Judeans. Isaiah presents him as the ruler who makes Jerusalem’s restoration politically possible.'
  }
};

export function applyMapDescriptions(data) {
  for (const place of data.places) {
    if (summaries[place.id]) place.summary = summaries[place.id];
    const group = relevanceGroups.find(([ids]) => ids.includes(place.id));
    place.detail = details[place.id] || group?.[1] || 'This place helps show how Isaiah’s world connected small kingdoms, trade routes, and competing empires.';
  }
  for (const region of data.regions) {
    const profile = regionProfiles[region.id];
    if (profile) Object.assign(region, profile);
  }
}
