// Pure helpers shared by the map and the chapter geography checks.
export function chapterFocus(data, chapter) {
  return data.chapterMaps?.find(item => item.chapter === Number(chapter));
}

export function chapterRoutes(data, chapter, scope = 'overview') {
  const focus = chapterFocus(data, chapter);
  const refs = [...(focus?.routes || []), ...(scope === 'overview' ? (focus?.contextRoutes || []).map(ref=>({...ref,contextRoute:true})) : [])];
  return refs.map(ref => {
    const route = [...data.campaigns, ...(data.textRoutes || [])].find(item => item.id === ref.id);
    if (!route) return null;
    return { ...route, id: `${route.id}:${ref.from}:${ref.to}`, originalId: route.id,
      kind:ref.kind || route.kind || (route.faction === 'babylonia' ? 'diplomacy' : 'military'),
      evidence:ref.evidence || route.evidence || 'Historical campaign context', contextRoute:!!ref.contextRoute,
      title: ref.title || route.title, points: route.points.slice(ref.from, ref.to + 1),
      summary: `${ref.reference}. ${route.summary} ${route.uncertainty || ''}`, chapterRoute: true };
  }).filter(Boolean);
}

export function chapterPoints(data, chapter, scope = 'overview') {
  const focus = chapterFocus(data, chapter);
  const ids = scope === 'overview' ? [...(focus?.focusPlaceIds || []),...(focus?.contextPlaceIds || []),...(focus?.impacts || []).map(i=>i.placeId)] : focus?.focusPlaceIds || [];
  const places = ids.map(id => data.places.find(p => p.id === id)).filter(Boolean);
  // Detail keeps local narrative paths when no earlier chapter path exists (e.g. Moab).
  const routes = chapterRoutes(data, chapter, scope === 'detail' && !focus?.routes?.length ? 'overview' : scope);
  return [...places.map(p => [p.lat, p.lng]), ...routes.flatMap(r => r.points)];
}

export const movementStyles = {
  military:{label:'Military movement',color:'#c43c32',dash:'9 5'},
  flight:{label:'Flight / refuge',color:'#db8410',dash:'3 6'},
  exile:{label:'Exile / captivity',color:'#904fac',dash:'10 4 2 4'},
  restoration:{label:'Return / gathering',color:'#128879',dash:'8 5'},
  diplomacy:{label:'Envoys / tribute',color:'#257fbd',dash:'12 5'}
};
export function movementStyle(route) { return movementStyles[route.kind] || movementStyles.diplomacy; }
