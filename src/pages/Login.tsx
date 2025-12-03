import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login({ email, password });
      navigate("/");
      toast.success("Connexion réussie");
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.error ||
        err?.message ||
        "Une erreur est survenue lors de la connexion.";
      setError(message);
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
          <h1 className="text-5xl font-bold mb-6">BIENVENUE!</h1>
          <p className="text-lg opacity-90 max-w-md leading-relaxed">
            Connectez-vous pour accéder à votre compte et profiter de milliers de produits à prix imbattables.
          </p>
          <div className="mt-12 space-y-4">
            {["Achat sécurisé", "Livraison rapide", "Support 24/7"].map((txt) => (
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
      {/* Right: form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-2xl font-bold text-gray-900">Coin D'Affaires</h1>
          </div>
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Connexion</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-center text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}
            <p className="text-gray-600 text-center mb-8">Accédez à votre compte</p>
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full px-4 py-3 pl-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />
                  <span className="ml-2 text-gray-600">Se souvenir de moi</span>
                </label>
                <Link to="/auth/forgot-password" className="text-[#000435] hover:underline font-medium">Mot de passe oublié?</Link>
              </div>
              <button
                disabled={submitting}
                type="submit"
                className="w-full bg-[#000435] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion...
                  </>
                ) : (
                  "Se connecter"
                )}
              </button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-gray-50 text-gray-500">Ou</span></div>
            </div>
            <p className="text-center text-gray-600">
              Pas encore de compte?{" "}
              <Link to="/auth/role-selection" className="text-[#000435] hover:underline font-medium">S'inscrire</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

