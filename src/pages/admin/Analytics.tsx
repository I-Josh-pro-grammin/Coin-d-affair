import { AdminLayout } from '@/components/admin/AdminLayout';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';

export default function Analytics() {
    const kpis = [
        {
            title: 'Revenus Totaux',
            value: '125.4M RWF',
            change: '+12.5%',
            icon: DollarSign,
            color: 'bg-green-100 text-green-600'
        },
        {
            title: 'Commandes',
            value: '3,456',
            change: '+8.2%',
            icon: ShoppingCart,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            title: 'Utilisateurs Actifs',
            value: '1,234',
            change: '+23.1%',
            icon: Users,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            title: 'Produits Publiés',
            value: '8,234',
            change: '+5.4%',
            icon: Package,
            color: 'bg-orange-100 text-orange-600'
        }
    ];

    return (
        <AdminLayout>
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Analyses</h1>
                    <p className="text-gray-600">Performances de la plateforme</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#000435] focus:border-transparent">
                    <option>7 derniers jours</option>
                    <option>30 derniers jours</option>
                    <option>90 derniers jours</option>
                    <option>Cette année</option>
                </select>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                                    <Icon size={24} />
                                </div>
                                <span className="text-green-600 text-sm font-medium">{kpi.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                            <p className="text-sm text-gray-600">{kpi.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm p-6 h-80 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Revenus</h3>
                    <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">Graphique des revenus (placeholder)</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6 h-80 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Nouveaux Utilisateurs</h3>
                    <div className="flex-1 bg-gray-50 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">Graphique des utilisateurs (placeholder)</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
