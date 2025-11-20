import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
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

    if (productId) {
      const product = getProductById(productId);
      if (product) {
        // Pre-fill message with product context
        setMessageText(`Bonjour, je suis intéressé(e) par ${product.name}. Est-il toujours disponible ?`);
      }
    }
  }, [searchParams]);

  const conversations = [
    {
      id: 1,
      name: "Marie Dubois",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      lastMessage: "Bonjour, l'iPhone est-il toujours disponible ?",
      timestamp: "14:30",
      unread: 2,
      adTitle: "iPhone 14 Pro Max 256Go"
    },
    {
      id: 2,
      name: "Pierre Martin",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      lastMessage: "Merci pour les informations !",
      timestamp: "Hier",
      unread: 0,
      adTitle: "MacBook Pro M2"
    },
    {
      id: 3,
      name: "Sophie Bernard",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
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
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 text-sm sm:text-base">Discutez avec les vendeurs et négociez vos achats.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-[600px] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conv.id ? 'bg-blue-50/50 border-l-4 border-l-[#000435]' : 'border-l-4 border-l-transparent'
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      {conv.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`text-sm font-semibold truncate ${selectedConversation === conv.id ? 'text-[#000435]' : 'text-gray-900'}`}>
                          {conv.name}
                        </h3>
                        <span className="text-xs text-gray-500">{conv.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#000435] font-medium mb-0.5 truncate">{conv.adTitle}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50/30">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedConv.avatar}
                      alt={selectedConv.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedConv.name}</h3>
                      <p className="text-sm text-[#000435]">{selectedConv.adTitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-600">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-600">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
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
                        className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-sm ${message.isOwn
                            ? 'bg-[#000435] text-white rounded-br-none'
                            : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                          }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-[10px] mt-1 text-right ${message.isOwn ? 'text-white/70' : 'text-gray-400'
                          }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    <Input
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Tapez votre message..."
                      className="flex-1 rounded-full border-gray-300 focus:border-[#000435] focus:ring-[#000435]"
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button
                      onClick={sendMessage}
                      className="rounded-full w-10 h-10 p-0 bg-[#000435] hover:bg-[#000435]/90"
                    >
                      <Send className="h-4 w-4 text-white" />
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