/* eslint-disable @typescript-eslint/no-require-imports */
// Render public pages without contacting Supabase or sending an enquiry.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),ts=require('typescript'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const cache=new Map();
function load(relative){
 const file=path.resolve(__dirname,'..',relative)+(path.extname(relative)?'':'.ts');
 if(cache.has(file))return cache.get(file);
 if(file.endsWith('.css'))return {default:new Proxy({},{get:(_,key)=>String(key)})};
 const m={exports:{}};cache.set(file,m.exports);
 new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText)(id=>{
  if(id.endsWith('villaCalendarStore'))return {loadVillaCalendar:()=>{throw new Error('Unexpected calendar read on a public detail page');}};
  if(id.endsWith('/supabase')||id==='./supabase')return {supabase:{}};
  return id.startsWith('.')?load(path.resolve(path.dirname(file),id+(fs.existsSync(path.resolve(path.dirname(file),id)+'.tsx')?'.tsx':''))):require(id);
 },m,m.exports);
 return m.exports;
}
const Detail=load('components/VillaDetail.tsx').default,Contact=load('app/villa/[id]/contact/ContactForm.tsx').default;
const photos=[{src:'/a.jpg',alt:'A'},{src:'/b.jpg',alt:'B'},{src:'/c.jpg',alt:'C'}];
const base={id:'property-1791045878043',name:'Mas de la Haumière',guests:8,price:3500,location:'Le Plan de la Tour',bedrooms:4,bathrooms:2,description:'Maison test',amenities:[],highlights:[],photos,live:true};
let checks=0;
function noPriceOrCalendar(html){for(const value of ['€','id="disponibilites"','type="date"','Choisir mes dates','Choose my dates','Prix sur demande','Price on request']){assert.ok(!html.includes(value),`Unexpected detail content: ${value}`);checks++;}}
for(const locale of ['fr','en']){
 for(const id of [base.id,'property-another']){
  const villa={...base,id};
  const html=renderToStaticMarkup(React.createElement(Detail,{villa,today:'2026-10-27',locale}));
  noPriceOrCalendar(html);assert.match(html,/href="#annonceur"/);assert.match(html,/villa-mobile-contact/);assert.match(html,/villa-contact-card/);assert.equal(html.includes('id="photos"'),id===base.id);checks+=4;
  const preview=renderToStaticMarkup(React.createElement(Detail,{villa,today:'2026-10-27',locale,preview:true}));noPriceOrCalendar(preview);
 }
 const villas=load('data/villas.ts').villas;
 for(const villa of villas){const html=renderToStaticMarkup(React.createElement(Detail,{villa:{...villa,photos,amenities:[],highlights:[]},today:'2026-10-27',locale}));noPriceOrCalendar(html);}
 const contact=renderToStaticMarkup(React.createElement(Contact,{villa:{...base,image:'/a.jpg'},today:'2026-10-27',initialDates:{arrival:'',departure:'',guests:'2'},locale}));assert.ok(!contact.includes('€'));assert.ok(!contact.includes('3 500'));checks+=2;
}
assert.ok(!fs.readFileSync(path.resolve(__dirname,'../components/VillaDetail.tsx'),'utf8').includes('VillaStayPlanner'));checks++;
console.log(`PASS: ${checks} checks — FR/EN live, preview and demonstration details have no price or calendar; direct contact, mobile CTA and Haumière gallery retained; contact page hides the amount.`);
