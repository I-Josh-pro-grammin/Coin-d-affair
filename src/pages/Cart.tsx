import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { currencyFmt } from '@/lib/utils';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    const deliveryFee = cart.length > 0 ? 10000 : 0;
    const total = cartTotal + deliveryFee;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Votre panier est vide</h1>
                        <p className="text-gray-600 mb-8">Découvrez nos produits et ajoutez-les à votre panier</p>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 bg-[#000435] text-white px-8 py-4 rounded-full font-bold hover:bg-[#000435]/90 transition-all"
                        >
                            Continuer les achats
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Mon panier ({cart.length})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6">
                                <div className="flex gap-4">
                                    {/* Product Image */}
                                    <Link
                                        to={`/produit/${item.id}`}
                                        className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </Link>

                                    {/* Product Info */}
                                    <div className="flex-1">
                                        <Link
                                            to={`/produit/${item.id}`}
                                            className="font-semibold text-gray-900 hover:text-[#000435] mb-2 block"
                                        >
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-500 mb-2">Vendeur: {item.seller}</p>
                                        <p className="text-lg font-bold text-[#000435] mb-4">
                                            {currencyFmt(item.price)}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#000435] transition-colors"
                                                    aria-label="Diminuer la quantité"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-semibold text-gray-900 w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#000435] transition-colors"
                                                    aria-label="Augmenter la quantité"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                                                aria-label="Retirer du panier"
                                            >
                                                <Trash2 size={18} />
                                                Retirer
                                            </button>
                                        </div>
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-gray-900">
                                            {currencyFmt(item.price * item.quantity)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Clear Cart Button */}
                        <button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-700 font-medium transition-colors"
                        >
                            Vider le panier
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-700">
                                    <span>Sous-total ({cart.length} article{cart.length > 1 ? 's' : ''})</span>
                                    <span className="font-medium">{currencyFmt(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Livraison estimée</span>
                                    <span className="font-medium">{currencyFmt(deliveryFee)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span className="text-[#000435]">{currencyFmt(total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <Link
                                to="/checkout"
                                className="block w-full py-4 px-6 bg-[#000435] text-white font-bold rounded-full hover:bg-[#000435]/90 transition-all text-center mb-3"
                            >
                                Passer la commande
                            </Link>

                            {/* Continue Shopping */}
                            <Link
                                to="/"
                                className="block w-full py-3 px-6 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:border-[#000435] hover:text-[#000435] transition-all text-center"
                            >
                                Continuer les achats
                            </Link>

                            {/* Trust Info */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-xs text-gray-600 text-center">
                                    Paiement sécurisé • Livraison rapide • Retour facile
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
