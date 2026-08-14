// Atelier Obsidian reminder: the shell is a gallery guide, not a dashboard. Keep chrome sparse, legible, and materially quiet.

import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";

const mark = "/manus-storage/samay-mark_86b9940c.png";

const navItems = [
  ["Collection", "/collection"],
  ["Journal", "/journal"],
  ["The house", "/atelier"],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="samay-app">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="site-header__inner">
          <Link href="/" className="brand-lockup" aria-label="SAMAY home">
            <img src={mark} alt="" className="brand-mark" />
            <span className="brand-name">SAMAY</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className={location === href ? "is-active" : ""}>{label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/inquiry" className="inquiry-link">Private viewing <ArrowUpRight size={14} strokeWidth={1.25} /></Link>
            <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={20} strokeWidth={1.2} /> : <Menu size={20} strokeWidth={1.2} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu__topline"><span>Navigate</span><span>01 — 04</span></div>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href], index) => (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                  <span className="mobile-menu__index">0{index + 1}</span>{label}<ArrowUpRight size={17} strokeWidth={1.2} />
                </Link>
              ))}
              <Link href="/inquiry" onClick={() => setMenuOpen(false)}><span className="mobile-menu__index">04</span>Request a private viewing<ArrowUpRight size={17} strokeWidth={1.2} /></Link>
            </nav>
            <p className="mobile-menu__note">Contemporary horology, considered in shadow.</p>
          </div>
        )}
      </header>
      <main id="main-content" className="page-transition">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <div className="footer-wordmark">SAMAY</div>
          <p className="footer-caption">Contemporary horology,<br />considered in shadow.</p>
        </div>
        <div className="footer-column"><span className="eyebrow">Explore</span><Link href="/collection">Collection</Link><Link href="/journal">Journal</Link><Link href="/atelier">The house</Link></div>
        <div className="footer-column"><span className="eyebrow">Concierge</span><Link href="/inquiry">Private viewing</Link><a href="mailto:concierge@samay.house">concierge@samay.house</a><span>Geneva · Paris · New York</span></div>
        <div className="footer-column footer-column--last"><span className="eyebrow">Information</span><span>Shipping &amp; returns</span><span>Five-year warranty</span><span>Certificate of authenticity</span></div>
      </div>
      <div className="site-footer__bottom"><span>© 2026 SAMAY Watch House</span><span>A fictional contemporary maison</span><span>Private by design</span></div>
    </footer>
  );
}

export function SectionLabel({ index, children, dark = false }: { index: string; children: React.ReactNode; dark?: boolean }) {
  return <div className={`section-label ${dark ? "section-label--dark" : ""}`}><span>{index}</span><span className="section-label__line" /><span>{children}</span></div>;
}

export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return <Link href={href} className={`arrow-link ${dark ? "arrow-link--dark" : ""}`}><span>{children}</span><ArrowUpRight size={15} strokeWidth={1.25} /></Link>;
}
