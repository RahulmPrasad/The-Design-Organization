import { posts } from "@/lib/blog";
import { absoluteUrl, sitePages } from "@/lib/site";

// Required for the static export (next.config.ts `output: "export"`).
export const dynamic = "force-static";

/** /sitemap.txt: the plain-text sitemap format (one absolute URL per line) accepted by Google and Bing. */
export function GET() {
  const urls = [...sitePages.map((page) => absoluteUrl(page.path)), ...posts.map((post) => absoluteUrl(`/blog/${post.slug}`))];
  const body = urls.join("\n") + "\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
