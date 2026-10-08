"""Reuse the inspected Gospel portraits for the same selected people in Mark."""
import json
from book_common import ROOT,OUT
art=json.loads((OUT/'matthew-art.json').read_text(encoding='utf8'))
art.pop('joseph-mary')
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'mark-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
