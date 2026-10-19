/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),{webkit}=require('playwright');
const origin='http://127.0.0.1:3110',out=path.join(__dirname,'../test-results/cinema');fs.mkdirSync(out,{recursive:true});
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3110'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});let logs='';for(const s of [server.stdout,server.stderr])s.on('data',c=>{logs=(logs+c).slice(-6000);});
(async()=>{let browser;try{
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw new Error(logs);try{const r=await fetch(origin+'/fr/whats-on');if(r.ok)break;}catch{}if(i===59)throw new Error('Agenda not ready: '+logs);await new Promise(r=>setTimeout(r,500));}
 browser=await webkit.launch();
 for(const width of [375,390])for(const locale of ['fr','en']){
  const fr=locale==='fr',context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,reducedMotion:'reduce'});
  await context.route('**/*',route=>{const u=new URL(route.request().url());return u.origin===origin||['images.monnaie-services.com','fr.web.img3.acsta.net','fr.web.img6.acsta.net','cinemedia.cine.digital'].includes(u.hostname)?route.continue():route.abort();});
  const page=await context.newPage();await page.goto(origin+'/'+locale+'/whats-on',{waitUntil:'networkidle'});
  await page.getByRole('button',{name:fr?'Cinéma':'Cinema',exact:true}).click();
  const panel=page.getByRole('region',{name:fr?'Les cinémas du Golfe':'Cinemas around the Golfe'});assert.equal(await panel.isVisible(),true);assert.equal(await panel.locator('a').count(),4);
  await page.locator('img').evaluateAll(images=>images.forEach(i=>{i.loading='eager';}));await page.waitForTimeout(750);
  const bounds=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(bounds.width<=width+1&&bounds.scroll<=width+1,JSON.stringify(bounds));
  await panel.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`cinema-${locale}-${width}.png`)});
  const firstCard=page.locator("[data-agenda-featured],[data-agenda-event]").first();if(await firstCard.count()){await firstCard.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`film-${locale}-${width}.png`)});}
  await page.locator('#agenda-location').selectOption('Cogolin');assert.equal(await panel.locator('a').count(),1);assert.match(await panel.innerText(),/Raimu/);
  await page.getByRole('button',{name:new RegExp(fr?'Aujourd’hui':'Today')}).click();
  const cards=page.locator('[data-agenda-featured],[data-agenda-event]');for(const card of await cards.all())assert.match(await card.innerText(),/Cogolin/);
  await context.close();
 }
 console.log('Cinema mobile WebKit: FR/EN at 375/390px, inline category, four official programme links, town/date filters and horizontal bounds passed.');
}finally{if(browser)await browser.close();server.kill('SIGTERM');}})().catch(e=>{console.error(e);process.exitCode=1;});
