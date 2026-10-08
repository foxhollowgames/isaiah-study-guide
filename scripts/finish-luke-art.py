"""Reuse inspected portraits for the same six selected Gospel people."""
import json
from book_common import ROOT,OUT
art=json.loads((OUT/'matthew-art.json').read_text(encoding='utf8'))
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'luke-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
