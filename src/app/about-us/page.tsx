import type { Metadata } from "next";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutFaq } from "@/components/about/AboutFaq";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutSolutions } from "@/components/about/AboutSolutions";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { city, siteName } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `About Us: Interior Design Studio in ${city}`,
  description: `Meet ${siteName}, an interior design studio in ${city}, Gujarat. Learn how we plan, design and deliver residential, kitchen, office and hospitality interiors, and get answers to common questions.`,
  path: "/about-us",
});

export default function AboutUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About Us", path: "/about-us" }])} />
      <PageHeader
        heading="Interior Designers in Vadodara,"
        headingEnd="Designing Spaces With Purpose and Character"
        centered
        background={{
          desktop: { src: "/images/projects/interior-wide-8.webp", width: 1600, height: 1000 },
          mobile: { src: "/images/projects/interior-3.webp", width: 664, height: 928 },
        }}
      />
      <AboutApproach />
      <AboutMission />
      <AboutFaq />
      <AboutSolutions />
    </>
  );
}
