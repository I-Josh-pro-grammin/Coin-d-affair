import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { User, Package, Heart, Settings, LogOut, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Profile() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    if (!user) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-[60vh]">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Veuillez vous connecter</h1>
                        <Link to="/auth/login" className="text-[#000435] hover:underline">
                            Aller à la page de connexion
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">
                                    {user.fullName.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900">{user.fullName}</h2>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'profile' ? 'bg-[#000435] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <User size={20} />
                                    Informations personnelles
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'orders' ? 'bg-[#000435] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Package size={20} />
                                    Mes commandes
                                </button>
                                <Link
                                    to="/favoris"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-gray-700 hover:bg-gray-100"
                                >
                                    <Heart size={20} />
                                    Mes favoris
                                </Link>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === 'settings' ? 'bg-[#000435] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                                >
                                    <Settings size={20} />
                                    Paramètres
                                </button>
                                <button
                                    onClick={logout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left text-red-600 hover:bg-red-50"
                                >
                                    <LogOut size={20} />
                                    Déconnexion
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Informations personnelles</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input type="text" defaultValue={user.fullName} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input type="email" defaultValue={user.email} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input type="tel" defaultValue={user.phone || ''} placeholder="+250..." className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                                <input type="text" placeholder="Votre adresse" className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all">
                                        Enregistrer les modifications
                                    </button>
                                </form>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Mes commandes</h2>
                                <div className="text-center py-12 text-gray-500">
                                    <Package size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>Vous n'avez pas encore passé de commande</p>
                                    <Link to="/" className="text-[#000435] font-medium hover:underline mt-2 inline-block">
                                        Commencer vos achats
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Paramètres du compte</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Notifications</h3>
                                            <p className="text-sm text-gray-500">Recevoir des emails sur vos commandes</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                                        <div>
                                            <h3 className="font-medium text-gray-900">Newsletter</h3>
                                            <p className="text-sm text-gray-500">Recevoir nos offres promotionnelles</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                                        </label>
                                    </div>
                                    <div className="pt-4">
                                        <button className="text-red-600 font-medium hover:text-red-700">
                                            Supprimer mon compte
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
