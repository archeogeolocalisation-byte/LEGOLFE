/* eslint-disable @typescript-eslint/no-require-imports -- verification scripts use CommonJS */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
for (const extension of ['.ts','.tsx']) require.extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
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
const { validateStayDates }=require('../lib/stayRequest.ts');
assert.equal(validateStayDates({arrival:'2026-11-05',departure:'2026-11-01',guests:'2'},8,'2026-10-12','en'),'Departure must be after arrival.');
const live={...villas[0],id:'property-live',live:true,photos:[{src:'https://example.com/photo.jpg',alt:'House'}],amenities:[],highlights:[]};
for(const locale of ['fr','en']){
 const page=renderToStaticMarkup(createElement(VillaDetail,{villa:live,today:'2026-10-12',locale}));
 assert.ok(page.includes(`action="${villaHref(live.id,locale,true)}"`));
 assert.ok(page.includes(`/${locale}/account?next=/villa/property-live`));
 assert.ok(page.includes(locale==='fr'?'Transmettre une demande':'Send an enquiry'));
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
