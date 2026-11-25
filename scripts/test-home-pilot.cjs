const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});
require.extensions['.webp']=(m,f)=>m.exports={src:'/media/guides/'+path.basename(f),width:1200,height:800};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';
const {renderToReadableStream,renderToStaticMarkup}=require('react-dom/server');
const React=require('react'),load=Module._load;let withUpdates=false;
Module._load=function(request,parent,...rest){
 if(request==='next/font/local'&&parent?.filename.endsWith('/design/home/page.tsx'))return ()=>({variable:'pilot-font'});
 if(parent?.filename.endsWith('/[locale]/page.tsx')){
  if(request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>withUpdates?[{id:'test-concert',title:'Evening concert',titleFr:'Concert du soir',start:'2026-11-26',location:'Grimaud',category:'music',featured:true}]:[]};
  if(request.endsWith('/lib/publicNews'))return {getPublicNews:async()=>[]};
  if(request.endsWith('/lib/localCalendar'))return {parisIsoDay:()=> '2026-11-25'};
 }
 return load.call(this,request,parent,...rest);
};
const Original=require('../app/[locale]/page.tsx').default,Pilot=require('../app/[locale]/design/home/page.tsx');
async function render(Page,locale){const stream=await renderToReadableStream(React.createElement(Page,{params:Promise.resolve({locale})}));await stream.allReady;return new Response(stream).text();}
function main(html){const start=html.indexOf('<main '),end=html.lastIndexOf('</main>');assert.ok(start>=0&&end>start);return html.slice(start,end+7);}
(async()=>{
 assert.deepEqual(Pilot.metadata.robots,{index:false,follow:false});
 for(const state of [false,true]){withUpdates=state;
  for(const locale of ['fr','en']){
   const original=await render(Original,locale),pilot=await render(Pilot.default,locale);
   assert.equal(main(pilot),main(original),`${locale}: identical homepage structure, content, media, navigation and section order`);
   assert.equal((pilot.match(/<h1[ >]/g)||[]).length,1);
   if(state)assert.ok(pilot.includes(locale==='fr'?'Concert du soir':'Evening concert'));
  }
 }
 // Both the pilot and existing pages retain the same global footer.
 let pathname='/fr/design/home';
 Module._load=function(request,parent,...rest){
  if(request==='next/navigation'&&parent?.filename.endsWith('/GlobalFooter.tsx'))return {usePathname:()=>pathname};
  if(request==='./SiteFooter'&&parent?.filename.endsWith('/GlobalFooter.tsx'))return {__esModule:true,default:()=>React.createElement('footer',null,'Existing footer')};
  return load.call(this,request,parent,...rest);
 };
 const Footer=require('../components/GlobalFooter.tsx').default;
 for(const locale of ['fr','en'])for(const suffix of ['/design/home','']){pathname=`/${locale}${suffix}`;assert.ok(renderToStaticMarkup(React.createElement(Footer,{initialLocale:locale})).includes('Existing footer'));}
 console.log('Home typography pilot: identical FR/EN homepage markup with empty and live agenda states; existing footer retained and noindex passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
