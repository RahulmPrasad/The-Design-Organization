"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projectLocation, projects, type Project } from "@/lib/projects";
import { areasServed, brandAlt, citiesServed, city, listWithAnd } from "@/lib/site";
import { ProjectDrawer } from "./ProjectDrawer";
import "./projects.css";

// Visible, crawlable copy: the project panel only renders on click, so the local keywords live here too.
const content = {
  label: "Our Projects",
  heading: `Interior Design Projects Across ${city}`,
  intro: `As interior designers in ${city}, we create homes and workplaces around the way people live and work: from 2BHK and 3BHK apartments in Gotri and Sama to villas on Vasna-Bhayli Road, modular kitchens in Akota and offices across the city. Every project is planned in 3D, built with materials suited to ${city}'s climate and can be delivered turnkey.`,
  areas: {
    label: "Where We Work",
    heading: `Interior Designers Across ${city}`,
    text: `We design apartments, villas, kitchens, offices and hospitality spaces in every part of ${city} (Baroda), and take on projects across India, including ${listWithAnd(citiesServed.filter((name) => name !== city))}.`,
  },
};

/** Four-column grid of project cards (three on tablet, two on mobile); "View Project" opens the side panel. */
export function ProjectsList() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  useScrollReveal(sectionRef);

  return (
    <>
      <section ref={sectionRef} data-page-load="next-section" className="text-color-black">
        <Spacer d={160} m={64} />
        <div className="padding-global">
          <div className="container-large">
            <div className="u-grid">
              <div id="w-node-c61518e9-52c4-01fd-3de5-70a2876216ec-a459b125">
                <p data-label-fade="0" className="label-style-2 text-weight-medium">
                  {content.label}
                </p>
                <Spacer d={24} m={16} />
                <h2 data-heading-fade="100" className="heading-style-h3 text-style-wrap-pretty">
                  {content.heading}
                </h2>
                <Spacer d={24} m={16} />
                <p data-paragraph-fade="200" className="text-size-medium text-style-wrap-pretty projects_intro">
                  {content.intro}
                </p>
              </div>
            </div>
            <Spacer d={64} m={40} />
            <div data-row-items="4" data-animate-list="stagger" role="list" className="team-member_list">
              {projects.map((project) => (
                <div key={project.slug} role="listitem" className="team-member_list-item">
                  <div className="team-member_component">
                    {/* Every photo cropped to the same 4:5 frame; the location tag reuses the theme's info card and dot label. */}
                    <div className="project-card_image">
                      <Image
                        src={project.image.src}
                        alt={brandAlt(project.image.alt)}
                        fill
                        sizes="(max-width: 767px) 50vw, (max-width: 991px) 33vw, 336px"
                        className="project-card_img"
                      />
                      <div className="info-card project-card_tag">
                        <div data-wf--label-with-dot--variant="white" className="label-dot_wrapper">
                          <div className="label-dot_dot" />
                          <div className="label-style-1">{projectLocation(project)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="team-member_content-wrapper">
                      <div className="team-member_content">
                        <div className="label-style-2 text-color-grey-650">{project.category}</div>
                        <h3 className="subtitle-3 text-color-black text-style-wrap-pretty">{project.name}</h3>
                        <div className="team-member_content-p-wrap">
                          <p className="project-card_summary text-style-wrap-pretty">
                            {project.property} · {project.scope}
                          </p>
                        </div>
                      </div>
                      <div className="team-member_social-wrapper">
                        <Button
                          variant="team-card"
                          label="View Project"
                          ariaLabel={`View project: ${project.name}`}
                          onClick={() => {
                            setSelected(project);
                            setDrawerOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Spacer d={160} t={120} m={80} />

        {/* Areas served: the neighbourhood names are a strong local search signal. */}
        <div className="padding-global">
          <div className="container-large">
            <div className="projects_areas">
              <div>
                <p data-label-fade="0" className="label-style-2 text-weight-medium">
                  {content.areas.label}
                </p>
                <Spacer d={24} m={16} />
                <h2 data-heading-fade="100" className="heading-style-h4 text-style-wrap-pretty">
                  {content.areas.heading}
                </h2>
                <Spacer d={16} />
                <p className="text-size-medium text-style-wrap-pretty">{content.areas.text}</p>
              </div>
              <ul className="projects_area-list" role="list">
                {areasServed.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Spacer d={160} t={120} m={80} />
      </section>
      {/* Outside the section: its entrance animation leaves a transform, which would break position: fixed. */}
      <ProjectDrawer project={selected} open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
