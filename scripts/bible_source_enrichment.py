"""Reviewed source additions. These survive rebuilding the native Isaiah adaptations."""
import json
from pathlib import Path
from urllib.parse import quote
ROOT=Path(__file__).resolve().parent.parent
DATE='2026-10-05'
CFM='https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/'
def span(a,z):return list(range(a,z+1))
LESSONS=[
 ('2-samuel',25,[5,6,7],'1 Samuel 17–18; 24–26; 2 Samuel 5–7 · Second Samuel coverage','The lesson studies seeking guidance and reads David’s promised house through Jesus Christ.'),
 ('2-samuel',26,[11,12],'2 Samuel 11–12; 1 Kings 3; 6–9; 11 · Second Samuel coverage','The lesson studies David’s harmful choices and Nathan’s correction.'),
 ('1-samuel',23,span(1,7),'Ruth; 1 Samuel 1–7 · Samuel coverage','The lesson studies prayer in hardship, Samuel’s call, and faithful conduct beyond possession of the ark.'),
 ('1-samuel',24,[8,9,10,13,15,16],'1 Samuel 8–10; 13; 15–16','The lesson studies Christ as King, calls to service, obedience, and judging character beyond appearance.'),
 ('1-samuel',25,[17,18,24,25,26],'1 Samuel 17–18; 24–26 · Samuel coverage','The lesson studies courage, friendship, self-control, and forgiveness. It compares Abigail’s intervention with Jesus Christ.'),
 ('ruth',23,[1,2,3,4],'Ruth; 1 Samuel 1–7 · Ruth coverage','The lesson studies faith through loss, practical kindness, and family redemption. It compares Ruth and Boaz with Jesus Christ.'),
 ('judges',22,[2,3,4,6,7,8,13,14,15,16],'Judges 2–4; 6–8; 13–16','The lesson studies repeated repentance, Deborah’s influence, trust through Gideon’s experience, and Samson’s covenant conduct.'),
 ('joshua',21,span(1,8)+[23,24],'Joshua 1–8; 23–24','The lesson studies courage, scripture study, Rahab’s faith and actions, remembrance, and choosing to serve God.'),
 ('deuteronomy',20,[6,7,8,15,18,29,30,34],'Deuteronomy 6–8; 15; 18; 29–30; 34','The lesson studies love for God, remembrance, generous care, and agency. It connects the prophet like Moses with Jesus Christ.'),
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
 ('numbers',19,[11,12,13,14,20,21,22,23,24,27],'Numbers 11–14; 20–24; 27','The lesson studies gratitude, meekness, trust, and resistance to pressure. It connects the bronze serpent with faith in Christ.'),
]
WIKI={
 '1-samuel':([1,8,16,31],'The Samuel books connect the prophet’s childhood and the ark account with Saul’s kingship and David’s rise. This background concerns both books.'),
 'ruth':([1,4],'Ruth follows a Moabite widow’s return with Naomi to Bethlehem. The household account ends with a genealogy connected to David.'),
 'judges':([1,2,17,21],'Judges combines local deliverance accounts with a repeated crisis pattern. Its closing episodes concern a shrine, migration, and conflict within Israel.'),
 'joshua':([1,13,24],'Joshua moves from crossing and campaigns to land distribution and final covenant addresses. This overview supplies the book’s broad structure.'),
 'deuteronomy':([1,5,31,34],'Deuteronomy presents Moses’s addresses before Israel’s entry into the land. Its ending includes poems, Joshua’s succession, and the account of Moses’s departure.'),
 'genesis':([1,12,50],'Genesis moves from creation and early humanity to the families of Abraham, Isaac, Jacob, and Joseph. This overview helps explain the book’s structure.'),
 'exodus':([1,19,40],'Exodus connects escape from slavery with a covenant at Sinai and the construction of the tabernacle. This overview supplies book structure.'),
 'leviticus':([1,11,19],'Leviticus concerns offerings, priestly service, ritual purity, and conduct within the community. This overview supplies book structure.'),
 'numbers':([1,10,26],'Numbers moves from camp preparation at Sinai through wilderness journeys to the plains of Moab. The book combines census lists, laws, and narrative accounts.'),
}
SCHOLARLY={
 'deuteronomy':('scholar-weinfeld','Deuteronomy 1–11','Moshe Weinfeld and David R. Seely · publisher attribution','Linked publisher edition 1995','https://yalebooks.yale.edu/book/9780300139433/deuteronomy-1-11/','The publisher describes a translation and commentary on Deuteronomy’s opening chapters and its wider literary setting.','Publisher description and edition metadata reviewed. The full commentary was not read.'),
 'genesis':('scholar-baden','The Book of Exodus: A Biography','Joel S. Baden',2019,'https://assets.press.princeton.edu/catalogs/S19Seasonal.pdf','The publisher describes Baden’s study of the Exodus story, its written forms, and its later use.','Publisher catalogue entry reviewed. The full book was not read.'),
 'exodus':('scholar-meyers','Exodus · Preface','Carol Meyers','2005 print; 2012 online','https://doi.org/10.1017/CBO9780511806377.001','Meyers connects the escape narrative, Sinai covenant, and community laws with Israel’s identity.','The publicly displayed preface summary and publication details were reviewed. The full commentary was not read.'),
 'leviticus':('scholar-milgrom','Leviticus 1–16','Jacob Milgrom','1991 original; linked publisher edition 1998','https://yalebooks.yale.edu/book/9780300139402/leviticus-1-16/','The publisher describes Milgrom’s study of sanctuary worship, sacrifice, and purity.','Publisher description and edition record reviewed. The full commentary was not read.'),
}
INTERVIEW='https://www.mormonstories.org/10-things-bible-dan-mcclellan/'
DM={
 'joshua':([2,6,10,11,13,15,16,17],'McClellan argues that total conquest claims are literary presentations rather than complete historical reports. He also discusses Rahab’s protection of the spies and the account’s recognition of her actions.',[(7171,'1:59:31 · Conquest claims'),(13642,'3:47:22 · Rahab')]),
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
        if slug in SCHOLARLY:
            sid,title,author,year,url,summary,access=SCHOLARLY[slug]
            add(data,dict(id=sid,title=title,author=author,year=year,url=url,summary=summary,category='Scholarly publication',perspective='historical',reviewed=DATE+': '+access,limits=access+' This record verifies identity and scope. It does not independently verify every argument.',license='Linked publication record. Original summary.'),[])
            next(s for s in data['sources'] if s['id']=='wiki-'+slug)['citedSourceIds']=[sid]
    if slug in DM:
        chapters,summary,moments=DM[slug]
        timestamps=[dict(seconds=n,label=label,url=INTERVIEW+'#:~:text='+quote(f'[{n//3600:02}:{n%3600//60:02}:{n%60:02}]')) for n,label in moments]
        add(data,dict(id='dm-'+slug,title='10 Things You Should Know About the Bible · Episode 1802 · '+data['name'],author='Dan McClellan · interview with John Dehlin',year='August 23, 2023 · interview recorded August 14',category='Scholar interview',perspective='historical',group='mcclellan',url=INTERVIEW,summary=summary,timestamps=timestamps,reviewed=DATE+': Relevant sections of the publisher’s machine-generated, lightly edited transcript reviewed. Audio and video were not independently checked. Transcript errors remain possible.',limits='This is one scholar’s interpretation, separate from Church teaching. Proposed dates and claims about scholarly agreement were not independently verified.',license='Linked interview. Original summary. Transcript text is not reproduced.'),chapters)
    data['review']['sourcePolicy']='BIBLE-SOURCE-POLICY.md'
    if slug=='numbers':
        add(data,dict(id='dm-numbers',title='Satan as a Fallen Angel · Numbers 22 note',author='Dan McClellan',year='September 13, 2009',category='Scholar commentary',perspective='historical',group='mcclellan',url='https://danielomcclellan.wordpress.com/2009/09/13/satan-as-a-fallen-angel/',summary='McClellan’s notes distinguish an adversary as a role from Satan as a personal name. In Numbers 22, the angel opposes Balaam. This does not identify the angel as the later figure of Satan.',reviewed=DATE+': The original post and footnotes 1–2 were reviewed. The broader history proposed in the post was not independently verified.',limits='This older scholarly post supplies a focused reading of Numbers 22. It is not Church teaching or a verified account of every stage in beliefs about Satan.',license='Linked original post. Original guide summary.'),[22])
    if slug=='judges':
        add(data,dict(id='dm-judges',title='The Song of Deborah and the Rise of Israel',author='Dan McClellan',year='January 7, 2013',category='Scholar commentary',perspective='historical',group='mcclellan',url='https://danielomcclellan.wordpress.com/2013/01/07/the-song-of-deborah-and-the-rise-of-israel/',summary='McClellan studies participating and absent tribes in Judges 5. He proposes that the song preserves an earlier pattern of cooperation among groups.',reviewed=DATE+': Original post reviewed. Its proposed dates and reconstruction of early Israel were not independently verified.',limits='This is one scholar’s older interpretation. The guide does not adopt its speculative link between Sisera’s name and Ramses II or treat it as a verified event date.',license='Linked original post. Original guide summary.'),[5])
    if slug=='deuteronomy':
        add(data,dict(id='dm-deuteronomy',title='Angels and Gods at Qumran · Deuteronomy 32 discussion',author='Dan McClellan',year='May 28, 2010',category='Scholar commentary',perspective='historical',group='mcclellan',url='https://danielomcclellan.wordpress.com/2010/05/28/angels-and-gods-at-qumran/',summary='McClellan argues that Greek renderings of Deuteronomy 32 connect divine beings with angels. His discussion concerns textual interpretation and changes in religious categories.',reviewed=DATE+': Original post reviewed, especially its discussion of Deuteronomy 32:8–9 and 43. Reader comments are not used as evidence.',limits='This is an older scholarly interpretation, separate from Church teaching. The proposed historical sequence is not independently verified here. Hebrew and Greek text is not copied from the post.',license='Linked original post. Original guide summary.'),[32])
    data['review']['sourceEnrichmentDate']=DATE
    return data
