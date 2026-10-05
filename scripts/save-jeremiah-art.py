"""Save inspected draft portraits without publishing an incomplete guide."""
import json,shutil,sys
from pathlib import Path
root=Path(__file__).resolve().parent.parent
manifest_path=root/'scripts/jeremiah-generated-portraits.json'
manifest=json.loads(manifest_path.read_text(encoding='utf8'))
paths=json.loads(sys.argv[1])
for pid,original in paths.items():
 item=manifest[pid]
 target=root/('dist' if item['src'].startswith('assets/') else '')/item['src']
 target.parent.mkdir(parents=True,exist_ok=True)
 if not target.exists():shutil.copy2(original,target)
 item.update(originalPath=original,reviewed='2026-10-05: Faces, anatomy, clothing, framing, and backgrounds inspected. Interpretive art.')
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Saved',len(paths),'inspected Jeremiah portraits.')
