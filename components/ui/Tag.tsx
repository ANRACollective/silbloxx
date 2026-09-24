import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Team label on job cards: 20% yellow fill with vertical padding only, so the
 * text lines up with the job title above it.
 */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex bg-yellow-soft py-1 font-display text-[20px] leading-[1.4] text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
