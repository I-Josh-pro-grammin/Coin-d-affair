import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Heart, Trash2, MessageCircle, Eye, MapPin, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "iPhone 14 Pro Max 256Go - État neuf",
      price: "899€",
      location: "Paris 15ème",
      category: "Électronique",
      subcategory: "Téléphones",
      image: "/api/placeholder/200/150",
      addedDate: "Il y a 2 jours",
      views: 156,
      seller: "Marie D."
    },
    {
      id: 2,
      title: "Appartement T3 avec balcon - Vue mer",
      price: "450 000€",
      location: "Nice",
      category: "Immobilier",
      subcategory: "Appartements",
      image: "/api/placeholder/200/150",
      addedDate: "Il y a 1 semaine",
      views: 234,
      seller: "Pierre M."
    },
    {
      id: 3,
      title: "BMW Série 3 320d - 2020",
      price: "35 000€",
      location: "Lyon",
      category: "Véhicules",
      subcategory: "Voitures",
      image: "/api/placeholder/200/150",
      addedDate: "Il y a 3 jours",
      views: 89,
      seller: "Sophie B."
    },
    {
      id: 4,
      title: "MacBook Pro M2 13 pouces comme neuf",
      price: "1 890€",
      location: "Bordeaux",
      category: "Électronique",
      subcategory: "Ordinateurs",
      image: "/api/placeholder/200/150",
      addedDate: "Il y a 5 jours",
      views: 67,
      seller: "Lucas T."
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const categories = ["Toutes", "Électronique", "Immobilier", "Véhicules", "Mode", "Famille"];

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  const filteredFavorites = selectedCategory === "Toutes" 
    ? favorites 
    : favorites.filter(fav => fav.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
            Mes favoris
          </h1>
          <p className="text-gray-600">
            {favorites.length} annonce{favorites.length > 1 ? 's' : ''} sauvegardée{favorites.length > 1 ? 's' : ''}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
              Aucun favori pour le moment
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Commencez à explorer nos annonces et ajoutez vos préférées à vos favoris en cliquant sur le cœur.
            </p>
            <Button className="btn-primary">
              Découvrir les annonces
            </Button>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Catégorie:</span>
                <div className="flex space-x-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {filteredFavorites.length} résultat{filteredFavorites.length > 1 ? 's' : ''}
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFavorites.map((favorite) => (
                <div key={favorite.id} className="ad-card group">
                  <div className="relative">
                    <img
                      src={favorite.image}
                      alt={favorite.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Action Buttons */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <button
                        onClick={() => removeFavorite(favorite.id)}
                        className="p-2 bg-white rounded-full shadow-soft hover:bg-red-50 hover:shadow-card transition-all group/remove"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current group-hover/remove:text-red-600" />
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {favorite.subcategory}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {favorite.title}
                    </h3>
                    
                    <p className="text-xl font-bold text-blue-600 mb-2">{favorite.price}</p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {favorite.location}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {favorite.addedDate}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {favorite.views} vues
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Par {favorite.seller}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center space-x-1 hover:bg-blue-50"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Contacter</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty filtered results */}
            {filteredFavorites.length === 0 && selectedCategory !== "Toutes" && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Aucun favori dans cette catégorie
                </h3>
                <p className="text-gray-600">
                  Essayez de sélectionner une autre catégorie ou explorez plus d'annonces.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;