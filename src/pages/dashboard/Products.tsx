import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit,
    Trash2,
    Eye,
    Package,
    ShoppingCart,
    ChevronRight,
    Home
} from 'lucide-react';
import { useGetBusinessProductsQuery, useDeleteProductMutation } from '@/redux/api/apiSlice';
import { resolveImageSource } from '@/lib/utils';
import { RouteFallback } from '@/components/common/RouteFallback';
import { toast } from 'sonner';

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const { data, isLoading } = useGetBusinessProductsQuery({});
    const [deleteProduct] = useDeleteProductMutation();

    const products = data?.allProducts?.rows || [];

    const handleDelete = async (id: string) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await deleteProduct(id).unwrap();
                toast.success('Produit supprimé avec succès');
            } catch (error) {
                toast.error('Erreur lors de la suppression du produit');
            }
        }
    };

    if (isLoading) return <RouteFallback />;

    const filteredProducts = products?.filter((product: any) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-[#000435] flex items-center gap-1">
                    <Home size={14} />
                    Accueil
                </Link>
                <ChevronRight size={14} />
                <span className="text-gray-900 font-medium">Mon Compte</span>
                <ChevronRight size={14} />
                <span className="text-[#000435] font-bold">Mes Annonces</span>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#000435] mb-2">Mes Annonces</h1>
                    <p className="text-gray-600">{products.length} annonces en ligne</p>
                </div>
                <Link
                    to="/dashboard/products/new"
                    className="inline-flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    <Plus size={20} />
                    Déposer une annonce
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher dans mes annonces..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all outline-none"
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-[#000435] hover:text-[#000435] transition-all font-medium text-gray-700"
                    >
                        <Filter size={20} />
                        Filtrer
                    </button>
                </div>

                {/* Filter Options (shown when filterOpen is true) */}
                {filterOpen && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435]">
                                <option>Toutes les catégories</option>
                                <option>Électronique</option>
                                <option>Mode</option>
                                <option>Maison</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435]">
                                <option>Tous les statuts</option>
                                <option>Actif</option>
                                <option>Inactif</option>
                                <option>Rupture de stock</option>
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435]">
                                <option>Trier par: Plus récent</option>
                                <option>Prix: Croissant</option>
                                <option>Prix: Décroissant</option>
                                <option>Plus de ventes</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts?.map((product: any) => (
                    <div key={product.listings_id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-100">
                            {/* Placeholder image - replace with actual image */}
                            {product?.media ? (
                                <img src={resolveImageSource(product)} alt={product.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                    <Package size={40} />
                                </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${product.stock > 0 ? 'bg-white text-green-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {product.stock > 0 ? 'En ligne' : 'Indisponible'}
                                </span>
                            </div>

                            {/* Actions (show on hover) */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white rounded-full shadow-lg p-1.5 cursor-pointer hover:bg-gray-50">
                                    <MoreVertical size={16} className="text-gray-600" />
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex flex-col flex-grow">
                            <div className="mb-1">
                                <span className="text-[10px] uppercase tracking-wide font-semibold text-gray-500">
                                    Catégorie {product.category_id}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-1 text-base">{product.title}</h3>

                            <div className="mt-auto">
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-lg font-bold text-[#000435]">{product.price} {product.currency}</p>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                                        <Eye size={12} />
                                        {product.views || 0} vues
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-3 border-t border-gray-100">
                                    <Link
                                        to={`/dashboard/products/${product.listings_id}/edit`}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#000435] text-white rounded-full hover:bg-[#000435]/90 transition-all font-medium text-sm shadow-sm"
                                    >
                                        <Edit size={14} />
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product.listings_id)}
                                        className="p-2 border border-red-100 text-red-500 rounded-full hover:bg-red-50 hover:border-red-200 transition-all"
                                        title="Supprimer"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State (show when no products) */}
            {products.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun produit</h3>
                    <p className="text-gray-600 mb-6">Commencez par ajouter votre premier produit</p>
                    <Link
                        to="/dashboard/products/new"
                        className="inline-flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all"
                    >
                        <Plus size={20} />
                        Ajouter un produit
                    </Link>
                </div>
            )}
        </DashboardLayout>
    );
}
