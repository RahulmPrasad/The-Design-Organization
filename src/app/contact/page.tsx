import type { Metadata } from "next";
import { ContactSection } from "@/components/contact/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { city, siteName, siteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

const contactMetadata = pageMetadata({
  title: `Contact Interior Designers in ${city} | Book a Consultation`,
  description: `Contact ${siteName}, an interior design studio in ${city}. Call, WhatsApp or send us your project details for homes, kitchens, offices and commercial interiors, and we'll arrange a consultation.`,
  path: "/contact",
});

export const metadata: Metadata = {
  ...contactMetadata,
  // Absolute: ends with the call to action rather than the "| Brand" suffix.
  title: { absolute: contactMetadata.title as string },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${siteUrl}/contact`,
  name: `Contact ${siteName}`,
  about: { "@id": `${siteUrl}/#business` },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactPageSchema, breadcrumbSchema([{ name: "Contact", path: "/contact" }])]} />
      <ContactSection />
    </>
  );
}
