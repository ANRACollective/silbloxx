import { cn } from "@/lib/cn";

/**
 * SILBLOXX wordmark — the "O" is the brand's signature stadium/bracket glyph.
 * Colour follows `currentColor` (black on light, white/yellow on dark), and the
 * `stretch` variant grows the O to fill its row (the footer lockup treatment).
 *
 * NOTE: official vector logos live in Drive › Logos (BLACK/WHITE/YELLOW). Drop
 * an SVG into /public/images to swap this recreation for the exact mark.
 */
export function Wordmark({
  className,
  stretch = false,
  thickness = "0.16em",
}: {
  className?: string;
  stretch?: boolean;
  thickness?: string;
}) {
  return (
    <span
      aria-label="Silbloxx"
      className={cn(
        "font-display leading-none tracking-[-0.02em]",
        stretch ? "flex w-full items-center" : "inline-flex items-center",
        className,
      )}
    >
      <span className="whitespace-pre">SILBL</span>
      <span
        aria-hidden
        className={cn(
          "mx-[0.05em] inline-block shrink-0 rounded-full border-current align-middle",
          stretch && "min-w-[1.4em] flex-1",
        )}
        style={{
          borderWidth: thickness,
          height: "0.72em",
          width: stretch ? undefined : "0.9em",
        }}
      />
      <span className="whitespace-pre">XX</span>
    </span>
  );
}
