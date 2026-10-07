"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./learn-more.css";

const content = {
  label: "Learn More About Us",
  heading: "Discover how we work, the services we offer, and how we can bring your next space to life.",
  // Three cards are shown, skipping `currentPage`.
  cards: [
    { title: "About Us", cta: "Learn More", href: "/about-us", image: "/images/projects/interior-wide-8.webp" },
    { title: "Services", cta: "Explore our services", href: "/services", image: "/images/projects/interior-wide-6.webp" },
    { title: "Projects", cta: "View our work", href: "/projects", image: "/images/projects/interior-wide-1.webp" },
    { title: "Contact", cta: "Start a project", href: "/contact", image: "/images/projects/interior-wide-3.webp" },
  ],
};

// Each id places one card slot on the Webflow grid (see webflow-theme.css).
const CARD_SLOT_IDS = [
  "w-node-b463cb2b-518e-c44a-9ec0-cd7f6ee64868-b37d542f",
  "w-node-a97a15e4-fa78-a4c5-8972-0878e8d62ce5-b37d542f",
  "w-node-_26911f43-3c7c-1ae8-8bdd-806d91f40c34-b37d542f",
];

/** Black section with an intro and three photo link cards to other pages. */
export function LearnMore({ currentPage }: { currentPage?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cards = content.cards.filter((card) => card.href !== currentPage).slice(0, CARD_SLOT_IDS.length);
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
            {cards.map((card, i) => (
              <div key={card.href} id={CARD_SLOT_IDS[i]}>
                <div className="about-cta_card has-image">
                  {/* Decorative: the card's title and link carry the meaning. */}
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, 33vw"
                    className="about-cta_card-image"
                  />
                  <div className="about-cta_card-overlay" aria-hidden="true" />
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
