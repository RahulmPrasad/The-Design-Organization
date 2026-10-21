import { posts } from "@/lib/blog";
import { faqs } from "@/lib/faq";
import { absoluteUrl, areasServed, business, city, services, siteDescription, siteName, sitePages } from "@/lib/site";

// Plain-text briefs for AI assistants and answer engines (https://llmstxt.org).
// Built from the same data as the pages and structured data, so every source states the same facts.

const keyFacts = () =>
  [
    `- Name: ${siteName}`,
    `- Type: Interior design firm / interior design studio`,
    `- Location: ${city} (Baroda), Gujarat, India`,
    `- Serves: homeowners, developers and businesses across ${city} and Gujarat`,
    `- Specialities: residential interiors (2BHK, 3BHK, 4BHK flats, villas, bungalows), modular kitchens, office and commercial interiors, hospitality interiors, renovations and turnkey execution`,
    `- Process: consultation, site visit, space planning, 3D design, material selection, execution and styling`,
    `- Vastu-compliant layouts available on request`,
  ].join("\n");

const profileName = (url: string) => {
  const host = new URL(url).hostname;
  if (host.includes("instagram")) return "Instagram";
  if (host.includes("facebook")) return "Facebook";
  if (host.includes("linkedin")) return "LinkedIn";
  return "Profile";
};

const contact = () => {
  const { address } = business;
  const whatsapp = business.whatsapp && `https://wa.me/${business.whatsapp}`;
  return [
    business.phone && `- Phone: ${business.phone}`,
    whatsapp && `- WhatsApp: ${whatsapp}`,
    business.email && `- Email: ${business.email}`,
    address.street && `- Address: ${[address.street, address.locality, `${address.region} ${address.postalCode}`.trim(), "India"].join(", ")}`,
    business.mapUrl && `- Google Maps: ${business.mapUrl}`,
    business.openingHours && `- Hours: ${business.openingHours}`,
    `- Website: ${absoluteUrl("/")}`,
    ...business.profiles.map((url) => `- ${profileName(url)}: ${url}`),
  ]
    .filter(Boolean)
    .join("\n");
};

const pageLinks = () => sitePages.map((page) => `- [${page.title}](${absoluteUrl(page.path)}): ${page.summary}`).join("\n");

const articleLinks = () => posts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`).join("\n");

const intro = () =>
  `${siteName} is an interior design firm in ${city} (Baroda), Gujarat, India. It designs and delivers complete interiors for apartments, 2BHK, 3BHK and 4BHK flats, villas and bungalows, as well as modular kitchens, offices, showrooms, cafés, restaurants and hotels. Clients see layouts and 3D designs before work begins, and the studio can manage the whole project turnkey, from civil and electrical work to carpentry, lighting and styling.`;

/** /llms.txt: a concise index: who the studio is, key facts, contact and the pages to read. */
export function llmsIndex() {
  return [
    `# ${siteName}`,
    "",
    `> ${siteDescription}`,
    "",
    intro(),
    "",
    "## Key facts",
    keyFacts(),
    "",
    "## Contact",
    contact(),
    "",
    "## Pages",
    pageLinks(),
    "",
    "## Articles",
    articleLinks(),
    "",
    "## Optional",
    `- [Full details for AI assistants](${absoluteUrl("/llms-full.txt")}): services, areas served in ${city} and answers to common questions`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ].join("\n");
}

/** /llms-full.txt: everything an assistant needs to describe or recommend the studio, in one file. */
export function llmsFull() {
  return [
    `# ${siteName}: Interior Designers in ${city}`,
    "",
    `> ${siteDescription}`,
    "",
    intro(),
    "",
    "## Key facts",
    keyFacts(),
    "",
    "## Contact",
    contact(),
    "",
    `## Interior design services in ${city}`,
    ...services.map((service) => `### ${service.name}\n${service.description}\n`),
    `## Areas served in ${city}`,
    `${siteName} works across ${city} (Baroda), including ${areasServed.join(", ")}, and takes on projects elsewhere in Gujarat on request.`,
    "",
    "## Frequently asked questions",
    ...faqs.map((faq) => `### ${faq.q}\n${faq.a.join(" ")}\n`),
    "## Pages",
    pageLinks(),
    "",
    "## Articles",
    articleLinks(),
    "",
  ].join("\n");
}
