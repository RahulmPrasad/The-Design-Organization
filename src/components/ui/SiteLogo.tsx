import Image from "next/image";
import { siteName } from "@/lib/site";

type SiteLogoProps = {
  className?: string;
  /** Rendered width hint for next/image, e.g. "100px". */
  sizes: string;
  eager?: boolean;
};

/** The Design Organization logo (light gray; darken with CSS `filter` on light backgrounds). */
export function SiteLogo({ className, sizes, eager }: SiteLogoProps) {
  return (
    <Image
      src="/images/nav-logo.png"
      alt={siteName}
      width={618}
      height={298}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={className}
    />
  );
}
