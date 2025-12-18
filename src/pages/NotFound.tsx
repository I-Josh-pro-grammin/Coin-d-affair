import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="relative mb-8 inline-block">
            <h1 className="text-[120px] md:text-[180px] font-black text-[#000435]/5 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl md:text-6xl font-bold text-[#000435]">Oups !</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Cette page semble introuvable
          </h2>

          <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
            La page que vous recherchez a peut-être été supprimée, renommée ou est temporairement indisponible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#000435] text-white px-8 py-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Home size={20} />
              Retour à l'accueil
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#000435] border-2 border-[#000435]/10 px-8 py-4 rounded-full font-medium hover:bg-[#000435]/5 transition-all"
            >
              <ArrowLeft size={20} />
              Page précédente
            </button>
          </div>

          <div className="mt-16 pt-12 border-t border-gray-100">
            <p className="text-gray-500 mb-4">Vous cherchez quelque chose de précis ?</p>
            <Link
              to="/recherche"
              className="inline-flex items-center gap-2 text-[#000435] font-semibold hover:underline"
            >
              <Search size={18} />
              Aller à la recherche avancée
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
