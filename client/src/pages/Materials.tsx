/* Atelier Obsidian: the material archive treats surfaces as the brand's primary language, with tactile facts over generic luxury copy. */
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";
import { materials } from "@/lib/samayData";

const materialImage = "/manus-storage/samay-material-library_7379b84b.jpg";

export default function Materials() {
  const [active, setActive] = useState(0);
  const item = materials[active];
  return <div className="flagship-page materials-page"><section className="materials-hero section-paper"><div className="section-wrap"><SectionLabel index="01">Material archive</SectionLabel><div className="materials-hero__grid"><div><h1>Surface is<br /><em>structure.</em></h1><p>Steel, sapphire, leather, and the small interval between them. A library of what the hand notices first.</p></div><div className="materials-hero__image"><img src={materialImage} alt="SAMAY material archive with steel, titanium, ceramic, sapphire, and leather" /><span>Material study / 07</span></div></div></div></section><section className="material-library section-dark"><div className="section-wrap"><SectionLabel index="02" dark>Six materials</SectionLabel><div className="material-library__grid"><nav className="material-library__nav" aria-label="Material categories">{materials.map((entry, index) => <button key={entry.name} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} aria-pressed={active === index}><span>{String(index + 1).padStart(2, "0")}</span>{entry.name}<ArrowUpRight size={15} strokeWidth={1.1} /></button>)}</nav><div className="material-library__content" key={item.name}><span className="eyebrow">{item.name} / {item.finish}</span><h2>{item.descriptor}</h2><p className="lead-copy">{item.body}</p><div className="material-library__meta"><div><span>Finish</span><strong>{item.finish}</strong></div><div><span>Use</span><strong>{item.uses}</strong></div><div><span>Character</span><strong>{item.tone}</strong></div></div></div></div></div></section><section className="materials-close section-paper"><div className="section-wrap"><div className="materials-close__grid"><div><SectionLabel index="03">The point of contact</SectionLabel><h2>Choose by<br /><em>feeling.</em></h2></div><div><p>Material is not a configuration menu at SAMAY. It is the way a watch enters a day: cool, warm, absorptive, clear, or changed by the wrist.</p><ArrowLink href="/bespoke">Begin a private selection</ArrowLink></div></div></div></section></div>;
}
