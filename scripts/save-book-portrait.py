"""Copy an inspected generated portrait into the book's asset directory."""
import json,shutil,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
slug,pid,original=sys.argv[1:]
manifest=ROOT/f'scripts/{slug}-generated-portraits.json'
records=json.loads(manifest.read_text(encoding='utf8'))
item=records[pid]
destination=(ROOT/'dist'/item['src']).resolve()
assert destination.is_relative_to((ROOT/'dist/assets/portraits'/slug).resolve())
assert not destination.exists(),f'Existing portrait: {destination}'
destination.parent.mkdir(parents=True,exist_ok=True)
shutil.copyfile(original,destination)
item['originalPath']=original
manifest.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'Saved {slug}: {pid}.')
