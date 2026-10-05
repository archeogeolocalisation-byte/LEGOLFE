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
