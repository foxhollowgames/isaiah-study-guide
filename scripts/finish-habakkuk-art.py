import json
from book_common import ROOT,OUT
src='assets/portraits/habakkuk/habakkuk.png'
assert (ROOT/'dist'/src).exists()
art={'habakkuk':dict(src=src,generated=True,title='Habakkuk · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance. The parapet is not an identified watchtower.')}
(OUT/'habakkuk-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
