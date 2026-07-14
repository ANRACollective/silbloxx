import { cn } from "@/lib/cn";

/** Category tag — pale yellow fill, black label (design-system "Tags"). */
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
        "inline-flex items-center rounded-[2px] bg-yellow-soft px-2.5 py-1 font-display text-[12px] leading-none tracking-[0.01em] text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
