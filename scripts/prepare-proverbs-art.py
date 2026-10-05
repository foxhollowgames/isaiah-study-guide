"""Prepare varied interpretive portraits and retain reviewed reused art."""
import json
from book_common import ROOT,OUT
book=json.loads((ROOT/'review/proverbs-draft.json').read_text(encoding='utf8'))
reuse=json.loads((ROOT/'scripts/proverbs-art-reuse.json').read_text(encoding='utf8'))
records={i:dict(json.loads((OUT/(slug+'-art.json')).read_text(encoding='utf8'))[pid]) for i,(slug,pid) in reuse.items()}
scenes={
'parents-proverbs':'Two adult ancient Near Eastern parents. A silver-bearded father seated in side view and a middle-aged woman with dark braided hair standing beside him. Half-body framing, warm attentive expressions, sage and cream woven clothing, clay courtyard, soft golden afternoon light.',
'wisdom-proverbs':'One adult ancient Near Eastern woman representing poetic Woman Wisdom. Broad face, strong nose, brown eyes, black curls with gray strands. Standing waist-up three-quarter view facing right, open hand in teaching gesture. Modest deep blue robe and copper shawl, alert confident expression. Public stone gateway with pale turquoise sky and trees. No halo or divine symbol.',
'folly-proverbs':'One adult ancient Near Eastern woman representing poetic Woman Folly. Round face, short loose black curls, dark eyes, faint knowing smile. Seated chest-up near profile facing left. Modest plum and gray woven clothing, shadowed plaster doorway, warm red-brown wall and muted olive distant light. No villain costume.',
'unfaithful-woman-proverbs':'One adult ancient Near Eastern woman representing the unnamed woman in the teaching warnings. Long angular face, brown eyes, dark braided hair. Standing half-body turned left and looking sideways, restrained inviting expression. Fully modest high-necked rust robe and pale gold shawl. Evening lane with indigo sky and pale limestone walls. No sexualized clothing or pose.',
'young-learner-proverbs':'One young adult ancient Near Eastern man, clean-shaven, narrow face, wavy dark hair, brown eyes. Waist-up side view walking left and looking back with curious uncertain expression. Modest sage tunic and cream outer cloth. Dusty street with pale rose plaster walls, cool blue dusk. Natural hands, no weapon.',
'agur':'One older ancient Near Eastern man representing Agur. Wide cheekbones, gray beard, short curly gray-black hair. Seated chest-up facing front slightly angled right, thoughtful humble expression. Modest charcoal tunic and muted teal shawl. Quiet rock terrace, pale lavender hills and morning light.',
'agur-named-men':'Exactly three distinct adult ancient Near Eastern men representing names in Proverbs 30:1, without claiming known likeness. An elderly silver-bearded man seated left, middle-aged dark-bearded man standing center, young clean-shaven man angled right. Half-body group composition, olive, ochre, cream clothing, calm listening expressions. Pale stone shaded courtyard, blue-gray trees.',
'lemuel':'One mature ancient Near Eastern male ruler representing Lemuel. Long face, short black beard, tightly curled hair, brown eyes. Standing chest-up nearly in profile facing right, serious attentive expression. Modest cream robe and dark burgundy mantle, simple woven gold-trimmed headband. Pale stone audience room with green courtyard light. No extravagant crown.',
'lemuel-mother':'One older ancient Near Eastern woman representing Lemuel’s mother. Broad face, expressive brown eyes, silver-black braids, fine age lines. Seated waist-up three-quarter left view, one open hand advising. Modest dark olive dress and copper scarf, firm caring expression. Pale blue plaster room and cream window light.',
'capable-woman-proverbs':'One mature ancient Near Eastern woman representing the capable woman of Proverbs 31. Oval face, brown eyes, black hair tied in a low braid. Half-body standing near a textile loom, hands resting separately on woven cream fabric. Modest plum tunic and sage shawl, relaxed confident smile. Warm ochre workshop, garden vine visible through a stone opening, pale morning sky.'}
path=ROOT/'scripts/proverbs-generated-portraits.json'
manifest=json.loads(path.read_text(encoding='utf8')) if path.exists() else {}
for p in book['people']:
 if p['id'] in records:continue
 manifest.setdefault(p['id'],dict(name=p['name'],prompt='Create one finished Bible study portrait. '+scenes[p['id']]+' Painterly realistic illustration with visible brush texture, natural anatomy and modest ancient clothing. Keep faces in upper half for square top-centered crop. Single composition, no grid, visible writing, modern objects, medieval armor or halos. Artistic interpretation, no claim of verified appearance.',src='assets/portraits/proverbs/'+p['id']+'.png',mode='built-in image generation'))
for pid,item in manifest.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(OUT/'proverbs-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Prepared',len(manifest),'new portraits. Available:',len(records))
