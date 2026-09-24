"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FormSuccess } from "@/components/sections/FormSuccess";
import { CvUpload, FieldError, Input, Label, Textarea } from "@/components/ui/form";
import { CAREERS_EMAIL, EXTERNAL_LINKS } from "@/lib/site";
import { isEmail, isFilled } from "@/lib/validation";

type TextField = "firstName" | "lastName" | "email" | "phone" | "linkedin" | "message";
type ErrorKey = "firstName" | "lastName" | "email" | "phone" | "cv" | "consent";

const EMPTY: Record<TextField, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  linkedin: "",
  message: "",
};

const MESSAGES: Record<ErrorKey, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter a valid email address.",
  phone: "Enter a phone number we can reach you on.",
  cv: "Attach your CV as a PDF (max 5MB).",
  consent: "Please confirm you agree before submitting.",
};

type ApplyFormProps = {
  roleTitle: string;
  /** Prefix for element ids; the form is rendered twice (mobile and desktop). */
  idPrefix: string;
};

/**
 * Job application form. Validates on the client and shows a confirmation.
 * Submission is not yet connected to a back end.
 */
export function ApplyForm({ roleTitle, idPrefix }: ApplyFormProps) {
  const [values, setValues] = useState(EMPTY);
  const [cv, setCv] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, true>>>({});
  const [sent, setSent] = useState(false);

  const id = (name: string) => `${idPrefix}apply-${name}`;

  const clearError = (key: ErrorKey) => setErrors(({ [key]: _removed, ...rest }) => rest);

  const update =
    (field: TextField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      if (field !== "linkedin" && field !== "message") clearError(field);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found: Partial<Record<ErrorKey, true>> = {};
    if (!isFilled(values.firstName)) found.firstName = true;
    if (!isFilled(values.lastName)) found.lastName = true;
    if (!isEmail(values.email)) found.email = true;
    if (!isFilled(values.phone)) found.phone = true;
    if (!cv) found.cv = true;
    if (!consent) found.consent = true;
    setErrors(found);

    const [first] = Object.keys(found) as ErrorKey[];
    if (!first) {
      setSent(true);
      return;
    }
    // Move focus to the first invalid field.
    document.getElementById(first === "cv" ? `${id("cv")}-trigger` : id(first))?.focus();
  };

  const errorCount = Object.keys(errors).length;

  const textInput = (
    field: "firstName" | "lastName" | "email" | "phone",
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <div>
      <Label htmlFor={id(field)} required>
        {label}
      </Label>
      <Input
        id={id(field)}
        name={field}
        type={type}
        autoComplete={autoComplete}
        value={values[field]}
        onChange={update(field)}
        aria-invalid={errors[field] ?? false}
        aria-describedby={errors[field] ? id(`${field}-error`) : undefined}
      />
      {errors[field] && (
        <FieldError id={id(`${field}-error`)}>{MESSAGES[field]}</FieldError>
      )}
    </div>
  );

  return (
    <div className="border-4 border-ink bg-paper p-6 lg:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <FormSuccess key="sent" title="Application received.">
            Thanks — your application for {roleTitle} is in. Our People team will be in
            touch shortly with a fast, discreet follow-up.
            <a
              href={`mailto:${CAREERS_EMAIL}`}
              className="mt-4 block text-[14px] text-orange underline underline-offset-2"
            >
              {CAREERS_EMAIL}
            </a>
          </FormSuccess>
        ) : (
          <motion.form
            key="form"
            noValidate
            initial={false}
            onSubmit={handleSubmit}
            aria-label={`Apply for ${roleTitle}`}
            className="space-y-5"
          >
            <div
              aria-live="polite"
              className={
                errorCount > 0
                  ? "border border-ink bg-yellow px-4 py-3 text-[14px] leading-[1.45] text-ink"
                  : "sr-only"
              }
            >
              {errorCount > 0 &&
                `Your application couldn't be sent — ${errorCount} ${
                  errorCount === 1 ? "field needs" : "fields need"
                } attention below.`}
            </div>

            <div>
              <h3 className="font-display text-[20px] leading-none text-ink">
                Interested in this opportunity?
              </h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-muted">
                Send us your CV and a short note. You can expect a fast and discreet
                follow-up.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {textInput("firstName", "First name", "text", "given-name")}
              {textInput("lastName", "Last name", "text", "family-name")}
              {textInput("email", "Email", "email", "email")}
              {textInput("phone", "Phone number", "tel", "tel")}
            </div>

            <div>
              <Label htmlFor={id("linkedin")}>LinkedIn (optional)</Label>
              <Input
                id={id("linkedin")}
                name="linkedin"
                type="url"
                inputMode="url"
                value={values.linkedin}
                onChange={update("linkedin")}
              />
            </div>

            <div>
              <Label htmlFor={id("message")}>Tell us about yourself</Label>
              <Textarea
                id={id("message")}
                name="message"
                placeholder="Type your message..."
                value={values.message}
                onChange={update("message")}
              />
            </div>

            <CvUpload
              id={id("cv")}
              name="cv"
              label="Upload your CV (PDF)"
              file={cv}
              error={errors.cv ? MESSAGES.cv : undefined}
              onChange={(file) => {
                setCv(file);
                if (file) clearError("cv");
              }}
            />

            <div>
              <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-muted">
                <input
                  type="checkbox"
                  id={id("consent")}
                  name="consent"
                  checked={consent}
                  aria-invalid={errors.consent ?? false}
                  aria-describedby={errors.consent ? id("consent-error") : undefined}
                  onChange={(event) => {
                    setConsent(event.target.checked);
                    clearError("consent");
                  }}
                  className="mt-0.5 size-4 shrink-0 appearance-none border border-ink bg-paper checked:bg-orange aria-invalid:border-orange"
                />
                <span>
                  I agree to Silbloxx Asia processing my data for this application, in
                  line with the{" "}
                  <a
                    href={EXTERNAL_LINKS.terms}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                  >
                    terms and conditions
                  </a>
                  .
                </span>
              </label>
              {errors.consent && (
                <FieldError id={id("consent-error")}>{MESSAGES.consent}</FieldError>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-orange px-6 py-3.5 font-display text-[15px] text-paper"
            >
              Submit application
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
