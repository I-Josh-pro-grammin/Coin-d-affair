import { Link } from "react-router-dom";

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenue sur Akaguriro
          </h1>
          <p className="text-lg text-gray-600">
            Choisissez comment vous souhaitez utiliser notre plateforme
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#000435] cursor-pointer">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#000435]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Je veux acheter
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Découvrez des milliers de produits et faites des achats en toute sécurité
              </p>
              <ul className="space-y-3 mb-6">
                {["Accès à des milliers de produits", "Paiement sécurisé", "Support client 24/7"].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth/signup/customer"
                className="block w-full bg-[#000435] text-white py-3 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 text-center"
              >
                Créer un compte acheteur
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#000435] cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-[#000435]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
                Je veux vendre
              </h2>
              <p className="text-gray-600 text-center mb-6">
                Créez votre boutique en ligne et vendez vos produits à des milliers d'acheteurs
              </p>
              <ul className="space-y-3 mb-6">
                {["Création de boutique gratuite", "Tableau de bord vendeur", "Paiements sécurisés"].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth/signup/seller"
                className="block w-full bg-[#000435] text-white py-3 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all duration-300 text-center"
              >
                Créer un compte vendeur
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Vous avez déjà un compte?{" "}
            <Link to="/auth/login" className="text-[#000435] hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;


