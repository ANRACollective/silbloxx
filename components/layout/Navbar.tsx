"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/Container";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { EASE_BRAND } from "@/components/ui/motion";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

const NAV_LINKS = [{ label: "Careers", href: "/#open-positions" }] as const;

const LANGUAGES = ["EN", "VN"] as const;
type Language = (typeof LANGUAGES)[number];

/**
 * EN/VN switch. Presentational for now: the Vietnamese content is not yet
 * available, so selecting VN only changes the active state.
 */
function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("EN");

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center border border-orange font-display text-[13px] select-none"
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={cn(
            "px-3 py-1.5 leading-none transition-colors duration-200",
            language === code ? "bg-orange text-paper" : "bg-transparent text-ink",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent the page behind the mobile menu from scrolling.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-ink/10 transition-[background-color] duration-300 ease-(--ease-brand)",
        scrolled ? "bg-ground/85 backdrop-blur-md" : "bg-ground",
      )}
    >
      <Container
        className={cn(
          "flex items-center justify-between transition-[height] duration-300 ease-out",
          scrolled ? "h-14 lg:h-[60px]" : "h-16 lg:h-[72px]",
        )}
      >
        <Link href="/" aria-label="Silbloxx Asia home" className="text-ink">
          <Wordmark className="text-[16px] lg:text-[19px]" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-underline font-display text-[20px] leading-[1.4] text-ink hover:text-orange"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-9 place-items-center text-orange"
          >
            {menuOpen ? (
              <CloseIcon width={26} height={26} />
            ) : (
              <MenuIcon width={26} height={26} />
            )}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: reduce ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -8 }}
            transition={{ duration: 0.28, ease: EASE_BRAND }}
            className="lg:hidden"
          >
            <Container className="flex flex-col gap-1 border-t border-ink/10 pt-2 pb-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-ink/10 py-4 font-display text-[22px] text-ink hover:text-orange"
                >
                  {link.label}
                </Link>
              ))}
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
