import type { MetadataRoute } from "next";
import { JOBS } from "@/lib/jobs";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    ...JOBS.map((job) => ({
      url: `${SITE_URL}/jobs/${job.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
