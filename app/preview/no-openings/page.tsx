import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { NoOpenings } from "@/components/sections/NoOpenings";

/**
 * Review page for the "no open positions" state, which the homepage shows
 * automatically when the job list is empty. Not linked from the site and
 * excluded from search engines. Remove `app/preview/` when no longer needed.
 */
export const metadata: Metadata = {
  title: "Preview: no open positions",
  robots: { index: false, follow: false },
};

export default function NoOpeningsPreviewPage() {
  return (
    <>
      <Navbar />
      <main>
        <p className="border-b-4 border-ink bg-yellow px-4 py-3 text-center font-display text-[16px] text-ink">
          Preview — how the Open Positions section looks when no roles are listed.
        </p>
        <NoOpenings />
      </main>
      <Footer />
    </>
  );
}
