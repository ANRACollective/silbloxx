import Image from "next/image";
import { cn } from "@/lib/cn";

/** BRIAM Group logo (official screen-positive vector). */
export function BriamMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/briam-logo.svg"
      alt="BRIAM Group"
      width={116}
      height={39}
      className={cn("block h-[39px] w-auto", className)}
    />
  );
}
