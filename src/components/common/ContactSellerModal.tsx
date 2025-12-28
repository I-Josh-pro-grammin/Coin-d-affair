import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, MessageCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ContactSellerModalProps {
    isOpen: boolean;
    onClose: () => void;
    sellerName: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
    website?: string;
}

export const ContactSellerModal = ({
    isOpen,
    onClose,
    sellerName,
    phone,
    email,
    whatsapp,
    website,
}: ContactSellerModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Contacter {sellerName}</DialogTitle>
                    <DialogDescription>
                        Choisissez un moyen de contact pour échanger directement avec le vendeur.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <Alert className="bg-amber-50 border-amber-200 text-amber-800">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-xs">
                            Les paiements et transactions se font directement entre acheteur et vendeur.
                            La plateforme ne gère pas les paiements.
                        </AlertDescription>
                    </Alert>

                    {phone && (
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-12 text-base"
                            onClick={() => window.open(`tel:${phone.replace(/\s/g, "")}`, "_self")}
                        >
                            <Phone className="h-5 w-5 text-gray-600" />
                            Appeler {phone}
                        </Button>
                    )}

                    {whatsapp && (
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-12 text-base"
                            onClick={() => window.open(`https://wa.me/${whatsapp.replace(/\D/g, "")}`, "_blank")}
                        >
                            <MessageCircle className="h-5 w-5 text-green-600" />
                            WhatsApp
                        </Button>
                    )}

                    {email && (
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-12 text-base"
                            onClick={() => window.open(`mailto:${email}`, "_self")}
                        >
                            <Mail className="h-5 w-5 text-blue-600" />
                            Envoyer un email
                        </Button>
                    )}

                    {website && (
                        <Button
                            variant="outline"
                            className="w-full justify-start gap-3 h-12 text-base"
                            onClick={() => window.open(website.startsWith('http') ? website : `https://${website}`, "_blank")}
                        >
                            <Globe className="h-5 w-5 text-indigo-600" />
                            Visiter le site web
                        </Button>
                    )}

                    {!phone && !whatsapp && !email && !website && (
                        <div className="text-center text-gray-500 py-4">
                            Aucune information de contact disponible pour ce vendeur.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
