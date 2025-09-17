import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Filter, Grid, List, SlidersHorizontal, MapPin, Clock, Heart, MessageCircle, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CategoryListing = () => {
  const { category, subcategory } = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });

  // Mock data for listings
  const mockListings = useMemo(() => {
    const getListingsForCategory = () => {
      if (category === 'véhicules' && subcategory === 'voitures') {
        return Array.from({ length: 24 }, (_, i) => ({
          id: i + 1,
          title: [
            "BMW Série 3 320d - Excellent état",
            "Renault Clio 5 - Comme neuve", 
            "Peugeot 308 SW - 7 places",
            "Audi A4 Avant - Toutes options",
            "Mercedes Classe C - Cuir beige",
            "Volkswagen Golf GTI - Sportive",
            "Toyota Yaris Cross - Hybride",
            "Citroën C3 Aircross - Récente"
          ][i % 8] + ` - ${2015 + Math.floor(Math.random() * 8)}`,
          price: `${Math.floor(Math.random() * 40000) + 5000}€`,
          year: 2015 + Math.floor(Math.random() * 8),
          mileage: `${Math.floor(Math.random() * 200) + 20} 000 km`,
          fuel: ['Diesel', 'Essence', 'Hybride', 'Électrique'][Math.floor(Math.random() * 4)],
          location: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Bordeaux', 'Lille'][Math.floor(Math.random() * 7)],
          time: `Il y a ${Math.floor(Math.random() * 7) + 1} jour${Math.floor(Math.random() * 7) + 1 > 1 ? 's' : ''}`,
          image: `/api/placeholder/300/200?car=${i}`,
          seller: ['Particulier', 'Professionnel'][Math.floor(Math.random() * 2)],
          views: Math.floor(Math.random() * 300) + 20
        }));
      }
      
      // Default listings for other categories
      return Array.from({ length: 18 }, (_, i) => ({
        id: i + 1,
        title: `Article ${i + 1} - ${subcategory?.replace('-', ' ')}`,
        price: `${Math.floor(Math.random() * 1000) + 50}€`,
        year: undefined,
        mileage: undefined,
        fuel: undefined,
        location: ['Paris', 'Lyon', 'Marseille', 'Toulouse'][Math.floor(Math.random() * 4)],
        time: `Il y a ${Math.floor(Math.random() * 7) + 1} jour${Math.floor(Math.random() * 7) + 1 > 1 ? 's' : ''}`,
        image: `/api/placeholder/300/200?item=${i}`,
        seller: 'Particulier',
        views: Math.floor(Math.random() * 200) + 10
      }));
    };

    return getListingsForCategory();
  }, [category, subcategory]);

  const categoryDisplayName = category?.charAt(0).toUpperCase() + category?.slice(1);
  const subcategoryDisplayName = subcategory?.replace('-', ' ').split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const breadcrumbs = [
    { name: 'Accueil', path: '/' },
    { name: categoryDisplayName, path: `/categorie/${category}` },
    { name: subcategoryDisplayName, path: `/categorie/${category}/${subcategory}` }
  ];

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
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
            {subcategoryDisplayName} en {categoryDisplayName}
          </h1>
          <p className="text-gray-600">
            {mockListings.length} annonce{mockListings.length > 1 ? 's' : ''} trouvée{mockListings.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Search */}
            <div className="md:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher
              </label>
              <Input placeholder={`Rechercher dans ${subcategoryDisplayName?.toLowerCase()}...`} />
            </div>

            {/* Price Range */}
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

            {/* Sort */}
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
                  <SelectItem value="views">Plus vues</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* View Toggle */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Affichage
              </label>
              <div className="flex border border-gray-200 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 p-2 text-center transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex-1 p-2 text-center transition-colors ${
                    viewMode === 'list' 
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

        {/* Listings */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockListings.map((item) => (
              <div key={item.id} className="ad-card group">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-soft hover:bg-red-50 hover:shadow-card transition-all">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <div className="absolute bottom-2 left-2 flex items-center space-x-1">
                    <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {'seller' in item ? item.seller : 'Particulier'}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center text-xl font-bold text-blue-600 mb-2">
                    <Euro className="h-4 w-4 mr-1" />
                    {item.price}
                  </div>

                  {item.year && item.mileage && item.fuel && (
                    <div className="text-sm text-gray-600 mb-2">
                      {item.year} • {item.mileage} • {item.fuel}
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.location}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.time}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{item.views} vues</span>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {mockListings.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-soft hover:shadow-card transition-all p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                      {item.title}
                    </h3>
                    <p className="text-xl font-bold text-blue-600 mb-1">{item.price}</p>
                    {item.year && item.mileage && item.fuel && (
                      <p className="text-sm text-gray-600 mb-1">
                        {item.year} • {item.mileage} • {item.fuel}
                      </p>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {item.location} • {item.time}
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
                    <p className="text-sm text-gray-500">{item.views} vues</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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