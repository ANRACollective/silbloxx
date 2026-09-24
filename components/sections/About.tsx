import { Container } from "@/components/layout/Container";
import { BracketImage } from "@/components/ui/BracketImage";
import { Reveal } from "@/components/ui/Reveal";

/** Key facts, shown as two rows of two. */
const FACTS = [
  [
    { value: "8.4 ha", label: "Site area" },
    { value: "120+", label: "Local roles at full capacity" },
  ],
  [
    { value: "Q4 2026", label: "First line online" },
    { value: "ISO 9001", label: "Quality target, year one" },
  ],
] as const;

function Facts() {
  return (
    <div className="flex flex-col gap-[30px] lg:gap-10">
      {FACTS.map((row, i) => (
        <div key={i} className="flex items-start lg:gap-5">
          {row.map((s, j) => (
            <div
              key={s.label}
              className={
                j === 0
                  ? "flex w-[140px] shrink-0 flex-col lg:w-[200px]"
                  : "flex min-w-px flex-1 flex-col pl-[10px] lg:w-[220px] lg:flex-none"
              }
            >
              <span className="font-display text-[40px] leading-[1.2] text-ink lg:text-[56px]">
                {s.value}
              </span>
              <span className="font-display text-[18px] leading-[1.4] text-ink lg:text-[20px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Section photo. Phones and tablets get a landscape crop (or a different
 * landscape photo via `mobile.src`) so the image does not fill the screen;
 * desktop keeps the square from the design.
 */
const PHOTO = {
  desktop: {
    src: "/images/about-facility.jpg",
    alt: "Silbloxx silo installation at dusk",
    sizes: "50vw",
  },
  mobile: {
    src: "/images/about-facility.jpg",
    alt: "Silbloxx silo installation at dusk",
    sizes: "100vw",
    position: "50% 42%",
  },
} as const;

/** About Silbloxx Asia (Figma "About"): introduction, key facts and a photo. */
export function About() {
  return (
    <section id="about" className="scroll-mt-24 overflow-x-clip py-16 lg:py-28">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-[50px]">
        <Reveal className="flex min-w-px flex-col gap-12 lg:flex-1 lg:gap-10">
          <div className="flex max-w-[768px] flex-col gap-5 lg:gap-6">
            <h2 className="h1 text-ink">
              Decades of experience.
              <br />
              Now building in Vietnam.
            </h2>
            <p className="text-left text-[16px] leading-[1.5] text-ink lg:text-justify lg:text-[18px]">
              For decades, Silbloxx has supplied modular silo systems to projects across
              Europe, Asia, and Africa. Our new facility in Ho Chi Minh City brings
              production closer to our customers across Asia and the wider region.
            </p>
          </div>
          <Facts />
        </Reveal>

        <Reveal delay={0.1} className="min-w-px lg:flex-1">
          {/* Brackets are 60px on mobile and 80px on desktop. */}
          <BracketImage
            {...PHOTO.mobile}
            corners={["tr", "bl"]}
            bracket={60}
            className="aspect-[3/2] w-full lg:hidden"
          />
          <BracketImage
            {...PHOTO.desktop}
            corners={["tr", "bl"]}
            bracket={80}
            className="hidden aspect-square w-full lg:block"
          />
        </Reveal>
      </Container>
    </section>
  );
}
