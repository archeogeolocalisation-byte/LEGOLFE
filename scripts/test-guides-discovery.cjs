/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript'),React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
for(const ext of ['.ts','.tsx'])require.extensions[ext]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,f);
require.extensions['.webp']=(m,f)=>{m.exports={src:'/media/'+path.basename(f),width:1200,height:800};};
require.extensions['.css']=m=>{m.exports={};};
let state=[],cursor=0,effects=[];
const hooks={...React,useState(initial){const i=cursor++;if(!(i in state))state[i]=initial;return[state[i],next=>{state[i]=typeof next==='function'?next(state[i]):next;}];},useEffect(fn){effects.push(fn);}};
const original=Module._load;
function interactive(relative){const file=path.resolve(__dirname,relative),m=new Module(file);m.filename=file;m.paths=Module._nodeModulePaths(path.dirname(file));Module._load=function(request,parent,...rest){if(parent?.filename===file&&request==='react')return hooks;return original.call(this,request,parent,...rest);};try{m._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,file);}finally{Module._load=original;}return m.exports;}
const nodes=e=>!e||typeof e!=='object'?[]:Array.isArray(e)?e.flatMap(nodes):[e,...nodes(e.props?.children)];
function render(C,props){cursor=0;effects=[];return C(props);}
const {guides}=require('../data/guides.ts'),{topicsForGuide,guideTopics}=require('../lib/guideTopics.ts');
const Catalogue=interactive('../components/GuideCatalogue.tsx').default;
for(const fr of [true,false]){
 state=[];const items=guides.map(guide=>({slug:guide.slug,topics:topicsForGuide(guide),card:React.createElement('article',null,guide.slug)}));
 let tree=render(Catalogue,{items,fr});assert.equal(nodes(tree).filter(n=>n.props?.className==='guide-library-grid')[0].props.children.length,guides.length);
 for(const topic of guideTopics){
  const button=nodes(tree).find(n=>n.type==='button'&&n.props.children[0]===(fr?topic.fr:topic.en));
  if(!button)continue;button.props.onClick();tree=render(Catalogue,{items,fr});
  const expected=items.filter(item=>item.topics.includes(topic.id));const grid=nodes(tree).find(n=>n.props?.className==='guide-library-grid');assert.deepEqual(grid.props.children.map(n=>n.key),expected.map(item=>item.slug));assert.ok(expected.length);assert.equal(nodes(tree).filter(n=>n.type==='button'&&n.props['aria-pressed']).length,1);
 }
 nodes(tree).find(n=>n.type==='button').props.onClick();tree=render(Catalogue,{items,fr});assert.equal(nodes(tree).find(n=>n.props?.className==='guide-library-grid').props.children.length,guides.length);
}
const {default:Save,savedPlaceIds}=interactive('../components/GuideStayButton.tsx');
assert.deepEqual(savedPlaceIds('["existing",4,null]'),['existing']);assert.deepEqual(savedPlaceIds('{}'),[]);assert.throws(()=>savedPlaceIds('{invalid'));
for(const locale of ['fr','en']){
 let raw='["existing","place-des-lices"]',fail=false,events=0,listeners=new Map();
 global.window={localStorage:{getItem:()=>raw,setItem:(key,value)=>{assert.equal(key,'le-golfe-saved-places');if(fail)throw Error('quota');raw=value;}},addEventListener:(key,fn)=>listeners.set(key,fn),removeEventListener:(key)=>listeners.delete(key),dispatchEvent:()=>{events++;listeners.get('le-golfe:saved-places')?.();}};
 state=[];const props={ids:['place-des-lices','port-de-saint-tropez'],locale};let tree=render(Save,props);const cleanup=effects[0]();tree=render(Save,props);const click=()=>nodes(tree).find(n=>n.type==='button').props.onClick();
 click();tree=render(Save,props);assert.deepEqual(JSON.parse(raw),['existing','place-des-lices','port-de-saint-tropez']);assert.equal(nodes(tree).find(n=>n.type==='button').props.disabled,true);assert.equal(events,1);
 click();assert.equal(JSON.parse(raw).length,3);
 raw='["existing"]';listeners.get('storage')();tree=render(Save,props);assert.equal(nodes(tree).find(n=>n.type==='button').props.disabled,false);
 fail=true;click();tree=render(Save,props);assert.ok(nodes(tree).find(n=>n.props?.role==='alert'));assert.equal(raw,'["existing"]');fail=false;click();tree=render(Save,props);assert.ok(!nodes(tree).find(n=>n.props?.role==='alert'));cleanup();assert.equal(listeners.size,0);
}
delete global.window;
const Plan=require('../components/BudgetGuidePlan.tsx').default;
for(const locale of ['fr','en']){
 const tree=Plan({locale});const list=nodes(tree),cards=list.filter(n=>n.type==='article');assert.equal(cards.length,3);
 const map=list.find(n=>Array.isArray(n.props?.places));assert.equal(map.props.places.length,5);assert.ok(map.props.places.every(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lon)));
 for(const card of cards){const save=nodes(card).find(n=>n.type.name==='GuideStayButton');assert.ok(save.props.ids.length);for(const id of save.props.ids)assert.ok(nodes(card).some(n=>n.props?.href===`/${locale}/place/${id}`));}
 const html=renderToStaticMarkup(tree);assert.ok(html.includes(`href="/${locale}/saved"`));assert.equal((html.match(/<h2/g)||[]).length,2);assert.ok(!html.includes('NaN'));
}
console.log('PASS: FR/EN guide filters and reset; three budget outings; five sourced map points; save preserves existing places, avoids duplicates, syncs changes and handles storage failures.');
