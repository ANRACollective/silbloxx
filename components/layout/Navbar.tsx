"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "./Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { MenuIcon, CloseIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Client feedback (14.08): "Open Positions" and "Careers" led to essentially
 * the same content, so only "Careers" remains — carrying the CTA treatment and
 * pointing at the roles list.
 */
const LINKS = [{ label: "Careers", href: "/#open-positions" }];

function LangToggle({ className }: { className?: string }) {
  const [lang, setLang] = useState<"EN" | "VN">("EN");
  return (
    <div
      className={cn(
        // Was an orange-filled switch, which put a saturated block in the
        // navigation before the user had done anything. Hairline box, ink for
        // the active language, muted for the alternative.
        "inline-flex select-none items-center border border-hairline-strong text-[12px] tracking-[0.08em] font-display",
        className,
      )}
    >
      {(["EN", "VN"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "px-3 py-2 leading-none transition-colors duration-300 ease-out",
            lang === l
              ? "bg-ink text-paper"
              : "bg-transparent text-muted hover:text-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        // Figma: 72px tall, 1px bottom border, sits on the page ground.
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ease-[var(--ease-brand)]",
        scrolled
          ? "border-b border-hairline bg-ground/85 backdrop-blur-md"
          : "border-b border-transparent bg-ground",
      )}
    >
      {/* subtle shrink once you start scrolling */}
      <Container
        className={cn(
          "flex items-center justify-between transition-[height] duration-300 ease-out",
          scrolled ? "h-14 lg:h-[60px]" : "h-16 lg:h-[72px]",
        )}
      >
        {/* The mark must not move on hover — a logo is a fixed anchor, not a
            button (feedback 21.08). Colour-only affordance instead. */}
        <Link
          href="/"
          aria-label="Silbloxx Asia home"
          className="text-ink transition-opacity duration-200 ease-out hover:opacity-70"
        >
          {/* size = mark height (the vector stands 1em tall) */}
          <Wordmark className="text-[16px] lg:text-[19px]" />
        </Link>

        {/* Desktop */}
        {/* Figma Navbar (node 10219:38689): "Careers" is plain black text
            beside the EN/VN toggle — not a filled CTA. */}
        <nav className="hidden items-center gap-7 lg:flex">
          <Link
            href="/#open-positions"
            className="link-underline font-display text-[15px] tracking-[0.02em] leading-none text-ink transition-colors duration-300 ease-out hover:text-orange"
          >
            Careers
          </Link>
          <LangToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center text-orange"
          >
            {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden"
          >
            <Container className="flex flex-col gap-1 border-t border-hairline pb-8 pt-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-hairline py-5 font-display text-[18px] tracking-[0.02em] text-ink transition-colors hover:text-orange"
                >
                  {l.label}
                </Link>
              ))}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
