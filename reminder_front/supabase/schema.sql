create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  name text,
  target_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists class_name text default 'Scholar';
alter table public.profiles add column if not exists class_label text default '차분한 학습가';
alter table public.profiles add column if not exists character_id text default 'cream-bunny';
alter table public.profiles add column if not exists level int not null default 1;
alter table public.profiles add column if not exists xp int not null default 0;
alter table public.profiles add column if not exists next_level_xp int not null default 500;
alter table public.profiles add column if not exists streak int not null default 0;
alter table public.profiles add column if not exists recovery_tokens int not null default 2;
alter table public.profiles add column if not exists recovery_rate int not null default 0;
alter table public.profiles add column if not exists last_completed_date date;

create table if not exists public.app_data (
  user_id uuid primary key references auth.users on delete cascade,
  data jsonb not null,
  schema_version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quests (
  user_id uuid not null references auth.users on delete cascade,
  quest_date date not null,
  id text not null,
  type text not null default 'main',
  title text not null,
  category text,
  scheduled_time text,
  difficulty text,
  xp int not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  description text,
  recovery_action text,
  steps jsonb not null default '[]'::jsonb,
  color text,
  visual text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, quest_date, id)
);

create table if not exists public.checkins (
  user_id uuid not null references auth.users on delete cascade,
  checkin_date date not null,
  period text not null check (period in ('am', 'pm')),
  energy_level text,
  busy_level text,
  primary_focus text,
  completed_today boolean,
  failure_reasons text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, checkin_date, period)
);

alter table public.profiles enable row level security;
alter table public.app_data enable row level security;
alter table public.quests enable row level security;
alter table public.checkins enable row level security;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.app_data to authenticated;
grant select, insert, update, delete on public.quests to authenticated;
grant select, insert, update, delete on public.checkins to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists "profiles_delete_own" on public.profiles;
create policy "profiles_delete_own" on public.profiles for delete to authenticated using ((select auth.uid()) = id);

drop policy if exists "app_data_select_own" on public.app_data;
create policy "app_data_select_own" on public.app_data for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "app_data_insert_own" on public.app_data;
create policy "app_data_insert_own" on public.app_data for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "app_data_update_own" on public.app_data;
create policy "app_data_update_own" on public.app_data for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "app_data_delete_own" on public.app_data;
create policy "app_data_delete_own" on public.app_data for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "quests_select_own" on public.quests;
create policy "quests_select_own" on public.quests for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "quests_insert_own" on public.quests;
create policy "quests_insert_own" on public.quests for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "quests_update_own" on public.quests;
create policy "quests_update_own" on public.quests for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "quests_delete_own" on public.quests;
create policy "quests_delete_own" on public.quests for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "checkins_select_own" on public.checkins;
create policy "checkins_select_own" on public.checkins for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "checkins_insert_own" on public.checkins;
create policy "checkins_insert_own" on public.checkins for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "checkins_update_own" on public.checkins;
create policy "checkins_update_own" on public.checkins for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "checkins_delete_own" on public.checkins;
create policy "checkins_delete_own" on public.checkins for delete to authenticated using ((select auth.uid()) = user_id);
