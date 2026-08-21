"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Label, Input, Textarea } from "@/components/ui/form";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  message: string;
};

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedin: "",
  message: "",
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Text shown under an invalid field. Colour alone can't carry the error. */
const MESSAGES: Record<string, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter a valid email address.",
  phone: "Enter a phone number we can reach you on.",
  file: "Attach your CV as a PDF.",
  consent: "Please accept the privacy statement to continue.",
};

/** Inline error message. Text, not just an orange border. */
function FieldError({
  show,
  field,
  errId,
}: {
  show?: boolean;
  field: string;
  errId: string;
}) {
  if (!show) return null;
  return (
    <p id={errId} className="mt-1.5 text-[13px] leading-[1.4] text-ink">
      {MESSAGES[field]}
    </p>
  );
}

/**
 * Inline apply form. Front-end only (per project scope): validates required
 * fields + CV, then shows a success state and offers the careers inbox as a
 * fallback. Wire to an email/handler at go-live.
 */
export function ApplyForm({
  roleTitle,
  idPrefix = "",
}: {
  roleTitle: string;
  idPrefix?: string;
}) {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const reduce = useReducedMotion();
  const id = (n: string) => `${idPrefix}${n}`;

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!values.firstName.trim()) errs.firstName = true;
    if (!values.lastName.trim()) errs.lastName = true;
    if (!emailOk(values.email)) errs.email = true;
    if (!values.phone.trim()) errs.phone = true;
    if (!file) errs.file = true;
    if (!consent) errs.consent = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      return;
    }
    // Move focus to the first problem so keyboard and screen-reader users
    // land on it rather than being left at the submit button.
    const first = Object.keys(errs)[0];
    document.getElementById(id(first === "file" ? "cvTrigger" : first))?.focus();
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="border border-hairline bg-paper p-7 lg:p-9">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 text-center"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center bg-orange text-paper">
              <ArrowUpRight width={22} height={22} />
            </div>
            <h3 className="h5 mt-5 text-ink">Application received.</h3>
            <p className="mx-auto mt-4 max-w-[320px] text-[16px] leading-[1.65] text-body">
              Thanks — your application for {roleTitle} is in. Our People team
              will be in touch shortly with a fast, discreet follow-up.
            </p>
            <a
              href="mailto:careers.asia@silbloxx.com"
              className="mt-4 inline-block text-[14px] text-orange underline underline-offset-2"
            >
              careers.asia@silbloxx.com
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            className="space-y-5"
          >
            <div
              aria-live="polite"
              className={errorCount ? "border border-ink bg-yellow px-4 py-3 text-[14px] leading-[1.45] text-ink" : "sr-only"}
            >
              {errorCount
                ? `Your application couldn't be sent — ${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention below.`
                : ""}
            </div>

            <div>
              <h3 className="font-display text-[20px] leading-[1.3] text-ink">
                Interested in this opportunity?
              </h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-body">
                Send us your CV and a short note. You can expect a fast and
                discreet follow-up.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor={id("firstName")} required>
                  First name
                </Label>
                <Input
                  id={id("firstName")}
                  value={values.firstName}
                  onChange={set("firstName")}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? id("firstName-err") : undefined}
                  autoComplete="given-name"
                />
                <FieldError show={errors.firstName} field="firstName" errId={id("firstName-err")} />
              </div>
              <div>
                <Label htmlFor={id("lastName")} required>
                  Last name
                </Label>
                <Input
                  id={id("lastName")}
                  value={values.lastName}
                  onChange={set("lastName")}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? id("lastName-err") : undefined}
                  autoComplete="family-name"
                />
                <FieldError show={errors.lastName} field="lastName" errId={id("lastName-err")} />
              </div>
              <div>
                <Label htmlFor={id("email")} required>
                  Email
                </Label>
                <Input
                  id={id("email")}
                  type="email"
                  value={values.email}
                  onChange={set("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? id("email-err") : undefined}
                  autoComplete="email"
                />
                <FieldError show={errors.email} field="email" errId={id("email-err")} />
              </div>
              <div>
                <Label htmlFor={id("phone")} required>
                  Phone number
                </Label>
                <Input
                  id={id("phone")}
                  type="tel"
                  value={values.phone}
                  onChange={set("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? id("phone-err") : undefined}
                  autoComplete="tel"
                />
                <FieldError show={errors.phone} field="phone" errId={id("phone-err")} />
              </div>
            </div>

            <div>
              <Label htmlFor={id("linkedin")}>LinkedIn (optional)</Label>
              <Input
                id={id("linkedin")}
                value={values.linkedin}
                onChange={set("linkedin")}
                inputMode="url"
              />
            </div>

            <div>
              <Label htmlFor={id("message")}>Tell us about yourself</Label>
              <Textarea
                id={id("message")}
                placeholder="Type your message..."
                value={values.message}
                onChange={set("message")}
              />
            </div>

            {/* CV upload */}
            <div>
              <Label required>Upload your CV (PDF)</Label>
              <input
                ref={fileRef}
                id={id("cv")}
                type="file"
                accept="application/pdf"
                className="sr-only"
                onChange={(e) => {
                  setFile(e.target.files?.[0] ?? null);
                  setErrors((x) => ({ ...x, file: false }));
                }}
              />
              <button
                type="button"
                id={id("cvTrigger")}
                aria-describedby={errors.file ? id("file-err") : undefined}
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "flex w-full items-center justify-center border px-4 py-3.5 font-display text-[15px] tracking-[0.02em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper",
                  errors.file ? "border-orange" : "border-line",
                )}
              >
                {file ? file.name : "Upload"}
              </button>
              <p className="mt-2 text-[13px] text-muted">PDF, max 5MB.</p>
              <FieldError show={errors.file} field="file" errId={id("file-err")} />
            </div>

            {/* consent (required per brief) */}
            <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-[1.6] text-muted">
              <input
                type="checkbox"
                checked={consent}
                id={id("consent")}
                aria-describedby={errors.consent ? id("consent-err") : undefined}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((x) => ({ ...x, consent: false }));
                }}
                className={cn(
                  "mt-0.5 h-[18px] w-[18px] shrink-0 appearance-none border bg-paper transition-colors checked:border-ink checked:bg-ink",
                  errors.consent ? "border-orange" : "border-line",
                )}
              />
              <span>
                I agree to Silbloxx Asia processing my data for this application,
                in line with the privacy policy.
              </span>
            </label>
            <FieldError
              show={errors.consent}
              field="consent"
              errId={id("consent-err")}
            />

            <button
              type="submit"
              className="w-full bg-orange px-6 py-4 font-display text-[16px] tracking-[0.02em] text-paper transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_-14px_rgba(255,46,0,0.65)]"
            >
              Submit application
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
