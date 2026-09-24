import { Container } from "@/components/layout/Container";
import { BracketImage } from "@/components/ui/BracketImage";
import { Button } from "@/components/ui/Button";
import { SplitHeading } from "@/components/ui/motion";
import { Reveal } from "@/components/ui/Reveal";
import { EXTERNAL_LINKS } from "@/lib/site";

const TEAM_PHOTO = {
  src: "/images/hero-team.jpg",
  alt: "Two Silbloxx Asia engineers checking a production machine",
} as const;

/** Secondary buttons: side by side below `md`, fixed 185px wide from `md` up. */
const SECONDARY =
  "whitespace-nowrap px-3 text-[18px] md:w-[185px] md:px-[18px] md:text-[20px]";

/**
 * Homepage hero (Figma "Hero").
 * Desktop shows three photos; mobile shows a single photo.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20">
      <Container>
        <div className="flex max-w-[768px] flex-col gap-8">
          <div className="flex flex-col gap-6">
            {/* Not wrapped in <Reveal>: a parent variant would override the per-word animation. */}
            <SplitHeading
              as="h1"
              className="h1 text-ink"
              text="Build the future with us."
            />
            <Reveal delay={0.18}>
              <p className="text-left text-[18px] leading-[1.5] text-ink lg:text-justify">
                Silbloxx Asia is the Vietnamese arm of Silbloxx. We are part of an
                international industrial group, BRIAM, active in food and feed
                infrastructure projects worldwide.
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.28}
            className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:items-start"
          >
            <Button
              href="/#open-positions"
              className="col-span-2 text-[18px] md:col-auto md:text-[20px]"
            >
              View Open Positions
            </Button>
            <Button
              href={EXTERNAL_LINKS.aboutSilbloxx}
              external
              variant="secondary"
              className={SECONDARY}
            >
              About SILBLOXX
            </Button>
            <Button
              href={EXTERNAL_LINKS.aboutBriam}
              external
              variant="secondary"
              className={SECONDARY}
            >
              About BRIAM
            </Button>
          </Reveal>
        </div>
      </Container>

      {/* Mobile and tablet: one photo, kept landscape so it does not fill the screen. */}
      <Container className="mt-[52px] lg:hidden">
        <BracketImage
          {...TEAM_PHOTO}
          corners={["bl", "tr"]}
          sizes="100vw"
          priority
          className="aspect-[4/3] w-full"
        />
      </Container>

      {/* Desktop: 270px | fluid | 270px, all 472px tall. */}
      <Container className="mt-12 hidden lg:block">
        <Reveal>
          <div className="flex h-[472px] w-full items-stretch gap-5">
            <BracketImage
              src="/images/hero-silos.jpg"
              alt="Aerial view of Silbloxx steel silos with a technician on the catwalk"
              corners={["bl"]}
              sizes="270px"
              priority
              className="h-full w-[270px] shrink-0"
            />
            <BracketImage
              {...TEAM_PHOTO}
              corners={[]}
              sizes="(min-width: 1440px) 732px, 50vw"
              priority
              className="h-full min-w-px flex-1"
            />
            <BracketImage
              src="/images/hero-worker.jpg"
              alt="Silbloxx operator guiding a steel panel with a lifting chain"
              corners={["tr"]}
              sizes="270px"
              className="h-full w-[270px] shrink-0"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
