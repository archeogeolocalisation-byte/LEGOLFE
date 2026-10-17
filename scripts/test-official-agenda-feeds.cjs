/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/guides/'+path.basename(f),width:1200,height:800};};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {officialAgendaSources}=require('../data/officialAgendaSources.ts'),{officialAgendaSnapshot}=require('../data/officialAgendaSnapshot.ts');
const {officialAgendaDetailUrls,parseOfficialAgendaDetail}=require('../lib/officialAgendaParser.ts');
const {getOfficialAgendaFeed}=require('../lib/officialAgendaFeeds.ts');
const {isValidAgendaEvent,mergeOfficialAgenda,qualityAgendaEvents}=require('../lib/agendaQuality.ts');
const {eventOverlaps}=require('../lib/agendaCalendar.ts');
const {agendaTownSlug}=require('../lib/agendaTownLinks.ts');
const dir=path.join(__dirname,'fixtures/official-agenda'),manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json')));
const read=name=>fs.readFileSync(path.join(dir,name),'utf8');
const sourceFor=url=>officialAgendaSources.find(s=>new URL(s.url).origin===new URL(url).origin);
(async()=>{
 const parsed=manifest.flatMap(item=>{const event=parseOfficialAgendaDetail(read(item.file),item.url,sourceFor(item.url),'2026-10-17');return event?[event]:[];});
 assert.deepEqual(JSON.parse(JSON.stringify(parsed)),officialAgendaSnapshot);assert.equal(parsed.length,25);assert.equal(new Set(parsed.map(e=>e.location)).size,12);
 for(const e of parsed){assert.ok(isValidAgendaEvent(e),e.id);assert.ok(agendaTownSlug(e.location),e.location);assert.equal(e.officialImage,undefined,'Reuse existing illustrations rather than importing unlicensed event photos');}
 const {getDestination}=require('../data/destinations.ts');
 for(const location of Object.values(require('../data/agendaTowns.ts').agendaTowns))assert.ok(getDestination(agendaTownSlug(location)),`Valid destination URL: ${location}`);
 const gassin=officialAgendaSources[0],rayol=officialAgendaSources[1];
 const urls=officialAgendaDetailUrls(read('gassin-list.html'),gassin);assert.ok(urls.length<=gassin.limit);assert.equal(new Set(urls.map(u=>new URL(u).pathname.split('/')[4])).size,12);
 assert.equal(officialAgendaDetailUrls(read('rayol-list.html'),rayol).length,5);
 assert.deepEqual(officialAgendaDetailUrls('<a href="https://evil.example/fr/animation/culture/gassin/test-1234567/"><div class="date-simple"></div></a>',gassin),[]);
 assert.deepEqual(officialAgendaDetailUrls('<a href="/fr/animation/culture/gassin/test-1234567/"><div class="date-double"></div></a>',gassin),[],'Never infer continuous attendance from first and last dates');
 const mole=manifest.find(x=>x.url.includes('8028843')),moleHtml=read(mole.file);
 assert.equal(parseOfficialAgendaDetail(moleHtml.replace('2026-10-25','2026-02-30'),mole.url,gassin,'2026-10-17'),undefined);
 assert.equal(parseOfficialAgendaDetail(moleHtml.replace('category category--full block','category category--full block').replace('Dimanche 25 octobre 2026','Tous les dimanches de 2026'),mole.url,gassin,'2026-10-17'),undefined);
 assert.equal(parseOfficialAgendaDetail(moleHtml.replace('La Mole en Rose','La Mole en Rose — annulée'),mole.url,gassin,'2026-10-17').cancelled,true);
 assert.equal(parseOfficialAgendaDetail(moleHtml,'https://evil.example/event',gassin,'2026-10-17'),undefined);
 const workshop=parsed.find(e=>e.id==='apidae-4940664');assert.equal(eventOverlaps(workshop,'2026-10-17','2026-10-17'),true);assert.equal(eventOverlaps(workshop,'2026-08-01','2026-08-01'),false);assert.equal(workshop.sessions.length,4);
 const activity=parsed.find(e=>e.id==='apidae-4759212');assert.equal(activity.sessions.length,2);assert.equal(eventOverlaps(activity,'2026-10-22','2026-10-22'),false);
 const staticEvent={...parsed[0],id:'stable-editorial-id',title:'Editorial English name',titleFr:'Titre conservé',summaryFr:'Texte conservé',source:parsed[0].source.replace('gassin.eu','www.golfe-saint-tropez-information.com')};
 const updated=mergeOfficialAgenda([staticEvent],[{...parsed[0],time:'19:00',sessions:[{start:parsed[0].start,time:'19:00'}]}]);assert.equal(updated.length,1);assert.equal(updated[0].id,staticEvent.id);assert.equal(updated[0].titleFr,'Titre conservé');assert.equal(updated[0].time,'19:00');
 const duplicate={...staticEvent,id:'other',venue:'A differently written venue'};assert.equal(qualityAgendaEvents([staticEvent,duplicate]).length,1,'Provider ID handles cross-source title/venue variants without collapsing sessions');
 const realFetch=global.fetch;let maximum=0,active=0;
 global.fetch=async(url,options)=>{assert.equal(options.next.revalidate,21600);assert.equal(options.redirect,'error');assert.ok(options.signal);active++;maximum=Math.max(maximum,active);await new Promise(r=>setImmediate(r));active--;const item=manifest.find(x=>x.url===url);return new Response(url===gassin.url?read('gassin-list.html'):item?read(item.file):'Maintenance',{headers:{date:'Sat, 17 Oct 2026 09:00:00 GMT'}});};
 const refreshed=await getOfficialAgendaFeed(gassin);assert.ok(refreshed.length>=21);assert.ok(maximum<=6);assert.ok(refreshed.every(e=>e.source.startsWith('https://gassin.eu/')));
 global.fetch=async()=>new Response('Unavailable',{status:503});assert.deepEqual(await getOfficialAgendaFeed(rayol),officialAgendaSnapshot.filter(e=>e.source.startsWith('https://www.domainedurayol.org/')));
 global.fetch=async()=>new Response('Changed listing');assert.equal((await getOfficialAgendaFeed(gassin)).length,21);
 global.fetch=async()=>{throw new Error('Offline');};assert.equal((await getOfficialAgendaFeed(gassin)).length,21);
 global.fetch=async url=>new Response(url===gassin.url?`<a href="${mole.url}"><div class="date-simple"></div></a>`:moleHtml.replace('La Mole en Rose','La Mole en Rose — annulée'));const cancelledFeed=await getOfficialAgendaFeed(gassin);assert.equal(qualityAgendaEvents(mergeOfficialAgenda([officialAgendaSnapshot.find(e=>e.id==='apidae-8028843')],cancelledFeed)).some(e=>e.id==='apidae-8028843'),false,'A successfully read cancellation suppresses both the snapshot and an existing editorial record');
 global.fetch=async()=>new Response('x'.repeat(2_000_001));assert.equal((await getOfficialAgendaFeed(gassin)).length,21);
 global.fetch=realFetch;
 const {editorialSources}=require('../data/agendaSources.ts'),{fetchSourceCandidates}=require('../lib/editorialIngest.ts');
 const rss=editorialSources.find(s=>s.format==='rss-events');global.fetch=async()=>new Response('<rss><item><title>Atelier local</title><link>https://www.cogolin.fr/agenda/atelier-local/</link><pubDate>Fri, 16 Oct 2026 10:00:00 GMT</pubDate></item></rss>');
 try{const candidates=await fetchSourceCandidates(rss);assert.equal(candidates.length,1);assert.equal(candidates[0].start_date,null);assert.equal(candidates[0].raw.requiresEventDateReview,true);assert.equal(candidates[0].raw.published,'2026-10-16');}finally{global.fetch=realFetch;}
 global.fetch=async()=>new Response('<p>23 octobre</p><a href="/agenda/exemple/">Atelier de village</a>');
 try{assert.deepEqual(await fetchSourceCandidates({...rss,format:undefined,url:'https://www.cogolin.fr/agenda/'}),[],'A missing year is never inferred');}finally{global.fetch=realFetch;}
 global.fetch=async()=>new Response('<p>23 octobre 2026</p><a href="/agenda/exemple/">Atelier de village</a>');
 try{const proposed=await fetchSourceCandidates({...rss,format:undefined,url:'https://www.cogolin.fr/agenda/'});assert.equal(proposed.length,1);assert.equal(proposed[0].start_date,null);assert.equal(proposed[0].raw.proposedDate,'2026-10-23');assert.equal(proposed[0].raw.requiresEventDateReview,true);}finally{global.fetch=realFetch;}
 const Module=require('node:module'),load=Module._load;
 Module._load=function(request,parent,...args){if(parent?.filename.endsWith('/publicEvents.ts')&&request==='./editorialDb')return {getApprovedEvents:async()=>[]};return load.call(this,request,parent,...args);};
 let getPublicEvents;try{getPublicEvents=require('../lib/publicEvents.ts').getPublicEvents;}finally{Module._load=load;}
 global.fetch=async url=>{const item=manifest.find(x=>x.url===url);return new Response(url===gassin.url?read('gassin-list.html'):url===rayol.url?read('rayol-list.html'):item?read(item.file):fs.readFileSync(path.join(__dirname,'fixtures/carre-programme.html'),'utf8'),{headers:{date:'Sat, 17 Oct 2026 09:00:00 GMT'}});};
 try{
  const catalog=await getPublicEvents();assert.equal(new Set(catalog.map(e=>e.id)).size,catalog.length,'Public event URLs remain unique after all programme merges');
  const eventPage=require('../app/[locale]/event/[id]/page.tsx'),{renderToStaticMarkup}=require('react-dom/server');
  for(const id of ['apidae-8028843','apidae-4940664'])for(const locale of ['fr','en']){
   const params=Promise.resolve({id,locale}),html=renderToStaticMarkup(await eventPage.default({params}));
   assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes(`href="/${locale}/destinations/${id==='apidae-8028843'?'la-mole':'rayol-canadel'}"`));
   const metadata=await eventPage.generateMetadata({params});assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/event/${id}`);
  }
 }finally{global.fetch=realFetch;}
 console.log('Official agenda feeds: 25 checked records / 12 towns, exact recurrence, same-origin links, cancellation, bounded cached fetch, offline/changed fallback, stable editorial IDs and RSS publication-date separation passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
