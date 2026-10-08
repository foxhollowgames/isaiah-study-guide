"""Copy inspected Romans portraits and reuse existing selected people's artwork."""
import json,shutil
from book_common import ROOT,OUT
art={}
for book,ids in [('acts',['paul','priscilla','aquila']),('matthew',['jesus']),('genesis',['abraham','sarah']),('1-samuel',['david'])]:
 a=json.loads((OUT/(book+'-art.json')).read_text(encoding='utf8'));art.update({pid:a[pid] for pid in ids})
folder=ROOT/'dist/assets/portraits/romans';folder.mkdir(parents=True,exist_ok=True)
for row in json.loads((ROOT/'scripts/romans-generated-portraits.json').read_text(encoding='utf8')):
 pid=row['id'];shutil.copy2(row['path'],folder/f'{pid}.png')
 art[pid]=dict(src=f'assets/portraits/romans/{pid}.png',generated=True,title=row['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for a selected first-century letter profile.')
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'romans-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
