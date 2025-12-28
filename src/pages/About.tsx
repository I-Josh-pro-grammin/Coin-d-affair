import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">À propos de Akaguriro</h1>
                    <div className="prose prose-lg text-gray-600">
                        <p className="mb-4">
                            Akaguriro est la première plateforme de commerce électronique au Burundi, connectant les acheteurs et les vendeurs dans un environnement sécurisé et convivial.
                        </p>
                        <p className="mb-4">
                            Notre mission est de simplifier le commerce en ligne en Afrique, en offrant des outils puissants aux vendeurs pour développer leur activité et une expérience d'achat exceptionnelle aux consommateurs.
                        </p>
                        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Notre Histoire</h2>
                        <p className="mb-4">
                            Fondée en 2024, notre plateforme a rapidement grandi pour devenir une référence dans le commerce en ligne local. Nous croyons en l'autonomisation des entrepreneurs locaux et en la création d'opportunités économiques pour tous.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
