import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HelpCircle, Truck, CreditCard, RefreshCw } from 'lucide-react';

export default function Help() {
    const faqs = [
        {
            question: "Comment passer une commande ?",
            answer: "Parcourez notre catalogue, ajoutez les produits à votre panier, puis suivez les étapes de paiement sécurisé."
        },
        {
            question: "Quels sont les délais de livraison ?",
            answer: "La livraison prend généralement entre 24h et 48h pour Bujumbura, et 2-3 jours pour les autres provinces."
        },
        {
            question: "Puis-je retourner un produit ?",
            answer: "Oui, vous disposez de 7 jours pour retourner un produit s'il ne correspond pas à vos attentes."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Comment pouvons-nous vous aider ?</h1>
                    <p className="text-gray-600">Trouvez des réponses à vos questions ou contactez notre support</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                        <Truck className="w-10 h-10 text-[#000435] mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Livraison</h3>
                        <p className="text-sm text-gray-600">Suivi de commande et tarifs</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                        <CreditCard className="w-10 h-10 text-[#000435] mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Paiement</h3>
                        <p className="text-sm text-gray-600">Moyens de paiement acceptés</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                        <RefreshCw className="w-10 h-10 text-[#000435] mx-auto mb-4" />
                        <h3 className="font-bold mb-2">Retours</h3>
                        <p className="text-sm text-gray-600">Politique de remboursement</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
