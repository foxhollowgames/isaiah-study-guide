import json
from book_common import ROOT,OUT
old=json.loads((OUT/'ezra-art.json').read_text(encoding='utf8'))
art={id:old[id] for id in ['haggai','zerubbabel','jeshua-priest','darius-ezra']}
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'haggai-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
