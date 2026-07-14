import { cn } from "@/lib/cn";

/**
 * BRIAM Group lockup (parent group). Approximated angular "B" mark + wordmark,
 * recolours via currentColor. Swap for the official BRIAM asset when supplied.
 */
export function BriamMark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-full w-auto"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4 4h17a10 10 0 0 1 6.4 17.7A11 11 0 0 1 20 40H4V22h15.5a3 3 0 0 0 0-6H4V4Zm7 7v4.5h8.5a2.25 2.25 0 0 0 0-4.5H11Zm0 15.5V33h8.5a3.25 3.25 0 0 0 0-6.5H11Z" />
      </svg>
      <span className="font-display text-[22px] leading-none tracking-[-0.02em]">
        BRIAM
        <sup className="ml-[1px] align-super text-[9px]">™</sup>
      </span>
    </span>
  );
}
