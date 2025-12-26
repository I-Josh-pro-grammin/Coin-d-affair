import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getProductById } from '@/data/mockProducts';
import { currencyFmt } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Package, MapPin, CreditCard, Smartphone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Buy() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [deliveryMethod, setDeliveryMethod] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('mobile-money');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const product = id ? getProductById(id) : undefined;

    // Require authentication to purchase
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

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

    const subtotal = product.price * quantity;
    const deliveryFee = deliveryMethod === 'express' ? 15000 : 10000;
    const total = subtotal + deliveryFee;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsSubmitting(false);
            toast({
                title: "Paiement réussi !",
                description: "Votre commande a été confirmée. Vous recevrez un email de confirmation.",
            });

            // Navigate to orders or back to product
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#000435] mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Retour
                </button>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser votre achat</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Product Summary */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Produit</h2>
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{product.seller.name}</p>
                                        <p className="text-lg font-bold text-[#000435]">{currencyFmt(product.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#000435] transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="font-semibold text-gray-900 w-8 text-center">{quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#000435] transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Method */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Package size={24} />
                                    Méthode de livraison
                                </h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#000435]">
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value="standard"
                                            checked={deliveryMethod === 'standard'}
                                            onChange={(e) => setDeliveryMethod(e.target.value)}
                                            className="w-5 h-5 text-[#000435] focus:ring-[#000435]"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Livraison standard</p>
                                            <p className="text-sm text-gray-600">3-5 jours ouvrables</p>
                                        </div>
                                        <p className="font-bold text-[#000435]">{currencyFmt(10000)}</p>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#000435]">
                                        <input
                                            type="radio"
                                            name="delivery"
                                            value="express"
                                            checked={deliveryMethod === 'express'}
                                            onChange={(e) => setDeliveryMethod(e.target.value)}
                                            className="w-5 h-5 text-[#000435] focus:ring-[#000435]"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Livraison express</p>
                                            <p className="text-sm text-gray-600">1-2 jours ouvrables</p>
                                        </div>
                                        <p className="font-bold text-[#000435]">{currencyFmt(15000)}</p>
                                    </label>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin size={24} />
                                    Adresse de livraison
                                </h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+250 788 123 456"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Adresse complète
                                        </label>
                                        <textarea
                                            required
                                            rows={3}
                                            placeholder="Numéro, rue, quartier..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ville
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            defaultValue="Kigali"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-2xl shadow-sm p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <CreditCard size={24} />
                                    Méthode de paiement
                                </h2>
                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#000435]">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="mobile-money"
                                            checked={paymentMethod === 'mobile-money'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-[#000435] focus:ring-[#000435]"
                                        />
                                        <Smartphone className="text-[#000435]" size={24} />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Mobile Money</p>
                                            <p className="text-sm text-gray-600">MTN, Airtel</p>
                                        </div>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:border-[#000435]">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-5 h-5 text-[#000435] focus:ring-[#000435]"
                                        />
                                        <CreditCard className="text-[#000435]" size={24} />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">Carte bancaire</p>
                                            <p className="text-sm text-gray-600">Visa, Mastercard</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 px-6 bg-[#000435] text-white font-bold rounded-full hover:bg-[#000435]/90 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Traitement en cours...' : 'Payer maintenant'}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Sous-total ({quantity} article{quantity > 1 ? 's' : ''})</span>
                                    <span className="font-medium">{currencyFmt(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Livraison</span>
                                    <span className="font-medium">{currencyFmt(deliveryFee)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span className="text-[#000435]">{currencyFmt(total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Legal Info */}
                            <div className="pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    En passant cette commande, vous acceptez nos{' '}
                                    <Link to="/conditions-utilisation" className="text-[#000435] hover:underline">
                                        conditions d'utilisation
                                    </Link>{' '}
                                    et notre{' '}
                                    <Link to="/politique-confidentialite" className="text-[#000435] hover:underline">
                                        politique de confidentialité
                                    </Link>
                                    . Vous bénéficiez d'un droit de rétractation de 14 jours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
