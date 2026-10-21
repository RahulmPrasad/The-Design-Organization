import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { absoluteUrl, sitePages } from "@/lib/site";

// Required for the static export (next.config.ts `output: "export"`).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: MetadataRoute.Sitemap = sitePages.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    images: path === "/" ? [absoluteUrl("/images/projects/interior-wide-2.webp"), absoluteUrl("/images/projects/interior-wide-7.webp")] : undefined,
  }));
  const articles: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "yearly",
    priority: 0.6,
    images: [absoluteUrl(post.image.src)],
  }));
  return [...pages, ...articles];
}
