export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  name: string;
  /** Short line under the name on the card, e.g. type and scope. */
  summary: string;
  location: string;
  year: string;
  /** Card image (portrait). */
  image: ProjectImage;
  /** Large image at the top of the project panel (landscape). */
  heroImage: ProjectImage;
  /** Paragraphs under the large image. */
  intro: string[];
  /** Image pair in the middle of the panel. */
  gallery: ProjectImage[];
  /** Paragraphs after the gallery. */
  details: string[];
};

// ---- Placeholder content: replace with real projects. ----
// Photos are free-to-use Unsplash images (unsplash.com/license).

const dir = "/images/projects";
const portrait = (file: string, alt: string): ProjectImage => ({ src: `${dir}/${file}`, alt, width: 664, height: 928 });
const landscape = (file: string, alt: string): ProjectImage => ({ src: `${dir}/${file}`, alt, width: 1600, height: 1000 });

const houses = [
  "Two-storey modern house with large windows and balconies",
  "White modern villa with a swimming pool and outdoor lounge",
  "White contemporary house under a blue sky",
  "Modern house with black metal cladding",
  "White and timber contemporary home",
  "White and timber house surrounded by trees",
  "Three-storey house with stone cladding at dusk",
  "Modern house with a large front lawn",
].map((alt, i) => portrait(`house-${i + 1}.webp`, alt));

const wideInteriors = [
  "Grey sofa with wooden side tables and a knitted pouf",
  "Living room with a tan leather sectional sofa",
  "Living room with a fireplace",
  "Neutral-toned living room",
  "White and timber kitchen",
  "Kitchen with a marble island and white cabinets",
  "Modern white kitchen with a marble island",
  "Modern living room with floor-to-ceiling windows",
].map((alt, i) => landscape(`interior-wide-${i + 1}.webp`, alt));

const interiors = [
  "White armchair beside a fireplace",
  "White and timber living room",
  "Bedroom with an upholstered bed and gold chandelier",
  "Sunlit bedroom with a leather bench and wall art",
  "Bedroom with a round mirror above the bed",
  "White kitchen cabinets with a black pendant lamp",
  "Kitchen with grey cabinets and marble countertops",
  "Leather sofa in front of a gallery wall",
].map((alt, i) => portrait(`interior-${i + 1}.webp`, alt));

function placeholderProject(index: number, slug: string, name: string, summary: string, location: string, year: string): Project {
  return {
    slug,
    name,
    summary,
    location,
    year,
    image: houses[index],
    heroImage: wideInteriors[index],
    intro: [
      `${name} began with a simple brief: create a space that feels calm, considered and completely personal. We started by understanding how the space is used day to day, then shaped the layout, light and materials around those routines.`,
      "Natural textures, a restrained palette and carefully placed lighting give each room its own character while keeping the whole project connected.",
    ],
    gallery: [interiors[index], interiors[(index + 3) % interiors.length]],
    details: [
      "Custom joinery was designed to hide storage and keep surfaces clear, and every finish was chosen to age well with daily use.",
      "The result is a space that works hard without showing it, and feels as good to live in as it looks.",
    ],
  };
}

export const projects: Project[] = [
  placeholderProject(0, "riverside-residence", "Riverside Residence", "Residential · Full home renovation", "Riverside", "2025"),
  placeholderProject(1, "harbor-view-villa", "Harbor View Villa", "Residential · Living, dining and kitchen", "Harbor District", "2025"),
  placeholderProject(2, "maple-street-house", "Maple Street House", "Residential · Interior architecture", "Maple Street", "2024"),
  placeholderProject(3, "northside-residence", "Northside Residence", "Residential · Open-plan living", "Northside", "2024"),
  placeholderProject(4, "hillside-home", "Hillside Home", "Residential · Kitchen and dining", "Hillside", "2024"),
  placeholderProject(5, "cedar-grove-house", "Cedar Grove House", "Residential · Full interior design", "Cedar Grove", "2023"),
  placeholderProject(6, "stonebridge-residence", "Stonebridge Residence", "Residential · Living and bedrooms", "Stonebridge", "2023"),
  placeholderProject(7, "meadow-view-home", "Meadow View Home", "Residential · Family home refresh", "Meadow View", "2023"),
];
