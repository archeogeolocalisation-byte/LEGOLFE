-- LE GOLFE V49. Execute once in Supabase SQL Editor, safe to re-run.
-- Uses authenticated owners; no service-role key is required in the browser.
create table if not exists public.villa_listings (
 id text primary key check (id ~ '^property-[a-zA-Z0-9-]{1,100}$'),
 owner_id uuid not null references auth.users(id) on delete cascade,
 status text not null check (status in ('draft','published','paused')),
 visibility text not null check (visibility in ('public','private','request')),
 payload jsonb not null check (jsonb_typeof(payload)='object' and octet_length(payload::text)<=40000),
 created_at timestamptz not null default now(),
 constraint villa_identity check (payload->>'id'=id and length(payload->>'name') between 1 and 160 and length(payload->>'location') between 1 and 120),
 constraint villa_capacity check ((payload->>'guests')::integer between 1 and 100 and (payload->>'bedrooms')::integer between 1 and 100 and (payload->>'bathrooms')::integer between 1 and 100 and (payload->>'price')::numeric>=0),
 constraint villa_arrays check (jsonb_typeof(payload->'photos')='array' and jsonb_array_length(payload->'photos')<=12 and jsonb_typeof(payload->'amenities')='array' and jsonb_typeof(payload->'highlights')='array')
);
alter table public.villa_listings enable row level security;
revoke all on public.villa_listings from anon,authenticated;
grant select on public.villa_listings to anon,authenticated;
grant insert,update,delete on public.villa_listings to authenticated;
drop policy if exists "villa public read" on public.villa_listings;
create policy "villa public read" on public.villa_listings for select to anon,authenticated using (status='published' and visibility='public');
drop policy if exists "villa owner read" on public.villa_listings;
create policy "villa owner read" on public.villa_listings for select to authenticated using (owner_id=(select auth.uid()));
drop policy if exists "villa owner insert" on public.villa_listings;
create policy "villa owner insert" on public.villa_listings for insert to authenticated with check (owner_id=(select auth.uid()));
drop policy if exists "villa owner update" on public.villa_listings;
create policy "villa owner update" on public.villa_listings for update to authenticated using (owner_id=(select auth.uid())) with check (owner_id=(select auth.uid()));
drop policy if exists "villa owner delete" on public.villa_listings;
create policy "villa owner delete" on public.villa_listings for delete to authenticated using (owner_id=(select auth.uid()));

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('villa-photos','villa-photos',true,550000,array['image/jpeg'])
on conflict (id) do nothing;
drop policy if exists "villa photo owner insert" on storage.objects;
create policy "villa photo owner insert" on storage.objects for insert to authenticated with check (bucket_id='villa-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
drop policy if exists "villa photo owner select" on storage.objects;
create policy "villa photo owner select" on storage.objects for select to authenticated using (bucket_id='villa-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));
drop policy if exists "villa photo owner delete" on storage.objects;
create policy "villa photo owner delete" on storage.objects for delete to authenticated using (bucket_id='villa-photos' and (storage.foldername(name))[1]=(select auth.uid()::text));

create table if not exists public.villa_inquiries (
 id uuid primary key default gen_random_uuid(),
 listing_id text not null references public.villa_listings(id) on delete cascade,
 name text not null check (length(trim(name)) between 1 and 100),
 email text not null check (length(email) between 3 and 254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 phone text not null default '' check (length(phone)<=40),
 arrival date not null,departure date not null check (departure>arrival),
 guests integer not null check (guests between 1 and 100),
 message text not null check (length(trim(message)) between 1 and 3000),
 created_at timestamptz not null default now()
);
alter table public.villa_inquiries enable row level security;
revoke all on public.villa_inquiries from anon,authenticated;
grant insert(listing_id,name,email,phone,arrival,departure,guests,message) on public.villa_inquiries to anon,authenticated;
grant select on public.villa_inquiries to authenticated;
drop policy if exists "villa public enquiry" on public.villa_inquiries;
create policy "villa public enquiry" on public.villa_inquiries for insert to anon,authenticated with check (
 arrival>=(now() at time zone 'Europe/Paris')::date and exists (select 1 from public.villa_listings v where v.id=listing_id and v.status='published' and v.visibility='public' and guests<=(v.payload->>'guests')::integer)
);
drop policy if exists "villa owner enquiries" on public.villa_inquiries;
create policy "villa owner enquiries" on public.villa_inquiries for select to authenticated using (exists (select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
create index if not exists villa_inquiries_listing_created on public.villa_inquiries(listing_id,created_at desc);
-- Primary references:
-- https://supabase.com/docs/guides/database/postgres/row-level-security
-- https://supabase.com/docs/guides/storage/security/access-control
-- https://supabase.com/docs/guides/storage/buckets/fundamentals

-- LE GOLFE V50: run after the V49 villa schema, or run the full villas.sql.
begin;
alter table public.villa_inquiries add column if not exists status text not null default 'new';
alter table public.villa_inquiries add column if not exists owner_notes text not null default '';
alter table public.villa_inquiries add column if not exists updated_at timestamptz not null default now();
do $$ begin
 if not exists (select 1 from pg_constraint where conrelid='public.villa_inquiries'::regclass and conname='villa_inquiry_tracking_status') then
 alter table public.villa_inquiries add constraint villa_inquiry_tracking_status check (status in ('new','reviewing','replied','closed'));
 end if;
 if not exists (select 1 from pg_constraint where conrelid='public.villa_inquiries'::regclass and conname='villa_inquiry_notes_length') then
 alter table public.villa_inquiries add constraint villa_inquiry_notes_length check (length(owner_notes)<=2000);
 end if;
end $$;
create or replace function public.villa_inquiry_updated_at()
returns trigger language plpgsql set search_path=public as $$ begin new.updated_at=clock_timestamp();return new;end $$;
drop trigger if exists villa_inquiry_touch on public.villa_inquiries;
create trigger villa_inquiry_touch before update on public.villa_inquiries for each row execute function public.villa_inquiry_updated_at();
-- The owner can change tracking fields only, never the guest's message or dates.
revoke update on public.villa_inquiries from authenticated;
grant update(status,owner_notes) on public.villa_inquiries to authenticated;
drop policy if exists "villa owner tracking" on public.villa_inquiries;
create policy "villa owner tracking" on public.villa_inquiries for update to authenticated
using (exists (select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())))
with check (exists (select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
notify pgrst, 'reload schema';
commit;

-- LE GOLFE V54. Run after villas.sql (V49/V50). Safe to re-run.
-- Blocks describe nights only: start is included, end is the checkout day (excluded).
begin;
create or replace function public.villa_valid_blocks(value jsonb)
returns boolean language plpgsql immutable set search_path=public as $$
declare item jsonb; first_day date; last_day date;
begin
 if value is null or jsonb_typeof(value)<>'array' then return false;end if;
 if jsonb_array_length(value)>200 then return false;end if;
 for item in select jsonb_array_elements(value) loop
  if jsonb_typeof(item)<>'object' or jsonb_typeof(item->'start') is distinct from 'string' or jsonb_typeof(item->'end') is distinct from 'string' then return false;end if;
  if (item->>'start')!~'^20[0-9]{2}-[0-9]{2}-[0-9]{2}$' or (item->>'end')!~'^20[0-9]{2}-[0-9]{2}-[0-9]{2}$' then return false;end if;
  if (select count(*) from jsonb_object_keys(item))<>2 then return false;end if;
  first_day:=(item->>'start')::date;last_day:=(item->>'end')::date;
  if to_char(first_day,'YYYY-MM-DD')<>item->>'start' or to_char(last_day,'YYYY-MM-DD')<>item->>'end' or last_day<=first_day then return false;end if;
 end loop;
 return true;
exception when others then return false;
end $$;
create table if not exists public.villa_calendars(
 listing_id text primary key references public.villa_listings(id) on delete cascade,
 enabled boolean not null default false,
 blocks jsonb not null default '[]'::jsonb check (public.villa_valid_blocks(blocks)),
 updated_at timestamptz not null default clock_timestamp()
);
alter table public.villa_calendars enable row level security;
revoke all on public.villa_calendars from anon,authenticated;
grant select on public.villa_calendars to anon,authenticated;
grant insert(listing_id,enabled,blocks),update(enabled,blocks) on public.villa_calendars to authenticated;
drop policy if exists "calendar public read" on public.villa_calendars;
create policy "calendar public read" on public.villa_calendars for select to anon,authenticated using (exists(select 1 from public.villa_listings v where v.id=listing_id and v.status='published' and v.visibility='public'));
drop policy if exists "calendar owner read" on public.villa_calendars;
create policy "calendar owner read" on public.villa_calendars for select to authenticated using (exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "calendar owner insert" on public.villa_calendars;
create policy "calendar owner insert" on public.villa_calendars for insert to authenticated with check (exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
drop policy if exists "calendar owner update" on public.villa_calendars;
create policy "calendar owner update" on public.villa_calendars for update to authenticated using (exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid()))) with check (exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
create or replace function public.villa_calendar_touch()
returns trigger language plpgsql set search_path=public as $$ begin new.updated_at=clock_timestamp();return new;end $$;
drop trigger if exists villa_calendar_touch on public.villa_calendars;
create trigger villa_calendar_touch before update on public.villa_calendars for each row execute function public.villa_calendar_touch();
-- Enforce the current calendar on enquiry insertion, including requests outside the website UI.
create or replace function public.villa_enquiry_calendar_guard()
returns trigger language plpgsql set search_path=public as $$ begin
 if exists(select 1 from public.villa_calendars c cross join lateral jsonb_array_elements(c.blocks) b
  where c.listing_id=new.listing_id and c.enabled and new.arrival<(b->>'end')::date and new.departure>(b->>'start')::date)
 then raise exception 'VILLA_DATES_BLOCKED' using errcode='23514';end if;
 return new;
end $$;
drop trigger if exists villa_enquiry_calendar_guard on public.villa_inquiries;
create trigger villa_enquiry_calendar_guard before insert on public.villa_inquiries for each row execute function public.villa_enquiry_calendar_guard();
notify pgrst,'reload schema';
commit;

-- LE GOLFE V56. Run after villas-v54.sql. One transaction, safe to re-run.
begin;
alter table public.villa_calendars add column if not exists reserved jsonb not null default '[]'::jsonb;
do $$ begin
 if not exists(select 1 from pg_constraint where conrelid='public.villa_calendars'::regclass and conname='villa_calendar_reserved_valid') then
 alter table public.villa_calendars add constraint villa_calendar_reserved_valid check(public.villa_valid_blocks(reserved));end if;
end $$;
-- Manual blocks and confirmed stays are separate. Owners cannot edit reserved directly.
revoke update on public.villa_calendars from authenticated;
grant update(enabled,blocks) on public.villa_calendars to authenticated;
create table if not exists public.villa_bookings(
 inquiry_id uuid primary key references public.villa_inquiries(id) on delete cascade,
 listing_id text not null references public.villa_listings(id) on delete cascade,
 arrival date not null,departure date not null check(departure>arrival),
 status text not null check(status in ('quote','confirmed','cancelled')),
 total_price numeric(12,2) not null check(total_price>=0 and total_price<=10000000),
 conditions text not null check(length(trim(conditions)) between 10 and 3000),
 updated_at timestamptz not null default clock_timestamp()
);
create index if not exists villa_bookings_listing_status on public.villa_bookings(listing_id,status);
alter table public.villa_bookings enable row level security;
revoke all on public.villa_bookings from anon,authenticated;
grant select on public.villa_bookings to authenticated;
drop policy if exists "booking owner read" on public.villa_bookings;
create policy "booking owner read" on public.villa_bookings for select to authenticated using(exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
-- Only this checked RPC writes bookings and their public night blocks together.
create or replace function public.villa_booking_action(p_inquiry_id uuid,p_action text,p_expected_version timestamptz,p_total_price numeric,p_conditions text,p_agreed boolean)
returns jsonb language plpgsql security definer set search_path='' set lock_timeout='5s' as $$
declare req public.villa_inquiries%rowtype; booking public.villa_bookings%rowtype; cal public.villa_calendars%rowtype; owner_listing text; has_booking boolean;
begin
 if auth.uid() is null then raise exception 'SIGN_IN_REQUIRED';end if;
 if p_action is null or p_action not in ('quote','confirm','cancel') then raise exception 'INVALID_ACTION';end if;
 select * into req from public.villa_inquiries where id=p_inquiry_id;
 if not found then raise exception 'OWNER_REQUIRED';end if;
 -- Serializes all confirmations for the same house, including different enquiries.
 select id into owner_listing from public.villa_listings where id=req.listing_id and owner_id=auth.uid() for update;
 if not found then raise exception 'OWNER_REQUIRED';end if;
 select * into booking from public.villa_bookings where inquiry_id=p_inquiry_id for update;has_booking:=found;
 if (has_booking and booking.updated_at is distinct from p_expected_version) or (not has_booking and p_expected_version is not null) then raise exception 'BOOKING_CONFLICT';end if;
 if p_action='quote' then
  if has_booking and booking.status='confirmed' then raise exception 'BOOKING_ALREADY_CONFIRMED';end if;
  if p_total_price is null or p_total_price<0 or p_total_price>10000000 or p_conditions is null or length(trim(p_conditions)) not between 10 and 3000 then raise exception 'INVALID_QUOTE';end if;
  insert into public.villa_bookings(inquiry_id,listing_id,arrival,departure,status,total_price,conditions)
   values(req.id,req.listing_id,req.arrival,req.departure,'quote',round(p_total_price,2),trim(p_conditions))
   on conflict(inquiry_id) do update set status='quote',total_price=excluded.total_price,conditions=excluded.conditions,updated_at=clock_timestamp()
   returning * into booking;
  return to_jsonb(booking);
 end if;
 if not has_booking then raise exception 'QUOTE_REQUIRED';end if;
 if p_agreed is distinct from true then raise exception 'AGREEMENT_REQUIRED';end if;
 select * into cal from public.villa_calendars where listing_id=req.listing_id for update;
 if not found then raise exception 'CALENDAR_NOT_READY';end if;
 if p_action='confirm' then
  if booking.status<>'quote' then raise exception 'QUOTE_REQUIRED';end if;
  if req.arrival<(now() at time zone 'Europe/Paris')::date then raise exception 'PAST_STAY';end if;
  if not cal.enabled then raise exception 'CALENDAR_NOT_READY';end if;
  if exists(select 1 from jsonb_array_elements(cal.blocks) b where req.arrival<(b->>'end')::date and req.departure>(b->>'start')::date)
   or exists(select 1 from public.villa_bookings b where b.listing_id=req.listing_id and b.status='confirmed' and b.inquiry_id<>req.id and req.arrival<b.departure and req.departure>b.arrival)
  then raise exception 'DATES_UNAVAILABLE';end if;
  if (select count(*) from public.villa_bookings b where b.listing_id=req.listing_id and b.status='confirmed' and b.departure>(now() at time zone 'Europe/Paris')::date)>=200 then raise exception 'CALENDAR_LIMIT';end if;
  update public.villa_bookings set status='confirmed',updated_at=clock_timestamp() where inquiry_id=req.id returning * into booking;
 else
  if booking.status<>'confirmed' then raise exception 'NO_CONFIRMED_STAY';end if;
  update public.villa_bookings set status='cancelled',updated_at=clock_timestamp() where inquiry_id=req.id returning * into booking;
 end if;
 -- Names, amounts, enquiry identifiers and conditions never enter the public calendar.
 update public.villa_calendars set reserved=coalesce((select jsonb_agg(jsonb_build_object('start',to_char(b.arrival,'YYYY-MM-DD'),'end',to_char(b.departure,'YYYY-MM-DD')) order by b.arrival)
  from public.villa_bookings b where b.listing_id=req.listing_id and b.status='confirmed' and b.departure>(now() at time zone 'Europe/Paris')::date),'[]'::jsonb)
  where listing_id=req.listing_id;
 return to_jsonb(booking);
end $$;
revoke execute on function public.villa_booking_action(uuid,text,timestamptz,numeric,text,boolean) from public,anon,authenticated;
grant execute on function public.villa_booking_action(uuid,text,timestamptz,numeric,text,boolean) to authenticated;
-- Protect enquiries against both manual blocks and confirmed stays, even if the calendar is disabled later.
create or replace function public.villa_enquiry_calendar_guard()
returns trigger language plpgsql set search_path=public as $$ begin
 if exists(select 1 from public.villa_calendars c cross join lateral jsonb_array_elements(case when c.enabled then c.blocks else '[]'::jsonb end || c.reserved) b
  where c.listing_id=new.listing_id and new.arrival<(b->>'end')::date and new.departure>(b->>'start')::date)
 then raise exception 'VILLA_DATES_BLOCKED' using errcode='23514';end if;
 return new;
end $$;
notify pgrst,'reload schema';
commit;
