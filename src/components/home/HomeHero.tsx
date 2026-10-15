"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Particles } from "@/components/ui/Particles";
import { Spacer } from "@/components/ui/Spacer";
import { gsap } from "@/lib/gsap";
import { DESKTOP_QUERY } from "@/lib/media";
import { registerPageIntro } from "@/lib/page-intro";
import "./hero.css";

// The hero image drifts ±6% vertically as the hero scrolls past (scale 1.12 → (1.12 - 1) * 100 / 2).
const REACTOR_PARALLAX = 6;

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ctx = gsap.context(() => {}, hero);
    const mm = gsap.matchMedia();

    ctx.add(() => {
      mm.add(DESKTOP_QUERY, () => {
        const reactor = hero.querySelector(".home-header_reactor");
        if (!reactor?.parentElement) return;
        gsap.fromTo(
          reactor,
          { yPercent: -REACTOR_PARALLAX },
          {
            yPercent: REACTOR_PARALLAX,
            ease: "none",
            scrollTrigger: {
              trigger: reactor.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    // Played by the page loader as it clears (desktop only).
    const unregister = registerPageIntro(() => {
      let intro!: gsap.core.Timeline;
      ctx.add(() => {
        intro = gsap
          .timeline({ defaults: { ease: "power4.out", duration: 1.5 } })
          .from(".home-header_reactor", { y: 150, opacity: 0, duration: 1.8, ease: "expo.out" })
          .from(".heading-display-1 > span", { x: -40, opacity: 0 }, "-=1.3")
          .from(".home-header_span-wrapper span:first-child", { x: -40, opacity: 0 }, "<0.1")
          .from(".home-header_span-wrapper span:last-child", { x: 40, opacity: 0 }, "<")
          .from(".home-header_content", { y: 30, opacity: 0, duration: 1.2 }, "-=1.4")
          .to(document.querySelector(".navbar"), { yPercent: 0, duration: 1.5, ease: "expo.out" }, "-=1.5");

        // Once settled, the headline follows the cursor slightly.
        intro.eventCallback("onComplete", () => {
          mm.add(DESKTOP_QUERY, () => {
            const text = hero.querySelectorAll(".heading-display-1 > span, .home-header_span-wrapper");
            const onMove = (e: MouseEvent) => {
              gsap.to(text, {
                x: (e.clientX / window.innerWidth - 0.5) * 15,
                y: (e.clientY / window.innerHeight - 0.5) * 10,
                duration: 1.5,
                ease: "power2.out",
                overwrite: "auto",
              });
            };
            window.addEventListener("mousemove", onMove);
            return () => {
              window.removeEventListener("mousemove", onMove);
              gsap.set(text, { clearProps: "x,y" });
            };
          });
        });
      });
      return intro;
    });

    return () => {
      unregister();
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <header ref={heroRef} className="section_home-header">
      {/* Same particles as the footer, in white so they read on the blue. */}
      <Particles className="home-header_particles" color={[255, 255, 255]} />
      <div className="padding-global">
        <div className="container-large">
          <div className="home-header_component">
            <div className="home-header_top-spacing">
              <Spacer d={240} t={220} m={100} />
            </div>
            {/* Display tagline, not a heading: the page's single H1 carries the keywords below. */}
            <div className="heading-display-1 z-index-2">
              <span className="z-index-3 display-block">Building </span>
              <div className="home-header_span-wrapper">
                <span>your</span>
                {/* Non-breaking space: a regular one collapses inside the flex row on mobile. */}
                <span>{" "}Dreams</span>
              </div>
              <div className="show-mobile-landscape">
                <Spacer d={16} m={132} />
              </div>
              <Image
                className="home-header_reactor"
                src="/images/hero-img.png"
                alt="Row of modern homes with grey board-and-batten exteriors"
                width={1920}
                height={1080}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 1300px"
                loading="eager"
                fetchPriority="high"
                data-image-parallax="1.12"
                data-image-scale="false"
              />
            </div>
            <div className="home-header_bottom-content">
              <Spacer d={64} t={104} m={28} />
              <div className="home-header_content">
                <h1 className="heading-style-h6 text-style-wrap-pretty text-end">
                  One of Vadodara’s Leading Interior Designers, Creating Homes and Spaces That Adapt to Your World
                </h1>
                <div className="home-header_content-line" />
              </div>
              <Spacer d={48} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
