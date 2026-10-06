"""Fetch museum-authorized public-domain assets and preserve their identity records."""
import json, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist/assets/study-objects'
OUT.mkdir(parents=True,exist_ok=True)
IDS=[545281,560805,555866,326387,327369,544042,244562,321937,321953]
def fetch(number):
    api=f'https://collectionapi.metmuseum.org/public/collection/v1/objects/{number}'
    record=json.load(urllib.request.urlopen(api,timeout=60))
    assert record['isPublicDomain'] and record['primaryImageSmall'],number
    target=OUT/f'met-{number}.jpg'
    target.write_bytes(urllib.request.urlopen(record['primaryImageSmall'],timeout=60).read())
    with Image.open(target) as im: width,height=im.size
    return dict(id=f'met-{number}',title=record['title'],date=record['objectDate'],
        objectNumber=record['accessionNumber'],medium=record['medium'],creditLine=record['creditLine'],
        api=api,url=record['objectURL'],isPublicDomain=True,reviewDate='2026-10-05',
        image=dict(src=f'assets/study-objects/met-{number}.jpg',fullUrl=record['primaryImage'],
            sourceUrl=record['objectURL'],creditUrl=record['objectURL'],credit='The Metropolitan Museum of Art',
            license='CC0 / Public domain',licenseUrl='https://www.metmuseum.org/policies/image-resources',
            alt=record['title'],caption=f"{record['title']} · {record['objectDate']} · The Met",
            width=width,height=height))
with ThreadPoolExecutor(max_workers=4) as pool: records=list(pool.map(fetch,IDS))
(ROOT/'scripts/study-objects.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'Saved {len(records)} public-domain museum photographs and identity records.')
