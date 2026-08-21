"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { CountUp, Parallax } from "@/components/ui/motion";

/**
 * Factory facts. Still the original brief's numbers — the client flagged these
 * as pending accurate input (feedback 14.08).
 *
 * All four are plain black in the design; the yellow "Q4 2026" treatment from
 * the earlier round isn't in the Figma, and black also resolves the 1.36:1
 * legibility problem yellow-on-ground had.
 */
const STATS = [
  { value: "8.4 ha", label: "Site area" },
  { value: "120+", label: "Local roles at full capacity" },
  { value: "Q4 2026", label: "First line online" },
  { value: "ISO 9001", label: "Quality target, year one" },
];

function StatGrid() {
  return (
    <RevealGroup as="div" className="mt-14 grid grid-cols-2 gap-x-10 gap-y-12">
      {STATS.map((s) => (
        <motion.div key={s.label} variants={revealItem}>
          <div className="font-display text-[30px] leading-[1.15] text-ink lg:text-[36px]">
            {/* counts only where there's a leading number — "ISO 9001" and
                "Q4 2026" render untouched */}
            <CountUp value={s.value} />
          </div>
          <div className="label mt-4">{s.label}</div>
        </motion.div>
      ))}
    </RevealGroup>
  );
}

export function About() {
  return (
    <section className="section scroll-mt-24">
      {/* Figma About (node 10230:684): two columns, 80px gap, no eyebrow. */}
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-24">
        <Reveal>
          <h2 className="h1 measure-tight text-ink">
            Decades of experience. A new chapter in Vietnam.
          </h2>
          <p className="measure mt-7 text-[18px] leading-[1.7] text-body">
            For decades, Silbloxx has supplied modular silo systems to projects
            across Europe, Asia, and Africa. Our new facility in Ho Chi Minh City
            adds to that footprint, bringing production closer to our customers
            across Asia and the wider region.
          </p>
          <StatGrid />
        </Reveal>

        <Reveal delay={0.1}>
          <Parallax distance={44}>
            <BracketImage
              src="/images/about-facility.jpg"
              alt="Silbloxx Asia silo facility at dusk in Ho Chi Minh City"
              corners={["tr", "bl"]}
              bracket={64}
              className="aspect-[5/6] w-full lg:aspect-auto lg:h-[560px]"
              placeholderLabel="HCMC silo facility"
            />
          </Parallax>
        </Reveal>
      </Container>
    </section>
  );
}
