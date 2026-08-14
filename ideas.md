# SAMAY — Design Direction & Experience Plan

## Three stylistic approaches

### Theme Name: Atelier Obsidian
**Very Brief Intro:** A dark, architectural editorial world built from obsidian, smoked steel, warm ivory, and restrained champagne metal. The interface behaves like a private gallery: quiet, tactile, and materially precise.
**Probability:** 0.08

### Theme Name: Mineral Light
**Very Brief Intro:** A sunlit Swiss atelier expressed through limestone, paper, brushed silver, and ink-black typography. Product stories unfold like a beautifully typeset catalogue with measured shadows and daylight photography.
**Probability:** 0.04

### Theme Name: Bordeaux Cabinet
**Very Brief Intro:** A warmer collector's salon using deep natural brown, parchment, oxidized brass, and a deliberate thread of burgundy. The mood is intimate and literary, like a watchmaker's archive after closing.
**Probability:** 0.06

## Chosen direction: Atelier Obsidian

### Design Movement
Contemporary Swiss editorialism with references to private ateliers, museum display design, architectural photography, and the restrained art direction of high-end product campaigns. The website should feel commissioned, not decorated.

### Core Principles
1. **The watch is the protagonist.** The interface recedes; image, proportion, surface, and mechanism carry the meaning.
2. **Material before ornament.** Every color and texture should be traceable to obsidian, graphite, aged leather, steel, smoked glass, or warm ivory.
3. **Exhibition, not ecommerce.** Products are introduced as objects with context, not as a grid of interchangeable inventory.
4. **Precision in restraint.** Motion, borders, labels, and calls to action should be scarce, intentional, and physically motivated.

### Color Philosophy
The base environment is a near-black graphite rather than a pure black, so polished metal and low-light photography retain nuance. Warm ivory is reserved for reading surfaces and long-form editorial copy. A muted champagne tone is used only where the object itself warrants it: small rules, metal references, and one ownable accent. A dark oxblood note is used sparingly for active states and selected editorial detail, never as decorative luxury shorthand.

**Working palette:**

| Token | Value | Role |
| --- | --- | --- |
| Obsidian | `#111312` | Primary canvas and navigation field |
| Graphite | `#1A1D1B` | Secondary surfaces and product frames |
| Warm Ivory | `#E7E1D7` | Primary type on dark surfaces and editorial canvas |
| Ash | `#A8AAA3` | Supporting metadata and quiet labels |
| Smoked Steel | `#6E756F` | Rules, dividers, and inactive states |
| Champagne Metal | `#B79D70` | Signature accent, used at low frequency |
| Oxblood | `#5B302D` | Rare active detail, inquiry state, and editorial emphasis |

### Layout Paradigm
The composition follows a **gallery route** rather than a centered marketing funnel. The hero is a full-bleed room with a narrow vertical caption rail. Collection pages alternate between asymmetric image fields and quiet metadata columns. Detail pages use a sticky technical rail and a large object stage. Editorial pages pair generous text measures with offset image plates, avoiding the repeated three-card rhythm of a template.

### Signature Elements
1. **The atelier index:** tiny uppercase section labels, serial numbers, and hairline rules that feel like exhibition cataloguing rather than UI chrome.
2. **The object stage:** product photography sits inside deep graphite frames with subtle material shifts on hover; no decorative cards or floating glass.
3. **The measured rule:** a champagne hairline expands or shortens to communicate active state, replacing loud pills and badges.

### Interaction Philosophy
Interactions should reward attention rather than compete for it. Navigation opens like a sliding gallery curtain; product hover reveals a secondary crop or material note; detail-page tabs behave like turning a catalogue section. Every interactive state must clarify form, finish, provenance, or next action. Buttons are text-led, never oversized, and always visibly focusable.

### Animation
Motion is slow, controlled, and physically motivated. Use 700–1100ms image reveals for large scene changes, 180–260ms transitions for navigation and buttons, and subtle 80–120ms press feedback. Product imagery may drift by a few pixels during scroll, but nothing should float or pulse without a physical reason. Staggered entrances are limited to 30–60ms between adjacent catalog labels. Respect `prefers-reduced-motion` by removing transforms and reducing all reveals to opacity changes.

### Typography System
Use **Cormorant Garamond** for display headlines and watch names, with a restrained italic only for editorial subheads. Use **Manrope** for navigation, metadata, specifications, forms, and body copy. Headline sizes should be generous but never billboard-like: 56–84px on desktop, 42–56px on mobile. Body copy stays between 15–18px with relaxed line-height. Labels are 10–11px, uppercase, with 0.18em tracking. No default Inter stack and no weight-heavy SaaS typography.

### Brand Essence
**SAMAY is a contemporary watch house for people who collect objects with a point of view, distinguished by architectural restraint, tactile materials, and an insistence on proportion.**

**Personality:** exacting, quiet, tactile.

### Brand Voice
Headlines are concise, observant, and specific. CTAs sound like invitations to examine, request, or enter—not commands to convert. Microcopy names the action plainly and avoids inflated promises.

**Example lines:**

> A study in proportion, cut from shadow.

> Request a private viewing.

### Wordmark & Logo
The SAMAY wordmark is set in spaced uppercase serif lettering with a custom cut to the first A, echoing the triangular void of a watch hand bridge. The symbol is a small four-point aperture formed from two offset tapered blades—an abstract reference to the passage of time and a watchmaker's loupe, without drawing a literal clock. The mark must work alone on a dial, certificate, favicon, and packaging seal.

### Signature Brand Color
**Champagne Metal — `#B79D70`.** It is intentionally desaturated and mineral rather than yellow-gold. It appears as a measured hairline, a hand reference, or a small material annotation, never as a wash over the interface.

## Experience architecture

### Routes

| Route | Experience |
| --- | --- |
| `/` | Cinematic entry, philosophy, featured object, atelier story, editorial invitation, concierge CTA |
| `/collection` | Curated exhibition of the collection with filter by family and material |
| `/watch/:slug` | Dedicated object stage, craft story, movement, materials, dimensions, performance, gallery, inquiry |
| `/journal` | Editorial index with long-form story cards and issue-like navigation |
| `/journal/:slug` | Editorial reading experience with photography, pull quote, and related object |
| `/atelier` | Maison philosophy, finishing vocabulary, and atelier/service information |
| `/inquiry` | Accessible inquiry form with validation and a simulated confirmation state |

### Product vocabulary

The prototype uses three fictional contemporary references with clear differentiation:

| Reference | Family | Materials | Character |
| --- | --- | --- | --- |
| No. 01 / Meridian | Dress | 39mm steel, ivory dial, dark calfskin | Quiet geometry for evening hours |
| No. 02 / Serein | Everyday | 40mm brushed steel, slate dial, articulated bracelet | The most legible expression of the house |
| No. 03 / Vesper | Complication | 41mm smoked steel, oxblood seconds, leather | A restrained study in depth and shadow |

### Commerce architecture

The experience supports product selection, a persistent viewing tray, availability inquiry, shipping and warranty information, a certificate-of-authenticity concept, and a non-transactional request flow. No payment or order completion is implied; the interface explicitly frames the final step as a private request until commerce infrastructure is configured.

## Implementation reminders

- Keep the frontend static and self-contained; do not add backend or server logic.
- Store generated assets outside the project and reference them through uploaded asset URLs.
- Add the design philosophy comment at the top of each edited component and page file.
- Use semantic headings, visible focus states, descriptive alt text, and reduced-motion support.
- Never fabricate reviews, ratings, or testimonials. The house speaks through its products and editorial voice instead.
- Verify route escape paths, inquiry validation, mobile navigation, and image crops before delivery.

## Style Decisions

- Every non-product image must depict atelier craft, architectural shadow, material surfaces, tools, movements, leather, steel, stone, or controlled gallery light; generic lifestyle interiors are excluded.
- Warm Ivory is a reading surface only when anchored by graphite image wells, smoked-steel rules, or champagne measuring marks, so pale pages remain connected to the dark atelier world.
- Champagne Metal `#B79D70` is the sole signature signal for active states, measured hairlines, section emphasis, and key material annotations; it appears rarely but consistently.
- Each reference has its own exhibition chapter: Meridian privileges ivory proportion and dress restraint; Serein privileges legibility, steel, and the everyday wrist; Vesper privileges shadow, complication, and a manual reserve. Shared product primitives may not repeat dominant chapter headlines across the three routes.
- The aperture mark and cut-letter construction must be legible at navigation and footer scale, so SAMAY cannot read as unmodified spaced serif type.
- Product imagery must progress from exterior object stage to distinct evidence. When no additional credible campaign study exists, the interface must preserve that limitation rather than simulate another configuration or detail crop.
