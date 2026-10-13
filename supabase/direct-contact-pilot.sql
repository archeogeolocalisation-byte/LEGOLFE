-- Apply after villas.sql. Re-runnable. No existing listing, enquiry or booking is deleted.
begin;
create schema if not exists legolfe_private;
revoke all on schema legolfe_private from public,anon,authenticated;
create table if not exists legolfe_private.pilot_admissions(listing_id text primary key,admitted_at timestamptz not null default now());
revoke all on legolfe_private.pilot_admissions from public,anon,authenticated;
-- Existing public homes are included. Admission history survives a listing deletion.
insert into legolfe_private.pilot_admissions(listing_id)
select id from public.villa_listings where status='published' and visibility='public' on conflict do nothing;
create or replace function legolfe_private.pilot_admit()
returns trigger language plpgsql security definer set search_path='' as $$
begin
 if new.status='published' and new.visibility='public' then
  perform pg_advisory_xact_lock(170031002);
  if not exists(select 1 from legolfe_private.pilot_admissions where listing_id=new.id) then
   if (select count(*) from legolfe_private.pilot_admissions)>=100 then raise exception 'PILOT_FULL';end if;
   insert into legolfe_private.pilot_admissions(listing_id) values(new.id);
  end if;
 end if;
 return new;
end $$;
revoke all on function legolfe_private.pilot_admit() from public,anon,authenticated;
drop trigger if exists pilot_admission on public.villa_listings;
create trigger pilot_admission before insert or update on public.villa_listings for each row execute function legolfe_private.pilot_admit();

-- Coordinates never belong in the public listing payload.
create table if not exists public.villa_owner_contacts(
 listing_id text primary key references public.villa_listings(id) on delete cascade,
 owner_id uuid not null references auth.users(id),
 email text not null default '',phone text not null default '',
 consent boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.villa_owner_contacts enable row level security;
revoke all on public.villa_owner_contacts from public,anon,authenticated;
grant select on public.villa_owner_contacts to authenticated;
drop policy if exists "contact owner read" on public.villa_owner_contacts;
create policy "contact owner read" on public.villa_owner_contacts for select to authenticated using(owner_id=(select auth.uid()) and exists(select 1 from public.villa_listings v where v.id=listing_id and v.owner_id=(select auth.uid())));
create table if not exists legolfe_private.contact_view_quota(actor uuid not null,bucket bigint not null,n integer not null,primary key(actor,bucket));
revoke all on legolfe_private.contact_view_quota from public,anon,authenticated;

create or replace function public.save_villa_owner_contact(p_listing_id text,p_email text,p_phone text,p_consent boolean)
returns void language plpgsql security definer set search_path='' as $$
declare actor uuid:=auth.uid();
begin
 if actor is null then raise exception 'SIGN_IN_REQUIRED';end if;
 perform 1 from public.villa_listings where id=p_listing_id and owner_id=actor for update;
 if not found then raise exception 'OWNER_REQUIRED';end if;
 if p_consent is null or p_email is null or p_phone is null or length(p_email)>254 or length(p_phone)>40 or p_email~'[[:cntrl:]]' or p_phone~'[[:cntrl:]]' then raise exception 'INVALID_CONTACT';end if;
 if p_consent and (trim(p_email)='' and trim(p_phone)='') then raise exception 'INVALID_CONTACT';end if;
 if trim(p_email)<>'' and p_email!~'^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'INVALID_CONTACT';end if;
 if trim(p_phone)<>'' and p_phone!~'^[+0-9 ().-]{5,40}$' then raise exception 'INVALID_CONTACT';end if;
 if not p_consent then
  delete from public.villa_owner_contacts where listing_id=p_listing_id;
  return;
 end if;
 insert into public.villa_owner_contacts(listing_id,owner_id,email,phone,consent) values(p_listing_id,actor,trim(p_email),trim(p_phone),true)
 on conflict(listing_id) do update set owner_id=excluded.owner_id,email=excluded.email,phone=excluded.phone,consent=true,updated_at=clock_timestamp();
end $$;
revoke all on function public.save_villa_owner_contact(text,text,text,boolean) from public,anon,authenticated;
grant execute on function public.save_villa_owner_contact(text,text,text,boolean) to authenticated;

create or replace function public.villa_owner_contact(p_listing_id text)
returns jsonb language plpgsql security definer set search_path='' as $$
declare viewer_id uuid:=auth.uid();result jsonb;views integer;b bigint:=floor(extract(epoch from clock_timestamp())/3600);
begin
 if viewer_id is null then raise exception 'SIGN_IN_REQUIRED';end if;
 select jsonb_build_object('email',c.email,'phone',c.phone) into result from public.villa_owner_contacts c join public.villa_listings v on v.id=c.listing_id and v.owner_id=c.owner_id
 where c.listing_id=p_listing_id and c.consent and v.status='published' and v.visibility='public';
 if result is null then return null;end if;
 insert into legolfe_private.contact_view_quota values(viewer_id,b,1) on conflict(actor,bucket) do update set n=legolfe_private.contact_view_quota.n+1 returning n into views;
 if views>20 then raise exception 'RATE_LIMITED';end if;
 delete from legolfe_private.contact_view_quota where bucket<b-48;
 return result;
end $$;
revoke all on function public.villa_owner_contact(text) from public,anon,authenticated;
grant execute on function public.villa_owner_contact(text) to authenticated;

-- Disable the previous booking mutation API, including calls from old browser tabs.
do $$ begin
 if to_regprocedure('public.villa_booking_action(uuid,text,timestamptz,numeric,text,boolean)') is not null then
  execute 'revoke execute on function public.villa_booking_action(uuid,text,timestamptz,numeric,text,boolean) from public,anon,authenticated';
 end if;
end $$;
-- Stop legacy requests for the static examples, including direct REST writes.
do $$
declare cols text;
begin
 if to_regclass('public.requests') is not null then
  execute 'revoke insert on public.requests from public,anon,authenticated';
  select string_agg(quote_ident(attname),',') into cols from pg_attribute where attrelid='public.requests'::regclass and attnum>0 and not attisdropped;
  execute 'revoke insert('||cols||') on public.requests from public,anon,authenticated';
 end if;
end $$;
notify pgrst,'reload schema';
commit;
