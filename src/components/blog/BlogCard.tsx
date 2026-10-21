import Image from "next/image";
import Link from "next/link";
import { formatPostDate, readingMinutes, type BlogPost } from "@/lib/blog";

/** Category with the theme's dot label (as on the home page info card). */
export function CategoryLabel({ category, variant = "dark" }: { category: string; variant?: "dark" | "white" }) {
  return (
    <div className={`label-dot_wrapper blog_category is-${variant}`}>
      <div className="label-dot_dot" />
      <div className="label-style-1">{category}</div>
    </div>
  );
}

export function PostMeta({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <div className={`blog_meta ${className}`}>
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span className="blog_meta-dot" aria-hidden="true" />
      <span>{readingMinutes(post)} min read</span>
    </div>
  );
}

/** Card with image, category, title, excerpt and date; the whole card links to the article. */
export function BlogCard({ post, headingLevel: Heading = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog_card">
      <div className="blog_card-image-wrap">
        <Image src={post.image.src} alt={post.image.alt} fill sizes="(max-width: 767px) 85vw, 30vw" className="blog_cover" />
      </div>
      <div className="blog_card-body">
        <CategoryLabel category={post.category} />
        <Heading className="subtitle-2 text-color-black">{post.title}</Heading>
        <p className="blog_excerpt">{post.excerpt}</p>
        <PostMeta post={post} />
      </div>
    </Link>
  );
}
