"""Build Obadiah while keeping original explanation and later Church application distinct."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,finish
DATE='2026-10-07'
t=scripture('obadiah','OBA',1)
assert len(t['1'])==21
assert not any('\ufffd' in v['text'] for v in t['1'])
notes=json.loads((ROOT/'scripts/book-context-complete/obadiah.json').read_text(encoding='utf8'))
sources=[source('web','Obadiah · World English Bible','https://ebible.org/engwebp/OBA01.htm','The full vision appears in the reading text.','Scripture','historical','The book supplies no detailed biography of Obadiah. He is not identified with Ahab’s steward.')]
sources[0].update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1],reviewed=dict(date=DATE,scope='All 21 verses read, including the surrounding charges and closing promises.'))
s=source('usccb-obadiah-intro','The Book of Obadiah · Introduction','https://bible.usccb.org/bible/obadiah/0','The editors connect the vision with Edom’s exploitation of Judah and its promised reversal.','Bible introduction','historical','The introduction proposes a historical setting. The guide assigns no certain date to this vision.')
s.update(author='United States Conference of Catholic Bishops Bible editors',publisher='United States Conference of Catholic Bishops',chapterCoverage=[1],reviewed=dict(date=DATE,scope='Complete book introduction and outline read. Linked book text and footnotes were not separately reviewed.'));sources.append(s)
s=source('cfm-obadiah-2026','November 23–29: “Seek the Lord, and Ye Shall Live” · Amos, Obadiah, Jonah','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/48?lang=eng','The lesson applies Obadiah’s final verse to temple service for deceased people.','LDS Come, Follow Me','lds','This temple application is later Church teaching, distinct from the vision’s rule over Edom.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[1],reviewed=dict(date=DATE,scope='Introduction and adult study sections read. The cited Hinckley address and linked hymn were not separately reviewed.'));sources.append(s)
p=person('obadiah','Obadiah','Prophet named in the vision against Edom','The book gives no parent, household, or court position. He is distinct from Ahab’s steward.','Obadiah 1:1–21','His vision explains judgment through betrayed kinship, seized wealth, and captured people escaping violence.');p.update(placeIds=[],linkNames=[])
p['meaning']='His vision connects judgment with betrayal, seized wealth, and attacks on people escaping violence.'
old=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
places=[]
for i,s in [('edom','Edom is the people and mountain region addressed in the vision.'),('jerusalem','Jerusalem appears as the city whose defeat Edom exploited.'),('samaria','Samaria appears among the fields named in the closing land promise.')]:
 q=dict(next(p for p in old['places'] if p['id']==i));q.update(summary=s,sourceIds=['web'],limits='Approximate city or region reference. The marker does not identify a particular rock dwelling or crossroads.');places.append(q)
n,v,title,meaning=notes[0]
c=dict(chapter=1,title=title,summary='Edom faces charges for exploiting a brother’s defeat. The final promise places rule with God.',meaning=meaning,people=['obadiah'],places=['edom','jerusalem','samaria'],sourceIds=['web','usccb-obadiah-intro'],lds=dict(text='The 2026 lesson applies the final verse to temple service for deceased people. This later Church reading differs from the vision’s judgment over Edom. Study question. Why does intercepting people who escape make Edom part of the violence?',sourceIds=['cfm-obadiah-2026']),eventOrder=1,dateLabel='Vision order',historicalNote=meaning,mapNote='Markers locate selected geographic references. The vision does not establish a traveled route.',route=[],routeEvidence='No journey is reconstructed from the announced land promises.')
data=dict(id='obadiah',bibleCode='OBA',name='Obadiah',description='Betrayed brotherhood · fleeing captives · repayment · restored belonging',chapterCount=1,scripture=t,chapters=[c],people=[p],places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All 21 WEB verses read for an original contextual explanation. Editorial introduction and later Church teaching remain distinct.',nextBook='jonah'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/obadiah-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
