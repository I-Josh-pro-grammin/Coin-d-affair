import { AdminLayout } from '@/components/admin/AdminLayout';
import { Bell, Info, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for admin notifications
const mockNotifications = [
    {
        id: 1,
        type: 'alert',
        title: 'Nouveau rapport de signalement',
        message: 'Un utilisateur a signalé le produit "iPhone 15" pour contenu inapproprié.',
        time: 'Il y a 10 min',
        read: false
    },
    {
        id: 2,
        type: 'success',
        title: 'Vente record atteinte',
        message: 'Le volume des ventes a dépassé 1M BIF aujourd\'hui !',
        time: 'Il y a 2 heures',
        read: false
    },
    {
        id: 3,
        type: 'info',
        title: 'Maintenance prévue',
        message: 'Une maintenance serveur est programmée pour ce soir à 03h00.',
        time: 'Il y a 5 heures',
        read: true
    },
    {
        id: 4,
        type: 'warning',
        title: 'Stock faible',
        message: 'Plusieurs produits de la catégorie "Électronique" sont en rupture de stock.',
        time: 'Hier',
        read: true
    }
];

export default function AdminNotifications() {
    return (
        <AdminLayout>
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
                    <p className="text-gray-600">Gérez les alertes et messages du système</p>
                </div>
                <Button variant="outline" className="rounded-full">
                    Tout marquer comme lu
                </Button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {mockNotifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-6 flex gap-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
                                ${notif.type === 'alert' ? 'bg-red-100 text-red-600' :
                                    notif.type === 'success' ? 'bg-green-100 text-green-600' :
                                        notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                            'bg-blue-100 text-blue-600'}`}
                            >
                                {notif.type === 'alert' ? <AlertTriangle size={20} /> :
                                    notif.type === 'success' ? <CheckCircle size={20} /> :
                                        notif.type === 'warning' ? <Bell size={20} /> :
                                            <Info size={20} />}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-semibold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                        {notif.title}
                                    </h3>
                                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notif.time}</span>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                                    {notif.message}
                                </p>
                            </div>

                            <div className="flex items-center">
                                {!notif.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mx-2"></div>
                                )}
                                <button className="text-gray-400 hover:text-gray-600 p-1">
                                    <X size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {mockNotifications.length === 0 && (
                    <div className="p-12 text-center">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">Aucune notification</h3>
                        <p className="text-gray-500">Vous êtes à jour !</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
