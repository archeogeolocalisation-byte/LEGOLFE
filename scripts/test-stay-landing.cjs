/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),Module=require('node:module'),ts=require('typescript'),React=require('react');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/'+path.basename(f),width:1200,height:800};};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
let published=[];const base={id:'property-real',name:'Published home',location:'Gassin',price:1234,guests:6,bedrooms:3,bathrooms:2,amenities:['Heated pool','Garden'],description:'Real published home description',descriptionEn:'An actual published home',highlights:[],photos:[{src:'/test-real-home.jpg',alt:'Real home'}],live:true,saintTropezDistance:6};
const load=Module._load;Module._load=function(id,parent,...rest){if(parent?.filename.endsWith('/StayCollection.tsx')&&id==='../lib/publicVillas')return {getPublishedVillas:async()=>published};return load.call(this,id,parent,...rest);};const Collection=require('../components/StayCollection.tsx').default;Module._load=load;
const Card=require('../components/VillaCard.tsx').default,{renderToStaticMarkup}=require('react-dom/server');
(async()=>{
 for(const locale of ['fr','en']){
  published=[base];let html=renderToStaticMarkup(await Collection({locale}));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes('/test-real-home.jpg'));assert.ok(html.includes('stay-results-single'));assert.ok(!html.includes('type="date"'));assert.ok(!html.includes('Dates et équipements'));assert.ok(html.includes(locale==='fr'?'Budget indicatif':'Indicative budget'));assert.ok(html.includes('1 500')||html.includes('1,500'),'Small-budget filter retained');assert.ok(html.includes('stay-how'));assert.ok(html.includes(`/${locale}/guides/ou-dormir-golfe-saint-tropez`));assert.ok(!html.includes('href="/match"'));
  const hero=html.slice(html.indexOf('stay-hero-image'),html.indexOf('stay-how'));assert.ok(!hero.includes('/villas/villa-eden.jpg'),'Hero must show a published home, not a demonstration');
  const card=renderToStaticMarkup(React.createElement(Card,{locale,villa:{...base,image:base.photos[0].src,pool:true}}));assert.ok(!card.includes('€'));assert.ok(!card.includes('Price on request'));assert.ok(!card.includes('Prix sur demande'));assert.ok(card.includes(locale==='fr'?'Piscine chauffée':'Heated pool'));
  published=[base,{...base,id:'property-second',name:'Second published home'}];html=renderToStaticMarkup(await Collection({locale}));assert.ok(!html.includes('stay-results-single'));assert.ok(html.includes('Second published home'));
  published=[];html=renderToStaticMarkup(await Collection({locale}));assert.ok(html.includes('stay-hero-empty'));assert.ok(html.includes(locale==='fr'?'Aucune annonce':'No published listings'));const schema=[...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(m=>JSON.parse(m[1])).find(s=>s['@type']==='CollectionPage');assert.ok(JSON.stringify(schema).includes('"itemListElement":[]'),'Examples must never count as published homes');
 }
 const source=fs.readFileSync(path.join(__dirname,'../components/StayFilters.tsx'),'utf8');assert.ok(!source.includes('loadVillaCalendars'));assert.ok(!source.includes('type="date"'));
 console.log('PASS: stay landing — real hero, zero/one/multiple published homes, FR/EN, no public date/calendar fetch or raw card prices, budget filters, examples and contact-first journey.');
})().catch(e=>{console.error(e);process.exitCode=1;});
