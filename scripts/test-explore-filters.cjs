/* eslint-disable @typescript-eslint/no-require-imports -- verification scripts use CommonJS */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
const { places, placeCategories } = require('../data/places.ts');
const { matchesExploreFilter: matches, resolveExploreFilter: resolve, exploreFilterIds, exploreFilterLabels } = require('../lib/exploreFilters.ts');
const place = id => { const row = places.find(p => p.id === id); assert.ok(row, id); return row; };
const {categoriesForPlace,facetsForPlace,placeFilterTokens}=require('../lib/placeFacets.ts');
for(const row of places){
 assert.equal(categoriesForPlace(row)[0],row.category,row.id);
 assert.ok(placeFilterTokens(row).includes(row.category),row.id);
 for(const facet of facetsForPlace(row))assert.ok(matches(row,facet),row.id+'/'+facet);
}
for(const id of ['pampelonne','club-55','byblos-beach','indie-beach'])assert.ok(matches(place(id),'beachclub'),id);
for(const id of ['pont-des-fees','san-peire-randonnee'])assert.ok(matches(place(id),'walk'),id);
assert.ok(matches(place('pont-des-fees'),'heritage'));
assert.ok(matches(place('caves-du-roy'),'music'));

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

const { matchesExploreSearch: search, resolveExploreSearch, exploreFilterHref } = require('../lib/exploreFilters.ts');
assert.ok(search(place('place-des-lices'), 'marché', 'saint-tropez'));
assert.ok(search(place('place-des-lices'), 'marche', 'saint-tropez'));
assert.ok(search(place('cap-taillat'), 'taillat', 'ramatuelle'));
assert.ok(search(place('cap-taillat'), 'taillat', 'la-croix-valmer'));
assert.equal(search(place('caves-du-roy'), '', 'ramatuelle'), false);
assert.equal(search(place('taxi-estelle'), 'xyz-missing', ''), false);
assert.deepEqual(resolveExploreSearch(['x'], 'missing'), {query:'',town:''});
const href=exploreFilterHref('en','party','roy & café','saint-tropez');
const parsed=new URL(href,'https://example.com');
assert.equal(parsed.searchParams.get('q'),'roy & café');
assert.equal(parsed.searchParams.get('filter'),'party');
assert.equal(parsed.searchParams.get('town'),'saint-tropez');
console.log('Explore combined search, accents, multi-town places and query preservation passed.');

for(const [id,query] of [
 ['jardin-hardy-denonain-gassin',"l'hardy"],
 ['jardin-hardy-denonain-gassin','L’HARDY'],
 ['plage-de-bonne-terrasse','bonne-terrasse'],
 ['sentiers-corniche-des-maures','randonnée'],
 ['phare-de-camarat','patrimoine'],
 ['domaine-rayol-kids','en famille'],
 ['phare-de-camarat','heritage'],
])assert.ok(search(place(id),query,''),`${id}: name punctuation and bilingual intent ${query}`);
assert.equal(search(place('caves-du-roy'),'en famille',''),false,'Negative family copy must not create an affirmative family theme');
assert.equal(search(place('plage-de-bonne-terrasse'),'bonne-terrasse','gassin'),false,'Search still respects town');
console.log('Explorer search includes reviewed bilingual themes, accents and punctuation variants.');
