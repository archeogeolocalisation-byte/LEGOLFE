-- Phase 1, final activation. Run ONLY after the new app uses CommunityPhoto.
-- Does not delete or move any stored photo. Old public image URLs stop working.
begin;
do $$ begin
  if not exists(select 1 from pg_policies where schemaname='storage' and tablename='objects' and policyname='community photo visibility') then
    raise exception 'Apply security-phase1.sql first';
  end if;
end $$;
update storage.buckets set public=false where id='community-photos';
commit;
