/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript'),Module=require('node:module');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,k)=>k==='__esModule'?false:String(k)});};
const fixture=n=>fs.readFileSync(path.join(__dirname,'fixtures/cinema',n),'utf8');
const {parsePagnol,parseRaimu,parseMiramar}=require('../lib/cinemaParser.ts');
const {freshCinemaEvents,getCinemaFeed}=require('../lib/cinemaFeeds.ts');
const {cinemaSnapshot}=require('../data/cinemaSnapshot.ts');
const {mediaForEvent}=require('../lib/eventMedia.ts');
const {eventsInWindow,sessionAnchor}=require('../lib/agendaCalendar.ts');
assert.notEqual(sessionAnchor({start:'2026-10-19',time:'16:00',version:'VF'}),sessionAnchor({start:'2026-10-19',time:'16:00',version:'VO'}));
const {qualityAgendaEvents}=require('../lib/agendaQuality.ts');
const pagnol=fixture('pagnol.html'),raimu=fixture('raimu.html'),day='2026-10-19';
const a=parsePagnol(pagnol,day),b=parseRaimu(raimu,day);
assert.equal(a.length,2);assert.equal(b.length,2);
assert.equal(a[0].title,'LES MISÉRABLES');assert.equal(a[0].filmDurationMinutes,176);
assert.deepEqual(a[0].sessions,[{start:day,time:'14:00',version:'VF'},{start:day,time:'20:15',version:'VF'},{start:'2026-10-20',time:'14:00',version:'VF'},{start:'2026-10-20',time:'20:15',version:'VF'}]);
assert.equal(b[0].title,'Le Corset');assert.equal(b[0].sessions[0].start,day);assert.equal(b[0].sessions[0].time,'16:00');assert.equal(b[0].filmDurationMinutes,90);
assert.throws(()=>parseRaimu(raimu,'2026-11-19'),/mismatch/);assert.throws(()=>parsePagnol('<h1>Maintenance</h1>',day));
// A programme starting earlier this week must keep future sessions without shifting dates.
const followingDay=parseRaimu(raimu,'2026-10-20');
assert.ok(followingDay.length>0);assert.ok(followingDay.every(e=>e.sessions.every(s=>s.start>='2026-10-20')));
assert.ok(followingDay[0].sessions.some(s=>s.start==='2026-10-25'));
assert.throws(()=>parseRaimu(raimu,'2026-10-26'),/mismatch/,'stale first column beyond six days');
assert.throws(()=>parseRaimu(raimu.replaceAll('Mar.','Ven.'),day),/mismatch/,'weekday contradictions reject the whole timetable');
// Reuse the timetable's weekday/day pattern across a year boundary.
const rollover=raimu.replace(/(class="nom_jour">[^<]+<\/span> )(\d+)(<\/a>)/g,(_,a,n,b)=>a+String((Number(n)+9-1)%31+1)+b);
const crossed=parseRaimu(rollover,'2027-01-01');
assert.ok(crossed.some(e=>e.sessions.some(s=>s.start==='2027-01-03')));
assert.ok(parsePagnol(pagnol.replaceAll('14h00','99h99'),day)[0].sessions.every(s=>s.time!=='99:99'));
const films=JSON.parse(fixture('miramar-media.json')),shows=JSON.parse(fixture('miramar-shows.json')),options=JSON.parse(fixture('miramar-mediaoptions.json'));
const c=parseMiramar(films,shows,options,day);assert.equal(c.length,2);assert.ok(c.some(e=>e.sessions.some(s=>s.start===day&&s.time==='14:30')));
const show=shows.find(s=>s.showtime.startsWith(day));
for(const flag of ['deleted','canceled','draft','school'])assert.equal(parseMiramar(films,[{...show,[flag]:true}],options,day).length,0);
assert.equal(parseMiramar(films,[{...show,cinemaid:'another-cinema'}],options,day).length,0);
assert.equal(parseMiramar(films,[{...show,showtime:'not-a-date'}],options,day).length,0);
const subtitled=parseMiramar(films,[{...show,languagemediaoptionsid:18}],options,day);assert.equal(subtitled[0].sessions[0].version,'VOSTFR');
const dst=parseMiramar(films,[{...show,showtime:'2026-10-25T14:30:00.000+0100'}],options,day);assert.equal(dst[0].sessions[0].time,'14:30');
for(const e of [...a,...b,...c]){assert.equal(e.category,'cinema');assert.equal(mediaForEvent(e).kind,'official');assert.ok(e.sessions.every(s=>s.start>=day));}
assert.notEqual(mediaForEvent({...a[0],officialImage:'https://untrusted.example/poster.jpg'}).kind,'official');
assert.equal(qualityAgendaEvents([...a,...a]).length,a.length);
assert.equal(eventsInWindow(a,{from:'2026-10-21',to:'2026-10-27'}).length,0);
assert.ok(eventsInWindow(b,{from:'2026-10-24',to:'2026-10-25'}).length>0);
assert.equal(freshCinemaEvents(a,'2026-10-22',true).length,0);
assert.ok(freshCinemaEvents(a,'2026-10-20',true).every(e=>e.sessions.every(s=>s.start>='2026-10-20')));
assert.equal(new Set(cinemaSnapshot.map(e=>e.id)).size,cinemaSnapshot.length);
// Exercise the actual filter handlers in both languages and retain the existing dark cards.
let values=[],index=0;const load=Module._load;Module._load=function(request,parent,...rest){if(parent?.filename.endsWith('/AgendaClient.tsx')&&request==='react')return {...load.call(this,request,parent,...rest),useState:initial=>{const i=index++;if(!(i in values))values[i]=initial;return [values[i],value=>{values[i]=value;}];},useEffect:()=>{},useMemo:f=>f()};return load.call(this,request,parent,...rest);};
const Agenda=require('../app/[locale]/whats-on/AgendaClient.tsx').default;Module._load=load;
const nodes=n=>!n||typeof n!=='object'?[]:Array.isArray(n)?n.flatMap(nodes):[n,...nodes(n.props?.children)];
const content=n=>typeof n==='string'||typeof n==='number'?String(n):Array.isArray(n)?n.map(content).join(''):n?.props?content(n.props.children):'';
function render(locale){index=0;return Agenda({locale,events:[...a,...b,...c],initialDay:day});}
for(const locale of ['fr','en']){values=[];let tree=render(locale);const button=nodes(tree).find(n=>n.type==='button'&&content(n)===(locale==='fr'?'Cinéma':'Cinema'));assert.ok(button);button.props.onClick();tree=render(locale);assert.ok(nodes(tree).some(n=>n.type==='section'&&n.props['aria-label']===(locale==='fr'?'Les cinémas du Golfe':'Cinemas around the Golfe')));assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href==='https://www.saint-tropez.fr/culture/cinemas/'));assert.ok(content(tree).includes('VF'));assert.ok(content(tree).includes('176 min'));const select=nodes(tree).find(n=>n.props?.id==='agenda-location');select.props.onChange({target:{value:'Cogolin'}});tree=render(locale);const cards=nodes(tree).filter(n=>n.type==='article');assert.equal(cards.length,2);assert.ok(cards.every(n=>content(n).includes('Cogolin')));}
for(const locale of ['fr','en']){values=[];index=0;const tree=Agenda({locale,events:[],initialDay:day,initialCategory:'cinema'});assert.ok(nodes(tree).some(n=>n.type==='section'&&n.props['aria-label']===(locale==='fr'?'Les cinémas du Golfe':'Cinemas around the Golfe')),'direct cinema link opens programmes even without imported screenings');}
(async()=>{
 const realFetch=global.fetch,RealDate=Date;global.Date=class extends RealDate{constructor(...args){super(...(args.length?args:['2026-10-19T10:00:00Z']));}static now(){return new RealDate('2026-10-19T10:00:00Z').getTime();}};
 try{
 let calls=[];global.fetch=async(url,opts)=>{calls.push(String(url));assert.equal(opts.next.revalidate,1800);assert.equal(opts.redirect,'error');return new Response(String(url).includes('cineode')?raimu:pagnol,{headers:{date:'Mon, 19 Oct 2026 10:00:00 GMT'}});};
 assert.equal((await getCinemaFeed('raimu')).length,2);assert.ok((await getCinemaFeed('pagnol')).length>=2);
 global.fetch=async()=>{throw new Error('Offline');};assert.deepEqual(await getCinemaFeed('raimu'),freshCinemaEvents(cinemaSnapshot.filter(e=>e.id.startsWith('cinema-raimu-')),day,true));
 global.fetch=async()=>new Response('Unavailable',{status:503});assert.deepEqual(await getCinemaFeed('raimu'),freshCinemaEvents(cinemaSnapshot.filter(e=>e.id.startsWith('cinema-raimu-')),day,true));
 global.fetch=async()=>new Response('Changed timetable');assert.deepEqual(await getCinemaFeed('pagnol'),freshCinemaEvents(cinemaSnapshot.filter(e=>e.id.startsWith('cinema-pagnol-')),day,true));
 global.fetch=async url=>{const u=String(url);if(u==='https://cinema-cavalaire.fr/')return new Response('<meta name="api_token" content="00000000-0000-0000-0000-000000000000">');const route=new URL(u).pathname.split('/').pop();return new Response(fixture('miramar-'+route+'.json'),{headers:{date:'Mon, 19 Oct 2026 10:00:00 GMT'}});};assert.deepEqual(await getCinemaFeed('miramar'),c);
 global.Date=class extends RealDate{constructor(...args){super(...(args.length?args:['2026-10-23T10:00:00Z']));}static now(){return new RealDate('2026-10-23T10:00:00Z').getTime();}};
 global.fetch=async()=>{throw new Error('Offline');};
 assert.ok((await getCinemaFeed('raimu')).length>0,'recent checked snapshot survives an offline source');
 assert.ok((await getCinemaFeed('pagnol')).length>0);
 assert.equal(freshCinemaEvents(cinemaSnapshot,'2026-10-26',true).length,0,'checked fallback expires after two days');
 }finally{global.fetch=realFetch;global.Date=RealDate;}
 console.log('Cinema: three official formats, dated/VF/VO sessions, DST, cancellations, secure posters, freshness, failed imports, FR/EN and town/category filters passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
