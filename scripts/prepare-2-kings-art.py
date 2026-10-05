"""Keep original images and varied portrait prompts; reuse only matching identities."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
book=json.loads((OUT/'2-kings.json').read_text(encoding='utf-8'))
prior={}
for slug in ['genesis','exodus','1-samuel','2-samuel','1-kings']:
 prior.update(json.loads((OUT/f'{slug}-art.json').read_text(encoding='utf-8')))
records={p['id']:dict(prior[p['id']]) for p in book['people'] if p['id'] in prior}
isaiah={'azariah':'uzziah','jotham':'jotham','pekah':'pekah','rezin':'rezin','ahaz':'ahaz','hezekiah':'hezekiah','sennacherib':'sennacherib','rabshakeh':'rabshakeh','eliakim':'eliakim','hebna':'shebna','joah':'joah','isaiah':'isaiah','esarhaddon':'esarhaddon','merodach-baladan':'merodach-baladan','nebuchadnezzar':'nebuchadnezzar'}
for pid,asset in isaiah.items():
 records[pid]=dict(src=f'assets/portraits/{asset}-v2.png',generated=True,title=pid+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Reused for the same person depicted in Isaiah. Appearance and setting remain artistic interpretations.')
special={
'oil-widow':'Adult Levantine woman in a modest indigo dress and cream headcloth, seated beside a small earthen oil jar, one hand resting on a vessel, concerned but composed face, half-body framing, quiet domestic courtyard with warm copper light. No poverty spectacle.',
'oil-sons':'Two distinct healthy Levantine children of different apparent ages, fully clothed in plain flax and muted green tunics, carrying small safe earthen vessels together, curious and attentive expressions, wide waist-up framing, shaded courtyard with turquoise light. Their exact ages are artistic choices. No debt bondage scene.',
'shunammite-woman':'Mature Levantine woman with dark wavy hair and gray threads, modest deep plum robe and ivory shawl, standing upright near a stone doorway with an open welcoming hand, confident thoughtful face, three-quarter figure, fig garden in gentle afternoon light.',
'shunammite-husband':'Older Levantine man with a silver beard, cream tunic and muted rust wool mantle, seated on a low farm bench, relaxed hands on knees, attentive sideways gaze, half-body portrait, distant cultivated fields in golden light.',
'shunammite-son':'Healthy Levantine child with dark curly hair, fully clothed in a plain slate-blue tunic, seated safely beside a folded woven blanket, calm curious gaze, chest-up portrait, pale rose domestic light. No illness, injury, death, or resurrection scene.',
'gehazi':'Adult Levantine attendant with short curly beard, olive tunic and dusty cream mantle, standing beside a stone passage holding a folded cloth bundle, guarded thoughtful gaze, waist-up profile, cool lavender morning light. No disfiguring medical depiction.',
'naaman':'Mature ancient Syrian commander with dark curly beard, modest deep red tunic and simple dark bronze belt, seated upright beside a travel chest, thoughtful direct gaze, waist-up framing, Damascus courtyard with blue evening shadows. No skin injury, medieval armor, or modern military symbols.',
'naaman-wife':'Adult ancient Syrian woman with dark braided hair, fully clothed in a long ochre dress and muted turquoise shawl, seated listening with hands visible, attentive kind expression, half-body profile, shaded stone garden. No invented personal name.',
'captive-girl':'Healthy fully clothed young Levantine girl in a simple cream tunic and soft blue wrap, standing upright beside a courtyard water vessel, thoughtful attentive expression, chest-up framing, warm pale stone and green leaves. Respectful child portrait. No restraints, distress spectacle, or sexualization.',
'samaria-women':'Two distinct fully clothed adult Levantine women, one wearing a faded blue robe and cream scarf and the other a muted terracotta dress and olive wrap, standing apart in a city courtyard, serious concerned expressions, wide waist-up framing, gray-blue daylight. No violence, starvation, corpse, or child harm.',
'four-men':'Four distinct adult and older Levantine men with varied faces and dark or gray beards, fully clothed in modest woven robes in cream, ochre, blue, and olive, gathered outside a stone city gate, alert hopeful expressions, wide half-body group portrait, cool dawn. Respectful depiction. No skin wounds or illness spectacle. Exactly four people.',
'joash-judah':'Healthy fully clothed Levantine royal child about seven years old with curly dark hair, simple ivory tunic and muted blue mantle, seated upright beside a carved wooden chair, small restrained bronze headband, cautious attentive expression, waist-up framing, temple courtyard in golden morning light. No adult beard, modern crown, or harm.',
'joash-nurse':'Adult Levantine caregiver with dark hair beneath a soft gray scarf, modest warm brown dress and cream shawl, holding a folded blanket in both hands, gentle attentive expression, half-body portrait, quiet sheltered stone room in amber lamplight. No claim of a known appearance.',
'jehosheba':'Young adult Levantine royal woman with dark braided hair, modest olive-green dress and muted gold shawl, standing at a shaded doorway holding a safely swaddled infant, protective composed face, three-quarter framing, cool blue and pale stone background. No threat or violence.',
'athaliah':'Older Levantine royal woman with silver-threaded dark braids, modest burgundy robe and deep blue mantle, restrained bronze jewelry, seated upright with a firm evaluating gaze, waist-up framing, Jerusalem limestone portico in pale dusk. No demonic imagery or caricature.',
'huldah':'Mature Levantine woman with gray-threaded dark hair beneath a light woven scarf, modest teal robe and ivory mantle, seated with one hand open while speaking, steady thoughtful expression, half-body framing, Jerusalem courtyard with warm afternoon light. A dignified prophet, no halo or magical effects.',
'mesha':'Adult ancient Moabite king with dark beard, cream tunic and muted rust mantle, restrained narrow bronze headband, standing with one hand on a simple wooden staff, serious watchful face, three-quarter framing, rocky upland landscape in copper evening light. No sacrifice scene.',
'mesha-son':'Healthy fully clothed young adult man from the broad ancient Moab region, short dark hair and beard, plain slate-blue tunic and cream outer cloth, upright attentive posture, close half-body portrait, quiet upland stone courtyard. His age and appearance are artistic choices. No harm or sacrifice scene.',
'tirhakah':'Adult ancient Kushite ruler with deep brown skin and short tightly curled hair, modest cream linen tunic and muted saffron mantle, restrained bronze jewelry, standing upright with a thoughtful direct gaze, three-quarter figure, Nile-region palms in warm morning light. No modern national symbols or fantasy headdress.',
'necho':'Mature ancient Egyptian ruler with warm brown skin and short dark hair, modest cream linen garment and muted turquoise mantle, restrained bronze headband, seated upright with a reserved sideways gaze, half-body framing, shaded palace column in soft gold light. No elaborate fantasy crown.'}
women={'oil-widow','shunammite-woman','naaman-wife','captive-girl','athaliah','jehosheba','joash-nurse','zibiah','jehoaddan','abi','hephzibah','meshullemeth','huldah','jedidah','hamutal','zebidah','nehushta'}
older={'shunammite-husband','jehoiada','hilkiah-priest','shaphan','huldah','evil-merodach','shalmaneser'}
assyrian={'pul','shalmaneser','tartan','rabsaris','adramelech','sharezer'}
babylonian={'nebuzaradan','evil-merodach'}
poses=['close face-and-shoulders profile looking left','waist-up seated pose with hands visible','three-quarter standing figure turned toward viewer','chest-up three-quarter portrait looking right','half-body walking pose with face visible','waist-up standing beside a plain wooden post','close frontal portrait with level gaze','half-body seated pose turned slightly away']
colors=['muted rust and cream','deep sapphire and flax','olive green and pale sand','muted plum and ivory','ochre and slate blue','pale gray and burgundy','charcoal and soft teal','soft indigo and copper']
settings=['olive hillside in golden morning','shaded courtyard with turquoise light','blue hills under rose dusk','woven tent backdrop in warm lamplight','fig garden in soft afternoon','weathered limestone under lavender dawn','quiet portico under a pale sky','stone doorway with green leaves']
expressions=['calm attentive expression','serious thoughtful gaze','reserved sideways gaze','quiet concerned expression','firm composed expression','reflective lowered gaze','alert questioning expression','gentle listening expression']
mp=ROOT/'scripts/2-kings-generated-portraits.json'
m=json.loads(mp.read_text(encoding='utf-8')) if mp.exists() else {}
for j,p in enumerate(book['people']):
 if p['id'] in records or p['id'] in m:continue
 gender='woman' if p['id'] in women else 'man'
 age='older' if p['id'] in older else 'adult'
 region='Assyrian' if p['id'] in assyrian else 'Babylonian' if p['id'] in babylonian else 'Levantine'
 desc=special.get(p['id'],f'{age.capitalize()} ancient {region} {gender} with a distinct natural face, dark or gray-threaded hair, {poses[j%8]}, modest woven clothes in {colors[(j//2)%8]}, {settings[(j//3)%8]}, {expressions[(j//5)%8]}. Restrained bronze headband only for a named king, no elaborate crown.')
 prompt=f'Create one finished portrait asset for a Bible study guide: {p["name"]}, {p["role"]}. '+desc+' Painterly realistic interpretive illustration with visible brush texture, natural human proportions and plausible ancient clothing. Keep the face high enough for a square top-centered crop. No text, labels, modern objects, medieval armor, halo, graphic violence, or claim of known likeness. Single portrait composition, no grid.'
 m[p['id']]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/2-kings/{p["id"]}.png',mode='built-in image generation')
for pid,item in m.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
mp.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(OUT/'2-kings-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Portraits available:',len(records),'Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
