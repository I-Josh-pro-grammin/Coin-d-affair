import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, User, MapPin, Phone, Mail, Truck, CheckCircle, Printer } from 'lucide-react';

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock order data
    const order = {
        id: `#${id}`,
        customer: {
            name: 'Jean Dupont',
            email: 'jean.dupont@email.com',
            phone: '+250 788 123 456',
            address: '123 Rue Example, Kigali, Rwanda'
        },
        items: [
            {
                id: 1,
                name: 'iPhone 13 Pro 256GB',
                image: '/placeholder.jpg',
                quantity: 1,
                price: '850,000 RWF',
                total: '850,000 RWF'
            }
        ],
        subtotal: '850,000 RWF',
        shipping: '10,000 RWF',
        total: '860,000 RWF',
        status: 'pending',
        paymentStatus: 'paid',
        paymentMethod: 'Mobile Money',
        date: '15 Janvier 2024, 14:30',
        trackingNumber: '',
        timeline: [
            { status: 'Commande reçue', date: '15 Jan 2024, 14:30', completed: true },
            { status: 'Paiement confirmé', date: '15 Jan 2024, 14:35', completed: true },
            { status: 'En préparation', date: '', completed: false },
            { status: 'Expédiée', date: '', completed: false },
            { status: 'Livrée', date: '', completed: false },
        ]
    };

    const handleStatusUpdate = (newStatus: string) => {
        console.log('Update status to:', newStatus);
        // Add API call here
    };

    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => navigate('/dashboard/orders')}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#000435] mb-4 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Retour aux commandes
                </button>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Commande {order.id}</h1>
                        <p className="text-gray-600">{order.date}</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-[#000435] hover:text-white transition-all">
                        <Printer size={20} />
                        Imprimer
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Order Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Items */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Articles commandés</h2>
                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-xl">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Package size={32} className="text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                                        <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                                        <p className="text-sm font-medium text-gray-900 mt-2">{item.price} × {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-[#000435]">{item.total}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                            <div className="flex justify-between text-gray-700">
                                <span>Sous-total</span>
                                <span className="font-medium">{order.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-700">
                                <span>Livraison</span>
                                <span className="font-medium">{order.shipping}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                <span>Total</span>
                                <span className="text-[#000435]">{order.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Timeline */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Suivi de la commande</h2>
                        <div className="space-y-4">
                            {order.timeline.map((step, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                                            }`}>
                                            {step.completed ? <CheckCircle size={20} /> : <div className="w-3 h-3 rounded-full bg-gray-300" />}
                                        </div>
                                        {index < order.timeline.length - 1 && (
                                            <div className={`w-0.5 h-12 ${step.completed ? 'bg-green-200' : 'bg-gray-200'}`} />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-8">
                                        <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                            {step.status}
                                        </p>
                                        {step.date && <p className="text-sm text-gray-500 mt-1">{step.date}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Customer Info & Actions */}
                <div className="space-y-6">
                    {/* Status Update */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mettre à jour le statut</h2>
                        <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all mb-3"
                        >
                            <option value="pending">En attente</option>
                            <option value="processing">En préparation</option>
                            <option value="shipped">Expédiée</option>
                            <option value="delivered">Livrée</option>
                            <option value="cancelled">Annulée</option>
                        </select>

                        {/* Tracking Number */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Numéro de suivi (optionnel)
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: 1234567890"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000435] focus:border-transparent transition-all"
                            />
                        </div>

                        <button className="w-full mt-4 bg-[#000435] text-white py-3 px-4 rounded-full font-medium hover:bg-[#000435]/90 transition-all">
                            Enregistrer
                        </button>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations client</h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <User size={20} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Nom</p>
                                    <p className="font-medium text-gray-900">{order.customer.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail size={20} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">{order.customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={20} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Téléphone</p>
                                    <p className="font-medium text-gray-900">{order.customer.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-sm text-gray-600">Adresse de livraison</p>
                                    <p className="font-medium text-gray-900">{order.customer.address}</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#000435] text-[#000435] rounded-full font-medium hover:bg-[#000435] hover:text-white transition-all">
                            <Mail size={20} />
                            Contacter le client
                        </button>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Paiement</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Statut</span>
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                    Payé
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Méthode</span>
                                <span className="font-medium text-gray-900">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-gray-200">
                                <span className="font-semibold text-gray-900
">Montant</span>
                                <span className="font-bold text-[#000435]">{order.total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
