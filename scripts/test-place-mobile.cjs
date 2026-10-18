/* eslint-disable @typescript-eslint/no-require-imports */
// Run after `next build` and `playwright install --with-deps webkit`.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),{webkit}=require('playwright'),ts=require('typescript');
require.extensions['.ts']=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,f);
const {places}=require('../data/places.ts');
const origin='http://127.0.0.1:3107',output=path.join(__dirname,'../test-results/place-mobile');
fs.mkdirSync(output,{recursive:true});
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3107'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});
let serverLog='';for(const stream of [server.stdout,server.stderr])stream.on('data',chunk=>{serverLog=(serverLog+chunk.toString()).slice(-8000);});
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 let browser;const results=[];
 try{
  for(let attempt=0;attempt<60;attempt++){
   if(server.exitCode!==null)throw new Error('Preview server exited: '+serverLog);
   try{const r=await fetch(origin+'/fr/place/chapelle-sainte-anne-saint-tropez');if(r.ok)break;}catch{}
   if(attempt===59)throw new Error('Preview server not ready: '+serverLog);await pause(500);
  }
  browser=await webkit.launch({headless:true});
  const representative=['eglise-notre-dame-assomption-saint-tropez','domaine-de-la-croix','cap-taillat','pampelonne','citadelle-saint-tropez','cogolin-village'];
  for(const width of [320,375,390,430,768,1280]){
   const context=await browser.newContext({viewport:{width,height:844},isMobile:width<768,hasTouch:width<768,deviceScaleFactor:2,locale:'fr-FR',reducedMotion:'reduce'});
   // Keep the audit deterministic: maps/auth/analytics are external to this layout test.
   await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
   const page=await context.newPage();
   const cases=width===375?places.flatMap(p=>['fr','en'].map(locale=>({id:p.id,locale}))):representative.flatMap(id=>['fr','en'].map(locale=>({id,locale})));
   for(const {id,locale} of cases){
    let response;
    try{
     response=await page.goto(`${origin}/${locale}/place/${id}`,{waitUntil:'domcontentloaded'});
     assert.equal(response.status(),200,`${id}/${locale}: page response`);
     await page.locator('h1').waitFor();
     // Lazy photos are checked too, even when their figure begins below the fold.
     await page.locator('img').evaluateAll(images=>images.forEach(image=>{image.loading='eager';}));
     await page.waitForFunction(()=>[...document.images].every(image=>image.complete),{},{timeout:15000});
     const state=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].map(image=>({src:image.currentSrc,ok:image.naturalWidth>0,width:image.getBoundingClientRect().width,height:image.getBoundingClientRect().height})),overflow:[...document.querySelectorAll('.place-page h1,.place-page h2,.place-page figure,.place-page iframe')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left< -1||r.right>innerWidth+1);}).map(e=>({tag:e.tagName,text:e.textContent?.slice(0,90),width:e.getBoundingClientRect().width}))}));
     assert.ok(state.scroll<=width+1&&state.viewport<=width+1,`${id}/${locale}/${width}: horizontal overflow ${JSON.stringify(state)}`);
     assert.deepEqual(state.overflow,[],`${id}/${locale}/${width}: heading, photo or map outside viewport`);
     assert.ok(state.images.every(image=>image.ok),`${id}/${locale}/${width}: broken image ${JSON.stringify(state.images.filter(image=>!image.ok))}`);
     const gallery=page.locator('[aria-roledescription="carousel"],[aria-roledescription="carrousel"]');
     if(await gallery.count()){
      const image=gallery.locator('img').first();const box=await image.boundingBox();
      assert.ok(box&&box.width>100&&box.height>100,`${id}/${locale}: gallery has a stable image area`);
      if(width<768)assert.ok(Math.abs(box.width/box.height-1.5)<.03,`${id}: landscape mobile photo`);
     }
     if(width===390&&locale==='fr')await page.screenshot({path:path.join(output,id+'.png')});
     results.push({id,locale,width,images:state.images.length,status:'passed'});
    }catch(error){await page.screenshot({path:path.join(output,`failure-${id}-${locale}-${width}.png`),fullPage:true}).catch(()=>{});throw error;}
   }
   // Check the interactive gallery in the iPhone-sized layout, including its dialog.
   if(width===390){
    await page.goto(origin+'/fr/place/cap-taillat',{waitUntil:'networkidle'});
    const next=page.getByRole('button',{name:'Photo suivante',exact:true});
    if(await next.count()){const image=page.locator('[aria-roledescription="carrousel"] img');const before=await image.getAttribute('src');await next.click();assert.notEqual(await image.getAttribute('src'),before);}
    await page.getByRole('button',{name:/^Ouvrir la photo/}).click();
    const dialog=page.getByRole('dialog');assert.equal(await dialog.isVisible(),true);
    const bounds=await dialog.boundingBox();assert.ok(bounds.width<=width+1&&Math.abs(bounds.x)<1);
    await page.getByRole('button',{name:'Fermer ×',exact:true}).click();assert.equal(await dialog.isVisible(),false);
   }
   await context.close();
  }
  console.log(`Mobile place pages: ${results.length} rendered checks passed in WebKit, FR/EN, widths 320–1280, local photos and gallery dialog.`);
 }finally{
  fs.writeFileSync(path.join(output,'results.json'),JSON.stringify(results,null,2)+'\n');
  if(browser)await browser.close();server.kill('SIGTERM');
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
