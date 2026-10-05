const fs=require('fs'),path=require('path'),ts=require('typescript'),assert=require('node:assert/strict');
const cache=new Map();function load(file){file=path.resolve(__dirname,'..',file);if(!path.extname(file))file+='.ts';if(cache.has(file))return cache.get(file);const m={exports:{}};cache.set(file,m.exports);new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText)(id=>id.startsWith('.')?load(path.resolve(path.dirname(file),id)):require(id),m,m.exports);cache.set(file,m.exports);return m.exports;}
const c=load('lib/agendaCalendar.ts'),local=load('lib/localCalendar.ts'),v=load('data/agendaVerified.ts');
let checks=0;function equal(a,b){assert.deepEqual(a,b);checks++;}
for(const day of ['2026-10-05','2026-10-09','2026-10-10','2026-10-11'])equal(c.dateWindow('weekend',day),{from:'2026-10-10',to:'2026-10-11'});
equal(c.dateWindow('weekend','2026-10-23'),{from:'2026-10-24',to:'2026-10-25'});
equal(c.dateWindow('7days','2026-12-29'),{from:'2026-12-29',to:'2027-01-04'});
equal(c.monthWindow('2028-02'),{from:'2028-02-01',to:'2028-02-29'});equal(c.monthWindow('2027-02'),{from:'2027-02-01',to:'2027-02-28'});equal(c.monthWindow('2026-13'),undefined);equal(c.isIsoDay('2026-02-29'),false);
equal(local.parisIsoDay(new Date('2026-10-24T22:30:00Z')),'2026-10-25');equal(local.parisIsoDay(new Date('2026-10-25T23:30:00Z')),'2026-10-26');
const recurring={id:'repeat',start:'2026-10-01',end:'2027-03-01',sessions:[{start:'2026-10-10'},{start:'2026-11-07'}]};
equal(c.eventOverlaps(recurring,'2026-10-11','2026-10-11'),false);equal(c.eventOverlaps(recurring,'2026-11-07','2026-11-07'),true);equal(c.catalogMonths([recurring]),['2026-10','2026-11']);equal(c.agendaPaths([recurring],'2026-10-11'),['/whats-on/this-weekend','/whats-on/2026-10','/whats-on/2026-11']);
const continuous={id:'long',start:'2026-12-31',end:'2027-01-02'};equal(c.eventOverlaps(continuous,'2027-01-01','2027-01-01'),true);
equal(c.eventOverlaps({id:'bad',start:'2026-02-30'},'2026-02-01','2026-03-01'),false);
const all=Object.values(v).flatMap(x=>Array.isArray(x)?x:Object.values(x));
const board=all.find(e=>e.id==='jeux-guilde-ramatuelle');assert.ok(board);equal(c.sessionsInWindow(board,c.monthWindow('2026-11')).map(s=>s.start),['2026-11-07','2026-11-21']);
const walk={id:'gassin-guided-history',...v.verifiedEventUpdates['gassin-guided-history']};equal(c.eventOverlaps(walk,'2026-10-06','2026-10-06'),false);equal(c.eventOverlaps(walk,'2026-10-26','2026-10-26'),true);
const jump={id:'gassin-jumping-october',...v.verifiedEventUpdates['gassin-jumping-october']};equal(c.eventOverlaps(jump,'2026-10-20','2026-10-20'),false);equal(c.eventOverlaps(jump,'2026-10-22','2026-10-22'),true);
console.log(JSON.stringify({result:'PASS',calendar_checks:checks}));
