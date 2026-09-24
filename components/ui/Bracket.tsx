import { cn } from "@/lib/cn";

export type BracketCorner = "tl" | "tr" | "bl" | "br";

/**
 * The brand's L-bracket accent (`public/brand/bracket.svg`): an 80×80 solid L
 * with an arm thickness of 24.67. The artwork is drawn as the bottom-left
 * corner; the other corners are the same path rotated.
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
