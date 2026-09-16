import { cn } from "@/lib/cn";

/**
 * BRIAM Group logo — the official `BRIAM_Logo_Screen_Positive_RGB` vector,
 * exported from the Figma footer (node 10219:43238), served from
 * /public/brand/briam-logo.svg. Replaces the earlier hand-drawn approximation
 * (feedback 16.09: "BRIAM logo incorrect in footer").
 *
 * Figma box is 123 x 39 with the artwork inset 0.62% left / 4.81% right,
 * i.e. the artwork itself is 116.3 x 39.
 */
export function BriamMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/briam-logo.svg"
      alt="BRIAM Group"
      width={116}
      height={39}
      className={cn("block h-[39px] w-auto", className)}
    />
  );
}
