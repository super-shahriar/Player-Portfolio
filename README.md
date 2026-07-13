# Volleyball Player Portfolio — Frontend (GitHub Pages)

This branch (`frontend-only`) contains just the Next.js frontend from the full
project, statically exported and deployed to GitHub Pages via GitHub Actions.

Live site: <https://super-shahriar.github.io/Player-Portfolio/>

## What's different on this branch

- No `backend/` — the full-stack backend (FastAPI + MongoDB) lives on `master`/`very-cool-branch`.
- The frontend builds with Next.js `output: 'export'` (see `frontend/next.config.mjs`),
  so every page is static HTML/JS with no server required.
- Player pages fall back to built-in demo data when no backend API is reachable
  (see `frontend/lib/player-data.ts`), so the deploy works standalone.
- The shop/cart/checkout pages are present but non-functional here — they depend on
  a live backend for cart and order state, which this deploy doesn't have.

## Deploying

Pushing to `frontend-only` triggers `.github/workflows/deploy.yml`, which builds
`frontend/` and publishes `frontend/out` to GitHub Pages. Requires the repo's
Settings → Pages → Source set to "GitHub Actions" (already configured).

## Local development

```bash
cd frontend
npm install
npm run dev
```

See `frontend/README.md` for details on the frontend's structure and components.
