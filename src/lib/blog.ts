import { brandAlt } from "@/lib/site";

export type BlogSection = { heading?: string; paragraphs: string[]; list?: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** One or two sentences for cards, the meta description and the article intro. */
  excerpt: string;
  category: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  image: { src: string; alt: string; width: number; height: number };
  sections: BlogSection[];
};

const wide = (file: string, alt: string) => ({ src: `/images/projects/${file}`, alt: brandAlt(alt), width: 1600, height: 1000 });

// Newest first. The first post is featured on /blog, the next four fill "Latest posts".
export const posts: BlogPost[] = [
  {
    slug: "plan-home-interiors-vadodara",
    title: "How to Plan Your Home Interiors in Vadodara: A Step-by-Step Guide",
    excerpt:
      "From the first brief to moving in, here's how a well-run interior project in Vadodara comes together, and what to decide at each stage.",
    category: "Guides",
    date: "2026-10-14",
    image: wide("interior-wide-2.webp", "Living room with a tan leather sectional sofa"),
    sections: [
      {
        paragraphs: [
          "A new flat in Gotri, a villa off Vasna-Bhayli Road or a family home in Alkapuri: whatever the space, a good interior project follows the same path. Knowing the stages in advance helps you make decisions at the right time, avoid expensive changes on site and move in when you planned to.",
        ],
      },
      {
        heading: "1. Start with how you live",
        paragraphs: [
          "Before talking about colours or furniture, write down how each room will be used. Who works from home? Do elderly parents need a ground-floor bedroom? How much do you cook, and how often do guests stay over? These answers shape the layout far more than any style choice.",
        ],
      },
      {
        heading: "2. Fix a realistic budget early",
        paragraphs: [
          "Decide on an overall budget and a contingency of around ten percent for surprises. Share it with your designer from the first meeting so the plan is built around it, rather than trimmed down later.",
        ],
      },
      {
        heading: "3. Measure, plan and visualise",
        paragraphs: [
          "Your designer should visit the site, take accurate measurements and check plumbing, electrical points and beams. Layouts and 3D views come next, so you can see furniture sizes, storage and circulation before anything is built.",
        ],
      },
      {
        heading: "4. Choose materials and finishes",
        paragraphs: [
          "Select laminates, veneers, stone, tiles, hardware and lighting with samples in hand, ideally in daylight. In Vadodara's heat and monsoon humidity, durability matters as much as looks.",
        ],
      },
      {
        heading: "5. Execute in the right order",
        paragraphs: ["A typical sequence keeps trades from undoing each other's work:"],
        list: [
          "Civil changes, plumbing and electrical conduits",
          "False ceiling and wall preparation",
          "Flooring, followed by carpentry and modular units",
          "Painting, lighting fixtures and hardware",
          "Deep cleaning, furnishing and styling",
        ],
      },
      {
        heading: "6. Inspect before handover",
        paragraphs: [
          "Walk through every room with a checklist: shutters aligned, drawers running smoothly, switches working, no paint marks. Ask for warranty details and care instructions for each material.",
          "If you'd like help planning your home, the team at The Design Organization can walk you through each stage.",
        ],
      },
    ],
  },
  {
    slug: "materials-for-vadodara-climate",
    title: "Choosing Interior Materials That Suit Vadodara's Climate",
    excerpt:
      "Hot summers and humid monsoons are hard on furniture and finishes. These material choices keep your interiors looking good for years.",
    category: "Materials",
    date: "2026-10-07",
    image: wide("interior-wide-8.webp", "Modern living room with floor-to-ceiling windows"),
    sections: [
      {
        paragraphs: [
          "Vadodara's long, hot summers and humid monsoon months put real stress on interiors. Wood swells, laminates lift at the edges and fabrics fade in strong sun. Choosing materials with the climate in mind is the simplest way to make a new interior last.",
        ],
      },
      {
        heading: "Board and plywood",
        paragraphs: [
          "For kitchens, bathroom vanities and anything near water, choose a boiling-water-resistant (BWR) or marine-grade plywood rather than standard MR-grade board. Seal all exposed edges with edge banding so moisture can't get in.",
        ],
      },
      {
        heading: "Surfaces and finishes",
        paragraphs: [
          "Laminates are hard-wearing and easy to clean, which makes them ideal for wardrobes and kitchen shutters. Veneers bring natural warmth but need polishing and should be kept out of direct sun. Acrylic and PU finishes give a premium look but show scratches more easily, so they suit low-traffic areas.",
        ],
      },
      {
        heading: "Flooring",
        paragraphs: [
          "Vitrified tiles and natural stone stay cool underfoot in summer and cope well with humidity. If you love the look of wood, consider wood-look tiles or engineered flooring in bedrooms rather than solid wood.",
        ],
      },
      {
        heading: "Fabrics and soft furnishings",
        paragraphs: [
          "Cotton and linen blends breathe better in the heat than heavy synthetics. Choose fade-resistant fabrics for sunny rooms, and line curtains to protect both the fabric and your furniture from UV.",
        ],
      },
      {
        heading: "Hardware and fittings",
        paragraphs: [
          "Stainless steel and good-quality powder-coated hardware resist rust far better than cheaper plated fittings, especially in kitchens and bathrooms. Soft-close hinges and channels are worth the extra cost for daily-use cabinets.",
        ],
      },
    ],
  },
  {
    slug: "modular-kitchen-planning-guide",
    title: "Modular Kitchen Planning: Layouts, Storage and Finishes",
    excerpt:
      "The right layout and storage plan make a kitchen easier to cook in every day. Here's what to think about before you choose finishes.",
    category: "Kitchens",
    date: "2026-09-30",
    image: wide("interior-wide-6.webp", "Kitchen with a marble island and white cabinets"),
    sections: [
      {
        paragraphs: [
          "A modular kitchen is one of the most used, and most expensive per square foot, parts of any home. Getting the plan right matters more than any finish, because a beautiful kitchen that's awkward to cook in will frustrate you every day.",
        ],
      },
      {
        heading: "Pick a layout that fits the room",
        paragraphs: ["The shape of the room usually decides the layout:"],
        list: [
          "Straight: for narrow kitchens and studio flats",
          "L-shaped: the most common choice for apartments, with a good working triangle",
          "U-shaped: plenty of counter space for families who cook a lot",
          "Parallel: efficient for long, narrow rooms with a utility area at the end",
          "Island: for larger, open-plan homes",
        ],
      },
      {
        heading: "Plan the working triangle",
        paragraphs: [
          "Keep the hob, sink and refrigerator within a few steps of each other, with clear counter space between them for preparation. In Indian kitchens, plan for a dedicated spot for daily-use utensils and masalas close to the hob.",
        ],
      },
      {
        heading: "Storage that works",
        paragraphs: [
          "Deep drawers for heavy vessels are easier to use than base shutters. Tall units can hold groceries and appliances, while corner carousels and pull-outs stop corners becoming dead space. Leave room for a water purifier, microwave and any other appliances you already own.",
        ],
      },
      {
        heading: "Ventilation and lighting",
        paragraphs: [
          "A good chimney sized for your hob, plus an exhaust fan where possible, keeps grease off cabinets and walls. Under-cabinet task lighting makes chopping and cooking far more comfortable than relying on a single ceiling light.",
        ],
      },
    ],
  },
  {
    slug: "space-saving-ideas-2bhk",
    title: "Making a 2BHK Feel Bigger: Space-Saving Interior Ideas",
    excerpt:
      "Smart storage, lighter colours and multi-purpose furniture can make a compact apartment feel open and calm without losing function.",
    category: "Small Spaces",
    date: "2026-09-22",
    image: wide("interior-wide-1.webp", "Living room with a grey sofa and wooden side tables"),
    sections: [
      {
        paragraphs: [
          "Many new apartments in Vadodara are efficiently planned but compact. With the right design decisions, a 2BHK can feel generous, uncluttered and easy to live in.",
        ],
      },
      {
        heading: "Use the full height of the walls",
        paragraphs: [
          "Floor-to-ceiling wardrobes and tall storage units hold far more than standard-height furniture, and the loft space above is ideal for seasonal items. Keep the upper shutters in the same colour as the walls so they don't feel heavy.",
        ],
      },
      {
        heading: "Choose furniture that does two jobs",
        paragraphs: [
          "Beds with hydraulic storage, sofa-cum-beds for guests, extendable dining tables and wall-mounted study desks all save floor space. Furniture on slim legs also makes a room feel larger because you can see the floor beneath it.",
        ],
      },
      {
        heading: "Keep the palette light and consistent",
        paragraphs: [
          "Light, warm neutrals reflect daylight and make rooms feel bigger. Using the same flooring throughout the home removes visual breaks between rooms.",
        ],
      },
      {
        heading: "Let light travel",
        paragraphs: [
          "Sheer curtains, mirrors opposite windows and glass or slatted partitions instead of solid walls let natural light reach deeper into the home.",
        ],
      },
    ],
  },
  {
    slug: "interior-design-cost-factors",
    title: "What Affects the Cost of Interior Design?",
    excerpt:
      "Two homes of the same size can have very different interior budgets. These are the factors that make the difference, and where it's worth spending.",
    category: "Budgeting",
    date: "2026-09-15",
    image: { src: "/images/projects/about3.jpeg", alt: brandAlt("Contemporary two-storey house with timber and stone facade at dusk"), width: 736, height: 491 },
    sections: [
      {
        paragraphs: [
          "One of the first questions every client asks is how much their interiors will cost. The honest answer is that it depends, and understanding what it depends on helps you plan a budget that matches your priorities.",
        ],
      },
      {
        heading: "Scope of work",
        paragraphs: [
          "A single modular kitchen, a full-home furnishing project and a complete renovation with civil, plumbing and electrical changes are very different jobs. The more trades involved, the higher the cost and the longer the timeline.",
        ],
      },
      {
        heading: "Materials and finishes",
        paragraphs: [
          "The board grade, the finish (laminate, veneer, acrylic or PU), stone and tile choices and the brand of hardware all change the price significantly. These are also the choices that most affect how long your interiors last.",
        ],
      },
      {
        heading: "Custom work and detailing",
        paragraphs: [
          "Bespoke furniture, panelling, false ceilings with cove lighting and special finishes take more design and craft time than standard modular units.",
        ],
      },
      {
        heading: "Where to spend and where to save",
        paragraphs: ["Spend on things you use every day and that are hard to replace later:"],
        list: [
          "Kitchen carcasses, hardware and countertops",
          "Wardrobe internals and bed storage",
          "Electrical wiring and the lighting plan",
        ],
      },
      {
        paragraphs: [
          "Save on things that are easy to upgrade later, such as décor, rugs and some loose furniture. A good designer will give you an itemised quotation so you can see exactly where the money goes and adjust it before work begins.",
        ],
      },
    ],
  },
  {
    slug: "vastu-friendly-interiors",
    title: "Vastu-Friendly Interiors Without Compromising on Style",
    excerpt:
      "Vastu and modern design can work together. Here's how to plan a home that follows the principles you care about and still looks contemporary.",
    category: "Vastu",
    date: "2026-09-08",
    image: wide("interior-wide-3.webp", "Living room with a fireplace"),
    sections: [
      {
        paragraphs: [
          "For many families in Gujarat, Vastu is an important part of planning a home. The good news is that following its principles doesn't mean giving up on a modern, elegant interior. It simply needs to be considered from the very first layout.",
        ],
      },
      {
        heading: "Plan it at the layout stage",
        paragraphs: [
          "Decisions such as the position of the kitchen, the direction of the bed and the place for the pooja unit are easiest to accommodate before carpentry is designed. Share your Vastu requirements with your designer at the first meeting.",
        ],
      },
      {
        heading: "The pooja space",
        paragraphs: [
          "A pooja unit can be a beautiful design feature in its own right: a backlit jali screen, a stone or wooden shelf, or a compact niche in the living room. Good lighting and a calm, uncluttered backdrop matter more than size.",
        ],
      },
      {
        heading: "Light, air and openness",
        paragraphs: [
          "Many Vastu recommendations overlap with good design: keep entrances bright and uncluttered, let natural light and air move freely, and avoid heavy furniture blocking windows.",
        ],
      },
      {
        heading: "Colours and materials",
        paragraphs: [
          "Natural materials such as wood and stone and a warm, balanced palette suit both Vastu guidance and contemporary style. Where a recommendation conflicts with your space, a designer can usually find a practical alternative.",
        ],
      },
    ],
  },
  {
    slug: "home-lighting-guide",
    title: "Lighting Your Home: Ambient, Task and Accent Light",
    excerpt:
      "Layered lighting changes how a room looks and feels. Learn how to combine ambient, task and accent light in every room of your home.",
    category: "Lighting",
    date: "2026-08-31",
    image: wide("interior-wide-7.webp", "Modern white kitchen with a marble island"),
    sections: [
      {
        paragraphs: [
          "Lighting is often planned last, but it has more effect on how a room feels than almost any other design decision. The best interiors combine three layers of light, each with a different job.",
        ],
      },
      {
        heading: "Ambient light",
        paragraphs: [
          "This is the general light that fills a room: ceiling lights, recessed downlights or cove lighting in a false ceiling. Warm white (around 2700K to 3000K) feels relaxing in living rooms and bedrooms.",
        ],
      },
      {
        heading: "Task light",
        paragraphs: [
          "Focused light where you work: under-cabinet strips in the kitchen, a reading lamp beside the bed, a desk light in the study and mirror lights in the bathroom. Neutral white (around 4000K) is better for tasks that need concentration.",
        ],
      },
      {
        heading: "Accent light",
        paragraphs: [
          "Accent lighting highlights art, textured walls, shelves or a pooja unit. Used sparingly, it adds depth and makes a room feel finished.",
        ],
      },
      {
        heading: "Plan it with the electrical layout",
        paragraphs: [
          "Decide where every light, switch and socket goes before walls are finished. Dimmers and separate circuits for each layer let you change the mood of a room in seconds.",
        ],
      },
    ],
  },
  {
    slug: "designing-workspaces",
    title: "Designing a Workspace Your Team Will Enjoy",
    excerpt:
      "A well-designed office supports focus, collaboration and your brand. These are the essentials to plan for in any workplace interior.",
    category: "Workplaces",
    date: "2026-08-24",
    image: wide("interior-wide-4.webp", "Neutral-toned open living space"),
    sections: [
      {
        paragraphs: [
          "Whether it's a small studio or a full floor, an office interior shapes how people work and how clients see your business. Good workplace design balances focus, collaboration and comfort.",
        ],
      },
      {
        heading: "Zones for different kinds of work",
        paragraphs: [
          "Plan quiet areas for focused work, meeting rooms for discussions and informal spaces for breaks and quick conversations. Phone booths or small rooms help people take calls without disturbing others.",
        ],
      },
      {
        heading: "Comfort and acoustics",
        paragraphs: [
          "Ergonomic chairs, correct desk heights and good daylight reduce fatigue. Acoustic panels, rugs and soft furnishings keep noise down in open-plan areas.",
        ],
      },
      {
        heading: "Reflect your brand",
        paragraphs: [
          "Colours, materials and graphics can express your brand in a reception, a feature wall or the meeting rooms, so the space feels like yours from the moment visitors arrive.",
        ],
      },
      {
        heading: "Plan for growth",
        paragraphs: [
          "Modular furniture, enough power and data points and flexible layouts make it easier to add people or reorganise teams without a full refit.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

/** "14 Oct 2026" */
export const formatPostDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

/** Whole minutes at ~200 words per minute (at least 1). */
export function readingMinutes(post: BlogPost) {
  const text = post.sections.flatMap((s) => [s.heading ?? "", ...s.paragraphs, ...(s.list ?? [])]).join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
