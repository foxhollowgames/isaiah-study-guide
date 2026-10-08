import json
from book_common import ROOT,OUT
src='assets/portraits/obadiah/obadiah.png'
assert (ROOT/'dist'/src).exists()
art={'obadiah':dict(src=src,generated=True,title='Obadiah · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance. Not identified with Ahab’s steward.')}
(OUT/'obadiah-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
