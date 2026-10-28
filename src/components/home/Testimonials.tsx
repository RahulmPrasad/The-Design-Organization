"use client";

import "swiper/css";
import { useEffect, useRef } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ratingSummary, testimonials } from "@/lib/testimonials";
import "./testimonials.css";

const content = {
  label: "Testimonials",
  heading: "Loved by the people we design for",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

function Stars() {
  return (
    <div className="testimonials_stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="20" height="20">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

/** Arrow button in the theme's carousel style: the blue fill sweeps in on hover. */
function NavButton({ direction, buttonRef }: { direction: "prev" | "next"; buttonRef: React.RefObject<HTMLButtonElement | null> }) {
  const icon = (
    <div className={`swiper-button-icon${direction === "next" ? " is-next" : ""}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M9.52344 15.4727L4.54785 10.498L17.499 10.498L17.499 9.49805L4.54785 9.49805L9.52344 4.52344L8.81641 3.81641L2.98633 9.64453L2.63281 9.99805L2.98633 10.3516L8.81641 16.1797L9.52344 15.4727Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
  return (
    <button ref={buttonRef} type="button" className="swiper-button" aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}>
      {icon}
      <div className="swiper-button-bg-wrap">
        <div className="swiper-button-bg">{icon}</div>
      </div>
    </button>
  );
}

/** Rating summary card followed by quote cards in a draggable carousel with arrow buttons. */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const el = swiperRef.current;
    if (!el || !prevRef.current || !nextRef.current) return;
    let disposed = false;
    let destroy = () => {};

    Promise.all([import("swiper"), import("swiper/modules")]).then(([{ default: Swiper }, { A11y, Keyboard, Navigation }]) => {
      if (disposed) return;
      const swiper = new Swiper(el, {
        modules: [Navigation, A11y, Keyboard],
        slidesPerView: "auto",
        speed: 600,
        grabCursor: true,
        keyboard: { enabled: true, onlyInViewport: true },
        navigation: { prevEl: prevRef.current, nextEl: nextRef.current },
        a11y: { prevSlideMessage: "Previous testimonial", nextSlideMessage: "Next testimonial" },
      });
      destroy = () => swiper.destroy(true, true);
    });

    return () => {
      disposed = true;
      destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="section_testimonials overflow-clip text-color-black">
      <Spacer d={160} t={120} m={80} />
      <div className="padding-global">
        <div className="container-large">
          <p data-label-fade="0" className="label-style-2 text-weight-medium">
            {content.label}
          </p>
          <Spacer d={24} m={16} />
          <h2 data-heading-fade="100" className="heading-style-h3 text-style-wrap-pretty testimonials_heading">
            {content.heading}
          </h2>
          <Spacer d={64} m={40} />
          <div data-animate-self="200">
            <div ref={swiperRef} className="swiper testimonials_swiper" aria-label="Client testimonials">
              <div className="swiper-wrapper">
                {ratingSummary && (
                  <div className="swiper-slide testimonials_card is-rating">
                    <div className="testimonials_score">{ratingSummary.score}</div>
                    <Stars />
                    <div className="label-style-2 text-weight-medium">{ratingSummary.reviews}</div>
                    <div className="testimonials_source">{ratingSummary.source}</div>
                  </div>
                )}
                {testimonials.map((t, i) => (
                  <figure key={i} className="swiper-slide testimonials_card">
                    <blockquote className="testimonials_quote">“{t.quote}”</blockquote>
                    <figcaption className="testimonials_author">
                      <div className="testimonials_avatar" aria-hidden="true">
                        {initials(t.name)}
                      </div>
                      <div>
                        <div className="label-style-2 text-weight-medium">{t.name}</div>
                        <div className="testimonials_detail">{t.detail}</div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
          <Spacer d={40} m={32} />
          <div data-animate-self="300" className="testimonials_nav">
            <NavButton direction="prev" buttonRef={prevRef} />
            <NavButton direction="next" buttonRef={nextRef} />
          </div>
        </div>
      </div>
      <Spacer d={160} t={120} m={80} />
    </section>
  );
}
