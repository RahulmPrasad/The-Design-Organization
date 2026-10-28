import type { Metadata } from "next";
import { AboutFaq } from "@/components/about/AboutFaq";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeTeam } from "@/components/home/HomeTeam";
import { HomeTechnology } from "@/components/home/HomeTechnology";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faq";
import { pageMetadata } from "@/lib/metadata";
import { city, siteName } from "@/lib/site";
import { faqSchema } from "@/lib/structured-data";

const homeMetadata = pageMetadata({
  title: `Best Interior Designers in ${city} | ${siteName}`,
  description: `Looking for an interior designer in ${city}? ${siteName} designs apartments, villas, modular kitchens, offices and cafés across Alkapuri, Gotri, Akota, Bhayli and all of Vadodara, with 3D design and turnkey execution.`,
  path: "/",
});

export const metadata: Metadata = {
  ...homeMetadata,
  // Absolute: the homepage leads with the search phrase rather than the "| Brand" suffix.
  title: { absolute: homeMetadata.title as string },
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <HomeHero />
      <HomeAbout />
      <HomeTechnology />
      <HomeTeam />
      <AboutFaq />
      <Testimonials />
    </>
  );
}
