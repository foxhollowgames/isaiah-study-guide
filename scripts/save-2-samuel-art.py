import json,shutil,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
p=ROOT/'scripts/2-samuel-generated-portraits.json'
m=json.loads(p.read_text(encoding='utf-8'))
pid,original=sys.argv[1:3]
source=Path(original);dest=ROOT/'dist'/m[pid]['src']
if not source.is_file():raise FileNotFoundError(source)
dest.parent.mkdir(parents=True,exist_ok=True)
shutil.copy2(source,dest)
m[pid]['originalPath']=str(source)
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Saved portrait:',pid)
