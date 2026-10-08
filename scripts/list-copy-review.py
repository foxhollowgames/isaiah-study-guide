import json,re,sys
from pathlib import Path
D=Path(__file__).resolve().parent.parent/'dist/data/books'
for slug in sys.argv[1:]:
 b=json.loads((D/(slug+'.json')).read_text(encoding='utf8'))
 for c in b['chapters']:
  for key,t in [('meaning',c['meaning']),('lds',c['lds']['text'])]:
   if re.search(r'\b(?:not|rather|instead|unknown|separate|modern|distinguish|reading|comparison|interpretation|chronology|evidence|guide)\b',t,re.I):print(f'{slug}.chapters.{c["chapter"]}.{key}|{t}')
 for p in b['people']:
  for key in ['role','relations','meaning']:
   if re.search(r'\b(?:not|unknown|separate|modern|distinguish|portrait|art|guide)\b',p[key],re.I):print(f'{slug}.people.{p["id"]}.{key}|{p[key]}')
