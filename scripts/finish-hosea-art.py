"""Rebuild inspected Hosea and Gomer artwork records."""
import json
from book_common import ROOT,OUT
art={}
for i,name in [('hosea','Hosea'),('gomer','Gomer')]:
 src=f'assets/portraits/hosea/{i}.png'
 assert (ROOT/'dist'/src).exists()
 art[i]=dict(src=src,generated=True,title=name+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance and setting. Scripture supplies no verified portrait.')
(OUT/'hosea-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
