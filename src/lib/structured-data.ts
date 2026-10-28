import type { Faq } from "@/lib/faq";
import { areasServed, business, citiesServed, city, services, siteDescription, siteName, siteUrl } from "@/lib/site";

// schema.org JSON-LD for search engines and AI answer engines.
// Validate changes with https://search.google.com/test/rich-results and https://validator.schema.org/.

type Json = Record<string, unknown>;

const businessId = `${siteUrl}/#business`;
const websiteId = `${siteUrl}/#website`;

/** Drops empty strings, nulls and empty arrays so unfilled business details never reach the markup. */
function compact<T extends Json>(object: T): T {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== "" && value != null && !(Array.isArray(value) && value.length === 0)),
  ) as T;
}

/** The studio as a local business: the core entity Google's local results and AI answers use. */
export function businessSchema(): Json {
  const { address, geo } = business;
  return compact({
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "ProfessionalService"],
    "@id": businessId,
    name: siteName,
    legalName: business.legalName,
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}/images/nav-logo.png`,
    image: [`${siteUrl}/images/projects/interior-wide-2.webp`, `${siteUrl}/images/projects/interior-wide-7.webp`],
    telephone: business.phone,
    email: business.email,
    priceRange: business.priceRange,
    foundingDate: business.foundingYear,
    openingHours: business.openingHours,
    hasMap: business.mapUrl,
    sameAs: business.profiles,
    address: compact({
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    }),
    geo: geo && { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "City", name: city, alternateName: "Baroda", containedInPlace: { "@type": "State", name: "Gujarat" } },
      ...citiesServed.filter((name) => name !== city).map((name) => ({ "@type": "City", name, containedInPlace: { "@type": "Country", name: "India" } })),
      ...areasServed.map((name) => ({ "@type": "Place", name: `${name}, ${city}` })),
    ],
    knowsAbout: [
      "Architecture",
      "Interior design",
      "Residential architecture",
      "Commercial architecture",
      "Institutional architecture",
      "Product design",
      "Furniture design",
      "Urban design",
      "Landscape design",
      "Residential interior design",
      "Modular kitchen design",
      "Office interior design",
      "Commercial interior design",
      "Hospitality interior design",
      "Turnkey interiors",
      "3D interior visualisation",
      "Space planning",
      "Vastu-compliant interiors",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Architecture and interior design services in ${city}`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name, description: service.description, areaServed: city },
      })),
    },
  });
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    inLanguage: "en-IN",
    publisher: { "@id": businessId },
  };
}

export function faqSchema(faqs: Faq[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a.join(" ") },
    })),
  };
}

/** Breadcrumb trail from the homepage, e.g. breadcrumbSchema([{ name: "Projects", path: "/projects" }]). */
export function breadcrumbSchema(trail: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}
