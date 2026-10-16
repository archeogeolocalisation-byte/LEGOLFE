const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, f);
const {placeMapPoints} = require('../data/placeMapPoints.ts');
const {additionalAgendaEvents} = require('../data/additionalAgendaEvents.ts');
const {events} = require('../data/events.ts');
const {verifiedEventUpdates, verifiedNewEvents} = require('../data/agendaVerified.ts');
const {qualityAgendaEvents} = require('../lib/agendaQuality.ts');
const {eventsInWindow, dateWindow} = require('../lib/agendaCalendar.ts');
const {pointDirectionsUrl} = require('../lib/placeMapLinks.ts');
const {validMapPoint} = require('../lib/villaMapLocation.ts');
const newPlaces = ['chateau-des-marres', 'base-nautique-cogolin', 'cogolin-village',
  'la-croix-valmer-village', 'cavalaire-village', 'la-mole-village',
  'plan-de-la-tour-village', 'rayol-canadel-village', 'gassin-village', 'la-verdoyante'];
for (const id of newPlaces) {
  const p = placeMapPoints[id][0];
  assert.ok(validMapPoint(p.latitude, p.longitude), id);
  assert.equal(p.checked, '2026-10-16');
  assert.ok(p.note.fr.length > 70 && p.note.en.length > 70);
  assert.equal(new URL(pointDirectionsUrl(p)).searchParams.get('destination'), p.directionsQuery);
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
console.log('Verified local catalog: 10 sourced map references, coordinate conversions, distinct districts and exact event sessions passed.');
