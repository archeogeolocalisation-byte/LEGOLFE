/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
const id='11111111-1111-4111-8111-111111111111';
let member={id,name:'FilOu <test>',bio:'Un carnet personnel',avatarUrl:'/avatar.jpg',galleryUrls:['/cover-one.jpg','/cover-two.jpg','/cover-three.jpg'],connection:'local'};
let entries=[{id:'comment',place_id:'cap-taillat',type:'comment',comment:'Belle balade <script>test</script>',imageUrl:null,created_at:'2026-10-14T10:00:00Z'},{id:'photo',place_id:'pampelonne',type:'photo',comment:null,imageUrl:'/shared.jpg',created_at:'2026-10-13T10:00:00Z'},{id:'removed',place_id:'removed-place',type:'comment',comment:'Un lieu retiré',imageUrl:null,created_at:'invalid'}];
const original=Module._load;
Module._load=function(request,parent,...rest){
 if(request==='next/link')return{__esModule:true,default:'a'};
 if(parent?.filename.endsWith('/member/[id]/page.tsx')){
  if(request.endsWith('/lib/publicMembers'))return{memberIdPattern:/^[0-9a-f-]{36}$/,getPublicMembers:async()=>member?[member]:[],getPublicContributions:async()=>entries};
  if(request.endsWith('/components/SiteHeader')||request.endsWith('/components/MemberPrivateLinks'))return{__esModule:true,default:()=>null};
  if(request==='next/navigation')return{notFound:()=>{throw Error('NOT_FOUND');}};
 }
 return original.call(this,request,parent,...rest);
};
const Page=require('../app/[locale]/member/[id]/page.tsx');
Module._load=original;
let state=[],cursor=0;
const hooks={...React,useState(initial){const i=cursor++;if(!(i in state))state[i]=initial;return[state[i],next=>{state[i]=typeof next==='function'?next(state[i]):next;}];},useId:()=>':test-photo:'};
function interactive(relative){const file=path.resolve(__dirname,relative),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));Module._load=function(request,parent,...rest){if(parent?.filename===file&&request==='react')return hooks;if(request==='next/link')return{__esModule:true,default:'a'};return original.call(this,request,parent,...rest);};try{m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);}finally{Module._load=original;}return m.exports.default;}
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
function render(C,props){cursor=0;return C(props);}
(async()=>{
 assert.deepEqual((await Page.generateMetadata({params:Promise.resolve({locale:"fr"})})).robots,{index:false,follow:false});
 for(const locale of ['fr','en']){
  let tree=await Page.default({params:Promise.resolve({locale,id})});const list=nodes(tree);const props=list.find(n=>n.props?.entries)?.props;assert.equal(props.entries[0].placeTitle,'Cap Taillat');assert.equal(props.entries[0].href,`/${locale}/place/cap-taillat`);assert.equal(props.entries[2].href,null);assert.equal(props.entries[2].dateLabel,null);
  let html=renderToStaticMarkup(tree);assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes('FilOu &lt;test&gt;'));assert.ok(!html.includes('<script>test'));assert.ok(!html.includes(`/place/removed-place`));assert.ok(!html.includes('Invalid Date'));assert.ok(html.includes('member-profile-with-photos'));assert.ok(html.includes('member-stats'));assert.ok(html.includes('aria-pressed="true"'));assert.ok(!html.includes('private@example'));
  const Feed=interactive('../components/MemberContributions.tsx');state=[];let feed=render(Feed,props);const buttons=()=>nodes(feed).filter(n=>n.type==='button');buttons()[1].props.onClick();feed=render(Feed,props);assert.equal(nodes(feed).filter(n=>n.type==='article').length,1);assert.equal(nodes(feed).find(n=>n.type==='article').key,'photo');assert.equal(buttons()[1].props['aria-pressed'],true);
  buttons()[2].props.onClick();feed=render(Feed,props);assert.equal(nodes(feed).filter(n=>n.type==='article').length,2);buttons()[0].props.onClick();feed=render(Feed,props);assert.equal(nodes(feed).filter(n=>n.type==='article').length,3);
  state=[];const onlyComment={entries:[props.entries[0]],fr:locale==='fr'};feed=render(Feed,onlyComment);buttons()[1].props.onClick();feed=render(Feed,onlyComment);assert.equal(nodes(feed).filter(n=>n.type==='article').length,0);nodes(feed).find(n=>n.type==='button'&&n.props['aria-pressed']===undefined).props.onClick();feed=render(Feed,onlyComment);assert.equal(nodes(feed).filter(n=>n.type==='article').length,1);
  const saved=entries;entries=[];tree=await Page.default({params:Promise.resolve({locale,id})});html=renderToStaticMarkup(tree);assert.ok(html.includes('member-empty'));assert.ok(!html.includes('member-filters'));entries=saved;
 }
 const Cover=interactive('../components/MemberCoverSlider.tsx');for(const fr of [true,false]){
  state=[];assert.equal(render(Cover,{photos:[],fr}),null);
  state=[];let cover=render(Cover,{photos:['/one.jpg'],fr});assert.equal(nodes(cover).filter(n=>n.type==='button').length,0);
  state=[];const props={photos:['/one.jpg','/two.jpg','/three.jpg','/ignored.jpg'],fr};cover=render(Cover,props);assert.equal(nodes(cover).find(n=>n.type==='img').props.src,'/one.jpg');nodes(cover).find(n=>n.type==='button').props.onClick();cover=render(Cover,props);assert.equal(nodes(cover).find(n=>n.type==='img').props.src,'/three.jpg');nodes(cover).filter(n=>n.type==='button')[1].props.onClick();cover=render(Cover,props);assert.equal(nodes(cover).find(n=>n.type==='img').props.src,'/one.jpg');nodes(cover).filter(n=>n.type==='button')[3].props.onClick();cover=render(Cover,props);assert.equal(nodes(cover).find(n=>n.type==='img').props.src,'/two.jpg');assert.equal(nodes(cover).filter(n=>n.type==='button')[3].props['aria-pressed'],true);
 }
 member={...member,avatarUrl:null,galleryUrls:[],bio:'',connection:null};let html=renderToStaticMarkup(await Page.default({params:Promise.resolve({locale:'fr',id})}));assert.ok(!html.includes('member-profile-with-photos'));assert.ok(html.includes('member-bio-fallback'));
 await assert.rejects(Page.default({params:Promise.resolve({locale:'de',id})}),/NOT_FOUND/);await assert.rejects(Page.default({params:Promise.resolve({locale:'fr',id:'invalid'})}),/NOT_FOUND/);member=null;await assert.rejects(Page.default({params:Promise.resolve({locale:'fr',id})}),/NOT_FOUND/);
 console.log('PASS: member journal — actual FR/EN page, escaped content, named places, removed-place/date fallback, noindex, empty profiles, photo/comment filters and reset, 0/1/3 photos, wrapping arrows and thumbnails.');
})().catch(error=>{console.error(error);process.exitCode=1;});
