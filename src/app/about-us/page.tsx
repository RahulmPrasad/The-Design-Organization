import type { Metadata } from "next";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutFaq } from "@/components/about/AboutFaq";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutSolutions } from "@/components/about/AboutSolutions";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${siteName}`,
  description: "Learn about The Design Organization, an interior design studio for homes and workplaces.",
};

export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        heading="Designing Spaces"
        headingEnd="With Purpose and Character"
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
