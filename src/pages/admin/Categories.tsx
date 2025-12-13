import { AdminLayout } from '@/components/admin/AdminLayout';
import { useState } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    FolderTree,
    ChevronRight,
    Save,
    X,
    Search
} from 'lucide-react';
import { toast } from 'sonner';

export default function Categories() {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        nameFr: '',
        icon: '',
        description: '',
        parentId: null as number | null
    });

    // Mock categories data
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Electronics',
            nameFr: 'Électronique',
            icon: '📱',
            productCount: 245,
            subcategories: [
                { id: 11, name: 'Phones & Tablets', nameFr: 'Téléphones & Tablettes', productCount: 89 },
                { id: 12, name: 'Computers', nameFr: 'Ordinateurs', productCount: 67 },
                { id: 13, name: 'TV & Audio', nameFr: 'TV & Audio', productCount: 45 },
            ]
        },
        {
            id: 2,
            name: 'Home & Garden',
            nameFr: 'Maison & Jardin',
            icon: '🏠',
            productCount: 189,
            subcategories: [
                { id: 21, name: 'Furniture', nameFr: 'Meubles', productCount: 78 },
                { id: 22, name: 'Home Appliances', nameFr: 'Électroménager', productCount: 56 },
            ]
        },
        {
            id: 3,
            name: 'Vehicles',
            nameFr: 'Véhicules',
            icon: '🚗',
            productCount: 156,
            subcategories: []
        },
        {
            id: 4,
            name: 'Fashion & Beauty',
            nameFr: 'Mode & Beauté',
            icon: '👗',
            productCount: 312,
            subcategories: []
        },
    ]);

    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    const toggleExpand = (id: number) => {
        setExpandedCategories(prev =>
            prev.includes(id) ? prev.filter(catId => catId !== id) : [...prev, id]
        );
    };

    const handleCreateCategory = () => {
        setEditingCategory(null);
        setFormData({ name: '', nameFr: '', icon: '', description: '', parentId: null });
        setShowModal(true);
    };

    const handleEditCategory = (category: any) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            nameFr: category.nameFr,
            icon: category.icon,
            description: category.description || '',
            parentId: category.parentId || null
        });
        setShowModal(true);
    };



    // ... (existing state)

    const handleDeleteCategory = (category: any) => {
        const message = category.productCount > 0
            ? `Cette catégorie contient ${category.productCount} produits. Êtes-vous sûr de vouloir la supprimer ?`
            : 'Êtes-vous sûr de vouloir supprimer cette catégorie ?';

        if (confirm(message)) {
            setCategories(prev => prev.filter(cat => cat.id !== category.id));
            toast.success("Catégorie supprimée avec succès");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            // Update existing category
            setCategories(prev =>
                prev.map(cat => cat.id === editingCategory.id ? { ...cat, ...formData } : cat)
            );
            toast.success("Catégorie mise à jour avec succès");
        } else {
            // Create new category
            const newCategory = {
                id: Date.now(),
                ...formData,
                productCount: 0,
                subcategories: []
            };
            setCategories(prev => [...prev, newCategory]);
            toast.success("Catégorie créée avec succès");
        }
        setShowModal(false);
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Catégories</h1>
                    <p className="text-gray-600">{categories.length} catégories principales</p>
                </div>
                <button
                    onClick={handleCreateCategory}
                    className="flex items-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg"
                >
                    <Plus size={20} />
                    Nouvelle Catégorie
                </button>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Rechercher une catégorie..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {categories.map((category) => (
                        <div key={category.id}>
                            {/* Main Category */}
                            <div className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        {/* Expand Button */}
                                        {category.subcategories.length > 0 && (
                                            <button
                                                onClick={() => toggleExpand(category.id)}
                                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            >
                                                <ChevronRight
                                                    size={20}
                                                    className={`text-gray-600 transition-transform ${expandedCategories.includes(category.id) ? 'rotate-90' : ''
                                                        }`}
                                                />
                                            </button>
                                        )}

                                        {/* Icon */}
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                                            {category.icon}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-gray-900">{category.nameFr}</h3>
                                                <span className="text-sm text-gray-500">({category.name})</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {category.productCount} produits
                                                {category.subcategories.length > 0 && ` • ${category.subcategories.length} sous-catégories`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditCategory(category)}
                                            className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(category)}
                                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Subcategories */}
                            {expandedCategories.includes(category.id) && category.subcategories.length > 0 && (
                                <div className="bg-gray-50 border-t border-gray-200">
                                    {category.subcategories.map((sub: any) => (
                                        <div key={sub.id} className="pl-20 pr-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-4 flex-1">
                                                <FolderTree size={18} className="text-gray-400" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{sub.nameFr}</p>
                                                    <p className="text-sm text-gray-600">{sub.productCount} produits</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-gray-600 hover:text-[#000435] hover:bg-gray-200 rounded-lg transition-colors">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                            </h2>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* French Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom (Français) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.nameFr}
                                    onChange={(e) => setFormData({ ...formData, nameFr: e.target.value })}
                                    placeholder="Ex: Électronique"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                />
                            </div>

                            {/* English Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nom (Anglais) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ex: Electronics"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Icon (Emoji) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Icône (Emoji) *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="📱"
                                    maxLength={2}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all text-2xl"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Utilisez un emoji. Ex: 📱, 🏠, 🚗, 👗
                                </p>
                            </div>

                            {/* Parent Category (for subcategories) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Catégorie parente (optionnel)
                                </label>
                                <select
                                    value={formData.parentId || ''}
                                    onChange={(e) => setFormData({ ...formData, parentId: e.target.value ? Number(e.target.value) : null })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                >
                                    <option value="">Aucune (catégorie principale)</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nameFr}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Laissez vide pour une catégorie principale
                                </p>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description (optionnel)
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Description de la catégorie..."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all resize-none"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg"
                                >
                                    <Save size={20} />
                                    {editingCategory ? 'Mettre à jour' : 'Créer'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
