"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects, type Project } from "@/lib/projects";
import { brandAlt } from "@/lib/site";
import { ProjectDrawer } from "./ProjectDrawer";

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
                <h2 data-heading-fade="0" className="heading-style-h1">
                  Our Projects
                </h2>
              </div>
            </div>
            <Spacer d={64} m={40} />
            <div data-row-items="4" data-animate-list="stagger" role="list" className="team-member_list">
              {projects.map((project) => (
                <div key={project.slug} role="listitem" className="team-member_list-item">
                  <div className="team-member_component">
                    <Image
                      src={project.image.src}
                      alt={brandAlt(project.image.alt)}
                      width={project.image.width}
                      height={project.image.height}
                      sizes="(max-width: 767px) 50vw, (max-width: 991px) 33vw, 336px"
                      className="team-member_image"
                      style={{ height: "auto" }}
                    />
                    <div className="team-member_content-wrapper">
                      <div className="team-member_content">
                        <div className="label-style-2 text-weight-medium text-color-dark-grey">{project.name}</div>
                        <div className="team-member_content-p-wrap">
                          <div className="label-style-2 text-color-grey-650 text-style-wrap-pretty">{project.summary}</div>
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
      </section>
      {/* Outside the section: its entrance animation leaves a transform, which would break position: fixed. */}
      <ProjectDrawer project={selected} open={drawerOpen} onClose={closeDrawer} />
    </>
  );
}
