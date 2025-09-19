import { Search, MessageCircle, Heart, Bell, User, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const isLoggedIn = false; // This would come from your auth context

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="logo-text">CoinD'affaires</h1>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Que recherchez-vous ?"
                className="search-rounded"
              />
            </div>
          </div>

          {/* Action Icons & Login */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/messages" className="icon-btn">
                  <MessageCircle className="h-6 w-6" />
                </Link>
                <Link to="/favoris" className="icon-btn">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link to="/notifications" className="icon-btn">
                  <Bell className="h-6 w-6" />
                </Link>
                <Link to="/profil" className="icon-btn">
                  <User className="h-6 w-6" />
                </Link>
              </>
            ) : (
              <Link to="/connexion">
                <Button className="cta-strong">
                  <LogIn className="h-4 w-4 mr-2" />
                  Se connecter
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}