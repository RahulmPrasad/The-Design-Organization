import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const defaultOgImage = {
  url: "/images/projects/interior-wide-2.webp",
  width: 1600,
  height: 1000,
  alt: `Living room interior designed by ${siteName}`,
};

/**
 * Title, description, canonical URL and social cards for one page.
 * A page's `openGraph` replaces the layout's rather than merging with it, so each page sets the full set.
 */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const socialTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    // Set per page rather than in the layout, so the 404 page carries only Next.js's own "noindex".
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: { type: "website", locale: "en_IN", siteName, url: path, title: socialTitle, description, images: [defaultOgImage] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [defaultOgImage.url] },
  };
}
