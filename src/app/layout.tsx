import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
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
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
