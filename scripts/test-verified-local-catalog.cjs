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
// Every published profile has either a sourced public reference or an explicitly
// reviewed sector-only reason. Associations are no longer exempt from coverage.
const remaining=places.filter(p=>!placeMapPoints[p.id]?.length).map(p=>p.id).sort();
assert.deepEqual(remaining,['agda-chats-du-golfe','cecile-golmard-chef','maison-laurent-conciergerie','taxi-estelle'].sort(),'only mobile services and AGDA without a public reception venue remain sector-only');
const {reviewedPlaceMapPoints}=require('../data/reviewedPlaceMapPoints.ts');
assert.equal(Object.keys(reviewedPlaceMapPoints).length,17);
for(const [id,points] of Object.entries(reviewedPlaceMapPoints))for(const point of points){
 assert.ok(places.some(p=>p.id===id));assert.ok(validMapPoint(point.latitude,point.longitude));
 assert.equal(point.checked,'2026-10-27');assert.ok(point.note.fr.length>70&&point.note.en.length>70);
 if(point.coordinateSource)assert.equal(new URL(point.coordinateSource).protocol,'https:');
}
const sardinaux=placeMapPoints['pointe-des-sardinaux'][0];
assert.equal(sardinaux.latitude,43.314625);assert.equal(sardinaux.longitude,6.671237);
assert.equal(sardinaux.source,'https://sportnature.var.fr/outdoor-site/110-La-pointe-des-Sardinaux');
assert.equal(sardinaux.travelMode,'walking');assert.ok(sardinaux.note.fr.includes('îlot'));
assert.equal(placeMapPoints['plage-de-la-nartelle'][0].latitude,placeMapPoints['sainte-maxime-village'].find(p=>p.id==='nartelle').latitude);
assert.equal(placeMapPoints['amis-moulins-ramatuelle'][0].latitude,placeMapPoints['moulin-de-paillas'][0].latitude,'mill, not tourism office footer');
assert.equal(placeMapPoints['association-festival-ramatuelle'][0].kind,'area','performance venue is not the association office');
assert.equal(placeMapPoints['escandihado-grimaud-cogolin'][0].kind,'area','public contact address does not certify every workshop venue');
assert.equal(placeMapPoints['caseneuve-catamaran'].length,2,'only sourced, labelled possible departures');
assert.equal(placeMapPoints['chapelle-sainte-magdeleine-la-mole'][0].travelMode,'walking');
assert.notEqual(placeMapPoints['chapelle-sainte-magdeleine-la-mole'][0].latitude,placeMapPoints['eglise-sainte-magdeleine-la-mole'][0].latitude,'hilltop chapel is distinct from village church');
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
console.log('Verified local catalog: reviewed classifications, sourced map references, all-profile map coverage and explicit sector fallbacks, summit hiking reference, walking directions and exact event sessions passed.');
