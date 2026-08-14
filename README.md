# SAMAY

SAMAY is a production-quality static frontend for a fictional contemporary luxury watch house. The experience is intentionally closer to a private catalogue and exhibition route than a conventional ecommerce landing page: a cinematic home, curated collection, dedicated watch examinations, an editorial journal, a house story, and a restrained private-viewing inquiry flow.

## Design philosophy

The project follows **Atelier Obsidian**, a contemporary Swiss editorial direction shaped by private ateliers, museum exhibition design, architectural photography, and high-end product campaigns. The core palette is graphite and obsidian with warm ivory reading surfaces, smoked steel rules, and restrained champagne metal as the sole signature accent. Cormorant Garamond carries the maison's display voice; Manrope carries navigation, metadata, specifications, and form copy.

The interface treats watches as objects rather than inventory. Asymmetric compositions, indexed labels, measured hairlines, and slow physically motivated transitions create an exhibition rhythm. The copy is specific and observational, and the experience does not use fabricated reviews, ratings, testimonials, or implied customer activity.

## Architecture

The frontend is a React 19 single-page application using Wouter for client-side routing, Tailwind CSS 4 for the base layer, and a project-specific CSS system for the editorial composition. Shared shell elements live in `client/src/components/SiteShell.tsx`; product cards are reused across home, collection, watch details, and editorial routes; the fictional product and journal vocabulary is centralized in `client/src/lib/samayData.ts`.

| Route | Purpose |
| --- | --- |
| `/` | Cinematic entry, maison point of view, featured reference, material story, journal preview, concierge invitation |
| `/collection` | Curated reference exhibition with family filtering |
| `/watch/:slug` | Product object stage, craft note, technical study, material selector, related references |
| `/journal` | Editorial issue index |
| `/journal/:slug` | Long-form reading room with related watch |
| `/atelier` | Maison philosophy and craft sequence |
| `/inquiry` | Accessible, validated private-viewing request flow; no payment or order is created |

## Tech stack

- React 19 and TypeScript
- Vite 7
- Wouter client-side routing
- Tailwind CSS 4 and local CSS tokens
- Lucide React icons
- Google Fonts: Cormorant Garamond and Manrope
- Manus WebDev static hosting workflow

## Local development

```bash
pnpm install
pnpm dev
```

The Vite development server runs on port 3000 by default. For a type check and production build:

```bash
pnpm check
pnpm build
```

## Environment variables

The static template receives analytics and application metadata variables through the managed WebDev environment. No project-specific secrets are required for the current prototype. Do not add API keys to client-side source files.

## Deployment

The project is prepared for the managed Manus WebDev publishing flow. Create a checkpoint after reviewing the current version, then use the **Publish** action in the project management UI. The current commerce path is deliberately non-transactional: it collects a private-viewing request only and does not process a payment or create an order.

## Asset and licensing notes

The five SAMAY visual assets are generated for this project and stored through the managed WebDev asset lifecycle. Product imagery is used as the primary object language. Supporting architecture imagery uses Unsplash source URLs for the prototype and should be replaced or separately licensed for a commercial launch. The source record and visual decisions are documented in `ideas.md`.

## Testing notes

The project has been checked with `pnpm check` and a production `pnpm build`. Visual review should include desktop and mobile routes for navigation, collection filters, watch specification accordions, material selector, inquiry validation and confirmation, reduced-motion behavior, image crops, and route fallbacks.

## Known limitations

The project is frontend-only. Inquiry submission is a simulated confirmation state and does not persist data. Commerce, authentication, inventory, real appointment scheduling, email delivery, payments, and CMS-backed editorial publishing are not configured. Generated and prototype supporting imagery should receive a final human art-direction and licensing review before commercial use.
