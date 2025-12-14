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
import {
    useGetAdminStatsQuery,
    useGetAdminLogsQuery,
    useGetAdminBusinessesQuery
} from '@/redux/api/apiSlice';
import { RouteFallback } from '@/components/common/RouteFallback';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AdminDashboard() {
    const { data: statsData, isLoading: statsLoading } = useGetAdminStatsQuery({});
    const { data: logsData, isLoading: logsLoading } = useGetAdminLogsQuery({ limit: 5 });
    const { data: businessesData, isLoading: businessesLoading } = useGetAdminBusinessesQuery({ limit: 5, sort: 'total_orders' });

    if (statsLoading || logsLoading || businessesLoading) {
        return <RouteFallback />;
    }

    const stats = [
        {
            title: 'Total Utilisateurs',
            value: statsData?.stats?.totalUsers?.toString() || '0',
            change: `+${statsData?.stats?.todaySignups || 0} aujourd'hui`,
            trend: 'up',
            icon: Users,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Total Produits',
            value: statsData?.stats?.totalListings?.toString() || '0',
            change: '+0%', // Need historical data for change
            trend: 'up',
            icon: Package,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Commandes',
            value: statsData?.stats?.totalOrders?.toString() || '0',
            change: `+${statsData?.stats?.todayOrders || 0} aujourd'hui`,
            trend: 'up',
            icon: ShoppingCart,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Revenus',
            value: `${statsData?.stats?.totalRevenue || 0} RWF`,
            change: '+0%',
            trend: 'up', // Assuming up for now
            icon: DollarSign,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    const recentActivities = logsData?.logs?.map((log: any) => ({
        type: 'system',
        message: `${log.action} - ${log.details?.resourceType || 'System'}`,
        time: formatDistanceToNow(new Date(log.created_at), { addSuffix: true, locale: fr })
    })) || [];

    // Sort businesses by total_orders to get top sellers if backend doesn't sort
    const topSellers = businessesData?.businesses
        ?.slice()
        .sort((a: any, b: any) => (b.total_orders || 0) - (a.total_orders || 0))
        .slice(0, 5)
        .map((business: any) => ({
            name: business.business_name,
            sales: business.total_orders?.toString() || '0',
            revenue: 'N/A' // Revenue per business not in list endpoint
        })) || [];

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
