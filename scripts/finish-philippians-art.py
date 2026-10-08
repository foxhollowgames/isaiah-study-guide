"""Save the inspected worker portraits and reuse continuing profiles."""
import json,shutil
from book_common import ROOT,OUT
art={}
for book,ids in [('acts',['paul']),('matthew',['jesus']),('romans',['timothy'])]:
 a=json.loads((OUT/(book+'-art.json')).read_text(encoding='utf8'));art.update({pid:a[pid] for pid in ids})
folder=ROOT/'dist/assets/portraits/philippians';folder.mkdir(parents=True,exist_ok=True)
for r in json.loads((ROOT/'scripts/philippians-generated-portraits.json').read_text(encoding='utf8')):
 shutil.copy2(r['path'],folder/(r['id']+'.png'));art[r['id']]=dict(src='assets/portraits/philippians/'+r['id']+'.png',generated=True,title=r['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for a selected first-century letter profile.')
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'philippians-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
