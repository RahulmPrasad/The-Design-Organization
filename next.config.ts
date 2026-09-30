import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/` (deployed to Netlify).
  output: "export",
  images: {
    // No image-optimization server in a static export, so images are served as-is from /public.
    unoptimized: true,
  },
};

export default nextConfig;
