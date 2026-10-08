"""Build Daniel from publisher Scripture and scoped external sources."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,finish
DATE='2026-10-07'
text=scripture('daniel','DAN',12)
assert [len(text[str(n)]) for n in range(1,13)]==[21,49,30,37,31,28,28,27,27,21,45,13]
assert not any('\ufffd' in v['text'] for vv in text.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/daniel.json').read_text(encoding='utf8'))
sources=[source('web','Daniel · World English Bible','https://ebible.org/engwebp/DAN01.htm','Court stories and visions appear in the full reading text.','Scripture','historical','The guide distinguishes named explanations from uncertain details. Darius the Mede is not identified with the Persian ruler in Ezra.')]
sources[0].update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=list(range(1,13)),reviewed=dict(date=DATE,scope='All chapter verse counts checked. Selected anchors and surrounding passages read for twelve original close readings.'))
nam=source('nam-daniel-7','Commentary on Daniel 7:9-10, 13-14','https://www.workingpreacher.org/commentaries/revised-common-lectionary/christ-the-king-2/commentary-on-daniel-79-10-13-14-4','Nam explains the ordered court beside violent beasts and distinguishes later Christian readings.','Scholarly study','historical','This source covers the selected vision. It does not establish dates for every vision in Daniel.')
nam.update(author='Roger Nam',year=2018,publisher='Luther Seminary',chapterCoverage=[7],reviewed=dict(date=DATE,scope='Complete commentary body read. Linked commentaries were not reviewed.'))
sources.append(nam)
lds=source('cfm-daniel-2026','November 9–15: “There Is No Other God That Can Deliver” · Daniel 1–7','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/46?lang=eng','The lesson studies faithful choices, prayer, and God’s kingdom.','LDS Come, Follow Me','lds','Its Church applications remain separate from the original passage explanations. The lesson does not cover chapters 8–12.')
lds.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[1,2,3,6,7],reviewed=dict(date=DATE,scope='Introduction and adult study sections read. Applied notes cover chapters 1–3 and 6–7. Linked resources were not separately reviewed.'))
sources.append(lds)
old=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
places=[]
for i,s in [('babylon','Babylon is the court setting for the opening stories.'),('jerusalem','Jerusalem is the city remembered through captured vessels and prayer.')]:
 p=dict(next(p for p in old['places'] if p['id']==i));p.update(summary=s,sourceIds=['web'],limits='Approximate city marker. It does not locate a palace room or trace a journey.');places.append(p)
people=[]
for i,name,role,relations,passages,meaning,aliases in [
 ('daniel','Daniel','Judean captive, court servant, and witness to visions','His court name is Belteshazzar. He prays with three Judean companions.','Daniel 1–12','He credits God with understanding and continues prayer when officials threaten his life.',['Belteshazzar']),
 ('shadrach','Hananiah · Shadrach','Judean captive who refuses the golden image','He serves beside Daniel, Mishael, and Azariah.','Daniel 1–3','His refusal remains firm even without a promise of rescue.',['Hananiah','Shadrach']),
 ('meshach','Mishael · Meshach','Judean captive who refuses the golden image','He serves beside Daniel, Hananiah, and Azariah.','Daniel 1–3','He joins his companions in prayer and refuses forced worship.',['Mishael','Meshach']),
 ('abednego','Azariah · Abednego','Judean captive who refuses the golden image','He serves beside Daniel, Hananiah, and Mishael.','Daniel 1–3','His rescue follows a refusal that did not depend on survival.',['Azariah','Abednego'])]:
 p=person(i,name,role,relations,passages,meaning);p.update(linkNames=aliases,placeIds=['babylon']);people.append(p)
p=dict(next(p for p in old['people'] if p['id']=='nebuchadnezzar'))
p.update(role='Babylonian king in the opening court stories',relations='His officials bring Daniel and his companions into royal service.',meaning='His power threatens others, but dreams and humiliation reveal its limits.',passages='Daniel 1–4',sourceIds=['web'],placeIds=['babylon']);people.append(p)
summaries=['Captives receive court training. Daniel proposes a trial of different food.','Daniel explains the king’s dream after seeking mercy with his companions.','Three men refuse the golden image. They survive the furnace.','The king describes a warning, lost reason, and restored rule.','Writing interrupts a feast that uses Jerusalem’s captured vessels.','A prayer ban traps Daniel and the king. Daniel survives the lions.','Beasts lose their rule before a heavenly court. The saints receive the kingdom.','A ram and goat represent kingdoms. A later ruler attacks worship.','Daniel confesses shared wrongdoing. Gabriel answers with a longer period of trouble.','A messenger strengthens Daniel and describes an unseen struggle.','Rulers break agreements and attack worship. Wise teachers suffer while serving others.','The vision promises rescue and awakening. Daniel must wait without full understanding.']
questions=['How does the steward’s risk shape Daniel’s proposed trial?','Why does Daniel pray with his companions before answering?','What makes their refusal independent of rescue?','How does care for poor people relate to royal power?','Why does Daniel reject the rewards before explaining the writing?','How does the prayer ban expose the king’s limits?','Why does the explanation give the kingdom to the saints?','What remains difficult after the animals receive named explanations?','Why does Daniel appeal to mercy rather than earned reward?','How does the messenger help Daniel’s weakened body?','Why does faithful teaching remain important when teachers suffer?','What does Daniel receive when full understanding remains unavailable?']
ldsNotes={1:'The 2026 lesson connects faithful choices with resisting harmful pressures.',2:'The lesson identifies the Church with the kingdom represented by the stone. This is a later Church application of the vision.',3:'The lesson studies faith that continues even when rescue is uncertain.',6:'The lesson connects Daniel’s regular prayer with daily faith.',7:'The lesson reads the humanlike figure through Jesus Christ. This Christian reading remains separate from the vision’s shared kingdom for the saints.'}
chapters=[]
for n,verse,title,meaning in notes:
 pids=['daniel']+(['shadrach','meshach','abednego'] if n in [1,2,3] else [])+(['nebuchadnezzar'] if n<=4 else [])
 loc=['babylon'] if n<=6 else ['jerusalem'] if n==9 else []
 if n in [1,5,6]:loc+=['jerusalem']
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=pids,places=loc,sourceIds=['web']+(['nam-daniel-7'] if n==7 else []),lds=dict(text=(ldsNotes.get(n,'')+' Study question. '+questions[n-1]).strip(),sourceIds=['cfm-daniel-2026'] if n in ldsNotes else []),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='City markers locate named references. They do not trace the movements of visions.' if loc else 'This vision has no mapped locations. Uncertain settings and unseen conflicts remain unmapped.',route=[],routeEvidence='No continuous traveled route is reconstructed.'))
data=dict(id='daniel',bibleCode='DAN',name='Daniel',description='Court service · forced worship · prayer · visions · waiting',chapterCount=12,scripture=text,chapters=chapters,people=people,places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='Selected anchors and surrounding passages reviewed for twelve original close readings. Five selected profiles are not a complete person inventory. External sources retain stated coverage limits.',nextBook='hosea'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/daniel-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
