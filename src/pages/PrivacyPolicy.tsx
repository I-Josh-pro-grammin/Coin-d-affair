import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Lock, Eye, Database, Cookie, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#000435] mb-4">Politique de Confidentialité</h1>
                    <p className="text-lg text-gray-600">
                        Comment nous protégeons et utilisons vos données personnelles
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-8 space-y-10">

                    {/* Introduction */}
                    <div className="border-b border-gray-100 pb-8">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Chez Akaguriro, la confidentialité de vos données est une priorité. Cette politique détaille les informations que nous collectons, comment nous les utilisons et vos droits concernant ces données.
                        </p>
                    </div>

                    {/* Data Collection */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                            <Database className="text-blue-600" />
                            Données collectées
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <h3 className="font-bold text-[#000435] mb-2">Informations fournies par vous</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                                    <li>Nom, prénom, email, téléphone</li>
                                    <li>Informations de compte et profil</li>
                                    <li>Contenu des annonces et messages</li>
                                </ul>
                            </div>
                            <div className="bg-indigo-50 p-6 rounded-xl">
                                <h3 className="font-bold text-[#000435] mb-2">Informations automatiques</h3>
                                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                                    <li>Adresse IP et type de navigateur</li>
                                    <li>Données de navigation et cookies</li>
                                    <li>Historique des transactions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Usage */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                            <Eye className="text-purple-600" />
                            Utilisation des données
                        </h2>
                        <ul className="space-y-4 text-gray-700">
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck size={14} />
                                </div>
                                <span><strong>Fournir nos services :</strong> Gestion de votre compte, publication d'annonces, facilitation des transactions.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck size={14} />
                                </div>
                                <span><strong>Sécurité :</strong> Détection des fraudes, sécurisation des accès, modération des contenus.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <ShieldCheck size={14} />
                                </div>
                                <span><strong>Communication :</strong> Envoi de notifications, newsletters (avec votre accord), support client.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Cookies */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                            <Cookie className="text-orange-500" />
                            Cookies et traceurs
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez gérer vos préférences en matière de cookies à tout moment dans les paramètres de votre navigateur.
                        </p>
                    </section>

                    {/* Security */}
                    <section>
                        <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-3">
                            <Lock className="text-teal-600" />
                            Sécurité des données
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                            Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre l'accès non autorisé, la divulgation, la modification ou la destruction.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
