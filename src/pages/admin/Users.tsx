import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Shield, UserX, UserCheck, UserPlus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    useGetAllUsersQuery,
    useBanUserMutation,
    useUnbanUserMutation
} from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader } from '@/components/common/Loader';

type UserRole = 'business' | 'user' | 'admin';
type UserStatus = 'active' | 'banned';

interface AdminUser {
    user_id: string;
    full_name: string;
    email: string;
    account_type: UserRole;
    is_active: boolean;
    created_at: string;
    is_verified: boolean;
}

export default function Users() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');

    // Fetch users once and perform client-side searching/filtering
    const { data: usersData, isLoading, refetch } = useGetAllUsersQuery();

    // keep a copy of initially fetched users to search against locally
    const [initialUsers, setInitialUsers] = useState<AdminUser[]>([]);

    useEffect(() => {
        if (usersData?.users) setInitialUsers(usersData.users);
    }, [usersData]);

    const [banUser] = useBanUserMutation();
    const [unbanUser] = useUnbanUserMutation();

    const handleToggleBan = async (user: AdminUser) => {
        try {
            if (user.is_active) {
                await banUser(user.user_id).unwrap();
                toast.success('Utilisateur banni avec succès');
            } else {
                await unbanUser(user.user_id).unwrap();
                toast.success('Utilisateur débanni avec succès');
            }
            refetch();
        } catch (error) {
            toast.error("Erreur lors de la mise à jour du statut de l'utilisateur");
        }
    };

    const filteredUsers = (initialUsers || []).filter((user: AdminUser) => {
        // role filter
        if (roleFilter !== 'all' && user.account_type !== roleFilter) return false;

        // search term match (email or name)
        if (!search || search.trim() === '') return true;
        const s = search.toLowerCase();
        return (user.email || '').toLowerCase().includes(s) || (user.full_name || '').toLowerCase().includes(s);
    });

    if(isLoading) {
            return (
                <AdminLayout>
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">Chargement des utilisateurs...</p>
                    </div>
                    <Loader />
                </AdminLayout>
            );
        }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Utilisateurs</h1>
                <p className="text-gray-600">{filteredUsers.length} comptes trouvés</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    {/* Search */}
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

                    {/* Role Filter */}
                    <div className="flex gap-2 overflow-x-auto">
                        {[
                            { key: 'all', label: 'Tous' },
                            { key: 'user', label: 'Acheteurs' },
                            { key: 'business', label: 'Vendeurs' },
                            { key: 'admin', label: 'Admins' },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setRoleFilter(tab.key as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${roleFilter === tab.key
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

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Utilisateur</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Rôle</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Vérifié</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Créé le</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Dernière activité</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user: AdminUser) => (
                                <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#000435]/10 flex items-center justify-center text-sm font-bold text-[#000435]">
                                                {user.full_name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.full_name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {user.account_type === 'user' && 'Acheteur'}
                                            {user.account_type === 'business' && 'Vendeur'}
                                            {user.account_type === 'admin' && (
                                                <>
                                                    <Shield size={12} />
                                                    Admin
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {user?.is_verified ? 'Ouis' : 'Non'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.is_active
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {user.is_active ? 'Actif' : 'Banni'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">
                                        {/* Last active not available in this endpoint, using created_at as placeholder or removing */}
                                        -
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors" title="Voir le profil">
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleToggleBan(user)}
                                                className={`p-2 rounded-lg transition-colors ${user.is_active
                                                    ? 'text-red-600 hover:bg-red-50'
                                                    : 'text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={user.is_active ? 'Bannir' : 'Réactiver'}
                                            >
                                                {user.is_active ? <UserX size={18} /> : <UserCheck size={18} />}
                                            </button>
                                            {user.account_type !== 'admin' && (
                                                <button
                                                    className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Promouvoir en admin (mock)"
                                                >
                                                    <Shield size={18} />
                                                </button>
                                            )}
                                            <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-10 text-center text-gray-500 text-sm">
                                        Aucun utilisateur ne correspond à votre recherche.
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
