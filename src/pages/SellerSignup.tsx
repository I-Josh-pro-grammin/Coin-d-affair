import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const SellerSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [ firstname, setFirstname ] = useState('');
  const [ lastname, setLastname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ comfirmPassword, setComfirmPassword ] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would handle the actual signup here.
    // For this refactor, we'll simulate a successful signup and redirect to setup.
    // The user would typically be authenticated after this step.

    // For now, we'll just redirect to the setup page as requested.
    setSubmitting(true);
    if(password != comfirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    try {
      await signup({
        fullName: `${firstname} ${lastname}`,
        email,
        password,
        accountType: "business",
        number: phone
      });
      
      toast.success("User created successfully")
      navigate('/seller/setup');
    } catch (error) {
      toast.error('Failed to signup');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000435] to-[#000435]/80 transform -skew-x-12 translate-x-1/4"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">DEVENEZ VENDEUR!</h1>
          <p className="text-lg opacity-90 max-w-md leading-relaxed">
            Créez votre boutique en ligne et commencez à vendre vos produits dès aujourd'hui.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Inscription Vendeur</h2>
            <p className="text-gray-600 text-center mb-8">Étape 1 sur 2</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <input value={firstname} onChange={(e) => setFirstname(e.target.value)} type="text" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input value={lastname} onChange={(e) => setLastname(e.target.value)} type="text" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input value={phone} onChange={e=>setPhone(e.target.value)} type="tel" required placeholder="+250 XXX XXX XXX" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le mot de passe</label>
                <input value={comfirmPassword} onChange={e=>setComfirmPassword(e.target.value)} type="password" required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" />
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input type="checkbox" required className="w-4 h-4 mt-1 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />
                <label className="ml-2 text-sm text-gray-600">
                  J'accepte les <a href="/terms" className="text-[#000435] hover:underline">conditions d'utilisation</a>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full bg-[#000435] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Continuer
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Déjà un compte? <a href="/auth/login" className="text-[#000435] hover:underline font-medium">Se connecter</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;


