import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  // Bell removed
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import { Logo } from "@/components/common/Logo";

type NavbarProps = {
  cartCount?: number;
  // If you manage auth via props instead of context, pass isLoggedIn/onLoginClick.
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
  onPostAdClick?: () => void;
};

export function Navbar({
  // cartCount = 0,
  isLoggedIn: isLoggedInProp,
  onLoginClick,
  onPostAdClick = () => { },
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Auth context (optional). If you prefer props-based auth, pass isLoggedIn prop.
  const { user, logout } = useAuth();



  const isLoggedIn = !!user;

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector(
        'button, a, input, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement | null;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const handleLogout = () => {
    if (logout) logout();
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/auth/role-selection");
  };

  const handlePostAdClick = () => {
    // Check if user is logged in and is a seller
    if (user?.accountType === 'business') {
      navigate("/dashboard/products/new");
    } else {
      navigate("/deposer");
    }
  };

  const closeMenu = () => setIsOpen(false);

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
            <Logo withText={true} to="/" className="flex-shrink-0" />

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-[#000435] p-2 hover:bg-gray-100 rounded-lg transition-colors focus:ring-2 focus:ring-[#000435]"
              aria-label="Ouvrir le menu"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>

            {/* Center: Links (desktop) */}
            <div className="hidden lg:flex items-center gap-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-[#000435] font-medium transition-colors"
              >
                Accueil
              </Link>
              <Link
                to="/boutique"
                className="text-gray-700 hover:text-[#000435] font-medium transition-colors"
              >
                Boutique
              </Link>

              <button
                onClick={handlePostAdClick}
                className="bg-[#000435] hover:bg-[#020657] text-white font-bold px-6 py-2 rounded-full transition-colors"
                aria-label="Déposer une annonce"
                type="button"
              >
                Déposer une annonce
              </button>
            </div>

            {/* Right: Icons & Login (desktop) */}
            <div className="hidden lg:flex items-center gap-6">
              {user ? (
                <div className="flex items-center gap-4">


                  <Link
                    to="/favoris"
                    className="text-gray-700 hover:text-[#000435] transition-colors p-2 rounded-full hover:bg-gray-100"
                    title="Favoris"
                    aria-label="Favoris"
                  >
                    <Heart size={20} />
                  </Link>
                  {/* Cart removed as part of marketplace conversion */}

                  {/* User dropdown */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 text-gray-700 hover:text-[#000435] transition-colors p-2 rounded-full hover:bg-gray-100">
                      <User size={20} />
                      <span className="hidden sm:inline font-medium">
                        {user.name ?? "Mon compte"}
                      </span>
                    </button>

                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">{user.name}</p>
                        {user.email && (
                          <p className="text-sm text-gray-600">{user.email}</p>
                        )}
                      </div>
                      <Link
                        to="/dashboard"
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
                <>

                  <Link
                    to="/favoris"
                    className="text-gray-700 hover:text-[#000435] transition-colors"
                    aria-label="Favoris"
                  >
                    <Heart size={24} />
                  </Link>

                  {/* Cart removed */}

                  <div>
                    <button
                      onClick={handleLoginClick}
                      className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-[#000435] hover:text-white transition-all duration-300 focus:ring-2 focus:ring-[#000435]"
                      aria-label="Se connecter"
                      type="button"
                    >
                      <User size={20} />
                      <span>Connexion</span>
                    </button>
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
              onClick={closeMenu}
            />
            <div className="relative w-80 max-w-full bg-white shadow-xl p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <Logo withText={false} to="/" className="" />
                <button
                  onClick={closeMenu}
                  aria-label="Fermer le menu"
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#000435]"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-4" aria-label="Menu principal mobile">
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000435] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#000435]"
                >
                  Accueil
                </Link>
                <Link
                  to="/boutique"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000435] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#000435]"
                >
                  Boutique
                </Link>

                <button
                  onClick={() => {
                    handlePostAdClick();
                    closeMenu();
                  }}
                  className="w-full inline-flex justify-center items-center px-6 py-3 rounded-full font-bold text-white bg-[#000435] hover:bg-[#020657] transition-colors focus:outline-none focus:ring-2 focus:ring-[#000435]"
                  aria-label="Déposer une annonce"
                >
                  Déposer une annonce
                </button>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4 pt-4">

                  <Link
                    to="/favoris"
                    onClick={closeMenu}
                    className="flex flex-col items-center gap-2 p-3 text-gray-700 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Heart size={24} />
                    <span className="text-xs">Favoris</span>
                  </Link>

                  {/* Cart removed */}
                </div>

                {isLoggedIn ? (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <Link
                      to="/dashboard"
                      onClick={closeMenu}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000435] hover:bg-gray-100"
                    >
                      Tableau de bord
                    </Link>
                    <Link
                      to="/profil"
                      onClick={closeMenu}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#000435] hover:bg-gray-100"
                    >
                      Mon profil
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={18} />
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLoginClick();
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-[#000435] hover:text-white transition-all"
                  >
                    <User size={20} />
                    Connexion
                  </button>
                )}
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
