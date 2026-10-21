/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),ts=require('typescript');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.VERCEL_ENV='production';process.env.NEXT_PUBLIC_SITE_URL='https://www.legolfe.com';
const {createElement}=require('react'),{renderToStaticMarkup}=require('react-dom/server'),Footer=require('../components/SiteFooter.tsx').default;
const {routeLocale}=require('../lib/routeLocale.ts'),{publicContactEmail,contactMailto}=require('../lib/publicContact.ts');
const previousEmail=process.env.LEGOLFE_CONTACT_EMAIL;
(async()=>{try{
 delete process.env.LEGOLFE_CONTACT_EMAIL;assert.equal(publicContactEmail(),'contact@legolfe.com');
 process.env.LEGOLFE_CONTACT_EMAIL=' public@example.invalid ';assert.equal(publicContactEmail(),'public@example.invalid');
 process.env.LEGOLFE_CONTACT_EMAIL='bad@example.invalid?bcc=other@example.invalid';assert.equal(publicContactEmail(),'contact@legolfe.com');
 delete process.env.LEGOLFE_CONTACT_EMAIL;
 const mail=new URL(contactMailto(publicContactEmail(),'Une question & un lieu','Bonjour,\nDeux lignes.'));assert.equal(mail.pathname,'contact@legolfe.com');assert.equal(mail.searchParams.get('subject'),'Une question & un lieu');assert.equal(mail.searchParams.get('body'),'Bonjour,\nDeux lignes.');
 for(const locale of ['fr','en']){
  const html=renderToStaticMarkup(createElement(Footer,{locale,path:`/${locale}/contact`}));assert.equal((html.match(/<footer/g)||[]).length,1);assert.ok(html.includes(`href="/${locale}/contact"`));assert.ok(html.includes(`href="/${locale}/a-propos"`));assert.ok(html.includes('href="/fr/contact"'));assert.ok(html.includes('href="/en/contact"'));assert.ok(html.includes(locale==='fr'?'Écrivez-nous':'Get in touch'));
  for(const slug of ['contact','a-propos']){
   const Page=require(`../app/[locale]/${slug}/page.tsx`),params=Promise.resolve({locale});const meta=await Page.generateMetadata({params});assert.equal(meta.alternates.canonical,`https://www.legolfe.com/${locale}/${slug}`);assert.equal(meta.robots.index,true);
   const body=renderToStaticMarkup(await Page.default({params}));assert.equal((body.match(/<h1[ >]/g)||[]).length,1);assert.ok(body.includes('application/ld+json'));assert.equal(body.includes('<footer'),false,'footer belongs to root layout');
   if(slug==='contact'){assert.ok(body.includes('contact@legolfe.com'));const links=[...body.matchAll(/href="(mailto:[^"]+)"/g)];assert.equal(links.length,4);for(const [,href] of links)assert.ok(new URL(href.replaceAll('&amp;','&')).searchParams.get('subject'));}
  }
 }
 for(const url of ['/fr','/fr/contact','/villa/villa-eden','/match','/requests'])assert.equal(routeLocale(url),'fr');for(const url of ['/en','/en/a-propos','/france'])assert.equal(routeLocale(url),'en');
 const root=fs.readFileSync(path.join(__dirname,'../app/layout.tsx'),'utf8');assert.equal((root.match(/<GlobalFooter /g)||[]).length,1);
 function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?files(path.join(dir,entry.name)):entry.name.endsWith('.tsx')?[path.join(dir,entry.name)]:[]);}
 for(const file of [...files(path.join(__dirname,'../app')),...files(path.join(__dirname,'../components'))])if(!file.endsWith('/GlobalFooter.tsx'))assert.equal(fs.readFileSync(file,'utf8').includes('<SiteFooter '),false,`no duplicate footer in ${file}`);
 console.log('Site footer: single global integration, FR/EN links and locale routes, Contact/About metadata and SSR, public email fallback/configuration and prefilled email URLs passed.');
}finally{if(previousEmail===undefined)delete process.env.LEGOLFE_CONTACT_EMAIL;else process.env.LEGOLFE_CONTACT_EMAIL=previousEmail;}})().catch(error=>{console.error(error);process.exitCode=1;});
