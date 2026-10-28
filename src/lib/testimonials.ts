export type Testimonial = {
  quote: string;
  name: string;
  /** Short line under the name, e.g. project type and area. */
  detail: string;
};

/*
 * SAMPLE CONTENT: replace with genuine client reviews (and their permission) before going live.
 * Don't publish invented reviews or ratings. They mislead visitors, and fake review data can get a
 * site penalised by Google. For the same reason this section publishes no Review structured data.
 */

/** Summary card shown first. Set to `null` to hide it until you have a real rating to show. */
export const ratingSummary: { score: string; reviews: string; source: string } | null = {
  score: "4.9",
  reviews: "100+ reviews",
  source: "Across Google and Houzz",
};

export const testimonials: Testimonial[] = [
  {
    quote: "They understood exactly how our family lives. Our 3BHK finally feels calm, organised and completely ours.",
    name: "Client name",
    detail: "Homeowner · 3BHK apartment",
  },
  {
    quote: "From the 3D designs to the final styling, every step was clear. The modular kitchen is better than we imagined.",
    name: "Client name",
    detail: "Homeowner · Modular kitchen",
  },
  {
    quote: "Our new office is bright and easy to work in, and the team handled every contractor so we didn't have to.",
    name: "Client name",
    detail: "Founder · Office interior",
  },
  {
    quote: "They kept to the budget we agreed and still found room for the details that make the villa special.",
    name: "Client name",
    detail: "Homeowner · Villa",
  },
  {
    quote: "Guests always comment on the café's interiors. It looks beautiful and works well on our busiest days.",
    name: "Client name",
    detail: "Owner · Café",
  },
];
