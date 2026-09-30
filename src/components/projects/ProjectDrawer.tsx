"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/projects";
import { startScroll, stopScroll } from "@/lib/smooth-scroll";
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
                <div className="label-style-2 text-color-grey-650">{project.summary}</div>
                <h2 id="project-drawer-title" className="heading-style-h4 project-drawer_title">
                  {project.name}
                </h2>
              </div>
              <button ref={closeRef} type="button" className="project-drawer_close" onClick={onClose} aria-label="Close project">
                <CloseIcon />
              </button>
            </div>

            <div className="project-drawer_body">
              <Image
                src={project.heroImage.src}
                alt={project.heroImage.alt}
                width={project.heroImage.width}
                height={project.heroImage.height}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 75vw, 44vw"
                className="project-drawer_image"
              />

              <dl className="project-drawer_meta">
                <div>
                  <dt className="label-style-2 text-color-grey-650">Location</dt>
                  <dd className="label-style-2">{project.location}</dd>
                </div>
                <div>
                  <dt className="label-style-2 text-color-grey-650">Year</dt>
                  <dd className="label-style-2">{project.year}</dd>
                </div>
              </dl>

              <div className="project-drawer_text">
                {project.intro.map((paragraph) => (
                  <p key={paragraph} className="text-size-medium">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="project-drawer_gallery">
                {project.gallery.map((image, i) => (
                  <Image
                    key={`${image.src}-${i}`}
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 767px) 50vw, 22vw"
                    className="project-drawer_image"
                  />
                ))}
              </div>

              <div className="project-drawer_text">
                {project.details.map((paragraph) => (
                  <p key={paragraph} className="text-size-medium">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
