/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';
const load=Module._load;Module._load=function(request,parent,...rest){if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[]};if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicNews'))return {getPublicNews:async()=>[]};if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicVillas'))return {getPublishedVillas:async()=>[]};return load.call(this,request,parent,...rest);};
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/guides/'+path.basename(f),width:1200,height:800};};
const {touristMapPlaces,touristMapCommunes}=require('../data/touristMap.ts'),{touristMapPoint,touristMapBounds,clampTouristView,touristViewForPoint,touristMapTransform}=require('../lib/touristMap.ts');
const {touristRoadMapUrl,touristDirectionsUrl}=require('../lib/touristRoadLinks.ts');
const {destinationPaths}=require('../data/destinations.ts'),{places}=require('../data/places.ts');
const Page=require('../app/[locale]/carte-touristique/page.tsx'),{renderToStaticMarkup}=require('react-dom/server'),{GET}=require('../app/sitemap.xml/route.ts');
const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/media/tourist-map/sources.json')));
(async()=>{
 const road=new URL(touristRoadMapUrl()),traffic=new URL(touristRoadMapUrl(true));
 assert.equal(road.hostname,'www.google.com');assert.equal(road.searchParams.get('api'),'1');assert.equal(road.searchParams.get('basemap'),'roadmap');assert.equal(road.searchParams.get('layer'),null);assert.equal(traffic.searchParams.get('layer'),'traffic');
 for(const id of ['le-plan-de-la-tour','gassin','sainte-maxime','la-mole','cavalaire-sur-mer','la-garde-freinet','saint-tropez'])assert.equal(touristMapPlaces.find(p=>p.id===id).illustration,`/media/tourist-map/${id}-illustration.webp`);
 assert.equal(touristMapCommunes.length,12);assert.equal(new Set(touristMapCommunes.map(p=>p.id)).size,12);assert.ok(touristMapCommunes.every(p=>p.illustration));assert.equal(touristMapCommunes.some(p=>['port-grimaud','la-nartelle'].includes(p.id)),false);
 assert.equal(touristMapPlaces.length,14);assert.equal(new Set(touristMapPlaces.map(p=>p.id)).size,14);
 const validPaths=new Set([...destinationPaths(),...places.map(p=>'/place/'+p.id)]);
 for(const p of touristMapPlaces){assert.equal(new URL(p.source).protocol,'https:');assert.ok(p.checked<=new Date().toISOString().slice(0,10));assert.ok(p.latitude>=touristMapBounds.south&&p.latitude<=touristMapBounds.north&&p.longitude>=touristMapBounds.west&&p.longitude<=touristMapBounds.east);
  const point=touristMapPoint(p.latitude,p.longitude);assert.ok(point.x>=0&&point.x<=1000&&point.y>=0&&point.y<=763);
  if(p.path)assert.ok(validPaths.has(p.path));else assert.equal(new URL(p.externalUrl).hostname,'www.golfe-saint-tropez-information.com');
  if(p.illustration)assert.ok(fs.existsSync(path.join(__dirname,'../public',p.illustration)));
  for(const locale of ['fr','en'])assert.ok(p.copy[locale].description.length>30);const direction=new URL(touristDirectionsUrl(p.name));assert.equal(direction.searchParams.get('destination'),`${p.name}, Var, France`);assert.equal(direction.searchParams.has('origin'),false);
  for(const zoom of [1,1.5,2,2.5,5]){const v=touristViewForPoint(zoom,point);assert.ok(v.zoom>=1&&v.zoom<=2.5);assert.ok(Math.abs(v.panX)<=(v.zoom-1)*50&&Math.abs(v.panY)<=(v.zoom-1)*50);assert.equal(touristMapTransform(v).includes('NaN'),false);}
 }
 const grimaud=touristMapPlaces.find(p=>p.id==='grimaud'),port=touristMapPlaces.find(p=>p.id==='port-grimaud'),nartelle=touristMapPlaces.find(p=>p.id==='la-nartelle');assert.notEqual(grimaud.longitude,port.longitude);assert.equal(nartelle.path,'/place/sainte-maxime-village');assert.ok(nartelle.linkLabel.fr.includes('Sainte-Maxime'));
 assert.deepEqual(clampTouristView({zoom:1,panX:200,panY:-200}),{zoom:1,panX:0,panY:0});assert.deepEqual(clampTouristView({zoom:NaN,panX:NaN,panY:Infinity}),{zoom:1,panX:0,panY:0});
 const nw=touristMapPoint(touristMapBounds.north,touristMapBounds.west),se=touristMapPoint(touristMapBounds.south,touristMapBounds.east);assert.ok(Math.abs(nw.x)<1e-8&&Math.abs(nw.y)<1e-8&&Math.abs(se.x-1000)<1e-8&&Math.abs(se.y-763)<1);
 for(const file of manifest.files){const bytes=fs.readFileSync(path.join(__dirname,'../public',file.file));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),file.sha256);assert.ok(bytes.length<100000);}
 for(const locale of ['fr','en']){
  const metadata=await Page.generateMetadata({params:Promise.resolve({locale})});assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/carte-touristique`);assert.ok(metadata.openGraph.images[0].url.endsWith('/tourist-map/cover.webp'));
  const html=renderToStaticMarkup(await Page.default({params:Promise.resolve({locale})}));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.equal((html.match(/<option /g)||[]).length,14);assert.equal((html.match(/aria-pressed="true"/g)||[]).length,1);assert.ok(html.includes('aria-label="La Nartelle"'));assert.ok(html.includes('openstreetmap.org/copyright'));assert.ok(html.includes('tilezen/joerd'));
  assert.ok(html.includes(`href="/${locale}/carte-touristique"`));assert.ok(html.includes(`href="/${locale}/destinations/grimaud"`));assert.ok(html.includes('aria-current="page"'));assert.equal((html.match(/data-commune=/g)||[]).length,12);for(const commune of touristMapCommunes){assert.ok(html.includes(`data-commune="${commune.id}"`));assert.ok(html.includes(encodeURIComponent(commune.illustration)));}assert.ok(html.includes('layer=traffic'));assert.ok(html.includes('Itinéraire · Google Maps')||html.includes('Directions · Google Maps'));assert.equal(html.includes('<iframe'),false);assert.equal(html.includes('nominatim.openstreetmap.org'),false);
 }
 const ExplorePage=require('../app/[locale]/explore/page.tsx'),CategoryPage=require('../app/[locale]/explore/[category]/page.tsx'),Grid=require('../components/ExploreIntentGrid.tsx').default;
 const {isExploreAddress,exploreFilterIds}=require('../lib/exploreFilters.ts');const villages=places.filter(p=>!isExploreAddress(p));assert.equal(villages.length,12);assert.ok(isExploreAddress(places.find(p=>p.id==='moulin-de-paillas')));
 for(const locale of ['fr','en']){
  for(const filter of exploreFilterIds){const html=renderToStaticMarkup(Grid({places,locale,filter,query:'',town:''}));for(const village of villages)assert.equal(html.includes(`/${locale}/place/${village.id}`),false);}
  const html=renderToStaticMarkup(await ExplorePage.default({params:Promise.resolve({locale}),searchParams:Promise.resolve({q:'',town:'',filter:'all'})}));for(const village of villages)assert.equal(html.includes(`/${locale}/place/${village.id}`),false);assert.ok(html.includes(`/${locale}/carte-touristique`));
  const category=renderToStaticMarkup(await CategoryPage.default({params:Promise.resolve({locale,category:'places'})}));for(const village of villages)assert.equal(category.includes(`/${locale}/place/${village.id}`),false);
 }
 const xml=await(await GET()).text();for(const locale of ['fr','en'])assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/carte-touristique</loc><lastmod>2026-10-13</lastmod>`));assert.ok(xml.includes('/media/tourist-map/cover.webp'));
 // Exercise the actual client event handlers with isolated hook state, not a browser simulator.
 const filename=path.join(__dirname,'../components/TouristMap.tsx'),slots=[];let cursor=0;
 const realLoad=Module._load;
 Module._load=function(request,parent,...args){
  if(request==='react'&&parent?.filename===filename){const react=realLoad.call(this,request,parent,...args);return {...react,useState(initial){const at=cursor++;if(!(at in slots))slots[at]=initial;return [slots[at],next=>{slots[at]=typeof next==='function'?next(slots[at]):next;}];},useRef(initial){const at=cursor++;if(!(at in slots))slots[at]={current:initial};return slots[at];}};}
  return realLoad.call(this,request,parent,...args);
 };
 const isolated=new Module(filename);isolated.filename=filename;isolated.paths=Module._nodeModulePaths(path.dirname(filename));
 try{isolated._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);}finally{Module._load=realLoad;}
 const render=()=>{cursor=0;return isolated.exports.default({locale:'fr'});};
 const nodes=e=>!e||typeof e!=='object'?[]:[e,...require('react').Children.toArray(e.props?.children).flatMap(nodes)];
 const button=(tree,label)=>nodes(tree).find(n=>n.type==='button'&&n.props['aria-label']===label);
 let tree=render();button(tree,'Port Grimaud').props.onClick();tree=render();assert.ok(nodes(tree).some(n=>n.type==='h3'&&n.props.children==='Port Grimaud'));assert.equal(button(tree,'Port Grimaud').props['aria-pressed'],true);
 for(const p of touristMapPlaces){nodes(tree).find(n=>n.type==='select').props.onChange({target:{value:p.id}});tree=render();assert.ok(nodes(tree).some(n=>n.type==='h3'&&n.props.children===p.name));assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href===touristDirectionsUrl(p.name)));if(p.illustration)assert.ok(nodes(tree).some(n=>n.props?.src===p.illustration));}
 button(tree,'Zoomer').props.onClick();tree=render();assert.equal(slots[1].zoom,1.5);
 const capture=new Set(),host={getBoundingClientRect:()=>({width:1000,height:763}),setPointerCapture:id=>capture.add(id),hasPointerCapture:id=>capture.has(id),releasePointerCapture:id=>capture.delete(id)};
 const region=()=>nodes(tree).find(n=>n.props?.role==='region');
 const event={pointerId:7,button:0,clientX:20,clientY:20,target:{closest:()=>null},currentTarget:host,preventDefault(){}};
 region().props.onPointerDown(event);tree=render();region().props.onPointerMove({...event,clientX:5000,clientY:5000});tree=render();assert.ok(Math.abs(slots[1].panX)<=25&&Math.abs(slots[1].panY)<=25);region().props.onPointerUp(event);tree=render();assert.equal(capture.size,0);assert.equal(slots[2],false);
 region().props.onKeyDown({key:'ArrowLeft',target:host,currentTarget:host,preventDefault(){}});tree=render();assert.ok(Math.abs(slots[1].panX)<=25);
 nodes(tree).find(n=>n.type==='button'&&n.props.children==='Vue d’ensemble').props.onClick();render();assert.deepEqual(slots[1],{zoom:1,panX:0,panY:0});
 process.env.VERCEL_ENV='preview';assert.equal((await Page.generateMetadata({params:Promise.resolve({locale:'fr'})})).robots.index,false);
 console.log('Tourist map: 14 sourced locations, projection/bounds/pan limits and actual selection/zoom/drag/keyboard handlers, media hashes, FR/EN SSR/navigation/metadata/sitemap and preview isolation passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
