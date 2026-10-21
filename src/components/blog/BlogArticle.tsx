import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Spacer } from "@/components/ui/Spacer";
import { posts, type BlogPost } from "@/lib/blog";
import { BlogCard, CategoryLabel, PostMeta } from "./BlogCard";
import "./blog.css";

/** One article: back link, title, cover image, body, a call to action and three more posts. */
export function BlogArticle({ post }: { post: BlogPost }) {
  // Same category first, then the most recent of the rest.
  const related = [
    ...posts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <article className="section_blog text-color-black">
      <Spacer d={180} t={160} m={130} />
      <div className="padding-global">
        <div className="container-large">
          <Link href="/blog" className="blog_back">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M16 10H5M9 5.5L4.5 10 9 14.5" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            All articles
          </Link>
          <Spacer d={32} m={24} />

          <header className="blog_article-header">
            <CategoryLabel category={post.category} />
            <h1 className="heading-style-h3 text-style-wrap-pretty">{post.title}</h1>
            <PostMeta post={post} />
          </header>
          <Spacer d={48} m={32} />

          <div className="blog_article-image">
            <Image src={post.image.src} alt={post.image.alt} fill preload sizes="(max-width: 1440px) 100vw, 1440px" className="blog_cover" />
          </div>
          <Spacer d={64} m={40} />

          <div className="blog_article-body text-size-medium">
            <p className="blog_article-lead">{post.excerpt}</p>
            {post.sections.map((section, i) => (
              <section key={section.heading ?? i}>
                {section.heading && <h2 className="heading-style-h5">{section.heading}</h2>}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="blog_cta">
            <div>
              <p className="subtitle-2 text-color-black">Planning your interiors?</p>
              <Spacer d={8} />
              <p>Tell us about your space and we&apos;ll arrange a consultation.</p>
            </div>
            <Button variant="light" icon label="Contact Us" href="/contact" />
          </div>

          <div className="blog_divider" />
          <h2 className="heading-style-h5 text-color-black">More articles</h2>
          <Spacer d={32} m={24} />
          <div className="blog_related">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </div>
      <Spacer d={160} t={120} m={80} />
    </article>
  );
}
