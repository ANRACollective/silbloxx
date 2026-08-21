import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ApplyForm } from "./ApplyForm";
import { ArrowLeft } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import type { Job } from "@/lib/jobs";

function InfoTable({ job }: { job: Job }) {
  const rows = [
    ["Location", job.location],
    ["Team", job.team],
    ["Type", job.type],
    ["Posted", job.posted],
  ];
  return (
    <dl className="border-t border-hairline">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center gap-6 border-b border-hairline py-4">
          <dt className="label w-[104px] shrink-0">
            {k}
          </dt>
          <dd className="text-[16px] text-body">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3.5 text-[17px] leading-[1.7] text-body">
          <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-muted)]" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Body({ job }: { job: Job }) {
  return (
    <div className="space-y-16">
      <div>
        <h1 className="h2 measure-tight text-ink">{job.title}</h1>
        <p className="measure mt-6 text-[18px] leading-[1.7] text-body">
          {job.intro}
        </p>
      </div>
      <section>
        <h2 className="h4 text-ink">Your role</h2>
        <p className="measure mt-5 text-[17px] leading-[1.7] text-body">
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

function NeedMore() {
  return (
    <div>
      <h2 className="font-display text-[20px] leading-[1.3] text-ink">
        Need more information?
      </h2>
      <p className="measure mt-4 text-[17px] leading-[1.7] text-body">
        Reach out to the Silbloxx Asia People team. We&apos;re happy to talk.
      </p>
      <p className="mt-3 text-[15px]">
        <a
          href="mailto:careers.asia@silbloxx.com"
          className="link-underline text-orange"
        >
          careers.asia@silbloxx.com
        </a>
      </p>
      <p className="mt-1 text-[16px] text-muted">T +84 769 08 61 14</p>
    </div>
  );
}

export function JobDetail({ job }: { job: Job }) {
  return (
    <section className="py-12 lg:py-20">
      <Container>
        <Reveal>
          <Link
            href="/#open-positions"
            className="group inline-flex items-center gap-2 font-display text-[15px] tracking-[0.02em] text-muted transition-colors duration-300 ease-out hover:text-ink"
          >
            <ArrowLeft
              width={18}
              height={18}
              className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:-translate-x-0.5"
            />
            Back to all jobs
          </Link>
        </Reveal>

        {/* Mobile: info → body → form → contact */}
        <div className="mt-10 space-y-14 lg:hidden">
          <Reveal>
            <InfoTable job={job} />
          </Reveal>
          <Reveal>
            <Body job={job} />
          </Reveal>
          <Reveal>
            <ApplyForm roleTitle={job.title} idPrefix="m-" />
          </Reveal>
          <Reveal>
            <NeedMore />
          </Reveal>
        </div>

        {/* Desktop: content left, sticky info + form right */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-x-24">
          <div className="space-y-16">
            <Reveal>
              <Body job={job} />
            </Reveal>
            <Reveal>
              <NeedMore />
            </Reveal>
          </div>
          <div className="sticky top-28 space-y-10">
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
