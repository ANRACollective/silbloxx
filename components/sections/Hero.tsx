import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Hero — headline + intro + CTAs, over an overlapping three-photo collage.
 * Desktop: absolute collage (big centre plate, worker upper-right with a solid
 * black block, robot lower-left with an L-bracket). Mobile: photos stack.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 lg:pt-16">
      <Container>
        <Reveal className="max-w-[760px]">
          <h1 className="h1 text-ink">
            Your reliable supplier of innovative silos
          </h1>
          <p className="mt-7 max-w-[560px] text-[18px] leading-[1.5] text-muted">
            Silbloxx Asia is the Vietnamese arm of Silbloxx. We are part of an
            international industrial group, BRIAM, active in food and feed
            infrastructure projects worldwide.
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

      {/* Mobile: stacked photos */}
      <Container className="mt-12 space-y-6 lg:hidden">
        <BracketImage
          src="/images/hero-robot.jpg"
          alt="Robotic welding cell throwing blue sparks on the Silbloxx line"
          corners={["tr", "bl"]}
          className="aspect-[4/3] w-full"
          placeholderLabel="Robotic welding — sparks"
          priority
        />
        <BracketImage
          src="/images/hero-welding-line.jpg"
          alt="Overhead view of an automated welding line assembling a silo panel"
          corners={[]}
          className="aspect-[16/10] w-full"
          placeholderLabel="Automated welding line"
        />
        <BracketImage
          src="/images/hero-worker.jpg"
          alt="Silbloxx operator guiding a steel panel with a lifting chain"
          corners={["tr", "bl"]}
          className="aspect-[4/5] w-full"
          placeholderLabel="Operator on the floor"
        />
      </Container>

      {/* Desktop: overlapping collage */}
      <Container className="relative mt-8 hidden lg:block">
        <div className="relative h-[760px] w-full">
          {/* big centre plate */}
          <BracketImage
            src="/images/hero-welding-line.jpg"
            alt="Overhead view of an automated welding line assembling a silo panel"
            corners={[]}
            className="absolute left-[22%] top-[70px] h-[420px] w-[48%]"
            placeholderLabel="Automated welding line"
            priority
          />
          {/* worker, upper-right, with solid block accent */}
          <div className="absolute right-0 top-0 h-[320px] w-[20%]">
            <div className="absolute -right-4 -top-5 h-24 w-24 bg-ink" aria-hidden />
            <BracketImage
              src="/images/hero-worker.jpg"
              alt="Silbloxx operator guiding a steel panel with a lifting chain"
              corners={[]}
              className="relative h-full w-full"
              placeholderLabel="Operator on the floor"
            />
          </div>
          {/* robot, lower-left, with L-bracket */}
          <BracketImage
            src="/images/hero-robot.jpg"
            alt="Robotic welding cell throwing blue sparks on the Silbloxx line"
            corners={["bl"]}
            bracket={64}
            className="absolute bottom-0 left-0 h-[300px] w-[22%]"
            placeholderLabel="Robotic welding — sparks"
          />
        </div>
      </Container>

      <span id="about" className="block h-0" />
    </section>
  );
}
