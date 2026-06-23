# Vercel Deployment

Req'n Roll is intended to run as a Vercel-hosted Next.js app with Supabase as
the backend.

Recommended Vercel project settings:

1. Import the GitHub repository into Vercel.
2. Framework preset: Next.js.
3. Production branch: `main`.
4. Build command: `npm run build`.
5. Output directory: default.
6. Node.js version: 22.x, if configured in project settings.

Set these Vercel project environment variables for Production and Preview:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Do not add `SUPABASE_ACCESS_TOKEN` or `SUPABASE_SERVICE_ROLE_KEY` to the
frontend Vercel project. Those are only for operational database tasks.

After the Vercel production deployment is healthy, GitHub Pages should stay
disabled or unused so Vercel is the single production frontend.

## Security

This beta intentionally has no Supabase Auth. Nicknames are user-controlled, and
the anon key can write leaderboard and telemetry rows. Keep the hosted app
internal-only with Vercel Deployment Protection, Password Protection, or an
app-level beta gate before sharing outside the beta group.
