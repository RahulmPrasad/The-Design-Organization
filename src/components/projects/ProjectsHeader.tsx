import { PageHeader } from "@/components/ui/PageHeader";

/** Projects page header. */
export function ProjectsHeader() {
  return (
    <PageHeader
      heading="Spaces Designed"
      headingEnd="for the Way You Live"
      intro="Explore a selection of our residential, hospitality and workplace interiors, each one shaped around the people who use it."
      background={{
        desktop: { src: "/images/projects/project-img-3.jpg", width: 1920, height: 1080 },
        mobile: { src: "/images/projects/header-mobile.webp", width: 960, height: 2010 },
      }}
    />
  );
}
