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

- **Photography — people shots still needed.** Client feedback (14.08) asked for more
  human presence; the layout has been restructured around it but two slots are
  currently filled with stand-ins. Drop the approved photos in keeping these filenames:

  | File | Slot | Status |
  |---|---|---|
  | `hero-worker.jpg` | Hero, large primary plate | real photo |
  | `hero-team.jpg` | Hero, third frame | **stand-in — needs a people shot** |
  | `hero-welding-line.jpg` | Hero, second frame | real photo |
  | `why-portrait.jpg` | "Why join us now?" dark band | **stand-in — needs a portrait** |
  | `about-facility.jpg` | About section | real photo |

  The two stand-ins are duplicates of existing frames, so the same operator currently
  appears twice on the homepage. That resolves the moment real files replace them —
  no code change needed.
- **Display font** — swap Archivo Black for licensed **Druk Wide/Text Bold**: drop
  `DrukWide-Bold.woff2` into `app/fonts/` and switch `app/layout.tsx` from
  `next/font/google` to `next/font/local` (keep the `--font-display` variable).
- **Logo** — the SILBLOXX wordmark is a faithful CSS recreation (recolours + stretches).
  Replace with the official vector (Drive > Logos) for pixel-exact if desired.
- **Apply form** — front-end only (validation + success state). Wire submission to an
  email handler / Sanity CMS at go-live (per brief).
- **EN / VN** — the language toggle is visual; wire Vietnamese copy (agency-managed).
- **Factory facts** — the About stat grid (8.4 ha, 120+, Q4 2026, ISO 9001) is still
  carrying the original brief's numbers. Client feedback (14.08) flagged these as
  pending accurate input; update `STATS` in `components/sections/About.tsx` when they land.

## Client feedback round — 14.08

Applied in full from *SILBLOXX — Client Feedback & Action Points*:

- **Copy** rewritten to the client's recommendations throughout — hero (“Build the future
  with us.”), About headline and supporting line, “Why join us now?”, all three reasons,
  and the positions heading (“Find your place at SILBLOXX Asia.”).
- **“Why join us now?”** rebuilt as a full-bleed black band with a portrait bleeding off
  the leading edge — separates it outright from the white job cards and gives the
  recruitment message a human anchor. 01/02/03 numbering removed.
- **Navigation** — “Open Positions” dropped; “Careers” remains and carries the CTA.
- **Open positions on mobile** — arrows gone, natural vertical scroll, first three roles
  then a “View all open positions” reveal. Desktop carousel unchanged.
- **Job cards** — team tag now sits on the title's line at every breakpoint.
- **Mobile brackets** — standardised to top-right / bottom-left on every image.
- **Mobile footer logo** — no longer rotated 90°; horizontal along the bottom as on desktop.
- **Job dates** kept and refreshed (they were all reading 5 May 2026).

Also fixed alongside: footer email addresses overflowing their column on mobile,
yellow-on-white stat legibility (now black on a yellow block, per the brand rule),
and apply-form validation errors that were colour-only — they now carry text, move
focus to the first problem, and announce via a live region.

**Still open for the client:** the orange `#FF2E00` measures 3.72:1 against white, below
the WCAG AA 4.5:1 threshold for normal-size text. It affects CTA labels and inline links.
Left as-is because it's a brand-mandated colour — worth raising rather than changing quietly.

## Accessibility & performance

- Semantic HTML5, keyboard-focus rings, `prefers-reduced-motion` honoured throughout.
- SSG output, self-hosted fonts via `next/font`, lazy-loaded imagery.
