import { areasServed, citiesServed, listWithAnd, services, siteName } from "@/lib/site";

export type Faq = { q: string; a: string[] };

// Shown in the FAQ accordion and published as FAQPage structured data, so the two always match.
// Answers lead with a direct one-sentence reply: that's the part search and AI answers quote.
export const faqs: Faq[] = [
  {
    q: "What design services do you offer in Vadodara?",
    a: [
      `${siteName} offers ${listWithAnd(services.map((service) => service.name.toLowerCase()))}. On residential work that covers homes, apartments, 2BHK to 4BHK flats, villas and bungalows; on commercial work, offices, showrooms, shops, cafés, restaurants and hotels.`,
      "We take projects from the first concept and 3D design through to execution, and can handle turnkey delivery.",
    ],
  },
  {
    q: "Which cities do you serve?",
    a: [
      `We serve clients across India, including ${listWithAnd(citiesServed)}, and take on projects in other cities too.`,
      `Our studio is based in Vadodara (Baroda), where we work in every part of the city, including ${listWithAnd(areasServed)}.`,
    ],
  },
  {
    q: "How much does interior design cost in Vadodara?",
    a: [
      "The cost depends on the size of the space, the scope of work and the materials you choose, so a single modular kitchen and a full 3BHK fit-out are priced very differently. After a site visit we share a detailed, itemised quotation, and we plan the design around an agreed budget so there are no surprises later.",
    ],
  },
  {
    q: "Do you provide turnkey interior design?",
    a: [
      "Yes. We can take a project from the first concept and 3D design through material selection, civil and electrical work, carpentry, lighting and final styling, coordinating every contractor on your behalf. If you prefer, we can also work alongside contractors you already trust.",
    ],
  },
  {
    q: "Will I see a 3D design before work starts?",
    a: [
      "Yes. We prepare layouts, mood boards and 3D views so you can see how each room will look and refine materials, colours and furniture before anything is built.",
    ],
  },
  {
    q: "How long does an interior project take?",
    a: [
      "It depends on scope. A single room or modular kitchen can take a few weeks, while a complete apartment or villa usually takes a few months. We share a clear timeline before work begins and keep you updated at every stage.",
    ],
  },
  {
    q: "Can you design my home according to Vastu?",
    a: ["Yes. If Vastu matters to you, we factor it into the layout, room placement and orientation from the very first planning stage."],
  },
  {
    q: "How do I start a project with you?",
    a: [
      "Get in touch to book a consultation. We'll discuss your space, style and budget, visit the site, and then share a design approach and quotation tailored to your home or business.",
    ],
  },
];
