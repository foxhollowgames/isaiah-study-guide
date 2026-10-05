"""Record varied portrait prompts. Reuse portraits only for the same person."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
book=json.loads((OUT/'1-kings.json').read_text(encoding='utf-8'))
old=json.loads((OUT/'2-samuel-art.json').read_text(encoding='utf-8'))
records={p['id']:dict(old[p['id']]) for p in book['people'] if p['id'] in old and p['id']!='solomon'}
special={
'solomon':'Adult Levantine king with a short dark beard, seated facing slightly left on a simple carved wooden chair, restrained narrow bronze headband, ivory tunic and deep sapphire mantle, attentive questioning expression, temple construction stones blurred behind him, waist-up framing in golden morning light. No infant or medieval crown.',
'abishag':'Young adult Levantine woman, fully clothed in a long soft ochre linen dress and olive-green shawl, standing in a quiet stone doorway holding a folded blanket, composed direct expression, dark braided hair, three-quarter figure in cool morning shadows. No intimate scene or sexualization.',
'judgment-women':'Two distinct fully clothed adult Levantine women standing together in a simple stone courtyard, one in a rust dress and cream shawl gently holding a safely swaddled living infant, the other in slate-blue and muted olive cloth, both dignified with different thoughtful expressions, waist-up framing and soft daylight. No weapon, injury, caricature, or sexualization.',
'pharaoh-daughter-solomon':'Adult ancient Egyptian royal woman with warm brown skin and dark braided hair, modest ivory woven dress and muted turquoise wrap, small restrained bronze jewelry, seated upright near a shaded Jerusalem limestone doorway, thoughtful reserved gaze, half-body framing and cool blue light. No identification with the Exodus princess, no modern makeup or elaborate fantasy headdress.',
'queen-sheba':'Adult royal woman from a broadly south Arabian setting, deep brown skin, dark textured hair beneath an indigo woven veil, long cream dress with saffron outer cloth, small bronze jewelry, standing beside a travel chest, one hand open in a questioning gesture, confident thoughtful expression, three-quarter framing, warm sunlight and desert hills. No claim of a verified national identity or modern flag.',
'hiram-artisan':'Adult Levantine bronze worker with a curly dark beard, plain cream tunic and dark green work apron, sleeves rolled modestly, seated near a bronze bowl and hand tools, hands visible, careful attentive expression, chest-up three-quarter portrait, workshop shadows and warm copper light. No royal crown, no medieval machinery.',
'ahijah-shiloh':'Older Levantine man with a gray beard and clouded unfocused eyes, seated comfortably with one hand on a walking staff, undyed wool mantle over muted blue tunic, calm thoughtful expression, fig-tree courtyard in soft afternoon light, close half-body portrait. Respectful portrayal without caricature of blindness.',
'tahpenes':'Mature ancient Egyptian woman in a modest cream linen dress and burgundy shawl, warm brown skin, dark hair with gray threads, seated beside a plain palace column, small bronze earrings, reflective expression, waist-up profile turned toward viewer, amber indoor light.',
'genubath':'Healthy ancient child about eight years old with warm brown skin and dark curly hair, fully clothed in a simple flax tunic with a muted blue wrap, seated on a courtyard bench, curious expression, close half-body portrait, palms and warm pale stone background. No crown or invented royal insignia.',
'abijah-child':'Healthy Levantine child around nine years old, dark wavy hair, simple cream tunic and green mantle, seated safely with hands resting on knees, quiet thoughtful face, close half-body framing, soft lavender courtyard shadows. No illness, death, injuries, or invented regalia.',
'jeroboam-wife':'Adult Levantine woman wearing a plain dusty gray headcloth and modest ochre dress, holding a small covered bread basket, standing on a shaded path, worried thoughtful face, chest-up framing, green hills and cool dawn light. No comic disguise or fantasy costume.',
'naamah':'Mature woman from the broad ancient Ammon region, olive-brown skin and gray-threaded dark hair, muted plum dress and cream woven shawl, seated upright beside a clay lamp, thoughtful sideways gaze, close portrait in warm evening light. No invented ethnic symbols.',
'maacah-queen':'Older Levantine royal woman with silver-threaded dark braids, muted teal dress and charcoal mantle, seated near a weathered limestone wall, firm reserved expression, small bronze necklace, half-body framing in pale rose dusk. No modern crown or invented cult object.',
'zarephath-widow':'Adult Levantine woman in a modest faded indigo dress and cream scarf, seated beside an earthen flour jar and small oil vessel, dark wavy hair, attentive face with gentle concern, waist-up framing, shaded coastal courtyard and soft turquoise daylight. No starvation spectacle.',
'zarephath-son':'Healthy Levantine child about seven years old with dark curly hair, fully clothed in a plain terracotta tunic, sitting upright beside a simple woven blanket, bright curious gaze, chest-up portrait, warm domestic light and muted green background. No illness or death.',
'elijah':'Mature Levantine man with a thick graying beard and windswept dark hair, coarse earth-brown wool mantle over cream tunic, seated on a rock with relaxed hands and reflective tired gaze, half-body framing, olive hillside under a pale blue dawn. No halo, lightning effects, or violence.',
'elisha':'Adult Levantine farmer with short dark hair and beard, dusty ochre tunic and muted blue wool mantle newly draped over shoulders, standing beside a simple wooden plow, open attentive expression, three-quarter figure, cultivated field in soft spring morning light. No modern farm machinery.',
'obadiah-palace':'Adult Levantine official with a neatly trimmed beard, muted olive robe and pale blue sash, holding a folded cloth bundle, half-body walking portrait, guarded attentive gaze, shaded stone passage and cool lavender light. No scroll text or invented royal badge.',
'naboth':'Mature Levantine vineyard owner with a salt-and-pepper beard, cream tunic and rust shawl, standing beside grape leaves with one hand resting on a wooden stake, firm calm expression, waist-up framing, deep green vineyard and warm afternoon light. No attack or injuries.',
'micaiah':'Adult Levantine man with short dark beard, plain slate-blue tunic and cream mantle, standing upright with one open hand in a speaking gesture, steady serious gaze, chest-up three-quarter framing, stone council doorway with cool turquoise shadows. No horns, chains, or fantasy vision.',
'zedekiah-chenaanah':'Adult Levantine man with a short curled beard, dark red mantle over flax tunic, holding two small plain iron horn-shaped objects at waist height, confident intent expression, half-body portrait, warm stone council setting. No horned helmet or graphic scene.',
'ahab-prophets':'Respectful group portrait of three distinct fully clothed adult Levantine men of different ages, modest woven robes in cream, blue, and brown, gathered in a shaded courtyard, one speaking with an open hand and others listening, wide waist-up framing, afternoon light. This represents several unnamed speakers without claiming exactly three historical individuals.',
'jezebel':'Adult royal Levantine woman with dark braided hair, burgundy dress and muted gold shawl, restrained bronze jewelry, seated upright with a firm evaluating gaze, half-body framing, Samaria stone courtyard and cool blue evening light. No sexualization, demonic imagery, or modern makeup.'}
poses=['close face-and-shoulders profile looking left','waist-up seated portrait with hands visible','three-quarter standing portrait with head turned toward viewer','chest-up three-quarter portrait looking right','half-body walking figure with face clearly visible','waist-up leaning lightly beside a wooden post','close frontal portrait, level thoughtful gaze']
colors=['muted rust and cream','deep blue and flax','olive green and pale sand','muted plum and ivory','ochre and slate blue','pale gray and burgundy','charcoal and soft teal']
settings=['olive hillside in golden morning','shaded courtyard with cool turquoise light','distant blue hills under rose dusk','woven tent backdrop in copper lamplight','fig garden in soft afternoon light','weathered limestone under lavender dawn','quiet stone portico under a pale sky']
expressions=['calm attentive expression','serious thoughtful gaze','reserved sideways gaze','quiet concerned expression','firm composed expression','reflective lowered gaze','alert questioning expression']
women={'abishag','pharaoh-daughter-solomon','queen-sheba','tahpenes','jeroboam-wife','naamah','maacah-queen','jezebel','zarephath-widow'}
older={'ahijah-shiloh','shemaiah','maacah-queen','bethel-old-prophet','ben-hadad-asa','asa'}
mp=ROOT/'scripts/1-kings-generated-portraits.json'
m=json.loads(mp.read_text(encoding='utf-8')) if mp.exists() else {}
for j,p in enumerate(book['people']):
 if p['id'] in records or p['id'] in m:continue
 desc=special.get(p['id'])
 if not desc:
  gender='woman' if p['id'] in women else 'man'
  age='older' if p['id'] in older else 'adult'
  desc=f'{age.capitalize()} ancient Levantine {gender}, naturally distinct face and dark or gray-threaded hair, {poses[j%7]}, modest woven clothing in {colors[(j//2)%7]}, {settings[(j//3)%7]}, {expressions[(j//5)%7]}. Restrained bronze headband only if portraying a named king, no elaborate crown.'
 prompt=f'Create one finished portrait asset for a Bible study guide: {p["name"]}, {p["role"]}. '+desc+' Painterly realistic interpretive illustration with visible brush texture, natural human proportions and plausible ancient clothing. Keep face high enough for a square top-centered crop. No text, labels, modern objects, medieval armor, halo, graphic violence, or claim of known likeness. Single portrait composition, no grid.'
 m[p['id']]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/1-kings/{p["id"]}.png',mode='built-in image generation')
for pid,item in m.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
mp.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(OUT/'1-kings-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Portraits available:',len(records),'Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
