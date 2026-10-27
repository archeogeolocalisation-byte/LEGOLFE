/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {places}=require('../data/places.ts'),{placeMapPoints}=require('../data/placeMapPoints.ts');
const {osmMapUrl,pointDirectionsUrl,placeSearchUrl}=require('../lib/placeMapLinks.ts');
const {validMapPoint}=require('../lib/villaMapLocation.ts');
const Block=require('../components/PlaceMapBlock.tsx').default,Page=require('../app/[locale]/place/[id]/page.tsx').default,{renderToStaticMarkup}=require('react-dom/server');
const expandNames=new Set(['PlaceContent','PlaceStoryPhotos','LegacyPlacePage','EditorialFeaturePlace','VillageFeaturePlace','PlaceFactSheet','DiscoveryFeaturePlace']);
async function nodes(element){if(!element||typeof element!=='object')return [];if(typeof element.type==='function'&&expandNames.has(element.type.name))return nodes(await element.type(element.props));return [element,...(await Promise.all(require('react').Children.toArray(element.props?.children).map(nodes))).flat()];}
(async()=>{
 for(const [folder,module,exportName,length] of [['pampelonne','pampelonneMedia','pampelonneMedia',5],['citadelle','citadelleMedia','citadelleMedia',4]]){
 const manifest=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,`../public/media/places/${folder}/sources.json`)));
 const photos=require(`../data/${module}.ts`)[exportName];assert.equal(photos.length,length);
 for(const file of manifest.files){const bytes=fs.readFileSync(require('node:path').join(__dirname,'../public',file.file));assert.equal(require('node:crypto').createHash('sha256').update(bytes).digest('hex'),file.sha256);assert.ok(bytes.length<400000);const photo=photos.find(p=>p.src===file.file);assert.equal(photo.credit,file.credit);assert.equal(photo.licenseUrl,file.licenseUrl);assert.equal(new URL(photo.source).hostname,'commons.wikimedia.org');}
 }
 let count=0;
 for(const [id,points] of Object.entries(placeMapPoints)){
  assert.ok(places.some(p=>p.id===id),id);assert.equal(new Set(points.map(p=>p.id)).size,points.length);
  for(const point of points){count++;assert.ok(validMapPoint(point.latitude,point.longitude));assert.equal(new URL(point.source).protocol,'https:');if(point.coordinateSource)assert.equal(new URL(point.coordinateSource).protocol,'https:');assert.ok(point.checked<=new Date().toISOString().slice(0,10));
   const map=new URL(osmMapUrl(point));assert.equal(map.origin,'https://www.openstreetmap.org');assert.equal(map.searchParams.get('marker'),`${point.latitude},${point.longitude}`);const [west,south,east,north]=map.searchParams.get('bbox').split(',').map(Number);assert.ok(west<point.longitude&&point.longitude<east&&south<point.latitude&&point.latitude<north);
   const dir=new URL(pointDirectionsUrl(point));assert.equal(dir.origin,'https://www.google.com');assert.equal(dir.searchParams.get('api'),'1');assert.equal(dir.searchParams.has('origin'),false);assert.equal(dir.searchParams.get('destination'),point.directionsQuery||`${point.latitude},${point.longitude}`);
  }
 }
 const nartelle=placeMapPoints['sainte-maxime-village'].find(p=>p.id==='nartelle');assert.equal(nartelle.latitude,43.322622);assert.equal(nartelle.longitude,6.664884);assert.ok(nartelle.directionsQuery.includes('Avenue'));assert.notEqual(places.find(p=>p.id==='sainte-maxime-village').latitude,nartelle.latitude);
 assert.equal(placeMapPoints['cecile-golmard-chef'],undefined);assert.notEqual(placeMapPoints['grimaud-village'][0].longitude,placeMapPoints['port-grimaud'][0].longitude);
 assert.equal(osmMapUrl({...nartelle,latitude:0}),undefined);
 const secondaryHtml=renderToStaticMarkup(require('react').createElement(Block,{name:'Sainte-Maxime',location:'Sainte-Maxime',points:[nartelle],locale:'fr',address:'Office de tourisme, Place Louis-Blanc'}));
 const addressHtml=renderToStaticMarkup(require('react').createElement(Block,{name:'Lieu & test',location:'Cogolin',points:[],locale:'fr',address:'12 rue du Test, Cogolin'}));
 const addressSrc=addressHtml.match(/<iframe[^>]+src="([^"]+)"/)[1].replaceAll('&amp;','&');assert.equal(new URL(addressSrc).searchParams.get('q'),'12 rue du Test, Cogolin');assert.equal(addressHtml.includes('Carte du secteur'),false);assert.ok(addressHtml.includes('Ouvrir le plan'));
 assert.ok(secondaryHtml.includes(pointDirectionsUrl(nartelle).replaceAll('&','&amp;')),'selected map reference controls directions even when the place has a main address');
 assert.equal(new URL(placeSearchUrl('A & B','Saint-Tropez')).searchParams.get('query'),'A & B, Saint-Tropez, France');
 for(const place of places)for(const locale of ['fr','en']){
  const points=placeMapPoints[place.id]??[],html=renderToStaticMarkup(require('react').createElement(Block,{name:place.name,location:place.location,points,locale}));
  assert.equal(html.includes('<iframe'),true);assert.equal(html.includes('navigator.geolocation'),false);
  if(points.length){if(points[0].coordinateSource)assert.ok(html.includes(points[0].coordinateSource.replaceAll('&','&amp;')));assert.ok(html.includes(renderToStaticMarkup(require('react').createElement('span',null,points[0].note[locale])).slice(6,-7)));assert.ok(html.includes('openstreetmap.org/copyright'));assert.ok(html.includes('google.com/maps/dir/'));assert.ok(html.includes(locale==='fr'?'Itinéraire vers cette adresse':'Directions to this address'));}
  else{assert.ok(html.includes('google.com/maps/search/'));assert.equal(place.latitude,undefined);const src=html.match(/<iframe[^>]+src="([^"]+)"/)[1].replaceAll('&amp;','&');assert.equal(new URL(src).searchParams.get('q'),`${place.location}, France`);assert.ok(html.includes(locale==='fr'?'Carte du secteur':'Area map'));assert.ok(html.includes(locale==='fr'?'Rechercher ce lieu':'Search for this place'));}
  const element=await Page({params:Promise.resolve({locale,id:place.id})});const children=await nodes(element);const blocks=children.filter(e=>e.type===Block);assert.equal(blocks.length,1);assert.equal(blocks[0].props.points.length,points.length);
  const {newExperienceFacts}=require('../data/newExperienceFacts.ts');if(newExperienceFacts[place.id]){assert.equal(blocks[0].props.address,newExperienceFacts[place.id].address);const blockHtml=renderToStaticMarkup(require('react').createElement(Block,blocks[0].props));assert.ok(blockHtml.includes('output=embed')||points.length>0);assert.ok(blockHtml.includes('Itinéraire vers cette adresse')||blockHtml.includes('Directions to this address'));}
  const community=children.filter(e=>typeof e.type==='function'&&e.type.name==='CommunitySection');assert.equal(community.length,1);const locationAt=children.indexOf(blocks[0]),communityAt=children.indexOf(community[0]);assert.ok(locationAt<communityAt);
  const factsAt=children.findIndex(e=>e.type==='dl');if(factsAt>=0){const isFactSheet=!!require('../data/placeFacts.ts').placeFacts[place.id];assert.ok(isFactSheet?factsAt<locationAt:locationAt<factsAt,place.id+' Pampelonne editorial ordering of maps and facts');}
  const preparationAt=children.findIndex(e=>typeof e.type==='function'&&e.type.name==='PlacePreparation');if(preparationAt>=0)assert.ok(locationAt<preparationAt&&preparationAt<communityAt);
  if(['caves-du-roy','citadelle-saint-tropez'].includes(place.id)){const practicalAt=children.findIndex(e=>e.type==='h2'&&e.props.children===require('../data/editorialFeatures.ts').editorialFeatures[place.id][locale].practicalTitle);assert.ok(locationAt<practicalAt);}
  if(place.id==='pampelonne'){
   const gallery=children.find(e=>typeof e.type==='function'&&e.type.name==='PlaceMediaGallery');assert.equal(gallery.props.photos.length,5);assert.equal(gallery.props.processed,true);assert.equal(gallery.props.photos[2].contextual,true);
   const photos=children.filter(e=>typeof e.type==='function'&&e.type.name==='PampelonnePhoto');assert.deepEqual(photos.map(e=>e.props.index),[3]);
   const access=children.find(e=>typeof e.type==='function'&&e.type.name==='PampelonneAccessGuide');assert.ok(access,'Pampelonne access module required');const accessHtml=renderToStaticMarkup(access.type(access.props));for(const name of ['Route de Tahiti','Chemin des Moulins','Chemin des Tamaris','Boulevard Patch','Route de l’Épi','Chemin des Barraques','Route de Bonne Terrasse','Le Club 55','Byblos Beach','Verde Beach','Cabane Bambou','Indie Beach'])assert.ok(accessHtml.includes(name),name);assert.ok(!accessHtml.includes('mai 2011'));assert.ok(accessHtml.includes('guide-acces-pampelonne.png'));assert.ok(!accessHtml.includes('<svg'));assert.ok(accessHtml.includes('taxi ou un chauffeur')||locale==='en');
   for(const photo of photos){const html=renderToStaticMarkup(photo.type(photo.props));assert.ok(html.includes('creativecommons.org/licenses/'));assert.ok(html.includes('Wikimedia Commons'));}
   const actions=children.filter(e=>typeof e.type==='function'&&e.type.name==='PlaceActions');assert.equal(actions.length,1);
   const siblings=require('react').Children.toArray(element.props.children),at=siblings.findIndex(e=>typeof e.type==='function'&&e.type.name==='CommunitySection');assert.equal(siblings[at-1].props.children.type.name,'PlaceActions');
   const metadata=await require('../app/[locale]/place/[id]/page.tsx').generateMetadata({params:Promise.resolve({locale,id:place.id})});assert.ok(metadata.openGraph.images[0].url.endsWith('/media/places/pampelonne/photo-1.webp'));
  }
  if(place.id==='citadelle-saint-tropez'){
   const gallery=children.find(e=>typeof e.type==='function'&&e.type.name==='PlaceMediaGallery');assert.equal(gallery.props.photos.length,4);assert.equal(gallery.props.processed,true);assert.ok(gallery.props.photos[0].src.endsWith('/citadelle/photo-1.webp'));
   const story=children.filter(e=>typeof e.type==='function'&&e.type.name==='CitadelleStoryPhoto');assert.equal(story.length,1);const model=renderToStaticMarkup(story[0].type(story[0].props));assert.ok(model.includes(encodeURIComponent('/media/places/citadelle/photo-4.webp')));assert.ok(model.includes('G.Garitan'));assert.ok(model.includes('by-sa/3.0'));
   const actions=children.filter(e=>typeof e.type==='function'&&e.type.name==='PlaceActions');assert.equal(actions.length,1);
   const siblings=require('react').Children.toArray(element.props.children),at=siblings.findIndex(e=>typeof e.type==='function'&&e.type.name==='CommunitySection');assert.equal(siblings[at-1].props.children.type.name,'PlaceActions');
   const metadata=await require('../app/[locale]/place/[id]/page.tsx').generateMetadata({params:Promise.resolve({locale,id:place.id})});assert.ok(metadata.openGraph.images[0].url.endsWith('/media/places/citadelle/photo-1.webp'));
  }
  const siblings=require('react').Children.toArray(element.props.children),communityIndex=siblings.findIndex(e=>typeof e.type==='function'&&e.type.name==='CommunitySection');assert.ok(['lg-shell py-6','lg-shell py-12'].includes(siblings[communityIndex+1].props.className));
 }
 console.log(`Maps: ${count} sourced public references; ${places.length*2} FR/EN route integrations and map renders, road destination, bounds, fallbacks and service privacy passed.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
