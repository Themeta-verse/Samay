// Atelier Obsidian reminder: the inquiry flow is a concierge invitation. Validate gently, state the non-transactional nature, and keep the form calm.

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "wouter";
import { watches } from "@/lib/samayData";

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState("Meridian");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const city = String(form.get("city") ?? "").trim();
    if (!name || !city || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please include your name, city, and a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return <div className="inquiry-page section-paper"><section className="inquiry-hero section-dark"><div className="inquiry-hero__inner"><Link href="/collection" className="back-link"><ArrowLeft size={15} strokeWidth={1.15} /> Back to collection</Link><div className="inquiry-hero__grid"><div><span className="eyebrow">SAMAY / Private viewing</span><h1>Take the time<br /><em>to look.</em></h1></div><p>Tell us where you are and which reference has caught your eye. Prepare the details you would like to bring to a private conversation.</p></div></div></section><section className="inquiry-form-section section-wrap">{submitted ? <div className="inquiry-success"><div className="inquiry-success__mark"><Check size={24} strokeWidth={1.1} /></div><span className="eyebrow">Request prepared</span><h2>The next step<br /><em>is yours.</em></h2><p>Your {interest} conversation is prepared here as a starting point. No email was sent, no payment was taken, and no order was created.</p><Link href="/" className="text-link">Return to SAMAY <ArrowUpRight size={14} strokeWidth={1.2} /></Link></div> : <form className="inquiry-form" onSubmit={handleSubmit} noValidate><div className="inquiry-form__intro"><span className="eyebrow">01 / Your details</span><h2>A considered<br /><em>conversation.</em></h2><p>Private viewing requests are complimentary and without obligation.</p></div><div className="inquiry-form__fields"><label><span>Full name</span><input name="name" type="text" placeholder="Your name" autoComplete="name" /></label><label><span>Email address</span><input name="email" type="email" placeholder="Your email address" autoComplete="email" /></label><label><span>City</span><input name="city" type="text" placeholder="Where are you based?" autoComplete="address-level2" /></label><label><span>Reference of interest</span><select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)}>{watches.map((watch) => <option key={watch.name}>{watch.name}</option>)}</select></label><label className="field--wide"><span>Anything we should know?</span><textarea name="message" rows={4} placeholder="A preferred city, a material, a question…" /></label>{error && <p className="form-error" role="alert">{error}</p>}<div className="inquiry-form__submit"><p>By submitting, you are preparing a conversation only. No payment is taken and no purchase is implied.</p><button type="submit" className="button-primary">Prepare request <ArrowUpRight size={15} strokeWidth={1.2} /></button></div></div></form>}</section><section className="inquiry-details section-dark"><div className="inquiry-details__grid"><div><span className="eyebrow">Concierge channel</span><p>Begin with the request above and bring the reference that has caught your eye.</p></div><div><span className="eyebrow">House salons</span><p>Geneva · Paris · New York<br />Private viewing by appointment</p></div><div><span className="eyebrow">Delivery state</span><p>This page prepares the conversation only.<br />No email, payment, or order is created here.</p></div></div></section></div>;
}
