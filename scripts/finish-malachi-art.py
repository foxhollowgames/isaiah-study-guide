import json
from book_common import ROOT,OUT
src='assets/portraits/malachi/malachi.png'
assert (ROOT/'dist'/src).exists()
art={'malachi':dict(src=src,generated=True,title='Malachi · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for the named messenger, whose personal biography remains uncertain.')}
art['moses']=json.loads((OUT/'exodus-art.json').read_text(encoding='utf8'))['moses']
art['elijah']=json.loads((OUT/'2-kings-art.json').read_text(encoding='utf8'))['elijah']
for p in art.values():assert (ROOT/'dist'/p['src']).exists()
(OUT/'malachi-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
