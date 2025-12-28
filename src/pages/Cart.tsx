import { useState, useMemo } from 'react';
import { useGetCartQuery, useRemoveItemFromCartMutation } from '@/redux/api/apiSlice';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingBag, Phone, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Loader from '@/components/common/Loader';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Cart = () => {
    const { user } = useAuth();
    // Assuming user might share a cart ID or we fetch it from local storage/context? 
    // For now, let's assume we fetch by user ID or a stored cart ID. 
    // Since the API requires cartId, we need to know where it comes from.
    // Usually it's in a context or derived from user. 
    // If not, we might need to adjust, but let's assume we have a way or user has one.
    // For this implementation, I'll assume we might need to fetch a cart by user if possible, 
    // or we store cart_id in local storage.

    // TEMPORARY: Attempt to get cart_id from localStorage if available, or user?
    // The backend `getCart` takes `cart_id`. 
    // The `createCart` return it. 
    // Let's assume we store it.
    const cartId = localStorage.getItem('cart_id');

    const { data, isLoading, refetch } = useGetCartQuery(cartId, { skip: !cartId });
    const [removeItem, { isLoading: isRemoving }] = useRemoveItemFromCartMutation();
    const [selectedSeller, setSelectedSeller] = useState<any>(null);

    const cartItems = data?.items || [];

    // Group items by seller
    const groupedItems = useMemo(() => {
        const groups: Record<string, any> = {};

        cartItems.forEach((item: any) => {
            const sellerId = item.seller_id;
            if (!groups[sellerId]) {
                groups[sellerId] = {
                    seller: {
                        id: sellerId,
                        name: item.business_name || item.seller_name,
                        email: item.seller_email,
                        phone: item.seller_phone,
                        whatsapp: item.seller_whatsapp
                    },
                    items: [],
                    total: 0
                };
            }
            groups[sellerId].items.push(item);
            groups[sellerId].total += Number(item.current_price) * item.quantity;
        });

        return Object.values(groups);
    }, [cartItems]);

    const handleRemoveItem = async (cartItemId: string) => {
        try {
            await removeItem(cartItemId).unwrap();
            toast.success("Article retiré du panier");
            refetch();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price); // Default to EUR or item currency
    };

    if (isLoading) return <Loader />;

    if (!cartId || cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
                        <div className="w-16 h-16 bg-blue-50 text-[#000435] rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag size={32} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h2>
                        <p className="text-gray-500 mb-6">Découvrez nos produits et trouvez votre bonheur.</p>
                        <Link to="/boutique">
                            <Button className="bg-[#000435] text-white rounded-full px-8">
                                Aller à la boutique
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Votre Panier</h1>

                <div className="space-y-6">
                    {/* Seller Groups */}
                    {groupedItems.map((group: any) => (
                        <div key={group.seller.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                            {/* Seller Header */}
                            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <div>
                                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Vendu par</span>
                                    <h3 className="text-lg font-bold text-[#000435]">{group.seller.name}</h3>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="bg-[#000435] hover:bg-[#020657] text-white rounded-full"
                                            onClick={() => setSelectedSeller(group.seller)}
                                        >
                                            Contacter le vendeur
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Contacter {group.seller.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <p className="text-sm text-gray-500 mb-4">
                                                Pour finaliser votre commande, veuillez contacter le vendeur directement via l'un des moyens ci-dessous.
                                            </p>

                                            {group.seller.phone && (
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                                            <Phone size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">Téléphone</p>
                                                            <p className="text-sm text-gray-500">{group.seller.phone}</p>
                                                        </div>
                                                    </div>
                                                    <a href={`tel:${group.seller.phone}`} className="text-[#000435] text-sm font-medium hover:underline">Appeler</a>
                                                </div>
                                            )}

                                            {group.seller.whatsapp && (
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                                            <MessageCircle size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">WhatsApp</p>
                                                            <p className="text-sm text-gray-500">{group.seller.whatsapp}</p>
                                                        </div>
                                                    </div>
                                                    <a href={`https://wa.me/${group.seller.whatsapp.replace(/\+/g, '')}?text=Bonjour, je suis intéressé par vos produits sur Akaguriro.`} target="_blank" rel="noopener noreferrer" className="text-[#000435] text-sm font-medium hover:underline">Discuter</a>
                                                </div>
                                            )}

                                            {group.seller.email && (
                                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                                            <Mail size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">Email</p>
                                                            <p className="text-sm text-gray-500">{group.seller.email}</p>
                                                        </div>
                                                    </div>
                                                    <a href={`mailto:${group.seller.email}?subject=Commande Akaguriro`} className="text-[#000435] text-sm font-medium hover:underline">Envoyer</a>
                                                </div>
                                            )}

                                            {!group.seller.phone && !group.seller.whatsapp && !group.seller.email && (
                                                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
                                                    Ce vendeur n'a pas encore renseigné ses informations de contact.
                                                </div>
                                            )}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Items List */}
                            <div className="divide-y divide-gray-100">
                                {group.items.map((item: any) => (
                                    <div key={item.cart_item_id} className="p-6 flex gap-4 sm:gap-6">
                                        {/* Product Image */}
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                            {item.image_url ? (
                                                <img src={item.image_url.startsWith('http') ? item.image_url : `https://coin-d-affair-backend.onrender.com/${item.image_url.replace(/\\/g, '/')}`} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <ShoppingBag size={24} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <Link to={`/produit/${item.listings_id}`} className="font-medium text-gray-900 hover:text-[#000435] line-clamp-2 mb-1">
                                                    {item.title}
                                                </Link>
                                                <p className="text-[#000435] font-bold">
                                                    {formatPrice(item.current_price)}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                                    <span>Quantité: {item.quantity}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item.cart_item_id)}
                                                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                                                    title="Retirer du panier"
                                                    disabled={isRemoving}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Seller Total */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                <span className="font-medium text-gray-600">Total pour ce vendeur</span>
                                <span className="text-xl font-bold text-[#000435]">{formatPrice(group.total)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
