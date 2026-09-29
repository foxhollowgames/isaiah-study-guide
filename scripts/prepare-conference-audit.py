"""Create a compact citation audit without redistributing the talk texts."""
from pathlib import Path
from urllib.parse import urlparse
import json, re

root = Path(__file__).resolve().parent
scan = json.loads((root/'conference-scan.tmp.json').read_text(encoding='utf-8'))
if any('error' in row for row in scan):
    raise RuntimeError('Resolve scan errors before preparing the audit')
matches = []
for row in scan:
    if not row['hits']: continue
    parts = urlparse(row['url']).path.split('/')
    key = '-'.join(parts[-3:])
    references = []
    for hit in row['hits']:
        for link in hit['links']:
            if '/ot/isa/' not in link['url']: continue
            label = re.sub(r'\s+', ' ', link['text']).strip()
            location = hit.get('note') or hit['id']
            reference = {'label':label,'url':'https://www.churchofjesuschrist.org'+link['url'],
                         'contextUrl':row['url']+'#'+location,
                         'location':('Note '+location[4:] if location.startswith('note') else 'Text reference'),
                         'kind':'Explicit Isaiah citation'}
            if reference not in references: references.append(reference)
    if key == '2025-10-55renlund':
        references.append({'label':'Isaiah through Luke 4:18',
          'url':'https://www.churchofjesuschrist.org/study/scriptures/nt/luke/4?lang=eng&id=p18#p18',
          'contextUrl':row['url']+'#note20','location':'Note 20',
          'kind':'Named Isaiah reference through another scripture'})
    if not references: raise RuntimeError('Unclassified reference: '+key)
    matches.append({'key':key,'title':row['title'],
        'author':next(b['text'].removeprefix('By ') for b in row['blocks'] if b['text'].startswith('By ')),
        'conference':'October 2025' if parts[-3]=='2025' else 'April 2026',
        'url':row['url'],'references':references})
audit = {'checked':'2026-09-27','window':{'start':'2025-09-27','end':'2026-09-27'},
  'method':'Scanned official English conference article text and footnotes for Isaiah and links to /scriptures/ot/isa/. Reviewed matching citations and their associated paragraphs. Includes one named Isaiah reference through Luke. Unnamed allusions and quotations through other books without an explicit Isaiah attribution were not systematically identified.',
  'conferences':['October 2025','April 2026'],
  'pagesScanned':[{'url':r['url'],'title':r['title'],'matched':bool(r['hits'])} for r in scan],
  'matches':matches}
(root/'conference-isaiah-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'Audit: {len(scan)} conference items; {len(matches)} matching talks; {sum(len(t["references"]) for t in matches)} citation locations.')
