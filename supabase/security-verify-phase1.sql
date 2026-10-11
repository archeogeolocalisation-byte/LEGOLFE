-- Run AFTER security-phase1.sql. Read-only: no guest rows or secrets exported.
-- This checks database preparation, not the deployment/Auth settings.
-- community_bucket_private is expected false until the new app is deployed and
-- security-community-private.sql has been applied.
select jsonb_build_object(
  'legacy_anon_read_denied', not has_table_privilege('anon','public.requests','SELECT'),
  'legacy_moderator_reader_enabled', exists (
    select 1 from pg_policies where schemaname='public' and tablename='requests'
      and policyname='security legacy enquiry visibility' and permissive='RESTRICTIVE'
  ),
  'legacy_browser_update_denied', not has_table_privilege('authenticated','public.requests','UPDATE')
    and not has_any_column_privilege('authenticated','public.requests','UPDATE'),
  'legacy_browser_truncate_denied', not has_table_privilege('authenticated','public.requests','TRUNCATE'),
  'guest_inquiries_anon_read_denied', not has_table_privilege('anon','public.villa_inquiries','SELECT'),
  'inquiry_insert_enabled', has_column_privilege('anon','public.villa_inquiries','email','INSERT'),
  'owner_immutable_trigger_enabled', exists (
    select 1 from pg_trigger where tgrelid='public.villa_listings'::regclass
      and tgname='security_listing_guard' and tgenabled='O'
  ),
  'inquiry_guard_tables', (
    select count(*) from pg_trigger where tgname='security_inquiry_guard' and tgenabled='O'
      and tgrelid in ('public.villa_inquiries'::regclass,'public.requests'::regclass)
  ),
  'quota_anon_execute_denied', not has_function_privilege('anon','public.consume_api_quota(text)','EXECUTE'),
  'quota_authenticated_execute_enabled', has_function_privilege('authenticated','public.consume_api_quota(text)','EXECUTE'),
  'moderator_search_path_hardened', exists (
    select 1 from pg_proc p join pg_namespace n on n.oid=p.pronamespace
    where n.nspname='public' and p.proname='is_community_moderator'
      and 'search_path=""'=any(p.proconfig)
  ),
  'community_photo_policy_prepared', exists (
    select 1 from pg_policies where schemaname='storage' and tablename='objects'
      and policyname='security photo visibility' and permissive='RESTRICTIVE'
  ),
  'community_bucket_private', (select not public from storage.buckets where id='community-photos'),
  'existing_listings_needing_correction', (
    select count(*) from public.villa_listings
    where public.villa_valid_payload(payload,id) is distinct from true
  )
) as verification;
