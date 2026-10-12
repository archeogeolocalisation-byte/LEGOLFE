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
    assert.ok(detail.includes(`action="${villaHref(villa.id,locale,true)}"`));
    assert.ok(detail.includes(locale==='en'?'Request availability':'Demander les disponibilités'));
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
console.log('Villas: six catalogs/details in FR/EN, localized contact URLs, language switch, prefilled dates and English validation passed.');
