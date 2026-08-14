/* Atelier Obsidian: route the flagship as a quiet maison ecosystem, not a page-count exercise. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteShell } from "./components/SiteShell";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import WatchDetail from "./pages/WatchDetail";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
import Atelier from "./pages/Atelier";
import Inquiry from "./pages/Inquiry";
import Craft from "./pages/Craft";
import Movement from "./pages/Movement";
import Materials from "./pages/Materials";
import Bespoke from "./pages/Bespoke";
import Boutique from "./pages/Boutique";
import Service from "./pages/Service";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function Router() {
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
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><SiteShell><Router /></SiteShell></TooltipProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
