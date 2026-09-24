import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <Container className="flex flex-col items-start gap-6 py-28">
          <h1 className="h1 text-ink">Page not found</h1>
          <p className="max-w-[560px] text-[18px] leading-[1.5] text-ink">
            The page you&apos;re looking for doesn&apos;t exist or the role is no longer
            open.
          </p>
          <Button href="/#open-positions">View Open Positions</Button>
        </Container>
      </main>
      <Footer />
    </>
  );
}
