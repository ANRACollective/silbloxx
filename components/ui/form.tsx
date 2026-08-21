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
      className={cn("mb-2 block text-[14px] text-muted", className)}
    >
      {children}
      {required && <span className="text-orange">*</span>}
    </label>
  );
}

const fieldBase =
  "w-full rounded-none border border-ink bg-paper px-4 py-3 text-[15px] text-ink " +
  "placeholder:text-ink/35 outline-none transition-[border-color,box-shadow] duration-200 " +
  "focus:border-orange focus:ring-2 focus:ring-orange/30 focus:ring-offset-0 " +
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
