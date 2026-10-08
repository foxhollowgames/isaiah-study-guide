"""Build Haggai with its complete text and the same people already identified in Ezra."""
import json,sys
from book_common import ROOT,OUT,scripture,source,finish
DATE='2026-10-07'
t=scripture('haggai','HAG',2)
assert [len(t[str(n)]) for n in range(1,3)]==[15,23]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/haggai.json').read_text(encoding='utf8'))
s=source('web','Haggai · World English Bible','https://ebible.org/engwebp/HAG01.htm','Both chapters appear in the reading text.','Scripture','historical','The guide preserves the stated regnal dates without assigning a date to every future promise.')
s.update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1,2],reviewed=dict(date=DATE,scope='All 38 verses read. Verse counts and character integrity checked.'));sources=[s]
s=source('gafney-haggai','Commentary on Haggai 1:15b-2:9','https://www.workingpreacher.org/commentaries/revised-common-lectionary/ordinary-32-3/commentary-on-haggai-115b-29','Gafney explains disappointment with the rebuilt temple and the promise of God’s continuing presence.','Scholarly study','historical','Her historical reconstruction and wider applications remain attributed interpretation. The guide does not adopt every proposed comparison.')
s.update(author='Wil Gafney',year=2010,publisher='Luther Seminary',chapterCoverage=[1,2],reviewed=dict(date=DATE,scope='Complete commentary body read. Its main explanation concerns 2:1–9 and the preceding regnal date. Wider linked biblical comparisons were not independently researched.'));sources.append(s)
s=source('cfm-haggai-2026','December 7–13: “Holiness unto the Lord” · Haggai 1–2; Zechariah 1–4; 7–14','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/50?lang=eng','The lesson studies priorities, temple building, and encouragement for those doing the work.','LDS Come, Follow Me','lds','The comparison with Doctrine and Covenants 95 is a later Church application.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[1,2],reviewed=dict(date=DATE,scope='Introduction and adult Haggai study section read. Linked talks, videos, and Scripture Helps were not separately reviewed.'));sources.append(s)
old=json.loads((OUT/'ezra.json').read_text(encoding='utf8'));jer=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
specs=[
 ('haggai','Haggai','Prophet who calls the people to rebuild God’s house','He addresses Zerubbabel, Joshua, and the remaining people.','Haggai 1–2','His message joins changed priorities with encouragement when the building seems small.'),
 ('zerubbabel','Zerubbabel','Governor of Judah addressed during the temple rebuilding','Haggai names him as Shealtiel’s son and addresses him with Joshua and the people.','Haggai 1–2','The signet ring, a seal, expresses God’s choice of him amid threatened kingdoms.'),
 ('jeshua-priest','Joshua, son of Jehozadak','High priest addressed with the governor and the people','He is Jehozadak’s son, also called Jeshua son of Jozadak in Ezra.','Haggai 1–2','His shared task keeps worship and public work connected in the rebuilding.'),
 ('darius-ezra','Darius, the Persian king','King whose second regnal year dates Haggai’s messages','He is the Persian ruler also named in Ezra’s temple rebuilding account.','Haggai 1:1, 15; 2:10','His regnal year supplies the opening time reference. He does not speak in this book.')]
people=[]
for id,name,role,relations,passages,meaning in specs:
 p=dict(next(p for p in old['people'] if p['id']==id));p.update(name=name,role=role,relations=relations,passages=passages,meaning=meaning,sourceIds=['web'],placeIds=[] if id=='darius-ezra' else ['jerusalem'],linkNames=['Joshua'] if id=='jeshua-priest' else ['Darius'] if id=='darius-ezra' else [name],verseScope={});people.append(p)
q=dict(next(q for q in old['places'] if q['id']=='jerusalem'));q.update(summary='Jerusalem is the temple rebuilding setting described in Gafney’s commentary.',sourceIds=['gafney-haggai'],limits='Approximate city marker. No temple dimensions, timber path, or future building plan is assigned.')
e=dict(next(q for q in jer['places'] if q['id']=='egypt'));e.update(summary='Egypt appears in God’s reminder of the promise made when the people came out.',sourceIds=['web'],limits='Broad regional reference. The remembered rescue has no reconstructed route in Haggai.')
summaries=['Haggai challenges the delay in temple work. The governor, priest, and people begin rebuilding.','God encourages builders, discusses clean offerings, and promises blessing and a chosen role for Zerubbabel.']
questions=['Why does Haggai compare private houses with God’s ruined house?','Why does the promise of presence matter before greater glory or a new harvest?']
ldsNotes=['The lesson connects considering one’s ways with giving temple work higher priority.','The lesson compares encouragement for the builders with later Church teaching about temples.']
chapters=[]
for n,v,title,meaning in notes:
 loc=['jerusalem']+(['egypt'] if n==2 else [])
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=[p['id'] for p in people],places=loc,sourceIds=['web','gafney-haggai'],lds=dict(text=ldsNotes[n-1]+' Study question. '+questions[n-1],sourceIds=['cfm-haggai-2026']),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='Jerusalem marks the rebuilding setting. Egypt is a remembered regional reference, not a present journey.' if n==2 else 'Jerusalem marks the rebuilding setting. The mountain supplying wood is unnamed and receives no route.',route=[],routeEvidence='The text gives no identified timber journey or present route from Egypt.'))
data=dict(id='haggai',bibleCode='HAG',name='Haggai',description='Private houses · shared work · a smaller temple · presence · promised blessing',chapterCount=2,scripture=t,chapters=chapters,people=people,places=[q,e],sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All 38 WEB verses read for two original contextual explanations. Four selected profiles reuse inspected Ezra artwork. Joshua the high priest remains distinct from the earlier Joshua, and Persian Darius remains distinct from Daniel’s Darius the Mede.',nextBook='zechariah'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/haggai-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
