"""Preserve portrait prompts and original paths. Reuse only the same person."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
book=json.loads((OUT/'2-samuel.json').read_text(encoding='utf-8'))
old=json.loads((OUT/'1-samuel-art.json').read_text(encoding='utf-8'))
records={p['id']:dict(old[p['id']]) for p in book['people'] if p['id'] in old}
judges=json.loads((OUT/'judges-art.json').read_text(encoding='utf-8'))
records['abimelech']=dict(judges['abimelech-judges'])
special={
'david':'Mature king with graying dark beard, seated sideways on a plain wooden chair, deep indigo mantle and ochre tunic, thoughtful troubled gaze, Jerusalem stone courtyard in rose dusk, waist-up framing. Restrained narrow bronze headband, no medieval crown.',
'bathsheba':'Adult woman fully clothed in a deep blue woven dress and cream shawl, seated beside a limestone doorway, dark braided hair, thoughtful guarded expression, close three-quarter framing, cool turquoise shadows and warm lamplight. No bathing, nudity, or romantic scene.',
'tamar-david':'Young adult woman fully clothed in a long russet dress and pale lavender shawl, standing upright in a quiet courtyard, steady dignified gaze, face and hands visible, olive tree and soft gray-blue sky. No assault, injuries, or sexual imagery.',
'unnamed-infant':'Sleeping infant safely swaddled in cream woven cloth, face visible in upper center, gentle warm light, soft muted teal textile backdrop. Peaceful respectful close portrait, no illness, injury, or death.',
'solomon':'Healthy infant safely held in woven ochre blanket by a fully clothed adult whose hands support him, close portrait centered on child’s visible face, warm soft daylight, muted blue domestic background. No adult king or crown.',
'rizpah':'Mature woman seated upright near a quiet hillside, plain charcoal mantle over muted ochre dress, silver-streaked dark hair, firm watchful expression, close half-body framing, violet evening sky. No dead bodies or graphic violence.',
'royal-concubines':'Respectful group portrait of ten fully clothed adult women with distinct faces and ages, gathered in a shaded limestone courtyard, varied modest woven dresses in muted blue, ochre, green, and rust, expressions thoughtful and dignified. Wide framing, no king, no sexualization, no captivity spectacle.',
'cushite-messenger':'Adult male messenger from the broad ancient Cush region, deep brown skin, short tightly curled hair and beard, walking with a rolled cloth pouch, dusty cream tunic and muted red shawl, attentive face high in composition, distant wooded hills, bright morning. No invented ethnic insignia.',
'mephibosheth-jonathan':'Adult man seated comfortably with feet resting on a low stool, blue mantle over flax tunic, short beard, thoughtful direct expression, domestic courtyard with fig leaves, close half-body framing. No modern mobility device or caricature of disability.',
'abel-woman':'Older woman with gray-streaked braids, standing beside a weathered stone parapet, ochre shawl over slate-blue dress, one open hand in a speaking gesture, firm composed expression, upper-body portrait, soft dawn light. No severed head or violence.',
'tekoa-woman':'Mature woman seated in a simple courtyard, dark hair under a cream scarf, plum wool dress and olive shawl, deliberate speaking gesture, thoughtful expression, chest-up portrait, warm amber light.',
'en-rogel-servant':'Young adult woman walking with a covered earthen water jar, modest flax dress and dusty blue shawl, alert expression, waist-up portrait, shaded spring path and green reeds, cool morning light.',
'bahurim-woman':'Adult woman kneeling beside a covered courtyard well with a bowl of grain, fully clothed in terracotta dress and olive shawl, face turned toward viewer, intent calm expression, three-quarter framing, bright limestone and soft afternoon shadows.',
'abigail-sister':'Mature woman in a pale flax dress and deep green mantle, chest-up profile with dark hair threaded with gray, reflective expression, fig-tree courtyard and muted violet evening. Distinct from David’s wife.',
'thembez-woman':'Adult woman fully clothed in a muted teal dress and cream headcloth, standing on a stone wall with a small millstone resting beside her, composed determined expression, waist-up portrait, broad pale sky. No battle or injuries.'}
poses=['chest-up three-quarter portrait, looking slightly left','half-body seated portrait, hands resting calmly','three-quarter standing figure, face toward viewer','close profile looking right','waist-up walking figure, face fully visible','half-body leaning lightly beside a stone doorway']
colors=['rust mantle and cream tunic','deep blue mantle and flax tunic','olive-green outer cloth and sand tunic','muted plum wool and cream linen','ochre mantle and slate-blue tunic','pale gray robe and burgundy sash']
settings=['olive hillside in golden morning','shaded stone courtyard in cool turquoise light','distant blue hills at rose dusk','plain woven tent backdrop with copper lamplight','fig-tree garden in soft afternoon light','weathered limestone wall under a pale lavender dawn']
faces=['calm attentive expression','serious thoughtful gaze','reserved sideways gaze','quiet concerned expression','firm composed expression','reflective downward gaze']
manifestPath=ROOT/'scripts/2-samuel-generated-portraits.json'
manifest=json.loads(manifestPath.read_text(encoding='utf-8')) if manifestPath.exists() else {}
for j,p in enumerate(book['people']):
 if p['id'] in records and p['id']!='david':continue
 if p['id'] in manifest:continue
 desc=special.get(p['id'])
 if not desc:
  gender='woman' if p['id'] in ['tekoa-woman','abel-woman','abigail-sister','bathsheba','tamar-david'] else 'man'
  age='older' if p['id'] in ['barzillai','ahithophel','nathan-prophet','araunah','toi'] else 'adult'
  desc=f'{age.capitalize()} ancient Levantine {gender}, distinct naturally varied face, dark or gray-streaked hair, {poses[j%6]}, {colors[(j//2)%6]}, {settings[(j//3)%6]}, {faces[(j//5)%6]}.'
 prompt=f'Create one finished portrait asset for a Bible study guide: {p["name"]}, {p["role"]}. '+desc+' Painterly realistic interpretive illustration with visible brush texture. Natural human proportions and plausible ancient woven clothing. Face high enough to remain visible in a square top-centered crop. No text, labels, modern objects, medieval armor, halo, graphic violence, or claim of known likeness. Single portrait composition, no grid.'
 manifest[p['id']]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/2-samuel/{p["id"]}.png',mode='built-in image generation')
for pid,item in manifest.items():
 if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
manifestPath.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
(OUT/'2-samuel-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Portraits available:',len(records),'Remaining:',[p['id'] for p in book['people'] if p['id'] not in records or (p['id']=='david' and not (ROOT/'dist'/manifest['david']['src']).exists())])
