"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading, Parallax } from "@/components/ui/motion";

/**
 * Hero — rebuilt 1:1 from Figma `Hero` (node 10220:794).
 *
 * Geometry from the design:
 *   section      px 64 (page-padding/padding-global), py 80 (padding-section-medium)
 *   content      max-w 768, gap 32; heading/body gap 24
 *   actions      gap 16; primary px18 py12, secondary fixed w-185
 *   image row    gap 20 — left 270x330 bottom-aligned, centre flex-1 h-472
 *                inset by py-106, right 270x360
 *   brackets     two 80x80 L vectors, absolutely placed (left 42 / top 938,
 *                and 83.33%+121 / top 285, the second rotated 180deg)
 *
 * Copy is the 14.08 client-approved wording, which is newer than this frame —
 * the Figma still carries the pre-feedback headline.
 * Photography stays as currently shipped, per instruction.
 */
export function Hero() {
  return (
    <section className="section relative overflow-hidden">
      <Container>
        {/* NB: the headline is deliberately NOT wrapped in <Reveal>. Motion
            propagates a parent's variant labels to descendant motion
            components, which suppresses the per-word animation and leaves the
            words parked behind their clip — i.e. an invisible headline. */}
        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-col gap-7">
            <SplitHeading
              as="h1"
              className="h1 measure-tight text-ink"
              text="Build the future with us."
            />
            <Reveal delay={0.18}>
              <p className="measure text-[18px] leading-[1.7] text-body">
                SILBLOXX is expanding its manufacturing footprint in Vietnam.
                Backed by BRIAM, a Belgian family-owned industrial group with
                decades of experience in bulk storage, we are building a new
                production operation and the team that will make it happen.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.28} className="flex flex-wrap items-start gap-4">
            <Button href="/#open-positions">View Open Positions</Button>
            <Button href="/#about" variant="secondary" className="lg:w-[185px]">
              Learn More
            </Button>
          </Reveal>
        </div>
      </Container>

      {/* Mobile: photos stack */}
      <Container className="mt-14 space-y-5 lg:hidden">
        <BracketImage
          src="/images/hero-worker.jpg"
          alt="Silbloxx operator guiding a steel panel with a lifting chain"
          corners={["bl"]}
          className="aspect-[4/5] w-full"
          placeholderLabel="Operator on the floor"
          priority
        />
        <BracketImage
          src="/images/hero-team.jpg"
          alt="Silbloxx Asia production team at work on the shop floor"
          corners={[]}
          className="aspect-[4/3] w-full"
          placeholderLabel="Production team"
        />
        <BracketImage
          src="/images/hero-welding-line.jpg"
          alt="Overhead view of an automated welding line assembling a silo panel"
          corners={["tr"]}
          className="aspect-[16/10] w-full"
          placeholderLabel="Automated welding line"
        />
      </Container>

      {/* Desktop: one aligned strip, 2:1:1.
          The Figma staggers these three plates at different heights and insets
          the centre one; combined with per-image parallax that read as scattered
          rather than composed, so they now sit on one baseline at equal height
          with a single gentle parallax on the whole row. Brackets are attached
          to the outer plates instead of floating free. */}
      <Container className="mt-16 hidden lg:block">
        <Reveal>
          <Parallax distance={28}>
            <div className="flex h-[440px] w-full items-stretch gap-5">
              <BracketImage
                src="/images/hero-worker.jpg"
                alt="Silbloxx operator guiding a steel panel with a lifting chain"
                corners={["bl"]}
                className="h-full min-w-px flex-[2]"
                placeholderLabel="Operator on the floor"
                priority
              />
              <BracketImage
                src="/images/hero-team.jpg"
                alt="Silbloxx Asia production team at work on the shop floor"
                corners={[]}
                className="h-full min-w-px flex-1"
                placeholderLabel="Production team"
              />
              <BracketImage
                src="/images/hero-welding-line.jpg"
                alt="Overhead view of an automated welding line assembling a silo panel"
                corners={["tr"]}
                className="h-full min-w-px flex-1"
                placeholderLabel="Automated welding line"
              />
            </div>
          </Parallax>
        </Reveal>
      </Container>

      <span id="about" className="block h-0" />
    </section>
  );
}
