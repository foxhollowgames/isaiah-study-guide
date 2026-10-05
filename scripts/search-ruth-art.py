import json,importlib.util,time
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('art',ROOT/'scripts/fetch-bible-art.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
path=ROOT/'scripts/ruth-art-candidates.json';records=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
queries={'ruth':'intitle:Ruth intitle:painting','naomi':'intitle:Naomi intitle:Ruth','orpah':'intitle:Orpah','boaz':'intitle:Boaz painting','obed':'intitle:Obed Bible','jesse':'intitle:Jesse painting','david':'intitle:David intitle:Rembrandt','elimelech':'intitle:Elimelech','mahlon':'intitle:Mahlon','chilion':'intitle:Chilion','perez':'intitle:Perez Bible','hezron':'intitle:Hezron','ram':'intitle:Aram intitle:Michelangelo','amminadab':'intitle:Amminadab','nahshon':'intitle:Nahshon','salmon':'intitle:Salmon intitle:Michelangelo'}
for pid,query in queries.items():
 if pid in records:continue
 _,items=a.search((pid,query));records[pid]=items;path.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(pid,':',' | '.join(i['title'] for i in items),flush=True);time.sleep(4)
