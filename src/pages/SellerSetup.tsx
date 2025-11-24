import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Tag, Building, ArrowRight, Check } from 'lucide-react';

export default function SellerSetup() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Save business info and redirect to dashboard
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                <Check size={20} />
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700">Compte créé</span>
                        </div>
                        <div className="w-16 h-1 bg-[#000435]"></div>
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#000435] rounded-full flex items-center justify-center text-white font-bold">
                                2
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-900">Configuration boutique</span>
                        </div>
                    </div>
                </div>

                {/* Setup Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configurez votre boutique</h1>
                        <p className="text-gray-600">Quelques informations pour terminer votre inscription</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Business Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                <Building className="inline mr-2" size={18} />
                                Type d'entreprise *
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="businessType" value="individual" required className="peer sr-only" />
                                    <div className="border-2 border-gray-300 rounded-xl p-4 text-center peer-checked:border-[#000435] peer-checked:bg-blue-50 transition-all hover:border-gray-400">
                                        <p className="font-semibold text-gray-900">Individu</p>
                                        <p className="text-xs text-gray-600 mt-1">Vendeur particulier</p>
                                    </div>
                                </label>
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="businessType" value="business" required className="peer sr-only" />
                                    <div className="border-2 border-gray-300 rounded-xl p-4 text-center peer-checked:border-[#000435] peer-checked:bg-blue-50 transition-all hover:border-gray-400">
                                        <p className="font-semibold text-gray-900">Entreprise</p>
                                        <p className="text-xs text-gray-600 mt-1">Société enregistrée</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Shop Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Store className="inline mr-2" size={18} />
                                Nom de la boutique *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ex: Ma Super Boutique"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Tag className="inline mr-2" size={18} />
                                Catégories de produits * (sélectionnez au moins une)
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    'Électronique',
                                    'Maison & Jardin',
                                    'Véhicules',
                                    'Mode & Beauté',
                                    'Sports & Loisirs',
                                    'Livres & Médias',
                                    'Jouets & Enfants',
                                    'Services'
                                ].map((category) => (
                                    <label key={category} className="relative cursor-pointer">
                                        <input type="checkbox" name="categories" value={category} className="peer sr-only" />
                                        <div className="border-2 border-gray-300 rounded-lg p-3 text-sm peer-checked:border-[#000435] peer-checked:bg-blue-50 transition-all hover:border-gray-400">
                                            {category}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <MapPin className="inline mr-2" size={18} />
                                Ville *
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                            >
                                <option value="">Sélectionnez votre ville</option>
                                <option value="kigali">Kigali</option>
                                <option value="butare">Butare</option>
                                <option value="gisenyi">Gisenyi</option>
                                <option value="ruhengeri">Ruhengeri</option>
                                <option value="cyangugu">Cyangugu</option>
                            </select>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Adresse de la boutique *
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="123 Rue Example"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#000435] text-white py-4 px-6 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                            Terminer la configuration
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Vous pourrez modifier ces informations plus tard dans les paramètres
                    </p>
                </div>
            </div>
        </div>
    );
}
