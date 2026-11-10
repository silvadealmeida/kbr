begin;
select plan(13);

insert into auth.users (id, email)
values
  ('11111111-1111-1111-1111-111111111111', 'owner@example.com'),
  ('22222222-2222-2222-2222-222222222222', 'other@example.com');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.user_progress'::regclass),
  'RLS is enabled'
);

set local role anon;
select throws_ok(
  $$select * from public.user_progress$$,
  '42501', null, 'anonymous users cannot read progress'
);
select throws_ok(
  $$insert into public.user_progress (user_id, progress, sync_id)
    values ('11111111-1111-1111-1111-111111111111', '{"v":1}', gen_random_uuid())$$,
  '42501', null, 'anonymous users cannot create progress'
);

set local role authenticated;
set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select results_eq(
  $$insert into public.user_progress (user_id, progress, sync_id)
    values ('11111111-1111-1111-1111-111111111111', '{"v":1}', gen_random_uuid())
    returning user_id$$,
  array['11111111-1111-1111-1111-111111111111'::uuid],
  'owner creates their progress'
);
select results_eq(
  $$select user_id from public.user_progress$$,
  array['11111111-1111-1111-1111-111111111111'::uuid],
  'owner reads their progress'
);
select results_eq(
  $$update public.user_progress set progress = '{"v":1,"streak":2}' returning progress ->> 'streak'$$,
  array['2'],
  'owner updates their progress'
);

set local request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select is_empty(
  $$select * from public.user_progress$$,
  'another user reads no progress'
);
select throws_ok(
  $$insert into public.user_progress (user_id, progress, sync_id)
    values ('11111111-1111-1111-1111-111111111111', '{"v":1}', gen_random_uuid())$$,
  '42501', null, 'another user cannot insert for the owner'
);
select is_empty(
  $$update public.user_progress set progress = '{"v":1,"streak":9}' returning user_id$$,
  'another user updates no progress'
);

set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select results_eq(
  $$select progress ->> 'streak' from public.user_progress$$,
  array['2'],
  'denied update left owner progress intact'
);

set local request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
select is_empty(
  $$delete from public.user_progress returning user_id$$,
  'another user deletes no progress'
);

set local request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
select results_eq(
  $$delete from public.user_progress returning user_id$$,
  array['11111111-1111-1111-1111-111111111111'::uuid],
  'owner deletes their progress'
);

select is_empty(
  $$select * from public.user_progress$$,
  'owner row was deleted'
);

select * from finish();
rollback;
