/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
const {renderToStaticMarkup}=require('react-dom/server');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/'+path.basename(f),width:1200,height:800};};require.extensions['.css']=m=>{m.exports={};};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {localNews}=require('../data/localNews.ts');
let news=[{...localNews[0],id:'older',date:'2026-10-20',featured:true},{...localNews[0],id:'live-new',date:'2026-10-29',featured:false},{...localNews[0],id:'middle',date:'2026-10-27',featured:false},{...localNews[0],id:'future',date:'2026-11-01',featured:true}];
let events=[{id:'current',title:'Event',titleFr:'Événement',category:'culture',location:'Grimaud',start:'2026-10-29',summary:'Test',summaryFr:'Test',source:'https://example.com',sourceLabel:'Source'},{id:'past',title:'Past',titleFr:'Passé',category:'culture',location:'Grimaud',start:'2026-10-20'},{id:'far',title:'Far future',titleFr:'Plus tard',category:'culture',location:'Grimaud',start:'2026-11-20'}];
const original=Module._load;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('/app/[locale]/page.tsx')){
  if(request.endsWith('/lib/publicEvents'))return{getPublicEvents:async()=>events};
  if(request.endsWith('/lib/publicNews'))return{getPublicNews:async()=>news};
  if(request.endsWith('/lib/localCalendar'))return{parisIsoDay:()=> '2026-10-29'};
  if(request.endsWith('/SiteHeader'))return{__esModule:true,default:()=>null};
 }
 if(request==='next/navigation')return{notFound:()=>{throw Error('NOT_FOUND');}};
 return original.call(this,request,parent,...rest);
};
const Home=require('../app/[locale]/page.tsx');Module._load=original;
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
(async()=>{
 assert.equal(Home.dynamic,'force-dynamic');
 for(const locale of ['fr','en']){
  let tree=await Home.default({params:Promise.resolve({locale})}),all=nodes(tree);const updates=all.find(n=>n.type?.name==='HomeUpdates');assert.deepEqual(updates.props.news.map(n=>n.id),['live-new','middle','older']);assert.deepEqual(updates.props.events.map(n=>n.id),['current']);assert.deepEqual(updates.props.window,{from:'2026-10-29',to:'2026-11-04'});
  const hero=all.find(n=>n.props?.className==='home-hero-photo');const heroImage=nodes(hero).find(n=>n.props?.src==='/images/saint-tropez-home-v43.png');assert.ok(heroImage.props.preload);assert.ok(heroImage.props.sizes.includes('55vw'));
  const places=all.find(n=>n.props?.className==='home-place-grid');assert.equal(places.props.children.length,3);assert.ok(!places.props.className.includes('hidden'));const guideGrid=all.find(n=>n.props?.className==='home-guide-grid');assert.equal(guideGrid.props.children.length,3);
  const html=renderToStaticMarkup(tree);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  for(const href of ['/explore','/guides','/whats-on?range=weekend','/whats-on?range=today','/saved','/stay','/ask','/carte-touristique'])assert.ok(html.includes(`href="/${locale}${href}"`),href);
  for(const id of ['pampelonne','san-peire-randonnee','pont-des-fees'])assert.ok(html.includes(`href="/${locale}/place/${id}"`));
  for(const id of ['grimaud','saint-tropez','sainte-maxime'])assert.ok(html.includes(`href="/${locale}/destinations/${id}"`));
  for(const slug of ['activites-gratuites-golfe-saint-tropez','golfe-saint-tropez-avec-enfants','week-end-automne-golfe-saint-tropez'])assert.ok(html.includes(`href="/${locale}/guides/${slug}"`));
  assert.ok(html.includes(`href="/${locale}/local#live-new"`));assert.ok(!html.includes(`/local#future`));assert.ok(!html.includes(`/event/past`));assert.ok(!html.includes(`/event/far`));assert.ok(!html.includes('/stay/villa-eden'));assert.ok(html.includes('home-ask-button'));
  const meta=await Home.generateMetadata({params:Promise.resolve({locale})});assert.equal(meta.alternates.canonical,`https://www.legolfe.com/${locale}`);assert.ok(meta.openGraph.images[0].url.endsWith('saint-tropez-home-v43.png'));
 }
 events=[];news=[];for(const locale of ['fr','en']){const html=renderToStaticMarkup(await Home.default({params:Promise.resolve({locale})}));assert.ok(html.includes(locale==='fr'?'Aucun rendez-vous publié':'No listings for the next seven days'));assert.ok(html.includes(locale==='fr'?'Aucune information publiée':'No published updates'));assert.ok(html.includes(`href="/${locale}/local"`));}
 await assert.rejects(Home.default({params:Promise.resolve({locale:'de'})}),/NOT_FOUND/);
 console.log('PASS: homepage FR/EN — preserved hero and metadata, three visible place/guide cards, full discovery/stay paths, live approved news order with future exclusion, seven-day events and empty states.');
})().catch(error=>{console.error(error);process.exitCode=1;});
