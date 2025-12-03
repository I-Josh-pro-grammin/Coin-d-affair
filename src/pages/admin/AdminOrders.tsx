import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, MoreVertical, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

export default function AdminOrders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Mock orders data
    const orders = [
        {
            id: '#1234',
            customer: 'Jean Dupont',
            seller: 'Boutique Tech',
            product: 'iPhone 13 Pro',
            quantity: 1,
            amount: '850,000 RWF',
            status: 'pending',
            date: '2024-01-15',
            paymentStatus: 'paid'
        },
        {
            id: '#1233',
            customer: 'Marie Claire',
            seller: 'Maison Confort',
            product: 'MacBook Pro 14"',
            quantity: 1,
            amount: '1,500,000 RWF',
            status: 'shipped',
            date: '2024-01-14',
            paymentStatus: 'paid'
        },
        {
            id: '#1232',
            customer: 'Pierre Kalisa',
            seller: 'Auto Kigali',
            product: 'Samsung Galaxy S21',
            quantity: 2,
            amount: '1,300,000 RWF',
            status: 'delivered',
            date: '2024-01-13',
            paymentStatus: 'paid'
        },
        {
            id: '#1231',
            customer: 'Alice Mukamana',
            seller: 'Fashion Store',
            product: 'AirPods Pro',
            quantity: 1,
            amount: '250,000 RWF',
            status: 'cancelled',
            date: '2024-01-12',
            paymentStatus: 'refunded'
        },
    ];

    const statusConfig = {
        pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: Package },
        processing: { label: 'En préparation', color: 'bg-blue-100 text-blue-800', icon: Package },
        shipped: { label: 'Expédiée', color: 'bg-purple-100 text-purple-800', icon: Truck },
        delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800', icon: CheckCircle },
        cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: XCircle },
    };

    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        delivered: orders.filter(o => o.status === 'delivered').length,
        cancelled: orders.filter(o => o.status === 'cancelled').length,
    };

    const filteredOrders = orders.filter(order => {
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        const term = searchQuery.toLowerCase();
        const matchesSearch = !term ||
            order.id.toLowerCase().includes(term) ||
            order.customer.toLowerCase().includes(term) ||
            order.seller.toLowerCase().includes(term);
        return matchesStatus && matchesSearch;
    });

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Commandes</h1>
                <p className="text-gray-600">{orders.length} commandes au total</p>
            </div>

            {/* Status Tabs */}
            <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                    {[
                        { key: 'all', label: 'Toutes', icon: Package },
                        { key: 'pending', label: 'En attente', icon: Package },
                        { key: 'processing', label: 'En préparation', icon: Package },
                        { key: 'shipped', label: 'Expédiées', icon: Truck },
                        { key: 'delivered', label: 'Livrées', icon: CheckCircle },
                        { key: 'cancelled', label: 'Annulées', icon: XCircle },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setStatusFilter(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${statusFilter === tab.key
                                    ? 'bg-[#000435] text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                                <span className={`px-2 py-0.5 rounded-full text-xs ${statusFilter === tab.key
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    {statusCounts[tab.key as keyof typeof statusCounts]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher par N° commande, client ou vendeur..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Date Filter */}
                    <select className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all">
                        <option>Toutes les dates</option>
                        <option>Aujourd'hui</option>
                        <option>7 derniers jours</option>
                        <option>30 derniers jours</option>
                        <option>Ce mois-ci</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Commande</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Client</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Vendeur</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Produit</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Qté</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Montant</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Date</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.map((order) => {
                                const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon;
                                return (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-900">{order.id}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.customer}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.seller}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-gray-700">{order.product}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-700">{order.quantity}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-900">{order.amount}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-600 text-sm">{order.date}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${statusConfig[order.status as keyof typeof statusConfig].color
                                                }`}>
                                                <StatusIcon size={14} />
                                                {statusConfig[order.status as keyof typeof statusConfig].label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/admin/orders/${order.id.replace('#', '')}`}
                                                    className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <button className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Affichage de 1 à {filteredOrders.length} sur {orders.length} commandes
                    </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>
                            Précédent
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                    <Package size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune commande trouvée</h3>
                    <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
                </div>
            )}
        </AdminLayout>
    );
}
