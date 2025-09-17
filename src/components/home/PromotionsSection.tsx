import { Star, TrendingUp } from "lucide-react";

const promotedAds = [
  {
    id: 1,
    title: "iPhone 14 Pro Max comme neuf",
    price: "899€",
    location: "Paris 15ème",
    image: "/api/placeholder/120/120"
  },
  {
    id: 2,
    title: "Appartement T3 vue mer",
    price: "450 000€",
    location: "Nice",
    image: "/api/placeholder/120/120"
  },
  {
    id: 3,
    title: "BMW Série 3 - 2020",
    price: "35 000€",
    location: "Lyon",
    image: "/api/placeholder/120/120"
  },
  {
    id: 4,
    title: "MacBook Pro M2",
    price: "1 890€",
    location: "Bordeaux",
    image: "/api/placeholder/120/120"
  }
];

export function PromotionsSection() {
  return (
    <section className="bg-gradient-subtle py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-2xl font-bold font-poppins text-gray-900">
              Annonces mises en avant
            </h2>
          </div>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotedAds.map((ad) => (
            <div
              key={ad.id}
              className="ad-card group"
            >
              <div className="relative">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                  Sponsorisé
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {ad.title}
                </h3>
                <p className="text-xl font-bold text-blue-600 mb-1">{ad.price}</p>
                <p className="text-sm text-gray-500">{ad.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}