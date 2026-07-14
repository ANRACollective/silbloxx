"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Tag } from "@/components/ui/Tag";
import { SliderArrow } from "@/components/ui/SliderArrow";
import { Reveal } from "@/components/ui/Reveal";
import { ClockIcon, PinIcon, CalendarIcon } from "@/components/ui/icons";
import type { Job } from "@/lib/jobs";

const PER_PAGE = 3;

function Meta({
  icon: Icon,
  children,
}: {
  icon: typeof ClockIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-[14px] text-muted">
      <Icon width={16} height={16} className="text-ink/70" />
      {children}
    </span>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group block border border-ink bg-paper p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.5)] lg:p-7"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="min-w-0 flex-1">
          <div className="flex flex-col-reverse items-start gap-2 lg:flex-row lg:items-center lg:gap-3">
            <h3 className="font-display text-[22px] leading-none tracking-[-0.01em] text-ink lg:text-[24px]">
              {job.title}
            </h3>
            <Tag>{job.team}</Tag>
          </div>
          <p className="mt-3 text-[15px] leading-[1.5] text-muted">
            {job.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            <Meta icon={ClockIcon}>{job.type}</Meta>
            <Meta icon={PinIcon}>{job.location}</Meta>
            <Meta icon={CalendarIcon}>{job.posted}</Meta>
          </div>
        </div>

        <span className="inline-flex w-full items-center justify-center bg-orange px-6 py-3 font-display text-[14px] text-paper transition-transform duration-300 ease-[var(--ease-brand)] group-hover:-translate-y-0.5 lg:w-auto">
          Apply Now
        </span>
      </div>
    </Link>
  );
}

export function Positions({ jobs }: { jobs: Job[] }) {
  const [page, setPage] = useState(0);
  const reduce = useReducedMotion();
  const pages = Math.ceil(jobs.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = jobs.slice(start, start + PER_PAGE);

  return (
    <section id="open-positions" className="scroll-mt-24 py-24 lg:py-28">
      <Container>
        <Reveal className="text-center">
          <h2 className="h2 text-ink">
            <span className="text-orange">{jobs.length}</span> Open Positions
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.5] text-muted">
            We&apos;re hiring across the new facility. Pick the role that fits you.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 max-w-[900px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              {visible.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </motion.div>
          </AnimatePresence>

          {pages > 1 && (
            <div className="mt-8 flex items-center justify-between">
              <SliderArrow
                direction="left"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
              />
              <div className="flex items-center gap-2">
                {Array.from({ length: pages }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      "h-1.5 w-1.5 rounded-full transition-colors " +
                      (i === page ? "bg-orange" : "bg-graybrand")
                    }
                  />
                ))}
              </div>
              <SliderArrow
                direction="right"
                disabled={page >= pages - 1}
                onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
