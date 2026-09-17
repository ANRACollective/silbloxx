import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { NoOpenings } from "@/components/sections/Positions";

/**
 * TEMPORARY review page (boss, 16.09): shows the Open Positions empty state
 * — what the homepage renders when `JOBS` is empty — without touching the
 * live job list. Not linked from anywhere and kept out of search engines.
 * Delete this folder (app/preview) once the empty state is signed off.
 */
export const metadata: Metadata = {
  title: "Preview — no open positions",
  robots: { index: false, follow: false },
};

export default function NoOpeningsPreview() {
  return (
    <>
      <Navbar />
      <main>
        <div className="border-b-4 border-ink bg-yellow px-4 py-3 text-center font-display text-[16px] text-ink">
          Preview only — this is how Open Positions looks when no roles are
          listed.
        </div>
        <NoOpenings />
      </main>
      <Footer />
    </>
  );
}
