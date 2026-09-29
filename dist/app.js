import { featurePortraits, wordPortraits } from './portraits.js';
import { chapterFocus, chapterRoutes, chapterPoints, movementStyle } from './chapter-map.js';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const chapters = Array.from({ length: 66 }, (_, i) => i + 1);
const defaults = { chapter: 1, verse: 1, view: 'map', perspective: 'historical', date: -701, layers: { places: true, regions: true, campaigns: true, history: false }, sidebar: 'scripture', map: { center: [32.1, 35.0], zoom: 7 } };
let state = { ...defaults, ...readSaved(), layers: { ...defaults.layers, ...(readSaved().layers || {}) } };
let data = { sources: [], passages: [], events: [], places: [], campaigns: [], regions: [], words: [], guides: [], periods: [] };
let scripture = { translation: 'World English Bible', chapters: {} };
let map, savedScroll = 0, selectedWordButton, toastTimer, cardCloseTimer, cardOpenTimer, guideState = null;
let suppressFeatureFocus = false;

function readSaved() { try { return JSON.parse(localStorage.getItem('meridian-state')) || {}; } catch { return {}; } }
function persist() { try { localStorage.setItem('meridian-state', JSON.stringify({ ...state, map: map ? { center: [map.getCenter().lat, map.getCenter().lng], zoom: map.getZoom() } : state.map })); } catch {} updateUrl(); }
function updateUrl() { const p = new URLSearchParams({ chapter: state.chapter, verse: state.verse, view: state.view, mode: state.perspective }); history.replaceState(null, '', `#${p}`); }
function parseUrl() { const p = new URLSearchParams(location.hash.slice(1)); for (const key of ['chapter', 'verse']) if (p.has(key) && Number(p.get(key))) state[key] = Number(p.get(key)); if (['historical','lds'].includes(p.get('mode'))) state.perspective = p.get('mode'); }
function esc(s='') { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function richText(s='') { return esc(s).replace(/\n/g, '<br>'); }
function showToast(message) { const el = $('#toast'); el.textContent = message; el.classList.remove('hidden'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.add('hidden'), 4200); }
function source(id) { return data.sources.find(s => s.id === id); }
function sourcesHtml(ids = [], numbered = false) {
  ids = [...new Set(ids)].filter(id => source(id));
  if (!ids.length) return '<p class="muted">This entry has no source link.</p>';
  return ids.map((id, index) => {
    const s = source(id);
    return `<section class="source-preview"><h4>${numbered ? `${index + 1}. ` : ''}${esc(s.title)}</h4>${sourceImageHtml(s.image)}<p class="source-summary"><small>Source summary</small>${esc(s.summary || '')}</p><a class="source-link" target="_blank" rel="noopener" href="${esc(s.url)}">Read full source ↗ <small>(${esc(s.type)})</small></a></section>`;
  }).join('');
}

function passageFootnotes(p) {
  const ids = [...new Set([...(p?.sourceIds || []), ...(state.perspective === 'lds' ? p?.lds?.sourceIds || [] : [])])].filter(id => source(id));
  return (references = []) => [...new Set(references)].map(id => {
    const s = source(id), number = ids.indexOf(id) + 1;
    return s && number ? `<sup class="source-footnote"><a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="Source ${number}">${number}<span class="footnote-label" hidden>${esc(s.title)} ↗ (${esc(s.type)})</span></a></sup>` : '';
  }).join('');
}

// Render outside scrolling panels so citations remain readable at panel edges.
const sourceTooltip = document.createElement('div');
sourceTooltip.id = 'sourceTooltip';
sourceTooltip.className = 'source-tooltip';
sourceTooltip.role = 'tooltip';
sourceTooltip.hidden = true;
document.body.append(sourceTooltip);
let tooltipAnchor, tooltipCloseTimer;
function hideSourceTooltip() {
  clearTimeout(tooltipCloseTimer);
  tooltipAnchor?.removeAttribute('aria-describedby');
  tooltipAnchor = null;
  sourceTooltip.hidden = true;
}
function showSourceTooltip(anchor) {
  hideSourceTooltip();
  tooltipAnchor = anchor;
  sourceTooltip.textContent = $('.footnote-label', anchor).textContent;
  anchor.setAttribute('aria-describedby', sourceTooltip.id);
  sourceTooltip.hidden = false;
  const rect = anchor.getBoundingClientRect();
  const width = sourceTooltip.offsetWidth, height = sourceTooltip.offsetHeight;
  sourceTooltip.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - width - 8))}px`;
  sourceTooltip.style.top = `${Math.max(8, rect.top >= height + 12 ? rect.top - height - 6 : Math.min(rect.bottom + 6, innerHeight - height - 8))}px`;
}
document.addEventListener('pointerover', event => {
  const anchor = event.target.closest('.source-footnote a');
  if (anchor) showSourceTooltip(anchor);
  if (sourceTooltip.contains(event.target)) clearTimeout(tooltipCloseTimer);
});
document.addEventListener('pointerout', event => {
  if (event.target.closest('.source-footnote a, .source-tooltip')) tooltipCloseTimer = setTimeout(hideSourceTooltip, 150);
});
document.addEventListener('focusin', event => {
  const anchor = event.target.closest('.source-footnote a');
  if (anchor) showSourceTooltip(anchor); else hideSourceTooltip();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape') hideSourceTooltip(); });
document.addEventListener('scroll', hideSourceTooltip, true);
window.addEventListener('resize', hideSourceTooltip);
function eligibleWords(verse) { return data.words.filter(w => (w.chapter == null || Number(w.chapter) === state.chapter) && (!w.verses?.length || w.verses.includes(verse.verse))); }
function matchWord(token, candidates) { const plain = token.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''); return candidates.find(w => (w.matches || [w.label]).some(m => m.toLowerCase() === plain.toLowerCase())) || null; }

async function load() {
  parseUrl();
  const results = await Promise.allSettled(['data/content.json', 'data/scripture.json'].map(p => fetch(p).then(r => { if (!r.ok) throw Error(`${p} (${r.status})`); return r.json(); })));
  if (results[0].status === 'fulfilled') data = { ...data, ...results[0].value };
  if (results[1].status === 'fulfilled') scripture = results[1].value;
  if (!chapters.includes(state.chapter)) state.chapter = 1;
  if (!scripture.chapters[state.chapter]?.some(v => v.verse === state.verse)) state.verse = 1;
  state.view = 'map';
  if (!['historical','lds'].includes(state.perspective)) state.perspective = 'historical';
  state.date = Math.max(-780, Math.min(-539, Number(state.date) || -701));
  state.sidebar = 'scripture';
  buildStaticUi(); initMap(); renderAll();
  if (results.some(r => r.status === 'rejected')) showToast('Some study information did not load. Reload the page to try again.');
}

function buildStaticUi() {
  $('#scriptureAttribution').textContent = `${scripture.translation || 'World English Bible'} · ${scripture.copyright || 'Public domain'}`;
  initScriptureResize();
  initTimelineTooltip();
  $('#railChapters').innerHTML = chapters.map(c => `<button data-chapter="${c}" aria-label="Isaiah ${c}">${c}</button>`).join('');
  $('#layerOptions').innerHTML = [['places','Places','place'],['regions','Areas','region'],['campaigns','Paths','route'],['history','Dated context','route']].map(([key,label,kind]) => `<label class="layer-option"><input type="checkbox" data-layer="${key}"><span class="layer-swatch ${kind}"></span>${label}</label>`).join('');
  $('#periods').innerHTML = (data.periods.length ? data.periods : [{id:'pre',label:'Before Isaiah',description:'Earlier events'},{id:'isaiah',label:'Isaiah',description:'Events in Isaiah 36–39'},{id:'post',label:'After Isaiah',description:'Later events'}]).slice(0,3).map(p => `<button data-period="${esc(p.id)}">${esc(p.label)}<small>${esc(p.description || '')}</small></button>`).join('');
  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
  $('#timelineRange').addEventListener('input', e => { state.date = Number(e.target.value); renderTimeline(); drawOverlays(); persist(); });
  $('#timelineRange').addEventListener('change', () => { if (!isPassageDate()) showToast('The map now shows the date you selected. Select Return to passage to restore the passage date.'); });
  $('#libraryDialog .dialog-close').addEventListener('click', () => $('#libraryDialog').close());
  if (matchMedia('(max-width:720px)').matches) {
    $('#layerOptions').classList.add('hidden');
    $('#layerToggle').setAttribute('aria-expanded', 'false');
  }
}
function initScriptureResize() {
  const divider = $('#scriptureResize'), panel = $('#scriptureSidebar'), view = $('#mapView');
  const desktop = matchMedia('(min-width:721px)');
  let drag = null, frame = 0;
  const maximum = () => Math.max(280, view.clientWidth - 288);
  function update(width) {
    if (!desktop.matches || !view.clientWidth) return;
    const value = Math.round(Math.max(280, Math.min(maximum(), width)));
    panel.style.setProperty('--scripture-width', `${value}px`);
    divider.setAttribute('aria-valuemax', String(maximum()));
    divider.setAttribute('aria-valuenow', String(value));
    divider.setAttribute('aria-valuetext', `${value} pixels`);
    return value;
  }
  divider.addEventListener('pointerdown', e => {
    if (e.button !== 0 || !desktop.matches) return;
    e.preventDefault();
    divider.focus();
    drag = { id: e.pointerId, x: e.clientX, width: panel.getBoundingClientRect().width };
    divider.setPointerCapture(e.pointerId);
    document.body.classList.add('resizing-scripture');
  });
  divider.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    state.scriptureWidth = update(drag.width + e.clientX - drag.x);
  });
  function finish() {
    if (!drag) return;
    drag = null;
    document.body.classList.remove('resizing-scripture');
    persist();
  }
  divider.addEventListener('pointerup', finish);
  divider.addEventListener('pointercancel', finish);
  divider.addEventListener('lostpointercapture', finish);
  divider.addEventListener('keydown', e => {
    const current = panel.getBoundingClientRect().width;
    const widths = { ArrowLeft: current - 20, ArrowRight: current + 20, Home: 280, End: maximum() };
    if (!(e.key in widths)) return;
    e.preventDefault();
    state.scriptureWidth = update(widths[e.key]);
    persist();
  });
  new ResizeObserver(() => {
    update(Number(state.scriptureWidth) || (innerWidth <= 1100 ? 365 : 432));
  }).observe(view);
  new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => map?.invalidateSize({ pan: false }));
  }).observe(panel);
}
function onClick(e) {
  const chapter = e.target.closest('[data-chapter]'); if (chapter) { selectChapter(Number(chapter.dataset.chapter)); return; }
  const perspective = e.target.closest('[data-perspective]'); if (perspective) { state.perspective = perspective.dataset.perspective; renderAll(); persist(); return; }
  const layer = e.target.closest('[data-layer]'); if (layer) { state.layers[layer.dataset.layer] = e.target.checked; drawOverlays(); persist(); return; }
  const word = e.target.closest('[data-word-id]'); if (word) { openWord(data.words.find(w => w.id === word.dataset.wordId), word); return; }
  const event = e.target.closest('[data-event]'); if (event) { const ev = data.events.find(x => x.id === event.dataset.event); if (ev) selectEvent(ev); return; }
  const act = e.target.closest('[data-action]'); if (act) { performAction(act.dataset.action, act.dataset.id); return; }
  const period = e.target.closest('[data-period]'); if (period) { const p = data.periods.find(x => x.id === period.dataset.period); if (p) { state.date = Math.round((p.start + p.end) / 2); renderTimeline(); drawOverlays(); persist(); } return; }
}
function onChange(e) { if (e.target.matches('[data-layer]')) { state.layers[e.target.dataset.layer] = e.target.checked; drawOverlays(); persist(); } if (e.target.matches('[data-passage-select]')) selectPassage(e.target.value); if (e.target.matches('[data-chapter-select]')) selectChapter(Number(e.target.value)); }
function performAction(action, id) {
  if (action === 'chapter-prev' || action === 'chapter-next') { const i = chapters.indexOf(state.chapter); const next = chapters[i + (action === 'chapter-prev' ? -1 : 1)]; if (next) selectChapter(next); return; }
  if (action === 'focus-chapter') focusChapterMap();
  if (action === 'map-overview' || action === 'map-detail') { mapScope = action === 'map-detail' ? 'detail' : 'overview'; drawOverlays(); focusChapterMap(); }
  if (action === 'story-route') {
    const route = focusedRoutes().find(r=>r.id === id);
    if (route && map) { map.stop(); map.fitBounds(L.latLngBounds(route.points).pad(.2), {paddingTopLeft:[Math.min($('.layers').offsetWidth+35,map.getSize().x*.5),45],paddingBottomRight:[40,45],maxZoom:10,animate:!reducedMapMotion.matches}); openFeature(route,true); }
  }
  if (action === 'back-scripture') closeWord();
  if (action === 'close-card') closeCard();
  if (action === 'toggle-layers') {
    const collapsed = $('#layerOptions').classList.toggle('hidden');
    $('#layerToggle').setAttribute('aria-expanded', String(!collapsed));
    layoutPlaceLabels();
  }
  if (action === 'return-passage') { const p = activePassage(); if (p?.year) state.date = p.year; renderTimeline(); drawOverlays(); focusChapterMap(); persist(); }
  if (action === 'library') openLibrary();
  if (action === 'guide') startGuide(id);
  if (action === 'open-guides') { renderGuides(); persist(); }
  if (action === 'guide-list') { guideState = null; renderGuides(); $("#tourDrawer .tour-choice")?.focus(); }
  if (action === 'close-guides') $('#tourDrawer').classList.add('hidden');
  if (action === 'guide-next' || action === 'guide-prev') moveGuide(action === 'guide-next' ? 1 : -1);
}
function renderAll() { if (lastMapChapter !== state.chapter) mapScope = 'overview'; renderTop(); renderView(); renderTimeline(); renderScripture(); drawOverlays(); if (lastMapChapter !== state.chapter) focusChapterMap(lastMapChapter != null); if (!$('#tourDrawer').classList.contains('hidden')) renderGuides(); }
function renderTop() { $$('[data-chapter]').forEach(b => b.classList.toggle('active', Number(b.dataset.chapter) === state.chapter)); $$('[data-perspective]').forEach(b => b.classList.toggle('active', b.dataset.perspective === state.perspective)); $$('[data-layer]').forEach(i => i.checked = !!state.layers[i.dataset.layer]); }
function renderView() { $('#timelineTooltip').hidden = true; setTimeout(() => map?.invalidateSize(), 80); }
function activePassage() { return data.passages.find(p => Number(p.chapter) === state.chapter && state.verse >= p.start && state.verse <= p.end) || data.passages.find(p => Number(p.chapter) === state.chapter); }
function selectChapter(chapter, verse = 1) { state.chapter = chapter; state.verse = verse; state.sidebar = 'scripture'; const p = activePassage(); if (p?.year) state.date = p.year; renderAll(); persist(); $('#sidebarContent').scrollTop=0; }
function selectPassage(id) { const p = data.passages.find(x => x.id === id); if (!p) return; state.chapter = Number(p.chapter); state.verse = Number(p.start); state.sidebar = 'scripture'; if (p.year != null) state.date = Number(p.year); renderAll(); persist(); showToast(`Following ${p.title || `Isaiah ${p.chapter}:${p.start}–${p.end}`}.`); }
function renderScripture() {
  if (state.sidebar === 'word') return renderWord();
  const verses = scripture.chapters?.[state.chapter] || [];
  const body = verses.length ? verses.map(v => renderVerse(v)).join('') : `<div class="word-view"><h2>Isaiah ${state.chapter}</h2><p>The text for this chapter is not available.</p></div>`;
  $('#sidebarContent').innerHTML = `<div class="scripture-heading"><button class="sidebar-next" data-action="chapter-prev" aria-label="Previous chapter" ${state.chapter === 1 ? 'disabled' : ''}>‹</button><h1>Isaiah ${state.chapter}</h1><button class="sidebar-next" data-action="chapter-next" aria-label="Next chapter" ${state.chapter === 66 ? 'disabled' : ''}>›</button></div><label class="chapter-picker">Chapter<select data-chapter-select aria-label="Choose Isaiah chapter">${chapters.map(c => `<option value="${c}" ${c === state.chapter ? 'selected' : ''}>${c} · ${esc(data.passages.find(p => p.chapter === c)?.title || `Isaiah ${c}`)}</option>`).join('')}</select></label>${mapStoryHtml()}${body}`;
  $('#sidebarContent .verse')?.insertAdjacentHTML('beforebegin', passageContextHtml());
}
function passageOptions() { return data.passages.filter(p => Number(p.chapter) === state.chapter); }
function passageSelectHtml() { const entries = passageOptions(); if (entries.length < 2) return ''; const current = activePassage()?.id; return `<label class="eyebrow">Historical setting<select class="passage-select" data-passage-select>${entries.map(p => `<option value="${esc(p.id)}" ${p.id === current ? 'selected' : ''}>${esc(p.start)}–${esc(p.end)} · ${esc(p.title || p.dateLabel || 'Passage context')}</option>`).join('')}</select></label>`; }
function passageContextHtml() { const p = activePassage(); if (!p) return ''; const cite = passageFootnotes(p); return `<section class="passage-context" aria-label="Passage context"><h2>${esc(p.title || 'Passage context')}</h2><div class="passage-prose"><p>${esc(p.summary)}${cite(p.sourceIds)}</p>${p.uncertainty ? `<p class="translation">${esc(p.uncertainty)}</p>` : ''}</div></section>`; }
function passageInterpretationHtml() {
  if (state.perspective !== 'lds') return '';
  const p = activePassage(), cite = passageFootnotes(p);
  return `<section class="passage-interpretation"><h3>Faithful LDS interpretation</h3><p class="translation">${p ? `Isaiah ${esc(String(p.chapter))}:${esc(String(p.start))}–${esc(String(p.end))} · ${esc(p.title || '')}` : `Isaiah ${state.chapter}`}</p><div class="passage-prose"><p>${esc(p?.lds?.text || 'This passage has no LDS study note yet.')}${cite(p?.lds?.sourceIds)}</p></div></section>`;
}
function renderVerse(v, prefix = 'side') {
  const candidates = eligibleWords(v); const parts = v.text.split(/(\s+)/); const text = parts.map(part => { if (/^\s+$/.test(part)) return part; const found = matchWord(part, candidates); const label = esc(part); return found ? `<button class="word" data-word-id="${esc(found.id)}">${label}</button>` : label; }).join('');
  return `<article class="verse ${v.verse === state.verse ? 'selected-verse' : ''}" id="${prefix}-verse-${v.verse}"><span class="verse-number">${v.verse}</span><span>${text}</span></article>`;
}
function openWord(word, trigger) { if (!word) return; savedScroll = $('#sidebarContent').scrollTop; const verseNode = trigger.closest('.verse'); const same = '[data-word-id="' + CSS.escape(word.id) + '"]'; const peers = verseNode ? $$(same, verseNode) : []; selectedWordButton = { verse: Number(verseNode?.id.match(/verse-(\d+)/)?.[1] || state.verse), selector: same, index: Math.max(0, peers.indexOf(trigger)) }; state.sidebar = 'word'; state.wordId = word.id; state.wordLabel = word.label; renderScripture(); $('#sidebarContent').scrollTop = 0; requestAnimationFrame(() => $('#sidebarContent .back-button')?.focus({preventScroll:true})); persist(); }
function wordReferences(word) {
  const ids = word.sourceIds || [];
  const greek = ids.filter(id => id.startsWith('lxx'));
  const hebrew = ids.filter(id => id === 'strong' || id === 'oshb');
  const meaning = ids.filter(id => id === 'strong' || id.startsWith('web'));
  const ordered = [...new Set([...greek, ...hebrew, ...ids])].filter(id => source(id));
  return { greek, hebrew, meaning, discussion: ordered, ordered, cite: passageFootnotes({ sourceIds: ordered }) };
}
function wordLanguagesHtml(word) {
  const refs = wordReferences(word), cite = refs.cite;
  return `<div class="word-section word-languages"><div class="word-language-grid"><div class="word-language"><h3>Septuagint Greek</h3>${word.greek ? `<p class="term" lang="grc">${esc(word.greek)}${cite(refs.greek)}</p>` : '<p>No confirmed Greek match.</p>'}</div><div class="word-language word-language-hebrew"><h3>Hebrew</h3>${word.hebrew ? `<p class="term hebrew-term"><bdi lang="he" dir="rtl">${esc(word.hebrew)}</bdi>${cite(refs.hebrew)}</p><p>${esc(word.transliteration || '')}</p>` : '<p>No confirmed Hebrew match.</p>'}</div></div>${word.greek && word.greekNote ? `<p class="word-language-note">${esc(word.greekNote)}${cite(refs.greek)}</p>` : ''}</div>`;
}
function renderWord() {
  const word = data.words.find(w => w.id === state.wordId); const title = word?.label || state.wordLabel || 'Selected word';
  let html = `<section class="word-view"><button class="back-button" data-action="back-scripture">← Back to scripture</button><h2>${esc(title)}</h2>${wordPortraits(title)}`;
  if (!word) html += `<p class="translation">No study note yet</p><div class="word-section"><p>This word has no study note yet. The app does not give a Hebrew or Greek match for it.</p></div>`;
  else {
    const refs = wordReferences(word), cite = refs.cite;
    html += wordLanguagesHtml(word);
    if (word.meaning) html += `<div class="word-section"><h3>Meaning in this passage</h3><p>${richText(word.meaning)}${cite(refs.meaning)}</p></div>`;
    if (word.discussion) html += `<div class="word-section"><h3>Study note</h3><p>${richText(word.discussion)}${cite(refs.discussion)}</p></div>`;

    if (word.related?.length) html += `<div class="word-section"><h3>Related use</h3>${word.related.map(r => `<a class="source-link" target="_blank" rel="noopener" href="${esc(r.url)}">${esc(r.label)} — ${esc(r.note || '')}</a>`).join('')}</div>`;
    html += `<div class="word-section"><h3>Sources</h3>${sourcesHtml(refs.ordered, true)}</div>`;
  } $('#sidebarContent').innerHTML = html + '</section>';
}
function closeWord() { const restore = selectedWordButton; state.sidebar = 'scripture'; renderScripture(); persist(); requestAnimationFrame(() => { $('#sidebarContent').scrollTop = savedScroll; const verse = $(`#side-verse-${restore?.verse}`); const button = verse ? $$(restore.selector, verse)[restore.index] : null; button?.focus({ preventScroll: true }); }); }
function scrollVerse(verse, focus = true) {
  const number = Number(verse);
  if (!scripture.chapters[state.chapter]?.some(v => v.verse === number)) return;
  state.verse = number;
  $$('#sidebarContent .verse').forEach(el => el.classList.toggle('selected-verse', el.id === `side-verse-${number}`));
  const el = $(`#side-verse-${number}`);
  if (el) {
    el.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (focus) $('button', el)?.focus({preventScroll:true});
  }
  renderTop(); persist();
}
function isPassageDate() { const p = activePassage(); return !p?.year || state.date === p.year; }
function renderTimeline() {
  const p = activePassage(), follow = isPassageDate();
  $('#timelineRange').value = state.date;
  $('#timelineRange').setAttribute('aria-valuetext', `${Math.abs(state.date)} BCE`);
  $('#timelineChapter').textContent = `Isaiah ${state.chapter}`;
  $('#dateLabel').value = p?.year == null ? 'Date Unclear' : follow && p?.dateLabel ? p.dateLabel : `${Math.abs(state.date)} BCE`;
  $('#returnPassage').classList.toggle('hidden', follow || !p?.year);
  $('#timelineTooltip').textContent = `${Math.abs(state.date)} BCE`;
}
function initTimelineTooltip() {
  const range = $('#timelineRange'), tooltip = $('#timelineTooltip');
  let pointerId = null;
  function position(event) {
    tooltip.textContent = `${Math.abs(Number(range.value))} BCE`;
    tooltip.hidden = false;
    tooltip.style.left = `${Math.max(8, Math.min(event.clientX - tooltip.offsetWidth / 2, innerWidth - tooltip.offsetWidth - 8))}px`;
    tooltip.style.top = `${Math.max(8, event.clientY - tooltip.offsetHeight - 16)}px`;
  }
  function stop() { pointerId = null; tooltip.hidden = true; }
  range.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    pointerId = event.pointerId;
    range.setPointerCapture(pointerId);
    position(event);
  });
  range.addEventListener('pointermove', event => { if (event.pointerId === pointerId) position(event); });
  range.addEventListener('pointerup', stop);
  range.addEventListener('pointercancel', stop);
  range.addEventListener('lostpointercapture', stop);
  range.addEventListener('blur', stop);
  window.addEventListener('blur', stop);
}
function eventsNear(year, range = 10) { return data.events.filter(e => Math.abs(Number(e.year) - year) <= range).sort((a,b) => Math.abs(a.year-year)-Math.abs(b.year-year)); }
function selectEvent(event) { state.date = Number(event.year); renderTimeline(); drawOverlays(); persist(); openFeature(event, true, null); }
function findFeature(id) { return [...data.places, ...data.events, ...data.campaigns, ...data.regions, ...focusedRoutes(), ...chapterImpacts(), ...chapterAreas()].find(f => f.id === id); }
function featureType(f) { return f.narrativeRegion ? 'Geographic area · approximate' : f.impact ? 'Destruction / distress' : f.chapterRoute || f.textRoute ? 'Chapter path · schematic' : data.campaigns.includes(f) ? 'Campaign route' : data.regions.includes(f) ? 'Political influence' : data.places.includes(f) ? 'Place' : 'Timeline event'; }
// Keep floating study windows mutually exclusive without restoring old focus.
function openStudyModal(id) {
  clearTimeout(cardOpenTimer);
  clearTimeout(cardCloseTimer);
  hideSourceTooltip();
  const previousSuppression = suppressFeatureFocus;
  suppressFeatureFocus = true;
  try {
    for (const modal of $$('#contextCard, #tourDrawer, dialog')) {
      if (modal.id === id) continue;
      if (modal.tagName === 'DIALOG') {
        if (modal.open) modal.close();
      } else modal.classList.add('hidden');
    }
    const modal = $('#' + id);
    if (modal.tagName === 'DIALOG') {
      if (!modal.open) modal.showModal();
    } else modal.classList.remove('hidden');
  } finally {
    suppressFeatureFocus = previousSuppression;
    syncMapSelection();
  }
}
function focusPathVerse(feature) {
  if (!feature.chapterRoute && !feature.textRoute && !data.campaigns.includes(feature)) return;
  const chapter = Number(feature.chapter), verse = Number(feature.verse);
  if (!scripture.chapters[chapter]?.some(v => v.verse === verse)) return;
  if (chapter !== state.chapter) selectChapter(chapter, verse);
  if (state.sidebar !== 'scripture') { state.sidebar = 'scripture'; renderScripture(); }
  scrollVerse(verse, false);
}
function openFeature(f, pinned = false, origin) { if (!f) return; if (pinned) focusPathVerse(f); const card = $('#contextCard'); if (!pinned && card.dataset.pinned === 'true' && !card.classList.contains('hidden')) return; card.dataset.feature = f.id; card.dataset.pinned = String(pinned); const lds = state.perspective === 'lds' && f.lds?.text ? `<div class="word-section"><h3>Faithful LDS interpretation</h3><p>${esc(f.lds.text)}</p></div>` : ''; card.innerHTML = `<button class="dialog-close" data-action="close-card" aria-label="Close context">×</button><span class="eyebrow">${featureType(f)}</span><h2>${esc(f.name || f.title)}</h2>${featurePortraits(f, state.date)}${f.dateLabel ? `<span class="badge">${esc(f.dateLabel)}</span>` : ''}<p>${esc(f.summary || 'No description is available for this feature.')}</p>${lds}<div class="word-section"><h3>Sources & evidence</h3>${sourcesHtml(f.sourceIds)}</div>`; openStudyModal('contextCard'); card.scrollTop = 0; card._origin = origin?.getElement?.() || origin || card._origin; const point = origin?.getLatLng?.() || origin?.getCenter?.(); const stage = $('.map-stage'); const labelRect = origin?.getElement?.()?.matches('.city-label') ? origin.getElement().firstElementChild.getBoundingClientRect() : null; const stageRect = stage.getBoundingClientRect(); const at = labelRect ? {x:labelRect.right-stageRect.left, y:labelRect.top-stageRect.top} : point && map ? map.latLngToContainerPoint(point) : {x: stage.clientWidth / 2, y: 70}; card.style.left = `${Math.max(12, Math.min(at.x + 18, stage.clientWidth - card.offsetWidth - 12))}px`; card.style.top = `${Math.max(12, Math.min(at.y, stage.clientHeight - card.offsetHeight - 12))}px`; }
function closeCard() { const card = $('#contextCard'); if (card.classList.contains('hidden')) return; card.classList.add('hidden'); syncMapSelection(); suppressFeatureFocus=true; card._origin?.focus?.({preventScroll:true}); suppressFeatureFocus=false; }

function initMap() {
  if (!window.L) { showToast('The map did not load. Reload the page to try again.'); return; }
  const stored = state.map || defaults.map; const center = Array.isArray(stored.center) && stored.center[0] >= 8 && stored.center[0] <= 45 && stored.center[1] >= 20 && stored.center[1] <= 57 ? stored.center : defaults.map.center; const zoom = stored.zoom >= 3 && stored.zoom <= 10 ? stored.zoom : defaults.map.zoom;
  map = L.map('map', { zoomControl: false, attributionControl: true, preferCanvas: false, minZoom: 3, maxZoom: 10, zoomSnap: .25, maxBounds: [[8,20],[45,57]], maxBoundsViscosity: .8 }).setView(center, zoom);
  L.control.zoom({position:'bottomright'}).addTo(map);
  L.control.scale({position:'bottomleft',imperial:false}).addTo(map);
  map.attributionControl.setPrefix(false);
  map.attributionControl.addAttribution('Natural Earth · Terrain: Mapzen / USGS / NOAA · Places: <a href="https://www.openbible.info/geo/">OpenBible.info</a> / <a href="https://www.openstreetmap.org/copyright">OSM contributors</a>');
  for (const [name,z] of [['base',200],['relief',220],['detail',230],['water',240]]) { map.createPane(name); map.getPane(name).style.zIndex=z; map.getPane(name).style.pointerEvents='none'; }
  map.on('moveend', persist).on('moveend zoomend resize', refreshMapDetails).on('dragstart zoomstart', () => { const card = $('#contextCard'); if (card.dataset.pinned !== 'true') card.classList.add('hidden'); });
  Promise.allSettled(['data/land.geojson','data/lakes-detail.geojson','data/relief.json'].map(p => fetch(p).then(r => r.json()))).then(r => {
    if (r[0].status === 'fulfilled') L.geoJSON(r[0].value, {pane:'base',interactive:false, style: { color: '#dfc990', weight: 1, fillColor: '#a4ac79', fillOpacity: 1 } }).addTo(map);
    if (r[1].status === 'fulfilled') L.geoJSON(r[1].value, {pane:'water',interactive:false, style: { color: '#81bbca', weight: 1.2, fillColor: '#155c80', fillOpacity: 1 } }).addTo(map);
    if (r[2].status === 'fulfilled') {
      L.imageOverlay('assets/relief.png',r[2].value.bounds,{pane:'relief',opacity:1,interactive:false}).addTo(map);
      const detail = r[2].value.detail;
      if (detail) L.tileLayer(detail.url, {pane:'detail', bounds:detail.bounds, minZoom:detail.minZoom,
        maxNativeZoom:detail.maxNativeZoom, maxZoom:10, noWrap:true, keepBuffer:1,
        errorTileUrl:'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}).addTo(map);
    }
  });
}
const mapFeatures = new Map(), arrowFeatures = new Map(), labelFeatures = new Map();
const reducedMapMotion = matchMedia('(prefers-reduced-motion: reduce)');
const mapTransitionMs = 650;
// Retain each feature by identity. Interrupted fades resume from their current opacity.
function fadeMapFeature(entry, visible, done) {
  const el = entry.layer.getElement();
  const opacity = entry.animation ? getComputedStyle(el).opacity : (entry.visible ? '1' : '0');
  entry.animation?.cancel();
  entry.visible = visible;
  el.style.opacity = visible ? '1' : '0';
  el.style.pointerEvents = visible ? '' : 'none';
  if (el.hasAttribute('tabindex')) el.setAttribute('tabindex', visible ? '0' : '-1');
  el.setAttribute('aria-hidden', String(!visible));
  if (reducedMapMotion.matches || !el.animate) { entry.animation = null; done?.(); return; }
  const animation = el.animate([{opacity}, {opacity: visible ? 1 : 0}], {
    duration: visible ? mapTransitionMs : 350, easing: 'ease-in-out'
  });
  entry.animation = animation;
  animation.onfinish = () => { entry.animation = null; done?.(); };
}
function keepMapFeature(collection, key, create) {
  let entry = collection.get(key);
  if (!entry) {
    entry = {layer: create(), visible: false, animation: null};
    collection.set(key, entry);
  }
  if (!entry.visible) fadeMapFeature(entry, true);
  return entry.layer;
}
function retireMapFeatures(collection, wanted) {
  for (const [key, entry] of collection) {
    if (wanted.has(key) || !entry.visible) continue;
    fadeMapFeature(entry, false, () => {
      map.removeLayer(entry.layer);
      collection.delete(key);
    });
  }
}
reducedMapMotion.addEventListener('change', () => {
  if (!reducedMapMotion.matches) return;
  for (const collection of [mapFeatures, arrowFeatures, labelFeatures]) {
    for (const entry of collection.values()) entry.animation?.finish();
  }
  $$('.route-arrow svg').forEach(el => el.getAnimations().forEach(animation => animation.finish()));
});
function visibleAt(f) { return (f.start == null || state.date >= f.start) && (f.end == null || state.date <= f.end); }
const factions = {
  judah: { name: 'Judah', color: '#8a5908' },
  assyria: { name: 'Assyria', color: '#ae3924' },
  babylonia: { name: 'Babylonia', color: '#783951' },
  persian: { name: 'Persia', color: '#694529' }
};
function factionFor(feature) { return factions[feature.faction || feature.id] || { name: 'Place', color: '#594530' }; }
let lastMapChapter;
let mapScope = 'overview';
function focusChapterMap(animate = true) {
  if (!map) return;
  const focus = chapterFocus(data, state.chapter), points = chapterPoints(data, state.chapter, mapScope);
  lastMapChapter = state.chapter;
  if (!points.length) return;
  closeCard();
  map.stop();
  map.invalidateSize({pan:false});
  const size = map.getSize();
  const panel = $('.layers').getBoundingClientRect();
  const options = { maxZoom:focus.maxZoom || 10,
    paddingTopLeft:[Math.min(panel.width + 35, size.x * .5), 50],
    paddingBottomRight:[40,50], animate:animate && !reducedMapMotion.matches, duration:.8 };
  map.fitBounds(L.latLngBounds(points).pad(.12), options);
}
function focusedRoutes() { return chapterRoutes(data, state.chapter); }
function chapterAreas() { return (data.narrativeRegions || []).filter(r=>chapterFocus(data,state.chapter)?.placeIds.includes(r.placeId)); }
function chapterImpacts() {
  const focus = chapterFocus(data,state.chapter);
  return (focus?.impacts || []).map(item=>{
    const place = data.places.find(p=>p.id===item.placeId);
    return {...place,id:`impact:${state.chapter}:${item.placeId}`,impact:true,
      name:`${place.name.split(' · ')[0]} · destruction or distress`,
      summary:`${item.reference}. ${item.description} ${focus.limits}`,sourceIds:focus.sourceIds};
  });
}
function mapStoryHtml() {
  const focus = chapterFocus(data,state.chapter);
  if (!focus?.narrative) return '';
  const routes = focusedRoutes();
  return `<section class="map-story" aria-label="Geographic story"><h2>The wider story</h2><p>${esc(focus.narrative)}</p><details><summary>Movements & evidence${routes.length ? ` · ${routes.length}` : ''}</summary><p>${esc(focus.limits)}</p>${routes.map(r=>`<button class="story-route" data-action="story-route" data-id="${esc(r.id)}"><i style="background:${movementStyle(r).color}"></i><span>${esc(r.title)}<small>${esc(movementStyle(r).label)} · ${esc(r.evidence)}</small></span></button>`).join('')}<a class="source-link" target="_blank" rel="noopener" href="https://ebible.org/engwebp/ISA${String(state.chapter).padStart(2,'0')}.htm">Isaiah ${state.chapter} · source text ↗</a></details></section>`;
}
function displayedCampaigns() {
  const focused = focusedRoutes();
  const used = new Set(focused.map(r => r.originalId));
  return [...data.campaigns.filter(c => state.layers.history && visibleAt(c) && !used.has(c.id)), ...focused];
}
function chapterPlaceVisible(p) { return !p.chapterLocation || chapterFocus(data, state.chapter)?.placeIds.includes(p.id); }
function drawOverlays() {
  if (!map) return;
  const wanted = new Set();
  const feature = (key, create, info) => {
    wanted.add(key);
    return keepMapFeature(mapFeatures, key, () => {
      const layer = create().addTo(map);
      if (info) bindFeature(layer, info);
      return layer;
    });
  };
  const current = findFeature($('#contextCard').dataset.feature);
  if (current && !visibleAt(current)) $('#contextCard').classList.add('hidden');
  const regions = state.layers.regions && (state.layers.history || activePassage()?.year != null) ? data.regions.filter(visibleAt) : [];
  if (state.layers.regions) chapterAreas().forEach(r => {
    feature(r.id,()=>L.polygon(r.points,{color:'#896020',weight:1.5,dashArray:'3 5',fillColor:'#c69c50',fillOpacity:.09,className:'chapter-area'}),r);
  });
  const campaigns = state.layers.campaigns ? displayedCampaigns() : [];
  regions.forEach(r => {
    const color = factionFor(r).color;
    feature(`region:${r.id}`, () => L.polygon(r.points, { color, weight: 1.6, dashArray: '5 5', fillColor: color, fillOpacity: .12, className: 'region-overlay' }), r);
  });
  campaigns.forEach(c => {
    const style = movementStyle(c), color = c.chapterRoute ? style.color : factionFor(c).color;
    feature(`campaign:${c.id}`, () => L.polyline(c.points, { color, weight: c.chapterRoute ? (c.contextRoute ? 3.5 : 5) : 2, opacity: c.chapterRoute ? .9 : .3, dashArray: c.chapterRoute ? style.dash : '10 7', interactive: false, className: 'campaign-overlay' }));
    feature(`hit:${c.id}`, () => L.polyline(c.points, {color, weight:22, opacity:0, className:'campaign-hit'}), c);
  });
  if (state.layers.places) data.places.filter(chapterPlaceVisible).forEach(p => {
    feature(`place:${p.id}`, () => L.circleMarker([p.lat,p.lng], {radius:5, color:'#fff4dc', weight:2, fillColor:'#594530', fillOpacity:1}), p);
  });
  if (state.layers.places) chapterImpacts().forEach(p => {
    feature(p.id,()=>L.circleMarker([p.lat,p.lng],{radius:11,color:'#b52e26',weight:2.5,fillColor:'#c43c32',fillOpacity:.16,className:'chapter-impact'}),p);
  });
  retireMapFeatures(mapFeatures, wanted);
  const active = [...new Set([...regions, ...campaigns].map(f => f.faction || f.id))];
  $('#factionLegend').innerHTML = active.map(id => factions[id] ? '<span><i style="background:' + factions[id].color + '"></i>' + factions[id].name + '</span>' : '').join('');
  $('#factionLegend').hidden = !active.length;
  const focus = chapterFocus(data, state.chapter);
  const kinds = [...new Set(campaigns.filter(c=>c.chapterRoute).map(c=>c.kind))];
  $('.map-note').innerHTML = `<div class="map-scope"><button data-action="map-overview" aria-pressed="${mapScope === 'overview'}">Big picture</button><button data-action="map-detail" aria-pressed="${mapScope === 'detail'}">Local detail</button></div><button data-action="focus-chapter" class="chapter-focus-button">Focus Isaiah ${state.chapter}</button><div class="movement-legend">${kinds.map(kind=>{const s=movementStyle({kind});return `<span><i style="background:${s.color}"></i>${s.label}</span>`;}).join('')}${focus?.impacts?.length && state.layers.places ? '<span><i class="impact-key"></i>Destruction / distress</span>' : ''}</div><details><summary>Map evidence</summary>${esc(focus?.limits || focus?.note || '')}</details><span>Lines show connections, not exact roads.</span>`;
  refreshMapDetails();
}
function refreshMapDetails() {
  if (!map) return;
  const wanted = new Set();
  if (state.layers.campaigns) displayedCampaigns().filter(c => c.direction !== false).forEach(c => {
    // Work in screen pixels so arrows stay readable at every zoom level.
    const points = c.points.map(p => map.latLngToContainerPoint(p));
    for (let i = 1; i < points.length; i++) {
      const a = points[i-1], b = points[i], dx = b.x-a.x, dy = b.y-a.y;
      const length = Math.hypot(dx,dy);
      if (length < 18) continue;
      const count = Math.max(1, Math.floor(length / 85));
      for (let j = 0; j < count; j++) {
        const t = (j + .65) / count, x = a.x + dx*t, y = a.y + dy*t;
        if (x < -15 || y < -15 || x > map.getSize().x+15 || y > map.getSize().y+15) continue;
        const angle = Math.atan2(dy,dx)*180/Math.PI;
        const key = `${c.id}:${i}:${j}`;
        wanted.add(key);
        const latlng = map.containerPointToLatLng([x,y]);
        const entering = !arrowFeatures.has(key);
        const arrow = keepMapFeature(arrowFeatures, key, () => L.marker(latlng, {interactive:false, keyboard:false, icon:L.divIcon({className:'route-arrow', iconSize:[18,18], iconAnchor:[9,9], html:'<svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3 L14 9 L3 15 L6 9 Z" fill="' + (c.chapterRoute ? movementStyle(c).color : factionFor(c).color) + '" stroke="#fff0d5" stroke-width="1.2"/></svg>'})}).addTo(map));
        arrow.setLatLng(latlng);
        const svg = arrow.getElement().firstElementChild;
        svg.style.opacity = c.chapterRoute ? '1' : '.3';
        svg.style.transform = `rotate(${angle}deg)`;
        if (entering && !reducedMapMotion.matches && svg.animate) {
          svg.animate([
            {opacity:0, transform:`rotate(${angle}deg) translateX(-24px)`},
            {opacity:1, transform:`rotate(${angle}deg) translateX(0)`}
          ], {duration:650, delay:300 * (i - 1 + t) / (points.length - 1), fill:'backwards', easing:'cubic-bezier(.22,.61,.36,1)'});
        }
      }
    }
  });
  retireMapFeatures(arrowFeatures, wanted);
  layoutPlaceLabels();
  syncMapSelection();
}
function placePriority(place) {
  const focus = chapterFocus(data, state.chapter);
  if (focus?.focusPlaceIds.includes(place.id)) return 120;
  if (focus?.placeIds.includes(place.id)) return 100;
  const passage = activePassage();
  if (isPassageDate() && passage?.placeIds?.includes(place.id)) return 100;
  if (data.events.some(e => Math.abs(e.year-state.date) <= 6 && e.placeIds?.includes(place.id))) return 80;
  if (isPassageDate() && data.passages.some(p => p.chapter === state.chapter && p.placeIds?.includes(place.id))) return 60;
  return 0;
}
function layoutPlaceLabels() {
  const wanted = new Set();
  if (!state.layers.places) { retireMapFeatures(labelFeatures, wanted); return; }
  const size = map.getSize(), zoom = map.getZoom();
  if (!size.x || !size.y) return;
  const occupied = [];
  const mapRect = map.getContainer().getBoundingClientRect();
  // Reserve room for controls as well as other labels and city dots.
  $$('.layers, .leaflet-control').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width && r.height) occupied.push({x:r.left-mapRect.left-5,y:r.top-mapRect.top-5,w:r.width+10,h:r.height+10});
  });
  const places = data.places.filter(chapterPlaceVisible).map(p => ({p, point:map.latLngToContainerPoint([p.lat,p.lng]), priority:placePriority(p)}));
  places.forEach(({point}) => occupied.push({x:point.x-6,y:point.y-6,w:12,h:12}));
  const collides = r => occupied.some(b => r.x < b.x+b.w && r.x+r.w > b.x && r.y < b.y+b.h && r.y+r.h > b.y);
  places.sort((a,b) => b.priority-a.priority || a.p.name.localeCompare(b.p.name)).forEach(({p,point,priority}) => {
    if (!priority && zoom < 7) return;
    if (point.x < 0 || point.y < 0 || point.x > size.x || point.y > size.y) return;
    const existing = labelFeatures.get(p.id);
    const label = existing?.layer || leafletLabel([p.lat,p.lng], p.name.replace(' · approximate',''), 'city-label', p);
    const el = label.getElement();
    el.classList.toggle('relevant-label', !!priority);
    const text = el.firstElementChild;
    const w = text.offsetWidth, h = text.offsetHeight;
    const gap = priority ? 3 : Math.max(4, 20-(zoom-7)*7);
    const offset = 8 + gap;
    const offsets = [[offset,-h/2],[-w-offset,-h/2],[-w/2,-h-offset],[-w/2,offset]];
    const fit = offsets.find(([x,y]) => {
      const r = {x:point.x+x-gap,y:point.y+y-gap,w:w+gap*2,h:h+gap*2};
      return r.x >= 4 && r.y >= 4 && r.x+r.w <= size.x-4 && r.y+r.h <= size.y-4 && !collides(r);
    });
    if (!fit) { if (!existing) map.removeLayer(label); return; }
    el.style.width = w + 'px';
    el.style.height = h + 'px';
    el.style.marginLeft = fit[0] + 'px';
    el.style.marginTop = fit[1] + 'px';
    occupied.push({x:point.x+fit[0]-gap,y:point.y+fit[1]-gap,w:w+2*gap,h:h+2*gap});
    wanted.add(p.id);
    keepMapFeature(labelFeatures, p.id, () => label);
  });
  retireMapFeatures(labelFeatures, wanted);
}
function syncMapSelection() {
  const card = $('#contextCard');
  const selected = !card.classList.contains('hidden') && card.dataset.pinned === 'true' ? card.dataset.feature : null;
  for (const region of data.regions) {
    const active = region.id === selected;
    const layer = mapFeatures.get(`region:${region.id}`)?.layer;
    layer?.setStyle({
      color:active ? '#0877c4' : factionFor(region).color,
      weight:active ? 3.5 : 1.6,
      dashArray:active ? null : '5 5',
      fillOpacity:active ? .3 : .12
    });
    const el = layer?.getElement();
    el?.classList.toggle('selected-region', active);
    el?.setAttribute('aria-pressed', String(active));
  }
  for (const place of data.places) {
    const active = place.id === selected;
    const relevant = chapterFocus(data, state.chapter)?.focusPlaceIds.includes(place.id);
    const marker = mapFeatures.get(`place:${place.id}`)?.layer;
    marker?.setRadius(active ? 8 : relevant ? 6.5 : 4);
    marker?.setStyle({color:active ? '#fff' : '#fff4dc', weight:active ? 3 : 2, fillColor:active || relevant ? '#0877c4' : '#594530'});
    for (const layer of [marker, labelFeatures.get(place.id)?.layer]) {
      const el = layer?.getElement();
      el?.classList.toggle('selected-place', active);
      el?.setAttribute('aria-pressed', String(active));
    }
  }
}
function leafletLabel(latlng, label, className, feature) {
  const layer = L.marker(latlng, { interactive:!!feature, keyboard:false, icon: L.divIcon({ className: `map-text ${className}`, html: '<span>' + esc(label) + '</span>', iconSize: [0,0], iconAnchor: [0,0] }) }).addTo(map);
  if (feature) bindFeature(layer, feature, false);
  return layer;
}
function scheduleCardClose() { clearTimeout(cardCloseTimer); cardCloseTimer = setTimeout(() => { const c = $('#contextCard'); if (c.dataset.pinned !== 'true' && !c.matches(':hover')) c.classList.add('hidden'); }, 350); }
function bindFeature(layer, feature, preview = true) { layer.on({ mouseover(e) { if (!preview) return; clearTimeout(cardCloseTimer); clearTimeout(cardOpenTimer); cardOpenTimer = setTimeout(() => openFeature(feature, false, e.target), 260); }, mouseout() { clearTimeout(cardOpenTimer); scheduleCardClose(); }, click(e) { openFeature(feature, true, e.target); }, keypress(e) { if (e.originalEvent.key === 'Enter') openFeature(feature, true, e.target); } }); const el = layer.getElement?.(); if (el) { el.setAttribute('tabindex','0'); el.setAttribute('role','button'); el.setAttribute('aria-label', `${featureType(feature)}: ${feature.title || feature.name}`); el.addEventListener('focus', () => { if (preview && !suppressFeatureFocus) openFeature(feature, false, layer); }); el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFeature(feature, true, layer); } }); } }
function isLdsSource(s) { const ldsIds = new Set(data.passages.flatMap(p => p.lds?.sourceIds || [])); return ldsIds.has(s.id) || /faith|lds|church|devotional/i.test(s.type || ''); }
function librarySourceHtml(s) {
  const moments = (s.timestamps || []).map(moment => {
    const url = new URL(s.url);
    url.searchParams.set('t', `${moment.seconds}s`);
    return `<a class="source-link" target="_blank" rel="noopener" href="${esc(url.href)}">${esc(moment.label)} ↗</a>`;
  }).join('');
  const cited = (s.citedSourceIds || []).map(id => source(id)).filter(Boolean);
  const scriptureRefs = (s.scriptureReferences || []).map(ref => `<p><a target="_blank" rel="noopener" href="${esc(ref.url)}">${esc(ref.label)} ↗</a> · <a target="_blank" rel="noopener" href="${esc(ref.contextUrl)}">${esc(ref.location)} in talk ↗</a></p>`).join('');
  return `<article class="library-source" id="library-${esc(s.id)}"><a target="_blank" rel="noopener" href="${esc(s.url)}">${esc(s.title)} ↗</a><p>${esc(s.author || '')}${s.year ? ` · ${esc(s.year)}` : ''} · ${esc(s.type || 'Source')}</p>${sourceImageHtml(s.image)}<p>${esc(s.summary || '')}</p>${scriptureRefs ? `<details><summary>Isaiah references</summary>${scriptureRefs}</details>` : ''}${moments ? `<details><summary>Video sections</summary>${moments}</details>` : ''}${cited.length ? `<details><summary>Works cited in this video</summary>${cited.map(item => `<a class="source-link" href="#library-${esc(item.id)}">${esc(item.title)} · Read resource summary</a>`).join('')}</details>` : ''}${s.reviewed ? `<p><span class="badge">Source check</span> ${esc(s.reviewed)}</p>` : ''}${s.limitations ? `<p><span class="badge">Limitations</span> ${esc(s.limitations)}</p>` : ''}</article>`;
}
function openLibrary() {
  const list = state.perspective === 'historical' ? data.sources.filter(s => !isLdsSource(s)) : data.sources;
  const additions = list.filter(s => s.group === 'mcclellan');
  const conference = list.filter(s => s.group === 'conference-year');
  const other = list.filter(s => !['mcclellan', 'conference-year'].includes(s.group));
  const conferenceHtml = conference.length ? `<section aria-label="Recent general conference"><h3>General conference · past year</h3><p>September 27, 2025–September 27, 2026. Reviewed 72 conference items from October 2025 and April 2026. Found ${conference.length} talks with explicit Isaiah citations or a named Isaiah reference. Unnamed allusions were not systematically identified.</p><p>Conference sources are linked to the chapters they cite. Study questions are Meridian reflections.</p>${['April 2026','October 2025'].map(month => { const talks = conference.filter(s => s.conference === month); return `<details><summary>${month} · ${talks.length} talks</summary>${talks.map(librarySourceHtml).join('')}</details>`; }).join('')}</section>` : '';
  const modeNotice = state.perspective === 'historical' ? 'Historical mode shows historical sources. Select LDS to include Church sources.' : 'LDS mode shows historical sources and Church sources.';
  $('#libraryContent').innerHTML = `<h2>Source library</h2><p class="translation">${modeNotice}</p>${conferenceHtml}${additions.length ? `<section aria-label="Dan McClellan and cited scholarship"><h3>Dan McClellan and cited scholarship</h3><p>Four selected videos and five works cited in them. Read each summary with its source-check note and limitations. The authorship video connects directly to Isaiah 39. The other videos support broader Isaiah study.</p>${additions.map(librarySourceHtml).join('')}</section><h3>Other study resources</h3>` : ''}${other.map(librarySourceHtml).join('') || (additions.length || conference.length ? '' : '<p>No sources are available for this study mode.</p>')}`;
  // Scroll inside the dialog without replacing the app's chapter/verse URL state.
  $('#libraryContent').querySelectorAll('a[href^="#library-"]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.getElementById(link.getAttribute('href').slice(1));
    target?.scrollIntoView({block:'start'});
    target?.querySelector('a')?.focus({preventScroll:true});
  }));
  openStudyModal('libraryDialog');
  $('#libraryDialog').scrollTop = 0;
}
function renderGuides() { const drawer = $('#tourDrawer'); openStudyModal('tourDrawer'); if (!guideState) { drawer.innerHTML = `<button class="dialog-close" data-action="close-guides" aria-label="Close guides">×</button><span class="eyebrow">Study guides</span>${passageInterpretationHtml()}<h2>Choose a study guide</h2>${data.guides.map(g => `<button class="tour-choice" data-action="guide" data-id="${esc(g.id)}"><b>${esc(g.title)}</b><span>${esc(g.description || '')}</span></button>`).join('') || '<p>No study guides are available.</p>'}`; } else renderGuideStep(); drawer.scrollTop = 0; }
function startGuide(id) { const guide = data.guides.find(g => g.id === id); if (!guide?.steps?.length) { showToast('This study guide has no steps yet.'); return; } guideState = { id, index: 0 }; openStudyModal('tourDrawer'); applyGuideStep(); }
function applyGuideStep() { const guide = data.guides.find(g => g.id === guideState?.id); const step = guide?.steps?.[guideState.index]; if (!step) return; state.chapter = Number(step.chapter || state.chapter); state.verse = Number(step.verse || state.verse); state.sidebar = 'scripture'; if (step.year != null) state.date = Number(step.year); renderAll(); renderGuideStep(); focusChapterMap(); requestAnimationFrame(() => scrollVerse(state.verse,false)); persist(); }
function sourceImageHtml(image) {
  if (!image) return '';
  return `<figure class="guide-image"><a href="${esc(image.fullUrl || image.src)}" target="_blank" rel="noopener" aria-label="${esc(image.linkLabel || 'View full-size image')}"><img src="${esc(image.src)}" alt="${esc(image.alt)}" width="${Number(image.width)}" height="${Number(image.height)}"></a><figcaption>${esc(image.caption)}<br><a href="${esc(image.fullUrl || image.src)}" target="_blank" rel="noopener">${esc(image.linkLabel || 'View full-size image')} ↗</a><small><a href="${esc(image.creditUrl)}" target="_blank" rel="noopener">${esc(image.credit)}</a> · <a href="${esc(image.licenseUrl)}" target="_blank" rel="noopener">${esc(image.license)}</a> · <a href="${esc(image.sourceUrl)}" target="_blank" rel="noopener">Photo source ↗</a></small></figcaption></figure>`;
}
function guideReadingHtml(step) {
  const verses = (scripture.chapters[step.chapter] || []).filter(v => v.verse === Number(step.verse));
  const reading = verses.length ? `<section class="guide-reading"><h3>Isaiah ${Number(step.chapter)}:${Number(step.verse)}</h3><blockquote>${verses.map(v => esc(v.text)).join(' ')}</blockquote><a class="source-link" href="https://ebible.org/engwebp/ISA${String(step.chapter).padStart(2, '0')}.htm" target="_blank" rel="noopener">Read full chapter ↗</a><small>World English Bible · Public domain</small></section>` : '';
  const words = (step.wordIds || []).map(id => data.words.find(w => w.id === id)).filter(Boolean);
  return reading + words.map(w => `<section class="guide-reading"><h3>${esc(w.label)}</h3><p>${esc(w.meaning)}</p><p>${esc(w.discussion)}</p>${sourcesHtml(w.sourceIds)}</section>`).join('');
}
function renderGuideStep() { const guide = data.guides.find(g => g.id === guideState?.id); const step = guide?.steps?.[guideState.index]; if (!guide || !step) { guideState = null; return renderGuides(); } const extraSources = (step.sourceIds || []).filter(id => !/^web(?:\d+)?$/.test(id)); const sourceHtml = extraSources.length ? sourcesHtml(extraSources) : ''; $('#tourDrawer').innerHTML = `<button class="dialog-close" data-action="close-guides" aria-label="Close guide">×</button><button class="back-button guide-back" data-action="guide-list">← Back to guide list</button><p class="tour-progress">${esc(guide.title)} · Step ${guideState.index + 1} of ${guide.steps.length}</p><h2>${esc(step.title)}</h2><p>${richText(step.text || '')}</p>${(step.sourceIds || []).some(id => source(id)?.image) ? sourceHtml + guideReadingHtml(step) : guideReadingHtml(step) + sourceHtml}${passageInterpretationHtml()}<div class="tour-nav"><button data-action="guide-prev" ${guideState.index === 0 ? 'disabled' : ''}>← Previous</button><button data-action="guide-next">${guideState.index === guide.steps.length - 1 ? 'Finish' : 'Next →'}</button></div>`; $('#tourDrawer').scrollTop = 0; }
function moveGuide(direction) { const guide = data.guides.find(g => g.id === guideState?.id); if (!guide) return; const next = guideState.index + direction; if (next < 0) return; if (next >= guide.steps.length) { showToast(`${guide.title} complete. You can continue your study.`); guideState = null; $('#tourDrawer').classList.add('hidden'); return; } guideState.index = next; applyGuideStep(); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCard(); });
$('#layerToggle').dataset.action = 'toggle-layers'; $('#libraryButton').dataset.action = 'library'; $('#tourButton').dataset.action = 'open-guides'; $('#returnPassage').dataset.action = 'return-passage';
$('#contextCard').addEventListener('mouseenter', () => clearTimeout(cardCloseTimer));
$('#contextCard').addEventListener('mouseleave', scheduleCardClose);
load();
