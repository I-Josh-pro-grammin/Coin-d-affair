import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/common/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const {user} = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  console.log("Current user in Login page:", user);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const user = await login({ email, password });
      toast.success("Connexion réussie");

      // Route based on account type
      // Route based on account type
      // Route based on account type (Safe Reload ensures fresh state)
      if (user.account_type === 'admin') {
        navigate("/admin", { replace: true });
        // window.location.reload();
      } else if (user.account_type === 'business') {
        navigate("/dashboard", { replace: true });
        // window.location.reload();
      } else {
        navigate("/", { replace: true });
        // window.location.reload();
      }
    } catch (err: any) {
      // Check if error is due to unverified email
      if (err?.status === 403 || err?.data?.isVerified === false) {
        const message = err?.data?.message || "Veuillez vérifier votre email avant de vous connecter.";
        toast.error(message);
        // Redirect to email verification required page
        navigate(`/auth/verify-required?email=${encodeURIComponent(email)}`);
        return;
      }

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
    <div className="min-h-screen bg-white md:grid md:grid-cols-2">
      {/* Left Column - Branding (Hidden on mobile) */}
      <div className="hidden md:flex flex-col justify-between bg-[#000435] p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <h1 className="text-3xl font-bold font-poppins text-white">Akaguriro</h1>
            {/* <Logo withText={true} className="text-white brightness-0 invert" /> */}
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6 font-poppins leading-tight">
            La référence des bonnes affaires en France
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Rejoignez notre communauté grandissante d'acheteurs et de vendeurs.
            Trouvez tout ce dont vous avez besoin au meilleur prix, ou vendez ce que vous n'utilisez plus.
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Akaguriro. Tous droits réservés.
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Right Column - Login Form */}
      <div className="flex flex-col justify-center px-4 py-8 md:px-12 lg:px-24 xl:px-32 bg-gray-50/50">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile Back Link & Logo */}
          <div className="mb-8 md:mb-12">
            <Link
              to="/"
              className="inline-flex items-center text-gray-500 hover:text-[#000435] transition-colors mb-6 md:absolute md:top-8 md:right-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>

            <div className="md:hidden text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="logo-text text-3xl">Akaguriro</h1>
              </Link>
            </div>

            <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
              Bon retour !
            </h2>
            <p className="text-gray-600">
              Heureux de vous revoir. Veuillez saisir vos coordonnées.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-in fade-in slide-in-from-top-2">
              <p className="text-center text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 search-input bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mot de passe"
                  className="pl-10 pr-10 search-input bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="mt-0" />
                <label htmlFor="remember" className="text-gray-600 cursor-pointer">
                  Se souvenir de moi
                </label>
              </div>
              <Link to="/auth/forgot-password" className="text-[#000435] hover:underline font-medium">
                Mot de passe oublié?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#000435] hover:bg-[#000435]/90 text-white h-11 text-base shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>

          {/* Social Login / Divider could go here */}

          <div className="mt-8 text-center text-sm md:text-base">
            <p className="text-gray-600">
              Pas encore de compte?{" "}
              <Link
                to="/auth/role-selection"
                className="text-[#000435] hover:text-[#000435]/80 font-bold transition-colors"
              >
                Commencer ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
