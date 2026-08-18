import Link from "next/link";
import { Container } from "./Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { BriamMark } from "@/components/ui/BriamMark";
import {
  FacebookIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/components/ui/icons";

const YEAR = 2026;

function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[17px] tracking-[-0.01em] text-ink">
      {children}
    </h3>
  );
}

function MailLink({ children }: { children: string }) {
  return (
    <a
      href={`mailto:${children}`}
      /* long addresses must wrap inside their column rather than spill out */
      className="[overflow-wrap:anywhere] text-orange underline decoration-orange/40 underline-offset-2 transition-colors hover:decoration-orange"
    >
      {children}
    </a>
  );
}

const social = [
  { label: "Facebook", Icon: FacebookIcon, href: "https://www.facebook.com/silbloxx" },
  { label: "LinkedIn", Icon: LinkedInIcon, href: "https://www.linkedin.com/company/silbloxx" },
  { label: "Youtube", Icon: YoutubeIcon, href: "https://www.youtube.com/@silbloxx" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-paper">
      {/* yellow radial wash rising from the lower edge */}
      <div className="wash-yellow pointer-events-none absolute inset-x-0 bottom-0 h-[60%]" />

      <Container className="relative pb-10 pt-14 lg:pt-16">
        {/* top rule */}
        <div className="h-[6px] w-full bg-ink" />

        {/* columns */}
        <div className="relative mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1.5fr] lg:gap-x-10">
          <div className="space-y-3 text-[14px] leading-relaxed text-muted">
            <ColHeading>Head Office</ColHeading>
            <p>
              Silbloxx HQ — Belgium
              <br />
              BRIAM Group
            </p>
            <p>
              <MailLink>hq@silbloxx.com</MailLink>
            </p>
            <p>+32 11 00 00 00</p>
          </div>

          <div className="space-y-3 text-[14px] leading-relaxed text-muted">
            <ColHeading>Asia Sales Office</ColHeading>
            <p>
              75 High Street
              <br />
              Singapore 179435
              <br />
              Singapore
            </p>
            <p>
              <MailLink>sales.asia@silbloxx.com</MailLink>
            </p>
            <p>+65 0000 0000</p>
          </div>

          <div className="space-y-3 text-[14px] leading-relaxed text-muted">
            <ColHeading>Manufacturing</ColHeading>
            <p>
              An Khánh Ward
              <br />
              Ho Chi Minh City, Vietnam
            </p>
            <p>
              <MailLink>careers.asia@silbloxx.com</MailLink>
            </p>
            <p>+84 28 0000 0000</p>
          </div>

          <div className="space-y-3 text-[14px] text-muted">
            <ColHeading>Follow Us</ColHeading>
            <ul className="space-y-3">
              {social.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-orange"
                  >
                    <span className="grid h-6 w-6 place-items-center">
                      <Icon width={20} height={20} />
                    </span>
                    <span className="text-[14px] text-muted transition-colors group-hover:text-orange">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 max-w-[320px] space-y-5 sm:col-span-3 lg:col-span-1">
            <p className="text-[15px] leading-relaxed text-muted">
              Silbloxx Asia is part of the BRIAM Group — a Belgian industrial
              group active in food and feed infrastructure worldwide.
            </p>
            <BriamMark className="h-7 text-ink" />
          </div>
        </div>

        {/* Oversized lockup — horizontal at every breakpoint.
            Client feedback (14.08): the mobile version used to rotate 90° and
            ate the horizontal space the footer columns needed. */}
        {/* The lockup's minimum width is a fixed multiple of its height
            (10.13 : 1), so its size is driven off the *container* width via
            container-query units — `vw` would ignore the page gutters and
            push the final X off-screen on small viewports. */}
        <div
          className="mt-14 lg:mt-16"
          style={{ containerType: "inline-size" }}
        >
          <Wordmark
            stretch
            className="text-[min(92px,calc(100cqi/10.15))] text-ink"
          />
        </div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between lg:mt-8 lg:border-t-0 lg:pt-0">
          <p>© {YEAR} Silbloxx. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="underline-offset-2 hover:text-ink hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="underline-offset-2 hover:text-ink hover:underline">
              Cookies Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
