/* eslint-disable @typescript-eslint/no-require-imports */
const assert=require('node:assert/strict'),fs=require('node:fs');
const css=fs.readFileSync('app/[locale]/whats-on/AgendaClient.module.css','utf8');
const client=fs.readFileSync('app/[locale]/whats-on/AgendaClient.tsx','utf8');
const page=fs.readFileSync('app/[locale]/whats-on/page.tsx','utf8');
const footer=fs.readFileSync('components/SiteFooter.tsx','utf8');
assert.match(page,/bg-\[#050505\] text-\[#f5f5f2\]/);
assert.match(page,/<SiteHeader light=\{false\}/);
assert.match(page,/<SiteFooter locale=\{locale\} dark\/>/);
assert.match(footer,/dark\?["']border-t border-white\/20 bg-\[#050505\]/);
assert.match(client,/aria-label=\{fr\?"À l’affiche"/);
assert.ok(client.indexOf('className={styles.featuredGrid}')<client.indexOf('className={styles.eventGrid}'));
assert.ok(client.includes('className="border-t border-white/20 bg-[#050505] text-white"'));
assert.ok(client.includes('bg-[#111111]'));
assert.match(css,/\.eventGrid\{columns:1;column-gap:20px/);
assert.match(css,/@media\(min-width:680px\)\{\.eventGrid\{columns:2\}\}/);
assert.match(css,/@media\(min-width:1060px\)\{\.eventGrid\{columns:3\}\}/);
assert.match(css,/\.eventCard\{[^}]*break-inside:avoid/);
for(const className of ['featured','featureLarge','featureSmall','eventCard']){
 const rule=css.match(new RegExp('\\.'+className+'\\{([^}]*)\\}'));
 assert.ok(rule,'Missing '+className);
 assert.match(rule[1],/background:#(?:050505|111)/);
}
console.log('Agenda dark layout, source section, responsive masonry and header/footer invariants passed.');
