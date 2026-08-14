/* Atelier Obsidian product system: large object-first imagery, quiet controls, and an accessible private inspection layer. */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Minus, Plus, X, ZoomIn } from "lucide-react";
import type { ProductGalleryFrame, Watch } from "@/lib/samayData";
import { clampGalleryZoom, getGalleryIndex, getPinchZoom } from "./productGalleryMath";

function ProductImage({ frame, eager, className = "", style }: { frame: ProductGalleryFrame; eager?: boolean; className?: string; style?: React.CSSProperties }) {
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(false); }, [frame.image]);
  return <img className={`${className} product-image ${ready ? "is-ready" : ""}`} style={{ objectPosition: frame.position, ...style }} src={frame.image} data-fallback={frame.fallback} onLoad={() => setReady(true)} onError={(event) => { const image = event.currentTarget; const fallback = image.dataset.fallback; if (fallback && image.src !== fallback) { setReady(false); image.src = fallback; } }} alt={frame.alt} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" />;
}

export function ProductShowcase({ watch }: { watch: Watch }) {
  const [variantId, setVariantId] = useState(watch.variants[0]?.id ?? "");
  const selectedVariant = watch.variants.find((variant) => variant.id === variantId) ?? watch.variants[0];
  const frames = selectedVariant ? [{ ...watch.detail.gallery[0], image: selectedVariant.image, alt: selectedVariant.alt }, ...watch.detail.gallery.slice(1)] : watch.detail.gallery;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pinchPoints = useRef(new Map<number, { x: number; y: number }>());
  const pinchStart = useRef<{ distance: number; zoom: number } | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inspectionImageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const frame = frames[active] ?? frames[0];

  useEffect(() => { setVariantId(watch.variants[0]?.id ?? ""); setActive(0); setOpen(false); setZoom(1); }, [watch.slug, watch.variants]);
  useEffect(() => { setActive(0); setOpen(false); setZoom(1); }, [variantId]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "ArrowRight") setActive((current) => getGalleryIndex(current, 1, frames.length));
      if (event.key === "ArrowLeft") setActive((current) => getGalleryIndex(current, -1, frames.length));
      if (event.key === "+" || event.key === "=") setZoom((current) => clampGalleryZoom(current + 0.25));
      if (event.key === "-") setZoom((current) => clampGalleryZoom(current - 0.25));
    };
    document.addEventListener("keydown", onKey);
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    return () => { window.clearTimeout(timer); document.removeEventListener("keydown", onKey); document.body.style.overflow = prior; };
  }, [open, frames.length]);
  useEffect(() => {
    if (!open) return;
    return () => { returnFocusRef.current?.focus(); };
  }, [open]);
  useEffect(() => {
    if (open) return;
    const item = railRef.current?.querySelector<HTMLElement>(`[data-gallery-index="${active}"]`);
    item?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest", inline: "nearest" });
  }, [active, open]);

  const move = (direction: number) => setActive((current) => getGalleryIndex(current, direction, frames.length));
  const closeInspection = () => { setOpen(false); setZoom(1); pinchPoints.current.clear(); pinchStart.current = null; };
  const openFrame = (index: number, trigger?: HTMLElement | null) => { returnFocusRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null); setActive(index); setZoom(1); setOpen(true); };
  const scrollRail = (direction: number) => railRef.current?.scrollBy({ left: direction * Math.max(railRef.current.clientWidth * .72, 260), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const resetZoomOrigin = () => { inspectionImageRef.current?.style.setProperty("--inspection-origin", "50% 50%"); };
  const setZoomLevel = (next: number) => { setZoom(clampGalleryZoom(next)); };
  const getDistance = (points: { x: number; y: number }[]) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pinchPoints.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pinchPoints.current.size === 2) pinchStart.current = { distance: getDistance(Array.from(pinchPoints.current.values())), zoom };
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pinchPoints.current.has(event.pointerId)) return;
    pinchPoints.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const points = Array.from(pinchPoints.current.values());
    if (points.length === 2 && pinchStart.current) {
      const nextZoom = getPinchZoom(pinchStart.current.zoom, pinchStart.current.distance, getDistance(points));
      setZoom(nextZoom);
      const bounds = event.currentTarget.getBoundingClientRect();
      const centerX = (points[0].x + points[1].x) / 2;
      const centerY = (points[0].y + points[1].y) / 2;
      event.currentTarget.style.setProperty("--inspection-origin", `${Math.min(Math.max(((centerX - bounds.left) / bounds.width) * 100, 0), 100)}% ${Math.min(Math.max(((centerY - bounds.top) / bounds.height) * 100, 0), 100)}%`);
    }
  };
  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => { pinchPoints.current.delete(event.pointerId); if (pinchPoints.current.size < 2) pinchStart.current = null; };

  return <>
    <section className="product-showcase section-dark" aria-labelledby="product-title">
      <div className="product-showcase__frame">
        <div className="product-showcase__toolbar"><Link href="/collection" className="back-link">Collection</Link><span>Reference / {watch.reference}</span></div>
        <div className="product-showcase__grid">
          <div className="product-showcase__object">
            <button type="button" className="product-showcase__hero-image" onClick={(event) => openFrame(active, event.currentTarget)} aria-label={`Inspect ${watch.name} ${frame.label.toLowerCase()} image`}><ProductImage frame={frame} eager /><span className="product-showcase__image-rule" /><span className="product-showcase__image-index">{String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span><span className="product-showcase__inspect-cue"><ZoomIn size={14} strokeWidth={1.15} /> Inspect</span></button>
            <div className="product-showcase__hero-caption"><span>{frame.label}</span><p>{frame.caption}</p></div>
          </div>
          <div className="product-showcase__identity">
            <span className="eyebrow">{watch.family} / {watch.reference}</span>
            <h1 id="product-title">{watch.name}<br /><em>{watch.short.replace(".", "")}</em></h1>
            <p>{watch.description}</p>
            {selectedVariant && <div className="product-showcase__configuration">
              <div><span>Configuration</span><strong>{selectedVariant.label}</strong></div>
              {watch.variants.length > 1 ? <div className="product-showcase__variant-list" role="group" aria-label={`${watch.name} photographed configurations`}>{watch.variants.map((variant) => <button type="button" key={variant.id} className={variant.id === selectedVariant.id ? "is-active" : ""} onClick={() => setVariantId(variant.id)} aria-pressed={variant.id === selectedVariant.id}>{variant.label}</button>)}</div> : <p>Presented as photographed. Additional configurations appear only with a dedicated campaign study.</p>}
            </div>}
            <dl className="product-showcase__availability"><div><dt>Availability</dt><dd>{watch.detail.availability.label}</dd></div><p>{selectedVariant?.availabilityNote ?? watch.detail.availability.note}</p></dl>
            <div className="product-showcase__actions"><Link href="/inquiry" className="product-action product-action--primary">{watch.detail.availability.action}</Link><Link href="/bespoke" className="product-action">Private selection</Link></div>
            <dl className="product-showcase__hero-specs"><div><dt>Case</dt><dd>{watch.case}</dd></div><div><dt>Calibre</dt><dd>{watch.movement}</dd></div><div><dt>Reserve</dt><dd>{watch.reserve}</dd></div></dl>
          </div>
        </div>
      </div>
    </section>

    <section className="product-gallery section-dark" aria-labelledby="gallery-title">
      <div className="product-gallery__head"><span className="eyebrow">01 / Image sequence</span><h2 id="gallery-title">The object,<br /><em>view by view.</em></h2><p>Select an image to enter the inspection room. Each frame stays close to one decision.</p></div>
      <div className="product-gallery__utility" data-watch-reveal><p aria-live="polite">Frame {String(active + 1).padStart(2, "0")} of {String(frames.length).padStart(2, "0")} <span>/ {frame.label}</span></p><div><button type="button" onClick={() => scrollRail(-1)} aria-label="Scroll gallery backward"><ChevronLeft size={16} /></button><button type="button" onClick={() => scrollRail(1)} aria-label="Scroll gallery forward"><ChevronRight size={16} /></button></div></div>
      <div className="product-gallery__rail" ref={railRef} role="list" aria-label={`${watch.name} image gallery`} data-watch-reveal>{frames.map((item, index) => <button type="button" key={item.id} role="listitem" data-gallery-index={index} onClick={(event) => openFrame(index, event.currentTarget)} onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); const next = getGalleryIndex(index, event.key === "ArrowRight" ? 1 : -1, frames.length); setActive(next); window.requestAnimationFrame(() => railRef.current?.querySelector<HTMLElement>(`[data-gallery-index="${next}"]`)?.focus()); } }} className={index === active ? "is-active" : ""} aria-label={`Inspect ${item.label}`} aria-current={index === active ? "true" : undefined}><ProductImage frame={item} /><span><b>{String(index + 1).padStart(2, "0")}</b>{item.label}</span></button>)}</div>
    </section>

    {open && <div className="inspection" role="dialog" aria-modal="true" aria-label={`${watch.name} image inspection`}>
      <div className="inspection__top"><span>{watch.name} / {frame.label}</span><div><button type="button" onClick={() => { resetZoomOrigin(); setZoomLevel(zoom - .25); }} disabled={zoom <= 1} aria-label="Zoom out"><Minus size={16} /></button><span>{Math.round(zoom * 100)}%</span><button type="button" onClick={() => { resetZoomOrigin(); setZoomLevel(zoom + .25); }} disabled={zoom >= 2.25} aria-label="Zoom in"><Plus size={16} /></button><button type="button" className="inspection__reset" onClick={() => { resetZoomOrigin(); setZoom(1); }} disabled={zoom === 1}>Reset</button><button type="button" ref={closeButtonRef} className="inspection__close" onClick={closeInspection} aria-label="Close image inspection"><X size={18} /></button></div></div>
      <div className="inspection__scene" onWheel={(event) => { if (event.ctrlKey || event.metaKey) { event.preventDefault(); setZoom((current) => clampGalleryZoom(current + (event.deltaY < 0 ? 0.12 : -0.12))); } }} onTouchStart={(event) => { const touch = event.changedTouches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={(event) => { const start = touchStart.current; const touch = event.changedTouches[0]; if (start && Math.abs(touch.clientX - start.x) > 44 && Math.abs(touch.clientY - start.y) < 64) move(touch.clientX < start.x ? 1 : -1); touchStart.current = null; }}><button type="button" className="inspection__arrow inspection__arrow--prev" onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft /></button><div className="inspection__image-wrap" ref={inspectionImageRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerEnd} onPointerCancel={handlePointerEnd} onDoubleClick={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); event.currentTarget.style.setProperty("--inspection-origin", `${((event.clientX - bounds.left) / bounds.width) * 100}% ${((event.clientY - bounds.top) / bounds.height) * 100}%`); setZoom((current) => current > 1 ? 1 : 1.75); }}><ProductImage frame={frame} className="inspection__image" eager style={{ transform: `scale(${zoom})` }} /><span className="inspection__hint">Swipe or use arrow keys to move · Pinch, double-click, or use controls to inspect</span></div><button type="button" className="inspection__arrow inspection__arrow--next" onClick={() => move(1)} aria-label="Next image"><ChevronRight /></button></div>
      <div className="inspection__bottom"><span>{String(active + 1).padStart(2, "0")} / {String(frames.length).padStart(2, "0")}</span><p>{frame.caption}</p><div className="inspection__dots">{frames.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} className={index === active ? "is-active" : ""} aria-label={`View ${item.label}`} />)}</div></div>
    </div>}
  </>;
}
