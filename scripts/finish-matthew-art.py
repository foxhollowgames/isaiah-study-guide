"""Persistent inspected Gospel portrait metadata, reused by later Gospel books."""
import json
from book_common import ROOT,OUT
art={}
for pid,name in [('jesus','Jesus of Nazareth'),('mary-mother','Mary, mother of Jesus'),('joseph-mary','Joseph, Mary’s husband'),('john-baptizer','John the Baptizer'),('peter','Simon Peter'),('mary-magdalene','Mary Magdalene')]:
 src=f'assets/portraits/matthew/{pid}.png'
 assert (ROOT/'dist'/src).exists(),src
 art[pid]=dict(src=src,generated=True,title=name+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for the selected first-century Gospel profile.')
(OUT/'matthew-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
