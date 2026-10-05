"""Shared publisher extraction and directory registration for reviewed Bible books."""
import html,json,re,urllib.request
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/data/books'
def scripture(slug,code,count):
    def chapter(n):
        cache=ROOT/f'scripts/{slug}{n}-source.html'
        if not cache.exists():
            url=f'https://ebible.org/engwebp/{code}{n:02}.htm'
            with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'BibleStudyGuide/1.0 educational source cache'}),timeout=45) as r:raw=r.read().decode('utf-8')
            cache.write_text(raw,encoding='utf-8')
        raw=cache.read_text(encoding='utf-8').split('<div class="footnote">')[0].split('<div class="copyright">')[0]
        raw=re.sub(r'<ul class=[\'"]tnav[\'"]>.*?</ul>','',raw,flags=re.S)
        matches=list(re.finditer(r'<span class="verse" id="V(\d+)">.*?</span>',raw,re.S));verses=[]
        for i,m in enumerate(matches):
            text=raw[m.end():matches[i+1].start() if i+1<len(matches) else len(raw)]
            text=re.sub(r'<div class="(?:s|s2|ms|ms2|r|d)"[^>]*>.*?</div>','',text,flags=re.S)
            text=re.sub(r'<a [^>]*class="notemark"[^>]*>.*?</a>','',text,flags=re.S)
            text=' '.join(html.unescape(re.sub('<[^>]+>',' ',text)).split())
            verses.append(dict(verse=int(m[1]),text=text))
        if not verses:raise ValueError(f'No verses in {slug} {n}')
        return str(n),verses
    return dict(ThreadPoolExecutor(max_workers=4).map(chapter,range(1,count+1)))
def source(id,title,url,summary,category='Scholarly study',perspective='historical',limits='This interpretation supplies context. It does not verify every narrated event.'):
    return dict(id=id,title=title,url=url,summary=summary,category=category,perspective=perspective,limits=limits)
def person(id,name,role,relations,passages,meaning):
    return dict(id=id,name=name,role=role,relations=relations,passages=passages,meaning=meaning,life='Birth and death years are not securely known.',sourceIds=['web'])
def place(id,name,lat,lng,summary,limits,sourceIds):return dict(id=id,name=name,lat=lat,lng=lng,summary=summary,limits=limits,sourceIds=sourceIds)
def finish(data):
    from book_copy import revise
    data=revise(data)
    for p in data['people']:p.setdefault('placeIds',list(dict.fromkeys(pid for c in data['chapters'] if p['id'] in c['people'] for pid in c['places'])))
    data['translation']='World English Bible';data['copyright']='Public domain'
    (OUT/f"{data['id']}.json").write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    p=OUT/'directory.json';directory=json.loads(p.read_text(encoding='utf-8'))
    for book in directory:
        if book['id']==data['id']:book['status']='ready';book['description']=data.get('description','')
    p.write_text(json.dumps(directory,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f"Built {data['name']}: {data['chapterCount']} chapters, {sum(map(len,data['scripture'].values()))} verses, {len(data['people'])} people.")
