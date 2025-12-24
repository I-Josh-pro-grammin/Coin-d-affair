import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Loader from '@/components/common/Loader';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import { currencyFmt } from '@/lib/utils';
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
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [results, setResults] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2000000]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { data, isLoading: listingsLoading } = useGetListingsQuery();
    const { data: categories } = useGetCategoriesQuery();
    const products = data?.listings || [];

    const getId = (p: any, idx?: number) =>
        String(
            p?.listings_id ??
            p?.listing_id ??
            p?.id ??
            p?.uuid ??
            p?.slug ??
            p?.external_id ??
            `no-id-${idx ?? 'unknown'}`
        );

    // Normalize categories into { key, label, value } where value is a slug string
    const rawCategories = categories?.categories ?? categories ?? [];
    const normalizedCategories = [
        { key: 'all', label: 'Toutes', value: 'all' },
        ...rawCategories.map((c: any, idx: number) => {
            const name = c?.name ?? c?.nameFr ?? c?.category_name ?? c?.title ?? String(c ?? '');
            const slug =
                c?.slug || c?.category_slug || (name || '').toLowerCase().replace(/\s+/g, '-');
            const key = c?.id ?? c?.category_id ?? slug ?? `cat-${idx}`;
            return { key, label: name, value: slug };
        }),
    ];

    const productTitle = (p: any) => (p?.title || p?.name || '').toString();
    const productCategorySlug = (p: any) =>
        p?.category_slug || p?.slug || (p?.category_name || p?.category || '').toString().toLowerCase().replace(/\s+/g, '-');

    // Avoid updating results on every render with a new array reference — only update when contents change
    useEffect(() => {
        if (!products || products.length === 0) {
            // Only clear if results currently non-empty to avoid ping-pong
            setResults((prev) => (prev.length ? [] : prev));
            return;
        }

        const filtered = products.filter((p: any) => {
            const title = productTitle(p).toLowerCase();
            const matchesQuery = query ? title.includes(query.toLowerCase()) : true;
            const prodSlug = productCategorySlug(p);
            const matchesCategory = selectedCategory === 'all' || prodSlug === selectedCategory;
            const price = Number(p?.price ?? p?.amount ?? 0);
            const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
            return matchesQuery && matchesCategory && matchesPrice;
        });

        // shallow compare by id and length (use index-aware stable ids)
        setResults((prev) => {
            if (
                prev.length === filtered.length &&
                prev.every((it: any, i: number) => getId(it, i) === getId(filtered[i], i))
            ) {
                return prev; // no change
            }
            return filtered;
        });
    }, [products, query, selectedCategory, priceRange]);


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
                                    {normalizedCategories.map((cat) => (
                                        <label key={cat.key} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat.value}
                                                checked={selectedCategory === cat.value}
                                                onChange={(e) => setSelectedCategory(e.target.value)}
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
                                {results.length} résultat{results.length !== 1 ? 's' : ''} pour "{String(query)}"
                            </h1>

                            <button className="flex items-center gap-2 text-gray-600 hover:text-[#000435] md:hidden">
                                <SlidersHorizontal size={20} />
                                Filtres
                            </button>
                        </div>

                        {results?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {results?.map((product, idx) => {
                                    const pid = getId(product, idx) || `idx-${idx}`;
                                    const title = product?.title || product?.name || 'Produit';
                                    return (
                                        <Link key={String(pid)} to={`/produit/${encodeURIComponent(pid)}`} className="group">
                                            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
                                                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                                    <img
                                                        src={product?.media?.[0]?.url || product.image || 'https://via.placeholder.com/400'}
                                                        alt={title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
