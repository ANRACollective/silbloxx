"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const reduce = useReducedMotion();

  return (
    <section id="why" className="section scroll-mt-24 overflow-hidden">
      <Container className="flex flex-col gap-12">
        <Reveal className="w-full">
          <h2 className="h1 measure-tight text-ink">Why join (us) now?</h2>
        </Reveal>

        {/* Curtain wipe — the photo unmasks left to right as the band scrolls in.
            Animating clip-path (not width) keeps the image itself perfectly
            still underneath, so nothing squashes or reflows during the reveal.
            The trigger sits on this wrapper, which is never clipped by an
            ancestor — putting it on the clipped child would mean it never
            registers as on-screen. */}
        <motion.div
          className="relative h-[380px] w-full overflow-hidden"
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-12% 0px" }}
          variants={{
            hidden: { clipPath: "inset(0 100% 0 0)" },
            show: {
              clipPath: "inset(0 0% 0 0)",
              transition: reduce
                ? { duration: 0 }
                : { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/why-team.jpg"
            alt="Two Silbloxx Asia colleagues on the production floor at night"
            className="h-full w-full object-cover object-[center_35%]"
            loading="lazy"
          />
        </motion.div>

        <RevealGroup
          as="div"
          className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16"
        >
          {REASONS.map((r) => (
            <motion.div
              key={r.title}
              variants={revealItem}
              className="flex min-w-px flex-1 flex-col items-start border-l border-hairline-strong pl-8 lg:h-[280px]"
            >
              <div className="flex w-full flex-col gap-4">
                <h3 className="h5 text-ink">{r.title}</h3>
                <p className="text-[17px] leading-[1.7] text-body">
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
