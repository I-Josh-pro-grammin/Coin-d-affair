import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Package, ArrowRight, CheckCircle } from 'lucide-react';

export default function Deposer() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 bg-[#000435]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package size={40} className="text-[#000435]" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Déposez votre annonce
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Pour déposer une annonce et vendre vos produits sur Akaguriro, vous devez créer un compte vendeur.
                    </p>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="text-left">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Gratuit et simple</h3>
                                    <p className="text-sm text-gray-600">Créez votre boutique en quelques minutes</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Gérez vos ventes</h3>
                                    <p className="text-sm text-gray-600">Tableau de bord complet pour suivre vos commandes</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-left">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-1">Touchez plus de clients</h3>
                                    <p className="text-sm text-gray-600">Vendez à travers tout le Rwanda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/auth/signup/seller"
                            className="inline-flex items-center justify-center gap-2 bg-[#000435] text-white px-8 py-4 rounded-full font-bold hover:bg-[#000435]/90 transition-all text-lg"
                        >
                            Créer un compte vendeur
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            to="/auth/login"
                            className="inline-flex items-center justify-center gap-2 border-2 border-[#000435] text-[#000435] px-8 py-4 rounded-full font-bold hover:bg-[#000435] hover:text-white transition-all text-lg"
                        >
                            J'ai déjà un compte
                        </Link>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Vous avez des questions ?{' '}
                            <Link to="/aide" className="text-[#000435] hover:underline font-medium">
                                Consultez notre centre d'aide
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
