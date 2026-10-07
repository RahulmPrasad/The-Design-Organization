"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "./solutions.css";

const content = {
  label: "Find the Right Solutions for You",
  intro:
    "We design interiors for every part of how you live and work, from single rooms to complete homes, offices and hospitality spaces.",
  items: [
    { title: "Residential", text: "Complete interiors for homes of every size", image: "/images/projects/interior-wide-1.webp", alt: "Living room with a grey sofa and wooden side tables" },
    { title: "Kitchens", text: "Functional, beautiful kitchens built around how you cook", image: "/images/projects/interior-wide-6.webp", alt: "Kitchen with a marble island and white cabinets" },
    { title: "Living Spaces", text: "Comfortable, considered rooms for everyday living", image: "/images/projects/interior-wide-3.webp", alt: "Living room with a fireplace" },
    { title: "Bedrooms", text: "Calm, restful spaces designed for comfort", image: "/images/projects/interior-3.webp", alt: "Bedroom with an upholstered bed and gold chandelier" },
    { title: "Workplaces", text: "Offices that support focus, collaboration and culture", image: "/images/projects/interior-wide-4.webp", alt: "Neutral-toned open living space" },
    { title: "Hospitality", text: "Welcoming interiors for cafés, restaurants and hotels", image: "/images/projects/interior-wide-2.webp", alt: "Lounge with a tan leather sectional sofa" },
    { title: "Renovations", text: "Thoughtful updates that transform existing spaces", image: "/images/projects/interior-wide-7.webp", alt: "Modern white kitchen with a marble island" },
    { title: "Styling", text: "Furniture, art and finishing touches that complete a room", image: "/images/projects/interior-8.webp", alt: "Leather sofa in front of a gallery wall" },
  ],
  href: "/services",
};

function ArrowIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M27.0088 15.6455L27.3633 15.999L27.0088 16.3525L17.6807 25.6777L16.9736 24.9707L25.4473 16.499H4V15.499H25.4473L16.9736 7.02734L17.6807 6.32031L27.0088 15.6455Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Dark section: intro, then a list of solution rows. On desktop, hovering a row shows its photo
 * in a card that follows the cursor; on phones each row shows a small thumbnail instead.
 */
export function AboutSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  useScrollReveal(sectionRef);

  // The floating card eases toward the cursor.
  useEffect(() => {
    const floating = floatingRef.current;
    if (!floating) return;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const tick = () => {
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      floating.style.transform = `translate(${current.x}px, ${current.y}px)`;
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="background-color-dark-grey text-color-white">
      <div className="padding-global">
        <Spacer d={200} t={140} m={80} />
        <div className="container-large position-relative">
          <div className="u-grid">
            <div id="w-node-c65111da-54c9-7265-559c-09496b19fc38-c65a4cfd">
              <Spacer d={4} />
              <h2 data-label-fade="0" className="label-style-2 text-weight-medium">
                {content.label}
              </h2>
            </div>
            <div data-heading-fade="300" id="w-node-c65111da-54c9-7265-559c-09496b19fc3c-c65a4cfd" className="heading-style-h5">
              {content.intro}
            </div>
          </div>
          <Spacer d={128} t={100} m={80} />
          <div className="tech-solutions_component" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            {content.items.map((item, i) => (
              <Link
                key={item.title}
                href={content.href}
                className="tech-solutions_item w-inline-block"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Image src={item.image} alt="" width={624} height={400} sizes="78px" className="tech-solutions_item-img" />
                <h3 className="heading-style-h4">{item.title}</h3>
                <p className="hide-mobile-landscape">{item.text}</p>
                <div className="tech-solutions_item-icon">
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
          {/* Cursor-following preview (desktop). Wraps collapse in order so the hovered photo shows. */}
          <div ref={floatingRef} className="tech-solutions_floating-images" style={{ opacity: hovering ? 1 : 0 }} aria-hidden="true">
            {content.items.map((item, i) => (
              <div
                key={item.title}
                className="tech-solutions_floating-image-wrap"
                style={{ zIndex: content.items.length - i, height: i < active ? "0%" : "100%" }}
              >
                <Image src={item.image} alt={item.alt} width={640} height={400} sizes="320px" className="tech-solutions_floating-image" />
              </div>
            ))}
          </div>
        </div>
        <Spacer d={200} t={140} m={80} />
      </div>
    </section>
  );
}
