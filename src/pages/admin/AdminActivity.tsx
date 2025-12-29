
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useGetAdminLogsQuery } from '@/redux/api/apiSlice';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Loader2, AlertCircle, FileText } from 'lucide-react';
import { RouteFallback } from '@/components/common/RouteFallback';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AdminActivity() {
    const [page, setPage] = useState(1);
    const limit = 20;
    const { data, isLoading, error } = useGetAdminLogsQuery({ page, limit });

    if (isLoading) return <RouteFallback />;

    if (error) {
        return (
            <AdminLayout>
                <div className="p-8 text-center text-red-500">
                    <AlertCircle className="mx-auto h-12 w-12 mb-4" />
                    <p>Erreur lors du chargement des activités</p>
                </div>
            </AdminLayout>
        );
    }

    const { logs, pagination } = data || {};
    const totalPages = pagination ? Math.ceil(pagination.total / limit) : 1;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Journal d'activités</h1>
                    <p className="text-gray-600">Historique complet des actions administratives</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Date</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Action</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Ressource</th>
                                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">Détails</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {logs && logs.length > 0 ? (
                                    logs.map((log: any) => (
                                        <tr key={log.log_id} className="hover:bg-gray-50/50">
                                            <td className="py-4 px-6 text-sm text-gray-600 whitespace-nowrap">
                                                {format(new Date(log.created_at), "d MMM yyyy HH:mm", { locale: fr })}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-900">
                                                {log.details?.resourceType || '-'}
                                                <span className="text-gray-400 text-xs ml-2">#{log.details?.resourceId?.slice(0, 8)}</span>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-gray-500 max-w-md truncate">
                                                {JSON.stringify(log.details?.meta || log.details)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-gray-500">
                                            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                            Aucune activité enregistrée
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                            <div className="text-sm text-gray-500">
                                Page {page} sur {totalPages}
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >
                                    Précédent
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                >
                                    Suivant
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
