"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

type VariantConfig = {
  /** Webflow class that styles the variant. */
  className: string;
  /** The animated (hover) text layer also carries the variant class. */
  animatedLayer: boolean;
  /** The variant class also goes on the hover wrapper, resting content and top line. */
  everywhere?: boolean;
  /** Arrow sits inline before the label instead of in a separate square. */
  inlineIcon?: boolean;
  /** The variant class also goes on the square icon wrappers. */
  iconWrappers?: boolean;
  /** Value of the data-wf--button--variant attribute, when it differs from the key. */
  dataName?: string;
};

const VARIANTS = {
  nav: { className: "w-variant-ee785f6d-1702-684b-b42d-dcfc9770e3a6", animatedLayer: true },
  "light-blue": { className: "w-variant-1274ae82-b5f7-9672-ae5c-64448103f021", animatedLayer: false },
  light: { className: "", animatedLayer: false },
  /** Small outlined button on project cards. */
  "team-card": { className: "w-variant-a34e5f5e-b186-5de3-c9f1-93a11190005c", animatedLayer: false },
  /** Outlined light button with a light-blue arrow square (for dark sections). */
  cta: { className: "w-variant-d9e79d8e-4125-5274-6302-d8ac911798b8", animatedLayer: false, iconWrappers: true },
  /** Full-width text link with an inline arrow and a top rule that sweeps in on hover (for dark cards). */
  "tertiary-dark": {
    className: "w-variant-ff30d952-2892-9a95-9aeb-d29186579211",
    animatedLayer: true,
    everywhere: true,
    inlineIcon: true,
    dataName: "tertiary---dark",
  },
} satisfies Record<string, VariantConfig>;

export type ButtonVariant = keyof typeof VARIANTS;

type ButtonProps = {
  label: string;
  variant: ButtonVariant;
  href?: string;
  onClick?: () => void;
  /** Accessible name when the visible label isn't specific enough (e.g. "View project: Riverside"). */
  ariaLabel?: string;
  /** Square arrow icon before the label; animates on hover. */
  icon?: boolean;
  desktopFullWidth?: boolean;
  mobileFullWidth?: boolean;
};

const HOVER_MS = 210;
const HOVER_TRANSITION = `width ${HOVER_MS / 1000}s cubic-bezier(.23,.75,.57,.94)`;

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20" fill="none" className="button_icon-svg">
      <path
        d="M3.67242 12.9971V2.5H4.67242V11.9971H15.7824L15.6133 11.9455L12.4346 8.69261L13.1494 7.99339L17.209 12.1477L17.5508 12.4973L17.209 12.8469L13.1494 17.0012L12.4346 16.302L15.6162 13.0452L15.7753 12.9971H3.67242Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Button({ label, variant, href, onClick, ariaLabel, icon, desktopFullWidth, mobileFullWidth }: ButtonProps) {
  const config: VariantConfig = VARIANTS[variant];
  const { className: variantClass, animatedLayer, everywhere = false, inlineIcon = false, iconWrappers = false } = config;
  const squareIcon = icon && !inlineIcon;
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
  const withVariant = (base: string, applies = true) => (variantClass && applies ? `${base} ${variantClass}` : base);

  return (
    <div
      data-wf--button--variant={config.dataName ?? variant}
      desktop-full-width={desktopFullWidth ? "true" : ""}
      mobile-full-width={mobileFullWidth ? "true" : ""}
      className={withVariant("button_main_icon")}
      style={inlineIcon ? { textAlign: "left" } : undefined}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={wrapperRef} className={withVariant("button-animated-wrapper", everywhere)}>
        {squareIcon && (
          <div className={withVariant("button_icon-wrapper is-animated", iconWrappers)}>
            {/* Two arrows in a clipped box: on hover the first slides out right as the second slides in (CSS in webflow-embeds.css). */}
            <div className="button_lottie button_arrow-slide" aria-hidden="true">
              <ArrowIcon />
              <ArrowIcon />
            </div>
          </div>
        )}
        <div swiper-btn="" className={withVariant("button_content is-animated", animatedLayer)}>
          <span ref={animatedTextRef} aria-hidden="true" data-button-animated-text="" className="button_text text-color-white">
            {label}
          </span>
        </div>
      </div>
      {squareIcon && (
        <div className={withVariant("button_icon-wrapper", iconWrappers)}>
          <ArrowIcon />
        </div>
      )}
      <div className={withVariant("button_content", everywhere)}>
        {icon && inlineIcon && (
          <div style={{ order: 0 }} className="button_icon-inner">
            <ArrowIcon />
          </div>
        )}
        <div className="clickable_wrap">
          {href ? (
            isInternal ? (
              <Link href={href} className="clickable_link w-inline-block" aria-label={ariaLabel}>
                <span className="clickable_text">{label}</span>
              </Link>
            ) : (
              <a href={href} className="clickable_link w-inline-block" aria-label={ariaLabel}>
                <span className="clickable_text">{label}</span>
              </a>
            )
          ) : (
            <button
              type="button"
              className="clickable_btn"
              style={{ display: "block" }}
              onClick={onClick}
              aria-label={ariaLabel}
            >
              <span className="clickable_text">{label}</span>
            </button>
          )}
        </div>
        <span ref={textRef} aria-hidden="true" data-button-text="" className="button_text">
          {label}
        </span>
      </div>
      <div className={withVariant("button-top-line-animation", everywhere)} />
    </div>
  );
}
