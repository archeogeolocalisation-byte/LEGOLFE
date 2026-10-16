/* eslint-disable @typescript-eslint/no-require-imports */
// Exercise page composition, listing navigation and owner-only shortcuts without live services.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript'),React=require('react');
const root=path.resolve(__dirname,'..');
let values=[],cursor=0,effects=[],authListener,resolveUser,unsubscribed=false;
const auth={getUser:()=>new Promise(resolve=>{resolveUser=resolve;}),onAuthStateChange:callback=>{authListener=callback;return{data:{subscription:{unsubscribe(){unsubscribed=true;}}}};}};
function load(relative){
 const file=path.join(root,relative),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));
 const original=Module._load;
 Module._load=function(request,parent,...rest){
  if(parent?.filename===file){
   if(request==='react')return{...React,useState(initial){const i=cursor++;if(!(i in values))values[i]=initial;return[values[i],next=>{values[i]=typeof next==='function'?next(values[i]):next;}];},useRef(value){return{current:value};},useEffect(fn){effects.push(fn);}};
   if(request==='next/navigation')return{useParams:()=>({locale:'fr'})};
   if(request==='next/link')return{__esModule:true,default:'a'};
   if(request.endsWith('/lib/supabase'))return{supabase:{auth}};
   if(request.startsWith('./')||request.includes('/components/')){const name=path.basename(request);const stub=()=>null;stub.displayName=name;return{__esModule:true,default:stub};}
   if(request.includes('/lib/'))return{};
  }
  return original.call(this,request,parent,...rest);
 };
 try{m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);}finally{Module._load=original;}
 return m.exports.default;
}
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
const text=e=>typeof e==='string'||typeof e==='number'?String(e):Array.isArray(e)?e.map(text).join(''):e&&typeof e==='object'?text(e.props?.children):'';
function render(C,props){cursor=0;return C(props);}
const Account=load('app/[locale]/account/page.tsx');
values=['','','owner','private@example.invalid','Public name',false,false,true,false,false];
let tree=render(Account,{}),all=nodes(tree);
assert.ok(all.findIndex(n=>n.props?.id==='public-name')<all.findIndex(n=>n.type?.displayName==='ProfileDetails'),'Name comes before photo and bio');
assert.ok(all.findIndex(n=>n.type?.displayName==='ProfileGallery')>all.findIndex(n=>n.props?.className==='account-settings'),'Gallery follows the account sections');
assert.ok(all.some(n=>n.type?.displayName==='ProfileShortcuts'));
const Shortcuts=load('components/ProfileShortcuts.tsx');
for(const locale of ['fr','en']){const links=nodes(render(Shortcuts,{locale})).filter(n=>n.type==='a').map(n=>n.props.href);assert.deepEqual(links,[`/${locale}/saved#mes-adresses`,`/${locale}/saved`,`/${locale}/host`]);}
const Host=load('components/HostDesk.tsx');
const fixture={id:'property-one',name:'My home',location:'Gassin',distanceFromSaintTropez:8,status:'draft',visibility:'private',price:0,guests:4,bedrooms:2,bathrooms:1,images:[],online:false};
for(const locale of ['fr','en'])for(const count of [0,1,2]){
 values=['owner',Array.from({length:count},(_,i)=>({...fixture,id:'property-'+i})),[],'properties',undefined,false,false,null,null,null,false,'','',true,'owner',true];
 tree=render(Host,{locale});all=nodes(tree);
 assert.equal(text(all.find(n=>n.type==='h1')),locale==='fr'?(count===1?'MON ANNONCE.':'MES ANNONCES.'):(count===1?'MY LISTING.':'MY LISTINGS.'));
 assert.equal(all.filter(n=>n.props?.className==='host-listing').length,count);
 assert.equal(all.some(n=>n.props?.role==='tab'),false);
 const requests=all.find(n=>n.type==='button'&&text(n).includes(locale==='fr'?'Consulter mes demandes':'View enquiries'));
 requests.props.onClick();tree=render(Host,{locale});assert.equal(nodes(tree).find(n=>n.props?.children?.type?.displayName==='HostInquiryDesk')?.props.hidden,false);
 const back=nodes(tree).find(n=>n.type==='button'&&text(n).includes(locale==='fr'?'Mes annonces':'My listings'));back.props.onClick();assert.equal(values[3],'properties');
}
(async()=>{
 const OwnLinks=load('components/MemberPrivateLinks.tsx');
 values=[];effects=[];assert.equal(render(OwnLinks,{memberId:'owner',locale:'fr'}),null);
 const cleanup=effects[0]();resolveUser({data:{user:{id:'owner'}},error:null});await Promise.resolve();
 assert.notEqual(render(OwnLinks,{memberId:'owner',locale:'fr'}),null);
 assert.equal(render(OwnLinks,{memberId:'another',locale:'fr'}),null,'Another member never gets private navigation');
 authListener('SIGNED_OUT',null);assert.equal(render(OwnLinks,{memberId:'owner',locale:'fr'}),null);cleanup();assert.equal(unsubscribed,true);
 values=[];effects=[];render(OwnLinks,{memberId:'owner',locale:'en'});const clean=effects[0]();authListener('SIGNED_OUT',null);resolveUser({data:{user:{id:'owner'}},error:null});await Promise.resolve();assert.equal(render(OwnLinks,{memberId:'owner',locale:'en'}),null,'A stale auth response cannot restore owner shortcuts');clean();
 console.log('Account workspace: name/gallery order, FR/EN shortcuts, 0/1/multiple listings, enquiry/back navigation and owner-only auth race/sign-out checks passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
