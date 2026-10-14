"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useImageParallax } from "@/hooks/useImageParallax";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./technology.css";

const content = {
  heading: "Complete Interiors,",
  headingEnd: "Designed in Vadodara",
  body: "From 2BHK and 3BHK apartments to villas, bungalows, modular kitchens, offices and showrooms, we design and deliver interiors across Vadodara, including Alkapuri, Akota, Gotri, Bhayli, Old Padra Road, Sama and Manjalpur. Every project gets space planning, 3D design and material selection before any work begins.",
  cta: { label: "Explore Our Services", href: "/about-us#solutions" },
  image: {
    src: "/images/info-img.jpg",
    alt: "Contemporary villa with timber cladding, a stone feature wall and a landscaped front garden",
  },
  card: {
    label: "Turnkey, From Concept to Keys",
    text: "One team handles design, civil and electrical work, carpentry, lighting and final styling, coordinating every contractor so your home or office is delivered on time, on budget and exactly as designed.",
  },
};

export function HomeTechnology() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);
  useImageParallax(sectionRef);

  return (
    <section ref={sectionRef} className="background-color-duck-egg">
      <Spacer d={160} m={80} />
      <div className="padding-global">
        <div className="container-large">
          <div className="u-grid">
            <h2
              data-heading-fade="100"
              id="w-node-_5e21d829-13af-868a-17fa-00e1e1f935b0-659e97e1"
              className="heading-style-h3 text-color-black"
            >
              {content.heading} <span className="display-inlineblock">{content.headingEnd}</span>
            </h2>
            <div id="w-node-_5e21d829-13af-868a-17fa-00e1e1f935b4-659e97e1">
              <div style={{ maxWidth: "60ch" }}>
                <p data-paragraph-fade="400" className="text-size-medium text-style-wrap-pretty">
                  {content.body}
                </p>
              </div>
              <Spacer d={40} />
              <div data-animate-self="600" className="button-mobile-full">
                <Button variant="light" icon label={content.cta.label} href={content.cta.href} mobileFullWidth />
              </div>
            </div>
          </div>
          <Spacer d={96} m={80} />
        </div>
      </div>

      <div className="padding-global is-mobile-none">
        <div className="container-large">
          <div className="home-tech_component">
            <div className="home-tech_image-wrapper">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                width={1200}
                height={800}
                sizes="(max-width: 479px) 260vw, (max-width: 767px) 200vw, 1376px"
                loading="eager"
                className="home-tech_image"
                data-image-parallax="1.12"
                data-image-scale="false"
              />
            </div>
            <div className="home-tech_wrapper">
              <div className="home-tech_content">
                <div
                  data-animate-self="50"
                  data-wf--info-card--variant="mobile-full-width"
                  className="info-card w-variant-d0f96736-e24f-f9ec-6ba7-baa3248baec7"
                >
                  <div data-wf--label-with-dot--variant="white" className="label-dot_wrapper">
                    <div className="label-dot_dot" />
                    <div className="label-style-1 text-style-wrap-pretty">{content.card.label}</div>
                  </div>
                  <Spacer d={16} />
                  <p className="text-style-wrap-pretty">{content.card.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
