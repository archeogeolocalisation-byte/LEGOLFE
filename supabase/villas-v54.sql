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
