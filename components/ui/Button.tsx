import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-display leading-none " +
  "transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-brand)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-paper will-change-transform select-none";

/**
 * The Figma sets every button label at Heading-6 (20px). At that size a button
 * competes with the section headings around it, which is part of why the page
 * read as loud. Labels step down to 16px with a little tracking, and the boxes
 * gain horizontal room — a wider, quieter button reads as more considered than
 * a tight, shouty one.
 */
const sizes: Record<Size, string> = {
  sm: "px-[22px] py-[13px] text-[15px] tracking-[0.02em] leading-none",
  md: "px-[28px] py-[16px] text-[16px] tracking-[0.02em] leading-none",
  lg: "px-[32px] py-[18px] text-[16px] tracking-[0.02em] leading-none",
};

/**
 * Colour discipline: orange marks the single primary action in a view. Every
 * other control is ink or hairline, so the one orange thing on screen actually
 * means something. Hover lifts are 2px, not 4 — enough to feel responsive,
 * not enough to draw the eye away from the content.
 */
const variants: Record<Variant, string> = {
  primary:
    "border border-orange bg-orange text-paper hover:-translate-y-[2px] hover:shadow-[0_12px_28px_-14px_rgba(255,46,0,0.65)] active:translate-y-0",
  secondary:
    "border border-line text-ink bg-transparent hover:border-ink hover:-translate-y-[2px] active:translate-y-0",
  dark: "bg-ink text-paper hover:-translate-y-[2px] hover:bg-[#1b1b1b] active:translate-y-0",
  ghost: "text-ink px-0 py-0 hover:text-orange",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  iconLeft,
  iconRight,
  children,
  ...rest
}: CommonProps &
  ({ href: string } | { href?: undefined }) &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
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
