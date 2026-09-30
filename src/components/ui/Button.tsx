"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Webflow button variants: the class that styles each one, and whether the
// animated (hover) layer carries the variant class too.
const VARIANTS = {
  nav: { className: "w-variant-ee785f6d-1702-684b-b42d-dcfc9770e3a6", animatedLayer: true },
  "light-blue": { className: "w-variant-1274ae82-b5f7-9672-ae5c-64448103f021", animatedLayer: false },
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

type ButtonProps = {
  label: string;
  variant: ButtonVariant;
  href?: string;
  onClick?: () => void;
  desktopFullWidth?: boolean;
  mobileFullWidth?: boolean;
};

const HOVER_MS = 210;
const HOVER_TRANSITION = `width ${HOVER_MS / 1000}s cubic-bezier(.23,.75,.57,.94)`;

export function Button({ label, variant, href, onClick, desktopFullWidth, mobileFullWidth }: ButtonProps) {
  const { className: variantClass, animatedLayer } = VARIANTS[variant];
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const hover = useRef({ animating: false, shouldReverse: false, timers: [] as number[] });

  // The hover layer's text must be exactly as wide as the resting text so it doesn't reflow.
  useEffect(() => {
    const syncWidth = () => {
      const text = textRef.current;
      const animatedText = animatedTextRef.current;
      if (!text || !animatedText) return;
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      animatedText.style.minWidth = `${text.offsetWidth / rootFontSize}rem`;
    };
    syncWidth();
    document.fonts.ready.then(syncWidth);
    window.addEventListener("resize", syncWidth);
    const timers = hover.current.timers;
    return () => {
      window.removeEventListener("resize", syncWidth);
      timers.forEach(clearTimeout);
    };
  }, []);

  const later = (fn: () => void) => hover.current.timers.push(window.setTimeout(fn, HOVER_MS));

  const collapse = (wrapper: HTMLDivElement) => {
    hover.current.animating = true;
    wrapper.style.transition = HOVER_TRANSITION;
    wrapper.style.width = "0%";
    later(() => {
      wrapper.classList.remove("is-hover-state");
      hover.current.animating = false;
    });
  };

  // The fill sweeps in from the left, then anchors right so it sweeps out to the right.
  const handleEnter = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper || hover.current.animating) return;
    hover.current.shouldReverse = false;
    hover.current.animating = true;
    wrapper.style.transition = HOVER_TRANSITION;
    wrapper.style.width = "100%";
    later(() => {
      wrapper.classList.add("is-hover-state");
      hover.current.animating = false;
      if (hover.current.shouldReverse) collapse(wrapper);
    });
  };

  const handleLeave = () => {
    const wrapper = wrapperRef.current;
    hover.current.shouldReverse = true;
    if (!wrapper || hover.current.animating) return;
    if (wrapper.classList.contains("is-hover-state")) collapse(wrapper);
  };

  const isInternal = href?.startsWith("/");

  return (
    <div
      data-wf--button--variant={variant}
      desktop-full-width={desktopFullWidth ? "true" : ""}
      mobile-full-width={mobileFullWidth ? "true" : ""}
      className={`button_main_icon ${variantClass}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={wrapperRef} className="button-animated-wrapper">
        <div swiper-btn="" className={`button_content is-animated${animatedLayer ? ` ${variantClass}` : ""}`}>
          <span ref={animatedTextRef} aria-hidden="true" data-button-animated-text="" className="button_text text-color-white">
            {label}
          </span>
        </div>
      </div>
      <div className="button_content">
        <div className="clickable_wrap">
          {href ? (
            isInternal ? (
              <Link href={href} className="clickable_link w-inline-block">
                <span className="clickable_text">{label}</span>
              </Link>
            ) : (
              <a href={href} className="clickable_link w-inline-block">
                <span className="clickable_text">{label}</span>
              </a>
            )
          ) : (
            <button type="button" className="clickable_btn" style={{ display: "block" }} onClick={onClick}>
              <span className="clickable_text">{label}</span>
            </button>
          )}
        </div>
        <span ref={textRef} aria-hidden="true" data-button-text="" className="button_text">
          {label}
        </span>
      </div>
      <div className="button-top-line-animation" />
    </div>
  );
}
