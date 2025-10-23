// src/components/Navbar.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Heart,
  ShoppingBag,
  User,
  Search,
  MessageCircle,
  Bell,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

type NavbarProps = {
  cartCount?: number;
  // If you manage auth via props instead of context, pass isLoggedIn/onLoginClick.
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onPostAdClick?: () => void;
};

export function Navbar({
  cartCount = 0,
  isLoggedIn: isLoggedInProp,
  onLoginClick = () => {},
  onPostAdClick = () => {},
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Auth context (optional). If you prefer props-based auth, pass isLoggedIn prop.
  const auth = useAuth?.() as any; // keep `any` so it doesn't break if your type differs
  const user = auth?.user ?? null;
  const logout = auth?.logout ?? (() => {});

  const isLoggedIn = user ? true : !!isLoggedInProp;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector(
        'button, a, input, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement | null;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      // Replace with real search navigation
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    navigate("/");
  };

  return (
    <>
      <nav
        className="w-full fixed top-4 left-0 z-50 px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
        role="navigation"
      >
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <a
              href="/"
              className="flex items-center gap-3 flex-shrink-0"
              aria-label="Accueil - Coin D'Affaires"
            >
              <img
                src="/logo.png"
                alt="Coin D'Affaires"
                className="h-12 w-auto object-contain"
              />
              <span className="text-xl font-bold text-[#000435]">
                Coin D'Affaires
              </span>
            </a>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-[#000435] p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Ouvrir le menu"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>

            {/* Center: Links (desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="/"
                className="text-gray-700 hover:text-[#000435] font-medium transition-colors"
              >
                Accueil
              </a>
              <a
                href="/boutique"
                className="text-gray-700 hover:text-[#000435] font-medium transition-colors"
              >
                Boutique
              </a>

              <button
                onClick={onPostAdClick}
                className="bg-[#000435] hover:bg-[#020657] text-white font-bold px-6 py-2 rounded-full transition-colors"
                aria-label="Déposer une annonce"
                type="button"
              >
                Déposer une annonce
              </button>
            </div>

            {/* Right: Icons & Login (desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {/* If user is logged in via context, show richer UI */}
              {user ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/messages"
                    className="text-gray-700 hover:text-[#000435] transition-colors p-2 rounded-full"
                    title="Messages"
                  >
                    <MessageCircle size={20} />
                  </Link>
                  <Link
                    to="/favoris"
                    className="text-gray-700 hover:text-[#000435] transition-colors p-2 rounded-full"
                    title="Favoris"
                  >
                    <Heart size={20} />
                  </Link>
                  <Link
                    to="/notifications"
                    className="text-gray-700 hover:text-[#000435] transition-colors p-2 rounded-full"
                    title="Notifications"
                  >
                    <Bell size={20} />
                  </Link>

                  {/* User dropdown (simple) */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 text-gray-700 hover:text-[#000435] transition-colors p-2 rounded-full">
                      <User size={20} />
                      <span className="hidden sm:inline font-medium">
                        {user.name ?? "Mon compte"}
                      </span>
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-card border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        {user.email && (
                          <p className="text-sm text-gray-600">{user.email}</p>
                        )}
                      </div>
                      <Link
                        to="/tableau-de-bord"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Tableau de bord
                      </Link>
                      <Link
                        to="/profil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Mon profil
                      </Link>
                      <Link
                        to="/mes-annonces"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        Mes annonces
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4 inline" />
                        Se déconnecter
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Not logged in
                <>
                  <a
                    href="/favoris"
                    className="text-gray-700 hover:text-[#000435] transition-colors"
                    aria-label="Favoris"
                  >
                    <Heart size={24} />
                  </a>

                  <a
                    href="/panier"
                    className="relative text-gray-700 hover:text-[#000435] transition-colors"
                    aria-label="Panier"
                  >
                    <ShoppingBag size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-red-600 text-white">
                        {cartCount}
                      </span>
                    )}
                  </a>

                  <div>
                    {/* Prefer props onLoginClick if provided, otherwise link to /connexion */}
                    {onLoginClick ? (
                      <button
                        onClick={onLoginClick}
                        className="flex items-center gap-2 text-gray-700 hover:text-[#000435] transition-colors"
                        aria-label="Se connecter"
                      >
                        <User size={20} />
                        <span className="font-medium">Connexion</span>
                      </button>
                    ) : (
                      <Link to="/connexion" className="flex items-center gap-2 text-gray-700 hover:text-[#000435] transition-colors">
                        <User size={20} />
                        <span className="font-medium">Connexion</span>
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className="fixed inset-0 z-50 flex"
            role="dialog"
            aria-modal="true"
            aria-label="Menu mobile"
          >
            <button
              className="fixed inset-0 bg-black/40"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />
            <div className="relative w-80 max-w-full bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <a href="/" className="flex items-center" aria-label="Accueil">
                  <img
                    src="/logo.png"
                    alt="Coin D'Affaires"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le menu"
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4" aria-label="Menu principal mobile">
                <a
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000435] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Accueil
                </a>
                <a
                  href="/boutique"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000435] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  Boutique
                </a>

                <button
                  onClick={() => {
                    onPostAdClick();
                    setIsOpen(false);
                  }}
                  className="w-full inline-flex justify-center items-center px-6 py-3 rounded-full font-bold text-white bg-[#000435] hover:bg-[#020657] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  aria-label="Déposer une annonce"
                >
                  Déposer une annonce
                </button>

                <hr className="my-4" />

                <div className="flex items-center justify-around pt-4">
                  <a
                    href="/favoris"
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#000435] transition-colors"
                  >
                    <Heart size={24} />
                    <span className="text-xs">Favoris</span>
                  </a>
                  <a
                    href="/panier"
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#000435] transition-colors relative"
                  >
                    <ShoppingBag size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold rounded-full bg-red-600 text-white">
                        {cartCount}
                      </span>
                    )}
                    <span className="text-xs">Panier</span>
                  </a>
                  <button
                    onClick={() => {
                      onLoginClick();
                      setIsOpen(false);
                    }}
                    className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#000435] transition-colors"
                  >
                    <User size={24} />
                    <span className="text-xs">{isLoggedIn ? "Compte" : "Connexion"}</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </nav>

      {/* spacer so page content isn't hidden under fixed navbar */}
      <div className="h-24" aria-hidden="true" />
    </>
  );
}

export default Navbar;
