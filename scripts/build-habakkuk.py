"""Build Habakkuk without turning unanswered complaints into a simple moral."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,finish
DATE='2026-10-07'
t=scripture('habakkuk','HAB',3)
assert [len(t[str(n)]) for n in range(1,4)]==[17,20,19]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/habakkuk.json').read_text(encoding='utf8'))
s=source('web','Habakkuk · World English Bible','https://ebible.org/engwebp/HAB01.htm','All three chapters appear in the reading text.','Scripture','historical','The guide assigns no exact date or watchtower location. Poetic divine movements are not traveled routes.')
s.update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1,2,3],reviewed=dict(date=DATE,scope='All 56 verses read. Verse counts and character integrity checked.'));sources=[s]
s=source('wrenn-habakkuk','Commentary on Habakkuk 1:1-4, 2:1-4','https://www.workingpreacher.org/commentaries/revised-common-lectionary/ordinary-31-3/commentary-on-habakkuk-11-4-21-4-12','Wrenn reads the prophet’s anger and waiting as part of the passage’s account of faith.','Scholarly study','historical','Her translation proposals and Christian applications remain attributed interpretations. They do not replace the displayed WEB text.')
s.update(author='Rachel Wrenn',year=2025,publisher='Luther Seminary',chapterCoverage=[1,2],reviewed=dict(date=DATE,scope='Complete commentary and notes read. This 2025 page identifies a previous 2022 publication. Linked Nysse background essay was not separately reviewed.'));sources.append(s)
s=source('cfm-habakkuk-2026','November 30–December 6: “He Delighteth in Mercy” · Micah, Nahum, Habakkuk, Zephaniah','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/49?lang=eng','The lesson studies difficult questions, waiting for answers, and rejoicing during loss.','LDS Come, Follow Me','lds','Church applications remain separate from Habakkuk’s complaints and the prayer’s own images.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[1,2,3],reviewed=dict(date=DATE,scope='Introduction and adult Habakkuk study sections read. Linked talks, videos, and Scripture Helps were not separately reviewed.'));sources.append(s)
p=person('habakkuk','Habakkuk','Prophet who questions violence and waits for an answer','The book names no family members. His complaint and prayer address God.','Habakkuk 1–3','His second complaint challenges an answer that uses violent conquerors to confront violence.')
p.update(placeIds=[],linkNames=['Habakkuk'],verseScope={})
song=json.loads((OUT/'song-of-solomon.json').read_text(encoding='utf8'));ex=json.loads((OUT/'exodus.json').read_text(encoding='utf8'))
q=dict(next(q for q in song['places'] if q['id']=='lebanon'));q.update(summary='Lebanon appears among the places harmed by violence in the taunt against the oppressor.',sourceIds=['web'],limits='Broad regional reference. The poem does not identify particular forests or an army route.')
e=dict(next(q for q in ex['places'] if q['id']=='midian'));e.update(summary='Midian appears among the trembling dwellings in the prayer’s description of God’s arrival.',sourceIds=['web'],limits='Broad regional reference. The prayer’s movement does not establish an ordinary traveled path.')
summaries=['Habakkuk questions violence. God announces conquerors, prompting another question about justice.','God answers the waiting prophet. Injured peoples speak against the oppressor’s wealth and violence.','Habakkuk prays for mercy and chooses joy despite invasion, failed crops, and empty stalls.']
questions=['Why does the announced rise of Chaldeans create a second complaint?','Why do stones and beams testify against their owner?','Which losses remain when the speaker chooses to rejoice?']
ldsNotes=['The lesson invites readers to bring difficult questions to God as Habakkuk does.','The lesson connects the prophet’s watch with waiting for answers from God.','The lesson studies rejoicing in God when material sources of security fail.']
chapters=[]
for n,v,title,meaning in notes:
 loc=[] if n==1 else ['lebanon'] if n==2 else ['midian']
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=['habakkuk'],places=loc,sourceIds=['web']+(['wrenn-habakkuk'] if n<3 else []),lds=dict(text=ldsNotes[n-1]+' Study question. '+questions[n-1],sourceIds=['cfm-habakkuk-2026']),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='The marker locates a broad regional reference. No watchtower or poetic divine route is assigned.' if loc else 'The complaint names no city where the prophet stands. The conquerors receive no reconstructed army route.',route=[],routeEvidence='The book supplies no continuous route with securely identified stops.'))
data=dict(id='habakkuk',bibleCode='HAB',name='Habakkuk',description='Violence · a disputed answer · waiting · injured peoples · joy amid loss',chapterCount=3,scripture=t,chapters=chapters,people=[p],places=[q,e],sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All 56 WEB verses read for three original contextual explanations. One selected prophet profile has an inspected interpretive portrait. Wrenn’s commentary and official lesson retain specific coverage and access limits.',nextBook='zephaniah'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/habakkuk-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
