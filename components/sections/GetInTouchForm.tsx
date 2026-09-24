"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FormSuccess } from "@/components/sections/FormSuccess";
import { Button } from "@/components/ui/Button";
import { CvUpload, FieldError, Input, Label, Textarea } from "@/components/ui/form";
import { isEmail, isFilled } from "@/lib/validation";

type TextField = "firstName" | "lastName" | "email" | "phone" | "message";
type RequiredField = Exclude<TextField, "message">;
type ErrorKey = RequiredField | "cv";

const EMPTY: Record<TextField, string> = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const MESSAGES: Record<ErrorKey, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter a valid email address.",
  phone: "Enter a phone number we can reach you on.",
  cv: "Attach your CV as a PDF (max 5MB).",
};

const LABEL = "mb-2 text-[18px] leading-[1.5] text-ink";

/**
 * General enquiry form shown when there are no open roles (Figma "Positions",
 * no-openings variant). Deliberately lighter than the job application form:
 * no heading, LinkedIn field or consent line, and a 2px frame.
 * Validates on the client; submission is not yet connected to a back end.
 */
export function GetInTouchForm() {
  const [values, setValues] = useState(EMPTY);
  const [cv, setCv] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, true>>>({});
  const [sent, setSent] = useState(false);

  const id = (name: string) => `enquiry-${name}`;

  const clearError = (key: ErrorKey) => setErrors(({ [key]: _removed, ...rest }) => rest);

  const update =
    (field: TextField) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      if (field !== "message") clearError(field);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const found: Partial<Record<ErrorKey, true>> = {};
    if (!isFilled(values.firstName)) found.firstName = true;
    if (!isFilled(values.lastName)) found.lastName = true;
    if (!isEmail(values.email)) found.email = true;
    if (!isFilled(values.phone)) found.phone = true;
    if (!cv) found.cv = true;
    setErrors(found);

    const [first] = Object.keys(found) as ErrorKey[];
    if (!first) {
      setSent(true);
      return;
    }
    // Move focus to the first invalid field.
    document.getElementById(first === "cv" ? `${id("cv")}-trigger` : id(first))?.focus();
  };

  const textInput = (
    field: RequiredField,
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <div className="min-w-px flex-1">
      <Label htmlFor={id(field)} required className={LABEL}>
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
        className="h-12 p-3"
      />
      {errors[field] && (
        <FieldError id={id(`${field}-error`)}>{MESSAGES[field]}</FieldError>
      )}
    </div>
  );

  return (
    <div className="w-full border-2 border-ink bg-paper p-6 sm:p-8 lg:w-auto lg:shrink-0">
      <AnimatePresence mode="wait">
        {sent ? (
          <FormSuccess
            key="sent"
            title="Thanks — we've got your details."
            className="lg:w-[400px]"
          >
            We&apos;ll be in touch when a suitable opportunity comes up.
          </FormSuccess>
        ) : (
          <motion.form
            key="form"
            noValidate
            initial={false}
            onSubmit={handleSubmit}
            aria-label="Get in touch"
            className="flex w-full flex-col gap-4 lg:w-[400px]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                {textInput("firstName", "First name", "text", "given-name")}
                {textInput("lastName", "Last name", "text", "family-name")}
              </div>
              <div className="flex flex-col gap-6 sm:flex-row">
                {textInput("email", "Email", "email", "email")}
                {textInput("phone", "Phone number", "tel", "tel")}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <Label htmlFor={id("message")} className={LABEL}>
                  Message
                </Label>
                <Textarea
                  id={id("message")}
                  name="message"
                  placeholder="Type your message..."
                  value={values.message}
                  onChange={update("message")}
                  className="h-[180px] p-3 text-[16px] placeholder:text-ink/60"
                />
              </div>

              <CvUpload
                id={id("cv")}
                name="cv"
                label="Upload your CV (PDF)"
                labelClassName={LABEL}
                file={cv}
                error={errors.cv ? MESSAGES.cv : undefined}
                onChange={(file) => {
                  setCv(file);
                  if (file) clearError("cv");
                }}
              />

              <Button type="submit" size="sm" className="w-full">
                Get in Touch
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
