// Atelier Obsidian reminder: every data point should feel like a catalogue entry — specific, quiet, and materially grounded.

export type Watch = {
  slug: string;
  reference: string;
  name: string;
  family: string;
  short: string;
  description: string;
  image: string;
  year: string;
  price: string;
  case: string;
  dial: string;
  strap: string;
  movement: string;
  reserve: string;
  water: string;
  frequency: string;
  dimensions: string;
  materials: string[];
  note: string;
};

export const watches: Watch[] = [
  {
    slug: "meridian",
    reference: "NO. 01 / SM-039",
    name: "Meridian",
    family: "Dress",
    short: "A study in proportion.",
    description:
      "Meridian reduces the dress watch to its essential gestures: a warm ivory dial, a drawn case profile, and the quiet tension of a small seconds hand.",
    image: "/manus-storage/samay-meridian-product_5610b9bd.jpg",
    year: "2026",
    price: "By private request",
    case: "39 mm / 9.2 mm",
    dial: "Warm ivory, sector construction",
    strap: "Dark calfskin / pin buckle",
    movement: "SM-101 hand-wound calibre",
    reserve: "60 hours",
    water: "5 bar",
    frequency: "21,600 vph",
    dimensions: "39 × 46.2 × 9.2 mm",
    materials: ["Brushed 316L steel", "Sapphire crystal", "Hand-finished calfskin"],
    note: "The case is drawn from a single continuous profile. Its polished bevel catches light only when the wrist turns.",
  },
  {
    slug: "serein",
    reference: "NO. 02 / SM-040",
    name: "Serein",
    family: "Everyday",
    short: "Legibility, held in balance.",
    description:
      "Serein is the most direct expression of the house: an exacting slate dial, articulated steel, and a case that wears with unforced ease.",
    image: "/manus-storage/samay-serein-product_147168aa.jpg",
    year: "2026",
    price: "By private request",
    case: "40 mm / 10.1 mm",
    dial: "Slate grey, applied batons",
    strap: "Articulated steel bracelet",
    movement: "SM-201 automatic calibre",
    reserve: "55 hours",
    water: "10 bar",
    frequency: "28,800 vph",
    dimensions: "40 × 47.5 × 10.1 mm",
    materials: ["Brushed and polished 316L steel", "Domed sapphire crystal", "Solid steel bracelet"],
    note: "The bracelet tapers by hand, link by link, until the case appears to settle naturally against the wrist.",
  },
  {
    slug: "vesper",
    reference: "NO. 03 / SM-041",
    name: "Vesper",
    family: "Complication",
    short: "Depth, measured in shadow.",
    description:
      "Vesper uses darkness as a material. A smoked steel case, a discreet power reserve, and one oxblood seconds hand set the rhythm without raising its voice.",
    image: "/manus-storage/samay-vesper-product_0b2003dc.jpg",
    year: "2026",
    price: "By private request",
    case: "41 mm / 10.8 mm",
    dial: "Charcoal, power reserve aperture",
    strap: "Espresso calfskin / pin buckle",
    movement: "SM-301 manual calibre",
    reserve: "72 hours",
    water: "5 bar",
    frequency: "21,600 vph",
    dimensions: "41 × 48.1 × 10.8 mm",
    materials: ["Smoked steel", "Sapphire crystal", "Espresso calfskin"],
    note: "The red hand is the only interruption. It gives the eye a point of return, then disappears into the dial again.",
  },
];

export const journalEntries = [
  {
    slug: "the-anatomy-of-a-watch",
    index: "01",
    category: "Object study",
    title: "The anatomy of a watch",
    excerpt: "A case is not a container. It is a sequence of decisions about light, pressure, and the wrist.",
    image: "/manus-storage/samay-meridian-product_5610b9bd.jpg",
    date: "14.08.2026",
  },
  {
    slug: "inside-the-movement",
    index: "02",
    category: "Atelier notes",
    title: "Inside the movement",
    excerpt: "The mechanics remain quiet until a loupe brings them close. Then every surface begins to speak.",
    image: "/manus-storage/samay-serein-product_147168aa.jpg",
    date: "02.07.2026",
  },
  {
    slug: "precision-and-proportion",
    index: "03",
    category: "Design language",
    title: "Precision and proportion",
    excerpt: "Why the smallest changes to a lug, a hand, or a bezel alter the character of the entire watch.",
    image: "/manus-storage/samay-vesper-product_0b2003dc.jpg",
    date: "19.05.2026",
  },
];

export const findWatch = (slug?: string) => watches.find((watch) => watch.slug === slug) ?? watches[0];
export const findJournal = (slug?: string) => journalEntries.find((entry) => entry.slug === slug) ?? journalEntries[0];
