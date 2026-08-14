/* Atelier Obsidian product route: the watch becomes a private catalogue of image, construction, and material. */
// Atelier Obsidian: each reference is treated as an individual exhibition chapter, with shared catalogue structure but distinct object-led language.
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";
import { ProductShowcase } from "@/components/ProductShowcase";
import { findWatch, watches } from "@/lib/samayData";
import "@/productExperience.css";

export default function WatchDetail() {
  const [, params] = useRoute("/watch/:slug");
  const watch = findWatch(params?.slug);
  const detail = watch.detail;
  const chapters = {
    meridian: { profileLabel: "The dress reference", profileTitle: "A line held", profileEmphasis: "in ivory.", technicalTitle: "Calibre, brought", technicalEmphasis: "close to hand.", relatedTitle: "Other", relatedEmphasis: "coordinates." },
    serein: { profileLabel: "The everyday reference", profileTitle: "Made for the", profileEmphasis: "uninterrupted day.", technicalTitle: "Legibility,", technicalEmphasis: "in motion.", relatedTitle: "Other", relatedEmphasis: "working hours." },
    vesper: { profileLabel: "The complication reference", profileTitle: "An object", profileEmphasis: "for low light.", technicalTitle: "A reserve,", technicalEmphasis: "made discreet.", relatedTitle: "Other", relatedEmphasis: "hours after dark." },
  } as const;
  const chapter = chapters[watch.slug as keyof typeof chapters] ?? chapters.meridian;
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.title = `${watch.name} ${watch.reference} | SAMAY`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", `${watch.name}: ${watch.description}`);
    return () => { document.title = "SAMAY — Contemporary Horology"; };
  }, [watch]);

  useEffect(() => {
    const root = pageRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-watch-reveal]"));
    if (!("IntersectionObserver" in window)) { targets.forEach((target) => target.classList.add("is-revealed")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: "0px 0px -7%" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [watch.slug]);

  return <main ref={pageRef} className={`watch-detail watch-detail--${watch.slug}`}>
    <ProductShowcase watch={watch} />

    <section className="product-detail__section section-paper" data-watch-reveal><div className="product-detail__split"><div><SectionLabel index="02">{chapter.profileLabel}</SectionLabel><h2 className="product-detail__display">{chapter.profileTitle}<br /><em>{chapter.profileEmphasis}</em></h2></div><div className="product-detail__body"><p>{watch.designPhilosophy}</p><p>{watch.note}</p><p>{watch.context}</p></div></div></section>

    <section className="product-detail__section product-tech" data-watch-reveal><div className="product-tech__intro"><div><SectionLabel index="03" dark>Technical ledger</SectionLabel><h2 className="product-detail__display">{chapter.technicalTitle}<br /><em>{chapter.technicalEmphasis}</em></h2></div><p>{detail.technicalIntro}</p></div><div className="product-spec-groups">{detail.specifications.map((group) => <section className="product-spec-group" key={group.label} aria-label={`${group.label} specifications`}><h3>{group.label}</h3><dl>{group.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>)}</div></section>

    <section className="product-detail__section section-paper" data-watch-reveal><div className="product-feature"><figure className="product-feature__image"><img src={detail.movement.image} alt={detail.movement.alt} decoding="async" /></figure><div className="product-feature__copy"><SectionLabel index="04">{detail.movement.label}</SectionLabel><h2>{detail.movement.title}<br /><em>{detail.movement.emphasis}</em></h2><p>{detail.movement.body}</p></div></div></section>

    <section className="product-detail__section section-paper" data-watch-reveal><div className="product-feature product-feature--reverse"><div className="product-feature__copy"><SectionLabel index="05">Material decision</SectionLabel><h2>{detail.material.title}<br /><em>{detail.material.emphasis}</em></h2><p>{detail.material.body}</p></div><figure className="product-feature__image"><img src={detail.material.image} alt={detail.material.alt} decoding="async" /></figure></div></section>

    <section className="product-detail__section product-craft" data-watch-reveal><SectionLabel index="06">The considered details</SectionLabel><div className="product-craft__grid">{detail.craft.map((item) => <article className="product-craft__card" key={item.title}><img src={item.image} alt={item.alt} decoding="async" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>

    <section className="product-detail__section product-availability" data-watch-reveal><div className="product-availability__inner"><div><SectionLabel index="07" dark>Acquisition</SectionLabel><h2>{detail.availability.label}<br /><em>by request.</em></h2></div><div className="product-availability__copy"><p>{detail.availability.longNote}</p><Link href="/inquiry" className="product-action product-action--primary">{detail.availability.action}</Link></div></div></section>

    <section className="related section-paper" data-watch-reveal><div className="section-wrap"><SectionLabel index="08">Complete the collection</SectionLabel><div className="related__head"><h2>{chapter.relatedTitle}<br /><em>{chapter.relatedEmphasis}</em></h2><ArrowLink href="/collection">See the collection</ArrowLink></div><div className="related__grid">{watches.filter((item) => item.slug !== watch.slug).map((item) => <Link key={item.slug} href={`/watch/${item.slug}`} className="related-card"><img src={item.image} alt={`${item.name} watch`} decoding="async" /><span className="eyebrow">{item.reference}</span><h3>{item.name}</h3><ArrowUpRight size={17} strokeWidth={1.1} /></Link>)}</div></div></section>
  </main>;
}
