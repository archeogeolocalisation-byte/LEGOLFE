/* eslint-disable @typescript-eslint/no-require-imports */
// Exercise the real client handlers; Auth, Storage and React hooks are isolated.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const ts = require('typescript');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText, filename);
require.extensions['.css']=m=>{m.exports=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)});};
let values, refs, index, refIndex, effects, initialized, calls, currentId, metadata, updateError, uploadError, compressionError, authListener;
const id = '11111111-1111-4111-8111-111111111111';
const oldPath = `${id}/legolfe-profile/old.jpg`;
const auth = {
  getUser: async () => ({ data: { user: { id: currentId, user_metadata: metadata } }, error: null }),
  onAuthStateChange: callback => { authListener = callback; return { data: { subscription: { unsubscribe() {} } } }; },
  updateUser: async input => { calls.push(['update', input]); if (!updateError) metadata = { ...metadata, ...input.data }; return { error: updateError }; },
};
const storage = { from: bucket => {
  assert.equal(bucket, 'community-photos');
  return {
    createSignedUrl: async path => ({ data: { signedUrl: `https://example.invalid/${path}` }, error: null }),
    upload: async (path, blob, options) => { calls.push(['upload', path, blob, options]); return { error: uploadError }; },
    remove: async paths => { calls.push(['remove', paths]); return { error: null }; },
  };
} };
const originalLoad = Module._load;
Module._load = function(request, parent, ...rest) {
  const relevant = parent?.filename.endsWith('/ProfileDetails.tsx') || parent?.filename.endsWith('/AgendaClient.tsx');
  if (relevant && request === 'react') return {
    ...originalLoad.call(this, request, parent, ...rest),
    useState: initial => { const slot = index++; if (!(slot in values)) values[slot] = initial; return [values[slot], value => { values[slot] = typeof value === 'function' ? value(values[slot]) : value; }]; },
    useRef: initial => refs[refIndex++] ??= { current: initial },
    useMemo: fn => fn(),
    useEffect: fn => { if (!initialized) effects.push(fn); },
  };
  if (relevant && request.endsWith('/lib/supabase')) return { supabase: { auth, storage } };
  if (relevant && request.endsWith('/lib/hostPhotos')) return { compressPhoto: async (_file, size) => { assert.equal(size, 320); if (compressionError) throw new Error('Invalid image'); return new Blob(['jpeg']); } };
  return originalLoad.call(this, request, parent, ...rest);
};
URL.createObjectURL = () => 'blob:test'; URL.revokeObjectURL = () => {};
const Profile = require('../components/ProfileDetails.tsx').default;
const Agenda = require('../app/[locale]/whats-on/AgendaClient.tsx').default;
const base = require('../data/events.ts').events[0];
function reset() { values = []; refs = []; effects = []; initialized = false; calls = []; currentId = id; metadata = { legolfe_bio: 'Bonjour', legolfe_avatar_path: oldPath, presence_plus: 'preserved' }; updateError = uploadError = compressionError = null; }
function render(Component, props) { index = refIndex = 0; const tree = Component(props); initialized = true; return tree; }
function nodes(tree) { if (!tree || typeof tree !== 'object') return []; if (Array.isArray(tree)) return tree.flatMap(nodes); return [tree, ...nodes(tree.props?.children)]; }
function find(tree, predicate) { const node = nodes(tree).find(predicate); assert.ok(node); return node; }
const props = { userId: id, fr: true };
async function profile() { reset(); render(Profile, props); const pending = effects.map(fn => fn()); await Promise.all(pending); await new Promise(resolve => setImmediate(resolve)); return render(Profile, props); }
const submit = tree => tree.props.onSubmit({ preventDefault() {} });
const choose = tree => find(tree, n => n.type === 'input').props.onChange({ target: { files: [{ type: 'image/png', size: 1024 }], value: 'photo' } });
(async () => {
  let tree = await profile();
  assert.equal(find(tree, n => n.type === 'textarea').props.value, 'Bonjour');
  find(tree, n => n.type === 'textarea').props.onChange({ target: { value: ' Ma présentation ' } });
  await submit(render(Profile, props));
  assert.equal(metadata.legolfe_bio, 'Ma présentation'); assert.equal(metadata.presence_plus, 'preserved');
  assert.equal(metadata.legolfe_avatar_path, oldPath);
  tree = await profile(); choose(tree); await submit(render(Profile, props));
  assert.match(metadata.legolfe_avatar_path, new RegExp(`^${id}/legolfe-profile/`));
  assert.deepEqual(calls.map(c => c[0]), ['upload', 'update', 'remove']);
  assert.deepEqual(calls[2][1], [oldPath]);
  tree = await profile(); choose(tree); updateError = new Error('Unavailable'); await submit(render(Profile, props));
  assert.equal(metadata.legolfe_avatar_path, oldPath);
  assert.equal(calls[2][1][0], calls[0][1]); // only the failed new upload is cleaned
  tree = await profile(); choose(tree); compressionError = true; await submit(render(Profile, props)); assert.equal(calls.length, 0);
  tree = await profile(); choose(tree); uploadError = true; await submit(render(Profile, props)); assert.equal(calls.some(c => c[0] === 'update'), false);
  tree = await profile(); choose(tree); currentId = 'another-user'; await submit(render(Profile, props)); assert.equal(calls.length, 0);
  tree = await profile(); authListener('SIGNED_OUT', null); await submit(tree); assert.equal(calls.length, 0);
  tree = await profile(); find(tree, n => n.type === 'button' && n.props.children === 'Retirer la photo').props.onClick(); await submit(render(Profile, props)); assert.equal(metadata.legolfe_avatar_path, '');
  tree = await profile(); const invalid = { target: { files: [{ type: 'image/svg+xml', size: 42 }], value: 'image' } }; find(tree, n => n.type === 'input').props.onChange(invalid); await submit(render(Profile, props)); assert.equal(calls.some(c => c[0] === 'upload'), false);
  reset();
  const buttonText = n => Array.isArray(n.props?.children) ? n.props.children.find(x=>typeof x==='string') : n.props?.children;
  const agendaProps = { locale: 'fr', initialDay: '2026-10-11', events: [
    { ...base, id: 'today', start: '2026-10-11', end: undefined, sessions: undefined },
    { ...base, id: 'tomorrow', start: '2026-10-12', end: undefined, sessions: undefined },
    { ...base, id: 'november', start: '2026-11-05', end: undefined, sessions: [{ start: '2026-11-05', time: '19:00' }, { start: '2026-11-12', time: '20:00' }] },
  ] };
  tree = render(Agenda, agendaProps);
  const ids = tree => nodes(tree).filter(n => n.type === 'article').map(n => n.key);
  assert.deepEqual(ids(tree), ['today', 'tomorrow']);
  find(tree, n => n.type === 'button' && buttonText(n) === 'Demain').props.onClick();
  tree = render(Agenda, agendaProps); assert.deepEqual(ids(tree), ['tomorrow']);
  assert.equal(find(tree, n => n.type === 'button' && buttonText(n) === 'Demain').props['aria-pressed'], true);
  find(tree, n => n.props?.id === 'agenda-month').props.onChange({ target: { value: '2026-11' } });
  tree = render(Agenda, agendaProps); assert.deepEqual(ids(tree), ['november']);
  assert.equal(find(tree, n => n.type === 'button' && buttonText(n) === 'Demain').props['aria-pressed'], false);
  const text = nodes(tree).flatMap(n => n.props?.children ?? []).filter(n => typeof n === 'string').join(' ');
  assert.ok(text.includes('19:00')); assert.ok(text.includes('20:00'));
  find(tree, n => n.type === 'button' && buttonText(n) === 'Aujourd’hui').props.onClick();
  tree = render(Agenda, agendaProps); assert.deepEqual(ids(tree), ['today']);
  for(const locale of ['fr','en']){
   reset();const samples=Array.from({length:7},(_,i)=>({...base,id:`event-${i}`,start:`2026-10-${String(11+i).padStart(2,'0')}`,end:undefined,sessions:undefined,featured:[1,3].includes(i),category:i===6?'family':'culture',location:i===6?'Grimaud':'Saint-Tropez'}));
   const props={locale,initialDay:'2026-10-11',events:samples};let tree=render(Agenda,props);
   const featured=tree=>nodes(tree).filter(n=>n.props?.['data-agenda-featured']).map(n=>n.props['data-agenda-featured']);const remaining=tree=>nodes(tree).filter(n=>n.props?.['data-agenda-event']).map(n=>n.props['data-agenda-event']);
   assert.deepEqual(featured(tree),['event-1','event-3','event-0']);assert.equal(remaining(tree).length,4);assert.equal(new Set([...featured(tree),...remaining(tree)]).size,7);
   find(tree,n=>n.type==='button'&&n.props.children===(locale==='fr'?'Famille':'Family')).props.onClick();tree=render(Agenda,props);assert.deepEqual(featured(tree),['event-6']);assert.deepEqual(remaining(tree),[]);
   find(tree,n=>n.props?.id==='agenda-location').props.onChange({target:{value:'Saint-Tropez'}});tree=render(Agenda,props);assert.deepEqual(featured(tree),[]);assert.deepEqual(remaining(tree),[]);
   find(tree,n=>n.type==='button'&&n.props.children===(locale==='fr'?'Tout':'All')).props.onClick();tree=render(Agenda,props);assert.equal(featured(tree).length,3);assert.equal(remaining(tree).length,3);
  }
  const header = fs.readFileSync('components/SiteHeader.tsx', 'utf8');
  assert.equal(header.includes('`${base}/host`'), false); assert.ok(header.includes('`${base}/account`'));
  console.log('Profile: persistence, namespacing, uploads, replacement, removal, failures and session changes passed. Agenda: inline periods/months and recurring sessions passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
