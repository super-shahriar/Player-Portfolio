# Volleyball Player Portfolio — Frontend (GitHub Pages)

This branch (`frontend-only`) contains just the Next.js frontend from the full
project, statically exported and deployed to GitHub Pages via GitHub Actions.

Live site: <https://super-shahriar.github.io/Player-Portfolio/>

## What's different on this branch

- No `backend/` — the full-stack backend (FastAPI + MongoDB) lives on `master`/`very-cool-branch`.
- The frontend builds with Next.js `output: 'export'` (see `frontend/next.config.mjs`),
  so every page is static HTML/JS with no server required.
- Player and product pages fall back to built-in demo data when no backend API is
  reachable (see `frontend/lib/player-data.ts` and `frontend/lib/shop-data.ts`), so the
  deploy works standalone.
- Cart/checkout also work standalone here: when the backend is unreachable, add-to-cart,
  quantity changes, checkout, and order history fall back to a `localStorage`-backed mock
  (see the bottom of `frontend/lib/shop-data.ts`) instead of hitting a live API.
- GA4/GTM analytics (`frontend/components/analytics-gate.tsx`, `frontend/lib/analytics.ts`)
  are unchanged from `very-cool-branch`. GTM only loads after cookie consent and needs a
  container ID — see below.

## Deploying

Pushing to `frontend-only` triggers `.github/workflows/deploy.yml`, which builds
`frontend/` and publishes `frontend/out` to GitHub Pages. Requires the repo's
Settings → Pages → Source set to "GitHub Actions" (already configured).

To enable GTM on the deployed site, add a repo Actions variable (Settings → Secrets and
variables → Actions → Variables) named `NEXT_PUBLIC_GTM_ID` with your GTM container ID
(e.g. `GTM-XXXXXXX`) — the workflow passes it through as a build-time env var. Without it,
the site still builds and runs fine, GTM just never loads.

## Local development

```bash
cd frontend
npm install
npm run dev
```

See `frontend/README.md` for details on the frontend's structure and components.
