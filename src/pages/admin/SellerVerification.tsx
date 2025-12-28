import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Check, X, Search, MoreHorizontal, Phone, MapPin } from "lucide-react";
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

interface Seller {
    user_id: string;
    email: string;
    full_name: string;
    phone: string;
    account_type: string;
    verification_status: string;
    created_at: string;
    whatsapp?: string;
    id_type?: string;
    id_number?: string;
    location_city?: string;
}

const SellerVerification = () => {
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Action Dialog State
    const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
    const [rejectReason, setRejectReason] = useState("");
    const [actionLoading, setActionLoading] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);

    useEffect(() => {
        fetchPendingSellers();
    }, []);

    const fetchPendingSellers = async () => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        setSellers([
            {
                user_id: '1',
                email: 'jean.dupont@example.com',
                full_name: 'Jean Dupont',
                phone: '06 11 22 33 44',
                account_type: 'seller_individual',
                verification_status: 'pending',
                created_at: new Date().toISOString(),
                id_type: 'cni',
                id_number: '123456789',
                location_city: 'Paris',
                whatsapp: '06 11 22 33 44'
            },
            {
                user_id: '2',
                email: 'contact@shop.com',
                full_name: 'Super Shop',
                phone: '07 88 99 66 55',
                account_type: 'seller_business',
                verification_status: 'pending',
                created_at: new Date(Date.now() - 86400000).toISOString(),
                location_city: 'Lyon'
            }
        ]);
        setIsLoading(false);
    };

    const filteredSellers = sellers.filter(
        (seller) =>
            seller.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            seller.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            seller.user_id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleActionClick = (seller: Seller, type: "approve" | "reject") => {
        setSelectedSeller(seller);
        setActionType(type);
        setRejectReason("");
        setDialogOpen(true);
    };

    const executeAction = async () => {
        if (!selectedSeller || !actionType) return;

        setActionLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        toast.success(
            actionType === "approve"
                ? "Vendeur approuvé avec succès"
                : "Demande rejetée"
        );

        // Remove from list
        setSellers(prev => prev.filter(s => s.user_id !== selectedSeller.user_id));
        setDialogOpen(false);

        // If we were viewing details, close that too
        if (detailsOpen && selectedSeller.user_id === selectedSeller.user_id) {
            setDetailsOpen(false);
        }
        setActionLoading(false);
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
                            ) : filteredSellers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                        Aucune demande en attente.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredSellers.map((seller) => (
                                    <TableRow key={seller.user_id} className="hover:bg-gray-50/50">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 bg-primary/10 text-primary">
                                                    <AvatarFallback>
                                                        {seller.full_name?.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-[#000435]">{seller.full_name}</span>
                                                    <span className="text-xs text-muted-foreground">{seller.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={seller.account_type === 'seller_business' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-700'}>
                                                {seller.account_type === 'seller_business' ? 'Professionnel' : 'Particulier'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-sm text-gray-600">
                                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {seller.phone}</span>
                                                {seller.whatsapp && <span className="flex items-center gap-1 text-green-600"><Phone className="w-3 h-3" /> WA: {seller.whatsapp}</span>}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {seller.location_city ? (
                                                <span className="flex items-center gap-1 text-sm"><MapPin className="w-3 h-3 text-muted-foreground" /> {seller.location_city}</span>
                                            ) : <span className="text-muted-foreground text-xs italic">N/A</span>}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDate(seller.created_at)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => { setSelectedSeller(seller); setDetailsOpen(true); }}
                                                >
                                                    Détails
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700 text-white"
                                                    onClick={() => handleActionClick(seller, "approve")}
                                                >
                                                    <Check className="w-4 h-4 mr-1" /> Approuver
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
                                                            onClick={() => handleActionClick(seller, "reject")}
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
                                    ? `Voulez-vous vraiment approuver le compte vendeur de ${selectedSeller?.full_name} ? Il pourra publier des annonces immédiatement.`
                                    : `Voulez-vous rejeter la demande de ${selectedSeller?.full_name} ? Cette action est irréversible.`
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
                            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={actionLoading}>
                                Annuler
                            </Button>
                            <Button
                                variant={actionType === "approve" ? "default" : "destructive"}
                                onClick={executeAction}
                                disabled={actionLoading}
                                className={actionType === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                            >
                                {actionLoading ? "Traitement..." : (actionType === "approve" ? "Approuver" : "Rejeter")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Details Dialog */}
                <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                    <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Détails du demandeur</DialogTitle>
                        </DialogHeader>
                        {selectedSeller && (
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Nom complet</label>
                                        <p className="text-sm font-medium">{selectedSeller.full_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Type de compte</label>
                                        <p className="text-sm">{selectedSeller.account_type}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Email</label>
                                        <p className="text-sm">{selectedSeller.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Téléphone</label>
                                        <p className="text-sm">{selectedSeller.phone}</p>
                                    </div>
                                    {selectedSeller.whatsapp && (
                                        <div>
                                            <label className="text-xs text-muted-foreground uppercase font-semibold">WhatsApp</label>
                                            <p className="text-sm">{selectedSeller.whatsapp}</p>
                                        </div>
                                    )}
                                    <div>
                                        <label className="text-xs text-muted-foreground uppercase font-semibold">Ville</label>
                                        <p className="text-sm">{selectedSeller.location_city || 'N/A'}</p>
                                    </div>
                                </div>

                                {selectedSeller.account_type === 'seller_individual' && (
                                    <div className="border-t pt-4 mt-2">
                                        <h4 className="text-sm font-semibold mb-2">Identité</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs text-muted-foreground uppercase font-semibold">Type ID</label>
                                                <p className="text-sm uppercase">{selectedSeller.id_type || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="text-xs text-muted-foreground uppercase font-semibold">Numéro ID</label>
                                                <p className="text-sm">{selectedSeller.id_number || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setDetailsOpen(false)}>Fermer</Button>
                            <Button
                                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => { setDetailsOpen(false); handleActionClick(selectedSeller!, "approve"); }}
                            >
                                Approuver
                            </Button>
                            <Button
                                variant="destructive"
                                className="w-full sm:w-auto"
                                onClick={() => { setDetailsOpen(false); handleActionClick(selectedSeller!, "reject"); }}
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
