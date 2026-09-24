"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { NoOpenings } from "@/components/sections/NoOpenings";
import { Button } from "@/components/ui/Button";
import { ClockIcon, PinIcon } from "@/components/ui/icons";
import { EASE_BRAND } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SliderArrow } from "@/components/ui/SliderArrow";
import { Tag } from "@/components/ui/Tag";
import type { Job } from "@/lib/jobs";

/** Cards per page on desktop. */
const PAGE_SIZE = 3;

type MetaProps = {
  icon: typeof ClockIcon;
  children: React.ReactNode;
};

function Meta({ icon: Icon, children }: MetaProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[18px] leading-[1.5] text-ink">
      <Icon width={24} height={24} className="shrink-0" />
      {children}
    </span>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <article className="flex min-w-px flex-1 flex-col self-stretch border-4 border-ink bg-paper p-[22px]">
      {/* `justify-between` keeps the Apply buttons aligned when a title wraps. */}
      <div className="flex h-full w-full flex-col justify-between gap-6">
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex flex-col items-start">
            <h3 className="h4 text-ink">{job.title}</h3>
            <Tag>{job.team}</Tag>
          </div>
          <p className="text-[18px] leading-[1.5] text-ink">{job.summary}</p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-[22px] gap-y-2">
            <Meta icon={ClockIcon}>{job.type}</Meta>
            <Meta icon={PinIcon}>{job.location}</Meta>
          </div>
          <Button
            href={`/jobs/${job.slug}`}
            size="sm"
            lift
            className="w-full"
            aria-label={`Apply for ${job.title}`}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </article>
  );
}

/**
 * Below the desktop breakpoint: one full-width card per view, swiped
 * horizontally. Scrolling and snapping are native (CSS scroll-snap); the
 * arrows and counter only read and set the track's scroll position.
 */
function SwipeRow({ jobs }: { jobs: readonly Job[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const last = jobs.length - 1;

  /** Index of the slide whose left edge is nearest the current scroll position. */
  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft } = track;
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    Array.from(track.children).forEach((child, i) => {
      const distance = Math.abs((child as HTMLElement).offsetLeft - scrollLeft);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setIndex(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncIndex);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [syncIndex]);

  const goTo = (target: number) => {
    const track = trackRef.current;
    const slide = track?.children[target] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Open positions"
      className="flex w-full flex-col gap-8 lg:hidden"
    >
      <ul
        ref={trackRef}
        className="flex w-full snap-x snap-mandatory [scrollbar-width:none] gap-5 overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden"
      >
        {jobs.map((job, i) => (
          <li
            key={job.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${jobs.length}`}
            className="flex w-full shrink-0 snap-start"
          >
            <JobCard job={job} />
          </li>
        ))}
      </ul>

      {jobs.length > 1 && (
        <div className="flex w-full items-center justify-between">
          <SliderArrow
            direction="left"
            disabled={index === 0}
            onClick={() => goTo(Math.max(0, index - 1))}
          />
          <p
            aria-live="polite"
            className="font-display text-[18px] leading-none text-ink tabular-nums"
          >
            {index + 1} / {jobs.length}
          </p>
          <SliderArrow
            direction="right"
            disabled={index >= last}
            onClick={() => goTo(Math.min(last, index + 1))}
          />
        </div>
      )}
    </div>
  );
}

/** From 1024px: three cards per page with previous/next controls. */
function PagedRow({ jobs }: { jobs: readonly Job[] }) {
  const [page, setPage] = useState(0);
  const reduce = useReducedMotion();
  const pageCount = Math.ceil(jobs.length / PAGE_SIZE);
  const visible = jobs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="hidden w-full flex-col gap-8 lg:flex">
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduce ? 0 : -12 }}
          transition={{ duration: 0.35, ease: EASE_BRAND }}
          className="flex w-full items-stretch gap-8"
        >
          {visible.map((job) => (
            <JobCard key={job.slug} job={job} />
          ))}
        </motion.div>
      </AnimatePresence>

      {pageCount > 1 && (
        <div className="flex w-full justify-between">
          <SliderArrow
            direction="left"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          />
          <SliderArrow
            direction="right"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Open positions (Figma "Positions").
 * Renders the "no openings" enquiry section instead when `jobs` is empty.
 */
export function Positions({ jobs }: { jobs: readonly Job[] }) {
  if (jobs.length === 0) return <NoOpenings />;

  const count = jobs.length === 1 ? "1 role is" : `${jobs.length} roles are`;

  return (
    <section id="open-positions" className="scroll-mt-24 overflow-hidden py-28">
      <Container className="flex flex-col gap-[42px]">
        <Reveal className="flex flex-col gap-3">
          <h2 className="h1 text-ink">Find your place at SILBLOXX Asia</h2>
          <p className="text-[18px] leading-[1.5] text-ink">
            We&apos;re hiring across the new facility — {count} open right now.
          </p>
        </Reveal>

        <SwipeRow jobs={jobs} />
        <PagedRow jobs={jobs} />
      </Container>
    </section>
  );
}
