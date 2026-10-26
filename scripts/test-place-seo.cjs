/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/guides/'+path.basename(f),width:1200,height:800};};
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const load=Module._load;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('/sitemap.xml/route.ts')){
  if(request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[]};
  if(request.endsWith('/lib/publicNews'))return {getPublicNews:async()=>[]};
  if(request.endsWith('/lib/publicVillas'))return {getPublishedVillas:async()=>[]};
 }
 return load.call(this,request,parent,...rest);
};
const {places}=require('../data/places.ts'),{placeFacts}=require('../data/placeFacts.ts');
const {discoveryFeatures}=require('../data/discoveryFeatures.ts');
const {placeSeoCopy}=require('../data/placeSeoCopy.ts');
const {relatedPlacesFor}=require('../lib/placeDiscovery.ts');
const {nearbyExplorer}=require('../lib/nearbyExplorer.ts');
const Page=require('../app/[locale]/place/[id]/page.tsx'),{GET}=require('../app/sitemap.xml/route.ts');
const {renderToReadableStream}=require('react-dom/server');
async function htmlFor(id,locale){const stream=await renderToReadableStream(await Page.default({params:Promise.resolve({id,locale})}));await stream.allReady;return new Response(stream).text();}
(async()=>{
 const xml=await(await GET()).text(),titles={fr:new Set(),en:new Set()},descriptions={fr:new Set(),en:new Set()};
 for(const id of Object.keys(placeSeoCopy))assert.ok(places.some(place=>place.id===id),`Unknown SEO override: ${id}`);
 for(const place of places){
  const related=relatedPlacesFor(place),nearby=nearbyExplorer(place.id,3);
  assert.ok(related.length>0&&related.length<=3,place.id);
  assert.equal(new Set(related.map(p=>p.id)).size,related.length);
  assert.ok(related.every(p=>p.id!==place.id&&places.includes(p)));
  const reviewedVillageStops={
   'ramatuelle-village':['phare-de-camarat','plage-de-bonne-terrasse','eglise-notre-dame-ramatuelle'],
   'gassin-village':['jardin-hardy-denonain-gassin','porte-des-sarrazins-gassin','eglise-notre-dame-assomption-gassin'],
  }[place.id];
  if(reviewedVillageStops)assert.deepEqual(related.map(p=>p.id),reviewedVillageStops,'Reviewed village visits keep direct public links');
  else assert.deepEqual(related.slice(0,nearby.length).map(p=>p.id),nearby.map(p=>p.place.id),'Sourced neighbors have priority');
  for(const locale of ['fr','en']){
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id:place.id})});
   const title=metadata.title.absolute,description=metadata.description;
   assert.ok(title.length>20&&description.length>60,`${place.id}/${locale}`);
   assert.equal(titles[locale].has(title),false,`Duplicate title: ${title}`);titles[locale].add(title);
   assert.equal(descriptions[locale].has(description),false,`Duplicate description: ${place.id}`);descriptions[locale].add(description);
   assert.equal(title.includes(`${place.location} · ${place.location}`),false,`Repeated town: ${place.id}`);
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/place/${place.id}`);
   assert.equal(metadata.alternates.languages.fr,`https://www.legolfe.com/fr/place/${place.id}`);
   assert.equal(metadata.alternates.languages.en,`https://www.legolfe.com/en/place/${place.id}`);
   assert.equal(metadata.robots.index,true);
   assert.ok(xml.includes(`<loc>${metadata.alternates.canonical}</loc>`));
   // Verify actual page output, including the async content component, rather than source strings.
   const html=await htmlFor(place.id,locale);
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${place.id}/${locale}: one main heading`);
   for(const target of related)assert.ok(html.includes(`href="/${locale}/place/${target.id}"`));
   assert.equal(html.includes('LE GOLFE / GUIDES'),false,`${place.id}/${locale}: no generic guide module`);
   const paragraphs=[...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().toLowerCase()).filter(text=>text.length>=100);
   assert.equal(new Set(paragraphs).size,paragraphs.length,`${place.id}/${locale}: no repeated descriptive paragraphs`);
   const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/g).map(tag=>tag.replace(/^.*?>/,'').replace(/<\/script>$/,'')).find(text=>JSON.parse(text)['@type']!=='BreadcrumbList'));
   assert.equal(schema.description,description,'Structured data and metadata describe the same content');
   if(place.id==='place-des-lices'&&locale==='fr'){assert.equal(title.includes('market'),false);assert.ok(html.includes('Place des Lices &amp; marché'));}
   if(place.id==='san-peire-randonnee'){
    const guide=discoveryFeatures[place.id][locale];
    for(const [heading] of guide.sections)assert.ok(html.includes(heading));
    for(const source of guide.sources)assert.ok(html.includes(source.url));
    assert.match(html,/datetime="2026-10-16"/i);
    assert.ok(html.includes('6 km'));assert.ok(html.includes('370 m'));
    assert.ok(xml.includes(`<loc>${metadata.alternates.canonical}</loc><lastmod>2026-10-16</lastmod>`));
   }
   if(place.id==='cap-taillat'){
    assert.ok(title.includes('Escalet')&&title.includes('Gigaro'),'Both primary trailheads are discoverable in metadata');
    for(const word of ['Canadel','Gigaro','Camarat','Colle Basse','40 minutes','494 m'])assert.ok(html.includes(word),`Taillat/${locale}: missing route distinction ${word}`);
    assert.ok(html.includes(locale==='fr'?'14,8 km':'14.8 km'));
    assert.ok(html.includes(`href="/${locale}/place/gigaro-beach"`),'Gigaro has a crawlable internal link');
    for(const source of discoveryFeatures[place.id][locale].sources)assert.ok(html.includes(source.url));
    assert.ok(xml.includes(`<loc>${metadata.alternates.canonical}</loc><lastmod>2026-10-16</lastmod>`));
    assert.ok(html.includes(locale==='fr'?'très fréquenté':'very busy'),'Summer crowding is visible');
   }
   if(placeFacts[place.id])assert.equal(description,placeFacts[place.id].copy[locale].description,'Preserve curated fact sheet metadata');
  }
 }
 const club=places.find(p=>p.id==='byblos-beach');
 assert.ok(relatedPlacesFor(club,12).some(p=>p.id==='ramatuelle-village'),'Multi-part locations retain their commune connections');
 const service=places.find(p=>p.id==='taxi-estelle');
 assert.ok(relatedPlacesFor(service).some(p=>p.location.includes('Ramatuelle')),'Mobile services use commune context without invented coordinates');
 process.env.VERCEL_ENV='preview';
 const preview=await Page.generateMetadata({params:Promise.resolve({locale:'fr',id:'san-peire-randonnee'})});
 assert.equal(preview.robots.index,false);assert.equal(preview.alternates,undefined);
 assert.equal((await GET()).status,503);
 console.log(`Place SEO: ${places.length*2} complete FR/EN pages rendered; unique metadata, schema, canonicals/hreflang, sitemap, related places, no duplicated descriptive paragraphs or generic guide modules, San Peïre sources and preview isolation passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
