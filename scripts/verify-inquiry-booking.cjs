const fs=require('fs'),path=require('path'),ts=require('typescript'),React=require('react'),assert=require('node:assert/strict');
let checks=0;function check(value,message){assert.ok(value,message);checks++;}
let authListener,current=null,calls=[],failure='',pending=null;
const service={auth:{getUser:async()=>({data:{user:{id:'owner-test'}},error:null}),onAuthStateChange(fn){authListener=fn;return {data:{subscription:{unsubscribe(){}}}};}},from(){return {select(){return this;},eq(){return this;},abortSignal(){return this;},maybeSingle:async()=>({data:current,error:null})};},rpc(name,args){calls.push(args);return {abortSignal(){return this;},then(resolve,reject){return (pending||Promise.resolve(failure?{data:null,error:{message:failure}}:{data:{inquiry_id:'i1',listing_id:'v1',arrival:'2027-07-01',departure:'2027-07-08',status:args.p_action==='quote'?'quote':args.p_action==='confirm'?'confirmed':'cancelled',total_price:args.p_action==='quote'?args.p_total_price:current.total_price,conditions:args.p_action==='quote'?args.p_conditions:current.conditions,updated_at:new Date().toISOString()},error:null})).then(result=>{if(result.data)current=result.data;return result;}).then(resolve,reject);}};}};
function harness(file){const cache=new Map(),scopes=new Map();let active;
const hooks={...React,useState(initial){const s=active,i=s.stateIndex++;if(!(i in s.states))s.states[i]=typeof initial==='function'?initial():initial;return [s.states[i],v=>{s.states[i]=typeof v==='function'?v(s.states[i]):v;}];},useRef(initial){const s=active,i=s.refIndex++;if(!s.refs[i])s.refs[i]={current:initial};return s.refs[i];},useEffect(fn,deps){const s=active,i=s.effectIndex++;const key=JSON.stringify(deps);if(s.effects[i]?.key===key)return;const entry={key,fn};s.effects[i]=entry;s.pending.push(entry);},useMemo(fn){return fn();}};
function load(file){file=path.resolve(__dirname,'..',file);if(!path.extname(file))file+=fs.existsSync(file+'.tsx')?'.tsx':'.ts';if(cache.has(file))return cache.get(file);const m={exports:{}};cache.set(file,m.exports);new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText)(id=>id==='react'?hooks:id.endsWith('/lib/supabase')||id==='./supabase'?{supabase:service}:id.startsWith('.')?load(path.resolve(path.dirname(file),id)):require(id),m,m.exports);cache.set(file,m.exports);return m.exports;}
const Component=load(file).default;
function render(props,fn=Component,key='root'){const scope=scopes.get(key)||{states:[],refs:[],effects:[]};scopes.set(key,scope);scope.stateIndex=0;scope.refIndex=0;scope.effectIndex=0;scope.pending=[];active=scope;const tree=fn(props);for(const effect of scope.pending)effect.fn();return tree;}
return {render,load};}
function nodes(tree,predicate){const found=[];function walk(v){if(Array.isArray(v))return v.forEach(walk);if(v&&typeof v==='object'&&v.props){if(predicate(v))found.push(v);walk(v.props.children);}}walk(tree);return found;}
function text(tree){if(Array.isArray(tree))return tree.map(text).join('');if(typeof tree==='string'||typeof tree==='number')return String(tree);return tree?.props?text(tree.props.children):'';}
function button(tree,label){return nodes(tree,n=>n.type==='button'&&text(n).includes(label))[0];}
const tick=()=>new Promise(resolve=>setTimeout(resolve,0));
(async()=>{
 const h=harness('components/InquiryBooking.tsx'),props={fr:true,row:{id:'i1',listing_id:'v1',propertyName:'Maison test',guest_name:'Voyageur',guest_email:'guest@example.test',arrival:'2027-07-01',departure:'2027-07-08',guests:2}};
 let tree=h.render(props);await tick();tree=h.render(props);
 check(nodes(tree,n=>n.type==='input'&&n.props.type==='number')[0].props.value==='');
 check(button(tree,'Enregistrer la proposition').props.disabled);
 nodes(tree,n=>n.type==='input'&&n.props.type==='number')[0].props.onChange({target:{value:'2400'}});
 nodes(tree,n=>n.type==='textarea')[0].props.onChange({target:{value:'Ménage compris, conditions à convenir.'}});
 tree=h.render(props);check(!button(tree,'Enregistrer la proposition').props.disabled);
 failure='DATES_UNAVAILABLE';button(tree,'Enregistrer la proposition').props.onClick();await tick();tree=h.render(props);
 check(text(tree).includes('ne sont plus libres'));check(nodes(tree,n=>n.type==='textarea')[0].props.value.includes('Ménage'));check(!text(tree).includes('Proposition enregistrée.'));
 failure='';button(tree,'Enregistrer la proposition').props.onClick();await tick();tree=h.render(props);
 check(text(tree).includes('Proposition enregistrée.'));check(button(tree,'Confirmer le séjour').props.disabled);
 nodes(tree,n=>n.type==='input'&&n.props.type==='checkbox')[0].props.onChange({target:{checked:true}});tree=h.render(props);
 check(!button(tree,'Confirmer le séjour').props.disabled);
 nodes(tree,n=>n.type==='input'&&n.props.type==='number')[0].props.onChange({target:{value:'2500'}});tree=h.render(props);
 check(button(tree,'Confirmer le séjour').props.disabled);check(nodes(tree,n=>n.type==='a')[0].props['aria-disabled']);
 button(tree,'Enregistrer la proposition').props.onClick();await tick();tree=h.render(props);
 check(button(tree,'Confirmer le séjour').props.disabled);
 nodes(tree,n=>n.type==='input'&&n.props.type==='checkbox')[0].props.onChange({target:{checked:true}});tree=h.render(props);
 button(tree,'Confirmer le séjour').props.onClick();await tick();tree=h.render(props);
 check(text(tree).includes('SÉJOUR CONFIRMÉ'));check(nodes(tree,n=>n.type==='fieldset')[0].props.disabled);check(button(tree,'Annuler le séjour').props.disabled);
 nodes(tree,n=>n.type==='input'&&n.props.type==='checkbox')[0].props.onChange({target:{checked:true}});tree=h.render(props);
 button(tree,'Annuler le séjour').props.onClick();await tick();tree=h.render(props);
 check(text(tree).includes('SÉJOUR ANNULÉ'));check(!button(tree,'Enregistrer la proposition').props.disabled);
 button(tree,'Enregistrer la proposition').props.onClick();await tick();tree=h.render(props);check(text(tree).includes('PROPOSITION DE SÉJOUR'));
 let resolve;pending=new Promise(r=>resolve=r);nodes(tree,n=>n.type==='input'&&n.props.type==='number')[0].props.onChange({target:{value:'2600'}});tree=h.render(props);button(tree,'Enregistrer la proposition').props.onClick();await tick();
 authListener('SIGNED_OUT',null);tree=h.render(props);check(nodes(tree,n=>n.type==='textarea').length===0);
 resolve({data:current,error:null});await tick();tree=h.render(props);check(!text(tree).includes('Proposition enregistrée.'));check(nodes(tree,n=>n.type==='textarea').length===0);
 console.log(JSON.stringify({result:'PASS',checks,includes:'saved terms before confirmation, explicit agreement, error retention, cancellation, re-proposal, logout during pending save'}));
})().catch(e=>{console.error(e);process.exitCode=1;});
