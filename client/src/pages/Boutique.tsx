/* Atelier Obsidian: boutique rooms are quiet, appointment-led spaces for examining the object. */
import { ArrowUpRight } from "lucide-react";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";

const boutiqueImage = "/manus-storage/samay-boutique-interior_656f10ed.jpg";
const viewingModes = [
  ["Reference viewing", "A considered look at one photographed reference, its proportion, and its surface.", "By private conversation"],
  ["Material conversation", "A starting point for discussing case, dial, or strap preferences with the house.", "Availability confirmed on review"],
  ["Service discussion", "A direct route for questions about care, continuity, and an existing object.", "Details confirmed with the house"],
] as const;

export default function Boutique() {
  return <div className="flagship-page boutique-page"><section className="boutique-hero section-dark"><div className="boutique-hero__image"><img src={boutiqueImage} alt="SAMAY private viewing room with a single watch on a stone plinth" fetchPriority="high" decoding="async" /></div><div className="boutique-hero__copy"><span className="eyebrow">SAMAY / Private conversation</span><h1>The object,<br /><em>in the room.</em></h1><p>A quiet setting for looking properly: one reference, a loupe, and enough time for the material to change.</p><ArrowLink href="/inquiry" dark>Prepare a private viewing</ArrowLink></div></section><section className="boutique-list section-paper"><div className="section-wrap"><SectionLabel index="01">The conversation</SectionLabel><div className="boutique-list__head"><h2>Three ways<br /><em>to begin.</em></h2><p>SAMAY does not publish salon locations or availability here. Start with the kind of conversation you would like to have, and the house will review the request directly.</p></div><ol className="boutique-cards">{viewingModes.map(([title, description, note], index) => <li className="boutique-card" key={title}><article><span className="eyebrow">{String(index + 1).padStart(2, "0")} / SAMAY private viewing</span><h3>{title}</h3><p>{description}</p><dl><div><dt>Format</dt><dd>{note}</dd></div><div><dt>Next step</dt><dd>Request reviewed by the house</dd></div></dl><ArrowUpRight size={17} strokeWidth={1.1} aria-hidden="true" /></article></li>)}</ol></div></section><section className="boutique-note section-dark"><div className="section-wrap boutique-note__grid"><div><SectionLabel index="02" dark>Bring the question</SectionLabel><h2>Come with<br /><em>curiosity.</em></h2></div><div><p>Compare the way a case catches a window, ask how a strap might settle against the wrist, or bring a service question. The conversation is about clarity, not pressure.</p><ArrowLink href="/contact" dark>Contact the house</ArrowLink></div></div></section></div>;
}
