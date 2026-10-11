/* eslint-disable @typescript-eslint/no-require-imports -- verification scripts use CommonJS */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, filename);
const { siteOrigin, pageMetadata, privateMetadata } = require('../lib/seo.ts');
const robots = require('../app/robots.ts').default;
const originalUrl = process.env.NEXT_PUBLIC_SITE_URL, originalEnvironment = process.env.VERCEL_ENV;
try {
 delete process.env.NEXT_PUBLIC_SITE_URL;
 delete process.env.VERCEL_ENV;
 assert.equal(siteOrigin(), undefined);
 assert.equal(pageMetadata({ title: 'Guide', description: 'Guide', path: '/fr/guides' }).robots.index, false);
 assert.equal(robots().rules.disallow, '/');
 process.env.VERCEL_ENV = 'production';
 assert.equal(siteOrigin(), 'https://www.legolfe.com');
 const metadata = pageMetadata({ title: 'Guide', description: 'Guide', path: '/fr/guides', locale: 'fr' });
 assert.equal(metadata.robots.index, true);
 assert.equal(metadata.alternates.canonical, 'https://www.legolfe.com/fr/guides');
 assert.equal(metadata.alternates.languages.en, 'https://www.legolfe.com/en/guides');
 assert.equal(robots().sitemap, 'https://www.legolfe.com/sitemap.xml');
 assert.notEqual(robots().rules.disallow, '/');
 assert.equal(privateMetadata.robots.index, false);
 process.env.NEXT_PUBLIC_SITE_URL = 'https://www.legolfe.com';
 process.env.VERCEL_ENV = 'preview';
 assert.equal(siteOrigin(), undefined);
 assert.equal(robots().rules.disallow, '/');
 assert.equal(pageMetadata({ title: 'Guide', description: 'Guide', path: '/fr/guides' }).robots.index, false);
 delete process.env.VERCEL_ENV;
 assert.equal(siteOrigin(), 'https://www.legolfe.com');
 for (const invalid of ['http://www.legolfe.com', 'https://evil.invalid/path', 'https://user:pass@www.legolfe.com', 'https://localhost']) {
  process.env.NEXT_PUBLIC_SITE_URL = invalid;
  assert.throws(() => siteOrigin(), /NEXT_PUBLIC_SITE_URL/);
 }
 console.log('SEO: production fallback, preview isolation, canonicals, alternates and private pages passed.');
} finally {
 if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL; else process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
 if (originalEnvironment === undefined) delete process.env.VERCEL_ENV; else process.env.VERCEL_ENV = originalEnvironment;
}
