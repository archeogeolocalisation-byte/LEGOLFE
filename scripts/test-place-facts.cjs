/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);
require.extensions['.webp']=(module,filename)=>{module.exports={src:'/media/guides/'+path.basename(filename),width:1200,height:800};};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const load=Module._load;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[]};
 if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicVillas'))return {getPublishedVillas:async()=>[]};
 return load.call(this,request,parent,...rest);
};
const {placeFacts}=require('../data/placeFacts.ts'),{placeFactsMedia}=require('../data/placeFactsMedia.ts');
const {places}=require('../data/places.ts'),{photosForPlace}=require('../lib/curatedPlaceGallery.ts'),{placesInDestination,getDestination}=require('../data/destinations.ts');
const Sheet=require('../components/PlaceFactSheet.tsx').default,Page=require('../app/[locale]/place/[id]/page.tsx');
const {renderToStaticMarkup}=require('react-dom/server'),{GET}=require('../app/sitemap.xml/route.ts');
const licenses=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/media/place-facts/licenses.json')));
(async()=>{
 assert.equal(Object.keys(placeFacts).length,4);
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
 assert.ok(placesInDestination(getDestination('grimaud')).some(p=>p.id==='port-grimaud'));
 const xml=await(await GET()).text();
 for(const [id,sheet] of Object.entries(placeFacts)){
  assert.ok(places.some(p=>p.id===id));assert.ok(sheet.nearby.every(target=>places.some(p=>p.id===target)&&target!==id));
  const photo=placeFactsMedia[id],entry=licenses.find(x=>x.id===id),file=path.join(__dirname,'../public',photo.src);
  assert.equal(entry.license,'CC BY-SA 4.0');assert.equal(entry.licenseUrl,photo.licenseUrl);assert.equal(entry.source,photo.source);assert.ok(photo.credit.includes(entry.author));
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),entry.sha256);
  assert.ok(fs.statSync(file).size<350000);assert.ok(photo.width<=1400&&photo.height>500);assert.equal(photosForPlace(id)[0].src,photo.src);
  for(const locale of ['fr','en']){
   const copy=sheet.copy[locale],html=renderToStaticMarkup(Sheet({id,locale}));
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes(photo.licenseUrl));assert.ok(html.includes(photo.source));assert.match(html,/datetime="2026-10-13"/i);
   for(const source of sheet.sources){assert.equal(new URL(source.url).protocol,'https:');assert.ok(html.includes(source.url));}
   for(let i=1;i<=copy.sections.length;i++){assert.ok(html.includes(`href="#visit-${i}"`));assert.ok(html.includes(`id="visit-${i}"`));}
   for(const target of sheet.nearby)assert.ok(html.includes(`href="/${locale}/place/${target}"`));
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/place/${id}`);assert.equal(metadata.description,copy.description);assert.ok(metadata.title.absolute.startsWith(copy.title));assert.ok(metadata.openGraph.images[0].url.endsWith(photo.src));
   assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/place/${id}</loc><lastmod>2026-10-13</lastmod>`));
  }
 }
 process.env.VERCEL_ENV='preview';assert.equal((await Page.generateMetadata({params:Promise.resolve({locale:'fr',id:'port-grimaud'})})).robots.index,false);
 console.log('Place facts: 8 FR/EN renders, licensed local images/hashes, navigation, metadata, discovery and sitemap passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
