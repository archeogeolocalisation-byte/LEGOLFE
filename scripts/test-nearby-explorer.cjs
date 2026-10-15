const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText,f);
const {placeMapPoints}=require('../data/placeMapPoints.ts'),{nearbyExplorer}=require('../lib/nearbyExplorer.ts');
for(const id of ['chateau-minuty','ramatuelle-village','escalet','bello-visto']){
 const p=placeMapPoints[id]?.[0];assert.ok(p,id);
 assert.match(p.source,/^https:\/\//);assert.ok(p.note.fr.length>55);
}
assert.equal(placeMapPoints['ramatuelle-village'][0].kind,'area');
assert.equal(placeMapPoints['escalet'][0].kind,'area');
assert.equal(placeMapPoints['chateau-minuty'][0].kind,'venue');
const candidates=nearbyExplorer('chateau-minuty');
assert.ok(candidates.length>0,'verified neighbors');
assert.ok(candidates.every(x=>x.distance<=12));
assert.ok(candidates.every(x=>placeMapPoints[x.place.id]?.length));
assert.ok(candidates.every(x=>x.place.id!=='chateau-minuty'));
assert.ok(candidates.every((x,i)=>!i||candidates[i-1].distance<=x.distance));
assert.deepEqual(nearbyExplorer('cecile-golmard-chef'),[],'mobile services have no fabricated anchor');
console.log('Sourced Explorer map markers and nearby reference selection passed');

for(const id of ['la-verdoyante','gassin-village','plan-de-la-tour-village']){
 const point=placeMapPoints[id]?.[0];assert.ok(point,id);
 assert.ok(point.source.startsWith('https://'));
 assert.ok(point.note.fr.length>55);
}
assert.equal(placeMapPoints['la-verdoyante'][0].kind,'venue');
assert.equal(placeMapPoints['gassin-village'][0].kind,'area');
assert.ok(Math.abs(placeMapPoints['la-verdoyante'][0].latitude-(43+14/60+14.64/3600))<.00001);
assert.ok(Math.abs(placeMapPoints['la-verdoyante'][0].longitude-(6+35/60+24.67/3600))<.00001);
assert.ok(placeMapPoints['la-verdoyante'][0].note.fr.includes('2027'));
console.log('Verified village centres and official restaurant GPS/seasonal reopening passed');
