"""Fetch background articles. Keep copyrighted source text in a temporary review cache."""
import html,json,re,sys,tempfile,urllib.request
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
sys.stdout.reconfigure(encoding='utf-8')
rows=[]
books=[('genesis','Book_of_Genesis'),('exodus','Book_of_Exodus'),('leviticus','Book_of_Leviticus'),('numbers','Book_of_Numbers'),('deuteronomy','Book_of_Deuteronomy'),('joshua','Book_of_Joshua'),('judges','Book_of_Judges'),('ruth','Book_of_Ruth')]
for slug,title in books:
    if len(sys.argv)>1 and slug not in sys.argv[1:]:continue
    url='https://en.wikipedia.org/wiki/'+title
    raw=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'BibleStudyGuide educational source review'}),timeout=40).read().decode()
    match=re.search(r'"wgRevisionId":(\d+)',raw) or re.search(r'oldid=(\d+)',raw)
    if not match:raise ValueError('Missing reviewed revision: '+title)
    clean=lambda text:' '.join(html.unescape(re.sub('<[^>]+>',' ',text)).split())
    rows.append(dict(book=slug,title=title.replace('_',' '),url=url,revisionId=match[1],paragraphs=[clean(p) for p in re.findall(r'<p(?:\s[^>]*)?>(.*?)</p>',raw,re.S) if len(clean(p))>50],references=[dict(text=clean(p),links=re.findall(r'href="(https?[^\"]+)"',p)) for p in re.findall(r'<li[^>]*id="cite_note[^>]*>(.*?)</li>',raw,re.S)]))
cache=Path(tempfile.gettempdir())/'bible-wikipedia-review.json'
cache.write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
print('Review cache: '+str(cache))
for row in rows:
    print(row['title']+' · revision '+row['revisionId'])
    print('\n'.join(row['paragraphs'][:4]))
    print('Relevant bibliography: '+json.dumps([r for r in row['references'] if any(x in r['text'] for x in ['Hayes','Baden','Milgrom','Kugel','Berlin','Weinfeld','Levinson','Tigay'])],ensure_ascii=False))
metadata=ROOT/'scripts/bible-wikipedia-reviews.json'
old=json.loads(metadata.read_text(encoding='utf-8')) if metadata.exists() else []
updated=[r for r in old if r['book'] not in [row['book'] for row in rows]]+[{k:v for k,v in r.items() if k not in ['paragraphs','references']} for r in rows]
metadata.write_text(json.dumps(updated,indent=2)+'\n',encoding='utf-8')
