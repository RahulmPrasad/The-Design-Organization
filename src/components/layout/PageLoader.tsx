"use client";

import { useEffect, useRef } from "react";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { gsap } from "@/lib/gsap";
import { isDesktop, prefersReducedMotion } from "@/lib/media";
import { takePageIntro } from "@/lib/page-intro";
import { startScroll, stopScroll } from "@/lib/smooth-scroll";
import "./page-loader.css";

const ROWS = 4;
const BLOCKS_PER_ROW = 16;
const VISITED_KEY = "website_visited";

// Page-intro targets whose inline styles are cleared if the viewport drops to tablet mid-load.
const INTRO_TARGETS =
  ".home-header_reactor, .heading-display-1 > span, .home-header_span-wrapper span, .home-header_content, .navbar";

function setHeroOverlay(opacity: number) {
  if (document.querySelector(".section_home-header")) {
    gsap.set(".section_home-header", { "--bg-overlay-opacity": opacity });
  }
}

/** Reserve the scrollbar's width while scrolling is locked, so the page doesn't jump. */
function lockScrollbar(locked: boolean) {
  const targets = [document.body, document.querySelector<HTMLElement>(".navbar")];
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = locked ? "hidden" : "";
  targets.forEach((el) => {
    if (el) el.style.paddingRight = locked && scrollbarWidth > 0 ? `${scrollbarWidth}px` : "";
  });
}

/**
 * Desktop-only intro: the logo drops in (first visit per session), then a grid of
 * tiles wipes away row by row to reveal the page. Hidden below 992px by CSS.
 */
export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const hideLoader = () => {
      loader.style.display = "none";
      document.body.classList.add("no-loader-bg");
      startScroll();
    };

    if (!isDesktop() || prefersReducedMotion()) {
      hideLoader();
      gsap.set(".navbar", { yPercent: 0 });
      setHeroOverlay(0);
      return;
    }

    let cancelled = false;
    // Unscoped: the timeline also targets the navbar and hero outside the loader.
    const ctx = gsap.context(() => {});
    const firstVisit = !sessionStorage.getItem(VISITED_KEY);
    sessionStorage.setItem(VISITED_KEY, "true");
    document.body.style.backgroundColor = "transparent";
    lockScrollbar(true);

    const onResize = () => {
      if (window.innerWidth <= 991) {
        hideLoader();
        gsap.set(INTRO_TARGETS, { clearProps: "all" });
      } else {
        setHeroOverlay(0);
      }
    };
    window.addEventListener("resize", onResize);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        const intro = takePageIntro();
        stopScroll();
        setHeroOverlay(1);
        gsap.set(".navbar", { yPercent: -105 });

        const loaderTl = gsap.timeline({
          onComplete: () => {
            lockScrollbar(false);
            startScroll();
            loader.style.display = "none";
          },
        });

        if (firstVisit) {
          gsap.set(".page-loader_icon", { y: "-105%", display: "block" });
          loaderTl
            .to(".page-loader_icon", { y: "0%", duration: 1, ease: "expo.out" })
            .to(".page-loader_icon", { y: "0%", duration: 0.8 })
            .to(".page-loader_icon", { y: "105%", duration: 0.8, ease: "expo.in" });
        } else {
          gsap.set(".page-loader_icon", { display: "none" });
        }

        // Alternate rows wipe from opposite sides.
        loader.querySelectorAll(".loader-row").forEach((row, index) => {
          const fromLeft = index % 2 === 0;
          const position = index === 0 ? (firstVisit ? ">-0.1" : "start") : "<";
          loaderTl.to(
            row.querySelectorAll(".loader-block"),
            {
              scaleX: 0,
              transformOrigin: fromLeft ? "left center" : "right center",
              duration: 0.8,
              ease: "power2.inOut",
              stagger: { from: fromLeft ? "end" : "start", amount: 0.5 },
            },
            position,
          );
        });

        if (document.querySelector(".section_home-header")) {
          loaderTl.to(".section_home-header", { "--bg-overlay-opacity": 0, duration: 1.2, ease: "power1.inOut" }, "<0.2");
        }

        // Pages with their own intro bring the navbar in themselves.
        if (!intro) {
          loaderTl.to(".navbar", { yPercent: 0, duration: 0.8, ease: "expo.out" }, "-=0.6");
        }

        const master = gsap.timeline().add(loaderTl);
        if (intro) master.add(intro(), firstVisit ? "-=1.2" : "<0.1");
      });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      ctx.revert();
      lockScrollbar(false);
    };
  }, []);

  return (
    <div ref={loaderRef} className="page-loader" style={{ backgroundColor: "transparent" }}>
      <div className="loader-grid-container">
        {Array.from({ length: ROWS }, (_, row) => (
          <div key={row} className="loader-row">
            {Array.from({ length: BLOCKS_PER_ROW }, (_, block) => (
              <div key={block} className="loader-block" />
            ))}
          </div>
        ))}
      </div>
      <div className="page-loader_content">
        <SiteLogo sizes="120px" eager className="page-loader_icon page-loader_logo" />
      </div>
    </div>
  );
}
