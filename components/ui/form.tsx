"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { isValidCv } from "@/lib/validation";

type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
};

export function Label({ children, htmlFor, required = false, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("mb-2 block text-[14px] text-muted", className)}
    >
      {children}
      {required && (
        <span aria-hidden className="text-orange">
          *
        </span>
      )}
    </label>
  );
}

const FIELD =
  "w-full rounded-none border border-ink bg-paper px-4 py-3 text-[15px] text-ink outline-none " +
  "transition-[border-color,box-shadow] duration-200 placeholder:text-ink/35 " +
  "focus:border-orange focus:ring-2 focus:ring-orange/30 aria-invalid:border-orange";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(FIELD, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={cn(FIELD, "min-h-[132px] resize-y", className)} {...props} />
  );
}

type FieldErrorProps = {
  id: string;
  children: React.ReactNode;
};

/** Inline validation message, referenced by the field's `aria-describedby`. */
export function FieldError({ id, children }: FieldErrorProps) {
  return (
    <p id={id} className="mt-1.5 text-[13px] leading-[1.4] text-ink">
      {children}
    </p>
  );
}

type CvUploadProps = {
  /** Base id; the visible trigger button is `${id}-trigger`. */
  id: string;
  name: string;
  label: string;
  file: File | null;
  /** Called with the chosen file, or `null` if it is not a valid PDF. */
  onChange: (file: File | null) => void;
  error?: string;
  labelClassName?: string;
};

/**
 * PDF upload styled as a full-width button. The native file input is kept
 * visually hidden but remains part of the form for submission.
 */
export function CvUpload({
  id,
  name,
  label,
  file,
  onChange,
  error,
  labelClassName,
}: CvUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerId = `${id}-trigger`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;

  return (
    <div>
      <Label htmlFor={triggerId} required className={labelClassName}>
        {label}
      </Label>
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="file"
        accept="application/pdf"
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => {
          const chosen = event.target.files?.[0] ?? null;
          onChange(chosen && isValidCv(chosen) ? chosen : null);
        }}
      />
      <button
        type="button"
        id={triggerId}
        aria-describedby={error ? errorId : hintId}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex w-full items-center justify-center border px-4 py-3 font-display text-[14px] text-ink hover:bg-ink hover:text-paper",
          error ? "border-orange" : "border-ink",
        )}
      >
        <span className="truncate">{file ? file.name : "Upload"}</span>
      </button>
      {error ? (
        <FieldError id={errorId}>{error}</FieldError>
      ) : (
        <p id={hintId} className="mt-1.5 text-[12px] text-muted">
          PDF, max 5MB.
        </p>
      )}
    </div>
  );
}
