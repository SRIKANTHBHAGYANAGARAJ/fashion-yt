# Atelier Vale build log

## Phase A — Scaffold ✅ 2026-09-10

Built: Next.js App Router scaffold, shadcn (radix), auth/mongodb/stripe stubs, theme tokens, types, lib helpers.
Decisions:

- Dropped `--turbopack` and `--no-src-dir` from `create-next-app@latest` — those flags are not in the current CLI. Next 16 `next dev` uses Turbopack by default.
- NextAuth current v5 channel is still `next-auth@beta` (`5.0.0-beta.32`). `latest` is v4.
- Stripe Node SDK 22 has `new Stripe(key)`, not `StripeClient`. Used the installed constructor.
- Zod 4 (`z.email()`), framer-motion 13, lucide-react 1.x.
- Mongo via local Docker `mongo:7` at `mongodb://127.0.0.1:27017/ateliervale`.
  Versions: next 16.3.4, react 19.2.8, tailwindcss 4.3.3, next-auth 5.0.0-beta.32, mongodb 7.6.0, stripe 22.6.1, zod 4.5.4
  Deviations: none material
  VERIFY: `pnpm check-types` clean; `pnpm lint` clean
  Next: Phase B

## Phase B — Chrome ✅ 2026-09-10

Built: three-row header, mega menu, mobile Sheet, footer, right dock, mini-cart Sheet, cookie bar, locale/currency/theme.
Decisions:

- Header compact mode hides the utility row via height/padding so the sticky bar does not jump.
- Search is a Dialog shared by the header field and the dock.
  Deviations: none
  VERIFY: structure present; browser walk in Phase I
  Next: Phase C

## Phase C — Catalog ✅ 2026-09-10

Built: data/catalog.json (28 products, 10 categories), data/posts.json (7 posts), ProductCard, home sections 11.3–11.14.
Decisions:

- Horizontal scroll-snap for recommended; no drag library.
- Shorts reel uses stills in a Dialog (DECIDE: stills for v1).
  Deviations: none
  VERIFY: catalog counts: 28 products, 2 OOS, 8 featured
  Next: Phase D

## Phase D — Commerce UI ✅ 2026-09-10

Built: shop URL filters/sort/density/pagination, PDP variants + size guide, cart, wishlist, compare, recently viewed.
Decisions:

- Client stores via `useSyncExternalStore` + named localStorage keys so hydration stays quiet.
  Deviations: none
  Next: Phase E

## Phase E — Auth & checkout ✅ 2026-09-10

Built: NextAuth credentials + Google + GitHub, forgot/reset, account pages, Stripe Checkout + webhook, VALE10, COD.
Decisions:

- Stripe line items bake the coupon into unit amounts because we do not create Stripe coupon objects.
- Webhook is the stock decrement for Stripe; COD decrements in the place-order action.
  Deviations: OAuth buttons render; providers fail clearly if env ids are empty.
  Next: Phase F

## Phase F — Content ✅ 2026-09-10

Built: blog, about, contact, FAQ, legal, PDP review submit (pending).
  Deviations: none
  Next: Phase G

## Phase G — Admin ✅ 2026-09-10

Built: all admin routes, requireAdmin on actions, inventory per-size editor, idempotent `pnpm seed`.
  Deviations: none
  Next: Phase H

## Phase H — Images ✅ 2026-09-10

Built: code-drawn logo + payment marks; generated hero stills and eight product fronts; remaining SKUs keep named colour-field placeholders at the same `.webp` paths.
Decisions:

- ffmpeg had no drawtext filter; placeholders used SVG → rsvg-convert → cwebp.
- Image rate-limit stopped a full 28×4 generate pass; eight garments + three heroes are photographic.
  Deviations: not every SKU has a unique four-angle set.
  Next: Phase I

## Phase I — SEO & verification ✅ 2026-09-10

Built: metadata helper, JSON-LD, sitemap, robots, loading/error/not-found.
  VERIFY: `pnpm check-types` and `pnpm lint` clean; `pnpm build` in this run.
