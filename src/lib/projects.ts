import { city } from "@/lib/site";

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  /** Residential, Kitchen, Hospitality… shown as the card's dot label. */
  category: string;
  /** Property type, e.g. "4BHK apartment". */
  property: string;
  /** Neighbourhood in Vadodara, e.g. "Alkapuri". */
  area: string;
  scope: string;
  style: string;
  /** "Design concept" until replaced by a real, completed project (then e.g. "Completed 2025"). */
  status: string;
  /** Card image (cropped to 4:5). */
  image: ProjectImage;
  /** Large image at the top of the project panel (cropped to 16:10). */
  heroImage: ProjectImage;
  /** Paragraphs under the large image. */
  intro: string[];
  /** "What we designed" list. */
  highlights: string[];
  /** One or two images in the middle of the panel. */
  gallery: ProjectImage[];
  /** Paragraphs after the gallery. */
  details: string[];
};

/** "Alkapuri, Vadodara" */
export const projectLocation = (project: Project) => `${project.area}, ${city}`;

// ---- Design concepts: replace each with a real project (its own photos, details and status) when available. ----
// Photos are free-to-use Unsplash images (unsplash.com/license).

const dir = "/images/projects";
const img = (file: string, alt: string, width: number, height: number): ProjectImage => ({ src: `${dir}/${file}`, alt, width, height });
const portrait = (file: string, alt: string) => img(file, alt, 664, 928);
const wide = (file: string, alt: string) => img(file, alt, 1600, 1000);

const photos = {
  brightLiving: portrait("interior-1.webp", "Bright living room with timber ceiling beams, arched windows and a fireplace"),
  chandelierBedroom: portrait("interior-3.webp", "Bedroom with an upholstered bed and gold chandelier"),
  sunlitCorner: portrait("interior-4.webp", "Sunlit reading corner with an armchair, side table and plants"),
  slattedBedroom: portrait("interior-5.webp", "Bedroom with a slatted timber feature wall and pendant lights"),
  galleryWall: portrait("interior-8.webp", "Tan leather sofa in front of a gallery wall"),
  darkLounge: img("mission1.jpeg", "Lounge with a cream sofa, floor lamp and tall timber blinds", 735, 920),
  timberLounge: img("mission2.jpeg", "Living room with a timber-panelled wall, lounge chair and clerestory windows", 736, 983),
  timberLoungeAlt: img("mission3.jpeg", "Timber-panelled lounge with low shelving and a round coffee table", 736, 1441),
  armchairNook: { src: "/images/home/cta-small.webp", alt: "Sitting area with an orange armchair, rattan sideboard and round mirror", width: 732, height: 1328 },
  greySofa: wide("interior-wide-1.webp", "Living room with a grey sofa and wooden side tables"),
  leatherSectional: wide("interior-wide-2.webp", "Living room with a tan leather sectional sofa"),
  fireplaceLiving: wide("interior-wide-3.webp", "Living room with a fireplace"),
  neutralLiving: wide("interior-wide-4.webp", "Neutral-toned open living and dining space"),
  marbleKitchen: wide("interior-wide-6.webp", "Kitchen with a marble island and white cabinets"),
  whiteKitchen: wide("interior-wide-7.webp", "Modern white kitchen with a marble island"),
  windowLiving: wide("interior-wide-8.webp", "Modern living room with floor-to-ceiling windows"),
  villa: img("project-img-3.jpg", "Contemporary white villa with glass walls and a landscaped lawn", 1920, 1080),
};

export const projects: Project[] = [
  {
    slug: "alkapuri-family-residence",
    name: "Alkapuri Family Residence",
    category: "Residential",
    property: "4BHK apartment",
    area: "Alkapuri",
    scope: "Full home interiors",
    style: "Classic contemporary",
    status: "Design concept",
    image: photos.brightLiving,
    heroImage: photos.fireplaceLiving,
    intro: [
      "A design concept for a multi-generational family in a 4BHK apartment in Alkapuri, one of Vadodara's most established neighbourhoods. The brief: a home that feels warm for everyday life and gracious when relatives visit.",
      "We zoned the plan so the living and dining areas open up for gatherings, while each bedroom stays private and calm. A light, warm palette keeps the rooms bright through Vadodara's long summers.",
    ],
    highlights: [
      "Open living and dining layout for family gatherings",
      "Ground-floor-style accessibility in the parents' bedroom",
      "Floor-to-ceiling wardrobes with loft storage",
      "Pooja unit with a backlit jali screen",
      "Layered ambient, task and accent lighting",
    ],
    gallery: [photos.sunlitCorner, photos.chandelierBedroom],
    details: [
      "Moisture-resistant plywood, durable laminates and vitrified flooring were specified to cope with the heat and monsoon humidity, while natural timber accents add warmth.",
      "The result is a home that works hard every day and still feels considered when guests arrive.",
    ],
  },
  {
    slug: "gotri-3bhk-apartment",
    name: "Gotri 3BHK Apartment",
    category: "Residential",
    property: "3BHK apartment",
    area: "Gotri",
    scope: "Full home interiors",
    style: "Warm modern",
    status: "Design concept",
    image: photos.galleryWall,
    heroImage: photos.leatherSectional,
    intro: [
      "A design concept for a young family moving into a new 3BHK apartment in Gotri, one of the fastest-growing residential areas in Vadodara. They wanted a relaxed, characterful home with plenty of storage.",
      "Tan leather, natural textures and a gallery wall give the living room personality, while the bedrooms stay soft and restful.",
    ],
    highlights: [
      "Living room with a sectional sofa and curated gallery wall",
      "Study corner in the guest bedroom for working from home",
      "Hydraulic storage beds in every bedroom",
      "L-shaped modular kitchen with a tall pantry unit",
      "Balcony seating to enjoy cooler evenings",
    ],
    gallery: [photos.armchairNook, photos.sunlitCorner],
    details: [
      "Every piece of furniture was sized to the rooms so circulation stays easy, and storage was built into the walls to keep floors clear.",
      "A home that feels lived-in from day one, with room to grow.",
    ],
  },
  {
    slug: "vasna-bhayli-road-villa",
    name: "Vasna-Bhayli Road Villa",
    category: "Villa",
    property: "Independent villa",
    area: "Vasna-Bhayli Road",
    scope: "Living, dining and bedrooms",
    style: "Luxury contemporary",
    status: "Design concept",
    image: photos.darkLounge,
    heroImage: photos.villa,
    intro: [
      "A design concept for a contemporary villa off Vasna-Bhayli Road, where many of Vadodara's newer independent homes are being built. The clients wanted a calm, hotel-like feel with rich materials.",
      "Deep timber tones, soft cream upholstery and controlled daylight through tall blinds create a lounge that feels intimate even in a double-height space.",
    ],
    highlights: [
      "Double-height living room with acoustic timber detailing",
      "Formal dining area connected to the garden",
      "Master suite with a walk-in wardrobe",
      "Motorised blinds to control harsh afternoon sun",
      "Statement lighting designed for each room",
    ],
    gallery: [photos.timberLoungeAlt, photos.slattedBedroom],
    details: [
      "Large openings are shaded and glazed carefully so the villa stays cool, and natural stone flooring keeps the ground floor comfortable in summer.",
      "Generous, quiet spaces designed for both family life and entertaining.",
    ],
  },
  {
    slug: "akota-modular-kitchen",
    name: "Akota Modular Kitchen",
    category: "Kitchen",
    property: "3BHK apartment",
    area: "Akota",
    scope: "Modular kitchen and dining",
    style: "Clean modern",
    status: "Design concept",
    image: photos.whiteKitchen,
    heroImage: photos.marbleKitchen,
    intro: [
      "A design concept for a modular kitchen in an Akota apartment, planned for a family that cooks every day and often hosts.",
      "We focused on the working triangle between hob, sink and refrigerator, then built in storage for heavy vessels, daily masalas and appliances so counters stay clear.",
    ],
    highlights: [
      "Island counter for preparation and casual meals",
      "Deep drawers for heavy vessels instead of base shutters",
      "Tall units for groceries and built-in appliances",
      "Chimney and exhaust sized for Indian cooking",
      "Under-cabinet task lighting",
    ],
    gallery: [photos.whiteKitchen],
    details: [
      "Boiling-water-resistant plywood, quartz countertops and stainless-steel hardware were chosen for durability in a hard-working kitchen.",
      "A bright, easy-to-clean kitchen that makes daily cooking simpler.",
    ],
  },
  {
    slug: "old-padra-road-penthouse",
    name: "Old Padra Road Penthouse",
    category: "Residential",
    property: "Penthouse",
    area: "Old Padra Road",
    scope: "Living room and lounge",
    style: "Mid-century inspired",
    status: "Design concept",
    image: photos.timberLounge,
    heroImage: photos.windowLiving,
    intro: [
      "A design concept for a penthouse on Old Padra Road, one of Vadodara's sought-after residential corridors. The owners wanted a lounge for music, reading and conversation.",
      "Timber-panelled walls, sculptural lounge chairs and low shelving give the room a warm, mid-century character, with clerestory windows bringing in soft light.",
    ],
    highlights: [
      "Timber wall panelling with integrated storage",
      "Low shelving for books and a record collection",
      "Reading corner with a lounge chair",
      "Warm, dimmable ambient lighting",
      "Patterned rug to define the seating area",
    ],
    gallery: [photos.timberLoungeAlt, photos.brightLiving],
    details: [
      "Engineered timber and fade-resistant fabrics keep the look rich without suffering in the strong sun a top-floor home receives.",
      "A space that feels personal, layered and made for slow evenings.",
    ],
  },
  {
    slug: "sama-compact-2bhk",
    name: "Sama Compact 2BHK",
    category: "Small Spaces",
    property: "2BHK apartment",
    area: "Sama",
    scope: "Full home interiors",
    style: "Light Scandinavian",
    status: "Design concept",
    image: photos.sunlitCorner,
    heroImage: photos.greySofa,
    intro: [
      "A design concept for a compact 2BHK apartment in Sama, showing how a smaller Vadodara home can feel open, bright and uncluttered.",
      "A light palette, furniture on slim legs and storage that runs to the ceiling make every square foot count.",
    ],
    highlights: [
      "Sofa-cum-bed for guests in the living room",
      "Extendable dining table",
      "Floor-to-ceiling wardrobes with loft storage",
      "Wall-mounted study desk",
      "Mirrors and sheer curtains to spread daylight",
    ],
    gallery: [photos.galleryWall, photos.armchairNook],
    details: [
      "The same flooring runs through the home, removing visual breaks so the rooms read as one calm space.",
      "Proof that a compact apartment can feel generous.",
    ],
  },
  {
    slug: "bhayli-master-bedroom",
    name: "Bhayli Master Bedroom",
    category: "Bedroom",
    property: "Villa",
    area: "Bhayli",
    scope: "Master bedroom suite",
    style: "Warm minimal",
    status: "Design concept",
    image: photos.slattedBedroom,
    heroImage: photos.chandelierBedroom,
    intro: [
      "A design concept for a master bedroom in a Bhayli villa. The brief was a restful retreat that feels like a boutique hotel.",
      "A slatted timber feature wall, sculptural pendant lights and an upholstered bed set a calm, warm mood.",
    ],
    highlights: [
      "Slatted timber headboard wall with concealed lighting",
      "Upholstered bed with storage",
      "Walk-in wardrobe with lighting inside",
      "Bedside pendants on separate switches",
      "Blackout and sheer curtain layers",
    ],
    gallery: [photos.chandelierBedroom],
    details: [
      "Soft textiles, warm-white lighting and a restrained palette keep the room quiet and easy to rest in.",
      "A bedroom designed purely for comfort.",
    ],
  },
  {
    slug: "manjalpur-living-dining",
    name: "Manjalpur Living & Dining",
    category: "Residential",
    property: "3BHK apartment",
    area: "Manjalpur",
    scope: "Living and dining makeover",
    style: "Eclectic modern",
    status: "Design concept",
    image: photos.armchairNook,
    heroImage: photos.neutralLiving,
    intro: [
      "A design concept for refreshing the living and dining areas of a 3BHK apartment in Manjalpur, without a full renovation.",
      "New furniture, a warm accent colour, rattan and natural textures transform the space while keeping the existing flooring and layout.",
    ],
    highlights: [
      "Living and dining refreshed without civil work",
      "Statement armchair and rattan sideboard",
      "New lighting plan with floor and table lamps",
      "Curtains, rugs and cushions in a warm palette",
      "Styling with plants, art and a round mirror",
    ],
    gallery: [photos.brightLiving, photos.galleryWall],
    details: [
      "Focusing on furniture, lighting and soft furnishings keeps a makeover quick and affordable while still feeling transformative.",
      "A fresh, cheerful space created in weeks rather than months.",
    ],
  },
];
