"""Reviewed source additions. These survive rebuilding the native Isaiah adaptations."""
import json
from pathlib import Path
from urllib.parse import quote
ROOT=Path(__file__).resolve().parent.parent
DATE='2026-10-05'
CFM='https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/'
def span(a,z):return list(range(a,z+1))
LESSONS=[
 ('genesis',3,span(1,2),'Genesis 1–2; Moses 2–3; Abraham 4–5','The lesson connects creation with human worth, care for creation, marriage, and the Sabbath.'),
 ('genesis',4,span(3,4),'Genesis 3–4; Moses 4–5','The lesson reads the Fall through Restoration scripture. It connects agency, opposition, redemption, and willing sacrifice.'),
 ('genesis',5,[5],'Genesis 5; Moses 6','The lesson uses Moses 6 to study Enoch and the teaching of children. Genesis 5 gives a shorter account.'),
 ('genesis',7,span(6,11),'Genesis 6–11; Moses 8','The lesson connects Noah and Babel with trust in God and resistance to pride and violence.'),
 ('genesis',8,span(12,17),'Genesis 12–17; Abraham 1–2','The lesson studies Abraham’s covenant and his desire for righteousness. It adds the account in Abraham 1–2.'),
 ('genesis',9,span(18,23),'Genesis 18–23','The lesson studies Abraham and Sarah’s trust during family trials. It connects Isaac’s sacrifice with Jesus Christ.'),
 ('genesis',10,span(24,33),'Genesis 24–33','The lesson follows Jacob’s covenant journey. It asks how faith and sacred commitments can shape family life.'),
 ('genesis',11,span(37,41),'Genesis 37–41','The lesson uses Joseph’s trials to study faithfulness despite suffering. It emphasizes the Lord’s presence during hardship.'),
 ('genesis',12,span(42,50),'Genesis 42–50','The lesson studies Joseph’s forgiveness and his care for his family. It connects these actions with God’s purposes.'),
 ('exodus',13,span(1,6),'Exodus 1–6','The lesson studies Moses’s call and God’s covenant promises. It connects deliverance with trust during suffering.'),
 ('exodus',15,span(7,13),'Exodus 7–13','The lesson studies the plagues and Passover. It interprets Passover symbols through the sacrifice of Jesus Christ.'),
 ('exodus',16,span(14,18),'Exodus 14–18','The lesson connects deliverance, manna, and water with Christ. It also studies the support that Aaron, Hur, and Jethro give Moses.'),
 ('exodus',17,[19,20,24,31,32,33,34],'Exodus 19–20; 24; 31–34','The lesson studies covenant commitments, commandments, repentance, and the Sabbath. It connects the golden calf account with mercy and forgiveness.'),
 ('exodus',18,span(35,40),'Exodus 35–40; Leviticus 1; 4; 16; 19','The lesson connects tabernacle objects, willing gifts, and sacred ordinances with holiness and Jesus Christ.'),
 ('leviticus',18,[1,4,16,19],'Exodus 35–40; Leviticus 1; 4; 16; 19','The lesson interprets sacrifice through Christ’s Atonement. It connects holiness with worship and conduct toward other people.'),
]
WIKI={
 'genesis':([1,12,50],'Genesis moves from creation and early humanity to the families of Abraham, Isaac, Jacob, and Joseph. This overview helps explain the book’s structure.'),
 'exodus':([1,19,40],'Exodus connects escape from slavery with a covenant at Sinai and the construction of the tabernacle. This overview supplies book structure.'),
 'leviticus':([1,11,19],'Leviticus concerns offerings, priestly service, ritual purity, and conduct within the community. This overview supplies book structure.'),
}
SCHOLARLY={
 'genesis':('scholar-baden','The Book of Exodus: A Biography','Joel S. Baden',2019,'https://assets.press.princeton.edu/catalogs/S19Seasonal.pdf','The publisher describes Baden’s study of the Exodus story, its written forms, and its later use.','Publisher catalogue entry reviewed. The full book was not read.'),
 'exodus':('scholar-meyers','Exodus · Preface','Carol Meyers','2005 print; 2012 online','https://doi.org/10.1017/CBO9780511806377.001','Meyers connects the escape narrative, Sinai covenant, and community laws with Israel’s identity.','The publicly displayed preface summary and publication details were reviewed. The full commentary was not read.'),
 'leviticus':('scholar-milgrom','Leviticus 1–16','Jacob Milgrom','1991 original; linked publisher edition 1998','https://yalebooks.yale.edu/book/9780300139402/leviticus-1-16/','The publisher describes Milgrom’s study of sanctuary worship, sacrifice, and purity.','Publisher description and edition record reviewed. The full commentary was not read.'),
}
INTERVIEW='https://www.mormonstories.org/10-things-bible-dan-mcclellan/'
DM={
 'genesis':([1,2,3,6,7,8,9,11,49],'McClellan discusses different creation accounts and older flood traditions. He states uncertainty about Babel’s possible sources. He also describes Genesis 49 as poetry preserved within a larger narrative.',[(1409,'23:29 · Poetry and Genesis 49'),(3347,'55:47 · Creation accounts'),(3463,'57:43 · Flood and Babel')]),
 'exodus':([15],'McClellan identifies the Song of the Sea as poetry preserved within a larger narrative. He discusses possible earlier oral transmission.',[(1409,'23:29 · Song of the Sea')]),
 'leviticus':([18,20],'McClellan studies the sexual prohibitions through ancient social roles and ideas about pollution of the land. He distinguishes the prohibitions in chapter 18 from penalties in chapter 20.',[(11495,'3:11:35 · Scope of the prohibitions'),(11567,'3:12:47 · Chapters 18 and 20'),(11635,'3:13:55 · Pollution of the land')]),
}
def add(data,source,chapters,lds=False):
    source=dict(source,chapterCoverage=chapters)
    data['sources']=[s for s in data['sources'] if s['id']!=source['id']]+[source]
    for c in data['chapters']:
        target=c['lds'] if lds else c
        target['sourceIds']=[sid for sid in target['sourceIds'] if sid!=source['id']]
        if c['chapter'] in chapters:target['sourceIds'].append(source['id'])
def enrich(data):
    slug=data['id']
    for book,num,chapters,coverage,summary in LESSONS:
        if book!=slug:continue
        add(data,dict(id=f'cfm-2026-{num:02}',title='Come, Follow Me 2026 · '+coverage,author='The Church of Jesus Christ of Latter-day Saints',year=2026,category='LDS study manual',perspective='lds',url=CFM+f'{num:02}?lang=eng',summary=summary,reviewed=DATE+': Official lesson heading, selected chapter coverage, and relevant study sections reviewed.',limits='This is Church teaching and application. It does not independently establish archaeological evidence or event dates.',license='Linked official Church lesson. Original guide summary.'),chapters,True)
    if slug in WIKI:
        review=next(r for r in json.loads((ROOT/'scripts/bible-wikipedia-reviews.json').read_text(encoding='utf-8')) if r['book']==slug)
        chapters,summary=WIKI[slug]
        add(data,dict(id='wiki-'+slug,title=review['title']+' · Wikipedia',author='Wikipedia contributors',category='Encyclopedia background',perspective='historical',url=review['url'],revisionId=review['revisionId'],revisionUrl='https://en.wikipedia.org/w/index.php?oldid='+review['revisionId'],summary=summary,reviewed=DATE+': Opening overview and book structure reviewed. These notes make no claim about exact composition dates.',limits='Anyone can edit this source. Use it for background and source discovery. Its disputed historical claims require separate scholarly review.',license='CC BY-SA 4.0',licenseUrl='https://creativecommons.org/licenses/by-sa/4.0/'),chapters)
        sid,title,author,year,url,summary,access=SCHOLARLY[slug]
        add(data,dict(id=sid,title=title,author=author,year=year,url=url,summary=summary,category='Scholarly publication',perspective='historical',reviewed=DATE+': '+access,limits=access+' This record verifies identity and scope. It does not independently verify every argument.',license='Linked publication record. Original summary.'),[])
        next(s for s in data['sources'] if s['id']=='wiki-'+slug)['citedSourceIds']=[sid]
    if slug in DM:
        chapters,summary,moments=DM[slug]
        timestamps=[dict(seconds=n,label=label,url=INTERVIEW+'#:~:text='+quote(f'[{n//3600:02}:{n%3600//60:02}:{n%60:02}]')) for n,label in moments]
        add(data,dict(id='dm-'+slug,title='10 Things You Should Know About the Bible · Episode 1802 · '+data['name'],author='Dan McClellan · interview with John Dehlin',year='August 23, 2023 · interview recorded August 14',category='Scholar interview',perspective='historical',group='mcclellan',url=INTERVIEW,summary=summary,timestamps=timestamps,reviewed=DATE+': Relevant sections of the publisher’s machine-generated, lightly edited transcript reviewed. Audio and video were not independently checked. Transcript errors remain possible.',limits='This is one scholar’s interpretation, separate from Church teaching. Proposed dates and claims about scholarly agreement were not independently verified.',license='Linked interview. Original summary. Transcript text is not reproduced.'),chapters)
    data['review']['sourcePolicy']='BIBLE-SOURCE-POLICY.md'
    data['review']['sourceEnrichmentDate']=DATE
    return data
