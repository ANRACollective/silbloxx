"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_BRAND } from "@/components/ui/motion";

const VIEWPORT = { once: true, margin: "-10% 0px -10% 0px" } as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait before the element animates in. */
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
};

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * Renders in its final state when the visitor prefers reduced motion.
 */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reduce = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_BRAND, delay } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds between consecutive children. */
  stagger?: number;
};

/** Parent that reveals its `revealItem` children one after another. */
export function RevealGroup({ children, className, stagger = 0.09 }: RevealGroupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={VIEWPORT}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

/** Variants for a direct child of `RevealGroup`. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_BRAND } },
};
