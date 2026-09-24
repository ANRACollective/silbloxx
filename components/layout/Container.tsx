import { cn } from "@/lib/cn";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

/** Page-width wrapper with the design's side gutters: 20px mobile, 40px tablet, 64px desktop. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16", className)}
    >
      {children}
    </div>
  );
}
