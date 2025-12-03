import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";

const SellerSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // In a real app, we would handle the actual signup here.
    // For this refactor, we'll simulate a successful signup and redirect to setup.
    // The user would typically be authenticated after this step.

    // Simulating API call
    setTimeout(() => {
      setSubmitting(false);
      navigate('/seller/setup');
      toast.success("Compte vendeur créé avec succès!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:block w-1/2 bg-gradient-to-br from-[#000435] to-[#001050]">
        <div className="h-full w-full flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">DEVENEZ VENDEUR!</h1>
          <p className="text-lg opacity-90 max-w-md leading-relaxed">
            Créez votre boutique en ligne et commencez à vendre vos produits dès aujourd'hui.
          </p>
          <div className="mt-12 space-y-4">
            {["Création de boutique gratuite", "Tableau de bord vendeur", "Paiements sécurisés"].map((txt) => (
              <div key={txt} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="text-2xl font-bold text-gray-900">Coin D'Affaires</h1>
          </div>
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Inscription Vendeur</h2>
            <p className="text-gray-600 text-center mb-8">Étape 1 sur 2</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <div className="relative">
                    <input type="text" required className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <div className="relative">
                    <input type="text" required className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input type="email" required className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <div className="relative">
                  <input type="tel" required placeholder="+250 XXX XXX XXX" className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input type="checkbox" required className="w-4 h-4 mt-1 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />
                <label className="ml-2 text-sm text-gray-600">
                  J'accepte les <Link to="/conditions-utilisation" className="text-[#000435] hover:underline">conditions d'utilisation</Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#000435] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Traitement...
                  </>
                ) : (
                  "Continuer"
                )}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Déjà un compte? <Link to="/connexion" className="text-[#000435] hover:underline font-medium">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;


