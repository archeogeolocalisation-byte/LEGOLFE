const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, f);
const {placeMapPoints} = require('../data/placeMapPoints.ts');
const {places} = require('../data/places.ts');
const {additionalAgendaEvents} = require('../data/additionalAgendaEvents.ts');
const {events} = require('../data/events.ts');
const {verifiedEventUpdates, verifiedNewEvents} = require('../data/agendaVerified.ts');
const {qualityAgendaEvents} = require('../lib/agendaQuality.ts');
const {eventsInWindow, dateWindow} = require('../lib/agendaCalendar.ts');
const {pointDirectionsUrl} = require('../lib/placeMapLinks.ts');
const {validMapPoint} = require('../lib/villaMapLocation.ts');
const {matchesExploreFilter}=require('../lib/exploreFilters.ts');
const coastalCriteria={
 'pointe-des-sardinaux':['do','beach','nature','walk','family','heritage','view'],
 'port-cogolin':['sea','do','walk','quiet'],
 'plage-luc-provensal-sainte-maxime':['beach','do','family','walk','view'],
 'plage-du-rayol':['beach','do','family','walk','view'],
 'maison-des-arcades-grimaud':['do','places','heritage','walk'],
};
for(const [id,filters] of Object.entries(coastalCriteria)){
 const place=places.find(p=>p.id===id);assert.ok(place,id);
 for(const filter of filters)assert.ok(matchesExploreFilter(place,filter),`${id}: ${filter}`);
 assert.equal(matchesExploreFilter(place,'party'),false);
}
const newPlaces = ['chateau-des-marres', 'base-nautique-cogolin', 'cogolin-village',
  'la-croix-valmer-village', 'cavalaire-village', 'la-mole-village',
  'plan-de-la-tour-village', 'rayol-canadel-village', 'gassin-village', 'la-verdoyante',
  'monroes-pub', 'la-vague-dor', 'byblos-beach', 'club-55', 'indie-beach',
  'casita-pampelonne', 'spa-du-bailli', 'san-peire-randonnee'];
for (const id of newPlaces) {
  const p = placeMapPoints[id][0];
  assert.ok(validMapPoint(p.latitude, p.longitude), id);
  assert.equal(p.checked, id==='san-peire-randonnee'?'2026-10-20':'2026-10-16');
  assert.ok(p.note.fr.length > 70 && p.note.en.length > 70);
  assert.equal(new URL(pointDirectionsUrl(p)).searchParams.get('destination'), p.directionsQuery || `${p.latitude},${p.longitude}`);
}
assert.equal(placeMapPoints['cogolin-village'][0].latitude, 43.2508, 'visitor bureau, not the administrative office');
assert.notEqual(placeMapPoints['cogolin-village'][0].longitude, placeMapPoints['base-nautique-cogolin'][0].longitude);
assert.equal(placeMapPoints['gassin-village'][0].latitude, Number((43 + 13.804 / 60).toFixed(6)), 'GPS minutes converted to decimal degrees');
assert.equal(placeMapPoints['la-verdoyante'][0].longitude, Number((6 + 35 / 60 + 24.67 / 3600).toFixed(6)), 'GPS seconds converted to decimal degrees');
for (const id of ['cecile-golmard-chef', 'taxi-estelle', 'maison-laurent-conciergerie']) {
  assert.equal(placeMapPoints[id], undefined, 'mobile services keep no invented fixed location');
}
const catalog = qualityAgendaEvents([
  ...events.map(e => ({...e, ...verifiedEventUpdates[e.id]})), ...verifiedNewEvents, ...additionalAgendaEvents,
]);
assert.equal(new Set(catalog.map(e => e.id)).size, catalog.length, 'published IDs remain unique');
const today = eventsInWindow(catalog, dateWindow('today', '2026-10-16')).map(e => e.id);
const weekend = eventsInWindow(catalog, dateWindow('weekend', '2026-10-16')).map(e => e.id);
assert.ok(today.includes('domaine-tropez-chocolat-vin-2026'));
assert.ok(!weekend.includes('domaine-tropez-chocolat-vin-2026'), 'Friday tasting is not a weekend event');
for (const id of ['masters-champions-petanque-2026', 'cogolin-arts-plastiques-2026', 'gigaro-peinture-lie-vin-2026']) {
  assert.ok(weekend.includes(id), id);
  assert.ok(!today.includes(id), id);
  assert.ok(!eventsInWindow(catalog, dateWindow('today', '2026-10-18')).some(e => e.id === id), 'Saturday does not imply Sunday');
}
assert.ok(!eventsInWindow(catalog, dateWindow('today', '2026-11-07')).some(e => e.id === 'cogolin-arts-plastiques-2026'));
assert.ok(eventsInWindow(catalog, dateWindow('today', '2026-11-14')).some(e => e.id === 'cogolin-arts-plastiques-2026'));
const remaining=places.filter(p=>!p.tags.includes('association')&&!placeMapPoints[p.id]?.length).map(p=>p.id).sort();
// Editorial additions keep search-based directions until a sourced geographic point is reviewed.
const pendingGeographicReview=['pointe-des-sardinaux','fete-chataigne-garde-freinet','musee-patrimoine-grimaud','villa-romaine-pardigon','chapelle-notre-dame-miremer','chapelle-sainte-magdeleine-la-mole','plage-de-la-nartelle'];
assert.deepEqual(remaining,[...pendingGeographicReview,'bateaux-verts-excursion','caseneuve-catamaran','cecile-golmard-chef','maison-laurent-conciergerie','taxi-estelle'].sort(),'only explicitly pending profiles and mobile services lack map references');
const hike=placeMapPoints['san-peire-randonnee'][0];
assert.equal(hike.kind,'area');assert.equal(hike.latitude,43.3111428);assert.equal(hike.longitude,6.5611339);
assert.equal(hike.source,'https://www.cirkwi.com/fr/point-interet/3041300-san-peire');
assert.equal(new URL(pointDirectionsUrl(hike)).searchParams.get('destination'),'43.3111428,6.5611339');
assert.equal(new URL(pointDirectionsUrl(hike)).searchParams.get('travelmode'),'walking');
assert.ok(hike.note.fr.includes('sommet')&&hike.note.en.includes('summit'));
const {guides}=require('../data/guides.ts');
assert.ok(guides.find(g=>g.slug==='randonnee-san-peire-plan-de-la-tour').placeIds.includes('san-peire-randonnee'),'hike links to its existing route guide');
assert.equal(new URL(pointDirectionsUrl(placeMapPoints['byblos-beach'][0])).searchParams.get('destination'),'42 boulevard Patch, 83350 Ramatuelle, France');
assert.equal(new URL(pointDirectionsUrl(placeMapPoints['club-55'][0])).searchParams.get('destination'),'43 boulevard Patch, 83350 Ramatuelle, France');
console.log('Verified local catalog: reviewed classifications, sourced map references, tracked pending geographic reviews, summit hiking reference, walking directions and exact event sessions passed.');
