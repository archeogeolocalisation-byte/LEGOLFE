-- LE GOLFE / private saved day plan for signed-in users.
-- Apply with Supabase SQL Editor before enabling cloud sync in production.
create table if not exists public.user_day_plans (
 user_id uuid primary key references auth.users(id) on delete cascade,
 payload jsonb not null,
 updated_at timestamptz not null default now(),
 constraint user_day_plans_valid_payload check (
   jsonb_typeof(payload)='object'
   and payload->>'version'='1'
   and payload->>'format' in ('half','full')
   and jsonb_typeof(payload->'placeIds')='array'
   and jsonb_array_length(payload->'placeIds') between 1 and 6
   and length(payload::text)<4096
 )
);
alter table public.user_day_plans enable row level security;
revoke all on public.user_day_plans from anon;
grant select,insert,update,delete on public.user_day_plans to authenticated;
drop policy if exists "read own day plan" on public.user_day_plans;
create policy "read own day plan" on public.user_day_plans for select to authenticated using ((select auth.uid())=user_id);
drop policy if exists "create own day plan" on public.user_day_plans;
create policy "create own day plan" on public.user_day_plans for insert to authenticated with check ((select auth.uid())=user_id);
drop policy if exists "update own day plan" on public.user_day_plans;
create policy "update own day plan" on public.user_day_plans for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
drop policy if exists "delete own day plan" on public.user_day_plans;
create policy "delete own day plan" on public.user_day_plans for delete to authenticated using ((select auth.uid())=user_id);
