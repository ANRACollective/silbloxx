"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const STATS = [
  { value: "8.4 ha", label: "Site area", accent: false },
  { value: "120+", label: "Local roles at full capacity", accent: false },
  { value: "Q4 2026", label: "First line online", accent: true },
  { value: "ISO 9001", label: "Quality target, year one", accent: false },
];

function StatGrid() {
  return (
    <RevealGroup as="div" className="mt-10 grid grid-cols-2 gap-x-8 gap-y-9">
      {STATS.map((s) => (
        <motion.div key={s.label} variants={revealItem}>
          <div
            className={cn(
              "font-display text-[34px] leading-none tracking-[-0.02em] lg:text-[40px]",
              s.accent ? "text-yellow" : "text-ink",
            )}
          >
            {s.value}
          </div>
          <div className="mt-3 font-display text-[15px] text-ink">{s.label}</div>
        </motion.div>
      ))}
    </RevealGroup>
  );
}

export function About() {
  return (
    <section className="scroll-mt-24 py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-ink">About Us</p>
          <h2 className="h2 mt-4 max-w-[520px] text-ink">
            From Belgium to the world, now to Asia.
          </h2>
          <p className="mt-6 max-w-[500px] text-[17px] leading-[1.55] text-muted">
            For decades, Silbloxx has supplied modular silo systems to projects
            across Europe, Asia, and Africa. Our new facility in Ho Chi Minh City
            brings production closer to the markets that need it most.
          </p>
          <StatGrid />
        </Reveal>

        <Reveal delay={0.1}>
          <BracketImage
            src="/images/about-facility.jpg"
            alt="Silbloxx Asia silo facility at dusk in Ho Chi Minh City"
            corners={["tr", "bl"]}
            bracket={64}
            className="aspect-[5/6] w-full lg:aspect-auto lg:h-[560px]"
            placeholderLabel="HCMC silo facility"
          />
        </Reveal>
      </Container>
    </section>
  );
}
