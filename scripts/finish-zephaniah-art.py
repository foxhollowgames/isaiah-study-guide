import json
from book_common import ROOT,OUT
src='assets/portraits/zephaniah/zephaniah-prophet.png'
assert (ROOT/'dist'/src).exists()
art={'zephaniah-prophet':dict(src=src,generated=True,title='Zephaniah · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance. Distinct from Jeremiah’s priest of the same name.')}
art['josiah']=json.loads((OUT/'2-kings-art.json').read_text(encoding='utf8'))['josiah']
assert (ROOT/'dist'/art['josiah']['src']).exists()
(OUT/'zephaniah-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
