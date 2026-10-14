"use client";

import "@splidejs/splide/css/core";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { prefersReducedMotion } from "@/lib/media";
import "./home-team.css";

const portrait = { width: 664, height: 928 };
const landscape = { width: 1600, height: 1000 };

const content = {
  heading: "Crafted by a Team That Cares",
  body: "From first sketch to final styling, our designers, project managers and trusted Vadodara craftspeople work side by side on every detail. We collaborate closely with you at each stage, so the finished space feels exactly right.",
  cta: { label: "Contact Us to Learn More", href: "/contact" },
  // Alternating portrait and landscape, like the reference.
  images: [
    { src: "/images/projects/interior-3.webp", alt: "Bedroom with an upholstered bed and gold chandelier", ...portrait },
    { src: "/images/projects/interior-wide-2.webp", alt: "Living room with a tan leather sectional sofa", ...landscape },
    { src: "/images/projects/interior-5.webp", alt: "Bedroom with a round mirror above the bed", ...portrait },
    { src: "/images/projects/interior-wide-7.webp", alt: "Modern white kitchen with a marble island", ...landscape },
    { src: "/images/projects/interior-8.webp", alt: "Leather sofa in front of a gallery wall", ...portrait },
    { src: "/images/projects/interior-wide-4.webp", alt: "Neutral-toned living room", ...landscape },
  ],
};

/** Intro with a contact button, then a strip of photos that scrolls sideways on its own. */
export function HomeTeam() {
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
          autoScroll: { speed: 0.8, pauseOnHover: false, autoStart: !prefersReducedMotion() },
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
    <section ref={sectionRef} className="overflow-clip">
      <Spacer d={160} m={80} />
      <div className="padding-global">
        <div className="container-large">
          <div className="u-grid">
            <h2 data-heading-fade="0" id="w-node-_5e21d829-13af-868a-17fa-00e1e1f93644-659e97e1" className="heading-style-h3 text-color-black">
              {content.heading}
            </h2>
            <div id="w-node-_5e21d829-13af-868a-17fa-00e1e1f93646-659e97e1">
              <p data-paragraph-fade="300" className="text-size-medium">
                {content.body}
              </p>
              <Spacer d={40} m={48} />
              <div data-animate-self="600" className="button-mobile-full">
                <Button variant="light" icon label={content.cta.label} href={content.cta.href} mobileFullWidth />
              </div>
            </div>
          </div>
          <Spacer d={96} m={64} />
          <div className="splide_wrapper">
            <div ref={splideRef} className="splide is-home-zroc" aria-label="Interior design work">
              <div className="splide__track">
                <div className="splide__list">
                  {content.images.map((image) => (
                    <div key={image.src} className="splide__slide">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(max-width: 767px) 384px, 742px"
                        className="home-zroc_splide-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Spacer d={48} m={32} />
    </section>
  );
}
