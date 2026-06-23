-- Allow anon upsert on daily_req_completions.
-- PostgREST/Supabase upsert needs SELECT visibility for conflict handling.

drop policy if exists daily_req_completions_select_anon
  on public.daily_req_completions;

create policy daily_req_completions_select_anon
  on public.daily_req_completions
  for select using (true);

grant select on public.daily_req_completions to anon, authenticated;
