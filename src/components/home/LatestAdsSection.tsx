import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Euro } from "lucide-react";

// Mock data for latest ads
const mockAds = Array.from({ length: 42 }, (_, i) => ({
  id: i + 1,
  title: [
    "iPhone 14 Pro Max",
    "Appartement T3",
    "BMW Série 3",
    "MacBook Pro M2",
    "Vélo électrique",
    "Canapé d'angle",
    "Télévision Samsung",
    "Montre connectée",
    "Cuisine équipée",
    "Scooter Yamaha",
    "Table en bois",
    "Ordinateur gaming",
    "Robe de soirée",
    "Appareil photo",
    "Poussette bébé"
  ][i % 15],
  price: `${Math.floor(Math.random() * 5000) + 50}€`,
  location: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice", "Bordeaux", "Lille", "Strasbourg"][Math.floor(Math.random() * 8)],
  category: ["Électronique", "Immobilier", "Véhicules", "Mode", "Famille"][Math.floor(Math.random() * 5)],
  time: `${Math.floor(Math.random() * 24)}h`,
  image: `/api/placeholder/200/150?${i}`
}));

export function LatestAdsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerPage = 30; // 5 columns × 6 rows (7 columns total, 2 hidden)
  const totalSlides = Math.ceil(mockAds.length / itemsPerPage);

  const getCurrentAds = () => {
    const startIndex = currentSlide * itemsPerPage;
    return mockAds.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
              Actuellement sur CoinD'affaires
            </h2>
            <p className="text-gray-600">
              Découvrez les dernières annonces publiées par nos utilisateurs
            </p>
          </div>

          {/* Slideshow controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-500 px-3">
              {currentSlide + 1} / {totalSlides}
            </span>
            <button
              onClick={nextSlide}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 disabled:opacity-50"
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Ads Grid - 5 visible columns from 7 total (2 hidden, shown via slideshow) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4" style={{ gridTemplateRows: 'repeat(6, 1fr)' }}>
          {getCurrentAds().map((ad) => (
            <div key={ad.id} className="ad-card group">
              <div className="relative">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                  {ad.category}
                </div>
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {ad.time}
                </div>
              </div>
              
              <div className="p-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {ad.title}
                </h3>
                
                <div className="flex items-center text-lg font-bold text-blue-600 mb-1">
                  <Euro className="h-4 w-4 mr-1" />
                  {ad.price}
                </div>
                
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  {ad.location}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                currentSlide === index
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-blue-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}