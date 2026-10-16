/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),Module=require('node:module'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);
require.extensions['.webp']=(module,filename)=>{module.exports={src:'/media/guides/'+path.basename(filename),width:1200,height:800};};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const load=Module._load;
Module._load=function(request,parent,...rest){
 if((parent?.filename.endsWith('/sitemap.xml/route.ts')||parent?.filename.endsWith('/app/[locale]/page.tsx'))&&request.endsWith('/lib/publicEvents'))return {getPublicEvents:async()=>[]};
 if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicNews'))return {getPublicNews:async()=>require('../data/localNews.ts').localNews};
 if(parent?.filename.endsWith('/sitemap.xml/route.ts')&&request.endsWith('/lib/publicVillas'))return {getPublishedVillas:async()=>[]};
 return load.call(this,request,parent,...rest);
};
const {guides,relatedGuidesFor}=require('../data/guides.ts');
const {destinations,destinationPaths}=require('../data/destinations.ts');
const {places,placeCategories}=require('../data/places.ts');
const {mediaForGuide}=require('../lib/guideMedia.ts');
const {guideArticleSchema}=require('../lib/guideSeo.ts');
const Page=require('../app/[locale]/guides/[slug]/page.tsx');
const {renderToStaticMarkup}=require('react-dom/server');
const {GET}=require('../app/sitemap.xml/route.ts');
(async()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../public/media/guides/illustration-v2-sources.json')));assert.equal(manifest.files.length,4);
 for(const file of manifest.files){const bytes=fs.readFileSync(path.join(__dirname,'../public',file.file));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),file.sha256);assert.equal(bytes.subarray(0,4).toString(),'RIFF');assert.equal(file.width,1200);assert.equal(file.height,800);assert.ok(bytes.length<300000);assert.ok(mediaForGuide(guides.find(g=>g.slug===file.guide)).photo.src.endsWith('-cover-v2.webp'));}
 const Home=require('../app/[locale]/page.tsx').default;
 for(const locale of ['fr','en']){const html=renderToStaticMarkup(await Home({params:Promise.resolve({locale})}));for(const id of ['grimaud','saint-tropez','sainte-maxime']){assert.ok(html.includes(encodeURIComponent(`/media/tourist-map/${id}-illustration.webp`)));assert.ok(html.includes(`href="/${locale}/destinations/${id}"`));}assert.equal(html.includes('Jibi44'),false);assert.ok(html.includes(`href="/${locale}/carte-touristique"`));}
 const slugs=new Set(guides.map(g=>g.slug));assert.equal(slugs.size,guides.length);assert.ok(guides.length>=12);
 const titles=new Set(),validDest=new Set(destinations.map(d=>d.slug)),validPlaces=new Set(places.map(p=>p.id));
 const validPaths=new Set(['/whats-on','/stay','/destinations','/explore',...placeCategories.map(c=>'/explore/'+c.id),...destinationPaths(),...guides.map(g=>'/guides/'+g.slug),...places.map(p=>'/place/'+p.id)]);
 for(const guide of guides){
  assert.ok(guide.published<=guide.verified);assert.ok(guide.verified<=new Date().toISOString().slice(0,10));
  assert.ok(guide.destinations.every(d=>validDest.has(d)),guide.slug+' destinations');
  assert.ok(guide.placeIds.every(id=>validPlaces.has(id)),guide.slug+' places');
  assert.ok(guide.related.every(id=>slugs.has(id)),guide.slug+' related');
  const sourceIds=new Set(guide.sources.map(s=>s.id));assert.equal(sourceIds.size,guide.sources.length);
  for(const source of guide.sources)assert.equal(new URL(source.url).protocol,'https:');
  const media=mediaForGuide(guide);assert.ok(media?.photo.src,guide.slug+' cover');
  if(guide.published==='2026-10-13')assert.ok(fs.existsSync(path.join(__dirname,'../public',media.photo.src)));
  for(const locale of ['fr','en']){
   const copy=guide.copy[locale];assert.ok(copy.description.length>=80&&copy.description.length<=200,guide.slug+' description');
   assert.equal(titles.has(copy.seoTitle),false);titles.add(copy.seoTitle);
   assert.ok(copy.links.every(l=>validPaths.has(l.path)),guide.slug+' links');
   const ids=new Set(copy.sections.map(s=>s.id));assert.equal(ids.size,copy.sections.length);
   for(const section of copy.sections){assert.ok(section.paragraphs.length);assert.ok((section.sourceIds||[]).every(id=>sourceIds.has(id)));if(section.table){assert.ok(section.table.rows.every(row=>row.length===section.table.headers.length));}}
   const schema=guideArticleSchema(guide,locale);assert.equal(schema.headline,copy.seoTitle);assert.equal(schema.inLanguage,locale==='fr'?'fr-FR':'en-GB');assert.ok(schema.mainEntityOfPage['@id'].includes('/'+locale+'/guides/'+guide.slug));
   const metadata=await Page.generateMetadata({params:Promise.resolve({locale,slug:guide.slug})});assert.equal(metadata.alternates.canonical,`https://www.legolfe.com/${locale}/guides/${guide.slug}`);assert.equal(metadata.alternates.languages.en,`https://www.legolfe.com/en/guides/${guide.slug}`);assert.ok(metadata.openGraph.images[0].url.startsWith('https://www.legolfe.com/'));
   const html=renderToStaticMarkup(await Page.default({params:Promise.resolve({locale,slug:guide.slug})}));assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.ok(html.includes('application/ld+json'));for(const section of copy.sections)assert.ok(html.includes(`id="${section.id}"`));
   for(const id of guide.placeIds)assert.ok(html.includes(`href="/${locale}/place/${id}"`),`${guide.slug}: missing server-rendered place link ${id}`);
   if(guide.slug==='marches-golfe-saint-tropez-jours'){assert.ok(html.includes('<table'));assert.ok(html.includes('scope="row"'));assert.equal(copy.sections[0].table.rows.length,7);}
  }
  assert.ok(relatedGuidesFor(guide).every(other=>other.slug!==guide.slug));
 }
 const xml=await (await GET()).text();assert.equal(xml.includes('<loc>https://www.legolfe.com/match</loc>'),false);assert.equal(xml.includes('/admin'),false);assert.equal(xml.includes('/host'),false);
 for(const month of ['2026-10','2026-09'])for(const locale of ['fr','en'])assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/local/archives/${month}</loc>`));
 for(const guide of guides)for(const locale of ['fr','en'])assert.ok(xml.includes(`<loc>https://www.legolfe.com/${locale}/guides/${guide.slug}</loc>`));
 const match=require('../app/match/layout.tsx').metadata;assert.equal(match.robots.index,false);
 process.env.VERCEL_ENV='preview';assert.equal(guideArticleSchema(guides[0],'fr'),null);
 console.log(`Guides/SEO: ${guides.length} bilingual guides rendered, references/media/links checked, metadata/schema and sitemap validated.`);
})().catch(error=>{console.error(error);process.exitCode=1;});
