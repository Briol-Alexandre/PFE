import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import NotificationCard from '@/Components/Notifications/NotificationCard';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, notifications }) {
    const user = auth.user;

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="title" id="notifications-title">Centre de notifications</h2>}
        >
            <Head title="Notifications" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <section aria-labelledby="notifications-title" className="overflow-hidden shadow-sm sm:rounded-xl p-6">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="sr-only" id="notifications-title">Toutes les notifications</h3>
                            {notifications.data && Array.isArray(notifications.data) && notifications.data.some(notification => notification.read_at === null) && (
                                <Link
                                    href={route('notifications.markAllAsRead')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Marquer tout comme lu
                                </Link>
                            )}
                        </div>

                        <div className="divide-y divide-gray-700/50">
                            {notifications.data && Array.isArray(notifications.data) && notifications.data.length > 0 ? (
                                notifications.data.map(notification => (
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
                                    <p className="text-gray-400 text-center">Vous n'avez aucune notification</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pb-6 px-6">
                            {notifications.links && Array.isArray(notifications.links) && (
                                <Pagination links={notifications.links} />
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
