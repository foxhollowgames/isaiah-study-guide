import json,importlib.util
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent;OUT=ROOT/'dist/data/books'
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
candidates=json.loads((ROOT/'scripts/judges-art-candidates.json').read_text(encoding='utf-8'))
book=json.loads((OUT/'judges.json').read_text(encoding='utf-8'));records={}
art=json.loads((OUT/'joshua-art.json').read_text(encoding='utf-8'))
for p in book['people']:
 if p['id'] in art:records[p['id']]=dict(art[p['id']])
selections={'adonibezek':1,'eglon':2,'ehud':1,'deborah':0,'barak':0,'sisera':0,'jael':2,'gideon':0,'jotham-gideon':0,'abimelech-judges':2,'jephthah':2,'jephthah-daughter':2,'samson':2,'manoah':3,'samson-mother':3,'levite-concubine':3,'tola':0,'jair':1,'ibzan':0,'elon':1,'abdon':0}
def download(pair):
 pid,index=pair;item=candidates[pid][index];relative=f'assets/portraits/judges/{pid}.jpg';path=ROOT/'dist'/relative;path.parent.mkdir(parents=True,exist_ok=True)
 if not path.exists():path.write_bytes(a.request(item['url']))
 return pid,dict(item,src=relative,note='Later historical art illustrates the person or account. It does not establish actual appearance. A scene may include other people.')
for pid,record in ThreadPoolExecutor(max_workers=2).map(download,selections.items()):
 record['credit']=record['credit'].replace('Unknown authorUnknown author','Unknown author')
 records[pid]=record
records['levite-traveler']=dict(records['levite-concubine'],note='This later hospitality scene includes the Levite and the woman. The shared scene does not establish either person’s actual appearance.')
records['delilah']=dict(records['samson'],note='Later painting of Samson and Delilah. The shared scene does not establish either person’s actual appearance.')
prompts=ROOT/'scripts/judges-generated-portraits.json'
if prompts.exists():
 for pid,item in json.loads(prompts.read_text(encoding='utf-8')).items():
  records[pid]=dict(src=item['src'],generated=True,title=item['name']+' · interpretive portrait',credit='AI-generated illustration',license='Generated artwork',note='Interpretive art. Appearance, clothing, and setting are artistic choices, not verified biographical evidence.')
(OUT/'judges-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared',len(records),'Judges portraits. Remaining:',[p['id'] for p in book['people'] if p['id'] not in records])
