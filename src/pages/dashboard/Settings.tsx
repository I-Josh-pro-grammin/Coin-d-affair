import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import {
    Store,
    User,
    Lock,
    // Bell removed
    Save,
    Upload,
    Eye,
    EyeOff
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useUpdateProfileMutation, useUpdateBusinessMutation, useGetBusinessProfileQuery, useGetCurrentUserQuery } from '@/redux/api/apiSlice';
import { toast } from 'sonner';

export default function Settings() {
    const [activeTab, setActiveTab] = useState('shop');
    const [contactEmail, setContactEmail] = useState('');
    const [whatsappPhone, setWhatsappPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [updateProfile, { isLoading: isProfileLoading }] = useUpdateProfileMutation();
    const [updateBusiness, { isLoading: isBusinessLoading }] = useUpdateBusinessMutation();
    const { data: user } = useGetCurrentUserQuery();
    const { data: business } = useGetBusinessProfileQuery();

    const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
        };

        try {
            await updateProfile(data).unwrap();
            toast.success('Profil mis à jour avec succès');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Erreur lors de la mise à jour du profil');
        }
    };

    const handleBusinessUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const businessData = {
            business_name: formData.get('businessName'),
            contact_phone: formData.get('phone'),
            contact_email: formData.get('contactEmail'),
        };

        const userData = {
            sellerWhatsapp: formData.get('whatsapp'),
            sellerContactEmail: formData.get('contactEmail'),
            phone: formData.get('phone'), // keep phone synced
        };

        try {
            await Promise.all([
                updateBusiness(businessData).unwrap(),
                updateProfile(userData).unwrap()
            ]);
            toast.success('Informations de la boutique mises à jour');
        } catch (error: any) {
            toast.error(error?.data?.message || 'Erreur lors de la mise à jour de la boutique');
        }
    };

    const tabs = [
        { id: 'shop', label: 'Ma Boutique', icon: Store },
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'security', label: 'Sécurité', icon: Lock },

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

                            <form className="space-y-6" onSubmit={handleBusinessUpdate}>
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
                                        name="businessName"
                                        defaultValue={business?.business?.business_name}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Description
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        defaultValue={user?.shop?.description}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all resize-none"
                                    />
                                </div> */}

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email de contact
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue={user?.user?.email}
                                            onChange={(e) => setContactEmail(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Numéro de téléphone (Appel)
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            placeholder="+257..."
                                            defaultValue={user?.user?.phone}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Numéro WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            name="whatsapp"
                                            placeholder="+257..."
                                            defaultValue={user?.user?.seller_whatsapp}
                                            onChange={(e) => setWhatsappPhone(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email de Contact (Affiché publiquement)
                                        </label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            placeholder="...@gmail.com"
                                            defaultValue={user?.user?.seller_contact_email || business?.business?.contact_email}
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
                                        defaultValue="Bujumbura, Burundi"
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

                            <form className="space-y-6" onSubmit={handleProfileUpdate}>
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
                                            Nom complet
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            defaultValue={user?.user?.full_name}
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
                                            disabled
                                            defaultValue={user?.user?.email}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            defaultValue={user?.user?.phone}
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




                </div>
            </div>
        </DashboardLayout>
    );
}
