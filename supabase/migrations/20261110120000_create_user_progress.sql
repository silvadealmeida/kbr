create table public.user_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  progress jsonb not null,
  sync_id uuid not null,
  updated_at timestamptz not null default now(),
  constraint user_progress_v1 check (
    jsonb_typeof(progress) = 'object'
    and progress ->> 'v' = '1'
  )
);

alter table public.user_progress enable row level security;

revoke all on table public.user_progress from anon, authenticated;
grant select, insert, update, delete on table public.user_progress to authenticated;

create policy "Users select their own progress"
on public.user_progress for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users insert their own progress"
on public.user_progress for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users update their own progress"
on public.user_progress for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users delete their own progress"
on public.user_progress for delete
to authenticated
using ((select auth.uid()) = user_id);
