import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { currencyFmt } from '@/lib/utils';
import { Check, CreditCard, Truck, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const deliveryFee = 10000;
    const total = cartTotal + deliveryFee;

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        setLoading(false);
        clearCart();
        toast.success('Commande confirmée !');
        navigate('/dashboard/orders');
    };

    if (cart.length === 0) {
        navigate('/panier');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Finaliser la commande</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Steps */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Step 1: Delivery Address */}
                        <div className={`bg-white rounded-2xl shadow-sm p-6 ${step === 1 ? 'ring-2 ring-[#000435]' : ''}`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step > 1 ? 'bg-green-500 text-white' : 'bg-[#000435] text-white'}`}>
                                        {step > 1 ? <Check size={20} /> : '1'}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Adresse de livraison</h2>
                                </div>
                                {step > 1 && (
                                    <button onClick={() => setStep(1)} className="text-[#000435] font-medium hover:underline">
                                        Modifier
                                    </button>
                                )}
                            </div>

                            {step === 1 && (
                                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                            <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                                            <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                                            <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                                            <input required type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                            <input required type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full bg-[#000435] text-white py-3 rounded-xl font-bold hover:bg-[#000435]/90 transition-all">
                                        Continuer vers le paiement
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Step 2: Payment */}
                        <div className={`bg-white rounded-2xl shadow-sm p-6 ${step === 2 ? 'ring-2 ring-[#000435]' : 'opacity-60'}`}>
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-[#000435] text-white' : 'bg-gray-200 text-gray-500'}`}>
                                    2
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Paiement</h2>
                            </div>

                            {step === 2 && (
                                <form onSubmit={handlePayment}>
                                    <div className="space-y-4 mb-6">
                                        <label className="flex items-center gap-4 p-4 border-2 border-[#000435] bg-blue-50 rounded-xl cursor-pointer">
                                            <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-[#000435]" />
                                            <div className="flex-1">
                                                <span className="font-bold text-gray-900 block">Mobile Money</span>
                                                <span className="text-sm text-gray-600">MTN / Airtel</span>
                                            </div>
                                            <CreditCard className="text-[#000435]" />
                                        </label>

                                        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-gray-300">
                                            <input type="radio" name="payment" className="w-5 h-5 text-[#000435]" />
                                            <div className="flex-1">
                                                <span className="font-bold text-gray-900 block">Paiement à la livraison</span>
                                                <span className="text-sm text-gray-600">Payer en espèces à la réception</span>
                                            </div>
                                            <Truck className="text-gray-400" />
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-[#000435] text-white py-4 rounded-xl font-bold hover:bg-[#000435]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Traitement...' : `Payer ${currencyFmt(total)}`}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif de la commande</h3>
                            <div className="space-y-4 mb-4 max-h-60 overflow-auto custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                                            <p className="text-sm font-bold text-[#000435]">{currencyFmt(item.price * item.quantity)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Sous-total</span>
                                    <span>{currencyFmt(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Livraison</span>
                                    <span>{currencyFmt(deliveryFee)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-100">
                                    <span>Total</span>
                                    <span>{currencyFmt(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
