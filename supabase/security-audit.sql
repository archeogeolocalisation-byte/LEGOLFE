-- Read-only inventory. Run as administrator; do not paste guest rows or secrets.
select n.nspname as schema,c.relname as relation,c.relkind,c.relrowsecurity as rls,
  c.relforcerowsecurity as force_rls
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname in ('public','legolfe_private') and c.relkind in ('r','p','v','m')
order by 1,2;
select schemaname,tablename,policyname,permissive,roles,cmd,qual,with_check
from pg_policies where schemaname in ('public','storage') order by 1,2,3;
select table_schema,table_name,grantee,privilege_type
from information_schema.role_table_grants
where table_schema in ('public','storage','legolfe_private') and grantee in ('anon','authenticated','PUBLIC')
order by 1,2,3,4;
select table_schema,table_name,column_name,grantee,privilege_type
from information_schema.column_privileges
where table_schema='public' and grantee in ('anon','authenticated','PUBLIC') order by 1,2,3,4;
select n.nspname,p.proname,pg_get_function_identity_arguments(p.oid) as args,
  p.prosecdef as security_definer,p.proconfig,
  has_function_privilege('anon',p.oid,'EXECUTE') as anon_execute,
  has_function_privilege('authenticated',p.oid,'EXECUTE') as authenticated_execute
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname in ('public','legolfe_private') order by 1,2;
select id,public,file_size_limit,allowed_mime_types from storage.buckets order by id;
select table_name,column_name,data_type,column_default,is_nullable
from information_schema.columns where table_schema='public' and table_name='requests' order by ordinal_position;
-- After applying security-phase1.sql: counts only, no listing contents.
-- select count(*) as invalid_existing_listings from public.villa_listings
-- where public.villa_valid_payload(payload,id) is distinct from true;
