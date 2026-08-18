import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Hero — recruitment-led headline + intro, over a three-photo collage.
 *
 * Client feedback (14.08): imagery was too heavily weighted toward machines.
 * The collage now leads with people — the operator plate is the large primary
 * frame and `hero-team.jpg` is a dedicated human slot. Both are drop-in:
 * replace the files in /public/images keeping the same filenames.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 lg:pt-16">
      <Container>
        <Reveal className="max-w-[760px]">
          <h1 className="h1 text-ink">Build the future with us.</h1>
          <p className="mt-7 max-w-[580px] text-[18px] leading-[1.5] text-muted">
            SILBLOXX is expanding its manufacturing footprint in Vietnam. Backed
            by BRIAM, a Belgian family-owned industrial group with decades of
            experience in bulk storage, we are building a new production
            operation and the team that will make it happen.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/#open-positions" size="lg">
              View Open Positions
            </Button>
            <Button href="/#about" size="lg" variant="secondary">
              Learn More
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* Mobile: stacked photos — people first.
          Corner brackets standardised to tr/bl on every frame (client 14.08). */}
      <Container className="mt-12 space-y-6 lg:hidden">
        <BracketImage
          src="/images/hero-worker.jpg"
          alt="Silbloxx operator guiding a steel panel with a lifting chain"
          corners={["tr", "bl"]}
          className="aspect-[4/5] w-full"
          placeholderLabel="Operator on the floor"
          priority
        />
        <BracketImage
          src="/images/hero-team.jpg"
          alt="Silbloxx Asia production team at work on the shop floor"
          corners={["tr", "bl"]}
          className="aspect-[4/3] w-full"
          placeholderLabel="Production team"
        />
        <BracketImage
          src="/images/hero-welding-line.jpg"
          alt="Overhead view of an automated welding line assembling a silo panel"
          corners={["tr", "bl"]}
          className="aspect-[16/10] w-full"
          placeholderLabel="Automated welding line"
        />
      </Container>

      {/* Desktop: structured featured strip — operator plate leads */}
      <Container className="mt-12 hidden lg:block">
        <Reveal>
          <div className="grid h-[480px] grid-cols-12 gap-4">
            <BracketImage
              src="/images/hero-worker.jpg"
              alt="Silbloxx operator guiding a steel panel with a lifting chain"
              corners={["bl"]}
              bracket={60}
              className="col-span-6 h-full"
              placeholderLabel="Operator on the floor"
              priority
            />
            <BracketImage
              src="/images/hero-team.jpg"
              alt="Silbloxx Asia production team at work on the shop floor"
              corners={[]}
              className="col-span-3 h-full"
              placeholderLabel="Production team"
            />
            <BracketImage
              src="/images/hero-welding-line.jpg"
              alt="Overhead view of an automated welding line assembling a silo panel"
              corners={["tr"]}
              bracket={60}
              className="col-span-3 h-full"
              placeholderLabel="Automated welding line"
            />
          </div>
        </Reveal>
      </Container>

      <span id="about" className="block h-0" />
    </section>
  );
}
