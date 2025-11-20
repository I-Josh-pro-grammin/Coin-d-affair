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
    Copy,
    Package,
    ShoppingCart
} from 'lucide-react';

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    // Mock products data
    const products = [
        {
            id: 1,
            name: 'iPhone 13 Pro',
            image: '/placeholder.jpg',
            category: 'Électronique',
            price: '850,000 RWF',
            stock: 15,
            status: 'Actif',
            views: 234,
            sales: 12
        },
        {
            id: 2,
            name: 'Samsung Galaxy S21',
            image: '/placeholder.jpg',
            category: 'Électronique',
            price: '650,000 RWF',
            stock: 0,
            status: 'Rupture',
            views: 189,
            sales: 8
        },
        {
            id: 3,
            name: 'MacBook Pro 14"',
            image: '/placeholder.jpg',
            category: 'Électronique',
            price: '1,500,000 RWF',
            stock: 5,
            status: 'Actif',
            views: 456,
            sales: 3
        },
    ];

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Produits</h1>
                    <p className="text-gray-600">{products.length} produits au total</p>
                </div>
                <Link
                    to="/dashboard/products/new"
                    className="inline-flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg"
                >
                    <Plus size={20} />
                    Ajouter un produit
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-[#000435] hover:text-[#000435] transition-all font-medium"
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
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                        {/* Product Image */}
                        <div className="relative aspect-square bg-gray-200">
                            {/* Placeholder image - replace with actual image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <Package size={48} />
                            </div>

                            {/* Status Badge */}
                            <div className="absolute top-3 left-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === 'Actif' ? 'bg-green-100 text-green-800' :
                                    product.status === 'Rupture' ? 'bg-red-100 text-red-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {product.status}
                                </span>
                            </div>

                            {/* Actions (show on hover) */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white rounded-lg shadow-lg p-1">
                                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <div className="mb-2">
                                <span className="text-xs text-gray-500">{product.category}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-lg font-bold text-[#000435]">{product.price}</p>
                                <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1">
                                    <Eye size={14} />
                                    {product.views}
                                </div>
                                <div className="flex items-center gap-1">
                                    <ShoppingCart size={14} />
                                    {product.sales} ventes
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <Link
                                    to={`/dashboard/products/${product.id}/edit`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#000435] text-[#000435] rounded-full hover:bg-[#000435] hover:text-white transition-all font-medium text-sm"
                                >
                                    <Edit size={16} />
                                    Modifier
                                </Link>
                                <button className="p-2 border-2 border-red-200 text-red-600 rounded-full hover:bg-red-50 transition-all">
                                    <Trash2 size={16} />
                                </button>
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
