import { useMemo } from "react";
import { Star, ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery, useGetListingsQuery } from "@/redux/api/apiSlice";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/common/ProductCard';
import Loader from '@/components/common/Loader';



const fallbackCategories = [
  { category_name: "Électronique", slug: "electronique" },
  { category_name: "Maison & Jardin", slug: "maison-jardin" },
  { category_name: "Véhicules", slug: "vehicules" },
  { category_name: "Mode & Beauté", slug: "mode-beaute" },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />;
        } else if (i === fullStars && hasHalfStar) {
          return (
            <div key={i} className="relative">
              <Star className="h-4 w-4 text-gray-300" />
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          );
        } else {
          return <Star key={i} className="h-4 w-4 text-gray-300" />;
        }
      })}
    </div>
  );
};

const formatPrice = (value?: number, currency = "EUR") => {
  if (!value) return "Prix sur demande";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};

export function ProductListingSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isAllProductsOpen, setIsAllProductsOpen] = useState(true);

  const { data: categoryData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const categories = categoryData?.categories || categoryData || fallbackCategories;

  const getCategorySlug = (category: any) =>
    category?.slug || category?.category_slug || (category?.name || category?.category_name || '').toString().toLowerCase().replace(/\s+/g, '-');

  const getCategoryId = (category: any) => category?.category_id ?? category?.id ?? category?.categoryId ?? undefined;

  const activeCategory = useMemo(
    () => categories.find((category: any) => getCategorySlug(category) === selectedCategory),
    [categories, selectedCategory]
  );

  const activeSubcategory = useMemo(
    () =>
      activeCategory?.subcategories?.find((subcategory: any) =>
        (subcategory?.slug || subcategory?.subcategory_slug || (subcategory?.name || subcategory?.subcategory_name || '').toString().toLowerCase().replace(/\s+/g, '-')) === selectedSubcategory
      ),
    [activeCategory, selectedSubcategory]
  );

  const queryArgs = useMemo(() => {
    const args: Record<string, any> = { limit: 9 };
    const catId = getCategoryId(activeCategory);
    if (catId) args.categoryId = catId;
    const subId = activeSubcategory?.subcategory_id ?? activeSubcategory?.id ?? activeSubcategory?.subcategoryId;
    if (subId) args.subcategoryId = subId;
    return args;
  }, [activeCategory, activeSubcategory]);

  const {
    data: listingsData,
    isLoading: listingsLoading,
    isFetching,
    isError,
  } = useGetListingsQuery(queryArgs);

  const listings = listingsData?.listings ?? [];

  const handleCategoryClick = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSubcategory(null);
  };

  const handleShowAll = () => {
    setSelectedCategory("all");
    setSelectedSubcategory(null);
    setIsAllProductsOpen(!isAllProductsOpen);
  };

  // Use public listings endpoint for homepage visibility (supports sortBy: price_asc, price_desc)
  const { data: trendingData, isLoading: isLoadingTrends, isError: errorLoadingTrends } = useGetListingsQuery({ limit: 6 });
  const { data: ratedData } = useGetListingsQuery({ limit: 6, sortBy: 'rating' });

  const trendingProducts = trendingData?.listings || [];
  const ratedProducts = ratedData?.listings || [];

  if (isLoadingTrends) {
    return <Loader />;
  }

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
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
                  {categories.map((category: any, idx: number) => {
                    const label = category?.name || category?.category_name;
                    const slug =
                      category?.slug || label?.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={idx}
                        onClick={() => handleCategoryClick(slug)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-full bg-white shadow-md transition-all duration-300 ${selectedCategory === slug
                          ? 'border-2 border-[#000435] bg-blue-50'
                          : 'hover:border-2 hover:border-[#000435] hover:shadow-lg hover:-translate-y-0.5'
                          }`}
                      >
                        <span className="font-medium text-gray-800">{label}</span>
                        {category.subcategories?.length && (
                          <span className="text-sm text-gray-500">
                            ({category.subcategories.length})
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Show filtered products if a category is selected */}
            {selectedCategory === 'all' && (
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
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                      {trendingProducts.map((product: any, idx: number) => (
                        <ProductCard key={idx} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl">
                      <p className="text-gray-500 text-lg">Aucun produit pour le moment</p>
                    </div>
                  )}
                </div>

                {/* Most Rated Section */}
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">Les Mieux Notés</h2>
                    <Link
                      to="/boutique?section=most_rated"
                      className="flex items-center gap-2 text-[#000435] font-medium hover:gap-3 transition-all"
                    >
                      Voir tout
                      <ChevronRight size={20} />
                    </Link>
                  </div>

                  {ratedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                      {ratedProducts.map((product: any) => (
                        <ProductCard key={product.listings_id} product={product} />
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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === "all"
                    ? "Dernières annonces"
                    : activeCategory?.category_name || "Sélection"}
                </h2>
                {activeSubcategory && (
                  <p className="text-gray-500 text-sm">
                    Sous-catégorie : {activeSubcategory.subcategory_name}
                  </p>
                )}
              </div>
              {(listingsLoading || isFetching) && (
                <div className="pl-2">
                  <Loader size={40} message="Chargement des produits..." />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {listings.map((listing: any) => (
                <ProductCard key={listing.listings_id || listing.listing_id} product={listing} />
              ))}

              {!listings.length && !listingsLoading && !isError && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie.</p>
                </div>
              )}

              {isError && (
                <div className="col-span-full text-center py-12">
                  <p className="text-red-500 text-lg">Impossible de charger les produits.</p>
                </div>
              )}
            </div>

            {/* Pagination placeholder */}
            <div className="flex justify-center items-center space-x-2 mt-12">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>

              <div className="flex space-x-1">
                <Button variant="outline" size="sm" className="bg-gray-100">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <span className="px-3 py-1 text-gray-500">...</span>
                <Button variant="outline" size="sm">8</Button>
                <Button variant="outline" size="sm">9</Button>
                <Button variant="outline" size="sm">10</Button>
              </div>

              <Button variant="outline" size="sm">
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

