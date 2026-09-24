# Silbloxx Asia — Careers Website

Recruitment website for **Silbloxx Asia**, the Vietnamese manufacturing arm of Silbloxx
(BRIAM Group), built from the approved Figma design.

The site has two page types:

- **Homepage** (`/`): hero, about, reasons to join and the list of open positions. If no
  roles are listed, a general enquiry form with CV upload is shown instead.
- **Job pages** (`/jobs/[slug]`): full description, key facts and an application form.
  One page is generated per role.

## Tech stack

| Area      | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, statically generated   |
| Language  | TypeScript, strict mode                                   |
| Styling   | Tailwind CSS v4; design tokens in `app/globals.css`       |
| Motion    | Motion (`motion/react`); honours `prefers-reduced-motion` |
| Quality   | ESLint (Next.js + TypeScript rules), Prettier             |
| Images    | `next/image` (responsive AVIF/WebP)                       |

## Getting started

Requires **Node.js 20.9 or later** (`.nvmrc` pins 22).

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Command                | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Development server                          |
| `npm run build`        | Production build                            |
| `npm run start`        | Serve the production build                  |
| `npm run check`        | Type check, lint and formatting check (all) |
| `npm run typecheck`    | TypeScript only                             |
| `npm run lint`         | ESLint (fails on any warning)               |
| `npm run format`       | Format every file with Prettier             |
| `npm run format:check` | Verify formatting without writing           |

Run `npm run check` and `npm run build` before every release; both must pass.

## Configuration

| Variable               | Required   | Description                                                                                                                       |
| ---------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Production | Public URL of the site, e.g. `https://careers.example.com`. Used for canonical links, Open Graph, `robots.txt` and `sitemap.xml`. |

Contact details, office addresses, social links and links to silbloxx.com and
briamgroup.com are all in **`lib/site.ts`**.

## Project structure

```
app/
  layout.tsx               Root layout: fonts, metadata, page background
  globals.css              Design tokens, type scale, shared utilities
  page.tsx                 Homepage
  jobs/[slug]/page.tsx     Job page (one per role, generated at build time)
  preview/no-openings/     Review page for the "no open positions" state (not indexed)
  not-found.tsx            404 page
  icon.png, apple-icon.png Browser tab and home-screen icons (from silbloxx.com)
  robots.ts, sitemap.ts    Search engine files
components/
  layout/                  Navbar, Footer, Container
  sections/                Page sections and the two forms
  ui/                      Reusable building blocks (Button, BracketImage, Wordmark, form fields…)
lib/
  jobs.ts                  Open roles (content)
  site.ts                  Site settings and contact details
  validation.ts            Form validation helpers
  cn.ts                    Class name helper
public/
  brand/                   Logos and the bracket motif (SVG)
  fonts/                   Druk Text Medium (licensed)
  images/                  Photography
```

## Editing content

### Open positions

Roles live in `lib/jobs.ts`. Each entry creates a card on the homepage and a page at
`/jobs/<slug>`.

- **Add a role:** copy an existing entry, give it a unique `slug`, and edit the text.
- **Remove a role:** delete its entry.
- **No open roles:** leave the list empty (`export const JOBS: readonly Job[] = [];`). The
  homepage then shows the "No open positions right now" section with the enquiry form.
  You can review that state at any time at `/preview/no-openings`.

### Photography

Images are in `public/images/`. To replace one, keep the same file name (or update the
path in the component). Use JPEGs at least 2000px on the long edge; `next/image` serves
optimised sizes automatically. All photos get the same light colour grade (`.photo-grade`
in `app/globals.css`).

On phones and tablets the hero and About photos are shown landscape (4:3 and 3:2) so a
single image never fills the screen. The About photo has separate `desktop` and `mobile`
entries in `components/sections/About.tsx`: give `mobile` its own `src` to use a different
landscape photo on small screens, or adjust `position` (CSS `object-position`) to choose
which part of the photo the crop keeps.

| File                 | Where it appears                         |
| -------------------- | ---------------------------------------- |
| `hero-silos.jpg`     | Hero, left (desktop)                     |
| `hero-team.jpg`      | Hero, centre (desktop) and hero (mobile) |
| `hero-worker.jpg`    | Hero, right (desktop)                    |
| `about-facility.jpg` | About section                            |
| `why-team.jpg`       | "Why join now?" band                     |
| `no-openings.jpg`    | "No open positions" section              |

### Key facts

The four figures in the About section (site area, roles, first line online, ISO target)
are in `components/sections/About.tsx`.

## Design system

| Token       | Value     | Use                          |
| ----------- | --------- | ---------------------------- |
| `ink`       | `#000000` | Text, borders, wordmark      |
| `paper`     | `#FFFFFF` | Cards and form surfaces      |
| `ground`    | `#F9F9F9` | Page background (fine noise) |
| `orange`    | `#FF2E00` | Primary actions, links       |
| `yellow`    | `#FFDC00` | Accents, tag fill (20%)      |
| `graybrand` | `#DAD9D6` | Disabled controls            |

- **Typography:** Druk Text Medium for headings and buttons (licensed; loaded from
  `public/fonts`, with Archivo Black as fallback). Gruppo for body text, set bold to
  match silbloxx.com (Gruppo has a single weight, so the browser synthesises the bold).
- **Layout:** side gutters of 20px (mobile), 40px (tablet) and 64px (desktop); content
  width up to 1440px.
- **Brackets:** the L-shaped corner accent (`BracketImage`) overhangs each photo by its
  arm thickness, so its inner corner always meets the photo corner.
- **Open positions:** three cards per page with arrows from 1024px; below that, one
  full-width card at a time in a native swipe carousel (CSS scroll-snap) with arrows and
  a position counter.
- **Interaction:** only the job cards' "Apply Now" button moves on hover; other controls
  change colour only. Hover styles apply to mouse and trackpad users only, not touch
  screens. All animation is disabled for visitors who prefer reduced motion.

## Deployment

The project is a standard Next.js app and deploys to Vercel with no extra configuration:

1. Import the repository into Vercel (framework: Next.js, root directory: repository root).
2. Set `NEXT_PUBLIC_SITE_URL` to the production URL.
3. Deploy.

## Before launch

- **Forms:** the application and enquiry forms validate on the client and show a
  confirmation, but are not yet connected to a back end. Connect them to the chosen email
  service or ATS; every field already has a `name` attribute.
- **Site URL:** set `NEXT_PUBLIC_SITE_URL` (see Configuration).
- **Key facts:** confirm the four figures in the About section.
- **Office contact details:** replace the placeholder phone numbers in `lib/site.ts`.
- **Language switch:** the EN/VN toggle is visual only until Vietnamese content is supplied.
- **Preview page:** remove `app/preview/` once the empty state has been approved.
- **Brand orange and accessibility:** white text on the brand orange has a contrast ratio of
  3.72:1, which meets WCAG AA for large text and UI components but not for small body text.
