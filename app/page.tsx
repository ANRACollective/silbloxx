import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Positions } from "@/components/sections/Positions";
import { WhyWorkHere } from "@/components/sections/WhyWorkHere";
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
