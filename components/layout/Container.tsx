import { cn } from "@/lib/cn";

/**
 * Page gutter. Figma variable `page-padding/padding-global` = 64px on the
 * 1440 frame; the gutter scales down on smaller breakpoints.
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
        "mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-[64px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
