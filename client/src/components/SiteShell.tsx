/* Atelier Obsidian: navigation behaves like a private gallery index—quiet, legible, and always escapable. */
// Atelier Obsidian structural pass: the shell owns navigation, the global frame, and a composed request pathway.
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, LogIn, LogOut, Menu, Moon, Plus, Sun, UserRound, X } from "lucide-react";
import { ContentFrame } from "./EditorialPrimitives";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";

const mark = "/manus-storage/samay-mark_86b9940c.png";
const navItems = [["Collection", "/collection"], ["Journal", "/journal"], ["The house", "/about"]] as const;
const discoverItems = [
  ["The collection", "/collection", "Three references, held to one point of view."],
  ["The movement", "/movement", "A quiet mechanism, examined without spectacle."],
  ["The materials", "/materials", "Steel, sapphire, leather, and the light between them."],
  ["The craft", "/craft", "The gestures that make an object feel inevitable."],
  ["The atelier", "/atelier", "A contemporary maison, by appointment."],
  ["Bespoke", "/bespoke", "Select the materials for a private conversation."],
  ["Boutique", "/boutique", "A physical-world invitation, by appointment."],
  ["Service", "/service", "Care, continuity, and the time after purchase."],
  ["About SAMAY", "/about", "The philosophy behind the quiet object."],
  ["The journal", "/journal", "Notes on proportion, finishing, and time."],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const discoverButtonRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { user, loading, isAuthenticated, logout } = useAuth();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior }); setMenuOpen(false); setDiscoverOpen(false); }, [location]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => {
    if (!menuOpen && !discoverOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menuOpen) { setMenuOpen(false); window.setTimeout(() => menuButtonRef.current?.focus(), 0); }
      if (discoverOpen) { setDiscoverOpen(false); window.setTimeout(() => discoverButtonRef.current?.focus(), 0); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [discoverOpen, menuOpen]);
  return <div className="samay-app">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <Link href="/" className="brand-lockup" aria-label="SAMAY home"><img src={mark} alt="" className="brand-mark" /><span className="brand-name">S<span className="brand-name__aperture">A</span>MAY</span></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">{navItems.map(([label, href]) => <Link key={href} href={href} className={location === href ? "is-active" : ""}>{label}</Link>)}</nav>
        <div className="header-actions">
          <Link href="/boutique" className="header-boutique">Boutique</Link>
          <button ref={discoverButtonRef} className={`discover-button ${discoverOpen ? "is-open" : ""}`} onClick={() => setDiscoverOpen((open) => !open)} aria-expanded={discoverOpen} aria-controls="discover-panel" aria-haspopup="dialog">Discover <Plus size={14} strokeWidth={1.1} /></button>
          <Link href="/inquiry" className="inquiry-link">Private viewing <ArrowUpRight size={14} strokeWidth={1.25} /></Link>
          <button className="shell-utility" type="button" onClick={toggleTheme} aria-label={theme === "dark" ? "Switch to gallery light theme" : "Switch to obsidian theme"} title={theme === "dark" ? "Gallery light" : "Obsidian theme"}>{theme === "dark" ? <Sun size={14} strokeWidth={1.35} /> : <Moon size={14} strokeWidth={1.35} />}</button>
          {loading ? <span className="shell-utility shell-utility--loading" aria-label="Checking account">•••</span> : isAuthenticated ? <button className="shell-account" type="button" onClick={() => logout()} aria-label={`Sign out ${user?.name ?? "of your account"}`}><UserRound size={13} strokeWidth={1.25} /><span>{user?.name?.split(" ")[0] ?? "Account"}</span><LogOut size={12} strokeWidth={1.25} /></button> : <button className="shell-account" type="button" onClick={startLogin}><LogIn size={13} strokeWidth={1.25} /><span>Sign in</span></button>}
          <button ref={menuButtonRef} className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-menu">{menuOpen ? <X size={20} strokeWidth={1.2} /> : <Menu size={20} strokeWidth={1.2} />}</button>
        </div>
      </div>
      {menuOpen && <div id="mobile-menu" className="mobile-menu"><div className="mobile-menu__topline"><span>Navigate</span><span>01 — 06</span></div><nav aria-label="Mobile navigation">
        {[...navItems, ["Boutique", "/boutique"], ["Bespoke", "/bespoke"], ["Private viewing", "/inquiry"]].map(([label, href], index) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}><span className="mobile-menu__index">{String(index + 1).padStart(2, "0")}</span>{label}<ArrowUpRight size={17} strokeWidth={1.2} /></Link>)}
      </nav><p className="mobile-menu__note">Contemporary horology, considered in shadow.</p></div>}
    </header>
    {discoverOpen && <DiscoverPanel onClose={() => setDiscoverOpen(false)} />}
    <main id="main-content" className="page-transition">{children}</main>
    <SiteFooter />
  </div>;
}

function DiscoverPanel({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 0); return () => window.clearTimeout(timer); }, []);
  return <aside id="discover-panel" className="discover-panel" role="dialog" aria-modal="true" aria-label="Discover SAMAY"><div className="discover-panel__inner"><div className="discover-panel__heading"><span className="eyebrow">SAMAY / Discover</span><button ref={closeButtonRef} className="discover-panel__close" onClick={onClose} aria-label="Close discover panel"><X size={18} strokeWidth={1.1} /></button></div><div className="discover-panel__grid">{discoverItems.map(([label, href, description], index) => <Link key={href} href={href} onClick={onClose} className="discover-panel__item"><span className="discover-panel__index">{String(index + 1).padStart(2, "0")}</span><span><strong>{label}</strong><small>{description}</small></span><ArrowUpRight size={16} strokeWidth={1.1} /></Link>)}</div><p className="discover-panel__note">Begin anywhere. Stay as long as the object asks.</p></div></aside>;
}

export function SiteFooter() {
  return <footer className="site-footer"><ContentFrame className="site-footer__grid"><div><div className="footer-wordmark"><img src={mark} alt="" className="brand-mark brand-mark--footer" /><span>S<span className="brand-name__aperture">A</span>MAY</span></div><p className="footer-caption">Contemporary horology,<br />considered in shadow.</p></div><div className="footer-column"><span className="eyebrow">Explore</span><Link href="/collection">Collection</Link><Link href="/movement">Movement</Link><Link href="/materials">Materials</Link><Link href="/journal">Journal</Link></div><div className="footer-column"><span className="eyebrow">Concierge</span><Link href="/bespoke">Bespoke</Link><Link href="/boutique">Boutique</Link><Link href="/inquiry">Private viewing</Link><Link href="/service">Service</Link></div><div className="footer-column footer-column--last"><span className="eyebrow">The house</span><Link href="/about">About SAMAY</Link><Link href="/atelier">Atelier</Link><Link href="/contact">Contact</Link><Link href="/contact">Start a conversation</Link></div></ContentFrame><ContentFrame className="site-footer__bottom"><span>© 2026 SAMAY Watch House</span><span>Contemporary horology, considered in shadow</span><span>Private by design</span></ContentFrame></footer>;
}

export function SectionLabel({ index, children, dark = false }: { index: string; children: React.ReactNode; dark?: boolean }) { return <div className={`section-label ${dark ? "section-label--dark" : ""}`}><span>{index}</span><span className="section-label__line" /><span>{children}</span></div>; }
export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) { return <Link href={href} className={`arrow-link ${dark ? "arrow-link--dark" : ""}`}><span>{children}</span><ArrowUpRight size={15} strokeWidth={1.25} /></Link>; }
