"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { gsap, SplitText } from "@/lib/gsap";
import { isDesktop, prefersReducedMotion } from "@/lib/media";
import { registerPageIntro } from "@/lib/page-intro";

const content = {
  heading: "Spaces Designed",
  headingEnd: "for the Way You Live",
  intro:
    "Explore a selection of our residential, hospitality and workplace interiors, each one shaped around the people who use it.",
  background: {
    desktop: { src: "/images/projects/project-img-3.jpg", width: 1920, height: 1080 },
    mobile: { src: "/images/projects/header-mobile.webp", width: 960, height: 2010 },
  },
};

/** Full-height header: background image with the title top-left and intro bottom-left. */
export function ProjectsHeader() {
  const headerRef = useRef<HTMLElement>(null);

  // Entrance (desktop): title and intro rise in line by line while the background settles from 1.2x.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const ctx = gsap.context(() => {}, header);

    const buildIntro = () => {
      let intro!: gsap.core.Timeline;
      ctx.add(() => {
        const heading = SplitText.create(header.querySelector("h1"), { type: "lines", linesClass: "line-child" });
        const text = SplitText.create(header.querySelector("p"), { type: "lines", linesClass: "line-child" });
        const nextSection = document.querySelector('[data-page-load="next-section"]');
        intro = gsap
          .timeline()
          .fromTo(".team-header_background-wrapper", { scale: 1.2 }, { scale: 1, duration: 2.5, ease: "expo.out" }, 0.2)
          .from(heading.lines, { duration: 1.6, y: 30, opacity: 0, ease: "power4.out", stagger: 0.07 }, 0.2)
          .from(text.lines, { duration: 1.6, y: 40, opacity: 0, ease: "expo.out", stagger: 0.1 }, 0.3)
          .to(document.querySelector(".navbar"), { yPercent: 0, duration: 0.8, ease: "expo.out" }, 0.4);
        if (nextSection) intro.fromTo(nextSection, { opacity: 0, y: "1rem" }, { opacity: 1, y: "0%", duration: 0.9, ease: "power2.out" }, 0.6);
      });
      return intro;
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
    <header ref={headerRef} className="section_team-header text-color-white">
      <Spacer d={208} m={220} />
      <div className="padding-global z-index-2">
        <div className="container-large">
          <div className="team-header_component">
            <div className="max-width-large">
              <h1>
                {content.heading} <span className="display-inlineblock">{content.headingEnd}</span>
              </h1>
            </div>
            <div className="u-grid">
              <p id="w-node-b5125f76-4fb4-6551-040c-ad9c3a5614b8-a459b125" className="subtitle-1 text-style-wrap-pretty">
                {content.intro}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Spacer d={40} m={24} />
      <div className="team-header_background-wrapper">
        <div className="team-header_background-block">
          <div className="hide-mobile-landscape">
            <div className="video_full-wrapper">
              <Image
                src={content.background.desktop.src}
                alt=""
                width={content.background.desktop.width}
                height={content.background.desktop.height}
                loading="eager"
                fetchPriority="high"
                className="video_full"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <Image
            src={content.background.mobile.src}
            alt=""
            width={content.background.mobile.width}
            height={content.background.mobile.height}
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
