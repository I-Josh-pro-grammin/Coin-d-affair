import { Home, Car, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import immobilierHero from "@/assets/immobilier-hero.jpg";
import vehiculesHero from "@/assets/vehicules-hero.jpg";
import electroniqueHero from "@/assets/electronique-hero.jpg";

const topCategories = [
  {
    name: "Immobilier",
    description: "Trouvez votre prochain chez-vous",
    icon: Home,
    count: "15 420 annonces",
    gradient: "from-blue-500 to-blue-600",
    image: immobilierHero
  },
  {
    name: "Véhicules", 
    description: "Voitures, motos et plus encore",
    icon: Car,
    count: "8 750 annonces",
    gradient: "from-green-500 to-green-600",
    image: vehiculesHero
  },
  {
    name: "Électronique",
    description: "High-tech et multimédia",
    icon: Smartphone,
    count: "12 300 annonces",
    gradient: "from-purple-500 to-purple-600",
    image: electroniqueHero
  }
];

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white animated-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-4">
            Nos catégories les plus populaires
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explorez nos principales catégories et découvrez des milliers d'annonces dans chaque domaine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topCategories.map((category, index) => (
            <Link
              key={category.name}
              to={`/categorie/${category.name.toLowerCase()}`}
              className="relative overflow-hidden rounded-xl h-64 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-card group float-in shine-overlay"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              
              {/* Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-80 group-hover:opacity-70 transition-opacity`}></div>
              
              <div className="relative p-8 text-center h-full flex flex-col justify-center text-white">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-full mb-6 group-hover:scale-110 transition-transform mx-auto">
                  <category.icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-2xl font-bold font-poppins mb-2 group-hover:scale-105 transition-transform">
                  {category.name}
                </h3>
                <p className="mb-4 opacity-90">{category.description}</p>
                <p className="text-sm font-medium bg-white bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}