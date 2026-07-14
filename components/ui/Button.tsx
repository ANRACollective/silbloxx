import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-display leading-none " +
  "transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-[var(--ease-brand)] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-paper will-change-transform select-none";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[14px] tracking-[0.01em]",
  lg: "px-7 py-4 text-[15px] tracking-[0.01em]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-paper hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(255,46,0,0.55)] active:translate-y-0",
  secondary:
    "border border-ink text-ink bg-transparent hover:bg-ink hover:text-paper hover:-translate-y-0.5 active:translate-y-0",
  dark: "bg-ink text-paper hover:-translate-y-0.5 hover:bg-[#1b1b1b] active:translate-y-0",
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
