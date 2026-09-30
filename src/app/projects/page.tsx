import type { Metadata } from "next";
import { LearnMore } from "@/components/projects/LearnMore";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `Projects | ${siteName}`,
  description: "A selection of residential, hospitality and workplace interiors by The Design Organization.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHeader />
      <ProjectsList />
      <LearnMore />
    </>
  );
}
