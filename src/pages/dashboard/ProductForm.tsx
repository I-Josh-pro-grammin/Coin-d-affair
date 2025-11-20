import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft } from 'lucide-react';

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        stock: '',
        condition: 'new',
        description: '',
        location: '',
        status: 'active'
    });

    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData, images);
        // Add API call here
        navigate('/dashboard/products');
    };

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/dashboard/products')}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#000435] mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Retour aux produits
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                    {isEditing ? 'Modifier le produit' : 'Ajouter un produit'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                {/* Images Upload */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Images du produit</h2>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#000435] transition-colors cursor-pointer">
                        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">Cliquez pour télécharger ou glissez-déposez</p>
                        <p className="text-sm text-gray-500">PNG, JPG jusqu'à 10MB</p>
                        <input type="file" multiple accept="image/*" className="hidden" />
                    </div>

                    {/* Image Preview Grid */}
                    {images.length > 0 && (
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {images.map((img, index) => (
                                <div key={index} className="relative aspect-square bg-gray-100 rounded-lg">
                                    <button className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations de base</h2>

                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Titre du produit *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Ex: iPhone 13 Pro 256GB"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Category & Condition */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Catégorie *
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                >
                                    <option value="">Sélectionner une catégorie</option>
                                    <option value="electronics">Électronique</option>
                                    <option value="home">Maison & Jardin</option>
                                    <option value="vehicles">Véhicules</option>
                                    <option value="fashion">Mode & Beauté</option>
                                    <option value="sports">Sports & Loisirs</option>
                                    <option value="books">Livres & Médias</option>
                                    <option value="toys">Jouets & Enfants</option>
                                    <option value="services">Services</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    État *
                                </label>
                                <select
                                    required
                                    value={formData.condition}
                                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                >
                                    <option value="new">Neuf</option>
                                    <option value="likenew">Comme neuf</option>
                                    <option value="good">Bon état</option>
                                    <option value="acceptable">État acceptable</option>
                                </select>
                            </div>
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prix (RWF) *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    placeholder="50000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stock disponible *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    placeholder="10"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Localisation *
                            </label>
                            <select
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                            >
                                <option value="">Sélectionner une ville</option>
                                <option value="kigali">Kigali</option>
                                <option value="butare">Butare</option>
                                <option value="gisenyi">Gisenyi</option>
                                <option value="ruhengeri">Ruhengeri</option>
                                <option value="cyangugu">Cyangugu</option>
                            </select>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Décrivez votre produit en détail..."
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all resize-none"
                            />
                            <p className="text-sm text-gray-500 mt-2">Minimum 50 caractères</p>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Statut
                            </label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        checked={formData.status === 'active'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-4 h-4 text-[#000435] focus:ring-[#000435]"
                                    />
                                    <span className="text-gray-700">Actif</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        checked={formData.status === 'inactive'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-4 h-4 text-[#000435] focus:ring-[#000435]"
                                    />
                                    <span className="text-gray-700">Inactif</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/products')}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg"
                    >
                        <Save size={20} />
                        {isEditing ? 'Mettre à jour' : 'Publier le produit'}
                    </button>
                </div>
            </form>
        </DashboardLayout>
    );
}
