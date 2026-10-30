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
 const factIds=Object.keys(placeFacts),publishedIds=new Set(places.map(place=>place.id));
 const textHtml=value=>renderToStaticMarkup(require('react').createElement('span',null,value)).slice(6,-7);
 const {hikingRouteForPlace}=require('../data/hikingRoutes.ts');
 const supplied=require('../data/suppliedPlaceMedia.ts').suppliedPlaceMedia;
 for(const collection of ['newHikingPlaces','associationPlaces','localLifePlaces','localDiscoveriesPlaces','coastalDiscoveryPlaces']){
  for(const place of require(`../data/${collection}.ts`)[collection]){
   assert.ok(publishedIds.has(place.id),`${place.id}: collection entry published`);
   assert.ok(placeFacts[place.id],`${place.id}: collection entry has its detailed sheet`);
  }
 }
 // Validate every current sheet, including collections without a legacy media entry.
 assert.ok(factIds.length>0,'the catalogue must contain published fact sheets');
 for(const id of factIds){
  const sheet=placeFacts[id];
  assert.ok(publishedIds.has(id),`${id}: registered public place`);
  assert.match(sheet.verified,/^\d{4}-\d{2}-\d{2}$/);
  assert.ok(Number.isFinite(Date.parse(sheet.verified))&&sheet.verified<=new Date().toISOString().slice(0,10),`${id}: valid reference date`);
  assert.ok(sheet.sources.length>0,`${id}: documentary sources`);
  for(const source of sheet.sources){assert.ok(source.label.trim());assert.equal(new URL(source.url).protocol,'https:',`${id}: secure source link`);}
  assert.equal(new Set(sheet.nearby).size,sheet.nearby.length,`${id}: no duplicate nearby cards`);
  for(const target of sheet.nearby)assert.ok(target!==id&&publishedIds.has(target),`${id}: valid nearby place ${target}`);
  for(const locale of ['fr','en']){
   const copy=sheet.copy[locale];
   for(const field of ['title','description','intro'])assert.ok(copy[field]?.trim(),`${id}/${locale}: ${field}`);
   for(const field of ['facts','sections','questions']){assert.ok(copy[field].length>0,`${id}/${locale}: ${field}`);for(const pair of copy[field])assert.ok(pair.length===2&&pair.every(value=>typeof value==='string'&&value.trim()),`${id}/${locale}: complete ${field}`);}
   const html=renderToStaticMarkup(Sheet({id,locale}));
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${id}/${locale}: single main heading`);
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.description,copy.description,`${id}/${locale}: editorial description`);
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/place/${id}`);
  }
 }
 assert.equal(new Set(places.map(p=>p.id)).size,places.length);
 assert.ok(placesInDestination(getDestination('grimaud')).some(p=>p.id==='port-grimaud'));
 const xml=await(await GET()).text();
 for(const entry of licenses){
  const id=entry.id,sheet=placeFacts[id];assert.ok(sheet,`${id}: licensed legacy sheet remains published`);
  assert.ok(places.some(p=>p.id===id));assert.ok(sheet.nearby.every(target=>places.some(p=>p.id===target)&&target!==id));
  const photo=placeFactsMedia[id],file=path.join(__dirname,'../public',photo.src);
  assert.equal(entry.license,'CC BY-SA 4.0');assert.equal(entry.licenseUrl,photo.licenseUrl);assert.equal(entry.source,photo.source);assert.ok(photo.credit.includes(entry.author));
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),entry.sha256);
  assert.ok(fs.statSync(file).size<350000);assert.ok(photo.width<=1400&&photo.height>500);assert.equal(photosForPlace(id)[0].src,supplied[id]?.[0]?.src??photo.src);
  for(const locale of ['fr','en']){
   const copy=sheet.copy[locale],html=renderToStaticMarkup(Sheet({id,locale}));
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1);if(!supplied[id]){assert.ok(html.includes(photo.licenseUrl));assert.ok(html.includes(textHtml(photo.source)));}assert.match(html,new RegExp(`datetime="${sheet.verified}"`,'i'));
   for(const source of sheet.sources){assert.equal(new URL(source.url).protocol,'https:');assert.ok(html.includes(textHtml(source.url)));}
   for(let i=1;i<=copy.sections.length;i++){assert.ok(html.includes(`href="#visit-${i}"`));assert.ok(html.includes(`id="visit-${i}"`));}
   for(const target of sheet.nearby)assert.ok(html.includes(`href="/${locale}/place/${target}"`));
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/place/${id}`);assert.equal(metadata.description,copy.description);assert.ok(metadata.title.absolute.startsWith(copy.title));assert.ok(metadata.openGraph.images[0].url.endsWith(supplied[id]?.[0]?.src??photo.src));
   assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/place/${id}</loc><lastmod>${sheet.verified}</lastmod>`));
  }
 }
 const experienceIds=['domaine-de-la-croix','chateau-des-marres','base-nautique-cogolin','musee-gendarmerie-cinema'];
 for(const locale of ['fr','en']){
  const {suppliedPlaceMedia}=require('../data/suppliedPlaceMedia.ts'),{mediaForPlace}=require('../lib/placeMedia.ts');
  const photos=suppliedPlaceMedia['phare-de-camarat'];assert.equal(photos.length,4);
  const html=renderToStaticMarkup(Sheet({id:'phare-de-camarat',locale}));for(const photo of photos)assert.ok(html.includes(photo.src),'all four supplied Camarat photos render');
  for(const id of ['phare-de-camarat','chateau-minuty']){const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});assert.ok(metadata.openGraph.images[0].url.endsWith(mediaForPlace(id).src),'sharing image matches supplied cover');}
 }
 const {newExperienceFacts}=require('../data/newExperienceFacts.ts');
 const {newExperienceMedia}=require('../data/newExperienceMedia.ts');
 const {suppliedPlaceMedia}=require('../data/suppliedPlaceMedia.ts');
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
   assert.equal((html.match(/<address/g)||[]).length,1);assert.equal(html.includes('ADRESSE DE VISITE'),false);const displayed=suppliedPlaceMedia[id]??media;if(displayed[0].licenseUrl)assert.ok(html.includes(displayed[0].licenseUrl));for(const photo of suppliedPlaceMedia[id]??[])assert.ok(html.includes(photo.src));
   assert.match(html,/datetime="2026-10-14"/i);
   for(const source of fact.sources)assert.ok(html.includes(source.url));
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.description,copy.description);
   assert.ok(metadata.title.absolute.startsWith(copy.title));
   assert.ok(xml.includes(`https://www.legolfe.com/${locale}/place/${id}`));
  }
 }
 // New local collections: test the rendered public flow, not just the data shape.
 const localPlaces=[...require('../data/planDeLaTourPlaces.ts').planDeLaTourPlaces,...require('../data/sainteMaximePlaces.ts').sainteMaximePlaces,...require('../data/grimaudPlaces.ts').grimaudPlaces,...require('../data/cavalaireMolePlaces.ts').cavalaireMolePlaces,...require('../data/freinetCroixPlaces.ts').freinetCroixPlaces,...require('../data/ramatuelleGassinPlaces.ts').ramatuelleGassinPlaces,...require('../data/saintTropezPlaces.ts').saintTropezPlaces,...require('../data/cogolinRayolPlaces.ts').cogolinRayolPlaces];
 const localIds=localPlaces.map(place=>place.id);
 for(const slug of ['le-plan-de-la-tour','sainte-maxime','grimaud','cavalaire-sur-mer','la-mole','la-garde-freinet','la-croix-valmer','ramatuelle','gassin','saint-tropez','cogolin','rayol-canadel']){
  const destination=getDestination(slug),local=placesInDestination(destination);
  const expected=localPlaces.filter(place=>place.location===destination.name).map(place=>place.id).sort();
  assert.ok(expected.length>0,`${slug}: local collection is represented`);
  assert.deepEqual(local.filter(place=>localIds.includes(place.id)).map(place=>place.id).sort(),expected,`${slug}: every local collection entry exposed by destination`);
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
 for(const [village,count] of [['cavalaire-village',4],['la-mole-village',2],['la-croix-valmer-village',3],['cogolin-village',3],['rayol-canadel-village',2]]){
  assert.ok(villageFeatures[village].nearby.length>=count,`${village}: retains its local discovery selection`);
  for(const id of villageFeatures[village].nearby)assert.ok(publishedIds.has(id)&&id!==village,`${village}: valid nearby link`);
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
 const newest=[...require('../data/freinetCroixPlaces.ts').freinetCroixPlaces,...require('../data/ramatuelleGassinPlaces.ts').ramatuelleGassinPlaces,...require('../data/saintTropezPlaces.ts').saintTropezPlaces,...require('../data/cogolinRayolPlaces.ts').cogolinRayolPlaces];
 for(const town of ['la-garde-freinet','la-croix-valmer','ramatuelle','gassin','saint-tropez','cogolin','rayol-canadel']){
  for(const locale of ['fr','en']){
   const params=Promise.resolve({locale,town}),html=renderToStaticMarkup(await Destination.default({params}));
   for(const p of newest.filter(p=>p.location===getDestination(town).name))assert.ok(html.includes(`href="/${locale}/place/${p.id}"`));
   const metadata=await Destination.generateMetadata({params});
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/destinations/${town}`);
   assert.ok(xml.includes(`<loc>${metadata.alternates.canonical}</loc>`));
  }
 }
 assert.equal(placeMapPoints['circuit-cap-lardier'][0].latitude,43.1834348,'Hike marker uses the official Gigaro GPX start');
 assert.ok(placeFacts['fort-freinet'].copy.fr.sections.some(([,body])=>body.includes('3 km')&&body.includes('Croix et Fort')&&body.includes('ne sont pas')&&body.includes('accès bleu')), 'Fort Freinet keeps the combined circuit distance separate from the blue approach');
 assert.ok(placeFacts['plage-de-sylvabelle'].copy.fr.facts.some(([,value])=>value.includes('non surveillée')));
 assert.ok(placeFacts['conservatoire-patrimoine-freinet'].copy.fr.facts.some(([,value])=>value.includes('jours fériés')));
 const {editorialSignatures}=require('../lib/placeEditorialSignatures.ts');
 const {isExploreAddress}=require('../lib/exploreFilters.ts');
 for(const id of localIds){
  const fact=placeFacts[id],place=places.find(p=>p.id===id),media=photosForPlace(id),point=placeMapPoints[id][0];
  assert.ok(isExploreAddress(place),`${id}: discoverable in Explorer`);
  assert.ok(media.length>0&&(suppliedPlaceMedia[id]||(media[0].credit&&media[0].source&&media[0].licenseUrl)),`${id}: supplied or attributed photograph`);
  assert.ok(fact.sources.length>=2&&fact.nearby.every(target=>target!==id&&places.some(p=>p.id===target)));
  assert.equal(place.latitude,point.latitude);assert.equal(place.longitude,point.longitude);
  assert.ok(fact.sources.some(s=>s.url===point.source)||point.source.startsWith('https://www.openstreetmap.org/'));
  for(const locale of ['fr','en']){
   const copy=fact.copy[locale],html=renderToStaticMarkup(Sheet({id,locale}));
   assert.ok(copy.sections.length>=4&&copy.questions.length>=2,`${id}/${locale}: sections and questions retained`);
   assert.ok(html.includes(textHtml(copy.intro)),`${id}/${locale}: complete introduction rendered`);
   assert.ok(html.includes(editorialSignatures[id][locale].subtitle.replaceAll('&','&amp;')));
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
   if(suppliedPlaceMedia[id]){for(const photo of suppliedPlaceMedia[id])assert.ok(html.includes(photo.src));}else assert.ok(html.includes(media[0].source.replaceAll('&','&amp;'))&&html.includes(media[0].licenseUrl));
   assert.equal(html.includes(locale==='fr'?'Photo du secteur':'Area photograph'),!!media[0].contextual,`${id}: contextual image disclosure`);
   assert.ok(html.includes(`dateTime="${fact.verified}"`)||html.includes(`datetime="${fact.verified}"`));
   for(const target of fact.nearby)assert.ok(html.includes(`href="/${locale}/place/${target}"`));
   for(const source of fact.sources)assert.ok(html.includes(source.url.replaceAll('&','&amp;')));
   const route=hikingRouteForPlace(id),frame=html.match(/<iframe[^>]+src="([^"]+)"/);
   if(route){
    assert.ok(html.includes(`id="parcours-${route.id}"`),`${id}: dedicated hiking map rendered`);
    assert.ok(html.includes(textHtml(route.sourcePage)),`${id}: official route source`);
    if(route.gpx)assert.ok(html.includes(route.gpx),`${id}: downloadable documented track`);
    else assert.ok(html.includes(locale==='fr'?'GPX et fiche Visorando':'GPX and Visorando route sheet'),`${id}: track access remains on its source website`);
   }else{
    assert.ok(frame,`${id}: visit map rendered`);
    assert.equal(new URL(frame[1].replaceAll('&amp;','&')).searchParams.get('marker'),`${point.latitude},${point.longitude}`);
   }
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,id})});
   assert.equal(metadata.description,copy.description);
   assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/place/${id}</loc><lastmod>${fact.verified}</lastmod>`));
  }
 }
 const {cogolinRayolPlaces,cogolinRayolMedia}=require('../data/cogolinRayolPlaces.ts');
 for(const place of cogolinRayolPlaces){
  const photo=cogolinRayolMedia[place.id][0];
  assert.ok(fs.existsSync(path.join(__dirname,'../public',photo.src)),`${place.id}: local photograph exists`);
  if(place.location==='Cogolin'){
   assert.equal(photo.contextual,true);assert.ok(photo.caption.fr.includes('pas du monument'));
   assert.ok(photo.caption.en.includes('not the monument'));
  }else assert.equal(photo.contextual,undefined,`${place.id}: actual place photograph`);
 }
 assert.ok(placeMapPoints['tour-horloge-cogolin'][0].directionsQuery.includes('Montée des Aloès'),'Clock-tower directions use the official visit address');
 // These additions must be reachable from rendered articles, not only search or a map.
 const Guide=require('../app/[locale]/guides/[slug]/page.tsx');
 for(const [slug,ids] of [['golfe-saint-tropez-quand-il-pleut',['musee-annonciade-saint-tropez','musee-gendarmerie-cinema','maison-des-papillons','citadelle-saint-tropez','conservatoire-patrimoine-freinet']],['activites-gratuites-golfe-saint-tropez',['port-de-saint-tropez','eglise-notre-dame-assomption-saint-tropez','plage-des-graniers','tour-horloge-cogolin','eglise-saint-sauveur-cogolin','pergola-patec-rayol','plage-du-canadel']],['week-end-automne-golfe-saint-tropez',['chapelle-sainte-anne-saint-tropez']]]){
  for(const locale of ['fr','en']){
   const html=renderToStaticMarkup(await Guide.default({params:Promise.resolve({locale,slug})}));
   for(const id of ids)assert.ok(html.includes(`href="/${locale}/place/${id}"`),`${slug}: crawlable link to ${id}`);
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
 console.log(`Place facts: ${factIds.length} bilingual sheets and ${localIds.length} local collection entries; licensed media/hashes, contextual photos, sources, maps, discovery links, metadata and sitemap passed.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
