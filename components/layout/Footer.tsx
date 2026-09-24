import { Container } from "@/components/layout/Container";
import { BriamMark } from "@/components/ui/BriamMark";
import { FacebookIcon, LinkedInIcon, YoutubeIcon } from "@/components/ui/icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { EXTERNAL_LINKS, OFFICES, SOCIAL_LINKS, type Office } from "@/lib/site";

const SOCIAL_ICONS = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  youtube: YoutubeIcon,
} as const;

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: EXTERNAL_LINKS.terms },
  { label: "Cookies Policy", href: EXTERNAL_LINKS.cookies },
] as const;

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-[17px] tracking-[-0.01em] text-ink">{children}</h3>
  );
}

function OfficeColumn({ office }: { office: Office }) {
  return (
    <div className="space-y-3 text-[14px] leading-relaxed text-muted">
      <ColumnHeading>{office.name}</ColumnHeading>
      <address className="not-italic">
        {office.address.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </address>
      <p>
        <a
          href={`mailto:${office.email}`}
          className="link-underline [overflow-wrap:anywhere] text-orange"
        >
          {office.email}
        </a>
      </p>
      <p>{office.phone}</p>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      <div
        aria-hidden
        className="wash-yellow pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
      />

      <Container className="relative pt-14 pb-10 lg:pt-16">
        <div aria-hidden className="h-1.5 w-full bg-ink" />

        <div className="relative mt-12 grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1.5fr] lg:gap-x-10">
          {OFFICES.map((office) => (
            <OfficeColumn key={office.name} office={office} />
          ))}

          <div className="space-y-3 text-[14px] text-muted">
            <ColumnHeading>Follow Us</ColumnHeading>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map(({ platform, label, href }) => {
                const Icon = SOCIAL_ICONS[platform];
                return (
                  <li key={platform}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-ink hover:text-orange"
                    >
                      <span className="grid size-6 place-items-center">
                        <Icon width={20} height={20} />
                      </span>
                      <span className="text-[14px] text-muted group-hover:text-orange">
                        {label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="col-span-2 max-w-[320px] space-y-5 sm:col-span-3 lg:col-span-1">
            <p className="text-[15px] leading-relaxed text-muted">
              Silbloxx Asia is part of the BRIAM Group — a Belgian industrial group active
              in food and feed infrastructure worldwide.
            </p>
            <BriamMark />
          </div>
        </div>

        {/*
          Stretched lockup. Sized from the container width (container query
          units) so it never overflows the page gutters; the artwork needs at
          least a 10.15:1 width-to-height ratio, and 52px is the design height.
        */}
        <div className="[container-type:inline-size] mt-14 lg:mt-16">
          <Wordmark
            stretch
            animate
            className="text-[min(52px,calc(100cqi/10.15))] text-ink"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between lg:mt-8 lg:border-t-0 lg:pt-0">
          <p>© {year} Silbloxx. All rights reserved.</p>
          <ul className="flex items-center gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
