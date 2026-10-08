"""Save passage-specific copy edits in the existing rebuild overlays."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EDITS = {
 'genesis': {
  'chapters.32.meaning': 'Jacob fears meeting Esau and asks God for help. His new name marks a lasting change.',
  'chapters.39.lds': 'Joseph refuses sexual wrongdoing and faces a false charge. How does he stay honest without a reward?',
  'chapters.43.lds': 'Judah accepts responsibility for Benjamin. How does his offer differ from his earlier treatment of Joseph?',
 },
 'exodus': {
  'chapters.6.meaning': 'Harsh work leaves the people too tired to hear hope. God still promises to free them.',
  'chapters.16.meaning': 'The people must trust God for food each day. Gathering limits leave enough for others and allow rest.',
  'chapters.32.meaning': 'The people soon break their agreement with God. Moses asks for mercy, but many people die.',
  'chapters.33.meaning': 'Moses wants more than arrival in the promised land. He asks God to stay with the people.',
 },
 'leviticus': {
  'chapters.5.lds': 'How do admitting wrong, paying for harm, and changing actions work together here?',
  'chapters.16.meaning': 'The yearly ceremony concerns both the holy tent and the people. Only the high priest may enter the inner room.',
 },
 'numbers': {
  'chapters.18.meaning': 'The people supply food for priests and Levites. Those who receive gifts also have duties and limits.',
  'chapters.30.meaning': 'Fathers and husbands can cancel some promises made by women. These rules give family members unequal power.',
 },
 'deuteronomy': {
  'chapters.6.meaning': 'The people must teach these commands at home and while traveling. Comfort can make them forget God’s help.',
  'chapters.9.meaning': 'Moses recalls failures that challenge the people’s pride. His prayers ask God to show mercy.',
  'chapters.15.meaning': 'The rules help people who owe money or serve others. Freedom must come with supplies for a new start.',
  'chapters.25.meaning': 'The rules limit beatings and require honest weights. The marriage rule keeps a dead man’s family name and property.',
  'chapters.26.meaning': 'The people bring crops and recall God’s help. They share food with Levites, foreigners, orphans, and widows.',
  'chapters.17.lds': 'Which rules stop a king from using his power only for himself?',
 },
 'joshua': {
  'chapters.3.meaning': 'The crossing helps the people trust Joshua as they trusted Moses. The exact crossing place remains uncertain.',
  'chapters.17.lds': 'The manual studies the division of land. How does Joshua keep the promise made to Zelophehad’s daughters?',
  'chapters.19.lds': 'The manual studies the division of land. How do the named boundaries help families know their share?',
  'chapters.21.lds': 'The manual connects these towns with support for Levites. How do towns and pasture help them serve?',
 },
 'judges': {
  'chapters.9.lds': 'The manual studies Jotham’s warning. How does Abimelech’s violence help explain the warning about the thorn bush?',
  'chapters.14.lds': 'The Church lesson studies Samson’s choices. How do threats against his wife affect what she does?',
 },
 'ruth': {
  'chapters.2.meaning': 'Gleaning means collecting grain left after harvest. Boaz protects Ruth at work and helps her feed Naomi.',
  'chapters.4.lds': 'Come, Follow Me compares Boaz’s care with Jesus Christ’s power to redeem, or save. How does Boaz help Ruth and Naomi?',
 },
 '1-samuel': {
  'chapters.4.lds': 'The Church lesson examines trust in the ark. Why does carrying the ark fail to protect the army?',
 },
 '2-samuel': {
  'chapters.22.meaning': 'David’s song thanks God for rescue and claims he acted rightly. Earlier chapters also describe David’s harmful choices.',
 },
 '1-kings': {
  'chapters.21.lds': 'How do Ahab and Jezebel use their power against Naboth? What does Elijah say about their actions?',
 },
 '2-kings': {
  'chapters.23.lds': 'Come, Follow Me studies Josiah’s promise to God. Which actions follow his reading of the law?',
 },
 '1-chronicles': {
  'chapters.29.lds': 'The Seminary manual studies named records and revelation beyond the Bible. What do these records tell readers about David’s rule?',
 },
 '2-chronicles': {
  'chapters.5.meaning': 'The ark holds the tablets of God’s agreement with Israel. Music and a cloud mark its arrival in the temple.',
  'chapters.15.meaning': 'Asa renews the agreement with God and removes his grandmother as queen. The agreement threatens death for refusing to seek God.',
  'chapters.23.lds': 'Why does Jehoiada ask the people to promise loyalty to God when Joash becomes king?',
 },
 'ezra': {
  'chapters.2.lds': 'The Seminary introduction describes the families returning from exile, or forced life abroad. What do their gifts help rebuild?',
 },
 'nehemiah': {
  'chapters.1.lds': 'The Seminary lesson studies Nehemiah’s prayer about Jerusalem. What does he ask before he speaks to the king?',
  'chapters.2.lds': 'Come, Follow Me studies Nehemiah’s answer to mockery. What preparations support his call to rebuild?',
  'chapters.3.lds': 'The Seminary lesson connects the repairs with serving God. How do named families share the work?',
  'chapters.4.lds': 'Come, Follow Me studies prayer and work during threats. How do guards and the trumpet help protect workers?',
  'chapters.6.lds': 'Come, Follow Me studies Nehemiah’s response to attempts to stop him. Why does he refuse the proposed meetings?',
  'chapters.8.lds': 'Come, Follow Me studies help with understanding scripture. What do the teachers do after Ezra reads?',
  'chapters.10.lds': 'The Seminary overview studies promises about marriage and Sabbath rest. What supplies do the families also promise?',
  'chapters.13.lds': 'The Seminary overview emphasizes Sabbath rest and keeping promises to God. How do Nehemiah’s actions affect workers and families?',
 },
 'esther': {
  'chapters.1.lds': 'The Seminary lesson starts with the decision to replace Vashti. How do the advisers turn one refusal into rules for wives?',
  'chapters.2.lds': 'Come, Follow Me studies Mordecai’s care for Esther. How does he help her after she becomes queen?',
  'chapters.3.lds': 'Come, Follow Me studies Haman’s anger. How does his anger at Mordecai threaten all the Jews?',
  'chapters.4.lds': 'Come, Follow Me studies courage and fasting. What help does Esther ask for before approaching the king?',
  'chapters.5.lds': 'Come, Follow Me compares Esther’s risk with Haman’s pride. Why do his honors fail to satisfy him?',
  'chapters.6.lds': 'The Seminary lesson recalls the king’s records. How does the saved report change Mordecai’s treatment?',
  'chapters.7.lds': 'Come, Follow Me studies Haman’s choices and their results. How does Esther explain the danger to the king?',
  'chapters.8.lds': 'Come, Follow Me studies fasting during danger. Why must Esther keep asking for help after Haman dies?',
  'chapters.9.lds': 'Come, Follow Me connects Esther’s courage with later joy. How do gifts help people remember the rescue?',
  'chapters.10.lds': 'Mordecai works for his people’s good. Who benefits from the power he receives?',
 },
 'job': {
  'chapters.7.meaning': 'Job keeps speaking to God about his pain. He asks why God watches his short life so closely.',
  'chapters.23.meaning': 'Job insists he kept God’s commands. He still fears God’s power.',
  'chapters.30.meaning': 'People now mock Job in public. Their treatment adds shame to his pain.',
  'chapters.42.meaning': 'The friends need the prayer of the man they accused. Job’s daughters receive property along with their brothers.',
  'chapters.13.lds': 'Come, Follow Me follows the King James Bible’s reading about trusting God. How does that reading differ from the World English Bible here?',
  'chapters.14.lds': 'Come, Follow Me connects this question with resurrection through Jesus Christ. What does Job ask God to remember?',
  'chapters.19.lds': 'Come, Follow Me reads Job’s Redeemer as Jesus Christ. A redeemer saves or defends someone. What help does Job hope for?',
  'chapters.24.lds': 'Come, Follow Me uses other Church scripture to study suffering. Which examples show Job’s concern for people beyond himself?',
  'chapters.38.lds': 'The Seminary lesson connects the joyful sons of God with life before birth. What does God ask Job about creation?',
  'chapters.42.lds': 'The Seminary lesson connects Job’s renewed life with hope after loss. What must the friends do after God corrects them?',
 },
 'psalms': {
  'chapters.2.lds': 'Come, Follow Me connects the anointed king with Jesus Christ. Anointing uses oil to mark a chosen role. What warning does the poem give rulers?',
  'chapters.7.meaning': 'The speaker asks God to judge his actions as well as his enemies’ actions. The heading names Cush the Benjamite in connection with David’s song.',
  'chapters.8.lds': 'Come, Follow Me connects creation with human worth. What care for other creatures does the poem describe?',
  'chapters.17.meaning': 'The speaker asks for protection and invites God to examine his actions.',
  'chapters.18.meaning': 'Storms and shaking ground picture the force of rescue. The heading connects the song with David and Saul.',
  'chapters.20.lds': 'Why do the people trust God more than horses and chariots?',
  'chapters.22.lds': 'The Seminary lesson connects this suffering with Jesus Christ’s crucifixion. Crucifixion means death on a cross. How does the prayer change toward its end?',
  'chapters.24.lds': 'Come, Follow Me connects clean hands and hearts with temple worship. Which actions does the poem require?',
  'chapters.26.meaning': 'The speaker says he has acted rightly. He still asks God to examine his heart.',
  'chapters.26.lds': 'Come, Follow Me studies preparation for temple worship. Which harmful actions does the speaker refuse to join?',
  'chapters.31.meaning': 'The speaker puts his life in God’s hands while still asking for help against enemies.',
  'chapters.31.lds': 'The Seminary lesson connects this prayer with Jesus Christ’s words. What help does the speaker still request?',
  'chapters.34.lds': 'The Seminary lesson connects the unbroken bones with Jesus Christ. What does the poem teach about seeking peace?',
  'chapters.49.lds': 'Come, Follow Me connects rescue from death with Jesus Christ. What does the poem say wealth cannot buy?',
  'chapters.50.meaning': 'God asks for thanks and honest actions. Offerings cannot excuse theft or harmful speech.',
  'chapters.51.lds': 'Come, Follow Me studies forgiveness and a renewed heart. What changes does the speaker ask God to make?',
  'chapters.62.meaning': 'The speaker waits quietly for God. He warns people against gaining wealth by harming others.',
  'chapters.69.meaning': 'The speaker feels alone and angry. He asks God to punish enemies as well as rescue him.',
  'chapters.72.meaning': 'The prayer asks the king to protect poor people from harm. The heading names Solomon.',
  'chapters.75.meaning': 'Raised horns picture strength, like an animal’s horns. The poem warns proud people that God will judge them.',
  'chapters.76.meaning': 'God’s judgment saves people who suffer and stops armed warriors.',
  'chapters.80.lds': 'How do the vine’s broken walls picture a people open to attack?',
  'chapters.82.summary': 'God confronts rulers who fail the poor. He orders them to protect people facing harm.',
  'chapters.82.meaning': 'McClellan reads these rulers as other gods. In his reading, God judges their failure to protect the poor.',
  'chapters.87.meaning': 'The list counts people from other nations as born in Zion. Rahab here is a poetic name for Egypt.',
  'chapters.87.lds': 'How does counting people from other nations as born in Zion change who belongs?',
  'chapters.88.meaning': 'The final line gives no relief from pain. The heading names Heman the Ezrahite and the sons of Korah.',
  'chapters.93.meaning': 'The floods roar, but God’s rule stands firm. The water’s force helps show his greater power.',
  'chapters.99.meaning': 'God answers Moses, Aaron, and Samuel. His answers include forgiveness and punishment for wrongdoing.',
  'chapters.100.meaning': 'The people give thanks because they belong to God. His care continues through the generations.',
  'chapters.103.meaning': 'God remembers that people are weak and their lives are short. He treats them with mercy.',
  'chapters.104.meaning': 'God supplies water and food for many creatures. People also depend on these gifts.',
  'chapters.104.lds': 'How do water, plants, animals, and people depend on one another in this poem?',
  'chapters.110.meaning': 'The poem describes a king and a priest together. Christian readers connect these roles with Jesus Christ.',
  'chapters.110.lds': 'Come, Follow Me connects the king and priest with Jesus Christ. What duties do these roles carry?',
  'chapters.111.meaning': 'Remembering God’s gifts leads the people to obey his commands.',
  'chapters.111.lds': 'How should remembering God’s gifts affect what people do?',
  'chapters.114.meaning': 'The poem pictures water and mountains moving before God. These images recall rescue from Egypt and water in the wilderness.',
  'chapters.118.lds': 'Come, Follow Me connects the rejected stone with Jesus Christ. How does the stone’s place change?',
  'chapters.119.lds': 'The Seminary lesson explains the Hebrew alphabet sections. Come, Follow Me studies scripture as guidance. What help does the speaker request while facing hardship?',
  'chapters.124.lds': 'What do the flood and trap images show about the danger the people escaped?',
  'chapters.127.lds': 'The Seminary lesson studies a home built with the Lord’s help. Why does the poem question anxious work?',
  'chapters.128.meaning': 'The poem links food and peace at home with peace for Jerusalem.',
  'chapters.129.meaning': 'Plowing across a person’s back pictures cruel treatment. The people survive, but the image shows how deeply they suffered.',
  'chapters.129.lds': 'What does the image of plowing across people’s backs show about their suffering?',
  'chapters.131.meaning': 'A weaned child no longer drinks its mother’s milk. Resting beside her pictures calm trust without demands for greatness.',
  'chapters.139.lds': 'Come, Follow Me studies being known by God. Why does the speaker end by asking God to examine his heart?',
  'chapters.142.lds': 'How would joining people who give thanks change the speaker’s loneliness?',
  'chapters.145.meaning': 'The poem describes God’s rule through his care. He helps weak people and feeds living creatures.',
 }
}

for slug, edits in EDITS.items():
    path = ROOT / 'scripts/book-copy-round2' / f'{slug}.json'
    prior = json.loads(path.read_text(encoding='utf8')) if path.exists() else {}
    prior.update(edits)
    path.write_text(json.dumps(prior, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
print(f'Saved {sum(map(len, EDITS.values()))} reviewed edits across {len(EDITS)} books.')
