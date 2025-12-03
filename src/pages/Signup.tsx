import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, User, Mail, Phone, Lock } from "lucide-react";

const Signup = () => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd !== confirm) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    setSubmitting(true);
    try {
      await signup({
        fullName: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        password: pwd,
        accountType: "customer",
      });
      toast.success("Compte créé avec succès. Vérifiez votre email pour confirmer votre compte.");
      navigate("/connexion");
    } catch (error: any) {
      const message = error?.data?.message || "Impossible de créer le compte";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: full-height solid gradient panel */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-[#000435] to-[#001050]">
        <div className="h-full w-full flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">Bienvenue Acheteur</h1>
          <p className="text-lg opacity-90 max-w-md leading-relaxed">
            Créez votre compte pour profiter de nos meilleures offres.
          </p>
        </div>
      </div>
      {/* Right: form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-2xl font-bold text-gray-900">Coin D'Affaires</h1>
          </div>
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Créer un compte</h2>
            <p className="text-gray-600 text-center mb-8">Achetez en toute confiance</p>
            <form className="space-y-5" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <div className="relative">
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      placeholder="Jean"
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <div className="relative">
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      placeholder="Dupont"
                      className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                      required
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="vous@email.com"
                    className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone (optionnel)</label>
                <div className="relative">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                  />
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    type={showPwd ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPwd(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <label className="flex items-start text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 mt-0.5 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />
                <span className="ml-2">
                  J'accepte les <Link to="/conditions-utilisation" className="text-[#000435] hover:underline">conditions d'utilisation</Link> et la <Link to="/politique-confidentialite" className="text-[#000435] hover:underline">politique de confidentialité</Link>
                </span>
              </label>
              <button
                disabled={submitting}
                type="submit"
                className="w-full bg-[#000435] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Création...
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Déjà un compte ?{" "}
              <Link to="/connexion" className="text-[#000435] hover:underline font-medium">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;