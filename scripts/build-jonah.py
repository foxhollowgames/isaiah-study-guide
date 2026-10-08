"""Build Jonah using complete Scripture, scoped commentary, and inspected reused artwork."""
import json,sys
from book_common import ROOT,OUT,scripture,source,finish
DATE='2026-10-07'
t=scripture('jonah','JON',4)
assert [len(t[str(n)]) for n in range(1,5)]==[17,10,10,11]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/jonah.json').read_text(encoding='utf8'))
sources=[source('web','Jonah · World English Bible','https://ebible.org/engwebp/JON01.htm','All four chapters appear in the reading text.','Scripture','historical','The book does not identify the king of Nineveh. The guide assigns no certain composition date or sea route.')]
sources[0].update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1,2,3,4],reviewed=dict(date=DATE,scope='All 48 verses read. Verse counts and character integrity checked.'))
s=source('wolfe-jonah','Commentary on Jonah 3:10—4:11','https://www.workingpreacher.org/commentaries/revised-common-lectionary/ordinary-25/commentary-on-jonah-310-411-4','Wolfe explains Jonah’s anger at mercy and the book’s unexpected reversals.','Scholarly study','historical','Historical examples and proposed links with later disputes remain the author’s interpretation. Linked essays were not separately checked.')
s.update(author='Lisa Wolfe',year=2023,publisher='Luther Seminary',chapterCoverage=[3,4],reviewed=dict(date=DATE,scope='Complete commentary body read. Linked Bible Odyssey essays and podcast were not reviewed.'));sources.append(s)
s=source('cfm-jonah-2026','November 23–29: “Seek the Lord, and Ye Shall Live” · Amos, Obadiah, Jonah','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/48?lang=eng','The lesson studies mercy, renewed opportunity, and sharing the gospel with others.','LDS Come, Follow Me','lds','Church applications remain separate from the original explanations of Jonah’s words and actions.')
s.update(author='The Church of Jesus Christ of Latter-day Saints',year=2026,publisher='The Church of Jesus Christ of Latter-day Saints',chapterCoverage=[1,2,3,4],reviewed=dict(date=DATE,scope='Introduction and adult study sections read. Linked talks, videos, and Scripture Helps were not separately reviewed.'));sources.append(s)
old=json.loads((OUT/'2-kings.json').read_text(encoding='utf8'))
p=dict(next(p for p in old['people'] if p['id']=='jonah'))
p.update(name='Jonah, son of Amittai',role='Prophet who flees a command to address Nineveh',relations='He is Amittai’s son. Sailors try to save him before he speaks to Nineveh.',passages='Jonah 1–4',meaning='He accepts rescue for himself but disputes God’s mercy toward the city.',sourceIds=['web'],placeIds=['joppa','nineveh'],linkNames=['Jonah'],verseScope={})
places=[]
q=dict(next(p for p in old['places'] if p['id']=='nineveh'));q.update(summary='Nineveh is the city Jonah must address and the object of God’s final question.',sourceIds=['web'],limits='Approximate ancient city marker. No king, palace room, or walking path is identified.');places.append(q)
chron=json.loads((OUT/'2-chronicles.json').read_text(encoding='utf8'))
q=dict(next(p for p in chron['places'] if p['id']=='joppa'));q.update(summary='Joppa is the port where Jonah finds the ship bound for Tarshish.',sourceIds=['web'],limits='Approximate port marker. Tarshish and the ship’s course remain uncertain and unmapped.');places.append(q)
summaries=['Jonah flees. Sailors try to save him before throwing him into the sea.','Jonah thanks God for rescue while praying from inside the fish.','Nineveh changes its conduct after Jonah’s warning. God withdraws the announced disaster.','Jonah resents mercy for Nineveh. God’s final question compares a plant with the city.']
questions=['How do the sailors’ actions contrast with Jonah’s flight?','How does Jonah’s promise compare with the sailors’ earlier worship?','Why does God’s response focus on changed conduct?','Whose lives does God include in the final question?']
ldsNotes=['The 2026 lesson reads the rescue as another opportunity for Jonah to respond.','The lesson invites readers to notice God’s mercy throughout Jonah’s experience.','The lesson connects Nineveh’s change with sharing the gospel despite uncertain expectations.','The lesson asks readers to consider mercy toward others when Jonah resents their rescue.']
chapters=[]
for n,v,title,meaning in notes:
 loc=['joppa','nineveh'] if n==1 else [] if n==2 else ['nineveh']
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=['jonah'],places=loc,sourceIds=['web']+(['wolfe-jonah'] if n in [3,4] else []),lds=dict(text=ldsNotes[n-1]+' Study question. '+questions[n-1],sourceIds=['cfm-jonah-2026']),eventOrder=n,dateLabel='Story order',historicalNote=meaning,mapNote='Markers locate the port and city named in the story. The sea journey is not reconstructed.' if loc else 'The fish’s location and the point of return to land are not given.',route=[],routeEvidence='Uncertain Tarshish and unnamed sea locations prevent a reliable continuous route.'))
data=dict(id='jonah',bibleCode='JON',name='Jonah',description='Flight · rescue · changed conduct · disputed mercy · an unanswered question',chapterCount=4,scripture=t,chapters=chapters,people=[p],places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All WEB verses read for four original explanations. One selected prophet profile reuses the inspected portrait of Jonah, son of Amittai. Historical assumptions remain scoped source interpretations.',nextBook='micah'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/jonah-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
