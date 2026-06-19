-- Req'n Roll - nickname-keyed metrics + anon-readable content.
--
-- This app intentionally avoids Supabase Auth for the internal beta. Players
-- identify themselves with a local nickname, so activity metrics use
-- nick_profiles.nickname instead of auth.users.id.
--
-- SECURITY NOTE: anon clients can write beta telemetry. This is acceptable
-- only for a hosted internal beta protected by project/hosting/network access.

create extension if not exists "pgcrypto";

-- Content lives in Supabase for the online beta. Browser clients use the anon
-- key, so reference/content tables must be readable without auth.
do $$
declare t text;
begin
  foreach t in array array[
    'skills',
    'personas',
    'skill_amp_questions',
    'daily_req_questions',
    'req_gym_questions',
    'templates'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format($f$
      drop policy if exists content_read_anon on public.%I;
      create policy content_read_anon on public.%I
        for select using (true);
    $f$, t, t);
  end loop;
end $$;

grant select on
  public.skills,
  public.personas,
  public.skill_amp_questions,
  public.daily_req_questions,
  public.req_gym_questions,
  public.templates
to anon, authenticated;

grant select, insert, update on public.nick_profiles to anon, authenticated;
grant insert on public.xp_events to anon, authenticated;
grant select on public.leaderboard to anon, authenticated;
drop policy if exists xp_read on public.xp_events;

alter table public.templates
  add column if not exists meta text not null default '';

-- Replace the old auth.users-keyed activity tables from 0001. Keeping the same
-- table names lets the application code and analytics stay simple.
drop table if exists public.skill_amp_results cascade;
drop table if exists public.daily_req_completions cascade;
drop table if exists public.req_gym_attempts cascade;
drop table if exists public.template_downloads cascade;
drop table if exists public.feedback cascade;

create table public.skill_amp_results (
  id uuid primary key default gen_random_uuid(),
  nickname text not null references public.nick_profiles(nickname) on delete cascade,
  scores jsonb not null,
  persona_slug text not null references public.personas(slug),
  created_at timestamptz not null default now()
);

create table public.daily_req_completions (
  nickname text not null references public.nick_profiles(nickname) on delete cascade,
  "date" date not null,
  score int not null,
  total int not null default 0,
  primary key (nickname, "date")
);

create table public.req_gym_attempts (
  id uuid primary key default gen_random_uuid(),
  nickname text not null references public.nick_profiles(nickname) on delete cascade,
  set_id text not null,
  score int not null,
  total int not null,
  completed_at timestamptz not null default now()
);

create table public.template_downloads (
  id uuid primary key default gen_random_uuid(),
  template_id text not null references public.templates(slug) on delete cascade,
  nickname text references public.nick_profiles(nickname) on delete set null,
  "at" timestamptz not null default now()
);

create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  nickname text references public.nick_profiles(nickname) on delete set null,
  rating int not null check (rating between 1 and 5),
  used_for_real_work boolean not null default false,
  category text not null,
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists skill_amp_results_nickname_created_idx
  on public.skill_amp_results(nickname, created_at desc);

create index if not exists req_gym_attempts_nickname_completed_idx
  on public.req_gym_attempts(nickname, completed_at desc);

create index if not exists template_downloads_template_at_idx
  on public.template_downloads(template_id, "at" desc);

create index if not exists feedback_created_idx
  on public.feedback(created_at desc);

-- Keep templates.download_count maintained when the metric table receives a
-- download event. The function is security definer so it can update the
-- reference table while templates stays read-only to anon clients.
create or replace function public.increment_template_download_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.templates
    set download_count = download_count + 1
    where slug = new.template_id;
  return new;
end;
$$;

drop trigger if exists template_downloads_increment_count
  on public.template_downloads;

create trigger template_downloads_increment_count
  after insert on public.template_downloads
  for each row execute function public.increment_template_download_count();

-- RLS: the app only needs anon inserts/updates for telemetry. It does not need
-- browser-side reads of raw feedback or activity rows.
alter table public.skill_amp_results enable row level security;
alter table public.daily_req_completions enable row level security;
alter table public.req_gym_attempts enable row level security;
alter table public.template_downloads enable row level security;
alter table public.feedback enable row level security;

drop policy if exists skill_amp_results_insert_anon on public.skill_amp_results;
create policy skill_amp_results_insert_anon on public.skill_amp_results
  for insert with check (true);

drop policy if exists daily_req_completions_insert_anon on public.daily_req_completions;
create policy daily_req_completions_insert_anon on public.daily_req_completions
  for insert with check (true);

drop policy if exists daily_req_completions_update_anon on public.daily_req_completions;
create policy daily_req_completions_update_anon on public.daily_req_completions
  for update using (true) with check (true);

drop policy if exists req_gym_attempts_insert_anon on public.req_gym_attempts;
create policy req_gym_attempts_insert_anon on public.req_gym_attempts
  for insert with check (true);

drop policy if exists template_downloads_insert_anon on public.template_downloads;
create policy template_downloads_insert_anon on public.template_downloads
  for insert with check (true);

drop policy if exists feedback_insert_anon on public.feedback;
create policy feedback_insert_anon on public.feedback
  for insert with check (true);

grant insert on
  public.skill_amp_results,
  public.req_gym_attempts,
  public.template_downloads,
  public.feedback
to anon, authenticated;

grant insert, update on public.daily_req_completions to anon, authenticated;
