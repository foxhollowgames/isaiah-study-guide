"""Save the inspected Philemon portrait with its persistent prompt record."""
import json,shutil
from book_common import ROOT,OUT
folder=ROOT/'dist/assets/portraits/philemon';folder.mkdir(parents=True,exist_ok=True)
art={}
for rec in json.loads((ROOT/'scripts/philemon-generated-portraits.json').read_text(encoding='utf8')):
 shutil.copy2(rec['path'],folder/(rec['id']+'.png'))
 art[rec['id']]=dict(src='assets/portraits/philemon/'+rec['id']+'.png',generated=True,title=rec['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive appearance for a selected first-century letter profile.')
(OUT/'philemon-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
