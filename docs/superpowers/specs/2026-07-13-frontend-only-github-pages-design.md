# Frontend-only branch + GitHub Pages deploy

## Goal
Deploy the Next.js frontend (player portfolio) as a static site on GitHub Pages, on a
dedicated branch that contains no backend code, built and deployed via GitHub Actions.

## Branch
`frontend-only`, created from `very-cool-branch`. Removed from this branch:
- `backend/` (entire FastAPI app)
- `.github/workflows/ci.yml` (backend Mongo test workflow — nothing left to test)
- `docker-compose.yml` (spun up backend + mongo + frontend together)
- Backend-only / backend-integration root docs: `GTM-ARCHITECTURE.md`, `GTM-HOWTO.md`,
  `analytics-roadmap.md`, `dev.md`, `FRONTEND_DATA_INTEGRATION.md`,
  `FRONTEND_FILE_DIRECTORY.md`
- Root `README.md` replaced with a frontend-only version
- `frontend/tsconfig.tsbuildinfo` (build artifact, now gitignored)

`frontend/` stays as a subfolder; the deploy workflow builds from there directly.

## Static export changes (`frontend/`)
1. `next.config.mjs`: `output: 'export'`, `trailingSlash: true`, and
   `basePath`/`assetPrefix` set to `/Player-Portfolio` when `GITHUB_ACTIONS` env var is
   set, so `next dev` locally still serves unprefixed.
2. `frontend/lib/player-data.ts`: `fetchPlayers()` now catches fetch failure and returns
   the existing (previously unused) `FALLBACK_PLAYERS` array instead of re-throwing.
3. `frontend/app/player/[id]/player-home.tsx`: replaced the hardcoded
   `fetch('http://localhost:8000/...')` with a lookup into the same fallback player data
   by id, so `/player/demo-1..4` render standalone.
4. `frontend/app/player/[id]/page.tsx`: added `generateStaticParams` returning the
   `demo-1..4` ids — required by `output: 'export'` for any dynamic segment.
5. `frontend/app/product/[id]/page.tsx`: added `generateStaticParams` returning `[]`.
   Shop/cart/orders remain live-backend-only and are non-functional on this deploy
   (accepted tradeoff — not in scope to mock).

## GitHub Actions workflow
`.github/workflows/deploy.yml`:
- Trigger: push to `frontend-only` and manual `workflow_dispatch`
- `actions/checkout` → `actions/setup-node` (Node 20, npm cache via
  `frontend/package-lock.json`) → `npm ci` → `npm run build` (in `frontend/`) →
  `actions/upload-pages-artifact` on `frontend/out` → `actions/deploy-pages`
- Permissions: `pages: write`, `id-token: write`
- Repo setting "Pages → Source: GitHub Actions" already enabled.

## Out of scope
- Mocking shop/cart/checkout client-side (explicitly declined).
- Custom domain configuration.
- Backend hosting elsewhere.
