import { PageHeader } from "@/components/ui/PageHeader";

/** Projects page header. */
export function ProjectsHeader() {
  return (
    <PageHeader
      heading="Interior Design Projects"
      headingEnd="for the Way You Live"
      intro="Explore a selection of our residential, hospitality and workplace interiors in and around Vadodara, each one shaped around the people who use it."
      background={{
        desktop: { src: "/images/projects/project-img-3.jpg", width: 1920, height: 1080, alt: "Modern white villa with glass walls and a lawn" },
        mobile: { src: "/images/projects/header-mobile.webp", width: 960, height: 2010, alt: "Aerial view of city buildings" },
      }}
    />
  );
}
