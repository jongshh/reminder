create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  name text,
  target_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_data (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null,
  schema_version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.app_data enable row level security;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.app_data to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own"
on public.profiles for delete
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "app_data_select_own" on public.app_data;
create policy "app_data_select_own"
on public.app_data for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "app_data_insert_own" on public.app_data;
create policy "app_data_insert_own"
on public.app_data for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "app_data_update_own" on public.app_data;
create policy "app_data_update_own"
on public.app_data for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "app_data_delete_own" on public.app_data;
create policy "app_data_delete_own"
on public.app_data for delete
to authenticated
using ((select auth.uid()) = user_id);
