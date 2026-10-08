import json
from book_common import ROOT,OUT
src='assets/portraits/joel/joel.png'
assert (ROOT/'dist'/src).exists()
art={'joel':dict(src=src,generated=True,title='Joel · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance and setting. Scripture supplies no verified portrait.')}
(OUT/'joel-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
