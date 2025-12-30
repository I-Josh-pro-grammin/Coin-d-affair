import { useState } from "react";
import { toast } from "sonner";
import { Check, X, Search, MoreHorizontal, Phone, MapPin, ExternalLink, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetAdminVerificationsQuery, useUpdateVerificationActionMutation } from "@/redux/api/apiSlice";

interface SellerVerificationRequest {
    user_id: string;
    status: string;
    id_type: string;
    id_number: string;
    whatsapp_number: string;
    location_city: string;
    document_front_url: string;
    document_back_url?: string;
    selfie_url: string;
    created_at: string;
    // Joined User Data
    full_name: string;
    email: string;
    phone: string;
    account_type: string;
    user_created_at: string;
}

const SellerVerification = () => {
    // Queries
    const { data: verifications = [], isLoading, refetch } = useGetAdminVerificationsQuery({ status: 'pending' });
    const [updateStatus, { isLoading: isUpdating }] = useUpdateVerificationActionMutation();

    const [searchQuery, setSearchQuery] = useState("");

    // Action Dialog State
    const [selectedRequest, setSelectedRequest] = useState<SellerVerificationRequest | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [detailsOpen, setDetailsOpen] = useState(false);

    const filteredRequests = verifications.filter(
        (req: SellerVerificationRequest) =>
            req.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            req.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleActionClick = (req: SellerVerificationRequest, type: "approve" | "reject") => {
        setSelectedRequest(req);
        setActionType(type);
        setRejectReason("");
        setDialogOpen(true);
    };

    const executeAction = async () => {
        if (!selectedRequest || !actionType) return;

        try {
            await updateStatus({
                id: selectedRequest.user_id,
                action: actionType,
                reason: rejectReason
            }).unwrap();

            toast.success(
                actionType === "approve"
                    ? "Vendeur approuvé avec succès"
                    : "Demande rejetée"
            );

            setDialogOpen(false);
            setDetailsOpen(false);
            refetch(); // Refresh list
        } catch (error: any) {
            toast.error(error?.data?.message || "Une erreur est survenue");
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[#000435]">Vérification Vendeurs</h1>
                        <p className="text-muted-foreground mt-1">
                            Gérez les demandes d'inscription des vendeurs en attente.
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm border">
                    <Search className="text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Rechercher par nom, email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>

                <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50">
                            <TableRow>
                                <TableHead>Vendeur</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Localisation</TableHead>
                                <TableHead>Date demande</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
                                        Chargement...
                                    </TableCell>
                                </TableRow>
                            ) : filteredRequests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Aucune demande en attente.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRequests.map((req: SellerVerificationRequest) => (
                                    <TableRow key={req.user_id} className="hover:bg-gray-50/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 bg-primary/10 text-primary">
                                                    <AvatarFallback>
                                                        {req.full_name?.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-[#000435]">{req.full_name}</span>
                                                    <span className="text-xs text-muted-foreground">{req.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={!req.id_type ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700'}>
                                                {!req.id_type ? 'Professionnel' : 'Particulier'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm text-gray-600">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {req.phone}</span>
                                                {req.whatsapp_number && <span className="flex items-center gap-1 text-green-600"><Phone className="w-3 h-3" /> WA: {req.whatsapp_number}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {req.location_city ? (
                                                <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3 text-muted-foreground" /> {req.location_city}</span>
                                            ) : <span className="text-muted-foreground text-xs italic">N/A</span>}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDate(req.created_at)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => { setSelectedRequest(req); setDetailsOpen(true); }}
                                                >
                                                    Docs
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                    onClick={() => handleActionClick(req, "approve")}
                                                >
                                                    <Check className="w-4 h-4 mr-1" />
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem
                                                            className="text-red-600 cursor-pointer"
                                                            onClick={() => handleActionClick(req, "reject")}
                                                        >
                                                            <X className="w-4 h-4 mr-2" /> Refuser
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Action Dialog (Approve/Reject) */}
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {actionType === "approve" ? "Confirmer l'approbation" : "Refuser la demande"}
                            </DialogTitle>
                            <DialogDescription>
                                {actionType === "approve"
                                    ? `Voulez-vous vraiment approuver le compte vendeur de ${selectedRequest?.full_name} ? Il pourra publier des annonces immédiatement.`
                                    : `Voulez-vous rejeter la demande de ${selectedRequest?.full_name} ?`
                                }
                            </DialogDescription>
                        </DialogHeader>

                        {actionType === "reject" && (
                            <div className="py-2">
                                <label className="text-sm font-medium mb-2 block">Raison du rejet (Optionnel)</label>
                                <Input
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    placeholder="Ex: Informations d'identité illisibles"
                                />
                            </div>
                        )}

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={isUpdating}>
                                Annuler
                            </Button>
                            <Button
                                variant={actionType === "approve" ? "default" : "destructive"}
                                onClick={executeAction}
                                disabled={isUpdating}
                                className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                                {isUpdating ? "Traitement..." : (actionType === "approve" ? "Approuver" : "Rejeter")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Details Dialog */}
                <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Vérification d'identité</DialogTitle>
                        </DialogHeader>
                        {selectedRequest && (
                            <div className="space-y-6 py-4">
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Nom complet</label>
                                        <p className="text-sm font-medium">{selectedRequest.full_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Type de compte</label>
                                        <p className="text-sm">{selectedRequest.account_type}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Type ID</label>
                                        <p className="text-sm uppercase font-medium">{selectedRequest.id_type}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Numéro ID</label>
                                        <p className="text-sm font-medium">{selectedRequest.id_number}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold mb-3 border-b pb-1">Documents fournis</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                                <ImageIcon className="w-3 h-3" /> Recto
                                            </span>
                                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                                                <a href={selectedRequest.document_front_url} target="_blank" rel="noopener noreferrer">
                                                    <img src={selectedRequest.document_front_url} alt="ID Front" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                                </a>
                                            </div>
                                        </div>

                                        {selectedRequest.document_back_url && (
                                            <div className="space-y-2">
                                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                                    <ImageIcon className="w-3 h-3" /> Verso
                                                </span>
                                                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border">
                                                    <a href={selectedRequest.document_back_url} target="_blank" rel="noopener noreferrer">
                                                        <img src={selectedRequest.document_back_url} alt="ID Back" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                                <ImageIcon className="w-3 h-3" /> Selfie
                                            </span>
                                            <div className="aspect-square w-32 bg-gray-100 rounded-lg overflow-hidden border">
                                                <a href={selectedRequest.selfie_url} target="_blank" rel="noopener noreferrer">
                                                    <img src={selectedRequest.selfie_url} alt="Selfie" className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setDetailsOpen(false)}>Fermer</Button>
                            <Button
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => { setDetailsOpen(false); handleActionClick(selectedRequest!, "approve"); }}
                            >
                                Approuver
                            </Button>
                            <Button
                                variant="destructive"
                                className="w-full sm:w-auto"
                                onClick={() => { setDetailsOpen(false); handleActionClick(selectedRequest!, "reject"); }}
                            >
                                Rejeter
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AdminLayout>
    );
};

export default SellerVerification;
