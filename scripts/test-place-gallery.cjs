/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript'),React=require('react');
const filename=path.join(__dirname,'../components/PlaceMediaGallery.tsx'),states=[],refs=[];let stateCursor=0,refCursor=0;
const realLoad=Module._load;
Module._load=function(request,parent,...args){if(request==='react'&&parent?.filename===filename)return {...React,useState(initial){const at=stateCursor++;if(!(at in states))states[at]=initial;return [states[at],next=>{states[at]=typeof next==='function'?next(states[at]):next;}];},useRef(initial){const at=refCursor++;if(!(at in refs))refs[at]={current:initial};return refs[at];},useEffect(){}};return realLoad.call(this,request,parent,...args);};
const isolated=new Module(filename);isolated.filename=filename;isolated.paths=Module._nodeModulePaths(path.dirname(filename));
try{isolated._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,filename);}finally{Module._load=realLoad;}
const photos=Array.from({length:5},(_,i)=>({src:`/image-${i}.jpg`,caption:{fr:`Photo ${i}`,en:`Picture ${i}`},credit:'Author',license:'CC BY-SA',source:'https://example.org/photo',licenseUrl:'https://example.org/license'}));
const nodes=e=>!e||typeof e!=='object'?[]:[e,...React.Children.toArray(e.props?.children).flatMap(nodes)];
const render=(list=photos,locale='fr')=>{stateCursor=0;refCursor=0;return isolated.exports.default({name:'Lieu',photos:list,locale});};
const button=(tree,label)=>nodes(tree).find(n=>n.type==='button'&&n.props['aria-label']===label);
assert.equal(render([]),null);let tree=render();assert.equal(nodes(tree).filter(n=>n.type==='figure').length,1);assert.equal(nodes(tree).filter(n=>n.type==='button'&&n.props['aria-label']?.startsWith('Afficher la photo')).length,3);
button(tree,'Photo suivante').props.onClick();tree=render();assert.equal(states[0],1);assert.equal(nodes(tree).find(n=>n.type==='img').props.src,'/image-1.jpg');button(tree,'Photo suivante').props.onClick();tree=render();button(tree,'Photo suivante').props.onClick();tree=render();assert.equal(states[0],0);button(tree,'Photo précédente').props.onClick();tree=render();assert.equal(states[0],2);
const group=nodes(tree).find(n=>n.props?.['aria-roledescription']==='carrousel');group.props.onKeyDown({key:'ArrowRight',preventDefault(){}});tree=render();assert.equal(states[0],0);
let opener=nodes(tree).find(n=>n.type==='button'&&n.props['aria-label']?.startsWith('Ouvrir la photo'));
opener.props.onTouchStart({touches:[{clientX:200,clientY:20}]});opener.props.onTouchEnd({changedTouches:[{clientX:50,clientY:25}]});tree=render();assert.equal(states[0],1);opener=nodes(tree).find(n=>n.type==='button'&&n.props['aria-label']?.startsWith('Ouvrir la photo'));opener.props.onClick({currentTarget:{}});assert.equal(states[1],false);
opener.props.onTouchStart({touches:[{clientX:200,clientY:20}]});opener.props.onTouchEnd({changedTouches:[{clientX:190,clientY:200}]});tree=render();assert.equal(states[0],1);
assert.ok(nodes(tree).some(n=>n.type==='a'&&n.props.href==='https://example.org/license'));states[0]=0;tree=render(photos.slice(0,1));assert.equal(button(tree,'Photo suivante'),undefined);tree=render(photos,'en');assert.ok(button(tree,'Next photo'));
console.log('Place gallery: max three slides, zero/one/multiple photos, looping controls, keyboard, horizontal swipe without opening modal or hijacking vertical scroll, credits and FR/EN passed.');
