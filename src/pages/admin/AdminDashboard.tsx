import { AdminLayout } from '@/components/admin/AdminLayout';
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    TrendingDown,
    ArrowUp,
    ArrowDown,
    Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    // Mock data
    const stats = [
        {
            title: 'Total Utilisateurs',
            value: '2,543',
            change: '+12.5%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Total Produits',
            value: '8,234',
            change: '+8.2%',
            trend: 'up',
            icon: Package,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Commandes (mois)',
            value: '1,456',
            change: '+23.1%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Revenus (mois)',
            value: '45.6M RWF',
            change: '-2.4%',
            trend: 'down',
            icon: DollarSign,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    const recentActivities = [
        { type: 'user', message: 'Nouveau vendeur inscrit: Jean Dupont', time: 'Il y a 5 min' },
        { type: 'product', message: 'Nouveau produit publié: iPhone 13 Pro', time: 'Il y a 15 min' },
        { type: 'order', message: 'Nouvelle commande #1234 - 850,000 RWF', time: 'Il y a 30 min' },
        { type: 'category', message: 'Catégorie "Gaming" créée', time: 'Il y a 1h' },
    ];

    const topSellers = [
        { name: 'Boutique Tech', sales: '156', revenue: '12.5M RWF' },
        { name: 'Fashion Store', sales: '143', revenue: '10.2M RWF' },
        { name: 'Home Décor', sales: '128', revenue: '8.9M RWF' },
    ];

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord Admin</h1>
                <p className="text-gray-600">Vue d'ensemble de la plateforme</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <Icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Activités récentes</h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                                <div className="w-2 h-2 bg-[#000435] rounded-full mt-2"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/admin/activity"
                        className="block text-center mt-4 text-[#000435] hover:underline text-sm font-medium"
                    >
                        Voir toutes les activités →
                    </Link>
                </div>

                {/* Top Sellers */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Top vendeurs (ce mois)</h2>
                    <div className="space-y-4">
                        {topSellers.map((seller, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#000435] rounded-full flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{seller.name}</p>
                                        <p className="text-sm text-gray-600">{seller.sales} ventes</p>
                                    </div>
                                </div>
                                <p className="font-bold text-[#000435]">{seller.revenue}</p>
                            </div>
                        ))}
                    </div>
                    <Link
                        to="/admin/users?filter=sellers"
                        className="block text-center mt-4 text-[#000435] hover:underline text-sm font-medium"
                    >
                        Voir tous les vendeurs →
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
