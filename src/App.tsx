import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { RouteFallback } from "@/components/common/RouteFallback";
import { Page } from "@/components/common/Page";

import { CartProvider } from "./contexts/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RequireAdmin } from "./components/admin/RequireAdmin";


const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const RoleSelection = lazy(() => import("./pages/RoleSelection"));
const SellerSignup = lazy(() => import("./pages/SellerSignup"));
const SellerSetup = lazy(() => import("./pages/SellerSetup"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/auth/VerifyEmail"));
const EmailVerificationRequired = lazy(() => import("./pages/auth/EmailVerificationRequired"));
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

const Settings = lazy(() => import("./pages/dashboard/Settings"));

// New Pages
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Buy = lazy(() => import("./pages/Buy"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));

const Deposer = lazy(() => import("./pages/Deposer"));
const Profile = lazy(() => import("./pages/Profile"));
const Search = lazy(() => import("./pages/Search"));
const About = lazy(() => import("./pages/About"));
const Help = lazy(() => import("./pages/Help"));
const Contact = lazy(() => import("./pages/Contact"));
const CGU = lazy(() => import("./pages/CGU"));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminCategories = lazy(() => import('./pages/admin/Categories'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'));
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));



const App = () => (
  <CartProvider>
    <Toaster />
    <Sonner />
    <ScrollToTop />
    <ErrorBoundary>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Page title="Accueil"><Index /></Page>} />
          {/* Auth Routes */}
          <Route path="/connexion" element={<Page title="Connexion"><Login /></Page>} />
          <Route path="/inscription" element={<Page title="Inscription"><Signup /></Page>} />

          {/* Legacy/Alternative Auth Routes mapped to unified pages */}
          <Route path="/auth/role-selection" element={<Page title="Démarrer"><RoleSelection /></Page>} />
          <Route path="/auth/get-started" element={<Page title="Démarrer"><RoleSelection /></Page>} />
          <Route path="/auth/login" element={<Page title="Connexion"><Login /></Page>} />
          <Route path="/auth/signup/customer" element={<Page title="Inscription acheteur"><Signup /></Page>} />
          <Route path="/auth/signup/seller" element={<Page title="Inscription vendeur"><SellerSignup /></Page>} />

          <Route path="/auth/forgot-password" element={<Page title="Mot de passe oublié"><ForgotPassword /></Page>} />
          <Route path="/auth/reset-password/:token" element={<Page title="Réinitialiser le mot de passe"><ResetPassword /></Page>} />
          <Route path="/auth/verify/:token" element={<Page title="Vérification Email"><VerifyEmail /></Page>} />
          <Route path="/auth/verify-required" element={<Page title="Vérification requise"><EmailVerificationRequired /></Page>} />
          <Route path="/seller/setup" element={<Page title="Configuration boutique"><SellerSetup /></Page>} />

          <Route path="/tableau-de-bord" element={<ProtectedRoute><Page title="Tableau de bord"><DashboardHome /></Page></ProtectedRoute>} />
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Page title="Dashboard"><DashboardHome /></Page></ProtectedRoute>} />
          <Route path="/dashboard/products" element={<ProtectedRoute><Page title="Produits"><Products /></Page></ProtectedRoute>} />
          <Route path="/dashboard/products/new" element={<ProtectedRoute><Page title="Nouveau produit"><ProductForm /></Page></ProtectedRoute>} />
          <Route path="/dashboard/products/:id/edit" element={<ProtectedRoute><Page title="Modifier produit"><ProductForm /></Page></ProtectedRoute>} />
          <Route path="/dashboard/orders" element={<ProtectedRoute><Page title="Commandes"><Orders /></Page></ProtectedRoute>} />
          <Route path="/dashboard/orders/:id" element={<ProtectedRoute><Page title="Détails commande"><OrderDetails /></Page></ProtectedRoute>} />

          <Route path="/dashboard/settings" element={<ProtectedRoute><Page title="Paramètres"><Settings /></Page></ProtectedRoute>} />

          {/* Product & Shopping Routes */}
          <Route path="/produit/:id" element={<Page title="Détails du produit"><ProductDetail /></Page>} />
          <Route path="/acheter/:id" element={<Page title="Finaliser l'achat"><Buy /></Page>} />
          <Route path="/panier" element={<Page title="Mon panier"><Cart /></Page>} />
          <Route path="/checkout" element={<Page title="Paiement"><Checkout /></Page>} />

          <Route path="/deposer" element={<Page title="Déposer une annonce"><Deposer /></Page>} />

          <Route path="/favoris" element={<Page title="Favoris"><Favorites /></Page>} />
          <Route path="/notifications" element={<Page title="Notifications"><Notifications /></Page>} />

          {/* Category routes */}
          <Route path="/categorie/:category/:subcategory" element={<Page title="Catégorie"><CategoryListing /></Page>} />
          <Route path="/categorie/:category" element={<Page title="Catégorie"><CategoryListing /></Page>} />

          {/* Placeholder pages */}
          <Route path="/deposer-annonce" element={<ProtectedRoute><Page title="Déposer une annonce"><PlaceholderPage /></Page></ProtectedRoute>} />
          <Route path="/mes-annonces" element={<ProtectedRoute><Page title="Mes annonces"><Products /></Page></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><Page title="Profil"><Profile /></Page></ProtectedRoute>} />
          <Route path="/recherche" element={<Page title="Recherche"><Search /></Page>} />
          <Route path="/aide" element={<Page title="Aide"><Help /></Page>} />
          <Route path="/a-propos" element={<Page title="À propos"><About /></Page>} />
          <Route path="/contact" element={<Page title="Contact"><Contact /></Page>} />
          <Route path="/mentions-legales" element={<Page title="Mentions légales"><PlaceholderPage /></Page>} />
          <Route path="/politique-confidentialite" element={<Page title="Confidentialité"><PlaceholderPage /></Page>} />
          <Route path="/conditions-utilisation" element={<Page title="Conditions d'utilisation"><CGU /></Page>} />
          <Route path="/cgu" element={<Page title="Conditions Générales d'Utilisation"><CGU /></Page>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<RequireAdmin><Page title="Admin Dashboard"><AdminDashboard /></Page></RequireAdmin>} />
          <Route path="/admin/categories" element={<RequireAdmin><Page title="Gestion Catégories"><AdminCategories /></Page></RequireAdmin>} />
          <Route path="/admin/users" element={<RequireAdmin><Page title="Gestion Utilisateurs"><AdminUsers /></Page></RequireAdmin>} />
          <Route path="/admin/products" element={<RequireAdmin><Page title="Modération Produits"><AdminProducts /></Page></RequireAdmin>} />
          <Route path="/admin/orders" element={<RequireAdmin><Page title="Toutes les Commandes"><AdminOrders /></Page></RequireAdmin>} />
          <Route path="/admin/analytics" element={<RequireAdmin><Page title="Analyses"><AdminAnalytics /></Page></RequireAdmin>} />
          <Route path="/admin/settings" element={<RequireAdmin><Page title="Paramètres Admin"><AdminSettings /></Page></RequireAdmin>} />

          {/* Catch-all */}
          <Route path="*" element={<Page title="Page introuvable"><NotFound /></Page>} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  </CartProvider>
);

export default App;
