/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
const {agendaRange,nextAgendaDay,agendaAlternatives}=require('../lib/agendaDiscovery.ts');
const {parseSavedEvents,savedEventKey,savedEvent}=require('../lib/savedEvents.ts');
const {guides}=require('../data/guides.ts');
const {dateWindow}=require('../lib/agendaCalendar.ts');
assert.equal(agendaRange('weekend'),'weekend');assert.equal(agendaRange(['today']),'7days');assert.equal(agendaRange('invalid'),'7days');
const event={id:'test-session',title:'Test',titleFr:'Essai',location:'Cogolin',category:'culture',start:'2026-10-01',sessions:[{start:'2026-10-01'},{start:'2026-11-02',time:'18:00'},{start:'2026-11-09',time:'18:00'}]};
assert.equal(nextAgendaDay([event],dateWindow('today','2026-10-26')),'2026-11-02');
assert.equal(nextAgendaDay([event],dateWindow('7days','2026-11-03')),undefined);
assert.equal(nextAgendaDay([],dateWindow('today','2026-10-26')),undefined);
const ongoing={...event,id:'exhibition',sessions:[{start:'2026-10-20',end:'2026-11-10'}]};
assert.equal(nextAgendaDay([ongoing,event],dateWindow('today','2026-10-26')),'2026-10-27','ongoing exhibitions use the next available day rather than their past opening date');
for(const idea of agendaAlternatives)assert.ok(guides.some(g=>g.slug===idea.slug),idea.slug);
const a=savedEvent(event,event.sessions[1]),b=savedEvent(event,event.sessions[2]);
assert.notEqual(savedEventKey(a),savedEventKey(b));
assert.equal(parseSavedEvents(JSON.stringify([a,a,b])).length,2);
assert.deepEqual(parseSavedEvents('broken'),[]);
assert.deepEqual(parseSavedEvents(JSON.stringify([{...a,id:'../../account'},{...a,session:{start:'2026-02-30'}},{...a,session:{start:'2026-11-02',time:'27:00'}}])),[]);
assert.equal(parseSavedEvents(JSON.stringify([{...a,session:{start:'2026-11-02',version:{}}}])).length,0);
// Exercise save/remove/error handlers without a real browser or user account.
const Module=require('node:module'),React=require('react'),original=Module._load;
let state=[],index=0,effects=[],failed=false;
const store=new Map();global.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>{if(failed)throw Error('quota');store.set(k,v);}};
global.window={addEventListener(){},removeEventListener(){},dispatchEvent(){}};
Module._load=function(name,parent,...rest){if(parent?.filename.endsWith('/EventStayActions.tsx')&&name==='react')return {...React,useState:value=>{const at=index++;if(!(at in state))state[at]=value;return [state[at],v=>{state[at]=v;}];},useEffect:fn=>effects.push(fn)};return original.call(this,name,parent,...rest);};
const Actions=require('../components/EventStayActions.tsx').default;
const render=()=>{index=0;effects=[];return Actions({locale:'fr',event:a});};
function nodes(node,type){if(!node||typeof node!=='object')return [];return [...(node.type===type?[node]:[]),...React.Children.toArray(node.props?.children).flatMap(n=>nodes(n,type))];}
render();for(const run of effects){const cleanup=run();if(cleanup)cleanup();}
let tree=render();nodes(tree,'button')[0].props.onClick();tree=render();assert.equal(nodes(tree,'button')[0].props['aria-pressed'],true);
nodes(tree,'button')[0].props.onClick();tree=render();assert.equal(nodes(tree,'button')[0].props['aria-pressed'],false);
failed=true;nodes(tree,'button')[0].props.onClick();tree=render();assert.equal(nodes(tree,'button')[0].props['aria-pressed'],false);assert.ok(nodes(tree,'p').some(p=>p.props.role==='alert'));
Module._load=original;
console.log('Agenda discovery: date query validation, next published sessions, valid fallback guides, separate saved sessions, deduplication, invalid storage, save/remove and failed-storage feedback passed.');
