"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Label, Input, Textarea } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "@/components/ui/icons";

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

const EMPTY: Fields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const MESSAGES: Record<string, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter a valid email address.",
  phone: "Enter a phone number we can reach you on.",
};

/** Figma label: Gruppo 18/1.5, black. */
const LABEL = "text-[18px] leading-[1.5] text-ink";

/**
 * "Get in touch" form for the no-openings state — Figma
 * `Positions` (node 10394:1290) › Form (I10394:1290;10384:1100).
 *
 *   form     p 32, content 400 wide, gap 24 between rows, 16 before actions
 *   inputs   two-up rows with gap 24; label gap 8; field h 48, p 12, 1px black
 *   message  h 180 textarea
 *   button   full-width orange, Heading-6 "Get in Touch"
 *
 * Border is 4px rather than the Figma's 2px so it matches the job cards
 * (feedback 16.09 on the apply form, applied to both forms).
 *
 * Front-end only, like the apply form: validates, then shows a success state.
 * Inputs carry `name` attributes so it can be wired to email/CRM at go-live.
 */
export function GetInTouchForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const reduce = useReducedMotion();

  const set =
    (k: keyof Fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (!values.firstName.trim()) errs.firstName = true;
    if (!values.lastName.trim()) errs.lastName = true;
    if (!emailOk(values.email)) errs.email = true;
    if (!values.phone.trim()) errs.phone = true;
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      return;
    }
    document.getElementById(`git-${Object.keys(errs)[0]}`)?.focus();
  };

  const field = (
    k: Exclude<keyof Fields, "message">,
    label: string,
    type: string,
    autoComplete: string,
  ) => (
    <div className="flex min-w-px flex-1 flex-col gap-2">
      <Label htmlFor={`git-${k}`} required className={`mb-0 ${LABEL}`}>
        {label}
      </Label>
      <Input
        id={`git-${k}`}
        name={k}
        type={type}
        value={values[k]}
        onChange={set(k)}
        autoComplete={autoComplete}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `git-${k}-err` : undefined}
        className="h-12 p-3"
      />
      {errors[k] && (
        <p id={`git-${k}-err`} className="text-[13px] leading-[1.4] text-ink">
          {MESSAGES[k]}
        </p>
      )}
    </div>
  );

  return (
    <div className="w-full border-[4px] border-ink bg-paper p-6 sm:p-8 lg:w-auto lg:shrink-0">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-6 text-center lg:w-[400px]"
            role="status"
          >
            <div className="mx-auto grid h-12 w-12 place-items-center bg-orange text-paper">
              <ArrowUpRight width={22} height={22} />
            </div>
            <h3 className="h5 mt-5 text-ink">Thanks — we&apos;ve got your details.</h3>
            <p className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.5] text-muted">
              We&apos;ll be in touch when a suitable opportunity comes up.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={false}
            aria-label="Get in touch"
            className="flex w-full flex-col gap-4 lg:w-[400px]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                {field("firstName", "First name", "text", "given-name")}
                {field("lastName", "Last name", "text", "family-name")}
              </div>
              <div className="flex flex-col gap-6 sm:flex-row">
                {field("email", "Email", "email", "email")}
                {field("phone", "Phone number", "tel", "tel")}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="git-message" className={`mb-0 ${LABEL}`}>
                  Message
                </Label>
                <Textarea
                  id="git-message"
                  name="message"
                  placeholder="Type your message..."
                  value={values.message}
                  onChange={set("message")}
                  className="h-[180px] p-3 text-[16px] placeholder:text-ink/60"
                />
              </div>
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
