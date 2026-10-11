-- Apply AFTER community.sql, editorial.sql and villas.sql (including V56).
-- No row deletion. Existing malformed listings are preserved but cannot be rewritten
-- until corrected. Run the read-only audit first; unknown extra policies need review.
begin;
-- Restrictive policies are combined with AND: an old permissive policy must not
-- accidentally override the ownership and visibility invariants below.
drop policy if exists "security listing visibility" on public.villa_listings;
create policy "security listing visibility" on public.villa_listings as restrictive for select to anon,authenticated using ((status='published' and visibility='public') or owner_id=(select auth.uid()));
drop policy if exists "security listing insert" on public.villa_listings;
create policy "security listing insert" on public.villa_listings as restrictive for insert to authenticated with check(owner_id=(select auth.uid()));
drop policy if exists "security listing update" on public.villa_listings;
create policy "security listing update" on public.villa_listings as restrictive for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
drop policy if exists "security listing delete" on public.villa_listings;
create policy "security listing delete" on public.villa_listings as restrictive for delete to authenticated using(owner_id=(select auth.uid()));
drop policy if exists "security inquiry visibility" on public.villa_inquiries;
create policy "security inquiry visibility" on public.villa_inquiries as restrictive for select to authenticated using(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "security inquiry tracking" on public.villa_inquiries;
create policy "security inquiry tracking" on public.villa_inquiries as restrictive for update to authenticated using(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid()))) with check(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "security booking visibility" on public.villa_bookings;
create policy "security booking visibility" on public.villa_bookings as restrictive for select to authenticated using(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "security calendar visibility" on public.villa_calendars;
create policy "security calendar visibility" on public.villa_calendars as restrictive for select to anon,authenticated using(exists(select 1 from public.villa_listings v where v.id=listing_id and ((v.status='published' and v.visibility='public') or v.owner_id=(select auth.uid()))));
drop policy if exists "security calendar update" on public.villa_calendars;
create policy "security calendar update" on public.villa_calendars as restrictive for update to authenticated using(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid()))) with check(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "security calendar insert" on public.villa_calendars;
create policy "security calendar insert" on public.villa_calendars as restrictive for insert to authenticated with check(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "security profile update" on public.community_profiles;
create policy "security profile update" on public.community_profiles as restrictive for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
drop policy if exists "security profile insert" on public.community_profiles;
create policy "security profile insert" on public.community_profiles as restrictive for insert to authenticated with check(user_id=(select auth.uid()));
drop policy if exists "security community visibility" on public.community_posts;
create policy "security community visibility" on public.community_posts as restrictive for select to anon,authenticated using(status='approved' or user_id=(select auth.uid()) or public.is_community_moderator());
drop policy if exists "security community insert" on public.community_posts;
create policy "security community insert" on public.community_posts as restrictive for insert to authenticated with check(user_id=(select auth.uid()) and status='pending' and moderated_at is null and moderated_by is null);
drop policy if exists "security community moderation" on public.community_posts;
create policy "security community moderation" on public.community_posts as restrictive for update to authenticated using(public.is_community_moderator()) with check(public.is_community_moderator());
drop policy if exists "security editorial visibility" on public.editorial_inbox;
create policy "security editorial visibility" on public.editorial_inbox as restrictive for select to anon,authenticated using(status='approved' or public.is_community_moderator());
drop policy if exists "security editorial insert" on public.editorial_inbox;
create policy "security editorial insert" on public.editorial_inbox as restrictive for insert to authenticated with check(public.is_community_moderator() and status='pending');
drop policy if exists "security editorial update" on public.editorial_inbox;
create policy "security editorial update" on public.editorial_inbox as restrictive for update to authenticated using(public.is_community_moderator()) with check(public.is_community_moderator());
-- Remove table AND column grants before restoring the intended narrow privileges.
-- A REVOKE on the table alone does not remove previously granted column rights.
do $$ declare t text;cols text;begin
  foreach t in array array['villa_listings','villa_inquiries','villa_calendars','villa_bookings','community_profiles','community_posts','community_moderators','editorial_inbox'] loop
    execute format('revoke all on table public.%I from public,anon,authenticated',t);
    select string_agg(quote_ident(attname),',') into cols from pg_attribute where attrelid=format('public.%I',t)::regclass and attnum>0 and not attisdropped;
    execute format('revoke all (%s) on table public.%I from public,anon,authenticated',cols,t);
  end loop;
end $$;
grant select on public.villa_listings,public.villa_calendars to anon,authenticated;
grant delete on public.villa_listings to authenticated;
grant insert(id,owner_id,status,visibility,payload),update(status,visibility,payload) on public.villa_listings to authenticated;
grant insert(listing_id,name,email,phone,arrival,departure,guests,message) on public.villa_inquiries to anon,authenticated;
grant select on public.villa_inquiries,public.villa_bookings to authenticated;
grant update(status,owner_notes) on public.villa_inquiries to authenticated;
grant insert(listing_id,enabled,blocks),update(enabled,blocks) on public.villa_calendars to authenticated;
create schema if not exists legolfe_private;
revoke all on schema legolfe_private from public, anon, authenticated;
create table if not exists legolfe_private.rate_limits (
  key text primary key,
  started_at timestamptz not null,
  used integer not null
);
alter table legolfe_private.rate_limits enable row level security;
revoke all on legolfe_private.rate_limits from public, anon, authenticated;

-- Only trusted triggers/RPCs choose keys, windows and budgets. No public RPC here.
create or replace function legolfe_private.take_quota(k text, seconds integer, budget integer)
returns void language plpgsql security definer set search_path='' as $$
declare n integer;
begin
  insert into legolfe_private.rate_limits as r(key,started_at,used)
  values(k,clock_timestamp(),1)
  on conflict(key) do update set
    used=case when r.started_at<clock_timestamp()-make_interval(secs=>seconds) then 1 else r.used+1 end,
    started_at=case when r.started_at<clock_timestamp()-make_interval(secs=>seconds) then clock_timestamp() else r.started_at end
  returning used into n;
  if n>budget then raise exception 'RATE_LIMITED' using errcode='P0001';end if;
  delete from legolfe_private.rate_limits where started_at<clock_timestamp()-interval '2 days';
end $$;
revoke all on function legolfe_private.take_quota(text,integer,integer) from public,anon,authenticated;

-- Atomic, shared quotas across Vercel instances. A denied request spends nothing.
create or replace function public.consume_api_quota(purpose text)
returns boolean language plpgsql security definer set search_path='' as $$
declare actor text:=auth.uid()::text;
begin
  if actor is null then return false;end if;
  if purpose='listing-ai' then
    perform legolfe_private.take_quota('ai:global:day',86400,100);
    perform legolfe_private.take_quota('ai:'||actor||':day',86400,10);
    perform legolfe_private.take_quota('ai:'||actor||':hour',3600,3);
    perform legolfe_private.take_quota('ai:'||actor||':cooldown',30,1);
  elsif purpose='editorial-refresh' and public.is_community_moderator() then
    perform legolfe_private.take_quota('editorial:global',60,1);
  else return false;
  end if;
  return true;
exception when raise_exception then
  if sqlerrm='RATE_LIMITED' then return false;end if;
  raise;
end $$;
revoke execute on function public.consume_api_quota(text) from public,anon,authenticated;
grant execute on function public.consume_api_quota(text) to authenticated;

-- SQL CHECK accepts NULL: the original checks did not reject missing JSON fields.
create or replace function public.villa_valid_payload(p jsonb, listing text)
returns boolean language plpgsql immutable set search_path='' as $$
declare k text; photo jsonb; item jsonb; m jsonb;
begin
  if p is null or jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>40000 then return false;end if;
  for k in select jsonb_object_keys(p) loop
    if k not in ('id','name','location','price','guests','bedrooms','bathrooms','description','descriptionEn','titleFr','titleEn','highlights','highlightsEn','amenities','photos','announcer','saintTropezDistance','beachDistance','mapLocation','district') then return false;end if;
  end loop;
  if jsonb_typeof(p->'id') is distinct from 'string' or p->>'id' is distinct from listing then return false;end if;
  foreach k in array array['name','location','description'] loop
    if jsonb_typeof(p->k) is distinct from 'string' then return false;end if;
  end loop;
  if length(trim(p->>'name')) not between 1 and 160 or length(trim(p->>'location')) not between 1 and 120 or length(p->>'description')>6000 then return false;end if;
  foreach k in array array['guests','bedrooms','bathrooms'] loop
    if jsonb_typeof(p->k) is distinct from 'number' or (p->>k)::numeric not between 1 and 100 or (p->>k)::numeric<>trunc((p->>k)::numeric) then return false;end if;
  end loop;
  if jsonb_typeof(p->'price') is distinct from 'number' or (p->>'price')::numeric not between 0 and 10000000 then return false;end if;
  foreach k in array array['descriptionEn','titleFr','titleEn','district'] loop
    if p ? k and (jsonb_typeof(p->k) is distinct from 'string' or length(p->>k)>(case when k='descriptionEn' then 6000 when k='district' then 80 else 160 end)) then return false;end if;
  end loop;
  foreach k in array array['amenities','highlights','highlightsEn'] loop
    if k='highlightsEn' and not(p ? k) then continue;end if;
    if jsonb_typeof(p->k) is distinct from 'array' then return false;end if;
    if jsonb_array_length(p->k)>(case when k='amenities' then 30 else 6 end) then return false;end if;
    for item in select jsonb_array_elements(p->k) loop
      if jsonb_typeof(item) is distinct from 'string' or length(item#>>'{}')>200 then return false;end if;
    end loop;
  end loop;
  if jsonb_typeof(p->'photos') is distinct from 'array' then return false;end if;
  if jsonb_array_length(p->'photos')>12 then return false;end if;
  for photo in select jsonb_array_elements(p->'photos') loop
    if jsonb_typeof(photo) is distinct from 'object' or jsonb_typeof(photo->'src') is distinct from 'string' or jsonb_typeof(photo->'alt') is distinct from 'string' then return false;end if;
    if length(photo->>'src')>2048 or photo->>'src' !~ '^https://[^[:space:]/?#@]+(/[^[:space:]]*)?$' or length(photo->>'alt')>300 then return false;end if;
  end loop;
  if jsonb_typeof(p->'announcer') is distinct from 'object' or jsonb_typeof(p->'announcer'->'kind') is distinct from 'string' or p->'announcer'->>'kind' not in ('owner','agency') or jsonb_typeof(p->'announcer'->'name') is distinct from 'string' or length(p->'announcer'->>'name')>160 then return false;end if;
  foreach k in array array['saintTropezDistance','beachDistance'] loop
    if p ? k and (jsonb_typeof(p->k) is distinct from 'number' or (p->>k)::numeric not between 0 and 1000) then return false;end if;
  end loop;
  if p ? 'mapLocation' then
    m:=p->'mapLocation';
    if jsonb_typeof(m) is distinct from 'object' or m->>'mode' is null or m->>'mode' not in ('exact','approximate') or jsonb_typeof(m->'latitude') is distinct from 'number' or jsonb_typeof(m->'longitude') is distinct from 'number' then return false;end if;
    if (m->>'latitude')::numeric not between 43.05 and 43.5 or (m->>'longitude')::numeric not between 6.2 and 6.9 then return false;end if;
    if m->>'mode'='approximate' and ((m->>'latitude')::numeric<>round((m->>'latitude')::numeric,2) or (m->>'longitude')::numeric<>round((m->>'longitude')::numeric,2)) then return false;end if;
  end if;
  return true;
exception when others then return false;
end $$;
revoke execute on function public.villa_valid_payload(jsonb,text) from public,anon,authenticated;
grant execute on function public.villa_valid_payload(jsonb,text) to authenticated;
alter table public.villa_listings drop constraint if exists villa_payload_complete;
alter table public.villa_listings add constraint villa_payload_complete check(public.villa_valid_payload(payload,id)) not valid;
-- IDs, owner and timestamps must never be changed by an owner.
revoke insert,update on public.villa_listings from authenticated;
grant insert(id,owner_id,status,visibility,payload),update(status,visibility,payload) on public.villa_listings to authenticated;
-- PostgREST upsert includes id and owner_id in its update; keep them writable but
-- enforce immutability with a trigger to preserve the existing publication flow.
grant update(id,owner_id) on public.villa_listings to authenticated;
create or replace function legolfe_private.listing_guard()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  if tg_op='UPDATE' and (new.id is distinct from old.id or new.owner_id is distinct from old.owner_id or new.created_at is distinct from old.created_at) then raise exception 'IMMUTABLE_LISTING';end if;
  if tg_op='INSERT' then
    perform legolfe_private.take_quota('listing:'||new.owner_id::text,86400,20);
  end if;
  return new;
end $$;
revoke execute on function legolfe_private.listing_guard() from public,anon,authenticated;
drop trigger if exists security_listing_guard on public.villa_listings;
create trigger security_listing_guard before insert or update on public.villa_listings for each row execute function legolfe_private.listing_guard();

-- Legacy enquiry schema was absent from Git. No public SELECT/UPDATE/DELETE.
create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),villa_id text not null,villa_name text not null,
  name text not null,email text not null,phone text not null default '',
  arrival date not null,departure date not null,guests integer not null,message text not null,
  created_at timestamptz not null default now()
);
alter table public.requests enable row level security;
revoke all on public.requests from public,anon,authenticated;
do $$ declare cols text;begin
  select string_agg(quote_ident(attname),',') into cols from pg_attribute where attrelid='public.requests'::regclass and attnum>0 and not attisdropped;
  execute format('revoke all (%s) on table public.requests from public,anon,authenticated',cols);
end $$;
grant insert(villa_id,villa_name,name,email,phone,arrival,departure,guests,message) on public.requests to anon,authenticated;
-- Replace only the known schema's policies: unknown requests policies are removed
-- because all reads of guest contact information must be administrative only.
do $$ declare p record;begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='requests' loop
    execute format('drop policy %I on public.requests',p.policyname);
  end loop;
end $$;
create policy "legacy enquiry insert" on public.requests for insert to anon,authenticated with check(true);

create or replace function legolfe_private.inquiry_guard()
returns trigger language plpgsql security definer set search_path='' as $$
declare listing text;capacity integer;
begin
  if new.name is null or length(trim(new.name)) not between 1 and 100 or new.email is null or length(new.email) not between 3 and 254 or new.email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or new.phone is null or length(new.phone)>40 or new.message is null or length(trim(new.message)) not between 1 and 3000 or new.arrival is null or new.departure is null or new.arrival<(now() at time zone 'Europe/Paris')::date or new.departure<=new.arrival or new.guests is null or new.guests not between 1 and 100 then raise exception 'INVALID_INQUIRY' using errcode='23514';end if;
  if tg_table_name='villa_inquiries' then
    listing:=new.listing_id;
    select (payload->>'guests')::integer into capacity from public.villa_listings where id=listing and status='published' and visibility='public';
  else
    listing:=new.villa_id;
    capacity:=case listing when 'villa-eden' then 8 when 'villa-alba' then 6 when 'villa-azure' then 8 when 'villa-celeste' then 10 when 'villa-luna' then 6 when 'villa-mistral' then 8 end;
  end if;
  if capacity is null or new.guests>capacity then raise exception 'INVALID_INQUIRY' using errcode='23514';end if;
  perform legolfe_private.take_quota('inquiry:global',3600,500);
  perform legolfe_private.take_quota('inquiry:listing:'||listing,3600,50);
  perform legolfe_private.take_quota('inquiry:email:'||md5(lower(trim(new.email))),3600,5);
  return new;
end $$;
revoke execute on function legolfe_private.inquiry_guard() from public,anon,authenticated;
drop trigger if exists security_inquiry_guard on public.villa_inquiries;
create trigger security_inquiry_guard before insert on public.villa_inquiries for each row execute function legolfe_private.inquiry_guard();
drop trigger if exists security_inquiry_guard on public.requests;
create trigger security_inquiry_guard before insert on public.requests for each row execute function legolfe_private.inquiry_guard();

-- Prepare signed-URL permissions first. Activate the private bucket with
-- security-community-private.sql AFTER the new application has been deployed,
-- so the old application keeps displaying photos during the transition.
update storage.buckets set file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp'] where id='community-photos';
drop policy if exists "community photos are public" on storage.objects;
drop policy if exists "community photo visibility" on storage.objects;
create policy "community photo visibility" on storage.objects for select to anon,authenticated using (
  bucket_id='community-photos' and (
    (storage.foldername(name))[1]=(select auth.uid()::text)
    or public.is_community_moderator()
    or exists(select 1 from public.community_posts p where p.image_path=name and p.status='approved')
  )
);
drop policy if exists "security photo visibility" on storage.objects;
create policy "security photo visibility" on storage.objects as restrictive for select to anon,authenticated using(
  bucket_id not in ('community-photos','villa-photos')
  or (storage.foldername(name))[1]=(select auth.uid()::text)
  or (bucket_id='community-photos' and (public.is_community_moderator() or exists(select 1 from public.community_posts p where p.image_path=name and p.status='approved')))
);
drop policy if exists "security photo deletion" on storage.objects;
create policy "security photo deletion" on storage.objects as restrictive for delete to authenticated using(
  bucket_id not in ('community-photos','villa-photos')
  or (storage.foldername(name))[1]=(select auth.uid()::text)
  or (bucket_id='community-photos' and public.is_community_moderator())
);
create or replace function legolfe_private.community_guard()
returns trigger language plpgsql security definer set search_path='' as $$
begin
  if new.place_id !~ '^[a-zA-Z0-9-]{1,120}$' or (new.image_path is not null and (split_part(new.image_path,'/',1)<>new.user_id::text or split_part(new.image_path,'/',2)<>new.place_id or new.image_path !~ '^[a-zA-Z0-9-]+/[a-zA-Z0-9-]+/[a-zA-Z0-9-]+\.(jpg|jpeg|png|webp)$' or not exists(select 1 from storage.objects o where o.bucket_id='community-photos' and o.name=new.image_path))) then raise exception 'INVALID_CONTRIBUTION';end if;
  perform legolfe_private.take_quota('community:'||auth.uid()::text,3600,10);
  return new;
end $$;
revoke execute on function legolfe_private.community_guard() from public,anon,authenticated;
drop trigger if exists security_community_guard on public.community_posts;
create trigger security_community_guard before insert on public.community_posts for each row execute function legolfe_private.community_guard();
-- Explicit privileges prevent mass assignment of moderation fields.
revoke all on public.community_profiles,public.community_posts,public.community_moderators,public.editorial_inbox from public,anon,authenticated;
grant select on public.community_profiles,public.community_posts,public.editorial_inbox to anon,authenticated;
grant insert(user_id,display_name,updated_at),update(display_name,updated_at) on public.community_profiles to authenticated;
grant update(user_id) on public.community_profiles to authenticated; -- upsert, RLS keeps same user
grant insert(place_id,user_id,type,image_path,comment,status),update(status,moderated_at,moderated_by),delete on public.community_posts to authenticated;
grant select on public.community_moderators to authenticated;
grant insert,update on public.editorial_inbox to authenticated;
revoke execute on function public.is_community_moderator() from public,anon,authenticated;
grant execute on function public.is_community_moderator() to anon,authenticated;
alter function public.is_community_moderator() set search_path='';

-- Correct existing bucket configuration too, not only newly-created buckets.
update storage.buckets set file_size_limit=550000,allowed_mime_types=array['image/jpeg'] where id='villa-photos';
-- Use Storage policies, without modifying its managed table structure or triggers.
create or replace function public.take_upload_slot()
returns boolean language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is null then return false;end if;
  perform legolfe_private.take_quota('upload:'||auth.uid()::text,3600,60);
  return true;
exception when raise_exception then
  if sqlerrm='RATE_LIMITED' then return false;end if;
  raise;
end $$;
revoke execute on function public.take_upload_slot() from public,anon,authenticated;
grant execute on function public.take_upload_slot() to authenticated;
drop policy if exists "security photo upload" on storage.objects;
create policy "security photo upload" on storage.objects as restrictive for insert to authenticated with check(
  bucket_id not in ('villa-photos','community-photos') or (
    (storage.foldername(name))[1]=(select auth.uid()::text)
    and name ~ '^[a-zA-Z0-9-]+/[a-zA-Z0-9-]+/[a-zA-Z0-9-]+\.(jpg|jpeg|png|webp)$'
    and public.take_upload_slot()
  )
);
notify pgrst,'reload schema';
commit;
