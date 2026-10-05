"""First Chronicles: genealogical memory, David, and temple service."""
import json
from book_common import OUT,source,person,place,scripture,finish

# These are selected profiles, not a claim to identify every name in the lists.
rows=[
('From Adam to Israel and Edom','The genealogy moves from Adam through Noah and Abraham to Israel. It also records neighboring lineages and Edomite rulers.','The lists place Israel within a larger human family. They are not a modern population register or a secure year-by-year chronology.','adam,enoch,noah,shem,ham,japheth,nimrod,abraham,ishmael,isaac,esau,jacob,keturah','edom'),
('Judah’s families and David’s ancestors','Judah’s descendants include Tamar’s children, the line to David, family branches, craftspeople, and an Egyptian servant’s descendants.','Women and people from outside Judah appear within the remembered families. Matching names alone do not establish matching identities.','judah,tamar,boaz,obed,jesse,david,zeruiah,abigail-sister,joab,abishai,asahel,amasa,caleb-hezron,jarha','bethlehem,hebron,kiriath-jearim'),
('David’s children and the royal line after exile','The list records David’s children, Judah’s kings, and descendants of the captive Jeconiah. It continues beyond the monarchy.','The genealogy connects royal memory with later generations. Its two Zedekiahs must remain distinct.','david,amnon,abigail,ahinoam-david,absalom,adonijah,bathsheba,solomon,tamar-david,rehoboam,asa,jehoshaphat,jehoram-judah,ahaziah-judah,joash-judah,amaziah,azariah,jotham,ahaz,hezekiah,manasseh-king,amon-king,josiah,jehoiakim,jehoiachin,zedekiah,zedekiah-jeconiah,zerubbabel,shelomith-daughter','hebron,jerusalem,babylon'),
('Judah, Jabez, craftspeople, and Simeon’s settlements','Judah’s families include Jabez’s prayer, craft communities, and Bithiah. Simeonite settlement accounts include violent displacement.','A brief answered prayer does not establish a universal formula for wealth. Settlement claims retain their violence and uncertain place identifications.','jabez,bithiah,caleb,hezekiah,simeon','beersheba,ziklag,edom'),
('Eastern tribes, prayer, and captivity','Reuben, Gad, and eastern Manasseh receive family and settlement notices. War, trust in God, and Assyrian deportation frame the account.','The narrator interprets success and exile through loyalty to God. Reported troop and captive totals are not independently audited counts.','reuben,joseph,judah,beer ah,pul,jotham,jeroboam-ii','gilead,assyria'),
('Levi’s families, singers, priests, and towns','Levitical genealogies distinguish priestly descendants, singers, other service families, and allotted towns. Jehozadak’s captivity appears within the list.','The chapter connects worship roles with ancestry and land. Repeated names require care, especially Zadok, Azariah, and Elkanah.','levi,aaron,moses,miriam,nadab,abihu,eleazar,ithamar,phinehas,samuel,heman-singer,asaph-singer,ethan-singer,jehozadak,caleb','jerusalem,hebron,shechem,gezer,gibeon,gilead'),
('Northern families, grief, and Sheerah’s building','Several northern tribes receive family and military notices. Ephraim mourns sons. Sheerah builds towns, and Joshua appears in a descent line.','Family memory includes grief and women’s work alongside military totals. Sheerah’s notice does not supply a complete architectural biography.','ephraim,manasseh,zelophehad,sheerah,joshua,serah','gath,bethel,gezer,shechem,beth-horon'),
('Benjamin’s families and Saul’s descendants','Benjamin’s families include settlements, movements, and the descent of Saul, Jonathan, and Merib Baal.','The lists prepare for Saul’s death account. Benjaminite Naaman and Elijah are not the later commander and prophet.','benjamin,saul,jonathan-saul,mephibosheth-jonathan,ishbosheth','jerusalem,gibeon,gath'),
('Jerusalem’s residents and sanctuary workers','A captivity notice introduces Jerusalem residents and temple workers. Gatekeepers, supplies, baking, and music receive detailed attention. Saul’s family closes the chapter.','Routine work supports the community’s worship. References to David and Samuel are remembered authorizations rather than their presence after exile.','saul,jonathan-saul,ishbosheth,mephibosheth-jonathan,phinehas,samuel,david,shallum-gatekeeper,mattithiah-baker','jerusalem,gibeon,babylon'),
('Saul dies at Gilboa','The Philistines defeat Saul and his sons. Jabesh Gilead retrieves their remains. The narrator explains Saul’s death through unfaithfulness.','The explanation is the narrator’s theological judgment. The armor bearer is unnamed, and the burial account does not require graphic art.','saul,jonathan-saul,saul-armor-bearer,david','gilboa,jabesh-gilead'),
('David becomes king and his warriors are remembered','Israel’s elders anoint David at Hebron. He takes Jerusalem, and a list of warriors preserves accounts of courage and costly loyalty.','The king refuses water obtained at risk to others. Uriah remains in the list although his later mistreatment is omitted from this book.','david,saul,joab,jashobeam,eleazar-dodai,abishai,benaiah,asahel,uriah','hebron,jerusalem,adullam,bethlehem,rephaim'),
('Supporters gather to David','Supporters join David during his flight from Saul. Amasai pledges allegiance. Tribal groups assemble at Hebron with food and military support.','The book presents unity around David while remembering earlier divided allegiance. Amasai’s speech is not a biography of every same-name person.','david,saul,amasai-warrior,zadok','ziklag,hebron,jordan'),
('The first ark journey ends in fear','David gathers Israel to move the ark from Kiriath Jearim. Uzza touches it and dies. The ark remains at Obed Edom’s house.','Celebration gives way to anger and fear. The text reports divine action without establishing Uzza’s complete private motives.','david,saul,abinadab-ark,uzzah,ahio,obed-edom','kiriath-jearim,jerusalem'),
('David’s house and victories against the Philistines','Hiram supplies a house for David. Royal children are listed, and two Philistine attacks lead David to seek guidance.','The narrator connects kingship with service to Israel. Family expansion and battles are distinct notices, not one event at one location.','david,hiram,solomon','jerusalem,tyre,rephaim,gibeon,gezer'),
('Levites carry the ark with music','David prepares a tent and appoints priests, Levites, singers, and gatekeepers. They carry the ark to Jerusalem. Michal watches from a window.','The account revisits the failed journey through rules for carrying the ark. Michal’s response appears without the later dialogue found in Samuel.','david,moses,aaron,zadok,abiathar,heman-singer,asaph-singer,ethan-singer,chenaniah-music,obed-edom,michal,saul','jerusalem'),
('Thanksgiving and two centers of worship','David distributes food and appoints worship workers. A thanksgiving song recalls covenant promises. Worship continues before the ark and at Gibeon.','The song connects remembered ancestors with the gathered community. The chapter distinguishes the ark’s tent from the tabernacle at Gibeon.','david,asaph-singer,abraham,isaac,jacob,zadok,heman-singer,jeduthun,obed-edom,hosah','jerusalem,gibeon'),
('Nathan announces a house for David','David proposes a building for the ark. Nathan’s initial approval changes after revelation. God promises David a continuing house, and David prays.','House refers both to a building and to a royal family. The promised builder is David’s successor, not Nathan the king’s son.','david,nathan-prophet','jerusalem'),
('Victories, tribute, dedicated treasure, and officials','David subdues opponents, receives gifts from Tou through Hadoram, dedicates treasure, and appoints officials.','Military expansion and temple resources are linked. Peoples who lose freedom remain part of the account, alongside the king’s praise.','david,hadadezer,toi,joram-hamath,abishai,joab,benaiah,zadok,ahimelech-abiathar,shavsha','gath,moab,hamath,damascus,edom,jerusalem'),
('Humiliated envoys and war with Ammon','Hanun humiliates David’s envoys. Ammon hires allies, Joab and Abishai cooperate in battle, and David defeats further Syrian forces.','The story links suspicion with diplomatic injury and escalation. It does not independently establish each ruler’s private motives.','david,hanun,nahash,joab,abishai,hadadezer,shophach','rabbah,jericho,jerusalem,jordan,aram'),
('Rabbah falls and Philistine warriors die','Joab takes Rabbah while David stays in Jerusalem. The account reports treatment of captives and later battles against Philistine warriors.','The reading translation contains severe violence against captives. Compare Samuel’s wording and sequence before treating either as a neutral report.','david,joab,sibbecai,elhanan-jair,lahmi,jonathan-shimei,goliath','rabbah,jerusalem,gezer,gath'),
('Census, plague, and Ornan’s threshing floor','David orders a census despite Joab’s objection. Gad offers choices of punishment. David purchases Ornan’s site and builds an altar.','The opening names Satan in this translation, unlike Samuel’s divine incitement. The Hebrew adversary’s identity is debated. David questions collective suffering.','david,joab,gad,araunah,ornan-sons,moses','beersheba,dan,jerusalem,gibeon'),
('David prepares for Solomon’s temple','David gathers workers and materials. He explains that Solomon will build the temple because David has shed blood, and he urges leaders to help.','Preparation serves a task David will not finish himself. The text’s large quantities are narrated claims, not verified project accounts.','david,solomon,moses','jerusalem,tyre,sidon'),
('Levitical service is organized','David names Solomon king, counts Levites, and assigns duties. Aaron’s descendants and Moses’ descendants receive different roles.','Worship depends on oversight, food preparation, measurement, and praise. The chapter reports both thirty-year and twenty-year age thresholds.','david,solomon,levi,aaron,moses,gershom-moses,eliezer-moses','jerusalem'),
('Priestly divisions are assigned by lot','David, Zadok, and Ahimelech organize priestly service. Shemaiah records the assignments, and other Levitical families also draw lots.','The account emphasizes ordered service and shared participation. Its brief notice of Nadab and Abihu differs from Leviticus’ fuller death account.','david,zadok,ahimelech-abiathar,shemaiah-scribe,aaron,nadab,abihu,eleazar,ithamar','jerusalem'),
('Musicians, prophecy, and shared assignments','Asaph, Heman, and Jeduthun lead musical families. Trained singers receive duties by lot, including teachers and students.','Music is described as prophecy, thanksgiving, and praise. The assignments bring skilled people together without a modern claim of equal social status.','david,asaph-singer,heman-singer,jeduthun','jerusalem'),
('Gates, treasuries, and public administration','Gatekeeper families receive posts by lot. Treasurers oversee dedicated property, and Levites serve as judges and regional officers.','Security, material care, and administration belong to the worship system. Recalled donors are not all alive during each appointment.','david,obed-edom,meshelemiah,hosah,shelomoth-treasurer,shebuel-treasurer,samuel,saul,abner,joab','jerusalem,gilead'),
('Army rotations and royal property','Monthly military divisions, tribal leaders, estate workers, and counselors are listed. A notice recalls the unfinished census.','Governance includes farming, livestock, storage, and advice. Repeated names do not identify every worker with an earlier king, priest, or prophet.','david,joab,jashobeam,benaiah,asahel,sibbecai,zadok,ahithophel,hushai,abiathar,obil,jaziz','jerusalem'),
('David gives Solomon plans and a charge','David addresses the assembly, explains the chosen builder, gives temple plans and materials, and urges Solomon to seek God and act courageously.','The charge connects inward willingness with practical work. The text attributes the plan to revelation without supplying a verified architectural reconstruction.','david,solomon','jerusalem'),
('Willing gifts, prayer, succession, and David’s death','David and leaders give for the temple. David thanks God, Solomon receives public recognition, and the book closes with David’s death and named records.','The prayer presents wealth as received rather than self-created. The named records do not reveal the contents of unavailable writings.','david,solomon,zadok,samuel,nathan-prophet,gad,abraham,isaac,jacob,jehiel-treasurer','jerusalem,hebron')]
rows[4]=tuple(x.replace('beer ah','beerah') if isinstance(x,str) else x for x in rows[4])
for idx,pid in [(15,'obed-edom-jeduthun'),(25,'obed-edom-gatekeeper')]:
 row=list(rows[idx]);row[3]=row[3].replace('obed-edom',pid);rows[idx]=tuple(row)

prior={}
for slug in ['genesis','exodus','numbers','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings']:
 for p in json.loads((OUT/f'{slug}.json').read_text(encoding='utf-8'))['people']:prior[p['id']]=p

defs=[
('obed-edom-jeduthun','Obed Edom, son of Jeduthun','Doorkeeper explicitly named by parentage','Son of Jeduthun in 16:38.','16:38','The verse also mentions an Obed Edom with relatives. This profile does not assume both references identify one person.'),
('obed-edom-gatekeeper','Obed Edom, the gatekeeper','Head of a family assigned gates and storage','Father of eight sons named in chapter 26.','26:4–8,15','His household receives service assignments. Identification with the Gittite ark host is not treated as certain.'),
('zeruiah','Zeruiah','Woman whose sons lead David’s forces','Sister of David. Mother of Abishai, Joab, and Asahel.','2:16; 11:6,20,26,39; 18:12,15; 27:24','Her family connection identifies several officers. The book supplies no independent account of her daily life.'),
('zelophehad','Zelophehad','Man whose daughters are noted in Manasseh’s list','Named within the Machir family notice.','7:15','The short notice identifies daughters without repeating the fuller inheritance account in Numbers.'),
('keturah','Keturah','Mother in Abraham’s family list','Mother of six sons named here.','1:32–33','Her descendants remain part of the book’s wider family memory.'),
('caleb-hezron','Caleb, son of Hezron','Ancestor in Judah’s family branches','Son of Hezron. Brother of Jerahmeel.','2:18–20,42–50','This genealogy names a different father from Caleb son of Jephunneh. The guide keeps those profiles separate.'),
('jarha','Jarha','Egyptian servant included in Judah’s lineage','Servant of Sheshan. Marries Sheshan’s daughter and fathers Attai.','2:34–35','The family record includes a man identified as Egyptian. The daughter is unnamed, and consent is not described.'),
('zedekiah-jeconiah','Zedekiah, in Jeconiah’s line','Name in the descendants of Jehoiakim','Named after Jeconiah in 3:16.','3:16','He is not automatically the Zedekiah named among Josiah’s sons in the preceding verse.'),
('zerubbabel','Zerubbabel','Descendant in the royal line after captivity','Listed as Pedaiah’s son. Brother of Shimei.','3:19–20','This genealogy differs from other passages calling him Shealtiel’s son. The guide retains the difference without inventing a resolution.'),
('shelomith-daughter','Shelomith, Zerubbabel’s daughter','Woman named among the postexilic descendants','Sister of Meshullam and Hananiah.','3:19','Her presence links the remembered royal line with women as well as sons.'),
('jabez','Jabez','Man whose prayer interrupts the family list','His unnamed mother connects his name with childbirth sorrow.','4:9–10','He seeks blessing and protection from harm. His notice does not provide a repeatable guarantee of prosperity.'),
('bithiah','Bithiah','Pharaoh’s daughter in a Judah family record','Daughter of an unnamed Pharaoh. Wife of Mered.','4:18','The text does not identify her as Moses’ rescuer. A matching royal title does not establish the same woman.'),
('beerah','Beerah','Reubenite leader carried away by Assyria','Named in Joel’s descendant line.','5:6','His captivity connects family memory with imperial displacement.'),
('jehozadak','Jehozadak','Priestly descendant taken into captivity','Son of Seraiah in the priestly list.','6:14–15','The genealogy records exile within the priestly succession.'),
('heman-singer','Heman, the singer','Musical leader and royal seer','Son of Joel, descendant of Samuel in chapter 6.','6:33–38; 15:17–19; 16:41–42; 25:1–6','He is distinct from Heman in Judah’s earlier genealogy. Worship here includes trained music and prophecy.'),
('asaph-singer','Asaph, the singer','Leader of thanksgiving and musical service','Son of Berechiah. Leads a musical family.','6:39–43; 15:17–19; 16:5–7,37; 25:1–2,6,9','His assignments connect song with remembering and thanking God. Every later Asaph name is not automatically this man.'),
('ethan-singer','Ethan, the singer','Merarite musician beside Heman and Asaph','Named with Kishi in chapter 6 and Kushaiah in chapter 15.','6:44–47; 15:17–19','He is separate from Judah’s earlier Ethan. This guide does not assert that Ethan and Jeduthun are certainly one person.'),
('sheerah','Sheerah','Woman credited with building three towns','Named as Ephraim’s daughter in this family sequence.','7:24','The notice credits her building activity. It does not describe the complete construction process or date.'),
('serah','Serah','Woman named in Asher’s family','Sister of Imnah, Ishvah, Ishvi, and Beriah.','7:30','Her name preserves a woman within a largely male genealogy. Later traditions are not treated as her verified biography.'),
('shallum-gatekeeper','Shallum, the gatekeeper','Chief gatekeeper in Jerusalem’s service list','Son of Kore, descendant of Ebiasaph and Korah.','9:17–19,31','He is not a king named Shallum or Huldah’s husband.'),
('mattithiah-baker','Mattithiah, the baker','Levite responsible for pan-baked offerings','Firstborn of Shallum the Korahite.','9:31','Food preparation receives an explicit office of trust. Other musicians with the same name are not automatically him.'),
('saul-armor-bearer','Saul’s armor bearer','Unnamed attendant who dies after Saul','Companion of Saul in his final battle.','10:4–5','He refuses Saul’s request out of fear. The guide does not supply an invented name or depict his death.'),
('jashobeam','Jashobeam','Warrior and leader in David’s lists','Called son of a Hachmonite in chapter 11 and son of Zabdiel in chapter 27.','11:11; 12:6; 27:2–3','The notices have different family wording. The guide records the wording without treating the casualty total as independently confirmed.'),
('amasai-warrior','Amasai, the warrior','Spokesman joining David’s supporters','Chief of the thirty in this account.','12:18','His pledge of peace is attributed to the Spirit. He is not automatically the musician named Amasai later.'),
('chenaniah-music','Chenaniah, the musical leader','Skilled Levite directing the ark celebration','Described as a teacher and leader in the procession.','15:22,27','Skill accompanies worship. The interpretation of his service varies, and the reading translation calls it singing.'),
('jeduthun','Jeduthun','Musician leading praise and prophetic service','Father of a musical family.','16:41–42; 25:1,3,6','The book connects his music with thanksgiving. It does not establish every proposed identification with Ethan.'),
('ahimelech-abiathar','Ahimelech, son of Abiathar','Priest helping organize divisions','Son of Abiathar in 24:6. Called Abimelech in the reading of 18:16.','18:16; 24:3,6,31','The son is not Abiathar’s earlier father Ahimelech. The spelling variation remains visible.'),
('shavsha','Shavsha','Secretary in David’s list of officials','Named alongside military and priestly officials.','18:16','The verse supplies his office without a complete biography.'),
('shophach','Shophach','Commander of Hadadezer’s Syrian forces','Leads the reinforcements beyond the River.','19:16–18','He dies in the account’s battle. The guide does not independently confirm its military totals.'),
('elhanan-jair','Elhanan, son of Jair','Warrior who kills Lahmi','Son of Jair in this chapter.','20:5','The account differs from 2 Samuel 21:19 in name and wording. This profile does not silently resolve that textual problem.'),
('lahmi','Lahmi','Philistine warrior killed by Elhanan','Called the brother of Goliath.','20:5','Chronicles names him where Samuel’s parallel has different wording. His appearance remains an artistic choice.'),
('ornan-sons','Ornan’s four sons','Unnamed witnesses hiding during the angel scene','Four sons with Ornan at the threshing floor.','21:20','They receive no personal names or ages. The illustration does not depict terror or physical harm.'),
('gershom-moses','Gershom, Moses’ son','Ancestor in the service families','Son of Moses. Father of Shebuel.','23:15–16; 26:24','He is not Levi’s son Gershon, also spelled Gershom elsewhere in this book.'),
('eliezer-moses','Eliezer, Moses’ son','Ancestor in the service families','Son of Moses. Father of Rehabiah.','23:15,17; 26:25','His name does not identify him with another Eliezer in the lists.'),
('shemaiah-scribe','Shemaiah, the scribe','Levite recording priestly assignments','Son of Nethanel.','24:6','His work makes the service order a written record. He is not automatically another Shemaiah.'),
('meshelemiah','Meshelemiah','Head of a gatekeeping family','Son of Kore. Father of Zechariah and six other named sons.','26:1–3,9,14','The chapter also uses Shelemiah in the assignment notice. His family serves rather than merely appearing in a name list.'),
('hosah','Hosah','Merarite gatekeeper and household head','Father of Shimri, Hilkiah, Tebaliah, and Zechariah.','16:38; 26:10–11,16','He appoints Shimri chief despite his not being the firstborn. Service assignments are not simply birth order.'),
('shelomoth-treasurer','Shelomoth, the treasurer','Keeper of dedicated property','Descendant of Eliezer in the service list.','26:25–28','He oversees contributions remembered from several leaders. Other Shelomith and Shelomoth names remain separate.'),
('shebuel-treasurer','Shebuel, the treasurer','Ruler over treasuries','Named in Moses’ line through Gershom.','23:16; 26:24','The compressed family wording does not establish that every listed ancestor and descendant lived at the same time.'),
('obil','Obil','Worker overseeing royal camels','Identified as an Ishmaelite.','27:30','A royal estate role is assigned to a man identified with a neighboring people.'),
('jaziz','Jaziz','Worker overseeing royal flocks','Identified as a Hagrite.','27:31','Administration includes people beyond the tribal leaders. His personal life is not described.'),
('jehiel-treasurer','Jehiel, the Gershonite','Keeper receiving precious stones for the temple','Identified as a Gershonite.','29:8','His named responsibility gives practical detail to the account of willing gifts.')]
new={i:person(i,n,r,rel,'1 Chronicles '+refs,m) for i,n,r,rel,refs,m in defs}
needed=list(dict.fromkeys(pid for row in rows for pid in row[3].split(',')))
people=[dict(new.get(pid) or prior[pid]) for pid in needed]
for p in people:
 if p['id'] not in new:
  ch=[str(n) for n,row in enumerate(rows,1) if p['id'] in row[3].split(',')]
  p['passages']='1 Chronicles '+', '.join(ch)
  p['role']='Recalled ancestor or participant in 1 Chronicles' if max(map(int,ch))<=9 else 'Participant or remembered figure in David’s account'
  p['meaning']='This profile identifies the same person remembered in earlier scripture. Read the listed chapters for this book’s particular presentation.'
 p['sourceIds']=['web'];p['placeIds']=[];p['linkNames']=[];p['verseScope']={}

# Replace previous-book descriptors with the role actually discussed here.
royals={'rehoboam','asa','jehoshaphat','jehoram-judah','ahaziah-judah','joash-judah','amaziah','azariah','jotham','ahaz','hezekiah','manasseh-king','amon-king','josiah','jehoiakim','jehoiachin','zedekiah'}
roles={
'adam':('First name in the genealogy','The book begins with the shared ancestral history later narrowed to Israel.'),
'enoch':('Ancestor between Jared and Methuselah','His name appears without the translation story in Genesis.'),
'noah':('Ancestor of the three listed family branches','The list recalls his sons without retelling the flood.'),
'shem':('Noah’s son in Abraham’s ancestral branch','His line leads through later named ancestors to Abraham.'),
'ham':('Noah’s son in the genealogy of neighboring peoples','The chapter records his descendants without repeating a curse narrative.'),
'japheth':('Noah’s son in the first listed branch','The genealogy situates multiple peoples within the remembered human family.'),
'nimrod':('Mighty figure recalled in Cush’s line','The notice describes power but does not retell a full kingdom history.'),
'abraham':('Ancestor recalled in genealogy and covenant praise','The family list and thanksgiving prayer use him in different settings.'),
'ishmael':('Abraham’s son with a named descendant list','The book preserves his line before returning to Isaac and Israel.'),
'isaac':('Ancestor recalled in the family line and covenant','He connects Abraham with Esau and Israel.'),
'esau':('Ancestor of Edom in the genealogy','His descendants and Edomite rulers extend the list beyond Israel.'),
'jacob':('Israel’s ancestor recalled in families and praise','The personal name Israel in the genealogy differs from the gathered nation later in the book.'),
'judah':('Ancestor of the line leading to David','The genealogy gives his branch particular attention without excluding all other tribes.'),
'tamar':('Mother of Perez and Zerah in Judah’s line','She is Judah’s daughter-in-law, not David’s daughter Tamar.'),
'boaz':('Ancestor between Salma and Obed','The book gives his descent relationship without retelling Ruth’s story.'),
'obed':('Ancestor between Boaz and Jesse','He is not every other Obed named in the warrior and service lists.'),
'jesse':('Father whose children include David','The genealogy also names sisters through whom several officers are related.'),
'david':('King, ark organizer, and preparer of the temple','This book emphasizes community support and worship preparation. Compare Samuel for omitted episodes.'),
'abigail-sister':('David’s sister and Amasa’s mother','She is distinct from Abigail the Carmelite, David’s wife.'),
'joab':('Commander, city builder, and critic of the census','His actions include taking the stronghold, campaigning, and objecting to David’s count.'),
'abishai':('David’s nephew and military commander','He appears among warriors and in cooperation with Joab against Ammon.'),
'asahel':('David’s nephew in the warrior and rotation lists','The roster names his son Zebadiah after him. It does not retell his death.'),
'amasa':('Son of David’s sister Abigail','The genealogy records his parentage without retelling the later conflict.'),
'amnon':('David’s firstborn in the royal family list','The list does not recount his violence against Tamar, found in Samuel.'),
'abigail':('David’s wife in Daniel’s birth notice','The genealogy calls her the Carmelite. She is distinct from David’s sister.'),
'ahinoam-david':('Mother of Amnon in the royal family list','Called the Jezreelitess. She is not automatically Saul’s similarly named wife.'),
'absalom':('David’s son in the genealogy','His mother is Maacah, daughter of Talmai. The book does not retell his rebellion.'),
'adonijah':('David’s son in the genealogy','His mother is Haggith. The list does not narrate his attempted accession.'),
'bathsheba':('Bathshua, mother of four named royal sons','The genealogy calls her Bathshua, daughter of Ammiel. Compare Samuel’s different family wording.'),
'solomon':('Chosen successor charged with building the temple','The book emphasizes preparations, courage, willingness, and public recognition.'),
'tamar-david':('Sister named after David’s sons','She is distinct from Judah’s earlier daughter-in-law Tamar.'),
'caleb':('Son of Jephunneh in families and land notices','He is separate from Caleb son of Hezron in chapter 2.'),
'simeon':('Ancestor of a settlement branch','Later references to Simeon often concern his tribe rather than his individual presence.'),
'reuben':('Firstborn whose family appears east of the Jordan','The opening distinguishes firstborn status from the allocation of birthright.'),
'joseph':('Ancestor whose sons receive the birthright','The text contrasts this status with leadership attributed to Judah.'),
'pul':('Assyrian ruler associated with eastern deportation','The reading uses Pul and Tilgath Pilneser. The guide does not draw exact deportation routes.'),
'jeroboam-ii':('Northern king in a genealogy’s dating notice','The northern royal notice is distinct from Judah’s later officials with similar names.'),
'levi':('Ancestor of priestly and service families','Most later Levi references concern the tribe rather than an individual living during David’s reign.'),
'aaron':('Priestly ancestor recalled in service divisions','His sons’ lines have distinct responsibilities within the book’s presentation.'),
'moses':('Lawgiver and ancestor recalled in worship rules','The ark rules, tabernacle, and descendant lists remember an earlier figure.'),
'miriam':('Daughter of Amram in the Levitical genealogy','She is not another Miriam named in Judah’s list in 4:17.'),
'nadab':('Aaron’s son recalled in priestly succession','Chapter 24 records death and lack of children without Leviticus’ fuller offering account.'),
'abihu':('Aaron’s son recalled in priestly succession','His brief death notice belongs to the explanation of surviving priestly lines.'),
'eleazar':('Aaron’s son whose descendants supply priestly divisions','He is not Eleazar son of Dodo in the warrior list.'),
'ithamar':('Aaron’s son whose descendants share priestly divisions','The chapter distinguishes his family’s eight divisions from Eleazar’s sixteen.'),
'phinehas':('Priestly ancestor and former overseer','The notices recall earlier authority, not his presence after exile.'),
'samuel':('Prophet recalled in ancestry, appointments, and records','The book remembers him in several roles without retelling his complete ministry.'),
'ephraim':('Ancestor in the northern genealogy and mourning account','The family sequence includes grief and the building notice about Sheerah.'),
'manasseh':('Ancestor of northern and eastern family branches','He is not Judah’s later King Manasseh.'),
'joshua':('Son of Nun in Ephraim’s descent line','His presence here is genealogical rather than a new conquest account.'),
'benjamin':('Ancestor of the family line leading to Saul','Later tribal references do not depict him as alive during Saul’s reign.'),
'saul':('First king whose death leads into David’s reign','The book offers a compressed theological evaluation rather than Samuel’s full account.'),
'jonathan-saul':('Saul’s son remembered in genealogy and battle','He is distinct from David’s nephew Jonathan in the later Philistine battle.'),
'mephibosheth-jonathan':('Merib Baal, Jonathan’s son in Saul’s family','The genealogy uses Merib Baal rather than retelling Samuel’s Mephibosheth episodes.'),
'ishbosheth':('Eshbaal, Saul’s son in the family list','The book does not recount his rival kingship, so 10:6 is not a complete fate list.'),
'eleazar-dodai':('Son of Dodo who fights beside David','The warrior’s father is named Dodo here. He is not Aaron’s son Eleazar.'),
'benaiah':('Son of Jehoiada leading David’s guard and a division','He is not the several musicians also named Benaiah in the worship lists.'),
'uriah':('Hittite warrior in David’s list','His presence does not erase the account of David’s actions against him in Samuel.'),
'zadok':('Priest helping organize worship and succession','This profile concerns David’s priest, not every Zadok in genealogies.'),
'abinadab-ark':('Householder associated with the ark’s departure','He is not Saul’s son Abinadab, killed in chapter 10.'),
'uzzah':('Ark attendant who dies during the first journey','The text uses Uzza here and does not give a complete account of his motives.'),
'ahio':('Attendant driving the ark cart','He appears with Uzza. Other Ahio names in genealogies do not establish the same person.'),
'obed-edom':('Gittite householder receiving the ark','His household is blessed. Identity with later gatekeepers remains a question, not an assumed fact.'),
'hiram':('Tyrian ruler supplying David’s house','His building assistance precedes the fuller temple preparations.'),
'abiathar':('Priest called for the ark procession','He is also remembered among counselors. His earlier father differs from his son Ahimelech here.'),
'michal':('Saul’s daughter watching the ark celebration','The chapter gives her response without Samuel’s later exchange with David.'),
'nathan-prophet':('Prophet revising his advice about a temple','He receives a message after initially approving David’s intention. He is not David’s son Nathan.'),
'hadadezer':('King of Zobah opposed by David','The campaign notices report his forces and the dedication of seized resources.'),
'toi':('Tou, king of Hamath sending congratulations','He seeks relations with David after Hadadezer’s defeat.'),
'joram-hamath':('Hadoram, envoy and son of Tou','Chronicles uses Hadoram where Samuel uses Joram. He is not Judah’s or Israel’s King Joram.'),
'hanun':('Ammonite successor who humiliates David’s envoys','The dispute escalates through recruited allies and war.'),
'nahash':('Ammonite king whose death prompts an embassy','David recalls his kindness. The text does not independently establish every detail of earlier identification.'),
'sibbecai':('Warrior killing Sippai and heading a division','The parallel in Samuel names the opponent differently. The difference remains visible.'),
'jonathan-shimei':('David’s nephew who kills the unnamed giant','The account calls his father Shimea. He is not Saul’s son Jonathan.'),
'goliath':('Earlier Philistine warrior recalled through Lahmi','He is a family reference in 20:5, not the opponent killed in this chapter.'),
'gad':('David’s seer announcing judgment and an altar','He is not the tribal ancestor Gad. His named record closes the book.'),
'araunah':('Ornan, Jebusite owner of the purchased altar site','Chronicles calls him Ornan. David insists on payment rather than accepting the site as a gift.'),
'abner':('Earlier commander remembered as a donor','The treasury list recalls his dedicated property rather than a new appearance in David’s final years.'),
'ahithophel':('Counselor in the royal administration list','The roster does not retell his later part in Absalom’s rebellion.'),
'hushai':('David’s friend in the counselor list','The short administrative notice differs from the fuller narrative in Samuel.')}
for p in people:
 if p['id'] in royals:
  p['role']='Judean king recalled in David’s royal descent line'
  p['meaning']='The genealogy names his succession relationship. It does not retell the full reign described in Kings and 2 Chronicles.'
 if p['id'] in roles:p['role'],p['meaning']=roles[p['id']]

# Qualified profiles and exact verse restrictions prevent namesake links.
scopes={
'obed':{2:[12]},
'judah':{2:[1,3,4],5:[2]},'joseph':{5:[1,2]},'simeon':{4:[24]},'reuben':{5:[1,3]},'levi':{6:[1,16,38,43,47],23:[6]},
'jacob':{1:[34],16:[13,17]},'ishmael':{1:[28,29]},'solomon':{3:[5,10],14:[4]},'david':{2:[15],3:[1,9]},
'amnon':{3:[1]},'abigail':{3:[1]},'ahinoam-david':{3:[1]},'absalom':{3:[2]},'adonijah':{3:[2]},'bathsheba':{3:[5]},'tamar-david':{3:[9]},
'jehoram-judah':{3:[11]},'ahaziah-judah':{3:[11]},'joash-judah':{3:[11]},'azariah':{3:[12]},'manasseh-king':{3:[13]},'amon-king':{3:[14]},
'jehoiakim':{3:[15,16]},'jehoiachin':{3:[16,17]},'zedekiah':{3:[15]},'zedekiah-jeconiah':{3:[16]},'josiah':{3:[14,15]},
'judah-tamar':{2:[4]},'tamar':{2:[4]},'caleb-hezron':{2:[18,19,42,46,48,49,50]},'caleb':{4:[15],6:[56]},
'abigail-sister':{2:[16,17]},'joab':{2:[16]},'abishai':{2:[16]},'asahel':{2:[16]},'amasa':{2:[17]},
'saul':{8:[33],9:[39]},'jonathan-saul':{8:[33,34],9:[39,40]},'ishbosheth':{8:[33],9:[39]},'mephibosheth-jonathan':{8:[34],9:[40]},
'phinehas':{6:[4,50],9:[20]},'samuel':{6:[28,33],9:[22]},'heman-singer':{6:[33],15:[17,19],16:[41,42]},'asaph-singer':{6:[39],15:[17,19],16:[5,7,37]},'ethan-singer':{6:[44],15:[17,19]},
'eleazar':{6:[3,4,50],24:[1,3,4,6]},'ithamar':{6:[3],24:[1,3,4,6]},'miriam':{6:[3]},
'benaiah':{11:[22,24],18:[17],27:[5,6]},'jashobeam':{11:[11],12:[6],27:[2]},'amasai-warrior':{12:[18]},
'obed-edom':{13:[13,14],15:[25]},'nathan-prophet':{17:[1,2,3,15],29:[29]},'gad':{21:[9,11,13,18,19],29:[29]},
'zerubbabel':{3:[19]},'shelomith-daughter':{3:[19]},'shallum-gatekeeper':{9:[17,19,31]},'mattithiah-baker':{9:[31]},'meshelemiah':{26:[1,2,9,14]},'hosah':{16:[38],26:[10,16]},'shelomoth-treasurer':{26:[25,26,28]},'shebuel-treasurer':{23:[16],26:[24]},'gershom-moses':{23:[15,16],26:[24]},'eliezer-moses':{23:[15,17],26:[25]}}
aliases={'jacob':['Jacob'],'ishbosheth':['Eshbaal'],'mephibosheth-jonathan':['Merib-baal'],'bathsheba':['Bathshua'],'jehoiachin':['Jeconiah'],'jehoram-judah':['Joram'],'zedekiah':['Zedekiah'],'zedekiah-jeconiah':['Zedekiah'],'caleb-hezron':['Caleb'],'heman-singer':['Heman'],'asaph-singer':['Asaph'],'ethan-singer':['Ethan'],'amasai-warrior':['Amasai'],'chenaniah-music':['Chenaniah'],'ahimelech-abiathar':['Ahimelech','Abimelech'],'joram-hamath':['Hadoram'],'toi':['Tou'],'uzzah':['Uzza'],'araunah':['Ornan'],'elhanan-jair':['Elhanan'],'jonathan-shimei':['Jonathan'],'jashobeam':['Jashobeam'],'shallum-gatekeeper':['Shallum'],'mattithiah-baker':['Mattithiah'],'shelomith-daughter':['Shelomith'],'shelomoth-treasurer':['Shelomoth'],'shebuel-treasurer':['Shebuel'],'gershom-moses':['Gershom'],'eliezer-moses':['Eliezer'],'meshelemiah':['Shelemiah'],'jehiel-treasurer':['Jehiel'],'shemaiah-scribe':['Shemaiah'],'beerah':['Beerah']}
for p in people:
 p['verseScope']={str(k):v for k,v in scopes.get(p['id'],{}).items()}
 p['linkNames']=aliases.get(p['id'],[])
 if p['id']=='joash-judah':p['linkNames']=['Joash']
 if p['id']=='ahaziah-judah':p['linkNames']=['Ahaziah']
 if p['id']=='manasseh-king':p['linkNames']=['Manasseh']
 if p['id']=='amon-king':p['linkNames']=['Amon']
 if p['id']=='benaiah':p['linkNames']=['Benaiah']
 if p['id']=='joram-hamath':p['linkNames']=['Hadoram']
 if p['id']=='araunah':p['linkNames']=['Ornan']
 if p['id']=='uzzah':p['linkNames']=['Uzza']
 if p['id']=='bathsheba':p['relations']='Daughter of Ammiel in 3:5. Mother of four sons of David.'
 if p['id']=='jonathan-shimei':p['relations']='Son of Shimea, David’s brother, in 20:7.'
 if p['id']=='obed-edom-jeduthun':p['verseScope']={'16':[]}
 if p['id']=='obed-edom-gatekeeper':p['verseScope']={'26':[4,8,15]};p['linkNames']=['Obed-Edom']
 if p['id']=='obed-edom':p['linkNames']=['Obed-Edom']
 if p['id']=='jacob':p['name']='Jacob'
 if p['id']=='toi':p['name']='Tou / Toi'
 if p['id']=='joram-hamath':p['name']='Hadoram / Joram, son of Tou'
 if p['id']=='araunah':p['name']='Ornan / Araunah'
 if p['id']=='uzzah':p['name']='Uzza / Uzzah'
 if p['id']=='bathsheba':p['name']='Bathshua / Bathsheba'
 # Corporate or similarly named references in these chapters stay unlinked.
 if p['id'] in ['obed-edom']:
  p['verseScope'].update({'16':[],'26':[]})

places_prior={}
for slug in ['genesis','numbers','joshua','2-samuel','1-kings','2-kings']:
 for q in json.loads((OUT/f'{slug}.json').read_text(encoding='utf-8'))['places']:places_prior[q['id']]=q
places_prior['beth-horon']=place('beth-horon','Beth Horon · upper and lower town region',31.883,35.119,'Two towns named in Sheerah’s building notice.','Broad region marker, not a surveyed construction boundary.',['web','atlas-canaan'])
locs=set(pid for row in rows for pid in row[4].split(','))
places=[dict(places_prior[pid]) for pid in sorted(locs)]
place_scopes={'aram':{1:[],7:[]},'dan':{2:[],27:[]},'gilead':{2:[22],5:[9,10,16],7:[]},'hebron':{2:[],6:[55,57],15:[],23:[],24:[]},'shechem':{7:[28]},'sidon':{1:[]},'gath':{6:[]}}
for p in places:p['verseScope']={str(k):v for k,v in place_scopes.get(p['id'],{}).items()}
profile_places={
 'david':['hebron','jerusalem'],'solomon':['jerusalem'],'joab':['jerusalem','rabbah'],'abishai':['edom','rabbah'],'saul':['gilboa'],'jonathan-saul':['gilboa'],'saul-armor-bearer':['gilboa'],
 'hiram':['tyre'],'hadadezer':['aram'],'toi':['hamath'],'joram-hamath':['hamath'],'hanun':['rabbah'],'nahash':['rabbah'],'shophach':['aram'],
 'uzzah':['kiriath-jearim'],'ahio':['kiriath-jearim'],'abinadab-ark':['kiriath-jearim'],'araunah':['jerusalem'],'ornan-sons':['jerusalem'],'michal':['jerusalem'],
 'sheerah':['beth-horon'],'uriah':['jerusalem'],'benaiah':['jerusalem'],'jashobeam':['hebron'],'amasai-warrior':['ziklag'],'pul':['assyria'],'jehozadak':['babylon'],
 'asaph-singer':['jerusalem'],'heman-singer':['jerusalem','gibeon'],'ethan-singer':['jerusalem'],'jeduthun':['gibeon','jerusalem'],'chenaniah-music':['jerusalem'],'zadok':['jerusalem','gibeon'],'abiathar':['jerusalem'],
 'obed-edom-jeduthun':['jerusalem'],'obed-edom-gatekeeper':['jerusalem'],'shallum-gatekeeper':['jerusalem'],'mattithiah-baker':['jerusalem'],'meshelemiah':['jerusalem'],'hosah':['jerusalem'],'shelomoth-treasurer':['jerusalem'],'shebuel-treasurer':['jerusalem'],'jehiel-treasurer':['jerusalem'],'shemaiah-scribe':['jerusalem'],'ahimelech-abiathar':['jerusalem'],'shavsha':['jerusalem']}
for p in people:p['placeIds']=profile_places.get(p['id'],[])
old=json.loads((OUT/'2-kings.json').read_text(encoding='utf-8'))
sources=[source('web','1 Chronicles · World English Bible','https://ebible.org/engwebp/1CH01.htm','Public-domain reading text for all 29 chapters.','Scripture',limits='Narrated claims do not independently verify dates, quantities, private motives, or appearances.')]+[dict(s) for s in old['sources'] if s['id'] in ['terrain','atlas','atlas-canaan']]
def reviewed(i,title,url,summary,author,year,coverage,scope,limits,category='Scholarly study',perspective='historical',group=None):
 s=source(i,title,url,summary,category,perspective,limits);s.update(author=author,year=year,chapterCoverage=coverage,reviewed='2026-10-05: '+scope)
 if group:s['group']=group
 sources.append(s)
reviewed('tuell-chronicles','First and Second Chronicles · Oxford introduction','https://academic.oup.com/reference/62341/reference-article-abstract/554102424','Tuell describes genealogical memory, David’s temple role, and debates about composition.','Steven Shawn Tuell · Oxford Bibliographies',2023,list(range(1,30)),'Introductory extract and author, revision, and DOI metadata reviewed. DOI 10.1093/obo/9780195393361-0021.','Introductory context only. The complete bibliography and referenced commentaries were unavailable. Authorship and composition dates remain disputed.')
reviewed('luther-chronicles','Summary of 1 Chronicles · Luther Seminary','https://enterthebible.org/courses/1-chronicles/lessons/summary-of-1-chronicles/','The overview reads David’s presentation through worship and the later community’s concerns.','Mark Throntveit · revised Nicholas Schaser',2024,[10,11,13,14,15,17,22,28,29],'Complete main summary, authorship, date, and purpose sections reviewed.','A scholarly teaching overview, not an independent record of each battle or speech. Proposed date and priestly authorship remain hypotheses.')
reviewed('schaser-chronicles','Music, textual differences, and the adversary · Luther Seminary','https://enterthebible.org/courses/2-chronicles/lessons/bible-in-the-world-2-chronicles/','Schaser discusses prophetic music, selective retelling, and alternatives for the adversary in 21:1.','Nicholas Schaser · Luther Seminary',2024,[12,15,16,20,21,24,25],'Sections 4–8, 12, and 16 reviewed. The page states that this material is shared with 1 Chronicles.','A named scholar’s interpretation. The adversary’s identity and later theological applications remain debated. A mistaken Samuel book label is checked against 2 Samuel 24:1.')
reviewed('mcclellan-chronicles','Priestly authority and Chronicles · McClellan interview','https://www.mormonstories.org/how-thoughtful-mormons-stay-dan-mcclellan-part-3/','McClellan proposes that Chronicles reflects competition over priestly authority and cautions against projecting modern categories backward.','Dan McClellan · original interview with John Dehlin',2023,[6,9,15,23,24,25,26],'Original publisher transcript, Priesthood Authority in Biblical Context, 03:06:44–03:12:13 reviewed. Chronicles remarks occur at 03:10:53–03:11:42. Published August 28, 2023.','Interpretive proposal, not proof of every author’s motive. Machine-transcribed text may contain errors. Audio was not checked. Unrelated interview topics are outside this guide.','Scholar commentary',group='mcclellan')
reviewed('japhet-record','I and II Chronicles · university publication record','https://cris.huji.ac.il/en/publications/i-amp-ii-chronicles-a-commentary/','The university verifies Japhet’s commentary and its publication details.','Sara Japhet · Hebrew University of Jerusalem record',1993,[],'Title, author, publisher, publication year, and ISBN record reviewed.','The full commentary was not read. The record verifies the work rather than its arguments.')
sources[4]['citedSourceIds']=['japhet-record']
reviewed('wiki-1-chronicles','Books of Chronicles · Wikipedia','https://en.wikipedia.org/wiki/Books_of_Chronicles','The opening provides book structure and bibliography discovery.','Wikipedia contributors','Reviewed revision',[1,2,3,4,5,6,7,8,9,10],'Opening four paragraphs reviewed at revision 1376868519.','Background only. Author identity, composition date, and chronology are checked against scholarship rather than adopted as certain.','Encyclopedia background')
sources[-1].update(revisionId='1376868519',revisionUrl='https://en.wikipedia.org/w/index.php?oldid=1376868519',license='CC BY-SA 4.0',licenseUrl='https://creativecommons.org/licenses/by-sa/4.0/',citedSourceIds=['japhet-record'])
base='https://www.churchofjesuschrist.org/study/manual/'
reviewed('cfm-chronicles-context','Come, Follow Me 2026 · historical books and perspective',base+'come-follow-me-for-home-and-church-old-testament-2026/20-thoughts?lang=eng','The article explains selective historical narration and explicitly compares Chronicles with Samuel and Kings.','The Church of Jesus Christ of Latter-day Saints',2026,[13,17,19,20,21],'Complete article and notes reviewed, including note 2’s comparison of 1 Chronicles 19–20 with 2 Samuel 10–12.','Book context, not a dedicated 1 Chronicles weekly lesson. Faith applications and historical comparison remain distinct.','Come, Follow Me','lds')
reviewed('lds-chronicles','1 Chronicles 1–29 · Seminary teacher manual',base+'old-testament-seminary-teacher-resource-manual/the-first-book-of-the-chronicles/1-chronicles-1-29?lang=eng','Selected teaching notes address trust, gratitude, seeking God, and records beyond the Bible.','The Church of Jesus Christ of Latter-day Saints',2003,[5,10,16,28,29],'Main introduction, Gospel Principles, parallel-passage chart, and teaching sections reviewed on pages 144–45.','Selected LDS application. Broad claims about later Jewish religion are not adopted. The chart invites comparison, not an assumption that the accounts are identical.','LDS study manual','lds')
lds_notes={5:'The Seminary manual connects these passages with trust and repentance.',10:'The Seminary manual uses Saul’s final notice to discuss trust and obedience.',16:'The Seminary manual connects this song with continuing gratitude and praise.',28:'The Seminary manual emphasizes seeking God and courage in service.',29:'The Seminary manual uses the named records to discuss revelation beyond the Bible.',13:'Come, Follow Me invites comparison of distinct historical perspectives.',17:'Come, Follow Me distinguishes a narrator’s perspective from a complete historical account.',19:'Come, Follow Me specifically compares this story with 2 Samuel 10–12.',20:'Come, Follow Me notes that Chronicles omits negative stories about David.',21:'Come, Follow Me encourages context when historical passages raise difficult questions.'}
notes={1:'Tuell places the genealogies within the book’s larger account of community memory.',6:'McClellan proposes priestly competition as one context for Chronicles’ service traditions.',9:'McClellan warns against assuming ancient priestly arrangements were identical to modern LDS categories.',15:'McClellan’s broader priesthood discussion supplies context, not proof of each appointment.',21:'Schaser discusses heavenly and human adversary readings. This guide retains the translation’s wording and the uncertainty.',24:'Schaser compares the brief death notice with Leviticus rather than treating their presentations as identical.',25:'Schaser connects the chapter’s musical service with prophetic speech.'}
chapters=[]
for n,(title,summary,meaning,pids,locs) in enumerate(rows,1):
 hs=[s['id'] for s in sources if s['perspective']=='historical' and n in s.get('chapterCoverage',[])]
 ls=[s['id'] for s in sources if s['perspective']=='lds' and n in s.get('chapterCoverage',[])]
 chapters.append(dict(chapter=n,title=title,summary=summary,meaning=meaning,people=pids.split(','),places=locs.split(','),sourceIds=['web','atlas-canaan']+hs,lds=dict(text=lds_notes.get(n,'Original study reflection: consider how this chapter connects service, remembered families, and responsibility.'),sourceIds=ls),eventOrder=n,dateLabel='Chapter order · genealogical and historical dates uncertain',historicalNote=notes.get(n,'Chapter order is not a secure historical calendar. Family lists and narrative notices require separate comparison.'),mapNote='Selected named towns and broad reference regions. Genealogies do not establish journeys between every marker.',route=[],routeEvidence='No reconstructed route is assigned to this chapter.'))
finish(dict(id='1-chronicles',bibleCode='1CH',name='1 Chronicles',description='Genealogies · David · the ark · temple preparations · worship service',chapterCount=29,scripture=scripture('1-chronicles','1CH',29),chapters=chapters,people=people,places=places,sources=sources,review=dict(date='2026-10-05',scope='All scripture and chapter-level studies reviewed. Profiles cover selected named and unnamed people, not every genealogical name. Sources record actual reviewed scope.',nextBook='2-chronicles')))
