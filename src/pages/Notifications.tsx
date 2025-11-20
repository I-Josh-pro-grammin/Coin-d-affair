import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Bell, Package, Tag, Info } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "order",
    title: "Commande confirmée",
    message: "Votre commande #12345 a été confirmée avec succès.",
    time: "Il y a 2 heures",
    read: false,
    icon: Package,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    type: "promo",
    title: "Nouvelle promotion",
    message: "Profitez de -20% sur tous les produits électroniques ce week-end !",
    time: "Il y a 1 jour",
    read: true,
    icon: Tag,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 3,
    type: "system",
    title: "Mise à jour du système",
    message: "Nous avons mis à jour nos conditions d'utilisation.",
    time: "Il y a 3 jours",
    read: true,
    icon: Info,
    color: "bg-gray-100 text-gray-600"
  }
];

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 text-sm sm:text-base">Toutes vos notifications récentes.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 sm:p-6 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full flex-shrink-0 ${notification.color}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-base font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune notification</h3>
              <p className="text-gray-500">Vous n'avez pas de nouvelles notifications pour le moment.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;