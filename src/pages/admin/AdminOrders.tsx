import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Search, Filter, Eye, Hash, Calendar, DollarSign, Package, MoreVertical, Check, X, Truck } from 'lucide-react';
import { useGetAdminOrdersQuery, useUpdateAdminOrderStatusMutation } from '@/redux/api/apiSlice';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader } from '@/components/common/Loader';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetAdminOrderDetailsQuery } from '@/redux/api/apiSlice';

const OrderDetailsModal = ({ orderId, onClose }: { orderId: string | null; onClose: () => void }) => {
    const { data, isLoading } = useGetAdminOrderDetailsQuery(orderId || '', { skip: !orderId });

    if (!orderId) return null;

    return (
        <Dialog open={!!orderId} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Détails de la commande {orderId.substring(0, 8)}</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div className="py-8"><Loader /></div>
                ) : data?.order ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Acheteur</h4>
                                <p>{data.order.buyer_name}</p>
                                <p className="text-gray-500">{data.order.shipping_address?.email}</p>
                                <p className="text-gray-500">{data.order.shipping_address?.phone}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Vendeur</h4>
                                <p>{data.order.seller_name}</p>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Articles</h4>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left">Produit</th>
                                            <th className="px-4 py-2 text-right">Qté</th>
                                            <th className="px-4 py-2 text-right">Prix</th>
                                            <th className="px-4 py-2 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {data.items?.map((item: any, i: number) => (
                                            <tr key={i}>
                                                <td className="px-4 py-2">
                                                    <div className="flex items-center gap-2">
                                                        {item.product_image && (
                                                            <img src={item.product_image} alt="" className="w-8 h-8 rounded object-cover" />
                                                        )}
                                                        <span className="line-clamp-1">{item.product_title || 'Produit supprimé'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 text-right">{item.quantity}</td>
                                                <td className="px-4 py-2 text-right">{item.price_at_purchase} BIF</td>
                                                <td className="px-4 py-2 text-right">{(item.quantity * Number(item.price_at_purchase)).toFixed(0)} BIF</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t">
                            <div>
                                <p className="text-sm text-gray-500">Adresse de livraison</p>
                                <p className="text-sm font-medium">
                                    {data.order.shipping_address?.address}, {data.order.shipping_address?.city}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Total payé</p>
                                <p className="text-xl font-bold text-[#000435]">{data.order.total_amount} BIF</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">Commande introuvable</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default function AdminOrders() {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [search, setSearch] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    const { data, isLoading, refetch } = useGetAdminOrdersQuery({
        page,
        limit: 20,
        status: statusFilter === 'all' ? undefined : statusFilter,
        q: search
    });

    const [updateStatus] = useUpdateAdminOrderStatusMutation();

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        if (!window.confirm(`Changer le statut en "${newStatus}" ?`)) return;
        try {
            await updateStatus({ orderId, status: newStatus }).unwrap();
            toast.success("Statut mis à jour");
            refetch();
        } catch (error) {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        const labels: Record<string, string> = {
            pending: 'En attente',
            paid: 'Payé',
            shipped: 'Expédié',
            delivered: 'Livré',
            cancelled: 'Annulé'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Commandes</h1>
                    <p className="text-gray-600">Gestion des commandes globales</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher par ID ou acheteur..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435]"
                    >
                        <option value="">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="paid">Payé</option>
                        <option value="shipped">Expédié</option>
                        <option value="delivered">Livré</option>
                        <option value="cancelled">Annulé</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {isLoading ? (
                    <div className="py-12"><Loader /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Commande</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Acheteur</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Vendeur</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Montant</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Statut</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Date</th>
                                    <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {data?.orders?.map((order: any) => (
                                    <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#000435] flex items-center gap-2">
                                                <Package size={16} />
                                                #{order.order_id.substring(0, 8)}...
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-700">{order.buyer_name || 'Inconnu'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{order.seller_name || 'Inconnu'}</td>
                                        <td className="px-6 py-4 font-bold text-gray-900">{order.total_amount} BIF</td>
                                        <td className="px-6 py-4">{getStatusBadge(order.status)}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDistanceToNow(new Date(order.created_at), { addSuffix: true, locale: fr })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setSelectedOrderId(order.order_id)}
                                                    className="p-2 text-gray-500 hover:text-[#000435] hover:bg-gray-100 rounded-lg"
                                                    title="Voir détails"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                {/* Quick Actions */}
                                                {(order.status === 'paid' || order.status === 'pending') && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.order_id, 'cancelled')}
                                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                        title="Annuler"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data?.orders || data.orders.length === 0) && (
                                    <tr>
                                        <td colSpan={7} className="py-12 text-center text-gray-500">Aucune commande trouvée</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <OrderDetailsModal orderId={selectedOrderId} onClose={() => setSelectedOrderId(null)} />
        </AdminLayout>
    );
}
