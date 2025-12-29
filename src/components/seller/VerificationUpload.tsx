
import { useState } from 'react';
import { useSubmitVerificationMutation } from '@/redux/api/apiSlice';
import { toast } from 'sonner';
import { Loader2, Upload, Check } from 'lucide-react';

export default function VerificationUpload({ onSuccess }: { onSuccess: () => void }) {
    const [submitVerification, { isLoading }] = useSubmitVerificationMutation();
    const [formData, setFormData] = useState({
        id_type: 'passport',
        id_number: '',
        whatsapp_number: '',
        location_city: 'bujumbura'
    });

    // File states
    const [docFront, setDocFront] = useState<File | null>(null);
    const [docBack, setDocBack] = useState<File | null>(null);
    const [selfie, setSelfie] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) => {
        if (e.target.files && e.target.files[0]) {
            setter(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!docFront || !selfie) {
            toast.error("Veuillez télécharger votre pièce d'identité (recto) et un selfie.");
            return;
        }

        const data = new FormData();
        data.append('id_type', formData.id_type);
        data.append('id_number', formData.id_number);
        data.append('whatsapp_number', formData.whatsapp_number);
        data.append('location_city', formData.location_city);
        data.append('document_front', docFront);
        if (docBack) data.append('document_back', docBack);
        data.append('selfie', selfie);

        try {
            await submitVerification(data).unwrap();
            toast.success("Demande de vérification envoyée !");
            onSuccess();
        } catch (error: any) {
            toast.error(error?.data?.message || "Erreur lors de l'envoi");
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type de pièce d'identité</label>
                    <select
                        value={formData.id_type}
                        onChange={e => setFormData({ ...formData, id_type: e.target.value })}
                        className="w-full border-gray-300 rounded-lg p-2 border"
                    >
                        <option value="passport">Passeport</option>
                        <option value="national_id">Carte d'identité Nationale</option>
                        <option value="driving_license">Permis de conduire</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la pièce</label>
                    <input
                        type="text"
                        required
                        value={formData.id_number}
                        onChange={e => setFormData({ ...formData, id_number: e.target.value })}
                        className="w-full border-gray-300 rounded-lg p-2 border"
                        placeholder="Ex: 123456789"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro WhatsApp</label>
                    <input
                        type="text"
                        required
                        value={formData.whatsapp_number}
                        onChange={e => setFormData({ ...formData, whatsapp_number: e.target.value })}
                        className="w-full border-gray-300 rounded-lg p-2 border"
                        placeholder="+257 ..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                    <input
                        type="text"
                        required
                        value={formData.location_city}
                        onChange={e => setFormData({ ...formData, location_city: e.target.value })}
                        className="w-full border-gray-300 rounded-lg p-2 border"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-medium text-gray-900 border-b pb-2">Documents</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Front */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                            <span>ID (Recto) *</span>
                            <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setDocFront)} />
                        </label>
                        {docFront && <p className="text-xs text-green-600 flex items-center justify-center gap-1"><Check size={12} /> {docFront.name}</p>}
                    </div>

                    {/* Back */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                            <span>ID (Verso)</span>
                            <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setDocBack)} />
                        </label>
                        {docBack && <p className="text-xs text-green-600 flex items-center justify-center gap-1"><Check size={12} /> {docBack.name}</p>}
                    </div>

                    {/* Selfie */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors">
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                            <span>Selfie *</span>
                            <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, setSelfie)} />
                        </label>
                        {selfie && <p className="text-xs text-green-600 flex items-center justify-center gap-1"><Check size={12} /> {selfie.name}</p>}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#000435] text-white py-3 rounded-xl font-medium hover:bg-[#000435]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : 'Envoyer pour vérification'}
            </button>
        </form>
    );
}
