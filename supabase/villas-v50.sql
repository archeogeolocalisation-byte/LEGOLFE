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
