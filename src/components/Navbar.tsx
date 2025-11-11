import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white rounded-xl shadow-lg px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img 
            src={logo} 
            alt="Coin d'Affaires" 
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[#000435] p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Center Navigation (Desktop) */}
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
          <button className="bg-[#000435] hover:bg-[#020657] text-white font-bold px-6 py-2 rounded-full transition-colors">
            Déposer une annonce
          </button>
        </div>

        {/* Right Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-6">
          <Link 
            to="/favoris" 
            className="text-gray-700 hover:text-[#000435] transition-colors"
            aria-label="Favoris"
          >
            <Heart size={24} />
          </Link>
          <Link 
            to="/panier" 
            className="text-gray-700 hover:text-[#000435] transition-colors"
            aria-label="Panier"
          >
            <ShoppingBag size={24} />
          </Link>
          <Link 
            to="/auth/role-selection"
            className="inline-block"
          >
            <button
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-[#000435] hover:text-white transition-all duration-300"
              type="button"
              aria-label="Se connecter"
            >
              <User size={20} />
              <span>Connexion</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-[#000435] font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Accueil
            </Link>
            <Link 
              to="/boutique" 
              className="text-gray-700 hover:text-[#000435] font-medium transition-colors py-2"
              onClick={toggleMenu}
            >
              Boutique
            </Link>
            <button className="bg-[#000435] hover:bg-[#020657] text-white font-bold px-6 py-3 rounded-full transition-colors w-full">
              Déposer une annonce
            </button>
            
            {/* Mobile Icons */}
            <div className="flex items-center justify-around pt-4 border-t border-gray-200">
              <Link 
                to="/favoris" 
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#000435] transition-colors"
                onClick={toggleMenu}
              >
                <Heart size={24} />
                <span className="text-xs">Favoris</span>
              </Link>
              <Link 
                to="/panier" 
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#000435] transition-colors"
                onClick={toggleMenu}
              >
                <ShoppingBag size={24} />
                <span className="text-xs">Panier</span>
              </Link>
              <button
                onClick={() => { window.location.href = '/auth/role-selection'; }}
                className="flex flex-col items-center gap-1 text-gray-700 hover:text-[#000435] transition-colors"
                aria-label="Se connecter"
              >
                <User size={24} />
                <span className="text-xs">Connexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

