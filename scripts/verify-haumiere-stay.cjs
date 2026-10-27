/* eslint-disable @typescript-eslint/no-require-imports */
// Isolated public-calendar simulations: no enquiry is sent to a live service.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),ts=require('typescript'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
function harness(calendarResult){
 let values=[],cursor=0,effects=[];
 const hooks={...React,useState(initial){const i=cursor++;if(!(i in values))values[i]=initial;return[values[i],next=>{values[i]=typeof next==='function'?next(values[i]):next;}];},useEffect(fn){effects.push(fn);}};
 const cache=new Map();
 function load(relative){const file=path.resolve(__dirname,'..',relative)+(path.extname(relative)?'':'.ts');if(cache.has(file))return cache.get(file);if(file.endsWith('.css'))return {default:new Proxy({},{get:(_,key)=>String(key)})};const m={exports:{}};cache.set(file,m.exports);
  new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText)(id=>id==='react'?hooks:id.endsWith('villaCalendarStore')?{loadVillaCalendar:async()=>{if(calendarResult instanceof Error)throw calendarResult;return calendarResult;}}:id.endsWith('localCalendar')?{parisIsoDay:()=> '2026-10-27'}:id.endsWith('/supabase')||id==='./supabase'?{supabase:{}}:id.startsWith('.')?load(path.resolve(path.dirname(file),id+(fs.existsSync(path.resolve(path.dirname(file),id)+'.tsx')?'.tsx':''))):require(id),m,m.exports);
  return m.exports;
 }
 const Planner=load('components/VillaStayPlanner.tsx').default;
 const props={id:'property-1791045878043',guests:8,today:'2026-10-27',locale:'fr'};
 return {load,render(extra={}){cursor=0;return Planner({...props,...extra});},async settle(){effects.shift()();await Promise.resolve();await Promise.resolve();}};
}
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
const text=e=>typeof e==='string'||typeof e==='number'?String(e):Array.isArray(e)?e.map(text).join(''):e?.props?text(e.props.children):'';
const find=(tree,predicate)=>nodes(tree).find(predicate);
function set(h,name,value){find(h.render(),n=>n.props?.name===name).props.onChange({target:{value}});}
function submit(h){let prevented=false;find(h.render(),n=>n.type==='form').props.onSubmit({preventDefault(){prevented=true;}});return prevented;}
const calendar={listing_id:'property-1791045878043',enabled:true,blocks:[{start:'2026-11-10',end:'2026-11-17'}],updated_at:'2026-10-27T00:00:00Z'};
(async()=>{
 for(const value of [null,{...calendar,enabled:false},new Error('CALENDAR_UNAVAILABLE')]){
  const h=harness(value);assert.match(text(h.render()),/Chargement du calendrier/);await h.settle();let tree=h.render();assert.match(text(tree),/Disponibilités à confirmer/);assert.equal(nodes(tree).filter(n=>n.props?.role==='table').length,0);
  set(h,'arrival','2026-11-18');set(h,'departure','2026-11-25');set(h,'guests','4');assert.equal(submit(h),false);assert.match(text(h.render()),/7 nuits · 4/);
 }
 const h=harness(calendar);h.render();await h.settle();let tree=h.render();
 find(tree,n=>n.props?.['aria-label']==='Mois suivant').props.onClick();tree=h.render();assert.match(text(tree),/novembre 2026/);assert.ok(find(tree,n=>n.props?.['aria-label']==='2026-11-10 · Nuit indisponible'));
 set(h,'arrival','2026-11-09');set(h,'departure','2026-11-11');assert.equal(submit(h),true);assert.match(text(h.render()),/nuits indisponibles/);
 set(h,'arrival','2026-11-07');set(h,'departure','2026-11-10');assert.equal(submit(h),false,'Checkout at the first blocked night is allowed');
 set(h,'arrival','2026-11-17');set(h,'departure','2026-11-20');assert.equal(submit(h),false,'Arrival on the previous departure day is allowed');
 set(h,'guests','9');assert.equal(submit(h),true);set(h,'guests','4');set(h,'arrival','2026-10-26');assert.equal(submit(h),true);
 set(h,'arrival','2026-12-01');assert.equal(find(h.render(),n=>n.props?.name==='departure').props.value,'','Moving arrival beyond departure resets departure');
 tree=h.render({locale:'en'});assert.match(text(tree),/Request a quote/);assert.equal(find(tree,n=>n.type==='form').props.action,'/en/villa/property-1791045878043/contact');assert.equal(find(tree,n=>n.type==='form').props.method,'get');
 const Panel=h.load('components/VillaStayPanel.tsx').default,Gallery=h.load('components/VillaGallery.tsx').default;
 const villa={id:'property-1791045878043',name:'Mas de la Haumière',guests:8,price:3500,location:'Le Plan de la Tour',bedrooms:4,bathrooms:2,description:'Maison test',amenities:[],highlights:[],photos:[{src:'/a.jpg',alt:'A'},{src:'/b.jpg',alt:'B'},{src:'/c.jpg',alt:'C'}],live:true};
 const html=renderToStaticMarkup(React.createElement(Panel,{villa,askHref:'/fr/ask',withDates:true}));assert.match(html,/À partir de/);assert.ok(!html.includes('base 7 nuits'));assert.ok(!html.includes('€ / nuit'));assert.match(html,/href="#disponibilites"/);
 const all=renderToStaticMarkup(React.createElement(Gallery,{name:villa.name,photos:villa.photos,layout:'all'}));assert.ok(!all.includes('fetchPriority="high"'));assert.ok(!all.includes('Voir les 3 photos'));assert.equal((all.match(/Voir la photo [123] de/g)||[]).length,3);
 const Detail=h.load('components/VillaDetail.tsx').default;
 for(const id of [villa.id,'property-another']){const page=renderToStaticMarkup(React.createElement(Detail,{villa:{...villa,id},today:'2026-10-27'}));assert.equal(page.includes('id="disponibilites"'),id===villa.id);assert.equal(page.includes('id="photos"'),id===villa.id);}
 console.log('PASS: Haumière scope, unknown/disabled/failed calendars, blocked nights, checkout boundaries, date and capacity validation, FR/EN GET handoff, price and complete lazy gallery.');
})().catch(error=>{console.error(error);process.exitCode=1;});
