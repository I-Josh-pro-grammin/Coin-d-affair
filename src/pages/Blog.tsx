import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Blog() {
    const posts = [
        {
            title: "Lancement officiel au Burundi",
            excerpt: "Découvrez comment Akaguriro transforme le paysage du commerce électronique à Bujumbura et au-delà.",
            date: "20 Déc 2024",
            author: "Équipe Akaguriro",
            category: "Actualités"
        },
        {
            title: "Guide pour les vendeurs : Maximiser vos ventes",
            excerpt: "Nos meilleurs conseils pour créer des annonces attrayantes et gérer votre boutique comme un pro.",
            date: "10 Déc 2024",
            author: "Support Vendeurs",
            category: "Tutoriels"
        },
        {
            title: "Les tendances e-commerce en Afrique de l'Est",
            excerpt: "Analyse des opportunités de croissance et des nouvelles habitudes de consommation numérique.",
            date: "1 Déc 2024",
            author: "Analyse Marché",
            category: "Tendances"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Le Blog</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Actualités, conseils et insights pour réussir sur Akaguriro.
                    </p>
                </div>

                <div className="grid gap-8">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <span className="bg-blue-50 text-[#000435] px-3 py-1 rounded-full font-medium text-xs">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-1">
                                    <User className="w-4 h-4" />
                                    {post.author}
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">
                                <Link to="#" className="hover:text-[#000435] transition-colors">
                                    {post.title}
                                </Link>
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {post.excerpt}
                            </p>
                            <Button variant="outline" className="group">
                                Lire l'article
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
