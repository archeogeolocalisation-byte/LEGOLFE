-- Read-only follow-up to the live metadata exports of 11 October 2026.
-- Contains object definitions, not guest records. Inspect for embedded secrets
-- before sharing, especially if a routine was customized outside this repository.
select jsonb_build_object(
  'functions', (
    select coalesce(jsonb_agg(to_jsonb(f)), '[]'::jsonb)
    from (
      select n.nspname as schema, p.proname,
             pg_get_functiondef(p.oid) as definition
      from pg_proc p join pg_namespace n on n.oid=p.pronamespace
      where n.nspname='public'
        and p.proname in ('is_community_moderator','presence_create_profile','villa_booking_action')
        and p.prokind='f'
    ) f
  ),
  'triggers', (
    select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb)
    from (
      select n.nspname as schema, c.relname as table_name,
             pg_get_triggerdef(t.oid) as definition
      from pg_trigger t join pg_class c on c.oid=t.tgrelid
      join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and not t.tgisinternal
    ) t
  ),
  'constraints', (
    select coalesce(jsonb_agg(to_jsonb(k)), '[]'::jsonb)
    from (
      select c.relname as table_name, k.conname, k.contype,
             pg_get_constraintdef(k.oid) as definition
      from pg_constraint k join pg_class c on c.oid=k.conrelid
      join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public'
    ) k
  ),
  'relations', (
    select coalesce(jsonb_agg(to_jsonb(r)), '[]'::jsonb)
    from (
      select c.relname as relation, c.relkind, c.relrowsecurity as rls,
             c.relforcerowsecurity as force_rls
      from pg_class c join pg_namespace n on n.oid=c.relnamespace
      where n.nspname='public' and c.relkind in ('r','p','v','m')
    ) r
  )
) as audit;
