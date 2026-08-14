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
    if (!name || !email || !email.includes("@")) {
      setError("Please include your name and a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return <div className="inquiry-page section-paper"><section className="inquiry-hero section-dark"><div className="inquiry-hero__inner"><Link href="/collection" className="back-link"><ArrowLeft size={15} strokeWidth={1.15} /> Back to collection</Link><div className="inquiry-hero__grid"><div><span className="eyebrow">SAMAY / Private viewing</span><h1>Take the time<br /><em>to look.</em></h1></div><p>Tell us where you are and which reference has caught your eye. A member of the SAMAY concierge will reply personally within two working days.</p></div></div></section><section className="inquiry-form-section section-wrap">{submitted ? <div className="inquiry-success"><div className="inquiry-success__mark"><Check size={24} strokeWidth={1.1} /></div><span className="eyebrow">Request received</span><h2>Thank you,<br /><em>we will be in touch.</em></h2><p>Your request to examine the {interest} has been noted. This prototype does not process payment or create an order; a member of the house will follow up personally.</p><Link href="/" className="text-link">Return to SAMAY <ArrowUpRight size={14} strokeWidth={1.2} /></Link></div> : <form className="inquiry-form" onSubmit={handleSubmit} noValidate><div className="inquiry-form__intro"><span className="eyebrow">01 / Your details</span><h2>A considered<br /><em>conversation.</em></h2><p>Private viewing requests are complimentary and without obligation.</p></div><div className="inquiry-form__fields"><label><span>Full name</span><input name="name" type="text" placeholder="Your name" autoComplete="name" /></label><label><span>Email address</span><input name="email" type="email" placeholder="you@example.com" autoComplete="email" /></label><label><span>City</span><input name="city" type="text" placeholder="Where are you based?" autoComplete="address-level2" /></label><label><span>Reference of interest</span><select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)}>{watches.map((watch) => <option key={watch.name}>{watch.name}</option>)}</select></label><label className="field--wide"><span>Anything we should know?</span><textarea name="message" rows={4} placeholder="A preferred city, a material, a question…" /></label>{error && <p className="form-error" role="alert">{error}</p>}<div className="inquiry-form__submit"><p>By submitting, you are requesting a conversation only. No payment is taken and no purchase is implied.</p><button type="submit" className="button-primary">Send request <ArrowUpRight size={15} strokeWidth={1.2} /></button></div></div></form>}</section><section className="inquiry-details section-dark"><div className="inquiry-details__grid"><div><span className="eyebrow">Our doors</span><p>Geneva · Paris · New York<br />By appointment, Tuesday–Saturday</p></div><div><span className="eyebrow">Concierge</span><p>concierge@samay.house<br />+41 22 555 01 26</p></div><div><span className="eyebrow">The promise</span><p>Five-year international warranty<br />Certificate of authenticity with every piece</p></div></div></section></div>;
}
