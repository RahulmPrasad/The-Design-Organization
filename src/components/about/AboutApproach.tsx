"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useImageParallax } from "@/hooks/useImageParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./approach.css";

const content = {
  heading: "How we bring interiors to life",
  body: "From the first conversation to the final styling, we turn ideas into spaces that feel personal and work beautifully. Our team guides every step: planning layouts, selecting materials and finishes, and coordinating the craftspeople who make it real.",
  cta: { label: "View Our Projects", href: "/projects" },
  image: { src: "/images/projects/about3.jpeg", alt: "White and timber kitchen", width: 1600, height: 1000 },
};

/** White section: large image on the left, heading, text and a button on the right. */
export function AboutApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useImageParallax(sectionRef);

  return (
    <section ref={sectionRef} id="approach" data-page-load="next-section" className="section_approach text-color-black">
      <Spacer d={160} t={120} m={80} />
      <div className="padding-global">
        <div className="container-large">
          <div className="u-grid is-mobile-gap-large">
            <div data-animate-self="0" id="w-node-e86044f7-9a8b-36ca-5ef1-8d006a5ee249-f88ddc69" className="solutions-applications_image-wrapper">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                sizes="(max-width: 767px) 100vw, 60vw"
                className="approach_image"
                data-image-parallax="1.12"
                data-image-scale="false"
              />
            </div>
            <div className="hide-mobile-landscape" />
            <div id="w-node-e86044f7-9a8b-36ca-5ef1-8d006a5ee24c-f88ddc69" className="solutions-applications_content">
              <h2 data-heading-fade="0" className="heading-style-h4 text-style-wrap-pretty">
                {content.heading}
              </h2>
              <Spacer d={24} />
              <p data-heading-fade="100" className="text-size-medium text-style-wrap-pretty text-color-grey-750">
                {content.body}
              </p>
              <Spacer d={40} />
              <div data-animate-self="200" className="mobile-portrait-full-width">
                <Button variant="light" icon label={content.cta.label} href={content.cta.href} mobileFullWidth />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacer d={160} t={120} m={80} />
    </section>
  );
}
