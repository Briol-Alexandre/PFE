import React from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function NotificationCard({ notification }) {
    const { data, read_at, created_at } = notification;
    const isRead = read_at !== null;
    const { auth } = usePage().props;
    const isCreator = auth.user.role === 'creator';

    // Fonction pour obtenir le titre de la notification en fonction du statut
    const getNotificationTitle = (status) => {
        switch (status) {
            case 'asked':
                return 'Nouvelle demande de réparation';
            case 'accepted':
                return 'Devis de réparation accepté';
            case 'refused':
                return 'Demande de réparation refusée';
            case 'in_progress':
                return 'Réparation en cours';
            case 'completed':
                return 'Réparation terminée';
            case 'pending':
                return 'Devis en attente';
            case 'rejected':
                return 'Réparation rejetée';
            case 'modified':
                return 'Réparation modifiée';
            case 'canceled':
                return 'Réparation annulée';
            default:
                return 'Mise à jour de réparation';
        }
    };

    // Fonction pour obtenir l'icône SVG en fonction du statut
    const getStatusIcon = (status) => {
        const iconClasses = "h-6 w-6";

        switch (status) {
            case 'asked':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-amber-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                );
            case 'accepted':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-green-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'refused':
            case 'rejected':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-red-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'in_progress':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-blue-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                );
            case 'completed':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-brand`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                );
            case 'pending':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-yellow-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'modified':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-purple-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                );
            case 'canceled':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-gray-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                );
            default:
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-gray-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    // Formater la date relative
    const formattedDate = formatDistanceToNow(new Date(created_at), {
        addSuffix: true,
        locale: fr
    });

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        router.delete(route('notifications.destroy', notification.id));
    };

    return (
        <div className={`border-b border-gray-700/50 ${isRead ? 'bg-black/20' : 'bg-black/30'} backdrop-blur-3xl`}>
            <div className="relative hover:bg-white/10 transition-colors duration-300 p-4">
                <Link href={route(isCreator ? 'repair.show_creator' : data.repair_route, data.repair_id)} className="block">
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4 flex items-center justify-center">
                            {getStatusIcon(data.status)}
                        </div>
                        
                        {!isRead && (
                            <div className="absolute top-4 right-10">
                                <p className="text-sm text-brand rounded-full px-2 py-1 w-fit" style={{ background: '#4F46E5' }}>
                                    Nouveau
                                </p>
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <p className="font-erstoria text-base font-medium text-white">
                                {getNotificationTitle(data.status)}
                            </p>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                                <p className="text-lg font-medium truncate">Client</p>
                                <p className="text-sm text-gray-400 truncate">{data.client_name}</p>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <p className="text-lg font-medium truncate">Montre</p>
                                <p className="text-sm text-gray-400 truncate">{data.watch_model}</p>
                            </div>
                            <div className="flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-xs text-gray-400">
                                    {formattedDate}
                                </p>
                            </div>
                        </div>
                    </div>
                </Link>
                <button 
                    onClick={handleDelete}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700/30 transition-colors duration-200"
                    title="Supprimer cette notification"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
