import json
from book_common import ROOT,OUT
src='assets/portraits/nahum/nahum.png'
assert (ROOT/'dist'/src).exists()
art={'nahum':dict(src=src,generated=True,title='Nahum · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance. Elkosh has no fixed location in this guide.')}
(OUT/'nahum-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
