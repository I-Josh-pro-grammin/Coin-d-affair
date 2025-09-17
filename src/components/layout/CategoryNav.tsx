import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Immobilier",
    subcategories: ["Appartements", "Maisons", "Terrains", "Bureaux & Commerces"]
  },
  {
    name: "Véhicules",
    subcategories: ["Voitures", "Motos", "Véhicules utilitaires", "Pièces & Accessoires"]
  },
  {
    name: "Électronique",
    subcategories: ["Ordinateurs", "Téléphones", "Tablettes", "Télévisions & Audio"]
  },
  {
    name: "Emploi",
    subcategories: ["Offres d'emploi", "Demandes d'emploi", "Services"]
  },
  {
    name: "Famille",
    subcategories: ["Jeux & Jouets", "Puériculture", "Articles scolaires"]
  },
  {
    name: "Mode",
    subcategories: ["Vêtements", "Chaussures", "Accessoires", "Montres & Bijoux"]
  },
  {
    name: "Autres",
    subcategories: ["Divers", "Collections", "Animaux"]
  }
];

export function CategoryNav() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <nav className="bg-gradient-subtle border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex space-x-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="nav-link flex items-center group">
                  {category.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                {hoveredCategory === category.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-card border border-gray-100 py-2 z-50">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        to={`/categorie/${category.name.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}