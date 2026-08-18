import { cn } from "@/lib/cn";

/**
 * SILBLOXX wordmark — built from the official vector
 * (Drive › Logos › `Logo_Silbloxx.svg`, also kept at
 * /public/brand/silbloxx-wordmark.svg for reference).
 *
 * The letterforms are the real outlines, not a font approximation. The "O" is
 * the brand's signature square-cornered box glyph; because it's geometrically
 * exact — a rectangle with a rectangular counter — it's rendered as a bordered
 * box rather than a path, which lets the footer lockup stretch it horizontally
 * without distorting the stroke weights.
 *
 * All measurements below are in the source artwork's own units, normalised
 * against the full mark height (20.406). Colour follows `currentColor`.
 * Size is driven by font-size: the mark stands exactly 1em tall.
 */

/** Full artwork height — the unit every other measurement is expressed against. */
const H = 20.406;

const U = {
  /** "SILBL" block: x 0.012 → 108.581 */
  silblW: 108.569 / H,
  /** "XX" block: x 149.469 → 206.711 */
  xxW: 57.242 / H,
  /** the O box: 37.812 wide × 19.7 tall, sitting 0.343 from the top */
  oW: 37.812 / H,
  oH: 19.7 / H,
  oTop: 0.343 / H,
  /** O stroke weights — vertical bars are noticeably heavier than the caps */
  oSide: 6.531 / H,
  oCap: 4.898 / H,
  /** optical gaps either side of the O */
  gapBefore: 1.845 / H,
  gapAfter: 1.231 / H,
};

const em = (n: number) => `${n.toFixed(4)}em`;

function Silbl() {
  return (
    <svg
      viewBox={`0.012 0 108.569 ${H}`}
      style={{ height: "1em", width: em(U.silblW) }}
      className="block shrink-0"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path
        d="M25.669,6.222v.266h-6.78c-.114-.77-.591-2.358-6.026-2.358h-.448c-5.053,0-5.41.874-5.41,1.7s.534,1.641,4.819,1.7l3.505.051c7.845.161,11.012,1.934,11.012,5.855v.37c0,3.256-1.737,6.6-12.219,6.6H12.191C1.276,20.392.013,15.943.013,13.346v-.3h6.8c.085,1.167.812,3.125,6.193,3.125h.392c5.5,0,6.111-1.033,6.111-2.089,0-1.137-.632-1.88-5.464-1.985l-3.588-.081C2.663,11.806.282,9.332.282,6.246V6.007C.282,3.068,2.157,0,11.629,0h1.936c9.863,0,12.1,3.256,12.1,6.223"
        transform="translate(-0.001 0)"
      />
      <path d="M36.564.37H30.033v19.7h6.531Z" transform="translate(-2.194 -0.027)" />
      <path
        d="M45.94.37V15.176H60.426v4.9H39.409V.37Z"
        transform="translate(-2.879 -0.027)"
      />
      <path
        d="M82.1.37c5.969,0,7.624,2.173,7.624,4.5v.373c0,2.543-2.3,3.581-3.306,3.841,1.427.343,4.484,1.507,4.484,4.951v.37c0,3.125-1.879,5.67-8.631,5.67H64.25V.379ZM70.777,7.733h10.2c1.822,0,2.271-.794,2.271-1.591V6.091c0-.824-.448-1.564-2.271-1.564h-10.2Zm0,8.058H81.54c2.185,0,2.577-1.14,2.577-1.934v-.107c0-.848-.42-1.826-2.577-1.826H70.777Z"
        transform="translate(-4.694 -0.027)"
      />
      <path
        d="M100.994.37V15.176h14.489v4.9H94.463V.37Z"
        transform="translate(-6.902 -0.027)"
      />
    </svg>
  );
}

function Xx() {
  return (
    <svg
      viewBox={`149.469 0 57.242 ${H}`}
      style={{ height: "1em", width: em(U.xxW) }}
      className="block shrink-0"
      fill="currentColor"
      aria-hidden
      focusable="false"
    >
      <path
        d="M170.22.37l5.887,5.775L181.99.37h8.015L180,9.986,190.23,20.073h-8.211l-6.389-6.115-6.335,6.115h-8.044l10.371-9.956L161.475.37Z"
        transform="translate(-11.782 -0.027)"
      />
      <path
        d="M200.706.37l5.883,5.775L212.476.37h8.015l-10,9.616,10.229,10.087H212.5l-6.392-6.115-6.332,6.115h-8.044l10.371-9.956L191.961.37Z"
        transform="translate(-14.009 -0.027)"
      />
    </svg>
  );
}

export function Wordmark({
  className,
  stretch = false,
}: {
  className?: string;
  /** Footer lockup: the O grows to fill the row instead of keeping its width. */
  stretch?: boolean;
}) {
  return (
    <span
      role="img"
      aria-label="Silbloxx"
      className={cn(
        "items-start leading-none",
        stretch ? "flex w-full" : "inline-flex",
        className,
      )}
    >
      <Silbl />

      <span
        aria-hidden
        className={cn("block shrink-0 border-current", stretch && "flex-1")}
        style={{
          height: em(U.oH),
          marginTop: em(U.oTop),
          marginLeft: em(U.gapBefore),
          marginRight: em(U.gapAfter),
          width: stretch ? undefined : em(U.oW),
          minWidth: stretch ? em(U.oW) : undefined,
          borderLeftWidth: em(U.oSide),
          borderRightWidth: em(U.oSide),
          borderTopWidth: em(U.oCap),
          borderBottomWidth: em(U.oCap),
          borderStyle: "solid",
          borderRadius: 0,
        }}
      />

      <Xx />
    </span>
  );
}
