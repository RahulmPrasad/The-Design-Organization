import type { Metadata } from "next";
import { LearnMore } from "@/components/projects/LearnMore";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { city, siteName } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `Interior Design Projects & Portfolio in ${city}`,
  description: `Browse home, apartment, villa, kitchen, office and hospitality interior design projects by ${siteName}, an interior design firm in ${city}.`,
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Projects", path: "/projects" }])} />
      <ProjectsHeader />
      <ProjectsList />
      <LearnMore currentPage="/projects" />
    </>
  );
}
