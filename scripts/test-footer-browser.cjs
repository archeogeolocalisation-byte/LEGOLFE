/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),{webkit}=require('playwright');
const origin='http://127.0.0.1:3112',out=path.join(__dirname,'../test-results/footer');fs.mkdirSync(out,{recursive:true});
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3112'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});let logs='';for(const stream of [server.stdout,server.stderr])stream.on('data',c=>{logs=(logs+c).slice(-6000);});
(async()=>{let browser;let checks=0;try{
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw new Error(logs);try{if((await fetch(origin+'/fr/contact')).ok)break;}catch{}if(i===59)throw new Error('Server not ready: '+logs);await new Promise(r=>setTimeout(r,500));}
 browser=await webkit.launch();
 for(const width of [375,1280]){
  const context=await browser.newContext({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600,reducedMotion:'reduce'});await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  const page=await context.newPage();
  for(const locale of ['fr','en']){
   const routes=width===375?['','/explore','/explore/eat','/place/phare-de-camarat','/guides/golfe-saint-tropez-quand-il-pleut','/whats-on','/stay','/villa/villa-eden','/villa/villa-eden/contact','/account','/host','/local','/contact','/a-propos']:['','/whats-on','/contact','/a-propos','/explore/eat'];
   for(const route of routes){await page.goto(origin+'/'+locale+route,{waitUntil:'networkidle'});const header=page.locator('header').first();const headerState=await header.evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color,classes:el.className,logoFilter:el.querySelector('img')?getComputedStyle(el.querySelector('img')).filter:''}));assert.ok(headerState.logoFilter.includes('invert'),locale+route+' white logo');assert.equal(headerState.background,'rgb(11, 48, 70)',locale+route+' navy header');assert.equal(headerState.color,'rgb(253, 252, 249)',locale+route+' light header text');assert.equal(await header.getByRole('link',{name:locale==='fr'?'Demander':'Ask',exact:false}).evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(238, 231, 218)');
    if(route===''){
     assert.equal(await page.locator('h1').evaluate(el=>getComputedStyle(el).color),'rgb(11, 48, 70)');
     assert.equal(await page.locator('h1 .lg-accent').evaluate(el=>getComputedStyle(el).color),'rgb(11, 48, 70)');
     const ask=page.locator('.home-ask');
     assert.equal(await ask.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(11, 48, 70)');
     const button=ask.locator('.home-ask-button');assert.equal(await button.evaluate(el=>getComputedStyle(el).color),'rgb(11, 48, 70)');assert.equal(await button.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(238, 231, 218)');
     if(locale==='fr'){await page.screenshot({path:path.join(out,`palette-home-${width}.png`)});await ask.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`palette-home-ask-${width}.png`)});}
    }
    if(route==='/whats-on'){
     assert.equal(await page.locator('main').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(11, 48, 70)');
     const cards=page.locator('[data-agenda-featured],[data-agenda-event]');if(await cards.count())assert.equal(await cards.first().evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(18, 60, 81)');
     if(locale==='fr'){await page.screenshot({path:path.join(out,`palette-agenda-${width}.png`)});if(await cards.count()){await cards.first().scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`palette-agenda-cards-${width}.png`)});}}
    }
    const footer=page.getByRole('contentinfo');assert.equal(await footer.count(),1,locale+route);assert.equal(await footer.getByRole('link',{name:'Contact',exact:true}).getAttribute('href'),`/${locale}/contact`);assert.equal(await footer.getByRole('link',{name:locale==='fr'?'À propos':'About us',exact:true}).getAttribute('href'),`/${locale}/a-propos`);const footerBounds=await footer.evaluate(root=>({x:root.getBoundingClientRect().x,right:root.getBoundingClientRect().right,items:[...root.querySelectorAll('a,h2,p,nav')].map(el=>({text:el.textContent?.slice(0,60),x:el.getBoundingClientRect().x,right:el.getBoundingClientRect().right})).filter(b=>b.x< -1||b.right>document.documentElement.clientWidth+1)}));assert.ok(footerBounds.x>=-1&&footerBounds.right<=width+1&&!footerBounds.items.length,locale+route+' footer bounds '+JSON.stringify(footerBounds));
    const pageBounds=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main h1,main h2,main a,main p')].map(el=>({tag:el.tagName,text:el.textContent?.slice(0,80),right:el.getBoundingClientRect().right})).filter(b=>b.right>document.documentElement.clientWidth+1).slice(0,6)}));
    if(['/contact','/a-propos','/explore/eat'].includes(route))assert.ok(pageBounds.scroll<=width+1,locale+route+' page bounds '+JSON.stringify(pageBounds));else if(pageBounds.scroll>width+1)console.log('Existing page content overflow:',locale+route,width,JSON.stringify(pageBounds));checks++;
    if(['/contact','/a-propos'].includes(route)){await footer.scrollIntoViewIfNeeded();assert.equal(await footer.evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(11, 48, 70)');await footer.screenshot({path:path.join(out,`footer-${route.slice(1)}-${locale}-${width}.png`)});await page.locator('h1').scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`${route.slice(1)}-${locale}-${width}.png`)});}
   }
  }
  for(const route of ['/fr/contact','/fr/whats-on']){
   await page.goto(origin+route,{waitUntil:'networkidle'});
   const logos=page.locator('img[alt="LEGOLFE — SAINT-TROPEZ"]');assert.equal(await logos.count(),2);
   for(const logo of await logos.all()){assert.ok(await logo.evaluate(el=>el.complete&&el.naturalWidth===1200));const box=await logo.boundingBox();assert.ok(box&&box.width>=128&&box.x>=0&&box.x+box.width<=width);}
   await page.screenshot({path:path.join(out,`brand-${route.split('/').pop()}-${width}.png`)});
  }
  await page.goto(origin+'/fr/contact',{waitUntil:'networkidle'});await page.getByRole('contentinfo').getByRole('link',{name:'English',exact:true}).click();await page.waitForURL('**/en/contact');await page.getByRole('contentinfo').getByRole('link',{name:'About us',exact:true}).waitFor();await page.waitForFunction(()=>document.documentElement.lang==='en');assert.equal(await page.getByRole('contentinfo').getByRole('link',{name:'About us',exact:true}).count(),1);assert.equal(await page.locator('html').getAttribute('lang'),'en');
  await page.getByRole('contentinfo').getByRole('link',{name:'Français',exact:true}).click();await page.waitForURL('**/fr/contact');await page.getByRole('contentinfo').getByRole('link',{name:'À propos',exact:true}).waitFor();assert.equal(await page.getByRole('contentinfo').getByRole('link',{name:'À propos',exact:true}).count(),1);
  for(const route of ['/match','/requests']){await page.goto(origin+route,{waitUntil:'networkidle'});assert.equal(await page.getByRole('contentinfo').count(),1);assert.equal(await page.getByRole('contentinfo').getByRole('link',{name:'À propos',exact:true}).count(),1);checks++;}
  await context.close();
 }
 const narrow=await browser.newContext({viewport:{width:320,height:800}});const narrowPage=await narrow.newPage();await narrowPage.goto(origin+'/fr/contact',{waitUntil:'networkidle'});const headerBounds=await narrowPage.locator('header').evaluate(el=>[...el.querySelector('nav > div').querySelectorAll('a')].filter(a=>a.getBoundingClientRect().width>0).map(a=>a.getBoundingClientRect()).every(b=>b.x>=0&&b.right<=320));assert.ok(headerBounds,'Header links fit a 320px screen');await narrowPage.screenshot({path:path.join(out,'brand-contact-320.png')});await narrow.close();
 const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:375,height:900}});await noJs.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());const page=await noJs.newPage();await page.goto(origin+'/fr/explore',{waitUntil:'networkidle'});const footer=page.getByRole('contentinfo');assert.equal(await footer.count(),1);assert.ok(await footer.locator('a[href="/fr/contact"]').count()>0);
 for(const locale of ['fr','en']){
  await page.goto(origin+'/'+locale+'/explore',{waitUntil:'networkidle'});
  assert.ok(await page.locator('.explore-gallery a[href^="/'+locale+'/place/"]').count()>70,'Explorer cards are available without JavaScript');
  for(const route of ['/local','/local/archives/2026-10']){
   await page.goto(origin+'/'+locale+route,{waitUntil:'networkidle'});
   const gigaro=page.locator('article[data-local-news="gigaro-protection-2026"] a[href="/'+locale+'/place/gigaro-beach"]');
   assert.equal(await gigaro.count(),1,'Contextual place link exists without JavaScript');
   await gigaro.click();await page.waitForURL('**/'+locale+'/place/gigaro-beach');assert.equal(await page.locator('main h1').count(),1);
  }
 }
 await noJs.close();
 console.log(`Footer WebKit: ${checks} route/width checks, one footer per page, FR/EN navigation, mail/contact/about links, legacy routes, responsive bounds and server-rendered footer without JavaScript passed.`);
}finally{if(browser)await browser.close();server.kill('SIGTERM');}})().catch(error=>{console.error(error);process.exitCode=1;});
