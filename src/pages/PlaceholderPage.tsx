import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlaceholderPage = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const pageName = pathSegments[pathSegments.length - 1]?.replace('-', ' ') || 'Page';
  
  const pageTitle = pageName.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Construction className="h-12 w-12 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-4">
            {pageTitle}
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Cette page est en cours de développement
          </p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Nous travaillons activement sur cette fonctionnalité. Elle sera bientôt disponible !
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="btn-primary">
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
            <Button 
              onClick={() => window.history.back()} 
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Page précédente
            </Button>
          </div>

          {/* Features Coming Soon */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bientôt disponible</h3>
              <p className="text-sm text-gray-600">
                Fonctionnalité en cours de développement
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performance optimisée</h3>
              <p className="text-sm text-gray-600">
                Interface rapide et intuitive
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expérience utilisateur</h3>
              <p className="text-sm text-gray-600">
                Conçu pour votre satisfaction
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PlaceholderPage;