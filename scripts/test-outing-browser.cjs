/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),{spawn}=require('node:child_process'),{webkit}=require('playwright');
const origin='http://127.0.0.1:3115';
const server=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--hostname','127.0.0.1','--port','3115'],{stdio:['ignore','pipe','pipe'],env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'}});
let logs='';for(const stream of [server.stdout,server.stderr])stream.on('data',c=>{logs=(logs+c).slice(-6000);});
(async()=>{let browser;try{
 for(let i=0;i<60;i++){if(server.exitCode!==null)throw Error(logs);try{if((await fetch(origin+'/fr/whats-on')).ok)break;}catch{}if(i===59)throw Error(logs);await new Promise(r=>setTimeout(r,500));}
 browser=await webkit.launch();
 for(const width of [375,390])for(const locale of ['fr','en']){
  const fr=locale==='fr',context=await browser.newContext({viewport:{width,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.abort());
  const page=await context.newPage();
  const bounds=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'mobile horizontal bounds');
  await page.goto(origin+'/'+locale,{waitUntil:'networkidle'});
  await page.getByRole('navigation',{name:fr?'Choisir ma sortie':'Choose an outing'}).getByRole('link',{name:new RegExp(fr?'Aujourd’hui':'Today')}).click();
  await page.waitForURL('**/whats-on?range=today');
  assert.equal(await page.getByRole('button',{name:new RegExp(fr?'Aujourd’hui':'Today')}).getAttribute('aria-pressed'),'true');
  await bounds();
  await page.goto(origin+'/'+locale+'/whats-on?range=weekend',{waitUntil:'networkidle'});
  assert.equal(await page.getByRole('button',{name:new RegExp(fr?'Ce week-end':'This weekend')}).getAttribute('aria-pressed'),'true');
  const eventLink=page.locator('[data-agenda-featured] h2 a,[data-agenda-event] h3 a').first();
  if(await eventLink.count()){
   await eventLink.click();await page.waitForURL('**/event/**');
   const save=page.getByRole('button',{name:fr?'Ajouter à mon séjour':'Add to my stay',exact:true}).first();
   await save.click();
   await page.getByRole('link',{name:new RegExp(fr?'Retrouver dans Mon séjour':'View in My stay')}).first().click();
   await page.waitForURL('**/saved#mes-rendez-vous');
   assert.ok(await page.locator('#mes-rendez-vous li').count()>0,'event session saved from its live page');
   await page.goto(origin+'/'+locale+'/whats-on?range=weekend',{waitUntil:'networkidle'});
  }
  // Select a published town/category pair with no events, without assuming a specific live programme.
  const towns=await page.locator('#agenda-location option').evaluateAll(options=>options.map(o=>o.value).filter(v=>v!=='all'));
  let empty=false;
  for(const town of towns){await page.locator('#agenda-location').selectOption(town);await page.getByRole('button',{name:fr?'Nautisme':'Sailing',exact:true}).click();if(await page.locator('[data-agenda-empty]').count()){empty=true;break;}}
  assert.ok(empty,'an empty filtered selection is available');
  const panel=page.locator('[data-agenda-empty]');await bounds();
  await panel.getByRole('link',{name:new RegExp(fr?'Musées':'Museums')}).click();
  await page.waitForURL('**/guides/golfe-saint-tropez-quand-il-pleut');
  await page.locator('#musees a[href*="/place/"]').first().click();await page.waitForURL('**/place/**');
  await page.getByRole('button',{name:fr?'Ajouter à mon séjour':'Add to my stay',exact:true}).click();
  assert.equal(await page.getByRole('button',{name:fr?'Ajouté ✓':'Saved ✓',exact:true}).getAttribute('aria-pressed'),'true');
  await page.goto(origin+'/'+locale+'/saved',{waitUntil:'networkidle'});
  assert.ok((await page.locator('#mes-adresses a[href*="/place/"]').count())>0,'saved place is available in My stay');await bounds();
  // Exact session snapshots survive reloads, distinguish versions and can be removed.
  await page.evaluate(()=>localStorage.setItem('le-golfe-saved-events-v1',JSON.stringify([{id:'test-session',title:'Saved evening',titleFr:'Soirée enregistrée',location:'Cogolin',session:{start:'2099-11-02',time:'18:00',version:'VF'}},{id:'test-session',title:'Saved evening',titleFr:'Soirée enregistrée',location:'Cogolin',session:{start:'2099-11-02',time:'20:00',version:'VO'}}])));
  await page.reload({waitUntil:'networkidle'});
  const saved=page.locator('#mes-rendez-vous');assert.equal(await saved.locator('li').count(),2);assert.match(await saved.innerText(),/18:00/);assert.match(await saved.innerText(),/20:00/);await bounds();
  await saved.getByRole('button',{name:fr?'Retirer':'Remove',exact:true}).first().click();await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('#mes-rendez-vous li').count(),1);
  await context.close();
 }
 console.log('Outing mobile WebKit: home date shortcuts, empty agenda to museum guide to place to My stay, saved session versions/times/reload/remove, FR/EN and 375/390px bounds passed.');
}finally{if(browser)await browser.close();server.kill('SIGTERM');}})().catch(e=>{console.error(e);process.exitCode=1;});
