import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryNav } from "@/components/layout/CategoryNav";
import { Footer } from "@/components/layout/Footer";
import { Send, Search, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProductById } from "@/data/mockProducts";

const Messages = () => {
  const [searchParams] = useSearchParams();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState("");

  // Check for product and seller query params
  useEffect(() => {
    const productId = searchParams.get('product');
    const sellerId = searchParams.get('seller');

    if (productId) {
      const product = getProductById(productId);
      if (product) {
        // Pre-fill message with product context
        setMessageText(`Bonjour, je suis intéressé(e) par ${product.name}. Est-il toujours disponible ?`);
        // In a real app, you would create/select a conversation with the seller
      }
    }
  }, [searchParams]);

  const conversations = [
    {
      id: 1,
      name: "Marie Dubois",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Bonjour, l'iPhone est-il toujours disponible ?",
      timestamp: "14:30",
      unread: 2,
      adTitle: "iPhone 14 Pro Max 256Go"
    },
    {
      id: 2,
      name: "Pierre Martin",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Merci pour les informations !",
      timestamp: "Hier",
      unread: 0,
      adTitle: "MacBook Pro M2"
    },
    {
      id: 3,
      name: "Sophie Bernard",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Pourriez-vous me donner plus de détails ?",
      timestamp: "Mardi",
      unread: 1,
      adTitle: "Vélo électrique"
    }
  ];

  const currentMessages = [
    {
      id: 1,
      sender: "Marie Dubois",
      text: "Bonjour ! Je suis intéressée par votre iPhone 14 Pro Max.",
      timestamp: "14:25",
      isOwn: false
    },
    {
      id: 2,
      sender: "Vous",
      text: "Bonjour Marie ! Oui il est toujours disponible. Il est en excellent état, acheté il y a 6 mois.",
      timestamp: "14:27",
      isOwn: true
    },
    {
      id: 3,
      sender: "Marie Dubois",
      text: "Parfait ! Pourriez-vous me dire s'il y a des rayures sur l'écran ?",
      timestamp: "14:28",
      isOwn: false
    },
    {
      id: 4,
      sender: "Vous",
      text: "Aucune rayure, j'ai toujours utilisé une protection d'écran et une coque. Je peux vous envoyer des photos supplémentaires si vous voulez.",
      timestamp: "14:29",
      isOwn: true
    },
    {
      id: 5,
      sender: "Marie Dubois",
      text: "Bonjour, l'iPhone est-il toujours disponible ?",
      timestamp: "14:30",
      isOwn: false
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const sendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-poppins text-gray-900 mb-2">
            Messages
          </h1>
          <p className="text-gray-600">
            Communiquez avec les acheteurs et vendeurs
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-card overflow-hidden h-[600px] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une conversation..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conv.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {conv.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {conv.name}
                        </h3>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-xs text-blue-600 mb-1 truncate">{conv.adTitle}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConv.avatar}
                        alt={selectedConv.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedConv.name}</h3>
                        <p className="text-sm text-blue-600">{selectedConv.adTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                          }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} className="btn-primary">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-gray-600">
                    Choisissez une conversation pour commencer à échanger
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;