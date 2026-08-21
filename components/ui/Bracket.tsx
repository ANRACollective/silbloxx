import { cn } from "@/lib/cn";

export type BracketCorner = "tl" | "tr" | "bl" | "br";

/**
 * The brand's L-bracket accent, taken from the Figma vector
 * (`public/brand/bracket.svg`, node `_Element`).
 *
 * The path is an 80x80 solid L whose arm thickness is 24.67 — noticeably
 * chunkier than a hairline rule. Drawn as `bl` (bottom-left) in the source;
 * the other corners are the same path mirrored, which is exactly how the
 * design does it (the hero's second bracket is the same node rotated 180deg).
 */
const ROTATION: Record<BracketCorner, string> = {
  bl: "rotate(0deg)",
  br: "rotate(-90deg)",
  tr: "rotate(180deg)",
  tl: "rotate(90deg)",
};

export function Bracket({
  corner = "bl",
  size = 80,
  className,
  color = "currentColor",
}: {
  corner?: BracketCorner;
  size?: number;
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={cn("block shrink-0", className)}
      style={{ transform: ROTATION[corner] }}
    >
      <path d="M24.6696 55.3304H80V80H0V0H24.6696V55.3304Z" fill={color} />
    </svg>
  );
}
