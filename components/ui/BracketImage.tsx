import Image from "next/image";
import { Bracket, type BracketCorner } from "@/components/ui/Bracket";
import { cn } from "@/lib/cn";

/** Arm thickness of the bracket artwork within its 80-unit box. */
const ARM_RATIO = 24.67 / 80;

type BracketImageProps = {
  src: string;
  alt: string;
  /** Rendered image widths, forwarded to `next/image` `sizes`. */
  sizes: string;
  /** Corners that receive a bracket accent. */
  corners?: readonly BracketCorner[];
  /** Bracket edge length in px. */
  bracket?: number;
  /** Focal point of the crop (CSS `object-position`), e.g. `"50% 30%"`. */
  position?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
};

/**
 * Photograph with the brand's L-bracket corner accents.
 *
 * Each bracket overhangs the photo by exactly its arm thickness, so the inside
 * corner of the L sits on the corner of the image at any bracket size. The
 * wrapper's `className` sets the frame's size and aspect ratio; `position`
 * chooses which part of the photo survives the crop.
 */
export function BracketImage({
  src,
  alt,
  sizes,
  corners = ["tr", "bl"],
  bracket = 80,
  position,
  priority = false,
  className,
  imageClassName,
}: BracketImageProps) {
  const overhang = -bracket * ARM_RATIO;

  return (
    <div className={cn("relative", className)}>
      <div className="relative size-full overflow-hidden bg-ink">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("photo-grade object-cover", imageClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      </div>

      {corners.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            width: bracket,
            height: bracket,
            ...(corner.startsWith("t") ? { top: overhang } : { bottom: overhang }),
            ...(corner.endsWith("l") ? { left: overhang } : { right: overhang }),
          }}
        >
          <Bracket corner={corner} size={bracket} className="size-full" />
        </span>
      ))}
    </div>
  );
}
