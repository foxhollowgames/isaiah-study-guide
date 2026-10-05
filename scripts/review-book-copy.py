"""Save reviewed reader copy without changing publication status."""
import json
from book_common import OUT
from book_copy import revise
for p in OUT.glob('*.json'):
 b=json.loads(p.read_text(encoding='utf8'))
 if 'chapterCount' not in b:continue
 p.write_text(json.dumps(revise(b),ensure_ascii=False,indent=2)+'\n',encoding='utf8')
