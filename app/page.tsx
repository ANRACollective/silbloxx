import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyWorkHere } from "@/components/sections/WhyWorkHere";
import { Positions } from "@/components/sections/Positions";
import { JOBS } from "@/lib/jobs";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyWorkHere />
        <Positions jobs={JOBS} />
      </main>
      <Footer />
    </>
  );
}
