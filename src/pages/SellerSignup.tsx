import { Link } from "react-router-dom";

const SellerSignup = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left: full-height solid gradient panel */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-[#000435] to-[#001050]">
        <div className="h-full w-full flex flex-col justify-center px-12 text-white">
          <h1 className="text-5xl font-bold mb-6">Bienvenue Vendeur</h1>
          <p className="text-lg opacity-90 max-w-md leading-relaxed">
            Créez votre boutique et commencez à vendre à des milliers d'acheteurs.
          </p>
        </div>
      </div>
      {/* Right: form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8 md:hidden">
            <h1 className="text-2xl font-bold text-gray-900">Coin D'Affaires</h1>
          </div>
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Créer un compte vendeur</h2>
            <p className="text-gray-600 text-center mb-8">Commencez à vendre vos produits en ligne</p>

            <form className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                    <input className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="Jean" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                    <input className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="Dupont" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="vous@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input type="tel" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="+33 6 12 34 56 78" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <input type="password" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer</label>
                    <input type="password" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="••••••••" />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200" />

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de la boutique</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la boutique</label>
                    <input className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="Ma Super Boutique" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type d'entreprise</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all">
                      <option value="">Sélectionnez un type</option>
                      <option value="individual">Individu</option>
                      <option value="company">Entreprise</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégories de produits</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Électronique","Maison & Jardin","Véhicules","Mode & Beauté","Sports & Loisirs","Livres & Médias","Jouets & Enfants","Services"].map((label) => (
                      <label key={label} className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="w-4 h-4 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />{label}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    <input className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all" placeholder="123 Rue Exemple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all">
                      <option value="">Sélectionnez une ville</option>
                      {["Kigali","Butare","Gisenyi","Ruhengeri","Cyangugu"].map(v => <option key={v} value={v.toLowerCase()}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <label className="flex items-start text-sm text-gray-700">
                <input type="checkbox" className="w-4 h-4 mt-0.5 text-[#000435] border-gray-300 rounded focus:ring-[#000435]" />
                <span className="ml-2">
                  J'accepte les <a href="/terms/seller" className="text-[#000435] hover:underline">conditions d'utilisation pour vendeurs</a> et la <a href="/politique-confidentialite" className="text-[#000435] hover:underline">politique de confidentialité</a>
                </span>
              </label>
              <button type="submit" className="w-full bg-[#000435] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300">
                Créer mon compte vendeur
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Déjà un compte ?{" "}
              <Link to="/auth/login" className="text-[#000435] hover:underline font-medium">Se connecter</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSignup;


