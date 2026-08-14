/* Atelier Obsidian product route: the watch becomes a private catalogue of image, construction, and material. */
import { useEffect } from "react";
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

  useEffect(() => {
    document.title = `${watch.name} ${watch.reference} | SAMAY`;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", `${watch.name}: ${watch.description}`);
    return () => { document.title = "SAMAY — Contemporary Horology"; };
  }, [watch]);

  return <main className="watch-detail">
    <ProductShowcase watch={watch} />

    <section className="product-detail__section section-paper"><div className="product-detail__split"><div><SectionLabel index="02">The proportion</SectionLabel><h2 className="product-detail__display">Made to be<br /><em>noticed slowly.</em></h2></div><div className="product-detail__body"><p>{watch.designPhilosophy}</p><p>{watch.note}</p><p>{watch.context}</p></div></div></section>

    <section className="product-detail__section product-tech"><div className="product-tech__intro"><div><SectionLabel index="03" dark>Technical ledger</SectionLabel><h2 className="product-detail__display">Precision,<br /><em>underneath.</em></h2></div><p>{detail.technicalIntro}</p></div><div className="product-spec-groups">{detail.specifications.map((group) => <section className="product-spec-group" key={group.label} aria-label={`${group.label} specifications`}><h3>{group.label}</h3><dl>{group.items.map((item) => <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl></section>)}</div></section>

    <section className="product-detail__section section-paper"><div className="product-feature"><figure className="product-feature__image"><img src={detail.movement.image} alt={detail.movement.alt} decoding="async" /></figure><div className="product-feature__copy"><SectionLabel index="04">{detail.movement.label}</SectionLabel><h2>{detail.movement.title}<br /><em>{detail.movement.emphasis}</em></h2><p>{detail.movement.body}</p></div></div></section>

    <section className="product-detail__section section-paper"><div className="product-feature product-feature--reverse"><div className="product-feature__copy"><SectionLabel index="05">Material decision</SectionLabel><h2>{detail.material.title}<br /><em>{detail.material.emphasis}</em></h2><p>{detail.material.body}</p></div><figure className="product-feature__image"><img src={detail.material.image} alt={detail.material.alt} decoding="async" /></figure></div></section>

    <section className="product-detail__section product-craft"><SectionLabel index="06">The considered details</SectionLabel><div className="product-craft__grid">{detail.craft.map((item) => <article className="product-craft__card" key={item.title}><img src={item.image} alt={item.alt} decoding="async" /><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>

    <section className="product-detail__section product-availability"><div className="product-availability__inner"><div><SectionLabel index="07" dark>Acquisition</SectionLabel><h2>{detail.availability.label}<br /><em>by request.</em></h2></div><div className="product-availability__copy"><p>{detail.availability.longNote}</p><Link href="/inquiry" className="product-action product-action--primary">{detail.availability.action}</Link></div></div></section>

    <section className="related section-paper"><div className="section-wrap"><SectionLabel index="08">Complete the collection</SectionLabel><div className="related__head"><h2>Another point<br /><em>of view.</em></h2><ArrowLink href="/collection">See the collection</ArrowLink></div><div className="related__grid">{watches.filter((item) => item.slug !== watch.slug).map((item) => <Link key={item.slug} href={`/watch/${item.slug}`} className="related-card"><img src={item.image} alt={`${item.name} watch`} decoding="async" /><span className="eyebrow">{item.reference}</span><h3>{item.name}</h3><ArrowUpRight size={17} strokeWidth={1.1} /></Link>)}</div></div></section>
  </main>;
}
