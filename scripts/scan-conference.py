"""Read official conference pages and record explicit Isaiah reference evidence."""
from concurrent.futures import ThreadPoolExecutor
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
import json, re, urllib.request

ROOT = Path(__file__).resolve().parent
BASE = 'https://www.churchofjesuschrist.org'

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=45) as response:
        return response.read().decode('utf-8')

class Reader(HTMLParser):
    def __init__(self):
        super().__init__()
        self.active = False
        self.blocks = []
        self.current = None
        self.links = []
        self.note = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'article': self.active = True
        if self.active and tag == 'li' and a.get('id','').startswith('note'):
            self.note = a['id']
        if self.active and tag in ('h1','h2','p','li'):
            self.current = {'tag':tag,'id':a.get('id',''),'note':self.note,'text':'','links':[]}
        if self.active and tag == 'a' and a.get('href'):
            link = {'url':unescape(a['href']),'text':''}
            self.links.append(link)
            if self.current: self.current['links'].append(link)
            self.link = link
    def handle_endtag(self, tag):
        if tag == 'a': self.link = None
        if tag == 'li': self.note = None
        if self.current and tag == self.current['tag']:
            self.current['text'] = re.sub(r'\s+',' ', self.current['text']).strip()
            self.blocks.append(self.current)
            self.current = None
        if tag == 'article': self.active = False
    def handle_data(self, data):
        if self.current: self.current['text'] += data
        if getattr(self,'link',None): self.link['text'] += data

urls = set()
for conference in ('2025/10','2026/04'):
    index = fetch(f'{BASE}/study/general-conference/{conference}?lang=eng')
    for path in re.findall(r'href="([^"]+)"', index):
        path = unescape(path)
        if re.search(r'/'+conference+r'/\d+[a-z]', path):
            urls.add((BASE if path.startswith('/') else '') + path.split('?')[0] + '?lang=eng')

def read(url):
    try:
        parser = Reader()
        parser.feed(fetch(url))
        if not parser.blocks: raise ValueError('No article text extracted')
        hits = [b for b in parser.blocks if re.search(r'\bIsaiah\b|/ot/isa/', b['text']+' '+str(b['links']),re.I)]
        return {'url':url,'title':next((b['text'] for b in parser.blocks if b['tag']=='h1'),''),
                'hits':hits,'blocks':parser.blocks}
    except Exception as error:
        return {'url':url,'error':str(error)}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(read, sorted(urls)))
(ROOT/'conference-scan.tmp.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(results),'errors':[r for r in results if 'error' in r],
 'matches':len([r for r in results if r.get('hits')])},ensure_ascii=False))
