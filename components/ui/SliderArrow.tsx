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
        "grid h-11 w-11 place-items-center rounded-full transition-[transform,background-color] duration-300 ease-[var(--ease-brand)]",
        disabled
          ? "cursor-not-allowed bg-graybrand text-paper"
          : "bg-orange text-paper hover:scale-105 active:scale-95",
        className,
      )}
    >
      <Icon width={18} height={18} />
    </button>
  );
}
