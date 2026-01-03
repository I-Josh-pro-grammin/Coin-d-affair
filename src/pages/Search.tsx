import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Loader from '@/components/common/Loader';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import { currencyFmt, resolveImageSource } from '@/lib/utils';
import { useGetListingsQuery, useGetCategoriesQuery } from '@/redux/api/apiSlice'

// Mock data for search results
const MOCK_PRODUCTS = [
    { id: 1, name: 'iPhone 13 Pro', price: 850000, image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=400', category: 'Électronique' },
    { id: 2, name: 'MacBook Air M1', price: 1200000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=400', category: 'Électronique' },
    { id: 3, name: 'Nike Air Max', price: 120000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', category: 'Mode' },
    { id: 4, name: 'Canapé Moderne', price: 450000, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400', category: 'Maison' },
    { id: 5, name: 'Samsung S21', price: 750000, image: 'https://images.unsplash.com/photo-1610945265078-38584e10a487?auto=format&fit=crop&q=80&w=400', category: 'Électronique' },
];

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const categoryParam = searchParams.get('category') || 'all';

    const [priceRange, setPriceRange] = useState([0, 2000000]);
    // Initialize local selectedCategory from URL param or default
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);

    // Sync selectedCategory with URL when URL changes explicitly (e.g. navigation)
    useEffect(() => {
        setSelectedCategory(categoryParam);
    }, [categoryParam]);

    // Update URL when local filter changes
    const handleCategoryChange = (val: string) => {
        setSelectedCategory(val);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (val === 'all') {
                newParams.delete('category');
            } else {
                newParams.set('category', val);
            }
            return newParams;
        });
    };

    const { data: categoriesData } = useGetCategoriesQuery();
    // Normalize categories to find IDs
    const rawCategories = categoriesData?.categories ?? categoriesData ?? [];
    const normalizedCategories = [
        { key: 'all', label: 'Toutes', value: 'all', id: undefined },
        ...rawCategories.map((c: any) => {
            const name = c?.name ?? c?.nameFr ?? c?.category_name ?? c?.title ?? String(c ?? '');
            const slug = c?.slug || c?.category_slug || (name || '').toLowerCase().replace(/\s+/g, '-');
            const id = c?.category_id ?? c?.id;
            return { key: id || slug, label: name, value: slug, id };
        }),
    ];

    // Find active category ID for API
    const activeCategory = normalizedCategories.find(c => c.value === selectedCategory);
    const activeCategoryId = activeCategory?.id;

    // Construct API Query Args
    const queryArgs = {
        limit: 100, // Increase limit to show more products
        search: query || undefined,
        categoryId: activeCategoryId,
        minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrice: priceRange[1] < 2000000 ? priceRange[1] : undefined,
    };

    const { data, isLoading: listingsLoading, isFetching } = useGetListingsQuery(queryArgs);
    const products = data?.listings || [];

    // We can still keep correct getId and other helpers
    const getId = (p: any, idx?: number) =>
        String(
            p?.listings_id ??
            p?.listing_id ??
            p?.id ??
            `idx-${idx}`
        );


    if (listingsLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Loader message="Recherche en cours..." />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6">
                                <Filter size={20} className="text-[#000435]" />
                                <h2 className="font-bold text-gray-900">Filtres</h2>
                            </div>

                            {/* Categories */}
                            <div className="mb-8">
                                <h3 className="font-medium text-gray-900 mb-3">Catégories</h3>
                                <div className="space-y-2">
                                    {normalizedCategories.map((cat, i) => (
                                        <label key={i} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.value}
                                                checked={selectedCategory === cat.value}
                                                onChange={() => handleCategoryChange(cat.value)}
                                                className="text-[#000435] focus:ring-[#000435]"
                                            />
                                            <span className="text-sm text-gray-600">{String(cat.label)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-3">Prix</h3>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="2000000"
                                        step="10000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full accent-[#000435]"
                                    />
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>{currencyFmt(priceRange[0])}</span>
                                        <span>{currencyFmt(priceRange[1])}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-bold text-gray-900">
                                {products.length} résultat{products.length !== 1 ? 's' : ''} {query ? `pour "${String(query)}"` : ''}
                            </h1>

                            <button className="flex items-center gap-2 text-gray-600 hover:text-[#000435] md:hidden">
                                <SlidersHorizontal size={20} />
                                Filtres
                            </button>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product: any, idx: number) => {
                                    const pid = product?.listings_id || getId(product, idx);
                                    const title = product?.title || product?.name || 'Produit';
                                    return (
                                        <Link key={pid} to={`/produit/${encodeURIComponent(pid)}`} className="group">
                                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                                                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                                    <img
                                                        src={resolveImageSource(product)}
                                                        alt={title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/placeholder.svg';
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-4">
                                                    <p className="text-xs text-gray-500 mb-1">{String(product?.category_name || product?.category || '')}</p>
                                                    <h3 className="font-semibold text-gray-900 mb-2 truncate">{title}</h3>
                                                    <p className="text-lg font-bold text-[#000435]">{currencyFmt(product?.price)}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                                <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
                                <h2 className="text-xl font-bold text-gray-900 mb-2">Aucun résultat trouvé</h2>
                                <p className="text-gray-600">Essayez de modifier vos termes de recherche ou vos filtres</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
