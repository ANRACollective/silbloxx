import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { GetInTouchForm } from "@/components/sections/GetInTouchForm";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Shown in place of the job listing when there are no open roles
 * (Figma "Positions", no-openings variant), so candidates can still
 * send their details and CV.
 */
export function NoOpenings() {
  return (
    <section id="open-positions" className="scroll-mt-24 overflow-hidden py-28">
      <Container className="flex flex-col gap-[42px] lg:flex-row lg:items-start">
        <div className="flex min-w-px flex-1 flex-col gap-8 lg:justify-between lg:self-stretch">
          <Reveal className="flex flex-col gap-3">
            <h2 className="h1 text-ink">No open positions right now</h2>
            <p className="text-left text-[18px] leading-[1.5] text-ink lg:text-justify">
              We&apos;re always interested in meeting talented people. Submit your details
              and we&apos;ll be in touch when a suitable opportunity comes up.
            </p>
          </Reveal>

          <Reveal
            delay={0.1}
            className="relative h-[220px] w-full overflow-hidden sm:h-[300px]"
          >
            <Image
              src="/images/no-openings.jpg"
              alt="Operator at the controls of a robotic welding line"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="photo-grade object-cover object-[center_23%]"
            />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="w-full lg:w-auto">
          <GetInTouchForm />
        </Reveal>
      </Container>
    </section>
  );
}
