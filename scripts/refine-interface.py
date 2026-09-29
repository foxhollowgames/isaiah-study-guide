from pathlib import Path
p=Path('dist/app.js')
s=p.read_text(encoding='utf-8')
s=s.replace("(eventsNear(state.date)[0]?.dateLabel || `${Math.abs(state.date)} BCE`)", "`${Math.abs(state.date)} BCE`")
s=s.replace("${passageSelectHtml()}${body}", "${passageSelectHtml()}${body}")
s=s.replace("renderScripture(); renderRead(); persist(); }\nfunction renderWord", "renderScripture(); renderRead(); $('#sidebarContent').scrollTop = 0; requestAnimationFrame(() => $(state.view === 'read' ? '#readNotes .back-button' : '#sidebarContent .back-button')?.focus({preventScroll:true})); persist(); }\nfunction renderWord")
s=s.replace("if (!f) return; const card = $('#contextCard'); card.dataset.feature", "if (!f) return; const card = $('#contextCard'); if (!pinned && card.dataset.pinned === 'true' && !card.classList.contains('hidden')) return; card.dataset.feature")
s=s.replace("card._origin = origin; }", "card._origin = origin?.getElement?.() || origin || card._origin; const point = origin?.getLatLng?.() || origin?.getCenter?.(); const stage = $('.map-stage'); const at = point && map ? map.latLngToContainerPoint(point) : {x: stage.clientWidth / 2, y: 70}; card.style.left = `${Math.max(12, Math.min(at.x + 18, stage.clientWidth - card.offsetWidth - 12))}px`; card.style.top = `${Math.max(12, Math.min(at.y, stage.clientHeight - card.offsetHeight - 12))}px`; }")
s=s.replace("if (!map) return; clearOverlays();", "if (!map) return; clearOverlays(); renderFeatureList(); const current = findFeature($('#contextCard').dataset.feature); if (current && !visibleAt(current)) $('#contextCard').classList.add('hidden');")
s=s.replace("[[35.9,42.2,'ASSYRIA','region-label'],[31.15,35.45,'JUDAH','region-label'],[34.4,33.1,'Mediterranean Sea','water-label']]", "[[34.4,33.1,'Mediterranean Sea','water-label'], ...(state.layers.regions ? (state.date < -609 ? [[35.9,42.2,'ASSYRIA','region-label']] : state.date < -539 ? [[33.3,43.5,'BABYLONIA','region-label']] : [[33.3,43.5,'PERSIAN EMPIRE','region-label']]) : [])]")
s=s.replace("fillOpacity: .16, className", "fillOpacity: .07, className")
s=s.replace("bindFeature(layer, c); overlays.campaigns.push(layer);", "const hit = L.polyline(c.points, {color:'#52e5ff',weight:22,opacity:0,className:'campaign-hit'}).addTo(map); bindFeature(hit, c); overlays.campaigns.push(layer, hit);")
s=s.replace("el.setAttribute('aria-label', `${featureType(feature)}: ${feature.title || feature.name}`);", "el.setAttribute('aria-label', `${featureType(feature)}: ${feature.title || feature.name}`); el.addEventListener('focus', () => openFeature(feature, false, layer)); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFeature(feature, true, layer); } });")
s=s.replace("renderAll(); renderGuideStep(); persist();", "renderAll(); renderGuideStep(); const place = data.places.find(p => p.id === step.placeId); if (place && map) map.setView([place.lat,place.lng], 7); requestAnimationFrame(() => scrollVerse(state.verse,false)); persist();")
s=s.replace("const el = $(`#side-verse-${verse}`)", "const el = $(`#${state.view === 'read' ? 'read' : 'side'}-verse-${verse}`)")
start=s.index("  map = L.map('map'")
end=s.index('\n}\nfunction clearOverlays',start)
s=s[:start]+'''  map = L.map('map', { zoomControl: false, attributionControl: true, preferCanvas: false, minZoom: 5, maxZoom: 10, maxBounds: [[24,26],[41,52]], maxBoundsViscosity: .8 }).setView(center, zoom);
  L.control.zoom({position:'bottomright'}).addTo(map);
  L.control.scale({position:'bottomleft',imperial:false}).addTo(map);
  map.attributionControl.setPrefix(false);
  map.attributionControl.addAttribution('Natural Earth · Terrain: Mapzen / USGS / NOAA');
  for (const [name,z] of [['base',200],['relief',220],['water',240]]) { map.createPane(name); map.getPane(name).style.zIndex=z; map.getPane(name).style.pointerEvents='none'; }
  map.on('moveend', persist).on('dragstart zoomstart', () => { const card = $('#contextCard'); if (card.dataset.pinned !== 'true') card.classList.add('hidden'); });
  Promise.allSettled(['data/land.geojson','data/lakes.geojson','data/relief.json'].map(p => fetch(p).then(r => r.json()))).then(r => {
    if (r[0].status === 'fulfilled') L.geoJSON(r[0].value, {pane:'base',interactive:false, style: { color: '#416580', weight: 1, fillColor: '#173b53', fillOpacity: 1 } }).addTo(map);
    if (r[1].status === 'fulfilled') L.geoJSON(r[1].value, {pane:'water',interactive:false, style: { color: '#417996', weight: 1, fillColor: '#0b314b', fillOpacity: 1 } }).addTo(map);
    if (r[2].status === 'fulfilled') L.imageOverlay('assets/relief.png',r[2].value.bounds,{pane:'relief',opacity:.88,interactive:false}).addTo(map);
  });''' + s[end:]
p.write_text(s,encoding='utf-8')
