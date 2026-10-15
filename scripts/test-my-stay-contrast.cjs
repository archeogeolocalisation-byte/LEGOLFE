const assert=require('node:assert/strict'),fs=require('node:fs');
const css=fs.readFileSync('app/globals.css','utf8');
const scoped=css.slice(css.indexOf('/* My Stay: coherent dark editorial'));
assert.match(scoped,/\.lg-saved-dark \.lg-btn\s*\{[^}]*background-color:\s*#142f40;[^}]*color:\s*#fff;/s,'dark secondary buttons have dark background and white text');
assert.match(scoped,/\.lg-saved-dark \.lg-btn--accent[^}]*\{[^}]*background-color:\s*#a6d8e5;[^}]*color:\s*#082235;/s,'accent buttons have light background and dark text');
assert.match(scoped,/\.lg-saved-dark button:focus-visible/,'keyboard focus on saved buttons');
for(const path of ['app/[locale]/saved/page.tsx','components/StayPlanner.tsx','components/VillaComparison.tsx']){
 const source=fs.readFileSync(path,'utf8');
 assert.ok(source.includes('lg-btn--accent'),path+' must use accessible CTA variant');
}
console.log('My Stay contrast regression checks passed');
