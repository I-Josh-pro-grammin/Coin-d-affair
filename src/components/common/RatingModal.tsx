import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { toast } from 'sonner';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => Promise<void>;
    isLoading?: boolean;
}

export function RatingModal({ isOpen, onClose, onSubmit, isLoading }: RatingModalProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (rating === 0) {
            toast.error("Veuillez choisir une note");
            return;
        }
        await onSubmit(rating, comment);
        onClose();
        setRating(0);
        setComment('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Notez ce produit</h3>
                    <p className="text-gray-500">Quelle a été votre expérience ?</p>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className="transition-transform hover:scale-110 focus:outline-none"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                        >
                            <Star
                                size={40}
                                className={`transition-colors duration-200 ${star <= (hoverRating || rating)
                                        ? "fill-yellow-400 text-yellow-400 shadow-md"
                                        : "fill-transparent text-gray-300"
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                {/* Comment */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire (optionnel)</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Partagez votre avis..."
                        className="w-full rounded-xl border-gray-200 focus:border-[#000435] focus:ring-[#000435] min-h-[100px]"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 rounded-full border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || rating === 0}
                        className="flex-1 py-3 px-4 rounded-full bg-[#000435] text-white font-bold shadow-lg shadow-blue-900/20 hover:bg-[#000435]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Envoi...' : 'Envoyer'}
                    </button>
                </div>
            </div>
        </div>
    );
}
