"""Build Nahum with original close readings and explicitly scoped source access."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,finish
DATE='2026-10-07'
t=scripture('nahum','NAM',3)
assert [len(t[str(n)]) for n in range(1,4)]==[15,13,19]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/nahum.json').read_text(encoding='utf8'))
s=source('web','Nahum · World English Bible','https://ebible.org/engwebp/NAM01.htm','All three chapters appear in the reading text.','Scripture','historical','Poetic battle scenes do not supply verified street routes or a named attacking army.')
s.update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1,2,3],reviewed=dict(date=DATE,scope='All 47 verses read. Verse counts and character integrity checked.'));sources=[s]
s=source('usccb-nahum','The Book of Nahum · Introduction','https://bible.usccb.org/bible/nahum/0','The introduction reads Nineveh’s fall as release for peoples harmed by Assyrian power.','Bible introduction','historical','The introduction proposes a historical setting. This guide does not independently verify its dates or cited royal inscriptions.')
s.update(author='United States Conference of Catholic Bishops',publisher='United States Conference of Catholic Bishops',chapterCoverage=[1,2,3],reviewed=dict(date=DATE,scope='Complete introduction and outline read in the indexed page text. Direct page fetch returned 403. Royal inscriptions mentioned by the introduction were not independently reviewed.'));sources.append(s)
s=source('cfm-nahum-2026','November 30–December 6: “He Delighteth in Mercy” · Micah, Nahum, Habakkuk, Zephaniah','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/49?lang=eng','The lesson connects Nahum’s description of God’s power with refuge and mercy.','LDS Come, Follow Me','lds','The Church application remains separate from the close readings of the city’s destruction.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[1],reviewed=dict(date=DATE,scope='Introduction and adult Nahum study section read. Linked talks, videos, and Scripture Helps were not separately reviewed.'));sources.append(s)
p=person('nahum','Nahum, the Elkoshite','Prophet named in the vision about Nineveh','The opening identifies him as the Elkoshite. The book gives no family history.','Nahum 1–3','His vision describes ruined power from the viewpoint of people harmed by its cruelty.')
p.update(placeIds=['nineveh'],linkNames=['Nahum'],verseScope={})
king=json.loads((OUT/'2-kings.json').read_text(encoding='utf8'));jer=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
q=dict(next(q for q in king['places'] if q['id']=='nineveh'));q.update(summary='Nineveh is the city addressed through battle scenes, lost wealth, and final abandonment.',sourceIds=['web'],limits='Approximate ancient city marker. Streets, river gates, and army paths are not reconstructed.')
e=dict(next(q for q in jer['places'] if q['id']=='egypt'));e.update(summary='Egypt appears among the powers that supported No-Amon before its capture.',sourceIds=['web'],limits='Broad regional reference. No-Amon receives no precise marker in this selected map.')
summaries=['God threatens enemies and promises release. Judah receives a message of peace.','Nineveh’s defenses fail. Flight and plunder replace the security pictured by a lion’s den.','The poem attacks Nineveh’s cruelty and ends with others applauding its collapse.']
questions=['How does the broken yoke explain Judah’s welcome for the message?','What does the lion’s stored prey suggest about the city’s wealth?','Why does the final question connect the listeners’ applause with the city’s cruelty?']
chapters=[]
for n,v,title,meaning in notes:
 loc=['nineveh']+(['egypt'] if n==3 else [])
 text=('The lesson asks readers to consider power and mercy together in God’s character. ' if n==1 else '')+'Study question. '+questions[n-1]
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=['nahum'],places=loc,sourceIds=['web','usccb-nahum'],lds=dict(text=text,sourceIds=['cfm-nahum-2026'] if n==1 else []),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='Markers locate selected geographic references. The poem’s battle scenes do not establish mapped army movements.',route=[],routeEvidence='The vision gives no continuous street or army route suitable for mapping.'))
data=dict(id='nahum',bibleCode='NAM',name='Nahum',description='Threatened power · refuge · ruined defenses · cruelty · abandoned people',chapterCount=3,scripture=t,chapters=chapters,people=[p],places=[q,e],sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All 47 WEB verses read for three original explanations. One selected prophet profile has an inspected interpretive portrait. The introduction’s indexed text was reviewed, with direct access limits recorded.',nextBook='habakkuk'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/nahum-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
