import { cn } from "@/lib/cn";

export function Label({
  children,
  htmlFor,
  required,
  className,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("label mb-2.5 block", className)}
    >
      {children}
      {required && <span className="text-orange">*</span>}
    </label>
  );
}

/**
 * Fields sit on a hairline rather than a full black box. A form of eight
 * black-outlined inputs reads as a bureaucratic document; hairlines with an ink
 * focus state read as considered, and the focus ring still lands clearly.
 */
const fieldBase =
  "w-full rounded-none border border-line bg-paper px-4 py-3.5 text-[16px] text-ink " +
  "placeholder:text-muted outline-none transition-[border-color,box-shadow] duration-300 ease-out " +
  "hover:border-ink/50 focus:border-ink focus:ring-1 focus:ring-ink/15 focus:ring-offset-0 " +
  "aria-[invalid=true]:border-orange";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(fieldBase, "min-h-[132px] resize-y", className)}
      {...props}
    />
  );
}
