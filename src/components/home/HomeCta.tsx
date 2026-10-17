"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useImageParallax } from "@/hooks/useImageParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap } from "@/lib/gsap";
import { brandAlt, siteName } from "@/lib/site";
import "./cta.css";

const content = {
  lead: "Connect With Us.",
  text: "Our team is here to talk through your space, your ideas, and how we can bring them to life.",
  cta: { label: "Contact Our Team", href: "/contact" },
  images: {
    large: { src: "/images/home/cta-large.webp", width: 988, height: 1328, alt: "Living room with a tan leather sofa, patterned rug and a tall plant" },
    small: { src: "/images/home/cta-small.webp", width: 732, height: 1328, alt: "Sitting area with an orange armchair, rattan sideboard and round mirror" },
  },
};

/** Dark "Connect With Us" section that sits on top of the footer on every page. */
export function HomeCta() {
  // Remount per page so its scroll animations are measured against the new page.
  const pathname = usePathname();
  return <CtaSection key={pathname} />;
}

function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useImageParallax(sectionRef);

  // Desktop: as the section scrolls away it shrinks slightly while the footer rises from behind it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
      const footer = section.nextElementSibling;
      gsap
        .timeline({ scrollTrigger: { trigger: section, start: "bottom bottom", end: "bottom top", scrub: 0.6 } })
        .fromTo(section, { scale: 1 }, { scale: 0.98, ease: "none" }, 0)
        .fromTo(footer, { y: "15%" }, { y: "0%", ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="section_cta" style={{ backgroundColor: "var(--_color---colors-primary--orange)" }}>
      <div className="padding-global">
        <Spacer d={160} t={120} m={80} />
        <div className="container-large position-relative">
          <div className="u-grid is-cta-custom">
            <div id="w-node-f911818e-159d-c05e-c48d-892c263b1949-263b1944" className="cta_content">
              <div data-animate-self="0" className="embed-icon">
                {/* eslint-disable-next-line @next/next/no-img-element -- tiny decorative brand mark */}
                <img src="/images/logo-mark.png" alt={`${siteName} logo`} width={64} height={24} loading="lazy" className="cta_logo-mark" />
              </div>
              <Spacer d={40} t={40} m={40} />
              <div className="tech-connect_heading-wrap">
                <div>
                  <span data-animate-fill="var(--_color---colors-primary--white)" className="heading-style-h5">
                    {content.lead}
                  </span>
                  <span className="heading-style-h5 text-color-white text-style-wrap-pretty"> {content.text}</span>
                </div>
              </div>
              <Spacer d={40} t={40} m={32} />
              <div data-animate-self="0" className="cta_button-wrapper">
                <Button variant="cta" icon label={content.cta.label} href={content.cta.href} mobileFullWidth />
              </div>
              <div className="show-mobile-landscape">
                <Spacer d={0} m={32} />
              </div>
            </div>
            <div className="hide-mobile-landscape" />
            <div id="w-node-ca2f9574-0bdb-39de-1d86-d3c91887c3dd-263b1944" className="cta_image-wrapper">
              <Image
                src={content.images.large.src}
                alt={brandAlt(content.images.large.alt)}
                width={content.images.large.width}
                height={content.images.large.height}
                sizes="(max-width: 767px) 50vw, 33vw"
                className="cta_image"
                data-image-parallax="1.1"
              />
            </div>
            <div id="w-node-_52509a74-3c5f-7648-f1c4-90726bc42060-263b1944" className="cta_image-wrapper is-small">
              <Image
                src={content.images.small.src}
                alt={brandAlt(content.images.small.alt)}
                width={content.images.small.width}
                height={content.images.small.height}
                sizes="(max-width: 767px) 50vw, 25vw"
                className="cta_image"
                data-image-parallax="1.1"
              />
            </div>
          </div>
        </div>
        <Spacer d={160} t={120} m={80} />
      </div>
    </section>
  );
}
