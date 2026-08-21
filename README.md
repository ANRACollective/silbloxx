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
- ~~**Logo** — CSS recreation~~ **Done.** `components/ui/Wordmark.tsx` is now built from
  the official vector (Drive > Logos > `Logo_Silbloxx.svg`, kept at
  `public/brand/silbloxx-wordmark.svg`). The letterforms are the real outlines; the "O"
  is rendered as a bordered box using the artwork's exact proportions (37.812 × 19.7,
  side strokes 6.531, caps 4.898) so the footer lockup can stretch horizontally without
  distorting stroke weights. Colour follows `currentColor`; size is set by font-size,
  and the mark stands exactly 1em tall.
- **Apply form** — front-end only (validation + success state). Wire submission to an
  email handler / Sanity CMS at go-live (per brief).
- **EN / VN** — the language toggle is visual; wire Vietnamese copy (agency-managed).
- **Factory facts** — the About stat grid (8.4 ha, 120+, Q4 2026, ISO 9001) is still
  carrying the original brief's numbers. Client feedback (14.08) flagged these as
  pending accurate input; update `STATS` in `components/sections/About.tsx` when they land.

## Feedback round — 21.08 (type, motion, logo)

**The display font is in.** `public/fonts/DrukText-Medium.woff2`, wired via plain
`@font-face` in `globals.css` (not `next/font/local`, so a missing file degrades
to Archivo Black rather than failing the build).

Two traps worth knowing if you touch the type:

- `next/font` must **not** claim `--font-display`. It sets its variable on `<html>`,
  which overrides the `@theme` stack and silently drops `"Druk Text"` from the
  front of it. The Archivo Black fallback now uses `--font-archivo`.
- The live corporate site uses **Druk Wide Bold** at h1 35px; the Figma uses
  **Druk Text Medium** at 56px. Different cuts — sizes don't transfer between
  them. Druk Text is condensed, so the "text looks huge" note turned out to be
  the Archivo Black stand-in, not the sizes. Figma's 56px scale is kept as specced.

**Logo no longer moves on hover** — it fades slightly instead. A mark is a fixed
anchor, not a button.

**Motion** (`components/ui/motion.tsx`), pitched at the register silbloxx.com uses
(1s reveals, 0.2–0.3s micro-interactions):

- `SplitHeading` — hero headline rises in word by word
- `Parallax` — hero plates drift at three different rates; About image at a fourth
- `CountUp` — factory-fact stats count up (only where there's a leading number;
  "ISO 9001" and "Q4 2026" are left alone)
- `Marquee` — the footer lockup drifts across. **Note this replaces the stretched
  lockup from the Figma** — the wordmark is now normal-proportion and repeating.
- link underlines wipe in, nav shrinks on scroll, cards lift, images zoom

Everything is gated on `prefers-reduced-motion` and settles visible.

### Three motion bugs found and fixed — read before adding more

1. **`IntersectionObserver` clips a target's rect by ancestor `overflow:hidden`.**
   The split words start translated fully outside their own clip, so they report
   as never intersecting and a `whileInView` on *them* never fires — headline
   permanently invisible. The trigger must sit on the unclipped heading, which
   then propagates `hidden`/`show` to the words.
2. **Motion propagates a parent's variant labels to descendant motion components**,
   which suppresses a child's own gesture props. Don't nest an animated component
   inside `<Reveal>` and expect its own `whileInView` to run.
3. **Never swap markup on the reduced-motion branch.** Returning plain text (or a
   different wrapper) when `useReducedMotion()` is true changes the DOM between
   server and client and trips hydration (React #418). Vary the motion props only.

## Figma rebuild — LandingPage_Desktop (node 10219:43562)

Rebuilt against the Figma file rather than by eye. Values below are the design's
own variables, not estimates.

| Token | Value |
|---|---|
| `page-padding/padding-global` | 64px |
| `section-padding/padding-section-medium` | 80px |
| `section-padding/padding-section-large` | 112px (Positions) |
| `stroke/border-width` | 4px |
| Heading 1 | Druk Text Medium 56 / 1.2 |
| Heading 4 | Druk Text Medium 32 / 1.3 |
| Heading 6 | Druk Text Medium 20 / 1.4 (all button labels) |
| Text Medium | Gruppo Regular 18 / 1.5, justified |
| Tag fill | `rgba(255,220,0,0.2)` |

**The page ground is not white.** The frame carries a noise fill that neither the
properties panel nor the MCP exposes — both report `#FFFFFF`. Measured off the
lossless frame export, every blank area has a modal value of **249 (`#F9F9F9`)**
with independent per-channel grain, σ≈2.5, spanning 242–253, and no structure
(no grid, no dots — verified by amplifying a flat patch 25×). It's reproduced in
`.grain` with `feTurbulence` + `feComponentTransfer`, calibrated against those
numbers: the build measures mode 249, σ 2.46 — within one 8-bit level.

Structural corrections made in this pass:

- **Why join (us) now?** — heading, then a 380px full-width photo band, then three
  columns each with a 4px black left rule. (The previous dark full-bleed band was
  my interpretation of the client's note; this is what the designer drew.)
- **Open positions** — three cards across, 4px borders, the team tag stacked
  directly *beneath* the job title, full-width orange Apply Now, paging arrows
  bottom-left/right. Mobile keeps the vertical list + "View all" reveal.
- **Navbar** — "Careers" is plain black text, not a filled CTA.
- **About** — no eyebrow; all four stats plain black.
- **Brackets** — the real 80×80 vector L (arm thickness 24.67), not a hairline rule.
- Page gutter 72px → 64px; heading letter-spacing → 0.

Desktop page height comes out at 4350px against the frame's 4412px (1.4%).

### Known gap: the display font

The design uses **Druk Text Medium**; the build renders **Archivo Black**, which is
much wider. Line breaks therefore differ from the mock — the About headline wraps
to three lines here versus two in Figma. This is the single biggest remaining
fidelity gap and it closes the moment the licensed `.woff2` is dropped in (see
"Before go-live"). Nothing else needs to change.

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
