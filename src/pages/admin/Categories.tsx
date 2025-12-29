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
import {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useCreateSubCategoryMutation
} from '@/redux/api/apiSlice';
import { RouteFallback } from '@/components/common/RouteFallback';

export default function Categories() {
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        nameFr: '',
        // icon removed from state
        description: '',
        parentId: null as number | null
    });

    const { data: categoriesData, isLoading, refetch } = useGetCategoriesQuery({});
    const [createCategory] = useCreateCategoryMutation();
    const [createSubCategory] = useCreateSubCategoryMutation();

    const categories = categoriesData?.categories || [];
    const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

    if (isLoading) return <RouteFallback />;

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

    const handleDeleteCategory = (category: any) => {
        toast.error("Suppression non implémentée dans l'API pour le moment");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                toast.error("Modification non implémentée dans l'API pour le moment");
            } else {
                if (formData.parentId) {
                    await createSubCategory({
                        category_id: formData.parentId,
                        name: formData.name,
                        name_fr: formData.nameFr,
                    }).unwrap();
                } else {
                    await createCategory({
                        name: formData.name,
                        name_fr: formData.nameFr,
                        icon: '📁', // Default icon as ui input is removed
                        description: formData.description
                    }).unwrap();
                }
                toast.success("Catégorie créée avec succès");
                refetch();
            }
            setShowModal(false);
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement");
        }
    };

    return (
        <AdminLayout>
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

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                    {categories.map((category: any) => (
                        <div key={category.id}>
                            <div className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 flex-1">
                                        {category.subcategories?.length > 0 && (
                                            <button
                                                onClick={() => toggleExpand(category.id)}
                                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                            >
                                                <ChevronRight
                                                    size={20}
                                                    className={`text-gray-600 transition-transform ${expandedCategories.includes(category.id) ? 'rotate-90' : ''}`}
                                                />
                                            </button>
                                        )}
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                                            {category.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-gray-900">{category.nameFr}</h3>
                                                <span className="text-sm text-gray-500">({category.name})</span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {category.productCount || 0} produits
                                                {category.subcategories?.length > 0 && ` • ${category.subcategories.length} sous-catégories`}
                                            </p>
                                        </div>
                                    </div>
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

                            {expandedCategories.includes(category.id) && category.subcategories?.length > 0 && (
                                <div className="bg-gray-50 border-t border-gray-200">
                                    {category.subcategories.map((sub: any) => (
                                        <div key={sub.id} className="pl-20 pr-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-4 flex-1">
                                                <FolderTree size={18} className="text-gray-400" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{sub.nameFr}</p>
                                                    <p className="text-sm text-gray-600">{sub.productCount || 0} produits</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

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

                            {/* Icon field removed as requested */}

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
                                    {categories.map((cat: any) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.nameFr}
                                        </option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">
                                    Laissez vide pour une catégorie principale
                                </p>
                            </div>

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
