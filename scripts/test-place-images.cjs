/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
const {places}=require('../data/places.ts'),{photosForPlace}=require('../lib/curatedPlaceGallery.ts'),{mediaForPlace}=require('../lib/placeMedia.ts'),{localPlacePhoto}=require('../lib/placeImage.ts'),{newExperienceMedia}=require('../data/newExperienceMedia.ts'),{placeImageCache}=require('../data/placeImageCache.ts');
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/media/place-cache/licenses.json')));
assert.ok(manifest.length>=64);
for(const entry of manifest){
 const bytes=fs.readFileSync(path.join(__dirname,'../public',entry.local));
 assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WEBP');
 assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.sha256);
 assert.equal(placeImageCache[entry.remote],entry.local);assert.equal(bytes.length,entry.bytes);
 assert.ok(entry.source.startsWith('https://')&&entry.credit&&entry.license,'Original credit and licence retained');
 assert.ok(entry.width>0&&entry.height>0&&Math.max(entry.width,entry.height)<=1280&&bytes.length<350000);
}
for(const place of places){
 const lead=mediaForPlace(place.id),photos=photosForPlace(place.id);
 for(const photo of [lead,...photos,...(newExperienceMedia[place.id]||[]).map(localPlacePhoto)].filter(Boolean)){
  assert.ok(photo.src.startsWith('/media/'),`${place.id}: displayed photos must not depend on a remote redirect or thumbnail service`);
  assert.ok(fs.existsSync(path.join(__dirname,'../public',photo.src)),`${place.id}: local photo exists`);
  if(photo.src.startsWith('/media/place-cache/'))assert.ok(photo.source&&photo.credit,`${place.id}: cached original attribution remains available`); // User-supplied local images retain their existing metadata.
 }
}
console.log(`Place images: ${manifest.length} checked local WebP copies, hashes/credits/licences, and all ${places.length} public place image selections passed.`);
