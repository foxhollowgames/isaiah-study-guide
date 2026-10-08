import json,re
from pathlib import Path
D=Path(__file__).resolve().parent.parent/'dist/data/books'
for p in D.glob('*.json'):
 b=json.loads(p.read_text(encoding='utf8'))
 if 'chapterCount' not in b:continue
 for c in b['chapters']:
  for key,t in [('title',c['title']),('summary',c['summary']),('meaning',c['meaning'])]:
   if re.search(r'genealog|succession|deportation|administration|allocation|communal|territorial|retrospect|attestation|military|agricultur|fortif|jurisdiction|reform|reconciliation|consecration',t,re.I):print(f'{b["id"]}.chapters.{c["chapter"]}.{key}|{t}')
