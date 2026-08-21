import { cn } from "@/lib/cn";

/**
 * Category tag — Figma `Tag` (node 10233:36517).
 * Fill is 20% yellow, label is Druk Text Medium 20px/1.4 black, and the block
 * has vertical padding only (py 4, no horizontal inset) so the label's left
 * edge lines up flush with the job title above it.
 */
export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        // Stepped down from a 20px display label on a yellow wash to a small
        // tracked label. At 20px it read as a second headline competing with
        // the job title directly above it.
        "label inline-flex items-center text-ink/70",
        className,
      )}
    >
      {children}
    </span>
  );
}
