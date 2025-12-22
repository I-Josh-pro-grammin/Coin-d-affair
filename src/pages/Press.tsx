import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Press() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Espace Presse</h1>
                    <div className="prose prose-lg text-gray-600 mb-8">
                        <p className="mb-4">
                            Bienvenue dans l'espace presse de Coin D'Affaires. Vous trouverez ici nos derniers communiqués, notre kit média ainsi que les contacts pour toutes demandes journalistiques.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Kit Média</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Logos, photos officielles et charte graphique.
                            </p>
                            <Button variant="outline" className="w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Télécharger le kit (ZIP)
                            </Button>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h3 className="font-bold text-gray-900 mb-2">Contact Presse</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Pour toute demande d'interview ou d'information.
                            </p>
                            <Button className="w-full bg-[#000435] hover:bg-[#000435]/90">
                                <Mail className="w-4 h-4 mr-2" />
                                press@coindaffaires.bi
                            </Button>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Derniers communiqués</h2>
                    <div className="space-y-4">
                        <div className="border-l-4 border-[#000435] pl-4 py-2">
                            <span className="text-sm text-gray-500 block mb-1">20 Décembre 2024</span>
                            <h3 className="font-semibold text-gray-900">Lancement officiel de la plateforme Coin D'Affaires au Burundi</h3>
                        </div>
                        <div className="border-l-4 border-gray-200 pl-4 py-2">
                            <span className="text-sm text-gray-500 block mb-1">15 Novembre 2024</span>
                            <h3 className="font-semibold text-gray-900">Levée de fonds de série A : Coin D'Affaires accélère son expansion</h3>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
