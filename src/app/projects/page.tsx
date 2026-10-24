import type { Metadata } from "next";
import { LearnMore } from "@/components/projects/LearnMore";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { projectLocation, projects } from "@/lib/projects";
import { brandAlt, city, siteName, siteUrl } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: `Interior Design Projects & Portfolio in ${city}`,
  description: `Interior design projects by ${siteName} across ${city}: apartments, villas, modular kitchens and bedrooms in Alkapuri, Gotri, Akota, Bhayli, Sama, Manjalpur and more.`,
  path: "/projects",
});

// The project panel only renders on click, so the project details are also published here for search and AI engines.
const projectsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Interior design projects in ${city}`,
  itemListElement: projects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: project.name,
      genre: `${project.category} interior design`,
      about: `${project.property}: ${project.scope}`,
      description: [...project.intro, ...project.details].join(" "),
      keywords: [project.category, project.property, project.scope, project.style, `interior designer ${project.area}`].join(", "),
      image: { "@type": "ImageObject", url: `${siteUrl}${project.heroImage.src}`, caption: brandAlt(project.heroImage.alt) },
      contentLocation: { "@type": "Place", name: projectLocation(project), address: { "@type": "PostalAddress", addressLocality: city, addressRegion: "Gujarat", addressCountry: "IN" } },
      creator: { "@id": `${siteUrl}/#business` },
    },
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={[projectsSchema, breadcrumbSchema([{ name: "Projects", path: "/projects" }])]} />
      <ProjectsHeader />
      <ProjectsList />
      <LearnMore currentPage="/projects" />
    </>
  );
}
