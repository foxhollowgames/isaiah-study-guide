"""Preserve varied Ezra portrait prompts and reuse only matching identities."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
book=json.loads((OUT/'ezra.json').read_text(encoding='utf8'))
prior={}
for slug in ['genesis','exodus','numbers','1-samuel','2-samuel','1-kings','2-kings','1-chronicles','2-chronicles']:
 prior.update(json.loads((OUT/f'{slug}-art.json').read_text(encoding='utf8')))
records={p['id']:dict(prior[p['id']]) for p in book['people'] if p['id'] in prior}
faces=['round face, shaved cheeks and short curls','broad square face, trimmed beard and cropped hair','long face, thin gray beard and receding hair','angular face, short stubble and loose waves','oval face, pointed beard and short curls','broad nose, full silver beard and swept hair','high cheekbones, clean-shaven face and wavy hair','deep-set eyes, neat beard and dark straight hair']
poses=['close chest-up, turned slightly left','half-body seated portrait, hands relaxed on knees','three-quarter waist-up, standing beside a low wall','side profile, seated on a plain bench','upright half-body, one hand open at waist level','close portrait looking slightly upward','standing waist-up, shoulders turned away and face toward viewer','half-body, seated with loosely folded hands']
colors=['olive and ivory','indigo and copper','plum and pale flax','ochre and slate blue','charcoal and teal','burgundy and sand','cream and deep green','rust and lavender-gray']
settings=['fig leaves and pale morning sky','stone doorway with cool blue shade','hillside in rose dusk','woven tent in soft golden light','sunlit limestone courtyard','olive grove in green-gray afternoon','quiet plaster room in violet shadow','pale hills beneath a blue dawn sky']
special={
 'returning-families':'Group portrait of four distinct ancient Levantine adults, two women and two men, fully clothed in modest cream, blue, olive, and rust woven clothes. One older woman stands upright, a younger woman sits beside a basket, a clean-shaven man faces sideways, and an older bearded man stands behind. Waist-up framing, calm hopeful expressions, courtyard and distant hills in pale dawn light. No text or spectacle.',
 'foreign-wives-children':'Respectful family portrait of two distinct adult ancient Near Eastern women and two children, all fully clothed in modest woven clothes. An older woman with a round face and plum shawl sits beside a younger angular-faced woman in teal and cream. One child stands beside each woman. Half-body framing, thoughtful composed expressions, green plants beside a shaded ochre plaster wall. Individual beliefs and national appearance are not asserted. No distress spectacle, nudity, text, or modern objects.',
 'marriage-objectors':'Portrait of exactly two distinct adult ancient Levantine men, one clean-shaven with a long face and dark short curls, the other older with a broad face and silver beard. Modest muted blue and olive woven tunics, standing at different angles beside a limestone doorway, waist-up framing, serious attentive expressions, cool afternoon light.',
 'darius-ezra':'Mature ancient Persian man with a broad angular face, carefully curled dark beard, modest embroidered plum robe and pale flax head covering, seated three-quarter waist-up beside a plain wooden chair, thoughtful direct gaze, warm plaster room with turquoise shadow. No asserted known likeness or exact archaeological costume.',
 'ahasuerus-ezra':'Adult ancient Persian man with high cheekbones, dark wavy hair and neat short beard, modest copper and deep green woven robe, close chest-up sideward pose, alert listening expression, pale courtyard wall and soft olive leaves.',
 'artaxerxes-ezra':'Older ancient Persian man with a distinct long face, silver-threaded beard and dark hair, modest indigo robe and ivory wrap, standing waist-up with one hand relaxed, composed serious expression, ochre doorway with pale blue morning light.'}
mp=ROOT/'scripts/ezra-generated-portraits.json'
manifest=json.loads(mp.read_text(encoding='utf8')) if mp.exists() else {}
for j,p in enumerate(book['people']):
 if p['id'] in records or p['id'] in manifest:continue
 desc=special.get(p['id'],f'Adult ancient Levantine man with {faces[j%8]}, {poses[(j//2)%8]}, modest woven clothes in {colors[(j//3)%8]}, {settings[(j//5)%8]}, {["thoughtful direct gaze","gentle sideward expression","serious lowered gaze","alert listening expression"][j%4]}.')
 prompt=f'Create one finished portrait asset for a Bible study guide: {p["name"]}, {p["role"]}. '+desc+' Painterly realistic illustration with visible brush texture, natural human proportions, plausible ancient clothing, face high enough for a square top-centered crop. Create a distinct individual face. Follow the specified pose, clothing colors, and background. No text, labels, modern objects, medieval armor, halo, graphic violence, or claim of known likeness. One composition, no grid.'
 manifest[p['id']]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/ezra/{p["id"]}.png',mode='built-in image generation')
for pid,item in manifest.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(OUT/'ezra-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Portraits available:',len(records),'Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
