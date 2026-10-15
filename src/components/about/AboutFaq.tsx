"use client";

import type { AnimationItem } from "lottie-web";
import { useEffect, useId, useRef, useState } from "react";
import { Lottie } from "@/components/ui/Lottie";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DESKTOP_QUERY } from "@/lib/media";
import { faqs } from "@/lib/faq";
import "./faq.css";

const content = {
  label: "Common Questions",
  heading: "Interior Design in Vadodara: Your Questions Answered",
  questions: faqs,
};

/** One question: the answer slides open and the plus icon turns into a minus. */
function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string[];
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const icon = useRef<AnimationItem | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const panel = contentRef.current;
    if (!panel) return;
    // Plus ↔ minus icon: play forward when opening, backward when closing.
    if (icon.current) {
      icon.current.setDirection(open ? 1 : -1);
      icon.current.play();
    }
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const tween = open
      ? gsap.fromTo(panel, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power1.inOut", display: "block" })
      : gsap.to(panel, { height: 0, opacity: 0, duration: 0.35, ease: "power1.inOut" });
    tween.eventCallback("onComplete", () => {
      if (!open) gsap.set(panel, { display: "none" });
      ScrollTrigger.refresh();
    });
    return () => {
      tween.kill();
    };
  }, [open]);

  return (
    <div role="listitem" className="accordion_item">
      <div className={`accordion_component${open ? " is-opened" : ""}`}>
        <h3 className="accordion_toggle_heading subtitle-3">
          <button
            type="button"
            id={`${id}-button`}
            aria-expanded={open}
            aria-controls={`${id}-content`}
            className="accordion_toggle_button"
            onClick={onToggle}
          >
            <span className="accordion_toggle_text subtitle-3">{question}</span>
            <span className="accordion_toggle_icon-wrap">
              <Lottie
                src="/lottie/faq-icon.json"
                className="accordion_toggle_lottie lottie-current-color"
                aria-hidden="true"
                onReady={(animation) => {
                  icon.current = animation;
                  animation.goToAndStop(0, true);
                }}
              />
            </span>
          </button>
        </h3>
        <div
          ref={contentRef}
          id={`${id}-content`}
          role="region"
          aria-labelledby={`${id}-button`}
          className="accordion_content_wrap"
        >
          <div className="accordion_content_padding is-solutions-tabs">
            <Spacer d={8} />
            <div className="accordion_content_text">
              {answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Light FAQ section (theme's default: white background, black text): label and heading on top, then a one-at-a-time accordion. */
export function AboutFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useScrollReveal(sectionRef);

  // Desktop: questions rise in one after another as the list scrolls into view.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const mm = gsap.matchMedia();
    mm.add(`${DESKTOP_QUERY} and (prefers-reduced-motion: no-preference)`, () => {
      const rows = list.querySelectorAll(".accordion_component");
      gsap.set(rows, { y: "1rem", opacity: 0 });
      ScrollTrigger.create({
        trigger: list,
        start: "top 90%",
        once: true,
        onEnter: () => gsap.to(rows, { y: "0rem", opacity: 1, duration: 0.4, ease: "power1.out", stagger: 0.2 }),
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="section_faq">
      <div className="padding-global">
        <Spacer d={160} t={120} m={80} />
        <div className="container-large position-relative">
          <div className="u-grid">
            <div id="w-node-b91d1224-fb4b-ffa8-795f-bc2d54d6e357-54d6e352">
              <Spacer d={4} m={0} />
              <p data-label-fade="0" className="label-style-2 text-weight-medium">
                {content.label}
              </p>
            </div>
            <div id="w-node-_55097afd-582a-754b-5b8f-72d7d56bfc5a-54d6e352">
              <h2 data-heading-fade="300" id="w-node-b91d1224-fb4b-ffa8-795f-bc2d54d6e35b-54d6e352" className="heading-style-h3 text-style-wrap-pretty">
                {content.heading}
              </h2>
            </div>
          </div>
          <Spacer d={64} />
          <div className="u-grid">
            <div id="w-node-b91d1224-fb4b-ffa8-795f-bc2d54d6e35f-54d6e352">
              <div data-animate-self="100" className="faq_icon">
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative brand mark */}
                <img src="/images/logo-mark.png" alt="" width={64} height={24} loading="lazy" className="faq_logo-mark" />
              </div>
              <Spacer d={8} />
            </div>
            <div id="w-node-b91d1224-fb4b-ffa8-795f-bc2d54d6e362-54d6e352">
              <div ref={listRef} role="list" className="accordion_wrap accordion_list">
                {content.questions.map((item, i) => (
                  <FaqItem
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    open={openIndex === i}
                    onToggle={() => setOpenIndex((current) => (current === i ? null : i))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Spacer d={160} t={120} m={80} />
      </div>
    </section>
  );
}
