import json
from pathlib import Path
p=Path(__file__).with_name('1-chronicles-generated-portraits.json')
m=json.loads(p.read_text(encoding='utf-8'))
extra=' Give this person a new individual face, distinct from earlier portraits. Vary facial proportions and hairstyle. Use the specified pose and background.'
for pid,item in m.items():
 if pid=='beerah':item['prompt']=item['prompt'].removesuffix(extra)
 elif not item.get('originalPath') and not item['prompt'].endswith(extra):item['prompt']+=extra
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
