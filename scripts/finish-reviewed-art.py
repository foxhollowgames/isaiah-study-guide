"""Save inspected generated portraits with their persistent prompt records."""
import json,shutil,sys
from book_common import ROOT,OUT
slug=sys.argv[1];folder=ROOT/f'dist/assets/portraits/{slug}';folder.mkdir(parents=True,exist_ok=True);art={}
for r in json.loads((ROOT/f'scripts/{slug}-generated-portraits.json').read_text(encoding='utf8')):
 shutil.copy2(r['path'],folder/(r['id']+'.png'))
 art[r['id']]=dict(src=f'assets/portraits/{slug}/{r["id"]}.png',generated=True,title=r['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for a selected biblical profile.')
(OUT/f'{slug}-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
