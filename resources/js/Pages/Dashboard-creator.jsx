import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import DashboardLayoutWatch from '@/Components/Watch/Dashboard-Layout';
import RepairCardImage from '@/Components/Repairs/CardImage';

export default function Dashboard({ auth, watches, asked_repairs }) {
    const user = auth.user;
    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold font-erstoria text-3xl text-brand leading-tight">Bienvenue {user.first_name} {user.name}</h2>}
        >
            <Head title="Dashboard Créateur" />

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <DashboardLayoutWatch watches={watches} userRole={user.role} isDashboard={true} />

                    <section aria-labelledby="repair-title" className="overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 pb-4 flex justify-between items-center">
                            <h3 className="sub-title" id="repair-title">Dernières demandes</h3>
                            <Link href={route('revision.create')} className="hover-underline">
                                Nouvelle révision
                            </Link>
                        </div>
                        {(() => {
                            const latestRepairs = asked_repairs
                                .filter(repair => repair.status === 'asked')
                                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                                .slice(0, 3);

                            return latestRepairs.length > 0 ? (
                                <RepairCardImage
                                    repairs={latestRepairs}
                                    userRole={user.role}
                                />
                            ) : (
                                <p className="text-gray-400 text-center py-10">Aucune nouvelle demande</p>
                            );
                        })()}
                        <div className="p-6 pt-4 flex justify-center">
                            <Link href={route('repair.index')} className="hover-underline">
                                Voir toutes vos réparations
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
