import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { JobDetail } from "@/components/sections/JobDetail";
import { getJob, JOBS } from "@/lib/jobs";

type JobPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};

  return {
    title: job.title,
    description: job.intro,
    alternates: { canonical: `/jobs/${job.slug}` },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <>
      <Navbar />
      <main>
        <JobDetail job={job} />
      </main>
      <Footer />
    </>
  );
}
