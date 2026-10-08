"""Rebuild the inspected unnamed-speaker artwork record."""
import json
from book_common import ROOT,OUT
src='assets/portraits/lamentations/grieving-speaker.png'
assert (ROOT/'dist'/src).exists()
art={'grieving-speaker':dict(src=src,generated=True,title='Unnamed grieving speaker · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation of an unnamed voice. The poem gives no verified appearance.')}
(OUT/'lamentations-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
