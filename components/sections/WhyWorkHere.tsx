"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "You're employee #1 to #120.",
    body: "This facility doesn't exist yet. Your work makes it real. First production line, Q4 2026.",
  },
  {
    n: "02",
    title: "Belgian precision. Vietnamese scale.",
    body: "Part of BRIAM Group — 40+ years of silo engineering, now building in Southeast Asia.",
  },
  {
    n: "03",
    title: "Stable. Structured. Real.",
    body: "Family-owned group. Clear org. ISO 9001 target year one. What you see is what you get.",
  },
];

export function WhyWorkHere() {
  return (
    <section id="why" className="scroll-mt-24 py-24 lg:py-28">
      <Container>
        <Reveal className="text-center">
          <h2 className="h2 text-ink">Why here. Why now.</h2>
        </Reveal>

        <RevealGroup as="div" className="mx-auto mt-14 max-w-[860px]">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              variants={revealItem}
              className={i > 0 ? "border-t border-ink pt-8 mt-8" : ""}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-8">
                <span className="font-display text-[32px] leading-none text-orange lg:text-[36px]">
                  {p.n}
                </span>
                <div className="flex-1">
                  <h3 className="h5 text-ink">{p.title}</h3>
                  <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55] text-muted">
                    {p.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal className="mt-14 flex justify-center">
          <Button href="/#open-positions" size="lg">
            View Open Positions
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
