import json,importlib.util
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'dist/data/books'
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
candidates=json.loads((ROOT/'scripts/joshua-art-candidates.json').read_text(encoding='utf-8'))
book=json.loads((OUT/'joshua.json').read_text(encoding='utf-8'));records={}
for parent in ['genesis','numbers','deuteronomy']:
 art=json.loads((OUT/f'{parent}-art.json').read_text(encoding='utf-8'))
 for p in book['people']:
  if p['id'] in art:records[p['id']]=dict(art[p['id']])
selections={'rahab':1,'achan':1,'achsah':3,'terah':0}
def download(pair):
 pid,index=pair;item=candidates[pid][index];relative=f'assets/portraits/joshua/{pid}.jpg';path=ROOT/'dist'/relative;path.parent.mkdir(parents=True,exist_ok=True)
 if not path.exists():path.write_bytes(a.request(item['url']))
 return pid,dict(item,src=relative,note='Later historical art illustrates the person or account. It does not establish actual appearance.')
for pid,record in ThreadPoolExecutor(max_workers=3).map(download,selections.items()):records[pid]=record
prompts=ROOT/'scripts/joshua-generated-portraits.json'
if prompts.exists():
 for pid,item in json.loads(prompts.read_text(encoding='utf-8')).items():
  records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration · OpenAI image generation',license='Generated illustration',note='Interpretive art. Clothing, appearance, and setting are artistic choices, not verified biographical evidence.')
(OUT/'joshua-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared',len(records),'Joshua portraits.')
