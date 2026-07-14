# GTM Setup — How To

Rewritten from scratch on 2026-07-14 (see the note at the top of `GTM-ARCHITECTURE.md`
for why). Practical steps to get analytics live on this branch's GitHub Pages deploy.
For how the code itself works, read `GTM-ARCHITECTURE.md` first.

## 1. Create a GTM container (if you don't have one)

1. Go to <https://tagmanager.google.com>.
2. Create an account/container for the site (Web target).
3. Copy the container ID — looks like `GTM-XXXXXXX`.

## 2. Set the container ID for this deploy

The container ID is a **build-time** value (Next.js inlines `NEXT_PUBLIC_*` env vars
when the static site is built) — it is not something you can change after the fact
without rebuilding.

In the GitHub repo:

1. **Settings → Secrets and variables → Actions → Variables tab → New repository
   variable**
2. Name: `NEXT_PUBLIC_GTM_ID`
3. Value: your container ID (e.g. `GTM-XXXXXXX`)

This is a **variable**, not a secret — a GTM container ID is visible in any page's
source once it loads, so there's nothing to protect by hiding it.

`.github/workflows/deploy.yml` already passes it through to the build step:

```yaml
- name: Build static export
  working-directory: frontend
  env:
    NEXT_PUBLIC_GTM_ID: ${{ vars.NEXT_PUBLIC_GTM_ID }}
  run: npm run build
```

Setting the variable doesn't trigger a deploy by itself — push a commit, or run the
workflow manually (**Actions → Deploy frontend to GitHub Pages → Run workflow**, it has
`workflow_dispatch` enabled) to bake the new value into a build.

### Verifying it actually landed in the build

Since this is a static export, you can check the deployed bundle directly without
opening a browser:

```bash
curl -s https://super-shahriar.github.io/Player-Portfolio/ -o page.html
for f in $(grep -o '_next/static/chunks/[^"]*\.js' page.html | sort -u); do
  curl -s "https://super-shahriar.github.io/Player-Portfolio/$f" | grep -o 'GTM-[A-Z0-9]*'
done
```

If nothing prints, the variable either isn't set or the site hasn't redeployed since it
was set.

## 3. Configure tags inside the GTM container

Loading the container is not the same as sending data anywhere. Inside
tagmanager.google.com, add (at minimum):

- A **GA4 Configuration** tag, firing on **All Pages**, with your GA4 Measurement ID.
- GA4 **Event** tags (or one generic tag mapped from `{{Event}}`) for the ecommerce
  events this app already pushes: `view_item`, `add_to_cart`, `remove_from_cart`,
  `view_cart`, `begin_checkout`, `purchase`, plus the custom `view_player_profile` and
  `page_view` events.

This app pushes standard GA4 ecommerce `dataLayer` events (see `GTM-ARCHITECTURE.md`
for the exact shape) — GA4's built-in ecommerce trigger/variable templates in GTM
recognize them without custom variable mapping.

Publish the container (Submit → Publish) after adding tags — a saved-but-unpublished
workspace doesn't fire in production.

## 4. Testing with GTM Preview / Tag Assistant

Two things have to be true simultaneously, or Tag Assistant will show "not connected"
even though everything above is set up correctly:

1. **The container ID must be live in the deployed build** (step 2/verification above).
2. **Cookie consent must be accepted in the browser tab you're testing in.** The GTM
   script itself doesn't render until `AnalyticsGate` sees `consent === 'granted'` (see
   `GTM-ARCHITECTURE.md`) — Tag Assistant has nothing to attach to before that.

Recommended order for a clean test:

1. Open the live site in a normal tab, in a browser profile with no prior consent
   choice stored (or clear `localStorage` for the site first).
2. Accept the cookie banner.
3. *Then* open GTM's Preview mode and connect it to that same site — it should connect
   immediately since the container is already loaded.
4. Navigate the site (players, product pages, add to cart, checkout) and watch events
   land in the Tag Assistant summary stream.

Note that the Tag Assistant summary stream is a **personal debug session** tied to the
browser tab you connected — it never shows other visitors' traffic. Real visitor
numbers live in GA4's own reports (Realtime, etc.), and only for visitors who accepted
the cookie banner.

## 5. Local development

`frontend/.env` intentionally has no `NEXT_PUBLIC_GTM_ID` set, so GTM never loads
during `npm run dev` — there's no need to pollute your own GA4 property with local
testing traffic. If you do need to test GTM locally, set it in `frontend/.env.local`
(gitignored) rather than `frontend/.env`.
