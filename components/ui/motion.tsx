"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Motion primitives.
 *
 * Register borrowed from silbloxx.com, which reveals with
 * `opacity, transform 1s cubic-bezier(0.47, 0, 0.745, 0.715)` and keeps
 * micro-interactions at 0.2–0.3s ease-out. Everything here is gated on
 * `useReducedMotion()` and renders in its final state when motion is reduced —
 * never a permanently-invisible element.
 */
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ *
 *  Headline that animates in word by word
 * ------------------------------------------------------------------ */
export function SplitHeading({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  // The viewport trigger MUST sit on the heading, not on the word spans.
  // IntersectionObserver clips a target's rect by any ancestor overflow:hidden,
  // and each word starts translated fully outside its own clip — so the words
  // report as never intersecting and a `whileInView` on them never fires,
  // leaving the headline permanently invisible. The heading itself isn't
  // clipped, so it triggers reliably and propagates hidden/show to the words.
  //
  // The markup is also identical whether or not motion is reduced: swapping in
  // plain text on the reduced branch changes the DOM between server and client
  // and trips a hydration mismatch (React #418).
  const MotionTag = Tag === "h2" ? motion.h2 : motion.h1;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {/* each word gets its own clipping row so the rise reads as a reveal */}
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          {/* driven by the heading's variant label */}
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: reduce ? 0 : "108%" },
              show: {
                y: 0,
                transition: reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.85,
                      ease: REVEAL_EASE,
                      delay: delay + i * 0.06,
                    },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ *
 *  Parallax wrapper — drifts its child as the section crosses the viewport
 * ------------------------------------------------------------------ */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: React.ReactNode;
  /** total travel in px across the full scroll range */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Count-up for the factory-fact stats
 * ------------------------------------------------------------------ */
const NUMERIC = /^(\D*?)([\d.,]+)([\s\S]*)$/;

/**
 * Counts a leading number up when scrolled into view. Values with no leading
 * number ("ISO 9001", "Q4 2026") are rendered untouched — counting those would
 * be nonsense.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const match = value.match(NUMERIC);
  const countable = !!match && /^[\d.,]/.test(value.trim());
  const prefix = match?.[1] ?? "";
  const num = match?.[2] ?? "0";
  const suffix = match?.[3] ?? "";
  const decimals = (num.split(".")[1] ?? "").length;
  const target = parseFloat(num.replace(/,/g, ""));
  const animates = countable && !reduce;

  // Must initialise to the real value: the server renders without knowing the
  // user's motion preference, so starting at zero produces a text hydration
  // mismatch (React #418). The rAF loop's first tick is ~0 anyway, and the
  // stats sit below the fold, so nothing visibly jumps.
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!animates || !inView) return;
    const started = performance.now();
    const DURATION = 1100;
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / DURATION);
      // easeOutExpo — quick off the mark, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(prefix + (target * eased).toFixed(decimals) + suffix);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animates, inView, prefix, suffix, decimals, target]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 *  Marquee — the oversized footer lockup, drifting
 * ------------------------------------------------------------------ */
export function Marquee({
  children,
  duration = 34,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  // Same structure in both cases — swapping the markup on the reduced-motion
  // branch changes the DOM between server and client and trips hydration.
  // Reduced motion simply parks the track at its start position.
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="flex w-max items-center gap-[6vw]"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={
          reduce ? undefined : { duration, ease: "linear", repeat: Infinity }
        }
      >
        {/* duplicated so the loop is seamless */}
        <div className="flex shrink-0 items-center gap-[6vw]">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-[6vw]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Shared variants
 * ------------------------------------------------------------------ */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: REVEAL_EASE },
  },
};

export { useMotionValue };
