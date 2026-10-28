/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,k)=>k==='__esModule'?false:String(k)});};
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/'+path.basename(f),width:1200,height:800};};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {eventStructuredData,eventDateTime,eventSessionDates}=require('../lib/eventStructuredData.ts');
const {carreProgrammeSnapshot}=require('../data/carreProgrammeSnapshot.ts'),{officialAgendaSnapshot}=require('../data/officialAgendaSnapshot.ts'),{cinemaSnapshot}=require('../data/cinemaSnapshot.ts');
const base={...carreProgrammeSnapshot.find(e=>e.id==='carre-733261')};
assert.equal(eventDateTime('2026-10-30','20:30'),'2026-10-30T20:30:00+01:00');
assert.equal(eventDateTime('2026-10-17','20:30'),'2026-10-17T20:30:00+02:00');
assert.equal(eventDateTime('2026-03-29','02:30'),'2026-03-29','Do not invent nonexistent DST clock times');
assert.equal(eventDateTime('2026-10-25','02:30'),'2026-10-25','Do not guess ambiguous DST offsets');
assert.deepEqual(eventSessionDates({start:'2026-10-30',time:'20:30'}),{startDate:'2026-10-30T20:30:00+01:00'});
assert.deepEqual(eventSessionDates({start:'2026-10-30',end:'2026-10-31',time:'23:00',endTime:'01:00'}),{startDate:'2026-10-30T23:00:00+01:00',endDate:'2026-10-31T01:00:00+01:00'});
assert.equal(eventSessionDates({start:'2026-10-30',time:'20:30',endTime:'19:00'}).endDate,undefined);
const entity=eventStructuredData(base,'fr')['@graph'][0];assert.equal(entity.eventStatus,'https://schema.org/EventScheduled');assert.equal(entity.organizer.name,'Le Carré Sainte-Maxime');assert.equal(entity.performer[0].name,'Greg Zlap');assert.ok(entity.image[0].startsWith('https://'));assert.equal(entity.startDate,'2026-10-30T20:30:00+01:00');assert.equal(entity.endDate,undefined);
const plain={...base,organizer:undefined,performers:undefined,officialImage:undefined,id:'no-known-participants',category:'local'};
const unknown=eventStructuredData(plain,'fr')['@graph'][0];assert.equal(unknown.organizer,undefined);assert.equal(unknown.performer,undefined);assert.equal(unknown.image,undefined,'Context illustration is not an official event poster');assert.equal(unknown.endDate,undefined,'Unknown end must remain absent');
for(const status of ['EventCancelled','EventPostponed','EventRescheduled'])assert.equal(eventStructuredData({...base,eventStatus:status},'en')['@graph'][0].eventStatus,'https://schema.org/'+status);
assert.equal(eventStructuredData({...base,cancelled:true,eventStatus:'EventScheduled'},'en')['@graph'][0].eventStatus,'https://schema.org/EventCancelled');
const unsafe=eventStructuredData({...base,organizer:{type:'Organization',name:'Name',url:'javascript:alert(1)'},performers:[{type:'Organization',name:'Not a performer'}]},'en')['@graph'][0];assert.equal(unsafe.organizer.url,undefined);assert.equal(unsafe.performer,undefined);
const {parseOfficialAgendaDetail}=require('../lib/officialAgendaParser.ts'),{officialAgendaSources}=require('../data/officialAgendaSources.ts');
const source=officialAgendaSources[0],url=new URL('/fr/animation/culture/gassin/test-1234567/',source.url).href;
const detail='<main itemtype="http://schema.org/Event"><span itemprop="name">Concert</span><meta itemprop="startDate" content="2026-10-30"><span class="category">Vendredi 30 octobre 2026 de 20h30 à 22h</span></main>';
const supplied=detail+'<script type="application/ld+json">'+JSON.stringify({'@type':'Event',organizer:{'@type':'Organization',name:'True host',url:'https://example.org/'},performer:[{'@type':'Person',name:'True artist'}]})+'</script>';
const parsed=parseOfficialAgendaDetail(supplied,url,source,'2026-10-28');assert.equal(parsed.organizer.name,'True host');assert.equal(parsed.performers[0].name,'True artist');assert.equal(parsed.sessions[0].endTime,'22:00');assert.equal(eventStructuredData(parsed,'fr')['@graph'][0].endDate,'2026-10-30T22:00:00+01:00');
const overnight=parseOfficialAgendaDetail(detail.replace('20h30 à 22h','23h à 1h'),url,source,'2026-10-28');assert.deepEqual(overnight.sessions[0],{start:'2026-10-30',time:'23:00',endTime:'01:00',end:'2026-10-31'});
assert.equal(parseOfficialAgendaDetail(detail,url,source,'2026-10-28').organizer,undefined,'Tourism publisher is not assumed to be the host');
for(const e of [...carreProgrammeSnapshot,...officialAgendaSnapshot,...cinemaSnapshot])for(const locale of ['fr','en']){
 const graph=eventStructuredData(e,locale)['@graph'];assert.ok(graph.length);for(const item of graph){assert.ok(item['@id'].startsWith('https://www.legolfe.com/'+locale+'/event/'));assert.equal(item.eventStatus,'https://schema.org/EventScheduled');if(item.endDate&&item.startDate.includes('T')&&item.endDate.includes('T'))assert.ok(Date.parse(item.endDate)>=Date.parse(item.startDate));}
}
// Verify the public FR/EN page serializes the schema and shows the same participants and end time.
const testEvent={...base,sessions:[{start:'2026-10-30',time:'20:30',endTime:'22:00'}]};
const load=Module._load;Module._load=function(id,parent,...args){if(parent?.filename.endsWith('/app/[locale]/event/[id]/page.tsx')&&id.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[testEvent]};return load.call(this,id,parent,...args);};const Page=require('../app/[locale]/event/[id]/page.tsx').default;Module._load=load;
(async()=>{
 const {renderToStaticMarkup}=require('react-dom/server');
 for(const locale of ['fr','en']){const html=renderToStaticMarkup(await Page({params:Promise.resolve({locale,id:base.id})}));const scripts=[...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(m=>JSON.parse(m[1]));const schema=scripts.find(x=>x['@graph'])['@graph'][0];assert.equal(schema.endDate,'2026-10-30T22:00:00+01:00');assert.ok(html.includes('20:30–22:00'));assert.ok(html.includes('Greg Zlap'));assert.ok(html.includes('Le Carré Sainte-Maxime'));}
 process.env.VERCEL_ENV='preview';assert.equal(eventStructuredData(base,'fr'),undefined);
 console.log('PASS: Event structured data — sourced participants, official images, known end times, overnight dates, Paris DST, unknown-field omission, status, session identity, preview isolation and real FR/EN page output.');
})().catch(e=>{console.error(e);process.exitCode=1;});
