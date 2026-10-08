"""Build Joel with reviewed Scripture and scoped study sources."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,finish
DATE='2026-10-07'
t=scripture('joel','JOL',3)
assert [len(t[str(n)]) for n in range(1,4)]==[20,32,21]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/joel.json').read_text(encoding='utf8'))
sources=[source('web','Joel · World English Bible','https://ebible.org/engwebp/JOL01.htm','All three chapters appear in the reading text.','Scripture','historical','This edition has three chapters. No exact disaster date or modern fulfillment is assigned.')]
sources[0].update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1,2,3],reviewed=dict(date=DATE,scope='All 73 verses read. Chapter counts and character integrity checked.'))
s=source('howard-joel-2','Commentary on Joel 2:1-2, 12-17','https://www.workingpreacher.org/commentaries/revised-common-lectionary/ash-wednesday/commentary-on-joel-21-2-12-17-15','Howard explains the shared gathering, the changed trumpet call, and hope in mercy.','Scholarly study','historical','The commentary interprets the locust disaster and the selected passage. It does not supply a certain date.')
s.update(author='Cameron B.R. Howard',year=2024,publisher='Luther Seminary',chapterCoverage=[2],reviewed=dict(date=DATE,scope='Complete commentary read. Its linked references were not separately reviewed.'));sources.append(s)
s=source('cfm-joel-2026','November 16–22: “I Will Love Them Freely” · Hosea and Joel','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/47?lang=eng','The lesson applies inward devotion and the gift of the Spirit to daily faith.','LDS Come, Follow Me','lds','Its applications through Acts and Joseph Smith’s account remain later Church readings.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[2],reviewed=dict(date=DATE,scope='Introduction and adult study sections read. Linked talks, videos, and Scripture references were not separately reviewed.'));sources.append(s)
p=person('joel','Joel','Prophet who calls the people to gather during a crop disaster','The opening identifies him as Pethuel’s son.','Joel 1–3','His speeches connect shared grief with return, restoration, and judgment against those who trade people.');p.update(placeIds=['jerusalem'],linkNames=[])
old=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
places=[]
for i,s in [('jerusalem','Jerusalem is the place named in promises of escape and God’s continued presence.'),('tyre','Tyre is addressed with charges about stolen treasures and the sale of captives.'),('sidon','Sidon is addressed beside Tyre in the charges about trade in captives.'),('egypt','Egypt receives a warning tied to violence against Judah.'),('edom','Edom receives a warning tied to the shedding of innocent blood.')]:
 q=dict(next(p for p in old['places'] if p['id']==i));q.update(summary=s,sourceIds=['web'],limits='Approximate city or broad region reference. The valley of judgment and visionary water remain unmapped.');places.append(q)
summaries=['Crop loss interrupts food and offerings. The people and animals share the crisis.','An alarm becomes a call to gather. Promises restore food and extend God’s Spirit.','The nations face judgment for trading people. The ending promises water and secure homes.']
questions=['Why does lost grain affect both farmers and priests?','Who must join the gathering, and who receives the promised Spirit?','How do the charges about sold children explain the judgment?']
chapters=[]
for n,v,title,meaning in notes:
 loc=[] if n==1 else ['jerusalem'] if n==2 else ['jerusalem','tyre','sidon','egypt','edom']
 lds='The 2026 lesson studies inward devotion and the Spirit’s guidance. It connects Joel’s promise with Acts and Joseph Smith’s account as later applications. ' if n==2 else ''
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=['joel'],places=loc,sourceIds=['web']+(['howard-joel-2'] if n==2 else []),lds=dict(text=lds+'Study question. '+questions[n-1],sourceIds=['cfm-joel-2026'] if n==2 else []),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='Selected city and region references appear as approximate markers. Visions do not establish traveled routes.' if loc else 'The chapter names no specific place for the crop disaster.',route=[],routeEvidence='No military or visionary route is reconstructed.'))
data=dict(id='joel',bibleCode='JOL',name='Joel',description='Crop disaster · shared prayer · restored life · judgment against traded people',chapterCount=3,scripture=t,chapters=chapters,people=[p],places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All WEB verses read for three original contextual explanations. External commentary and Church teaching retain their stated coverage. One prophet profile is selected.',nextBook='amos'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/joel-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
