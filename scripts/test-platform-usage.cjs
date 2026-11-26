/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),Module=require('node:module'),ts=require('typescript');
const {classify}=require('./ci-scope.cjs');
assert.deepEqual(classify(['README.md','docs/deployment.md']),{runtime:false,stay:false,places:false,agenda:false});
assert.deepEqual(classify(['data/cinemaSnapshot.ts','data/localNews.ts']),{runtime:true,stay:false,places:false,agenda:true});
assert.deepEqual(classify(['data/placeFacts.ts']),{runtime:true,stay:false,places:true,agenda:false});
for(const path of ['lib/security.ts','package-lock.json','.github/workflows/security.yml','app/[locale]/page.tsx','unknown-file'])assert.deepEqual(classify([path]),{runtime:true,stay:true,places:true,agenda:true});
assert.equal(classify(['README.md','lib/security.ts']).stay,true);
const minimatch=require('minimatch'),rules=JSON.parse(fs.readFileSync('vercel.json')).git.deploymentEnabled;
const enabled=branch=>Object.entries(rules).some(([glob,value])=>value&&minimatch(branch,glob))||!Object.entries(rules).some(([glob,value])=>!value&&minimatch(branch,glob));
for(const branch of ['main','preview/home','preview/design/mobile'])assert.equal(enabled(branch),true,branch);
for(const branch of ['codex/content','fix/agenda','feature/new/home','dev'])assert.equal(enabled(branch),false,branch);
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_test';
let now=0,fail=false,moderator=true;const calls=[],batches=[],cacheOptions=[],entries=new Map();
const sourceRows={a:121,b:0,c:3};
const db={
 auth:{getUser:async()=>({data:{user:{id:'moderator'}}})},
 rpc:()=>({abortSignal:async()=>({data:true}),then(resolve){return Promise.resolve({data:moderator}).then(resolve);}}),
 from(table){
  const record={table,filters:{}};
  const query={select(columns){record.columns=columns;return this;},eq(key,value){record.filters[key]=value;return this;},order(){return this;},limit(limit){record.limit=limit;return this;},abortSignal(){return this;},maybeSingle(){record.single=true;return this;},
   upsert(rows,options){assert.ok(Array.isArray(rows));assert.equal(options.ignoreDuplicates,true);assert.equal(options.onConflict,'fingerprint');batches.push(rows);return this;},
   then(resolve,reject){
    calls.push(record);
    let data=[];
    if(table==='editorial_inbox'&&record.columns)data=[{id:'one',title:'A story',start_date:'2026-11-26',external_url:'https://example.org/news',source_label:'Official'}];
    if(table==='villa_listings')data=record.single?{id:'property-one',payload:{}}:[{id:'property-one',payload:{}}];
    return Promise.resolve({data,error:fail?new Error('Unavailable'):null}).then(resolve,reject);
   }};return query;
 }
};
const original=Module._load;
Module._load=function(request,parent,...rest){
 if(request==='server-only')return {};
 if(request==='@supabase/supabase-js')return {createClient:(url,key,options)=>{assert.equal(url,process.env.NEXT_PUBLIC_SUPABASE_URL);assert.equal(key,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);assert.equal(options.auth.persistSession,false);assert.equal(options.auth.autoRefreshToken,false);return db;}};
 if(request==='next/cache')return {unstable_cache(fn,keys,options){cacheOptions.push({keys,options});return async(...args)=>{const key=JSON.stringify([keys,args]),old=entries.get(key);if(old&&old.until>now)return old.value;const value=await fn(...args);entries.set(key,{value,until:now+options.revalidate});return value;};}};
 if(parent?.filename.endsWith('/publicVillas.ts')&&request==='./villaListing')return {parsePublicVilla:id=>({id,name:'Public villa'})};
 if(parent?.filename.endsWith('/publicVillas.ts')&&request==='./publicVillaCollections')return {withReviewedCollections:async(_,rows)=>rows};
 if(parent?.filename.endsWith('/editorial/refresh/route.ts')){
  if(request==='next/server')return {NextResponse:{json:Response.json}};
  if(request.endsWith('/security'))return {checkOrigin(){}};
  if(request.endsWith('/agendaSources'))return {editorialSources:Object.keys(sourceRows).map(key=>({key,label:key}))};
  if(request.endsWith('/editorialIngest'))return {fetchSourceCandidates:async source=>Array.from({length:sourceRows[source.key]},(_,i)=>({fingerprint:source.key+i}))};
 }
 return original.call(this,request,parent,...rest);
};
(async()=>{try{
 const {getApprovedEvents,getApprovedNews}=require('../lib/editorialDb.ts');
 const {getPublishedVillas,getPublicVilla}=require('../lib/publicVillas.ts');
 for(const read of [getApprovedEvents,getApprovedNews,getPublishedVillas]){const before=calls.length;assert.equal((await read()).length,1);await read();assert.equal(calls.length,before+1,'repeat public request reuses the shared cache');}
 assert.ok(cacheOptions.some(x=>x.options.revalidate===60));assert.equal(cacheOptions.filter(x=>x.options.revalidate===300).length,2);
 for(const call of calls.filter(x=>x.table==='editorial_inbox')){assert.equal(call.filters.status,'approved');assert.notEqual(call.columns,'*');assert.ok(!call.columns.includes('raw'));assert.equal(call.limit,1000);}
 for(const call of calls.filter(x=>x.table==='villa_listings')){assert.equal(call.filters.status,'published');assert.equal(call.filters.visibility,'public');}
 now=61;let before=calls.length;await getPublishedVillas();assert.equal(calls.length,before+1,'villa catalogue revalidates after one minute');
 before=calls.length;await getPublicVilla('property-one');await getPublicVilla('property-one');assert.equal(calls.length,before+2,'detail pages still check current visibility each time');
 now=301;fail=true;assert.deepEqual(await getApprovedNews(),[]);before=calls.length;fail=false;assert.equal((await getApprovedNews()).length,1);assert.equal(calls.length,before+1,'failed query does not poison the public cache');
 const {POST}=require('../app/api/editorial/refresh/route.ts');
 const req=()=>new Request('https://legolfe.com/api/editorial/refresh',{method:'POST',headers:{authorization:'Bearer moderator'}});
 const response=await POST(req());assert.equal(response.status,200);const result=await response.json();assert.equal(result.inserted,124);assert.deepEqual(batches.map(x=>x.length),[50,50,21,3]);
 moderator=false;before=batches.length;assert.equal((await POST(req())).status,403);assert.equal(batches.length,before,'non-moderator cannot write batches');
 console.log('Platform usage: safe CI scoping, opt-in previews, anonymous public caches, freshness, retry after errors, direct visibility checks and bounded moderator-only batches passed.');
 }finally{Module._load=original;}
})().catch(e=>{console.error(e);process.exitCode=1;});
