# GTM / GA4 Analytics Architecture

Documents the analytics implementation as it exists in this codebase. Rewritten from
scratch on 2026-07-14 — the original file by this name was never committed to git and
was lost when this branch stripped the backend; nothing recoverable existed in git
history or editor history, so this reflects current behavior rather than the original.

## Components

| File | Role |
|---|---|
| `frontend/components/analytics-gate.tsx` | Decides *whether* GTM loads: only if a container ID exists (`NEXT_PUBLIC_GTM_ID`) and the visitor has granted cookie consent. |
| `frontend/components/cookie-consent.tsx` | Bottom banner + `useCookieConsent()` hook. Persists the choice to `localStorage` (`cookie_consent`), dispatches a same-tab `cookie-consent-change` event so `AnalyticsGate` re-renders immediately. |
| `frontend/components/analytics-pageview.tsx` | Fires `page_view` on every client-side route change (App Router doesn't reload the page, so this replaces the browser-native pageview GTM normally gets for free). |
| `frontend/lib/analytics.ts` | All `dataLayer.push(...)` calls live here. Nothing outside this file touches `window.dataLayer` directly. |
| `frontend/app/layout.tsx` | Mounts `<AnalyticsGate gtmId={process.env.NEXT_PUBLIC_GTM_ID} />` once, in the root layout. |

## Load sequence

```
layout.tsx
  └─ AnalyticsGate (gtmId passed in as a prop, baked in at build time)
       ├─ useCookieConsent() → null | 'granted' | 'denied'
       ├─ if gtmId && consent === 'granted': <GoogleTagManager gtmId=... />  (@next/third-parties/google)
       ├─ <AnalyticsPageview />  — always mounted, fires page_view on route change
       └─ <CookieConsent />     — always mounted, shows the banner until a choice is made
```

Consequences of this order:

- **GTM never loads until consent is granted.** No script tag, no cookies, nothing —
  not just "tags don't fire," the container itself is absent from the page until the
  visitor clicks Accept. This also means GTM Preview/Tag Assistant can't attach to the
  site until the banner has been accepted in that browser.
- `page_view` events queue into `window.dataLayer` from the very first render
  regardless of consent (there's no PII in a pathname), but they only reach GTM's
  servers once the container actually loads — events pushed before that either get
  picked up once GTM initializes and reads the existing `dataLayer` array, or are lost
  if GTM never loads at all in that session.
- Declining consent is permanent for that browser (`localStorage`) until the visitor
  clears storage or manually changes it — there is currently no UI to revisit the
  choice after the initial banner is dismissed.

## Events tracked

All events go through `pushEvent()` in `analytics.ts`, which no-ops if `window` doesn't
exist (SSR/build-time safety — irrelevant now that the site is a static export, but
harmless to keep).

| Event | Function | Fired from |
|---|---|---|
| `page_view` | `trackPageview` | `analytics-pageview.tsx`, on every pathname change |
| `view_item` | `trackViewItem` | `app/product/[id]/product-detail.tsx`, when a product loads |
| `add_to_cart` | `trackAddToCart` | `components/cart-context.tsx`, after a successful add |
| `remove_from_cart` | `trackRemoveFromCart` | `components/cart-context.tsx`, after a successful remove |
| `view_cart` | `trackViewCart` | `app/cart/page.tsx`, when the cart page loads with items |
| `begin_checkout` | `trackBeginCheckout` | `app/cart/page.tsx`, when checkout starts |
| `purchase` | `trackPurchase` | `components/cart-context.tsx`, after checkout succeeds |
| `view_player_profile` | `trackViewPlayerProfile` | `app/player/[id]/player-home.tsx`, when a player profile loads |

The ecommerce events (`view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`,
`begin_checkout`, `purchase`) follow GA4's standard ecommerce `dataLayer` shape
(`ecommerce: { currency, value, items: [...] }`), so a GA4 Configuration tag with the
standard ecommerce trigger set picks them up without custom mapping.

## What's stubbed vs. real on this branch

This branch (`frontend-only`) has no backend. `add_to_cart` / `remove_from_cart` /
`purchase` still fire — but the cart/checkout data behind them comes from the
`localStorage`-backed mock in `frontend/lib/shop-data.ts`, not a real order system. The
events are real; the "orders" they describe are demo data.

## Getting data into GA4

Having a GTM container load is necessary but not sufficient — a **GA4 Configuration
tag** (and, for the ecommerce events, a GA4 Event tag per event or one generic tag
reading `{{Event}}`) must exist *inside* the GTM container itself. That's configured in
tagmanager.google.com's UI, not in this repo, and isn't something covered by this
codebase. See `GTM-HOWTO.md` for the deploy-side setup (container ID, consent, preview).
