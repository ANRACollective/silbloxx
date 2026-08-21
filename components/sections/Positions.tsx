"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { SliderArrow } from "@/components/ui/SliderArrow";
import { Reveal } from "@/components/ui/Reveal";
import { ClockIcon, PinIcon } from "@/components/ui/icons";
import type { Job } from "@/lib/jobs";

/**
 * Open positions — rebuilt 1:1 from Figma `Positions` (node 10230:11439).
 *
 * Geometry from the design:
 *   section    px 64, py 112 (padding-section-large); container gap 42
 *   title      gap 12; H1 56/1.2 + Gruppo 18/1.5 sub
 *   content    gap 32; row gap 32, three flex-1 cards
 *   card       4px black border, p 22, content gap 24, job gap 6
 *   job title  H4 32/1.3 with the Tag stacked directly beneath it
 *   info       gap 24; meta row gap 22, each item gap 6 with a 24px icon
 *   apply      full-width orange button, px 16 py 8, Heading-6 label
 *   actions    space-between; left arrow disabled, right arrow active
 *
 * Three cards per page, so the arrows page through the six live roles.
 * Mobile keeps the vertical list + "View all" reveal the client asked for.
 */
const PER_PAGE = 3;
const MOBILE_INITIAL = 3;

function Meta({
  icon: Icon,
  children,
}: {
  icon: typeof ClockIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[15px] leading-[1.5] text-muted">
      <Icon width={17} height={17} className="shrink-0" />
      {children}
    </span>
  );
}

/**
 * Job card.
 *
 * Was: a 4px black box with a full-width orange button. Three of those in a row
 * put ~63,000px² of saturated orange on one screen and made the section the
 * loudest thing on the page.
 *
 * Now: a hairline surface, and the whole card is the link — a bigger hit area
 * than the button it replaces, so the conversion path gets easier, not harder.
 * The CTA is a quiet text cue whose rule and arrow animate on hover.
 */
function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      aria-label={`${job.title} — view role and apply`}
      className="group flex min-w-px flex-1 flex-col items-start self-stretch border border-hairline bg-paper p-8 transition-[border-color,box-shadow,transform] duration-500 ease-[var(--ease-brand)] hover:-translate-y-[2px] hover:border-hairline-strong hover:shadow-[0_18px_44px_-30px_rgba(0,0,0,0.45)]"
    >
      {/* justify-between keeps the CTA on one line across the row even when a
          job title wraps to two lines. */}
      <div className="flex h-full w-full flex-col justify-between gap-8">
        <div className="flex w-full flex-col gap-3">
          <Tag>{job.team}</Tag>
          <h3 className="h5 text-ink">{job.title}</h3>
          <p className="w-full text-[17px] leading-[1.7] text-body">
            {job.summary}
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Meta icon={ClockIcon}>{job.type}</Meta>
            <Meta icon={PinIcon}>{job.location}</Meta>
          </div>
          <span className="inline-flex items-center gap-2 border-t border-hairline pt-5 font-display text-[15px] tracking-[0.02em] text-ink transition-colors duration-300 group-hover:border-line">
            Apply now
            <span
              aria-hidden
              className="transition-transform duration-500 ease-[var(--ease-brand)] group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Mobile: vertical scroll, first three roles then a reveal (client 14.08). */
function MobileList({ jobs }: { jobs: Job[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? jobs : jobs.slice(0, MOBILE_INITIAL);

  return (
    <div className="flex flex-col gap-6 lg:hidden">
      {visible.map((job) => (
        <JobCard key={job.slug} job={job} />
      ))}
      {!expanded && jobs.length > MOBILE_INITIAL && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setExpanded(true)}
            aria-label={`View all ${jobs.length} open positions`}
          >
            View all open positions
          </Button>
        </div>
      )}
    </div>
  );
}

/** Desktop: three across, paged. */
function DesktopRow({ jobs }: { jobs: Job[] }) {
  const [page, setPage] = useState(0);
  const reduce = useReducedMotion();
  const pages = Math.ceil(jobs.length / PER_PAGE);
  const visible = jobs.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <div className="hidden w-full flex-col gap-10 lg:flex">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full items-stretch gap-6"
        >
          {visible.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </motion.div>
      </AnimatePresence>

      {pages > 1 && (
        <div className="flex w-full items-start justify-between">
          <SliderArrow
            direction="left"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          />
          <SliderArrow
            direction="right"
            disabled={page >= pages - 1}
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
          />
        </div>
      )}
    </div>
  );
}

export function Positions({ jobs }: { jobs: Job[] }) {
  return (
    <section id="open-positions" className="section scroll-mt-24 overflow-hidden">
      <Container className="flex flex-col items-center gap-14">
        <Reveal className="flex w-full flex-col gap-4">
          <h2 className="h1 measure-tight text-ink">Find your place at SILBLOXX Asia</h2>
          <p className="measure text-[18px] leading-[1.7] text-body">
            We&apos;re hiring across the new facility — {jobs.length} roles are
            open right now.
          </p>
        </Reveal>

        <div className="flex w-full flex-col items-center gap-10">
          <MobileList jobs={jobs} />
          <DesktopRow jobs={jobs} />
        </div>
      </Container>
    </section>
  );
}
