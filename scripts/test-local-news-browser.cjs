/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),{webkit}=require('playwright');
const origin='http://127.0.0.1:3114',out=path.join(__dirname,'../test-results/local-news');fs.mkdirSync(out,{recursive:true});
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3114'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});let logs='';for(const stream of [server.stdout,server.stderr])stream.on('data',c=>{logs=(logs+c).slice(-6000);});
(async()=>{let browser;try{
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw new Error(logs);try{if((await fetch(origin+'/fr/contact')).ok)break;}catch{}if(i===59)throw new Error('Server not ready: '+logs);await new Promise(r=>setTimeout(r,500));}
 browser=await webkit.launch();
 for(const width of [375,390])for(const locale of ['fr','en']){
  const fr=locale==='fr',context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  const page=await context.newPage();await page.goto(origin+'/'+locale+'/local',{waitUntil:'networkidle'});
  const fresh=page.locator('[data-local-news="croix-mediatheque-travaux-2026"]');assert.equal(await fresh.count(),1);
  await page.getByRole('button',{name:fr?'Du nouveau':'What’s new',exact:true}).click();
  await page.getByLabel(fr?'Commune':'Place').selectOption('La Croix-Valmer');
  assert.equal(await page.locator('[data-local-news]').count(),1);assert.equal(await fresh.isVisible(),true);
  await fresh.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`local-filters-${locale}-${width}.png`)});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'filtered news fits iPhone width');
  const feeds=page.locator('#local-feeds');assert.equal(await feeds.locator('section').count(),15);
  for(const url of ['https://www.cavalaire.fr/actualites','https://www.mairie-grimaud.com/','https://www.lacroixvalmer.fr/Actualites','https://www.rayol-canadel.fr/fr/actualites.htm','https://www.lgf83.fr/','https://www.ramatuelle.fr/'])assert.equal(await feeds.locator(`a[href="${url}"]`).count(),1);
  await feeds.scrollIntoViewIfNeeded();await page.screenshot({path:path.join(out,`local-sources-${locale}-${width}.png`)});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'official source cards fit iPhone width');
  await page.goto(origin+'/'+locale+'/local/archives/2026-10',{waitUntil:'networkidle'});
  assert.equal(await page.locator('#local-feeds').count(),0);assert.equal(await fresh.count(),1);
  assert.match(await page.locator('main').innerText(),fr?/Édition historique/:/Historical edition/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'archive fits iPhone width');
  await context.close();
 }
 console.log('Local news WebKit: FR/EN at 375/390px, category/town filters, 15 official sources, direct municipal links, durable archive and horizontal bounds passed.');
}finally{if(browser)await browser.close();server.kill('SIGTERM');}})().catch(error=>{console.error(error);process.exitCode=1;});
