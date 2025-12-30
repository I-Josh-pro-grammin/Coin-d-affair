import { AdminLayout } from '@/components/admin/AdminLayout';
import { DollarSign, ShoppingCart, Users, Package, RefreshCw } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import {
    useGetAdminStatsQuery,
    useGetSubscriptionStatsQuery
} from '@/redux/api/apiSlice';
import { RouteFallback } from '@/components/common/RouteFallback';
import { Button } from '@/components/ui/button';

export default function Analytics() {
    // Polling interval of 30 seconds for "real-time" updates
    const { data: statsData, isLoading: statsLoading, refetch } = useGetAdminStatsQuery({}, {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnReconnect: true
    });

    // Subscriptions don't change as often
    const { data: subStats, isLoading: subLoading } = useGetSubscriptionStatsQuery({});

    if (statsLoading || subLoading) {
        return <RouteFallback />;
    }

    const kpis = [
        {
            title: 'Revenus Totaux',
            value: `${statsData?.stats?.totalRevenue ? Number(statsData.stats.totalRevenue).toLocaleString() : 0} BIF`,
            change: '+0%', // To be implemented with historical comparison
            icon: DollarSign,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Commandes',
            value: statsData?.stats?.totalOrders?.toString() || '0',
            change: `+${statsData?.stats?.todayOrders || 0} aujourd'hui`,
            icon: ShoppingCart,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Utilisateurs Actifs',
            value: statsData?.stats?.totalUsers?.toString() || '0',
            change: `+${statsData?.stats?.todaySignups || 0} aujourd'hui`,
            icon: Users,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Produits Publiés',
            value: statsData?.stats?.totalListings?.toString() || '0',
            change: '+0%',
            icon: Package,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    // Data formatter for charts
    const formatBIF = (value: number) => {
        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
        return value.toString();
    };

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyses en Temps Réel</h1>
                    <p className="text-gray-600">
                        Mise à jour automatique toutes les 30 secondes.

                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
                        <RefreshCw size={14} /> Actualiser
                    </Button>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#000435] focus:border-transparent">
                        <option>Cette année</option>
                        {/* More options can be added when backend supports date range filtering */}
                    </select>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                                    <Icon size={24} />
                                </div>
                                {kpi.change.includes('+0') ? null : (
                                    <span className="text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                                        {kpi.change}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                            <p className="text-sm text-gray-600">{kpi.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Revenue Chart */}
                <div className="bg-white rounded-2xl shadow-sm p-6 h-96 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Évolution des Revenus</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={statsData?.stats?.monthlySales || []}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#000435" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#000435" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(val) => val.split('-')[1]} // Show only month number/name
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={formatBIF}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value: number) => [`${Number(value).toLocaleString()} BIF`, 'Revenus']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total_sales"
                                    stroke="#000435"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    strokeWidth={3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Users Chart */}
                <div className="bg-white rounded-2xl shadow-sm p-6 h-96 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Nouveaux Utilisateurs</h3>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statsData?.stats?.monthlySignups || []}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="month"
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(val) => val.split('-')[1]}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#F3F4F6' }}
                                />
                                <Bar
                                    dataKey="new_users"
                                    name="Utilisateurs"
                                    fill="#8B5CF6"
                                    radius={[4, 4, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
