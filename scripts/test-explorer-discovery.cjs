/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
const options={module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true};
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:options}).outputText,f);
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {renderToStaticMarkup}=require('react-dom/server');
const {places}=require('../data/places.ts');
const {destinations}=require('../data/destinations.ts');
const {isExploreAddress,matchesExploreFilter,matchesExploreSearch}=require('../lib/exploreFilters.ts');
const {mediaForPlace}=require('../lib/placeMedia.ts');
const {suppliedPlaceMedia}=require('../data/suppliedPlaceMedia.ts');
const Page=require('../app/[locale]/explore/page.tsx');
(async()=>{
 const addresses=places.filter(isExploreAddress);
 for(const locale of ['fr','en']){
  const params=Promise.resolve({locale});
  const all=renderToStaticMarkup(await Page.default({params}));
  assert.equal((all.match(/<h1[ >]/g)||[]).length,1);
  for(const p of addresses)assert.ok(all.includes(`href="/${locale}/place/${p.id}"`),`Direct HTML link without using a map/filter: ${p.id}`);
  for(const town of destinations){
   const html=renderToStaticMarkup(await Page.default({params,searchParams:Promise.resolve({town:town.slug})}));
   for(const p of addresses.filter(p=>matchesExploreSearch(p,'',town.slug)))assert.ok(html.includes(`href="/${locale}/place/${p.id}"`));
  }
  for(const q of ["l'hardy",'bonne-terrasse','randonnée','patrimoine']){
   const html=renderToStaticMarkup(await Page.default({params,searchParams:Promise.resolve({q})}));
   const expected=addresses.filter(p=>matchesExploreSearch(p,q,''));assert.ok(expected.length>0,q);
   for(const p of expected)assert.ok(html.includes(`href="/${locale}/place/${p.id}"`));
   const metadata=await Page.generateMetadata({params,searchParams:Promise.resolve({q})});
   assert.deepEqual(metadata.robots,{index:false,follow:true});assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/explore`);
  }
  const heritage=renderToStaticMarkup(await Page.default({params,searchParams:Promise.resolve({filter:'places'})}));
  assert.ok(heritage.includes(`href="/${locale}/explore/places"`));
  assert.equal(heritage.includes(locale==='fr'?'Villages &amp; lieux':'Villages &amp; areas'),false,'Heritage results use the public Heritage label');
  const empty=renderToStaticMarkup(await Page.default({params,searchParams:Promise.resolve({q:'no-match-xxxxxx'})}));
  assert.ok(empty.includes(locale==='fr'?'Aucune adresse':'No places match'));
  assert.ok(empty.includes(`href="/${locale}/explore"`));
 }
 for(const p of addresses){
  const media=mediaForPlace(p.id);if(!media)continue;
  if(media.src.startsWith('/'))assert.ok(fs.existsSync(path.join(__dirname,'../public',media.src)),`${p.id}: local image exists`);
  else assert.equal(new URL(media.src).protocol,'https:');
  assert.ok(media.alt,`${p.id}: descriptive image`);
  if(!suppliedPlaceMedia[p.id])assert.ok(media.credit&&media.source,`${p.id}: credited catalogue image`);
  else assert.equal(media.src,suppliedPlaceMedia[p.id][0].src);
 }
 // Run the real onError callback with hook state to verify failure and source replacement.
 const filename=path.resolve(__dirname,'../components/PlaceCardImage.tsx'),realLoad=Module._load;
 let state;
 Module._load=function(request,parent,...args){
  const result=realLoad.call(this,request,parent,...args);
  if(request==='react'&&parent?.filename===filename)return {...result,useState:()=>[state,next=>{state=next;}]};
  return result;
 };
 const isolated=new Module(filename,module);isolated.filename=filename;isolated.paths=module.paths;
 try{isolated._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:options}).outputText,filename);}finally{Module._load=realLoad;}
 const Image=isolated.exports.default;
 const nodes=e=>!e||typeof e!=='object'?[]:[e,...require('react').Children.toArray(e.props?.children).flatMap(nodes)];
 const props={src:'https://example.com/first.jpg',name:'Fort-Freinet',label:'Patrimoine',locale:'fr',contextual:true,eager:true};
 let tree=Image(props),img=nodes(tree).find(n=>n.type==='img');
 assert.equal(img.props.loading,'eager');assert.ok(img.props.width&&img.props.height);img.props.onError();
 tree=Image(props);assert.equal(nodes(tree).some(n=>n.type==='img'),false);assert.equal(tree.props.role,'img');assert.ok(renderToStaticMarkup(tree).includes('Fort-Freinet'));
 assert.equal(renderToStaticMarkup(tree).includes('Photo du secteur'),false,'No photo badge on missing-image fallback');
 tree=Image({...props,src:'https://example.com/replacement.jpg',eager:false});img=nodes(tree).find(n=>n.type==='img');assert.equal(img.props.loading,'lazy');
 assert.ok(nodes(tree).some(n=>n.props?.children==='Photo du secteur'));
 assert.ok(renderToStaticMarkup(Image({...props,src:undefined})).includes('Fort-Freinet'));
 state=undefined;tree=Image(props);nodes(tree).find(n=>n.type==='img').props.ref({complete:true,naturalWidth:0});assert.equal(Image(props).props.role,'img','A photo that failed before hydration also gets the fallback');
 state=undefined;tree=Image(props);nodes(tree).find(n=>n.type==='img').props.ref({complete:false,naturalWidth:0});assert.ok(nodes(Image(props)).some(n=>n.type==='img'),'An image still loading is not marked failed');
 const grid=require('../components/ExploreIntentGrid.tsx').default;
 const html=renderToStaticMarkup(grid({places,locale:'fr',filter:'places'}));
 for(const p of addresses.filter(p=>matchesExploreFilter(p,'places')))assert.ok(html.includes(`href="/fr/place/${p.id}"`));
 console.log(`Explorer discovery: ${addresses.length} direct HTML links in FR/EN; all towns, search/noindex/canonicals, heritage labels, media references and actual image failure/replacement handlers passed.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
