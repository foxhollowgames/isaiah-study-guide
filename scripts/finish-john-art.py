"""Save inspected portraits and reuse the same Gospel people's artwork."""
import json,shutil
from book_common import ROOT,OUT
art=json.loads((OUT/'matthew-art.json').read_text(encoding='utf8'));art.pop('joseph-mary')
folder=ROOT/'dist/assets/portraits/john';folder.mkdir(parents=True,exist_ok=True)
names={'nicodemus':'Nicodemus','thomas':'Thomas','martha':'Martha of Bethany','mary-bethany':'Mary of Bethany','lazarus':'Lazarus of Bethany'}
for row in json.loads((ROOT/'scripts/john-generated-portraits.json').read_text(encoding='utf8')):
 pid=row['id'];shutil.copy2(row['path'],folder/f'{pid}.png')
 art[pid]=dict(src=f'assets/portraits/john/{pid}.png',generated=True,title=names[pid]+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for this selected first-century Gospel profile.')
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'john-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
