"""Reuse matching people and prepare varied interpretive portrait assets."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
book=json.loads((OUT/'1-chronicles.json').read_text(encoding='utf-8'))
prior={}
for slug in ['genesis','exodus','numbers','joshua','judges','ruth','1-samuel','2-samuel','1-kings','2-kings']:
 prior.update(json.loads((OUT/f'{slug}-art.json').read_text(encoding='utf-8')))
records={p['id']:dict(prior[p['id']]) for p in book['people'] if p['id'] in prior}
women={'zeruiah','keturah','shelomith-daughter','bithiah','sheerah','serah'}
special={
'sheerah':'Adult Levantine woman with dark braided hair, strong composed face, modest teal dress and ochre shawl, standing in three-quarter view beside dressed building stones, one hand resting on a stone, upper hillside town behind her in clear daylight. No modern architectural plans or tools.',
'bithiah':'Adult ancient Egyptian woman with brown skin and black braided hair, modest ivory linen dress with a muted blue woven shawl, seated upright in a shaded domestic courtyard, attentive sideward gaze, half-body framing, pale limestone and date palm greenery. No baby Moses, modern jewelry, or claimed royal likeness.',
'jarha':'Adult ancient Egyptian man with brown skin, shaved cheeks, short natural curly black hair, plain muted rust linen tunic, standing with relaxed hands in a domestic courtyard, thoughtful direct gaze, half-body framing, pale stone and soft olive-green background. No restraints or slavery spectacle.',
'shelomith-daughter':'Young adult Levantine woman with dark curly hair partly covered by a plum woven scarf, modest cream dress and rose-brown mantle, seated near a doorway with folded hands, calm attentive expression, close chest-up framing, postexilic stone courtyard in lavender morning light.',
'ornan-sons':'Exactly four distinct fully clothed Levantine boys and young adult men, varied ages treated as artistic choices, natural dark hair, modest cream, green, ochre, and blue woven tunics, standing together beside stored wheat in a peaceful farm courtyard, wide waist-up composition, serious but calm expressions. No angel, threat, injury, or fear spectacle.',
'heman-singer':'Mature Levantine man with gray-threaded curly beard, modest ivory linen robe and deep green mantle, seated beside a simple ancient wooden lyre, thoughtful upward gaze, three-quarter half-body framing, warm stone courtyard in golden morning light. Hands at rest, no modern musical notation.',
'asaph-singer':'Adult Levantine man with short neat dark beard and curly hair, modest blue linen tunic with copper mantle, standing holding two small plain bronze cymbals apart at waist height, attentive slight smile, waist-up front framing, quiet stone portico with green leaves in bright indirect daylight.',
'jeduthun':'Older Levantine man with silver beard and broad thoughtful face, modest muted burgundy tunic and pale flax wrap, seated with a small ancient wooden lyre resting beside his knee, gentle sideward expression, half-body profile, cool blue courtyard shade with warm light on face.',
'ethan-singer':'Adult Levantine man with a distinct angular face, dark wavy hair and short pointed beard, modest ochre linen robe and slate-blue outer cloth, standing with relaxed shoulders beside a plain bronze cymbal on a low table, close chest-up framing, rose dusk and distant limestone buildings.',
'obil':'Adult ancient Arabian Ishmaelite man with a distinct broad face and neatly trimmed dark beard, modest cream tunic and indigo woven mantle, standing with relaxed hands, quiet alert expression, three-quarter waist-up portrait, one camel well behind him in a warm dry landscape. No modern saddle or weapon.',
'jaziz':'Mature ancient Near Eastern Hagrite man with distinct round face and gray-threaded close beard, modest olive tunic and terracotta mantle, seated with a plain wooden shepherd staff beside his knee, gentle watchful expression, half-body framing, distant sheep on a green-gold hillside under a pale sky.'}
poses=['seated upright with hands resting on knees, half-body view','standing in a relaxed three-quarter pose, waist-up view','close chest-up portrait looking slightly right','standing beside a quiet doorway, three-quarter framing','seated on a stone bench, side profile','upright portrait with one hand open, half-body framing','seated with hands loosely folded, close portrait','standing and looking slightly left, waist-up composition']
colors=['muted rust and ivory','deep blue and pale flax','olive and sand','plum and cream','ochre and slate','gray and burgundy','charcoal and soft teal','indigo and copper']
settings=['olive hillside in golden morning','courtyard in turquoise shade','distant blue hills beneath rose dusk','woven tent in warm light','fig garden in soft daylight','limestone portico in lavender dawn','quiet doorway beneath pale sky','stone courtyard with green leaves']
faces=['long narrow face and short curly beard','broad square face and close-trimmed beard','round face and clean-shaven cheeks','angular face and full dark beard','oval face and small pointed beard','broad nose and gray-threaded beard','high cheekbones and short stubble','distinct deep-set eyes and wavy beard']
mp=ROOT/'scripts/1-chronicles-generated-portraits.json'
manifest=json.loads(mp.read_text(encoding='utf-8')) if mp.exists() else {}
for j,p in enumerate(book['people']):
 if p['id'] in records or p['id'] in manifest:continue
 female=p['id'] in women
 appearance='dark wavy hair under a light woven scarf, distinct natural face' if female else faces[j%8]+', dark or gray-threaded hair'
 desc=special.get(p['id'],f'Adult ancient Levantine {"woman" if female else "man"} with {appearance}, {poses[j%8]}, modest woven clothes in {colors[(j//2)%8]}, {settings[(j//3)%8]}, { ["attentive direct gaze","reflective lowered gaze","serious sideward gaze","gentle listening expression"][j%4]}.')
 prompt=f'Create one finished portrait asset for a Bible study guide: {p["name"]}, {p["role"]}. '+desc+' Painterly realistic interpretive illustration with visible brush texture, natural human proportions, plausible ancient clothing, face high enough for a square top-centered crop. No text, labels, modern objects, medieval armor, halo, graphic violence, or claim of known likeness. One composition, no grid.'
 prompt+=' Give this person a new individual face, distinct from earlier portraits. Vary facial proportions and hairstyle. Use the specified pose and background.'
 manifest[p['id']]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/1-chronicles/{p["id"]}.png',mode='built-in image generation')
for pid,item in manifest.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
mp.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(OUT/'1-chronicles-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Portraits available:',len(records),'Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
