"""Adapt book data to the existing Isaiah reader. Do not create a second UI."""
import json,re
from bible_source_enrichment import enrich
from book_copy import revise
from pathlib import Path
ROOT=Path(__file__).resolve().parent.parent
D=ROOT/'dist';OUT=D/'data/books'
def write(path,value):path.write_text(json.dumps(value,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
native=(D/'app.js').read_text(encoding='utf-8')
portraits=(D/'portraits.js').read_text(encoding='utf-8')
for entry in json.loads((OUT/'directory.json').read_text(encoding='utf-8')):
    slug=entry['id']
    if entry['status']!='ready' or slug=='isaiah':continue
    b=revise(enrich(json.loads((OUT/f'{slug}.json').read_text(encoding='utf-8'))));write(OUT/f'{slug}.json',b)
    name=b['name'];count=b['chapterCount'];code=b.get('bibleCode','GEN')
    art=json.loads((OUT/f'{slug}-art.json').read_text(encoding='utf-8'))
    content=dict(sources=[],passages=[],events=[],places=[],campaigns=[],ancientRoads=[],regions=[],words=[],guides=[],periods=[],chapterMaps=[],textRoutes=[],narrativeRegions=[],chapterStudies=[])
    for s in b['sources']:
        content['sources'].append(dict(s,type=s.get('type',s['category']),limitations=s['limits'],license=s.get('license','Public domain' if s['id']=='web' else 'Linked source. Original guide summaries.')))
    for p in b['places']:
        content['places'].append(dict(p,name=p['name'].split(' / ')[0].split(' · ')[0],detail=p['summary'],uncertainty=p['limits'],chapterLocation=True))
    feature_people={}
    for c in b['chapters']:
        n=c['chapter'];eid=f'{slug}-{n}';refs=c['sourceIds'];total=len(b['scripture'][str(n)])
        content['passages'].append(dict(id=eid,chapter=n,start=1,end=total,title=c['title'],summary=c['summary']+' '+c['meaning'],year=None,dateLabel=c['dateLabel'],uncertainty=c['mapNote'],placeIds=c['places'],sourceIds=refs,lds=c['lds']))
        event=dict(id=eid,chapter=n,verse=1,eventOrder=n,title=c['title'],summary=c['summary'],detail=c['meaning'],dateLabel=c['dateLabel'],uncertainty=c['mapNote'],sourceIds=refs,placeIds=c['places'],lds=c['lds'])
        content['events'].append(event);feature_people[eid]=c['people']
        focus=dict(chapter=n,focusPlaceIds=c['places'],placeIds=c['places'],routes=[],contextRoutes=[],contextPlaceIds=[],impacts=[],maxZoom=7,note=c['mapNote'],narrative=c['summary'],limits=c['mapNote'],sourceIds=refs)
        if len(c['route'])>1:
            points=[[next(p for p in b['places'] if p['id']==pid)[axis] for axis in ['lat','lng']] for pid in c['route']]
            rid=f'{eid}-journey';route=dict(id=rid,title=c['title'],points=points,chapter=n,verse=1,summary=c['summary'],detail=c['meaning'],uncertainty=c.get('routeEvidence',c['mapNote']),evidence=c.get('routeEvidence',c['mapNote']),kind='flight' if 'flee' in c['summary'].lower() else 'journey',direction=True,textRoute=True,sourceIds=refs)
            content['textRoutes'].append(route);feature_people[rid]=c['people'];focus['routes'].append(dict(id=rid,from_=0,to=len(points)-1,reference=f'{name} {n}:1'))
            focus['routes'][-1]['from']=focus['routes'][-1].pop('from_')
        content['chapterMaps'].append(focus)
    # Keep the existing three-button timeline layout. These are chapter sections, not fabricated years.
    step=max(1,count//3)
    for i,(a,z) in enumerate([(1,step),(step+1,step*2),(step*2+1,count)]):content['periods'].append(dict(id=f'part-{i}',label=f'{name} {a}–{z}',start=a,end=z,description='Chapter order'))
    content['guides']=[dict(id=f'{slug}-overview',title=f'Study {name}',description='Follow selected chapters through the book.',steps=[dict(title=c['title'],text=c['summary']+' '+c['meaning'],chapter=c['chapter'],verse=1,sourceIds=c['sourceIds']) for c in [b['chapters'][0],b['chapters'][count//2],b['chapters'][-1]]])]
    write(OUT/f'{slug}-native-content.json',content)
    write(OUT/f'{slug}-native-scripture.json',dict(translation=b['translation'],copyright=b['copyright'],chapters=b['scripture']))
    profiles={p['id']:dict(name=p['name'],role=p['role'],life=p['life'],dateNote='Historical life dates remain uncertain.',locations=[next(q for q in b['places'] if q['id']==pid)['name'] for pid in p.get('placeIds',[])],passages=[p['passages']],importance=p['meaning'],connections=p['relations'],verseScope=p.get('verseScope',{})) for p in b['people']}
    for p in b['people']:
        labels=p['name'].split(' / ')
        profiles[p['id']]['name']=labels[0]
        profiles[p['id']]['linkNames']=p.get('linkNames',[label for label in labels[1:] if label not in ['Israel','Edom']])
        chapter_ids=set(c['chapter'] for c in b['chapters'] if p['id'] in c['people'])
        for m in re.finditer(r'(?:'+re.escape(name)+r'\s+|;\s*)(\d+)(?:[–-](\d+))?(?=:|;|$)',p['passages']):chapter_ids.update(range(int(m[1]),int(m[2] or m[1])+1))
        profiles[p['id']]['chapterIds']=sorted(chapter_ids)
    pm=portraits
    pm=re.sub(r'export const people = \{.*?\n\};',lambda _: 'export const people = '+json.dumps(profiles,ensure_ascii=False)+';',pm,count=1,flags=re.S)
    pm=re.sub(r'const featurePeople = \{.*?\n\};',lambda _: 'const featurePeople = '+json.dumps(feature_people,ensure_ascii=False)+';',pm,count=1,flags=re.S)
    pm="const bookArt = "+json.dumps(art,ensure_ascii=False)+";\n"+pm
    pm=pm.replace("const licensedImage = portraitMode === 'non-generated' ? licensedImages[id] : null;","const licensedImage = bookArt[id] && (portraitMode !== 'non-generated' || !bookArt[id].generated) ? bookArt[id] : null;")
    pm=pm.replace("{ src: `assets/portraits/${id}-v2.png` }","{ src: '', generated:true }")
    pm=pm.replace("const imageKind = licensedImage ? 'Historical depiction' : 'Generated illustration';","const imageKind = image.generated ? 'Generated illustration' : 'Historical depiction';")
    pm=pm.replace('${name[0]}</span><img src="${escapeHtml(image.src)}" width="88" height="88" alt="${imageKind} of ${name}">','${name[0]}</span>${image.src ? `<img src="${escapeHtml(image.src)}" width="88" height="88" alt="${imageKind} of ${name}">` : ""}')
    pm=pm.replace('aria-hidden="true">${name[0]}','aria-hidden="${!!image.src}">${name[0]}')
    pm=pm.replace(" : '';\n    const imageKind", " : image.generated && image.src ? '<small class=\"portrait-credit\">AI-generated illustration</small>' : '';\n    const imageKind")
    (D/f'book-{slug}-portraits.js').write_text(pm,encoding='utf-8')
    app=native.replace("'./portraits.js'",f"'./book-{slug}-portraits.js?v=20261005.13'").replace('Isaiah',name).replace('ISA${',code+'${')
    app=app.replace("const releaseVersion = '20261004.1';", "const releaseVersion = '20261005.13';")
    app=app.replace('const url = new URL(s.url);\n    url.searchParams.set(\'t\', `${moment.seconds}s`);', 'const url = new URL(moment.url || s.url);\n    if (!moment.url) url.searchParams.set(\'t\', `${moment.seconds}s`);')
    app=app.replace('This group has four videos and five works used in them. Each note says what we checked. It also says what the source cannot prove. The video about who wrote '+name+' links to chapter 39. The other videos help with the whole book.','These notes link to relevant McClellan material. Each note states what we reviewed and what remains unverified.')
    app=app.replace('length: 66',f'length: {count}').replace('state.chapter === 66',f'state.chapter === {count}')
    app=app.replace("'isaiah-study-guide-state'",f"'{slug}-native-study-state'").replace("localStorage.getItem('meridian-state')", "null")
    app=app.replace("'data/content.json'",f"'data/books/{slug}-native-content.json'").replace("'data/scripture.json'",f"'data/books/{slug}-native-scripture.json'").replace("'data/portrait-images.json'",f"'data/books/{slug}-art.json'")
    app=app.replace('date: -701','date: 1').replace("const label = chapterDateLabel();", "const label = data.passages.find(p => p.chapter === state.chapter)?.dateLabel || 'Historical dating uncertain';")
    app=app.replace('Generated portraits are illustrations. They do not establish actual appearance.','Portraits are illustrations or later historical art. We do not know how these people looked.')
    # General source summaries belong in the source dialog, not below each chapter.
    a=app.index('function sourceInsightsHtml(');z=app.index('function scriptureExcerptHtml(',a)
    app=app[:a]+"function sourceInsightsHtml(ids = [], chapter = state.chapter) { return sourceMediaHtml(ids, {chapter}); }\n"+app[z:]
    a=app.index('function chapterDateHtml()');z=app.index('function renderScripture()',a)
    app=app[:a]+"function chapterDateHtml() { return ''; }\n"+app[z:]
    # Keep the footer's shared art note; avoid repeated date and art warnings in profiles.
    pm=(D/f'book-{slug}-portraits.js').read_text(encoding='utf8')
    pm=pm.replace('<div><dt>Estimated lifespan</dt><dd>${escapeHtml(person.life)}</dd></div>','')
    pm=pm.replace('<div><dt>Known for</dt><dd>${linkHtml(person.role)}</dd></div>','')
    pm=pm.replace('<div><dt>Key locations</dt><dd>${person.locations.map(linkHtml).join(\' · \')}</dd></div>', '${person.locations.length ? `<div><dt>Key locations</dt><dd>${person.locations.map(linkHtml).join(\' · \')}</dd></div>` : ""}')
    pm=pm.replace('<p class="profile-date-note"><strong>Date note.</strong> ${linkHtml(person.dateNote)}</p>','')
    pm=pm.replace('<p class="profile-portrait-note">Portraits are illustrations or later historical depictions. They do not show the person’s known appearance.</p>','')
    (D/f'book-{slug}-portraits.js').write_text(pm,encoding='utf8')
    app=app.replace('Natural Earth · Terrain: Mapzen / USGS / NOAA · Places: <a href="https://www.openbible.info/geo/">OpenBible.info</a> / <a href="https://www.openstreetmap.org/copyright">OSM contributors</a>','Natural Earth · Terrain: Mapzen / USGS / NOAA · Place sources: see study notes')
    app=app.replace("$('#timelineRange').addEventListener('input', e => { state.date = Number(e.target.value); renderTimeline(); drawOverlays(); persist(); });", "$('#timelineRange').min=1; $('#timelineRange').max=chapters.length; $('#timelineRange').setAttribute('aria-label','Chapter in narrative order');\n  $('#timelineRange').addEventListener('input', e => { selectChapter(Number(e.target.value)); focusChapterMap(); });")
    app=app.replace("state.date = Math.round((p.start + p.end) / 2); renderTimeline(); drawOverlays(); persist();", "selectChapter(Math.round((p.start + p.end) / 2)); focusChapterMap();")
    app=re.sub(r'function renderTimeline\(\) \{.*?\n\}',lambda _: "function renderTimeline() {\n  $('#timelineRange').value=state.chapter; $('#timelineRange').setAttribute('aria-valuetext',`"+name+" ${state.chapter}`); $('#timelineChapter').textContent='Chapter order'; $('#dateLabel').value=`"+name+" ${state.chapter} · ${activePassage()?.title || ''}`; $('#returnPassage').classList.add('hidden'); $('#timelineTooltip').textContent=`"+name+" ${state.chapter}`;\n}",app,count=1,flags=re.S)
    app=app.replace('tooltip.textContent = `${Math.abs(Number(range.value))} BCE`;',f'tooltip.textContent = `{name} ${{range.value}}`;')
    app=app.replace('function selectEvent(event) { state.date = Number(event.year); renderTimeline(); drawOverlays(); persist(); openFeature(event, true, null); }','function selectEvent(event) { selectChapter(event.chapter); focusChapterMap(); openFeature(event,true,null); }')
    app=app.replace("return state.studyMode === 'map' ? data.campaigns.filter(visibleAt) : focusedRoutes();",'return focusedRoutes();')
    app=app.replace("state.studyMode === 'map' ? visibleAt(p) : chapterPlaceVisible(p)",'chapterPlaceVisible(p)')
    # Use Isaiah's existing inline entity controls and return navigation for the new profiles.
    start=app.index('  const candidates = eligibleWords(v);',app.index('function renderVerse'))
    end=app.index('\n',start);app=app[:start]+'  const text = linkedEntityHtml(v.text, {verse:v.verse});'+app[end:]
    app=app.replace("${esc(p.summary)}${cite(ids)}", "${linkedEntityHtml(p.summary)}${cite(ids)}")
    app=app.replace('for (const [id, person] of Object.entries(people)) {','for (const [id, person] of Object.entries(people)) {\n    if (!person.chapterIds.includes(state.chapter)) continue;')
    app=app.replace('function entityLinkTerms() {','function entityLinkTerms(verse = null) {')
    app=app.replace('entityLinkCache.chapter === state.chapter && entityLinkCache.terms.length','entityLinkCache.chapter === state.chapter && entityLinkCache.verse === verse && entityLinkCache.terms.length')
    app=app.replace('entityLinkCache = {chapter:state.chapter, terms:','entityLinkCache = {chapter:state.chapter, verse, terms:')
    app=app.replace('const terms = entityLinkTerms().filter(', 'const terms = entityLinkTerms(options.verse ?? null).filter(')
    app=app.replace("const name = mapDisplayName(feature.name || feature.title || '');", "const scope = feature.verseScope?.[state.chapter];\n    if (verse != null && scope && !scope.includes(verse)) continue;\n    const name = mapDisplayName(feature.name || feature.title || '');")
    app=app.replace("for (const label of [person.name, ...(person.linkNames || [])]) add(label, 'person', id, person.name);", "const scope = person.verseScope?.[state.chapter];\n    if (verse != null && scope && !scope.includes(verse)) continue;\n    const aliases = verse == null && scope ? [] : (person.linkNames || []);\n    for (const label of [person.name, ...aliases]) add(label, 'person', id, person.name);")
    app=app.replace('const start = match.index, end = start + match[0].length;',"const start = match.index, end = start + match[0].length;\n    if (/(?:Tubal|Uzzen|Obed)[ -]$/i.test(text.slice(0,start))) continue;")
    (D/f'book-{slug}-app.js').write_text(app,encoding='utf-8')
    print(f'Adapted {name} to Isaiah UI.')
html=(D/'index.html').read_text(encoding='utf-8')
html=re.sub(r'  <meta (?:property="og:[^\n]+|name="twitter:[^\n]+)\n','',html)
html=re.sub(r'  <link rel="canonical"[^\n]+\n','',html)
html=html.replace('<title>Isaiah Study Guide</title>','<title>Bible Study Guide</title>').replace('<b>ISAIAH<small>STUDY GUIDE</small></b>','<b id="bookBrand">BIBLE<small>STUDY GUIDE</small></b>')
html=html.replace('app.js?v=20261004.1','native-book.js?v=20261005.13').replace('styles.css?v=20261004.1','styles.css?v=20261005.1')
html=html.replace('<span class="map-label label-assyria">ASSYRIA</span><span class="map-label label-judah">JUDAH</span>','')
(D/'book.html').write_text(html,encoding='utf-8')
