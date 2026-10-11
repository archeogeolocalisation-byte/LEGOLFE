/* eslint-disable @typescript-eslint/no-require-imports -- repository verification scripts use CommonJS */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, filename);
const { checkOrigin, readJson, safeReturnPath } = require('../lib/security.ts');
const { validateInquiry } = require('../lib/inquiryValidation.ts');
const { validateBrief } = require('../lib/listingAssistant.ts');

(async () => {
  const req = (body, headers = {}) => new Request('https://legolfe.com/api/inquiries', { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body });
  assert.throws(() => checkOrigin(req('{}', { origin: 'https://attacker.invalid' })), /INVALID_ORIGIN/);
  assert.throws(() => checkOrigin(req('{}', { 'sec-fetch-site': 'cross-site' })), /INVALID_ORIGIN/);
  checkOrigin(req('{}', { origin: 'https://legolfe.com' }));
  assert.deepEqual(await readJson(req('{"ok":true}'), 100), { ok: true });
  await assert.rejects(readJson(req('x'.repeat(101)), 100), /PAYLOAD_TOO_LARGE/);
  await assert.rejects(readJson(req('not json'), 100), /INVALID_BODY/);
  await assert.rejects(readJson(req('{}', { 'content-type': 'text/plain' }), 100), /JSON_REQUIRED/);
  assert.equal(safeReturnPath('/place/pampelonne'), '/place/pampelonne');
  for (const path of ['//attacker.invalid', '/place/../../account', '/place/x?next=evil', 'javascript:alert(1)']) assert.equal(safeReturnPath(path), '');
  const input = { villaId: 'villa-eden', name: ' Guest ', email: 'Guest@Example.com', phone: '', arrival: '2090-06-01', departure: '2090-06-08', guests: 4, message: 'Hello', consent: true, website: '' };
  assert.equal(validateInquiry(input, 8).email, 'guest@example.com');
  for (const patch of [{ consent: false }, { website: 'spam' }, { email: 'invalid' }, { guests: 9 }, { guests: 1.2 }, { arrival: '2090-02-30' }, { departure: '2090-05-31' }, { message: 'x'.repeat(3001) }]) assert.throws(() => validateInquiry({ ...input, ...patch }, 8), /INVALID_INQUIRY/);
  assert.throws(() => validateBrief({ consent: true, location: 'Gassin', guests: 4, bedrooms: 2, bathrooms: 1, amenities: [], previousDescription: '', photos: ['https://internal.invalid'] }), /INVALID_PHOTOS/);
  const { POST: inquiryPost } = require('../app/api/inquiries/route.ts');
  assert.equal((await inquiryPost(req('{}', { origin: 'https://attacker.invalid' }))).status, 403);
  assert.equal((await inquiryPost(req('not json'))).status, 400);
  assert.equal((await inquiryPost(req('{}', { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await inquiryPost(req(JSON.stringify({ ...input, consent: false })))).status, 400);
  assert.equal((await inquiryPost(req('x'.repeat(16001)))).status, 413);
  const { POST: aiPost } = require('../app/api/host/description/route.ts');
  assert.equal((await aiPost(req('{}'))).status, 401);
  assert.equal((await aiPost(req('{}', { origin: 'https://attacker.invalid' }))).status, 403);
  console.log('Security validation and API rejection paths: 28 assertions passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
