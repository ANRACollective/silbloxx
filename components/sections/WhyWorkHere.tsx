"use client";

import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

/**
 * "Why join (us) now?" — rebuilt 1:1 from Figma `WhyWorkHere` (node 10230:11298).
 *
 * Geometry from the design:
 *   section     px 64, py 80; container gap 32
 *   title       H1 56/1.2, max-w 768
 *   image       full-width band, h 380, cropped (rendered at 230.29% height,
 *               offset -30.52% => the visible band centres ~35% down the source)
 *   row         gap 32; three flex-1 columns, h 300,
 *               border-left 4px black (stroke/border-width), px 30 py 22
 *   column      content gap 16; H4 32/1.3; body Gruppo 18/1.5 justified
 *
 * Note this replaces the dark full-bleed band from the previous round — that was
 * my interpretation of the client's note; this is what the designer actually drew.
 */
const REASONS = [
  {
    title: "Join early. Make an impact.",
    body: "We're building a new manufacturing operation, not stepping into one that has been running the same way for decades. Joining early means helping shape how we work, how we improve and how the team grows.",
  },
  {
    title: "Global experience. Built locally.",
    body: "Part of BRIAM Group — 40+ years of silo engineering behind us, a new manufacturing base in Southeast Asia in front of us. Global know-how, built by a local team. Nothing about this is a copy-paste of what's done elsewhere.",
  },
  {
    title: "Family-owned. Internationally minded.",
    body: "BRIAM has grown as a family-owned industrial group with a practical, long-term approach to business. We believe in clear responsibilities, collaboration and giving people the trust to get things done.",
  },
];

export function WhyWorkHere() {
  return (
    <section id="why" className="scroll-mt-24 overflow-hidden py-20">
      <Container className="flex flex-col gap-8">
        <Reveal className="w-full max-w-[768px]">
          <h2 className="h1 text-ink">Why join (us) now?</h2>
        </Reveal>

        <Reveal className="relative h-[380px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/why-team.jpg"
            alt="Two Silbloxx Asia colleagues on the production floor at night"
            className="h-full w-full object-cover object-[center_35%]"
            loading="lazy"
          />
        </Reveal>

        <RevealGroup
          as="div"
          className="flex flex-col gap-8 lg:flex-row lg:items-start"
        >
          {REASONS.map((r) => (
            <motion.div
              key={r.title}
              variants={revealItem}
              className="flex min-w-px flex-1 flex-col items-start border-l-[4px] border-ink px-[30px] py-[22px] lg:h-[300px]"
            >
              <div className="flex w-full flex-col gap-4 text-ink">
                <h3 className="h4">{r.title}</h3>
                <p className="text-justify text-[18px] leading-[1.5]">
                  {r.body}
                </p>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
