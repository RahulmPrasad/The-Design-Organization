import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/webflow-base.css";
import "@/styles/webflow-theme.css";
import "@/styles/webflow-embeds.css";
import "lenis/dist/lenis.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageLoader } from "@/components/layout/PageLoader";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { siteName } from "@/lib/site";

// Geist for headings, Inter for body text (wired into the theme via --font-geist / --font-inter).
// Self-hosted variable fonts (Latin subset, all weights 100–900) from Google Fonts, so builds
// never depend on fetching from Google: its font CSS sometimes returns URLs the dev bundler can't load.
const geist = localFont({
  src: "../fonts/geist-latin.woff2",
  variable: "--font-geist",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const description =
  "Advanced small modular reactors built on proven HTGR technology, delivering up to 950°C clean heat and electricity for industrial applications.";

export const metadata: Metadata = {
  title: siteName,
  description,
  openGraph: { title: siteName, description, type: "website" },
  twitter: { card: "summary_large_image", title: siteName, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll />
        <div className="page-wrapper">
          <PageLoader />
          <Navbar />
          <main className="main-wrapper">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
