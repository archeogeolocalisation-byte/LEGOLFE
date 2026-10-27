/* eslint-disable @typescript-eslint/no-require-imports -- verification scripts use CommonJS */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
for (const extension of ['.ts','.tsx']) require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
require.extensions['.css']=module=>{module.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
process.env.NEXT_PUBLIC_SUPABASE_URL='https://example.supabase.co';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY='sb_publishable_ci_dummy';
const { createElement } = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { villaHref } = require('../lib/villaPaths.ts');
const { villas } = require('../data/villas.ts');
const VillaCard = require('../components/VillaCard.tsx').default;
const VillaDetail = require('../components/VillaDetail.tsx').default;
const ContactForm = require('../app/villa/[id]/contact/ContactForm.tsx').default;
for (const villa of villas) {
  for (const locale of ['fr','en']) {
    const card = renderToStaticMarkup(createElement(VillaCard,{villa,locale}));
    assert.ok(card.includes(`href="${villaHref(villa.id,locale)}"`));
    const detail = renderToStaticMarkup(createElement(VillaDetail,{villa:{...villa,photos:[{src:villa.image,alt:villa.name}],amenities:['Pool'],highlights:[]},today:'2026-10-12',locale}));
    assert.equal(detail.includes("<form"),false);
    assert.ok(detail.includes(locale==='fr'?'Exemple de présentation':'Presentation example'));

    if(villa.id==='villa-eden'){
      assert.ok(detail.includes(locale==='fr'?'Trois idées dans la commune':'Three ideas in the town'));
      for(const id of ['pampelonne','ramatuelle-village','moulin-de-paillas'])assert.ok(detail.includes(`href="/${locale}/place/${id}"`));
      assert.ok(detail.includes(locale==='fr'?'Maison de démonstration':'Demonstration home'));
      assert.equal(detail.includes('8 km'),false,'No unverified model distance');
      assert.equal(detail.includes(locale==='fr'?'Voyageurs maximum':'Maximum guests'),false,'Capacity is already in the header');
    }else assert.equal(detail.includes(locale==='fr'?'Trois idées dans la commune':'Three ideas in the town'),false,'Only Eden receives the editorial model');
    if(locale==='en')assert.equal(detail.includes('Choisir mes dates'),false);
  }
}
const contact=renderToStaticMarkup(createElement(ContactForm,{villa:villas[0],today:'2026-10-12',initialDates:{arrival:'2026-11-01',departure:'2026-11-05',guests:'2'},locale:'en'}));
assert.ok(contact.includes('Tell us about your stay.'));
assert.ok(contact.includes('Review my enquiry'));
assert.ok(contact.includes('href="/fr/villa/villa-eden/contact"'));
assert.ok(contact.includes('value="2026-11-01"'));
assert.equal(contact.includes('/fr/en/'),false);
// Public cards expose only declared amenities, save independently of their links,
// and keep samples outside the saving flow.
for(const locale of ['fr','en']){
 const card=renderToStaticMarkup(createElement(VillaCard,{villa:{...villas[0],id:'property-card',amenities:['Pool','Heated pool','Sea view','Garden','Parking'],collection:'charm'},locale}));
 assert.ok(card.includes(locale==='fr'?'Enregistrer Villa Eden dans Mon séjour':'Save Villa Eden to My stay'));
 assert.ok(card.includes(locale==='fr'?'Piscine chauffée':'Heated pool'));
 assert.equal((card.match(/<li>/g)||[]).length,3);
 assert.equal(card.includes(locale==='fr'?'Env.':'Approx.'),false,'Weekly rate remains the primary card price');
 for(const link of card.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g))assert.equal(link[0].includes('<button'),false,'Save is not nested inside a navigation link');
 const demo=renderToStaticMarkup(createElement(VillaCard,{villa:villas[0],locale}));assert.equal(demo.includes('aria-pressed'),false);assert.equal(demo.includes('12 km'),false);
}
const {toggleSavedVilla,readSavedVillaIds}=require('../lib/useSavedVilla.ts');
const stored=new Map();let saveEvents=0;
global.window=Object.assign(new EventTarget(),{localStorage:{getItem:key=>stored.get(key)??null,setItem:(key,value)=>stored.set(key,value)}});
window.addEventListener('le-golfe:saved-villas',()=>saveEvents++);
assert.equal(toggleSavedVilla('property-card'),true);assert.deepEqual(readSavedVillaIds(),['property-card']);
assert.equal(toggleSavedVilla('property-other'),true);assert.equal(toggleSavedVilla('property-card'),false);assert.deepEqual(readSavedVillaIds(),['property-other']);assert.equal(saveEvents,3);
window.localStorage.setItem=()=>{throw new Error('storage disabled');};assert.throws(()=>toggleSavedVilla('property-blocked'),/storage disabled/);assert.equal(saveEvents,3);
delete global.window;
const { validateStayDates }=require('../lib/stayRequest.ts');
assert.equal(validateStayDates({arrival:'2026-11-05',departure:'2026-11-01',guests:'2'},8,'2026-10-12','en'),'Departure must be after arrival.');
const live={...villas[0],id:'property-live',live:true,photos:[{src:'https://example.com/photo.jpg',alt:'House'}],amenities:[],highlights:[]};
for(const locale of ['fr','en']){
 const page=renderToStaticMarkup(createElement(VillaDetail,{villa:live,today:'2026-10-12',locale}));
 assert.equal(page.includes("<form"),false);
 assert.equal(page.includes('type="date"'),false);
 assert.ok(page.includes(`/${locale}/account?next=/villa/property-live`));
 assert.equal(page.includes(locale==='fr'?'Transmettre une demande':'Send an enquiry'),false);
 assert.ok(page.includes(locale==='fr'?'+ Mon séjour':'+ My stay'));
 assert.ok(page.includes(locale==='fr'?'Partager':'Share'));
 assert.equal(page.includes('owner@example.com'),false);
}
const Actions=require('../components/VillaActions.tsx').default;
const actions=renderToStaticMarkup(createElement(Actions,{id:'property-live',name:'Live home',contactHref:'/en/villa/property-live/contact',askHref:'/en/ask',locale:'en'}));
for(const text of ['Request availability','My stay','Share','Ask LE GOLFE','aria-pressed="false"'])assert.ok(actions.includes(text));
assert.equal(actions.includes('Mon séjour'),false);
const profile={id:'11111111-1111-4111-8111-111111111111',name:'Public host',avatarUrl:'https://example.com/avatar.jpg'};
for(const locale of ['fr','en']){
 const page=renderToStaticMarkup(createElement(VillaDetail,{villa:live,today:'2026-10-16',locale,announcerProfile:profile}));
 assert.ok(page.indexOf('id="annonceur"')>page.indexOf('<aside'),'Contact identity is in the right sidebar');
 assert.equal((page.match(/id="annonceur"/g)||[]).length,1);
 assert.equal((page.match(/class="villa-direct-contact"/g)||[]).length,1,'One contact reveal panel');
 assert.ok(page.includes(`href="/${locale}/member/${profile.id}"`));
 assert.ok(page.includes('https://example.com/avatar.jpg'));
}
const {safeReturnPath}=require('../lib/security.ts');
assert.equal(safeReturnPath('/villa/property-live'),'/villa/property-live');
assert.equal(safeReturnPath('/villa/../../account'),'');
const {actOnBooking}=require('../lib/villaBookingStore.ts');
void assert.rejects(actOnBooking('id','confirm',null,'100','terms',true),/BOOKING_DISABLED_DURING_PILOT/).then(()=>console.log('Villas: FR/EN examples, live enquiry/contact paths, privacy, safe return links and booking mutation disabled passed.')).catch(error=>{console.error(error);process.exitCode=1;});

// Editorial layout is limited to the demonstration, with explicit unknowns and
// no invented rental action, additional photo, proximity or repeated paragraph.
for(const locale of ['fr','en']){
 const demo={...villas[0],photos:[{src:villas[0].image,alt:'Presentation photo'}],amenities:['Pool','Heated pool','Sea view','Quiet setting'],highlights:[]};
 const html=renderToStaticMarkup(createElement(VillaDetail,{villa:demo,today:'2026-10-27',locale}));
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
 for(const id of ['la-maison','equipements','a-savoir','le-secteur'])assert.ok(html.includes(`id="${id}"`));
 assert.equal(html.includes('type="date"'),false);assert.equal(html.includes('<form'),false);assert.equal(html.includes('aria-pressed'),false);
 assert.equal(html.includes(locale==='fr'?'Tarif d’illustration':'Illustrative rate'),false);assert.equal(html.includes('€'),false);
 assert.ok(html.includes(locale==='fr'?'dispositif de sécurité':'safety system'));
 assert.ok(html.includes(locale==='fr'?'Voir la photo':'View photo'));assert.equal(html.includes(locale==='fr'?'Voir les 5 photos':'Show all 5 photos'),false);
 const equipment=html.split('id="equipements"')[1].split('</section>')[0];assert.ok(equipment.includes(locale==='fr'?'Piscine chauffée':'Heated pool'));assert.equal(equipment.includes(locale==='fr'?'> Piscine</li>':'> Pool</li>'),false);
 const paragraphs=[...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>m[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim()).filter(text=>text.length>=100);assert.equal(new Set(paragraphs).size,paragraphs.length);
 const preview=renderToStaticMarkup(createElement(VillaDetail,{villa:demo,today:'2026-10-27',locale,preview:true}));assert.ok(preview.includes(locale==='fr'?'APERÇU — AUCUN ENVOI':'PREVIEW — NO SUBMISSION'));assert.equal(preview.includes(locale==='fr'?'Tarif d’illustration':'Illustrative rate'),false);
}
