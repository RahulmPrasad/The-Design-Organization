export const siteName = "The Design Organization";

/** Public origin used for canonical URLs, the sitemap and structured data. NEXT_PUBLIC_SITE_URL can override it (e.g. for a staging site). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.thedesignorganization.in").replace(/\/$/, "");

export const city = "Vadodara";

/** Image alt text with the studio's name, e.g. "Modern kitchen – The Design Organization". */
export const brandAlt = (description: string) => `${description} – ${siteName}`;

/** Short pitch reused as the default meta description and in structured data. */
export const siteDescription =
  "The Design Organization is an architecture and interior design studio in Vadodara, Gujarat, working on residential and commercial architecture and interiors, institutional projects, product design, urban design and landscape design, from concept to completion.";

/**
 * Name, address and phone (NAP) for local SEO. These must match the Google Business Profile exactly.
 * Empty fields are left out of the page and the structured data, so fill them in as soon as they're known.
 */
export const business = {
  legalName: siteName,
  phone: "+91 93273 35458",
  whatsapp: "919327335458", // digits only
  email: "thedesignorganizationindia@gmail.com",
  address: {
    street: "", // e.g. "301, Example Complex, Old Padra Road"
    locality: "Vadodara",
    region: "Gujarat",
    postalCode: "", // e.g. "390007"
    country: "IN",
  },
  /** Google Maps "share" link to the studio's Business Profile. */
  mapUrl: "",
  /** Latitude/longitude of the studio, e.g. { lat: 22.3072, lng: 73.1812 }. */
  geo: null as { lat: number; lng: number } | null,
  openingHours: "", // schema.org format, e.g. "Mo-Sa 10:00-19:00"
  priceRange: "", // e.g. "₹₹"
  foundingYear: "",
  /** Instagram, Facebook, LinkedIn, Houzz, JustDial etc. Used as `sameAs` in structured data. */
  profiles: [
    "https://www.instagram.com/thedesignorganization",
    "https://www.facebook.com/GodownofDesignStudio/",
    "https://in.linkedin.com/company/the-design-organization",
  ],
};

export type SitePage = {
  path: string;
  title: string;
  /** One line on what the page covers, for llms.txt. */
  summary: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
};

/** Every indexable page. Feeds sitemap.xml, sitemap.txt and llms.txt, so add new pages (/services, /contact…) here. */
export const sitePages: SitePage[] = [
  {
    path: "/",
    title: "Best Interior Designers in Vadodara",
    summary: "Overview of the studio: residential, kitchen, office and hospitality interiors across Vadodara, turnkey delivery and FAQs.",
    priority: 1,
    changeFrequency: "weekly",
  },
  {
    path: "/services",
    title: "Architecture & Interior Design Services in Vadodara",
    summary: "The studio's services: residential and commercial architecture and interiors, institutional projects, product design, urban design and landscape design.",
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/projects",
    title: "Interior Design Projects & Portfolio in Vadodara",
    summary: "Portfolio of home, apartment, villa, kitchen, workplace and hospitality interiors.",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/about-us",
    title: "About Our Interior Design Studio in Vadodara",
    summary: "How the studio works (approach, mission, design process), the services offered and answers to common questions.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/blog",
    title: "Home Interior Ideas & Design Tips for Vadodara Homes",
    summary: "Articles on planning a home, materials for Vadodara's climate, modular kitchens, small spaces, Vastu, lighting and budgeting.",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/contact",
    title: "Contact Interior Designers in Vadodara",
    summary: "Phone, WhatsApp, email and an enquiry form to book an interior design consultation.",
    priority: 0.8,
    changeFrequency: "monthly",
  },
];

/** Absolute URL for a site path ("/" maps to the bare origin). */
export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

/** Cities the studio takes projects in (pan India): used in the FAQ, structured data and llms.txt. */
export const citiesServed = ["Vadodara", "Ahmedabad", "Surat", "Pune", "Guwahati", "Jodhpur", "Udaipur", "Jaipur"];

/** Joins items as "A, B and C". */
export function listWithAnd(items: string[]) {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** Vadodara neighbourhoods the studio works in: shown on the site and listed as `areaServed`. */
export const areasServed = [
  "Alkapuri",
  "Akota",
  "Gotri",
  "Bhayli",
  "Vasna-Bhayli Road",
  "Old Padra Road",
  "Sama",
  "New Sama",
  "Karelibaug",
  "Manjalpur",
  "Fatehgunj",
  "Waghodia Road",
  "Harni",
  "Sevasi",
  "Tandalja",
  "Atladara",
];

/** The studio's services: shown on the Services page and published in structured data and llms.txt. */
export const services = [
  { name: "Residential Architecture", description: "Homes, villas, bungalows and residential buildings, from site planning and concept design to working drawings and support during construction." },
  { name: "Residential Interiors", description: "Complete interiors for apartments, 2BHK to 4BHK flats, villas and bungalows: space planning, 3D design, kitchens, wardrobes and turnkey execution." },
  { name: "Commercial Architecture", description: "Offices, showrooms, retail and mixed-use buildings designed around how the business works and how people move through them." },
  { name: "Commercial Interiors", description: "Workplaces, showrooms, shops, cafés, restaurants and hotels that express the brand and are built for everyday use." },
  { name: "Institutional Projects", description: "Schools, colleges, healthcare and community buildings planned for heavy daily use, clear circulation and a long life." },
  { name: "Product Design", description: "Custom furniture, lighting and fixtures designed in-house and made to fit the spaces we create." },
  { name: "Urban Design", description: "Streetscapes, public spaces and neighbourhood layouts that make places easier and more pleasant to live and work in." },
  { name: "Landscape Design", description: "Gardens, courtyards, terraces and campus landscapes that connect buildings with the outdoors." },
] as const;

export type SiteLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const mainNav: SiteLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const contactLink: SiteLink = { label: "Get in Touch", href: "/contact" };

// Each column's id places it on the Webflow grid (see webflow-theme.css).
export const footerColumns: { id: string; links: SiteLink[] }[] = [
  {
    // Pages
    id: "w-node-_78e76d15-8bbc-8e48-95ae-2dee7a4d395e-7a4d3953",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about-us" },
      { label: "Projects", href: "/projects" },
      { label: "Our Approach", href: "/about-us#approach" },
      { label: "FAQ", href: "/about-us#faq" },
    ],
  },
  {
    // Services
    id: "w-node-_78e76d15-8bbc-8e48-95ae-2dee7a4d3967-7a4d3953",
    links: [
      { label: "Residential", href: "/services" },
      { label: "Commercial", href: "/services" },
      { label: "Institutional", href: "/services" },
      { label: "Product Design", href: "/services" },
      { label: "Urban & Landscape", href: "/services" },
    ],
  },
  {
    // Connect: the "Connect With Us" section sits above the footer on every page.
    id: "w-node-_5fd0093a-e90f-916e-2ea6-8b3aeef95f9f-7a4d3953",
    links: [
      { label: "Start a Project", href: "#cta" },
      { label: "Instagram", href: "https://www.instagram.com/thedesignorganization", external: true },
      { label: "Facebook", href: "https://www.facebook.com/GodownofDesignStudio/", external: true },
      { label: "LinkedIn", href: "https://in.linkedin.com/company/the-design-organization", external: true },
      { label: "WhatsApp", href: "https://wa.me/919327335458", external: true },
    ],
  },
];

// No legal pages yet; add e.g. { label: "Privacy Policy", href: "/privacy-policy" } once the page exists.
export const legalLinks: SiteLink[] = [];
