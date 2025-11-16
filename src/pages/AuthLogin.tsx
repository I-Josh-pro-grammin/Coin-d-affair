import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {setCredentials} from "../redux/Features/authSlice"
import {useLoginMutation} from "../redux/api/apiSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const AuthLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // const { login } = useAuth();
  const [Login] = useLoginMutation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await Login({ email: email, password: password }).unwrap();
      console.log("its over with:", res);
      dispatch(setCredentials({id: res.userId, userType: res.accountType }));
      navigate("/");
      toast.success("Login successfull");
    } finally {
      setSubmitting(false);
      toast.error("Login failed!");
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
            {["Achat sécurisé","Livraison rapide","Support 24/7"].map((txt) => (
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
            <p className="text-gray-600 text-center mb-8">Accédez à votre compte</p>
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="votre@email.com" className="w-full px-4 py-3 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" required />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full px-4 py-3 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" required />
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />
                  <span className="ml-2 text-gray-600">Se souvenir de moi</span>
                </label>
                <Link to="/auth/forgot-password" className="text-[#000435] hover:underline font-medium">Mot de passe oublié?</Link>
              </div>
              <button disabled={submitting} type="submit" className="w-full bg-[#000435] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60">
                {submitting ? "Connexion..." : "Se connecter"}
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

export default AuthLogin;


