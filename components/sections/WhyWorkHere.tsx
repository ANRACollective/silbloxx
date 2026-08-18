"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal, RevealGroup, revealItem } from "@/components/ui/Reveal";

/**
 * "Why join us now?" — full-bleed dark band with a human portrait bleeding off
 * the leading edge, reasons set beside it.
 *
 * Client feedback (14.08): the previous white, numbered list read as dry and
 * sat too close to the job cards below. Inverting to black separates the two
 * blocks outright and gives the recruitment message a human anchor. The 01/02/03
 * numbering is gone so the section doesn't imply exactly three fixed reasons.
 *
 * Photography: `why-portrait.jpg` is a dedicated slot — drop the approved shot
 * in at the same filename to swap it.
 */
const REASONS = [
  {
    title: "Join early. Make an impact.",
    body: "We're building a new manufacturing operation, not stepping into one that has been running the same way for decades. Joining early means helping shape how we work, how we improve and how the team grows.",
  },
  {
    title: "Global experience. Built locally.",
    body: "We bring international engineering experience from four decades of silo projects, and we're building on Vietnamese manufacturing expertise to deliver it here. Both matter equally to how this plant runs.",
  },
  {
    title: "Family-owned. Internationally minded.",
    body: "BRIAM has grown as a family-owned industrial group with a practical, long-term approach to business. We believe in clear responsibilities, collaboration and giving people the trust to get things done.",
  },
];

export function WhyWorkHere() {
  return (
    <section
      id="why"
      className="relative scroll-mt-24 overflow-hidden bg-ink text-paper"
    >
      {/* soft yellow depth from the lower-right, keeps the black from going flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(70% 60% at 100% 100%, var(--color-yellow) 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1600px] items-stretch lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        {/* Portrait — bleeds off the leading edge */}
        <div className="relative min-h-[420px] lg:min-h-[660px]">
          <BracketImage
            src="/images/why-portrait.jpg"
            alt="Silbloxx Asia team member on the production floor"
            corners={["tr"]}
            bracket={72}
            bracketColor="var(--color-yellow)"
            className="absolute inset-0 h-full w-full"
            placeholderLabel="Team portrait"
          />
        </div>

        {/* Reasons */}
        <div className="flex items-center px-6 py-20 sm:px-10 lg:py-28 lg:pl-16 lg:pr-[72px]">
          <div className="w-full max-w-[600px]">
            <Reveal>
              <p className="eyebrow text-yellow">Careers</p>
              <h2 className="h2 mt-4 text-paper">Why join us now?</h2>
            </Reveal>

            <RevealGroup as="div" className="mt-12">
              {REASONS.map((r, i) => (
                <motion.div
                  key={r.title}
                  variants={revealItem}
                  className={i > 0 ? "mt-9 border-t border-paper/20 pt-9" : ""}
                >
                  <h3 className="h5 text-paper">{r.title}</h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-paper/70">
                    {r.body}
                  </p>
                </motion.div>
              ))}
            </RevealGroup>

            <Reveal className="mt-12">
              <Button href="/#open-positions" size="lg">
                View Open Positions
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
