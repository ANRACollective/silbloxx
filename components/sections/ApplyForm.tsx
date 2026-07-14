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
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <div className="border border-ink bg-paper p-6 lg:p-8">
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
            <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.5] text-muted">
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
            <div>
              <h3 className="font-display text-[20px] leading-none tracking-[-0.01em] text-ink">
                Interested in this opportunity?
              </h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-muted">
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
                  autoComplete="given-name"
                />
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
                  autoComplete="family-name"
                />
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
                  autoComplete="email"
                />
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
                  autoComplete="tel"
                />
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
                onClick={() => fileRef.current?.click()}
                className={cn(
                  "flex w-full items-center justify-center border px-4 py-3 font-display text-[14px] text-ink transition-colors hover:bg-ink hover:text-paper",
                  errors.file ? "border-orange" : "border-ink",
                )}
              >
                {file ? file.name : "Upload"}
              </button>
              <p className="mt-1.5 text-[12px] text-muted">PDF, max 5MB.</p>
            </div>

            {/* consent (required per brief) */}
            <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-muted">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  setErrors((x) => ({ ...x, consent: false }));
                }}
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 appearance-none border bg-paper checked:bg-orange",
                  errors.consent ? "border-orange" : "border-ink",
                )}
              />
              <span>
                I agree to Silbloxx Asia processing my data for this application,
                in line with the privacy policy.
              </span>
            </label>

            <button
              type="submit"
              className="w-full bg-orange px-6 py-3.5 font-display text-[15px] text-paper transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(255,46,0,0.6)]"
            >
              Submit application
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
