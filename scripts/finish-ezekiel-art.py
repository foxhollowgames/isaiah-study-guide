"""Preserve inspected new portraits and reuse only portraits of the same people."""
import json
from book_common import ROOT,OUT
old=json.loads((OUT/'jeremiah-art.json').read_text(encoding='utf8'))
art={i:old[i] for i in ['jehoiachin','nebuchadnezzar']}
for i,name in [('ezekiel','Ezekiel'),('ezekiel-wife','Ezekiel’s unnamed wife')]:
    src=f'assets/portraits/ezekiel/{i}.png'
    assert (ROOT/'dist'/src).exists()
    art[i]=dict(src=src,generated=True,title=f'{name} · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Artistic interpretation. Appearance and setting are not verified historical evidence.')
(OUT/'ezekiel-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
