import React from 'react';
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { Heart } from "lucide-react";
import { useGetFavoritesQuery, useGetListingsQuery } from '@/redux/api/apiSlice';
import { useAuth } from '@/contexts/AuthContext';
import { getLocalFavorites } from '@/lib/localFavorites';
import Loader from '@/components/common/Loader';

const Favorites = () => {
  const { data: favData, isLoading: favLoading } = useGetFavoritesQuery();
  const { data: listingsData, isLoading: listingsLoading } = useGetListingsQuery();
  const { user } = useAuth();
  const favoriteProducts = (user ? (favData?.listings || []) : null) ;

  // If guest, derive favorite products from localStorage
  const [guestFavorites, setGuestFavorites] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (user) return;
    const favIds = getLocalFavorites();
    // If listings were loaded from server, map ids to product objects
    const allListings = (listingsData?.listings || []);
    const matches = allListings.filter((p: any) => {
      const pid = String(p?.listings_id || p?.id || p?.external_id || '');
      return favIds.includes(pid);
    });
    setGuestFavorites(matches);
  }, [user, listingsData]);

  if (favLoading || listingsLoading) {
    return (<div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-600">Chargement de vos favoris...</p>
        </div>
        <Loader />
      </main>
      <Footer />
    </div>);
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mes favoris</h1>
          <p className="text-gray-600 text-sm sm:text-base">Produits que vous avez ajoutés en favoris.</p>
        </div>

        {(user ? (favoriteProducts?.length || 0) : guestFavorites.length) > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {(user ? (favoriteProducts || []) : guestFavorites).map((product) => (
              <ProductCard key={product.id || product.listings_id} product={product} />
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