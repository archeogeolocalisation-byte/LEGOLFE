const fs=require('fs'),path=require('path'),ts=require('typescript'),assert=require('node:assert/strict'),React=require('react');
let checks=0;function equal(a,b){assert.deepEqual(a,b);checks++;}
function harness(file,service){let states=[],refs=[],stateIndex=0,refIndex=0;const cache=new Map();const hooks={...React,useState(initial){const i=stateIndex++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return [states[i],v=>{states[i]=typeof v==='function'?v(states[i]):v;}];},useRef(initial){const i=refIndex++;if(!refs[i])refs[i]={current:initial};return refs[i];},useEffect(){}};
 function load(file){file=path.resolve(__dirname,'..',file);if(!path.extname(file))file+=fs.existsSync(file+'.tsx')?'.tsx':'.ts';if(cache.has(file))return cache.get(file);const m={exports:{}};cache.set(file,m.exports);new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText)(id=>id==='react'?hooks:(id.endsWith('/lib/supabase')||id==='./supabase')?{supabase:service}:id.startsWith('.')?load(path.resolve(path.dirname(file),id)):require(id),m,m.exports);cache.set(file,m.exports);return m.exports;}
 const Component=load(file).default;return {render(props){stateIndex=0;refIndex=0;return Component(props);}};
}
function nodes(tree,predicate){const found=[];function walk(value){if(Array.isArray(value))return value.forEach(walk);if(value&&typeof value==='object'&&value.props){if(predicate(value))found.push(value);walk(value.props.children);}}walk(tree);return found;}
function text(tree){if(Array.isArray(tree))return tree.map(text).join('');if(typeof tree==='string'||typeof tree==='number')return String(tree);return tree?.props?text(tree.props.children):'';}
function button(tree,label){return nodes(tree,n=>n.type==='button'&&text(n).includes(label))[0];}

const previousFetch=global.fetch;
(async()=>{
let rows=[],fail=false,calendarBlocks=[];const service={from(table){if(table==='villa_calendars')return {select(){return {in(){return {abortSignal:async()=>({data:calendarBlocks.length?[{listing_id:'property-test',enabled:true,blocks:calendarBlocks,updated_at:'2026-10-05T00:00:00Z'}]:[],error:null})};}};}};return {insert(row){rows.push({table,row});return {abortSignal:async()=>({error:fail?{message:'failure'}:null})};}}}};
// Contact submissions use the server endpoint; never make a network request in this harness.
global.fetch=async(url,options)=>{equal(url,'/api/inquiries');rows.push({url,row:JSON.parse(options.body)});return {ok:!fail,json:async()=>({error:'TEST_FAILURE'})};};
const props={villa:{id:'property-test',name:'Villa test',location:'Gassin',price:0,guests:1,image:'',live:true},today:'2026-10-04',initialDates:{arrival:'2026-11-01',departure:'2026-11-08',guests:'1'}};
const h=harness('app/villa/[id]/contact/ContactForm.tsx',service);let tree=h.render(props);
for(const [field,value] of [['name','Guest test'],['email','guest@example.test'],['message','Un séjour de test.']]){nodes(tree,n=>n.props.name===field)[0].props.onChange({target:{value}});tree=h.render(props);}
nodes(tree,n=>n.type==='form')[0].props.onSubmit({preventDefault(){}});tree=h.render(props);assert.ok(button(tree,'Envoyer ma demande'));checks++;
fail=true;button(tree,'Envoyer ma demande').props.onClick();await new Promise(r=>setTimeout(r,0));tree=h.render(props);assert.ok(text(tree).includes('n’a pas pu être confirmé'));assert.ok(button(tree,'Envoyer ma demande'));checks+=2;
fail=false;button(tree,'Envoyer ma demande').props.onClick();await new Promise(r=>setTimeout(r,0));tree=h.render(props);assert.ok(text(tree).includes('DEMANDE ENVOYÉE'));equal(rows[1].url,'/api/inquiries');equal(rows[1].row.villaId,'property-test');equal(rows[1].row.guests,1);equal(rows[1].row.arrival,'2026-11-01');assert.ok(!('villa_id' in rows[1].row));checks++;
calendarBlocks=[{start:'2026-11-01',end:'2026-11-08'}];const blocked=harness('app/villa/[id]/contact/ContactForm.tsx',service);tree=blocked.render(props);for(const [field,value] of [['name','Guest test'],['email','guest@example.test'],['message','Test']]){nodes(tree,n=>n.props.name===field)[0].props.onChange({target:{value}});tree=blocked.render(props);}nodes(tree,n=>n.type==='form')[0].props.onSubmit({preventDefault(){}});tree=blocked.render(props);const before=rows.length;button(tree,'Envoyer ma demande').props.onClick();await new Promise(r=>setTimeout(r,0));tree=blocked.render(props);equal(rows.length,before);assert.ok(text(tree).includes('viennent d’être bloquées'));checks++;
// The sidebar no longer starts an enquiry; the separate contact route remains covered above.
const panel=harness('components/VillaStayPanel.tsx',service);
tree=panel.render({villa:props.villa,askHref:'/fr/ask'});
equal(nodes(tree,n=>n.type==='form').length,0);
equal(nodes(tree,n=>n.type==='input').length,0);

console.log(JSON.stringify({result:'PASS',checks,includes:'public listing enquiry, capacity-one dates, retained review on failure, confirmed success only'}));
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{global.fetch=previousFetch;});
