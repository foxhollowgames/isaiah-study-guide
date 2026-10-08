"""Copy inspected Acts artwork and reuse continuing people's Gospel portraits."""
import json,shutil
from book_common import ROOT,OUT
art={}
for book,ids in [('matthew',['jesus','peter','mary-mother']),('john',['thomas'])]:
 a=json.loads((OUT/(book+'-art.json')).read_text(encoding='utf8'))
 art.update({pid:a[pid] for pid in ids})
folder=ROOT/'dist/assets/portraits/acts';folder.mkdir(parents=True,exist_ok=True)
for row in json.loads((ROOT/'scripts/acts-generated-portraits.json').read_text(encoding='utf8')):
 pid=row['id'];shutil.copy2(row['path'],folder/f'{pid}.png')
 art[pid]=dict(src=f'assets/portraits/acts/{pid}.png',generated=True,title=row['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for a selected first-century Acts profile.')
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'acts-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
