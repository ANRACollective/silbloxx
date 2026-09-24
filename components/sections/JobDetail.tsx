import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ApplyForm } from "@/components/sections/ApplyForm";
import { ArrowLeft } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Job } from "@/lib/jobs";
import { CAREERS_EMAIL, CAREERS_PHONE } from "@/lib/site";

function InfoTable({ job }: { job: Job }) {
  const rows = [
    ["Location", job.location],
    ["Team", job.team],
    ["Type", job.type],
    ["Posted", job.posted],
  ] as const;

  return (
    <dl className="border-t border-ink">
      {rows.map(([term, detail]) => (
        <div key={term} className="flex items-center gap-6 border-b border-ink py-3.5">
          <dt className="w-[92px] shrink-0 font-display text-[16px] text-ink">{term}</dt>
          <dd className="text-[15px] text-muted">{detail}</dd>
        </div>
      ))}
    </dl>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[16px] leading-[1.5] text-muted">
          <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-ink" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Description({ job }: { job: Job }) {
  return (
    <div className="space-y-11">
      <div>
        <h1 className="h2 text-ink">{job.title}</h1>
        <p className="mt-5 max-w-[560px] text-[17px] leading-[1.55] text-muted">
          {job.intro}
        </p>
      </div>
      <section>
        <h2 className="h4 text-ink">Your role</h2>
        <p className="mt-4 max-w-[560px] text-[16px] leading-[1.55] text-muted">
          {job.roleLead}
        </p>
        <BulletList items={job.role} />
      </section>
      <section>
        <h2 className="h4 text-ink">Who you are</h2>
        <BulletList items={job.who} />
      </section>
      <section>
        <h2 className="h4 text-ink">What we offer</h2>
        <BulletList items={job.offer} />
      </section>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h2 className="font-display text-[20px] leading-none text-ink">
        Need more information?
      </h2>
      <p className="mt-4 max-w-[420px] text-[16px] leading-[1.55] text-muted">
        Reach out to the Silbloxx Asia People team. We&apos;re happy to talk.
      </p>
      <p className="mt-3 text-[15px]">
        <a
          href={`mailto:${CAREERS_EMAIL}`}
          className="text-orange underline decoration-orange/40 underline-offset-2 hover:decoration-orange"
        >
          {CAREERS_EMAIL}
        </a>
      </p>
      <p className="mt-1 text-[15px] text-muted">T {CAREERS_PHONE}</p>
    </div>
  );
}

/** Job detail page body: description, key facts, application form and contact. */
export function JobDetail({ job }: { job: Job }) {
  return (
    <section className="py-10 lg:py-14">
      <Container>
        <Reveal>
          <Link
            href="/#open-positions"
            className="inline-flex items-center gap-2 border border-ink px-4 py-2.5 font-display text-[14px] text-ink hover:bg-ink hover:text-paper"
          >
            <ArrowLeft width={18} height={18} />
            Back to all jobs
          </Link>
        </Reveal>

        {/* Mobile order: facts, description, form, contact. */}
        <div className="mt-8 space-y-10 lg:hidden">
          <Reveal>
            <InfoTable job={job} />
          </Reveal>
          <Reveal>
            <Description job={job} />
          </Reveal>
          <Reveal>
            <ApplyForm roleTitle={job.title} idPrefix="m-" />
          </Reveal>
          <Reveal>
            <Contact />
          </Reveal>
        </div>

        {/* Desktop: description on the left; facts and form in a sticky column. */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-x-16">
          <div className="space-y-14">
            <Reveal>
              <Description job={job} />
            </Reveal>
            <Reveal>
              <Contact />
            </Reveal>
          </div>
          <div className="sticky top-24 space-y-8">
            <Reveal>
              <InfoTable job={job} />
            </Reveal>
            <Reveal delay={0.05}>
              <ApplyForm roleTitle={job.title} idPrefix="d-" />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
