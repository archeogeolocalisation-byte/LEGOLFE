const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});
const {renderToStaticMarkup,renderToReadableStream}=require('react-dom/server');
const load=Module._load;let published=false;
Module._load=function(request,parent,...rest){
 if(parent?.filename.endsWith('/design/home/page.tsx')){
  if(request==='next/font/local')return ()=>({variable:'pilot-font'});
  if(request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>published?[{id:'test-concert',title:'Evening concert',titleFr:'Concert du soir',start:'2026-11-26',location:'Grimaud',category:'music',featured:true}]:[]};
  if(request.endsWith('/lib/publicVillas'))return {getPublishedVillas:async()=>published?[{id:'property-published',name:'Published home',location:'Grimaud',photos:[{src:'https://example.com/home.jpg',alt:'Published home'}]}]:[]};
  if(request.endsWith('/lib/localCalendar'))return {parisIsoDay:()=> '2026-11-25'};
 }
 return load.call(this,request,parent,...rest);
};
const Page=require('../app/[locale]/design/home/page.tsx');
async function render(locale){const stream=await renderToReadableStream(await Page.default({params:Promise.resolve({locale})}));await stream.allReady;return new Response(stream).text();}
(async()=>{
 assert.equal(Page.metadata.robots.index,false);assert.equal(Page.metadata.robots.follow,false);
 for(const locale of ['fr','en']){
  const html=await render(locale);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.ok(html.includes(`action="/${locale}/explore"`)&&html.includes('name="q"'));
  for(const target of ['explore','stay','saved','whats-on','local','guides/ramatuelle-a-pied'])assert.ok(html.includes(`href="/${locale}/${target}"`));
  assert.ok(html.includes(locale==='fr'?'La suite se prépare.':'More to come.'));
  assert.ok(!html.includes('Published home')&&!html.includes('villa-alba'));
  assert.ok(html.includes('Grimaud Tourisme')&&html.includes('CC BY-SA'));
  const sources=[...html.matchAll(/src="(\/[^"?]+)(?:\?[^\"]*)?"/g)].map(m=>m[1]);
  for(const source of sources)if(!source.startsWith('/_next/'))assert.ok(fs.existsSync(path.join(__dirname,'../public',source)),`Local image exists: ${source}`);
  for(const target of [...html.matchAll(/href="(\/[^"#?]+)(?:[?#][^"]*)?"/g)].map(m=>m[1]))assert.ok(!target.endsWith('/legal'),'No invented legal route');
 }
 published=true;
 for(const locale of ['fr','en']){
  const html=await render(locale);assert.ok(html.includes('Published home'));
  assert.ok(html.includes(locale==='fr'?'Concert du soir':'Evening concert'));
  assert.ok(html.includes(`href="/${locale}/event/test-concert"`));
  assert.ok(html.includes(`href="${locale==='fr'?'':'/en'}/villa/property-published"`));
  assert.ok(!html.includes(locale==='fr'?'La suite se prépare.':'More to come.'));
 }
 // The pilot owns its footer; existing pages retain their regular footer.
 const React=require('react');let pathname='/fr/design/home';
 Module._load=function(request,parent,...rest){if(request==='next/navigation'&&parent?.filename.endsWith('/GlobalFooter.tsx'))return {usePathname:()=>pathname};if(request==='./SiteFooter'&&parent?.filename.endsWith('/GlobalFooter.tsx'))return {__esModule:true,default:()=>React.createElement('footer',null,'Existing footer')};return load.call(this,request,parent,...rest);};
 const Footer=require('../components/GlobalFooter.tsx').default;
 for(const locale of ['fr','en']){pathname=`/${locale}/design/home`;assert.equal(renderToStaticMarkup(React.createElement(Footer,{initialLocale:locale})), '');pathname=`/${locale}/explore`;assert.ok(renderToStaticMarkup(React.createElement(Footer,{initialLocale:locale})).includes('Existing footer'));}
 console.log('Home pilot: FR/EN rendering, live/empty states, published homes only, search, local assets, links, noindex and isolated footer passed.');
})().catch(error=>{console.error(error);process.exitCode=1;});
