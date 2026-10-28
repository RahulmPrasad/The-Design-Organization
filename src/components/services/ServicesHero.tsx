"use client";

import "@splidejs/splide/css/core";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { prefersReducedMotion } from "@/lib/media";
import { brandAlt, citiesServed, services } from "@/lib/site";
import "./services.css";

const content = {
  label: "Services",
  heading: "Architecture & Interior Design Services",
  intro: "From homes and workplaces to campuses, products and public spaces, we design at every scale and take each project from concept to completion.",
  citiesLabel: "Designing spaces across India",
};

type Photo = { src: string; alt: string };

// One card per service in site.ts, in the same order. The photos are stand-ins until real project photos are added.
const photos: Record<(typeof services)[number]["name"], Photo> = {
  "Residential Architecture": { src: "/images/projects/house-3.webp", alt: "Modern white house with large windows and a swimming pool" },
  "Residential Interiors": { src: "/images/projects/interior-1.webp", alt: "Bright living room with timber ceiling beams, arched windows and a fireplace" },
  "Commercial Architecture": { src: "/images/projects/house-7.webp", alt: "Multi-storey building with a stone and metal-screen facade lit at dusk" },
  "Commercial Interiors": { src: "/images/projects/mission3.jpeg", alt: "Timber-panelled lounge with low shelving and a round coffee table" },
  "Institutional Projects": { src: "/images/tech-building.webp", alt: "Campus building set in open green landscape beside a river" },
  "Product Design": { src: "/images/home/cta-small.webp", alt: "Sitting area with an orange armchair, rattan sideboard and round mirror" },
  "Urban Design": { src: "/images/projects/house-4.webp", alt: "Residential street with neighbouring houses and trees" },
  "Landscape Design": { src: "/images/projects/project-img-3.jpg", alt: "Modern white villa with glass walls and a lawn" },
};

/** Services hero: blog-style heading row (title left, intro right), then a strip of service photos that scrolls on its own. */
export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const splideRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  useEffect(() => {
    const el = splideRef.current;
    if (!el) return;
    let disposed = false;
    let destroy = () => {};

    Promise.all([import("@splidejs/splide"), import("@splidejs/splide-extension-auto-scroll")]).then(
      ([{ Splide }, { AutoScroll }]) => {
        if (disposed) return;
        const splide = new Splide(el, {
          type: "loop",
          autoWidth: true,
          drag: false,
          gap: "1rem",
          arrows: false,
          pagination: false,
          autoScroll: { speed: 0.6, pauseOnHover: true, autoStart: !prefersReducedMotion() },
        });
        splide.mount({ AutoScroll });
        destroy = () => splide.destroy();
      },
    );

    return () => {
      disposed = true;
      destroy();
    };
  }, []);

  return (
    <section ref={sectionRef} className="services-hero text-color-black">
      <Spacer d={180} t={160} m={130} />
      <div className="padding-global">
        <div className="container-large">
          <div className="services-hero_header">
            <div>
              <p data-label-fade="0" className="label-style-2 text-weight-medium">
                {content.label}
              </p>
              <Spacer d={24} m={16} />
              <h1 className="heading-style-h3">{content.heading}</h1>
            </div>
            <p data-paragraph-fade="200" className="services-hero_intro subtitle-1 text-style-wrap-pretty">
              {content.intro}
            </p>
          </div>
        </div>
      </div>
      <Spacer d={64} m={48} />

      {/* Runs the full screen width, past the page margins. */}
      <div ref={splideRef} className="splide services-hero_carousel" aria-label="Interior design services">
        <div className="splide__track">
          <ul className="splide__list">
            {services.map(({ name }) => (
              <li key={name} className="splide__slide services-hero_card">
                <Image src={photos[name].src} alt={brandAlt(photos[name].alt)} fill sizes="(max-width: 767px) 18rem, 28rem" className="services-hero_card-image" />
                <h2 className="services-hero_card-title">{name}</h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Spacer d={80} m={56} />
      <div className="padding-global">
        <div className="container-large">
          <p data-label-fade="0" className="services-hero_cities-label label-style-2">
            {content.citiesLabel}
          </p>
          <Spacer d={24} m={16} />
          <ul className="services-hero_cities" role="list" data-animate-list="stagger">
            {citiesServed.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
      <Spacer d={128} m={80} />
    </section>
  );
}
