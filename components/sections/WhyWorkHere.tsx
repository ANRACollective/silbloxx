"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

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
] as const;

/** "Why join now?" (Figma "WhyWorkHere"): photo band and three reasons. */
export function WhyWorkHere() {
  return (
    <section id="why" className="scroll-mt-24 overflow-hidden py-20">
      <Container className="flex flex-col gap-8">
        <Reveal className="max-w-[768px]">
          <h2 className="h1 text-ink">Why join now?</h2>
        </Reveal>

        <Reveal className="relative h-[380px] w-full overflow-hidden">
          <Image
            src="/images/why-team.jpg"
            alt="Two Silbloxx Asia colleagues on the production floor at night"
            fill
            sizes="(min-width: 1440px) 1312px, 100vw"
            className="photo-grade object-cover object-[center_35%]"
          />
        </Reveal>

        <RevealGroup className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {REASONS.map((reason) => (
            <motion.article
              key={reason.title}
              variants={revealItem}
              className="flex min-w-px flex-1 flex-col gap-4 border-l-4 border-ink px-[30px] py-[22px] text-ink lg:h-[300px]"
            >
              <h3 className="h4">{reason.title}</h3>
              <p className="text-left text-[18px] leading-[1.5] lg:text-justify">
                {reason.body}
              </p>
            </motion.article>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
