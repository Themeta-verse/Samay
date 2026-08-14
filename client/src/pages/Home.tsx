// Atelier Obsidian reminder: let atmosphere, material, and the watch carry the first impression. Avoid crowded hero chrome.

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";
import { ProductCard } from "@/components/ProductCard";
import { journalEntries, watches } from "@/lib/samayData";

const heroImage = "/manus-storage/samay-hero-atelier_246de2bd.jpg";
const stoneImage = "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=85";

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero__veil" />
        <div className="hero__content">
          <p className="eyebrow hero__eyebrow">SAMAY / Contemporary horology</p>
          <h1>A study in<br /><em>proportion.</em></h1>
          <p className="hero__intro">A contemporary watch house shaped by light, material, and the discipline of less.</p>
          <div className="hero__actions"><ArrowLink href="/collection" dark>Enter the collection</ArrowLink><Link href="/atelier" className="text-link text-link--light">Discover the house <ArrowUpRight size={14} strokeWidth={1.2} /></Link></div>
        </div>
        <div className="hero__rail"><span>SM / 2026</span><span className="hero__rail-line" /><span>Geneva · Paris</span></div>
        <div className="hero__scroll"><ArrowDown size={15} strokeWidth={1.1} /><span>Scroll to examine</span></div>
      </section>

      <section className="manifesto section-dark">
        <SectionLabel index="01" dark>The house</SectionLabel>
        <div className="manifesto__grid">
          <h2>Time, made<br /><em>tangible.</em></h2>
          <div className="manifesto__copy"><p className="lead-copy">SAMAY is a contemporary watch house for those who notice what remains when ornament falls away.</p><p>We begin with proportion. A case line that holds light. A dial that leaves room for the eye. A movement that earns its place beneath the surface. Every decision is made to be felt before it is explained.</p><ArrowLink href="/atelier" dark>Read our point of view</ArrowLink></div>
        </div>
        <div className="manifesto__line" />
        <div className="manifesto__foot"><span>01 / 03</span><span>Objects for considered hours</span><span>Scroll to continue</span></div>
      </section>

      <section className="featured section-paper">
        <div className="section-wrap"><SectionLabel index="02">The collection</SectionLabel><div className="featured__head"><h2>Objects in<br /><em>quiet motion.</em></h2><p>Three references. One point of view. Each SAMAY watch is finished in small batches and offered by private request.</p><ArrowLink href="/collection">View all references</ArrowLink></div></div>
        <div className="featured__stage"><ProductCard watch={watches[0]} featured /><div className="featured__side-note"><span className="eyebrow">No. 01 / Meridian</span><p>The evening watch, reduced to the line of its case and the warmth of its dial.</p><span className="side-note__rule" /></div></div>
      </section>

      <section className="material-story">
        <div className="material-story__image" style={{ backgroundImage: `url(${stoneImage})` }}><div className="material-story__caption"><span>Light study / 04</span><span>Stone · steel · shadow</span></div></div>
        <div className="material-story__copy section-dark"><SectionLabel index="03" dark>Material studies</SectionLabel><h2>Nothing is<br /><em>accidental.</em></h2><p>From the curve of a lug to the resistance of a crown, the small decisions become the character of the whole. We work with brushed steel, smoked surfaces, natural leather, and the particular silence of warm ivory.</p><ArrowLink href="/atelier" dark>Enter the atelier</ArrowLink></div>
      </section>

      <section className="journal-preview section-paper"><div className="section-wrap"><SectionLabel index="04">The journal</SectionLabel><div className="journal-preview__head"><h2>Notes from<br /><em>the workbench.</em></h2><ArrowLink href="/journal">Read the journal</ArrowLink></div><div className="journal-preview__grid">{journalEntries.map((entry) => <Link key={entry.slug} href={`/journal/${entry.slug}`} className="journal-tile"><div className="journal-tile__image"><img src={entry.image} alt="" /></div><div className="journal-tile__meta"><span>{entry.index} / {entry.category}</span><span>{entry.date}</span></div><h3>{entry.title}</h3><p>{entry.excerpt}</p></Link>)}</div></div></section>

      <section className="home-cta section-dark"><div className="home-cta__inner"><span className="eyebrow">A private introduction</span><h2>Some objects<br /><em>are better seen.</em></h2><p>Our concierge will arrange a private viewing of the collection in Geneva, Paris, New York, or by appointment.</p><ArrowLink href="/inquiry" dark>Request a private viewing</ArrowLink></div></section>
    </div>
  );
}
