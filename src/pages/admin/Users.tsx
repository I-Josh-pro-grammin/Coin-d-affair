import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, UserX, UserCheck, UserPlus, Eye, Trash2, X, CheckSquare, Square } from 'lucide-react';
import {
    useGetAllUsersQuery,
    useBanUserMutation,
    useUnbanUserMutation,
    useDeleteUserMutation,
    useGetAdminUserDetailsQuery
} from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader } from '@/components/common/Loader';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

type UserRole = 'business' | 'user' | 'admin';

interface AdminUser {
    user_id: string;
    full_name: string;
    email: string;
    account_type: UserRole;
    is_active: boolean;
    created_at: string;
    is_verified: boolean;
}

const UserDetailsModal = ({ userId, onClose }: { userId: string | null; onClose: () => void }) => {
    const { data, isLoading } = useGetAdminUserDetailsQuery(userId || '', {
        skip: !userId
    });

    if (!userId) return null;

    return (
        <Dialog open={!!userId} onOpenChange={() => onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Détails de l'utilisateur</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center py-8">
                        <Loader />
                    </div>
                ) : data?.user ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-600">
                                {data.user.full_name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{data.user.full_name}</h3>
                                <p className="text-gray-500">{data.user.email}</p>
                                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium mt-1 ${data.user.account_type === 'business' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {data.user.account_type === 'business' ? 'Vendeur' : 'Acheteur'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-100">
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Commandes</p>
                                <p className="text-xl font-bold">{data.stats?.orders?.total_orders || 0}</p>
                            </div>
                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Dépensé</p>
                                <p className="text-xl font-bold">{data.stats?.orders?.total_spent || 0} €</p>
                            </div>
                            {data.user.account_type === 'business' && (
                                <div className="text-center p-3 bg-gray-50 rounded-lg col-span-2">
                                    <p className="text-sm text-gray-500">Produits en vente</p>
                                    <p className="text-xl font-bold">{data.stats?.listings?.total_listings || 0}</p>
                                </div>
                            )}
                        </div>

                        <div className="text-sm text-gray-500 space-y-2">
                            <p><strong>ID:</strong> {data.user.user_id}</p>
                            <p><strong>Téléphone:</strong> {data.user.phone || 'Non renseigné'}</p>
                            <p><strong>Inscrit le:</strong> {new Date(data.user.created_at).toLocaleDateString()}</p>
                            <p><strong>Statut:</strong> {data.user.is_active ? 'Actif' : 'Banni'} • {data.user.is_verified ? 'Vérifié' : 'Non vérifié'}</p>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-red-500">Utilisateur introuvable</p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default function Users() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

    // Fetch users
    const { data: usersData, isLoading, refetch } = useGetAllUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [banUser] = useBanUserMutation();
    const [unbanUser] = useUnbanUserMutation();

    const [initialUsers, setInitialUsers] = useState<AdminUser[]>([]);

    useEffect(() => {
        if (usersData?.users) setInitialUsers(usersData.users);
    }, [usersData]);

    const handleToggleBan = async (user: AdminUser) => {
        try {
            if (user.is_active) {
                if (!window.confirm("Voulez-vous vraiment bannir cet utilisateur ?")) return;
                await banUser(user.user_id).unwrap();
                toast.success('Utilisateur banni');
            } else {
                await unbanUser(user.user_id).unwrap();
                toast.success('Utilisateur réactivé');
            }
            refetch();
        } catch (error) {
            toast.error("Erreur action impossible");
        }
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cet utilisateur ? Cette action est irréversible.")) return;

        try {
            await deleteUser(userId).unwrap();
            toast.success("Utilisateur supprimé");
            refetch();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const filteredUsers = (initialUsers || []).filter((user: AdminUser) => {
        if (roleFilter !== 'all' && user.account_type !== roleFilter) return false;
        if (!search || search.trim() === '') return true;
        const s = search.toLowerCase();
        return (user.email || '').toLowerCase().includes(s) || (user.full_name || '').toLowerCase().includes(s);
    });

    // Multi-selection logic
    const toggleSelectAll = () => {
        if (selectedUsers.size === filteredUsers.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(filteredUsers.map(u => u.user_id)));
        }
    };

    const toggleSelectUser = (id: string) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedUsers(newSelected);
    };

    const handleBulkDelete = async () => {
        if (!selectedUsers.size) return;
        if (!window.confirm(`Supprimer définitivement ${selectedUsers.size} utilisateurs ?`)) return;

        let successCount = 0;
        try {
            await Promise.all(
                Array.from(selectedUsers).map(async (id) => {
                    await deleteUser(id).unwrap();
                    successCount++;
                })
            );
            toast.success(`${successCount} utilisateurs supprimés`);
            setSelectedUsers(new Set());
            refetch();
        } catch (error) {
            toast.error("Certaines suppressions ont échoué");
        }
    };

    const handleBulkBan = async (action: 'ban' | 'unban') => {
        if (!selectedUsers.size) return;
        if (!window.confirm(`${action === 'ban' ? 'Bannir' : 'Réactiver'} ${selectedUsers.size} utilisateurs ?`)) return;

        let successCount = 0;
        try {
            await Promise.all(
                Array.from(selectedUsers).map(async (id) => {
                    if (action === 'ban') await banUser(id).unwrap();
                    else await unbanUser(id).unwrap();
                    successCount++;
                })
            );
            toast.success(`${successCount} utilisateurs mis à jour`);
            setSelectedUsers(new Set());
            refetch();
        } catch (error) {
            toast.error("Certaines actions ont échoué");
        }
    };

    if (isLoading) return <AdminLayout><Loader /></AdminLayout>;

    return (
        <AdminLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Utilisateurs</h1>
                    <p className="text-gray-600">{filteredUsers.length} comptes trouvés</p>
                </div>
                {selectedUsers.size > 0 && (
                    <div className="flex items-center gap-3 bg-[#000435] text-white px-4 py-2 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4">
                        <span className="text-sm font-medium">{selectedUsers.size} sélectionné(s)</span>
                        <div className="h-4 w-px bg-white/20" />
                        <button onClick={() => handleBulkBan('ban')} className="p-1 hover:bg-white/10 rounded" title="Bannir la sélection">
                            <UserX size={18} />
                        </button>
                        <button onClick={() => handleBulkBan('unban')} className="p-1 hover:bg-white/10 rounded" title="Réactiver la sélection">
                            <UserCheck size={18} />
                        </button>
                        <button onClick={handleBulkDelete} className="p-1 hover:bg-red-500 rounded text-red-200 hover:text-white transition-colors" title="Supprimer la sélection">
                            <Trash2 size={18} />
                        </button>
                        <button onClick={() => setSelectedUsers(new Set())} className="ml-2">
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                        />
                    </div>
                    <div className="flex gap-2 text-sm">
                        {[{ k: 'all', l: 'Tous' }, { k: 'user', l: 'Acheteurs' }, { k: 'business', l: 'Vendeurs' }, { k: 'admin', l: 'Admins' }].map(t => (
                            <button
                                key={t.k}
                                onClick={() => setRoleFilter(t.k as any)}
                                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${roleFilter === t.k ? 'bg-[#000435]/10 text-[#000435] border-[#000435]/20' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                            >
                                {t.l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="w-12 px-6 py-4">
                                    <Checkbox
                                        checked={filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all"
                                    />
                                </th>
                                <th className="text-left py-4 px-2 text-sm font-medium text-gray-500">Utilisateur</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Rôle</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Statut</th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Date</th>
                                <th className="text-right py-4 px-6 text-sm font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.user_id} className={`transition-colors ${selectedUsers.has(user.user_id) ? 'bg-blue-50/50' : 'hover:bg-gray-50/80'}`}>
                                    <td className="px-6 py-4">
                                        <Checkbox
                                            checked={selectedUsers.has(user.user_id)}
                                            onCheckedChange={() => toggleSelectUser(user.user_id)}
                                            aria-label={`Select ${user.full_name}`}
                                        />
                                    </td>
                                    <td className="py-4 px-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[#000435]/5 flex items-center justify-center text-xs font-bold text-[#000435]">
                                                {user.full_name?.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.full_name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.account_type === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.account_type === 'business' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.account_type === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                                            {user.account_type === 'business' ? 'Vendeur' : user.account_type === 'admin' ? 'Admin' : 'Acheteur'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.is_active ? 'Actif' : 'Banni'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-600">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => setSelectedUserId(user.user_id)}
                                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Voir le profil"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {user.account_type !== 'admin' && (
                                                <>
                                                    <button
                                                        onClick={() => handleToggleBan(user)}
                                                        className={`p-2 rounded-lg transition-colors ${user.is_active ? 'text-orange-500 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'}`}
                                                        title={user.is_active ? "Bannir" : "Réactiver"}
                                                    >
                                                        {user.is_active ? <UserX size={18} /> : <UserCheck size={18} />}
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(user.user_id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Supprimer définitivement"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr><td colSpan={6} className="py-8 text-center text-gray-500">Aucun utilisateur trouvé</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <UserDetailsModal
                userId={selectedUserId}
                onClose={() => setSelectedUserId(null)}
            />
        </AdminLayout>
    );
}
