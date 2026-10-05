import json,importlib.util
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'dist/data/books'
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
candidates=json.loads((ROOT/'scripts/1-samuel-art-candidates.json').read_text(encoding='utf-8'))
book=json.loads((OUT/'1-samuel.json').read_text(encoding='utf-8'));records={}
for slug,ids in [('ruth',['david','jesse']),('exodus',['moses','aaron']),('judges',['gideon','jephthah'])]:
 parent=json.loads((OUT/(slug+'-art.json')).read_text(encoding='utf-8'))
 for id in ids:records[id]=dict(parent[id])
selections={'hannah':0,'eli':2,'saul':0,'jonathan-saul':1,'abigail':1,'endor-medium':1,'elkanah':0,'ahimelech-priest':0,'doeg':2,'agag':0,'achish':1}
def download(pair):
 pid,index=pair;key='ahimelech' if pid=='ahimelech-priest' else pid;item=candidates[key][index];relative=f'assets/portraits/1-samuel/{pid}.jpg';path=ROOT/'dist'/relative;path.parent.mkdir(parents=True,exist_ok=True)
 if not path.exists():path.write_bytes(a.request(item['url']))
 return pid,dict(item,src=relative,note='Later art illustrates the person or narrative. Group scenes can include other people. It does not establish actual appearance.')
for pid,record in ThreadPoolExecutor(max_workers=2).map(download,selections.items()):records[pid]=record
prompts=ROOT/'scripts/1-samuel-generated-portraits.json'
if prompts.exists():
 for pid,item in json.loads(prompts.read_text(encoding='utf-8')).items():
  if (ROOT/'dist'/item['src']).exists():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence.')
(OUT/'1-samuel-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared',len(records),'portraits. Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
