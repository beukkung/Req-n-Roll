# Backend Implementation Plan — Req'n Roll v0.1 (Internal Beta)

> Handoff plan for the backend model. The **frontend is complete** (nickname login,
> gamification, all pages). This document covers only the Supabase/backend work
> needed to make the live beta functional and instrumented.
>
> Source of truth for the product plan: `.claude/plan/reqn-roll-mvp.md`.

---

## 1. Current state (what already exists)

### Frontend (DONE — do not rewrite)
- All routes build & render: `/`, `/skill-amp{,/quiz,/result}`, `/daily-req`,
  `/req-gym{,/practice/[setId]}`, `/templates`, `/profile`, `/leaderboard`, `/feedback`.
- **Identity = nickname only (no account/auth).** On first visit a `NicknameGate`
  modal asks for a nickname; it's stored in `localStorage` (`reqn-roll:nickname`)
  and mirrored to the gamify profile's `displayName`. Editable from `/profile`.
- Gamification (XP/levels/badges/streak) runs 100% on `localStorage`
  (`reqn-roll:profile`). `tsc`, `eslint`, and `next build` all pass.

### Backend wiring (PARTIAL — your job)
- `lib/supabase/{env,client,server}.ts` exist and are **null-safe**: if
  `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset, the
  client returns `null` and every remote call silently no-ops (graceful demo).
- Migrations present in `supabase/migrations/`:
  - `0001_init.sql` — content tables (`skills`, `personas`, question banks,
    `templates`), activity tables, `internal_allowlist`, RLS.
  - `0002_gamify.sql` — **nickname-keyed** `nick_profiles` + `xp_events` +
    `leaderboard` view + anon-friendly RLS. (Matches the frontend identity model.)
  - `supabase/seed.sql` — 6 skills + 5 personas (UTF-8 Thai).
- Remote sync code:
  - `lib/gamify/profile.ts` → `persistRemote(profile, kind, amount, nickname)`
    and `getLeaderboard(meNickname)` are **nickname-keyed and already correct**.
  - `.env.local.example` documents the required env vars.

### ⚠️ The one inconsistency you MUST resolve
`0001_init.sql` and its **activity-table persist functions** were written for the
original *auth* model (`user_id uuid references auth.users`, gated by `auth.uid()`).
The app is now **nickname-only with no Supabase Auth**, so:

- `lib/skill-amp.ts#persistSkillAmpResult`
- `lib/daily-req.ts#persistDailyReqCompletion`
- `lib/req-gym.ts#persistAttempt`
- `lib/templates.ts#downloadTemplate` (the `template_downloads` insert)
- `lib/feedback.ts#persistFeedback`

…each calls `supabase.auth.getUser()` and **bails when there's no user**. Under
nickname-only they are **all dormant** → no server-side completion / feedback /
download metrics are captured. (Local progress still works fine.)

The gamification leaderboard (`nick_profiles`) is independent and already works.

---

## 2. Decisions required before coding

| # | Decision | Recommended | Impact |
|---|----------|-------------|--------|
| D1 | Identity model | **Nickname-only, no Supabase Auth** | Locks the whole schema to nickname keys |
| D2 | Activity metrics | **Switch the 5 activity tables to nickname-keyed** (new `0003` migration) so beta captures real completion/feedback/download data | Most of the work below |
| D3 | Templates | **Keep generated Markdown bodies** (already work offline); optionally add a `templates` Storage bucket later | Saves time |
| D4 | Content (question banks) | **Keep in `lib/content.ts`** for the beta; migrate to DB only if admins need to edit questions without a deploy | Avoids risky data migration |
| D5 | Internal-only access | **Restrict at the network/host layer** (see §7). No auth = RLS cannot scope writes per user | Security |

If D2 is rejected (keep metrics local-only), then backend work shrinks to
**§3 + §4 only** (project + gamification leaderboard) and you can skip §5.

---

## 3. Phase 1 — Supabase project + env + base content (required)

1. Create a Supabase project. Pick a region matching data-residency requirements
   (confirm with stakeholder — internal company data may need a specific region).
2. Set env vars (local `.env.local` **and** on the deploy host, e.g. Vercel):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (only if you add server routes / a cron later)
3. Apply migrations in order, then seed:
   - `supabase/migrations/0001_init.sql`
   - `supabase/migrations/0002_gamify.sql`
   - `supabase/seed.sql`
   - (Phase 3) `supabase/migrations/0003_nickname_metrics.sql`
4. Verify: `select count(*) from personas;` → 5. The `nick_profiles.persona_slug`
   FK references `personas(slug)`, so 0001 + seed must run before/with 0002.

**Deliverable:** app loads with Supabase configured; `isSupabaseConfigured()` true.

---

## 4. Phase 2 — Gamification leaderboard (cross-user) — required

The frontend already calls `persistRemote(profile, kind, amount, nickname)` on
every award and `getLeaderboard(nickname)` on `/leaderboard`. With `0002_gamify.sql`
applied and env set, this works out of the box.

- `nick_profiles` (PK `nickname`) is upserted on every XP gain.
- `xp_events` records each award (optional audit trail).
- `leaderboard` view returns top 50 by `total_xp`.

**Verify:**
- [ ] From two browsers/two nicknames, do an activity each → both appear on `/leaderboard`, your own row is highlighted.
- [ ] Changing nickname in `/profile` updates the `nick_profiles.nickname` (upsert) — note this creates a new row, not a rename (see §8 open question).

---

## 5. Phase 3 — Activity metrics, nickname-keyed (if D2 = recommended)

### 5a. New migration `supabase/migrations/0003_nickname_metrics.sql`
Replace the auth-keyed activity tables with nickname-keyed equivalents (or add new
ones). Suggested shape (anon-readable/writable, same trust assumption as 0002):

```sql
-- skill_amp_results (nickname)
create table if not exists public.skill_amp_results (
  id uuid primary key default gen_random_uuid(),
  nickname text not null references public.nick_profiles(nickname) on delete cascade,
  scores jsonb not null,
  persona_slug text not null references public.personas(slug),
  created_at timestamptz not null default now()
);

-- daily_req_completions (one row per nickname per day)
create table if not exists public.daily_req_completions (
  nickname text not null references public.nick_profiles(nickname) on delete cascade,
  "date" date not null,
  score int not null,
  primary key (nickname, "date")
);

-- req_gym_attempts
create table if not exists public.req_gym_attempts (
  id uuid primary key default gen_random_uuid(),
  nickname text not null references public.nick_profiles(nickname) on delete cascade,
  set_id text not null,
  score int not null,
  total int not null,
  completed_at timestamptz not null default now()
);

-- template_downloads (nickname optional; count via this table)
create table if not exists public.template_downloads (
  template_id text not null references public.templates(slug) on delete cascade,
  nickname text references public.nick_profiles(nickname) on delete set null,
  "at" timestamptz not null default now()
);

-- feedback
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  nickname text references public.nick_profiles(nickname) on delete set null,
  rating int not null check (rating between 1 and 5),
  used_for_real_work boolean not null default false,
  category text not null,
  comment text,
  created_at timestamptz not null default now()
);
```
Then enable RLS + permissive anon policies (read all; insert/update any) — same
pattern and trust note as `0002_gamify.sql`. Add a `download_count` maintenance
view or RPC if a per-template count is wanted.

> The old `user_id`-based tables in 0001 can be left in place (harmless) or
> dropped. Recommendation: **drop them** to avoid confusion:
> `drop table if exists public.skill_amp_results cascade;` etc.

### 5b. Update the frontend persist functions (small edits)
Each function currently does `const { data: auth } = await supabase.auth.getUser();
if (!auth.user) return;` and inserts `user_id`. Change to accept/insert `nickname`:

- `lib/skill-amp.ts#persistSkillAmpResult(result, nickname)` → insert
  `{ nickname, scores, persona_slug }`.
- `lib/daily-req.ts#persistDailyReqCompletion(c, nickname)` → upsert
  `{ nickname, date, score }` on conflict `(nickname, date)`.
- `lib/req-gym.ts#persistAttempt(setId, score, total, nickname)` → insert
  `{ nickname, set_id, score, total }`.
- `lib/templates.ts#downloadTemplate(t, nickname)` → insert
  `{ template_id, nickname }` (nickname optional).
- `lib/feedback.ts#persistFeedback(entry, nickname)` → insert
  `{ nickname, rating, used_for_real_work, category, comment }`.

Thread `nickname` from the call sites (each page already has `useGamify().nickname`
available — Skill Amp quiz, Daily Req, Req Gym runner, Templates card, Feedback form).
`persistRemote` in `lib/gamify/profile.ts` is the template to copy.

**Verify:**
- [ ] Complete Skill Amp → row in `skill_amp_results` with your nickname.
- [ ] Daily Req → upsert row for today.
- [ ] Req Gym attempt → row inserted.
- [ ] Template download → `template_downloads` row.
- [ ] Submit feedback → `feedback` row.
- [ ] No `auth` calls remain in these functions.

---

## 6. Phase 4 — Templates (optional, D3)

- **Minimum:** the generated Markdown bodies (`lib/templates.ts#TEMPLATE_BODIES`)
  already produce clean `.md` downloads with no backend. This is fine for beta.
- **If a Storage bucket is wanted:** create a public bucket `templates`, upload
  `<slug>.md` for each of the 5 templates, and the existing `downloadTemplate()`
  will fetch from storage automatically (it already tries `supabase.storage
  .from("templates").download(...)`) and fall back to the generated body on error.
- The `template_downloads` insert already exists in code; just make it
  nickname-keyed per §5.

---

## 7. Phase 5 — Security: keeping it internal-only (D5)

With no auth, the `anon` role can read/write. For a 20–30 person internal beta this
is acceptable **only if access is restricted elsewhere**:

- **Recommended:** front the app (and/or the Supabase project) behind the company
  network / VPN / SSO-gated proxy (e.g. Cloudflare Access, Vercel password /
  deployment protection, or an internal reverse proxy with IP allowlist).
- Document the trust assumption (already noted in the `0002_gamify.sql` header).
- Light abuse guards: cap nickname length (done, 20 chars) and consider a
  simple rate-limit on writes (Supabase Edge Function or a proxy rule) to deter
  nickname squatting / spam.
- **Do NOT** ship this model externally without adding real auth.

---

## 8. Phase 6 — Deploy (Vercel)

1. Push repo; import into Vercel.
2. Set the same env vars in Vercel project settings.
3. Ensure migrations + seed are applied to the production Supabase project.
4. Smoke test the §4 + §5 checklists against the live URL.
5. Share the live URL + a suggested starting nickname with the 20–30 beta users.

---

## 9. Open questions for the next session / stakeholder

1. **Nickname as identity key** — two people picking the same nickname collide
   (one overwrites the other's leaderboard row). Acceptable for a small internal
   beta; if not, add an optional email/passcode tie-breaker later.
2. **Rename behavior** — editing a nickname currently creates a *new*
   `nick_profiles` row (XP doesn't carry over). Decide: keep (simple) vs.
   migrate XP on rename (needs an RPC/service role).
3. **Data residency** — confirm Supabase region before project creation.
4. **Metric tables decision (D2)** — nickname-keyed (recommended) vs. local-only.
5. **Template files (D3)** — generated Markdown vs. Storage bucket.

---

## 10. Files you will touch

| File | Change |
|------|--------|
| `supabase/migrations/0003_nickname_metrics.sql` | **Create** (Phase 3) |
| `lib/skill-amp.ts` | `persistSkillAmpResult` → nickname |
| `lib/daily-req.ts` | `persistDailyReqCompletion` → nickname |
| `lib/req-gym.ts` | `persistAttempt` → nickname |
| `lib/templates.ts` | `downloadTemplate` count insert → nickname |
| `lib/feedback.ts` | `persistFeedback` → nickname |
| call sites: `app/skill-amp/quiz/page.tsx`, `app/daily-req/page.tsx`, `components/req-gym-runner.tsx`, `components/template-card.tsx`, `components/feedback-form.tsx` | pass `nickname` from `useGamify()` |
| `.env.local` + host env | add the 2–3 Supabase vars |

No frontend feature work is required — only threading `nickname` into the persist
calls and applying/authoring the SQL.
