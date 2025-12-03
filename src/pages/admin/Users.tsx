import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, UserX, UserCheck, UserPlus, Eye } from 'lucide-react';

type UserRole = 'buyer' | 'seller' | 'admin';
type UserStatus = 'active' | 'banned';

interface AdminUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    createdAt: string;
    lastActive: string;
}

export default function Users() {
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');

    const [users, setUsers] = useState<AdminUser[]>([
        {
            id: 1,
            name: 'Jean Dupont',
            email: 'jean.dupont@example.com',
            role: 'seller',
            status: 'active',
            createdAt: '2024-01-10',
            lastActive: 'Il y a 5 min',
        },
        {
            id: 2,
            name: 'Marie Claire',
            email: 'marie.claire@example.com',
            role: 'buyer',
            status: 'active',
            createdAt: '2024-01-02',
            lastActive: 'Il y a 2 h',
        },
        {
            id: 3,
            name: 'Admin Principal',
            email: 'admin@coindaffaires.com',
            role: 'admin',
            status: 'active',
            createdAt: '2023-12-01',
            lastActive: 'En ligne',
        },
        {
            id: 4,
            name: 'Boutique Tech',
            email: 'techshop@example.com',
            role: 'seller',
            status: 'banned',
            createdAt: '2023-11-20',
            lastActive: 'Il y a 3 jours',
        },
    ]);

    const filteredUsers = users.filter((user) => {
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const term = search.toLowerCase();
        const matchesSearch =
            !term ||
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term);
        return matchesRole && matchesSearch;
    });

    const toggleBan = (id: number) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id ? { ...u, status: u.status === 'active' ? 'banned' : 'active' } : u
            )
        );
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Utilisateurs</h1>
                <p className="text-gray-600">{users.length} comptes enregistrés</p>
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
                            { key: 'buyer', label: 'Acheteurs' },
                            { key: 'seller', label: 'Vendeurs' },
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
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Statut</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Créé le</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Dernière activité</th>
                                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#000435]/10 flex items-center justify-center text-sm font-bold text-[#000435]">
                                                {user.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {user.role === 'buyer' && 'Acheteur'}
                                            {user.role === 'seller' && 'Vendeur'}
                                            {user.role === 'admin' && (
                                                <>
                                                    <Shield size={12} />
                                                    Admin
                                                </>
                                            )}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                }`}
                                        >
                                            {user.status === 'active' ? 'Actif' : 'Banni'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{user.createdAt}</td>
                                    <td className="py-4 px-6 text-sm text-gray-700">{user.lastActive}</td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors" title="Voir le profil">
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => toggleBan(user.id)}
                                                className={`p-2 rounded-lg transition-colors ${user.status === 'active'
                                                        ? 'text-red-600 hover:bg-red-50'
                                                        : 'text-green-600 hover:bg-green-50'
                                                    }`}
                                                title={user.status === 'active' ? 'Bannir' : 'Réactiver'}
                                            >
                                                {user.status === 'active' ? <UserX size={18} /> : <UserCheck size={18} />}
                                            </button>
                                            {user.role !== 'admin' && (
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
