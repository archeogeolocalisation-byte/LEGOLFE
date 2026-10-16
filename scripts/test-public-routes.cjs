/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {getURLFromRedirectError,getRedirectStatusCodeFromError}=require('next/dist/client/components/redirect');
const Explore=require('../app/[locale]/explore/page.tsx');
const Category=require('../app/[locale]/explore/[category]/page.tsx');
const LegacyExplore=require('../app/explore/page.tsx').default;
const LegacyCategory=require('../app/explore/[category]/page.tsx').default;
const LegacyPlace=require('../app/place/[id]/page.tsx').default;
const {places,placeCategories}=require('../data/places.ts');
const {isExploreAddress,matchesExploreFilter}=require('../lib/exploreFilters.ts');
const {renderToStaticMarkup}=require('react-dom/server');
async function assertRedirect(render,path,query){
 await assert.rejects(render,error=>{
  assert.equal(getRedirectStatusCodeFromError(error),308);
  const url=new URL(getURLFromRedirectError(error),'https://www.legolfe.com');
  assert.equal(url.origin,'https://www.legolfe.com');assert.equal(url.pathname,path);
  for(const [key,value] of Object.entries(query))assert.deepEqual(url.searchParams.getAll(key),Array.isArray(value)?value:[value]);
  return true;
 });
}
(async()=>{
 const query={filter:'party',mood:'quiet',q:'roy & café / été?',town:'saint-tropez',tag:['a','b'],next:'https://external.invalid/'};
 await assertRedirect(()=>LegacyExplore({searchParams:Promise.resolve(query)}),'/en/explore',query);
 await assertRedirect(()=>LegacyExplore({}),'/en/explore',{});
 for(const category of placeCategories){
  await assertRedirect(()=>LegacyCategory({params:Promise.resolve({category:category.id}),searchParams:Promise.resolve(query)}),`/en/explore/${category.id}`,query);
  for(const locale of ['fr','en']){
   const metadata=await Category.generateMetadata({params:Promise.resolve({locale,category:category.id})});
   assert.equal(metadata.robots.index,true);assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/explore/${category.id}`);
   const list=places.filter(isExploreAddress).filter(p=>matchesExploreFilter(p,category.id));assert.ok(list.length>0,`Empty category: ${category.id}`);
   const html=renderToStaticMarkup(await Category.default({params:Promise.resolve({locale,category:category.id})}));
   for(const place of list)assert.ok(html.includes(`href="/${locale}/place/${place.id}"`));
  }
 }
 for(const place of places)await assertRedirect(()=>LegacyPlace({params:Promise.resolve({id:place.id}),searchParams:Promise.resolve({from:'old link'})}),`/en/place/${place.id}`,{from:'old link'});
 for(const [render,params] of [[LegacyPlace,{id:'unknown-place'}],[LegacyCategory,{category:'unknown-category'}]]){
  await assert.rejects(()=>render({params:Promise.resolve(params)}),error=>error.digest==='NEXT_HTTP_ERROR_FALLBACK;404');
 }
 for(const locale of ['fr','en']){
  for(const search of [{},{utm_source:'newsletter'}]){
   const metadata=await Explore.generateMetadata({params:Promise.resolve({locale}),searchParams:Promise.resolve(search)});
   assert.equal(metadata.robots.index,true);assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/explore`);
  }
  for(const search of [{filter:'party'},{mood:'family'},{q:'marché'},{town:'gassin'},{filter:'all'},{q:''},{filter:['party','sea']},{town:'unknown'},query]){
   const metadata=await Explore.generateMetadata({params:Promise.resolve({locale}),searchParams:Promise.resolve(search)});
   assert.deepEqual(metadata.robots,{index:false,follow:true});
   assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/explore`);
   assert.equal(metadata.alternates.languages.en,'https://www.legolfe.com/en/explore');
  }
  const html=renderToStaticMarkup(await Explore.default({params:Promise.resolve({locale}),searchParams:Promise.resolve({filter:'party'})}));
  assert.ok(html.includes(`href="/${locale}/place/caves-du-roy"`),'Filtered results remain crawlable');
 }
 process.env.VERCEL_ENV='preview';
 for(const search of [{},{q:'test'}])assert.equal((await Explore.generateMetadata({params:Promise.resolve({locale:'fr'}),searchParams:Promise.resolve(search)})).robots.index,false);
 console.log('Public routes: 308 aliases preserve query arrays/encoding; invalid targets return 404; FR/EN categories remain indexable; Explorer variants are noindex/follow with clean canonicals and real place links.');
})().catch(error=>{console.error(error);process.exitCode=1;});
