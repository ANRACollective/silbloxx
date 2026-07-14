import { cn } from "@/lib/cn";

/**
 * Page gutter. Mirrors the Figma 1440 frame with 72px side margins,
 * scaling the gutter down on smaller breakpoints.
 */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[72px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
