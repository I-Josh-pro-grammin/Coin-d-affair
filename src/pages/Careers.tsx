import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, CheckCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Careers() {
    const openings = [
        {
            title: "Senior Frontend Developer",
            department: "Engineering",
            location: "Bujumbura (Remote)",
            type: "Full-time"
        },
        {
            title: "Marketing Manager",
            department: "Marketing",
            location: "Bujumbura",
            type: "Full-time"
        },
        {
            title: "Customer Support Specialist",
            department: "Operations",
            location: "Remote",
            type: "Full-time"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Carrières chez Coin D'Affaires</h1>
                    <div className="prose prose-lg text-gray-600 mb-8">
                        <p className="mb-4">
                            Rejoignez l'équipe qui transforme le commerce en ligne au Burundi. Chez Coin D'Affaires, nous sommes passionnés par la création d'opportunités économiques et l'innovation technologique.
                        </p>
                        <p className="mb-4">
                            Nous recherchons des personnes talentueuses, motivées et créatives pour nous aider à bâtir l'avenir du e-commerce en Afrique.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <Briefcase className="w-8 h-8 text-[#000435] mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">Impact Réel</h3>
                            <p className="text-sm text-gray-600">Contribuez à une plateforme qui aide des milliers d'entrepreneurs.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <CheckCircle className="w-8 h-8 text-[#000435] mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">Excellence</h3>
                            <p className="text-sm text-gray-600">Travaillez avec les meilleures technologies et pratiques du secteur.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-xl">
                            <MapPin className="w-8 h-8 text-[#000435] mb-4" />
                            <h3 className="font-semibold text-gray-900 mb-2">Flexibilité</h3>
                            <p className="text-sm text-gray-600">Un environnement de travail moderne et flexible.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Postes ouverts</h2>
                    <div className="space-y-4">
                        {openings.map((job, index) => (
                            <div key={index} className="border border-gray-200 rounded-xl p-6 hover:border-[#000435] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-900">{job.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <span>{job.department}</span>
                                        <span>•</span>
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                                <Button className="bg-[#000435] hover:bg-[#000435]/90">
                                    Postuler
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center text-gray-500">
                    <p>Vous ne trouvez pas le poste idéal ?</p>
                    <a href="mailto:jobs@coindaffaires.bi" className="text-[#000435] font-medium hover:underline">
                        Envoyez-nous une candidature spontanée
                    </a>
                </div>
            </main>
            <Footer />
        </div>
    );
}
