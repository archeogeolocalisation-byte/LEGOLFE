import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const { PGlite } = await import(process.env.PGLITE_TEST_MODULE || '@electric-sql/pglite');

// Real PostgreSQL engine, isolated in memory. Auth/Storage infrastructure is stubbed;
// database RLS, privileges, triggers, constraints and RPCs execute unmodified.
const db = new PGlite();
await db.exec(`
  create role anon;create role authenticated;
  create schema auth;create schema storage;
  create table auth.users(id uuid primary key,email text,created_at timestamptz default now());
  create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
  create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array(regexp_replace($1,'/[^/]*$',''),'/')$$;
  create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
  create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text references storage.buckets(id),name text not null,unique(bucket_id,name));
  alter table storage.objects enable row level security;
  grant usage on schema public,auth,storage to anon,authenticated;
  grant select,insert,update,delete on storage.objects to anon,authenticated;
`);
for (const file of ['community.sql', 'editorial.sql', 'villas.sql']) {
  const sql = (await readFile(new URL(`../supabase/${file}`, import.meta.url), 'utf8')).replace(/create extension if not exists pgcrypto;/gi, '');
  await db.exec(sql);
}
const owner = '11111111-1111-4111-8111-111111111111', stranger = '22222222-2222-4222-8222-222222222222';
await db.exec(`insert into auth.users(id) values('${owner}'),('${stranger}');`);
// Existing reservation suite before applying stricter payload constraints.
await db.exec(await readFile(new URL('../supabase/tests/villas-v56.sql', import.meta.url), 'utf8'));
const migration = await readFile(new URL('../supabase/security-phase1.sql', import.meta.url), 'utf8');
await db.exec(migration);
await db.exec(migration); // re-application must be safe
await db.exec(await readFile(new URL('../supabase/security-community-private.sql', import.meta.url), 'utf8'));
let assertions = 0;
const ok = (v, message) => { assert.ok(v, message); assertions++; };
async function role(name, id = '') { await db.exec('reset role'); await db.query("select set_config('request.jwt.claim.sub',$1,false)", [id]); await db.exec(`set role ${name}`); }
async function denied(sql, params = [], pattern) { await assert.rejects(db.query(sql, params), pattern); assertions++; }
const payload = id => ({ id, name: 'Test villa', location: 'Gassin', price: 1000, guests: 4, bedrooms: 2, bathrooms: 1, description: 'Test description', amenities: [], highlights: [], photos: [{ src: 'https://example.com/photo.jpg', alt: 'Villa' }], announcer: { kind: 'owner', name: '' } });
await role('authenticated', owner);
await db.query("insert into villa_listings(id,owner_id,status,visibility,payload) values('property-test',$1,'published','public',$2)", [owner, payload('property-test')]);
await db.query("insert into villa_listings(id,owner_id,status,visibility,payload) values('property-private',$1,'draft','private',$2)", [owner, payload('property-private')]);
// Existing browser upsert still works, but cannot change identity.
await db.query("insert into villa_listings(id,owner_id,status,visibility,payload) values('property-test',$1,'published','public',$2) on conflict(id) do update set id=excluded.id,owner_id=excluded.owner_id,payload=excluded.payload returning id", [owner, payload('property-test')]);
ok(true, 'Owner upsert');
await denied("update villa_listings set owner_id=$1 where id='property-test'", [stranger], /IMMUTABLE_LISTING/);
await denied("update villa_listings set created_at=now() where id='property-test'", [], /permission denied/);
await denied("insert into villa_listings(id,owner_id,status,visibility,payload) values('property-malformed',$1,'published','public',$2)", [owner, { id: 'property-malformed', name: 'Missing fields' }], /check constraint/);
for (const patch of [{ photos: [{ src: 'javascript:alert(1)', alt: '' }] }, { guests: 1.2 }, { hiddenEmail: 'secret@example.invalid' }, { mapLocation: { mode: 'approximate', latitude: 43.241234, longitude: 6.55 } }]) {
  await denied("update villa_listings set payload=$1 where id='property-test'", [{ ...payload('property-test'), ...patch }], /check constraint|invalid input syntax/);
}
await db.exec('reset role');
await db.exec("create policy unsafe_legacy_test on villa_listings for all to authenticated using(true) with check(true)");
await role('authenticated', stranger);
ok((await db.query("update villa_listings set status='paused' where id='property-test' returning id")).rows.length === 0, 'Stranger update denied');
ok((await db.query("delete from villa_listings where id='property-test' returning id")).rows.length === 0, 'Stranger delete denied');
await denied("insert into villa_listings(id,owner_id,status,visibility,payload) values('property-stolen',$1,'published','public',$2)", [owner, payload('property-stolen')], /row-level security/);
await role('anon');
ok((await db.query('select id from villa_listings')).rows.length === 1, 'Anon sees public only');
await denied('select * from villa_inquiries', [], /permission denied/);
await denied('select * from requests', [], /permission denied/);
await denied('select * from legolfe_private.rate_limits', [], /permission denied/);
await denied("select consume_api_quota('listing-ai')", [], /permission denied/);
const inquirySql = "insert into villa_inquiries(listing_id,name,email,phone,arrival,departure,guests,message) values('property-test','Test',$1,'','2090-06-01','2090-06-08',2,'Test inquiry')";
for (let i = 0; i < 5; i++) await db.query(inquirySql, ['quota@example.invalid']);
await denied(inquirySql, ['quota@example.invalid'], /RATE_LIMITED/);
await denied("insert into requests(villa_id,villa_name,name,email,phone,arrival,departure,guests,message) values('villa-eden','Villa Eden','Test','bad','','2090-06-01','2090-06-08',2,'Test')", [], /INVALID_INQUIRY/);
await db.query("insert into requests(villa_id,villa_name,name,email,phone,arrival,departure,guests,message) values('villa-eden','Villa Eden','Test','good@example.invalid','','2090-06-01','2090-06-08',2,'Test')");ok(true, 'Legacy enquiry accepted');
await role('authenticated', stranger);
ok((await db.query('select * from villa_inquiries')).rows.length === 0, 'Stranger cannot read guest contacts');
await denied('insert into community_moderators(user_id) values($1)', [stranger], /permission denied/);
ok((await db.query("select consume_api_quota('editorial-refresh') as allowed")).rows[0].allowed === false, 'Moderator quota denied');
ok((await db.query("select consume_api_quota('listing-ai') as allowed")).rows[0].allowed === true, 'AI first request allowed');
ok((await db.query("select consume_api_quota('listing-ai') as allowed")).rows[0].allowed === false, 'AI repeated request denied');
await role('authenticated', owner);
const photo = `${owner}/place-test/11111111.jpg`;
await db.query("insert into storage.objects(bucket_id,name) values('community-photos',$1)", [photo]);
await db.query("insert into community_posts(place_id,user_id,type,image_path,status) values('place-test',$1,'photo',$2,'pending')", [owner, photo]);
await role('anon');
ok((await db.query('select * from storage.objects')).rows.length === 0, 'Pending photo inaccessible anonymously');
await role('authenticated', stranger);
ok((await db.query('select * from storage.objects')).rows.length === 0, 'Pending photo inaccessible to stranger');
await denied("insert into community_posts(place_id,user_id,type,image_path,status) values('place-test',$1,'photo',$2,'pending')", [stranger, photo], /INVALID_CONTRIBUTION/);
await denied("insert into storage.objects(bucket_id,name) values('community-photos',$1)", [`${owner}/place-test/stolen.jpg`], /OWNER_REQUIRED|row-level security/);
await role('authenticated', owner);
ok((await db.query('select * from storage.objects')).rows.length === 1, 'Owner sees pending photo');
ok((await db.query("update community_posts set status='approved' where image_path=$1 returning id",[photo])).rows.length===0,'Contributor cannot self-approve');
await db.exec('reset role');
await db.query('insert into community_moderators(user_id) values($1)', [owner]);
await role('authenticated', owner);
await db.query("update community_posts set status='approved',moderated_at=now(),moderated_by=$1 where image_path=$2", [owner, photo]);
await role('anon');
ok((await db.query('select * from storage.objects')).rows.length === 1, 'Approved photo readable anonymously');
await db.exec('reset role');
ok((await db.query("select public from storage.buckets where id='community-photos'")).rows[0].public === false, 'Community bucket private');
console.log(`Database security: ${assertions} assertions passed; existing V56 reservation suite passed; migration applied twice.`);
await db.close();
