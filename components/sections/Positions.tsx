"use client";

import { useState } from "react";
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
    <span className="inline-flex items-center gap-[6px] text-[18px] leading-[1.5] text-ink">
      <Icon width={24} height={24} className="shrink-0 text-ink" />
      {children}
    </span>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="group flex min-w-px flex-1 flex-col items-start self-stretch border-[4px] border-ink bg-paper p-[22px] transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)]">
      {/* justify-between keeps the Apply buttons on one line across the row
          even when a job title wraps to two lines (the Figma mock uses three
          identical cards, so this case doesn't show up there). */}
      <div className="flex h-full w-full flex-col justify-between gap-6">
        <div className="flex w-full flex-col gap-[6px]">
          <div className="flex flex-col items-start justify-center">
            <h3 className="h4 text-ink">{job.title}</h3>
            <Tag>{job.team}</Tag>
          </div>
          <p className="w-full text-[18px] leading-[1.5] text-ink">
            {job.summary}
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-[22px] gap-y-2">
            <Meta icon={ClockIcon}>{job.type}</Meta>
            <Meta icon={PinIcon}>{job.location}</Meta>
          </div>
          <Button
            href={`/jobs/${job.slug}`}
            size="sm"
            className="w-full"
            aria-label={`Apply for ${job.title}`}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}

/** Mobile: vertical scroll, first three roles then a reveal (client 14.08). */
function MobileList({ jobs }: { jobs: Job[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? jobs : jobs.slice(0, MOBILE_INITIAL);

  return (
    <div className="flex flex-col gap-8 lg:hidden">
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
    <div className="hidden w-full flex-col gap-8 lg:flex">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full items-stretch gap-8"
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
    <section id="open-positions" className="scroll-mt-24 overflow-hidden py-28">
      <Container className="flex flex-col items-center gap-[42px]">
        <Reveal className="flex w-full flex-col gap-3">
          <h2 className="h1 text-ink">Find your place at SILBLOXX Asia</h2>
          <p className="text-[18px] leading-[1.5] text-ink">
            We&apos;re hiring across the new facility — {jobs.length} roles are
            open right now.
          </p>
        </Reveal>

        <div className="flex w-full flex-col items-center gap-8">
          <MobileList jobs={jobs} />
          <DesktopRow jobs={jobs} />
        </div>
      </Container>
    </section>
  );
}
