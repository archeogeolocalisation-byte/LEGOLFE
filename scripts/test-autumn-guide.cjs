/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
const {renderToStaticMarkup}=require('react-dom/server');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/'+path.basename(f),width:1200,height:800};};
require.extensions['.css']=m=>{m.exports={};};
const {guides}=require('../data/guides.ts'),{places}=require('../data/places.ts'),{autumnOutings,autumnOutingsChecked}=require('../data/autumnOutings.ts');
const Plan=require('../components/AutumnGuidePlan.tsx').default,Page=require('../app/[locale]/guides/[slug]/page.tsx').default;
const guide=guides.find(g=>g.slug==='week-end-automne-golfe-saint-tropez');
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
(async()=>{
 assert.equal(autumnOutings.length,3);assert.equal(new Set(autumnOutings.map(o=>o.id)).size,3);
 for(const outing of autumnOutings){assert.ok(outing.placeIds.every(id=>places.some(p=>p.id===id)&&guide.placeIds.includes(id)));assert.ok(outing.sourceIds.every(id=>guide.sources.some(s=>s.id===id)));}
 for(const locale of ['fr','en']){
  const tree=Plan({locale,sources:guide.sources}),list=nodes(tree),cards=list.filter(n=>n.type==='article');assert.equal(cards.length,3);
  for(let i=0;i<3;i++){
   const card=cards[i],outing=autumnOutings[i],copy=outing.copy[locale];const all=nodes(card);assert.equal(all.filter(n=>n.type==='li').length,copy.steps.length);assert.equal(all.filter(n=>n.type==='dt').length,3);
   const save=all.find(n=>n.type?.name==='GuideStayButton');assert.deepEqual(save.props.ids,outing.placeIds);
   for(const id of outing.placeIds)assert.ok(all.some(n=>n.props?.href===`/${locale}/place/${id}`));
   for(const sourceId of outing.sourceIds)assert.ok(all.some(n=>n.props?.href===guide.sources.find(s=>s.id===sourceId).url));
  }
  const map=list.find(n=>n.type?.name==='DiscoveryMap');assert.equal(map.props.places.length,4);assert.equal(new Set(map.props.places.map(p=>p.id)).size,4);assert.ok(map.props.places.every(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)));
  const html=renderToStaticMarkup(tree);assert.ok(html.includes(`dateTime="${autumnOutingsChecked}"`));assert.ok(html.includes(`href="/${locale}/saved"`));assert.ok(html.includes(`href="/${locale}/whats-on"`));assert.ok(html.includes('https://vigilance.meteofrance.fr/fr/var'));assert.ok(html.includes(`href="/${locale}/guides/golfe-saint-tropez-quand-il-pleut"`));assert.ok(!html.includes('undefined'));assert.ok(!html.includes('NaN'));
  const page=renderToStaticMarkup(await Page({params:Promise.resolve({locale,slug:guide.slug})}));assert.equal((page.match(/id="programmes-automne"/g)||[]).length,1);assert.ok(page.includes('href="#programmes-automne"'));assert.ok(page.includes('autumn-outing'));assert.equal((page.match(/<h1[ >]/g)||[]).length,1);
  const other=renderToStaticMarkup(await Page({params:Promise.resolve({locale,slug:'ramatuelle-a-pied'})}));assert.ok(!other.includes('autumn-outing'));
 }
 console.log('PASS: autumn guide FR/EN — three sourced programmes, seasonal schedules, budget/weather, mapped places, scoped save actions, rain/weather/agenda alternatives, checked date and actual page integration.');
})().catch(error=>{console.error(error);process.exitCode=1;});
