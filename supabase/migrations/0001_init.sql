-- Req'n Roll v0.1 — base schema, content tables, RLS, internal allowlist
-- Safe to re-run: idempotent guards via IF NOT EXISTS / IF EXISTS.

create extension if not exists "pgcrypto";

-- ---------- enums / helpers ----------
do $$ begin
  create type daily_req_type as enum (
    'requirement_quality','user_story_gap','stakeholder_followup',
    'ac_testable','scope_risk','priority'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type knowledge_area as enum (
    'business_analysis_planning','elicitation_collaboration',
    'requirements_lifecycle','strategy_analysis','solution_evaluation',
    'underlying_competencies'
  );
exception when duplicate_object then null; end $$;

-- ---------- reference / content tables ----------
create table if not exists public.skills (
  slug         text primary key,
  name_th      text not null,
  name_en      text not null,
  short_th     text not null,
  chart_index  int  not null
);

create table if not exists public.personas (
  slug                text primary key,
  name_th             text not null,
  name_en             text not null,
  persona_title_th    text not null,
  persona_title_en    text not null,
  tagline_th          text not null,
  description_th      text not null,
  primary_skill       text not null references public.skills(slug),
  breed_slug          text not null,
  breed_personality_th text not null,
  accent_chart_index  int not null
);

create table if not exists public.skill_amp_questions (
  id        text primary key,
  skill     text not null references public.skills(slug),
  text_th   text not null,
  "order"   int  not null default 0,
  weight    numeric not null default 1
);

create table if not exists public.daily_req_questions (
  id            text primary key,
  "date"        date,
  type          daily_req_type not null,
  prompt_th     text not null,
  options       jsonb not null,
  answer        int not null,
  explanation_th text not null
);

create table if not exists public.req_gym_questions (
  id             text primary key,
  knowledge_area knowledge_area not null,
  difficulty     text not null check (difficulty in ('easy','medium','hard')),
  prompt_th      text not null,
  options        jsonb not null,
  answer         int not null,
  explanation_th text not null
);

create table if not exists public.templates (
  slug            text primary key,
  name            text not null,
  category        text not null,
  description_th  text not null,
  file_path       text,
  download_count  int not null default 0
);

-- ---------- user activity tables ----------
create table if not exists public.skill_amp_results (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  scores       jsonb not null,
  persona_slug text not null references public.personas(slug),
  created_at   timestamptz not null default now()
);

create table if not exists public.daily_req_completions (
  user_id  uuid not null references auth.users(id) on delete cascade,
  "date"   date not null,
  score    int  not null,
  primary key (user_id, "date")
);

create table if not exists public.req_gym_attempts (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  set_id       text not null,
  score        int  not null,
  total        int  not null,
  completed_at timestamptz not null default now()
);

create table if not exists public.template_downloads (
  template_id text not null references public.templates(slug) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  "at"        timestamptz not null default now()
);

create table if not exists public.feedback (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references auth.users(id) on delete cascade,
  rating             int  not null check (rating between 1 and 5),
  used_for_real_work boolean not null default false,
  category           text not null,
  comment            text,
  created_at         timestamptz not null default now()
);

-- ---------- internal allowlist (sign-up gating) ----------
create table if not exists public.internal_allowlist (
  email text primary key,
  note  text
);

-- ---------- Row-Level Security ----------
alter table public.skill_amp_results         enable row level security;
alter table public.daily_req_completions      enable row level security;
alter table public.req_gym_attempts           enable row level security;
alter table public.template_downloads         enable row level security;
alter table public.feedback                   enable row level security;
alter table public.skill_amp_results          enable row level security;

-- Content/reference tables are readable by any authenticated (internal) user.
do $$
declare t text;
begin
  foreach t in array array[
    'skills','personas','skill_amp_questions','daily_req_questions',
    'req_gym_questions','templates'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format($f$
      drop policy if exists read_authenticated on public.%I;
      create policy read_authenticated on public.%I
        for select using (auth.role() = 'authenticated');
    $f$, t, t);
  end loop;
end $$;

-- Activity tables: read + write only your own rows.
do $$
declare t text;
begin
  foreach t in array array[
    'skill_amp_results','daily_req_completions','req_gym_attempts',
    'template_downloads','feedback'
  ] loop
    execute format($f$
      drop policy if exists own_select on public.%I;
      create policy own_select on public.%I for select
        using (auth.uid() = user_id);
      drop policy if exists own_insert on public.%I;
      create policy own_insert on public.%I for insert
        with check (auth.uid() = user_id);
      drop policy if exists own_update on public.%I;
      create policy own_update on public.%I for update
        using (auth.uid() = user_id);
    $f$, t, t, t, t, t, t);
  end loop;
end $$;

-- template_downloads uses (template_id, user_id) — adapt policies.
drop policy if exists td_select on public.template_downloads;
create policy td_select on public.template_downloads for select
  using (auth.uid() = user_id);
drop policy if exists td_insert on public.template_downloads;
create policy td_insert on public.template_downloads for insert
  with check (auth.uid() = user_id);
