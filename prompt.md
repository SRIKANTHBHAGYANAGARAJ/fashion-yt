# Atelier Vale — Production Fashion E-Commerce

You are a **senior commerce engineer and design-minded frontend architect.** Build a
production-ready fashion e-commerce store from scratch **in the current directory**.
Do not clone a template. Do not bolt a hosted SaaS cart onto a landing page and call
it a store. Do not ship generic **"AI slop"** commerce — no purple gradient on white,
no lorem product blurbs, no three identical card grids, no invented "iPhone" products,
no fake live-visitor counters, no "Shop Now" button floating over a stock photo.

Ship the **exact editorial store** described below:

> Paper `#FAFAF8` and ink `#111111`, one sale-rose accent `#E11D48`. **Fraunces**
> display over **Geist** UI. A **three-row mega header** that compacts on scroll.
> **Six circular category tiles.** A full-bleed **hero slider** on a warm wash.
> **Ghost-mannequin product photography** on seamless paper. A **right-side floating
> dock** carrying live compare and wishlist counts. **Colour swatches that swap the
> PDP gallery in place.** A **mini-cart Sheet** that slides out of the header.

…so that it reads as **Atelier Vale** — not as "an e-commerce site."

**The job is the whole store.** Public storefront _and_ owner admin. From an empty
directory to an application a stranger could browse, filter, add to cart, pay for
with Stripe, and administer — with **zero further instructions from the human.**

|                        |                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| **Deliverable**        | One deployable Next.js App Router application (latest of the locked family — §0.5, §6)                |
| **Starting state**     | Empty directory. No scaffold, no dependencies, no assets.                                             |
| **Definition of done** | §22 — every line true, verified in a browser. Never marked done from memory.                          |
| **Estimated scope**    | ~49 routes, 28 products, 10 categories, 9 build phases                                                |
| **Human availability** | **None.** Do not wait for approval. See §0.3 for the only exceptions.                                 |
| **Packages**           | **Latest** of each locked family member at install time. Never invent a version from training memory. |
| **Honesty**            | The app must actually build and run. Do not hallucinate APIs, files, or a passing `VERIFY:`.          |

### Feature map — this is the store, not a homepage demo

| Area         | Ships in v1                                                                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Catalog**  | 10 categories, 28 products, colour + size variants, per-size stock, badges, hover images                                                                                          |
| **Browse**   | Home (§11), shop with URL filters/sort/density/pagination, category directory + pages, header search, quick view                                                                  |
| **Product**  | Gallery, swatches that swap images, size guide, ATC, buy now, wishlist, compare, share, tabs, reviews (read + write), Q&A, similar, frequently-bought-together, sticky mobile ATC |
| **Cart**     | Mini-cart Sheet, full cart, coupon `VALE10`, shipping rule, persisted `localStorage`, not wiped on login                                                                          |
| **Checkout** | Signed-in only, Zod form, Stripe Checkout, success/cancel, COD toggle from admin                                                                                                  |
| **Account**  | Register, sign in, OAuth, forgot/reset password, orders + timeline, profile, addresses, change password                                                                           |
| **Engage**   | Wishlist, compare (max 4), recently viewed, newsletter, contact, blog, FAQ, about + 5 stores                                                                                      |
| **Admin**    | Dashboard, analytics, products, categories, inventory, orders, customers, coupons, reviews, settings, profile                                                                     |
| **Platform** | NextAuth v5 (current v5 channel), Mongo native, Stripe webhook (idempotent, decrements stock), SEO, i18n + RTL, theme, cookies                                                    |

---

## 0. Operating contract `[P0]`

### 0.1 What you already know

You have shipped stores like this before, solo. Assume fluency in:

- **Next.js App Router** (current 16.x line), React 19 Server Components, Turbopack
- **TypeScript** in strict mode, and type architecture that scales past 100 files
- **Tailwind CSS v4** (CSS-first config) and **shadcn/ui** over Radix primitives
- **MongoDB** with the native driver, **NextAuth v5**, **Stripe Checkout**
- Commerce UX end to end: catalog → PDP → cart → checkout → fulfilment, and the admin behind it

Fluency is not a licence to invent. After scaffold, write against **the packages on disk** and the loaded skills — not against a version you remember from a training cutoff.

You also know where these builds actually break, and you design against it from
Phase A: carts that lose state on reload, checkouts that accept anonymous users,
admin routes gated only by a hidden button, prices trusted from the client, stock
that never decrements, and "finished" homepages with forty empty routes behind them.

### 0.2 Your authority

> ✅ **You may decide, without asking:** component structure, file names, class
> composition, animation timing, copy wording, image composition, helper
> utilities, micro-interactions, and anything this file does not pin down.
>
> ⛔ **You may not decide:** anything marked `RULE:`, the locked stack (§6), the
> route table (§9), the brand (§5), the commerce engine (§10.7), or the
> definition of done (§22).

**Bias to action.** When this file is silent on a detail, choose the option a
senior engineer would defend in review, implement it, and record it (§0.4). Do
not stall, do not ask, and do not leave a `TODO` in place of a decision.

`DECIDE:` marks places where the choice is explicitly yours. Log those.

### 0.3 When you may stop and ask `[P0]`

Stop and ask the human **only** in these cases. Everything else: decide and continue.

1. A step would **delete or overwrite files you did not create** in this run.
2. A step requires a **real secret, live payment credential, or paid API call**.
3. A `RULE:` in this file **directly contradicts** another `RULE:` in this file.
4. The same `VERIFY:` gate has failed **three times** with different fixes.

When you stop: state what you tried, what failed, the two options you see, and
your recommendation. Then wait.

### 0.4 How you report progress `[P1]`

`SETUP:` Maintain **`BUILD-LOG.md`** at the repo root from Phase A onward.

After each phase append one block — this is the human's audit trail and the file
you resume from if the run is interrupted:

```markdown
## Phase C — Catalog ✅ 2026-09-09

Built: data/catalog.json (28 products, 10 categories), lib/catalog.ts,
ProductCard, home sections 11.3–11.14
Decisions:

- Used a horizontal scroll-snap container for the recommended carousel
  instead of framer-motion drag — keyboardable for free, no layout thrash.
  Deviations: none
  VERIFY: pass — / renders all 14 home sections at 1440 and 390
  Next: Phase D
```

> ⛔ `RULE:` `BUILD-LOG.md` is the **only** meta file you create. Never write
> `SETUP:`, `RULE:`, `VERIFY:`, `CHUNK`, or `WHY` markers from this prompt into
> application source. They are instructions to you, not code comments.

### 0.5 Latest packages — lock the family, resolve versions at install `[P0]`

The numbers in §6 (Next.js 16, React 19, Tailwind v4, NextAuth v5) name the
**generation this spec was written against.** They are not a permission to
invent an older tag from memory, and they are not a pin of a patch you made up.

> ⛔ `RULE:` Install the **latest** release of each **locked family** member at
> scaffold time. Use `@latest` (or the current documented dist-tag for that
> family — e.g. NextAuth v5's current channel). **Check npm / the CLI / the
> loaded skill.** Never write `next@14`, `tailwindcss@3`, or `next-auth@4`
> because that is what you remember.

> ⛔ `RULE:` After install, write code against **`node_modules` and the loaded
> skills**, not against a remembered API. If the installed types disagree with
> a snippet in this file, **the installed package wins.** Adapt the snippet,
> log the actual versions in `BUILD-LOG.md`, and continue.

> ⛔ `RULE:` Do not invent CLI flags, package names, config keys, or file
> conventions. If `pnpm create next-app@latest --help` (or the skill) does not
> list a flag, you do not pass that flag.

`SETUP:` Record in `BUILD-LOG.md` Phase A: `next`, `react`, `tailwindcss`,
`next-auth`, `mongodb`, `stripe`, `zod` — the versions `pnpm list` actually
installed. A spec that names "Next 16" and a lockfile that shipped Next 13 is
a failed Phase A, not a creative interpretation.

Stay on the **major line** this spec names (App Router 16.x, React 19, Tailwind
v4, NextAuth v5). Do not jump to an unrelated major just because it exists, and
do not downgrade to a major from memory. Latest **inside** the locked family.

### 0.6 Honest build — do not hallucinate `[P0]`

You will ship a store that **actually runs**. Plausible code that does not
compile is not a store.

> ⛔ `RULE:` Never invent any of the following:

- Package names, CLI flags, env keys, or APIs that are not in the **installed**
  package, this file, or a loaded skill
- File paths this spec does not name (no bonus `/playground`, no extra `/demo`)
- Product photography URLs, lorem products, or trademarked names
- A passing `VERIFY:` you did not actually run
- A stub route, empty page, or `TODO` you then call finished
- Types, props, or return shapes that "look right" but do not typecheck

If you do not know an API: read the installed types, the skill, or the official
docs. **Guessing a method that sounds right is how the build dies at hour four.**

If a `VERIFY:` fails: **fix it** before you start the next phase. Do not narrate
the failure as a finding and move on. A known-broken flow is unfinished work.

`pnpm dev`, `pnpm check-types`, `pnpm lint`, and `pnpm build` must be clean
before you call the app done. Every line of §22 must be true **in a browser**,
not in a summary.

### 0.7 Comments — teaching in this file, "why" in the code `[P0]`

This spec is written so a human can **type it from scratch, chunk by chunk.**
The `VIDEO CHUNK` banners and `WHY` comments are the talk track. Leave them
in this file. They are how the prompt is arranged.

**In this file (the spec)**

- Keep the `VIDEO CHUNK` banners. They mark the filming / writing beats.
- Keep the `WHY` comments. They tell the next reader _why the block exists_.
- Write new comments the same way: short, specific, one intent per block.
- Never delete teaching comments to "clean up" the spec.

**In generated application source**

> ⛔ `RULE:` Comments are scarce on purpose. A comment explains _why_, never
> _what_. If a comment restates the code, delete the comment.

`COMMENT:` marks the rare places a code comment is required (Promise params,
Stripe raw body, named `localStorage` keys, `requireAdmin()` first). Follow
those. Do not copy `SETUP:`, `RULE:`, `VERIFY:`, `CHUNK`, or `WHY` into source.

---

## 1. How to read this file

**Read the entire file once before writing any code.** Then execute §19 (Phases
A → I) in order. Keep the app runnable after every phase.

### 1.1 Tags

| Tag        | Meaning                                                                                                      | If you get it wrong           |
| ---------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| `SETUP:`   | An exact command, file, or scaffold step. Run it as written.                                                 | Build breaks                  |
| `RULE:`    | Non-negotiable constraint. Never "improve" past it.                                                          | Work is rejected              |
| `DECIDE:`  | Your call. Pick, implement, log it in `BUILD-LOG.md`.                                                        | Stalling                      |
| `VERIFY:`  | A gate. Prove it in a **browser** (or the named command) before the next phase. Never tick this from memory. | Silent regression / fake done |
| `COMMENT:` | The one thing that belongs in a **code** comment here.                                                       | Noise or mystery              |
| `SKILL:`   | Load this skill before this work, if available. Skills beat memory for installed APIs.                       | Outdated / invented API usage |
| `CHUNK:`   | A filming / writing beat in this spec. Leave it in the spec; never copy it into app source.                  | Lost talk track               |

### 1.2 Priority

| Marker | Meaning                                                            |
| ------ | ------------------------------------------------------------------ |
| `[P0]` | Ship-blocking. The app is **not done** without it.                 |
| `[P1]` | Required for quality. Fix before you call the phase complete.      |
| `[P2]` | Nice to have. Skip if time-boxed; note the skip in `BUILD-LOG.md`. |

### 1.3 Skills to load

`SKILL:` Load before the matching work. **If a skill is unavailable, follow the
rules written in this file anyway** — this file is self-sufficient. Skills and
installed types beat training memory whenever an API might have moved.

| When you are working on            | Load                    |
| ---------------------------------- | ----------------------- |
| Scaffold, or any file under `app/` | `nextjs16-patterns`     |
| Auth, Mongo, admin gates           | `nextjs-auth-data`      |
| Any form or server-action input    | `react-forms-zod`       |
| Any page, metadata, or sitemap     | `nextjs-seo`            |
| Tailwind classes, `@theme`         | `tailwind-v4-fixer`     |
| shadcn init / add / compose        | `shadcn`                |
| Shared types                       | `react-types-organizer` |
| Catalog / hero / blog photography  | `imagine`               |
| Browser-checking after a phase     | `verification`          |

### 1.4 Section map

| §   | Topic                                                        |
| --- | ------------------------------------------------------------ |
| 0   | Operating contract (latest packages, honest build, comments) |
| 1   | How to read this file                                        |
| 2   | Mission                                                      |
| 3   | First actions                                                |
| 4   | What you are NOT doing                                       |
| 5   | Brand                                                        |
| 6   | Stack, scaffold, auth files                                  |
| 7   | Architecture                                                 |
| 8   | Next.js 16 + SEO                                             |
| 9   | Route table                                                  |
| 10  | Data model + commerce engine                                 |
| 11  | Home page                                                    |
| 12  | Storefront pages                                             |
| 13  | Admin                                                        |
| 14  | Security                                                     |
| 15  | Performance & accessibility                                  |
| 16  | Images                                                       |
| 17  | Copy & i18n                                                  |
| 18  | File architecture                                            |
| 19  | Build phases A → I                                           |
| 20  | Seed & demo access                                           |
| 21  | Verification                                                 |
| 22  | Definition of done                                           |
| 23  | Tie-break                                                    |

---

## 2. Mission `[P0]`

Build **Atelier Vale** — an original fashion e-commerce store with the layout
density and shopper flow of a modern editorial fashion template. The storefront
is the shopper's product. The admin is the owner's product. Both ship.

### 2.1 The two sources of truth

| Source                          | Governs                                            | Explicitly does **not** govern         |
| ------------------------------- | -------------------------------------------------- | -------------------------------------- |
| **Visual reference** (below)    | Layout, density, section order, shopper flow       | Code, class names, copy, images, brand |
| **This file** (§6, §7, §9, §10) | Stack, architecture, data, routes, money, security | Visual density decisions               |

**Visual reference — open it, screenshot it, match the layout:**

```
https://nextjs.getunimart.com/home-fashion-two
```

Also study these before you design:

| Reference                     | What to extract                                                                                                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/home-fashion-two`           | Ticker, mega header, hero slider, circular categories, recommended carousel, sale banner, marquee, shorts reel, blog, trust row, about accordion, store locations, footer dock |
| `/product-single-fashion/302` | PDP: gallery, colour/size/material pickers, ATC, buy now, wishlist, compare, share, tabs, similar items, frequently-bought-together                                            |
| `/shop`                       | Toolbar (filter chips, sort, per-page, grid density), product card, hover image, badges, stock states                                                                          |
| `/cart`                       | Cart table, empty state, urgency, similar items                                                                                                                                |
| `/wishlist`                   | Saved items grid                                                                                                                                                               |
| `/blog-default`               | Blog index card layout                                                                                                                                                         |
| `/categories-list`            | Category directory                                                                                                                                                             |

> ⛔ `RULE:` The reference is a **layout reference only**. Never copy its source,
> class names, copy text, product names, or images. Never save its images into
> `public/`. Never hotlink its `/_next/image` URLs.

> ✅ **If the reference URL is unreachable**, do not stop and do not ask. §11–§13
> describe every screen in enough detail to build from text alone. Build from
> those sections and note the fallback in `BUILD-LOG.md`.

### 2.2 What this project is not

This is a **standalone application**. Not a theme port, not a site-builder skin,
not a Bootstrap template, not a monorepo. One Next.js app, built from scratch.

---

## 3. First actions — in this order `[P0]`

1. Open and screenshot the visual reference at **1440px** and **390px**. Keep both as the target for `/`.
2. Open the other reference pages. Note the header, footer, right dock, product card, PDP.
3. Scaffold the app — §6.2 commands, exactly.
4. Build the **chrome** (header / footer / dock / mini-cart) so every later page has a shell.
5. Write `data/catalog.json` and the types in `types/` — including Order, Coupon, Review, Address.
6. Build in route order: home → shop → PDP → cart/checkout → auth/account → blog/legal → admin.
7. Generate **original** imagery (§16). Never hotlink.
8. Browser-verify every route, desktop and mobile (§21, §22).

> ⛔ `RULE:` Do not stop after a pretty homepage. Done is §22, in full.

---

## 4. What you are NOT doing `[P0]`

**Framework & tooling**

- ⛔ No Bootstrap, react-bootstrap, or any reference template's class names.
- ⛔ No Tailwind **v3** patterns — this is **v4**. No `@tailwind base`, no `bg-gradient-to-*`, no `flex-shrink-0`, no `bg-opacity-*`.
- ⛔ No inventing package versions from memory (`next@13`, `next@14`, `tailwindcss@3`, `next-auth@4`). Latest of the locked family (§0.5).
- ⛔ No Mongoose. **Native MongoDB driver only.**
- ⛔ No multi-tenant site builder, no CMS studio, no NestJS API, no Turborepo. **One Next.js app.**
- ⛔ No Redux, Zustand, or other state-management library for cart/wishlist/compare. Small typed client stores + `localStorage` (§10.4).
- ⛔ No live FX API, no tax engine, no transactional email provider. Pin those policies in §10.7.

**React & Next.js**

- ⛔ Never wrap a whole page in `"use client"` to make one control work. Push the directive to the **leaf**.
- ⛔ No `React.FC`. Type props as `({ ... }: Props)`.
- ⛔ No `I` / `T` type prefixes. `IUser` → `User`.
- ⛔ No `any`. If you truly cannot type it, `unknown` + a narrow.

**Design — the "AI slop" refusals `[P0]`**

- ⛔ No purple/indigo gradient on white. The palette is §5. There is **one** accent, and it is sale-rose.
- ⛔ No gradient text, no glassmorphism, no neon glow, no drop-shadow-2xl on everything.
- ⛔ No page built from three identical equal-weight card grids stacked vertically. Vary rhythm: full-bleed, carousel, circular row, editorial banner, accordion.
- ⛔ No emoji standing in for product or category imagery.
- ⛔ No centred-everything layout. This is an editorial grid with a real left rail and asymmetry.
- ⛔ No generic stock-vibe hero ("Shop Now" over an unrelated photo). The hero shows **the actual garments you generated**.
- ⛔ No section that exists only to fill space. Every section on `/` is in §11 and earns its height.
- ⛔ Type is **Fraunces display over Geist UI** — not one sans at three weights.

**Content & legal**

- ⛔ No third-party trademarks in product names, brands, or images — no Apple, iPhone, Sony, Beats, Logitech, Polaroid, Valentino, Cadbury, or the reference site's own brand names.
- ⛔ No lorem ipsum. No "how to choose an eCommerce template" blog filler.
- ⛔ No electronics specs on apparel. A sweatshirt does not have a resolution.

**Honesty**

- ⛔ No fake live-visitor counters, fake "12 people are viewing", or fake stock urgency that isn't derived from real `stockQty`.
- ⛔ No demo pages that 404. No navigation links to routes you did not build.
- ⛔ No `// TODO: implement later` in a file you call finished.
- ⛔ No invented APIs, flags, or file paths. If it is not in this spec, the installed types, or a loaded skill, do not write it.
- ⛔ No ticking a `VERIFY:` from memory. Run it. A fake pass is a failed build.
- ⛔ No guest checkout. Anonymous users are refused at `/checkout`.
- ⛔ No marketplace, subscriptions, gift cards, or multi-vendor. One store, one owner.

---

## 5. Brand — original, required `[P0]`

| Piece              | Value                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Store name         | **Atelier Vale**                                                                               |
| Tagline            | _Clothes that stay sharp._                                                                     |
| Template id        | `ateliervale-fashion-two`                                                                      |
| Asset folder       | `public/atelier-vale/`                                                                         |
| Phone              | `(415) 555-0194`                                                                               |
| Hours              | `10:00am – 8:00pm, 7 days`                                                                     |
| Default currency   | `USD` (canonical; Stripe charges USD)                                                          |
| Display currencies | `USD EUR GBP BDT INR AED` — see §10.7                                                          |
| Locales            | `en`, `es`, `fr`, `ar` — RTL when `ar`                                                         |
| House brands       | Northloom · Harborline · Oak & Thread · Dawncut · Tidewear · Velvet Lane · Silkway · Crispform |

### 5.1 Palette

`SETUP:` Define on `:root` **and** map into Tailwind v4 `@theme` so `bg-background`
and `text-sale` resolve as utilities.

```css
--background: #fafaf8; /* paper */
--foreground: #111111; /* ink */
--muted: #f4ede6;
--accent: #111111; /* primary buttons, header icons */
--accent-foreground: #fafaf8;
--sale: #e11d48;
--success: #0f9f6e;
--card: #ffffff;
--border: #e8e2da;
--hero-wash: #f4ede6;
```

Dark theme inverts paper/ink and **keeps** `--sale` and `--success` unchanged.

### 5.2 Voice

Fashion editorial. Short sentences. Concrete nouns — cut, cloth, seam, weight,
care. Never grocery, never gadget, never marketing filler.

> ✅ "Cut from mid-weight cotton that keeps its shape through a hundred washes."
> ⛔ "Experience the ultimate in premium quality fashion solutions!"

---

## 6. Stack — locked family, latest install `[P0]`

> ⛔ `RULE:` This **family** is **closed**. Do not substitute Remix, Bootstrap,
> Mongoose, Redux, or a competing auth library. Do not add a second framework
> mid-build. If something here genuinely cannot work, that is an §0.3 escalation.

> ⛔ `RULE:` **Versions** are not frozen to training memory. Install the latest
> of each family member (`create-next-app@latest`, `shadcn@latest`, current
> NextAuth v5 channel). After install, write against the installed APIs (§0.5).
> Record actual versions in `BUILD-LOG.md`.

| Layer     | Family (locked)                                                                              | Version                                                                |
| --------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Runtime   | Node 20+, **pnpm**                                                                           | Latest LTS that satisfies the app                                      |
| Framework | **Next.js App Router**, **React 19**, Turbopack                                              | Latest 16.x / 19.x at install — `@latest`                              |
| Language  | TypeScript, `strict: true`                                                                   | Latest that the Next scaffold selects                                  |
| Styling   | **Tailwind CSS v4**; `cn()` = `clsx` + `tailwind-merge`                                      | Latest v4 — never v3 patterns                                          |
| UI        | **shadcn/ui** over Radix (`new-york`)                                                        | `pnpm dlx shadcn@latest`                                               |
| Icons     | `lucide-react`                                                                               | Latest                                                                 |
| Motion    | `framer-motion` — carousels, marquees, reveals. Transform/opacity only.                      | Latest                                                                 |
| Forms     | `react-hook-form` + `zodResolver`. **One Zod schema shared by client and server.**           | Latest                                                                 |
| Toasts    | `sonner`                                                                                     | Latest                                                                 |
| Auth      | **NextAuth v5** — Credentials + Google + GitHub                                              | Current v5 dist-tag (check npm; do not invent `@beta` if it has moved) |
| Database  | **MongoDB native driver**, cached singleton on `globalThis`. **No Mongoose.**                | Latest driver                                                          |
| Payments  | **Stripe Checkout** → `/checkout/success`, `/checkout/cancel`. COD toggle in admin settings. | Latest `stripe`                                                        |
| Images    | `next/image`, files under `public/atelier-vale/`                                             | —                                                                      |
| Fonts     | **Fraunces** (display) + **Geist** (UI), via `next/font`.                                    | —                                                                      |
| Theme     | `next-themes`, `attribute="class"`. Storefront defaults **light**.                           | Latest                                                                 |

`package.json` scripts: `dev`, `build`, `start`, `lint`, `check-types`, `seed`.

### 6.1 shadcn components to install

Button · Input · Textarea · Label · Checkbox · Slider · Select · DropdownMenu ·
Dialog · AlertDialog · Sheet · Tabs · Form · Table · Badge · Avatar · Separator ·
Skeleton · Sonner · Tooltip · Command · ScrollArea · Accordion · Switch · Pagination ·
Popover

### 6.2 Scaffold — Phase A

`SETUP:` Run from the empty repo, in order. **Non-interactive flags only** — an
interactive prompt will hang the run. `@latest` is required — never pin a
remembered major. If a flag below is rejected by the current CLI, drop only
that flag, log it, and continue. Do not invent replacement flags.

```bash
# Latest Next App Router + TS + Tailwind v4, no src/ dir
pnpm create next-app@latest . \
  --typescript --tailwind --eslint --app \
  --no-src-dir --import-alias "@/*" --turbopack --use-pnpm

# shadcn — ALWAYS -d (accept defaults) and --base radix. Never interactive.
pnpm dlx shadcn@latest init -d --base radix

pnpm dlx shadcn@latest add button input textarea label checkbox slider select \
  dropdown-menu dialog alert-dialog sheet tabs form table badge avatar \
  separator skeleton sonner tooltip command scroll-area accordion switch \
  pagination popover

# Auth: install the current NextAuth v5 channel. Confirm the dist-tag on npm
# before you type it — do not invent @beta if the tag has moved.
pnpm add next-auth@beta mongodb stripe zod react-hook-form @hookform/resolvers \
  next-themes framer-motion lucide-react clsx tailwind-merge \
  class-variance-authority bcryptjs sonner

pnpm add -D @types/bcryptjs
```

`SETUP:` `.env.example` — commit this file, never commit real values.

```bash
MONGO_URI=
AUTH_SECRET=
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_ADMIN_EMAIL=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 6.3 Tailwind v4 + theme tokens

`SKILL:` `tailwind-v4-fixer`, `shadcn`

`SETUP:` `app/globals.css` **must** begin with `@import "tailwindcss";`.

> ⛔ `RULE:` `@theme inline` font families must be **literal font names**. Not
> `var(--font-sans)` (circular — silently breaks every font utility) and not
> `var(--font-geist-sans)` (resolved at runtime, invisible to the Tailwind parser).

```css
@import "tailwindcss";

@theme inline {
  --color-background: #fafaf8;
  --color-foreground: #111111;
  --color-muted: #f4ede6;
  --color-accent: #111111;
  --color-accent-foreground: #fafaf8;
  --color-sale: #e11d48;
  --color-success: #0f9f6e;
  --color-card: #ffffff;
  --color-border: #e8e2da;
  --color-hero-wash: #f4ede6;

  --font-sans: "Geist", "Geist Fallback", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Fraunces", "Fraunces Fallback", ui-serif, Georgia, serif;
  --font-mono: "Geist Mono", "Geist Mono Fallback", ui-monospace, monospace;
  --radius: 0.625rem;
}

@custom-variant dark (&:is(.dark *, [data-shop-theme=dark] *));
```

`SETUP:` Fonts go on `<html>`, not `<body>`. `lib/utils.ts` exports `cn()`; every
conditional className goes through it.

### 6.4 Auth files

`SKILL:` `nextjs-auth-data`

`SETUP:`

- **`auth.ts`** at repo root — `export const { handlers, signIn, signOut, auth } = NextAuth({ ... })`. Credentials provider does a bcrypt compare against `users`. The OAuth `signIn` callback upserts the user into Mongo.
- **`app/api/auth/[...nextauth]/route.ts`** — `export const { GET, POST } = handlers;`
- **`lib/auth.ts`** — re-export from `/auth.ts` only. Never duplicate the config.
- **`proxy.ts`** (Next 16) or `middleware.ts` — require a session on `/admin/:path*`, `/account/:path*`, `/checkout`. Redirect to `/signin`. Allow `/forgot-password` and `/reset-password/:path*` through.

```ts
// COMMENT: Email compare is the gate. Hiding the UI is not security.
export async function requireAdmin() {
  const session = await auth();
  if (
    !session?.user?.email ||
    session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    throw new Error("Unauthorized");
  }
}

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Unauthorized");
  return session;
}
```

> ⛔ `RULE:` Call `requireAdmin()` as the **first statement** of every admin server
> action and admin route handler — before reading input, before touching the DB.

> ⛔ `RULE:` Always `await auth()`. A forgotten `await` makes `session` a Promise,
> which is truthy, and **every permission check silently passes**.

> ⛔ `RULE:` Sign-in errors are **generic** — _"Invalid email or password."_
> Never reveal whether an email exists. Same for forgot-password: always show
> _"If that email is registered, we sent a reset link."_ even when it is not.

---

## 7. Architecture contract `[P0]`

The whole system in one paragraph:

> **One Next.js 16 application** serves both the public storefront and the owner
> admin. The **catalog lives in `data/catalog.json`** and seeds **MongoDB**, so the
> storefront renders before a database exists. **Auth is NextAuth v5.** **Payments
> are Stripe Checkout** with a signature-verified, idempotent webhook that marks
> the order paid and decrements stock. **Cart, wishlist, compare and recently-viewed
> are client-side stores** persisted to `localStorage`. Pages are **App Router
> Server Components**, with `"use client"` pushed down to the leaves that
> genuinely need state, effects, events, or browser APIs. **Money is recomputed
> on the server** from product ids — never from a client-supplied price.

### 7.1 Non-negotiable boundaries

| Boundary            | Rule                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Database access** | `connectToDatabase()` is the _only_ way to reach Mongo. Never call `MongoClient.connect` from a page, component, or action.                |
| **Server / client** | Data loading is server-side. Client components receive props. No `fetch` to your own API from a Server Component.                          |
| **Validation**      | One Zod schema per input shape, in `lib/schemas/`. The client resolves it; the server `safeParse`s it. Never two copies of a regex.        |
| **Money**           | Canonical amounts are **USD numbers**. Format and convert only at the edge via `lib/money.ts`. Never format money inline.                  |
| **Commerce**        | `lib/commerce.ts` is the only place that prices a cart, applies a coupon, or computes shipping. Pages call it; they do not reimplement it. |
| **Secrets**         | Anything not prefixed `NEXT_PUBLIC_` must never appear in a client component, even indirectly.                                             |

`COMMENT:` In `lib/mongodb.ts` —
_"Cached on globalThis so Turbopack HMR and serverless invocations do not open a new pool per request."_

`SETUP:` Throw at module load if `MONGO_URI` is missing. If Mongo is unset during
early UI work, **fall back to the JSON catalog so the storefront still renders** —
but wire the Mongo path and leave it in place. Do not delete it "for now."

---

## 8. Next.js 16 rules — non-negotiable `[P0]`

`SKILL:` `nextjs16-patterns`

Write these against the **installed** Next.js types. If a snippet below disagrees
with the installed `next` package, the installed package wins — log the
adaptation. Do not invent a `params` shape from an older major.

- `params` and `searchParams` are **`Promise`s**. Type them as `Promise<...>` and `await` them. Use `RouteParams` from `types/utils.ts`.
- Server Components by default. `"use client"` **only** for state, effects, events, or browser APIs — at the leaf.
- Every server `fetch` sets `next: { revalidate, tags }` or `cache: "no-store"`. After every mutation: `revalidatePath` / `revalidateTag`.
- Route handlers use `NextRequest` / `NextResponse`, validate with the shared Zod schema, and return real status codes — `400` bad input, `401` / `403` auth, `409` stock conflict, `201` created.
- Every public page exports `metadata` or `generateMetadata` — title, description, canonical, Open Graph, Twitter card — via `lib/seo.ts`.
- Dynamic catalog pages emit JSON-LD: `Product`, `BreadcrumbList`, `ItemList`, `BlogPosting`, `Organization`.
- `generateStaticParams` for `/product/[slug]`, `/category/[slug]`, `/blog/[slug]` from the JSON catalog / posts.
- `app/sitemap.ts` and `app/robots.ts`. Disallow `/admin`, `/api`, `/account`, `/checkout`.
- `loading.tsx` on async routes. A `"use client"` `error.tsx` with `reset()`. A `not-found.tsx`.
- Admin and account pages set `robots: { index: false }`.
- `next.config.ts` → `images.remotePatterns` must list every host you serve images from (Google/GitHub avatars). Adding one later without this **throws at render**.

`COMMENT:` On every dynamic `page.tsx` that reads params —
_"Next 16: params is a Promise — await it."_

### 8.1 SEO helper

`SKILL:` `nextjs-seo`

`SETUP:` `lib/seo.ts` exports:

- `generateSEOMetadata({ title, description, path, ogImage?, noIndex? })` → a complete `Metadata` object with canonical built from `NEXT_PUBLIC_BASE_URL + path`, OG image 1200×630, Twitter `summary_large_image`, and robots.
- `jsonLd(data)` → a `<script type="application/ld+json">` payload.

Root `app/layout.tsx` sets `metadataBase`, a title `template` (`"%s | Atelier Vale"`),
default OG, icons, and `Organization` + `WebSite` JSON-LD. Per-page metadata
overrides only what differs. Private routes pass `noIndex: true`.

---

## 9. Route table — build every one `[P0]`

Clean, semantic paths. Do **not** mirror the reference site's URL scheme
(`/product-single-fashion/302`, `/shop-by-categories`).

Shop filters, search, sort, density and pagination are **query state on `/shop`**,
not extra routes: `?q=&category=&size=&color=&min=&max=&sort=&view=&page=&perPage=`.

### 9.1 Storefront — header + footer + right dock

| Path                               | Page                                                 |
| ---------------------------------- | ---------------------------------------------------- |
| `/`                                | Home (§11)                                           |
| `/shop`                            | Catalog grid + filters + sort + density + pagination |
| `/categories`                      | Category directory                                   |
| `/category/[slug]`                 | Filtered shop                                        |
| `/product/[slug]`                  | Product detail                                       |
| `/cart`                            | Full cart                                            |
| `/checkout`                        | Checkout — **gated, must be signed in**              |
| `/checkout/success`                | Paid (or COD placed)                                 |
| `/checkout/cancel`                 | Abandoned Stripe session                             |
| `/wishlist`                        | Saved products                                       |
| `/compare`                         | Side-by-side compare, max 4                          |
| `/blog`                            | Journal index                                        |
| `/blog/[slug]`                     | Post                                                 |
| `/about`                           | Brand story + store locations                        |
| `/contact`                         | Form — Zod + server action                           |
| `/faq`                             | Accordion                                            |
| `/terms` · `/privacy` · `/returns` | Legal                                                |
| `/signin`                          | Credentials + OAuth — auth chrome, no footer dock    |
| `/register`                        | Create account                                       |
| `/forgot-password`                 | Request reset — auth chrome                          |
| `/reset-password/[token]`          | Set new password — auth chrome                       |
| `/account`                         | Overview                                             |
| `/account/orders`                  | Order list                                           |
| `/account/orders/[id]`             | Order detail + status timeline                       |
| `/account/profile`                 | Name / email                                         |
| `/account/password`                | Change password                                      |
| `/account/addresses`               | Saved addresses, max 5                               |

### 9.2 Admin — same app, owner email only

| Path                                           | Page                                                           |
| ---------------------------------------------- | -------------------------------------------------------------- |
| `/admin`                                       | Redirect → `/admin/dashboard`                                  |
| `/admin/dashboard`                             | KPI cards, revenue chart, recent orders, low stock             |
| `/admin/analytics`                             | Orders over time, top products, category mix                   |
| `/admin/products`                              | Table, search, stock, featured toggle                          |
| `/admin/products/new` · `/admin/products/[id]` | Create · Edit                                                  |
| `/admin/categories`                            | CRUD                                                           |
| `/admin/inventory`                             | Per-size quantity editor, low-stock filter                     |
| `/admin/orders` · `/admin/orders/[id]`         | List + filter · Detail + status transitions                    |
| `/admin/customers`                             | List                                                           |
| `/admin/coupons`                               | Percent / fixed                                                |
| `/admin/reviews`                               | Approve / reject                                               |
| `/admin/settings`                              | Store name, tagline, logo, theme, locale, currency, Stripe/COD |
| `/admin/profile`                               | Owner profile                                                  |

> ⛔ `RULE:` Two independent gates. `proxy.ts` requires a **session** on `/admin/*`.
> The admin layout then checks the **owner email**. Never trust a hidden button.

### 9.3 API — minimum

`/api/auth/[...nextauth]` · `/api/checkout` (or a server action) · `/api/stripe/webhook`
Optional JSON reads for the admin: `/api/products`, `/api/orders`. **Validate everything.**

`COMMENT:` In the Stripe webhook route —
_"Must read the raw body. Next.js-parsed JSON fails signature verification."_

---

## 10. Data model `[P0]`

### 10.1 Types

`SKILL:` `react-types-organizer`

`SETUP:` Anything used in more than one file lives in `types/`. PascalCase.
No `I`/`T` prefix. No `React.FC`.

```
types/
  index.ts     barrel
  domain.ts    Product, Category, Variant, SizeStock, Order, OrderItem,
               Coupon, Review, Customer, Address, Post, User, StoreSettings
  api.ts       checkout / contact / admin mutation payloads
  auth.ts      session user shape
  ui.ts        ClassNameProps, ChildrenProps
  utils.ts     RouteParams, ApiResult, Maybe, Prettify
  env.d.ts     ProcessEnv augmentation for the .env keys
```

**Zod-first.** The runtime schema in `lib/schemas/` is the source of truth;
`export type Product = z.infer<typeof productSchema>` and re-export from
`types/domain.ts`. One definition, not two that drift.

### 10.2 Catalog — `data/catalog.json`

```ts
type Category = {
  id: string; // women | men | kids | curve | dresses
  // fall-winter | shoes | bags | accessories | activewear
  name: string;
  slug: string;
  description: string;
  image: string; // circular thumbnail
};

type SizeStock = {
  size: string; // apparel XS–XL or 36–44
  qty: number;
};

type Variant = {
  color: string; // "Oxblood" | "Bone" | "Ink" | "Sage"
  colorHex: string;
  sizes: SizeStock[];
  image: string; // gallery swaps to this when the colour is selected
};

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string; // category id
  brand: string; // one of the house brands (§5)
  sku: string;
  price: number; // USD
  compareAtPrice?: number;
  image: string; // primary
  hoverImage?: string;
  images: string[]; // gallery
  variants: Variant[];
  materials: string[]; // Cotton, Fine wool, SoftBlend — original names only
  rating: number; // 1–5, derived from approved reviews at seed time
  reviewCount: number;
  featured?: boolean;
  published: boolean; // unpublished products are admin-only
  inStock: boolean; // denormalized: any size qty > 0
  stockQty: number; // denormalized: sum of size qtys
  badge?: "new" | "hot" | "sale";
  features: string[];
  specifications: { label: string; value: string }[];
  reviews: { author: string; rating: number; body: string; date: string }[];
  questions: { question: string; answer: string }[];
  sizeGuide?: { label: string; value: string }[]; // Chest, Waist, Length…
  storyTitle?: string;
  storyBody?: string;
};
```

**Volume — `[P0]`, these numbers are the spec:**

|                    |                                                                                   |
| ------------------ | --------------------------------------------------------------------------------- |
| Categories         | **10**                                                                            |
| Products           | **28**, at least 3 in each of women, men, kids, dresses, fall-winter              |
| Per product        | ≥3 gallery images · ≥2 colours · sizes with qty · 2 approved reviews · 1 question |
| `featured: true`   | ~8                                                                                |
| `inStock: false`   | 2 (every size qty 0)                                                              |
| `published: false` | 0 in the seed — admin can unpublish later                                         |
| Price range        | $48 – $280, with realistic `compareAtPrice` (~30% off on sale items)              |

**Naming** — original and fashion-plain. Register:
_"Harborline Oversized Graphic Sweatshirt"_, _"Northloom Cropped Tiger Tee"_,
_"Velvet Lane Cozy Pullover"_, _"Dawncut Sleeveless Knit Crop"_,
_"Oak & Thread Slim Denim Jacket"_.

### 10.3 Remaining domain types — pin these too `[P0]`

```ts
type Address = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string; // ISO 3166-1 alpha-2, default "US"
  isDefault?: boolean;
};

type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  color: string;
  size: string;
  qty: number;
};

type OrderItem = CartLine & {
  unitPrice: number; // USD snapshot at purchase
};

type Order = {
  id: string;
  orderNumber: string; // ORD-########
  userId: string;
  email: string;
  items: OrderItem[];
  address: Address;
  notes?: string;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: "USD";
  couponCode?: string;
  status:
    | "pending"
    | "paid"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentMethod: "stripe" | "cod";
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
};

type Coupon = {
  code: string; // uppercase, unique
  type: "percent" | "fixed";
  value: number; // 10 means 10% or $10
  minSubtotal?: number;
  expiresAt?: string;
  active: boolean;
};

type ReviewDoc = {
  id: string;
  productId: string;
  author: string;
  authorEmail?: string;
  rating: number; // 1–5
  body: string;
  date: string;
  status: "pending" | "approved" | "rejected";
};

type User = {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  image?: string;
  role: "customer" | "admin";
  addresses: Address[];
  createdAt: string;
};

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  blocks: {
    type: "p" | "h2" | "h3" | "quote" | "ul";
    text?: string;
    items?: string[];
  }[];
};

type StoreSettings = {
  name: string;
  tagline: string;
  logo: string;
  defaultLocale: "en" | "es" | "fr" | "ar";
  defaultCurrency: "USD" | "EUR" | "GBP" | "BDT" | "INR" | "AED";
  defaultTheme: "light" | "dark";
  enableCod: boolean;
};
```

### 10.4 MongoDB collections — native driver

`SETUP:` Collection names are constants (`USERS_COLLECTION = "users"`). Always type
the handle: `db.collection<User>(USERS_COLLECTION)`. Use `new ObjectId(id)` for
`_id` queries.

| Collection   | Purpose                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| `users`      | NextAuth upsert. Email unique; bcrypt hash for credentials; `addresses[]`; `passwordReset` `{ tokenHash, expiresAt }` |
| `products`   | Seeded from JSON; admin CRUD                                                                                          |
| `categories` | Seeded; admin CRUD                                                                                                    |
| `orders`     | `ORD-…` numbers. Status: pending → paid → processing → shipped → delivered / cancelled                                |
| `customers`  | Upsert on order, by email                                                                                             |
| `coupons`    | Code unique; percent or fixed; optional `minSubtotal`, `expiresAt`                                                    |
| `reviews`    | pending → approved / rejected                                                                                         |
| `messages`   | Contact form                                                                                                          |
| `newsletter` | Email unique                                                                                                          |
| `waitlist`   | `{ email, productId, color?, size? }` for Notify Me `[P2]`                                                            |
| `settings`   | Single document, seeded from brand defaults                                                                           |

**Indexes `[P0]`:** `users.email` unique · `products.slug` unique ·
`orders.orderNumber` unique · `orders.stripeSessionId` unique sparse ·
`coupons.code` unique · `newsletter.email` unique.

### 10.5 Client stores

| Store           | Contents                                        | `localStorage` key    |
| --------------- | ----------------------------------------------- | --------------------- |
| Cart            | `CartLine[]` (product id + colour + size + qty) | `ateliervale-cart`    |
| Wishlist        | product ids                                     | `ateliervale-wish`    |
| Compare         | up to 4 product ids                             | `ateliervale-compare` |
| Recently viewed | up to 8 product ids, newest first               | `ateliervale-recent`  |
| Prefs           | locale, currency, theme                         | `ateliervale-prefs`   |
| Coupon          | currently applied code, or empty                | `ateliervale-coupon`  |

`COMMENT:` Beside each key constant —
_"Named key — do not rename; shoppers keep carts across deploys."_

> ⛔ `RULE:` Read `localStorage` only after mount. Reading it during render causes
> a hydration mismatch and the cart badge flickers to zero on every page load.

> ⛔ `RULE:` Signing in **must not** clear the cart, wishlist, or compare.
> Guest lines survive login. Same browser, same keys.

### 10.6 Shared Zod schemas — `lib/schemas/`

`SKILL:` `react-forms-zod`

`SETUP:` One file per input shape. The client uses
`useForm({ resolver: zodResolver(schema) })` with shadcn `Form` / `FormMessage`;
the server action or route handler calls `schema.safeParse`. **Delete every
duplicated regex.**

Minimum: `contactSchema` · `registerSchema` · `signinSchema` · `forgotPasswordSchema` ·
`resetPasswordSchema` · `changePasswordSchema` · `addressSchema` · `checkoutSchema` ·
`newsletterSchema` · `reviewSchema` · `productAdminSchema` · `couponSchema` ·
`inventorySchema` · `settingsSchema`.

### 10.7 Commerce engine — `lib/commerce.ts` + `lib/money.ts` `[P0]`

`SETUP:` All pricing goes through these helpers. Pages display; they do not calculate.

```ts
// lib/money.ts
export const FX: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  BDT: 110,
  INR: 83,
  AED: 3.67,
};

export function formatShopPrice(amountUsd: number, currency: string): string;
export function convertDisplay(amountUsd: number, currency: string): number;
```

```ts
// lib/commerce.ts
export function shippingFor(subtotalUsd: number): number; // 0 if >= 100 else 8
export function applyCoupon(subtotalUsd: number, coupon: Coupon | null): number;
export function priceCart(
  lines: CartLine[],
  products: Product[],
  coupon: Coupon | null,
): {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
};
export function findSizeQty(
  product: Product,
  color: string,
  size: string,
): number;
```

**Pinned policies**

| Policy                 | Rule                                                                                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Canonical currency** | USD. Stripe line items are always USD. Display currencies convert with the **pinned** `FX` table. No live FX API.                                              |
| **Tax**                | Inclusive. Do **not** add VAT/sales tax at checkout.                                                                                                           |
| **Shipping**           | `$0` when `subtotal >= 100`, else `$8`. No other methods.                                                                                                      |
| **Coupons**            | One at a time. `VALE10` = 10% off, minimum $50. Stacking is forbidden. Expired or inactive codes toast and refuse.                                             |
| **Stock**              | Per colour + size. ATC and checkout both check `findSizeQty`. Insufficient stock → `409`, toast, do not create a Stripe session.                               |
| **Decrement**          | The Stripe webhook (and the COD place-order action) decrement size qty, then recompute `stockQty` / `inStock`.                                                 |
| **Idempotency**        | Unique sparse index on `orders.stripeSessionId`. A replayed webhook is a no-op, not a second decrement.                                                        |
| **Price trust**        | Client sends **productId + color + size + qty**. Server looks up `product.price`. A client `price: 1` is ignored.                                              |
| **Low stock**          | Size qty `> 0` and `<= 5` → _"Only {n} left"_. Qty `0` → sold out for that size.                                                                               |
| **Email**              | No SMTP. The receipt **is** `/checkout/success`. Forgot-password prints a one-time link to the **server console** once (never the page, never `BUILD-LOG.md`). |
| **COD**                | If `settings.enableCod`, checkout offers it. Creates `status: "pending"`, `paymentMethod: "cod"`, still decrements stock.                                      |
| **Cancel**             | Customer may cancel `pending` or `paid` (not yet shipped). Restores size qty. Admin may move any status except `delivered` → `cancelled`.                      |
| **Returns**            | Legal page only. No returns portal in v1.                                                                                                                      |

> ⛔ `RULE:` Rule "price trust" is the one that costs real money. The client
> sends ids and quantities. The server looks up prices, applies the coupon, and
> builds the Stripe line items.

---

## 11. Home page — section by section `[P0]`

Full width. Max content column **1400px**, `px-4 sm:px-6`.

`page.tsx` is a **Server Component**: load the catalog on the server, pass data
into small client leaves (`HeroSlider`, `RecommendedCarousel`, `MiniCart`).

### 11.1 Top promo ticker

Infinite marquee, dark bar, 13px. Rotate three lines, each linking to `/shop`:
_"New-season knits — all under $80"_ · _"House denim, cut to last"_ ·
_"Two-day express on orders over $200"_.
`prefers-reduced-motion` → freeze, no marquee.

### 11.2 Header — three rows, compact on scroll

- **Row A (utility):** locale · currency · theme · phone · "Free express shipping on orders $200"
- **Row B (main):** wordmark **Atelier Vale** left. Centre: search that filters the catalog as you type and routes to `/product/[slug]` or `/shop?q=`. Right: compare count, wishlist count, account dropdown (Account, Orders, Admin if owner, Sign out), bag with quantity that opens the mini-cart Sheet.
- **Row C (nav):** _Shop by Categories_ **mega menu** — two columns per department (Women, Men, Kids, Curve, Dresses, Fall & Winter, Shoes, Bags) with real links into `/category/[slug]`, plus a promo tile. Then text links: Home, Shop, Women, Men, Dresses, Blog, Contact.

Mobile: hamburger Sheet with accordion departments, search, icon row.
On scroll past 24px the header becomes compact and sticky — **with no layout jump**.

### 11.3 Hero slider

Three full-bleed slides. ~32–36rem desktop, ~22rem mobile. Autoplay 7s, pause on
hover, arrows + dots, keyboard accessible. Reduced motion → no autoplay.
Each slide: eyebrow, two-line title, `Starting From` + price + save percentage,
CTA `Shop Collection` → `/shop`, and an original editorial photo of clothing on a model.

### 11.4 Popular by Categories

Heading + `View All Categories` → `/categories`. **Six circular tiles**
(Women, Curve, Kids, Men, Dresses, Fall & Winter), horizontally scrollable on
mobile. Image in a circle, label beneath, slight scale on hover. → `/category/[slug]`.

### 11.5 Recommended Just For You

Heading plus one line of supporting copy. Horizontal carousel — 4 visible on
desktop, peek on tablet, 1.2 on mobile. Each card:
image with hover swap · `NEW ARRIVAL` badge when `badge === "new"` · category link ·
name → PDP · stars + review count · struck `compareAtPrice`, current price,
negative percentage · **Add To Cart** (default variant, toast on success) ·
quick-view icon.

### 11.6 Full-width sale banner

One editorial banner, full bleed, click-through to `/shop`.

### 11.7 Collection marquee

Infinite ticker: `NICE AND COMFY SHIRT` · `JACKET THAT YOU LOVE` · `COLORFUL TEE` ·
`SHORTS FOR THE WEEKEND` · `VALE COLLECTION 2026`

### 11.8 Shorts reel

Heading, then a horizontal reel of 6–8 portrait **9:16** tiles with a play
affordance. Clicking opens a dialog with a muted looping video, or a still if you
have no video file. `DECIDE:` stills are acceptable for v1.
⛔ Never embed third-party video IDs.

### 11.9 Journal

Heading + `View All` → `/blog`. Five cards: image, category chip, date, title,
read time, author, `Read More`.

### 11.10 Trust row

| Title           | Hint                         |
| --------------- | ---------------------------- |
| Free Shipping   | On all orders over $100      |
| Quality Support | 24/7 online feedback         |
| Return & Refund | Return money within 30 days  |
| Gift Voucher    | 20% off when you shop online |

### 11.11 About accordion

Long-form brand story with `Show More` / `Show Less`, three to four headings.
Original Atelier Vale copy — cut, cloth, repair, stores.

### 11.12 Store locations

Five stores, name + address:
Broadway — 1260 Broadway, San Francisco, CA ·
Valencia — 1501 Valencia St, San Francisco, CA ·
Pennsylvania — 3122 Pennsylvania Ave ·
Emeryville — 1034 36th St, Emeryville, CA ·
Alameda — 1433 High St, Alameda, CA

### 11.13 Bottom ticker

`ATELIER VALE — 10% OFF ON YOUR FIRST ORDER`, repeating.
⛔ `RULE:` Coupon `VALE10` must **actually work** in checkout. Seed it (§20).
An offer the site cannot honour is a bug, not copy.

### 11.14 Footer

Columns: brand + phone · categories · customer service (About, Contact, FAQ,
Wishlist, Sign in, Terms, Privacy, Returns) · newsletter form (Zod email + toast,
persist to `newsletter`).
Bottom bar: `Copyright {year} © Atelier Vale.` plus **generic, code-drawn** payment
marks — no trademarked wordmarks.

### 11.15 Right-side floating dock

Fixed right rail, desktop only (≥1024px), stacked pills with live counts:
Compare · Wishlist · Search (opens dialog) · Shop · Profile.
Toasts: _"Added in Compare"_, _"Added in Wishlist"_.

### 11.16 Cookie bar

First visit only. Decline / Accept. Persist to `ateliervale-cookies`.

### 11.17 Mini-cart Sheet

Opens from the header bag and from the dock. Lists each `CartLine` with thumb,
name, colour, size, qty stepper, line total, remove. Subtotal via `priceCart`.
Empty state with Continue Shopping. CTA → `/cart`. Secondary → `/checkout`
(signed-out users get the sign-in toast).

---

## 12. Storefront pages — behaviour `[P0]`

### `/shop` and `/category/[slug]`

Breadcrumb · fast-filter chips (Featured, Best Sellers, Top Rated, New, On Sale) ·
toolbar (result count, grid density 2/3/4, sort by featured / title / price /
rating, per-page 12 or 24) · **pagination** · left filter panel, a Sheet on mobile
(category, price slider, in-stock, on-sale, colour, size, brand).

All of the above is **URL state**. Reloading `/shop?color=Oxblood&sort=price-asc&page=2`
restores the same grid. `searchParams` is a Promise — await it.

Product card: hover image · badges (NEW / SALE / HOT / SOLD OUT) · category · name ·
stars · free-shipping and returns microcopy · prices · stock state
(`{n} in Stock` / `Limited Stock` / `Notify Me`) · Add To Cart · Add To Compare ·
**Quick view** (Sheet: gallery, price, colour/size, ATC, link to full PDP).
Sold out → no add, `Notify Me` collects email (`waitlist` or toast-only `[P2]`).
Empty filter state with a clear button.

### `/product/[slug]`

Breadcrumb · prev/next product peek · gallery with vertical thumbs and desktop
hover zoom · title, short description, price + save %, brand, stars, shipping and
returns · **colour swatches**, **size chips**, **material chips** ·
**Size guide** dialog from `sizeGuide` · `Only {n} left` when low · quantity stepper ·
**Add To Cart** · **Buy Now** (add then go to `/checkout`) · Compare / Wishlist /
Share (`navigator.share`, falling back to copy link) · specs list · tabs
(Description, Specification, Reviews, Questions) · compare-similar table ·
similar-items carousel · frequently-bought-together (3 products, checkbox bundle
add) · sticky mobile ATC bar.

Selecting a colour swaps the gallery to that variant's image.
On mount, push the product id into recently-viewed.
Signed-in customers can **submit a review** (Zod, `status: "pending"`).
Unknown slug → `notFound()`.

### `/cart`

Table: product (thumb + name + variant) · price · qty · line total · remove.
Empty state with Continue Shopping. Summary: subtotal, shipping, discount, total,
coupon field, Checkout CTA. Similar items and recently-viewed beneath.

Shipping is `shippingFor(subtotal)` from `lib/commerce.ts`. Never inline the number.

### `/checkout`

**Must be signed in** — otherwise open sign-in and toast. Form: name, email, phone,
address (or pick a saved address), notes, prefilled from the session. Zod schema
shared with the server action. Stripe Checkout in USD. Order summary sidebar
priced by `priceCart`. COD radio if `settings.enableCod`.

Server, before creating the session:

1. `requireUser()`.
2. `safeParse` the payload.
3. Look up each line's product and `findSizeQty`. Any miss or OOS → `409`.
4. Recompute totals. Ignore any client-sent price.
5. Create the Stripe session **or** the COD order.

> ⛔ `RULE:` If Stripe keys are missing, **toast clearly and do not crash**. A
> missing environment variable is a configuration state, not an exception.

### `/wishlist` · `/compare`

Wishlist: grid of saved cards, move to cart, remove, copy link.
Compare: table of image, name, price, rating, brand, colour, material, stock, ATC.
Max 4. A 5th add toasts _"Compare is full — remove one first."_ and does not add.

### `/blog` · `/blog/[slug]`

6–8 **original** posts about cloth, fit, care and season. Block types: `p`, `h2`,
`h3`, `quote`, `ul`. Author, read time, category. JSON-LD `BlogPosting`.
`data/posts.json` seeds the content.

### `/contact`

Name, email, message. Same Zod on the client and `safeParse` on the server.
Sonner toast. Persist to `messages`.

### `/signin` · `/register` · `/forgot-password` · `/reset-password/[token]`

Centred auth chrome, no mega header, no dock. Credentials + Google + GitHub on
signin/register. Register hashes with bcrypt, cost ≥ 10.

Forgot-password: always the generic success toast. If the email exists, write a
hashed token (`users.passwordReset`) with 1-hour expiry and `console.log` the
reset URL once. Reset page validates the token, sets a new hash, clears the token.

### `/account/*`

Nav: Overview · Orders · Addresses · Profile · Password.
Orders show a status timeline (pending → paid → processing → shipped → delivered).
Customer can cancel `pending` / `paid`. Ownership check: the order's `userId` or
email **must** match the session — never trust the URL id alone.
Addresses: max 5, one default, used to prefill checkout.

---

## 13. Admin `[P0]`

A dense operations dashboard, not a second marketing site. Compact density —
`gap-4`, `p-4`, `text-sm`. shadcn `Table` + `Card` + `Badge` + `DropdownMenu` +
`Sheet`, and `AlertDialog` for anything destructive.

- **Sidebar groups:** Overview (Dashboard, Analytics) · Catalog (Products, Categories, Inventory) · Sales (Orders, Customers, Coupons) · Store (Reviews, Settings, Profile)
- **Dashboard:** orders, revenue, customers, AOV · area chart (last 14 days) · category pie · low-stock table · recent orders
- **Products:** create/edit against the `Product` type — variants with per-size qty, gallery paths, stock, badge, featured, published. Zod validated. Image fields are **paths** under `/atelier-vale/…` — no blob upload in v1.
- **Inventory:** flat table of product × colour × size qty. Low-stock filter (`qty <= 5`). Saving recomputes `stockQty` / `inStock`.
- **Orders:** status transitions, `requireAdmin()` first, then `revalidatePath` on `/admin/orders` **and** `/account/orders`. Cancelling restores size qty.
- **Coupons:** seed `VALE10` — 10% off, minimum $50
- **Reviews:** approve / reject. Approved reviews surface on the PDP; pending do not.
- **Settings:** name, tagline, logo path, default theme, locale, display currency, enable COD
- **Customers:** list from the `customers` collection (upserted on order)

---

## 14. Security baseline `[P0]`

| #   | Rule                                                                                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Never** import a non-`NEXT_PUBLIC_` env var into a client component — not directly, not through a shared helper that a client file also imports.             |
| 2   | **Every** route handler and server action validates its input with the shared Zod schema before touching the database. No exceptions for "internal" endpoints. |
| 3   | **Authorise on the server, every time.** A hidden button is not a permission check. `requireAdmin()` / `requireUser()` runs first, before input parsing.       |
| 4   | **Verify the Stripe webhook signature** against the raw request body. An unverified webhook lets anyone mark any order paid.                                   |
| 5   | **Never trust a client-supplied price, total, or discount.** Recompute the cart server-side from product ids before creating a Stripe session.                 |
| 6   | **Never log** passwords, tokens, full card data, or complete customer records. Log ids. The reset URL may hit `console.log` once in dev; never commit it.      |
| 7   | Passwords are **bcrypt** hashed, cost ≥ 10. Never stored, compared, or returned in plaintext. Reset tokens are hashed at rest.                                 |
| 8   | Auth failures are **generic**. No account enumeration through error text or timing.                                                                            |
| 9   | Ownership checks on every account route — a user may read **only their own** orders. Never trust an `id` from the URL.                                         |
| 10  | `.env.local` is git-ignored. Only `.env.example` is committed, always empty.                                                                                   |
| 11  | Webhook fulfilment is **idempotent**. A second event with the same `stripeSessionId` does not decrement stock twice.                                           |
| 12  | Stock is checked **on the server** at session-create time, not only in the UI.                                                                                 |

> ⛔ `RULE:` Rule 5 is the one that costs real money. The client sends **product
> ids and quantities**. The server looks up prices, applies the coupon, and builds
> the Stripe line items. A client that can send `price: 1` is a store that sells
> everything for a dollar.

---

## 15. Performance & accessibility budget `[P1]`

**Performance**

- Server Components render the catalog. Ship JavaScript only for genuine interactivity.
- Every `next/image` has explicit `width`/`height` or `fill` + a sized container. **Zero layout shift** from images.
- Above-the-fold hero image: `priority`. Everything else: lazy.
- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, or `left`.
- Carousels and marquees pause when off-screen and freeze under `prefers-reduced-motion`.
- Target **LCP < 2.5s** and **CLS < 0.1** on `/` at desktop cable speed.

**Accessibility**

- Every interactive element has an accessible name. Icon-only buttons get `aria-label`.
- Every input has a real `<label>`. Placeholders are not labels.
- Carousels, mega menu, and dialogs are fully **keyboard operable**, with visible focus and no focus traps.
- Body text meets **WCAG AA** contrast (4.5:1) in both light and dark themes.
- `alt` on product images is the **product name**. Decorative images get `alt=""`.
- Tap targets ≥ 40px on mobile.
- `dir="rtl"` when the locale is `ar`; use logical properties (`ms-`, `ps-`) on mirrored chrome, never `ml-` / `pl-`.

---

## 16. Images — original only `[P0]`

`SKILL:` `imagine`

Generate a consistent editorial set into `public/atelier-vale/`.

| Path                       | What                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `logo.svg`                 | Atelier Vale wordmark, black on transparent. **Code-drawn SVG** — image models garble text. |
| `hero/slide-1…3.webp`      | Full-bleed model + outfit, 1920×900, three distinct looks                                   |
| `cats/*.webp`              | Circular category stills — garment or folded cloth                                          |
| `products/{slug}-1…4.webp` | **Same garment**: front, 3/4, detail, hover                                                 |
| `banners/sale.webp`        | Wide campaign image                                                                         |
| `blog/*.webp`              | 5–8 lifestyle stills                                                                        |
| `shorts/*.webp`            | 9:16 stills                                                                                 |
| `payments/*.svg`           | Generic card marks, code-drawn                                                              |

**Style lock for every product photo:** seamless warm paper background
(`#F4EDE6` or `#FAFAF8`), soft studio light, no other brands' logos, no readable
fake UI, no watermark, no celebrity likeness.

> ⛔ `RULE:` For a garment that appears more than once, generate **one canonical
> shot**, then `image_edit` from that reference so the angles match. Never a fresh
> `image_gen` per angle — you get four different sweaters.

**Fallback:** if image generation is unavailable, use solid-colour placeholders
with the product name printed, **keeping the exact same file paths** so real
images drop in later. Never leave a broken `next/image` src.

---

## 17. Copy & i18n `[P1]`

`lib/copy.ts` maps key → locale record (`en` `es` `fr` `ar`). Cover at minimum:
`addToCart`, `added`, `shop`, `home`, `sale`, `soldOut`, `checkout`, `emptyCart`,
`searchPlaceholder`, `freeShipping`, `returns`, `newsletter`, `signIn`, `signOut`,
`account`, `orders`, `wishlist`, `compare`, `onlyNLeft`, `invalidCredentials`,
`couponApplied`, `couponInvalid`, `outOfStock`.

Default `en`. Switching locale updates chrome immediately; product names stay
English (they are the catalog). `ar` sets `dir="rtl"` on `<html>`.

Apparel specifications are **fabric, fit, weight, care, origin, SKU** —
never resolution, motherboard, or battery life.

---

## 18. File architecture & comment convention `[P1]`

```
app/
  layout.tsx                 SessionProvider, ThemeProvider, Toaster, metadataBase
  proxy.ts                   session gates (or middleware.ts)
  page.tsx                   home (RSC) → client leaves for sliders only
  shop/ category/[slug]/ product/[slug]/
  cart/ checkout/ wishlist/ compare/
  blog/ blog/[slug]/
  about/ contact/ faq/ terms/ privacy/ returns/
  signin/ register/ forgot-password/ reset-password/[token]/
  account/…  admin/…
  api/auth/[...nextauth]/route.ts
  api/stripe/webhook/route.ts
  sitemap.ts robots.ts not-found.tsx error.tsx
components/
  layout/    header, footer, dock, mega-menu, search, mini-cart, cookie-bar
  home/      one file per section
  product/   card, gallery, variant-picker, qty, tabs, quick-view, size-guide
  shop/      filters, toolbar, grid, pagination
  cart/ checkout/ account/ admin/
  ui/        shadcn
lib/
  mongodb.ts    cached singleton
  auth.ts       re-export from /auth.ts
  catalog.ts
  commerce.ts   priceCart, shippingFor, applyCoupon, findSizeQty
  money.ts      formatShopPrice, convertDisplay, FX
  copy.ts       locale strings
  seo.ts        generateSEOMetadata + jsonLd
  utils.ts      cn()
  schemas/      zod — shared client + server
  actions/      "use server"
  stores/       cart, wish, compare, recent, prefs, coupon
types/          see §10.1
data/catalog.json
data/posts.json
public/atelier-vale/
scripts/seed.mjs
```

**Pattern:** `page.tsx` (server) loads catalog / session / orders and passes props
into a small client view.

### 18.1 Comments in generated code

This spec's `VIDEO CHUNK` / `WHY` comments stay **in this file**. They are the
talk track for writing the prompt from scratch. They do **not** belong in
`app/`, `components/`, or `lib/`.

> ⛔ `RULE:` Comments in application source are **scarce on purpose**. A comment
> explains _why_, never _what_. If a comment restates the code, delete the comment.

✅ **Allowed**

```ts
/** Mini-cart Sheet. Reads ateliervale-cart. */ // one-line file header

// Next 16: params is a Promise — await it.
// Stripe needs the raw body; parsed JSON fails signature verification.
// Named key — do not rename; shoppers keep carts across deploys.
// RULE: never trust a hidden button — requireAdmin() first.
```

⛔ **Forbidden**

```ts
// import react
// loop through the products
// TODO: implement later          ← in a file you called finished
// SETUP: run pnpm install        ← never copy this prompt's tags into source
```

---

## 19. Build phases — A → I `[P0]`

> ⛔ `RULE:` The app is **runnable after every phase**. "Runnable" means
> `pnpm dev` serves without error, `pnpm check-types` is clean, and the browser
> console has no errors. Never begin a phase with the previous `VERIFY:` failing.

> ⛔ `RULE:` A `VERIFY:` you did not run is a fail. Do not write `VERIFY: pass`
> from memory, from "it should work", or from a skipped browser check (§0.6).

### Phase A — Scaffold

`SETUP:` §6.2 commands · `auth.ts` stub · `lib/mongodb.ts` · `.env.example` ·
`lib/utils.ts` (`cn()`) · `lib/seo.ts` · `lib/money.ts` · `lib/commerce.ts` stubs ·
`types/` · fonts on `<html>` · theme tokens · `BUILD-LOG.md`.

`VERIFY:` `pnpm dev` serves `/` with no error. `pnpm check-types` clean.

### Phase B — Chrome

Header, mega menu, right dock, footer, cookie bar, theme/locale/currency switchers,
mini-cart Sheet. An empty catalog is fine — the shell must already read as the target.

`VERIFY:` Desktop header is three rows. Mobile is a Sheet. Dock visible ≥1024px.
**No horizontal page scroll at 390px.**

### Phase C — Catalog

`data/catalog.json` (28 products, per-size stock) · `data/posts.json` ·
`lib/catalog.ts` · `ProductCard` + quick view · home §11.3–11.14.

`VERIFY:` `/` renders ticker, hero, circular categories, recommended, banner,
marquee, shorts, journal, trust, accordion, locations, footer, dock.

### Phase D — Commerce UI

Shop filters + URL state + pagination · PDP variants + size guide · cart ·
wishlist · compare · recently viewed. All persist across reload.

`VERIFY:` Add to cart from home, shop, **and** PDP with colour + size. Mini-cart
and `/cart` agree. Dock counts match wishlist and compare. `/shop?color=Oxblood`
survives reload.

### Phase E — Auth & checkout

NextAuth credentials + Google + GitHub · forgot/reset password · account pages
(orders, addresses, profile, password) · Stripe Checkout · webhook that marks
orders paid, decrements stock, upserts customers · coupon `VALE10` · COD path.

`VERIFY:` Register → sign in → checkout **refuses anonymous users**. Stripe test
path exists (clear toast when keys are missing). `VALE10` applies and changes the
total. Cart still present after login. Reset-password console link works.

### Phase F — Content

Blog, about, contact, FAQ, legal. Contact and newsletter persist. Review submit
on PDP (pending).

`VERIFY:` `/blog/[slug]` has metadata **and** JSON-LD. Contact toasts on submit
and writes `messages`.

### Phase G — Admin

All admin routes · `requireAdmin()` on every action · inventory per-size editor ·
`pnpm seed` upserting catalog, coupon, settings.

`VERIFY:` Admin email sees the dashboard. A non-admin session is redirected.
Product CRUD round-trips through Mongo. Approving a review shows it on the PDP.

### Phase H — Images

Replace placeholders with generated assets. Update JSON paths.

`VERIFY:` No broken `next/image`. No hotlinks. Hero and ≥8 products have real stills.

### Phase I — SEO & verification

Metadata, JSON-LD, sitemap, robots, loading/error states. Then run §21 in full.

`VERIFY:` `sitemap.ts` lists public routes, `robots.ts` disallows private ones,
and every line of §22 is true.

---

## 20. Seed & demo access `[P0]`

`SETUP:` `scripts/seed.mjs`, wired as `"seed": "node scripts/seed.mjs"`:

1. Connect to Mongo.
2. Upsert all categories and products from `data/catalog.json`.
3. Upsert posts from `data/posts.json`.
4. Upsert coupon `VALE10` — 10% off, minimum $50, `active: true`.
5. Upsert `settings` from the brand defaults.
6. If `NEXT_PUBLIC_ADMIN_EMAIL` is set, ensure that user exists with `role: "admin"`.
   If you create it, print a random password to the console **once**. Never commit it.

> ⛔ `RULE:` The seed is **idempotent**. Running `pnpm seed` twice produces the
> same database, not 56 products.

`README.md` must state: copy `.env.example` → `.env.local`, `pnpm install`,
`pnpm seed`, `pnpm dev`, open `http://localhost:3000`.

---

## 21. Verification `[P0]`

`SKILL:` `verification`

**Automated — must pass**

```bash
pnpm check-types   # zero errors
pnpm lint          # zero errors
pnpm build         # completes
```

**Manual — walk it like a shopper, at 1440px and 390px**

1. Land on `/`. Scroll the whole page. No layout shift, no horizontal scroll, no console errors.
2. Click **Shop Collection** → land on `/shop`. Apply a filter. Change sort. Change density. Go to page 2. Reload — state survives.
3. Open a product. Pick a **colour** — the gallery swaps. Pick a **size**. Add to cart. Open quick view from a card and add from there too.
4. Open the mini-cart. Open `/cart`. The quantities agree.
5. Apply `VALE10`. The total changes. Apply a garbage code — toast, total unchanged.
6. Go to `/checkout` **signed out** — you are refused.
7. Register, sign in, return to checkout. The form prefills from the session. **The cart is still there.**
8. Add to wishlist and compare. The dock counts match the pages. A 5th compare toasts and refuses.
9. Open `/blog`, then a post. Metadata and JSON-LD are present.
10. Submit a review while signed in — it does **not** appear until an admin approves it.
11. Open `/admin` as a non-admin — you are redirected. As the admin — the dashboard loads. Edit a size qty. The PDP "Only n left" updates.
12. Visit a URL that does not exist — a custom 404, not a crash.
13. Switch locale to `ar` — chrome flips RTL. Switch currency — prices relabel, Stripe would still charge USD.

> ⛔ `RULE:` If a flow fails, **fix it before you stop**. A known-broken flow is
> not a finding to report — it is unfinished work.

---

<!-- ── VIDEO CHUNK 13 · DEFINITION OF DONE ────────────────────────────────
     Slide: BLOCK 09 · DEFINITION OF DONE
     Type: two checklist lines live (every route renders; cart → Stripe → paid).
     Gesture at the rest. Say: done is binary. All true — not most.
     ────────────────────────────────────────────────────────────────────── -->

## 22. Definition of done `[P0]`

The application is done when **every** line is true. Not most.

- [ ] 1. `pnpm dev` serves a `/` a stranger would recognise as an editorial fashion home: ticker, mega header, hero slider, circular categories, recommended carousel, sale banner, marquee, shorts, journal, trust row, accordion, locations, footer, right dock, mini-cart.
- [ ] 2. Every route in §9 returns 200 (or a correct redirect). Unknown slugs return a custom 404.
- [ ] 3. Add to cart works from home, shop, quick view, **and** PDP with colour + size, and updates the mini-cart and `/cart`.
- [ ] 4. Wishlist, compare, and recently-viewed counts match the dock/pages, and survive a page reload **and** a login.
- [ ] 5. Sign in, register, forgot/reset password, and OAuth buttons render. **Checkout refuses anonymous users.**
- [ ] 6. The Stripe test path exists. With keys missing it shows a clear toast and does **not** crash. COD works when enabled in settings.
- [ ] 7. The admin dashboard loads for the admin email and redirects everyone else. Inventory edits per-size qty. Review approve/reject works.
- [ ] 8. Coupon `VALE10` applies and changes the total. Shipping is $0 over $100, else $8. Totals come from `lib/commerce.ts`.
- [ ] 9. `/`, `/shop`, one `/product/[slug]`, and `/cart` are correct at **1440px and 390px** — no horizontal scroll, tap targets ≥ 40px, mega menu becomes a Sheet.
- [ ] 10. No reference-site copy, class names, images, or third-party trademarks anywhere. No Bootstrap.
- [ ] 11. `pnpm check-types` and `pnpm lint` are clean. `pnpm build` completes.
- [ ] 12. Public pages have metadata + canonical. Private pages are `noIndex`. `sitemap.ts` and `robots.ts` exist. PDP/blog have JSON-LD.
- [ ] 13. Every rule in §14 (security) holds. Prices are recomputed server-side. Webhook is signature-checked and idempotent. Stock decrements once.
- [ ] 14. `BUILD-LOG.md` records all nine phases with decisions and deviations.

---

## 23. Tie-break — when two things conflict `[P0]`

Resolve **top down**. The first rule that applies wins.

| #   | Wins on                                | Over                                                         |
| --- | -------------------------------------- | ------------------------------------------------------------ |
| 1   | **This file**                          | Any habit, tutorial, blog post, or older convention          |
| 2   | **§14 security**                       | Any convenience, deadline, or "we'll fix it later"           |
| 3   | **§10.7 commerce engine**              | A page that wants to format money or compute shipping itself |
| 4   | **The visual reference**               | Your own taste — on layout density and shopper flow only     |
| 5   | **§7 architecture**                    | The reference site — on structure, data, and state           |
| 6   | **Installed packages + loaded skills** | Your memory — on API details, CLI flags, and version numbers |
| 7   | **`DECIDE:` = your judgement**         | Stalling. Choose, implement, log it.                         |

A remembered `next@14` API loses to the installed `next` package. A remembered
Tailwind v3 class loses to Tailwind v4. An invented `VERIFY: pass` loses to a
browser that actually loaded the page.

---

> ### Final instruction
>
> Do not wait for permission. Do not ask which pages to include. Do not stop after
> a pretty homepage. Do not invent APIs. Do not pin stale versions from memory.
> Do not tick a check you did not run.
>
> **Read this file once. Install the latest of the locked family. Then start at Phase A.**
> **Build until every line of §22 is true in a browser.**
