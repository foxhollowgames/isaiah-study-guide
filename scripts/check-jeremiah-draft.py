"""Check draft integrity without declaring Jeremiah ready for publication."""
import json
from pathlib import Path

root=Path(__file__).resolve().parent.parent
data=json.loads((root/'review/jeremiah-draft.json').read_text(encoding='utf8'))
scripture=json.loads((root/'scripts/jeremiah-scripture-review.json').read_text(encoding='utf8'))
assert data['scripture']==scripture, 'Reviewed scripture changed'
assert len(data['chapters'])==52
assert sum(map(len,data['scripture'].values()))==1364
for key in ['people','places','sources']:
 ids=[item['id'] for item in data[key]]
 assert len(ids)==len(set(ids)), f'Duplicate {key} identifiers'
people={p['id']:p for p in data['people']}
places={p['id'] for p in data['places']}
sources={s['id'] for s in data['sources']}
for c in data['chapters']:
 n=c['chapter']
 assert set(c['people'])<=people.keys()
 assert set(c['places'])<=places
 assert set(c['sourceIds'])<=sources
 assert set(c['lds']['sourceIds'])<=sources
 assert all(n in people[i]['chapterCoverage'] for i in c['people'])
 assert c['summary'] and c['meaning'] and c['lds']['text']
for p in data['people']:
 for n,verses in p.get('verseScope',{}).items():
  assert int(n) in p['chapterCoverage']
  assert set(verses)<={v['verse'] for v in data['scripture'][n]}
reuse=json.loads((root/'scripts/jeremiah-art-reuse.json').read_text(encoding='utf8'))
for pid,(slug,original) in reuse.items():
 assert pid in people
 art=json.loads((root/f'dist/data/books/{slug}-art.json').read_text(encoding='utf8'))
 assert original in art
 assert (root/'dist'/art[original]['src']).is_file()
portraits=json.loads((root/'scripts/jeremiah-generated-portraits.json').read_text(encoding='utf8'))
for pid,p in portraits.items():
 assert pid in people and pid not in reuse
 if p.get('originalPath'):assert (root/('dist' if p['src'].startswith('assets/') else '')/p['src']).is_file()
directory=json.loads((root/'dist/data/books/directory.json').read_text(encoding='utf8'))
assert next(b for b in directory if b['id']=='jeremiah')['status'] in ['planned','ready']
assert data['review']['status']=='draft'
print(f"Jeremiah draft integrity passed: 52 chapters, 1364 unchanged verses, {len(people)} profiles, {len(places)} places, {len(sources)} sources.")
saved=sum((root/('dist' if p['src'].startswith('assets/') else '')/p['src']).is_file() for p in portraits.values())
print(f"Portraits: {len(reuse)} verified reuse references, {saved} saved new images, {len(people)-len(reuse)-saved} still needed.")
print('Draft integrity is separate from reader identity checks and editorial review.')
