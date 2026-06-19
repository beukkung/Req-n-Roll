-- Req'n Roll — gamification tables, NICKNAME-keyed (no account/auth required).
--
-- Identity model: a player is identified only by a nickname they type in.
-- There is no auth.users link. This keeps the beta frictionless ("เข้าเว็บแล้ว
-- ใส่ชื่อเล่นแทนการสมัครบัญชี").
--
-- TRUST ASSUMPTION: with no auth, RLS cannot scope writes per user. For an
-- internal beta behind the company network we let the anon role read every
-- row (so the leaderboard works) and upsert any nickname. Anyone on the
-- network could overwrite a nickname's score. Acceptable for a 20–30 user
-- internal beta; revisit before any external launch.

create extension if not exists "pgcrypto";

create table if not exists public.nick_profiles (
  nickname         text primary key,
  display_name     text not null default 'ผู้เล่น',
  total_xp         int  not null default 0,
  level            int  not null default 1,
  streak           int  not null default 0,
  longest_streak   int  not null default 0,
  last_active_day  date,
  persona_slug     text references public.personas(slug),
  badges           jsonb not null default '[]'::jsonb,
  updated_at       timestamptz not null default now()
);

create table if not exists public.xp_events (
  id         uuid primary key default gen_random_uuid(),
  nickname   text not null references public.nick_profiles(nickname) on delete cascade,
  kind       text not null,
  amount     int  not null,
  ref        text,
  created_at timestamptz not null default now()
);

create index if not exists xp_events_nick_idx
  on public.xp_events(nickname, created_at desc);

-- keep updated_at fresh on writes
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists nick_profiles_touch on public.nick_profiles;
create trigger nick_profiles_touch
  before update on public.nick_profiles
  for each row execute function public.touch_updated_at();

-- RLS: anon can read every nickname (leaderboard) and upsert its own row.
-- See the trust-assumption note at the top of this file.
alter table public.nick_profiles enable row level security;
alter table public.xp_events   enable row level security;

drop policy if exists nick_read on public.nick_profiles;
create policy nick_read on public.nick_profiles for select
  using (true);

drop policy if exists nick_upsert on public.nick_profiles;
create policy nick_upsert on public.nick_profiles for insert
  with check (true);

drop policy if exists nick_update on public.nick_profiles;
create policy nick_update on public.nick_profiles for update
  using (true) with check (true);

drop policy if exists xp_insert on public.xp_events;
create policy xp_insert on public.xp_events for insert
  with check (true);

drop policy if exists xp_read on public.xp_events;
create policy xp_read on public.xp_events for select
  using (true);

-- Leaderboard view (top 50 by total XP).
create or replace view public.leaderboard as
  select
    nickname,
    display_name,
    total_xp,
    level,
    streak,
    persona_slug
  from public.nick_profiles
  order by total_xp desc
  limit 50;
