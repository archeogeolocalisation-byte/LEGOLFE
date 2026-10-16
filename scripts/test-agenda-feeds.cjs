/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),Module=require('node:module');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,f);
const {parseCarreProgramme,mergeCarreProgramme,carreProgrammeUrl}=require('../lib/carreProgramme.ts'),{carreProgrammeSnapshot}=require('../data/carreProgrammeSnapshot.ts'),{getCarreProgramme}=require('../lib/carreFeed.ts'),{events}=require('../data/events.ts'),{additionalAgendaEvents}=require('../data/additionalAgendaEvents.ts');
const fixture=fs.readFileSync(path.join(__dirname,'fixtures/carre-programme.html'),'utf8');
(async()=>{
 const programme=parseCarreProgramme(fixture,'2026-10-13');assert.equal(programme.length,31);assert.deepEqual(programme,carreProgrammeSnapshot);assert.equal(new Set(programme.map(e=>e.id)).size,31);
 const {mediaForEvent,eventMediaLabel}=require('../lib/eventMedia.ts');
 const {illustrationForEvent,agendaTitleCardIds}=require('../lib/eventMedia.ts');
 const sample={...events[0],id:'fallback-a',officialImage:undefined,title:'Local gathering',titleFr:'Rendez-vous local'};
 for(const category of ['music','culture','sport','local','family','sailing']){
  const media=mediaForEvent({...sample,category});assert.equal(media.kind,'illustration');assert.ok(media.src.endsWith(`/${category}.webp`));
  const file=fs.readFileSync(path.join(__dirname,'../public',media.src));assert.equal(file.toString('ascii',8,12),'WEBP');
 }
 for(const [title,expected] of [['Tournoi de pétanque','petanque'],['Fête des vendanges','vineyards'],['Découverte des vignobles','vineyards'],['Dégustation de vins','vineyards'],['Vincent en concert','music']])assert.ok(illustrationForEvent({...sample,title,titleFr:title,category:'music'}).src.endsWith(`/${expected}.webp`));
 const ordered=[sample,programme[0],{...sample,id:'fallback-b'},{...sample,id:'fallback-c'},programme[1],{...sample,id:'fallback-d'}];
 assert.deepEqual([...agendaTitleCardIds(ordered)],['fallback-b','fallback-d']);
 assert.deepEqual([...agendaTitleCardIds([programme[0],sample])],[]);
 assert.deepEqual([...agendaTitleCardIds([])],[]);
 const imageManifest=require('../data/carreEventImages.ts').carreEventImages;assert.equal(imageManifest.length,31);
 for(const event of programme){const media=mediaForEvent(event);assert.equal(media.kind,'official');assert.ok(media.src.startsWith('/media/events/carre/'));const file=path.join(__dirname,'../public',media.src);assert.ok(fs.statSync(file).size>1000);const buf=fs.readFileSync(file);assert.equal(buf.toString('ascii',8,12),'WEBP');assert.equal(eventMediaLabel(media,'en'),'Official show image');}
 assert.ok(parseCarreProgramme(fixture.replaceAll('//img.mapado.net/','//untrusted.example/'),'2026-10-13').every(e=>!e.officialImage));
 assert.ok(programme.every(e=>e.officialImage.startsWith('https://img.mapado.net/')));
 const noImage=parseCarreProgramme(fixture.replace(/<img[^>]*>/g,''),'2026-10-13');assert.equal(noImage.length,31);assert.equal(mediaForEvent(noImage[0]).kind,'official');
 const changed={...programme[0],officialImage:'https://img.mapado.net/2026/10/new-show.jpg'};assert.equal(mediaForEvent(changed).src,changed.officialImage);
 assert.notEqual(mediaForEvent({...programme[0],officialImage:'https://untrusted.example/photo.jpg'}).kind,'official');
 const greg=programme.find(e=>e.id==='carre-733261');assert.equal(greg.start,'2026-10-30');assert.equal(greg.time,'20:30');assert.equal(greg.category,'music');
 const magic=programme.find(e=>e.id==='carre-733303');assert.deepEqual(magic.sessions.map(s=>s.start),['2026-11-12','2026-11-13']);assert.ok(programme.some(e=>e.start==='2027-05-21'));
 assert.deepEqual(parseCarreProgramme('<main>Maintenance</main>','2026-10-13'),[]);assert.deepEqual(parseCarreProgramme(fixture.replace(/20:30/g,'99:99'),'2026-10-13').filter(e=>e.id===greg.id),[]);
 const merged=mergeCarreProgramme(events,programme);assert.equal(merged.filter(e=>e.id==='boreale-carre').length,1);assert.equal(merged.filter(e=>e.id==='justina-lee-brown').length,1);assert.equal(merged.find(e=>e.id==='boreale-carre').time,'15:00');assert.equal(merged.find(e=>e.id==='justina-lee-brown').featured,true);
 const realFetch=global.fetch;let calls=0;global.fetch=async(url,options)=>{calls++;assert.equal(url,carreProgrammeUrl);assert.equal(options.next.revalidate,21600);assert.equal(options.redirect,'error');return new Response(fixture,{headers:{date:'Tue, 13 Oct 2026 20:00:00 GMT'}});};assert.deepEqual(await getCarreProgramme(),programme);assert.equal(calls,1);
 global.fetch=async()=>new Response('Unavailable',{status:503});assert.deepEqual(await getCarreProgramme(),carreProgrammeSnapshot);global.fetch=async()=>new Response('Changed page');assert.deepEqual(await getCarreProgramme(),carreProgrammeSnapshot);global.fetch=async()=>{throw new Error('Offline');};assert.deepEqual(await getCarreProgramme(),carreProgrammeSnapshot);global.fetch=realFetch;
 for(const event of additionalAgendaEvents){assert.equal(new URL(event.source).protocol,'https:');assert.ok(event.summaryFr&&event.summary&&event.sourceCheckedAt);}
 // Exercise the public catalog merge with a duplicate approved event.
 global.fetch=async()=>new Response(fixture);const load=Module._load;Module._load=function(request,parent,...args){if(parent?.filename.endsWith('/publicEvents.ts')&&request==='./editorialDb')return {getApprovedEvents:async()=>[greg]};return load.call(this,request,parent,...args);};const {getPublicEvents}=require('../lib/publicEvents.ts');Module._load=load;const catalog=await getPublicEvents();global.fetch=realFetch;assert.equal(catalog.filter(e=>e.id===greg.id).length,1);for(const event of additionalAgendaEvents)assert.ok(catalog.some(e=>e.id===event.id));
 console.log('Agenda feeds: 31 official Carré performances, recurring sessions, canonical IDs, editorial preservation, six-hour cached fetch, offline/invalid fallback and public catalog deduplication passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
