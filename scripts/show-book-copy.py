import json,sys
from pathlib import Path
D=Path(__file__).resolve().parent.parent/'dist/data/books'
for slug in sys.argv[1:]:
 b=json.loads((D/(slug+'.json')).read_text(encoding='utf8'))
 for c in b['chapters']:
  for key in ['title','summary','meaning']:
   print(f'{slug}.chapters.{c["chapter"]}.{key}|{c[key]}')
 for p in b['people']:
  print(f'{slug}.people.{p["id"]}.role|{p["role"]}')
