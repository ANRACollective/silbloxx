# Silbloxx Asia — Recruitment Website

A standalone recruitment site for **Silbloxx Asia** (BRIAM Group) — the Vietnamese
manufacturing arm in Ho Chi Minh City. Homepage (employer brand + job listings) and
individual job detail pages with an inline apply form.

Built 1:1 from the Figma design and the Saigon Digital brand/spec docs.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — design tokens in `app/globals.css` via `@theme`
- **Motion** (`motion/react`) — scroll reveals + micro-interactions, all respecting `prefers-reduced-motion`
- Statically generated (SSG) — homepage + one page per role

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
app/
  layout.tsx            # fonts, metadata, grain background
  globals.css           # design tokens + type scale + brand utilities
  page.tsx              # Homepage
  jobs/[slug]/page.tsx  # Job detail (SSG per role)
components/
  layout/    Navbar, Footer, Container
  sections/  Hero, About, WhyWorkHere, Positions, JobDetail, ApplyForm
  ui/        Button, Tag, SliderArrow, BracketImage, Wordmark, Reveal, form, icons
lib/
  jobs.ts    # the 6 open roles (content source of truth)
  cn.ts
public/images/           # photography slots (see "Before go-live")
```

## Design tokens (exact Figma variables)

| Token | Value | Role |
|---|---|---|
| Black | `#000000` | Text, borders, wordmark |
| White | `#FFFFFF` | Background / surface |
| Orange | `#FF2E00` | Primary CTAs, accents, links |
| Yellow | `#FFDC00` | Accent, highlights, radial wash |
| Grey | `#DAD9D6` | Disabled, dividers |

Display type: **Druk Wide/Text Bold** (licensed) with **Archivo Black** as the
brand-sanctioned free fallback (currently active). Body: **Gruppo**.

## Deploy (GitHub → Vercel)

1. Create a new GitHub repo `ANRACollective/silbloxx` (empty, no README).
2. From this project folder:
   ```bash
   git init
   git add .
   git commit -m "Silbloxx Asia recruitment site"
   git branch -M main
   git remote add origin https://github.com/ANRACollective/silbloxx.git
   git push -u origin main
   ```
3. In Vercel: **New Project -> import `ANRACollective/silbloxx`**. Framework auto-detects
   Next.js. Root Directory = repo root (the project is at the root, not a subfolder). Deploy.

## Before go-live (open items)

- **Photography** — `public/images/` holds branded placeholders. Drop the approved
  photos (Drive > Silbloxx Asia > Pictures) in, keeping these filenames:
  `hero-welding-line.jpg`, `hero-worker.jpg`, `hero-robot.jpg`, `about-facility.jpg`.
- **Display font** — swap Archivo Black for licensed **Druk Wide/Text Bold**: drop
  `DrukWide-Bold.woff2` into `app/fonts/` and switch `app/layout.tsx` from
  `next/font/google` to `next/font/local` (keep the `--font-display` variable).
- **Logo** — the SILBLOXX wordmark is a faithful CSS recreation (recolours + stretches).
  Replace with the official vector (Drive > Logos) for pixel-exact if desired.
- **Apply form** — front-end only (validation + success state). Wire submission to an
  email handler / Sanity CMS at go-live (per brief).
- **EN / VN** — the language toggle is visual; wire Vietnamese copy (agency-managed).

## Accessibility & performance

- Semantic HTML5, keyboard-focus rings, `prefers-reduced-motion` honoured throughout.
- SSG output, self-hosted fonts via `next/font`, lazy-loaded imagery.
