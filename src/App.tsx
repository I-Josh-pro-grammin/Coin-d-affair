import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { RouteFallback } from "@/components/common/RouteFallback";
import { Page } from "@/components/common/Page";

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Messages = lazy(() => import("./pages/Messages"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Notifications = lazy(() => import("./pages/Notifications"));
const CategoryListing = lazy(() => import("./pages/CategoryListing"));
const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Suspense fallback={<RouteFallback />}> 
            <Routes>
              <Route path="/" element={<Page title="Accueil"><Index /></Page>} />
              <Route path="/connexion" element={<Page title="Connexion"><Login /></Page>} />
              <Route path="/inscription" element={<Page title="Inscription"><Signup /></Page>} />
              <Route path="/tableau-de-bord" element={<Page title="Tableau de bord"><Dashboard /></Page>} />
              <Route path="/dashboard" element={<Page title="Dashboard"><Dashboard /></Page>} />
              <Route path="/messages" element={<Page title="Messages"><Messages /></Page>} />
              <Route path="/favoris" element={<Page title="Favoris"><Favorites /></Page>} />
              <Route path="/notifications" element={<Page title="Notifications"><Notifications /></Page>} />

              {/* Category and subcategory routes */}
              <Route path="/categorie/:category/:subcategory" element={<Page title="Catégorie"><CategoryListing /></Page>} />
              <Route path="/categorie/:category" element={<Page title="Catégorie"><CategoryListing /></Page>} />

              {/* Placeholder pages for features under development */}
              <Route path="/deposer-annonce" element={<Page title="Déposer une annonce"><PlaceholderPage /></Page>} />
              <Route path="/mes-annonces" element={<Page title="Mes annonces"><PlaceholderPage /></Page>} />
              <Route path="/profil" element={<Page title="Profil"><PlaceholderPage /></Page>} />
              <Route path="/aide" element={<Page title="Aide"><PlaceholderPage /></Page>} />
              <Route path="/a-propos" element={<Page title="À propos"><PlaceholderPage /></Page>} />
              <Route path="/contact" element={<Page title="Contact"><PlaceholderPage /></Page>} />
              <Route path="/mentions-legales" element={<Page title="Mentions légales"><PlaceholderPage /></Page>} />
              <Route path="/politique-confidentialite" element={<Page title="Confidentialité"><PlaceholderPage /></Page>} />
              <Route path="/conditions-utilisation" element={<Page title="Conditions d'utilisation"><PlaceholderPage /></Page>} />
              <Route path="/mot-de-passe-oublie" element={<Page title="Mot de passe oublié"><PlaceholderPage /></Page>} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Page title="Page introuvable"><NotFound /></Page>} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
