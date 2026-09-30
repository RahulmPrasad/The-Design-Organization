"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const content = {
  label: "Learn More About Us",
  heading: "Discover how we work, the services we offer, and how we can bring your next space to life.",
  // Each id places its card on the Webflow grid (see webflow-pages.css).
  cards: [
    { id: "w-node-b463cb2b-518e-c44a-9ec0-cd7f6ee64868-b37d542f", title: "About Us", cta: "Learn More", href: "/about-us" },
    { id: "w-node-a97a15e4-fa78-a4c5-8972-0878e8d62ce5-b37d542f", title: "Services", cta: "Explore our services", href: "/services" },
    { id: "w-node-_26911f43-3c7c-1ae8-8bdd-806d91f40c34-b37d542f", title: "Contact", cta: "Start a project", href: "/contact" },
  ],
};

/** Black section with an intro and three blue link cards. */
export function LearnMore() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="overflow-clip background-color-black text-color-white position-relative">
      <div className="padding-global z-index-2">
        <div>
          <Spacer d={200} t={160} m={80} />
        </div>
        <div className="container-large">
          <div className="u-grid">
            <h2
              id="w-node-f57b2d7e-06a8-f0ef-47bd-e6232a0d6efb-2a0d6ef6"
              data-label-fade="0"
              className="label-style-2 text-weight-medium"
            >
              {content.label}
            </h2>
            <div id="w-node-f57b2d7e-06a8-f0ef-47bd-e6232a0d6efd-2a0d6ef6">
              <p data-heading-fade="300" className="heading-style-h3">
                {content.heading}
              </p>
            </div>
          </div>
          <Spacer d={80} />
          <div data-animate-list="stagger" className="u-grid">
            {content.cards.map((card) => (
              <div key={card.id} id={card.id}>
                <div className="about-cta_card">
                  <div className="heading-style-h5">{card.title}</div>
                  <Button variant="tertiary-dark" icon label={card.cta} href={card.href} desktopFullWidth mobileFullWidth />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Spacer d={200} t={160} m={80} />
        </div>
      </div>
    </section>
  );
}
