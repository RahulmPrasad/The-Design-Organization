import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/BlogArticle";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { siteName, siteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

// Static export: only the posts listed in lib/blog.ts exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}` });
  const image = { url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt };
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, images: [image] },
    twitter: { ...base.twitter, images: [post.image.src] },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const url = `${siteUrl}/blog/${post.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}${post.image.src}`,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: siteName, url: siteUrl },
    publisher: { "@id": `${siteUrl}/#business` },
    isPartOf: { "@id": `${siteUrl}/blog#blog` },
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <BlogArticle post={post} />
    </>
  );
}
