// Atelier Obsidian reminder: the collection should feel like a small exhibition, not a product grid.
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { watches } from "@/lib/samayData";

const filters = ["All references", "Dress", "Everyday", "Complication"];
const atelierTools = "/manus-storage/samay-atelier-tools_ad9fdca5.jpg";

export default function Collection() {
  const [filter, setFilter] = useState("All references");
  const filtered = useMemo(() => filter === "All references" ? watches : watches.filter((watch) => watch.family === filter), [filter]);

  return <div className="collection-page section-paper">
    <section className="page-intro section-dark"><div className="page-intro__inner"><SectionLabel index="01" dark>Collection / 2026</SectionLabel><div className="page-intro__grid"><h1>The objects<br /><em>we keep.</em></h1><p>Three references for three ways of moving through an hour. Each one begins with the same question: what can be removed without losing the feeling?</p></div><div className="page-intro__bottom"><span>03 references</span><span>Finished in small batches</span><span>Available by private request</span></div></div></section>
    <section className="collection-list section-wrap"><div className="collection-list__toolbar"><span className="eyebrow">View by family</span><div className="filter-list" role="group" aria-label="Filter collection">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "is-selected" : ""} aria-pressed={filter === item}>{item}<span /></button>)}</div></div><div className="collection-list__grid">{filtered.map((watch, index) => <div className={`collection-list__item collection-list__item--${index + 1}`} key={watch.slug}><ProductCard watch={watch} /><div className="collection-list__index">0{index + 1}</div></div>)}</div>
      <div className="collection-list__interlude"><div className="collection-list__interlude-image"><img src={atelierTools} alt="A quiet SAMAY atelier bench with watchmaking tools" /><span>Material study / 06</span></div><div className="collection-list__interlude-copy"><SectionLabel index="02">The work before the object</SectionLabel><h2>A movement<br /><em>begins unseen.</em></h2><p>Before a reference becomes a watch, its surfaces are tested against light, pressure, and the hand. The finished object carries that sequence quietly.</p><Link href="/atelier#craft" className="text-link">Enter the atelier <ArrowUpRight size={14} strokeWidth={1.2} /></Link></div></div>
      <div className="collection-list__after"><span className="eyebrow">The object, examined</span><p>Explore each reference to see the finishing, movement, dimensions, and material decisions beneath the surface.</p><ArrowLink href={`/watch/${filtered[0]?.slug ?? watches[0].slug}`}>Examine a reference</ArrowLink></div>
    </section>
    <section className="collection-note section-dark"><div className="collection-note__inner"><div><span className="eyebrow">House note / 01</span><h2>Small batches.<br /><em>Long attention.</em></h2></div><div><p>Every SAMAY watch passes through a measured sequence of casing, regulation, hand-finishing, and inspection. We keep the scale deliberately small so the work remains close.</p><Link href="/atelier" className="text-link text-link--light">How we work <ArrowUpRight size={14} strokeWidth={1.2} /></Link></div></div></section>
  </div>;
}
