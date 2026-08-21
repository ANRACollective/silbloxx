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
        "inline-flex items-start bg-yellow-soft py-[4px] font-display text-[20px] leading-[1.4] text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
