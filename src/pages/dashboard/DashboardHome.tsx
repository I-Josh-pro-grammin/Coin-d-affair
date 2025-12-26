import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
    DollarSign,
    Package,
    ShoppingCart,
    Users,
    ArrowUp,
    ArrowDown,
    Plus,
    Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    useGetBusinessProfileQuery,
    useGetBusinessProductsQuery,
    useGetBusinessOrdersQuery
} from '@/redux/api/apiSlice';
import { RouteFallback } from '@/components/common/RouteFallback';

export default function DashboardHome() {
    const { data: businessProfile, isLoading: profileLoading } = useGetBusinessProfileQuery({});
    const { data: products, isLoading: productsLoading } = useGetBusinessProductsQuery({});
    const { data: orders, isLoading: ordersLoading } = useGetBusinessOrdersQuery({});

    if (profileLoading || productsLoading || ordersLoading) {
        return <RouteFallback />;
    }

    // Calculate stats
    // Calculate stats
    const actualProducts = products?.allProducts || [];
    const actualOrders = orders?.orders || [];
    const actualProfile = businessProfile?.business;

    const totalRevenue = actualOrders.reduce((acc: number, order: any) => acc + (Number(order.total_amount) || 0), 0);
    const activeProducts = actualProducts.length || 0;
    const totalOrders = actualOrders.length || 0;

    // Calculate unique customers from orders
    const uniqueCustomers = new Set(actualOrders.map((order: any) => order.user_id)).size;

    const stats = [
        {
            title: 'Revenus totaux',
            value: `${totalRevenue} BIF`,
            change: '+0%', // Placeholder as we don't have historical data yet
            trend: 'up',
            icon: DollarSign,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Produits actifs',
            value: activeProducts.toString(),
            change: '+0',
            trend: 'up',
            icon: Package,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Commandes',
            value: totalOrders.toString(),
            change: '+0%',
            trend: 'up',
            icon: ShoppingCart,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Clients',
            value: uniqueCustomers.toString(),
            change: '+0%',
            trend: 'up',
            icon: Users,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    const getTheBuyerName = (userId: any) => {
        return orders?.users?.find((user: any) => user.user_id === userId)?.full_name || 'Client';
    }

    const recentOrders = actualOrders.slice(0, 5).map((order: any) => ({
        id: order.order_id,
        customer: getTheBuyerName(order.user_id),
        product: order.title || 'Produit',
        amount: `${order.total_amount} ${order.currency}`,
        status: order.status
    })) || [];

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
                <p className="text-gray-600">Bienvenue dans votre espace vendeur</p>
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
                                    {stat.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link
                    to="/dashboard/products/new"
                    className="bg-[#000435] text-white rounded-2xl shadow-sm p-6 hover:bg-[#000435]/90 transition-all hover:shadow-md"
                >
                    <Plus size={24} className="mb-3" />
                    <h3 className="text-lg font-bold mb-1">Ajouter un produit</h3>
                    <p className="text-sm text-white/80">Créez un nouveau produit</p>
                </Link>

                <Link
                    to="/dashboard/orders"
                    className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-[#000435]"
                >
                    <ShoppingCart size={24} className="mb-3 text-[#000435]" />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Voir les commandes</h3>
                    <p className="text-sm text-gray-600">Gérez vos commandes</p>
                </Link>

                <Link
                    to="/dashboard/messages"
                    className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-all border-2 border-gray-200"
                >
                    <Eye size={24} className="mb-3 text-gray-700" />
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Messages</h3>
                    <p className="text-sm text-gray-600">3 nouveaux messages</p>
                </Link>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Commandes récentes</h2>
                    <Link to="/dashboard/orders" className="text-[#000435] hover:underline text-sm font-medium">
                        Voir tout →
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Commande</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Produit</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Montant</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order: any) => (
                                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">#{order.id}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{order.customer}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{order.product}</td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{order.amount}</td>
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                'bg-green-100 text-green-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
