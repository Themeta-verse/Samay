/* Atelier Obsidian: contact stays simple, direct, and honest about the request pathway. */
import { useState, type FormEvent } from "react";
import { Check, Copy, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { ArrowLink, SectionLabel } from "@/components/SiteShell";
import { buildContactEmailHref, samayContact, samaySocialPlaceholders } from "@/lib/samayContact";

type ContactDraft = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialDraft: ContactDraft = { name: "", email: "", subject: "", message: "" };

async function copyEmailAddress() {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(samayContact.email);
    return;
  }

  const copyTarget = document.createElement("textarea");
  copyTarget.value = samayContact.email;
  copyTarget.setAttribute("readonly", "");
  copyTarget.style.position = "fixed";
  copyTarget.style.opacity = "0";
  document.body.appendChild(copyTarget);
  copyTarget.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(copyTarget);
  if (!copied) throw new Error("Copy unavailable");
}

export default function Contact() {
  const [draft, setDraft] = useState<ContactDraft>(initialDraft);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "unavailable">("idle");
  const [formMessage, setFormMessage] = useState("");

  const updateDraft = (field: keyof ContactDraft, value: string) => {
    setDraft(current => ({ ...current, [field]: value }));
  };

  const handleCopy = async () => {
    try {
      await copyEmailAddress();
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.name.trim() || !draft.email.trim() || !draft.subject.trim() || !draft.message.trim()) {
      setFormMessage("Please complete each field before preparing your email.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(draft.email.trim())) {
      setFormMessage("Please enter a valid email address before preparing your email.");
      return;
    }

    setFormMessage("Your email application is opening with this message prepared. Sending remains in your control.");
    window.location.href = buildContactEmailHref(draft);
  };

  return (
    <div className="flagship-page contact-page">
      <section className="contact-hero section-dark">
        <div className="section-wrap contact-hero__grid">
          <div>
            <SectionLabel index="01" dark>Contact the house</SectionLabel>
            <h1>A considered<br /><em>conversation.</em></h1>
            <p>For a private viewing, service question, bespoke selection, or simply a question about the object.</p>
          </div>
          <div className="contact-hero__aside">
            <span className="eyebrow">By appointment</span>
            <p>Begin with the request flow and frame the question you would like to bring to the house.</p>
            <ArrowLink href="/inquiry" dark>Prepare a private viewing</ArrowLink>
          </div>
        </div>
      </section>

      <section className="contact-details section-paper">
        <div className="section-wrap">
          <SectionLabel index="02">Ways to begin</SectionLabel>
          <div className="contact-details__grid">
            <div className="contact-detail-card contact-detail-card--email">
              <Mail size={18} strokeWidth={1.1} />
              <span>Private viewing<br /><a href={samayContact.emailHref}>{samayContact.email}</a></span>
              <button type="button" className="contact-copy-button" onClick={handleCopy} aria-label={`Copy ${samayContact.email} to clipboard`}>
                {copyState === "copied" ? <Check size={15} strokeWidth={1.5} /> : <Copy size={15} strokeWidth={1.5} />}
                <span>{copyState === "copied" ? "Copied" : copyState === "unavailable" ? "Copy unavailable" : "Copy"}</span>
              </button>
            </div>
            <a className="contact-detail-card" href={samayContact.phoneHref} aria-label={`Call SAMAY at ${samayContact.phone}`}>
              <Phone size={18} strokeWidth={1.1} />
              <span>Conversation by appointment<br /><small>{samayContact.phone}</small></span>
            </a>
            <div className="contact-detail-card">
              <MapPin size={18} strokeWidth={1.1} />
              <span>Geneva · Paris · New York<br /><small>SAMAY house salons</small></span>
            </div>
          </div>
          <div className="contact-social-row" aria-label="Social profiles">
            <span className="contact-social-row__label">Follow the house</span>
            {samaySocialPlaceholders.map(profile => (
              <span className="contact-social-placeholder" key={profile.id} title={`${profile.label} profile link to be added`}>
                {profile.id === "linkedin" ? <Linkedin size={16} strokeWidth={1.35} aria-hidden="true" /> : <Twitter size={16} strokeWidth={1.35} aria-hidden="true" />}
                <span>{profile.label}</span>
                <small>Profile link forthcoming</small>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-message section-dark">
        <div className="section-wrap contact-message__grid">
          <div>
            <SectionLabel index="03" dark>Write to SAMAY</SectionLabel>
            <h2>Frame the<br /><em>question.</em></h2>
            <p>This form prepares a message in your email application addressed to the house. Review and send it from your own inbox.</p>
          </div>
          <form className="contact-message__form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Your name</span>
              <input value={draft.name} onChange={event => updateDraft("name", event.target.value)} autoComplete="name" placeholder="Your name" required />
            </label>
            <label>
              <span>Email address</span>
              <input type="email" value={draft.email} onChange={event => updateDraft("email", event.target.value)} autoComplete="email" placeholder="you@example.com" required />
            </label>
            <label>
              <span>Subject</span>
              <input value={draft.subject} onChange={event => updateDraft("subject", event.target.value)} placeholder="How may we help?" required />
            </label>
            <label>
              <span>Message</span>
              <textarea value={draft.message} onChange={event => updateDraft("message", event.target.value)} placeholder="Tell us what you would like to discuss." rows={5} required />
            </label>
            <button type="submit" className="button-primary contact-message__submit"><Send size={15} strokeWidth={1.5} />Prepare email</button>
            <p className="contact-message__note" aria-live="polite">{formMessage || "No message is sent from the website; you approve sending in your email application."}</p>
          </form>
        </div>
      </section>

      <section className="contact-close section-dark">
        <div className="section-wrap contact-close__grid">
          <div>
            <span className="eyebrow">No forms for the sake of forms</span>
            <h2>Start where<br /><em>the question is.</em></h2>
          </div>
          <div>
            <p>If the question is about a reference, begin with the collection. If it is about care, begin with service. If it is about a future object, begin with bespoke.</p>
            <div className="contact-close__links">
              <ArrowLink href="/collection" dark>Collection</ArrowLink>
              <ArrowLink href="/service" dark>Service</ArrowLink>
              <ArrowLink href="/bespoke" dark>Bespoke</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
