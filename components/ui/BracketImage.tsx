"use client";

import { useState } from "react";
import { Bracket as BrandBracket } from "./Bracket";
import { cn } from "@/lib/cn";

type Corner = "tl" | "tr" | "bl" | "br";

/**
 * Brand image treatment: a photo in a square frame with black L-bracket
 * corner accents that overhang the edges (brand "L-bracket" motif).
 *
 * Until the optimised photography is dropped into /public/images, a src that
 * doesn't resolve simply shows an intentional dark industrial placeholder.
 */
export function BracketImage({
  src,
  alt,
  corners = ["tr", "bl"],
  className,
  imgClassName,
  bracket = 80,
  thickness = 24.67,
  bracketColor = "var(--color-ink)",
  priority,
  placeholderLabel,
}: {
  src?: string;
  alt: string;
  corners?: Corner[];
  className?: string;
  imgClassName?: string;
  bracket?: number;
  thickness?: number;
  /** Bracket fill — override on dark surfaces where black would disappear. */
  bracketColor?: string;
  priority?: boolean;
  placeholderLabel?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = src && !failed;
  return (
    <div className={cn("relative", className)}>
      <div className="relative h-full w-full overflow-hidden bg-[#16181b]">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onError={() => setFailed(true)}
            className={cn(
              "h-full w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-brand)] hover:scale-[1.04]",
              imgClassName,
            )}
          />
        ) : (
          <div
            role="img"
            aria-label={alt}
            className="grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_30%_20%,#2b2f34_0%,#16181b_60%,#0d0e10_100%)]"
          >
            <span className="px-4 text-center font-body text-[11px] uppercase tracking-[0.22em] text-white/35">
              {placeholderLabel ?? "Silbloxx photography"}
            </span>
          </div>
        )}
      </div>

      {corners.map((c) => (
        <span
          key={c}
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: bracket,
            height: bracket,
            ...(c.includes("t") ? { top: 0 } : { bottom: 0 }),
            ...(c.includes("l") ? { left: 0 } : { right: 0 }),
            // overhang the frame edge by the arm thickness, as in the design
            ...(c.includes("t")
              ? { marginTop: -thickness }
              : { marginBottom: -thickness }),
            ...(c.includes("l")
              ? { marginLeft: -thickness }
              : { marginRight: -thickness }),
          }}
        >
          <BrandBracket
            corner={c}
            size={bracket}
            color={bracketColor}
            className="h-full w-full"
          />
        </span>
      ))}
    </div>
  );
}
