# Req'n Roll

Internal beta for BA / requirement practice.

- Frontend: Next.js 16, React 19, TypeScript, Tailwind v4
- Hosting target: GitHub Pages static export
- Backend: Supabase hosted project
- Identity: nickname-only, no email sign-in

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The app still runs without Supabase env vars. In that mode it stores progress in
localStorage and skips remote leaderboard/metrics sync.

## Supabase Setup

Install is project-local:

```bash
npx supabase --version
```

Link a hosted Supabase project:

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
```

Apply database schema and seed content:

```bash
npx supabase db push
```

The migration order is:

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_gamify.sql`
3. `supabase/migrations/0003_nickname_metrics.sql`
4. `supabase/seed.sql`

Required env vars for local and GitHub Actions:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` is not required by the app today. Keep it out of the
browser and only use it for future privileged server jobs.

## GitHub Pages Deploy

The workflow is at `.github/workflows/deploy-pages.yml`.

Repository settings needed:

1. Settings -> Pages -> Build and deployment -> Source: GitHub Actions
2. Settings -> Secrets and variables -> Actions -> New repository secret:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The workflow builds with:

```bash
NEXT_PUBLIC_BASE_PATH=/Req-n-Roll npm run build
```

It deploys the static `out/` folder to GitHub Pages. The expected project URL is:

```text
https://beukkung.github.io/Req-n-Roll/
```

## Security Note

This beta intentionally has no Supabase Auth. Nicknames are user-controlled, and
the anon key can write leaderboard and telemetry rows. Keep the hosted app
internal-only with GitHub Pages visibility/access controls or an external
network/SSO layer before sharing outside the beta group.
