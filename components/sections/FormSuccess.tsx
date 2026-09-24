"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type FormSuccessProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

/** Confirmation shown in place of a form once it has been submitted. */
export function FormSuccess({ title, children, className }: FormSuccessProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      role="status"
      initial={{ opacity: 0, y: reduce ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("py-6 text-center", className)}
    >
      <div className="mx-auto grid size-12 place-items-center bg-orange text-paper">
        <ArrowUpRight width={22} height={22} />
      </div>
      <h3 className="h5 mt-5 text-ink">{title}</h3>
      <div className="mx-auto mt-3 max-w-[320px] text-[15px] leading-[1.5] text-muted">
        {children}
      </div>
    </motion.div>
  );
}
