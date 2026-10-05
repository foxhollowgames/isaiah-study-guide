"""Copy inspected portraits and write complete art records for Jeremiah."""
import json,shutil
from book_common import ROOT,OUT
reuse=json.loads((ROOT/'scripts/jeremiah-art-reuse.json').read_text(encoding='utf8'))
records={i:dict(json.loads((OUT/(slug+'-art.json')).read_text(encoding='utf8'))[pid]) for i,(slug,pid) in reuse.items()}
manifest=json.loads((ROOT/'scripts/jeremiah-generated-portraits.json').read_text(encoding='utf8'))
for pid,p in manifest.items():
 assert p.get('reviewed') and p.get('originalPath'), f'Unreviewed portrait: {pid}'
 src='assets/portraits/jeremiah/'+pid+'.png'
 target=ROOT/'dist'/src
 target.parent.mkdir(parents=True,exist_ok=True)
 if not target.exists():shutil.copy2(ROOT/p['src'],target)
 p['src']=src
 records[pid]=dict(src=src,generated=True,title=p['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance, age, and setting are not verified historical evidence.')
(OUT/'jeremiah-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(ROOT/'scripts/jeremiah-generated-portraits.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
assert len(records)==66
print('Prepared all 66 Jeremiah portrait records.')
