"""Save an inspected portrait and its exact prompt without replacing existing art."""
import json,shutil,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
pid,original=sys.argv[1:]
manifest=ROOT/'scripts/ezra-generated-portraits.json'
records=json.loads(manifest.read_text(encoding='utf8'))
item=records[pid]
destination=(ROOT/'dist'/item['src']).resolve()
assert destination.is_relative_to((ROOT/'dist/assets/portraits/ezra').resolve())
assert not destination.exists(),f'Existing portrait: {destination}'
destination.parent.mkdir(parents=True,exist_ok=True)
shutil.copyfile(original,destination)
item['originalPath']=original
item['prompt']=json.loads((ROOT/'scripts/ezra-prompt-refinements.json').read_text(encoding='utf8'))[pid]
manifest.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'Saved {pid}.')
