"""Find freely licensed historical depictions. Save metadata before downloading selected art."""
import json, re, html, urllib.parse, urllib.request, time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT=Path(__file__).resolve().parent.parent
def request(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'BibleStudyGuide/1.0 (educational art attribution)'}),timeout=45) as r:return r.read()
        except Exception:
            if attempt==2:raise
            time.sleep(15*(attempt+1))
def plain(s):return html.unescape(re.sub('<[^>]+>','',s or '')).strip()
QUERIES={
'adam':'intitle:Adam intitle:Michelangelo','eve':'intitle:Eve intitle:Cranach','cain':'intitle:Cain intitle:Abel','abel':'intitle:Abel intitle:Cain','enoch':'intitle:Enoch Bible','noah':'intitle:Noah painting','shem':'intitle:Shem Bible','ham':'intitle:Ham intitle:Noah','japheth':'intitle:Japheth','nimrod':'intitle:Nimrod painting','abraham':'intitle:Abraham intitle:Rembrandt','sarah':'intitle:Sarah Bible painting','lot':'intitle:Lot painting','hagar':'intitle:Hagar painting','ishmael':'intitle:Ishmael painting','melchizedek':'intitle:Melchizedek','isaac':'intitle:Isaac intitle:Rembrandt','rebekah':'intitle:Rebecca painting','abimelech':'intitle:Abimelech intitle:Abraham','esau':'intitle:Esau painting','jacob':'intitle:Jacob intitle:Rembrandt','laban':'intitle:Laban painting','leah':'intitle:Leah Bible','rachel':'intitle:Rachel painting','bilhah':'intitle:Bilhah','zilpah':'intitle:Zilpah','dinah':'intitle:Dinah Bible','joseph':'intitle:Joseph intitle:Pharaoh','judah':'intitle:Judah intitle:Tamar','reuben':'intitle:Reuben Bible','simeon':'intitle:Simeon patriarch','levi':'intitle:Levi patriarch','benjamin':'intitle:Benjamin patriarch','tamar':'intitle:Tamar intitle:Judah','potiphar':'intitle:Potiphar intitle:Joseph','pharaoh':'intitle:Pharaoh intitle:Joseph','asenath':'intitle:Asenath','ephraim':'intitle:Ephraim intitle:Manasseh','manasseh':'intitle:Manasseh intitle:Ephraim'}
def search(pair):
    pid,query=pair
    params=urllib.parse.urlencode(dict(action='query',format='json',generator='search',gsrsearch=query,gsrnamespace=6,gsrlimit=4,prop='imageinfo',iiprop='url|extmetadata',iiurlwidth=500))
    result=json.loads(request('https://commons.wikimedia.org/w/api.php?'+params))
    candidates=[]
    for page in sorted(result.get('query',{}).get('pages',{}).values(),key=lambda p:p.get('index',0)):
        if not page.get('imageinfo'):continue
        info=page['imageinfo'][0];meta=info.get('extmetadata',{})
        val=lambda k:plain(meta.get(k,{}).get('value'))
        license=val('LicenseShortName')
        if license not in ['Public domain','CC0','CC BY 3.0','CC BY 4.0','CC BY-SA 3.0','CC BY-SA 4.0']:continue
        if not info.get('thumburl',info['url']).split('?')[0].lower().endswith(('.jpg','.jpeg','.png')):continue
        candidates.append(dict(title=page['title'],url=info.get('thumburl',info['url']),sourceUrl=info['descriptionurl'],credit=val('Artist') or 'Unknown artist',license=license,licenseUrl=val('LicenseUrl') or 'https://creativecommons.org/publicdomain/mark/1.0/',description=val('ImageDescription')))
    return pid,candidates
if __name__=='__main__':
    import sys
    cache=ROOT/'scripts/genesis-art-candidates.json'
    if '--download' not in sys.argv:
        candidates=json.loads(cache.read_text(encoding='utf-8')) if cache.exists() else {}
        for pair in QUERIES.items():
            if pair[0] in candidates:continue
            pid,items=search(pair)
            candidates[pid]=items
            cache.write_text(json.dumps(candidates,ensure_ascii=False,indent=2),encoding='utf-8')
            print(pid,':',' | '.join(i['title'] for i in items[:3]),flush=True)
            time.sleep(3)
    else:
        candidates=json.loads(cache.read_text(encoding='utf-8'))
        selections=json.loads((ROOT/'scripts/genesis-art-selection.json').read_text(encoding='utf-8'))
        records={}
        def download(pair):
            pid,index=pair;item=candidates[pid][index];relative=f'assets/portraits/genesis/{pid}.jpg';target=ROOT/'dist'/relative;target.parent.mkdir(parents=True,exist_ok=True)
            target.write_bytes(request(item['url']))
            return pid,dict(item,src=relative,note='Historical art illustrates the story. It does not establish actual appearance.')
        for pid,record in ThreadPoolExecutor(max_workers=3).map(download,selections.items()):records[pid]=record
        (ROOT/'dist/data/books/genesis-art.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(f'Saved {len(records)} credited historical artworks.')
