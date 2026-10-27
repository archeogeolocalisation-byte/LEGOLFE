/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript'),React=require('react');
function isolated(relative,mocks){const file=path.resolve(__dirname,'..',relative),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));const load=Module._load;Module._load=function(request,parent,...rest){if(parent?.filename===file&&request in mocks)return mocks[request];return load.call(this,request,parent,...rest);};try{m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);}finally{Module._load=load;}return m.exports;}
function harness(){
 let values=[],refs=[],cursor=0,refCursor=0,effect,callback,unsubscribed=false,requests=[];
 const hooks={...React,useState(initial){const i=cursor++;if(!(i in values))values[i]=initial;return[values[i],next=>{values[i]=typeof next==='function'?next(values[i]):next;}];},useRef(initial){const i=refCursor++;if(!(i in refs))refs[i]={current:initial};return refs[i];},useEffect(fn){if(!effect)effect=fn;}};
 const Component=isolated('components/VillaHeart.tsx',{react:hooks,'next/link':{__esModule:true,default:'a'},'../lib/villaPaths':{villaHref:(id,locale)=>`${locale==='en'?'/en':''}/villa/${id}`},'../lib/supabase':{supabase:{auth:{onAuthStateChange(fn){callback=fn;return{data:{subscription:{unsubscribe(){unsubscribed=true;}}}};}}}},'../lib/villaHearts':{villaHeartRequest(id,liked){return new Promise((resolve,reject)=>requests.push({id,liked,resolve,reject}));}}}).default;
 return {requests,render(locale='fr'){cursor=0;refCursor=0;return Component({id:'property-test',locale});},mount(){return effect();},signOut(){callback('SIGNED_OUT',null);},get unsubscribed(){return unsubscribed;}};
}
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
const text=e=>typeof e==='string'||typeof e==='number'?String(e):Array.isArray(e)?e.map(text).join(''):e?.props?text(e.props.children):'';
const find=(h,type)=>nodes(h.render()).find(n=>n.type===type);
const flush=async()=>{await Promise.resolve();await Promise.resolve();};
const ready={count:0,liked:false,signedIn:true,canVote:true};
(async()=>{
 const h=harness();assert.match(text(h.render()),/Chargement/);const cleanup=h.mount();h.requests[0].resolve(ready);await flush();
 assert.match(text(h.render()),/pas un avis/);assert.equal(find(h,'button').props['aria-pressed'],false);
 find(h,'button').props.onClick();find(h,'button').props.onClick();assert.equal(h.requests.length,2,'Double clicks make one write');assert.equal(h.requests[1].liked,true);assert.equal(find(h,'button').props.disabled,true);
 h.requests[1].resolve({...ready,count:1,liked:true});await flush();assert.equal(find(h,'button').props['aria-pressed'],true);assert.match(text(h.render()),/1 coup de cœur/);
 find(h,'button').props.onClick();assert.equal(h.requests[2].liked,false);h.requests[2].reject(new Error('network'));await flush();assert.equal(find(h,'button').props['aria-pressed'],true,'Failed removal preserves confirmed state');assert.match(text(h.render()),/n’a pas pu être confirmé/);
 find(h,'button').props.onClick();h.signOut();h.requests[3].resolve({...ready,count:0});await flush();assert.equal(find(h,'button'),undefined,'Late mutation cannot restore a signed-out UI');
 await new Promise(resolve=>setTimeout(resolve,0));h.requests[4].resolve({count:1,liked:false,signedIn:false,canVote:false});await flush();assert.match(text(h.render()),/Se connecter pour voter/);assert.equal(find(h,'a').props.href,'/fr/account?next=%2Fvilla%2Fproperty-test');assert.equal(find(h,'button'),undefined);assert.match(text(h.render('en')),/Sign in to give a heart/);cleanup();assert.equal(h.unsubscribed,true);
 for(const failure of ['HEART_NOT_ENABLED','HEART_UNAVAILABLE']){const f=harness();f.render();f.mount();f.requests[0].reject(new Error(failure));await flush();if(failure==='HEART_NOT_ENABLED')assert.equal(f.render(),null);else{assert.match(text(f.render()),/momentanément indisponibles/);assert.equal(find(f,'button'),undefined);}}
 const owner=harness();owner.render();owner.mount();owner.requests[0].resolve({...ready,canVote:false});await flush();assert.equal(find(owner,'button'),undefined);assert.match(text(owner.render()),/autres membres/);
 let calls=[];const lib=isolated('lib/villaHearts.ts',{'./supabase':{supabase:{rpc(name,args){calls.push([name,args]);return{abortSignal:async()=>({data:ready,error:null})};}}}});
 assert.deepEqual(lib.parseVillaHeart(ready),ready);for(const bad of [null,{...ready,count:-1},{...ready,count:1.5},{...ready,signedIn:false},{...ready,liked:'true'}])assert.throws(()=>lib.parseVillaHeart(bad));
 await lib.villaHeartRequest('property-test');await lib.villaHeartRequest('property-test',false);assert.equal(calls[0][0],'villa_heart_summary');assert.deepEqual(calls[1],['set_villa_heart',{p_listing_id:'property-test',p_liked:false}]);
 console.log('PASS: heart UI — auth, FR/EN, real counts, deliberate idempotent writes, double-click lock, remove/failure, sign-out race, missing setup, unavailable service, owner exclusion and RPC parsing.');
})().catch(e=>{console.error(e);process.exitCode=1;});
