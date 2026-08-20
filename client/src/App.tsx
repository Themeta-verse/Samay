/* Atelier Obsidian: route the flagship as a quiet maison ecosystem, not a page-count exercise. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteShell } from "./components/SiteShell";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const WatchDetail = lazy(() => import("./pages/WatchDetail"));
const Journal = lazy(() => import("./pages/Journal"));
const JournalArticle = lazy(() => import("./pages/JournalArticle"));
const Atelier = lazy(() => import("./pages/Atelier"));
const Inquiry = lazy(() => import("./pages/Inquiry"));
const Craft = lazy(() => import("./pages/Craft"));
const Movement = lazy(() => import("./pages/Movement"));
const Materials = lazy(() => import("./pages/Materials"));
const Bespoke = lazy(() => import("./pages/Bespoke"));
const Boutique = lazy(() => import("./pages/Boutique"));
const Service = lazy(() => import("./pages/Service"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteLoading() {
  return <div className="route-loading" role="status" aria-live="polite"><span>Opening the house</span></div>;
}
function Router() {
  // make sure to consider if you need authentication for certain routes
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/collection" component={Collection} />
    <Route path="/watch/:slug" component={WatchDetail} />
    <Route path="/journal" component={Journal} />
    <Route path="/journal/:slug" component={JournalArticle} />
    <Route path="/atelier" component={Atelier} />
    <Route path="/craft" component={Craft} />
    <Route path="/movement" component={Movement} />
    <Route path="/materials" component={Materials} />
    <Route path="/bespoke" component={Bespoke} />
    <Route path="/boutique" component={Boutique} />
    <Route path="/service" component={Service} />
    <Route path="/about" component={About} />
    <Route path="/contact" component={Contact} />
    <Route path="/inquiry" component={Inquiry} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark" switchable><TooltipProvider><Toaster /><SiteShell><Suspense fallback={<RouteLoading />}><Router /></Suspense></SiteShell></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
