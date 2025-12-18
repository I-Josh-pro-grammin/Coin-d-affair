import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowLeft, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const SellerSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      return;
    }

    setSubmitting(true);
    try {
      await signup({
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        accountType: "business",
        number: formData.phone
      });

      toast.success("Compte vendeur créé avec succès");
      navigate('/seller/setup');
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Erreur lors de la création du compte");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white md:grid md:grid-cols-2">
      {/* Left Column - Branding (Seller Specific) */}
      <div className="hidden md:flex flex-col justify-between bg-[#000435] p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <h1 className="text-3xl font-bold font-poppins text-white">CoinD'affaires</h1>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            <Store className="w-4 h-4" />
            <span>Espace Vendeur</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 font-poppins leading-tight">
            Lancez votre boutique en ligne aujourd'hui
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Profitez de nos outils professionnels pour gérer vos ventes, suivre vos commandes et développer votre activité.
            Une audience de milliers d'acheteurs vous attend.
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Coin D'Affaires. Tous droits réservés.
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Right Column - Seller Signup Form */}
      <div className="flex flex-col justify-center px-4 py-8 md:px-12 lg:px-24 xl:px-32 bg-gray-50/50 overflow-y-auto h-screen">
        <div className="w-full max-w-md mx-auto my-auto">
          {/* Mobile Back Link & Logo */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-gray-500 hover:text-[#000435] transition-colors mb-6 md:absolute md:top-8 md:right-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>

            <div className="md:hidden text-center mb-6">
              <Link to="/" className="inline-block">
                <h1 className="logo-text text-3xl">CoinD'affaires</h1>
              </Link>
            </div>

            <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
              Devenez Vendeur
            </h2>
            <p className="text-gray-600">
              Créez votre compte professionnel pour commencer à vendre.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Prénom"
                    className="pl-10 search-input bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  placeholder="Nom"
                  className="search-input bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse e-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="votre@email.com"
                  className="pl-10 search-input bg-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="pl-10 search-input bg-white"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                    placeholder="Confirmer"
                    className="pl-10 pr-10 search-input bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => updateFormData('acceptTerms', checked === true)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                J'accepte les{" "}
                <Link to="/conditions-utilisation" className="text-[#000435] hover:underline font-medium">
                  conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link to="/politique-confidentialite" className="text-[#000435] hover:underline font-medium">
                  politique de confidentialité
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#000435] hover:bg-[#000435]/90 text-white h-11 text-base shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
              disabled={!formData.acceptTerms || submitting}
            >
              {submitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création...
                </>
              ) : (
                "Créer ma boutique"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm md:text-base pb-8">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link
                to="/connexion"
                className="text-[#000435] hover:text-[#000435]/80 font-bold transition-colors"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;
