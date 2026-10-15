/* eslint-disable @typescript-eslint/no-require-imports -- scripts use CommonJS */
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,filename);
const {places}=require('../data/places.ts');
const {parseAskIntent,rankAskPlaces,composeAskShortlist,buildAskDayPlan}=require('../lib/askMatching.ts');
const rank=(query)=>rankAskPlaces(query,places,'fr',12).hits;
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
const exact=rank('Les Caves du Roy à Saint-Tropez');assert.equal(exact[0].p.id,'caves-du-roy');
const no=rank('Sans boîte de nuit, soirée tranquille en famille');assert.ok(!no.some(x=>x.p.id==='caves-du-roy'));
for(const x of rank('Restaurant à Gassin pour 4 personnes à 10 minutes, moins de 80 euros')){
 assert.ok(x.reasons.length>0);
 assert.ok(x.cautions.some(c=>c.includes('trajet')));
 assert.ok(x.cautions.some(c=>c.includes('Tarifs')));
}
console.log('Ask matching: FR/EN lexicon, exclusions, town, pricing guardrails, reasons and travel cautions passed');

const multi=composeAskShortlist("Une plage et un restaurant à Ramatuelle",places,"fr");
assert.ok(multi.length>=2,"beach and restaurant choices");
assert.equal(new Set(multi.map(x=>x.match.p.id)).size,multi.length,"unique places");
assert.ok(multi.every(x=>x.match.p.location.includes("Ramatuelle")),"town respected");
const strict=rankAskPlaces("Un restaurant calme à Gassin",places,"fr",12,true).hits;
assert.ok(strict.every(x=>x.reasons.some(reason=>reason==="Au calme")),"strict preferences met");
const relaxed=rankAskPlaces("Un restaurant calme à Gassin",places,"fr",12,false).hits;
assert.ok(strict.length<=relaxed.length,"strict results are subset in size");
assert.deepEqual(composeAskShortlist("Une plage à Ramatuelle",places,"fr"),[],"one activity is not an itinerary");
console.log("Multi-activity suggestions and strict optional preferences passed.");

const shortPlan=buildAskDayPlan("Une plage et un restaurant à Ramatuelle",places,"fr","half");
assert.ok(shortPlan&&shortPlan.steps.length===2,"half-day multi-activity plan");
assert.ok(shortPlan.steps.every(x=>x.match.p.location.includes("Ramatuelle")),"plan respects commune");
assert.equal(new Set(shortPlan.steps.map(x=>x.match.p.id)).size,shortPlan.steps.length,"no repeated venues");
assert.ok(shortPlan.notes.some(n=>n.includes("horaires")),"no implied opening hours");
const longerPlan=buildAskDayPlan("Une plage, une visite de village et un restaurant à Ramatuelle",places,"en","full");
assert.ok(longerPlan&&longerPlan.steps.length>=2&&longerPlan.steps.length<=3,"full-day capacity");
assert.equal(buildAskDayPlan("Trouve une maison à Saint-Tropez",places,"fr","full"),null,"no fabricated activity plan");
const constrainedPlan=buildAskDayPlan("Une plage et restaurant à Ramatuelle en 10 minutes et pour 60 euros",places,"fr","full");
if(constrainedPlan){assert.ok(constrainedPlan.notes.some(n=>n.includes("trajet")));assert.ok(constrainedPlan.notes.some(n=>n.includes("tarifs")));}
console.log("Editorial half/full-day planning and uncertainty regression tests passed.");
