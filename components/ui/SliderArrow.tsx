import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type SliderArrowProps = {
  direction: "left" | "right";
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

/** Round previous/next control: orange when active, grey when disabled. */
export function SliderArrow({
  direction,
  disabled = false,
  onClick,
  className,
}: SliderArrowProps) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  return (
    <button
      type="button"
      aria-label={direction === "left" ? "Previous roles" : "Next roles"}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "grid place-items-center rounded-full p-3 text-paper",
        disabled ? "cursor-not-allowed bg-graybrand" : "bg-orange",
        className,
      )}
    >
      <Icon width={24} height={24} />
    </button>
  );
}
