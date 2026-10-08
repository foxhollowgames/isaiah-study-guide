"""Build Micah with complete Scripture, original readings, and scoped reviewed sources."""
import json,sys
from book_common import ROOT,OUT,scripture,source,finish
DATE='2026-10-07'
t=scripture('micah','MIC',7)
assert [len(t[str(n)]) for n in range(1,8)]==[16,13,12,13,15,16,20]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/micah.json').read_text(encoding='utf8'))
s=source('web','Micah · World English Bible','https://ebible.org/engwebp/MIC01.htm','All seven chapters appear in the reading text.','Scripture','historical','The guide assigns no exact date to individual speeches or route through the named towns.')
s.update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=list(range(1,8)),reviewed=dict(date=DATE,scope='All 105 verses read. Verse counts and character integrity checked.'));sources=[s]
s=source('strollo-micah','Commentary on Micah 6:1-8','https://www.workingpreacher.org/commentaries/revised-common-lectionary/fourth-sunday-after-epiphany/commentary-on-micah-61-8-5','Strollo explains the dispute’s questions and the connection between daily conduct and relationship with God.','Scholarly study','historical','Proposed historical settings and translation choices remain attributed interpretations. Linked books were not separately reviewed.')
s.update(author='Megan Fullerton Strollo',year=2023,publisher='Luther Seminary',chapterCoverage=[6],reviewed=dict(date=DATE,scope='Complete commentary body and footnotes read. Linked works by Collins and Smith-Christopher were not separately reviewed.'));sources.append(s)
s=source('cfm-micah-2026','November 30–December 6: “He Delighteth in Mercy” · Micah, Nahum, Habakkuk, Zephaniah','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/49?lang=eng','The lesson studies mercy and required conduct. Its children’s section connects Bethlehem with Jesus.','LDS Come, Follow Me','lds','The Christian connection uses later Matthew passages. It remains separate from Micah’s own description of the ruler.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[5,6,7],reviewed=dict(date=DATE,scope='Introduction, adult study sections, and the children’s Micah 5 section read. Linked talks, videos, and Scripture Helps were not separately reviewed.'));sources.append(s)
old=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
p=dict(next(p for p in old['people'] if p['id']=='micah-prophet'))
p.update(role='Prophet from Moresheth who warns rulers and promises gathering',relations='He names Samaria and Jerusalem while addressing rulers, prophets, priests, and the people.',passages='Micah 1–7',meaning='His warning exposes violence hidden beneath paid assurances of peace and confidence in God’s presence.',sourceIds=['web'],placeIds=['samaria','jerusalem'],linkNames=['Micah'],verseScope={})
descriptions={
 'samaria':('Samaria is one of the centers named when Micah identifies the people’s wrongdoing.','Approximate ancient city marker. The warning does not supply an invasion route.'),
 'jerusalem':('Jerusalem receives warnings of ruin and a later vision of nations seeking instruction.','Approximate city marker. The visions do not locate future buildings or battle movements.'),
 'lachish':('Micah names Lachish among towns addressed in the lament.','Approximate ancient city marker. The order of town names does not establish an army route.'),
 'babylon':('Babylon appears as the place of distress and promised rescue in chapter four.','Approximate city marker. The passage does not give a journey’s path.'),
 'bethlehem':('Bethlehem Ephrathah is the small place from which the promised ruler will come.','Approximate locality marker. It does not identify a particular birth building.'),
 'egypt':('Egypt appears in memories of rescue and in the final hope for renewed wonders.','Broad regional reference. No specific departure point or route is assigned.'),
 'gilead':('Gilead appears in the request that God feed the people as in earlier days.','Broad regional reference. The request does not establish a particular pasture boundary.')}
places=[]
for id,(summary,limits) in descriptions.items():
 q=dict(next(q for q in old['places'] if q['id']==id));q.update(summary=summary,limits=limits,sourceIds=['web']);places.append(q)
summaries=['Micah warns Samaria and Jerusalem, then mourns the loss coming upon named towns.','Powerful people seize fields and homes. The ending promises to gather a remnant.','Rulers injure the people. Priests and prophets sell answers while claiming God’s protection.','Nations seek instruction and peace. Promises of gathering stand beside distress and judgment.','A ruler comes from Bethlehem. The passage addresses invasion and removes false sources of protection.','God recalls rescue. The people must practice justice instead of offering greater payment.','Public trust fails. Voices wait for rescue and praise God’s forgiving mercy.']
questions=['Why does Micah mourn while announcing judgment?','Who loses shelter when powerful people seize inherited fields?','How does payment change the messages people receive?','Who receives a place in the promised gathering?','How does feeding a flock change the image of a threatened ruler?','How do false weights contradict the conduct God requires?','Why does the ending join admitted wrongdoing with hope for forgiveness?']
ldsNotes={5:'The lesson’s children’s section connects Bethlehem with Jesus through Matthew’s account of his birth.',6:'The lesson asks readers to consider the conduct Micah says God requires.',7:'The lesson’s introduction emphasizes God’s delight in mercy through Micah’s final praise.'}
locations={1:['samaria','jerusalem','lachish'],2:[],3:['jerusalem'],4:['jerusalem','babylon'],5:['bethlehem'],6:['egypt'],7:['egypt','gilead']}
chapters=[]
for n,v,title,meaning in notes:
 loc=locations[n]
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=['micah-prophet'],places=loc,sourceIds=['web']+(['strollo-micah'] if n==6 else []),lds=dict(text=(ldsNotes.get(n,'')+' ' if n in ldsNotes else '')+'Study question. '+questions[n-1],sourceIds=['cfm-micah-2026'] if n in ldsNotes else []),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='Markers locate selected places named in the chapter. No army or promised return route is reconstructed.' if loc else 'The chapter describes households and gathering without specifying mapped locations.',route=[],routeEvidence='Town lists, memories, and promises do not establish a continuous traveled route.'))
data=dict(id='micah',bibleCode='MIC',name='Micah',description='Seized homes · paid answers · peace · a shepherd · justice · mercy',chapterCount=7,scripture=t,chapters=chapters,people=[p],places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All WEB verses read for seven original explanations. One selected prophet profile reuses the inspected Jeremiah portrait of Micah the Morashtite. External commentary and Church readings retain their specific coverage.',nextBook='nahum'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/micah-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
