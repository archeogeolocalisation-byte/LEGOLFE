/* eslint-disable @typescript-eslint/no-require-imports */
// Actual route handlers, isolated Supabase mocks: no production reads or writes.
const assert=require('node:assert/strict'),fs=require('node:fs'),Module=require('node:module'),ts=require('typescript');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const adminId='11111111-1111-4111-8111-111111111111',ownerId='22222222-2222-4222-8222-222222222222';
let actor=adminId,calls=[],missingOwner=false;
const payload={id:'property-test',name:'Mas',location:'Le Plan de la Tour',description:'French',descriptionEn:'English',guests:8,bedrooms:4,bathrooms:2,price:3500,photos:[{src:'https://example.com/photo.jpg',alt:'Mas'}],amenities:[],highlights:[],announcer:{kind:'owner',name:'Owner'},extraField:'preserve'};
const db={auth:{admin:{
  listUsers:async()=>({data:{users:[{id:ownerId,email:'owner@example.com',user_metadata:{legolfe_display_name:'Owner'},created_at:'2026-01-01',email_confirmed_at:'2026-01-01'}]},error:null}),
  getUserById:async id=>({data:{user:{id,email:'owner@example.com',user_metadata:{anotherSetting:'keep'}}},error:missingOwner?new Error('missing'):null}),
  updateUserById:async(id,change)=>{calls.push({id,change});return {error:null};},
}},from(table){
  calls.push({table});let updating=false;
  const q={select(){return q;},eq(){return q;},in(){return Promise.resolve({data:[],error:null});},order(){return q;},range(){return q;},ilike(){return q;},upsert(){return Promise.resolve({error:null});},delete(){return q;},then(resolve){return Promise.resolve({data:[],error:null}).then(resolve);},abortSignal:async()=>({data:[{id:payload.id,payload,owner_id:ownerId,status:'published',visibility:'public'}],error:null}),single:async()=>({data:updating?{id:payload.id}:{payload},error:null}),update(change){updating=true;calls.push({change});return q;}};return q;
}};
const load=Module._load;
Module._load=function(request,parent,...rest){
  if(request==='server-only')return {};
  if(request==='@supabase/supabase-js')return {createClient:(_url,key)=>key==='secret'?db:{auth:{getUser:async token=>({data:{user:token==='valid'?{id:actor,user_metadata:{role:'admin'}}:null},error:null})}}};
  return load.call(this,request,parent,...rest);
};
Object.assign(process.env,{NEXT_PUBLIC_SUPABASE_URL:'https://example.supabase.co',NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:'public',SUPABASE_SECRET_KEY:'secret',LEGOLFE_ADMIN_USER_IDS:adminId});
const {GET,PATCH}=require('../app/api/admin/route.ts');
const {isAdminId,validateAdminChange}=require('../lib/adminValidation.ts');
const request=(method='GET',body,token='valid',origin='https://www.legolfe.com',query='')=>new Request('https://www.legolfe.com/api/admin'+query,{method,headers:{Authorization:token?`Bearer ${token}`:'',Origin:origin,'Content-Type':'application/json'},...(body===undefined?{}:{body:JSON.stringify(body)})});
(async()=>{
  assert.equal(isAdminId(adminId,` ${adminId}, ${ownerId}`),true);assert.equal(isAdminId(adminId,undefined),false);assert.equal(isAdminId(adminId,adminId.slice(0,-1)),false);
  assert.equal((await GET(request('GET',undefined,''))).status,401);
  assert.equal((await GET(request('GET',undefined,'invalid'))).status,401);
  actor=ownerId;calls=[];assert.equal((await GET(request())).status,403);assert.deepEqual(calls,[]);
  assert.equal((await PATCH(request('PATCH',{kind:'user',id:ownerId,role:'moderator'}))).status,403);assert.deepEqual(calls,[]);
  actor=adminId;assert.equal((await PATCH(request('PATCH',{},'valid','https://attacker.example'))).status,403);
  delete process.env.SUPABASE_SECRET_KEY;assert.equal((await GET(request())).status,503);process.env.SUPABASE_SECRET_KEY='secret';
  const r=await GET(request());assert.equal(r.status,200);assert.equal(r.headers.get('Cache-Control'),'no-store, private');const listing=(await r.json()).listings[0];assert.equal(listing.ownerEmail,'owner@example.com');
  assert.equal((await GET(request('GET',undefined,'valid',undefined,'?section=users'))).status,200);
  assert.equal((await GET(request('GET',undefined,'valid',undefined,'?page=1.5'))).status,400);
  const change={kind:'listing',id:payload.id,ownerId,status:'paused',visibility:'private',name:'Mas updated',location:'Le Plan de la Tour',description:'New French',descriptionEn:'New English'};
  for(const patch of [{ownerId:'bad'},{status:'deleted'},{visibility:'invalid'},{name:''},{description:'x'.repeat(4001)}])assert.throws(()=>validateAdminChange({...change,...patch}),/INVALID_CHANGE/);
  calls=[];assert.equal((await PATCH(request('PATCH',change))).status,200);const saved=calls.find(c=>c.change)?.change;assert.equal(saved.payload.extraField,'preserve');assert.deepEqual(saved.payload.photos,payload.photos);assert.equal(saved.owner_id,ownerId);assert.equal(saved.payload.name,'Mas updated');
  missingOwner=true;calls=[];assert.equal((await PATCH(request('PATCH',change))).status,400);assert.equal(calls.some(c=>c.change),false);missingOwner=false;
  calls=[];assert.equal((await PATCH(request('PATCH',{kind:'user',id:ownerId,role:'moderator'}))).status,200);assert.deepEqual(calls.find(c=>c.change?.app_metadata)?.change,{app_metadata:{legolfe_role:'moderator'}});
  console.log('Admin: authorization, validation, privacy and preservation checks passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
