/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);
require.extensions['.webp']=(module,filename)=>{module.exports={src:'/media/guides/'+path.basename(filename),width:1200,height:800};};
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const load=Module._load;
Module._load=function(request,parent,...rest){
 if((parent?.filename.endsWith('/sitemap.xml/route.ts')||parent?.filename.endsWith('/destinations/[town]/page.tsx'))&&request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[]};
 if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicNews'))return {getPublicNews:async()=>[]};if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicVillas'))return {getPublishedVillas:async()=>[]};
 return load.call(this,request,parent,...rest);
};
const {placeFacts}=require('../data/placeFacts.ts'),{placeFactsMedia}=require('../data/placeFactsMedia.ts');
const {placeMapPoints}=require('../data/placeMapPoints.ts');
const {places}=require('../data/places.ts'),{photosForPlace}=require('../lib/curatedPlaceGallery.ts'),{placesInDestination,getDestination}=require('../data/destinations.ts');
const Sheet=require('../components/PlaceFactSheet.tsx').default,Page=require('../app/[locale]/place/[id]/page.tsx');
const {renderToStaticMarkup}=require('react-dom/server'),{GET}=require('../app/sitemap.xml/route.ts');
const licenses=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/media/place-facts/licenses.json')));
(async()=>{
 assert.equal(Object.keys(placeFacts).length,38);
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
 assert.ok(placesInDestination(getDestination('grimaud')).some(p=>p.id==='port-grimaud'));
 const xml=await(await GET()).text();
 for(const [id,sheet] of Object.entries(placeFacts).filter(([id])=>!!placeFactsMedia[id])){
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
 const experienceIds=['domaine-de-la-croix','chateau-des-marres','base-nautique-cogolin','musee-gendarmerie-cinema'];
 const {newExperienceFacts}=require('../data/newExperienceFacts.ts');
 const {newExperienceMedia}=require('../data/newExperienceMedia.ts');
 for(const id of experienceIds){
  assert.ok(placeFacts[id],id);assert.ok(places.some(p=>p.id===id),id);
  const fact=newExperienceFacts[id],media=newExperienceMedia[id];
  assert.equal(fact.verified,'2026-10-14');assert.ok(fact.address.includes('France'));
  assert.ok(media.length>=1);assert.ok(fact.sources.length>=2);
  for(const photo of media){assert.ok(photo.source.startsWith('https://commons.wikimedia.org/'));assert.ok(photo.licenseUrl.startsWith('https://creativecommons.org/'));assert.ok(photo.credit);assert.ok(photo.caption.fr&&photo.caption.en);}
  assert.ok(fact.nearby.every(target=>target!==id&&places.some(p=>p.id===target)));
  for(const locale of ['fr','en']){
   const copy=fact.copy[locale],html=renderToStaticMarkup(Sheet({id,locale}));
   assert.ok(copy.intro.length>180);assert.ok(copy.sections.length>=4);assert.ok(copy.questions.length>=3);
   assert.ok(html.includes(fact.address));assert.ok(html.includes('google.com/maps/dir/'));const frame=html.match(/<iframe[^>]+src="([^"]+)"/);assert.ok(frame,`${id}/${locale}: visit map is rendered`);
   const mapUrl=new URL(frame[1].replaceAll('&amp;','&')),point=placeMapPoints[id]?.[0];
   if(point){
    assert.equal(mapUrl.origin,'https://www.openstreetmap.org',`${id}/${locale}: sourced marker uses OpenStreetMap`);
    assert.equal(mapUrl.pathname,'/export/embed.html');
    assert.equal(mapUrl.searchParams.get('marker'),`${point.latitude},${point.longitude}`,`${id}/${locale}: displayed coordinates match the verified reference`);
    assert.equal(mapUrl.searchParams.has('bbox'),true);
   }else{
    assert.equal(mapUrl.origin,'https://www.google.com');assert.equal(mapUrl.searchParams.get('output'),'embed');
    assert.equal(mapUrl.searchParams.get('q'),fact.address,`${id}/${locale}: address fallback searches the visit address`);
   }
   assert.equal((html.match(/<address/g)||[]).length,1);assert.equal(html.includes('ADRESSE DE VISITE'),false);assert.ok(html.includes(media[0].licenseUrl));
   assert.match(html,/datetime="2026-10-14"/i);
   for(const source of fact.sources)assert.ok(html.includes(source.url));
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.description,copy.description);
   assert.ok(metadata.title.absolute.startsWith(copy.title));
   assert.ok(xml.includes(`https://www.legolfe.com/${locale}/place/${id}`));
  }
 }
 // New local collections: test the rendered public flow, not just the data shape.
 const localIds=[...require('../data/planDeLaTourPlaces.ts').planDeLaTourPlaces,...require('../data/sainteMaximePlaces.ts').sainteMaximePlaces,...require('../data/grimaudPlaces.ts').grimaudPlaces,...require('../data/cavalaireMolePlaces.ts').cavalaireMolePlaces,...require('../data/freinetCroixPlaces.ts').freinetCroixPlaces,...require('../data/ramatuelleGassinPlaces.ts').ramatuelleGassinPlaces].map(p=>p.id);
 for(const [slug,count] of Object.entries({'le-plan-de-la-tour':4,'sainte-maxime':4,'grimaud':4,'cavalaire-sur-mer':4,'la-mole':2,'la-garde-freinet':3,'la-croix-valmer':3,'ramatuelle':3,'gassin':3})){
  const local=placesInDestination(getDestination(slug));
  assert.equal(local.filter(p=>localIds.includes(p.id)).length,count,`${slug}: local collection exposed by destination`);
 }
 const grimaudIds=require('../data/grimaudPlaces.ts').grimaudPlaces.map(p=>p.id);
 assert.ok(grimaudIds.every(id=>placeFacts['grimaud-village'].nearby.includes(id)),'Village guide links directly to each new monument');
 for(const id of grimaudIds){
  const photo=photosForPlace(id)[0];
  assert.equal(photo.contextual,undefined,`${id}: photograph depicts the monument`);
  assert.equal(photo.license,'CC BY-SA 4.0');
 }
 const Village=require('../components/VillageFeaturePlace.tsx').default;
 const {villageFeatures}=require('../data/villageFeatures.ts');
 for(const [village,count] of [['cavalaire-village',4],['la-mole-village',2],['la-croix-valmer-village',3]]){
  assert.equal(villageFeatures[village].nearby.length,count);
  for(const locale of ['fr','en']){
   const html=renderToStaticMarkup(Village({id:village,locale}));
   for(const target of villageFeatures[village].nearby)assert.ok(html.includes(`href="/${locale}/place/${target}"`),`${village}: crawlable ${target}`);
  }
 }
 const corniche=placeFacts['sentiers-corniche-des-maures'].copy.fr;
 assert.ok(corniche.facts.some(([,value])=>value.includes('3h')&&value.includes('360 m')));
 assert.ok(corniche.sections.some(([,body])=>body.includes('pas le parcours court')));
 assert.ok(placeFacts['barrage-de-la-verne'].copy.fr.questions.some(([,body])=>body.includes('baignade')&&body.includes('interdites')));
 assert.ok(placeFacts['eglise-sainte-magdeleine-la-mole'].copy.fr.questions.some(([,body])=>body.includes('autre site')));
 const Destination=require('../app/[locale]/destinations/[town]/page.tsx');
 const newest=[...require('../data/freinetCroixPlaces.ts').freinetCroixPlaces,...require('../data/ramatuelleGassinPlaces.ts').ramatuelleGassinPlaces];
 for(const town of ['la-garde-freinet','la-croix-valmer','ramatuelle','gassin']){
  for(const locale of ['fr','en']){
   const params=Promise.resolve({locale,town}),html=renderToStaticMarkup(await Destination.default({params}));
   for(const p of newest.filter(p=>p.location===getDestination(town).name))assert.ok(html.includes(`href="/${locale}/place/${p.id}"`));
   const metadata=await Destination.generateMetadata({params});
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/destinations/${town}`);
   assert.ok(xml.includes(`<loc>${metadata.alternates.canonical}</loc>`));
  }
 }
 assert.equal(placeMapPoints['circuit-cap-lardier'][0].latitude,43.1834348,'Hike marker uses the official Gigaro GPX start');
 assert.ok(placeFacts['fort-freinet'].copy.fr.sections.some(([,body])=>body.includes('circuit combiné')));
 assert.ok(placeFacts['plage-de-sylvabelle'].copy.fr.facts.some(([,value])=>value.includes('non surveillée')));
 assert.ok(placeFacts['conservatoire-patrimoine-freinet'].copy.fr.facts.some(([,value])=>value.includes('jours fériés')));
 const {editorialSignatures}=require('../lib/placeEditorialSignatures.ts');
 const {isExploreAddress}=require('../lib/exploreFilters.ts');
 for(const id of localIds){
  const fact=placeFacts[id],place=places.find(p=>p.id===id),media=photosForPlace(id),point=placeMapPoints[id][0];
  assert.ok(isExploreAddress(place),`${id}: discoverable in Explorer`);
  assert.ok(media.length>0&&media[0].credit&&media[0].source&&media[0].licenseUrl,`${id}: attributed photograph`);
  assert.ok(fact.sources.length>=2&&fact.nearby.every(target=>target!==id&&places.some(p=>p.id===target)));
  assert.equal(place.latitude,point.latitude);assert.equal(place.longitude,point.longitude);
  assert.ok(fact.sources.some(s=>s.url===point.source)||point.source.startsWith('https://www.openstreetmap.org/'));
  for(const locale of ['fr','en']){
   const copy=fact.copy[locale],html=renderToStaticMarkup(Sheet({id,locale}));
   assert.ok(copy.sections.length>=4&&copy.questions.length>=2&&copy.intro.length>180);
   assert.ok(html.includes(editorialSignatures[id][locale].subtitle.replaceAll('&','&amp;')));
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
   assert.ok(html.includes(media[0].source.replaceAll('&','&amp;'))&&html.includes(media[0].licenseUrl));
   assert.equal(html.includes(locale==='fr'?'Photo du secteur':'Area photograph'),!!media[0].contextual,`${id}: contextual image disclosure`);
   assert.ok(html.includes(`dateTime="${fact.verified}"`)||html.includes(`datetime="${fact.verified}"`));
   for(const target of fact.nearby)assert.ok(html.includes(`href="/${locale}/place/${target}"`));
   for(const source of fact.sources)assert.ok(html.includes(source.url.replaceAll('&','&amp;')));
   const frame=html.match(/<iframe[^>]+src="([^"]+)"/);assert.ok(frame,`${id}: visit map rendered`);
   assert.equal(new URL(frame[1].replaceAll('&amp;','&')).searchParams.get('marker'),`${point.latitude},${point.longitude}`);
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.description,copy.description);
   assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/place/${id}</loc><lastmod>${fact.verified}</lastmod>`));
  }
 }
 assert.equal(places.some(p=>/comptoir-de-la-poste|porte[s]?-verte/.test(p.id)),false,'User exclusions respected');
 process.env.VERCEL_ENV='preview';assert.equal((await Page.generateMetadata({params:Promise.resolve({locale:'fr',id:'port-grimaud'})})).robots.index,false);
 const {ramatuelleGassinPlaces,ramatuelleGassinMedia}=require('../data/ramatuelleGassinPlaces.ts');
 const {relatedPlacesFor}=require('../lib/placeDiscovery.ts');
 for(const [village,town] of [['ramatuelle-village','Ramatuelle'],['gassin-village','Gassin']]){
  assert.deepEqual(relatedPlacesFor(places.find(p=>p.id===village)).map(p=>p.id),ramatuelleGassinPlaces.filter(p=>p.location===town).map(p=>p.id),'Village related cards link to all three new visits');
 }
 const lighthouse=placeFacts['phare-de-camarat'].copy.fr;
 assert.ok(lighthouse.sections.some(([,body])=>body.includes('exclusivement')&&body.includes('navette')&&body.includes('stade')),'Lighthouse visit is reached by its official shuttle');
 assert.ok(placeMapPoints['phare-de-camarat'][0].directionsQuery.includes('stade'),'Directions target the meeting point rather than the tower');
 assert.ok(places.find(p=>p.id==='phare-de-camarat').bookingUrl.endsWith('/fr/phare/'));
 assert.ok(lighthouse.facts.some(([,value])=>value.includes('moins de 6 ans')));
 assert.ok(placeFacts['jardin-hardy-denonain-gassin'].copy.fr.sections.some(([,body])=>body.includes('saisonnière')&&body.includes('jeudi')));
 assert.ok(ramatuelleGassinMedia['plage-de-bonne-terrasse'][0].caption.fr.includes('archive')&&ramatuelleGassinMedia['plage-de-bonne-terrasse'][0].caption.fr.includes('1995'),'Archive photograph is dated for visitors');
 console.log('Place facts: existing licensed media/hashes plus 30 local places in FR/EN; contextual photos, sources, map markers, discovery links, metadata and sitemap passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
