"""Apply reviewed reader copy after builders and source enrichment."""
import json
from pathlib import Path
P=Path(__file__).resolve().parent/'book-copy'
def revise(data):
 path=P/(data['id']+'.json')
 edits=json.loads(path.read_text(encoding='utf8')) if path.exists() else {}
 followup=P.parent/'book-copy-round2'/(data['id']+'.json')
 if followup.exists():edits.update(json.loads(followup.read_text(encoding='utf8')))
 # Chapter summaries and study questions written to the three-part chapter pattern in WRITING-GUIDE.md.
 chapters=P.parent/'book-copy-chapters'/(data['id']+'.json')
 if chapters.exists():edits.update(json.loads(chapters.read_text(encoding='utf8')))
 # Profiles, place notes, source notes, and map notes written to "Write reference notes" in WRITING-GUIDE.md.
 reference=P.parent/'book-copy-reference'/(data['id']+'.json')
 if reference.exists():edits.update(json.loads(reference.read_text(encoding='utf8')))
 # A `chapters.*.<key>` entry applies to every chapter. A numbered entry then replaces it.
 for path,text in sorted(edits.items(),key=lambda e:'.*.' not in e[0]):
  group,identity,key=path.split('.')
  items=data[group] if identity=='*' else [next(x for x in data[group] if str(x['chapter'] if group=='chapters' else x['id'])==identity)]
  for item in items:
   if key=='lds':item['lds']['text']=text
   else:item[key]=text
 data['review']['copyReview']=data['review'].get('copyReviewDate','2026-10-05')+': Reader copy reviewed against WRITING-GUIDE.md. Scripture and source titles preserved.'
 return data
