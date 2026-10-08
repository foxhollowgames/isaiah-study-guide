"""Save inspected artwork for selected First Corinthians profiles."""
import json,shutil
from book_common import ROOT,OUT
art={}
for book,ids in [('acts',['paul','peter','barnabas','priscilla','aquila']),('matthew',['jesus']),('romans',['timothy']),('exodus',['moses'])]:
 a=json.loads((OUT/(book+'-art.json')).read_text(encoding='utf8'));art.update({pid:a[pid] for pid in ids})
folder=ROOT/'dist/assets/portraits/1-corinthians';folder.mkdir(parents=True,exist_ok=True)
for r in json.loads((ROOT/'scripts/1-corinthians-generated-portraits.json').read_text(encoding='utf8')):
 shutil.copy2(r['path'],folder/(r['id']+'.png'));art[r['id']]=dict(src='assets/portraits/1-corinthians/'+r['id']+'.png',generated=True,title=r['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for a selected first-century letter profile.')
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'1-corinthians-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
