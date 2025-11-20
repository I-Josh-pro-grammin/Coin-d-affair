import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useState } from 'react';
import { Search, Send, MoreVertical, Paperclip, Image, Smile } from 'lucide-react';

export default function Messages() {
    const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
    const [messageText, setMessageText] = useState('');

    // Mock conversations data
    const conversations = [
        {
            id: 1,
            customer: 'Jean Dupont',
            lastMessage: 'Est-ce que le produit est toujours disponible?',
            time: '10:30',
            unread: 2,
            product: 'iPhone 13 Pro',
            avatar: 'JD'
        },
        {
            id: 2,
            customer: 'Marie Claire',
            lastMessage: 'Merci pour votre réponse!',
            time: 'Hier',
            unread: 0,
            product: 'MacBook Pro',
            avatar: 'MC'
        },
        {
            id: 3,
            customer: 'Pierre Kalisa',
            lastMessage: 'Pouvez-vous réduire le prix?',
            time: '2 jours',
            unread: 1,
            product: 'Samsung Galaxy',
            avatar: 'PK'
        },
    ];

    // Mock messages for selected conversation
    const messages = [
        {
            id: 1,
            sender: 'customer',
            text: 'Bonjour, je suis intéressé par votre iPhone 13 Pro. Est-il toujours disponible?',
            time: '10:15'
        },
        {
            id: 2,
            sender: 'seller',
            text: 'Bonjour! Oui, le produit est toujours disponible. Il est en excellent état.',
            time: '10:20'
        },
        {
            id: 3,
            sender: 'customer',
            text: 'Parfait! Quel est le prix final avec la livraison?',
            time: '10:25'
        },
        {
            id: 4,
            sender: 'seller',
            text: 'Le prix est de 850,000 RWF + 10,000 RWF pour la livraison à Kigali. Total: 860,000 RWF.',
            time: '10:28'
        },
        {
            id: 5,
            sender: 'customer',
            text: 'Est-ce que le produit est toujours disponible?',
            time: '10:30'
        },
    ];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageText.trim()) {
            console.log('Send message:', messageText);
            setMessageText('');
        }
    };

    return (
        <DashboardLayout>
            <div className="h-[calc(100vh-12rem)]">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-full flex">
                    {/* Conversations List */}
                    <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher une conversation..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all text-sm"
                                />
                            </div>
                        </div>

                        {/* Conversations */}
                        <div className="flex-1 overflow-y-auto">
                            {conversations.map((conv) => (
                                <button
                                    key={conv.id}
                                    onClick={() => setSelectedConversation(conv.id)}
                                    className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors text-left ${selectedConversation === conv.id ? 'bg-blue-50' : ''
                                        }`}
                                >
                                    <div className="flex gap-3">
                                        {/* Avatar */}
                                        <div className="w-12 h-12 bg-[#000435] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                            {conv.avatar}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-semibold text-gray-900 truncate">{conv.customer}</h3>
                                                <span className="text-xs text-gray-500">{conv.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-1 truncate">{conv.product}</p>
                                            <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                        </div>

                                        {/* Unread Badge */}
                                        {conv.unread > 0 && (
                                            <div className="w-6 h-6 bg-[#000435] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {conv.unread}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Chat Area */}
                    {selectedConversation ? (
                        <div className="flex-1 flex flex-col">
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#000435] rounded-full flex items-center justify-center text-white font-semibold">
                                        JD
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Jean Dupont</h3>
                                        <p className="text-sm text-gray-500">À propos de: iPhone 13 Pro</p>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreVertical size={20} className="text-gray-600" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-md ${msg.sender === 'seller' ? 'order-2' : 'order-1'}`}>
                                            <div
                                                className={`px-4 py-3 rounded-2xl ${msg.sender === 'seller'
                                                        ? 'bg-[#000435] text-white rounded-br-none'
                                                        : 'bg-gray-100 text-gray-900 rounded-bl-none'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                            <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'seller' ? 'text-right' : 'text-left'}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-200">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <button
                                        type="button"
                                        className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Paperclip size={20} className="text-gray-600" />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Image size={20} className="text-gray-600" />
                                    </button>
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Écrire un message..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                                    />
                                    <button
                                        type="button"
                                        className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <Smile size={20} className="text-gray-600" />
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!messageText.trim()}
                                        className="p-3 bg-[#000435] text-white rounded-full hover:bg-[#000435]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send size={20} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            <p>Sélectionnez une conversation pour commencer</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
