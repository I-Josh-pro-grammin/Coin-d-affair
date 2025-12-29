import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Scale, Building, Mail, Shield } from 'lucide-react';

export default function LegalMentions() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#000435] mb-4">Mentions Légales</h1>
                    <p className="text-lg text-gray-600">
                        Informations légales relatives à Akaguriro
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-8 space-y-8">
                        {/* Editeur */}
                        <section className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-4 flex items-center gap-3">
                                <Building className="text-blue-600" />
                                1. Éditeur du site
                            </h2>
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <p className="text-gray-700 leading-relaxed">
                                    <strong>Dénomination :</strong> Akaguriro SAS<br />
                                    <strong>Siège social :</strong> 123 Avenue du Commerce, Bujumbura, Burundi<br />
                                    <strong>Capital social :</strong> 1 000 000 BIF<br />
                                    <strong>RCS :</strong> Bujumbura B 123 456 789<br />
                                    <strong>Directeur de la publication :</strong> John Doe
                                </p>
                            </div>
                        </section>

                        {/* Hebergeur */}
                        <section className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-4 flex items-center gap-3">
                                <Shield className="text-purple-600" />
                                2. Hébergement
                            </h2>
                            <div className="text-gray-700 leading-relaxed">
                                <p>
                                    Le site est hébergé par <strong>Vercel Inc.</strong><br />
                                    340 S Lemon Ave #4133<br />
                                    Walnut, CA 91789<br />
                                    USA
                                </p>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-4 flex items-center gap-3">
                                <Mail className="text-orange-500" />
                                3. Contact
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Pour toute question ou réclamation concernant le site ou son contenu, vous pouvez nous contacter :
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Par email : <a href="mailto:contact@akaguriro.com" className="text-blue-600 hover:underline">contact@akaguriro.com</a></li>
                                <li>Par téléphone : +257 70 000 000</li>
                                <li>Via notre formulaire de contact</li>
                            </ul>
                        </section>

                        {/* Propriété intellectuelle */}
                        <section className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-[#000435] mb-4 flex items-center gap-3">
                                <Scale className="text-teal-600" />
                                4. Propriété intellectuelle
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                L'ensemble de ce site relève de la législation locale et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
