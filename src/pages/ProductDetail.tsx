import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/common/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getSimilarProducts } from '@/data/mockProducts';
import { currencyFmt } from '@/lib/utils';
import {
    ShoppingCart,
    Heart,
    Share2,
    MapPin,
    Star,
    MessageCircle,
    ChevronRight,
    Shield,
    Truck,
    RotateCcw
} from 'lucide-react';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

    const product = id ? getProductById(id) : undefined;
    const similarProducts = id ? getSimilarProducts(parseInt(id)) : [];

    if (!product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
                    <Link to="/" className="text-[#000435] hover:underline">
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        );
    }

    // Mock images (in real app, product would have multiple images)
    const images = [product.image, product.image, product.image];

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            image: product.image
        });
    };

    const handleBuyNow = () => {
        navigate(`/acheter/${product.id}`);
    };

    const handleContactSeller = () => {
        navigate(`/messages?product=${product.id}&seller=${product.seller.id}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <Link to="/" className="hover:text-[#000435]">Accueil</Link>
                    <ChevronRight size={16} />
                    <Link to="/boutique" className="hover:text-[#000435]">{product.category}</Link>
                    <ChevronRight size={16} />
                    <span className="text-gray-900">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* Thumbnails */}
                        <div className="grid grid-cols-3 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`relative aspect-square overflow-hidden rounded-xl bg-gray-100 border-2 transition-all ${selectedImage === idx ? 'border-[#000435]' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} ${idx + 1}`}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        {/* Title & Price */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <div className="flex items-baseline gap-4 mb-6">
                            <p className="text-4xl font-bold text-[#000435]">{currencyFmt(product.price)}</p>
                            {product.badge === 'Promo' && (
                                <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                                    En promotion
                                </span>
                            )}
                        </div>

                        {/* Condition & Location */}
                        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">État</p>
                                <p className="font-semibold text-gray-900">{product.condition}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-gray-400" />
                                <p className="text-gray-700">{product.location}</p>
                            </div>
                        </div>

                        {/* Seller Card */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Vendeur</p>
                                    <p className="font-semibold text-gray-900">{product.seller.name}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold">{product.seller.rating}</span>
                                    <span className="text-sm text-gray-600">({product.seller.totalSales} ventes)</span>
                                </div>
                            </div>
                            <button
                                onClick={handleContactSeller}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-[#000435] text-[#000435] rounded-full hover:bg-[#000435] hover:text-white transition-all font-medium"
                            >
                                <MessageCircle size={18} />
                                Contacter le vendeur
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 mb-6">
                            <button
                                onClick={handleBuyNow}
                                className="w-full py-4 px-6 bg-[#000435] text-white font-bold rounded-full hover:bg-[#000435]/90 transition-all text-lg"
                            >
                                Acheter maintenant
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 px-6 border-2 border-[#000435] text-[#000435] font-bold rounded-full hover:bg-[#000435] hover:text-white transition-all text-lg flex items-center justify-center gap-2"
                                aria-label="Ajouter au panier"
                            >
                                <ShoppingCart size={20} />
                                Ajouter au panier
                            </button>
                            <div className="flex gap-3">
                                <button
                                    className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[#000435] hover:text-[#000435] transition-all font-medium flex items-center justify-center gap-2"
                                    aria-label="Ajouter aux favoris"
                                >
                                    <Heart size={18} />
                                    Favoris
                                </button>
                                <button
                                    className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[#000435] hover:text-[#000435] transition-all font-medium flex items-center justify-center gap-2"
                                    aria-label="Partager"
                                >
                                    <Share2 size={18} />
                                    Partager
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div className="text-center">
                                <Shield className="w-8 h-8 mx-auto mb-2 text-[#000435]" />
                                <p className="text-xs text-gray-600">Paiement sécurisé</p>
                            </div>
                            <div className="text-center">
                                <Truck className="w-8 h-8 mx-auto mb-2 text-[#000435]" />
                                <p className="text-xs text-gray-600">Livraison rapide</p>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-[#000435]" />
                                <p className="text-xs text-gray-600">Retour facile</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-12">
                    {/* Tab Headers */}
                    <div className="flex gap-8 border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab('details')}
                            className={`pb-4 font-semibold transition-colors relative ${activeTab === 'details' ? 'text-[#000435]' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Détails
                            {activeTab === 'details' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000435]"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('specs')}
                            className={`pb-4 font-semibold transition-colors relative ${activeTab === 'specs' ? 'text-[#000435]' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Caractéristiques
                            {activeTab === 'specs' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000435]"></div>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`pb-4 font-semibold transition-colors relative ${activeTab === 'reviews' ? 'text-[#000435]' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Avis ({product.reviews})
                            {activeTab === 'reviews' && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000435]"></div>
                            )}
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-2xl p-6">
                        {activeTab === 'details' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>
                        )}
                        {activeTab === 'specs' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques techniques</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Catégorie</span>
                                        <span className="font-medium text-gray-900">{product.category}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-gray-100">
                                        <span className="text-gray-600">État</span>
                                        <span className="font-medium text-gray-900">{product.condition}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-gray-100">
                                        <span className="text-gray-600">Localisation</span>
                                        <span className="font-medium text-gray-900">{product.location}</span>
                                    </div>
                                    <div className="flex justify-between py-3">
                                        <span className="text-gray-600">Stock disponible</span>
                                        <span className="font-medium text-gray-900">{product.stock} unités</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Avis clients</h3>
                                <div className="text-center py-12">
                                    <p className="text-gray-500">Aucun avis pour le moment</p>
                                    <p className="text-sm text-gray-400 mt-2">Soyez le premier à laisser un avis</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Similar Products */}
                {similarProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {similarProducts.map((similarProduct) => (
                                <ProductCard key={similarProduct.id} product={similarProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
