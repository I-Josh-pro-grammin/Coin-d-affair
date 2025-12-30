import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Search, Filter, Eye, EyeOff, CheckCircle2, XCircle, MoreVertical, Trash2 } from 'lucide-react';

import { Link } from 'react-router-dom';
import {
    useGetAdminListingsQuery,
    useUpdateListingStatusMutation,
    useDeleteAdminListingMutation
} from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import Loader from '@/components/common/Loader';

interface AdminProduct {
    listings_id: string;
    title: string;
    business_name: string; // from join
    category_id: string; // or category name if joined
    price: number;
    currency: string;
    is_approved: boolean;
    is_visible: boolean;
    created_at: string;
    // ... other fields
}

export default function AdminProducts() {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'hidden'>('all');

    const { data: listingsData, isLoading, refetch } = useGetAdminListingsQuery({
        q: search
    });

    const [updateListingStatus] = useUpdateListingStatusMutation();
    const [deleteListing] = useDeleteAdminListingMutation();

    const handleUpdateStatus = async (id: string, action: 'approve' | 'reject' | 'hide' | 'unhide') => {
        try {
            await updateListingStatus({ listingId: id, action }).unwrap();
            toast.success(`Statut du produit mis à jour (${action})`);
            // refetch() removed - handled by tags
        } catch (error: any) {
            const msg = error?.data?.message || "Erreur lors de la mise à jour du statut";
            toast.error(msg);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
        try {
            await deleteListing(id).unwrap();
            toast.success('Produit supprimé');
            // refetch() removed - handled by tags
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const getStatus = (p: AdminProduct) => {
        if (!p.is_visible) return 'hidden';
        if (p.is_approved) return 'approved';
        if (p.is_approved === false) return 'rejected'; // assuming false means rejected if not pending? 
        // Actually backend logic: is_approved defaults to false? or null?
        // Let's assume !is_approved and visible = pending or rejected. 
        // Backend: approve -> is_approved=true. reject -> is_approved=false.
        // So is_approved=false could be rejected or pending. 
        // Usually pending is default. Let's assume if it's false it's pending/rejected.
        // For now let's simplify: if is_approved is true -> approved.
        // If is_approved is false -> pending (or rejected).
        // If is_visible is false -> hidden.
        return p.is_approved ? 'approved' : 'pending';
    };

    const filtered = listingsData?.listings?.filter((p: AdminProduct) => {
        const status = getStatus(p);
        const matchesStatus = statusFilter === 'all' || status === statusFilter;
        // Search is handled by backend but we can do client side too for status
        return matchesStatus;
    }) || [];

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Chargement des produits...</p>
                </div>
                <Loader />
            </AdminLayout>
        );
    }

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
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${statusFilter === tab.key
                                    ? 'bg-[#000435]/10 text-[#000435] border-[#000435]/20'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products table (Desktop) */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
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
                        <tbody className="divide-y divide-gray-100" key={`tbody-${statusFilter}-${search}`}>
                            {filtered.map((p: AdminProduct) => (
                                <tr key={p.listings_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <p className="font-semibold text-gray-900">{p.title}</p>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        <span key="seller">{p.business_name || 'N/A'}</span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        <span key="category">{p.category_id || 'N/A'}</span>
                                    </td>
                                    <td className="py-4 px-6 font-semibold text-gray-900">
                                        <span key="price">{p.price} {p.currency}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatus(p) === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : getStatus(p) === 'approved'
                                                ? 'bg-green-100 text-green-800'
                                                : getStatus(p) === 'rejected'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {getStatus(p) === 'pending' ? 'En attente' :
                                                getStatus(p) === 'approved' ? 'Approuvé' :
                                                    getStatus(p) === 'rejected' ? 'Rejeté' :
                                                        getStatus(p) === 'hidden' ? 'Masqué' : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        <span key="created">{new Date(p.created_at).toLocaleDateString()}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2" key={`actions-${p.listings_id}`}>
                                            <button className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors" title="Voir">
                                                <Eye size={18} />
                                            </button>
                                            {getStatus(p) !== 'approved' && (
                                                <button
                                                    key={`approve-${p.listings_id}`}
                                                    onClick={() => handleUpdateStatus(p.listings_id, 'approve')}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Approuver"
                                                >
                                                    <CheckCircle2 size={18} />
                                                </button>
                                            )}
                                            {getStatus(p) !== 'rejected' && (
                                                <button
                                                    key={`reject-${p.listings_id}`}
                                                    onClick={() => handleUpdateStatus(p.listings_id, 'reject')}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Rejeter"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            )}
                                            {getStatus(p) !== 'hidden' ? (
                                                <button
                                                    key={`hide-${p.listings_id}`}
                                                    onClick={() => handleUpdateStatus(p.listings_id, 'hide')}
                                                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Masquer"
                                                >
                                                    <EyeOff size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    key={`unhide-${p.listings_id}`}
                                                    onClick={() => handleUpdateStatus(p.listings_id, 'unhide')}
                                                    className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Rendre visible"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            )}
                                            <button
                                                key={`delete-${p.listings_id}`}
                                                onClick={() => handleDelete(p.listings_id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Supprimer définitivement"
                                            >
                                                <Trash2 size={18} />
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

            {/* Mobile View (Cards) */}
            <div className="md:hidden grid grid-cols-1 gap-4" key={`mobile-list-${statusFilter}-${search}`}>
                {filtered.map((p: AdminProduct) => (
                    <div key={p.listings_id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    <span key="title">{p.title}</span>
                                </h3>
                                <p className="text-sm text-gray-500">
                                    <span key="biz">{p.business_name || 'N/A'}</span>
                                </p>
                            </div>
                            <div
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatus(p) === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : getStatus(p) === 'approved'
                                        ? 'bg-green-100 text-green-800'
                                        : getStatus(p) === 'rejected'
                                            ? 'bg-red-100 text-red-800'
                                            : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                {getStatus(p) === 'pending' ? 'En attente' :
                                    getStatus(p) === 'approved' ? 'Approuvé' :
                                        getStatus(p) === 'rejected' ? 'Rejeté' :
                                            getStatus(p) === 'hidden' ? 'Masqué' : 'N/A'}
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600" key="mobile-cat">{p.category_id || 'N/A'}</span>
                            <span className="font-semibold text-gray-900" key="mobile-price">{p.price} {p.currency}</span>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex justify-end gap-2" key={`mobile-actions-${p.listings_id}`}>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="Voir">
                                <Eye size={20} />
                            </button>
                            {getStatus(p) !== 'approved' && (
                                <button
                                    key={`mobile-approve-${p.listings_id}`}
                                    onClick={() => handleUpdateStatus(p.listings_id, 'approve')}
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                    title="Approuver"
                                >
                                    <CheckCircle2 size={20} />
                                </button>
                            )}
                            {getStatus(p) !== 'rejected' && (
                                <button
                                    key={`mobile-reject-${p.listings_id}`}
                                    onClick={() => handleUpdateStatus(p.listings_id, 'reject')}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                    title="Rejeter"
                                >
                                    <XCircle size={20} />
                                </button>
                            )}
                            {getStatus(p) !== 'hidden' ? (
                                <button
                                    key={`mobile-hide-${p.listings_id}`}
                                    onClick={() => handleUpdateStatus(p.listings_id, 'hide')}
                                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                    title="Masquer"
                                >
                                    <EyeOff size={20} />
                                </button>
                            ) : (
                                <button
                                    key={`mobile-unhide-${p.listings_id}`}
                                    onClick={() => handleUpdateStatus(p.listings_id, 'unhide')}
                                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                    title="Rendre visible"
                                >
                                    <Eye size={20} />
                                </button>
                            )}
                            <button
                                key={`mobile-delete-${p.listings_id}`}
                                onClick={() => handleDelete(p.listings_id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                title="Supprimer définitivement"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="p-8 text-center text-gray-500 text-sm bg-white rounded-xl">
                        Aucun produit trouvé.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
