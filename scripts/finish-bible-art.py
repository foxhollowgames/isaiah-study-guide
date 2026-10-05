import json
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
p=ROOT/'dist/data/books/genesis-art.json'
art=json.loads(p.read_text(encoding='utf-8'))
art['zilpah']=dict(src='assets/portraits/genesis/zilpah.png',credit='AI-generated illustration',license='Generated artwork',licenseUrl='',sourceUrl='',generated=True,description='Imaginative depiction of Zilpah seated beside woven cloth in a tent.',note='An artistic interpretation, not a known likeness.')
art['asenath']['note']='This later artwork reflects a story about Asenath outside Genesis. It illustrates a person, not a Genesis event.'
p.write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
