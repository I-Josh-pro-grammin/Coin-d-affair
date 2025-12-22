import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MessageCircle, Search, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock conversations
const conversations = [
    {
        id: 1,
        user: "Jean Dupont",
        lastMessage: "Bonjour, est-ce que cet article est toujours disponible ?",
        time: "10:30",
        unread: 2,
        online: true,
        avatar: "https://i.pravatar.cc/150?u=1"
    },
    {
        id: 2,
        user: "Marie Martin",
        lastMessage: "Je peux vous proposer 50€ pour le lot.",
        time: "Hier",
        unread: 0,
        online: false,
        avatar: "https://i.pravatar.cc/150?u=2"
    },
    {
        id: 3,
        user: "Pierre Durand",
        lastMessage: "D'accord, on se retrouve demain.",
        time: "Lun",
        unread: 0,
        online: false,
        avatar: "https://i.pravatar.cc/150?u=3"
    }
];

const Messages = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 h-[calc(100vh-80px)]">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden h-full flex">
                    {/* Sidebar / List */}
                    <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-100 flex flex-col">
                        <div className="p-4 border-b border-gray-100">
                            <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    placeholder="Rechercher..."
                                    className="pl-10 bg-gray-50 border-transparent focus:bg-white transition-colors rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    className={`p-4 flex gap-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 ${conv.unread > 0 ? 'bg-blue-50/30' : ''}`}
                                >
                                    <div className="relative">
                                        <img
                                            src={conv.avatar}
                                            alt={conv.user}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        {conv.online && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className={`font-semibold truncate ${conv.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {conv.user}
                                            </h3>
                                            <span className="text-xs text-gray-400 whitespace-nowrap">{conv.time}</span>
                                        </div>
                                        <p className={`text-sm truncate ${conv.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="flex flex-col justify-center">
                                            <span className="w-5 h-5 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                                {conv.unread}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area - Hidden on mobile if viewing list (logic needed for real app but keeping simple for baseline) */}
                    <div className="hidden md:flex flex-1 flex-col bg-gray-50/50">
                        {/* Chat Header */}
                        <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <img
                                    src={conversations[0].avatar}
                                    alt={conversations[0].user}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{conversations[0].user}</h3>
                                    <span className="text-xs text-green-600 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                        En ligne
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Phone size={20} className="text-gray-500" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Video size={20} className="text-gray-500" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <MoreVertical size={20} className="text-gray-500" />
                                </Button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6">
                            <div className="flex justify-center">
                                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Aujourd'hui, 10:30</span>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <div className="bg-[#000435] text-white p-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                                    <p className="text-sm">Bonjour, je suis intéressé par votre annonce.</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <img
                                    src={conversations[0].avatar}
                                    alt={conversations[0].user}
                                    className="w-8 h-8 rounded-full object-cover self-end"
                                />
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm max-w-[80%] shadow-sm">
                                    <p className="text-sm text-gray-800">{conversations[0].lastMessage}</p>
                                </div>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="flex gap-3">
                                <Button variant="outline" size="icon" className="rounded-full shrink-0">
                                    <span className="sr-only">Joindre un fichier</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                                </Button>
                                <Input
                                    placeholder="Écrivez votre message..."
                                    className="rounded-full bg-gray-50 border-transparent focus:bg-white transition-colors"
                                />
                                <Button className="rounded-full w-10 h-10 p-0 bg-[#000435] hover:bg-[#000435]/90">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white ml-0.5"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Empty Selection State for Tablet/Desktop */}
                    {/* <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
             <div className="text-center">
               <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-gray-900">Vos messages</h3>
               <p className="text-gray-500">Sélectionnez une conversation pour commencer</p>
             </div>
          </div> */}
                </div>
            </main>

            {/* <Footer /> */}
            {/* Footer might be distracting in a full-height chat app, but keeping consistent for now if needed. 
          Actually, hiding footer in messages is common pattern. 
          But requirement says "Pages ... MUST look like they belong". 
          I will keep Navbar and Footer. */}
        </div>
    );
};

export default Messages;
