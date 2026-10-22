/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/guides/'+path.basename(f),width:1200,height:800};};
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const load=Module._load;
Module._load=function(request,parent,...rest){
 if(request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[]};
 return load.call(this,request,parent,...rest);
};
const React=require('react'),{renderToReadableStream}=require('react-dom/server');
const {places}=require('../data/places.ts'),{destinations}=require('../data/destinations.ts'),{guides}=require('../data/guides.ts'),{localNews}=require('../data/localNews.ts');
const {isExploreAddress}=require('../lib/exploreFilters.ts');
const {newsMonths,newsForMonth}=require('../lib/localNewsCatalog.ts');
const Home=require('../app/[locale]/page.tsx').default;
const Explore=require('../app/[locale]/explore/page.tsx').default;
const Towns=require('../app/[locale]/destinations/page.tsx').default;
const Town=require('../app/[locale]/destinations/[town]/page.tsx').default;
const GuideList=require('../app/[locale]/guides/page.tsx').default;
const Guide=require('../app/[locale]/guides/[slug]/page.tsx').default;
const LocalJournal=require('../components/LocalJournal.tsx').default;
const Footer=require('../components/SiteFooter.tsx').default;
async function htmlFor(element){const stream=await renderToReadableStream(element);await stream.allReady;return new Response(stream).text();}
function links(html){return new Set([...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)].map(match=>match[1].replaceAll('&amp;','&')));}
function placeIds(html,locale){return [...links(html)].filter(href=>href.startsWith(`/${locale}/place/`)).map(href=>href.split('/')[3]);}
(async()=>{
 const reviewed={
  'paradis-porsche-bilan-2026':['port-de-saint-tropez'],
  'gigaro-protection-2026':['gigaro-beach'],
  'spar-lices':['place-des-lices'],
  'citadelle-30':['citadelle-saint-tropez'],
 };
 for(const [id,ids] of Object.entries(reviewed))assert.deepEqual(localNews.find(item=>item.id===id)?.placeIds,ids,id);
 for(const item of localNews)for(const id of item.placeIds??[])assert.ok(places.some(place=>place.id===id),'Invalid news place: '+item.id+'/'+id);
 for(const locale of ['fr','en']){
  // Build a graph from rendered anchor hrefs, excluding filters, map interaction,
  // JSON-LD and script payloads. Every route below is rendered without a browser.
  const graph=new Map();
  async function page(route,element){const html=await htmlFor(await element);graph.set(route,links(html));return html;}
  await page(`/${locale}`,Home({params:Promise.resolve({locale})}));
  const explore=await page(`/${locale}/explore`,Explore({params:Promise.resolve({locale})}));
  assert.deepEqual(new Set(placeIds(explore,locale)),new Set(places.filter(isExploreAddress).map(place=>place.id)),'All Explorer cards must be in the initial HTML');
  await page(`/${locale}/destinations`,Towns({params:Promise.resolve({locale})}));
  for(const destination of destinations)await page(`/${locale}/destinations/${destination.slug}`,Town({params:Promise.resolve({locale,town:destination.slug})}));
  await page(`/${locale}/guides`,GuideList({params:Promise.resolve({locale})}));
  for(const guide of guides){
   const html=await page(`/${locale}/guides/${guide.slug}`,Guide({params:Promise.resolve({locale,slug:guide.slug})}));
   const ids=new Set(placeIds(html,locale));
   for(const id of guide.placeIds)assert.ok(ids.has(id),'Guide missing place anchor: '+guide.slug+'/'+id);
  }
  const journal=await page(`/${locale}/local`,React.createElement(LocalJournal,{locale,news:localNews,today:'2026-10-22'}));
  for(const [id,ids] of Object.entries(reviewed)){
   const article=journal.match(new RegExp(`<article[^>]*data-local-news="${id}"[\\s\\S]*?</article>`))?.[0];
   assert.ok(article,'Missing news article: '+id);
   for(const place of ids)assert.ok(links(article).has(`/${locale}/place/${place}`),'Missing contextual news link: '+id);
  }
  for(const month of newsMonths(localNews)){
   const html=await page(`/${locale}/local/archives/${month}`,React.createElement(LocalJournal,{locale,news:localNews,month,today:'2026-10-22'}));
   for(const item of newsForMonth(localNews,month))for(const id of item.placeIds??[])assert.ok(links(html).has(`/${locale}/place/${id}`),'Archive missing place link: '+month+'/'+id);
  }
  // The footer is mounted on every public page by RootLayout.
  const footer=links(await htmlFor(React.createElement(Footer,{locale})));
  for(const outgoing of graph.values())for(const href of footer)outgoing.add(href);
  const reached=new Set(),queue=[`/${locale}`];
  while(queue.length){const route=queue.shift();if(reached.has(route))continue;reached.add(route);for(const href of graph.get(route)??[])if(!href.includes('?'))queue.push(href.split('#')[0]);}
  for(const place of places)assert.ok(reached.has(`/${locale}/place/${place.id}`),'Orphan place: '+locale+'/'+place.id);
  for(const [route,outgoing] of graph)for(const href of outgoing){
   if(href.startsWith(`/${locale}/place/`))assert.ok(places.some(place=>place.id===href.split('/')[3]),'Broken place link: '+route+' -> '+href);
  }
  console.log(`Crawlability ${locale}: all ${places.length} places reachable from home without filters or maps; ${guides.length} guides and ${newsMonths(localNews).length} news archives checked.`);
 }
})().catch(error=>{console.error(error);process.exitCode=1;}).finally(()=>{Module._load=load;});
