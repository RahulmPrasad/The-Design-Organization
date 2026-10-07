"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { gsap, SplitText } from "@/lib/gsap";
import { isDesktop, prefersReducedMotion } from "@/lib/media";
import { registerPageIntro } from "@/lib/page-intro";
import "./page-header.css";

type HeaderImage = { src: string; width: number; height: number };

type PageHeaderProps = {
  heading: string;
  /** Second part of the heading, kept together on its own line where it fits. */
  headingEnd?: string;
  /** Paragraph at the bottom left; omit for a title-only header. */
  intro?: string;
  background: { desktop: HeaderImage; mobile: HeaderImage };
  /** Place the title in the vertical middle of the header (still left-aligned) instead of at the bottom. */
  centered?: boolean;
};

/** Full-height page header: background image with the title, and an optional intro bottom-left. */
export function PageHeader({ heading, headingEnd, intro, background, centered = false }: PageHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  // Entrance (desktop): title and intro rise in line by line while the background settles from 1.2x.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const ctx = gsap.context(() => {}, header);

    const buildIntro = () => {
      let timeline!: gsap.core.Timeline;
      ctx.add(() => {
        const title = SplitText.create(header.querySelector("h1"), { type: "lines", linesClass: "line-child" });
        const nextSection = document.querySelector('[data-page-load="next-section"]');
        timeline = gsap
          .timeline()
          .fromTo(".team-header_background-wrapper", { scale: 1.2 }, { scale: 1, duration: 2.5, ease: "expo.out" }, 0.2)
          .from(title.lines, { duration: 1.6, y: 30, opacity: 0, ease: "power4.out", stagger: 0.07 }, 0.2)
          .to(document.querySelector(".navbar"), { yPercent: 0, duration: 0.8, ease: "expo.out" }, 0.4);
        const paragraph = header.querySelector("p");
        if (paragraph) {
          const text = SplitText.create(paragraph, { type: "lines", linesClass: "line-child" });
          timeline.from(text.lines, { duration: 1.6, y: 40, opacity: 0, ease: "expo.out", stagger: 0.1 }, 0.3);
        }
        if (nextSection) timeline.fromTo(nextSection, { opacity: 0, y: "1rem" }, { opacity: 1, y: "0%", duration: 0.9, ease: "power2.out" }, 0.6);
      });
      return timeline;
    };

    // On a full page load the loader plays the intro as it clears; after in-site navigation it plays right away.
    const loader = document.querySelector(".page-loader");
    const loaderActive = loader && getComputedStyle(loader).display !== "none";
    let unregister = () => {};
    if (loaderActive) unregister = registerPageIntro(buildIntro);
    else if (isDesktop() && !prefersReducedMotion()) buildIntro();

    return () => {
      unregister();
      ctx.revert();
    };
  }, []);

  return (
    <header ref={headerRef} className={`section_team-header text-color-white${centered ? " is-centered" : ""}`}>
      <Spacer d={208} m={220} />
      <div className="padding-global z-index-2">
        <div className="container-large">
          <div className="team-header_component">
            <div className="max-width-large">
              <h1>
                {heading}
                {headingEnd && (
                  <>
                    {" "}
                    <span className="display-inlineblock">{headingEnd}</span>
                  </>
                )}
              </h1>
            </div>
            {intro && (
              <div className="u-grid">
                <p id="w-node-b5125f76-4fb4-6551-040c-ad9c3a5614b8-a459b125" className="subtitle-1 text-style-wrap-pretty">
                  {intro}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Spacer d={40} m={24} />
      <div className="team-header_background-wrapper">
        <div className="team-header_background-block">
          <div className="hide-mobile-landscape">
            <div className="video_full-wrapper">
              {/* `fill`: sized by its container, so Next.js doesn't check it against width/height. */}
              <Image
                src={background.desktop.src}
                alt=""
                fill
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
                className="video_full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <Image
            src={background.mobile.src}
            alt=""
            width={background.mobile.width}
            height={background.mobile.height}
            loading="eager"
            className="show-mobile-landscape"
            style={{ height: "auto" }}
          />
        </div>
        <div className="team-header_background-gradient" />
      </div>
    </header>
  );
}
