"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

const REVEAL_QUERY = "(min-width: 992px) and (prefers-reduced-motion: no-preference)";

/** Delay in seconds from an attribute holding milliseconds, e.g. data-heading-fade="300". */
function delayOf(el: Element, attribute: string) {
  return (parseInt(el.getAttribute(attribute) ?? "", 10) || 0) / 1000;
}

const playOnEnter = (trigger: Element) => ({ trigger, start: "top bottom", toggleActions: "play none none none" });

/**
 * Scroll-triggered text and element reveals inside `scope` (desktop only):
 * - data-label-fade: characters flicker in
 * - data-heading-fade / data-paragraph-fade: lines rise and fade in
 * - data-animate-self: element rises and fades in
 * - data-animate-list="stagger": the element's children rise and fade in one after another
 * - data-animate-fill="<color>": text fills with that color as it scrolls through view (value is any CSS color)
 * Each attribute's value is a delay in milliseconds. Elements start hidden via webflow-embeds.css.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let cancelled = false;
    const mm = gsap.matchMedia();

    document.fonts.ready.then(() => {
      if (cancelled) return;
      mm.add(REVEAL_QUERY, () => {
        root.querySelectorAll("[data-label-fade]").forEach((el) => {
          gsap.set(el, { autoAlpha: 1 });
          const split = SplitText.create(el, { type: "words, chars" });
          gsap.from(split.chars, {
            duration: 0.01,
            opacity: 0,
            ease: "sine.out",
            stagger: 0.02,
            delay: delayOf(el, "data-label-fade"),
            scrollTrigger: playOnEnter(el),
          });
        });

        const lineReveals = [
          { attribute: "data-paragraph-fade", y: 40, ease: "expo.out", stagger: 0.1 },
          { attribute: "data-heading-fade", y: 30, ease: "power4.out", stagger: 0.07 },
        ];
        for (const { attribute, ...motion } of lineReveals) {
          root.querySelectorAll(`[${attribute}]`).forEach((el) => {
            gsap.set(el, { autoAlpha: 1 });
            SplitText.create(el, {
              type: "lines",
              linesClass: "line-child",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, {
                  duration: 1.6,
                  opacity: 0,
                  ...motion,
                  delay: delayOf(el, attribute),
                  scrollTrigger: playOnEnter(el),
                }),
            });
          });
        }

        root.querySelectorAll('[data-animate-list="stagger"]').forEach((list) => {
          const items = [...list.children].filter((child) => child.getAttribute("data-animate-list") !== "static");
          if (items.length === 0) return;
          gsap
            .timeline({ scrollTrigger: { trigger: list, start: "top 99%", toggleActions: "play none none none" } })
            .fromTo(items, { y: "2rem" }, { y: "0rem", duration: 1.3, ease: "power3.out", stagger: 0.1 }, 0)
            .fromTo(items, { opacity: 0 }, { opacity: 1, duration: 1.3, ease: "power2.out", stagger: 0.1 }, "<");
        });

        // Text fills left to right with the attribute's color as it scrolls through view.
        root.querySelectorAll<HTMLElement>("[data-animate-fill]").forEach((el) => {
          const probe = document.createElement("span");
          probe.style.color = (el.dataset.animateFill ?? "").replace(/;/g, "").trim();
          el.appendChild(probe);
          const target = getComputedStyle(probe).color;
          probe.remove();
          const base = getComputedStyle(el).color;
          gsap.set(el, {
            backgroundImage: `linear-gradient(90deg, ${target} 50%, ${base} 50%)`,
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0%",
            webkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          });
          gsap.to(el, {
            backgroundPosition: "0% 0%",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 90%", end: "bottom 70%", scrub: 0.8 },
          });
        });

        const selfAnimated = root.querySelectorAll("[data-animate-self]");
        gsap.set(selfAnimated, { autoAlpha: 0, y: "1rem" });
        ScrollTrigger.batch(selfAnimated, {
          start: "top bottom",
          onEnter: (elements) =>
            gsap.to(elements, {
              autoAlpha: 1,
              y: "0rem",
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.2,
              delay: (_, el: Element) => delayOf(el, "data-animate-self"),
              overwrite: true,
            }),
        });
      });
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, [scope]);
}
