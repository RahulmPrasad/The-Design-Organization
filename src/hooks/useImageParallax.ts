"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { DESKTOP_QUERY } from "@/lib/media";

/**
 * Desktop parallax for `[data-image-parallax="<scale>"]` elements inside `scope`.
 * The element drifts vertically as its parent scrolls past, by half the extra
 * size its scale gives it (1.12 → ±6%). Options:
 * - data-image-scale="false": don't scale up (the drift still applies)
 * - data-image-parallax-reverse="true": drift the other way
 */
export function useImageParallax(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_QUERY, () => {
      root.querySelectorAll<HTMLElement>("[data-image-parallax]").forEach((el) => {
        const wrapper = el.parentElement;
        if (!wrapper) return;
        const scale = parseFloat(el.dataset.imageParallax ?? "") || 1.1;
        const limit = ((scale - 1) * 100) / 2;
        const reverse = el.dataset.imageParallaxReverse === "true";

        if (el.dataset.imageScale !== "false") gsap.set(el, { scale });
        gsap.fromTo(
          el,
          { yPercent: reverse ? limit : -limit },
          {
            yPercent: reverse ? -limit : limit,
            ease: "none",
            scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true },
          },
        );
      });
    });

    return () => mm.revert();
  }, [scope]);
}
