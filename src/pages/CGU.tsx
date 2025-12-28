import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, AlertTriangle, FileText, Scale, Shield, HelpCircle, Gavel, XCircle, AlertCircle } from 'lucide-react';

export default function CGU() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#000435] mb-4">Conditions Générales d'Utilisation</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Dernière mise à jour : 18 Décembre 2025
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Table of Contents - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-[#000435]">
                                <FileText size={20} />
                                Sommaire
                            </h3>
                            <nav className="space-y-2">
                                {[
                                    { id: 'interdits', label: 'Contenus interdits' },
                                    { id: 'transactions', label: 'Transactions' },
                                    { id: 'propriete', label: 'Propriété intellectuelle' },
                                    { id: 'responsabilite', label: 'Responsabilité' },
                                    { id: 'resiliation', label: 'Résiliation' },
                                    { id: 'litiges', label: 'Litiges' },
                                    { id: 'dispositions', label: 'Dispositions' },
                                    { id: 'contact', label: 'Contact' }
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#000435] hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-8">

                        {/* Section 6: Contenus Interdits */}
                        <div id="interdits" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <XCircle className="text-red-500" />
                                6. Contenus interdits
                            </h2>

                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Il est strictement interdit de publier ou de vendre les articles suivants sur Akaguriro.
                                Tout manquement à ces règles entraînera une suspension immédiate du compte.
                            </p>

                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
                                <h3 className="text-red-800 font-semibold mb-3 flex items-center gap-2">
                                    <AlertTriangle size={18} />
                                    Interdictions strictes
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-red-700 text-sm">
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                        Produits illégaux, drogues ou substances contrôlées
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                        Armes à feu, explosifs et munitions
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                        Contenus haineux, discriminatoires ou violents
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                        Contrefaçons et produits piratés
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                        Services sexuels ou pornographie
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                        Données personnelles ou volées
                                    </li>
                                </ul>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <AlertCircle size={16} />
                                <span>En cas d'urgence ou d'infraction grave, contactez immédiatement les autorités compétentes.</span>
                            </div>
                        </div>

                        {/* Section 7: Transactions */}
                        <div id="transactions" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <Scale className="text-blue-600" />
                                7. Transactions et Paiements
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Akaguriro agit en tant qu'intermédiaire technique. Les transactions se déroulent directement entre l'acheteur et le vendeur.
                                </p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    <li>Les prix sont indiqués en devises locales et incluent les taxes applicables.</li>
                                    <li>Les paiements doivent être effectués via les moyens sécurisés proposés sur la plateforme.</li>
                                    <li>Les vendeurs s'engagent à livrer les produits conformes à la description.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Section 8: Propriété Intellectuelle */}
                        <div id="propriete" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <Shield className="text-purple-600" />
                                8. Propriété Intellectuelle
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                Tout le contenu présent sur Akaguriro (logos, textes, images, design) est la propriété exclusive de l'entreprise ou de ses partenaires.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Les utilisateurs conservent les droits sur les contenus qu'ils publient (photos d'annonces) mais accordent à Akaguriro une licence d'utilisation pour la promotion du service.
                            </p>
                        </div>

                        {/* Section 9: Responsabilité */}
                        <div id="responsabilite" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <AlertTriangle className="text-orange-500" />
                                9. Limitation de Responsabilité
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Akaguriro ne saurait être tenu responsable des litiges intervenant entre acheteurs et vendeurs, ni de la qualité, de la sûreté ou de la légalité des objets mis en vente. Nous nous efforçons de maintenir un environnement sûr, mais nous ne pouvons garantir l'exactitude des annonces.
                            </p>
                        </div>

                        {/* Section 10: Résiliation */}
                        <div id="resiliation" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <XCircle className="text-gray-600" />
                                10. Résiliation du Compte
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Nous nous réservons le droit de suspendre ou de supprimer tout compte ne respectant pas les présentes CGU, sans préavis ni indemnité. Les utilisateurs peuvent également supprimer leur compte à tout moment depuis leurs paramètres.
                            </p>
                        </div>

                        {/* Section 11: Litiges */}
                        <div id="litiges" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <Gavel className="text-indigo-600" />
                                11. Droit Applicable et Litiges
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Les présentes conditions sont régies par le droit local. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut d'accord, les tribunaux compétents seront ceux du siège social de Akaguriro.
                            </p>
                        </div>

                        {/* Section 12: Dispositions */}
                        <div id="dispositions" className="bg-white rounded-2xl shadow-sm p-8 scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                                <FileText className="text-teal-600" />
                                12. Dispositions Diverses
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Si une disposition des présentes CGU est jugée invalide, les autres dispositions resteront en vigueur. Akaguriro se réserve le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des mises à jour majeures.
                            </p>
                        </div>

                        {/* Contact Card */}
                        <div id="contact" className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 scroll-mt-24">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-[#000435] mb-2 flex items-center gap-2">
                                        <HelpCircle className="text-blue-600" />
                                        Besoin d'aide ?
                                    </h2>
                                    <p className="text-gray-700">
                                        Pour toute question relative à ces conditions, notre équipe juridique est à votre disposition.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 w-full md:w-auto">
                                    <a
                                        href="mailto:legal@akaguriro.com"
                                        className="flex items-center justify-center gap-2 bg-white text-[#000435] px-6 py-3 rounded-full font-medium hover:bg-blue-100 transition-all shadow-sm border border-blue-100"
                                    >
                                        <Mail size={18} />
                                        legal@akaguriro.com
                                    </a>
                                    <a
                                        href="tel:+250700000000"
                                        className="flex items-center justify-center gap-2 bg-[#000435] text-white px-6 py-3 rounded-full font-medium hover:bg-[#000435]/90 transition-all shadow-md"
                                    >
                                        <Phone size={18} />
                                        +250 700 000 000
                                    </a>
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
