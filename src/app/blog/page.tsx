import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { city, siteName, siteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `Home Interior Ideas & Design Tips for ${city} Homes`,
  description: `Interior design advice from ${siteName} in ${city}: planning your home, materials for the local climate, modular kitchens, small-space ideas, Vastu, lighting and budgeting.`,
  path: "/blog",
});

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${siteUrl}/blog#blog`,
  url: `${siteUrl}/blog`,
  name: `${siteName} Blog`,
  publisher: { "@id": `${siteUrl}/#business` },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
  })),
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={[blogSchema, breadcrumbSchema([{ name: "Blog", path: "/blog" }])]} />
      <BlogIndex />
    </>
  );
}
