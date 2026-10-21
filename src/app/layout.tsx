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
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultOgImage } from "@/lib/metadata";
import { city, siteDescription, siteName, siteUrl } from "@/lib/site";
import { businessSchema, websiteSchema } from "@/lib/structured-data";

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

// Titles lead with the search phrase; the studio name comes last (added by the template below).
const defaultTitle = `Best Interior Designers in ${city} | ${siteName}`;
const ogImage = defaultOgImage;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "interior designer in Vadodara",
    "interior designers in Vadodara",
    "best interior designer in Vadodara",
    "interior design firm Vadodara",
    "home interior designer Vadodara",
    "interior designer Baroda",
    "modular kitchen Vadodara",
    "office interior designer Vadodara",
    "turnkey interiors Vadodara",
    "3BHK interior design Vadodara",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName,
    url: "/",
    title: defaultTitle,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: siteDescription, images: [ogImage.url] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  other: { "geo.region": "IN-GJ", "geo.placename": city },
  // TODO: paste the verification code from Google Search Console (HTML tag method) once the domain is live.
  // verification: { google: "…" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={[businessSchema(), websiteSchema()]} />
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
