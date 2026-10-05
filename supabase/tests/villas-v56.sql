-- Optional integration check in Supabase SQL Editor AFTER V54 + V56.
-- Uses one existing Auth user and synthetic data. Everything is rolled back.
-- If an assertion fails, run ROLLBACK before running another query.
begin;
create temporary table v56_check as select
 (select id from auth.users order by created_at limit 1) owner_id,
 gen_random_uuid() stranger_id,
 'property-v56-check-'||gen_random_uuid()::text listing_id,
 gen_random_uuid() q1,gen_random_uuid() q2,gen_random_uuid() q3,
 ((now() at time zone 'Europe/Paris')::date+60) first_day,
 null::jsonb b1,null::jsonb b2,null::jsonb b3;
grant select,update on v56_check to authenticated,anon;
do $$ begin if (select owner_id from v56_check) is null then raise exception 'Sign in once before running this check.';end if;end $$;
insert into public.villa_listings(id,owner_id,status,visibility,payload)
 select listing_id,owner_id,'published','public',jsonb_build_object('id',listing_id,'name','V56 synthetic check','location','Ramatuelle','guests',4,'bedrooms',2,'bathrooms',1,'price',1000,'photos','[]'::jsonb,'amenities','[]'::jsonb,'highlights','[]'::jsonb) from v56_check;
insert into public.villa_calendars(listing_id,enabled,blocks)
 select listing_id,true,jsonb_build_array(jsonb_build_object('start',to_char(first_day+10,'YYYY-MM-DD'),'end',to_char(first_day+12,'YYYY-MM-DD'))) from v56_check;
insert into public.villa_inquiries(id,listing_id,name,email,arrival,departure,guests,message)
 select q1,listing_id,'Synthetic guest','v56@example.invalid',first_day+2,first_day+5,2,'V56 synthetic enquiry' from v56_check
 union all select q2,listing_id,'Synthetic guest','v56@example.invalid',first_day+3,first_day+6,2,'V56 synthetic enquiry' from v56_check
 union all select q3,listing_id,'Synthetic guest','v56@example.invalid',first_day+5,first_day+7,2,'V56 synthetic enquiry' from v56_check;
set local role authenticated;
select set_config('request.jwt.claim.sub',owner_id::text,true),set_config('request.jwt.claims',jsonb_build_object('sub',owner_id,'role','authenticated')::text,true) from v56_check;
update v56_check set b1=public.villa_booking_action(q1,'quote',null,1000,'Synthetic terms agreed for testing.',false);
do $$ begin
 if jsonb_array_length((select reserved from public.villa_calendars where listing_id=(select listing_id from v56_check)))<>0 then raise exception 'Quote must not block nights';end if;
end $$;
update v56_check set b1=public.villa_booking_action(q1,'confirm',(b1->>'updated_at')::timestamptz,null,null,true);
update v56_check set b2=public.villa_booking_action(q2,'quote',null,1000,'Synthetic terms agreed for testing.',false);
do $$ declare t record;begin select * into t from v56_check;
 begin perform public.villa_booking_action(t.q2,'confirm',(t.b2->>'updated_at')::timestamptz,null,null,true);raise exception 'Expected DATES_UNAVAILABLE';
 exception when raise_exception then if sqlerrm<>'DATES_UNAVAILABLE' then raise;end if;end;
 if (select status from public.villa_bookings where inquiry_id=t.q2)<>'quote' then raise exception 'Rejected confirmation changed booking';end if;
end $$;
-- Adjacent checkout/arrival is allowed.
update v56_check set b3=public.villa_booking_action(q3,'quote',null,1000,'Synthetic terms agreed for testing.',false);
update v56_check set b3=public.villa_booking_action(q3,'confirm',(b3->>'updated_at')::timestamptz,null,null,true);
-- Reserved nights cannot be edited directly by the owner.
do $$ begin
 begin update public.villa_calendars set reserved='[]'::jsonb where listing_id=(select listing_id from v56_check);raise exception 'Reserved direct write allowed';
 exception when insufficient_privilege then null;end;
end $$;
-- Turning the calendar off does not release confirmed nights.
update public.villa_calendars set enabled=false where listing_id=(select listing_id from v56_check);
do $$ declare t record;begin select * into t from v56_check;
 begin insert into public.villa_inquiries(listing_id,name,email,arrival,departure,guests,message) values(t.listing_id,'Synthetic guest','v56@example.invalid',t.first_day+3,t.first_day+4,2,'This should be rejected.');raise exception 'Confirmed night enquiry accepted';
 exception when check_violation then if sqlerrm<>'VILLA_DATES_BLOCKED' then raise;end if;end;
end $$;
update v56_check set b1=public.villa_booking_action(q1,'cancel',(b1->>'updated_at')::timestamptz,null,null,true);
do $$ declare c public.villa_calendars%rowtype;t record;begin select * into t from v56_check;select * into c from public.villa_calendars where listing_id=t.listing_id;
 if jsonb_array_length(c.reserved)<>1 or c.reserved->0->>'start'<>to_char(t.first_day+5,'YYYY-MM-DD') then raise exception 'Cancellation removed another stay';end if;
 if jsonb_array_length(c.blocks)<>1 or c.blocks->0->>'start'<>to_char(t.first_day+10,'YYYY-MM-DD') then raise exception 'Cancellation removed manual block';end if;
end $$;
-- Another account sees no offer and cannot change it through the RPC.
select set_config('request.jwt.claim.sub',stranger_id::text,true),set_config('request.jwt.claims',jsonb_build_object('sub',stranger_id,'role','authenticated')::text,true) from v56_check;
do $$ declare t record;begin select * into t from v56_check;
 if exists(select 1 from public.villa_bookings where listing_id=t.listing_id) then raise exception 'Another account can read private offers';end if;
 begin perform public.villa_booking_action(t.q1,'quote',(t.b1->>'updated_at')::timestamptz,500,'Stranger terms must not be accepted.',false);raise exception 'Another account can write booking';
 exception when raise_exception then if sqlerrm<>'OWNER_REQUIRED' then raise;end if;end;
end $$;
set local role anon;
do $$ begin
 begin perform * from public.villa_bookings;raise exception 'Anonymous read allowed';exception when insufficient_privilege then null;end;
 begin perform public.villa_booking_action((select q1 from v56_check),'cancel',null,null,null,true);raise exception 'Anonymous RPC allowed';exception when insufficient_privilege then null;end;
end $$;
select 'PASS: quote, overlap rejection, adjacent stays, cancellation, manual blocks, owner isolation and anonymous denial. All fixtures will be rolled back.' as result;
rollback;
