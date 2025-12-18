import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFormValid = formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.message.trim() !== '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#000435] mb-4">Contactez-nous</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Une question ? Une suggestion ? Notre équipe est là pour vous aider.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact Info & FAQ */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Info Card */}
                        <div className="bg-[#000435] text-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-xl font-bold mb-6">Nos coordonnées</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Email</p>
                                        <a href="mailto:support@coindaffaires.com" className="hover:text-amber-400 transition-colors font-medium">
                                            support@coindaffaires.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Téléphone</p>
                                        <a href="tel:+250700000000" className="hover:text-amber-400 transition-colors font-medium">
                                            +250 700 000 000
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Adresse</p>
                                        <p className="font-medium">
                                            Kigali, Rwanda<br />
                                            123 Rue de l'Commerce
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Card */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                                <HelpCircle size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 mb-2">Questions fréquentes</h3>
                            <p className="text-gray-600 mb-4 text-sm">
                                Consultez notre centre d'aide pour trouver des réponses rapides aux questions les plus courantes.
                            </p>
                            <Link
                                to="/aide"
                                className="inline-flex items-center gap-2 text-[#000435] hover:underline font-medium group"
                            >
                                Visiter le centre d'aide
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm p-8">
                            <h2 className="text-2xl font-bold text-[#000435] mb-6 flex items-center gap-2">
                                <MessageCircle className="text-blue-600" />
                                Envoyez-nous un message
                            </h2>

                            {submitted ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in fade-in duration-500">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-green-800 mb-2">Merci !</h3>
                                    <p className="text-green-700">
                                        Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-6 text-sm text-green-700 underline hover:text-green-900"
                                    >
                                        Envoyer un autre message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nom complet <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#000435] focus:ring-2 focus:ring-[#000435]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#000435] focus:ring-2 focus:ring-[#000435]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Sujet</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#000435] focus:ring-2 focus:ring-[#000435]/20 outline-none transition-all bg-gray-50 focus:bg-white custom-select"
                                        >
                                            <option value="">Sélectionnez un sujet</option>
                                            <option value="order">Problème avec une commande</option>
                                            <option value="account">Mon compte</option>
                                            <option value="seller">Devenir vendeur</option>
                                            <option value="other">Autre demande</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message <span className="text-red-500">*</span></label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#000435] focus:ring-2 focus:ring-[#000435]/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                                            placeholder="Comment pouvons-nous vous aider ?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!isFormValid || isSubmitting}
                                        className={`w-full py-4 px-6 rounded-full font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 ${isFormValid && !isSubmitting
                                                ? 'bg-[#000435] hover:bg-[#000435]/90 hover:shadow-lg hover:-translate-y-0.5'
                                                : 'bg-gray-300 cursor-not-allowed'
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Envoyer le message
                                            </>
                                        )}
                                    </button>

                                    {!isFormValid && (
                                        <p className="text-center text-sm text-gray-400 mt-2">
                                            Veuillez remplir tous les champs obligatoires
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
