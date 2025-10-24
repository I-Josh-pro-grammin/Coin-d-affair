import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-secondary text-secondary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-foreground rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary-foreground rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary-foreground rounded-full blur-3xl"></div>
      </div>

      {/* Hero section with brand message */}
      <div className="relative z-10 text-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary-foreground">
            Coin D'Affaires
          </h2>
          <p className="text-xl md:text-2xl text-secondary-foreground/80 mb-8 leading-relaxed">
            Votre prochaine grande trouvaille n'est qu'à un clic
          </p>
          
          {/* Newsletter signup */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12">
            <Input 
              placeholder="Votre email" 
              className="bg-white/10 border-white/20 text-secondary-foreground placeholder:text-secondary-foreground/60 backdrop-blur-sm"
            />
            <Button className="bg-secondary-foreground hover:bg-secondary-foreground/90 text-secondary border-0 font-medium">
              S'abonner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-4 p-1">
                <img
                  src="/logo.png"
                  alt="Coin D'Affaires"
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary-foreground">Coin D'Affaires</h3>
                <p className="text-secondary-foreground/60 text-sm">Marketplace de confiance</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-8">
              La marketplace française où découvrir, acheter et vendre devient un plaisir. 
              Des milliers d'articles uniques vous attendent.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center text-secondary-foreground/80">
                <MapPin className="h-5 w-5 mr-3 text-secondary-foreground" />
                <span>Paris, France</span>
              </div>
              <div className="flex items-center text-secondary-foreground/80">
                <Mail className="h-5 w-5 mr-3 text-secondary-foreground" />
                <span>contact@coindaffaires.fr</span>
              </div>
              <div className="flex items-center text-secondary-foreground/80">
                <Phone className="h-5 w-5 mr-3 text-secondary-foreground" />
                <span>+33 1 23 45 67 89</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary-foreground">Catégories</h4>
            <ul className="space-y-3">
              <li><Link to="/electronics" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 flex items-center group">Électronique <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/fashion" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 flex items-center group">Mode & Style <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/home" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 flex items-center group">Maison & Jardin <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/vehicles" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 flex items-center group">Véhicules <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/sports" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors duration-200 flex items-center group">Sports & Loisirs <ArrowRight className="ml-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link to="/all" className="text-secondary-foreground hover:text-secondary-foreground/80 transition-colors duration-200 font-medium">Voir tout →</Link></li>
            </ul>
          </div>

          {/* Support & Company */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-secondary-foreground">Support & Entreprise</h4>
            <div className="space-y-6">
              <div>
                <h5 className="text-sm font-semibold text-secondary-foreground/60 mb-3 uppercase tracking-wider">Aide</h5>
                <ul className="space-y-2">
                  <li><Link to="/help" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">Centre d'aide</Link></li>
                  <li><Link to="/contact" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">Nous contacter</Link></li>
                  <li><Link to="/faq" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-secondary-foreground/60 mb-3 uppercase tracking-wider">Entreprise</h5>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">À propos</Link></li>
                  <li><Link to="/careers" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">Carrières</Link></li>
                  <li><Link to="/press" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">Presse</Link></li>
                  <li><Link to="/blog" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors text-sm">Blog</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Social media & bottom bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center mt-16 pt-8 border-t border-secondary-foreground/10">
          <div className="flex items-center space-x-6 mb-6 lg:mb-0">
            <span className="text-secondary-foreground/60 text-sm">Suivez-nous</span>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm group">
                <Twitter className="h-4 w-4 text-secondary-foreground group-hover:text-secondary" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm group">
                <Facebook className="h-4 w-4 text-secondary-foreground group-hover:text-secondary" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm group">
                <Instagram className="h-4 w-4 text-secondary-foreground group-hover:text-secondary" />
              </a>
              <a href="#" className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm group">
                <Linkedin className="h-4 w-4 text-secondary-foreground group-hover:text-secondary" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-secondary-foreground/60">
            <p>© {currentYear} Coin D'Affaires. Tous droits réservés.</p>
            <div className="flex space-x-6">
              <Link to="/terms" className="hover:text-secondary-foreground transition-colors">Conditions</Link>
              <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">Confidentialité</Link>
              <Link to="/cookies" className="hover:text-secondary-foreground transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
