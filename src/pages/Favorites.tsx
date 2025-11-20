import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { Heart } from "lucide-react";
import { trendingProducts } from "@/data/mockProducts"; // Using mock data for now

const Favorites = () => {
  // Simulate some favorite products
  const favoriteProducts = trendingProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes favoris</h1>
          <p className="text-gray-600 text-sm sm:text-base">Produits que vous avez ajoutés en favoris.</p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori</h3>
            <p className="text-gray-500 mb-6">Vous n'avez pas encore ajouté de produits à vos favoris.</p>
            <a href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-[#000435] hover:bg-[#000435]/90 transition-colors">
              Découvrir des produits
            </a>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;