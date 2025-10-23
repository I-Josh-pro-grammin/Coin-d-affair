import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
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
=======
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import CategoryListing from "./pages/CategoryListing";
import AdDetail from "./pages/AdDetail";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
>>>>>>> 585f3f395cee00a1c13f7bcbf0bffdc1b2d99803

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
      <BrowserRouter>
<<<<<<< HEAD
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
=======
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="/tableau-de-bord" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/favoris" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* Category and subcategory routes */}
          <Route path="/categorie/:category/:subcategory" element={<CategoryListing />} />
          <Route path="/categorie/:category" element={<CategoryListing />} />
          
          {/* Ad detail route */}
          <Route path="/annonce/:adId" element={<AdDetail />} />
          
          {/* Placeholder pages for features under development */}
          <Route path="/deposer-annonce" element={<PlaceholderPage />} />
          <Route path="/mes-annonces" element={<PlaceholderPage />} />
          <Route path="/profil" element={<PlaceholderPage />} />
          <Route path="/aide" element={<PlaceholderPage />} />
          <Route path="/a-propos" element={<PlaceholderPage />} />
          <Route path="/contact" element={<PlaceholderPage />} />
          <Route path="/mentions-legales" element={<PlaceholderPage />} />
          <Route path="/politique-confidentialite" element={<PlaceholderPage />} />
          <Route path="/conditions-utilisation" element={<PlaceholderPage />} />
          <Route path="/mot-de-passe-oublie" element={<PlaceholderPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
>>>>>>> 585f3f395cee00a1c13f7bcbf0bffdc1b2d99803
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
