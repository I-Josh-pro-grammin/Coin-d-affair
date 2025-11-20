import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import { trendingProducts, latestProducts, recentSearchProducts, allProducts } from '@/data/mockProducts';

const categories = [
  { name: "Électronique", count: 245 },
  { name: "Maison & Jardin", count: 189 },
  { name: "Véhicules", count: 156 },
  { name: "Mode & Beauté", count: 312 },
  { name: "Sports & Loisirs", count: 178 },
  { name: "Livres & Médias", count: 203 },
  { name: "Jouets & Enfants", count: 167 },
  { name: "Services", count: 94 }
];

export function ProductListingSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  // Category mapping between French display names and product category values
  const categoryMapping: { [key: string]: string } = {
    'Électronique': 'Électronique',
    'Maison & Jardin': 'Home',
    'Véhicules': 'Other',
    'Mode & Beauté': 'Other',
    'Sports & Loisirs': 'Other',
    'Livres & Médias': 'Other',
    'Jouets & Enfants': 'Other',
    'Services': 'Other'
  };

  // Filter products when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(allProducts);
    } else {
      const mappedCategory = categoryMapping[selectedCategory] || selectedCategory;
      setFilteredProducts(allProducts.filter(product =>
        product.category.toLowerCase() === mappedCategory.toLowerCase()
      ));
    }
  }, [selectedCategory]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Catégories</h3>

              {/* All Products Filter */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    setIsAllProductsOpen(!isAllProductsOpen);
                    setSelectedCategory('all');
                  }}
                  className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 rounded-lg bg-gray-100 text-gray-900 transition-all duration-300"
                >
                  {isAllProductsOpen ? (
                    <ChevronDown size={16} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-600" />
                  )}
                  <span className="font-medium">Tous les produits</span>
                </button>
              </div>

              {/* Category Buttons */}
              {isAllProductsOpen && (
                <div className="space-y-3 mb-8">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-full bg-white shadow-md transition-all duration-300 ${selectedCategory === category.name
                          ? 'border-2 border-[#000435] bg-blue-50'
                          : 'hover:border-2 hover:border-[#000435] hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                    >
                      <span className="font-medium text-gray-800">{category.name}</span>
                      <span className="text-sm text-gray-500">({category.count})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Show filtered products if a category is selected */}
            {selectedCategory !== 'all' ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedCategory}</h2>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="text-[#000435] font-medium hover:underline"
                  >
                    Voir tous les produits
                  </button>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Show curated sections when "all" is selected */
              <>
                {/* Tendances Section */}
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Tendances</h2>
                    <Link
                      to="/boutique?section=tendances"
                      className="flex items-center gap-2 text-[#000435] font-medium hover:gap-3 transition-all"
                    >
                      Voir tout
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {trendingProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {trendingProducts.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <p className="text-gray-500 text-lg">Aucun produit pour le moment</p>
                    </div>
                  )}
                </div>

                {/* Dernières sur CoinD'affaires Section */}
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Dernières sur CoinD'affaires</h2>
                    <Link
                      to="/boutique?section=dernieres"
                      className="flex items-center gap-2 text-[#000435] font-medium hover:gap-3 transition-all"
                    >
                      Voir tout
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {latestProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {latestProducts.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <p className="text-gray-500 text-lg">Aucun produit pour le moment</p>
                    </div>
                  )}
                </div>

                {/* Recherches récentes Section */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Recherches récentes</h2>
                    <Link
                      to="/boutique?section=recherches"
                      className="flex items-center gap-2 text-[#000435] font-medium hover:gap-3 transition-all"
                    >
                      Voir tout
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {recentSearchProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {recentSearchProducts.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <p className="text-gray-500 text-lg">Aucun produit pour le moment</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
