/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),{webkit}=require('playwright');
const origin='http://127.0.0.1:3111',out=path.join(__dirname,'../test-results/discovery-map');fs.mkdirSync(out,{recursive:true});
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3111'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});let logs='';for(const s of [server.stdout,server.stderr])s.on('data',c=>{logs=(logs+c).slice(-6000);});
(async()=>{let browser;try{
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw new Error(logs);try{if((await fetch(origin+'/fr/carte-touristique')).ok)break;}catch{}if(i===59)throw new Error('Map not ready: '+logs);await new Promise(r=>setTimeout(r,500));}
 browser=await webkit.launch();
 for(const width of [375,1280])for(const locale of ['fr','en']){
  const fr=locale==='fr',context=await browser.newContext({viewport:{width,height:900},isMobile:width<600,hasTouch:width<600,deviceScaleFactor:1,reducedMotion:'reduce'});
  await context.route('**/*',route=>new URL(route.request().url()).origin===origin?route.continue():route.abort());
  const page=await context.newPage();await page.goto(origin+'/'+locale+'/carte-touristique',{waitUntil:'networkidle'});
  const section=page.getByRole('region',{name:fr?'Carte interactive des adresses du Golfe':'Interactive map of Golfe places',exact:true});
  const map=section.getByRole('region',{name:fr?'Carte déplaçable, utiliser les boutons plus et moins pour zoomer':'Pannable map, use plus and minus to zoom',exact:true});
  await map.scrollIntoViewIfNeeded();await page.waitForTimeout(150);
  const marker=map.locator('[data-map-place="domaine-de-la-croix"]');await marker.click();
  const popup=section.locator('#discovery-map-preview');await popup.waitFor({state:'visible'});
  assert.match(await popup.getByRole('heading').innerText(),/Domaine de La Croix/i);
  const link=popup.getByRole('link',{name:fr?'Voir la fiche':'View place'});assert.equal(await link.getAttribute('href'),'/'+locale+'/place/domaine-de-la-croix');
  await page.waitForFunction(()=>{const img=document.querySelector('#discovery-map-preview img');return img?.complete&&img.naturalWidth>0;});
  assert.ok(await popup.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0));
  const box=await popup.boundingBox(),mapBox=await map.boundingBox(),linkBox=await link.boundingBox();
  assert.ok(box.x>=mapBox.x&&box.x+box.width<=mapBox.x+mapBox.width+1&&box.y>=mapBox.y&&box.y+box.height<=mapBox.y+mapBox.height+1,JSON.stringify({box,mapBox}));
  assert.ok(linkBox.y+linkBox.height<=box.y+box.height+1,'View place must be visible without scrolling the popup');
  await page.screenshot({path:path.join(out,`preview-${locale}-${width}.png`)});
  await map.getByRole('button',{name:fr?'Zoomer':'Zoom in',exact:true}).click();assert.equal(await popup.isVisible(),true);
  await link.focus();await page.keyboard.press('Escape');assert.equal(await popup.count(),0);assert.equal(await marker.evaluate(el=>el===document.activeElement),true);
  await marker.click();await popup.getByRole('button',{name:fr?'Fermer l’aperçu':'Close preview'}).click();assert.equal(await popup.count(),0);
  await marker.click();await section.getByRole('button',{name:'Restaurants',exact:true}).click();assert.equal(await popup.count(),0);
  assert.ok((await section.locator('[data-map-place]').count())>0);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.goto(origin+'/'+locale+'/explore',{waitUntil:'networkidle'});const exploreColor=await page.locator('main').evaluate(el=>getComputedStyle(el).backgroundColor);
  const order=()=>page.locator('.explore-card-link').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
  const firstOrder=await order();assert.ok(firstOrder.length>50);await page.reload({waitUntil:'networkidle'});const nextOrder=await order();assert.deepEqual([...firstOrder].sort(),[...nextOrder].sort());assert.notDeepEqual(firstOrder,nextOrder,'Explorer reload shuffles the same linked places');

  await page.goto(origin+'/'+locale+'/stay',{waitUntil:'networkidle'});const stayColor=await page.locator('main').evaluate(el=>getComputedStyle(el).backgroundColor);assert.equal(exploreColor,stayColor);assert.equal(stayColor,'rgb(253, 252, 249)');
  await context.close();
 }
 console.log('Discovery map WebKit: FR/EN at 375/1280px, photo/title/link overlay inside map, visible action, zoom, close/Escape/focus return, category change, page bounds and matching Explorer/Stay backgrounds passed.');
}finally{if(browser)await browser.close();server.kill('SIGTERM');}})().catch(e=>{console.error(e);process.exitCode=1;});
