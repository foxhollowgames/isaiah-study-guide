import json
from book_common import ROOT,OUT
art=json.loads((OUT/'jeremiah-art.json').read_text(encoding='utf8'))['micah-prophet']
assert (ROOT/'dist'/art['src']).exists()
(OUT/'micah-art.json').write_text(json.dumps({'micah-prophet':art},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
