/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),Module=require('node:module'),ts=require('typescript'),React=require('react');
const compile=source=>ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText;
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(compile(fs.readFileSync(f,'utf8')),f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
const {hikingRoutes,hikingRouteForPlace}=require('../data/hikingRoutes.ts'),{hikingMapFrame}=require('../lib/hikingTrack.ts'),{mapPointPixels}=require('../lib/villaMapLocation.ts');
const {renderToStaticMarkup}=require('react-dom/server'),Component=require('../components/HikingRoute.tsx').default;
function distance(a,b){const rad=x=>x*Math.PI/180;return 6371*2*Math.asin(Math.sqrt(Math.sin(rad(b.lat-a.lat)/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(rad(b.lon-a.lon)/2)**2));}
for(const route of hikingRoutes){
 const data=require(`../data/${route.id}Trail.json`),raw=fs.readFileSync(path.join(__dirname,'../data/sources/hiking',data.sourceFile),'utf8');
 assert.equal(crypto.createHash('sha256').update(raw).digest('hex'),data.sourceSha256);
 const counts={'cap-lardier':688,'pont-des-fees':130,'roches-blanches':325,'saint-clement':159,'moulin-adrech':88,'miremer':331};
 const terrain=data.altitudeFile?JSON.parse(fs.readFileSync(path.join(__dirname,'../data/sources/hiking',data.altitudeFile),'utf8')):undefined;
 if(terrain)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'../data/sources/hiking',data.altitudeFile))).digest('hex'),data.altitudeSha256);
 const coordinates=terrain?[...raw.matchAll(/<trkpt lat="([^"]+)" lon="([^"]+)"/g)].map((m,i)=>[Number(m[1]),Number(m[2]),terrain[i]]):route.id==='cap-lardier'?[...raw.matchAll(/<trkpt lat="([^"]+)" lon="([^"]+)"[^>]*>\s*<ele>([^<]+)<\/ele>/g)].map(m=>m.slice(1).map(Number)):route.id==='pont-des-fees'?raw.match(/<coordinates>([\s\S]*?)<\/coordinates>/)[1].trim().split(/\s+/).map(s=>{const [lon,lat,ele]=s.split(',').map(Number);return[lat,lon,ele];}):JSON.parse(raw);
 assert.equal(route.points.length,coordinates.length);assert.equal(coordinates.length,counts[route.id]);
 let accumulated=0;
 route.points.forEach((p,i)=>{assert.deepEqual([p.lat,p.lon,p.elevation],coordinates[i]);assert.ok(p.elevation>0);if(i){const gap=distance(route.points[i-1],p);assert.ok(gap<.35,'No artificial connections between disconnected source fragments');accumulated+=gap;}assert.ok(Math.abs(p.distanceKm-accumulated)<.000001);});
 const expected={'cap-lardier':8.219,'pont-des-fees':1.891,'roches-blanches':9.453,'saint-clement':4.197,'moulin-adrech':2.584,'miremer':9.157}[route.id];assert.ok(Math.abs(accumulated-expected)<.003);
 for(const [w,h] of [[240,300],[350,300],[800,480],[1200,480]]){const f=hikingMapFrame(w,h,route.points);for(const p of route.points){const v=mapPointPixels(p.lat,p.lon,f.zoom);assert.ok(Math.abs(v.x-f.center.x)<w/2&&Math.abs(v.y-f.center.y)<h/2,`${route.id}: complete source fits ${w}px map`);}}
 if(route.gpx){const gpx=fs.readFileSync(path.join(__dirname,'../public',route.gpx),'utf8'),exported=[...gpx.matchAll(/<trkpt lat="([^"]+)" lon="([^"]+)"><ele>([^<]+)<\/ele>/g)].map(m=>m.slice(1).map(Number));assert.deepEqual(exported,coordinates);assert.equal((gpx.match(/<trkseg>/g)||[]).length,1);}
 for(const locale of ['fr','en']){
  const html=renderToStaticMarkup(React.createElement(Component,{route,locale}));
  assert.ok(html.includes(`id="parcours-${route.id}"`));assert.ok(html.includes('type="range"'));assert.ok(html.includes(route.sourcePage.replaceAll('&','&amp;')));assert.ok(html.includes(`/${locale}/place/${route.placeId}#contribuer`));assert.ok(html.includes('OpenStreetMap'));assert.ok(!html.includes('<iframe'));assert.ok(html.includes(`destination=${route.points[0].lat},${route.points[0].lon}`));
  assert.equal((html.match(/aria-label="Zoomer"|aria-label="Zoom in"/g)||[]).length,1,'Hidden fullscreen map does not duplicate tiles');
 }
}
// Exercise range, full-screen opening, focus restoration and closing, without a browser dependency.
let states=[],refs=[],cursor=0,refCursor=0;
const hooks={...React,useState(initial){const i=cursor++;if(!(i in states))states[i]=initial;return[states[i],next=>{states[i]=typeof next==='function'?next(states[i]):next;}];},useRef(initial){const i=refCursor++;if(!refs[i])refs[i]={current:initial};return refs[i];}};
const filename=path.resolve(__dirname,'../components/HikingRoute.tsx'),m=new Module(filename);m.filename=filename;m.paths=Module._nodeModulePaths(path.dirname(filename));const load=Module._load;Module._load=function(id,parent,...rest){if(parent?.filename===filename&&id==='react')return hooks;return load.call(this,id,parent,...rest);};try{m._compile(compile(fs.readFileSync(filename,'utf8')),filename);}finally{Module._load=load;}
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
const text=e=>typeof e==='string'||typeof e==='number'?String(e):Array.isArray(e)?e.map(text).join(''):e?.props?text(e.props.children):'';
for(const route of hikingRoutes){
 states=[];refs=[];const render=()=>{cursor=0;refCursor=0;return m.exports.default({route,locale:'fr'});};let tree=render();const lastIndex=route.points.length-1;nodes(tree).find(n=>n.type==='input').props.onChange({target:{value:String(lastIndex)}});tree=render();assert.ok(nodes(tree).filter(n=>n.type?.name==='HikingMap').every(n=>n.props.index===lastIndex));assert.ok(text(nodes(tree).find(n=>n.type==='output')).includes(String(Math.round(route.points.at(-1).elevation))));
 let opened=0,focused=0;nodes(tree).find(n=>n.type==='dialog').props.ref.current={showModal(){opened++;},close(){}};nodes(tree).find(n=>n.type==='button'&&text(n).includes('Carte plein écran')).props.onClick({currentTarget:{focus(){focused++;}}});tree=render();assert.equal(opened,1);assert.equal(nodes(tree).filter(n=>n.type?.name==='HikingMap').length,2);nodes(tree).find(n=>n.type==='dialog').props.onClose();tree=render();assert.equal(focused,1);assert.equal(nodes(tree).filter(n=>n.type?.name==='HikingMap').length,1);
}
assert.equal(hikingRouteForPlace('circuit-cap-lardier')?.id,'cap-lardier');assert.equal(hikingRouteForPlace('randonnee-roches-blanches')?.id,'roches-blanches');assert.equal(hikingRouteForPlace('fort-freinet'),undefined);
const fort=hikingRoutes.find(r=>r.id==='roches-blanches');assert.match(fort.copy.fr.warning,/rouge.*expérimentés/);assert.match(fort.copy.en.warning,/red.*experienced/);assert.match(fort.copy.fr.warning,/3 km/);
const page=fs.readFileSync(path.join(__dirname,'../app/[locale]/guides/[slug]/page.tsx'),'utf8');assert.match(page,/hikingRouteForGuide\(guide.slug\)/);assert.match(page,/<HikingRoute key=\{hikingRoute.id\}/);
console.log('PASS: 6 hiking routes — 1,721 source coordinates/elevations, snapshot hashes, cumulative distances, GPX conversion, mobile/desktop framing, FR/EN rendering, profile exploration, fullscreen focus and trail-report links.');
