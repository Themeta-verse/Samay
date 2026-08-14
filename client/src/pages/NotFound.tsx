// Atelier Obsidian reminder: even an error state should feel like a quiet, considered room with a clear way back.

import { Link } from "wouter";
export default function NotFound() { return <div className="not-found section-dark"><span className="eyebrow">SAMAY / 404</span><h1>This room is<br /><em>not on the plan.</em></h1><p>The page you are looking for has moved, or was never part of the collection.</p><Link href="/" className="text-link text-link--light">Return to the house</Link></div>; }
