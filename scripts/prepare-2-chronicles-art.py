"""Reuse matching portraits and preserve exact prompts for new people."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
book=json.loads((OUT/'2-chronicles.json').read_text(encoding='utf8'))
prior={}
for slug in ['genesis','exodus','numbers','1-samuel','2-samuel','1-kings','2-kings','1-chronicles']:
 prior.update(json.loads((OUT/f'{slug}-art.json').read_text(encoding='utf8')))
prior['cyrus']=dict(src='assets/portraits/cyrus-v2.png',generated=True,title='Cyrus · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive portrait reused from Isaiah. Appearance is not verified historical evidence.')
records={p['id']:dict(prior[p['id']]) for p in book['people'] if p['id'] in prior}
women={'mahalath-rehoboam','abihail-rehoboam','azubah','jechiliah','jerushah'}
faces=['round face, shaved cheeks and short curls','broad square face, trimmed beard and cropped hair','long face, thin gray beard and receding hair','angular face, short stubble and loose waves','oval face, pointed beard and short curls','broad nose, full silver beard and swept hair','high cheekbones, clean-shaven face and wavy hair','deep-set eyes, neat beard and dark straight hair']
poses=['close chest-up, turned slightly left','half-body seated portrait, hands relaxed on knees','three-quarter waist-up, standing beside a low wall','side profile, seated on a plain bench','upright half-body, one hand open at waist level','close portrait looking slightly upward','standing waist-up, shoulders turned away and face toward viewer','half-body, seated with loosely folded hands']
colors=['olive and ivory','indigo and copper','plum and pale flax','ochre and slate blue','charcoal and teal','burgundy and sand','cream and deep green','rust and lavender-gray']
settings=['fig leaves and pale morning sky','stone doorway with cool blue shade','hillside in rose dusk','woven tent in soft golden light','sunlit limestone courtyard','olive grove in green-gray afternoon','quiet plaster room in violet shadow','pale hills beneath a blue dawn sky']
special={
 'zerah-cushite':'Mature ancient northeast African man with dark brown skin, broad face, short tight curls and clean-shaven cheeks, modest ochre woven tunic and ivory shawl, standing three-quarter waist-up on a dry green hillside, attentive serious expression, pale blue daylight. No modern national symbols or asserted royal crown.',
 'captive-care-leaders':'Exactly four distinct adult ancient Levantine men, one clean-shaven with short curls, one older with a silver beard, one with a narrow face and dark stubble, one with a broad face and full beard. All fully clothed in modest olive, cream, plum, and blue woven tunics. Standing together beside folded garments, sandals, and simple food baskets, wide waist-up group portrait, quiet compassionate expressions, courtyard in soft daylight. No captives, weapons, restraints, nudity, or distress spectacle.',
 'jeremiah':'Mature Levantine man with an individual long face, deep-set brown eyes, swept graying hair and a short uneven beard, modest muted violet tunic and ivory wrap, close chest-up portrait in three-quarter view, thoughtful solemn expression, olive branches against a cool gray-blue sky. No text, halo, or asserted known likeness.',
 'mahalath-rehoboam':'Adult Levantine woman with a round face and loosely braided dark hair, modest muted rose dress with deep green wrap, standing beside a fig tree, waist-up framing, relaxed attentive expression, pale morning sky.',
 'abihail-rehoboam':'Older Levantine woman with a distinct angular face, silver-threaded dark hair partly under a plum scarf, modest ivory dress and slate-blue wrap, seated on a plain courtyard bench, half-body sideward pose, gentle serious gaze, cool turquoise shade.',
 'azubah':'Mature Levantine woman with a broad face, dark wavy hair under a pale flax scarf, modest ochre dress and rust shawl, close chest-up portrait facing slightly right, composed thoughtful expression, soft lavender-gray plaster wall.',
 'jechiliah':'Adult Levantine woman with an oval face and black braided hair, modest indigo dress and copper wrap, standing three-quarter waist-up beside a low limestone wall, attentive slight smile, olive leaves and clear midday light.',
 'jerushah':'Mature Levantine woman with high cheekbones, dark brown curly hair and a light cream head wrap, modest teal dress with burgundy shawl, seated with folded hands, half-body front framing, reflective gaze, quiet doorway and green plants in golden afternoon light.'}
mp=ROOT/'scripts/2-chronicles-generated-portraits.json'
manifest=json.loads(mp.read_text(encoding='utf8')) if mp.exists() else {}
for j,p in enumerate(book['people']):
 if p['id'] in records or p['id'] in manifest:continue
 desc=special.get(p['id'],f'Adult ancient Levantine man with {faces[j%8]}, {poses[(j//2)%8]}, modest woven clothes in {colors[(j//3)%8]}, {settings[(j//5)%8]}, { ["thoughtful direct gaze","gentle sideward expression","serious lowered gaze","alert listening expression"][j%4]}.')
 prompt=f'Create one finished portrait asset for a Bible study guide: {p["name"]}, {p["role"]}. '+desc+' Painterly realistic illustration with visible brush texture, natural human proportions, plausible ancient clothing, face high enough for a square top-centered crop. Create a distinct individual face. Follow the specified pose, clothing colors, and background. No text, labels, modern objects, medieval armor, halo, graphic violence, or claim of known likeness. One composition, no grid.'
 manifest[p['id']]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/2-chronicles/{p["id"]}.png',mode='built-in image generation')
for pid,item in manifest.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(OUT/'2-chronicles-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Portraits available:',len(records),'Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
