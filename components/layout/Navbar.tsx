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
        "inline-flex select-none items-center border border-orange text-[13px] font-display",
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
            "px-3 py-1.5 leading-none transition-colors duration-200",
            lang === l ? "bg-orange text-paper" : "bg-transparent text-ink",
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
          ? "border-b border-ink/10 bg-ground/85 backdrop-blur-md"
          : "border-b border-ink/10 bg-ground",
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-[72px] lg:py-0">
        <Link
          href="/"
          aria-label="Silbloxx Asia home"
          className="text-ink transition-transform duration-300 ease-[var(--ease-brand)] hover:-translate-y-[1px]"
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
            className="font-display text-[20px] leading-[1.4] text-ink transition-colors duration-200 hover:text-orange"
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
            <Container className="flex flex-col gap-1 border-t border-ink/10 pb-6 pt-2">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-ink/10 py-4 font-display text-[22px] text-ink transition-colors hover:text-orange"
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
