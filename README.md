<p align="center">
  <img src="public/atelier-vale/logo.svg" alt="Atelier Vale" height="28" />
</p>

<h1 align="center">Atelier Vale</h1>

<p align="center">
  Editorial fashion storefront and owner admin.<br />
  Paper and ink. Fraunces over Geist.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-111111?style=flat-square" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-111111?style=flat-square" alt="React 19" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-111111?style=flat-square" alt="MongoDB Atlas" />
  <img src="https://img.shields.io/badge/Stripe-Checkout-111111?style=flat-square" alt="Stripe" />
  <img src="https://img.shields.io/badge/pnpm-12-111111?style=flat-square" alt="pnpm" />
</p>

<p align="center">
  <img src="docs/storefront.webp" alt="Atelier Vale homepage running at localhost:3000" width="100%" />
</p>

<p align="center">
  Built by <a href="https://noormohammad.reactbd.com">Noor Mohammad</a>
  · <a href="https://reactbd.com">reactbd.com</a>
</p>

<p align="center">
  <a href="https://reactbd.com">ReactBD</a> ·
  <a href="https://noormohammad.reactbd.com">Portfolio</a> ·
  <a href="https://www.youtube.com/@reactjsBD">YouTube</a> ·
  <a href="https://github.com/noorjsdivs">GitHub</a> ·
  <a href="https://www.linkedin.com/in/noor-mohammad-ab2245193/">LinkedIn</a> ·
  <a href="https://x.com/NoorMoh74531005">X</a> ·
  <a href="https://www.instagram.com/simplenoor143/">Instagram</a> ·
  <a href="https://www.facebook.com/Noorlalu143/">Facebook</a> ·
  <a href="https://discord.gg/emtX5zCUku">Discord</a> ·
  <a href="https://wa.me/8801817986903">WhatsApp</a> ·
  <a href="mailto:reactjsbd@gmail.com">Email</a> ·
  <a href="https://buymeacoffee.com/reactbd">Buy Me a Coffee</a> ·
  <a href="https://medium.com/@thebuildersplaybook">Medium</a>
</p>

**Atelier Vale** is a complete fashion e-commerce app: a public store you can browse, filter, and check out of, plus an owner admin for catalog, inventory, orders, and settings. The house is fictional. The checkout, stock, and admin are real.

The screenshot above is the live homepage at [http://localhost:3000](http://localhost:3000).

Fork it, run it, restyle it, sell from it. It is free to use under the [MIT License](#license).

---

## Contents

- [What you get](#what-you-get)
- [Stack](#stack)
- [How anyone can run this](#how-anyone-can-run-this)
- [MongoDB](#mongodb)
- [Environment](#environment)
- [How the store works](#how-the-store-works)
- [Scripts](#scripts)
- [Project layout](#project-layout)
- [Deploy](#deploy)
- [Reach out](#reach-out)
- [License](#license)

---

## What you get

### Storefront

| Area         | What ships                                                                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**     | Hero slider, category tiles, departments, recommended, sale, new arrivals, look tiles, collection marquee, shorts reel, journal, newsletter, trust row, stores |
| **Catalog**  | 10 categories, 28 products, colour + size variants, per-size stock, badges, hover images                                                                       |
| **Shop**     | URL filters, sort, density, pagination, header search, quick view                                                                                              |
| **Product**  | Gallery, swatches that swap images, size guide, add to cart, buy now, wishlist, compare, reviews                                                               |
| **Bag**      | Mini-cart sheet, full cart, coupon `VALE10`, shipping rule, `localStorage` persistence                                                                         |
| **Checkout** | Signed-in only. Stripe Checkout or cash on delivery. Success and cancel pages                                                                                  |
| **Account**  | Register, sign in, Google / GitHub, forgot / reset password, orders, profile, addresses                                                                        |
| **Pages**    | Wishlist, compare (max 4), blog, about, contact, FAQ, terms, privacy, returns                                                                                  |
| **Chrome**   | Three-row mega header, mobile sheet, right dock, cookie bar, locale, display currency                                                                          |

### Admin (`/admin`)

Dashboard, analytics, products, categories, inventory (per-size), orders, customers, users, coupons, reviews, store settings, profile.

Access is not a hidden button. The signed-in email must match `NEXT_PUBLIC_ADMIN_EMAIL`.

### Catalog at a glance

Women, Men, Kids, Curve, Dresses, Fall & Winter, Shoes, Bags, Accessories, Activewear — 28 house pieces with colourways and graded sizes.

---

## Stack

| Layer      | Choice                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------- |
| App        | [Next.js](https://nextjs.org/) 16 App Router, React 19, TypeScript                                                  |
| UI         | Tailwind CSS 4, [shadcn/ui](https://ui.shadcn.com/) (Radix), Fraunces + Geist                                       |
| Auth       | [Auth.js](https://authjs.dev/) / NextAuth v5 — credentials, Google, GitHub                                          |
| Data       | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) via the native driver, with JSON catalog fallback for browsing |
| Payments   | [Stripe Checkout](https://stripe.com/docs/payments/checkout) + webhook; optional COD                                |
| Media      | Local `/public` assets; optional [ImageKit](https://imagekit.io/) upload                                            |
| Validation | Zod 4                                                                                                               |

---

## How anyone can run this

You need **Node.js 20.9+**, **[pnpm](https://pnpm.io/) 12** (this repo pins `pnpm@12.3.4`), and a **MongoDB Atlas** database. No Docker.

```bash
git clone https://github.com/noorjsdivs/fashion-ecommerce.git
cd fashion-ecommerce

cp .env.example .env
pnpm install
```

Then fill `.env` (see [MongoDB](#mongodb) and [Environment](#environment)), seed, and start the app:

```bash
pnpm seed
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

`pnpm seed` upserts the catalog, journal posts, store settings, coupon **VALE10**, indexes — and, if `NEXT_PUBLIC_ADMIN_EMAIL` is set and that user does not exist, an admin account. **The generated password is printed once.** Save it.

```
Admin user created for you@example.com. Password (shown once): …
```

If the user already exists, seed only ensures the role is `admin`. It does not reset the password.

You can browse the catalog, shop, and product pages without Mongo — `data/catalog.json` and `data/posts.json` are the fallback. Accounts, orders, reviews, and admin need the database.

---

## MongoDB

This project talks to MongoDB with the official Node driver. There is no local Docker container to start. Create a database in the cloud, paste the connection string, seed, and you are running.

### 1. Create a free Atlas cluster

1. Open [MongoDB Atlas](https://cloud.mongodb.com) and sign up (or log in).
2. Create a project if you do not have one.
3. **Create** a cluster → choose **M0 Free** → pick a region close to you → Create.

Wait until the cluster shows as idle / available.

### 2. Database user

1. **Database Access** → **Add New Database User**.
2. Authentication: **Password**.
3. Choose a username and a strong password. Save both — they go into `MONGO_URI`.
4. Privileges: **Atlas admin**, or at least `readWriteAnyDatabase`.

If the password contains `@`, `#`, `/`, `%`, or similar, [URL-encode it](https://www.mongodb.com/docs/atlas/troubleshoot-connection/#special-characters-in-connection-string-password) before putting it in the URI (`p@ss` becomes `p%40ss`).

### 3. Network access

1. **Network Access** → **Add IP Address**.
2. For local development, **Allow Access from Anywhere** (`0.0.0.0/0`) is the simplest. Atlas will still require the username and password.
3. For production, restrict this to your host’s IPs.

Without this step the app hangs or fails to connect from your laptop.

### 4. Connection string

1. On the cluster, click **Connect** → **Drivers** → **Node.js**.
2. Copy the URI. It looks like:

```text
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

3. Replace `<username>` and `<password>`.
4. Put a **database name in the path**. This project uses `fashion`:

```text
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/fashion?retryWrites=true&w=majority
```

The native driver uses `client.db()` with that path, so products, users, and orders land in the `fashion` database.

5. Paste it into `.env`:

```bash
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/fashion?retryWrites=true&w=majority
```

### 5. Seed so the store has data

```bash
pnpm seed
```

Atlas → **Browse Collections** should then show `fashion` with `categories`, `products`, `posts`, `coupons`, `settings`, and `users`.

That is the whole database setup. No `docker run`, no local `mongod`.

---

## Environment

Copy [`.env.example`](.env.example) to `.env`. Seed and helper scripts load `.env` with Node `--env-file`. Next.js reads the same file.

Minimum to sign in and open admin:

```bash
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/fashion?retryWrites=true&w=majority
AUTH_SECRET=   # openssl rand -base64 32
NEXT_PUBLIC_ADMIN_EMAIL=you@example.com
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

| Variable                                                                 | Required                        | Purpose                                              |
| ------------------------------------------------------------------------ | ------------------------------- | ---------------------------------------------------- |
| `MONGO_URI`                                                              | For auth, checkout, admin, seed | Atlas connection string, including the database name |
| `AUTH_SECRET`                                                            | Yes for auth                    | NextAuth secret                                      |
| `NEXT_PUBLIC_ADMIN_EMAIL`                                                | For `/admin`                    | Email allowed into the owner admin                   |
| `NEXT_PUBLIC_BASE_URL`                                                   | Recommended                     | Canonical origin (`http://localhost:3000` locally)   |
| `AUTH_URL`                                                               | Optional                        | NextAuth URL (host trust is already on)              |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET`                                  | Optional                        | Google sign-in                                       |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET`                                  | Optional                        | GitHub sign-in                                       |
| `STRIPE_SECRET_KEY`                                                      | Optional                        | Stripe Checkout                                      |
| `STRIPE_WEBHOOK_SECRET`                                                  | Optional                        | Webhook signature at `POST /api/stripe/webhook`      |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`                                     | Optional                        | Stripe publishable key                               |
| `PROD_MONGO_URI`                                                         | Optional                        | Destination for `pnpm sync:prod`                     |
| `IMAGEKIT_PUBLIC_KEY` / `IMAGEKIT_PRIVATE_KEY` / `IMAGEKIT_URL_ENDPOINT` | Optional                        | `pnpm images:upload` only                            |

OAuth buttons still render if the Google / GitHub keys are empty; sign-in fails clearly instead of crashing.

Stripe is optional. Missing keys toast at checkout and do not take the store down. Cash on delivery still works when it is enabled in admin settings (on by default).

---

## How the store works

### Browse without a database

`lib/data.ts` reads Mongo when `MONGO_URI` is set and the collections have documents. Otherwise it serves `data/catalog.json` and `data/posts.json`. Cart, wishlist, compare, recently viewed, locale, and currency live in `localStorage` and survive a reload.

### Prices and shipping

- List prices are **USD**. Display currencies (EUR, GBP, BDT, INR, AED) are a client conversion only.
- **Checkout is always USD.**
- Subtotal ≥ **$100** → free shipping; otherwise **$8**.
- Coupon **`VALE10`**: 10% off, minimum subtotal **$50**. One coupon at a time. Discount is recomputed on the server — the client is not trusted for totals.

### Stock

- Inventory is per colour × size.
- **COD** decrements stock when the order is placed.
- **Stripe** decrements stock in the webhook after `checkout.session.completed` (or async payment succeeded). The handler is idempotent.

### Auth and gates

| Path                        | Who                                           |
| --------------------------- | --------------------------------------------- |
| `/account/*`, `/checkout/*` | Signed-in user                                |
| `/admin/*`                  | Signed-in email === `NEXT_PUBLIC_ADMIN_EMAIL` |

Credentials, Google, and GitHub all create or attach a Mongo user. The admin email is promoted to `role: "admin"` on register / OAuth / seed.

### Locales

English, Spanish, French, Arabic. Arabic flips the document to RTL. Copy lives in `lib/copy.ts`.

---

## Scripts

| Command              | What it does                                                                     |
| -------------------- | -------------------------------------------------------------------------------- |
| `pnpm dev`           | Next.js dev server (Turbopack) at [http://localhost:3000](http://localhost:3000) |
| `pnpm build`         | Production build                                                                 |
| `pnpm start`         | Serve the production build                                                       |
| `pnpm lint`          | ESLint                                                                           |
| `pnpm check-types`   | `tsc --noEmit`                                                                   |
| `pnpm seed`          | Upsert catalog, posts, `VALE10`, settings, admin user, indexes into Atlas        |
| `pnpm images:upload` | Upload `/public/atelier-vale` to ImageKit and rewrite JSON URLs                  |
| `pnpm sync:prod`     | Copy the `MONGO_URI` database to `PROD_MONGO_URI`                                |

### Stripe webhook (local)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Put the printed signing secret in `STRIPE_WEBHOOK_SECRET`. Production webhook URL:

```
https://your-domain.tld/api/stripe/webhook
```

Events to send: `checkout.session.completed`, `checkout.session.async_payment_succeeded`.

### OAuth callback URLs

```
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
```

Use the same paths on your production origin.

---

## Project layout

```
app/
  (storefront)/     Shop, product, cart, checkout, account, journal, legal
  (auth)/           Sign in, register, forgot / reset password
  admin/            Owner admin
  api/              NextAuth + Stripe webhook
components/         Storefront, admin, and shadcn/ui
lib/
  actions/          Server actions (auth, checkout, admin, reviews)
  stores/           Cart, wish, compare, coupon, prefs
  schemas/          Zod
data/               catalog.json, posts.json, media.json
public/atelier-vale/  Logo, heroes, product stills, blog, marks
docs/               README storefront screenshot
scripts/            seed, ImageKit upload, prod sync
```

Useful routes:

| URL                            | Page                 |
| ------------------------------ | -------------------- |
| `/`                            | Home                 |
| `/shop`                        | Catalog              |
| `/category/[slug]`             | Category             |
| `/product/[slug]`              | Product              |
| `/cart` `/wishlist` `/compare` | Bag and lists        |
| `/checkout`                    | Checkout (signed in) |
| `/account`                     | Account              |
| `/blog`                        | Journal              |
| `/signin` `/register`          | Auth                 |
| `/admin/dashboard`             | Admin                |

---

## Deploy

Works on [Vercel](https://vercel.com/) or any Node host that can run `next start`.

1. Use the same Atlas cluster (or a second one). In **Network Access**, allow the deployment platform — for Vercel, `0.0.0.0/0` is typical, or Atlas’s official Vercel integration.
2. Set the environment variables from [`.env.example`](.env.example) in the host dashboard.
3. Set `NEXT_PUBLIC_BASE_URL` and `AUTH_URL` to the public origin (`https://…`).
4. Deploy, then run `pnpm seed` once against that `MONGO_URI` if the database is empty.
5. If you use Stripe, add the production webhook endpoint and secrets.

```bash
pnpm build
pnpm start
```

---

## Reach out

Questions, hire, source code, or tutorials — I am easy to find.

|                     |                                                                                 |
| ------------------- | ------------------------------------------------------------------------------- |
| **ReactBD**         | [reactbd.com](https://reactbd.com)                                              |
| **Portfolio**       | [noormohammad.reactbd.com](https://noormohammad.reactbd.com)                    |
| **YouTube**         | [youtube.com/@reactjsBD](https://www.youtube.com/@reactjsBD)                    |
| **GitHub**          | [github.com/noorjsdivs](https://github.com/noorjsdivs)                          |
| **LinkedIn**        | [noor-mohammad-ab2245193](https://www.linkedin.com/in/noor-mohammad-ab2245193/) |
| **X**               | [@NoorMoh74531005](https://x.com/NoorMoh74531005)                               |
| **Instagram**       | [@simplenoor143](https://www.instagram.com/simplenoor143/)                      |
| **Facebook**        | [Noorlalu143](https://www.facebook.com/Noorlalu143/)                            |
| **Discord**         | [discord.gg/emtX5zCUku](https://discord.gg/emtX5zCUku)                          |
| **WhatsApp**        | [+880 1817-986903](https://wa.me/8801817986903)                                 |
| **Email**           | [reactjsbd@gmail.com](mailto:reactjsbd@gmail.com)                               |
| **Buy Me a Coffee** | [buymeacoffee.com/reactbd](https://buymeacoffee.com/reactbd)                    |
| **Medium**          | [The Builder’s Playbook](https://medium.com/@thebuildersplaybook)               |

Issues and pull requests on this repo: [github.com/noorjsdivs/fashion-ecommerce](https://github.com/noorjsdivs/fashion-ecommerce).

---

## License

[MIT](LICENSE) © 2026 [Noor Mohammad](https://github.com/noorjsdivs).

You may use, copy, modify, merge, publish, distribute, sublicense, and sell this software — including commercially — as long as you keep the copyright and permission notice. There is no warranty.
