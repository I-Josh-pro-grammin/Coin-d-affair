import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Search, Filter, Eye, EyeOff, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';

interface AdminProduct {
    id: number;
    name: string;
    seller: string;
    category: string;
    price: string;
    status: 'pending' | 'approved' | 'rejected' | 'hidden';
    createdAt: string;
}

export default function AdminProducts() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | AdminProduct['status']>('all');

    const [products, setProducts] = useState<AdminProduct[]>([
        {
            id: 1,
            name: 'iPhone 13 Pro 256GB',
            seller: 'Boutique Tech',
            category: 'Électronique',
            price: '850,000 RWF',
            status: 'pending',
            createdAt: '2024-01-15',
        },
        {
            id: 2,
            name: 'Canapé 3 places',
            seller: 'Maison Confort',
            category: 'Maison & Jardin',
            price: '350,000 RWF',
            status: 'approved',
            createdAt: '2024-01-14',
        },
        {
            id: 3,
            name: 'Toyota Corolla 2012',
            seller: 'Auto Kigali',
            category: 'Véhicules',
            price: '5,500,000 RWF',
            status: 'hidden',
            createdAt: '2024-01-10',
        },
    ]);

    const updateStatus = (id: number, status: AdminProduct['status']) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    };

    const filtered = products.filter((p) => {
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        const term = search.toLowerCase();
        const matchesSearch =
            !term ||
            p.name.toLowerCase().includes(term) ||
            p.seller.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term);
        return matchesStatus && matchesSearch;
    });

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Produits</h1>
                    <p className="text-gray-600">Modérez tous les produits de la plateforme</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher par produit, vendeur ou catégorie..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {[
                            { key: 'all', label: 'Tous' },
                            { key: 'pending', label: 'En attente' },
                            { key: 'approved', label: 'Approuvés' },
                            { key: 'rejected', label: 'Rejetés' },
                            { key: 'hidden', label: 'Masqués' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setStatusFilter(tab.key as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${statusFilter === tab.key
                                        ? 'bg-[#000435] text-white border-[#000435]'
                                        : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produit</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Vendeur</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Catégorie</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Prix</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Créé le</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="font-semibold text-gray-900">{p.name}</p>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{p.seller}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{p.category}</td>
                                    <td className="py-4 px-6 font-semibold text-gray-900">{p.price}</td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${p.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : p.status === 'approved'
                                                        ? 'bg-green-100 text-green-800'
                                                        : p.status === 'rejected'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                }`}
                                        >
                                            {p.status === 'pending' && 'En attente'}
                                            {p.status === 'approved' && 'Approuvé'}
                                            {p.status === 'rejected' && 'Rejeté'}
                                            {p.status === 'hidden' && 'Masqué'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{p.createdAt}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors" title="Voir">
                                                <Eye size={18} />
                                            </button>
                                            {p.status !== 'approved' && (
                                                <button
                                                    onClick={() => updateStatus(p.id, 'approved')}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Approuver"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                            )}
                                            {p.status !== 'rejected' && (
                                                <button
                                                    onClick={() => updateStatus(p.id, 'rejected')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Rejeter"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                            {p.status !== 'hidden' ? (
                                                <button
                                                    onClick={() => updateStatus(p.id, 'hidden')}
                                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Masquer"
                                                >
                                                    <EyeOff size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => updateStatus(p.id, 'approved')}
                                                    className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Rendre visible"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-10 text-center text-gray-500 text-sm">
                                        Aucun produit ne correspond à votre recherche ou filtre.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
