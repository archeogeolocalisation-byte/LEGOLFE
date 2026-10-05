-- LE GOLFE V10 — Community module
-- Run once in Supabase SQL Editor. Safe to re-run.
create extension if not exists pgcrypto;

create table if not exists public.community_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Local contributor',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint community_profiles_name_length check (char_length(display_name) between 2 and 40)
);

create table if not exists public.community_moderators (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  place_id text not null,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('photo','comment')),
  image_path text,
  comment text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now(),
  moderated_at timestamptz,
  moderated_by uuid references auth.users(id) on delete set null,
  constraint community_post_has_content check (image_path is not null or nullif(trim(comment),'') is not null),
  constraint community_comment_length check (comment is null or char_length(comment) <= 800)
);

alter table public.community_profiles enable row level security;
alter table public.community_moderators enable row level security;
alter table public.community_posts enable row level security;

create or replace function public.is_community_moderator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.community_moderators m where m.user_id = auth.uid()
  );
$$;

grant execute on function public.is_community_moderator() to anon, authenticated;

-- Profiles: public display name, owner can edit.
drop policy if exists "community profiles are public" on public.community_profiles;
create policy "community profiles are public"
on public.community_profiles for select using (true);

drop policy if exists "users create own community profile" on public.community_profiles;
create policy "users create own community profile"
on public.community_profiles for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists "users update own community profile" on public.community_profiles;
create policy "users update own community profile"
on public.community_profiles for update to authenticated
using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Moderator membership is intentionally not publicly listable.
drop policy if exists "moderators can read moderator list" on public.community_moderators;
create policy "moderators can read moderator list"
on public.community_moderators for select to authenticated
using (public.is_community_moderator());

-- Public sees approved. Contributors see their own pending/rejected. Moderators see all.
drop policy if exists "community posts visibility" on public.community_posts;
create policy "community posts visibility"
on public.community_posts for select
using (
  status = 'approved'
  or auth.uid() = user_id
  or public.is_community_moderator()
);

drop policy if exists "authenticated users can contribute" on public.community_posts;
create policy "authenticated users can contribute"
on public.community_posts for insert to authenticated
with check (
  auth.uid() = user_id
  and status = 'pending'
  and moderated_at is null
  and moderated_by is null
);

drop policy if exists "moderators can moderate community posts" on public.community_posts;
create policy "moderators can moderate community posts"
on public.community_posts for update to authenticated
using (public.is_community_moderator())
with check (public.is_community_moderator());

drop policy if exists "users delete own pending community posts" on public.community_posts;
create policy "users delete own pending community posts"
on public.community_posts for delete to authenticated
using (auth.uid() = user_id and status = 'pending');

-- Storage bucket for community photos.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values (
  'community-photos',
  'community-photos',
  true,
  8388608,
  array['image/jpeg','image/png','image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "community photos are public" on storage.objects;
create policy "community photos are public"
on storage.objects for select
using (bucket_id='community-photos');

drop policy if exists "users upload own community photos" on storage.objects;
create policy "users upload own community photos"
on storage.objects for insert to authenticated
with check (
  bucket_id='community-photos'
  and (storage.foldername(name))[1]=auth.uid()::text
);

drop policy if exists "users delete own community photos" on storage.objects;
create policy "users delete own community photos"
on storage.objects for delete to authenticated
using (
  bucket_id='community-photos'
  and ((storage.foldername(name))[1]=auth.uid()::text or public.is_community_moderator())
);

-- Add your first moderator after that user has signed in once:
-- insert into public.community_moderators (user_id)
-- select id from auth.users where email = 'YOUR_EMAIL@example.com'
-- on conflict (user_id) do nothing;
