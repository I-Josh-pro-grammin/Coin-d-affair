import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Save, Globe, Shield, CreditCard, Bell } from 'lucide-react';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        platformName: "Akaguriro",
        supportEmail: 'support@akaguriro.com',
        maintenanceMode: false,
        autoModeration: true,
        reportThreshold: 5,
        mobileMoney: true,
        cardPayments: true,
    });

    const handleChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
                <p className="text-gray-600">Configuration globale de la plateforme</p>
            </div>

            <div className="space-y-6 max-w-4xl">
                {/* General Settings */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Globe size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Général</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la plateforme</label>
                            <input
                                type="text"
                                value={settings.platformName}
                                onChange={(e) => handleChange('platformName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email support</label>
                            <input
                                type="email"
                                value={settings.supportEmail}
                                onChange={(e) => handleChange('supportEmail', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Security & Moderation */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                            <Shield size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Sécurité & Modération</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-semibold text-gray-900">Modération automatique</p>
                                <p className="text-sm text-gray-600">Filtrer automatiquement les contenus inappropriés</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.autoModeration}
                                    onChange={(e) => handleChange('autoModeration', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-semibold text-gray-900">Mode Maintenance</p>
                                <p className="text-sm text-gray-600">Rendre le site inaccessible aux utilisateurs</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.maintenanceMode}
                                    onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Seuil de signalements (avant masquage auto)</label>
                            <input
                                type="number"
                                value={settings.reportThreshold}
                                onChange={(e) => handleChange('reportThreshold', Number(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Payments */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <CreditCard size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Paiements</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-semibold text-gray-900">Mobile Money (MTN/Airtel)</p>
                                <p className="text-sm text-gray-600">Activer les paiements mobiles</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.mobileMoney}
                                    onChange={(e) => handleChange('mobileMoney', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                                <p className="font-semibold text-gray-900">Cartes Bancaires</p>
                                <p className="text-sm text-gray-600">Visa, Mastercard</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.cardPayments}
                                    onChange={(e) => handleChange('cardPayments', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#000435]"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-4">
                    <button className="flex items-center gap-2 bg-[#000435] text-white px-8 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-lg hover:shadow-xl">
                        <Save size={20} />
                        Enregistrer les modifications
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
