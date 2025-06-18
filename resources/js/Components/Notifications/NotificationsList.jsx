import React from 'react';
import { Link } from '@inertiajs/react';
import NotificationCard from './NotificationCard';

export default function NotificationsList({ notifications = [], maxCount = 3, showOnlyUnread = true }) {
    // Filtrer les notifications non lues si nécessaire et limiter le nombre
    const displayNotifications = showOnlyUnread
        ? notifications.filter(notification => notification.read_at === null).slice(0, maxCount)
        : notifications.slice(0, maxCount);
    return (
        <section aria-labelledby="notifications-title" className="overflow-hidden shadow-sm sm:rounded-xl mt-6 p-6">
            <div className="flex justify-between items-center mb-8">
                <h3 className="sub-title" id="notifications-title">Vos notifications</h3>
                <Link
                    href={route('notifications.index')}
                    className="hover-underline"
                >
                    <span>Voir toutes les notifications</span>
                </Link>
            </div>

            <div className="divide-y divide-gray-700/50">
                {Array.isArray(displayNotifications) && displayNotifications.length > 0 ? (
                    displayNotifications.map(notification => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="text-gray-400 text-center">{showOnlyUnread ? "Vous n'avez aucune notification non lue" : "Vous n'avez aucune notification"}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
