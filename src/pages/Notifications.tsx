import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Bell, Star, MessageCircle, Heart, TrendingUp, Settings, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "Nouveau message reçu",
      description: "Marie Dubois vous a envoyé un message concernant votre iPhone 14 Pro Max.",
      timestamp: "Il y a 2 minutes",
      read: false,
      icon: MessageCircle,
      color: "blue"
    },
    {
      id: 2,
      type: "favorite",
      title: "Annonce ajoutée aux favoris",
      description: "3 personnes ont ajouté votre MacBook Pro M2 à leurs favoris aujourd'hui.",
      timestamp: "Il y a 1 heure",
      read: false,
      icon: Heart,
      color: "red"
    },
    {
      id: 3,
      type: "promotion",
      title: "Offre promotionnelle",
      description: "Profitez de -50% sur la mise en avant de vos annonces ce week-end !",
      timestamp: "Il y a 3 heures",
      read: false,
      icon: Star,
      color: "yellow"
    },
    {
      id: 4,
      type: "views",
      title: "Votre annonce performe bien",
      description: "Votre iPhone 14 Pro Max a été vue 156 fois cette semaine (+45%).",
      timestamp: "Il y a 6 heures",
      read: true,
      icon: TrendingUp,
      color: "green"
    },
    {
      id: 5,
      type: "message",
      title: "Nouveau message reçu",
      description: "Pierre Martin vous a envoyé un message concernant votre vélo électrique.",
      timestamp: "Hier à 18:30",
      read: true,
      icon: MessageCircle,
      color: "blue"
    },
    {
      id: 6,
      type: "promotion",
      title: "Conseil pour améliorer vos ventes",
      description: "Ajoutez plus de photos à vos annonces pour augmenter vos chances de vente de 67%.",
      timestamp: "Il y a 2 jours",
      read: true,
      icon: Star,
      color: "yellow"
    }
  ]);

  const [filter, setFilter] = useState("all");

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = filter === "unread" 
    ? notifications.filter(notif => !notif.read)
    : notifications;

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600 bg-blue-100",
      red: "text-red-600 bg-red-100",
      green: "text-green-600 bg-green-100",
      yellow: "text-yellow-600 bg-yellow-100"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
                Notifications
              </h1>
              <p className="text-gray-600">
                {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              {unreadCount > 0 && (
                <Button onClick={markAllAsRead} variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-2" />
                  Tout marquer comme lu
                </Button>
              )}
            </div>
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold font-poppins text-gray-900 mb-4">
              Aucune notification
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Vous êtes à jour ! Toutes vos notifications apparaîtront ici.
            </p>
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "all"
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Toutes ({notifications.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === "unread"
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                Non lues ({unreadCount})
              </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-lg p-4 shadow-soft hover:shadow-card transition-all ${
                      !notification.read ? 'border-l-4 border-blue-600' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${getIconColor(notification.color)}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-sm font-medium ${
                              !notification.read ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {notification.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {notification.timestamp}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-4">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Marquer comme lu"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Supprimer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty filtered results */}
            {filteredNotifications.length === 0 && filter === "unread" && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Toutes les notifications sont lues
                </h3>
                <p className="text-gray-600">
                  Félicitations ! Vous êtes à jour avec toutes vos notifications.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Notifications;