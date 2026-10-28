"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { projectLocation, type Project } from "@/lib/projects";
import { startScroll, stopScroll } from "@/lib/smooth-scroll";
import { brandAlt } from "@/lib/site";
import "./project-drawer.css";

type ProjectDrawerProps = {
  /** Project to show. Kept while closing so the content doesn't vanish mid-animation. */
  project: Project | null;
  open: boolean;
  onClose: () => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Left-side panel with a project's images and write-up, over a blurred backdrop. */
export function ProjectDrawer({ project, open, onClose }: ProjectDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // While open: lock the page, start at the top, focus the close button, and handle Esc / Tab.
  useEffect(() => {
    const panel = panelRef.current;
    if (!open || !panel) return;
    const opener = document.activeElement as HTMLElement | null;

    stopScroll();
    document.body.style.overflow = "hidden";
    panel.scrollTop = 0;
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      // Keep keyboard focus inside the panel.
      const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      startScroll();
      opener?.focus({ preventScroll: true });
    };
  }, [open, project]);

  return (
    <div className="project-drawer" data-open={open} inert={!open}>
      <div className="project-drawer_backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-drawer-title"
        className="project-drawer_panel"
        data-lenis-prevent=""
      >
        {project && (
          <>
            <div className="project-drawer_header">
              <div>
                <div className="label-style-2 text-color-grey-650">
                  {project.status} · {project.category}
                </div>
                <h2 id="project-drawer-title" className="heading-style-h4 project-drawer_title">
                  {project.name}
                </h2>
              </div>
              <button ref={closeRef} type="button" className="project-drawer_close" onClick={onClose} aria-label="Close project">
                <CloseIcon />
              </button>
            </div>

            <div className="project-drawer_body">
              <div className="project-drawer_hero">
                <Image
                  src={project.heroImage.src}
                  alt={brandAlt(project.heroImage.alt)}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 991px) 75vw, 44vw"
                  className="project-drawer_cover"
                />
              </div>

              <dl className="project-drawer_meta">
                {[
                  ["Location", projectLocation(project)],
                  ["Property", project.property],
                  ["Scope", project.scope],
                  ["Style", project.style],
                ].map(([term, value]) => (
                  <div key={term}>
                    <dt className="label-style-2 text-color-grey-650">{term}</dt>
                    <dd className="label-style-2">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="project-drawer_text">
                {project.intro.map((paragraph) => (
                  <p key={paragraph} className="text-size-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="project-drawer_highlights">
                <h3 className="subtitle-2">What we designed</h3>
                <ul className="project-drawer_list">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={`project-drawer_gallery${project.gallery.length === 1 ? " is-single" : ""}`}>
                {project.gallery.map((image, i) => (
                  <div key={`${image.src}-${i}`} className="project-drawer_gallery-item">
                    <Image
                      src={image.src}
                      alt={brandAlt(image.alt)}
                      fill
                      sizes="(max-width: 767px) 50vw, 22vw"
                      className="project-drawer_cover"
                    />
                  </div>
                ))}
              </div>

              <div className="project-drawer_text">
                {project.details.map((paragraph) => (
                  <p key={paragraph} className="text-size-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="project-drawer_cta">
                <div>
                  <p className="subtitle-2">
                    {/* "on Old Padra Road", but "in Gotri" */}
                    Planning a similar project {/Road$/.test(project.area) ? "on" : "in"} {project.area}?
                  </p>
                  <p className="project-drawer_cta-text">
                    We design homes and workplaces across Vadodara. Tell us about your space.
                  </p>
                </div>
                <Button variant="light" label="Contact Us" href="/contact" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
