import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Required for the static export (next.config.ts `output: "export"`).
export const dynamic = "force-static";

// AI assistants and answer engines are welcomed explicitly so the studio can be cited in their answers.
const aiCrawlers = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/sitemap.txt`],
    host: siteUrl,
  };
}
