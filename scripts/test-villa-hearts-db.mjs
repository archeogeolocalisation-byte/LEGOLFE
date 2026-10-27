import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {PGlite} from '@electric-sql/pglite';
const db=new PGlite();
await db.exec(`create role anon;create role authenticated;create schema auth;create table auth.users(id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
grant usage on schema public,auth to anon,authenticated;
create table public.villa_listings(id text primary key,owner_id uuid not null references auth.users(id),status text,visibility text);`);
const owner='11111111-1111-4111-8111-111111111111',guest='22222222-2222-4222-8222-222222222222',second='33333333-3333-4333-8333-333333333333';
await db.query('insert into auth.users values($1),($2),($3)',[owner,guest,second]);
await db.query("insert into villa_listings values('property-test',$1,'published','public'),('property-paused',$1,'paused','public'),('property-private',$1,'published','private')",[owner]);
const sql=await readFile(new URL('../supabase/villa-hearts.sql',import.meta.url),'utf8');await db.exec(sql);await db.exec(sql);
async function role(name,id=''){await db.exec('reset role');await db.query("select set_config('request.jwt.claim.sub',$1,false)",[id]);await db.exec(`set role ${name}`);}
async function summary(id='property-test'){return (await db.query('select villa_heart_summary($1) as s',[id])).rows[0].s;}
async function vote(liked,id='property-test'){return (await db.query('select set_villa_heart($1,$2) as s',[id,liked])).rows[0].s;}
await role('anon');assert.deepEqual(await summary(),{count:0,liked:false,signedIn:false,canVote:false});
await assert.rejects(vote(true),/permission denied/);await assert.rejects(db.query('select * from villa_hearts'),/permission denied/);
for(const id of ['property-paused','property-private','missing'])await assert.rejects(summary(id),/LISTING_UNAVAILABLE/);
await role('authenticated',owner);assert.equal((await summary()).canVote,false);await assert.rejects(vote(true),/OWNER_CANNOT_VOTE/);
await role('authenticated',guest);assert.equal((await summary()).canVote,true);
assert.equal((await vote(true)).count,1);assert.equal((await vote(true)).count,1);assert.equal((await summary()).liked,true);
await assert.rejects(db.query('insert into villa_hearts(listing_id,user_id) values($1,$2)',['property-test',second]),/permission denied/);
await assert.rejects(db.query('select * from villa_hearts'),/permission denied/);
await assert.rejects(vote(null),/INVALID_VOTE/);
for(const id of ['property-paused','property-private','missing'])await assert.rejects(vote(true,id),/LISTING_UNAVAILABLE/);
await role('authenticated',second);assert.equal((await summary()).liked,false);assert.equal((await vote(true)).count,2);
assert.equal((await vote(false)).count,1);assert.equal((await vote(false)).count,1);
await role('authenticated',guest);assert.equal((await vote(false)).count,0);assert.equal((await vote(true)).count,1);
await role('anon');assert.deepEqual(await summary(),{count:1,liked:false,signedIn:false,canVote:false});
await db.exec('reset role');await db.query("update villa_listings set visibility='private' where id='property-test'");
await role('authenticated',guest);await assert.rejects(summary(),/LISTING_UNAVAILABLE/);await assert.rejects(vote(true),/LISTING_UNAVAILABLE/);
await db.exec('reset role');await db.query("update villa_listings set visibility='public',owner_id=$1 where id='property-test'",[guest]);
await role('authenticated',guest);assert.deepEqual(await summary(),{count:0,liked:false,signedIn:true,canVote:false});
await db.exec('reset role');await db.exec("delete from villa_listings where id='property-test'");assert.equal((await db.query('select count(*) as n from villa_hearts')).rows[0].n,0);
await db.close();console.log('PASS: hearts DB — idempotent install and vote, one account/one heart, removal, owner exclusion including transfers, public aggregates only, private identities, no direct writes, hidden/paused/missing listings and cascade deletion.');
