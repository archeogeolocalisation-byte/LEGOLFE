/* eslint-disable @typescript-eslint/no-require-imports -- scripts use CommonJS */
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,filename);
const {places}=require('../data/places.ts');
const {parseAskIntent,rankAskPlaces}=require('../lib/askMatching.ts');
const rank=(query)=>rankAskPlaces(query,places,'fr',12);
let p=parseAskIntent('Une plage en famille à Ramatuelle, sans boîte, petit budget et à 15 minutes');
assert.ok(p.categories.includes('beach'));
assert.ok(p.facets.includes('family'));
assert.ok(p.excludedCategories.includes('party'));
assert.equal(p.town,'ramatuelle');
assert.equal(p.mentionsTime,true);
assert.equal(p.maxPriceLevel,2);
p=parseAskIntent('A quiet beach near Grimaud with two kids');
assert.ok(p.facets.includes('quiet'));assert.ok(p.facets.includes('family'));
assert.equal(p.town,'grimaud');
p=parseAskIntent('Sans boîte de nuit, mais un restaurant en famille');
assert.equal(p.categories.includes('party'),false);
assert.equal(p.categories.includes('eat'),true);
for(const {p} of rank('Un restaurant calme avec enfants à Saint-Tropez'))assert.notEqual(p.category,'party');
for(const {p} of rank('Plage à Ramatuelle en famille'))assert.ok(p.location.includes('Ramatuelle'),p.id);
for(const {p} of rank('Restaurant à petit budget'))assert.ok(p.priceLevel===undefined||p.priceLevel<=2,p.id);
const exact=rank('Les Caves du Roy à Saint-Tropez');assert.equal(exact.hits[0].p.id,'caves-du-roy');
const no=rank('Visiter une discothèque au Groenland avec rennes');assert.ok(!no.hits.some(x=>x.p.id==='caves-du-roy'));
for(const x of rank('Restaurant à Gassin pour 4 personnes à 10 minutes, moins de 80 euros').hits){
 assert.ok(x.reasons.length>0);
 assert.ok(x.cautions.some(c=>c.includes('trajet')));
 assert.ok(x.cautions.some(c=>c.includes('Tarifs')));
}
console.log('Ask matching: FR/EN lexicon, exclusions, town, pricing guardrails, reasons and travel cautions passed');
