import json,importlib.util
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path.cwd();OUT=ROOT/'dist/data/books'
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
candidates=json.loads((ROOT/'scripts/deuteronomy-art-candidates.json').read_text(encoding='utf-8'))
book=json.loads((OUT/'deuteronomy.json').read_text(encoding='utf-8'));records={}
for parent in ['genesis','numbers']:
 art=json.loads((OUT/f'{parent}-art.json').read_text(encoding='utf-8'))
 for p in book['people']:
  if p['id'] in art:records[p['id']]=dict(art[p['id']])
def download(pid):
 item=candidates[pid][1 if pid=='dan' else 0];relative=f'assets/portraits/deuteronomy/{pid}.jpg';path=ROOT/'dist'/relative;path.parent.mkdir(parents=True,exist_ok=True)
 if not path.exists():path.write_bytes(a.request(item['url']))
 return pid,dict(item,src=relative,note='Later portrait of the ancestor by Francisco de Zurbarán. In Deuteronomy the name designates a tribe, not the ancestor attending Moses’s assembly. The painting does not establish actual appearance.')
for pid,record in ThreadPoolExecutor(max_workers=3).map(download,candidates):records[pid]=record
(OUT/'deuteronomy-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared',len(records),'Deuteronomy portrait records.')
