import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
book=json.loads((ROOT/'dist/data/books/1-samuel.json').read_text(encoding='utf-8'))
art=json.loads((ROOT/'dist/data/books/1-samuel-art.json').read_text(encoding='utf-8'))
specs={
'peninnah':'Adult woman with dark braided hair, seated beside a stone courtyard doorway, plum dress and ochre shawl, guarded expression, medium portrait, muted turquoise shadows.',
'samuel':'Elderly bearded prophet, standing three-quarter length with a small horn of oil held down at his side, cream robe and deep red mantle, olive hillside under a pale dawn, thoughtful expression.',
'hophni':'Adult priest with short dark curly beard, close portrait in off-white linen and subdued russet trim, shrine curtain behind him, sideways tense gaze, warm copper lamp light. No villain caricature.',
'phinehas-eli':'Adult priest with a longer dark beard, half-body profile beside a stone wall, flax linen tunic and muted blue sash, inward reserved expression, cool morning light. Distinct from Hophni.',
'man-of-god':'Unnamed mature messenger with a graying beard, walking toward the viewer along a dusty hillside, brown wool mantle over flax tunic, full-body framing, serious composed gaze, green-gold evening palette.',
'ichabod':'Infant sleeping safely in cream woven cloth, tender close framing, small face fully visible, hands relaxed, soft indigo textile background and gentle warm light. Respectful biblical interpretive illustration.',
'ichabod-mother':'Unnamed adult mother holding a swaddled infant safely, seated in a simple domestic room, muted teal dress and sand shawl, close half-body framing, weary thoughtful expression. No childbirth, wounds, or death.',
'joshua-beth-shemesh':'Middle-aged field owner with a broad gray-streaked beard, standing with a sheaf of wheat beside a low stone wall, olive-brown tunic, bright harvest landscape, three-quarter body, open curious expression.',
'abinadab-ark':'Older householder with silver beard, seated on a stone step outside a modest hilltop house, slate-blue mantle and cream tunic, half-body portrait, calm watchful expression, pale rose dusk.',
'eleazar-ark':'Young adult keeper in plain flax linen, standing by a shaded doorway, no high-priest jewels or crown, short beard, modest brown sash, alert expression, soft olive-gray palette, waist-up framing.',
'joel-samuel':'Adult man with dark beard, seated at a stone courtyard bench, deep green mantle, cream tunic, close three-quarter face looking away, reserved expression, amber afternoon. No caricature or modern objects.',
'abijah-samuel':'Younger adult man with curly dark hair and light beard, standing with hands folded in an open courtyard, terracotta tunic and pale gold sash, full-body composition, pensive face, soft blue morning.',
'kish':'Older Benjaminite father, cropped chest-up portrait, gray beard and flax headcloth, ochre outer garment, blurred green pasture and a distant donkey, concerned searching expression, natural daylight.',
'saul-servant':'Young adult traveling companion carrying a small leather pouch, walking on a hill path, simple dusty blue tunic and brown sandals, three-quarter body, practical alert expression, peach sunrise.',
'nahash':'Mature Ammonite ruler with a black beard, seated upright in a spare stone hall, russet wool and dark indigo sash, narrow bronze headband, stern expression, chest-up portrait, cool silver light.',
'jonathan-armor-bearer':'Young adult man climbing a rocky incline, simple linen tunic with olive cloak and small shield held securely, face turned upward and visible near top, half-body action framing, intent expression, bright sky.',
'ahijah-priest':'Adult priest with brown beard in flax linen and restrained blue sash, standing in a shaded camp doorway, hands resting together, medium portrait, observant expression, violet-blue dawn. No invented jeweled breastplate.',
'abner':'Experienced commander with graying beard, chest-up three-quarter portrait in leather and muted bronze protective clothing over cream linen, no medieval plate, wind over dry hillside, firm expression, rust-and-blue palette.',
'ahinoam-saul':'Adult woman in cream dress and deep blue shawl, close profile with dark hair braided at the temple, simple stone courtyard with a small fig tree, dignified thoughtful expression, warm rim light.',
'merab':'Young adult woman standing beside a doorway, burgundy wool dress and pale flax veil, hands relaxed at waist, three-quarter length, uncertain reflective expression, pale green courtyard light.',
'michal':'Young adult woman in dusty teal dress and ochre scarf, half-body beside a small window, looking outward with alert determined expression, gentle cool moonlight and a warm interior lamp. No modern glass.',
'ishvi':'Young adult royal son without crown, short dark hair and beard, chest-up portrait wearing a muted purple mantle over linen, calm direct gaze, soft limestone wall background, honey-colored afternoon.',
'malchishua':'Adult warrior with curled dark hair, seated on a low camp stool, flax tunic and faded red mantle, modest leather belt, three-quarter body, thoughtful downturned gaze, distant blue-gray ridge.',
'eliab-david':'Young adult older brother with thick dark hair and beard, half-body standing beside a camp tent, olive tunic and brown mantle, skeptical sideways gaze, golden dust and muted blue shadows.',
'abinadab-david':'Young adult man with close-trimmed beard, walking beside a field wall, slate-blue tunic and saffron shawl, three-quarter body, focused calm expression, fresh morning greens.',
'shammah':'Young adult man with wavy dark hair and light beard, close profile wearing a rust tunic and simple flax headcloth, blurred sheep pasture at sunset, reflective expression, violet and warm gold.',
'goliath':'Powerfully built adult Philistine champion, upright three-quarter body with bronze helmet and restrained bronze scale armor, shield and spear resting at his side, firm expression, broad valley in cool dawn. Natural human proportions, no fantasy giant scale, no gore.',
'adriel':'Adult man with brown beard seated in a modest courtyard, cream linen tunic and deep terracotta mantle, fig leaves in the background, half-body portrait, composed expression, soft warm afternoon.',
'jonathan-boy':'Fully clothed young attendant about twelve years old, standing with recovered arrows safely pointed down, plain brown tunic and blue sash, meadow background, attentive cheerful face, three-quarter body. No weapon aimed at anyone.',
'gad':'Mature prophet with salt-and-pepper beard, chest-up profile in olive wool cloak, windswept open hillside under pink dawn, earnest speaking expression, no scroll text.',
'abiathar':'Young adult priest with dark short beard, half-body walking with folded plain linen cloth, cream tunic and muted burgundy sash, shaded olive grove, tired but attentive expression, gentle daylight.',
'nabal':'Middle-aged wealthy flock owner with a broad beard, seated beneath a fig canopy, deep green mantle and cream tunic, small clay cup in hand, guarded expression, chest-up framing, warm harvest colors. No comic villain stereotype.',
'ahinoam-david':'Adult woman in rust-colored dress with pale blue head scarf, waist-up standing beside a tent opening, calm resilient expression, distant sunlit hills, cream and turquoise palette.',
'palti':'Adult man with graying dark beard, close face in profile wearing flax and a modest plum shoulder cloth, simple courtyard background, subdued thoughtful expression, cool shadow and amber rim light.',
'abishai':'Young adult warrior crouched beside a rock, leather protective vest over flax tunic, ochre cloak, three-quarter action pose with face fully visible, intense alert expression, deep blue night with soft moonlight. No attack or gore.',
'ahimelech-hittite':'Adult traveling warrior with a dark beard and square face, standing full-length at a camp edge, plain blue-gray tunic and leather belt, rolled brown cloak over shoulder, calm observant expression, pale desert morning.',
'egyptian-servant':'Young adult Egyptian man seated upright outdoors receiving a small clay bowl of water, dark curls, simple flax clothing, face tired but recovering, close half-body view, green-gray field and warm sunset. Dignified, no chains or humiliation.',
'abinadab-saul':'Adult royal son without crown, close frontal portrait with short curly hair and beard, cream tunic with russet mantle, broad ridge behind him, solemn expression, gray-gold daylight.',
'saul-armor-bearer':'Mature attendant with a short gray-streaked beard, standing beside a camp tent with a lowered shield, plain linen and leather vest, medium portrait, sober thoughtful expression, subdued dawn. No suicide, wounds, or death.',
'achish':'Mature Philistine king with curly gray-streaked beard, seated in a coastal palace courtyard, dark blue mantle with restrained bronze clasp, medium portrait, listening expression, pale sea and peach sunset. No fantasy crown.'}
manifest=ROOT/'scripts/1-samuel-generated-portraits.json'
existing=json.loads(manifest.read_text(encoding='utf-8')) if manifest.exists() else {}
records={}
for p in book['people']:
 id=p['id']
 if id not in specs:continue
 prompt='Use case: historical-scene. Asset: individual character portrait for an illustrated Bible study guide. Subject: '+p['name']+' in the narrative of 1 Samuel. '+specs[id]+' Create one finished painterly illustration, not a sheet or collage. Ancient Levantine setting and materials, historically informed artistic interpretation, not a known likeness. Distinct face and age appropriate to this specified role. Face clear within the upper central part, enough framing for a square thumbnail and a larger profile. No text, labels, watermark, modern clothing, fantasy magic, or halos. This picture does not establish actual appearance.'
 records[id]=dict(name=p['name'],prompt=prompt,src=f'assets/portraits/1-samuel/{id}-generated.png',mode='built-in generation')
 if id in existing and existing[id].get('originalPath'):records[id]['originalPath']=existing[id]['originalPath']
(ROOT/'scripts/1-samuel-generated-portraits.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared',len(records),'individual prompts.')
