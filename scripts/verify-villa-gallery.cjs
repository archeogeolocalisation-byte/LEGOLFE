const fs=require('fs'),path=require('path'),ts=require('typescript'),assert=require('node:assert/strict'),React=require('react');
let checks=0;function equal(a,b){assert.deepEqual(a,b);checks++;}
function harness(file,service){let states=[],refs=[],stateIndex=0,refIndex=0;const cache=new Map();const hooks={...React,useState(initial){const i=stateIndex++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return [states[i],v=>{states[i]=typeof v==='function'?v(states[i]):v;}];},useRef(initial){const i=refIndex++;if(!refs[i])refs[i]={current:initial};return refs[i];},useEffect(){}};
 function load(file){file=path.resolve(__dirname,'..',file);if(!path.extname(file))file+=fs.existsSync(file+'.tsx')?'.tsx':'.ts';if(cache.has(file))return cache.get(file);const m={exports:{}};cache.set(file,m.exports);new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText)(id=>id==='react'?hooks:id.endsWith('/lib/supabase')?{supabase:service}:id.startsWith('.')?load(path.resolve(path.dirname(file),id)):require(id),m,m.exports);cache.set(file,m.exports);return m.exports;}
 const Component=load(file).default;return {render(props){stateIndex=0;refIndex=0;return Component(props);}};
}
function nodes(tree,predicate){const found=[];function walk(value){if(Array.isArray(value))return value.forEach(walk);if(value&&typeof value==='object'&&value.props){if(predicate(value))found.push(value);walk(value.props.children);}}walk(tree);return found;}
function text(tree){if(Array.isArray(tree))return tree.map(text).join('');if(typeof tree==='string'||typeof tree==='number')return String(tree);return tree?.props?text(tree.props.children):'';}
function button(tree,label){return nodes(tree,n=>n.type==='button'&&text(n).includes(label))[0];}

const h=harness('components/VillaGallery.tsx');
const props={name:'Villa Test',photos:[{src:'local-photo:A',alt:'A'},{src:'https://photos.example/b.jpg',alt:'B'},{src:'https://photos.example/c.jpg',alt:'C'}]};
let tree=h.render(props),opened=0,focused=0;
nodes(tree,n=>n.type==='dialog')[0].props.ref.current={showModal(){opened++;},close(){}};
const trigger={focus(){focused++;}};
nodes(tree,n=>n.type==='button'&&n.props['aria-label']==='Voir la photo 2 de Villa Test')[0].props.onClick({currentTarget:trigger});equal(opened,1);tree=h.render(props);assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('B'));checks++;
function key(k){nodes(tree,n=>n.type==='dialog')[0].props.onKeyDown({key:k,preventDefault(){}});tree=h.render(props);}
key('ArrowRight');assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('C'));checks++;
key('ArrowRight');assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('A'));checks++;
key('ArrowLeft');assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('C'));checks++;
button(tree,'Fermer').props.onClick();nodes(tree,n=>n.type==='dialog')[0].props.onClose();equal(focused,1);
const main=nodes(tree,n=>n.props['aria-label']==='Galerie de Villa Test')[0];
main.props.onScroll({currentTarget:{firstElementChild:{offsetWidth:300},scrollLeft:308}});tree=h.render(props);assert.ok(text(tree).includes('2 / 3'));checks++;
button(tree,'Voir les 3 photos').props.onClick({currentTarget:trigger});tree=h.render(props);assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('B'));checks++;
const swipe=nodes(tree,n=>n.props.onTouchStart)[0];swipe.props.onTouchStart({touches:[{clientX:200,clientY:50}]});swipe.props.onTouchEnd({changedTouches:[{clientX:60,clientY:55}]});tree=h.render(props);assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('C'));checks++;
nodes(tree,n=>n.type==='button'&&n.props['aria-label']==='Photo 1')[0].props.onClick();tree=h.render(props);assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('A'));checks++;
tree=h.render({...props,locale:'en'});assert.ok(button(tree,'Show all 3 photos'));assert.ok(button(tree,'Close'));checks+=2;
const many=Array.from({length:7},(_,i)=>({src:`/test-${i}.jpg`,alt:`Image ${i+1}`}));tree=h.render({...props,photos:many});
const grid=nodes(tree,n=>n.props['aria-label']==='Galerie de Villa Test')[0];assert.equal(nodes(grid,n=>n.type==='button'&&!n.props.className.includes('md:hidden')).length,5);checks++;
assert.equal(nodes(grid,n=>n.type==='button').length,7);checks++;
for(let n=1;n<=5;n++){tree=h.render({...props,photos:many.slice(0,n)});assert.equal(nodes(nodes(tree,v=>v.props['aria-label']==='Galerie de Villa Test')[0],v=>v.type==='button').length,n);checks++;}
tree=h.render({...props,photos:[]});assert.equal(nodes(tree,n=>n.type==='dialog').length,0);assert.ok(text(tree).includes('Villa Test'));checks+=2;
console.log(JSON.stringify({result:'PASS',checks,includes:'selected photo, local source, keyboard wrap, correct trigger focus, no-photo name cover'}));
