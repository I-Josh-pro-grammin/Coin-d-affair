import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Plus, Eye, MessageCircle, Heart, TrendingUp, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock user data
  const userStats = {
    activeAds: 5,
    totalViews: 1247,
    messages: 12,
    favorites: 8
  };

  const recentAds = [
    {
      id: 1,
      title: "iPhone 14 Pro Max 256Go",
      price: "899€",
      views: 156,
      messages: 8,
      status: "Actif",
      publishedDate: "Il y a 3 jours",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "MacBook Pro M2 13 pouces",
      price: "1890€",
      views: 89,
      messages: 3,
      status: "Actif",
      publishedDate: "Il y a 1 semaine",
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Bienvenue sur votre espace personnel, gérez vos annonces et suivez votre activité
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/deposer-annonce" className="card-elevated p-6 text-center group hover:bg-blue-50">
            <div className="bg-blue-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Déposer une annonce</h3>
            <p className="text-sm text-gray-600">Créez une nouvelle annonce rapidement</p>
          </Link>

          <Link to="/mes-annonces" className="card-elevated p-6 text-center group hover:bg-green-50">
            <div className="bg-green-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Eye className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mes annonces</h3>
            <p className="text-sm text-gray-600">{userStats.activeAds} annonces actives</p>
          </Link>

          <Link to="/messages" className="card-elevated p-6 text-center group hover:bg-purple-50">
            <div className="bg-purple-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
              <MessageCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Messages</h3>
            <p className="text-sm text-gray-600">{userStats.messages} conversations</p>
          </Link>

          <Link to="/favoris" className="card-elevated p-6 text-center group hover:bg-red-50">
            <div className="bg-red-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Favoris</h3>
            <p className="text-sm text-gray-600">{userStats.favorites} annonces sauvées</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Ads */}
          <div className="lg:col-span-2">
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-poppins text-gray-900">
                  Mes annonces récentes
                </h2>
                <Link to="/mes-annonces">
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {recentAds.map((ad) => (
                  <div key={ad.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <img
                      src={ad.image}
                      alt={ad.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{ad.title}</h3>
                      <p className="text-lg font-bold text-blue-600 mb-2">{ad.price}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {ad.views} vues
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {ad.messages} messages
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {ad.publishedDate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        {ad.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Activity */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="card-elevated p-6">
              <h2 className="text-xl font-bold font-poppins text-gray-900 mb-4">
                Statistiques
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Vues totales</span>
                  <span className="font-bold text-blue-600">{userStats.totalViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Annonces actives</span>
                  <span className="font-bold text-green-600">{userStats.activeAds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Messages reçus</span>
                  <span className="font-bold text-purple-600">{userStats.messages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Favoris</span>
                  <span className="font-bold text-red-600">{userStats.favorites}</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="card-elevated p-6">
              <h2 className="text-xl font-bold font-poppins text-gray-900 mb-4">
                Conseils pour vendre
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Photos de qualité</h4>
                    <p className="text-sm text-gray-600">Ajoutez plusieurs photos nettes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Localisation précise</h4>
                    <p className="text-sm text-gray-600">Indiquez votre ville pour plus de visibilité</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Prix attractif</h4>
                    <p className="text-sm text-gray-600">Consultez les prix similaires</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;