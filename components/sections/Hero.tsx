"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/motion";

/**
 * Hero — Figma `Hero` (desktop node 10220:794, mobile 10220:33370).
 *
 * Geometry from the design:
 *   section      px 64, py 80; container gap 48
 *   content      max-w 768, gap 32; heading/body gap 24
 *   actions      gap 16; primary px18 py12; two secondary buttons, fixed w-185
 *   image row    gap 20, all three plates 472 tall:
 *                silos 270 | engineers flex-1 | worker 270
 *   brackets     bottom-left on the first plate, top-right on the last
 *
 * Copy and the two "Learn More" buttons follow the current Figma. The review
 * (16.09) asked for the two to carry distinct labels — one goes to
 * silbloxx.com, the other to the BRIAM Group site.
 * No parallax: every photo on the page gets the same plain reveal (16.09).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <Container>
        {/* NB: the headline is deliberately NOT wrapped in <Reveal>. Motion
            propagates a parent's variant labels to descendant motion
            components, which suppresses the per-word animation and leaves the
            words parked behind their clip — i.e. an invisible headline. */}
        <div className="flex w-full max-w-[768px] flex-col gap-8">
          <div className="flex flex-col gap-6">
            <SplitHeading
              as="h1"
              className="h1 text-ink"
              text="Build the future with us."
            />
            <Reveal delay={0.18}>
              <p className="text-left lg:text-justify text-[18px] leading-[1.5] text-ink">
                Silbloxx Asia is the Vietnamese arm of Silbloxx. We are part of
                an international industrial group, BRIAM, active in food and
                feed infrastructure projects worldwide.
              </p>
            </Reveal>
          </div>
          {/* Mobile (boss 17.09): the three buttons squeezed onto one row and the
              About labels broke over two lines. Below `md` the primary gets its
              own full-width row and the two About buttons share the next one,
              labels kept on a single line. From `md` up: one row, as in Figma. */}
          <Reveal
            delay={0.28}
            className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:items-start"
          >
            <Button href="/#open-positions" className="col-span-2 text-[18px] md:col-auto md:text-[20px]">
              View Open Positions
            </Button>
            <Button
              href="https://www.silbloxx.com/en/about-us"
              external
              variant="secondary"
              className="whitespace-nowrap px-3 text-[18px] md:w-[185px] md:px-[18px] md:text-[20px]"
            >
              About SILBLOXX
            </Button>
            <Button
              href="https://www.briamgroup.com/company"
              external
              variant="secondary"
              className="whitespace-nowrap px-3 text-[18px] md:w-[185px] md:px-[18px] md:text-[20px]"
            >
              About BRIAM
            </Button>
          </Reveal>
        </div>
      </Container>

      {/* Mobile: a single photo (feedback 16.09 — "only 1 image, no need all
          3"), per Figma LandingPage_Mobile › Hero (node 10220:33370): one
          full-width plate 400px tall, 52px below the actions, with brackets
          on the bottom-left and top-right corners. */}
      <Container className="mt-[52px] lg:hidden">
        <BracketImage
          src="/images/hero-team.jpg"
          alt="Two Silbloxx Asia engineers checking a production machine"
          corners={["bl", "tr"]}
          className="h-[400px] w-full"
          placeholderLabel="Production team"
          priority
        />
      </Container>

      {/* Desktop: Figma image row — 270 | flex | 270, all 472 tall, gap 20. */}
      <Container className="mt-12 hidden lg:block">
        <Reveal>
          <div className="flex h-[472px] w-full items-stretch gap-5">
            <BracketImage
              src="/images/hero-silos.jpg"
              alt="Aerial view of a row of Silbloxx steel silos with a technician on the catwalk"
              corners={["bl"]}
              className="h-full w-[270px] shrink-0"
              placeholderLabel="Silos"
              priority
            />
            <BracketImage
              src="/images/hero-team.jpg"
              alt="Two Silbloxx Asia engineers checking a production machine"
              corners={[]}
              className="h-full min-w-px flex-1"
              placeholderLabel="Production team"
              priority
            />
            <BracketImage
              src="/images/hero-worker.jpg"
              alt="Silbloxx operator guiding a steel panel with a lifting chain"
              corners={["tr"]}
              className="h-full w-[270px] shrink-0"
              placeholderLabel="Operator on the floor"
            />
          </div>
        </Reveal>
      </Container>

      <span id="about" className="block h-0" />
    </section>
  );
}
