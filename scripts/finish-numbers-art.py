"""Only reviewed subjects are selected. Same-name modern people are excluded."""
import json,importlib.util
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
candidates=json.loads((ROOT/'scripts/numbers-art-candidates.json').read_text(encoding='utf-8'))
existing=json.loads((OUT/'exodus-art.json').read_text(encoding='utf-8'))
records={pid:dict(existing[pid]) for pid in ['moses','aaron','miriam','joshua','eleazar','ithamar']}
selected={'caleb':1,'balaam':0,'korah':3,'dathan':0,'abiram':1,'phinehas':1,'zimri':0,'cozbi':1}
def download(pair):
 pid,index=pair;item=candidates[pid][index];relative=f'assets/portraits/numbers/{pid}.jpg';target=ROOT/'dist'/relative
 target.parent.mkdir(parents=True,exist_ok=True)
 if not target.exists():target.write_bytes(module.request(item['url']))
 return pid,dict(item,src=relative,note='Later story-based artwork. It does not establish actual appearance. Group scenes do not identify a known individual likeness.')
for pid,item in ThreadPoolExecutor(max_workers=3).map(download,selected.items()):records[pid]=item
records['caleb']['note']='Later illustration of Caleb and Joshua in Joshua 14. This depicts a later episode, not the scouting account in Numbers. It does not establish actual appearance.'
for pid in ['balak','hobab','eldad','medad','sihon','og','mahlah','noah-daughter','hoglah','milcah-daughter','tirzah']:
 records[pid]=dict(src=f'assets/portraits/numbers/{pid}.png',generated=True,credit='AI-generated illustration',license='Generated artwork',description='Imaginative portrait based on the person’s narrative role.',note='The biblical account does not establish this person’s actual appearance.')
(OUT/'numbers-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Prepared 25 Numbers portrait records. Check every generated asset before publication.')
