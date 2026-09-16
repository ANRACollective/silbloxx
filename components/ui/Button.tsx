import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-display leading-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-paper select-none";

/**
 * Hover animation is reserved for the job cards' Apply Now button
 * (review 16.09: "restrict hover animations solely to Apply Now").
 * Every other button only swaps colour on hover, with no motion.
 * Tailwind v4's `hover:` variant is already scoped to
 * `@media (hover: hover)`, so none of this fires on touch devices.
 */
const LIFT =
  "transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] will-change-transform " +
  "hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(255,46,0,0.55)] active:translate-y-0";

/**
 * Figma buttons: px 18 / py 12 with a Heading-6 label (Druk Text Medium
 * 20px/1.4). `sm` is the in-card Apply Now variant (px 16 / py 8, full width).
 */
const sizes: Record<Size, string> = {
  sm: "px-[16px] py-[8px] text-[20px] leading-[1.4]",
  md: "px-[18px] py-[12px] text-[20px] leading-[1.4]",
  lg: "px-[18px] py-[12px] text-[20px] leading-[1.4]",
};

const variants: Record<Variant, string> = {
  primary:
    "border border-orange bg-orange text-paper",
  secondary:
    "border border-ink text-ink bg-transparent hover:bg-ink hover:text-paper",
  dark: "bg-ink text-paper hover:bg-[#1b1b1b]",
  ghost: "text-ink px-0 py-0 hover:text-orange",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Opt-in hover lift — only the job cards' Apply Now uses this. */
  lift?: boolean;
  /** Open `href` in a new tab (links out to silbloxx.com / briamgroup.com). */
  external?: boolean;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  iconLeft,
  iconRight,
  lift,
  external,
  children,
  ...rest
}: CommonProps &
  ({ href: string } | { href?: undefined }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, sizes[size], variants[variant], lift && LIFT, className);
  // Accessible name must reach links too (the rest props only fit <button>).
  const ariaLabel = rest["aria-label"];
  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        aria-label={ariaLabel}
        className={classes}
      >
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {inner}
    </button>
  );
}
