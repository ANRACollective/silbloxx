"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Brand ease-out curve shared by every entrance animation.
 * Equivalent to `cubic-bezier(0.16, 1, 0.3, 1)` (`--ease-brand` in CSS).
 */
export const EASE_BRAND = [0.16, 1, 0.3, 1] as const;

type SplitHeadingProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
};

/**
 * Heading whose words rise into place one after another.
 *
 * The in-view trigger lives on the heading rather than on the words: each word
 * starts outside its own clipping box, so an observer on the word would never
 * report it as visible. Spaces sit between the word boxes: a trailing space
 * inside an inline-block is dropped by the browser. The markup is identical
 * with and without reduced motion to keep server and client output in sync.
 */
export function SplitHeading({
  text,
  className,
  as = "h1",
  delay = 0,
}: SplitHeadingProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = as === "h2" ? motion.h2 : motion.h1;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 && " "}
          <span className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: reduce ? 0 : "108%" },
                show: {
                  y: 0,
                  transition: reduce
                    ? { duration: 0 }
                    : { duration: 0.85, ease: EASE_BRAND, delay: delay + i * 0.06 },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        </Fragment>
      ))}
    </MotionTag>
  );
}
