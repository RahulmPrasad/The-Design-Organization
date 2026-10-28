import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesHero } from "@/components/services/ServicesHero";
import { pageMetadata } from "@/lib/metadata";
import { city, siteName } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `Architecture & Interior Design Services in ${city}`,
  description: `Architecture and interior design services by ${siteName} in ${city}: residential and commercial architecture and interiors, institutional projects, product design, urban design and landscape design.`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Services", path: "/services" }])} />
      <ServicesHero />
    </>
  );
}
