"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Spacer } from "@/components/ui/Spacer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { posts } from "@/lib/blog";
import { BlogCard, CategoryLabel, PostMeta } from "./BlogCard";
import "./blog.css";

const content = {
  label: "Blog",
  heading: "Interior Design Ideas & Guides",
  intro: "Practical advice on planning, materials, kitchens, lighting and more, for homes and workplaces in Vadodara.",
  latest: "Latest posts",
  more: "Design guides",
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="100%" height="100%" style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 10h11M11 5.5l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/** Blog index: featured post beside the latest list, then a sideways row of every other article. */
export function BlogIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);

  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 4);

  // Scroll the card row by one card's width (plus the gap).
  const scrollRow = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="section_blog text-color-black">
      <Spacer d={180} t={160} m={130} />
      <div className="padding-global">
        <div className="container-large">
          <div className="blog_header">
            <div>
              <p data-label-fade="0" className="label-style-2 text-weight-medium">
                {content.label}
              </p>
              <Spacer d={24} m={16} />
              <h1 className="heading-style-h3">{content.heading}</h1>
            </div>
            <p data-paragraph-fade="200" className="blog_intro subtitle-1 text-style-wrap-pretty">
              {content.intro}
            </p>
          </div>
          <Spacer d={64} m={40} />

          {/* Featured post and the latest list */}
          <div className="blog_top">
            <Link href={`/blog/${featured.slug}`} className="blog_featured" data-animate-self="100">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                fill
                preload
                sizes="(max-width: 991px) 100vw, 62vw"
                className="blog_cover"
              />
              <div className="blog_featured-content">
                <CategoryLabel category={featured.category} variant="white" />
                <h2 className="heading-style-h5 text-color-white text-style-wrap-pretty">{featured.title}</h2>
                <PostMeta post={featured} className="is-light" />
              </div>
            </Link>

            <div className="blog_latest">
              <h2 className="subtitle-2 text-color-black">{content.latest}</h2>
              <ul className="blog_latest-list" role="list">
                {latest.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="blog_latest-item">
                      <span className="blog_latest-thumb">
                        <Image src={post.image.src} alt={post.image.alt} fill sizes="6rem" className="blog_cover" />
                      </span>
                      <span className="blog_latest-text">
                        <span className="blog_latest-title">{post.title}</span>
                        <PostMeta post={post} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="blog_divider" />

          {/* Every article except the featured one, in a row that scrolls sideways */}
          <div className="blog_row-header">
            <h2 className="heading-style-h5 text-color-black">{content.more}</h2>
            <div className="blog_arrows">
              <button type="button" className="blog_arrow" aria-label="Previous articles" onClick={() => scrollRow(-1)}>
                <ArrowIcon direction="left" />
              </button>
              <button type="button" className="blog_arrow" aria-label="Next articles" onClick={() => scrollRow(1)}>
                <ArrowIcon direction="right" />
              </button>
            </div>
          </div>
          <Spacer d={32} m={24} />
          <div ref={trackRef} className="blog_track">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>
      <Spacer d={160} t={120} m={80} />
    </section>
  );
}
