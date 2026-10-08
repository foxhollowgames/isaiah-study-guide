"""Ezekiel: original close readings and precisely scoped external sources."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,finish
DATE='2026-10-07'
old=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
def reviewed(i,title,url,summary,author,year,coverage,scope,limits,perspective='historical'):
    s=source(i,title,url,summary,'Scholarly study' if perspective=='historical' else 'LDS Come, Follow Me',perspective,limits)
    s.update(author=author,year=year,publisher='Luther Seminary' if perspective=='historical' else 'The Church of Jesus Christ of Latter-day Saints',chapterCoverage=coverage,reviewed=dict(date=DATE,scope=scope))
    return s
sources=[source('web','Ezekiel · World English Bible','https://ebible.org/engwebp/EZK01.htm','All 48 chapters supply the guide’s exact reading text.','Scripture','historical','Original interpretations use selected passages and surrounding verses. This review does not verify all historical predictions or identify visionary settings as excavated locations.')]
sources[0].update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=list(range(1,49)),reviewed=dict(date=DATE,scope='Selected passages and surrounding verses read for every chapter. Complete publisher text cached and checked for verse sequence and replacement characters.'))
sources.append(reviewed('odell-shepherds','Commentary on Ezekiel 34:11-16, 20-24','https://www.workingpreacher.org/commentaries/revised-common-lectionary/christ-the-king/commentary-on-ezekiel-3411-16-20-24-6','Odell connects care for injured sheep with correcting the abuse that harmed them.','Margaret Odell',2014,[34],'Complete commentary and footnotes read. Its discussion of care, justice, and rulers reviewed.','Odell’s interpretation is attributed scholarship. Works cited in the footnotes were not independently read.'))
sources.append(reviewed('odell-bones','Commentary on Ezekiel 37:1-14','https://www.workingpreacher.org/commentaries/revised-common-lectionary/fifth-sunday-in-lent/commentary-on-ezekiel-371-14-6','Odell reads the bones as an image of surviving exiles whose hope has failed.','Margaret Odell',2014,[37],'Complete commentary and its footnote read. Interpretation of 37:11–14 reviewed.','The battlefield identification and language discussion remain the author’s interpretation. The cited Olyan article was not independently reviewed. No new Hebrew entry is supplied.'))
coverage=[1,2,3,33,34,36,37,47]
sources[-2]['excerpt']=dict(text='Justice and care belong together',attribution='Margaret Odell · Working Preacher',location='Paragraph beginning “Justice and care belong together”',url=sources[-2]['url'],checked=DATE,chapters=[34],context='Odell connects rescue for weak sheep with judgment against abuses of power.')
sources.append(reviewed('cfm-ezekiel-2026','November 2–8. “A New Spirit Will I Put within You”: Ezekiel 1–3; 33–34; 36–37; 47','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/45?lang=eng','The lesson connects warning, care, repentance, gathering, and temple healing with following Jesus Christ.','The Church of Jesus Christ of Latter-day Saints',2026,coverage,'Introduction and adult study sections read. The children’s sections were visible but are not the basis for these notes. Linked talks, videos, and Scripture Helps were not separately reviewed.','Its Bible and Book of Mormon reading of the sticks is later Church interpretation. Ezekiel’s own explanation names reunited peoples and kingdoms. No archaeological claim about writing boards is independently verified here.','lds'))
atlas=dict(next(s for s in json.loads((OUT/'genesis.json').read_text(encoding='utf8'))['sources'] if s['id']=='atlas-canaan'))
sources.append(atlas)
text=scripture('ezekiel','EZK',48)
counts=[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]
assert [len(text[str(n)]) for n in range(1,49)]==counts
assert sum(map(len,text.values()))==1273
assert not any('\ufffd' in v['text'] for verses in text.values() for v in verses)
notes=json.loads((ROOT/'scripts/book-context-complete/ezekiel.json').read_text(encoding='utf8'))
outline=[
('Ezekiel sees living creatures, wheels, and a throne beside the Chebar River. He falls before God’s glory.','Why does the glory appear among people far from Jerusalem?'),
('God sends Ezekiel to people who resist his words. A scroll bears words of grief.','Why must Ezekiel speak even when his listeners refuse?'),
('Ezekiel eats the scroll and joins the captives. God makes him a watchman and restricts his speech.','What makes silence dangerous for the appointed watchman?'),
('Ezekiel models Jerusalem’s siege. His body, measured food, and water become signs for the people.','How do measured meals explain the coming siege?'),
('Ezekiel divides shaved hair into portions. God announces different forms of loss for Jerusalem.','Why do even the protected hairs face a further threat?'),
('God announces destruction at Israel’s worship sites. Survivors will remember him among the nations.','How does remembrance change the meaning of survival?'),
('God announces the land’s end. Trade, wealth, worship, and public leadership fail during the crisis.','Why can silver no longer provide the security its owners expected?'),
('A vision takes Ezekiel to Jerusalem’s sanctuary. He sees forbidden worship behind its walls.','How does the vision answer the elders’ claim that God cannot see?'),
('A man marks those who mourn Jerusalem’s wrongs. Other figures kill people within the city.','Why does the vision distinguish mourners from other inhabitants?'),
('Ezekiel sees the throne and creatures again. God’s glory moves toward the temple’s eastern gate.','How does this departure connect with Ezekiel’s opening vision?'),
('God condemns Jerusalem’s leaders and promises a new heart to the exiles. The glory leaves Jerusalem.','Why do distant exiles receive a promise of God’s presence?'),
('Ezekiel carries baggage through a wall. God rejects claims that his warnings concern a distant future.','How does the baggage make a postponed warning immediate?'),
('God condemns false promises of peace. He also accuses women whose practices trap and harm people.','Why does whitewashed wall imagery fit a false promise of peace?'),
('Elders seek guidance while keeping idols in their hearts. God limits protection through other righteous people.','Why cannot the three righteous figures rescue everyone else?'),
('God compares Jerusalem’s inhabitants with burned vine wood. Its damaged branches cannot provide useful timber.','Why does this vine comparison focus on wood instead of fruit?'),
('God portrays Jerusalem’s growth and betrayal through a woman’s story. A lasting covenant follows the accusation.','How does the comparison with Sodom challenge Jerusalem’s pride?'),
('Two eagles and a vine form a royal riddle. God explains a broken oath and promises new growth.','Why does the vine’s search for another eagle become a broken obligation?'),
('God rejects a proverb about inherited guilt. Different conduct and changed lives bring different judgments.','How do the three generations challenge the sour-grapes saying?'),
('A funeral song portrays princes as captured lions. A fruitful vine loses its ruling branches.','Why does the song combine royal strength with capture and burning?'),
('God reviews generations of rebellion before the elders. A promised gathering also includes judgment.','Why does this history repeat God’s concern for his name?'),
('A sword threatens the land. Babylon’s ruler chooses Jerusalem, and Israel’s prince loses his crown.','Why does dismissing the foreign ruler’s choice fail to protect Jerusalem?'),
('God lists Jerusalem’s wrongs across leaders and ordinary people. No defender stands in the gap.','How do abuses against poor people connect with failures in worship?'),
('Two sisters represent Samaria and Jerusalem. Desired foreign powers become attackers.','What changes when the cities’ desired allies become their attackers?'),
('A boiling pot represents Jerusalem’s corruption. Ezekiel’s wife dies, and his mourning becomes a sign.','Why do the people ask about Ezekiel’s unusual response to loss?'),
('God addresses Ammon, Moab, Edom, and the Philistines. Contempt and revenge bring warnings of judgment.','Why does celebrating Judah’s loss become a charge against its neighbors?'),
('God announces attacks against Tyre. Coastal rulers mourn its predicted fall.','How does hoped-for profit from Jerusalem’s fall reverse in the warning?'),
('A trading ship represents Tyre’s wealth. Its loss brings mourning among crews and merchants.','How does the list of trading partners increase the scale of loss?'),
('God confronts Tyre’s ruler and mourns its king. Sidon faces judgment, and Israel receives promised safety.','Why does the ruler’s wealth fail to support his claim to divinity?'),
('God confronts Pharaoh’s claim over the river. A later speech promises Egypt as Babylon’s payment.','How does the later speech distinguish effort against Tyre from expected payment?'),
('God announces loss across Egypt and its allies. Pharaoh’s arms break while Babylon’s ruler gains strength.','What does the broken-arm comparison say about expected military help?'),
('Assyria appears as a great tree cut down for pride. God applies its fate to Pharaoh.','Why does Pharaoh hear a warning through another power’s tree?'),
('A funeral song describes Pharaoh’s fall. Egypt joins other defeated peoples in the pit.','How does shared burial reverse the nations’ former terror?'),
('God renews Ezekiel’s watchman duty. News confirms Jerusalem’s defeat, but listeners still fail to act.','Why does enjoying the prophet’s voice fail to answer his message?'),
('God condemns shepherds who exploit the flock. He promises care, judgment, and a shepherd called David.','Why must care for wounded sheep include judgment against stronger sheep?'),
('God condemns Mount Seir’s hostility and claim over Israel’s lands. Its own desolation follows.','How does God’s presence challenge Seir’s claim to empty land?'),
('God promises restored land, gathered people, cleansing, and a new heart. Changed conduct will follow.','Why does return require more than new homes and productive fields?'),
('Dry bones receive breath and life. Two joined sticks represent restored unity under one ruler.','How do the bones and sticks answer different forms of separation?'),
('Gog plans to plunder a peaceful, gathered people. God announces judgment against the invading force.','Why does the attacker treat peaceful villages as an opportunity?'),
('Gog’s weapons become fuel, and his dead receive burial. God promises mercy and a gathered people.','How do fuel and burial work reverse the invader’s display of strength?'),
('A guide measures gates, courts, and service areas in Ezekiel’s vision. Ezekiel must report the pattern.','Why does the guide require careful looking and listening before reporting?'),
('The guide measures the sanctuary’s inner rooms and surrounding structures. Carved decorations cover its surfaces.','How do different entrances mark the movement toward the most holy place?'),
('The guide shows priestly rooms for offerings and garments. A wall separates sacred and common space.','Why must priests change garments before approaching the people’s area?'),
('God’s glory enters the temple through the east. The people receive instructions for conduct and worship.','How does the return of glory answer its earlier departure?'),
('God gives rules for sanctuary service. Priests must teach, judge disputes, and keep sacred distinctions.','How does the teaching duty answer the earlier charge against priests?'),
('Land portions support worship, the city, and the prince. God demands justice and honest measures.','Why do assigned royal land and honest measures belong together?'),
('God orders worship and rules for royal gifts. The prince must not seize another household’s land.','How does the inheritance rule restrain the prince’s power?'),
('Water flows from the temple and brings life. Resident foreigners receive land within Israel’s tribes.','How does inheritance for resident foreigners extend the promise of restored life?'),
('Tribal portions surround sacred land and the city. Its final name declares God’s presence.','Why does the book end by naming the city’s relationship with God?')
]
assert len(outline)==48
people=[]
for i,name,role,relations,passages,meaning in [
 ('ezekiel','Ezekiel','Priest and prophet among the captives','He is Buzi’s son and speaks to the exiles.','Ezekiel 1–48','His visions and public actions explain judgment and a future with God among the people.'),
 ('ezekiel-wife','Ezekiel’s wife','Unnamed wife whose death becomes part of a public sign','Ezekiel calls her the desire of his eyes.','Ezekiel 24:15–24','Her death brings the prophet’s warning into his household. The text gives no name or personal response.')]:
    p=person(i,name,role,relations,passages,meaning);p.update(placeIds=[],linkNames=[]);people.append(p)
for i,role,meaning,passages in [
 ('jehoiachin','Captive king whose exile supplies the opening date','His captivity locates Ezekiel’s calling within the experience of displaced people.','Ezekiel 1:2'),
 ('nebuchadnezzar','Babylonian king named in speeches about Tyre and Egypt','The speeches connect his military effort with a promised reward in Egypt.','Ezekiel 26:7; 29:18–20')]:
    p=dict(next(p for p in old['people'] if p['id']==i));p.update(role=role,meaning=meaning,passages=passages,placeIds=[],sourceIds=['web']);people.append(p)
places=[]
for i,summary in [
 ('jerusalem','Jerusalem is the city addressed in warnings and shown in temple visions.'),
 ('babylon','Babylon appears as a destination of captivity and the seat of a foreign ruler.'),
 ('tyre','Tyre is the trading city addressed through siege warnings and a ship lament.'),
 ('sidon','Sidon receives a warning beside the speeches against Tyre.'),
 ('egypt','Egypt appears in accounts of failed support and warnings against Pharaoh.'),
 ('samaria','Samaria is named as one sister in the comparison of two cities.'),
 ('edom','Edom receives warnings connected with revenge and claims over Israel’s land.'),
 ('rabbah','Rabbah is the Ammonite city named as one destination at the divided road.'),
 ('damascus','Damascus appears in trade references and the borders of the restored land.')]:
    p=dict(next(p for p in old['places'] if p['id']==i))
    p.update(summary=summary,limits='Approximate display point for a named city or broad region. It does not locate visionary buildings or prove fulfillment of a warning.',sourceIds=['web','atlas-canaan']);places.append(p)
locations={n:['jerusalem'] for n in range(4,25)}
locations.update({1:[],2:[],3:[],12:['jerusalem','babylon'],16:['jerusalem','samaria'],17:['jerusalem','babylon','egypt'],19:['egypt','babylon'],20:['egypt'],21:['jerusalem','rabbah'],23:['samaria','jerusalem','egypt'],25:['rabbah','edom'],26:['tyre','babylon'],27:['tyre','damascus','egypt'],28:['tyre','sidon'],29:['egypt','tyre','babylon'],30:['egypt','babylon'],31:['egypt'],32:['egypt'],33:['jerusalem'],34:[],35:['edom'],36:[],37:[],38:[],39:[],40:[],41:[],42:[],43:[],44:[],45:[],46:[],47:['damascus'],48:['damascus']})
ldsNotes={1:'The 2026 lesson emphasizes God’s presence among exiles.',2:'The lesson’s opening invites people to hear God’s word.',3:'The lesson connects the watchman’s duty with caring leadership.',33:'The lesson studies repentance as a change of conduct that can lead to life.',34:'The lesson connects the shepherd’s care with following the Savior.',36:'The lesson connects a new heart with repentance and obedience.',37:'The lesson also reads the sticks as the Bible and the Book of Mormon. This later Church interpretation differs from Ezekiel’s explanation of reunited peoples.',47:'The lesson reads the healing river through blessings associated with temple worship.'}
chapters=[]
for row,(summary,question) in zip(notes,outline):
    n,verse,title,meaning=row
    refs=['web']+(['odell-shepherds'] if n==34 else ['odell-bones'] if n==37 else [])
    pids=['ezekiel']+(['ezekiel-wife'] if n==24 else ['jehoiachin'] if n==1 else ['nebuchadnezzar'] if n in [26,29] else [])
    chapters.append(dict(chapter=n,title=title,summary=summary,meaning=meaning,people=pids,places=locations[n],sourceIds=refs,lds=dict(text=(ldsNotes.get(n,'')+' Study question. '+question).strip(),sourceIds=['cfm-ezekiel-2026'] if n in coverage else []),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='Named places locate the speech’s references. Visions and predicted movements do not establish traveled routes.' if locations[n] else 'This chapter has no mapped places. Visionary settings and uncertain river locations remain unmapped.',route=[],routeEvidence='No traveled route is reconstructed from visions or predictions.'))
data=dict(id='ezekiel',bibleCode='EZK',name='Ezekiel',description='Exile · visions · failed rulers · renewed life · divine presence',chapterCount=48,scripture=text,chapters=chapters,people=people,places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='Selected passages and surrounding verses reviewed for all 48 original close readings. Source reviews retain their stated access limits. Four selected profiles do not form a complete person inventory.',nextBook='daniel'))
if '--ready' in sys.argv:finish(data)
else:
    (ROOT/'review/ezekiel-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('Saved Ezekiel draft: 48 chapters, 1273 verses, four selected profiles.')
