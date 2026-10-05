"""Report original reader copy needing a human rewrite, without changing scripture."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
D=ROOT/'dist/data/books'
technical=re.compile(r'\b(?:chronolog\w*|theolog\w*|narrat\w*|textual|dynast\w*|genealog\w*|monarch\w*|polity|cultic|regnal|incitement|coercion|succession|deportation|interpretive|independently|audited|reconstruction|territorial|legitimacy|administrative|displacement|vulnerable|explicitly|inaccessible|artwork|portrait)\b',re.I)
def flags(text):
 found=[]
 if technical.search(text):found.append('terms')
 if any(len(re.findall(r"[\w’'-]+",s))>15 for s in re.split(r'(?<=[.!?])\s+',text)):found.append('length')
 if re.search(r'Original study reflection|The guide|not automatically|not a modern|not independently|does not (?:supply|establish|provide|retell)|remain\w* (?:unknown|uncertain|unstated)|not verified|not securely',text,re.I):found.append('filler')
 return found
report={}
for p in D.glob('*.json'):
 b=json.loads(p.read_text(encoding='utf8'))
 if 'chapterCount' not in b:continue
 edits={}
 for c in b['chapters']:
  for key,t in [('summary',c['summary']),('meaning',c['meaning']),('lds',c['lds']['text'])]:
   if f:=flags(t):edits[f'chapters.{c["chapter"]}.{key}']={'flags':f,'text':t}
 for person in b['people']:
  for key in ['role','relations','meaning']:
   if f:=flags(person[key]):edits[f'people.{person["id"]}.{key}']={'flags':f,'text':person[key]}
 for place in b['places']:
  if f:=flags(place['summary']):edits[f'places.{place["id"]}.summary']={'flags':f,'text':place['summary']}
 report[b['id']]=edits
out=ROOT/'review/book-copy-audit.json';out.parent.mkdir(exist_ok=True);out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print({slug:len(items) for slug,items in report.items()})
