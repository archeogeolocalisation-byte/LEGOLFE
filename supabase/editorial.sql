-- LE GOLFE V23 — Editorial inbox for WHAT'S ON + LOCAL
-- Run after supabase/community.sql. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists public.editorial_inbox (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('event','news')),
  source_key text not null,
  source_label text not null,
  external_url text not null,
  fingerprint text not null unique,
  title text not null,
  title_fr text,
  summary text,
  summary_fr text,
  why text,
  why_fr text,
  start_date date,
  end_date date,
  event_time text,
  location text,
  venue text,
  category text,
  image_url text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  raw jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id) on delete set null
);

alter table public.editorial_inbox enable row level security;

drop policy if exists "approved editorial content is public" on public.editorial_inbox;
create policy "approved editorial content is public"
on public.editorial_inbox for select
using (status='approved' or public.is_community_moderator());

drop policy if exists "moderators insert editorial inbox" on public.editorial_inbox;
create policy "moderators insert editorial inbox"
on public.editorial_inbox for insert to authenticated
with check (public.is_community_moderator() and status='pending');

drop policy if exists "moderators update editorial inbox" on public.editorial_inbox;
create policy "moderators update editorial inbox"
on public.editorial_inbox for update to authenticated
using (public.is_community_moderator())
with check (public.is_community_moderator());

create index if not exists editorial_inbox_status_idx on public.editorial_inbox(status, content_type);
create index if not exists editorial_inbox_date_idx on public.editorial_inbox(start_date desc nulls last, created_at desc);
