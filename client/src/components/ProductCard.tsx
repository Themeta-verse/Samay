// Atelier Obsidian reminder: a product card is an exhibition label attached to an object, never a sales tile.

import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import type { Watch } from "@/lib/samayData";

export function ProductCard({ watch, featured = false }: { watch: Watch; featured?: boolean }) {
  return (
    <Link href={`/watch/${watch.slug}`} className={`product-card ${featured ? "product-card--featured" : ""}`}>
      <div className="product-card__image-wrap">
        <img src={watch.image} alt={`${watch.name} watch in ${watch.family} collection`} loading="lazy" className="product-card__image" />
        <span className="product-card__view">Examine <ArrowUpRight size={14} strokeWidth={1.2} /></span>
      </div>
      <div className="product-card__meta">
        <div><span className="eyebrow">{watch.reference}</span><h3>{watch.name}</h3></div>
        <div className="product-card__side"><span>{watch.family}</span><span>{watch.case}</span></div>
      </div>
      <p className="product-card__short">{watch.short}</p>
    </Link>
  );
}
