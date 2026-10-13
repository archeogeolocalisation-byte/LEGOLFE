/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {places}=require('../data/places.ts'),{placeMapPoints}=require('../data/placeMapPoints.ts');
const {osmMapUrl,pointDirectionsUrl,placeSearchUrl}=require('../lib/placeMapLinks.ts');
const {validMapPoint}=require('../lib/villaMapLocation.ts');
const Block=require('../components/PlaceMapBlock.tsx').default,Page=require('../app/[locale]/place/[id]/page.tsx').default,{renderToStaticMarkup}=require('react-dom/server');
(async()=>{
 let count=0;
 for(const [id,points] of Object.entries(placeMapPoints)){
  assert.ok(places.some(p=>p.id===id),id);assert.equal(new Set(points.map(p=>p.id)).size,points.length);
  for(const point of points){count++;assert.ok(validMapPoint(point.latitude,point.longitude));assert.equal(new URL(point.source).protocol,'https:');assert.ok(point.checked<=new Date().toISOString().slice(0,10));
   const map=new URL(osmMapUrl(point));assert.equal(map.origin,'https://www.openstreetmap.org');assert.equal(map.searchParams.get('marker'),`${point.latitude},${point.longitude}`);const [west,south,east,north]=map.searchParams.get('bbox').split(',').map(Number);assert.ok(west<point.longitude&&point.longitude<east&&south<point.latitude&&point.latitude<north);
   const dir=new URL(pointDirectionsUrl(point));assert.equal(dir.origin,'https://www.google.com');assert.equal(dir.searchParams.get('api'),'1');assert.equal(dir.searchParams.has('origin'),false);assert.equal(dir.searchParams.get('destination'),point.directionsQuery||`${point.latitude},${point.longitude}`);
  }
 }
 const nartelle=placeMapPoints['sainte-maxime-village'].find(p=>p.id==='nartelle');assert.equal(nartelle.latitude,43.322622);assert.equal(nartelle.longitude,6.664884);assert.ok(nartelle.directionsQuery.includes('Avenue'));assert.notEqual(places.find(p=>p.id==='sainte-maxime-village').latitude,nartelle.latitude);
 assert.equal(placeMapPoints['cecile-golmard-chef'],undefined);assert.notEqual(placeMapPoints['grimaud-village'][0].longitude,placeMapPoints['port-grimaud'][0].longitude);
 assert.equal(osmMapUrl({...nartelle,latitude:0}),undefined);
 assert.equal(new URL(placeSearchUrl('A & B','Saint-Tropez')).searchParams.get('query'),'A & B, Saint-Tropez, France');
 for(const place of places)for(const locale of ['fr','en']){
  const points=placeMapPoints[place.id]??[],html=renderToStaticMarkup(require('react').createElement(Block,{name:place.name,location:place.location,points,locale}));
  assert.equal(html.includes('<iframe'),false);assert.equal(html.includes('navigator.geolocation'),false);
  if(points.length){assert.ok(html.includes('openstreetmap.org/copyright'));assert.ok(html.includes('google.com/maps/dir/'));assert.ok(html.includes(locale==='fr'?'Afficher le plan':'Show map'));}
  else{assert.ok(html.includes('google.com/maps/search/'));assert.equal(place.latitude,undefined);}
  const element=await Page({params:Promise.resolve({locale,id:place.id})});const children=require('react').Children.toArray(element.props.children);const blocks=children.filter(e=>e.type===Block);assert.equal(blocks.length,1);assert.equal(blocks[0].props.points.length,points.length);
 }
 console.log(`Maps: ${count} sourced public references; ${places.length*2} FR/EN route integrations and unloaded renders, road destination, bounds, fallbacks and service privacy passed.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
