/* eslint-disable @typescript-eslint/no-require-imports -- verification scripts use CommonJS */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
const { places, placeCategories } = require('../data/places.ts');
const { matchesExploreFilter: matches, resolveExploreFilter: resolve, exploreFilterIds, exploreFilterLabels } = require('../lib/exploreFilters.ts');
const place = id => { const row = places.find(p => p.id === id); assert.ok(row, id); return row; };
for (const row of places) { assert.ok(matches(row, 'all')); assert.ok(matches(row, row.category), row.id); }
for (const category of placeCategories) assert.ok(exploreFilterIds.includes(category.id), category.id);
for (const id of exploreFilterIds) { assert.ok(exploreFilterLabels.fr[id]); assert.ok(exploreFilterLabels.en[id]); }
for (const id of ['caves-du-roy', 'gaio-club', 'opera-saint-tropez', 'monroes-pub']) {
  assert.ok(matches(place(id), 'party'), id);
  for (const filter of ['quiet', 'family', 'beach']) assert.equal(matches(place(id), filter), false, `${id}/${filter}`);
}
for (const id of ['bateaux-verts-excursion', 'caseneuve-catamaran']) { assert.ok(matches(place(id), 'sea')); assert.equal(matches(place(id), 'beach'), false); }
for (const id of ['ramatuelle-village', 'la-croix-valmer-village']) assert.equal(matches(place(id), 'beach'), false);
assert.equal(matches(place('saint-tropez-village'), 'quiet'), false);
for (const id of ['plan-de-la-tour-village', 'la-voile']) assert.ok(matches(place(id), 'quiet'));
for (const id of ['byblos-beach', 'club-55', 'indie-beach', 'casita-pampelonne']) { assert.ok(matches(place(id), 'eat')); assert.ok(matches(place(id), 'beach')); }
assert.ok(matches(place('domaine-rayol-kids'), 'family'));
assert.ok(matches(place('citadelle-saint-tropez'), 'view'));
assert.equal(resolve(undefined, 'party'), 'party');
assert.equal(resolve('sea', 'party'), 'sea');
for (const invalid of ['javascript:alert(1)', 'missing', ['party']]) assert.equal(resolve(invalid), 'all');
console.log(`Explore: ${places.length} places classified; nightlife, beaches, boats, family, views and legacy links passed.`);
