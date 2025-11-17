import { useMemo, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery, useGetListingsQuery } from "@/redux/api/apiSlice";

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
  const categories = categoryData?.categories?.length ? categoryData.categories : fallbackCategories;

  const activeCategory = useMemo(
    () => categories.find((category: any) => category.slug === selectedCategory),
    [categories, selectedCategory]
  );
  const activeSubcategory = useMemo(
    () =>
      activeCategory?.subcategories?.find(
        (subcategory: any) => subcategory.slug === selectedSubcategory
      ),
    [activeCategory, selectedSubcategory]
  );

  const queryArgs = useMemo(() => {
    const args: Record<string, any> = { limit: 9 };
    if (activeCategory?.category_id) {
      args.categoryId = activeCategory.category_id;
    }
    if (activeSubcategory?.subcategory_id) {
      args.subcategoryId = activeSubcategory.subcategory_id;
    }
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

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Catégories</h3>

              {/* All Product Filter */}
              <div className="mb-6">
                <button
                  onClick={handleShowAll}
                  className="flex items-center gap-2 w-full p-3 hover:bg-gray-50 rounded-lg bg-gray-100 text-gray-900 transition-all duration-300"
                >
                  <span className="text-sm">{isAllProductsOpen ? '▼' : '▶'}</span>
                  <span className="font-medium">Tous les produits</span>
                </button>
              </div>

              {/* Category Buttons */}
              {isAllProductsOpen && (
                <div className="space-y-3 mb-8">
                  {categories.map((category: any) => {
                    const label = category.category_name || category.name;
                    const slug =
                      category.slug || label?.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <button
                        key={slug}
                        onClick={() => handleCategoryClick(slug)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-full bg-white shadow-md transition-all duration-300 ${selectedCategory === slug
                            ? 'border-2 border-[#000435] bg-blue-50'
                            : 'hover:border-2 hover:border-[#000435] hover:shadow-lg hover:-translate-y-0.5'
                          }`}
                      >
                        <span className="font-medium text-gray-800">{label}</span>
                        {category.subcategories?.length > 0 && (
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

          {/* Product Grid */}
          <div className="flex-1">
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
                <span className="text-sm text-gray-500">Chargement...</span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing: any) => {
                const priceLabel = formatPrice(listing.price, listing.currency || "EUR");
                const ratingValue = listing.rating || 4.5;
                return (
                  <div key={listing.listings_id || listing.listing_id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#000435]">
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                      <img
                        src={listing.cover_image || "/placeholder.svg"}
                        alt={listing.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                        {listing.category_name || "Annonces"}
                      </span>
                      <button className="absolute top-3 left-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                        <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#000435] transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {renderStars(Number(ratingValue))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {ratingValue.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({listing.reviews_count || "Nouveau"})
                        </span>
                      </div>
                      <div className="mb-4">
                        <p className="text-2xl font-bold text-[#000435]">{priceLabel}</p>
                        {listing.location && (
                          <p className="text-sm text-gray-500">{listing.location}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button className="w-full py-2.5 px-4 border-2 border-[#000435] text-[#000435] font-medium rounded-full hover:bg-[#000435]/5 transition-all duration-300 bg-transparent">
                          Ajouter au panier
                        </Button>
                        <Button className="w-full py-2.5 px-4 bg-[#000435] text-white font-medium rounded-full hover:bg-[#000435]/90 transition-all duration-300">
                          Acheter maintenant
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

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
