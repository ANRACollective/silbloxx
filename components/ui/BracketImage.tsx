"use client";

import { useState } from "react";
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
  bracket = 56,
  thickness = 8,
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
        <Bracket key={c} corner={c} size={bracket} thickness={thickness} />
      ))}
    </div>
  );
}

function Bracket({
  corner,
  size,
  thickness,
}: {
  corner: Corner;
  size: number;
  thickness: number;
}) {
  const off = -Math.round(thickness * 0.5);
  const pos: Record<Corner, React.CSSProperties> = {
    tl: { top: off, left: off },
    tr: { top: off, right: off },
    bl: { bottom: off, left: off },
    br: { bottom: off, right: off },
  };
  const horiz: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: thickness,
    background: "var(--color-ink)",
    ...(corner.includes("t") ? { top: 0 } : { bottom: 0 }),
    ...(corner.includes("l") ? { left: 0 } : { right: 0 }),
  };
  const vert: React.CSSProperties = {
    position: "absolute",
    width: thickness,
    height: size,
    background: "var(--color-ink)",
    ...(corner.includes("t") ? { top: 0 } : { bottom: 0 }),
    ...(corner.includes("l") ? { left: 0 } : { right: 0 }),
  };
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ width: size, height: size, ...pos[corner] }}
    >
      <span style={horiz} />
      <span style={vert} />
    </div>
  );
}
