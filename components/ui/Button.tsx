import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "sm" | "md";

const BASE =
  "inline-flex select-none items-center justify-center gap-2 font-display leading-[1.4] " +
  "focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-paper focus-visible:outline-none";

/** `md`: standard button. `sm`: compact full-width button used inside job cards. */
const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-[20px]",
  md: "px-[18px] py-3 text-[20px]",
};

/** Colour-only hover states; `hover:` applies to hover-capable pointers only. */
const VARIANTS: Record<Variant, string> = {
  primary: "border border-orange bg-orange text-paper",
  secondary: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-paper",
};

/** Hover lift, reserved for the job cards' "Apply Now" action. */
const LIFT =
  "transition-[translate,box-shadow] duration-300 ease-(--ease-brand) " +
  "hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgb(255_46_0/0.55)] active:translate-y-0";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  /** Adds the hover lift. */
  lift?: boolean;
  className?: string;
  children: React.ReactNode;
};

type LinkButtonProps = StyleProps & {
  href: string;
  /** Opens the link in a new tab. */
  external?: boolean;
  "aria-label"?: string;
};

type NativeButtonProps = StyleProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", lift = false, className, children } = props;
  const classes = cn(BASE, SIZES[size], VARIANTS[variant], lift && LIFT, className);

  if (props.href !== undefined) {
    const { href, external = false, "aria-label": ariaLabel } = props;

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    size: _size,
    lift: _lift,
    className: _className,
    children: _children,
    href: _href,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
