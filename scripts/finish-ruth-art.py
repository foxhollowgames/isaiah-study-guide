import json,importlib.util
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'dist/data/books'
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
candidates=json.loads((ROOT/'scripts/ruth-art-candidates.json').read_text(encoding='utf-8'))
book=json.loads((OUT/'ruth.json').read_text(encoding='utf-8'));parent=json.loads((OUT/'genesis-art.json').read_text(encoding='utf-8'))
records={p['id']:dict(parent[p['id']]) for p in book['people'] if p['id'] in parent}
selections={'naomi':0,'orpah':0,'boaz':1,'obed':0,'amminadab':1}
def download(pair):
 pid,index=pair;item=candidates['naomi'][2] if pid=='obed' else candidates[pid][index];relative=f'assets/portraits/ruth/{pid}.jpg';path=ROOT/'dist'/relative;path.parent.mkdir(parents=True,exist_ok=True)
 if not path.exists():path.write_bytes(a.request(item['url']))
 return pid,dict(item,src=relative,note='Later art illustrates the person or story. Group scenes may include other people. It does not establish actual appearance.')
for pid,record in ThreadPoolExecutor(max_workers=2).map(download,selections.items()):records[pid]=record
prompts=ROOT/'scripts/ruth-generated-portraits.json'
if prompts.exists():
 for pid,item in json.loads(prompts.read_text(encoding='utf-8')).items():records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive art. Appearance and setting are artistic choices, not verified biographical evidence.')
(OUT/'ruth-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared',len(records),'portraits. Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
