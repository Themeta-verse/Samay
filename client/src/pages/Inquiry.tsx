// Atelier Obsidian reminder: the inquiry flow is a concierge invitation. Validate gently, state the non-transactional nature, and keep the form calm.

import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Link } from "wouter";
import { watches } from "@/lib/samayData";
import { trpc } from "@/lib/trpc";

type DeliveryState = "sent" | "owner_notified" | "not_configured";

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState("Meridian");
  const [delivery, setDelivery] = useState<DeliveryState>("not_configured");
  const { data: appointment } = trpc.appointment.availability.useQuery();
  const requestMutation = trpc.concierge.submit.useMutation({
    onSuccess: (result) => {
      setDelivery(result.delivery === "failed" ? "not_configured" : result.delivery);
      setSubmitted(true);
    },
    onError: () => setError("The concierge channel could not prepare this request. Please try again later."),
  });

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
    requestMutation.mutate({
      kind: "private_viewing",
      name,
      email,
      city,
      reference: interest,
      message: String(form.get("message") ?? "").trim() || undefined,
    });
  }

  const isReviewed = delivery === "sent" || delivery === "owner_notified";
  return <div className="inquiry-page section-paper"><section className="inquiry-hero section-dark"><div className="inquiry-hero__inner"><Link href="/collection" className="back-link"><ArrowLeft size={15} strokeWidth={1.15} /> Back to collection</Link><div className="inquiry-hero__grid"><div><span className="eyebrow">SAMAY / Private viewing</span><h1>Take the time<br /><em>to look.</em></h1></div><p>Tell us where you are and which reference has caught your eye. Prepare the details you would like to bring to a private conversation.</p></div></div></section><section className="inquiry-form-section section-wrap">{submitted ? <div className="inquiry-success" aria-live="polite"><div className="inquiry-success__mark"><Check size={24} strokeWidth={1.1} /></div><span className="eyebrow">{isReviewed ? "Request forwarded for review" : "Request prepared"}</span><h2>The next step<br /><em>is yours.</em></h2><p>{isReviewed ? `Your ${interest} request has been forwarded to the SAMAY concierge for review. An appointment is not confirmed until the house replies.` : `Your ${interest} request was checked and prepared in this browser. It was not sent, stored, or shared because a secure concierge review channel is not currently available.`}</p>{appointment?.isActive && appointment.bookingPageUrl ? <a className="button-primary inquiry-success__appointment" href={appointment.bookingPageUrl} target="_blank" rel="noreferrer">Choose a viewing time <ArrowUpRight size={15} strokeWidth={1.2} /></a> : null}{delivery === "not_configured" ? <Link href="/contact" className="text-link inquiry-success__contact">Contact the house <ArrowUpRight size={14} strokeWidth={1.2} /></Link> : null}<Link href="/" className="text-link">Return to SAMAY <ArrowUpRight size={14} strokeWidth={1.2} /></Link></div> : <form className="inquiry-form" onSubmit={handleSubmit} noValidate><div className="inquiry-form__intro"><span className="eyebrow">01 / Your details</span><h2>A considered<br /><em>conversation.</em></h2><p>Private viewing requests are complimentary and without obligation.</p></div><div className="inquiry-form__fields"><label><span>Full name</span><input name="name" type="text" placeholder="Your name" autoComplete="name" /></label><label><span>Email address</span><input name="email" type="email" placeholder="Your email address" autoComplete="email" /></label><label><span>City</span><input name="city" type="text" placeholder="Where are you based?" autoComplete="address-level2" /></label><label><span>Reference of interest</span><select name="interest" value={interest} onChange={(event) => setInterest(event.target.value)}>{watches.map((watch) => <option key={watch.name}>{watch.name}</option>)}</select></label><label className="field--wide"><span>Anything we should know?</span><textarea name="message" rows={4} placeholder="A preferred city, a material, a question…" /></label><aside className="form-handoff field--wide"><span>Appointment availability</span><p>{appointment?.isActive ? "A private-viewing schedule is available after your concierge request is prepared." : "The house can be reached directly while the Google Calendar viewing schedule is being prepared."}</p></aside><aside className="form-handoff field--wide"><span>Concierge review</span><p>Your request is validated and forwarded to the SAMAY concierge for review through the house’s secure internal channel. An appointment is never confirmed by this form.</p></aside>{error && <p className="form-error" role="alert">{error}</p>}<div className="inquiry-form__submit"><p>By submitting, you are requesting a conversation only. No payment is taken, no purchase is implied, and no appointment is confirmed.</p><button type="submit" className="button-primary" disabled={requestMutation.isPending}>{requestMutation.isPending ? "Forwarding request" : "Request a private viewing"} <ArrowUpRight size={15} strokeWidth={1.2} /></button></div></div></form>}</section><section className="inquiry-details section-dark"><div className="inquiry-details__grid"><div><span className="eyebrow">Concierge review</span><p>{isReviewed ? "A request is reviewed by the house before any appointment is confirmed." : "The house can be contacted directly if the secure review channel is unavailable."}</p></div><div><span className="eyebrow">House salons</span><p>Geneva · Paris · New York<br />Private viewing by appointment</p></div><div><span className="eyebrow">Appointment schedule</span><p>{appointment?.isActive ? "Live availability is managed by Google Calendar." : "Viewing times are arranged by the house until a Google Calendar schedule is published."}</p></div></div></section></div>;
}
