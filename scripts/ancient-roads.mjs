const roadSources = [
  {
    id: 'dorsey-roads',
    title: 'The Roads and Highways of Ancient Israel',
    author: 'David A. Dorsey',
    year: '1991; 2018 reprint',
    type: 'Academic historical geography',
    url: 'https://books.google.com/books?id=y0z7DwAAQBAJ',
    summary: 'Dorsey reconstructs the road network west of the Jordan during the Iron Age. He uses terrain, settlement patterns, written evidence, gates, passes, and later road remains.',
    limitations: 'This map combines evidence from about 1200–587 BCE. Most routes cannot be dated only to Isaiah’s lifetime. A broad route does not identify every surviving roadbed.',
    license: 'Linked reading; route corridors independently redrawn and summarized for this study guide. The published maps and text are not reproduced.'
  },
  {
    id: 'aharoni-land',
    title: 'The Land of the Bible: A Historical Geography',
    author: 'Yohanan Aharoni; edited by Anson F. Rainey',
    year: '1979',
    type: 'Academic historical geography',
    url: 'https://books.google.com/books?id=AMtoyNxWw0UC',
    summary: 'Aharoni explains how terrain and regional connections shaped the main roads of the southern Levant. His treatment also provides context for routes east of the Jordan.',
    limitations: 'The road map combines evidence from a long period. It does not give a surveyed network for one year in the eighth century BCE.',
    license: 'Linked reading; route corridors independently redrawn and summarized for this study guide. The published maps and text are not reproduced.'
  },
  {
    id: 'radner-kings-road',
    title: 'The King’s Road — the imperial communication network',
    author: 'Karen Radner',
    year: '2024 web edition',
    type: 'Academic Neo-Assyrian history',
    url: 'https://oracc.museum.upenn.edu/saao/aebp/Essentials/Governors/TheKing%27sRoad/index.html',
    summary: 'Radner describes the Neo-Assyrian state road and relay network. Her route crosses the Euphrates at Til Barsip. It then passes Harran, Guzana, and Nasibina. It reaches the Tigris at Nineveh.',
    limitations: 'The essay identifies major crossings and stations. This guide connects them as a broad route. It does not claim a surveyed roadbed between each station.',
    license: 'Linked academic reading from Oracc and the University of Pennsylvania; corridor independently redrawn and summarized for this study guide.'
  },
  {
    id: 'del-fabbro-aleppo-roads',
    title: 'The Roads from and to Aleppo: Some Historical-geographical Considerations in Light of New Archaeological Data',
    author: 'Roswitha Del Fabbro',
    year: '2012',
    type: 'Academic historical geography and archaeology',
    url: 'https://www.researchgate.net/publication/279847109_The_roads_from_and_to_Aleppo_Some_historical-geographical_considerations_in_light_of_new_archaeological_data',
    summary: 'Del Fabbro uses ancient texts, land surveys, and satellite images. He studies routes around Aleppo. The Assyrian route goes from Nineveh through the upper Habur and Balih regions. It then crosses the Euphrates and turns west toward Aleppo.',
    limitations: 'Some sections have stronger written and physical evidence than others. These are broad routes. Local tracks changed during the long period in this study.',
    license: 'Linked academic reading; corridor lines independently redrawn and summarized for this study guide. Published maps are not reproduced.'
  },
  {
    id: 'radner-kalhu-routes',
    title: 'Kalhu, Tiglatpileser’s royal residence city',
    author: 'Karen Radner',
    year: '2024 web edition',
    type: 'Academic Neo-Assyrian geography',
    url: 'https://oracc.museum.upenn.edu/saao/aebp/essentials/cities/kalhu/index.html',
    summary: 'Radner places Kalhu on the north–south Tigris route between Nineveh and Assur. She also identifies its eastward connection through Arbela and the western Zagros fringe toward Babylonia.',
    limitations: 'The source shows the main connections, not every bend or station. The map therefore marks the eastward and southern route as probable.',
    license: 'Linked academic reading from Oracc and the University of Pennsylvania; corridors independently redrawn and summarized for this study guide.'
  }
];

// These lines show travel corridors. Their bends help the lines follow major
// plains, valleys, passes, and ridge systems. They are not surveyed roadbeds.
const ancientRoads = [
  {
    id: 'road-coastal-highway', title: 'International coastal highway', confidence: 'strong',
    points: [[31.04,32.55],[31.13,33.80],[31.50,34.46],[31.67,34.55],[31.80,34.65],[32.05,34.75],[32.10,34.93],[32.58,35.18],[32.68,35.10],[32.93,35.08],[33.27,35.20],[33.56,35.37],[33.89,35.50]],
    summary: 'This major route linked Egypt with the coast and northern Levant. Traders, messengers, and imperial armies used its plains and passes.',
    detail: 'The southern section followed the coast through Gaza and Philistia. Farther north, important branches crossed Carmel and the Jezreel Valley. “Via Maris” is a familiar later name. This guide calls it the international coastal highway.',
    uncertainty: 'Strong evidence supports this route. The line shows a general path. Its branches and exact roadbeds changed over time.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-jezreel-damascus', title: 'Jezreel Valley–Damascus route', confidence: 'strong',
    points: [[32.58,35.18],[32.56,35.32],[32.50,35.50],[32.75,35.57],[33.02,35.57],[33.25,35.70],[33.51,36.29]],
    summary: 'This branch connected Megiddo and the Jezreel Valley with Beth Shean. It continued toward the upper Jordan region and Damascus.',
    detail: 'The valley and its crossings supported trade and army travel. The route joined the coast, Galilee, Transjordan, and inland Syria.',
    uncertainty: 'The main connection is well supported. The line shows a broad route, not one fixed or fully built road.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-central-ridge', title: 'Central ridge road', confidence: 'strong',
    points: [[31.25,34.79],[31.53,35.10],[31.70,35.20],[31.78,35.235],[31.93,35.22],[32.06,35.29],[32.21,35.28],[32.28,35.20],[32.46,35.30],[32.58,35.18]],
    summary: 'A north–south road followed the central hills. It passed Beersheba, Hebron, Jerusalem, Bethel, and Shechem. It continued toward the Jezreel Valley.',
    detail: 'This route linked the principal highland settlements of Judah and Israel. It avoided some lowland obstacles but still depended on ridges, saddles, and local descents.',
    uncertainty: 'The hill route is well supported. The exact track could divide or shift between nearby ridges and towns.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-jordan-arabah', title: 'Jordan Valley and Arabah route', confidence: 'strong',
    points: [[29.53,35.00],[30.33,35.18],[30.75,35.28],[31.15,35.39],[31.87,35.44],[32.08,35.55],[32.50,35.50],[32.75,35.57]],
    summary: 'A long north–south route used the Arabah and Jordan Valley. It joined Aqaba, the Dead Sea, Jericho, Beth Shean, and Galilee.',
    detail: 'Travelers used several tracks on both sides of the valley. Fords and seasonal conditions affected where people crossed the Jordan.',
    uncertainty: 'The valley route is well supported. The line combines several possible tracks. It does not mark specific river crossings.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-shephelah', title: 'Shephelah road', confidence: 'strong',
    points: [[31.25,34.79],[31.41,34.84],[31.57,34.85],[31.70,34.92],[31.75,34.99],[31.86,34.92],[31.99,34.91],[32.10,34.93]],
    summary: 'This route ran through Judah’s western lowlands. It joined Beersheba, Lachish, Gezer, Aphek, and the valleys below Jerusalem.',
    detail: 'The Shephelah formed a connected lowland zone between the coastal plain and the Judean hills. Fortified towns near the route guarded approaches into the highlands.',
    uncertainty: 'The regional route is well supported. Local branches between valleys and fortified towns are simplified.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-beth-horon', title: 'Beth-horon ascent', confidence: 'strong',
    points: [[32.05,34.75],[31.99,34.91],[31.90,35.04],[31.89,35.12],[31.86,35.18],[31.78,35.235]],
    summary: 'This important western route connected the coastal plain with Jerusalem. It passed through the Aijalon Valley and climbed Beth-horon.',
    detail: 'The ascent used a favorable pass through difficult hill country. It served traffic between the coast, the Benjamin plateau, and Jerusalem.',
    uncertainty: 'The pass and connection are well supported. The line does not claim an exact eighth-century roadbed at every point.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-lachish-jerusalem', title: 'Lachish–Jerusalem approaches', confidence: 'probable',
    points: [[31.57,34.85],[31.70,34.92],[31.75,34.99],[31.73,35.08],[31.78,35.235]],
    summary: 'Routes through the Shephelah valleys connected Lachish with Jerusalem. They also joined nearby walled towns with the Judean hills.',
    detail: 'Isaiah 36 names travel from Lachish to Jerusalem. It does not identify the chosen road. This route shows one common western approach through the lowlands and hill passes.',
    uncertainty: 'The regional connection is probable. The exact route used in 701 BCE is unknown, so the line is dashed.',
    sourceIds: ['dorsey-roads','aharoni-land','web']
  },
  {
    id: 'road-jerusalem-jericho', title: 'Jerusalem–Jericho road', confidence: 'strong',
    points: [[31.78,35.235],[31.82,35.31],[31.84,35.38],[31.87,35.44]],
    summary: 'This steep east–west route connected Jerusalem with Jericho and the Jordan Valley. It also reached crossings toward Transjordan.',
    detail: 'The road descended rapidly through dry and broken terrain. It gave Jerusalem access to the valley and to routes east of the Jordan.',
    uncertainty: 'The connection is well supported. The displayed bends are approximate and do not identify one preserved Iron Age roadbed.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-kings-highway', title: 'Transjordan plateau route', confidence: 'probable',
    points: [[29.53,35.00],[30.33,35.44],[30.74,35.60],[31.50,35.74],[31.72,35.79],[31.95,35.93],[32.58,35.86],[33.51,36.29]],
    summary: 'A major north–south route crossed the Transjordan plateau. It passed Edom, Moab, Ammon, and Gilead before reaching Damascus.',
    detail: 'This series of plateau roads is often called the King’s Highway. It supported trade east of the Jordan. It linked nearby towns with Arabia, Syria, and western crossings.',
    uncertainty: 'This broad route is well known. It was not one fully built road. Its eighth-century path and local branches remain uncertain.',
    sourceIds: ['aharoni-land']
  },
  {
    id: 'road-syrian-inland', title: 'Damascus–Hamath–Aleppo route', confidence: 'probable',
    points: [[33.51,36.29],[34.02,36.73],[34.73,36.72],[35.13,36.75],[35.56,36.54],[36.20,37.16]],
    summary: 'A north–south inland route connected Damascus with the Orontes valley, Hamath, and Aleppo.',
    detail: 'Aleppo stood where many major routes met. They linked Anatolia, Syria, Palestine, Egypt, Mesopotamia, and the Mediterranean. This line follows the broad route through the Orontes valley, not the desert.',
    uncertainty: 'The regional connection is well supported. The evidence does not show one fixed Iron Age track. The line is dashed.',
    sourceIds: ['del-fabbro-aleppo-roads','aharoni-land']
  },
  {
    id: 'road-aleppo-euphrates', title: 'Aleppo–Euphrates approach', confidence: 'strong',
    points: [[36.20,37.16],[36.20,37.33],[36.30,37.55],[36.53,37.95],[36.67,38.10]],
    summary: 'This road linked Aleppo with the Euphrates crossing near Til Barsip. It also joined the wider Assyrian road network.',
    detail: 'Assyrian records and studies of ancient land support this route. It went through the Sajur and Manbij area. It then crossed the Jabbul plain toward Aleppo.',
    uncertainty: 'The connection and principal approach are well supported. The displayed bends simplify several local valleys and possible parallel tracks.',
    sourceIds: ['del-fabbro-aleppo-roads','radner-kings-road']
  },
  {
    id: 'road-assyrian-kings-road', title: 'Assyrian King’s Road to Nineveh', confidence: 'strong',
    points: [[36.67,38.10],[36.86,39.03],[36.72,39.40],[36.83,40.05],[36.92,40.55],[37.07,41.22],[36.90,41.80],[36.67,42.45],[36.36,43.15]],
    summary: 'The Neo-Assyrian state road connected western lands with the Assyrian heartland. It ended at the capital city of Nineveh.',
    detail: 'The route crossed the Euphrates at Til Barsip. It crossed the Balih south of Harran. It also crossed Habur streams between Guzana and Nasibina. It then reached the Tigris at Nineveh. Royal messengers changed mules at road stations.',
    uncertainty: 'The named crossings and stations are well supported. The line between them is a broad regional path, not a surveyed roadbed.',
    sourceIds: ['radner-kings-road','del-fabbro-aleppo-roads']
  },
  {
    id: 'road-assyrian-tigris', title: 'Assyrian Tigris route', confidence: 'strong',
    points: [[36.36,43.15],[36.10,43.33],[35.78,43.25],[35.46,43.25]],
    summary: 'A major north–south route followed the Tigris. It linked Nineveh, Kalhu, and Assur in the Assyrian heartland.',
    detail: 'Kalhu held a central position between Assur and Nineveh. It supported long trips by land and river. Kalhu later became an Assyrian royal capital.',
    uncertainty: 'The cities and their connection are well supported. The line shows a broad route. It does not separate land travel from river travel at every point.',
    sourceIds: ['radner-kalhu-routes','radner-kings-road']
  },
  {
    id: 'road-arbela-babylonia', title: 'Arbela–Babylonia route', confidence: 'probable',
    points: [[36.10,43.33],[36.19,44.01],[35.47,44.39],[34.69,44.96],[34.10,44.75],[33.35,44.40],[32.54,44.42]],
    summary: 'An eastern branch connected Kalhu with Arbela. It followed the western edge of the Zagros Mountains. Other routes continued south into Babylonia.',
    detail: 'Kalhu controlled an eastward route through Arbela. The route followed the western edge of the Zagros toward Babylonia. It avoided a direct crossing of the central desert.',
    uncertainty: 'The regional connection is supported, but the precise southern alignment and stations are uncertain. The line is dashed.',
    sourceIds: ['radner-kalhu-routes']
  }
];

export function addAncientRoads(content) {
  for (const item of roadSources) {
    if (!content.sources.some(source => source.id === item.id)) content.sources.push(item);
  }
  content.ancientRoads = ancientRoads;
}
