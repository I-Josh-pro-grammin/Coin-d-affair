import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import {
    Store,
    User,
    Lock,
    Bell,
    CreditCard,
    Truck,
    Save,
    Upload,
    Eye,
    EyeOff
} from 'lucide-react';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('shop');
    const [showPassword, setShowPassword] = useState(false);

    const tabs = [
        { id: 'shop', label: 'Ma Boutique', icon: Store },
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'security', label: 'Sécurité', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'payment', label: 'Paiements', icon: CreditCard },
        { id: 'shipping', label: 'Livraison', icon: Truck },
    ];

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
                <p className="text-gray-600">Gérez les paramètres de votre boutique</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm p-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === tab.id
                                            ? 'bg-[#000435] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span className="font-medium">{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    {/* Shop Settings */}
                    {activeTab === 'shop' && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de la boutique</h2>

                            <form className="space-y-6">
                                {/* Shop Logo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Logo de la boutique
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-[#000435] rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                                            MB
                                        </div>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-[#000435] text-[#000435] rounded-lg hover:bg-[#000435] hover:text-white transition-all"
                                        >
                                            <Upload size={18} />
                                            Changer le logo
                                        </button>
                                    </div>
                                </div>

                                {/* Shop Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nom de la boutique
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Ma Boutique"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        defaultValue="Bienvenue dans ma boutique! Nous proposons des produits de qualité..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email de contact
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="contact@maboutique.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            defaultValue="+250 788 123 456"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Kigali, Rwanda"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Save Button */}
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all"
                                >
                                    <Save size={20} />
                                    Enregistrer les modifications
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Profile Settings */}
                    {activeTab === 'profile' && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Informations personnelles</h2>

                            <form className="space-y-6">
                                {/* Profile Photo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Photo de profil
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                                            <User size={32} className="text-gray-400" />
                                        </div>
                                        <button
                                            type="button"
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-[#000435] text-[#000435] rounded-lg hover:bg-[#000435] hover:text-white transition-all"
                                        >
                                            <Upload size={18} />
                                            Changer la photo
                                        </button>
                                    </div>
                                </div>

                                {/* Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Jean"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Vendeur"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="jean.vendeur@email.com"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            defaultValue="+250 788 123 456"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all"
                                >
                                    <Save size={20} />
                                    Enregistrer les modifications
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité</h2>

                            <form className="space-y-6">
                                {/* Current Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mot de passe actuel
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmer le nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all"
                                >
                                    <Save size={20} />
                                    Mettre à jour le mot de passe
                                </button>
                            </form>

                            {/* Two-Factor Authentication */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-4">Authentification à deux facteurs</h3>
                                <p className="text-gray-600 mb-4">
                                    Ajoutez une couche de sécurité supplémentaire à votre compte
                                </p>
                                <button className="px-6 py-3 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-[#000435] hover:text-white transition-all">
                                    Activer 2FA
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Notifications */}
                    {activeTab === 'notifications' && (
                        <div className="bg-white rounded-2xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Préférences de notifications</h2>

                            <div className="space-y-6">
                                {[
                                    { id: 'orders', label: 'Nouvelles commandes', description: 'Recevoir une notification pour chaque nouvelle commande' },
                                    { id: 'messages', label: 'Messages clients', description: 'Notification quand un client vous envoie un message' },
                                    { id: 'reviews', label: 'Nouveaux avis', description: 'Notification quand vous recevez un nouvel avis' },
                                    { id: 'stock', label: 'Stock faible', description: 'Alerte quand un produit est en rupture de stock' },
                                    { id: 'promotions', label: 'Promotions et actualités', description: 'Recevoir des informations sur les nouvelles fonctionnalités' },
                                ].map((notif) => (
                                    <div key={notif.id} className="flex items-start justify-between pb-6 border-b border-gray-100 last:border-0">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 mb-1">{notif.label}</h3>
                                            <p className="text-sm text-gray-600">{notif.description}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="submit"
                                className="flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all mt-6"
                            >
                                <Save size={20} />
                                Enregistrer les préférences
                            </button>
                        </div>
                    )}

                    {/* Payment & Shipping - Placeholder for other tabs */}
                    {(activeTab === 'payment' || activeTab === 'shipping') && (
                        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {activeTab === 'payment' ? 'Paramètres de paiement' : 'Paramètres de livraison'}
                            </h3>
                            <p className="text-gray-600">Cette section sera bientôt disponible</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
