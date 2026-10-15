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
