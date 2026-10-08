"""Rebuild Daniel's inspected selected-profile artwork records."""
import json
from book_common import ROOT,OUT
art={}
for i,name in [('daniel','Daniel'),('shadrach','Hananiah · Shadrach'),('meshach','Mishael · Meshach'),('abednego','Azariah · Abednego')]:
 src=f'assets/portraits/daniel/{i}.png'
 assert (ROOT/'dist'/src).exists()
 art[i]=dict(src=src,generated=True,title=name+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance and setting. Scripture gives no verified portrait.')
art['nebuchadnezzar']=json.loads((OUT/'jeremiah-art.json').read_text(encoding='utf8'))['nebuchadnezzar']
(OUT/'daniel-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
