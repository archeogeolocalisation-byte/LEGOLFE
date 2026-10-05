const fs=require('fs'),path=require('path'),ts=require('typescript'),assert=require('node:assert/strict'),React=require('react');
let checks=0;function equal(a,b){assert.deepEqual(a,b);checks++;}
function harness(file,service){let states=[],refs=[],stateIndex=0,refIndex=0;const cache=new Map();const hooks={...React,useState(initial){const i=stateIndex++;if(!(i in states))states[i]=typeof initial==='function'?initial():initial;return [states[i],v=>{states[i]=typeof v==='function'?v(states[i]):v;}];},useRef(initial){const i=refIndex++;if(!refs[i])refs[i]={current:initial};return refs[i];},useEffect(){}};
 function load(file){file=path.resolve(__dirname,'..',file);if(!path.extname(file))file+=fs.existsSync(file+'.tsx')?'.tsx':'.ts';if(cache.has(file))return cache.get(file);const m={exports:{}};cache.set(file,m.exports);new Function('require','module','exports',ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX}}).outputText)(id=>id==='react'?hooks:id.endsWith('/lib/supabase')?{supabase:service}:id.startsWith('.')?load(path.resolve(path.dirname(file),id)):require(id),m,m.exports);cache.set(file,m.exports);return m.exports;}
 const Component=load(file).default;return {render(props){stateIndex=0;refIndex=0;return Component(props);}};
}
function nodes(tree,predicate){const found=[];function walk(value){if(Array.isArray(value))return value.forEach(walk);if(value&&typeof value==='object'&&value.props){if(predicate(value))found.push(value);walk(value.props.children);}}walk(tree);return found;}
function text(tree){if(Array.isArray(tree))return tree.map(text).join('');if(typeof tree==='string'||typeof tree==='number')return String(tree);return tree?.props?text(tree.props.children):'';}
function button(tree,label){return nodes(tree,n=>n.type==='button'&&text(n).includes(label))[0];}

const h=harness('components/PlaceMediaGallery.tsx');
const photo=i=>({src:`/${i}.jpg`,alt:i,caption:{fr:`FR ${i}`,en:`EN ${i}`},credit:'Author',license:'CC BY 2.0',licenseUrl:'https://creativecommons.org/licenses/by/2.0/',source:'https://commons.wikimedia.org/wiki/File:Test'});
const props={name:'Village',locale:'fr',photos:[photo('A'),photo('B'),photo('C')]};
let tree=h.render(props),opened=0,closed=0,focused=0;
nodes(tree,n=>n.type==='dialog')[0].props.ref.current={showModal(){opened++;},close(){closed++;}};
const opener={focus(){focused++;}};
nodes(tree,n=>n.type==='button'&&n.props['aria-label']?.startsWith('Ouvrir'))[1].props.onClick({currentTarget:opener});
equal(opened,1);tree=h.render(props);assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('FR B'));checks++;
function key(value){nodes(tree,n=>n.type==='dialog')[0].props.onKeyDown({key:value,preventDefault(){}});tree=h.render(props);}
key('ArrowRight');assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('FR C'));checks++;
key('ArrowRight');assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('FR A'));checks++;
key('ArrowLeft');assert.ok(text(nodes(tree,n=>n.type==='dialog')[0]).includes('FR C'));checks++;
button(tree,'Fermer').props.onClick();equal(closed,1);equal(focused,1);
nodes(tree,n=>n.type==='dialog')[0].props.onCancel();nodes(tree,n=>n.type==='dialog')[0].props.onClose();equal(focused,2);
tree=h.render({...props,locale:'en'});assert.ok(button(tree,'Close'));assert.ok(text(tree).includes('EN A'));checks+=2;
assert.ok(nodes(tree,n=>n.type==='a'&&n.props.href===props.photos[0].licenseUrl).length>=1);checks++;
equal(h.render({...props,photos:[]}),null);
console.log(JSON.stringify({result:'PASS',checks,browser:'component event harness',includes:'open selected image, keyboard wrap, close, focus restoration, Escape close event, translation, credits, empty gallery'}));
