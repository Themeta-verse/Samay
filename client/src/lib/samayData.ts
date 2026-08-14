/* Atelier Obsidian: the data layer keeps SAMAY's fictional maison vocabulary specific, tactile, and quietly confident. */

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
  designPhilosophy: string;
  materialRationale: string;
  context: string;
  presentation?: PresentationFrame[];
};

export type PresentationFrame = { label: string; caption: string; image: string };

export const watches: Watch[] = [
  {
    slug: "meridian", reference: "NO. 01 / SM-039", name: "Meridian", family: "Dress", short: "A study in proportion.",
    description: "Meridian reduces the dress watch to its essential gestures: a warm ivory dial, a drawn case profile, and the quiet tension of a small seconds hand.",
    image: "/manus-storage/samay-meridian-product_5610b9bd.jpg", year: "2026", price: "By private request", case: "39 mm / 9.2 mm", dial: "Warm ivory, sector construction", strap: "Dark calfskin / pin buckle", movement: "SM-101 hand-wound calibre", reserve: "60 hours", water: "5 bar", frequency: "21,600 vph", dimensions: "39 × 46.2 × 9.2 mm", materials: ["Brushed 316L steel", "Sapphire crystal", "Hand-finished calfskin"],
    note: "The case is drawn from a single continuous profile. Its polished bevel catches light only when the wrist turns.", designPhilosophy: "Meridian is the house's first exercise in reduction: an everyday mechanical watch with the confidence to leave the dial quiet.", materialRationale: "Brushed steel holds the body of the light; the polished bevel is reserved for movement. Calfskin softens the object without making it casual.", context: "For late trains, long tables, and the unremarked hours between them.",
    presentation: [
      { label: "Exterior", caption: "The complete object, held in a single line.", image: "/manus-storage/samay-meridian-product_5610b9bd.jpg" },
      { label: "Dial", caption: "Warm ivory, with room for the eye to settle.", image: "/manus-storage/samay-macro-dial_8993792c.jpg" },
      { label: "Case", caption: "A drawn profile; brushed planes, one polished edge.", image: "/manus-storage/samay-case-profile_d72bd80f.jpg" },
      { label: "Crown", caption: "The smallest point of contact, considered as carefully as the dial.", image: "/manus-storage/samay-crown-detail_6c531800.jpg" },
      { label: "Movement", caption: "SM-101, quiet beneath the surface.", image: "/manus-storage/samay-movement-study_129e7db4.jpg" },
      { label: "Strap", caption: "Calfskin that takes the shape of the wrist, not the room.", image: "/manus-storage/samay-atelier-tools_ad9fdca5.jpg" },
    ],
  },
  {
    slug: "serein", reference: "NO. 02 / SM-040", name: "Serein", family: "Everyday", short: "Legibility, held in balance.",
    description: "Serein is the most direct expression of the house: an exacting slate dial, articulated steel, and a case that wears with unforced ease.", image: "/manus-storage/samay-serein-product_147168aa.jpg", year: "2026", price: "By private request", case: "40 mm / 10.1 mm", dial: "Slate grey, applied batons", strap: "Articulated steel bracelet", movement: "SM-201 automatic calibre", reserve: "55 hours", water: "10 bar", frequency: "28,800 vph", dimensions: "40 × 47.5 × 10.1 mm", materials: ["Brushed and polished 316L steel", "Domed sapphire crystal", "Solid steel bracelet"], note: "The bracelet tapers by hand, link by link, until the case appears to settle naturally against the wrist.", designPhilosophy: "Serein is the direct piece: generous enough to read at a glance, measured enough to disappear beneath a cuff.", materialRationale: "A satin body gives the bracelet its calm; small polished links return just enough light to keep the wrist moving.", context: "For the workday that becomes dinner, and the city that does not require a change of watch.",
  },
  {
    slug: "vesper", reference: "NO. 03 / SM-041", name: "Vesper", family: "Complication", short: "Depth, measured in shadow.",
    description: "Vesper uses darkness as a material. A smoked steel case, a discreet power reserve, and one oxblood seconds hand set the rhythm without raising its voice.", image: "/manus-storage/samay-vesper-product_0b2003dc.jpg", year: "2026", price: "By private request", case: "41 mm / 10.8 mm", dial: "Charcoal, power reserve aperture", strap: "Espresso calfskin / pin buckle", movement: "SM-301 manual calibre", reserve: "72 hours", water: "5 bar", frequency: "21,600 vph", dimensions: "41 × 48.1 × 10.8 mm", materials: ["Smoked steel", "Sapphire crystal", "Espresso calfskin"], note: "The red hand is the only interruption. It gives the eye a point of return, then disappears into the dial again.", designPhilosophy: "Vesper is the technical reference expressed through restraint: a complication that keeps its voice low.", materialRationale: "Smoked steel absorbs the room; the oxblood hand is a functional accent, not decoration. Espresso leather keeps the palette grounded.", context: "For departures after dark, when a small indication is more useful than a larger statement.",
  },
];

export type MaterialEntry = { name: string; descriptor: string; body: string; finish: string; uses: string; tone: string };
export const materials: MaterialEntry[] = [
  { name: "Steel", descriptor: "The body of the light.", body: "316L steel is brushed until it holds a soft, even plane, then polished only at the edges where the wrist turns.", finish: "Brushed plane / polished bevel", uses: "Cases, crowns, bracelets", tone: "Cool, exact, familiar" },
  { name: "Titanium", descriptor: "Weight, removed.", body: "A lighter metal with a quieter surface. Its grain changes the way a case sits against the wrist and the room.", finish: "Bead-blasted / satin", uses: "Lightweight case studies", tone: "Dry, quiet, architectural" },
  { name: "Ceramic", descriptor: "A surface without noise.", body: "Dense and resistant, ceramic gives the darkest references their calm. It asks the light to arrive deliberately.", finish: "Matte / micro-bevel", uses: "Dark case experiments", tone: "Absorptive, precise, still" },
  { name: "Sapphire", descriptor: "The invisible wall.", body: "Crystal is treated as architecture: a transparent plane that protects the dial without interrupting its proportions.", finish: "Domed / anti-reflective", uses: "Crystal, exhibition casebacks", tone: "Clear, deep, protective" },
  { name: "Leather", descriptor: "The part that learns.", body: "Calfskin is cut, edged, and left to change. A strap should gather a little history without asking for attention.", finish: "Hand-edged / natural grain", uses: "Straps, travel cases", tone: "Warm, tactile, personal" },
  { name: "Gold", descriptor: "A measured accent.", body: "Champagne gold is used sparingly at SAMAY: an index, a pin, a line of light rather than a declaration of value.", finish: "Brushed / restrained polish", uses: "Hands, pins, small details", tone: "Warm, exact, rare" },
];

export const movementSpecs = [
  ["Calibre", "SM-101 hand-wound"], ["Power reserve", "60 hours"], ["Frequency", "21,600 vph"], ["Jewels", "24"], ["Architecture", "Small seconds / twin barrel"], ["Finishing", "Circular graining / hand-bevelled bridges"],
] as const;

export const craftSteps = [
  ["01", "Draw", "Proportion begins on paper: case, lugs, and the distance between the eye and the wrist."],
  ["02", "Finish", "Brushing and polish are repeated until the surface holds an even, low light."],
  ["03", "Regulate", "Each movement is adjusted to five positions before it is allowed to leave the bench."],
  ["04", "Return", "A final quiet examination checks the object as a whole, not only its parts."],
] as const;

export const servicePrinciples = [
  ["Care", "A watch should be handled often and stored without ceremony: dry, wound, and away from sudden temperature changes."],
  ["Maintenance", "We recommend a complete service every five to seven years, with a shorter inspection when the rhythm of the movement changes."],
  ["Continuity", "Every SAMAY service record travels with the watch. The certificate is a record of care, not a claim of rarity."],
  ["Straps", "A new strap can change the hours a watch belongs to. Our concierge will recommend leather, length, and finish by conversation."],
] as const;

export const boutiques = [
  { city: "Geneva", note: "A quiet room near the lake, open by appointment Tuesday to Saturday.", hours: "10:00 — 18:00", detail: "Private viewing / movement examination" },
  { city: "Paris", note: "A reading-room atmosphere for the collection and the material archive.", hours: "11:00 — 19:00", detail: "Collection / bespoke consultation" },
  { city: "New York", note: "A small private salon for the object, the loupe, and a longer conversation.", hours: "10:00 — 18:00", detail: "Collection / service conversation" },
];

export const journalEntries = [
  { slug: "the-anatomy-of-a-watch", index: "01", category: "Object study", title: "The anatomy of a watch", excerpt: "A case is not a container. It is a sequence of decisions about light, pressure, and the wrist.", image: "/manus-storage/samay-macro-dial_8993792c.jpg", date: "14.08.2026" },
  { slug: "inside-the-movement", index: "02", category: "Atelier notes", title: "Inside the movement", excerpt: "The mechanics remain quiet until a loupe brings them close. Then every surface begins to speak.", image: "/manus-storage/samay-movement-study_129e7db4.jpg", date: "02.07.2026" },
  { slug: "precision-and-proportion", index: "03", category: "Design language", title: "Precision and proportion", excerpt: "Why the smallest changes to a lug, a hand, or a bezel alter the character of the entire watch.", image: "/manus-storage/samay-case-profile_d72bd80f.jpg", date: "19.05.2026" },
];

export const findWatch = (slug?: string) => watches.find((watch) => watch.slug === slug) ?? watches[0];
export const findJournal = (slug?: string) => journalEntries.find((entry) => entry.slug === slug) ?? journalEntries[0];
