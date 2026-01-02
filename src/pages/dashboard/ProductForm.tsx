import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Save, ArrowLeft, Loader2 } from 'lucide-react';
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetListingQuery,
  useGetCategoriesQuery,
  useGetLocationsQuery
} from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import Loader from '@/components/common/Loader';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { user } = useAuth();

  const { data: productData, isLoading: isFetching } =
    useGetListingQuery(id!, { skip: !isEditing });

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isSaving = isAdding || isUpdating;

  const { data: categories } = useGetCategoriesQuery({});
  const { data: locationsData } = useGetLocationsQuery({});

  const [formData, setFormData] = useState({
    title: '',
    categoryId: '',
    subcategoryId: '',
    price: '',
    stock: '',
    condition: 'new',
    description: '',
    locationId: '',
    currency: 'BIF',
    isNegotiable: false,
    canDeliver: false
  });

  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<any[]>([]);

  /* ---------- Populate form when editing ---------- */
  useEffect(() => {
    if (!productData?.listing) return;

    const p = productData.listing;
    setFormData({
      title: p.title ?? '',
      categoryId: p.category_id ?? '',
      subcategoryId: p.subcategory_id ?? '',
      price: String(p.price ?? ''),
      stock: String(p.stock ?? ''),
      condition: p.condition ?? 'new',
      description: p.description ?? '',
      locationId: p.location_id ?? '',
      currency: p.currency ?? 'BIF',
      isNegotiable: Boolean(p.is_negotiable),
      canDeliver: Boolean(p.can_deliver)
    });

    setExistingImages(p.media ?? []);
  }, [productData?.listing]);

  /* ---------- Image handling ---------- */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(prev => [...prev, ...Array.from(e.target.files)]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  /* ---------- Verification guard ---------- */
  if (
    user?.account_type === 'business' &&
    user?.verification_status !== 'approved'
  ) {
    const isPending = user.verification_status === 'pending';

    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div
            className={`${isPending ? 'bg-yellow-100' : 'bg-red-100'
              } p-4 rounded-full mb-4`}
          >
            {isPending ? (
              <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
            ) : (
              <X className="w-8 h-8 text-red-600" />
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {isPending
              ? 'Compte en attente de validation'
              : 'Vérification refusée'}
          </h2>

          <p className="text-gray-600 max-w-md mb-6">
            {isPending
              ? "Votre compte vendeur est en cours d'examen."
              : 'Veuillez contacter le support.'}
          </p>

          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 border rounded-full"
          >
            Retour au tableau de bord
          </button>
        </div>
      </DashboardLayout>
    );
  }

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDt = new FormData();

    formDt.append('title', formData.title);
    formDt.append('categoryId', formData.categoryId);
    formDt.append('subcategoryId', formData.subcategoryId);
    formDt.append('price', String(Number(formData.price)));
    formDt.append('stock', String(Number(formData.stock)));
    formDt.append('condition', formData.condition);
    formDt.append('description', formData.description);
    formDt.append('locationId', formData.locationId);
    formDt.append('currency', formData.currency);
    formDt.append('isNegotiable', String(formData.isNegotiable));
    formDt.append('canDeliver', String(formData.canDeliver));

    images.forEach(img => formDt.append('images', img));

    console.log("DEBUG: Submitting product to:", import.meta.env.VITE_API_URL || "fallback");
    console.log("DEBUG: FormData values:");
    for (let [key, value] of formDt.entries()) {
      console.log(`- ${key}:`, value instanceof File ? `File(${value.name}, ${value.type})` : value);
    }

    try {
      if (isEditing) {
        await updateProduct({ productId: id!, formData: formDt }).unwrap();
      } else {
        await addProduct(formDt).unwrap();
      }
      navigate('/dashboard/products');
      window.location.reload();
      toast.success(isEditing ? 'Produit mis à jour avec succès' : 'Produit créé avec succès');
    } catch (err: any) {
      console.error('Product save error trace:', err);
      // Log more details if available
      if (err.data) console.error('Error data:', err.data);

      toast.error(err?.data?.message || 'Erreur lors de l\'enregistrement du produit');
    }
  };

  if (isFetching) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-[#000435]" />
        </div>
      </DashboardLayout>
    );
  }

  /* ---------- JSX unchanged below (safe) ---------- */


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
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#000435] transition-colors cursor-pointer">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Cliquez pour télécharger ou glissez-déposez</p>
            <p className="text-sm text-gray-500">PNG, JPG jusqu'à 10MB</p>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
            <label htmlFor="image-upload" className="absolute inset-0 cursor-pointer"></label>
          </div>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square bg-gray-100">
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <X size={16} />
                  </button>
                  <img src={URL.createObjectURL(img)} alt={`Preview ${index}`} className="w-full h-full rounded-lg object-cover" />
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
                  value={formData.categoryId}
                  onChange={(e) => {
                    console.log("DEBUG: Category changed to:", e.target.value);
                    setFormData({ ...formData, categoryId: e.target.value });
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {
                    categories?.categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  }
                  {/* <option value="">Sélectionner une catégorie</option>
                                    <option value="electronics">Électronique</option>
                                    <option value="home">Maison & Jardin</option>
                                    <option value="vehicles">Véhicules</option>
                                    <option value="fashion">Mode & Beauté</option>
                                    <option value="sports">Sports & Loisirs</option>
                                    <option value="books">Livres & Médias</option>
                                    <option value="toys">Jouets & Enfants</option>
                                    <option value="services">Services</option> */}
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
                  Prix (BIF) *
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
                value={formData.locationId}
                onChange={(e) => {
                  console.log("DEBUG: Location changed to:", e.target.value);
                  setFormData({ ...formData, locationId: e.target.value });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
              >
                <option value="">Sélectionner une ville / quartier</option>
                {locationsData?.locations?.map((loc: any) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
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
          <div
            className={`${isSaving ? 'bg-opacity-50 cursor-not-allowed ' : ''} bg-[#000435] flex-1 flex items-center justify-center gap-2 text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md hover:shadow-lg`}
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save size={20} />
            )}
            <button
              type='submit'
              disabled={isSaving}
            >
              {isSaving ? 'Chargement...' : (isEditing ? 'Mettre à jour' : 'Publier le produit')}
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

