-- Run after villas.sql. A heart expresses interest, never a verified-stay review.
-- Safe to re-run; no voter identities are exposed to public clients.
begin;
create table if not exists public.villa_hearts (
 listing_id text not null references public.villa_listings(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(listing_id,user_id)
);
create index if not exists villa_hearts_user_idx on public.villa_hearts(user_id);
alter table public.villa_hearts enable row level security;
revoke all on public.villa_hearts from public,anon,authenticated;

create or replace function public.villa_heart_summary(p_listing_id text)
returns jsonb language plpgsql stable security definer set search_path=pg_catalog as $$
declare owner uuid; actor uuid:=auth.uid(); total bigint; liked boolean;
begin
 select l.owner_id into owner from public.villa_listings l
 where l.id=p_listing_id and l.status='published' and l.visibility='public';
 if not found then raise exception 'LISTING_UNAVAILABLE';end if;
 select count(*) into total from public.villa_hearts h where h.listing_id=p_listing_id and h.user_id<>owner;
 select exists(select 1 from public.villa_hearts h where h.listing_id=p_listing_id and h.user_id=actor and h.user_id<>owner) into liked;
 return jsonb_build_object('count',total,'liked',liked,'signedIn',actor is not null,'canVote',actor is not null and actor<>owner);
end $$;
revoke all on function public.villa_heart_summary(text) from public,anon,authenticated;
grant execute on function public.villa_heart_summary(text) to anon,authenticated;

create or replace function public.set_villa_heart(p_listing_id text,p_liked boolean)
returns jsonb language plpgsql security definer set search_path=pg_catalog as $$
declare owner uuid; actor uuid:=auth.uid();
begin
 if actor is null then raise exception 'SIGN_IN_REQUIRED';end if;
 if p_liked is null then raise exception 'INVALID_VOTE';end if;
 -- Serialise with listing withdrawal and owner changes.
 select l.owner_id into owner from public.villa_listings l
 where l.id=p_listing_id and l.status='published' and l.visibility='public' for share;
 if not found then raise exception 'LISTING_UNAVAILABLE';end if;
 if actor=owner then raise exception 'OWNER_CANNOT_VOTE';end if;
 if p_liked then
  insert into public.villa_hearts(listing_id,user_id) values(p_listing_id,actor) on conflict do nothing;
 else
  delete from public.villa_hearts where listing_id=p_listing_id and user_id=actor;
 end if;
 return public.villa_heart_summary(p_listing_id);
end $$;
revoke all on function public.set_villa_heart(text,boolean) from public,anon,authenticated;
grant execute on function public.set_villa_heart(text,boolean) to authenticated;
commit;
