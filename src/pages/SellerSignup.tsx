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

  // Account Type State: 'seller_individual' or 'seller_business'
  const [accountType, setAccountType] = useState<'seller_individual' | 'seller_business'>('seller_individual');

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    // New fields
    whatsapp: "",
    locationCity: "",
    idType: "cni", // cni or passport
    idNumber: "",
    businessName: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /* Password Validation Logic */
  const passwordRules = [
    { label: "Au moins 8 caractères", valid: formData.password.length >= 8 },
    { label: "Une majuscule", valid: /[A-Z]/.test(formData.password) },
    { label: "Une minuscule", valid: /[a-z]/.test(formData.password) },
    { label: "Un chiffre", valid: /\d/.test(formData.password) },
    { label: "Pas d'espaces", valid: !/\s/.test(formData.password) },
  ];

  const isPasswordValid = passwordRules.every((rule) => rule.valid);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    if (formData.password !== formData.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Le mot de passe ne respecte pas les critères de sécurité");
      return;
    }

    if (!formData.acceptTerms) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        // Map both seller types to 'business' to ensure dashboard access
        accountType: 'business' as const,
        whatsapp: formData.whatsapp,
        locationCity: formData.locationCity,
        // Include ID info only for individuals
        ...(accountType === 'seller_individual' ? {
          idType: formData.idType,
          idNumber: formData.idNumber
        } : {
          // Include business name only for businesses
          businessName: formData.businessName
        })
      };

      await signup(payload);

      toast.success("Compte créé avec succès. Veuillez vérifier vos emails.");
      navigate('/auth/verify-required', { state: { email: formData.email } });

    } catch (error: any) {
      console.error(error);
      const message = error?.data?.message || "Une erreur est survenue lors de l'inscription";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full bg-white md:grid md:grid-cols-2 overflow-hidden">
      {/* Left Column - Branding (Seller Specific) */}
      <div className="hidden md:flex flex-col justify-between bg-[#000435] p-12 text-white relative overflow-hidden h-full">
        <div className="relative z-10">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <h1 className="text-3xl font-bold font-poppins text-white">Akaguriro</h1>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            <Store className="w-4 h-4" />
            <span>Espace Vendeur</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 font-poppins leading-tight">
            Vendez plus vite, gagnez plus
          </h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Rejoignez la plus grande place de marché de la région.
            Que vous soyez un particulier ou une entreprise, nous avons les outils qu'il vous faut.
          </p>
        </div>

        <div className="relative z-10 text-sm text-blue-200">
          &copy; {new Date().getFullYear()} Akaguriro. Tous droits réservés.
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[30rem] h-[30rem] bg-purple-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Right Column - Seller Signup Form */}
      <div className="flex flex-col px-4 pt-24 pb-8 md:px-12 lg:px-24 xl:px-32 bg-gray-50/50 overflow-y-auto h-full">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Back Link & Logo */}
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-gray-500 hover:text-[#000435] transition-colors mb-6 md:absolute md:top-8 md:left-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Link>

            <div className="md:hidden text-center mb-6">
              <Link to="/" className="inline-block">
                <h1 className="logo-text text-3xl">Akaguriro</h1>
              </Link>
            </div>

            <h2 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
              Devenez Vendeur
            </h2>
            <p className="text-gray-600">
              Choisissez votre type de compte pour commencer.
            </p>
          </div>

          {/* Account Type Selector */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-1 bg-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => setAccountType('seller_individual')}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${accountType === 'seller_individual'
                ? 'bg-white text-[#000435] shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Particulier
            </button>
            <button
              type="button"
              onClick={() => setAccountType('seller_business')}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${accountType === 'seller_business'
                ? 'bg-white text-[#000435] shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
                }`}
            >
              Professionnel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Common Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
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

            {/* Business Specific Field */}
            {accountType === 'seller_business' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'entreprise</label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => updateFormData('businessName', e.target.value)}
                    placeholder="Nom de votre entreprise"
                    className="pl-10 search-input bg-white"
                    required
                  />
                </div>
              </div>
            )}

            {/* Individual Specific Fields */}
            {accountType === 'seller_individual' && (
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type ID</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.idType}
                    onChange={(e) => updateFormData('idType', e.target.value)}
                  >
                    <option value="cni">CNI</option>
                    <option value="passport">Passeport</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numéro ID</label>
                  <Input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => updateFormData('idNumber', e.target.value)}
                    placeholder={formData.idType === 'cni' ? "Numéro CNI" : "Numéro Passeport"}
                    className="search-input bg-white"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="06..."
                    className="pl-10 search-input bg-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (Optionnel)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => updateFormData('whatsapp', e.target.value)}
                    placeholder="06..."
                    className="pl-10 search-input bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ville / Localisation</label>
              <Input
                type="text"
                value={formData.locationCity}
                onChange={(e) => updateFormData('locationCity', e.target.value)}
                placeholder="Ex: Paris, Lyon..."
                className="search-input bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmation</label>
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

            {/* Password Rules Feedback */}
            {formData.password && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {passwordRules.map((rule, idx) => (
                  <div key={idx} className={`flex items-center gap-1 ${rule.valid ? "text-green-600" : "text-gray-400"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${rule.valid ? "bg-green-600" : "bg-gray-300"}`} />
                    {rule.label}
                  </div>
                ))}
              </div>
            )}

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

            <button
              type="submit"
              className="w-full bg-[#000435] hover:bg-[#000435]/90 text-white h-11 text-base shadow-lg hover:shadow-xl transition-all duration-300 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.acceptTerms || submitting || !isPasswordValid}
            >
              {submitting ? (
                "Traitement..."
              ) : (
                "Créer ma boutique"
              )}
            </button>
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
