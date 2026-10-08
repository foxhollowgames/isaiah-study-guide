"""Build Matthew from reviewed complete Scripture and persistent close readings."""
import json,sys
from book_common import ROOT,OUT,scripture,source,person,place,finish
DATE='2026-10-07'
t=scripture('matthew','MAT',28)
assert [len(t[str(n)]) for n in range(1,29)]==[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]
assert not any('\ufffd' in v['text'] for vv in t.values() for v in vv)
notes=json.loads((ROOT/'scripts/book-context-complete/matthew.json').read_text(encoding='utf8'))
sources=[]
s=source('web','Matthew · World English Bible','https://ebible.org/engwebp/MAT01.htm','All 28 chapters appear in the reading text.','Scripture','historical','The Gospel account supports close reading. It does not independently establish every event, date, or traditional identity.')
s.update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=list(range(1,29)),reviewed=dict(date=DATE,scope='All 1,071 verses read, including the surrounding context of every selected verse. Verse counts and character integrity checked.'));sources.append(s)
s=source('minor-matthew','Commentary on Matthew 1:1-17','https://www.workingpreacher.org/commentaries/narrative-lectionary/genealogy-of-jesus/commentary-on-matthew-11-17-2','Minor reads the arranged family list as a claim about belonging, royal identity, and inclusion.','Scholarly study','historical','This is Minor’s interpretation. Proposed ancient social expectations and broad claims about scholars were not independently verified.')
s.update(author='Mitzi Minor',publisher='Luther Seminary',year=2023,chapterCoverage=[1],reviewed=dict(date=DATE,scope='Complete commentary body read. Linked commentaries and podcast were not reviewed. The guide does not adopt every characterization of the women or independently verify historical generalizations.'));sources.append(s)
CFM='https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-sunday-school-new-testament-2023/'
lessons=[(2,[1],'January 2–8 · Matthew 1; Luke 1','The lesson studies Joseph’s response and faith in Jesus as the Son of God.'),(8,[5],'February 13–19 · Matthew 5; Luke 6','The lesson studies blessed lives, light, and progress toward completeness through Christ.'),(17,[18],'April 17–23 · Matthew 18; Luke 10','The lesson studies the unmerciful servant and the need to forgive others.'),(27,[28],'June 26–July 2 · Matthew 28; Mark 16; Luke 24; John 20–21','The lesson teaches resurrection through the Gospel accounts.')]
for number,coverage,title,summary in lessons:
 s=source('cfm-nt-2023-'+str(number),title,CFM+f'{number:02}?lang=eng',summary,'LDS Come, Follow Me','lds','This selected 2023 Sunday School lesson is Church teaching. Other chapters and linked resources receive no automatic coverage.')
 s.update(author='The Church of Jesus Christ of Latter-day Saints',publisher='The Church of Jesus Christ of Latter-day Saints',year=2023,chapterCoverage=coverage,reviewed=dict(date=DATE,scope='Complete lesson body and additional resources read. Linked talks, videos, dictionary articles, and other scripture editions were not separately reviewed. Only the specified Matthew chapter receives this lesson.'));sources.append(s)
s=source('net-nt-map','Israel During the Time of Jesus · NET Study Map NT1','https://classic.net.bible.org/map.php?map=nt1','The map index supplies selected city and regional references.','Geographic reference','historical','Geographic reference only. It does not verify events, ancient roads, houses, tombs, or the unnamed mountains.')
s.update(author='NET Bible and ROHR Productions',publisher='bible.org',reviewed=dict(date=DATE,scope='Map NT1 place index reviewed. Capernaum, Nazareth, Caesarea Philippi, and Bethany opening geographic descriptions and coordinate lines checked in the linked dictionary pages. Older encyclopedia material is not used for archaeology, word origins, or reconstructed buildings.'),license='Linked reference. No map image or dictionary prose reproduced.');sources.append(s)
atlas=dict(next(s for s in json.loads((OUT/'joshua.json').read_text(encoding='utf8'))['sources'] if s['id']=='atlas-canaan'))
atlas['limits']='Existing selected reference coordinates only. The earlier review record remains unchanged. This source does not verify Gospel events or exact routes.'
sources.append(atlas)
people=[]
records=[
 ('jesus','Jesus of Nazareth','Teacher presented as the Christ and Son of God','Mary is his mother. Joseph names him after receiving an angel’s instruction.','Matthew 1–28','His teaching, healing, death, and resurrection shape the meaning of following him.',['Jesus']),
 ('mary-mother','Mary, mother of Jesus','Mother named in the birth and hometown accounts','Joseph is her husband. Matthew names several brothers and also mentions sisters of Jesus.','Matthew 1–2; 12:46; 13:55','The birth account names her as the person from whom Jesus is born.',['Mary']),
 ('joseph-mary','Joseph, Mary’s husband','Man who names Jesus and protects the child','Matthew names Jacob as his father. He acts on warnings given in dreams.','Matthew 1–2','His decisions connect the birth account with protection from Herod’s violent plan.',['Joseph']),
 ('john-baptizer','John the Baptizer','Preacher who baptizes Jesus and later dies in prison','His disciples bring questions to Jesus. Herod imprisons him after he challenges the ruler’s marriage.','Matthew 3; 4:12; 9:14; 11; 14','His call for changed conduct prepares the kingdom message. His death exposes the ruler’s use of power.',['John the Baptizer']),
 ('peter','Simon Peter','Fisherman who follows Jesus and speaks for the disciples','Andrew is his brother. Matthew also mentions his wife’s mother.','Matthew 4:18–20; 8:14; 14:28–31; 16; 17; 18:21; 26','His confession, protest, fear, and denial show understanding that remains incomplete under pressure.',['Peter','Simon Peter']),
 ('mary-magdalene','Mary Magdalene','Witness at the cross, burial, and opened tomb','Matthew distinguishes her from Jesus’ mother and from the other Mary.','Matthew 27:56–61; 28:1–10','She remains near the burial and helps carry the resurrection message to the disciples.',['Mary Magdalene'])]
for pid,name,role,relations,passages,meaning,links in records:
 p=person(pid,name,role,relations,passages,meaning);p.update(placeIds=[],linkNames=links,verseScope={});people.append(p)
# Chapter association prevents ambiguous names from linking to a different person.
profileChapters={'jesus':list(range(1,29)),'mary-mother':[1,2,12,13],'joseph-mary':[1,2],'john-baptizer':[3,4,9,11,14,17,21],'peter':[4,8,10,14,15,16,17,18,19,26],'mary-magdalene':[27,28]}
people[1]['verseScope']={'1':[16,18,20],'2':[11],'12':[46,47,48,49],'13':[55]}
people[2]['verseScope']={'1':[16,18,19,20,24],'2':[13,14,19,21]}
people[3]['verseScope']={str(n):[v['verse'] for v in t[str(n)] if 'John' in v['text']] for n in profileChapters['john-baptizer']}
people[3]['verseScope']['4']=[12];people[3]['verseScope']['10']=[]
people[4]['verseScope']={str(n):[v['verse'] for v in t[str(n)] if 'Peter' in v['text']] for n in profileChapters['peter']}
people[5]['verseScope']={'27':[56,61],'28':[1]}
places=[]
for pid,book,summary in [
 ('babylon','jeremiah','The opening family list recalls the exile to Babylon.'),('bethlehem','micah','The birth account names Bethlehem and the children harmed by Herod.'),('jerusalem','jeremiah','Jerusalem receives the visitors and later becomes the setting of Jesus’ final conflict.'),('egypt','haggai','Egypt shelters the child and his family after Joseph receives a warning.'),('jordan','joshua','John baptizes in the Jordan. The exact site receives no fixed location.'),('galilee','1-kings','Galilee holds much of the teaching and the final meeting with the disciples.'),('tyre','zechariah','Tyre appears in comparisons and the region where the Canaanite woman approaches.'),('sidon','zechariah','Sidon appears with Tyre in comparisons and the woman’s regional setting.'),('jericho','2-samuel','Jesus stops for two blind men while leaving Jericho.'),('olives','zechariah','The Mount of Olives holds the teaching about coming events and the departure after supper.')]:
 q=dict(next(q for q in json.loads((OUT/f'{book}.json').read_text(encoding='utf8'))['places'] if q['id']==pid))
 q.update(summary=summary,sourceIds=['web','atlas-canaan'],limits='Approximate reference marker. It identifies no exact house, road, execution site, or ancient border.',verseScope={});places.append(q)
places.extend([
 place('nazareth','Nazareth',32.7,35.3,'Nazareth becomes the family’s settlement after the return from Egypt.','Approximate town reference from the NET coordinate line. No house or workshop is identified.',['web','net-nt-map']),
 place('capernaum','Capernaum',32+52/60,35+34/60,'Jesus settles in Capernaum. Healing and the coin question connect with this town.','Approximate town reference from the NET coordinate line. No specific synagogue or house is reconstructed.',['web','net-nt-map']),
 place('caesarea-philippi','Caesarea Philippi · vicinity',33+14/60,35+41/60,'Jesus asks about his identity in the parts of Caesarea Philippi.','The marker locates the town as a regional reference. It does not locate the conversation or mountain.',['web','net-nt-map']),
 place('bethany','Bethany near Jerusalem',31+46/60,35+15/60,'Jesus stays at Bethany after the temple conflict. The unnamed woman anoints him here.','Approximate reference from the NET coordinate line. This is not Bethany beyond the Jordan or an identified house.',['web','net-nt-map'])])
summaries=[
 'The family list leads to Mary and Joseph. A dream directs Joseph to name Jesus.',
 'Visitors seek the child. Herod orders killings, and the family escapes to Egypt.',
 'John calls for repentance and baptizes Jesus. A heavenly voice names the beloved Son.',
 'Jesus rejects the tempter’s offers. He gathers followers and begins teaching and healing.',
 'Jesus teaches blessings and deeper obedience through relationships, truthful speech, and love for enemies.',
 'Jesus teaches hidden giving, prayer, fasting, and undivided service to God.',
 'Jesus teaches careful judgment and active obedience. Two builders explain the difference.',
 'Jesus heals and calms a storm. Townspeople later ask him to leave.',
 'Healing, forgiveness, and shared meals provoke disputes. Jesus sees the crowd’s need.',
 'Jesus sends the twelve to Israel’s lost sheep and warns about rejection.',
 'John asks from prison. Jesus answers through his works and invites burdened people to rest.',
 'Sabbath healings and questions about demons deepen conflict. Jesus describes those belonging to his family.',
 'Stories about seed, fields, treasure, and fishing describe responses to the kingdom.',
 'Herod kills John. Jesus feeds a crowd and reaches the disciples on the sea.',
 'Jesus disputes inherited practices, heals a Canaanite woman’s daughter, and feeds another crowd.',
 'Peter identifies Jesus as the Christ but protests the announced suffering.',
 'Three disciples see Jesus changed. Healing, another death warning, and a coin question follow.',
 'Jesus teaches care for vulnerable people, correction, and forgiveness through a debtor story.',
 'Questions about marriage and possessions meet demands that the listeners find difficult.',
 'Equal wages provoke anger. Jesus answers a rank dispute with service and helps blind men.',
 'Jesus enters Jerusalem, interrupts temple trade, and challenges leaders through stories.',
 'A wedding story and disputes about taxes, resurrection, and the law follow.',
 'Jesus condemns burdens, sought honors, and neglected justice. He grieves over Jerusalem.',
 'Jesus warns about destruction, deception, suffering, and readiness during an uncertain wait.',
 'Waiting stories lead to judgment concerning food, clothing, welcome, and visits.',
 'An anointing and supper lead to prayer, arrest, abandoned promises, and Peter’s denial.',
 'Pilate hands Jesus over for crucifixion. Women remain, and Joseph buries the body.',
 'The women report the risen Jesus. The remaining disciples receive an expanded task.'
]
questions=[
 'Why does the family list change its wording when it reaches Joseph and Mary?',
 'Why does Matthew keep the other children’s deaths beside the child’s escape?',
 'Why does John demand visible fruit rather than claims about ancestry?',
 'How does the second temptation show that quoting Scripture alone cannot settle the dispute?',
 'Why must repairing the relationship come before completing the offering?',
 'How do public admiration and stored treasure place competing claims on the heart?',
 'What separates the two builders when both hear the same teaching?',
 'Why does the officer describe his own authority when asking Jesus for help?',
 'How does the physician comparison answer criticism of the shared meal?',
 'What makes receiving a traveling disciple part of receiving Jesus?',
 'Why does Jesus answer John with acts of healing and good news?',
 'How does the hungry disciples’ situation shape the Sabbath argument?',
 'Why does the owner stop servants from removing the weeds immediately?',
 'What does each meal show about the person who directs it?',
 'How does the woman’s reply use the same image that excludes her?',
 'Why can Peter confess Jesus’ identity and still oppose his announced path?',
 'How does the suffering discussed afterward change the meaning of the mountain scene?',
 'Why does the king ask the forgiven debtor about mercy toward his fellow servant?',
 'What does the young man’s sorrow reveal about the demand Jesus makes?',
 'Why do the earlier workers resent receiving exactly the wage they agreed upon?',
 'Whom does the chapter identify as the immediate hearers of the vineyard accusation?',
 'How does the answer about love hold the law’s different demands together?',
 'Why does the spice tithe example place small obedience beside neglected justice?',
 'What distinguishes the faithful servant’s conduct during the delay?',
 'Why are both groups surprised by the king’s explanation of their treatment of him?',
 'How does Jesus’ rejection of the sword differ from the arresting crowd’s use of force?',
 'How do Pilate’s actions differ from his public claim of innocence?',
 'How does the closing promise connect with the opening name Immanuel?'
]
ldsTeach={1:'The 2023 lesson studies Joseph’s response and faith in Jesus, the Son of God.',5:'The selected 2023 lesson studies blessed lives and reads completeness through Christ.',18:'The selected 2023 lesson connects receiving forgiveness with forgiving others.',28:'The selected 2023 lesson teaches resurrection through the Gospel accounts.'}
ldsSources={c:['cfm-nt-2023-'+str(number)] for number,coverage,_,_ in lessons for c in coverage}
locs={1:['babylon'],2:['jerusalem','bethlehem','egypt','nazareth','galilee'],3:['jordan','jerusalem','galilee'],4:['jerusalem','nazareth','capernaum','galilee','jordan'],5:['jerusalem'],8:['capernaum'],11:['capernaum','tyre','sidon'],15:['jerusalem','tyre','sidon'],16:['caesarea-philippi','jerusalem'],17:['galilee','capernaum'],19:['galilee','jordan'],20:['jerusalem','jericho'],21:['jerusalem','olives','bethany','nazareth','galilee'],23:['jerusalem'],24:['olives'],26:['bethany','olives','galilee','nazareth'],27:['jerusalem','galilee'],28:['jerusalem','galilee']}
chapters=[]
for n,v,title,meaning in notes:
 loc=locs.get(n,[]);refs=['web']+(['minor-matthew'] if n==1 else [])
 chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=[pid for pid,cc in profileChapters.items() if n in cc],places=loc,sourceIds=refs,lds=dict(text=ldsTeach.get(n,'')+(' ' if n in ldsTeach else '')+'Study question. '+questions[n-1],sourceIds=ldsSources.get(n,[])),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote='Selected markers distinguish named settings from quoted or remembered places. Exact roads, houses, tombs, and unnamed mountains remain unassigned.' if loc else 'This selected chapter map has no place markers. The guide does not invent the location of unnamed houses or teaching scenes.',route=[],routeEvidence='The selected map uses reference points. It does not reconstruct exact travel or combine movements from other Gospel accounts.'))
data=dict(id='matthew',bibleCode='MAT',name='Matthew',description='Jesus · teaching · healing · disputed authority · cross · resurrection',chapterCount=28,scripture=t,chapters=chapters,people=people,places=places,sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All 1,071 WEB verses read for 28 original contextual explanations and exact anchors. Six selected profiles are not an exhaustive person inventory. Four selected 2023 Church lessons retain chapter-specific coverage. No original language alignment, exact dates, routes, houses, or archaeological event verification is claimed.',nextBook='mark'))
if '--ready' in sys.argv:finish(data)
else:(ROOT/'review/matthew-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
