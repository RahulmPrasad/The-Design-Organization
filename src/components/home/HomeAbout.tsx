"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Flip, gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { DESKTOP_QUERY } from "@/lib/media";
import { siteName } from "@/lib/site";
import "./about.css";

const content = {
  label: "Interior Design Studio in Vadodara",
  intro:
    "Great interiors do more than look beautiful. From apartments and villas to offices and cafés across Vadodara, we design spaces that reflect how you live and work, balancing form, function and craft in every detail.",
  cta: { label: "Discover Our Story", href: "/about-us" },
  subtitle: `Elevated living requires organized thinking. ${siteName} delivers design-led interiors for homes and businesses in Vadodara, turning every room into a sanctuary.`,
  video: { src: "/videos/home-video.mp4", poster: "/images/about-video-poster.webp" },
  detail: {
    title: siteName,
    pronunciation: "We Build your dreams to reality.",
    text: "Interior design for homes and workplaces in Vadodara, crafted with purpose and character.",
  },
};

/** Phones show the poster only; the video loads from tablet width up. */
const VIDEO_QUERY = "(min-width: 768px)";

export function HomeAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useScrollReveal(sectionRef);

  // Only fetch the (large) video where it's shown in motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !window.matchMedia(VIDEO_QUERY).matches) return;
    video.src = content.video.src;
    video.play().catch(() => {
      // Autoplay blocked: the poster stays visible.
    });
  }, []);

  // Desktop: pin the section and grow the video from the small image slot to full screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_QUERY, (context) => {
      const component = section.querySelector<HTMLElement>(".home-about_scroll-flip");
      const origin = section.querySelector<HTMLElement>("[data-scroll-flip='origin']");
      const target = section.querySelector<HTMLElement>("[data-scroll-flip='target']");
      const wrapper = section.querySelector<HTMLElement>(".home-about_video-wrapper");
      const detailLine = section.querySelector(".home-about_video-detail-line");
      const detailWrapper = section.querySelector(".home-about_video-detail-wrapper");
      const detailTexts = section.querySelectorAll("[data-animate-detail-text]");
      if (!component || !origin || !target || !wrapper) return;

      gsap.set(component, { position: "relative", height: "100dvh", overflow: "hidden" });
      gsap.set(wrapper, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100dvh",
        zIndex: 1,
        pointerEvents: "none",
      });

      // Caption: the rule draws across, then the lines rise out of their masks.
      const lines = SplitText.create(detailTexts, { type: "lines", linesClass: "line-child-detail", mask: "lines" }).lines;
      gsap.set(detailLine, { width: "50%", opacity: 0 });
      gsap.set(detailWrapper, { opacity: 0 });
      gsap.set(lines, { yPercent: 105, opacity: 0 });
      gsap.set(detailTexts, { autoAlpha: 1 });
      const detailTl = gsap
        .timeline({ paused: true })
        .to(detailWrapper, { opacity: 1, duration: 0.1 })
        .to(detailLine, { width: "100%", opacity: 1, duration: 0.9, ease: "power4.out" })
        .to(lines, { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1 }, "-=0.5");
      let detailsVisible = false;

      let flipTl: gsap.core.Timeline | null = null;
      const createFlip = () => {
        const state = Flip.getState(origin);
        flipTl = gsap.timeline({
          scrollTrigger: {
            trigger: component,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            refreshPriority: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (self.direction === 1 && self.progress > 0.45 && !detailsVisible) {
                detailsVisible = true;
                gsap.set(detailWrapper, { opacity: 1 });
                detailTl.restart();
              } else if (self.direction === -1 && self.progress < 0.55 && detailsVisible) {
                detailsVisible = false;
                detailTl.pause();
                gsap.to(detailWrapper, { opacity: 0, duration: 0.4, ease: "power4.out", overwrite: true });
              }
            },
          },
        });
        flipTl
          .add(Flip.from(state, { targets: target, scale: false, borderRadius: 0, ease: "none", immediateRender: false, duration: 1 }))
          .to(wrapper, { pointerEvents: "all", duration: 0.1 })
          .to({}, { duration: 0.4 });
      };
      createFlip();

      // The start geometry depends on layout, so rebuild after width changes.
      let resizeTimer = 0;
      let lastWidth = window.innerWidth;
      const onResize = () => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          flipTl?.scrollTrigger?.kill();
          flipTl?.kill();
          gsap.set(target, { clearProps: "transform,width,height,top,left,minHeight,minWidth" });
          // Inside the context so the rebuilt animation is reverted with it.
          context.add(createFlip);
          ScrollTrigger.refresh();
        }, 200);
      };
      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        gsap.set(target, { clearProps: "all" });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef}>
      <Spacer d={128} m={80} />
      <div className="home-about_video-component">
        <div className="padding-global">
          <div className="container-large">
            <div className="u-grid">
              <h2
                id="w-node-_39d06ed0-59ed-211c-9652-26dded87040e-659e97e1"
                data-label-fade="0"
                className="label-style-2 text-weight-medium text-color-black"
              >
                {content.label}
              </h2>
              <div id="w-node-_39d06ed0-59ed-211c-9652-26dded870410-659e97e1">
                <p data-heading-fade="300" className="heading-style-h5 text-color-black">
                  {content.intro}
                </p>
                <Spacer d={40} />
                <div data-animate-self="500" className="button-mobile-full">
                  <Button variant="light" icon label={content.cta.label} href={content.cta.href} mobileFullWidth />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-about_scroll-flip">
          <Spacer d={96} m={80} />
          <div className="padding-global">
            <div className="container-large">
              <div className="u-grid">
                <span
                  id="w-node-_39d06ed0-59ed-211c-9652-26dded87041c-659e97e1"
                  data-paragraph-fade="400"
                  className="subtitle-1 text-color-grey-750"
                >
                  {content.subtitle}
                </span>
                {/* Invisible placeholder: marks where the video starts before it grows. */}
                <div
                  data-scroll-flip="origin"
                  data-flip-id="about-video"
                  id="w-node-_39d06ed0-59ed-211c-9652-26dded87041e-659e97e1"
                  className="hide-tablet"
                >
                  <Image
                    src="/images/about-city.webp"
                    alt=""
                    width={912}
                    height={504}
                    sizes="(max-width: 991px) 100vw, 912px"
                    className="opacity-0"
                    style={{ height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Spacer d={0} t={80} m={80} />
          <div className="home-about_video-wrapper">
            <div className="home-about_video-wrap">
              <div data-scroll-flip="target" data-flip-id="about-video" className="home-about_video-block">
                <video
                  ref={videoRef}
                  poster={content.video.poster}
                  className="home-about_video"
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                />
              </div>
              <div className="home-about_video-detail-wrapper is-centered">
                <div className="home-about_video-detail-line" />
                <div className="u-grid">
                  <div
                    id="w-node-_39d06ed0-59ed-211c-9652-26dded870427-659e97e1"
                    className="home-about_video-detail-block text-color-white"
                  >
                    <h3 data-animate-detail-text="1" className="subtitle-1">
                      {content.detail.title}
                    </h3>
                    <h4 data-animate-detail-text="2" className="subtitle-2">
                      {content.detail.pronunciation}
                    </h4>
                  </div>
                  <div
                    id="w-node-_39d06ed0-59ed-211c-9652-26dded87042c-659e97e1"
                    className="home-about_video-detail-block text-color-white"
                  >
                    <div className="show-mobile-landscape">
                      <Spacer d={8} />
                    </div>
                    <h4 data-animate-detail-text="3" className="heading-style-h5 text-style-wrap-pretty">
                      {content.detail.text}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
