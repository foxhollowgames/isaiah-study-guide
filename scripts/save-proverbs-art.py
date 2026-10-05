"""Copy reviewed generated art into the project and record original paths."""
import json,shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
path=ROOT/'scripts/proverbs-generated-portraits.json'
manifest=json.loads(path.read_text(encoding='utf8'))
paths=json.loads((ROOT/'scripts/proverbs-portrait-paths.json').read_text(encoding='utf8'))
for pid,original in paths.items():
 item=manifest[pid];target=ROOT/'dist'/item['src'];target.parent.mkdir(parents=True,exist_ok=True)
 if not target.exists():shutil.copy2(original,target)
 item['originalPath']=original;item['reviewed']='2026-10-05: Generated composition inspected. Faces, anatomy, setting, and varied framing reviewed.'
path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Saved',len(paths),'reviewed portraits.')
