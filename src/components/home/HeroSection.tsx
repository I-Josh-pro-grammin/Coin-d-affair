import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="bg-gradient-primary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold font-poppins mb-6 leading-tight">
          Bienvenue sur <span className="text-yellow-300">CoinD'affaires</span>
        </h1>
        <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
          Découvrez des milliers d'annonces près de chez vous. Achetez, vendez, trouvez tout ce dont vous avez besoin !
        </p>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-6 shadow-hover max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-6">
              <label className="block text-left text-gray-700 font-medium mb-2">
                Que recherchez-vous ?
              </label>
              <Input
                type="text"
                placeholder="Ex: iPhone, voiture, appartement..."
                className="search-input"
              />
            </div>
            <div className="md:col-span-4">
              <label className="block text-left text-gray-700 font-medium mb-2">
                Où ?
              </label>
              <Input
                type="text"
                placeholder="Ville, département..."
                className="search-input"
              />
            </div>
            <div className="md:col-span-2">
              <Button className="btn-primary w-full">
                <Search className="h-4 w-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/deposer-annonce">
          <Button className="btn-secondary text-blue-600 border-white hover:bg-white">
            <Plus className="h-5 w-5 mr-2" />
            Déposer une annonce gratuitement
          </Button>
        </Link>
      </div>
    </section>
  );
}