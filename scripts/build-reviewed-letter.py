"""Build reviewed letter records without replacing their persistent authored context."""
import copy,json,sys
from book_common import ROOT,OUT,scripture,source,person,finish

def build(slug):
 cfg=json.loads((ROOT/f'scripts/book-records/{slug}.json').read_text(encoding='utf8'))
 notes=json.loads((ROOT/f'scripts/book-context-complete/{slug}.json').read_text(encoding='utf8'))
 summaries=json.loads((ROOT/'scripts/book-summaries-final.json').read_text(encoding='utf8')).get(slug,{})
 summaries.update(json.loads((ROOT/'scripts/book-summaries-letters.json').read_text(encoding='utf8')).get(slug,{}))
 date=cfg['date'];count=len(notes);text=scripture(slug,cfg['code'],count)
 assert [len(text[str(n)]) for n in range(1,count+1)]==cfg['verseCounts']
 assert not any('\ufffd' in str(v) for vv in text.values() for v in vv)
 total=sum(map(len,text.values()))
 s=source('web',cfg['name']+' · World English Bible',f'https://ebible.org/engwebp/{cfg["code"]}01.htm','Complete Scripture supplies the primary text for original close readings.','Scripture','historical',cfg['limits'])
 s.update(author='World English Bible translators',publisher='eBible.org',chapterCoverage=list(range(1,count+1)),reviewed=dict(date=date,scope=f'All {total} verses read for {count} original contextual explanations and exact selections. Surroundings, counts, and character integrity checked.'))
 sources=[s];cache={}
 def existing(book):
  if book not in cache:cache[book]=json.loads((OUT/f'{book}.json').read_text(encoding='utf8'))
  return cache[book]
 for rec in cfg.get('sources',[]):
  if 'reuse' in rec:
   s=copy.deepcopy(next(s for s in existing(rec['reuse'])['sources'] if s['id']==rec['id']))
   s.update({k:v for k,v in rec.items() if k!='reuse'})
  else:s=copy.deepcopy(rec)
  sources.append(s)
 people=[];art={}
 for rec in cfg['people']:
  p=person(rec['id'],rec['name'],rec['role'],rec['relations'],rec['passages'],rec['meaning'])
  p.update(placeIds=rec.get('placeIds',[]),linkNames=rec.get('linkNames',[rec['name']]),verseScope=rec.get('verseScope',{}));people.append(p)
  images=json.loads((OUT/f'{rec["reuse"]}-art.json').read_text(encoding='utf8'))
  art[p['id']]=copy.deepcopy(images[rec.get('artId',p['id'])])
 places=[]
 for rec in cfg.get('places',[]):
  p=copy.deepcopy(next(p for p in existing(rec['reuse'])['places'] if p['id']==rec['id'])) if 'reuse' in rec else {}
  p.update({k:v for k,v in rec.items() if k not in ['reuse','chapters']});places.append(p)
  for sid in p['sourceIds']:
   if sid!='web' and not any(s['id']==sid for s in sources):
    sources.append(copy.deepcopy(next(s for s in existing(rec['reuse'])['sources'] if s['id']==sid)))
 chapters=[]
 for n,v,title,meaning in notes:
  extra=copy.deepcopy(cfg['chapters'][str(n)])
  if str(n) in summaries:extra['summary']=summaries[str(n)]
  chapters.append(dict(chapter=n,title=title,summary=extra.get('summary',title+'.'),meaning=meaning,people=[p['id'] for p in cfg['people'] if n in p['chapters']],places=[p['id'] for p in cfg.get('places',[]) if n in p['chapters']],sourceIds=['web']+extra.get('historicalSources',[]),lds=dict(text=extra.get('teaching','')+(' ' if extra.get('teaching') else '')+'Study question. '+extra['question'],sourceIds=extra.get('ldsSources',[])),eventOrder=n,dateLabel='Book order',historicalNote=meaning,mapNote=cfg.get('mapNote','No exact location is assigned to unnamed or heavenly settings.'),route=[],routeEvidence='No exact travel route is reconstructed.'))
 data=dict(id=slug,bibleCode=cfg['code'],name=cfg['name'],description=cfg['description'],chapterCount=count,scripture=text,chapters=chapters,people=people,places=places,sources=sources,review=dict(date=date,contextReviewDate=date,copyReviewDate=date,scope=cfg['review'],nextBook=cfg['nextBook']))
 if '--ready' in sys.argv:
  (OUT/f'{slug}-art.json').write_text(json.dumps(art,ensure_ascii=False,indent=2)+'\n',encoding='utf8');finish(data)
 else:(ROOT/f'review/{slug}-draft.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')

if __name__=='__main__':build(sys.argv[1])
