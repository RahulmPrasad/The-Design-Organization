import type { MetadataRoute } from "next";
import { absoluteUrl, sitePages } from "@/lib/site";

// Required for the static export (next.config.ts `output: "export"`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return sitePages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    images: path === "/" ? [absoluteUrl("/images/projects/interior-wide-2.webp"), absoluteUrl("/images/projects/interior-wide-7.webp")] : undefined,
  }));
}
