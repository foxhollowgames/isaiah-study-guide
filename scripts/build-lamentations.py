"""Build Lamentations from reviewed publisher text and scoped commentary."""
import json, sys
from book_common import ROOT, OUT, scripture, source, person, finish

DATE='2026-10-07'
def reviewed(i,title,url,summary,author,year,coverage,scope,limits,category='Scholarly study',perspective='historical'):
    s=source(i,title,url,summary,category,perspective,limits)
    s.update(author=author,year=year,publisher='Luther Seminary' if perspective=='historical' else 'The Church of Jesus Christ of Latter-day Saints',chapterCoverage=coverage,reviewed=dict(date=DATE,scope=scope))
    return s
sources=[source('web','Lamentations · World English Bible','https://ebible.org/engwebp/LAM01.htm','All five poems appear in the reading text.','Scripture','historical','The poems do not name their author. Individual voices are not automatically identified with Jeremiah.')]
sources[0].update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=[1,2,3,4,5],reviewed=dict(date=DATE,scope='All 154 verses and their surrounding passages read from cached publisher HTML.'))
sources.append(reviewed('bouzard-lamentations','Commentary on Lamentations 1:1-6','https://www.workingpreacher.org/commentaries/revised-common-lectionary/ordinary-27-3/commentary-on-lamentations-11-6-3','Bouzard explains the city’s grief and its continued appeal to God.','Walter C. Bouzard',2013,[1],'Complete commentary and footnotes read. Opening discussion treats poetic form and Jerusalem’s voice.','The commentary offers interpretation. Its wider historical and modern examples were not independently checked.'))
sources.append(reviewed('holbert-lamentations','Commentary on Lamentations 3:22-33','https://www.workingpreacher.org/commentaries/revised-common-lectionary/ordinary-13-2/commentary-on-lamentations-322-33-2','Holbert reads remembered mercy beside the speaker’s descriptions of siege and pain.','John C. Holbert',2009,[3],'Complete commentary read, including its treatment of 3:1–33.','Language proposals remain Holbert’s interpretation. This guide preserves the WEB wording and adds no unverified Hebrew forms.'))
sources.append(reviewed('lds-lamentations-2026','Lamentations 1; 3: “His Compassions Fail Not”','https://www.churchofjesuschrist.org/study/manual/old-testament-seminary-manual-2026/43-jeremiah-lamentations/433-lamentations?lang=eng','The lesson teaches the Savior’s compassion for people who repent.','The Church of Jesus Christ of Latter-day Saints',2026,[1,3],'Lesson introduction, Sorrow for sin, and The Savior’s compassion sections read. Linked videos and later resource sections were not reviewed.','The lesson attributes the poems to Jeremiah. The biblical poems themselves do not name him. Its teaching is kept in the LDS perspective.','LDS Seminary','lds'))
text=scripture('lamentations','LAM',5)
assert [len(text[str(n)]) for n in range(1,6)]==[22,22,66,22,22]
assert not any('\ufffd' in v['text'] for verses in text.values() for v in verses)
notes=json.loads((ROOT/'scripts/book-context-complete/lamentations.json').read_text(encoding='utf8'))
p=person('grieving-speaker','The grieving man','Unnamed speaker who describes affliction','His voice joins a shared prayer, then speaks again about his enemies.','Lamentations 3:1–66','He recalls mercy while continuing to describe pain and ask for justice.')
p.update(linkNames=[],placeIds=['jerusalem'])
old=json.loads((OUT/'jeremiah.json').read_text(encoding='utf8'))
place=dict(next(p for p in old['places'] if p['id']=='jerusalem'))
place.update(summary='Jerusalem is the ruined city whose people speak through these poems.',limits='The marker locates the city. It does not locate a speaker or reconstruct a siege route.',sourceIds=['web'])
chapters=[]
summaries=['Jerusalem mourns lost people and support. The city asks travelers and God to see her suffering.','The speaker describes ruined defenses and worship. Hungry children prompt a call to pray through the night.','A grieving man recalls mercy. His words move between hope, shared confession, and appeals for justice.','Hunger destroys familiar social differences. The poem names failed priests, prophets, and royal protection.','The people describe lost homes, forced work, and violence. They ask God to restore them.']
questions=['Why does Jerusalem ask travelers to look at her sorrow?','Why does the call to pray focus on hungry children?','How does renewed complaint follow the speaker’s remembered mercy?','How does the poem connect public leaders with innocent blood?','What remains unresolved after the people ask for renewal?']
for n,verse,title,meaning in notes:
    lds='The 2026 Seminary lesson reads this grief alongside the Savior’s compassion. ' if n==1 else 'The 2026 Seminary lesson connects remembered mercy with the Savior’s willingness to forgive. ' if n==3 else ''
    chapters.append(dict(chapter=n,title=title,summary=summaries[n-1],meaning=meaning,people=['grieving-speaker'] if n==3 else [],places=['jerusalem'],sourceIds=['web']+(['bouzard-lamentations'] if n==1 else ['holbert-lamentations'] if n==3 else []),lds=dict(text=lds+'Study question. '+questions[n-1],sourceIds=['lds-lamentations-2026'] if n in [1,3] else []),eventOrder=n,dateLabel='Poem order',historicalNote=meaning,mapNote='The map marks Jerusalem. The poems do not give a continuous travel route.',route=[],routeEvidence='No journey is reconstructed.'))
data=dict(id='lamentations',bibleCode='LAM',name='Lamentations',description='Ruined Jerusalem · grief · mercy · unanswered prayer',chapterCount=5,scripture=text,chapters=chapters,people=[p],places=[place],sources=sources,review=dict(date=DATE,contextReviewDate=DATE,copyReviewDate=DATE,scope='All five WEB poems read. Original close readings remain distinct from scoped external commentary and Church teaching.',nextBook='ezekiel'))
if '--ready' in sys.argv: finish(data)
else:
    (ROOT/'review/lamentations-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('Saved Lamentations draft: 5 chapters, 154 verses, one unnamed speaker profile.')
