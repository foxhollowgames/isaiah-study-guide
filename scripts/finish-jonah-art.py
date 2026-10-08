import json
from book_common import ROOT,OUT
art=json.loads((OUT/'2-kings-art.json').read_text(encoding='utf8'))['jonah']
assert (ROOT/'dist'/art['src']).exists()
(OUT/'jonah-art.json').write_text(json.dumps({'jonah':art},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
