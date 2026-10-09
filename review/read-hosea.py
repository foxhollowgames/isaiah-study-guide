import sys,json
sys.path.insert(0,'scripts')
from book_common import scripture,ROOT
t=scripture('hosea','HOS',14)
(ROOT/'review/hosea-scripture.json').write_text(json.dumps(t,ensure_ascii=False,indent=2),encoding='utf8')
print([(n,len(v)) for n,v in t.items()])
for n,vv in t.items():
 print('CHAPTER',n)
 for v in vv:print(v['verse'],v['text'])
