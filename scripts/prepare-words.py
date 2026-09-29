"""Curated associations, checked against OSHB verse lemmas; not exhaustive alignment."""
from pathlib import Path
import json, re, xml.etree.ElementTree as E
ROOT=Path(__file__).resolve().parent.parent
NS={'o':'http://www.bibletechnologies.net/2003/OSIS/namespace'}
lex=E.parse(ROOT/'scripts/hebrew-strong.xml')
headwords={int(d.get('n')):d.find('o:w',NS).attrib for d in lex.findall('.//o:div[@type="entry"]',NS)}
hb=E.parse(ROOT/'scripts/Isa.xml')
verses={v.get('osisID'):v for v in hb.findall('.//o:verse',NS)}
words=[]
def word(id,label,matches,chapter,verse_list,strong,greek,meaning,discussion,greeknote='',related=None):
    # Check each verse where the English selection can actually appear.
    english=json.loads((ROOT/'dist/data/scripture.json').read_text(encoding='utf-8'))['chapters'][str(chapter)]
    for verse_number in verse_list:
        text=next(v['text'] for v in english if v['verse']==verse_number)
        if not any(re.search(r'\b'+re.escape(m)+r'\b',text,re.I) for m in matches):
            continue
        v=verses[f'Isa.{chapter}.{verse_number}']
        found=any(str(strong) in re.findall(r'\d+',w.get('lemma','')) for w in v.findall('o:w',NS))
        assert found,(id,chapter,verse_number,strong)
    entry=headwords[strong]
    words.append(dict(id=id,label=label,matches=matches,chapter=chapter,verses=verse_list,hebrew=entry.get('lemma',''),transliteration=entry.get('xlit',''),greek=greek,greekNote=greeknote,meaning=meaning,grammar=f'Hebrew dictionary entry H{strong}. The word shown is its dictionary form. Its spelling in the verse can differ.',discussion=discussion,sourceIds=['strong','oshb',f'lxx{chapter}','web' if chapter==36 else f'web{chapter}'],related=related or []))

word('king','King',['King','king'],36,[1],4428,'βασιλεὺς','A ruler. The verse names both Judah’s king and the Assyrian king.','Both rulers have the title king, but their power differs. Later, the speaker calls the Assyrian king “great” to stress his power.')
word('hezekiah','Hezekiah',['Hezekiah'],36,[1,2,3,4,5,7,14,15,16,18,22],2396,'Ἑζεκίου','The king of Judah in this account.',"")
word('sennacherib','Sennacherib',['Sennacherib'],36,[1],5576,'Σενναχηρεὶμ','The Assyrian king named at the opening of the campaign narrative.',"")
word('assyria','Assyria',['Assyria'],36,[1,2,4,6,8,9,13,15,16,18,20],804,'Ἀσσυρίων','The empire that threatens Judah.',"The Hebrew names Assyria, while the Greek phrase calls its ruler king of the Assyrians. Both identify the power attacking Judah.")
word('judah','Judah',['Judah'],36,[1,7],3063,'Ἰουδαίας','The southern kingdom in this passage.','Elsewhere, Judah can name an ancestor, a people, or a territory. Here the references to cities and Jerusalem identify the kingdom.')
word('rabshakeh','Rabshakeh',['Rabshakeh'],36,[2,4,11,12,13,22],7262,'Ῥαβσάκην','An Assyrian official’s title. The translation uses an English spelling of its sounds.','Strong’s Hebrew dictionary explains the title Rabshakeh as “chief cupbearer,” an official who served drinks to the king. In Isaiah 36, this official speaks for the Assyrian king and urges Jerusalem to surrender. Here, his role is that of a senior royal representative.')
word('lachish','Lachish',['Lachish'],36,[2],3923,'Λαχεὶς','A fortified city of Judah; the starting point of the mission to Jerusalem.',"")
word('jerusalem','Jerusalem',['Jerusalem'],36,[2,7,20],3389,'Ἰερουσαλὴμ','Judah’s royal and temple city.',"In Isaiah 36:2, the Hebrew word has an ending that means toward Jerusalem. English expresses this direction with the separate word “to.”")
word('army','Army',['army'],36,[2],2426,'δυνάμεως','A military force in this context.','The Hebrew word can mean force or strength. Here it refers to soldiers sent by the king. The Greek word can also mean power or force.')
word('aqueduct','Aqueduct',['aqueduct'],36,[2],8585,'ὑδραγωγῷ','A channel that carries water.',"")
word('pool','Pool',['pool'],36,[2],1295,'κολυμβήθρας','A water pool or reservoir.',"")
word('confidence','Confidence',['confidence'],36,[4],986,'πεποιθὼς','The reliance or confidence that the speaker challenges.',"In Isaiah 36:4, the Hebrew noun for confidence and the related verb for trust occur in the same question. This repetition introduces the speech’s repeated challenge: whom can Judah trust?",'Swete’s text uses πεποιθὼς in verse 4. This verb form expresses trust in a question. It is not a direct noun match for “confidence.”')
word('trust','Trust',['trust'],36,[4,5,6,7,9,15],982,'πέποιθας','To rely on someone or something.',"Rabshakeh challenges trust in Egypt’s military help in Isaiah 36:6, 9 and trust in the LORD’s rescue in verse 15. His speech attacks both reasons for resisting Assyria.",'This form comes from verse 5. The Greek verb has different forms elsewhere in the chapter.')
word('egypt','Egypt',['Egypt'],36,[6,9],4714,'Αἴγυπτον','The southern power whose help the speaker depicts as unreliable.','The Assyrian speaker compares Egypt to a broken reed. He uses this image to argue that Egypt cannot help Judah.')
word('aramaic','Aramaic',['Aramaic'],36,[11],762,'Συριστί','The language the Judean officials ask the envoy to use.','The officials ask for Aramaic so the people on the wall cannot understand the discussion. The speaker continues in the people’s language.','The Greek adverb Συριστί names the language. Its ancient meaning differs from modern national names.')
word('judean','Jews’ language',['Jews'],36,[11,13],3066,'Ἰουδαιστί','In Judean: the speech of the local audience, rendered “the Jews’ language” in WEB.',"One Hebrew adverb corresponds to the English phrase “the Jews’ language.” In Isaiah 36:13, Rabshakeh uses this language to address the people on the wall directly.")
word('remnant','Remnant',['remnant'],37,[4,32],7611,'καταλελιμμένων','Those remaining after disaster or loss.',"In Isaiah 37:4, Hezekiah asks for prayer for the survivors. In verses 31–32, roots and fruit describe their future recovery. The image presents survival as the beginning of renewed life.",'This Greek form comes from verse 4 and means those left. Verse 32 uses another form. Verse 31 uses different Hebrew wording and has no match in this entry.')
word('spirit','Spirit',['spirit'],37,[7],7307,'πνεῦμα','A spirit or state of mind that God says he will put in the Assyrian king.',"The Hebrew word can mean wind, breath, or spirit. Isaiah 37:7 connects it with the Assyrian king hearing news and returning home.")
word('shadow','Shadow',['shadow'],38,[8],6738,'σκιὰν','The shadow involved in the sign given to Hezekiah.',"")
word('steps','Steps / sundial',['steps','sundial'],38,[8],4609,'ἀναβαθμούς','Steps or degrees. Some translations use “sundial” for the structure where the shadow appears.','The World English Bible translates wording about steps as “sundial.” The Hebrew does not specify a circular clock face.')
word('sheol','Sheol',['Sheol'],38,[10,18],7585,'ᾅδου','The realm or place of the dead in the poem’s imagery.',"Isaiah 38:18–19 contrasts the dead, who cannot praise God, with the living, who can. Hezekiah places his own praise within that contrast after his rescue from death.",related=[{'label':'Matthew 16:18 — gates of Hades','url':'https://ebible.org/engwebp/MAT16.htm#V18','note':'A later verbal/image comparison, not a claim that Matthew directly quotes Isaiah 38.'}])
word('soul','Soul / life',['soul'],38,[17],5315,'ψυχὴν','The speaker’s life or self, rescued from destruction.',"Isaiah 38:17 places rescue from death beside forgiveness of sins. The reference to his soul belongs to Hezekiah’s thanks for his restored life.")
word('sins','Sins',['sins'],38,[17],2399,'ἁμαρτίας','Wrongdoing that the poem describes as thrown behind God’s back.',"Isaiah 38:17 describes God casting the speaker’s sins behind his back. This image expresses forgiveness alongside Hezekiah’s rescue from death.")
word('babylon','Babylon',['Babylon'],39,[1,3,6,7],894,'Βαβυλωνίας','The city and kingdom of the visitors. Isaiah also names Babylon in his warning about the future.',"Babylon sends a gift in Isaiah 39:1, but becomes the destination of Judah’s lost treasures in verse 6. The warning concerns the same wealth Hezekiah showed the visitors.",'This form comes from verse 1. Later verses use other word forms and names for the people.')
word('eunuchs','Eunuchs',['eunuchs'],39,[7],5631,'σπάδοντας','Court servants described with a term that can denote eunuchs or officials.',"Isaiah 39:7 places Hezekiah’s descendants in the Babylonian king’s palace as servants. The warning reverses their position: members of Judah’s royal family will serve a foreign ruler.")
word('peace','Peace',['peace'],39,[8],7965,'εἰρήνη','Peace or well-being in Hezekiah’s days.',"In Isaiah 39:8, Hezekiah speaks of peace in his own days after hearing that his descendants will be taken away. His response contrasts present security with the future loss Isaiah announces.")
word('truth','Truth / stability',['truth'],39,[8],571,'δικαιοσύνη','Reliability or faithfulness, paired with peace.',"The Hebrew word can mean firmness or faithfulness. Paired with peace in Isaiah 39:8, it can suggest stable conditions during Hezekiah’s lifetime.",'Swete’s Greek uses δικαιοσύνη, which commonly means righteousness or justice. The Hebrew and Greek words do not have identical meanings.')

# Selected additions use the checked Hebrew text only. No Greek match is implied.
additional=[
    (1,17,'Justice','justice',4941,'A just decision or the practice of justice.','The commands that follow concern people who need protection.'),
    (6,3,'Holy','Holy',6918,'Holy or sacred.','The threefold repetition belongs to the vision of the Lord and his glory.'),
    (7,14,'Sign','sign',226,'A sign or distinguishing mark.','Read the sign with the political threat described earlier in the chapter.'),
    (10,21,'Remnant','remnant',7605,'What remains after loss.','The survivors are described as returning to the mighty God.'),
    (11,1,'Shoot','shoot',2415,'A twig or shoot.','New growth from Jesse’s stock introduces the image of a renewed ruler.'),
    (12,2,'Salvation','salvation',3444,'Deliverance or rescue.','The song joins salvation with trust, strength, and the end of fear.'),
    (28,16,'Stone','stone',68,'A stone.','The construction image describes a reliable foundation in Zion.'),
    (29,11,'Book','book',5612,'A written document or scroll.','The sealed document illustrates the inability to receive the vision. The ancient object need not be a bound book.'),
    (30,15,'Rest','rest',5183,'Rest or quietness.','The verse contrasts returning and rest with the refusal to trust.'),
    (35,1,'Wilderness','wilderness',4057,'Open country or wilderness.','The dry landscape becomes a place of joy in the restoration poem.'),
    (40,1,'Comfort','Comfort',5162,'To comfort or console in this setting.','The repeated command opens the message of comfort to the people.'),
    (42,1,'Servant','servant',5650,'A servant or one who serves.','This servant receives a task concerning justice for the nations. The noun alone does not settle the servant’s identity.'),
    (43,1,'Redeemed','redeemed',1350,'To redeem or reclaim.','God’s claim on Israel answers fear. The surrounding words stress creation, naming, and belonging.'),
    (45,1,'Anointed','anointed',4899,'An anointed person.','Here the text applies the title to Cyrus. The word alone does not identify every anointed figure with the same person.'),
    (48,18,'Peace','peace',7965,'Peace, welfare, or well-being.','A river describes the fullness of peace linked with listening to the commandments.'),
    (53,4,'Sickness','sickness',2483,'Sickness or illness.','The speakers reconsider the suffering figure. Translation choices and later interpretation should be distinguished from the dictionary meaning.'),
    (54,10,'Covenant','covenant',1285,'A covenant or binding relationship.','The covenant of peace remains even when mountains and hills are pictured as moving.'),
    (55,1,'Waters','waters',4325,'Water.','Water begins an invitation to receive what sustains life without payment.'),
    (56,7,'Prayer','prayer',8605,'Prayer.','The house of prayer is described as being for all peoples.'),
    (58,6,'Fast','fast',6685,'A fast, an abstention from food.','The chapter connects the chosen fast with release from oppression and practical care.'),
    (61,1,'Liberty','liberty',1865,'Liberty or release.','The proclamation addresses captives within a larger announcement of good news and healing.'),
    (65,17,'New','new',2319,'New or fresh.','The adjective modifies both heavens and earth in the promise of renewed creation.'),
    (66,2,'Spirit','spirit',7307,'Spirit, breath, or wind, depending on context.','Here the phrase describes the humble or contrite condition of a person before God.'),
]
for chapter,verse,label,match,strong,meaning,discussion in additional:
    word(f'isaiah-{chapter}-{match.lower()}',label,[match],chapter,[verse],strong,'',meaning,discussion)
    words[-1]['sourceIds']=['strong','oshb',f'web{chapter}']

out=ROOT/'dist/data/content.json'; content=json.loads(out.read_text(encoding='utf-8')); content['words']=words
out.write_text(json.dumps(content,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Prepared {len(words)} curated word studies with Hebrew lemma checks.')
