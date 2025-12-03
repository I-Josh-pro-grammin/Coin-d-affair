import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    FolderTree,
    BarChart3,
    Settings,
    Shield,
    Menu,
    X,
    Bell,
    LogOut,
    ChevronDown
} from 'lucide-react';

interface AdminLayoutProps {
    children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Tableau de Bord', path: '/admin' },
        { icon: FolderTree, label: 'Catégories', path: '/admin/categories' },
        { icon: Users, label: 'Utilisateurs', path: '/admin/users' },
        { icon: Package, label: 'Produits', path: '/admin/products' },
        { icon: ShoppingCart, label: 'Commandes', path: '/admin/orders' },
        { icon: BarChart3, label: 'Analyses', path: '/admin/analytics' },
        { icon: Settings, label: 'Paramètres', path: '/admin/settings' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
                <div className="px-4 h-16 flex items-center justify-between">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden text-gray-700 hover:text-[#000435]"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Logo with Admin Badge */}
                        <Link to="/admin" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#000435] rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">C</span>
                            </div>
                            <div>
                                <span className="font-bold text-lg">Coin D'Affaires</span>
                                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-bold rounded-full">ADMIN</span>
                            </div>
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* View Site Button */}
                        <Link
                            to="/"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#000435] hover:bg-gray-100 rounded-full transition-colors text-sm"
                        >
                            Voir le site
                        </Link>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-700 hover:text-[#000435] hover:bg-gray-100 rounded-full transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                    <Shield size={16} className="text-white" />
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                                <ChevronDown size={16} className="text-gray-500" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                                    <Link
                                        to="/admin/settings"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <Settings size={16} className="inline mr-2" />
                                        Paramètres
                                    </Link>
                                    <hr className="my-2 border-gray-200" />
                                    <button
                                        onClick={() => navigate('/')}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        <LogOut size={16} className="inline mr-2" />
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 z-40 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <nav className="p-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                                        ? 'bg-[#000435] text-white shadow-md'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 pt-16">
                <div className="p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                />
            )}
        </div>
    );
};
