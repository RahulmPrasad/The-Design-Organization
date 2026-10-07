"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { useImageParallax } from "@/hooks/useImageParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./mission.css";

const content = {
  label: "Our Mission",
  heading: "How We Are Reimagining Everyday Spaces",
  body: "We believe great design should make daily life better. Our approach combines thoughtful planning, honest materials and close collaboration, so every home and workplace we create feels personal, works beautifully and stands the test of time.",
  features: [
    {
      title: "Personal by Design",
      text: "Every project starts with listening. We shape layouts, colours and finishes around how you actually live and work.",
      image: { src: "/images/projects/interior-2.webp", alt: "White and timber living room" },
    },
    {
      title: "Seamless Delivery",
      text: "From concept to installation, we coordinate designers, suppliers and craftspeople so the process stays simple for you.",
      image: { src: "/images/projects/interior-6.webp", alt: "White kitchen cabinets with a black pendant lamp" },
    },
    {
      title: "Lasting Quality",
      text: "We choose durable materials and timeless details, creating interiors that age gracefully and feel right for years.",
      image: { src: "/images/projects/interior-7.webp", alt: "Kitchen with grey cabinets and marble countertops" },
    },
  ],
};

/** Orange section: mission statement, then three illustrated features divided by thin lines. */
export function AboutMission() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useImageParallax(sectionRef);

  return (
    <section ref={sectionRef} className="section_mission background-color-orange text-color-white">
      <Spacer d={160} t={120} m={80} />
      <div className="padding-global">
        <div className="container-large position-relative">
          <div className="u-grid is-mobile-gap-large2">
            <div id="w-node-a6b790ca-c448-203a-8dc3-a35154a0d754-f60ad0a4">
              <Spacer d={4} />
              <h2 data-label-fade="0" className="label-style-2 text-weight-medium">
                {content.label}
              </h2>
            </div>
            <div id="w-node-a6b790ca-c448-203a-8dc3-a35154a0d758-f60ad0a4">
              <div data-heading-fade="200" className="heading-style-h3">
                {content.heading}
              </div>
              <Spacer d={24} m={16} />
              <div style={{ maxWidth: "42rem" }}>
                <p data-paragraph-fade="300" className="text-size-medium">
                  {content.body}
                </p>
              </div>
            </div>
          </div>
          <Spacer d={80} m={64} />
          <div>
            <div data-animate-list="stagger" className="features-3_component">
              {content.features.map((feature, i) => (
                <Fragment key={feature.title}>
                  {i > 0 && <div data-animate-list="static" className="features-3_v-divider" />}
                  <div>
                    <div className="features-3_item">
                      <div className="features-3_image-wrapper">
                        <Image
                          src={feature.image.src}
                          alt={feature.image.alt}
                          width={664}
                          height={928}
                          sizes="(max-width: 479px) 100vw, (max-width: 767px) 50vw, 427px"
                          className="mission_image"
                          data-image-parallax="1.08"
                          data-image-parallax-reverse="true"
                          data-image-scale="false"
                        />
                      </div>
                      <Spacer d={32} m={16} />
                      <h3 className="subtitle-2">{feature.title}</h3>
                      <Spacer d={16} m={8} />
                      <div style={{ maxWidth: "25rem" }}>
                        <p className="text-size-medium text-style-wrap-pretty">{feature.text}</p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="features-3_h-divider" />
          </div>
        </div>
      </div>
      <Spacer d={200} t={140} m={80} />
    </section>
  );
}
