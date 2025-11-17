import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Grid, List, MapPin, Clock, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetCategoriesQuery, useGetListingsQuery } from "@/redux/api/apiSlice";

const formatPrice = (value?: number, currency = "EUR") => {
  if (!value) return "Prix sur demande";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};

const CategoryListing = () => {
  const { category, subcategory } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const categories = categoriesData?.categories ?? [];

  const categoryEntity = useMemo(
    () => categories.find((cat: any) => cat.slug === category),
    [categories, category]
  );

  const subcategoryEntity = useMemo(
    () => categoryEntity?.subcategories?.find((sub: any) => sub.slug === subcategory),
    [categoryEntity, subcategory]
  );

  const sortMapping: Record<string, string | undefined> = {
    recent: undefined,
    "price-asc": "price_asc",
    "price-desc": "price_desc",
  };

  const queryArgs = useMemo(() => {
    const args: Record<string, any> = {
      limit: 24,
    };
    if (categoryEntity?.category_id) {
      args.categoryId = categoryEntity.category_id;
    }
    if (subcategoryEntity?.subcategory_id) {
      args.subcategoryId = subcategoryEntity.subcategory_id;
    }
    if (priceFilter.min) {
      args.minPrice = Number(priceFilter.min);
    }
    if (priceFilter.max) {
      args.maxPrice = Number(priceFilter.max);
    }
    if (sortMapping[sortBy]) {
      args.sortBy = sortMapping[sortBy];
    }
    return args;
  }, [categoryEntity, subcategoryEntity, priceFilter, sortBy]);

  const { data: listingsData, isLoading: listingsLoading, isError } = useGetListingsQuery(queryArgs, {
    skip: !categoryEntity,
  });

  const listings = listingsData?.listings ?? [];

  const categoryDisplayName = categoryEntity?.category_name || category;
  const subcategoryDisplayName = subcategoryEntity?.subcategory_name || subcategory?.replace('-', ' ');

  const breadcrumbs = [
    { name: 'Accueil', path: '/' },
    { name: categoryDisplayName, path: `/categorie/${category}` },
    subcategory ? { name: subcategoryDisplayName, path: `/categorie/${category}/${subcategory}` } : null,
  ].filter(Boolean) as { name: string | undefined; path: string }[];

  if (!categoriesLoading && !categoryEntity) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <CategoryNav />
        <main className="flex-1 flex items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Catégorie introuvable</h2>
            <p className="text-gray-600 mb-4">
              La catégorie que vous recherchez n'existe pas ou a été supprimée.
            </p>
            <Button asChild>
              <Link to="/">Retourner à l'accueil</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <div className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.path} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-blue-600 font-medium">{crumb.name}</span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2 capitalize">
            {subcategoryDisplayName
              ? `${subcategoryDisplayName} en ${categoryDisplayName}`
              : `Annonces pour ${categoryDisplayName}`}
          </h1>
          <p className="text-gray-600">
            {listings.length} annonce{listings.length > 1 ? 's' : ''} trouvée{listings.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <Input placeholder={`Rechercher dans ${categoryDisplayName?.toLowerCase()}...`} />
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  value={priceFilter.min}
                  onChange={(e) => setPriceFilter(prev => ({ ...prev, min: e.target.value }))}
                />
                <Input
                  placeholder="Max"
                  value={priceFilter.max}
                  onChange={(e) => setPriceFilter(prev => ({ ...prev, max: e.target.value }))}
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trier par
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Plus récent</SelectItem>
                  <SelectItem value="price-asc">Prix croissant</SelectItem>
                  <SelectItem value="price-desc">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affichage
              </label>
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 p-2 text-center transition-colors ${viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <Grid className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 p-2 text-center transition-colors ${viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  <List className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {listingsLoading && (
          <div className="text-center py-12 text-gray-500">Chargement des annonces...</div>
        )}

        {isError && (
          <div className="text-center py-12 text-red-500">Impossible de charger les annonces.</div>
        )}

        {!listingsLoading && !listings.length && !isError && (
          <div className="text-center py-12 text-gray-500">Aucune annonce trouvée.</div>
        )}

        {!listingsLoading && listings.length > 0 && (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {listings.map((item: any) => {
                  const createdAt = item.created_at ? new Date(item.created_at) : null;
                  return (
                    <div key={item.listings_id || item.listing_id} className="ad-card group">
                      <div className="relative">
                        <img
                          src={item.cover_image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-soft hover:bg-red-50 hover:shadow-card transition-all">
                          <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                        </button>
                        <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                          <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                            {item.business_name || 'Particulier'}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          <Link to={`/annonce/${item.listings_id || item.listing_id}`}>
                            {item.title}
                          </Link>
                        </h3>

                        <div className="text-xl font-bold text-blue-600 mb-2">
                          {formatPrice(Number(item.price), item.currency || "EUR")}
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {item.location || "Lieu non renseigné"}
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {createdAt ? createdAt.toLocaleDateString("fr-FR") : "Date inconnue"}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((item: any) => {
                  const createdAt = item.created_at ? new Date(item.created_at) : null;
                  return (
                    <div key={item.listings_id || item.listing_id} className="bg-white rounded-lg shadow-soft hover:shadow-card transition-all p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.cover_image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600">
                            <Link to={`/annonce/${item.listings_id || item.listing_id}`}>
                              {item.title}
                            </Link>
                          </h3>
                          <p className="text-xl font-bold text-blue-600 mb-1">
                            {formatPrice(Number(item.price), item.currency || "EUR")}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {item.location || "Lieu non renseigné"} •{" "}
                            {createdAt ? createdAt.toLocaleDateString("fr-FR") : "Date inconnue"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Button size="sm" variant="outline">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">{item.views || 0} vues</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="btn-secondary">
            Voir plus d'annonces
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryListing;