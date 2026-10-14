/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require("node:assert/strict");
const fs=require("node:fs");
const Module=require("node:module");
const ts=require("typescript");
require.extensions[".ts"]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,"utf8"),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);

const id="11111111-1111-4111-8111-111111111111";
const avatar=id+"/legolfe-profile/22222222-2222-4222-8222-222222222222.jpg";
const cover=id+"/legolfe-profile/33333333-3333-4333-8333-333333333333.jpg";
const posts=[
  {id:"a",user_id:id,status:"approved",place_id:"caves-du-roy",type:"photo",comment:"J'y étais",image_path:id+"/caves-du-roy/55555555.jpg",created_at:"2026-10-14T08:00:00Z"},
  {id:"b",user_id:id,status:"pending",place_id:"caves-du-roy",type:"comment",comment:"Not public",image_path:null,created_at:"2026-10-14T09:00:00Z"},
  {id:"c",user_id:id,status:"rejected",place_id:"caves-du-roy",type:"comment",comment:"Rejected",image_path:null,created_at:"2026-10-14T10:00:00Z"},
];
const db={
  auth:{admin:{getUserById:async requested=>{
    assert.equal(requested,id);
    return {data:{user:{id,email:"private@example.com",user_metadata:{
      legolfe_display_name:"Profile name",legolfe_bio:"Public introduction",legolfe_connection:"local",
      legolfe_avatar_path:avatar,legolfe_gallery_paths:[cover,id+"/legolfe-profile/not-an-id.jpg"]
    }}},error:null};
  }}},
  storage:{from:bucket=>{assert.equal(bucket,"community-photos");return {createSignedUrl:async path=>({data:{signedUrl:"https://example.invalid/signed/"+encodeURIComponent(path)},error:null})};}},
  from:table=>{
    if(table==="community_profiles")return {select:()=>({in:async()=>({data:[{user_id:id,display_name:"Public nickname"}],error:null})})};
    assert.equal(table,"community_posts");
    const clauses=[];
    const chain={
      select:()=>chain,eq:(key,value)=>{clauses.push([key,value]);return chain;},
      order:()=>chain,
      limit:async()=>({data:posts.filter(p=>clauses.every(([key,value])=>p[key]===value)),error:null})
    };
    return chain;
  }
};
const realLoad=Module._load;
Module._load=function(request,parent,...rest){
  if(request==="server-only")return {};
  if(request==="@supabase/supabase-js")return {createClient:()=>db};
  return realLoad.call(this,request,parent,...rest);
};
Object.assign(process.env,{NEXT_PUBLIC_SUPABASE_URL:"https://example.supabase.co",SUPABASE_SECRET_KEY:"test-secret"});
const {getPublicMembers,getPublicContributions}=require("../lib/publicMembers.ts");
const {GET}=require("../app/api/community/members/route.ts");
(async()=>{
  const [member]=await getPublicMembers([id]);
  assert.equal(member.name,"Public nickname");
  assert.equal(member.bio,"Public introduction");
  assert.equal(member.avatarUrl?.startsWith("https://example.invalid/signed/"),true);
  assert.equal(member.galleryUrls.length,1);
  assert.equal(member.connection,"local");
  assert.equal(JSON.stringify(member).includes("private@example.com"),false);
  assert.deepEqual(await getPublicMembers(["wrong"]),[]);
  assert.deepEqual(await getPublicContributions("wrong"),[]);
  const contributions=await getPublicContributions(id);
  assert.deepEqual(contributions.map(p=>p.id),["a"]);
  assert.equal(JSON.stringify(contributions).includes("Not public"),false);
  assert.equal(JSON.stringify(contributions).includes("Rejected"),false);
  assert.equal((await GET(new Request("https://legolfe.com/api/community/members?ids=bad"))).status,400);
  const response=await GET(new Request("https://legolfe.com/api/community/members?ids="+id));
  assert.equal(response.status,200);
  assert.equal(response.headers.get("Cache-Control"),"private, no-store");
  assert.equal(JSON.stringify(await response.json()).includes("private@example.com"),false);
  console.log("Community public profiles: safe fields, signed photos, approved contributions and invalid UUIDs passed.");
})().catch(e=>{console.error(e);process.exitCode=1;});
