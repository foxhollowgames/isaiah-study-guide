"""Apply reviewed reader copy after builders and source enrichment."""
import json
from pathlib import Path
P=Path(__file__).resolve().parent/'book-copy'
def revise(data):
 path=P/(data['id']+'.json')
 edits=json.loads(path.read_text(encoding='utf8')) if path.exists() else {}
 followup=P.parent/'book-copy-round2'/(data['id']+'.json')
 if followup.exists():edits.update(json.loads(followup.read_text(encoding='utf8')))
 for path,text in edits.items():
  group,identity,key=path.split('.')
  item=next(x for x in data[group] if str(x['chapter'] if group=='chapters' else x['id'])==identity)
  if key=='lds':item['lds']['text']=text
  else:item[key]=text
 data['review']['copyReview']='2026-10-05: Reader copy reviewed against WRITING-GUIDE.md. Scripture and source titles preserved.'
 return data
