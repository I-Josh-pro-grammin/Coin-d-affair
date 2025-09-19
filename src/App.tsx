import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
      <BrowserRouter>
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
      </BrowserRouter>
    </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
