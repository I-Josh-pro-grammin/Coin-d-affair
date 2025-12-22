import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const routes = [
    { path: "/", name: "Accueil" },
    { path: "/boutique", name: "Boutique" },
    { path: "/produit/101", name: "Détail Produit (Mock)" },
    { path: "/acheter/101", name: "Acheter (Page)" },
    { path: "/deposer", name: "Déposer une annonce" },
    { path: "/favoris", name: "Favoris" },
    { path: "/notifications", name: "Notifications" },
    { path: "/messages", name: "Messages" },
    { path: "/panier", name: "Panier" },
    { path: "/checkout", name: "Checkout" },
    { path: "/auth/login", name: "Login" },
    { path: "/auth/signup/customer", name: "Signup Customer" },
    { path: "/dashboard", name: "Dashboard Seller" },
    { path: "/admin", name: "Dashboard Admin" },
    { path: "/profil", name: "Profil" },
    { path: "/aide", name: "Aide" },
    { path: "/contact", name: "Contact" },
    { path: "/mentions-legales", name: "Mentions Légales" },
    { path: "/politique-confidentialite", name: "Confidentialité" },
    { path: "/conditions-utilisation", name: "CGU" },
];

const RoutesTest = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Route Smoke Test</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {routes.map((route) => (
                        <Link key={route.path} to={route.path} className="block">
                            <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 hover:border-blue-500">
                                <div className="font-semibold text-gray-900">{route.name}</div>
                                <div className="text-xs text-gray-500 mt-1">{route.path}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <h2 className="font-semibold text-yellow-800 mb-2">Note</h2>
                    <p className="text-sm text-yellow-700">
                        Some routes (Dashboard, Admin) may require authentication.
                        Product details links use mocked ID '101'.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RoutesTest;
