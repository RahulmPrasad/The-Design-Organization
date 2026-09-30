export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const mainNav: SiteLink[] = [
  { label: "Company", href: "/about-us" },
  { label: "Technology", href: "/technology" },
  { label: "Solutions", href: "/solutions" },
  { label: "Our Edge", href: "/our-edge" },
  { label: "Our Team", href: "/team" },
  { label: "Investors", href: "/investors-private" },
  { label: "News", href: "/news" },
];

export const contactLink: SiteLink = { label: "Get in Touch", href: "/contact" };

// Each column's id places it on the Webflow grid (see webflow-theme.css).
export const footerColumns: { id: string; links: SiteLink[] }[] = [
  {
    id: "w-node-_78e76d15-8bbc-8e48-95ae-2dee7a4d395e-7a4d3953",
    links: [
      { label: "Company", href: "/about-us" },
      { label: "Technology", href: "/technology" },
      { label: "Solutions", href: "/solutions" },
      { label: "Our Edge", href: "/our-edge" },
      { label: "Investors", href: "/investors-private" },
    ],
  },
  {
    id: "w-node-_78e76d15-8bbc-8e48-95ae-2dee7a4d3967-7a4d3953",
    links: [
      { label: "Our Team", href: "/team" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    id: "w-node-_5fd0093a-e90f-916e-2ea6-8b3aeef95f9f-7a4d3953",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/zettajoule", external: true },
      { label: "Follow Us on X", href: "https://x.com/ZettaJouleInc", external: true },
    ],
  },
];

export const legalLinks: SiteLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
];
