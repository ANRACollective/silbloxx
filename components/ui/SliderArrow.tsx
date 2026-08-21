"use client";

import { ArrowLeft, ArrowRight } from "./icons";
import { cn } from "@/lib/cn";

/** Circular carousel control — orange when active, grey when disabled. */
export function SliderArrow({
  direction,
  disabled = false,
  onClick,
  className,
}: {
  direction: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous" : "Next"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        // Hairline circle rather than a filled orange disc — a pager control
        // isn't the primary action on the page and shouldn't be coloured like
        // one. Ink on hover gives it presence only when reached for.
        "grid place-items-center rounded-full border p-[12px] transition-[border-color,color,background-color] duration-300 ease-[var(--ease-brand)]",
        disabled
          ? "cursor-not-allowed border-hairline text-hairline-strong"
          : "border-line text-ink hover:border-ink hover:bg-ink hover:text-paper",
        className,
      )}
    >
      <Icon width={24} height={24} />
    </button>
  );
}
