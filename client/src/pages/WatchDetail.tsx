// Atelier Obsidian reminder: present the watch as an object under examination, not as a transactional product card.
import { useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";
import { findWatch, watches, type PresentationFrame, type Watch } from "@/lib/samayData";

const examinationImages = [
  "/manus-storage/samay-macro-dial_8993792c.jpg",
  "/manus-storage/samay-case-profile_d72bd80f.jpg",
  "/manus-storage/samay-crown-detail_6c531800.jpg",
  "/manus-storage/samay-movement-study_129e7db4.jpg",
  "/manus-storage/samay-atelier-tools_ad9fdca5.jpg",
];

export default function WatchDetail() {
  const [, params] = useRoute("/watch/:slug");
  const watch = findWatch(params?.slug);
  const presentation = watch.presentation ?? buildPresentation(watch);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const [openSection, setOpenSection] = useState("movement");
  const activeView = presentation[activeFrame] ?? presentation[0];

  return <div className="watch-detail section-paper">
    <section className="watch-hero section-dark">
      <div className="watch-hero__inner">
        <Link href="/collection" className="back-link"><ArrowLeft size={15} strokeWidth={1.15} /> Back to collection</Link>
        <div className="watch-hero__grid">
          <div className="watch-stage">
            <div className="watch-stage__frame"><img src={watch.image} alt={`${watch.name} ${watch.reference} watch`} /><span className="watch-stage__annotation">Object / {watch.reference}</span></div>
            <div className="watch-stage__under"><span>Exterior / 01</span><span>Scroll to examine</span></div>
          </div>
          <div className="watch-hero__copy"><span className="eyebrow">{watch.reference} · {watch.family}</span><h1>{watch.name}<br /><em>{watch.short.replace(".", "")}</em></h1><p>{watch.description}</p><div className="watch-hero__price"><span>Availability</span><strong>{watch.price}</strong></div><ArrowLink href="/inquiry" dark>Request this reference</ArrowLink><div className="watch-hero__facts"><div><span>Case</span><strong>{watch.case}</strong></div><div><span>Movement</span><strong>{watch.movement}</strong></div><div><span>Reserve</span><strong>{watch.reserve}</strong></div></div></div>
        </div>
      </div>
    </section>

    <section className="watch-examination section-dark" id="examination">
      <div className="section-wrap">
        <div className="watch-examination__intro"><SectionLabel index="01" dark>Examine the object</SectionLabel><p>Move through the reference slowly. Each view isolates one decision, then returns it to the whole.</p></div>
        <div className="watch-examination__grid">
          <div className="watch-examination__stage"><img key={activeView.image} src={activeView.image} alt={`${watch.name} ${activeView.label.toLowerCase()} study`} /><div className="watch-examination__caption"><span>{activeView.label}</span><strong>{activeView.caption}</strong></div><span className="watch-examination__serial">SM / {watch.reference.slice(-3)} · 0{activeFrame + 1} / 0{presentation.length}</span></div>
          <div className="watch-examination__rail" aria-label="Examination views">{presentation.map((frame, index) => <button type="button" key={frame.label} onClick={() => setActiveFrame(index)} className={activeFrame === index ? "is-selected" : ""} aria-pressed={activeFrame === index}><span>0{index + 1}</span><strong>{frame.label}</strong><small>{frame.caption}</small></button>)}</div>
        </div>
      </div>
    </section>

    <section className="watch-story section-paper"><div className="section-wrap"><SectionLabel index="02">The idea</SectionLabel><div className="watch-story__grid"><h2>Made to be<br /><em>noticed slowly.</em></h2><div><p className="lead-copy">{watch.designPhilosophy}</p><p>{watch.note}</p><p>{watch.context}</p></div></div></div></section>
    <section className="watch-material-rationale section-paper"><div className="section-wrap"><SectionLabel index="03">Why these materials</SectionLabel><div className="watch-material-rationale__grid"><h2>The case<br /><em>holds the light.</em></h2><p>{watch.materialRationale}</p></div></div></section>
    <section className="watch-specs section-dark"><div className="section-wrap"><SectionLabel index="04" dark>Technical study</SectionLabel><div className="watch-specs__grid"><div className="watch-specs__intro"><span className="eyebrow">SM / {watch.reference.slice(-3)}</span><h2>Precision<br /><em>underneath.</em></h2><p>A movement is a landscape of tolerances. The figures below are not decoration; they are the conditions the watch keeps.</p></div><div className="spec-list"><SpecRow label="Movement" value={watch.movement} open={openSection === "movement"} onClick={() => setOpenSection(openSection === "movement" ? "" : "movement")} detail={`${watch.frequency} · regulated in five positions`} /><SpecRow label="Power reserve" value={watch.reserve} open={openSection === "reserve"} onClick={() => setOpenSection(openSection === "reserve" ? "" : "reserve")} detail="Measured from a fully wound movement at rest." /><SpecRow label="Water resistance" value={watch.water} open={openSection === "water"} onClick={() => setOpenSection(openSection === "water" ? "" : "water")} detail="Tested to the stated pressure before final casing." /><SpecRow label="Dimensions" value={watch.dimensions} open={openSection === "dimensions"} onClick={() => setOpenSection(openSection === "dimensions" ? "" : "dimensions")} detail="Measured case, including crystal and lugs." /></div></div></div></section>
    <section className="materials-section section-paper" id="materials"><div className="section-wrap"><SectionLabel index="05">Material language</SectionLabel><div className="materials-section__grid"><div className="materials-section__copy"><h2>Surface is<br /><em>structure.</em></h2><p>Choose a finish to see how the same proportions change their voice. The object remains; the light moves.</p><div className="material-switcher">{watch.materials.map((material, index) => <button key={material} onClick={() => setActiveMaterial(index)} className={activeMaterial === index ? "is-selected" : ""}><span>0{index + 1}</span>{material}<ChevronDown size={14} strokeWidth={1.1} /></button>)}</div></div><div className="materials-section__stage"><img src={activeFrame === 0 ? watch.image : activeView.image} alt={`${watch.name} material study`} /><div className="material-caption"><span>Selected finish</span><strong>{watch.materials[activeMaterial]}</strong><span className="material-caption__check"><Check size={13} strokeWidth={1.1} /> Hand inspected</span></div></div></div></div></section>
    <section className="related section-paper"><div className="section-wrap"><SectionLabel index="06">Continue examining</SectionLabel><div className="related__head"><h2>Another point<br /><em>of view.</em></h2><ArrowLink href="/collection">See the collection</ArrowLink></div><div className="related__grid">{watches.filter((item) => item.slug !== watch.slug).map((item) => <Link key={item.slug} href={`/watch/${item.slug}`} className="related-card"><img src={item.image} alt={`${item.name} watch`} /><span className="eyebrow">{item.reference}</span><h3>{item.name}</h3><ArrowUpRight size={17} strokeWidth={1.1} /></Link>)}</div></div></section>
  </div>;
}

function buildPresentation(watch: Watch): PresentationFrame[] {
  return [
    { label: "Exterior", caption: "The complete object, held in a single line.", image: watch.image },
    { label: "Dial", caption: "The surface, brought close enough to read.", image: examinationImages[0] },
    { label: "Case", caption: "A profile of planes, bevels, and pressure.", image: examinationImages[1] },
    { label: "Crown", caption: "The smallest point of contact, considered as carefully as the dial.", image: examinationImages[2] },
    { label: "Movement", caption: "The mechanism beneath the surface, kept deliberately quiet.", image: examinationImages[3] },
    { label: "Strap", caption: "A material chosen to settle naturally against the wrist.", image: examinationImages[4] },
  ];
}

function SpecRow({ label, value, detail, open, onClick }: { label: string; value: string; detail: string; open: boolean; onClick: () => void }) {
  return <div className={`spec-row ${open ? "is-open" : ""}`}><button onClick={onClick} aria-expanded={open}><span>{label}</span><strong>{value}</strong><ChevronDown size={16} strokeWidth={1.1} /></button>{open && <p>{detail}</p>}</div>;
}
