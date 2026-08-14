/* Atelier Obsidian product system: large object-first imagery, quiet controls, and an accessible private inspection layer. */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Minus, Plus, X, ZoomIn } from "lucide-react";
import type { ProductGalleryFrame, Watch } from "@/lib/samayData";

function clamp(value: number, min: number, max: number) { return Math.min(Math.max(value, min), max); }

function ProductImage({ frame, eager, className = "", style }: { frame: ProductGalleryFrame; eager?: boolean; className?: string; style?: React.CSSProperties }) {
  return <img className={className} style={style} src={frame.image} data-fallback={frame.fallback} onError={(event) => { const image = event.currentTarget; const fallback = image.dataset.fallback; if (fallback && image.src !== fallback) image.src = fallback; }} alt={frame.alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />;
}

export function ProductShowcase({ watch }: { watch: Watch }) {
  const frames = watch.detail.gallery;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const frame = frames[active] ?? frames[0];

  useEffect(() => { setActive(0); setOpen(false); setZoom(1); }, [watch.slug]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((current) => (current + 1) % frames.length);
      if (event.key === "ArrowLeft") setActive((current) => (current - 1 + frames.length) % frames.length);
      if (event.key === "+" || event.key === "=") setZoom((current) => clamp(current + 0.25, 1, 2.25));
      if (event.key === "-") setZoom((current) => clamp(current - 0.25, 1, 2.25));
    };
    document.addEventListener("keydown", onKey);
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prior; };
  }, [open, frames.length]);

  const move = (direction: number) => setActive((current) => (current + direction + frames.length) % frames.length);
  const openFrame = (index: number) => { setActive(index); setZoom(1); setOpen(true); };

  return <>
    <section className="product-showcase section-dark" aria-labelledby="product-title">
      <div className="product-showcase__frame">
        <div className="product-showcase__toolbar"><Link href="/collection" className="back-link">Collection</Link><span>Reference / {watch.reference}</span></div>
        <div className="product-showcase__grid">
          <div className="product-showcase__object">
            <button type="button" className="product-showcase__hero-image" onClick={() => openFrame(active)} aria-label={`Inspect ${watch.name} ${frame.label.toLowerCase()} image`}><ProductImage frame={frame} eager /><span className="product-showcase__image-rule" /><span className="product-showcase__image-index">{String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span><span className="product-showcase__inspect-cue"><ZoomIn size={14} strokeWidth={1.15} /> Inspect</span></button>
            <div className="product-showcase__hero-caption"><span>{frame.label}</span><p>{frame.caption}</p></div>
          </div>
          <div className="product-showcase__identity">
            <span className="eyebrow">{watch.family} / {watch.reference}</span>
            <h1 id="product-title">{watch.name}<br /><em>{watch.short.replace(".", "")}</em></h1>
            <p>{watch.description}</p>
            <dl className="product-showcase__availability"><div><dt>Availability</dt><dd>{watch.detail.availability.label}</dd></div><p>{watch.detail.availability.note}</p></dl>
            <div className="product-showcase__actions"><Link href="/inquiry" className="product-action product-action--primary">{watch.detail.availability.action}</Link><Link href="/bespoke" className="product-action">Private selection</Link></div>
            <dl className="product-showcase__hero-specs"><div><dt>Case</dt><dd>{watch.case}</dd></div><div><dt>Calibre</dt><dd>{watch.movement}</dd></div><div><dt>Reserve</dt><dd>{watch.reserve}</dd></div></dl>
          </div>
        </div>
      </div>
    </section>

    <section className="product-gallery section-dark" aria-labelledby="gallery-title">
      <div className="product-gallery__head"><span className="eyebrow">01 / Image sequence</span><h2 id="gallery-title">The object,<br /><em>view by view.</em></h2><p>Select an image to enter the inspection room. Each frame stays close to one decision.</p></div>
      <div className="product-gallery__rail" role="list" aria-label={`${watch.name} image gallery`}>{frames.map((item, index) => <button type="button" key={item.id} role="listitem" onClick={() => openFrame(index)} className={index === active ? "is-active" : ""} aria-label={`Inspect ${item.label}`} aria-current={index === active ? "true" : undefined}><ProductImage frame={item} /><span><b>{String(index + 1).padStart(2, "0")}</b>{item.label}</span></button>)}</div>
    </section>

    {open && <div className="inspection" role="dialog" aria-modal="true" aria-label={`${watch.name} image inspection`}>
      <div className="inspection__top"><span>{watch.name} / {frame.label}</span><div><button type="button" onClick={() => setZoom((current) => clamp(current - 0.25, 1, 2.25))} disabled={zoom <= 1} aria-label="Zoom out"><Minus size={16} /></button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => setZoom((current) => clamp(current + 0.25, 1, 2.25))} disabled={zoom >= 2.25} aria-label="Zoom in"><Plus size={16} /></button><button type="button" className="inspection__close" onClick={() => setOpen(false)} aria-label="Close image inspection"><X size={18} /></button></div></div>
      <div className="inspection__scene" onWheel={(event) => { if (event.ctrlKey || event.metaKey) { event.preventDefault(); setZoom((current) => clamp(current + (event.deltaY < 0 ? 0.12 : -0.12), 1, 2.25)); } }} onTouchStart={(event) => { const touch = event.changedTouches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={(event) => { const start = touchStart.current; const touch = event.changedTouches[0]; if (start && Math.abs(touch.clientX - start.x) > 44 && Math.abs(touch.clientY - start.y) < 64) move(touch.clientX < start.x ? 1 : -1); touchStart.current = null; }}><button type="button" className="inspection__arrow inspection__arrow--prev" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button><div className="inspection__image-wrap"><ProductImage frame={frame} className="inspection__image" eager style={{ transform: `scale(${zoom})` }} /><span className="inspection__hint">Swipe or use arrow keys to move · Pinch or use controls to inspect</span></div><button type="button" className="inspection__arrow inspection__arrow--next" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button></div>
      <div className="inspection__bottom"><span>{String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span><p>{frame.caption}</p><div className="inspection__dots">{frames.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} className={index === active ? "is-active" : ""} aria-label={`View ${item.label}`} />)}</div></div>
    </div>}
  </>;
}
