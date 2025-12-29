import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
    Package,
    ArrowUp,
    ArrowDown,
    Plus,
    Eye,
    MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    useGetBusinessProfileQuery,
    useGetBusinessProductsQuery
} from '@/redux/api/apiSlice';
import { RouteFallback } from '@/components/common/RouteFallback';

export default function DashboardHome() {
    const { data: businessProfile, isLoading: profileLoading } = useGetBusinessProfileQuery({});
    const { data: products, isLoading: productsLoading } = useGetBusinessProductsQuery({});

    if (profileLoading || productsLoading) {
        return <RouteFallback />;
    }
    // Calculate stats
    const actualProducts = Array.isArray(products) ? products : [];

    // Placeholder stats for non-commerce metrics
    const activeProducts = actualProducts?.length || 0;
    const totalViews = 0; // To be implemented with analytics
    const contactsCount = 0; // To be implemented with message/click tracking

    const stats = [
        {
            title: 'Produits actifs',
            value: activeProducts.toString(),
            change: '+0',
            trend: 'up',
            icon: Package,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Vues totales',
            value: totalViews.toString(),
            change: '+0', // Placeholder
            trend: 'up',
            icon: Eye,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Contacts générés',
            value: contactsCount.toString(),
            change: '+0',
            trend: 'up',
            icon: MessageCircle,
            color: 'bg-green-100 text-green-600'
        }
    ];

    const recentProducts = actualProducts.slice(0, 5);

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de Bord</h1>
                <p className="text-gray-600">Bienvenue dans votre espace vendeur</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Link
                    to="/dashboard/products/new"
                    className="bg-[#000435] text-white rounded-2xl shadow-sm p-6 hover:bg-[#000435]/90 transition-all hover:shadow-md flex flex-col items-start"
                >
                    <Plus size={24} className="mb-3" />
                    <h3 className="text-lg font-bold mb-1">Ajouter un produit</h3>
                    <p className="text-sm text-white/80">Créez une nouvelle annonce</p>
                </Link>

                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Conseil pour vendre plus</h3>
                    <p className="text-sm text-gray-600">
                        Ajoutez des photos de haute qualité et une description détaillée pour attirer plus d'acheteurs potentiels.
                        Assurez-vous que vos informations de contact (WhatsApp, Téléphone) sont à jour dans les paramètres.
                    </p>
                </div>
            </div>

            {/* Recent Products */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Vos produits récents</h2>
                    <Link to="/dashboard/products" className="text-[#000435] hover:underline text-sm font-medium">
                        Voir tout →
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Image</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Titre</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Prix</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Catégorie</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentProducts?.length > 0 ? recentProducts?.map((product: any) => (
                                <tr key={product.listings_id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                                            {/* Image placeholder or component */}
                                            <Package className="w-full h-full p-2 text-gray-400" />
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{product.title}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{product.price} {product.currency}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{product.category_name}</td>
                                    <td className="py-4 px-4">
                                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Actif
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">
                                        Aucun produit trouvé. Commencez par en ajouter un !
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
