-- Run after villas.sql and security-phase1.sql. Reviews are separate from owner-controlled listing payloads.
begin;
-- Preserve strict payload validation while allowing only owner proposals, never approved labels.
create or replace function public.villa_valid_payload(p jsonb, listing text)
returns boolean language plpgsql immutable set search_path='' as $$
declare k text; photo jsonb; item jsonb; m jsonb;
begin
  if p is null or jsonb_typeof(p) is distinct from 'object' or octet_length(p::text)>40000 then return false;end if;
  for k in select jsonb_object_keys(p) loop
    if k not in ('id','name','location','price','guests','bedrooms','bathrooms','description','descriptionEn','titleFr','titleEn','highlights','highlightsEn','amenities','photos','announcer','saintTropezDistance','beachDistance','mapLocation','district','requestedCollection','collectionPitch') then return false;end if;
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
  if p ? 'requestedCollection' and (jsonb_typeof(p->'requestedCollection') is distinct from 'string' or p->>'requestedCollection' not in ('charm','exceptional')) then return false;end if;
  if p ? 'collectionPitch' and (jsonb_typeof(p->'collectionPitch') is distinct from 'string' or length(p->>'collectionPitch')>600) then return false;end if;
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

create table if not exists public.villa_collection_reviews (
 listing_id text primary key references public.villa_listings(id) on delete cascade,
 collection text not null check (collection in ('charm','exceptional')),
 reason_fr text not null check (length(btrim(reason_fr)) between 10 and 600),
 reason_en text not null check (length(btrim(reason_en)) between 10 and 600),
 payload_hash text not null,
 reviewed_at timestamptz not null default clock_timestamp()
);
alter table public.villa_collection_reviews enable row level security;
revoke all on public.villa_collection_reviews from public,anon,authenticated;
grant select(listing_id,collection,reason_fr,reason_en) on public.villa_collection_reviews to anon,authenticated;
grant all on public.villa_collection_reviews to service_role;
drop policy if exists villa_collection_public on public.villa_collection_reviews;
create policy villa_collection_public on public.villa_collection_reviews for select to anon,authenticated using (
 exists (select 1 from public.villa_listings v where v.id=listing_id and v.status='published' and v.visibility='public' and encode(sha256(convert_to(v.payload::text,'UTF8')),'hex')=payload_hash)
);
-- Lock and compare the exact version that staff reviewed. A later payload edit hides the distinction.
create or replace function public.review_villa_collection(p_id text,p_collection text,p_reason_fr text,p_reason_en text,p_expected_payload jsonb)
returns void language plpgsql security invoker set search_path=public as $$
declare listing public.villa_listings%rowtype;
begin
 select * into listing from public.villa_listings where id=p_id for update;
 if not found then raise exception 'LISTING_NOT_FOUND'; end if;
 if p_expected_payload is null or listing.payload<>p_expected_payload then raise exception 'COLLECTION_REVIEW_CONFLICT'; end if;
 if p_collection is null then
  delete from public.villa_collection_reviews where listing_id=p_id;
 else
  insert into public.villa_collection_reviews(listing_id,collection,reason_fr,reason_en,payload_hash)
  values(p_id,p_collection,btrim(p_reason_fr),btrim(p_reason_en),encode(sha256(convert_to(listing.payload::text,'UTF8')),'hex'))
  on conflict(listing_id) do update set collection=excluded.collection,reason_fr=excluded.reason_fr,reason_en=excluded.reason_en,payload_hash=excluded.payload_hash,reviewed_at=clock_timestamp();
 end if;
end $$;
revoke all on function public.review_villa_collection(text,text,text,text,jsonb) from public,anon,authenticated;
grant execute on function public.review_villa_collection(text,text,text,text,jsonb) to service_role;
notify pgrst,'reload schema';
commit;
