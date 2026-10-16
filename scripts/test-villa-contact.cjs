/* eslint-disable @typescript-eslint/no-require-imports */
// Isolated Auth/RPC tests: no contact is sent to or read from a live service.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript'),React=require('react');
let values=[],cursor=0,effects=[],refs=[],refCursor=0,listener,authResolve,rpcResolve,calls=[];
const auth={getUser:()=>new Promise(resolve=>{authResolve=resolve;}),onAuthStateChange:fn=>{listener=fn;return{data:{subscription:{unsubscribe(){}}}};}};
const supabase={auth,rpc:(name,args)=>{calls.push([name,args]);return{abortSignal:()=>new Promise(resolve=>{rpcResolve=resolve;})};}};
function isolated(relative,mocks){const file=path.resolve(__dirname,'..',relative),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));const load=Module._load;Module._load=function(request,parent,...rest){if(parent?.filename===file&&request in mocks)return mocks[request];return load.call(this,request,parent,...rest);};try{m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);}finally{Module._load=load;}return m.exports;}
const Contact=isolated('components/DirectOwnerContact.tsx',{'../lib/supabase':{supabase},'next/link':{__esModule:true,default:'a'},react:{...React,useState(initial){const i=cursor++;if(!(i in values))values[i]=initial;return[values[i],next=>{values[i]=typeof next==='function'?next(values[i]):next;}];},useRef(initial){const i=refCursor++;if(!(i in refs))refs[i]={current:initial};return refs[i];},useEffect(fn){effects.push(fn);}}}).default;
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
const text=e=>typeof e==='string'?e:Array.isArray(e)?e.map(text).join(''):e&&typeof e==='object'?text(e.props?.children):'';
const render=()=>{cursor=0;refCursor=0;return Contact({id:'property-real',locale:'fr'});};
const flush=async()=>{await Promise.resolve();await Promise.resolve();};
const owner='11111111-1111-4111-8111-111111111111';let rows=[],queried=0,memberRequests=[];
const db={from:()=>{const filters=[];const chain={select:()=>chain,eq:(k,v)=>{filters.push([k,v]);return chain;},abortSignal:()=>chain,maybeSingle:async()=>({data:rows.find(row=>filters.every(([k,v])=>row[k]===v))??null,error:null})};return chain;}};
const {getVillaAnnouncer}=isolated('lib/villaAnnouncer.ts',{'server-only':{},'@supabase/supabase-js':{createClient:()=>{queried++;return db;}},'./publicMembers':{memberIdPattern:/^[0-9a-f-]{36}$/,getPublicMembers:async ids=>{memberRequests.push(ids);return[{id:owner,name:'Public host',avatarUrl:null,email:'private@example.invalid'}];}}});
(async()=>{
 let tree=render();assert.equal(nodes(tree).filter(n=>n.type==='button').length,0);assert.ok(nodes(tree).some(n=>n.props?.href==='/fr/account?next=/villa/property-real'));assert.equal(calls.length,0);
 const cleanup=effects[0]();authResolve({data:{user:{id:'guest'}},error:null});await flush();
 tree=render();let button=nodes(tree).find(n=>n.type==='button');assert.ok(text(button).includes('Récupérer le contact'));button.props.onClick();assert.deepEqual(calls,[['villa_owner_contact',{p_listing_id:'property-real'}]]);
 rpcResolve({data:{email:'owner@example.invalid',phone:'+33 600000000'},error:null});await flush();tree=render();assert.ok(text(tree).includes('owner@example.invalid'));
 listener('SIGNED_OUT',null);assert.equal(text(render()).includes('owner@example.invalid'),false);
 listener('SIGNED_IN',{user:{id:'guest'}});nodes(render()).find(n=>n.type==='button').props.onClick();listener('SIGNED_OUT',null);rpcResolve({data:{email:'late@example.invalid',phone:''},error:null});await flush();assert.equal(text(render()).includes('late@example.invalid'),false,'Late responses cannot reveal contacts after sign-out');
 listener('SIGNED_IN',{user:{id:'guest'}});nodes(render()).find(n=>n.type==='button').props.onClick();rpcResolve({data:null,error:{message:'RATE_LIMITED'}});await flush();assert.ok(text(render()).includes('Limite de consultation'));
 nodes(render()).find(n=>n.type==='button').props.onClick();rpcResolve({data:null,error:null});await flush();assert.ok(text(render()).includes('n’a pas activé'));cleanup();
 assert.equal(await getVillaAnnouncer('villa-eden'),null);assert.equal(queried,0);
 rows=[{id:'property-real',owner_id:owner,status:'draft',visibility:'public',payload:{owner_id:'attacker'}}];assert.equal(await getVillaAnnouncer('property-real'),null);assert.equal(memberRequests.length,0);
 rows[0].status='published';rows[0].visibility='private';assert.equal(await getVillaAnnouncer('property-real'),null);
 rows[0].visibility='public';assert.deepEqual(await getVillaAnnouncer('property-real'),{id:owner,name:'Public host',avatarUrl:null});assert.deepEqual(memberRequests,[[owner]]);
 console.log('Villa contact: anonymous login link, deliberate reveal, sign-out/race clearing, rate limit, consent fallback and trusted public owner identity passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
