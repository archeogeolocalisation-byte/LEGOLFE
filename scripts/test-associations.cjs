/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {associationPlaces,associationFacts,associationSignatures}=require('../data/associationPlaces.ts');
const {suppliedPlaceMedia}=require('../data/suppliedPlaceMedia.ts');
const {places}=require('../data/places.ts'),{associationMedia}=require('../data/associationMedia.ts');
const {matchesExploreFilter}=require('../lib/exploreFilters.ts'),{mediaForPlace}=require('../lib/placeMedia.ts');
const Page=require('../app/[locale]/place/[id]/page.tsx'),Journal=require('../components/LocalJournal.tsx').default;
const {renderToReadableStream,renderToStaticMarkup}=require('react-dom/server');
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/media/associations/sources.json')));
(async()=>{
 assert.equal(associationPlaces.length,5);assert.equal(places.filter(p=>matchesExploreFilter(p,'associations')).length,9);
 for(const p of associationPlaces){
  const sheet=associationFacts[p.id],archivedImage=associationMedia[p.id][0],image=suppliedPlaceMedia[p.id]?.[0]??archivedImage,file=path.join(__dirname,'../public',archivedImage.src),entry=manifest.find(f=>f.id===p.id);
  assert.equal(sheet.verified,'2026-10-26');assert.ok(sheet.sources.length>=2);assert.ok(sheet.nearby.every(id=>id!==p.id&&places.some(p=>p.id===id)));
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),entry.sha256);assert.ok(fs.statSync(file).size<400000);
  assert.equal(archivedImage.license,entry.license);assert.equal(archivedImage.licenseUrl,entry.licenseUrl);assert.equal(mediaForPlace(p.id).src,image.src);
  if(suppliedPlaceMedia[p.id]){assert.ok(fs.existsSync(path.join(__dirname,'../public',image.src)));assert.equal(image.license,'');assert.equal(image.credit,'');}
  else{assert.match(image.license,/^CC BY(?:-SA)? /);assert.equal(new URL(image.source).hostname,'commons.wikimedia.org');}
  for(const locale of ['fr','en']){
   const stream=await renderToReadableStream(await Page.default({params:Promise.resolve({id:p.id,locale})}));await stream.allReady;const html=await new Response(stream).text();
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
   const schemas=[...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(m=>JSON.parse(m[1]));
   const schema=schemas.find(s=>s['@type']==='Organization');assert.ok(schema,p.id);assert.equal(schema.geo,undefined);assert.equal(schema.sameAs[0],p.website);
   assert.ok(html.includes(image.licenseUrl));assert.ok(html.includes(image.source));assert.ok(html.includes(associationSignatures[p.id][locale].quote.replaceAll('&','&amp;')));
   for(const source of sheet.sources)assert.ok(html.includes(source.url));
   assert.ok(html.includes('filter=associations'));assert.ok(html.includes(locale==='fr'?'SOUTENEZ-LES':'SUPPORT'));
   const metadata=await Page.generateMetadata({params:Promise.resolve({id:p.id,locale})});assert.equal(metadata.description,sheet.copy[locale].description);assert.ok(metadata.openGraph.images[0].url.endsWith(image.src));
   if(image.illustrative){assert.ok(html.includes(locale==='fr'?'Photo d’illustration':'Illustrative photograph'));assert.equal(schema.image,undefined);}
   else if(image.contextual)assert.ok(html.includes(locale==='fr'?'Photo du secteur':'Area photograph'));
  }
 }
 for(const locale of ['fr','en']){
  const html=renderToStaticMarkup(Journal({locale,news:[],today:'2026-10-26'}));
  for(const p of associationPlaces)assert.ok(html.includes(`href="/${locale}/place/${p.id}"`),'each profile is linked from Local life');
 }
 console.log('Associations: five real profiles, ten FR/EN renders, source/nearby links, open-photo hashes/licences, honest image labels, Organization schema, SEO and Local life discovery passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
