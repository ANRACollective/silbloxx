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
        // Figma SliderArrow: p 12 around a 24px icon, fully rounded.
        "grid place-items-center rounded-full p-[12px]",
        disabled
          ? "cursor-not-allowed bg-graybrand text-paper"
          : "bg-orange text-paper",
        className,
      )}
    >
      <Icon width={24} height={24} />
    </button>
  );
}
