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
import { AuthProvider } from "./contexts/AuthContext"; // <-- Added import
import { ProtectedRoute } from "./components/ProtectedRoute";

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const RoleSelection = lazy(() => import("./pages/RoleSelection"));
const AuthLogin = lazy(() => import("./pages/AuthLogin"));
const CustomerSignup = lazy(() => import("./pages/CustomerSignup"));
const SellerSignup = lazy(() => import("./pages/SellerSignup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
// const Dashboard = lazy(() => import("./pages/Dashboard"));
// const Messages = lazy(() => import("./pages/Messages"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Notifications = lazy(() => import("./pages/Notifications"));
const CategoryListing = lazy(() => import("./pages/CategoryListing"));
const PlaceholderPage = lazy(() => import("./pages/PlaceholderPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboard Components
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const Products = lazy(() => import("./pages/dashboard/Products"));
const ProductForm = lazy(() => import("./pages/dashboard/ProductForm"));
const Orders = lazy(() => import("./pages/dashboard/Orders"));
const OrderDetails = lazy(() => import("./pages/dashboard/OrderDetails"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Page title="Accueil"><Index /></Page>} />
                {/* Auth (existing non-/auth routes) */}
                <Route path="/connexion" element={<Page title="Connexion"><Login /></Page>} />
                <Route path="/inscription" element={<Page title="Inscription"><Signup /></Page>} />

                {/* New /auth routes */}
                <Route path="/auth/role-selection" element={<Page title="Démarrer"><RoleSelection /></Page>} />
                <Route path="/auth/get-started" element={<Page title="Démarrer"><RoleSelection /></Page>} />
                <Route path="/auth/login" element={<Page title="Connexion"><AuthLogin /></Page>} />
                <Route path="/auth/signup/customer" element={<Page title="Inscription acheteur"><CustomerSignup /></Page>} />
                <Route path="/auth/signup/seller" element={<Page title="Inscription vendeur"><SellerSignup /></Page>} />
                <Route path="/auth/forgot-password" element={<Page title="Mot de passe oublié"><ForgotPassword /></Page>} />
                <Route path="/auth/reset-password/:token" element={<Page title="Réinitialiser le mot de passe"><ResetPassword /></Page>} />

                <Route path="/tableau-de-bord" element={<Page title="Tableau de bord"><DashboardHome /></Page>} />
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<Page title="Dashboard"><DashboardHome /></Page>} />
                <Route path="/dashboard/products" element={<Page title="Produits"><Products /></Page>} />
                <Route path="/dashboard/products/new" element={<Page title="Nouveau produit"><ProductForm /></Page>} />
                <Route path="/dashboard/products/:id/edit" element={<Page title="Modifier produit"><ProductForm /></Page>} />
                <Route path="/dashboard/orders" element={<Page title="Commandes"><Orders /></Page>} />
                <Route path="/dashboard/orders/:id" element={<Page title="Détails commande"><OrderDetails /></Page>} />
                <Route path="/dashboard/messages" element={<Page title="Messages"><Messages /></Page>} />
                <Route path="/dashboard/settings" element={<Page title="Paramètres"><Settings /></Page>} />
                <Route path="/favoris" element={<Page title="Favoris"><Favorites /></Page>} />
                <Route path="/notifications" element={<Page title="Notifications"><Notifications /></Page>} />

                {/* Category routes */}
                <Route path="/categorie/:category/:subcategory" element={<Page title="Catégorie"><CategoryListing /></Page>} />
                <Route path="/categorie/:category" element={<Page title="Catégorie"><CategoryListing /></Page>} />

                {/* Placeholder pages */}
                <Route path="/deposer-annonce" element={<ProtectedRoute><Page title="Déposer une annonce"><PlaceholderPage /></Page></ProtectedRoute>} />
                <Route path="/mes-annonces" element={<ProtectedRoute><Page title="Mes annonces"><PlaceholderPage /></Page></ProtectedRoute>} />
                <Route path="/profil" element={<ProtectedRoute><Page title="Profil"><PlaceholderPage /></Page></ProtectedRoute>} />
                <Route path="/aide" element={<Page title="Aide"><PlaceholderPage /></Page>} />
                <Route path="/a-propos" element={<Page title="À propos"><PlaceholderPage /></Page>} />
                <Route path="/contact" element={<Page title="Contact"><PlaceholderPage /></Page>} />
                <Route path="/mentions-legales" element={<Page title="Mentions légales"><PlaceholderPage /></Page>} />
                <Route path="/politique-confidentialite" element={<Page title="Confidentialité"><PlaceholderPage /></Page>} />
                <Route path="/conditions-utilisation" element={<Page title="Conditions d'utilisation"><PlaceholderPage /></Page>} />

                {/* Catch-all */}
                <Route path="*" element={<Page title="Page introuvable"><NotFound /></Page>} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
