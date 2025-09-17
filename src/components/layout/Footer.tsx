import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <h2 className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
                CoinD'affaires
              </h2>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              La plateforme de référence pour vos petites annonces en France. 
              Achetez, vendez et trouvez tout ce dont vous avez besoin près de chez vous.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/a-propos" className="text-gray-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/aide" className="text-gray-400 hover:text-white transition-colors">
                  Aide
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/deposer-annonce" className="text-gray-400 hover:text-white transition-colors">
                  Déposer une annonce
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold font-poppins mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3" />
                <span>contact@coindaffaires.fr</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-3" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-3" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} CoinD'affaires. Tous droits réservés.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/conditions-utilisation" className="text-gray-400 hover:text-white text-sm transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}