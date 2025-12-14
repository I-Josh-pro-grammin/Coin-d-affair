import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, MoreVertical, Package, Truck, CheckCircle, XCircle } from 'lucide-react';

import {
    useGetAdminOrdersQuery
} from '@/redux/api/apiSlice';

export default function AdminOrders() {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: ordersData, isLoading } = useGetAdminOrdersQuery({
        status: statusFilter === 'all' ? undefined : statusFilter
    });

    const orders = ordersData?.orders || [];

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

    const filteredOrders = orders.filter((order: any) => {
        // Status is already filtered by backend if we pass it, but if we want client side search:
        const term = searchQuery.toLowerCase();
        const matchesSearch = !term ||
            order.order_id.toLowerCase().includes(term) ||
            (order.buyer_name || '').toLowerCase().includes(term) ||
            (order.seller_name || '').toLowerCase().includes(term);
        return matchesSearch;
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
                            {filteredOrders.map((order: any) => {
                                const statusKey = order.status as keyof typeof statusConfig;
                                const config = statusConfig[statusKey] || statusConfig.pending;
                                const StatusIcon = config.icon;
                                return (
                                    <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-900">#{order.order_id.substring(0, 8)}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.buyer_name || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <p className="font-medium text-gray-900">{order.seller_name || 'N/A'}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className="text-gray-700">{order.items?.[0]?.product_title || 'Produit'}</p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-700">{order.items?.length || 1}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-900">{order.total_amount} {order.currency}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-gray-600 text-sm">{new Date(order.created_at).toLocaleDateString()}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color
                                                }`}>
                                                <StatusIcon size={14} />
                                                {config.label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    to={`/admin/orders/${order.order_id}`}
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
