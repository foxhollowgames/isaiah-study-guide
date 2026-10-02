const roadSources = [
  {
    id: 'dorsey-roads',
    title: 'The Roads and Highways of Ancient Israel',
    author: 'David A. Dorsey',
    year: '1991; 2018 reprint',
    type: 'Academic historical geography',
    url: 'https://books.google.com/books?id=y0z7DwAAQBAJ',
    summary: 'Dorsey reconstructs the road network west of the Jordan during the Iron Age. He uses terrain, settlement patterns, written evidence, gates, passes, and later road remains.',
    limitations: 'The reconstruction combines evidence from about 1200–587 BCE. Most routes cannot be dated only to Isaiah’s lifetime, and an approximate corridor does not identify every surviving roadbed.',
    license: 'Linked reading; route corridors independently redrawn and summarized by Meridian. The published maps and text are not reproduced.'
  },
  {
    id: 'aharoni-land',
    title: 'The Land of the Bible: A Historical Geography',
    author: 'Yohanan Aharoni; edited by Anson F. Rainey',
    year: '1979',
    type: 'Academic historical geography',
    url: 'https://books.google.com/books?id=AMtoyNxWw0UC',
    summary: 'Aharoni explains how terrain and regional connections shaped the main roads of the southern Levant. His treatment also provides context for routes east of the Jordan.',
    limitations: 'The road map is a broad historical reconstruction. It does not give a surveyed network for one year in the eighth century BCE.',
    license: 'Linked reading; route corridors independently redrawn and summarized by Meridian. The published maps and text are not reproduced.'
  },
  {
    id: 'radner-kings-road',
    title: 'The King’s Road — the imperial communication network',
    author: 'Karen Radner',
    year: '2024 web edition',
    type: 'Academic Neo-Assyrian history',
    url: 'https://oracc.museum.upenn.edu/saao/aebp/Essentials/Governors/TheKing%27sRoad/index.html',
    summary: 'Radner describes the Neo-Assyrian state road and relay network. Her route example crosses the Euphrates at Til Barsip, passes Harran, Guzana, and Nasibina, and reaches the Tigris at Nineveh.',
    limitations: 'The essay identifies major crossings and stations. Meridian connects them as a broad corridor and does not claim a surveyed roadbed between each station.',
    license: 'Linked academic reading from Oracc and the University of Pennsylvania; corridor independently redrawn and summarized by Meridian.'
  },
  {
    id: 'del-fabbro-aleppo-roads',
    title: 'The Roads from and to Aleppo: Some Historical-geographical Considerations in Light of New Archaeological Data',
    author: 'Roswitha Del Fabbro',
    year: '2012',
    type: 'Academic historical geography and archaeology',
    url: 'https://www.researchgate.net/publication/279847109_The_roads_from_and_to_Aleppo_Some_historical-geographical_considerations_in_light_of_new_archaeological_data',
    summary: 'Del Fabbro combines ancient texts, terrain, archaeological survey, and satellite imagery to study the routes around Aleppo. The study traces an Assyrian approach from Nineveh through the upper Habur and Balih regions to the Euphrates, then west toward Aleppo.',
    limitations: 'Some sections have stronger textual and archaeological support than others. Long-distance connections are corridors, and local tracks changed across the long period discussed.',
    license: 'Linked academic reading; corridor lines independently redrawn and summarized by Meridian. Published maps are not reproduced.'
  },
  {
    id: 'radner-kalhu-routes',
    title: 'Kalhu, Tiglatpileser’s royal residence city',
    author: 'Karen Radner',
    year: '2024 web edition',
    type: 'Academic Neo-Assyrian geography',
    url: 'https://oracc.museum.upenn.edu/saao/aebp/essentials/cities/kalhu/index.html',
    summary: 'Radner places Kalhu on the north–south Tigris route between Nineveh and Assur. She also identifies its eastward connection through Arbela and the western Zagros fringe toward Babylonia.',
    limitations: 'The source establishes the principal connections, not every bend or station. The eastward and southern continuation is therefore shown as a probable corridor.',
    license: 'Linked academic reading from Oracc and the University of Pennsylvania; corridors independently redrawn and summarized by Meridian.'
  }
];

// These lines show travel corridors. Their bends help the lines follow major
// plains, valleys, passes, and ridge systems. They are not surveyed roadbeds.
const ancientRoads = [
  {
    id: 'road-coastal-highway', title: 'International coastal highway', confidence: 'strong',
    points: [[31.04,32.55],[31.13,33.80],[31.50,34.46],[31.67,34.55],[31.80,34.65],[32.05,34.75],[32.10,34.93],[32.58,35.18],[32.68,35.10],[32.93,35.08],[33.27,35.20],[33.56,35.37],[33.89,35.50]],
    summary: 'This major corridor linked Egypt with the coastal plain and the northern Levant. Trade, diplomacy, and imperial armies used its connected plains and passes.',
    detail: 'The southern section followed the coast through Gaza and Philistia. Farther north, important branches crossed the Carmel region and the Jezreel Valley. “Via Maris” is a familiar later label; Meridian uses the descriptive name international coastal highway.',
    uncertainty: 'Strong evidence supports the corridor. The displayed line is approximate, and its branches and exact roadbeds changed over time.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-jezreel-damascus', title: 'Jezreel Valley–Damascus corridor', confidence: 'strong',
    points: [[32.58,35.18],[32.56,35.32],[32.50,35.50],[32.75,35.57],[33.02,35.57],[33.25,35.70],[33.51,36.29]],
    summary: 'This branch connected Megiddo and the Jezreel Valley with Beth Shean, the upper Jordan region, and Damascus.',
    detail: 'The valley and inland crossings made this corridor important for regional trade and military travel between the coast, Galilee, Transjordan, and inland Syria.',
    uncertainty: 'The main connection is well supported. The line shows a corridor rather than one fixed or continuously built road.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-central-ridge', title: 'Central ridge road', confidence: 'strong',
    points: [[31.25,34.79],[31.53,35.10],[31.70,35.20],[31.78,35.235],[31.93,35.22],[32.06,35.29],[32.21,35.28],[32.28,35.20],[32.46,35.30],[32.58,35.18]],
    summary: 'A north–south road followed the central highlands from Beersheba through Hebron, Jerusalem, Bethel, Shechem, and toward the Jezreel Valley.',
    detail: 'This route linked the principal highland settlements of Judah and Israel. It avoided some lowland obstacles but still depended on ridges, saddles, and local descents.',
    uncertainty: 'The highland corridor is well supported. The precise track could divide or shift between nearby ridges and settlements.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-jordan-arabah', title: 'Jordan Valley and Arabah corridor', confidence: 'strong',
    points: [[29.53,35.00],[30.33,35.18],[30.75,35.28],[31.15,35.39],[31.87,35.44],[32.08,35.55],[32.50,35.50],[32.75,35.57]],
    summary: 'A long north–south corridor used the Arabah and Jordan Valley between the Gulf of Aqaba, the Dead Sea region, Jericho, Beth Shean, and Galilee.',
    detail: 'Travelers used several tracks on both sides of the valley. Fords and seasonal conditions affected where people crossed the Jordan.',
    uncertainty: 'The valley corridor is secure, but the displayed line combines several possible tracks and does not mark specific fords.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-shephelah', title: 'Shephelah road', confidence: 'strong',
    points: [[31.25,34.79],[31.41,34.84],[31.57,34.85],[31.70,34.92],[31.75,34.99],[31.86,34.92],[31.99,34.91],[32.10,34.93]],
    summary: 'This route ran through Judah’s western lowlands between Beersheba, Lachish, the valleys below Jerusalem, Gezer, and Aphek.',
    detail: 'The Shephelah formed a connected lowland zone between the coastal plain and the Judean hills. Fortified towns near the route guarded approaches into the highlands.',
    uncertainty: 'The regional route is well supported. Local branches between valleys and fortified towns are simplified.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-beth-horon', title: 'Beth-horon ascent', confidence: 'strong',
    points: [[32.05,34.75],[31.99,34.91],[31.90,35.04],[31.89,35.12],[31.86,35.18],[31.78,35.235]],
    summary: 'This important western approach connected the coastal plain and Aijalon Valley with Jerusalem through the Beth-horon ascent.',
    detail: 'The ascent used a favorable pass through difficult hill country. It served traffic between the coast, the Benjamin plateau, and Jerusalem.',
    uncertainty: 'The pass and connection are well supported. The line does not claim an exact eighth-century roadbed at every point.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-lachish-jerusalem', title: 'Lachish–Jerusalem approaches', confidence: 'probable',
    points: [[31.57,34.85],[31.70,34.92],[31.75,34.99],[31.73,35.08],[31.78,35.235]],
    summary: 'Routes through the Shephelah valleys connected Lachish and nearby fortified towns with the Judean highlands and Jerusalem.',
    detail: 'Isaiah 36 names travel from Lachish to Jerusalem, but it does not identify the chosen road. This corridor shows one common western approach through the lowlands and hill passes.',
    uncertainty: 'The regional connection is probable. The exact route used in 701 BCE is unknown, so the line is dashed.',
    sourceIds: ['dorsey-roads','aharoni-land','web']
  },
  {
    id: 'road-jerusalem-jericho', title: 'Jerusalem–Jericho road', confidence: 'strong',
    points: [[31.78,35.235],[31.82,35.31],[31.84,35.38],[31.87,35.44]],
    summary: 'This steep east–west route connected Jerusalem with Jericho, the Jordan Valley, and crossings toward Transjordan.',
    detail: 'The road descended rapidly through dry and broken terrain. It gave Jerusalem access to the valley and to routes east of the Jordan.',
    uncertainty: 'The connection is well supported. The displayed bends are approximate and do not identify one preserved Iron Age roadbed.',
    sourceIds: ['dorsey-roads','aharoni-land']
  },
  {
    id: 'road-kings-highway', title: 'Transjordan plateau corridor', confidence: 'probable',
    points: [[29.53,35.00],[30.33,35.44],[30.74,35.60],[31.50,35.74],[31.72,35.79],[31.95,35.93],[32.58,35.86],[33.51,36.29]],
    summary: 'A major north–south corridor crossed the Transjordan plateau through Edom, Moab, Ammon, Gilead, and toward Damascus.',
    detail: 'This connected series of plateau roads is often called the King’s Highway. It supported regional exchange and linked settlements east of the Jordan with Arabia, Syria, and western crossings.',
    uncertainty: 'The broad corridor is well known, but it was not one uniformly engineered road. The eighth-century alignment and local branches remain approximate.',
    sourceIds: ['aharoni-land']
  },
  {
    id: 'road-syrian-inland', title: 'Damascus–Hamath–Aleppo corridor', confidence: 'probable',
    points: [[33.51,36.29],[34.02,36.73],[34.73,36.72],[35.13,36.75],[35.56,36.54],[36.20,37.16]],
    summary: 'A north–south inland corridor connected Damascus with the Orontes valley, Hamath, and Aleppo.',
    detail: 'Aleppo stood where routes between Anatolia, inner Syria, Palestine, Egypt, Mesopotamia, and the Mediterranean met. This line follows the broad inland connection through the Orontes corridor rather than the desert.',
    uncertainty: 'The regional connection is well supported, but the evidence does not define one fixed Iron Age track for its full length. The line is dashed.',
    sourceIds: ['del-fabbro-aleppo-roads','aharoni-land']
  },
  {
    id: 'road-aleppo-euphrates', title: 'Aleppo–Euphrates approach', confidence: 'strong',
    points: [[36.20,37.16],[36.20,37.33],[36.30,37.55],[36.53,37.95],[36.67,38.10]],
    summary: 'This road linked Aleppo with the Euphrates crossing near Til Barsip and the wider Assyrian network.',
    detail: 'Assyrian campaign records and archaeological geography support a route from the Euphrates through the Sajur and Manbij area, then west across the Jabbul plain toward Aleppo.',
    uncertainty: 'The connection and principal approach are well supported. The displayed bends simplify several local valleys and possible parallel tracks.',
    sourceIds: ['del-fabbro-aleppo-roads','radner-kings-road']
  },
  {
    id: 'road-assyrian-kings-road', title: 'Assyrian King’s Road to Nineveh', confidence: 'strong',
    points: [[36.67,38.10],[36.86,39.03],[36.72,39.40],[36.83,40.05],[36.92,40.55],[37.07,41.22],[36.90,41.80],[36.67,42.45],[36.36,43.15]],
    summary: 'The Neo-Assyrian state road connected the western provinces with the Assyrian heartland and its capital at Nineveh.',
    detail: 'The documented route crossed the Euphrates at Til Barsip, the Balih south of Harran, and Habur tributaries between Guzana and Nasibina before it reached the Tigris at Nineveh. Royal messengers used relays of mules and road stations.',
    uncertainty: 'The named crossings and stations are well supported. The line between them is a regional reconstruction, not a surveyed roadbed.',
    sourceIds: ['radner-kings-road','del-fabbro-aleppo-roads']
  },
  {
    id: 'road-assyrian-tigris', title: 'Assyrian Tigris corridor', confidence: 'strong',
    points: [[36.36,43.15],[36.10,43.33],[35.78,43.25],[35.46,43.25]],
    summary: 'A major north–south route along the Tigris linked Nineveh, Kalhu, and Assur in the Assyrian heartland.',
    detail: 'Kalhu held a central position between Assur and Nineveh. It served long-distance movement on land and on the river and became an Assyrian royal capital.',
    uncertainty: 'The cities and the north–south connection are secure. The displayed line is a corridor and does not separate land travel from nearby river transport at every point.',
    sourceIds: ['radner-kalhu-routes','radner-kings-road']
  },
  {
    id: 'road-arbela-babylonia', title: 'Arbela–Babylonia corridor', confidence: 'probable',
    points: [[36.10,43.33],[36.19,44.01],[35.47,44.39],[34.69,44.96],[34.10,44.75],[33.35,44.40],[32.54,44.42]],
    summary: 'An eastern branch connected Kalhu with Arbela, the western edge of the Zagros Mountains, and routes south into Babylonia.',
    detail: 'Kalhu controlled an eastward route through Arbela. The connection then followed the western Zagros fringe toward Babylonia, avoiding a direct crossing of the central desert.',
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
