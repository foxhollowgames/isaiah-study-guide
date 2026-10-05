"""Copy an original generated portrait and record its location."""
import json,shutil,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
slug,pid,original=sys.argv[1:4]
p=ROOT/f'scripts/{slug}-generated-portraits.json'
m=json.loads(p.read_text(encoding='utf-8'))
s=Path(original);d=ROOT/'dist'/m[pid]['src']
if not s.is_file():raise FileNotFoundError(s)
d.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(s,d)
m[pid]['originalPath']=str(s)
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Saved portrait:',slug,pid)
