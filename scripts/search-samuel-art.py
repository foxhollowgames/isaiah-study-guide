import json,importlib.util,time,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
sys.stdout.reconfigure(encoding='utf-8')
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
path=ROOT/'scripts/1-samuel-art-candidates.json';records=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
queries={'hannah':'intitle:Hannah intitle:Samuel painting','samuel':'intitle:Samuel intitle:Reynolds','eli':'intitle:Eli intitle:Samuel','saul':'intitle:Saul intitle:Rembrandt','jonathan-saul':'intitle:Jonathan intitle:David painting','goliath':'intitle:Goliath intitle:David painting','michal':'intitle:Michal intitle:David','abigail':'intitle:Abigail painting','nabal':'intitle:Nabal painting','endor-medium':'intitle:Saul intitle:Endor','elkanah':'intitle:Elkanah','peninnah':'intitle:Peninnah','hophni':'intitle:Hophni','phinehas-eli':'intitle:Phinehas intitle:Eli','abner':'intitle:Abner Bible','ahimelech':'intitle:Ahimelech','abiathar':'intitle:Abiathar','doeg':'intitle:Doeg','agag':'intitle:Agag','achish':'intitle:Achish','gad':'intitle:Gad intitle:prophet'}
for pid,query in queries.items():
 if pid in records:continue
 _,items=a.search((pid,query));records[pid]=items;path.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(pid,':',' | '.join(i['title'] for i in items),flush=True);time.sleep(4)
